package com.ecommerce.payment_service.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderSummary {

    private Long id;

    private Long userId;

    private BigDecimal totalAmount;

    private String status;

}