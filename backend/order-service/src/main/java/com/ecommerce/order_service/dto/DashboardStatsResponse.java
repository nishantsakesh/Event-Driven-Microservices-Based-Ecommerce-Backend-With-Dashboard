package com.ecommerce.order_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private long totalUsers;

    private List<Map<String, Object>> revenueByDate;
    private List<Map<String, Object>> orderStatusDistribution;
    private List<Map<String, Object>> paymentMethodData;

    private List<Map<String, Object>> topProducts;
    private List<Map<String, Object>> recentOrders;
}
