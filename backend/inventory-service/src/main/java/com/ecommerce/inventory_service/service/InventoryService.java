package com.ecommerce.inventory_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.common.events.OrderItemEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.messaging.EventPublisher;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {

    private static final Logger log = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final EventPublisher eventPublisher;

    public void reserveInventory(PaymentSuccessEvent event) {
        log.info("Attempting to reserve inventory for Order #{}", event.getOrderId());

        try {
            // First pass: verify stock availability for all items
            for (OrderItemEvent item : event.getItems()) {
                Inventory inventory = inventoryRepository
                        .findByProductId(item.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found in inventory: " + item.getProductId()));

                if (inventory.getQuantity() < item.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for Product ID: " + item.getProductId()
                            + " (Requested: " + item.getQuantity() + ", Available: " + inventory.getQuantity() + ")");
                }
            }

            // Second pass: deduct stock
            for (OrderItemEvent item : event.getItems()) {
                Inventory inventory = inventoryRepository
                        .findByProductId(item.getProductId())
                        .get();

                inventory.setQuantity(inventory.getQuantity() - item.getQuantity());
                inventoryRepository.save(inventory);
            }

            InventoryReservedEvent reservedEvent = InventoryReservedEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .items(event.getItems())
                    .reservedAt(LocalDateTime.now())
                    .build();

            eventPublisher.publishInventoryReservedEvent(reservedEvent);
            log.info("Inventory successfully reserved for Order #{}", event.getOrderId());

        } catch (Exception ex) {
            log.error("Inventory reservation failed for Order #{}: {}", event.getOrderId(), ex.getMessage());

            InventoryFailedEvent failedEvent = InventoryFailedEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .items(event.getItems())
                    .reason(ex.getMessage() != null ? ex.getMessage() : ex.toString())
                    .failedAt(LocalDateTime.now())
                    .build();

            eventPublisher.publishInventoryFailedEvent(failedEvent);
        }
    }
}