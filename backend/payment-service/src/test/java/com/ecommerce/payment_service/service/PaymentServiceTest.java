package com.ecommerce.payment_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.payment_service.entity.Payment;
import com.ecommerce.payment_service.entity.PaymentStatus;
import com.ecommerce.payment_service.messaging.EventPublisher;
import com.ecommerce.payment_service.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private EventPublisher eventPublisher;

    @InjectMocks
    private PaymentService paymentService;

    private OrderCreatedEvent sampleEvent;
    private Payment samplePayment;

    @BeforeEach
    void setUp() {
        sampleEvent = OrderCreatedEvent.builder()
                .orderId(101L)
                .userId(1L)
                .totalAmount(BigDecimal.valueOf(14999))
                .paymentMethod("CARD")
                .items(new ArrayList<>())
                .build();

        samplePayment = Payment.builder()
                .id(1L)
                .orderId(101L)
                .userId(1L)
                .amount(BigDecimal.valueOf(14999))
                .paymentMethod("CARD")
                .status(PaymentStatus.SUCCESS)
                .transactionId("TXN-123456789")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("Should handle inventory failed event by refunding payment")
    void testHandleInventoryFailed_Refund() {
        InventoryFailedEvent event = InventoryFailedEvent.builder()
                .orderId(101L)
                .reason("Out of stock")
                .build();

        when(paymentRepository.findByOrderId(101L)).thenReturn(Optional.of(samplePayment));
        when(paymentRepository.save(any(Payment.class))).thenReturn(samplePayment);

        paymentService.handleInventoryFailed(event);

        assertEquals(PaymentStatus.REFUNDED, samplePayment.getStatus());
        verify(paymentRepository, times(1)).save(samplePayment);
    }

    @Test
    @DisplayName("Should gracefully handle inventory failed when payment record is not found")
    void testHandleInventoryFailed_PaymentNotFound() {
        InventoryFailedEvent event = InventoryFailedEvent.builder()
                .orderId(999L)
                .reason("Out of stock")
                .build();

        when(paymentRepository.findByOrderId(999L)).thenReturn(Optional.empty());

        assertDoesNotThrow(() -> paymentService.handleInventoryFailed(event));
        verify(paymentRepository, never()).save(any(Payment.class));
    }
}
