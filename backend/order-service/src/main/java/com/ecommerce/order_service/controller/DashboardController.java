package com.ecommerce.order_service.controller;

import com.ecommerce.order_service.dto.DashboardStatsResponse;
import com.ecommerce.order_service.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * PHASE 3.1 — Dashboard Controller
 * Exposes GET /api/orders/dashboard/stats
 * The frontend Admin Dashboard calls this single endpoint to get all KPIs,
 * charts, and table data in one response — no client-side aggregation needed.
 */
@RestController
@RequestMapping("/api/orders/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Returns all dashboard statistics in one aggregated response.
     * Includes: totalOrders, totalRevenue, totalProducts, totalUsers,
     * revenueByDate, orderStatusDistribution, paymentMethodData,
     * topProducts, recentOrders.
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }
}
