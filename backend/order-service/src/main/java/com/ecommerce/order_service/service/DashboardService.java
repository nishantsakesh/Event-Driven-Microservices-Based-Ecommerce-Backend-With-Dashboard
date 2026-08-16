package com.ecommerce.order_service.service;

import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.order_service.dto.DashboardStatsResponse;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItem;
import com.ecommerce.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Value("${auth.service.url:http://localhost:8081}")
    private String authServiceUrl;

    @Value("${product.service.url:http://localhost:8082}")
    private String productServiceUrl;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public DashboardStatsResponse getStats() {
        List<Order> allOrders = orderRepository.findAll();

        long totalOrders = allOrders.size();

        BigDecimal totalRevenue = allOrders.stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELLED)
                .map(Order::getTotalAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalProducts = fetchCount(productServiceUrl + "/api/products/count", "products");
        long totalUsers    = fetchCount(authServiceUrl    + "/api/auth/users/count", "users");

        Map<String, BigDecimal> revenueMap = new TreeMap<>();
        allOrders.stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELLED && o.getCreatedAt() != null)
                .forEach(o -> {
                    String date = o.getCreatedAt().format(DATE_FMT);
                    revenueMap.merge(date, o.getTotalAmount() != null ? o.getTotalAmount() : BigDecimal.ZERO, BigDecimal::add);
                });

        List<Map<String, Object>> revenueByDate = revenueMap.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("date", e.getKey());
                    m.put("revenue", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, Long> statusCount = allOrders.stream()
                .collect(Collectors.groupingBy(
                        o -> o.getStatus() != null ? o.getStatus().name() : "UNKNOWN",
                        Collectors.counting()
                ));

        List<Map<String, Object>> orderStatusDistribution = statusCount.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("status", e.getKey());
                    m.put("count", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, Long> paymentCount = allOrders.stream()
                .collect(Collectors.groupingBy(
                        o -> o.getPaymentMethod() != null ? o.getPaymentMethod() : "UNKNOWN",
                        Collectors.counting()
                ));

        List<Map<String, Object>> paymentMethodData = paymentCount.entrySet().stream()
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("name", e.getKey());
                    m.put("value", e.getValue());
                    return m;
                })
                .collect(Collectors.toList());

        Map<Long, String> productNames = new HashMap<>();
        Map<Long, Long> productSales = new HashMap<>();
        Map<Long, BigDecimal> productRevenue = new HashMap<>();

        allOrders.stream()
                .filter(o -> o.getStatus() != OrderStatus.CANCELLED)
                .flatMap(o -> o.getItems().stream())
                .forEach(item -> {
                    Long pid = item.getProductId();
                    productNames.put(pid, item.getProductName());
                    productSales.merge(pid, (long) item.getQuantity(), Long::sum);
                    BigDecimal lineTotal = item.getUnitPrice() != null
                            ? item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                            : BigDecimal.ZERO;
                    productRevenue.merge(pid, lineTotal, BigDecimal::add);
                });

        List<Map<String, Object>> topProducts = productSales.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(5)
                .map(e -> {
                    Long pid = e.getKey();
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", pid);
                    m.put("name", productNames.getOrDefault(pid, "Unknown Product"));
                    m.put("sales", e.getValue());
                    m.put("revenue", productRevenue.getOrDefault(pid, BigDecimal.ZERO));
                    return m;
                })
                .collect(Collectors.toList());

        List<Map<String, Object>> recentOrders = allOrders.stream()
                .sorted(Comparator.comparing(Order::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(10)
                .map(o -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", o.getId());
                    m.put("userId", o.getUserId());
                    m.put("totalAmount", o.getTotalAmount());
                    m.put("status", o.getStatus() != null ? o.getStatus().name() : null);
                    m.put("paymentMethod", o.getPaymentMethod());
                    m.put("createdAt", o.getCreatedAt() != null ? o.getCreatedAt().format(DATE_FMT) : null);
                    m.put("items", o.getItems().stream().map(i -> {
                        Map<String, Object> im = new LinkedHashMap<>();
                        im.put("productId", i.getProductId());
                        im.put("productName", i.getProductName());
                        im.put("quantity", i.getQuantity());
                        im.put("unitPrice", i.getUnitPrice());
                        im.put("imageUrl", i.getImageUrl());
                        return im;
                    }).collect(Collectors.toList()));
                    return m;
                })
                .collect(Collectors.toList());

        return DashboardStatsResponse.builder()
                .totalOrders(totalOrders)
                .totalRevenue(totalRevenue)
                .totalProducts(totalProducts)
                .totalUsers(totalUsers)
                .revenueByDate(revenueByDate)
                .orderStatusDistribution(orderStatusDistribution)
                .paymentMethodData(paymentMethodData)
                .topProducts(topProducts)
                .recentOrders(recentOrders)
                .build();
    }

    private long fetchCount(String url, String resourceName) {
        try {
            Map<?, ?> resp = restTemplate.getForObject(url, Map.class);
            if (resp != null && resp.get("count") instanceof Number) {
                return ((Number) resp.get("count")).longValue();
            }
        } catch (Exception ignored) {
        }
        return 0L;
    }
}
