package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.dto.ProductRequest;
import com.ecommerce.product_service.dto.ProductResponse;
import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addProduct(
            @Valid @RequestBody ProductRequest request) {

        Product saved = productService.addProduct(request);

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("_id", saved.getId() != null ? saved.getId().toString() : "");
        data.put("name", saved.getName());
        data.put("brand", saved.getBrand());
        data.put("category", saved.getCategory() != null ? saved.getCategory().name().toLowerCase() : "");
        data.put("price", saved.getPrice());
        data.put("stockQuantity", saved.getQuantity());
        data.put("imageUrl", saved.getImageUrl());
        data.put("description", saved.getDescription());
        data.put("features", saved.getFeatures() != null ? saved.getFeatures() : new ArrayList<>());
        data.put("highlights", saved.getHighlights() != null ? saved.getHighlights() : new ArrayList<>());
        data.put("whatsInTheBox", saved.getWhatsInTheBox() != null ? saved.getWhatsInTheBox() : new ArrayList<>());

        data.put("technicalSpecifications", saved.getTechnicalSpecifications() != null ? saved.getTechnicalSpecifications() : new ArrayList<>());
        data.put("createdAt", saved.getCreatedAt());
        data.put("updatedAt", saved.getUpdatedAt());
        data.put("__v", 0);

        Map<String, Object> responseBody = new LinkedHashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "Product created successfully");
        responseBody.put("data", data);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseBody);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category) {

        return ResponseEntity.ok(
                productService.getAllProducts(search, category)
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.deleteProduct(id)
        );

    }

    
    @PutMapping("/{id}/reduce-stock/{quantity}")
    public ResponseEntity<Product> reduceStock(
            @PathVariable Long id,
            @PathVariable Integer quantity) {

        return ResponseEntity.ok(
                productService.reduceStock(id, quantity)
        );

    }

}