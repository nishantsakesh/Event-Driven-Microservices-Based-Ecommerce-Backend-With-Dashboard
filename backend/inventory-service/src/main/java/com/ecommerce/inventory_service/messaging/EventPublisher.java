package com.ecommerce.inventory_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
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

    public void publishInventoryReservedEvent(InventoryReservedEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.INVENTORY_RESERVED,
                event
        );
        log.info("Published InventoryReservedEvent for Order #{}", event.getOrderId());
    }

    public void publishInventoryFailedEvent(InventoryFailedEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.INVENTORY_FAILED,
                event
        );
        log.info("Published InventoryFailedEvent for Order #{}: {}", event.getOrderId(), event.getReason());
    }
}