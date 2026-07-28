package com.ecommerce.common.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.ecommerce.common.enums.InventoryStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryUpdatedEvent {

    private Long inventoryId;

    private Long productId;

    private Long orderId;

    private Integer availableStock;

    private Integer reservedStock;

    private InventoryStatus inventoryStatus;

    private LocalDateTime updatedAt;
}