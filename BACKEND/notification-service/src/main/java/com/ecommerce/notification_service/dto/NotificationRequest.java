package com.ecommerce.notification_service.dto;

import com.ecommerce.notification_service.entity.NotificationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class NotificationRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Long orderId;

    @Email
    @NotBlank
    private String recipient;

    @NotBlank
    private String subject;

    @NotBlank
    private String message;

    @NotNull
    private NotificationType type;
}