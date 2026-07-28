package com.ecommerce.order_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import org.springframework.amqp.support.AmqpHeaders;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderStatusListener {

    private final OrderService orderService;

    @RabbitListener(queues = RabbitMQConstants.ORDER_STATUS_QUEUE)
    public void handleOrderStatusEvent(
            Map<String, Object> event,
            @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {

        Long orderId = extractLong(event.get("orderId"));

        if (orderId == null) {
            log.warn("Received order status event with no orderId: {}", event);
            return;
        }

        log.info("================================================");
        log.info("ORDER STATUS EVENT RECEIVED");
        log.info("Routing Key : {}", routingKey);
        log.info("Order ID    : {}", orderId);
        log.info("================================================");

        switch (routingKey) {
            case RabbitMQConstants.PAYMENT_SUCCESS -> {
                orderService.updateOrderStatus(orderId, OrderStatus.PAYMENT_COMPLETED);
                log.info("Order {} updated to PAYMENT_COMPLETED", orderId);
            }
            case RabbitMQConstants.PAYMENT_FAILED -> {
                orderService.updateOrderStatus(orderId, OrderStatus.PAYMENT_FAILED);
                log.info("Order {} updated to PAYMENT_FAILED", orderId);
            }
            case RabbitMQConstants.INVENTORY_RESERVED -> {
                orderService.updateOrderStatus(orderId, OrderStatus.PLACED);
                log.info("Order {} updated to PLACED", orderId);
            }
            case RabbitMQConstants.INVENTORY_FAILED -> {
                orderService.updateOrderStatus(orderId, OrderStatus.CANCELLED);
                log.info("Order {} updated to CANCELLED (inventory failed)", orderId);
            }
            default -> log.warn("Unknown routing key: {}", routingKey);
        }
    }

    private Long extractLong(Object value) {
        if (value == null) return null;
        if (value instanceof Number) return ((Number) value).longValue();
        try {
            return Long.parseLong(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
