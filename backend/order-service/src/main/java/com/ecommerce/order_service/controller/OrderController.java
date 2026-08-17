package com.ecommerce.order_service.controller;

import com.ecommerce.common.enums.OrderStatus;
import com.ecommerce.order_service.dto.OrderRequest;
import com.ecommerce.order_service.dto.OrderResponse;
import com.ecommerce.order_service.dto.OrderStatusUpdateRequest;
import com.ecommerce.order_service.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody OrderRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.getOrder(id)
        );

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getOrdersByUser(userId)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<OrderResponse> cancelOrder(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                orderService.cancelOrder(id)
        );

    }

    @PatchMapping("/{id}/mark-cod-paid")
    public ResponseEntity<String> markCodAsPaid(
            @PathVariable Long id) {

        orderService.markCodAsPaid(id);
        return ResponseEntity.ok("Order marked as PAID successfully");
    }

    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.POST})
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam(required = false) OrderStatus status,
            @RequestBody(required = false) OrderStatusUpdateRequest request) {

        OrderStatus finalStatus = status;
        if (finalStatus == null && request != null && request.getStatus() != null) {
            finalStatus = request.getStatus();
        }
        if (finalStatus == null) {
            throw new IllegalArgumentException("Status parameter is required");
        }

        OrderResponse updated = orderService.updateOrderStatus(id, finalStatus);
        return ResponseEntity.ok(updated);
    }

}