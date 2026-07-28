package com.ecommerce.payment_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@RabbitListener(queues = RabbitMQConstants.PAYMENT_QUEUE)
public class PaymentListener {

    private final PaymentService paymentService;

    @RabbitHandler
    public void consumeOrderCreatedEvent(OrderCreatedEvent event) {

        System.out.println("=================================");
        System.out.println("ORDER RECEIVED");
        System.out.println(event);
        System.out.println("=================================");

        paymentService.processPayment(event);

    }

    @RabbitHandler
    public void consumeInventoryFailedEvent(InventoryFailedEvent event) {

        System.out.println("=================================");
        System.out.println("INVENTORY FAILED EVENT RECEIVED");
        System.out.println(event);
        System.out.println("=================================");

        paymentService.handleInventoryFailed(event);

    }

}