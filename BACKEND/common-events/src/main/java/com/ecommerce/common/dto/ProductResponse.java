package com.ecommerce.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String brand;
    private String category; // Kept as String to avoid pulling ProductCategory enum into common-events
    private BigDecimal price;
    private Integer quantity;
    private String description;
    private String imageUrl;
    private List<String> features;
    private Map<String, String> specifications;
    private List<String> whatsInTheBox;
    private List<String> highlights;
}
