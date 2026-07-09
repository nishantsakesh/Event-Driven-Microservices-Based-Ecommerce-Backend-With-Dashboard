package com.ecommerce.order_service.entity;

public enum OrderStatus {
    CREATED,
    INVENTORY_RESERVED,
    PAYMENT_COMPLETED,
    ORDER_CONFIRMED,
    PAYMENT_FAILED,
    CANCELLED
}
