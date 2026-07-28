package com.ecommerce.inventory_service.repository;

import com.ecommerce.inventory_service.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {

    java.util.List<Inventory> findByOrderId(Long orderId);
    java.util.List<Inventory> findByProductId(Long productId);

}