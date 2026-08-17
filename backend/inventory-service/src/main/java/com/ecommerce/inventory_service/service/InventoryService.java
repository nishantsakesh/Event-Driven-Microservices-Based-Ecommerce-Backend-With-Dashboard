package com.ecommerce.inventory_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.common.events.OrderItemEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.entity.InventoryStatus;
import com.ecommerce.inventory_service.messaging.EventPublisher;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {

    private static final Logger log = LoggerFactory.getLogger(InventoryService.class);

    private final InventoryRepository inventoryRepository;
    private final RestTemplate restTemplate;
    private final EventPublisher eventPublisher;

    @Value("${product.service.url:http://localhost:8082}")
    private String productServiceUrl;

    public void reserveInventory(PaymentSuccessEvent event) {
        log.info("Processing inventory reservation for Order #{}", event.getOrderId());

        try {
            for (OrderItemEvent item : event.getItems()) {
                String url = productServiceUrl + "/api/products/" + item.getProductId() + "/reduce-stock/" + item.getQuantity();
                restTemplate.put(url, null);

                Inventory inventory = Inventory.builder()
                        .orderId(event.getOrderId())
                        .userId(event.getUserId())
                        .productId(item.getProductId())
                        .quantity(item.getQuantity())
                        .status(InventoryStatus.RESERVED)
                        .processedAt(LocalDateTime.now())
                        .build();

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