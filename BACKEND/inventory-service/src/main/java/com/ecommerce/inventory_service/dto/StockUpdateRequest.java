package com.ecommerce.inventory_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class StockUpdateRequest {

    @NotNull
    @PositiveOrZero(message = "Available stock cannot be negative")
    private Integer availableStock;

}