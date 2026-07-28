package com.ecommerce.notification_service.messaging;

import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.notification_service.config.RabbitMQConfig;
import com.ecommerce.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationListener {

    private final NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.SUCCESS_QUEUE)
    public void receiveReservedEvent(InventoryReservedEvent event) {

        System.out.println("--------------------------------");
        System.out.println("INVENTORY RESERVED EVENT RECEIVED");
        System.out.println("--------------------------------");

        notificationService.sendSuccessNotification(event);
    }
}