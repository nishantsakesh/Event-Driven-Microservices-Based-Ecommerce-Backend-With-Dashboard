package com.ecommerce.product_service.dto;

import com.ecommerce.product_service.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String brand;
    private ProductCategory category;
    private BigDecimal price;
    private Integer quantity;
    private String description;
    private String imageUrl;
}