package com.ecommerce.common.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.ecommerce.common.enums.NotificationStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationSentEvent {

    private Long notificationId;

    private Long userId;

    private Long orderId;

    private String recipient;

    private String subject;

    private String notificationType;

    private NotificationStatus notificationStatus;

    private LocalDateTime sentAt;
}