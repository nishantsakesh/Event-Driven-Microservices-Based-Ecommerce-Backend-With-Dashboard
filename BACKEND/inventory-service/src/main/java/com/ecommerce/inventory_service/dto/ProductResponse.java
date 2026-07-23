package com.ecommerce.inventory_service.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String brand;

    private String category;

    private BigDecimal price;

    private Integer quantity;

    private String description;

    private String imageUrl;

}