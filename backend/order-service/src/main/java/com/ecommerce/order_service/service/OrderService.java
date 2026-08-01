package com.ecommerce.order_service.service;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.order_service.dto.OrderItemResponse;
import com.ecommerce.order_service.dto.OrderRequest;
import com.ecommerce.order_service.dto.OrderResponse;
import com.ecommerce.common.dto.ProductResponse;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItem;
import com.ecommerce.order_service.messaging.EventPublisher;
import com.ecommerce.order_service.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import com.ecommerce.common.events.OrderItemEvent;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate;
    private final EventPublisher eventPublisher;

    @Value("${product.service.url}")
    private String productServiceUrl;

    public OrderResponse createOrder(OrderRequest request) {

        LocalDateTime now = LocalDateTime.now();

        Order order = Order.builder()
                .userId(request.getUserId())
                .status(OrderStatus.PAYMENT_PENDING)
                .createdAt(now)
                .updatedAt(now)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        java.util.Map<Long, Integer> productQuantities = new java.util.HashMap<>();
        for (var itemReq : request.getItems()) {
            productQuantities.merge(itemReq.getProductId(), itemReq.getQuantity(), Integer::sum);
        }

        List<OrderItem> items = productQuantities.entrySet().stream()
                .map(entry -> {
                    ProductResponse product = getProduct(entry.getKey());
                    return OrderItem.builder()
                            .order(order)
                            .productId(product.getId())
                            .productName(product.getName())
                            .quantity(entry.getValue())
                            .unitPrice(product.getPrice())
                            .build();
                })
                .collect(Collectors.toList());

        for (OrderItem item : items) {

            totalAmount = totalAmount.add(

                    item.getUnitPrice().multiply(
                            BigDecimal.valueOf(item.getQuantity())
                    )

            );

        }

        order.setItems(items);
        order.setTotalAmount(totalAmount);

        orderRepository.save(order);

        publishOrderCreated(order);

        return toResponse(order);

    }

    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAllByOrderByCreatedAtDesc()
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

        Order order = orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        return toResponse(order);

    }

    public OrderResponse cancelOrder(Long id) {

        Order order = orderRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            return toResponse(order);
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

        return toResponse(order);

    }

    public void updateOrderStatus(Long orderId, OrderStatus newStatus) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found: " + orderId));

        order.setStatus(newStatus);
        order.setUpdatedAt(LocalDateTime.now());

        orderRepository.save(order);

    }


    private ProductResponse getProduct(Long productId) {

        ProductResponse product =
                restTemplate.getForObject(
                        productServiceUrl +
                                "/api/products/" +
                                productId,
                        ProductResponse.class
                );

        if (product == null) {

            throw new RuntimeException(
                    "Product not found : " + productId
            );

        }

        return product;

    }

    private void publishOrderCreated(Order order) {

        OrderCreatedEvent event =
                OrderCreatedEvent.builder()
                        .orderId(order.getId())
                        .userId(order.getUserId())
                        .totalAmount(order.getTotalAmount())
                        .orderStatus(order.getStatus())
                        .createdAt(order.getCreatedAt())
                        .items(

                                order.getItems()
                                        .stream()
                                        .map(item ->

                                                com.ecommerce.common.events.OrderItemEvent.builder()
                                                        .productId(item.getProductId())
                                                        .productName(item.getProductName())
                                                        .quantity(item.getQuantity())
                                                        .unitPrice(item.getUnitPrice())
                                                        .build()

                                        )
                                        .toList()

                        )
                        .build();

        eventPublisher.publish(
                RabbitMQConstants.ORDER_CREATED,
                event
        );

    }

    private OrderResponse toResponse(Order order) {

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
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