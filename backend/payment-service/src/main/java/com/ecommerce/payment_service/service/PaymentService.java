package com.ecommerce.payment_service.service;

import com.ecommerce.common.enums.PaymentStatus;
import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.common.events.PaymentFailedEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import com.ecommerce.payment_service.entity.Payment;
import com.ecommerce.payment_service.messaging.EventPublisher;
import com.ecommerce.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private static final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;
    private final EventPublisher eventPublisher;
    private final Random random = new Random();

    public void processPayment(OrderCreatedEvent event) {
        log.info("Processing payment for Order #{} (UserId: {}, Amount: {})", 
                event.getOrderId(), event.getUserId(), event.getTotalAmount());

        // Idempotency check to prevent duplicate charges
        if (paymentRepository.findByOrderId(event.getOrderId()).isPresent()) {
            log.info("Payment already processed for Order #{} - skipping.", event.getOrderId());
            return;
        }

        // Simulated payment gateway: 10% simulated decline rate for saga testing
        boolean simulateFailure = random.nextInt(10) == 0;

        if (simulateFailure) {
            Payment payment = Payment.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod(event.getPaymentMethod() != null ? event.getPaymentMethod() : "CARD")
                    .status(com.ecommerce.payment_service.entity.PaymentStatus.FAILED)
                    .transactionId(generateTransactionId())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            paymentRepository.save(payment);

            PaymentFailedEvent failedEvent = PaymentFailedEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod(event.getPaymentMethod() != null ? event.getPaymentMethod() : "CARD")
                    .reason("Payment declined - insufficient funds (simulated)")
                    .paymentStatus(PaymentStatus.FAILED)
                    .failedAt(LocalDateTime.now())
                    .items(event.getItems())
                    .build();

            eventPublisher.publishPaymentFailed(failedEvent);
            log.warn("Payment failed for Order #{} (Simulated decline)", event.getOrderId());
            return;
        }

        try {
            Payment payment = Payment.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod(event.getPaymentMethod() != null ? event.getPaymentMethod() : "CARD")
                    .status(com.ecommerce.payment_service.entity.PaymentStatus.SUCCESS)
                    .transactionId(generateTransactionId())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            payment = paymentRepository.save(payment);

            PaymentSuccessEvent successEvent = PaymentSuccessEvent.builder()
                    .paymentId(payment.getId())
                    .orderId(payment.getOrderId())
                    .userId(payment.getUserId())
                    .amount(payment.getAmount())
                    .transactionId(payment.getTransactionId())
                    .paymentMethod(payment.getPaymentMethod())
                    .paymentStatus(PaymentStatus.SUCCESS)
                    .paidAt(LocalDateTime.now())
                    .items(event.getItems())
                    .build();

            eventPublisher.publishPaymentSuccess(successEvent);
            log.info("Payment succeeded for Order #{} (PaymentId: {})", event.getOrderId(), payment.getId());

        } catch (Exception ex) {
            PaymentFailedEvent failedEvent = PaymentFailedEvent.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod(event.getPaymentMethod() != null ? event.getPaymentMethod() : "CARD")
                    .reason(ex.getMessage())
                    .paymentStatus(PaymentStatus.FAILED)
                    .failedAt(LocalDateTime.now())
                    .items(event.getItems())
                    .build();

            eventPublisher.publishPaymentFailed(failedEvent);
            log.error("Payment processing error for Order #{}: {}", event.getOrderId(), ex.getMessage());
        }
    }

    /**
     * Compensating transaction: refunds payment if inventory reservation fails downstream.
     */
    public void handleInventoryFailed(InventoryFailedEvent event) {
        log.info("Handling inventory failure compensation for Order #{}", event.getOrderId());

        Payment payment = paymentRepository.findByOrderId(event.getOrderId()).orElse(null);
        if (payment != null) {
            payment.setStatus(com.ecommerce.payment_service.entity.PaymentStatus.REFUNDED);
            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);
            log.info("Payment refunded for Order #{}", event.getOrderId());
        } else {
            log.warn("No payment record found to refund for Order #{}", event.getOrderId());
        }
    }

    private String generateTransactionId() {
        return "TXN-" + System.currentTimeMillis();
    }
}