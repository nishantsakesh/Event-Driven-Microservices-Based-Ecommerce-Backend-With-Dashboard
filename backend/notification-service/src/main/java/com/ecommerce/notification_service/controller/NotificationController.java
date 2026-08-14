package com.ecommerce.notification_service.controller;

import com.ecommerce.notification_service.entity.NewsletterSubscriber;
import com.ecommerce.notification_service.entity.Notification;
import com.ecommerce.notification_service.repository.NotificationRepository;
import com.ecommerce.notification_service.service.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final NotificationServiceImpl notificationService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<?> subscribeToNewsletter(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.trim().isEmpty() || !email.contains("@")) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "A valid email address is required."));
        }
        NewsletterSubscriber subscriber = notificationService.subscribeToNewsletter(email);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Welcome to the Inner Circle! You are now subscribed to AudioHub drops.",
                "subscriber", subscriber
        ));
    }

    @GetMapping("/newsletter/subscribers")
    public ResponseEntity<List<NewsletterSubscriber>> getSubscribers() {
        return ResponseEntity.ok(notificationService.getAllSubscribers());
    }

    @DeleteMapping("/newsletter/subscribers/{id}")
    public ResponseEntity<?> deleteSubscriber(@PathVariable Long id) {
        notificationService.deleteSubscriber(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Subscriber removed successfully."));
    }
}