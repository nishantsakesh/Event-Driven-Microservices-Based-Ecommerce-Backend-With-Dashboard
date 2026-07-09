package com.ecommerce.inventory_service.service;

import com.ecommerce.inventory_service.dto.InventoryRequest;
import com.ecommerce.inventory_service.dto.InventoryResponse;
import com.ecommerce.inventory_service.dto.StockUpdateRequest;
import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public List<InventoryResponse> getAllInventory() {

        return inventoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public InventoryResponse getByProductId(Long productId) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        return toResponse(inventory);

    }

    public InventoryResponse createInventory(InventoryRequest request) {

        if (inventoryRepository.existsByProductId(request.getProductId())) {
            throw new RuntimeException("Inventory already exists for this product.");
        }

        LocalDateTime now = LocalDateTime.now();

        Inventory inventory = Inventory.builder()
                .productId(request.getProductId())
                .availableStock(request.getAvailableStock())
                .reservedStock(0)
                .createdAt(now)
                .updatedAt(now)
                .build();

        return toResponse(
                inventoryRepository.save(inventory)
        );

    }

    public InventoryResponse updateStock(Long productId,
                                         StockUpdateRequest request) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        inventory.setAvailableStock(request.getAvailableStock());
        inventory.setUpdatedAt(LocalDateTime.now());

        return toResponse(
                inventoryRepository.save(inventory)
        );

    }

    public InventoryResponse reserveStock(Long productId,
                                          int quantity) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        if (inventory.getAvailableStock() < quantity) {
            throw new RuntimeException("Insufficient available stock.");
        }

        inventory.setAvailableStock(
                inventory.getAvailableStock() - quantity
        );

        inventory.setReservedStock(
                inventory.getReservedStock() + quantity
        );

        inventory.setUpdatedAt(LocalDateTime.now());

        return toResponse(
                inventoryRepository.save(inventory)
        );

    }

    public InventoryResponse releaseStock(Long productId,
                                          int quantity) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        if (inventory.getReservedStock() < quantity) {
            throw new RuntimeException("Reserved stock is insufficient.");
        }

        inventory.setAvailableStock(
                inventory.getAvailableStock() + quantity
        );

        inventory.setReservedStock(
                inventory.getReservedStock() - quantity
        );

        inventory.setUpdatedAt(LocalDateTime.now());

        return toResponse(
                inventoryRepository.save(inventory)
        );

    }

    public InventoryResponse confirmStock(Long productId,
                                          int quantity) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero.");
        }

        if (inventory.getReservedStock() < quantity) {
            throw new RuntimeException("Reserved stock is insufficient.");
        }

        inventory.setReservedStock(
                inventory.getReservedStock() - quantity
        );

        inventory.setUpdatedAt(LocalDateTime.now());

        return toResponse(
                inventoryRepository.save(inventory)
        );

    }

    public String deleteInventory(Long productId) {

        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found for product: " + productId));

        inventoryRepository.delete(inventory);

        return "Inventory deleted successfully.";

    }

    private InventoryResponse toResponse(Inventory inventory) {

        return InventoryResponse.builder()
                .id(inventory.getId())
                .productId(inventory.getProductId())
                .availableStock(inventory.getAvailableStock())
                .reservedStock(inventory.getReservedStock())
                .updatedAt(inventory.getUpdatedAt())
                .build();

    }

}