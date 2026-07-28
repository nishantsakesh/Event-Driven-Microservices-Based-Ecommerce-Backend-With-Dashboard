package com.ecommerce.notification_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;

public interface NotificationService {

    void sendSuccessNotification(
            InventoryReservedEvent event);

    void sendFailureNotification(
            InventoryFailedEvent event);

}