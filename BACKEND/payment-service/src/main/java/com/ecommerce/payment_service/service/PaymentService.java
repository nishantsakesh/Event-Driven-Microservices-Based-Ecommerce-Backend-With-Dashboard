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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EventPublisher eventPublisher;
    private final Random random = new Random();

    public void processPayment(OrderCreatedEvent event) {

        System.out.println("=================================");
        System.out.println("PROCESSING PAYMENT");
        System.out.println("Order Id : " + event.getOrderId());
        System.out.println("User Id  : " + event.getUserId());
        System.out.println("Amount   : " + event.getTotalAmount());
        System.out.println("=================================");

        
        boolean simulateFailure = random.nextInt(10) == 0;
        
        if (simulateFailure) {
            Payment payment = Payment.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod("UPI")
                    .status(com.ecommerce.payment_service.entity.PaymentStatus.FAILED)
                    .transactionId(generateTransactionId())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            paymentRepository.save(payment);

            PaymentFailedEvent failedEvent =
                    PaymentFailedEvent.builder()
                            .orderId(event.getOrderId())
                            .userId(event.getUserId())
                            .amount(event.getTotalAmount())
                            .paymentMethod("UPI")
                            .reason("Payment declined - insufficient funds (simulated)")
                            .paymentStatus(PaymentStatus.FAILED)
                            .failedAt(LocalDateTime.now())
                            .items(event.getItems())
                            .build();

            eventPublisher.publishPaymentFailed(failedEvent);

            System.out.println("=================================");
            System.out.println("PAYMENT FAILED (SIMULATED 10%)");
            System.out.println("=================================");
            return;
        }

        try {

            Payment payment = Payment.builder()
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .paymentMethod("UPI")
                    .status(com.ecommerce.payment_service.entity.PaymentStatus.SUCCESS)
                    .transactionId(generateTransactionId())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            payment = paymentRepository.save(payment);

            PaymentSuccessEvent successEvent =
                    PaymentSuccessEvent.builder()
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

            System.out.println("=================================");
            System.out.println("PAYMENT SUCCESS");
            System.out.println(successEvent);
            System.out.println("=================================");

        }
        catch (Exception ex) {

            PaymentFailedEvent failedEvent =
                    PaymentFailedEvent.builder()
                            .orderId(event.getOrderId())
                            .userId(event.getUserId())
                            .amount(event.getTotalAmount())
                            .paymentMethod("UPI")
                            .reason(ex.getMessage())
                            .paymentStatus(PaymentStatus.FAILED)
                            .failedAt(LocalDateTime.now())
                            .items(event.getItems())
                            .build();

            eventPublisher.publishPaymentFailed(failedEvent);

            System.out.println("=================================");
            System.out.println("PAYMENT FAILED");
            System.out.println(failedEvent);
            System.out.println("=================================");
        }

    }

    public void handleInventoryFailed(InventoryFailedEvent event) {
        System.out.println("=================================");
        System.out.println("HANDLING INVENTORY FAILED FOR ORDER: " + event.getOrderId());
        System.out.println("=================================");

        Payment payment = paymentRepository.findByOrderId(event.getOrderId())
                .orElse(null);

        if (payment != null) {
            payment.setStatus(com.ecommerce.payment_service.entity.PaymentStatus.REFUNDED);
            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);
            System.out.println("Payment status updated to REFUNDED for orderId: " + event.getOrderId());
        } else {
            System.out.println("Payment record not found for orderId: " + event.getOrderId());
        }
    }

    private String generateTransactionId() {

        return "TXN-" + System.currentTimeMillis();

    }

}