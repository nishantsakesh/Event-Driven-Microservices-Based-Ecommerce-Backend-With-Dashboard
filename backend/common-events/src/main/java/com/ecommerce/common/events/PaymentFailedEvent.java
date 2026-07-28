package com.ecommerce.common.events;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import com.ecommerce.common.enums.PaymentStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentFailedEvent {

    private Long orderId;

    private Long userId;

    private List<OrderItemEvent> items;

    private BigDecimal amount;

    private String paymentMethod;

    private String reason;

    private PaymentStatus paymentStatus;

    private LocalDateTime failedAt;
}