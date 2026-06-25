package com.ecommerce.product_service.dto;

import com.ecommerce.product_service.entity.ProductCategory;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {

    private String name;
    private String brand;
    private ProductCategory category;
    private BigDecimal price;
    private Integer quantity;
    private String description;
    private String imageUrl;

}