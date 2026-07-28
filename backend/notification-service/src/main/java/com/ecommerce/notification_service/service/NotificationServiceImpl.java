package com.ecommerce.notification_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.notification_service.entity.Notification;
import com.ecommerce.notification_service.entity.NotificationStatus;
import com.ecommerce.notification_service.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl
        implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public void sendSuccessNotification(
            InventoryReservedEvent event) {

        Notification notification =
                Notification.builder()
                        .orderId(event.getOrderId())
                        .userId(event.getUserId())
                        .message(
                                "Order "
                                        + event.getOrderId()
                                        + " confirmed successfully."
                        )
                        .status(NotificationStatus.SENT)
                        .sentAt(LocalDateTime.now())
                        .build();

        notificationRepository.save(notification);

        System.out.println("--------------------------------");
        System.out.println("SUCCESS NOTIFICATION SENT");
        System.out.println(notification.getMessage());
        System.out.println("--------------------------------");

    }

    @Override
    public void sendFailureNotification(
            InventoryFailedEvent event) {

        Notification notification =
                Notification.builder()
                        .orderId(event.getOrderId())
                        .userId(event.getUserId())
                        .message(
                                "Order "
                                        + event.getOrderId()
                                        + " failed : "
                                        + event.getReason()
                        )
                        .status(NotificationStatus.FAILED)
                        .sentAt(LocalDateTime.now())
                        .build();

        notificationRepository.save(notification);

        System.out.println("--------------------------------");
        System.out.println("FAILURE NOTIFICATION SENT");
        System.out.println(notification.getMessage());
        System.out.println("--------------------------------");

    }

}