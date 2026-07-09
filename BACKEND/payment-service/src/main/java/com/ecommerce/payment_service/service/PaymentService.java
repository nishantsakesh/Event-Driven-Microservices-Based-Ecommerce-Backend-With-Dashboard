package com.ecommerce.payment_service.service;

import com.ecommerce.payment_service.dto.OrderSummary;
import com.ecommerce.payment_service.dto.PaymentRequest;
import com.ecommerce.payment_service.dto.PaymentResponse;
import com.ecommerce.payment_service.entity.Payment;
import com.ecommerce.payment_service.entity.PaymentStatus;
import com.ecommerce.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final RestTemplate restTemplate;

    @Value("${order.service.url}")
    private String orderServiceUrl;

    public PaymentResponse createPayment(PaymentRequest request) {

        OrderSummary order = getOrder(request.getOrderId());

        if (!order.getStatus().equals("INVENTORY_RESERVED")) {
            throw new RuntimeException(
                    "Order is not ready for payment."
            );
        }

        LocalDateTime now = LocalDateTime.now();

        Payment payment = Payment.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .amount(order.getTotalAmount())
                .paymentMethod(request.getPaymentMethod())
                .status(PaymentStatus.PENDING)
                .transactionId(generateTransactionId())
                .createdAt(now)
                .updatedAt(now)
                .build();

        paymentRepository.save(payment);

        try {

            /*
             * Mock Payment Gateway
             *
             * Currently every payment succeeds.
             *
             * Later this block can call:
             * Razorpay
             * Stripe
             * PhonePe
             * PayPal
             */

            payment.setStatus(PaymentStatus.SUCCESS);

            restTemplate.postForObject(

                    orderServiceUrl
                            + "/api/orders/"
                            + payment.getOrderId()
                            + "/payment-success",

                    null,

                    Object.class

            );

        } catch (Exception ex) {

            payment.setStatus(PaymentStatus.FAILED);

            restTemplate.postForObject(

                    orderServiceUrl
                            + "/api/orders/"
                            + payment.getOrderId()
                            + "/payment-failed",

                    null,

                    Object.class

            );

        }

        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        return toResponse(payment);

    }

    public PaymentResponse getPayment(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found."));

        return toResponse(payment);

    }

    public List<PaymentResponse> getAllPayments() {

        return paymentRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public List<PaymentResponse> getPaymentsByUser(Long userId) {

        return paymentRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public PaymentResponse getPaymentByOrderId(Long orderId) {

        Payment payment = paymentRepository
                .findByOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment not found for order."
                        ));

        return toResponse(payment);

    }

    public PaymentResponse refundPayment(Long paymentId) {

        Payment payment = paymentRepository
                .findById(paymentId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found."));

        if (payment.getStatus() != PaymentStatus.SUCCESS) {

            throw new RuntimeException(
                    "Only successful payments can be refunded."
            );

        }

        payment.setStatus(PaymentStatus.REFUNDED);
        payment.setUpdatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        return toResponse(payment);

    }

    private OrderSummary getOrder(Long orderId) {

        OrderSummary order =
                restTemplate.getForObject(
                        orderServiceUrl + "/api/orders/" + orderId,
                        OrderSummary.class
                );

        System.out.println("=================================");
        System.out.println("Order received from Order Service");
        System.out.println("ID      : " + order.getId());
        System.out.println("USER ID : " + order.getUserId());
        System.out.println("AMOUNT  : " + order.getTotalAmount());
        System.out.println("STATUS  : " + order.getStatus());
        System.out.println("=================================");

        if (order == null) {
            throw new RuntimeException("Order not found.");
        }

        return order;
    }

    private String generateTransactionId() {

        return "TXN-"
                + System.currentTimeMillis();

    }

    private PaymentResponse toResponse(Payment payment) {

        return PaymentResponse.builder()

                .id(payment.getId())

                .orderId(payment.getOrderId())

                .userId(payment.getUserId())

                .amount(payment.getAmount())

                .paymentMethod(payment.getPaymentMethod())

                .status(payment.getStatus().name())

                .transactionId(payment.getTransactionId())

                .createdAt(payment.getCreatedAt())

                .updatedAt(payment.getUpdatedAt())

                .build();

    }

}
