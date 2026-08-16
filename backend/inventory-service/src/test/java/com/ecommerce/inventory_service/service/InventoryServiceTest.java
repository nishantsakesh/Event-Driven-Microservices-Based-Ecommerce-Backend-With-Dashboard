package com.ecommerce.inventory_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.common.events.OrderItemEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.messaging.EventPublisher;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private EventPublisher eventPublisher;

    @InjectMocks
    private InventoryService inventoryService;

    private PaymentSuccessEvent successEvent;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(inventoryService, "productServiceUrl", "http://localhost:8082");

        OrderItemEvent item = new OrderItemEvent(1L, "Sony Headphones", 2, BigDecimal.valueOf(29999));
        successEvent = PaymentSuccessEvent.builder()
                .paymentId(1L)
                .orderId(101L)
                .userId(1L)
                .amount(BigDecimal.valueOf(59998))
                .transactionId("TXN-123456")
                .items(List.of(item))
                .build();
    }

    @Test
    @DisplayName("Should reserve inventory and publish InventoryReservedEvent when stock is available")
    void testReserveInventory_Success() {
        doNothing().when(restTemplate).put(anyString(), any());
        when(inventoryRepository.save(any(Inventory.class))).thenAnswer(inv -> inv.getArgument(0));

        inventoryService.reserveInventory(successEvent);

        verify(restTemplate, times(1)).put(anyString(), any());
        verify(inventoryRepository, times(1)).save(any(Inventory.class));
        verify(eventPublisher, times(1)).publishInventoryReservedEvent(any(InventoryReservedEvent.class));
        verify(eventPublisher, never()).publishInventoryFailedEvent(any(InventoryFailedEvent.class));
    }

    @Test
    @DisplayName("Should publish InventoryFailedEvent when stock reduction fails")
    void testReserveInventory_Failure() {
        doThrow(new RuntimeException("Insufficient Stock")).when(restTemplate).put(anyString(), any());

        inventoryService.reserveInventory(successEvent);

        verify(eventPublisher, times(1)).publishInventoryFailedEvent(any(InventoryFailedEvent.class));
        verify(eventPublisher, never()).publishInventoryReservedEvent(any(InventoryReservedEvent.class));
    }
}
