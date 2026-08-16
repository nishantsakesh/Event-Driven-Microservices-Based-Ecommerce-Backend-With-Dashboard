package com.ecommerce.common.events;

import com.ecommerce.common.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreatedEvent {

    private Long orderId;

    private Long userId;

    private BigDecimal totalAmount;

    private OrderStatus orderStatus;

    private LocalDateTime createdAt;

    private List<OrderItemEvent> items;

    private String paymentMethod;

}