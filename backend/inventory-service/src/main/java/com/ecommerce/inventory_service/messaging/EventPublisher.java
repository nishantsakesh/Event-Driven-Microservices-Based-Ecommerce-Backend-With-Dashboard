package com.ecommerce.inventory_service.messaging;

import com.ecommerce.common.constants.RabbitMQConstants;
import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publishInventoryReservedEvent(
            InventoryReservedEvent event) {

        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.INVENTORY_RESERVED,
                event
        );

        System.out.println("--------------------------------");
        System.out.println("INVENTORY RESERVED EVENT PUBLISHED");
        System.out.println("--------------------------------");
    }

    public void publishInventoryFailedEvent(
            InventoryFailedEvent event) {

        rabbitTemplate.convertAndSend(
                RabbitMQConstants.EXCHANGE,
                RabbitMQConstants.INVENTORY_FAILED,
                event
        );

        System.out.println("--------------------------------");
        System.out.println("INVENTORY FAILED EVENT PUBLISHED");
        System.out.println("--------------------------------");
    }

}