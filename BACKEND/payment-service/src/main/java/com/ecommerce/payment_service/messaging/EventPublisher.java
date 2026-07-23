package com.ecommerce.payment_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.PaymentFailedEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishPaymentSuccess(PaymentSuccessEvent event) {

        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.PAYMENT_SUCCESS,
                event
        );

        System.out.println("=================================");
        System.out.println("PAYMENT SUCCESS EVENT PUBLISHED");
        System.out.println(event);
        System.out.println("=================================");

    }

    public void publishPaymentFailed(PaymentFailedEvent event) {

        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.PAYMENT_FAILED,
                event
        );

        System.out.println("=================================");
        System.out.println("PAYMENT FAILED EVENT PUBLISHED");
        System.out.println(event);
        System.out.println("=================================");

    }

}