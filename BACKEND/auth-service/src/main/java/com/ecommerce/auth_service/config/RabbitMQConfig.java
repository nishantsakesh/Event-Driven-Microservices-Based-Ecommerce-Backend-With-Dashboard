package com.ecommerce.auth_service.config;

import com.ecommerce.common.constants.RabbitMQConstants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(RabbitMQConstants.EXCHANGE);
    }

    @Bean
    public Queue paymentQueue() {
        return new Queue(RabbitMQConstants.PAYMENT_QUEUE, true);
    }

    @Bean
    public Queue inventoryQueue() {
        return new Queue(RabbitMQConstants.INVENTORY_QUEUE, true);
    }

    @Bean
    public Queue notificationQueue() {
        return new Queue(RabbitMQConstants.NOTIFICATION_QUEUE, true);
    }

    @Bean
    public Binding paymentBinding(Queue paymentQueue,
                                  TopicExchange exchange) {
        return BindingBuilder
                .bind(paymentQueue)
                .to(exchange)
                .with(RabbitMQConstants.ORDER_CREATED);
    }

    @Bean
    public Binding inventorySuccessBinding(Queue inventoryQueue,
                                           TopicExchange exchange) {
        return BindingBuilder
                .bind(inventoryQueue)
                .to(exchange)
                .with(RabbitMQConstants.PAYMENT_SUCCESS);
    }

    @Bean
    public Binding inventoryFailureBinding(Queue inventoryQueue,
                                           TopicExchange exchange) {
        return BindingBuilder
                .bind(inventoryQueue)
                .to(exchange)
                .with(RabbitMQConstants.PAYMENT_FAILED);
    }

    @Bean
    public Binding notificationOrderBinding(Queue notificationQueue,
                                            TopicExchange exchange) {
        return BindingBuilder
                .bind(notificationQueue)
                .to(exchange)
                .with(RabbitMQConstants.ORDER_CREATED);
    }

    @Bean
    public Binding notificationSuccessBinding(Queue notificationQueue,
                                              TopicExchange exchange) {
        return BindingBuilder
                .bind(notificationQueue)
                .to(exchange)
                .with(RabbitMQConstants.PAYMENT_SUCCESS);
    }

    @Bean
    public Binding notificationFailureBinding(Queue notificationQueue,
                                              TopicExchange exchange) {
        return BindingBuilder
                .bind(notificationQueue)
                .to(exchange)
                .with(RabbitMQConstants.PAYMENT_FAILED);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
