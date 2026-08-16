package com.ecommerce.payment_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.PaymentFailedEvent;
import com.ecommerce.common.events.PaymentSuccessEvent;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    private static final Logger log = LoggerFactory.getLogger(EventPublisher.class);
    private final RabbitTemplate rabbitTemplate;

    public void publishPaymentSuccess(PaymentSuccessEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.PAYMENT_SUCCESS,
                event
        );
        log.info("Published PaymentSuccessEvent for Order #{}", event.getOrderId());
    }

    public void publishPaymentFailed(PaymentFailedEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.PAYMENT_FAILED,
                event
        );
        log.info("Published PaymentFailedEvent for Order #{}", event.getOrderId());
    }
}