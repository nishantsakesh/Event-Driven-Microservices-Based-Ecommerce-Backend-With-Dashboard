package com.ecommerce.inventory_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InventoryResponse {

    private Long id;
    private Long productId;
    private Integer availableStock;
    private Integer reservedStock;
    private LocalDateTime updatedAt;
}
