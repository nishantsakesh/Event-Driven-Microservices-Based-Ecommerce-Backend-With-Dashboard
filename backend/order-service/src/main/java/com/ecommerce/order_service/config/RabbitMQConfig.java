package com.ecommerce.order_service.config;

import com.ecommerce.common.constants.RabbitMQConstants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange ecommerceExchange() {
        return ExchangeBuilder
                .topicExchange(RabbitMQConstants.EXCHANGE)
                .durable(true)
                .build();
    }

    @Bean
    public Queue orderStatusQueue() {
        return QueueBuilder
                .durable(RabbitMQConstants.ORDER_STATUS_QUEUE)
                .build();
    }

    @Bean
    public Binding paymentSuccessBinding() {
        return BindingBuilder
                .bind(orderStatusQueue())
                .to(ecommerceExchange())
                .with(RabbitMQConstants.PAYMENT_SUCCESS);
    }

    @Bean
    public Binding paymentFailedBinding() {
        return BindingBuilder
                .bind(orderStatusQueue())
                .to(ecommerceExchange())
                .with(RabbitMQConstants.PAYMENT_FAILED);
    }

    @Bean
    public Binding inventoryReservedBinding() {
        return BindingBuilder
                .bind(orderStatusQueue())
                .to(ecommerceExchange())
                .with(RabbitMQConstants.INVENTORY_RESERVED);
    }

    @Bean
    public Binding inventoryFailedBinding() {
        return BindingBuilder
                .bind(orderStatusQueue())
                .to(ecommerceExchange())
                .with(RabbitMQConstants.INVENTORY_FAILED);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            MessageConverter converter) {

        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(converter);
        return rabbitTemplate;
    }

}