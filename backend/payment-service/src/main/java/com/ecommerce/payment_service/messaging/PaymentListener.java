package com.ecommerce.payment_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@RabbitListener(queues = RabbitMQConstants.PAYMENT_QUEUE)
public class PaymentListener {

    private static final Logger log = LoggerFactory.getLogger(PaymentListener.class);
    private final PaymentService paymentService;

    @RabbitHandler
    public void consumeOrderCreatedEvent(OrderCreatedEvent event) {
        log.info("Received OrderCreatedEvent for Order #{}", event.getOrderId());
        paymentService.processPayment(event);
    }

    @RabbitHandler
    public void consumeInventoryFailedEvent(InventoryFailedEvent event) {
        log.info("Received InventoryFailedEvent for Order #{}", event.getOrderId());
        paymentService.handleInventoryFailed(event);
    }
}