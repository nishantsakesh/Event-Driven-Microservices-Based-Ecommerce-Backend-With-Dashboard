package com.ecommerce.common.constants;

public final class RabbitMQConstants {

    private RabbitMQConstants() {
    }

    public static final String EXCHANGE = "ecommerce.exchange";

    public static final String PAYMENT_QUEUE = "payment.queue";
    public static final String INVENTORY_QUEUE = "inventory.queue";
    public static final String NOTIFICATION_QUEUE = "notification.queue";
    public static final String ORDER_STATUS_QUEUE = "order.status.queue";

    public static final String ORDER_CREATED = "order.created";
    public static final String PAYMENT_SUCCESS = "payment.success";
    public static final String PAYMENT_FAILED = "payment.failed";

    public static final String INVENTORY_RESERVED = "inventory.reserved";
    public static final String INVENTORY_FAILED = "inventory.failed";
}