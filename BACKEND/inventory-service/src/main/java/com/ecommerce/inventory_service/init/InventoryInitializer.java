package com.ecommerce.inventory_service.init;

import com.ecommerce.inventory_service.entity.Inventory;
import com.ecommerce.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class InventoryInitializer implements CommandLineRunner {

    private final InventoryRepository inventoryRepository;

    @Override
    public void run(String... args) {
        long[] productIds = {1, 2, 3, 4, 5};
        int[] stocks = {100, 50, 75, 200, 120};

        for (int i = 0; i < productIds.length; i++) {
            if (!inventoryRepository.existsByProductId(productIds[i])) {
                inventoryRepository.save(Inventory.builder()
                        .productId(productIds[i])
                        .availableStock(stocks[i])
                        .reservedStock(0)
                        .updatedAt(LocalDateTime.now())
                        .build());
            }
        }
    }
}
