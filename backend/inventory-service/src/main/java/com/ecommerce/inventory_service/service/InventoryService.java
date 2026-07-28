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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    private final RestTemplate restTemplate;

    private final EventPublisher eventPublisher;

    @Value("${product.service.url}")
    private String productServiceUrl;

    public void reserveInventory(
            PaymentSuccessEvent event) {

        try {

            for (OrderItemEvent item : event.getItems()) {

                String url =
                        productServiceUrl +
                                "/api/products/"
                                + item.getProductId()
                                + "/reduce-stock/"
                                + item.getQuantity();

                restTemplate.put(
                        url,
                        null
                );

                Inventory inventory =
                        Inventory.builder()
                                .orderId(event.getOrderId())
                                .userId(event.getUserId())
                                .productId(item.getProductId())
                                .quantity(item.getQuantity())
                                .status(InventoryStatus.RESERVED)
                                .processedAt(LocalDateTime.now())
                                .build();

                inventoryRepository.save(inventory);

            }

            InventoryReservedEvent reservedEvent =
                    InventoryReservedEvent.builder()
                            .orderId(event.getOrderId())
                            .userId(event.getUserId())
                            .items(event.getItems())
                            .reservedAt(LocalDateTime.now())
                            .build();

            eventPublisher.publishInventoryReservedEvent(
                    reservedEvent
            );

            System.out.println("--------------------------------");
            System.out.println("INVENTORY RESERVED");
            System.out.println("--------------------------------");

        }

        catch (Exception ex) {

            ex.printStackTrace();

            InventoryFailedEvent failedEvent =
                    InventoryFailedEvent.builder()
                            .orderId(event.getOrderId())
                            .userId(event.getUserId())
                            .items(event.getItems())
                            .reason(
                                    ex.getMessage() != null
                                            ? ex.getMessage()
                                            : ex.toString()
                            )
                            .failedAt(LocalDateTime.now())
                            .build();

            eventPublisher.publishInventoryFailedEvent(
                    failedEvent
            );

            System.out.println("--------------------------------");
            System.out.println("INVENTORY FAILED");
            System.out.println(ex.getMessage());
            System.out.println("--------------------------------");

        }

    }

}