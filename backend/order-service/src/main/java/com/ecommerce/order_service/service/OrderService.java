package com.ecommerce.order_service.service;

import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.common.events.OrderItemEvent;
import com.ecommerce.order_service.dto.*;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItem;
import com.ecommerce.order_service.repository.OrderItemRepository;
import com.ecommerce.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final RestTemplate restTemplate;
    private final RabbitTemplate rabbitTemplate;

    @Value("${product.service.url:http://localhost:8082}")
    private String productServiceUrl;

    public OrderResponse createOrder(OrderRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item");
        }

        Map<Long, Integer> productQuantities = new HashMap<>();
        for (OrderItemRequest itemReq : request.getItems()) {
            productQuantities.put(
                    itemReq.getProductId(),
                    productQuantities.getOrDefault(itemReq.getProductId(), 0) + itemReq.getQuantity()
            );
        }

        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> items = new ArrayList<>();

        for (Map.Entry<Long, Integer> entry : productQuantities.entrySet()) {
            Long productId = entry.getKey();
            Integer quantity = entry.getValue();

            ProductResponse product = getProduct(productId);

            if (product.getQuantity() != null && product.getQuantity() < quantity) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName() +
                        ". Available: " + product.getQuantity() + ", Requested: " + quantity);
            }

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(quantity));
            total = total.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .quantity(quantity)
                    .unitPrice(product.getPrice())
                    .imageUrl(product.getImageUrl())
                    .build();

            items.add(orderItem);
        }

        Order order = Order.builder()
                .userId(request.getUserId())
                .totalAmount(total)
                .status(OrderStatus.PAYMENT_PENDING)
                .createdAt(LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .build();

        for (OrderItem item : items) {
            item.setOrder(order);
        }

        order.setItems(items);

        order = orderRepository.save(order);

        List<OrderItemEvent> itemEvents = items.stream()
                .map(item -> OrderItemEvent.builder()
                        .productId(item.getProductId())
                        .productName(item.getProductName())
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .build())
                .collect(Collectors.toList());

        OrderCreatedEvent event = OrderCreatedEvent.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .items(itemEvents)
                .build();

        rabbitTemplate.convertAndSend(
                "ecommerce.exchange",
                "order.created",
                event
        );

        return toResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));
        return toResponse(order);
    }

    public List<OrderResponse> getOrdersByUser(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse cancelOrder(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found: " + id));

        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());

        order = orderRepository.save(order);

        List<OrderItem> orderItems = order.getItems();
        if (orderItems == null || orderItems.isEmpty()) {
            orderItems = orderItemRepository.findByOrderId(order.getId());
        }

        for (OrderItem item : orderItems) {
            try {
                restTemplate.put(
                        productServiceUrl + "/api/products/" + item.getProductId() + "/increment-stock/" + item.getQuantity(),
                        null
                );
            } catch (Exception e) {
                System.err.println("Failed to increment stock for product " + item.getProductId() + ": " + e.getMessage());
            }
        }

        return toResponse(order);

    }

    public OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        order = orderRepository.save(order);
        return toResponse(order);
    }

    public void markCodAsPaid(Long orderId) {
        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        if ("CASH_ON_DELIVERY".equalsIgnoreCase(order.getPaymentMethod()) && order.getStatus() == OrderStatus.PAYMENT_PENDING) {
            order.setStatus(OrderStatus.PAID);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Order is not eligible to be marked as COD paid");
        }
    }


    private ProductResponse getProduct(Long productId) {

        try {
            return restTemplate.getForObject(
                    productServiceUrl + "/api/products/" + productId,
                    ProductResponse.class
            );
        } catch (Exception e) {
            throw new RuntimeException("Product not found: " + productId);
        }

    }

    private OrderResponse toResponse(Order order) {
        List<OrderItem> items = null;
        try {
            items = order.getItems();
            if (items != null) {
                items.size();
            }
        } catch (Exception e) {
            items = null;
        }

        if (items == null || items.isEmpty()) {
            if (order.getId() != null) {
                items = orderItemRepository.findByOrderId(order.getId());
            }
        }

        List<OrderItemResponse> itemResponses = items != null
                ? items.stream().map(this::toItemResponse).collect(Collectors.toList())
                : new ArrayList<>();

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .paymentMethod(order.getPaymentMethod())
                .items(itemResponses)
                .build();
    }

    private OrderItemResponse toItemResponse(OrderItem item) {

        return OrderItemResponse.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .imageUrl(item.getImageUrl())
                .build();

    }
}