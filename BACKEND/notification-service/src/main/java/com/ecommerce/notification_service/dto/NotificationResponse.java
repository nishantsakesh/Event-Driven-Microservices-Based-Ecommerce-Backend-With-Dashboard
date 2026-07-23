package com.ecommerce.notification_service.dto;

import com.ecommerce.notification_service.entity.NotificationStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;

    private Long orderId;

    private Long userId;

    private String message;

    private NotificationStatus status;

    private LocalDateTime sentAt;

}