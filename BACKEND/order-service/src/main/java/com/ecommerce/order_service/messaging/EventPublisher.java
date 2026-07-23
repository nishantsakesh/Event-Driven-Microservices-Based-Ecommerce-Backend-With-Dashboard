package com.ecommerce.order_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(String routingKey, Object event) {

        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                routingKey,
                event
        );

        log.info("------------------------------------------------");
        log.info("EVENT PUBLISHED");
        log.info("Exchange : {}", RabbitMQConstants.EXCHANGE);
        log.info("Routing Key : {}", routingKey);
        log.info("Payload : {}", event);
        log.info("------------------------------------------------");

    }

}