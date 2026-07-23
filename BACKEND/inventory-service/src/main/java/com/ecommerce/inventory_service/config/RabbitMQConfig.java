package com.ecommerce.inventory_service.config;

import com.ecommerce.common.constants.RabbitMQConstants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue inventoryQueue() {

        return new Queue(
                RabbitMQConstants.INVENTORY_QUEUE
        );

    }

    @Bean
    public TopicExchange exchange() {

        return new TopicExchange(
                RabbitMQConstants.EXCHANGE
        );

    }

    @Bean
    public Binding inventoryBinding(
            Queue inventoryQueue,
            TopicExchange exchange
    ) {

        return BindingBuilder
                .bind(inventoryQueue)
                .to(exchange)
                .with(RabbitMQConstants.PAYMENT_SUCCESS);

    }

    @Bean
    public MessageConverter messageConverter() {

        return new Jackson2JsonMessageConverter();

    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory
    ) {

        RabbitTemplate rabbitTemplate =
                new RabbitTemplate(connectionFactory);

        rabbitTemplate.setMessageConverter(
                messageConverter()
        );

        return rabbitTemplate;

    }

}