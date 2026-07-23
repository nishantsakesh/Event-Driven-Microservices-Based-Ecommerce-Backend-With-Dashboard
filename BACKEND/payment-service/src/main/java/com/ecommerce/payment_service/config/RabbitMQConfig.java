package com.ecommerce.payment_service.config;

import com.ecommerce.common.constants.RabbitMQConstants;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public TopicExchange exchange() {

        return new TopicExchange(
                RabbitMQConstants.EXCHANGE
        );

    }

    @Bean
    public Queue paymentQueue() {

        return new Queue(
                RabbitMQConstants.PAYMENT_QUEUE,
                true
        );

    }

    @Bean
    public Binding paymentBinding(
            Queue paymentQueue,
            TopicExchange exchange) {

        return BindingBuilder
                .bind(paymentQueue)
                .to(exchange)
                .with(RabbitMQConstants.ORDER_CREATED);

    }

    @Bean
    public MessageConverter messageConverter() {

        return new Jackson2JsonMessageConverter();

    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            org.springframework.amqp.rabbit.connection.ConnectionFactory connectionFactory,
            MessageConverter messageConverter) {

        RabbitTemplate rabbitTemplate =
                new RabbitTemplate(connectionFactory);

        rabbitTemplate.setMessageConverter(
                messageConverter
        );

        return rabbitTemplate;

    }

}