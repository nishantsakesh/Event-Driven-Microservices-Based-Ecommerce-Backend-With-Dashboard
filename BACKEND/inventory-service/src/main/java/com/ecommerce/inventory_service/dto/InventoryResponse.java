package com.ecommerce.inventory_service.dto;

import com.ecommerce.inventory_service.entity.InventoryStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryResponse {

    private Long id;

    private Long orderId;

    private Long userId;

    private Long productId;

    private Integer quantity;

    private InventoryStatus status;

    private LocalDateTime processedAt;

}