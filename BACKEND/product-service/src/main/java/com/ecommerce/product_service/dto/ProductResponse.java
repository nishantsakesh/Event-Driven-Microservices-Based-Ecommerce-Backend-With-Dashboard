package com.ecommerce.product_service.dto;

import com.ecommerce.product_service.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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
    private List<String> features;
    private Map<String, String> specifications;
    private List<String> whatsInTheBox;
    private List<String> highlights;
}