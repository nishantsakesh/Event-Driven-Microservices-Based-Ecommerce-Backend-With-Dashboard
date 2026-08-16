package com.ecommerce.inventory_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryListener {

    private static final Logger log = LoggerFactory.getLogger(InventoryListener.class);
    private final InventoryService inventoryService;

    @RabbitListener(queues = RabbitMQConstants.INVENTORY_QUEUE)
    public void receivePaymentSuccessEvent(PaymentSuccessEvent event) {
        log.info("Received PaymentSuccessEvent for Order #{} - Triggering stock reservation", event.getOrderId());
        inventoryService.reserveInventory(event);
    }
}