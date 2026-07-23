package com.ecommerce.common.events;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryFailedEvent {

    private Long orderId;

    private Long userId;

    private List<OrderItemEvent> items;

    private String reason;

    private LocalDateTime failedAt;

}