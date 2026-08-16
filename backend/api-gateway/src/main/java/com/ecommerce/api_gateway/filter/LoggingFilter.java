package com.ecommerce.api_gateway.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * PHASE 2.3 — Centralized Logging Filter
 * Logs every inbound request and its response: Method, URI, Status, Latency.
 * Fulfills resume requirement: "API Gateway to handle routing, rate limiting, and centralized logging"
 */
@Component
@Order(1)
public class LoggingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        long startTime = System.currentTimeMillis();
        String clientIp = getClientIp(request);

        try {
            filterChain.doFilter(request, response);
        } finally {
            long latency = System.currentTimeMillis() - startTime;
            log.info("[GATEWAY] {} {} {} {}ms ip={}",
                    request.getMethod(),
                    request.getRequestURI(),
                    response.getStatus(),
                    latency,
                    clientIp);
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
