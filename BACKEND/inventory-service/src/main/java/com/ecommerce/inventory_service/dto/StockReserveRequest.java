package com.ecommerce.inventory_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class StockReserveRequest {

    @NotNull
    private Long productId;

    @NotNull
    @Positive
    private Integer quantity;
}
