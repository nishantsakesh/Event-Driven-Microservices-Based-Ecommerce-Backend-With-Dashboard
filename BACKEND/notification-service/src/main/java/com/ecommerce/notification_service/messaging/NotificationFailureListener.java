package com.ecommerce.notification_service.messaging;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.notification_service.config.RabbitMQConfig;
import com.ecommerce.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationFailureListener {

    private final NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.FAILED_QUEUE)
    public void receiveFailedEvent(InventoryFailedEvent event) {

        System.out.println("--------------------------------");
        System.out.println("INVENTORY FAILED EVENT RECEIVED");
        System.out.println("--------------------------------");

        notificationService.sendFailureNotification(event);
    }
}