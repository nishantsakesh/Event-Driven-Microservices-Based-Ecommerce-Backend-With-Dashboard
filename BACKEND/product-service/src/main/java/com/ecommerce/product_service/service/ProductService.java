package com.ecommerce.product_service.service;

import com.ecommerce.product_service.dto.ProductRequest;
import com.ecommerce.product_service.dto.ProductResponse;
import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public ProductResponse addProduct(ProductRequest request) {

        Product product = Product.builder()
                .name(request.getName())
                .brand(request.getBrand())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Product saved = productRepository.save(product);

        return ProductResponse.builder()
                .id(saved.getId())
                .name(saved.getName())
                .brand(saved.getBrand())
                .category(saved.getCategory())
                .price(saved.getPrice())
                .quantity(saved.getQuantity())
                .description(saved.getDescription())
                .imageUrl(saved.getImageUrl())
                .build();
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product Not Found"));

    }

    public String deleteProduct(Long id) {

        productRepository.deleteById(id);

        return "Product Deleted Successfully";

    }

    public Product updateProduct(Long id,
                                 ProductRequest request) {

        Product product = getProductById(id);

        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setImageUrl(request.getImageUrl());
        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);

    }

    
    public Product reduceStock(Long productId,
                               Integer quantity) {

        Product product = getProductById(productId);

        if (product.getQuantity() < quantity) {

            throw new RuntimeException(
                    "Insufficient Stock"
            );

        }

        product.setQuantity(
                product.getQuantity() - quantity
        );

        product.setUpdatedAt(LocalDateTime.now());

        return productRepository.save(product);

    }

}