package com.ecommerce.inventory_service.controller;
import com.ecommerce.inventory_service.dto.InventoryRequest;

import com.ecommerce.inventory_service.dto.InventoryResponse;
import com.ecommerce.inventory_service.dto.StockReserveRequest;
import com.ecommerce.inventory_service.dto.StockUpdateRequest;
import com.ecommerce.inventory_service.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<InventoryResponse> getByProductId(@PathVariable Long productId) {
        return ResponseEntity.ok(inventoryService.getByProductId(productId));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<InventoryResponse> updateStock(
            @PathVariable Long productId,
            @Valid @RequestBody StockUpdateRequest request) {
        return ResponseEntity.ok(inventoryService.updateStock(productId, request));
    }

    @PostMapping("/reserve")
    public ResponseEntity<InventoryResponse> reserveStock(@Valid @RequestBody StockReserveRequest request) {
        return ResponseEntity.ok(inventoryService.reserveStock(request.getProductId(), request.getQuantity()));
    }

    @PostMapping("/release")
    public ResponseEntity<InventoryResponse> releaseStock(@Valid @RequestBody StockReserveRequest request) {
        return ResponseEntity.ok(inventoryService.releaseStock(request.getProductId(), request.getQuantity()));
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> createInventory(
            @Valid @RequestBody InventoryRequest request) {

        return ResponseEntity.ok(
                inventoryService.createInventory(request)
        );

    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteInventory(
            @PathVariable Long productId) {

        return ResponseEntity.ok(
                inventoryService.deleteInventory(productId)
        );

    }

    @PostMapping("/confirm")
    public ResponseEntity<InventoryResponse> confirmStock(
            @Valid @RequestBody StockReserveRequest request) {

        return ResponseEntity.ok(

                inventoryService.confirmStock(

                        request.getProductId(),
                        request.getQuantity()

                )

        );

    }


}
