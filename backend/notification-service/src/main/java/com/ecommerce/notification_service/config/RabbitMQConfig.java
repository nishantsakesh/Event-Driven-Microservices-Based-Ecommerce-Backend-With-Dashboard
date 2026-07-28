package com.ecommerce.notification_service.config;

import com.ecommerce.common.constants.RabbitMQConstants;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String SUCCESS_QUEUE = "notification.success.queue";
    public static final String FAILED_QUEUE = "notification.failed.queue";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(RabbitMQConstants.EXCHANGE);
    }

    @Bean
    public Queue successQueue() {
        return new Queue(SUCCESS_QUEUE, true);
    }

    @Bean
    public Queue failedQueue() {
        return new Queue(FAILED_QUEUE, true);
    }

    @Bean
    public Binding successBinding() {
        return BindingBuilder.bind(successQueue())
                .to(exchange())
                .with(RabbitMQConstants.INVENTORY_RESERVED);
    }

    @Bean
    public Binding failedBinding() {
        return BindingBuilder.bind(failedQueue())
                .to(exchange())
                .with(RabbitMQConstants.INVENTORY_FAILED);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory) {

        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }

}