package com.ecommerce.inventory_service.entity;
import jakarta.validation.constraints.PositiveOrZero;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long productId;

    @Column(nullable = false)
    private Integer availableStock;

    @Column(nullable = false)
    @PositiveOrZero
    private Integer reservedStock;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}