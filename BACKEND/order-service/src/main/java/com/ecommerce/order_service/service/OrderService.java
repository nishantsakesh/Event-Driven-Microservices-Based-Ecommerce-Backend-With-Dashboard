package com.ecommerce.order_service.service;

import com.ecommerce.order_service.dto.*;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItem;
import com.ecommerce.order_service.entity.OrderStatus;
import com.ecommerce.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;


@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;

    @Value("${product.service.url}")
    private String productServiceUrl;

    @Value("${inventory.service.url}")
    private String inventoryServiceUrl;

    public OrderResponse createOrder(OrderRequest request) {

        LocalDateTime now = LocalDateTime.now();

        Order order = Order.builder()
                .userId(request.getUserId())
                .status(OrderStatus.CREATED)
                .createdAt(now)
                .updatedAt(now)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> items = request.getItems()
                .stream()
                .map(itemRequest -> {

                    ProductResponse product =
                            getProduct(itemRequest.getProductId());

                    return OrderItem.builder()
                            .order(order)
                            .productId(product.getId())
                            .productName(product.getName())
                            .quantity(itemRequest.getQuantity())
                            .unitPrice(product.getPrice())
                            .build();

                })
                .collect(Collectors.toList());

        for (OrderItem item : items) {

            total = total.add(

                    item.getUnitPrice()
                            .multiply(
                                    BigDecimal.valueOf(item.getQuantity())
                            )

            );

        }

        order.setItems(items);
        order.setTotalAmount(total);

        orderRepository.save(order);

        try {

            reserveInventory(items);

            order.setStatus(OrderStatus.INVENTORY_RESERVED);

        } catch (Exception e) {

            order.setStatus(OrderStatus.CANCELLED);
            order.setUpdatedAt(LocalDateTime.now());

            orderRepository.save(order);

            return toResponse(order);

        }

        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return toResponse(order);

    }

    public List<OrderResponse> getAllOrders() {

        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public List<OrderResponse> getOrdersByUser(Long userId) {

        return orderRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public OrderResponse getOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        return toResponse(order);

    }

    public OrderResponse cancelOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.CREATED &&
                order.getStatus() != OrderStatus.INVENTORY_RESERVED) {

            throw new RuntimeException(
                    "Only newly created orders can be cancelled."
            );

        }

        releaseInventory(order);

        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return toResponse(order);

    }

    public OrderResponse paymentSuccess(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.INVENTORY_RESERVED) {

            throw new RuntimeException(
                    "Payment can only be completed after inventory reservation."
            );

        }

        confirmInventory(order);

        order.setStatus(OrderStatus.ORDER_CONFIRMED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return toResponse(order);

    }

    public OrderResponse paymentFailed(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.INVENTORY_RESERVED) {

            throw new RuntimeException(
                    "Inventory is not reserved for this order."
            );

        }

        releaseInventory(order);

        order.setStatus(OrderStatus.PAYMENT_FAILED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return toResponse(order);

    }

    private void reserveInventory(List<OrderItem> items) {

        for (OrderItem item : items) {

            restTemplate.postForObject(

                    inventoryServiceUrl + "/api/inventory/reserve",

                    Map.of(
                            "productId", item.getProductId(),
                            "quantity", item.getQuantity()
                    ),

                    Object.class

            );

        }

    }

    private void releaseInventory(Order order) {

        for (OrderItem item : order.getItems()) {

            restTemplate.postForObject(

                    inventoryServiceUrl + "/api/inventory/release",

                    Map.of(
                            "productId", item.getProductId(),
                            "quantity", item.getQuantity()
                    ),

                    Object.class

            );

        }

    }

    private void confirmInventory(Order order) {

        for (OrderItem item : order.getItems()) {

            restTemplate.postForObject(

                    inventoryServiceUrl + "/api/inventory/confirm",

                    Map.of(
                            "productId", item.getProductId(),
                            "quantity", item.getQuantity()
                    ),

                    Object.class

            );

        }

    }

    private ProductResponse getProduct(Long productId) {

        ProductResponse product =
                restTemplate.getForObject(

                        productServiceUrl + "/api/products/" + productId,

                        ProductResponse.class

                );

        if (product == null) {

            throw new RuntimeException(
                    "Product not found : " + productId
            );

        }

        return product;

    }



    private OrderResponse toResponse(Order order) {

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus().name())
                .items(
                        order.getItems()
                                .stream()
                                .map(this::toItemResponse)
                                .collect(Collectors.toList())
                )
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();

    }

    private OrderItemResponse toItemResponse(OrderItem item) {

        return OrderItemResponse.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .build();

    }
}