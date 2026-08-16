package com.ecommerce.order_service.service;

import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.common.events.OrderCreatedEvent;
import com.ecommerce.order_service.dto.*;
import com.ecommerce.order_service.entity.Order;
import com.ecommerce.order_service.entity.OrderItem;
import com.ecommerce.order_service.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private RabbitTemplate rabbitTemplate;

    @InjectMocks
    private OrderService orderService;

    private Order sampleOrder;
    private ProductResponse sampleProduct;

    @BeforeEach
    void setUp() {
        sampleProduct = new ProductResponse();
        sampleProduct.setId(1L);
        sampleProduct.setName("Sony WH-1000XM5");
        sampleProduct.setPrice(BigDecimal.valueOf(29999));
        sampleProduct.setImageUrl("https://example.com/sony.jpg");

        sampleOrder = Order.builder()
                .id(100L)
                .userId(1L)
                .totalAmount(BigDecimal.valueOf(29999))
                .status(OrderStatus.PAYMENT_PENDING)
                .paymentMethod("CARD")
                .createdAt(LocalDateTime.now())
                .items(new ArrayList<>())
                .build();

        OrderItem item = OrderItem.builder()
                .id(1L)
                .productId(1L)
                .productName("Sony WH-1000XM5")
                .quantity(1)
                .unitPrice(BigDecimal.valueOf(29999))
                .order(sampleOrder)
                .build();
        sampleOrder.getItems().add(item);
    }

    @Test
    @DisplayName("Should successfully create order and publish OrderCreatedEvent to RabbitMQ")
    void testCreateOrder_Success() {
        OrderRequest request = new OrderRequest();
        request.setUserId(1L);
        request.setPaymentMethod("CARD");

        OrderItemRequest itemReq = new OrderItemRequest();
        itemReq.setProductId(1L);
        itemReq.setQuantity(1);
        request.setItems(List.of(itemReq));

        when(restTemplate.getForObject(anyString(), eq(ProductResponse.class))).thenReturn(sampleProduct);
        when(orderRepository.save(any(Order.class))).thenAnswer(inv -> {
            Order o = inv.getArgument(0);
            o.setId(100L);
            return o;
        });

        OrderResponse response = orderService.createOrder(request);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals(1L, response.getUserId());
        assertEquals(OrderStatus.PAYMENT_PENDING, response.getStatus());
        verify(rabbitTemplate, times(1)).convertAndSend(eq("ecommerce.exchange"), eq("order.created"), any(OrderCreatedEvent.class));
    }

    @Test
    @DisplayName("Should throw exception when creating order for non-existent product")
    void testCreateOrder_ProductNotFound() {
        OrderRequest request = new OrderRequest();
        request.setUserId(1L);
        request.setPaymentMethod("CARD");

        OrderItemRequest itemReq = new OrderItemRequest();
        itemReq.setProductId(999L);
        itemReq.setQuantity(1);
        request.setItems(List.of(itemReq));

        when(restTemplate.getForObject(anyString(), eq(ProductResponse.class))).thenThrow(new RuntimeException("Product not found"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> orderService.createOrder(request));
        assertTrue(exception.getMessage().contains("Product not found"));
        verify(rabbitTemplate, never()).convertAndSend(anyString(), anyString(), any(Object.class));
    }

    @Test
    @DisplayName("Should cancel order and update status to CANCELLED")
    void testCancelOrder_Success() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(sampleOrder));
        when(orderRepository.save(any(Order.class))).thenReturn(sampleOrder);

        OrderResponse cancelled = orderService.cancelOrder(100L);

        assertNotNull(cancelled);
        assertEquals(OrderStatus.CANCELLED, sampleOrder.getStatus());
        verify(orderRepository, times(1)).save(sampleOrder);
    }

    @Test
    @DisplayName("Should successfully mark COD order as PAID")
    void testMarkCodAsPaid_Success() {
        sampleOrder.setPaymentMethod("CASH_ON_DELIVERY");
        sampleOrder.setStatus(OrderStatus.PAYMENT_PENDING);

        when(orderRepository.findById(100L)).thenReturn(Optional.of(sampleOrder));

        orderService.markCodAsPaid(100L);

        assertEquals(OrderStatus.PAID, sampleOrder.getStatus());
        verify(orderRepository, times(1)).save(sampleOrder);
    }

    @Test
    @DisplayName("Should throw exception when marking non-COD or already paid order")
    void testMarkCodAsPaid_NotEligible() {
        sampleOrder.setPaymentMethod("CARD");
        sampleOrder.setStatus(OrderStatus.PAID);

        when(orderRepository.findById(100L)).thenReturn(Optional.of(sampleOrder));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> orderService.markCodAsPaid(100L));
        assertEquals("Order is not eligible to be marked as COD paid", exception.getMessage());
    }

    @Test
    @DisplayName("Should update order status correctly")
    void testUpdateOrderStatus() {
        when(orderRepository.findById(100L)).thenReturn(Optional.of(sampleOrder));

        orderService.updateOrderStatus(100L, OrderStatus.DELIVERED);

        assertEquals(OrderStatus.DELIVERED, sampleOrder.getStatus());
        verify(orderRepository, times(1)).save(sampleOrder);
    }
}
