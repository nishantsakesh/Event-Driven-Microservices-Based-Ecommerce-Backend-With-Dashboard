package com.ecommerce.product_service.entity;

import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.Type;
import io.hypersistence.utils.hibernate.type.json.JsonType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

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

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> features;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    @JsonProperty("technicalSpecifications")
    private List<Map<String, String>> technicalSpecifications;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> whatsInTheBox;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private List<String> highlights;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}