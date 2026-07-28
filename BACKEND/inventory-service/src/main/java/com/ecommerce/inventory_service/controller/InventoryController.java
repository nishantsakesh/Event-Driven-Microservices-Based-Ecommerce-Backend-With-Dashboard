package com.ecommerce.inventory_service.controller;

import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryRepository inventoryRepository;

    @GetMapping
    public List<Inventory> getAllTransactions() {

        return inventoryRepository.findAll();

    }

    @GetMapping("/{id}")
    public Inventory getById(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @GetMapping("/order/{orderId}")
    public List<Inventory> getByOrderId(@PathVariable Long orderId) {
        return inventoryRepository.findByOrderId(orderId);
    }

    @GetMapping("/product/{productId}")
    public List<Inventory> getByProductId(@PathVariable Long productId) {
        return inventoryRepository.findByProductId(productId);
    }
}