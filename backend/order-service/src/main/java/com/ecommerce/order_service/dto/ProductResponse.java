package com.ecommerce.order_service.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
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