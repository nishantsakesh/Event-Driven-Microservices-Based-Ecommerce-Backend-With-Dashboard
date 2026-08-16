package com.ecommerce.product_service.service;

import com.ecommerce.product_service.dto.ProductRequest;
import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.entity.ProductCategory;
import com.ecommerce.product_service.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product sampleProduct;

    @BeforeEach
    void setUp() {
        sampleProduct = Product.builder()
                .id(1L)
                .name("Sony WH-1000XM5")
                .brand("Sony")
                .category(ProductCategory.HEADPHONE)
                .price(BigDecimal.valueOf(29999))
                .quantity(50)
                .description("Industry leading noise cancelling headphones")
                .imageUrl("https://example.com/sony.jpg")
                .features(new ArrayList<>())
                .technicalSpecifications(new ArrayList<>())
                .whatsInTheBox(new ArrayList<>())
                .highlights(new ArrayList<>())
                .build();
    }

    @Test
    @DisplayName("Should successfully add a new product")
    void testAddProduct_Success() {
        ProductRequest request = new ProductRequest();
        request.setName("Sony WH-1000XM5");
        request.setBrand("Sony");
        request.setCategory(ProductCategory.HEADPHONE);
        request.setPrice(BigDecimal.valueOf(29999));
        request.setQuantity(50);
        request.setDescription("Industry leading noise cancelling headphones");
        request.setImageUrl("https://example.com/sony.jpg");

        when(productRepository.save(any(Product.class))).thenReturn(sampleProduct);

        Product created = productService.addProduct(request);

        assertNotNull(created);
        assertEquals("Sony WH-1000XM5", created.getName());
        assertEquals(50, created.getQuantity());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Should return product by ID when product exists")
    void testGetProductById_Found() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(sampleProduct));

        Product product = productService.getProductById(1L);

        assertNotNull(product);
        assertEquals(1L, product.getId());
        assertEquals("Sony WH-1000XM5", product.getName());
    }

    @Test
    @DisplayName("Should throw exception when product ID is not found")
    void testGetProductById_NotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> productService.getProductById(99L));
        assertEquals("Product Not Found", exception.getMessage());
    }

    @Test
    @DisplayName("Should reduce stock when sufficient quantity is available")
    void testReduceStock_Success() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(sampleProduct));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product updated = productService.reduceStock(1L, 5);

        assertNotNull(updated);
        assertEquals(45, updated.getQuantity());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Should throw exception when reducing stock beyond available quantity")
    void testReduceStock_Insufficient() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(sampleProduct));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> productService.reduceStock(1L, 100));
        assertEquals("Insufficient Stock", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    @DisplayName("Should increment stock successfully")
    void testIncrementStock_Success() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(sampleProduct));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Product updated = productService.incrementStock(1L, 10);

        assertNotNull(updated);
        assertEquals(60, updated.getQuantity());
    }

    @Test
    @DisplayName("Should filter products by search keyword and category")
    void testGetAllProductsWithSearchAndCategoryFilter() {
        Product earbud = Product.builder()
                .id(2L)
                .name("Apple AirPods Pro")
                .brand("Apple")
                .category(ProductCategory.EARBUDS)
                .price(BigDecimal.valueOf(24900))
                .quantity(30)
                .description("Active noise cancellation earbuds")
                .build();

        when(productRepository.findAll()).thenReturn(List.of(sampleProduct, earbud));

        List<Product> results = productService.getAllProducts("Sony", "HEADPHONE");

        assertEquals(1, results.size());
        assertEquals("Sony WH-1000XM5", results.get(0).getName());
    }
}
