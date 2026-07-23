package com.ecommerce.common.events;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.ecommerce.common.enums.PaymentStatus;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentSuccessEvent {

    private Long paymentId;

    private Long orderId;

    private Long userId;

    private List<OrderItemEvent> items;

    private BigDecimal amount;

    private String transactionId;

    private String paymentMethod;

    private PaymentStatus paymentStatus;

    private LocalDateTime paidAt;
}