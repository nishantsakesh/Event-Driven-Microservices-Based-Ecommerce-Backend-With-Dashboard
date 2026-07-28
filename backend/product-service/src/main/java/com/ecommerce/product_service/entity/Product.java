package com.ecommerce.product_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String brand;

    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    private BigDecimal price;

    private Integer quantity;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 2000)
    private String imageUrl;

    @ElementCollection
    private List<String> features;

    @ElementCollection
    private Map<String, String> specifications;

    @ElementCollection
    private List<String> whatsInTheBox;

    @ElementCollection
    private List<String> highlights;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}