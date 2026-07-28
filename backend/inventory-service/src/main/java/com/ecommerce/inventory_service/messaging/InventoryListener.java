package com.ecommerce.inventory_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class InventoryListener {

    private final InventoryService inventoryService;

    @RabbitListener(queues = RabbitMQConstants.INVENTORY_QUEUE)
    public void receivePaymentSuccessEvent(
            PaymentSuccessEvent event) {

        System.out.println("--------------------------------");
        System.out.println("PAYMENT SUCCESS EVENT RECEIVED");
        System.out.println("--------------------------------");

        inventoryService.reserveInventory(event);

    }

}