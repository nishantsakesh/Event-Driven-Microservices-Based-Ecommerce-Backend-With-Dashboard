package com.ecommerce.notification_service.service;

import com.ecommerce.common.events.InventoryFailedEvent;
import com.ecommerce.common.events.InventoryReservedEvent;
import com.ecommerce.common.events.OrderItemEvent;
import com.ecommerce.notification_service.config.RabbitMQConfig;
import com.ecommerce.notification_service.entity.NewsletterSubscriber;
import com.ecommerce.notification_service.entity.Notification;
import com.ecommerce.notification_service.entity.NotificationStatus;
import com.ecommerce.notification_service.repository.NewsletterSubscriberRepository;
import com.ecommerce.notification_service.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;
    private final NewsletterSubscriberRepository subscriberRepository;
    private final EmailService emailService;
    private final RestTemplate restTemplate;

    @Value("${auth.service.url:http://auth-service:8081}")
    private String authServiceUrl;

    @Override
    @RabbitListener(queues = RabbitMQConfig.SUCCESS_QUEUE)
    public void sendSuccessNotification(InventoryReservedEvent event) {
        log.info("Processing InventoryReservedEvent for order #{}", event.getOrderId());

        String recipientName = "Valued Customer";
        String recipientEmail = "customer@audiohub.com";

        try {
            Map<?, ?> user = restTemplate.getForObject(authServiceUrl + "/api/auth/users/" + event.getUserId(), Map.class);
            if (user != null) {
                if (user.get("name") != null) {
                    recipientName = (String) user.get("name");
                }
                if (user.get("email") != null) {
                    recipientEmail = (String) user.get("email");
                }
            }
        } catch (Exception e) {
            log.warn("Could not fetch user details from auth-service for userId {}: {}", event.getUserId(), e.getMessage());
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        StringBuilder itemsSummary = new StringBuilder();
        if (event.getItems() != null && !event.getItems().isEmpty()) {
            for (OrderItemEvent item : event.getItems()) {
                BigDecimal itemTotal = item.getUnitPrice() != null && item.getQuantity() != null
                        ? item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                        : BigDecimal.ZERO;
                totalAmount = totalAmount.add(itemTotal);
                itemsSummary.append(item.getProductName())
                        .append(" (x").append(item.getQuantity()).append(") - ₹")
                        .append(itemTotal).append("; ");
            }
        }

        String invoiceSubject = "Tax Invoice & Order Confirmation - #" + event.getOrderId();
        String invoiceMessage = String.format("Invoice generated for %s (%s) for Order #%d. Total: ₹%s. Items: %s",
                recipientName, recipientEmail, event.getOrderId(), totalAmount, itemsSummary.toString());

        Notification notification = Notification.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .recipientName(recipientName)
                .recipientEmail(recipientEmail)
                .type("INVOICE")
                .subject(invoiceSubject)
                .message(invoiceMessage)
                .status(NotificationStatus.SENT)
                .sentAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
        log.info("Successfully recorded INVOICE notification for order #{} to {} ({})", event.getOrderId(), recipientName, recipientEmail);

        String htmlInvoice = buildHtmlInvoice(event, recipientName, recipientEmail, totalAmount);
        emailService.sendHtmlEmail(recipientEmail, invoiceSubject, htmlInvoice);
    }

    @Override
    @RabbitListener(queues = RabbitMQConfig.FAILED_QUEUE)
    public void sendFailureNotification(InventoryFailedEvent event) {
        log.info("Processing InventoryFailedEvent for order #{}", event.getOrderId());

        String recipientName = "Valued Customer";
        String recipientEmail = "customer@audiohub.com";

        try {
            Map<?, ?> user = restTemplate.getForObject(authServiceUrl + "/api/auth/users/" + event.getUserId(), Map.class);
            if (user != null) {
                if (user.get("name") != null) recipientName = (String) user.get("name");
                if (user.get("email") != null) recipientEmail = (String) user.get("email");
            }
        } catch (Exception e) {
            log.warn("Could not fetch user details for failure notification: {}", e.getMessage());
        }

        Notification notification = Notification.builder()
                .orderId(event.getOrderId())
                .userId(event.getUserId())
                .recipientName(recipientName)
                .recipientEmail(recipientEmail)
                .type("ORDER_FAILED")
                .subject("Order Processing Update - #" + event.getOrderId())
                .message("Order #" + event.getOrderId() + " encountered an issue: " + event.getReason())
                .status(NotificationStatus.FAILED)
                .sentAt(LocalDateTime.now())
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public NewsletterSubscriber subscribeToNewsletter(String email) {
        String trimmedEmail = email.trim().toLowerCase();
        return subscriberRepository.findByEmailIgnoreCase(trimmedEmail)
                .orElseGet(() -> {
                    NewsletterSubscriber newSubscriber = NewsletterSubscriber.builder()
                            .email(trimmedEmail)
                            .status("ACTIVE")
                            .subscribedAt(LocalDateTime.now())
                            .build();
                    NewsletterSubscriber saved = subscriberRepository.save(newSubscriber);
                    
                    // Send welcome email
                    emailService.sendEmail(
                            trimmedEmail,
                            "Welcome to the AudioHub Inner Circle!",
                            "Thank you for subscribing to AudioHub. You now have VIP access to limited-run audiophile drops, acoustic guides, and exclusive member discounts."
                    );
                    return saved;
                });
    }

    public List<NewsletterSubscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }

    public void deleteSubscriber(Long id) {
        subscriberRepository.deleteById(id);
    }

    private String buildHtmlInvoice(InventoryReservedEvent event, String recipientName, String recipientEmail, BigDecimal totalAmount) {
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMM dd, yyyy HH:mm"));
        StringBuilder itemsHtml = new StringBuilder();

        if (event.getItems() != null) {
            for (OrderItemEvent item : event.getItems()) {
                BigDecimal lineTotal = item.getUnitPrice() != null && item.getQuantity() != null
                        ? item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                        : BigDecimal.ZERO;
                itemsHtml.append("<tr>")
                        .append("<td style='padding: 12px; border-bottom: 1px solid #2d3748; color: #edf2f7;'>").append(item.getProductName()).append("</td>")
                        .append("<td style='padding: 12px; border-bottom: 1px solid #2d3748; text-align: center; color: #a0aec0;'>").append(item.getQuantity()).append("</td>")
                        .append("<td style='padding: 12px; border-bottom: 1px solid #2d3748; text-align: right; color: #edf2f7;'>₹").append(item.getUnitPrice()).append("</td>")
                        .append("<td style='padding: 12px; border-bottom: 1px solid #2d3748; text-align: right; font-weight: bold; color: #d4af37;'>₹").append(lineTotal).append("</td>")
                        .append("</tr>");
            }
        }

        return "<!DOCTYPE html>"
                + "<html>"
                + "<head><meta charset='UTF-8'></head>"
                + "<body style='margin:0; padding:20px; background-color:#0d0d0f; font-family:Arial, sans-serif; color:#edf2f7;'>"
                + "  <div style='max-width:600px; margin:0 auto; background-color:#16161a; border:1px solid #2d3748; border-radius:8px; overflow:hidden;'>"
                + "    <div style='background-color:#0d0d0f; padding:24px; border-bottom:1px solid #2d3748; text-align:center;'>"
                + "      <h1 style='margin:0; font-size:24px; color:#ffffff; letter-spacing:2px; text-transform:uppercase;'>AudioHub<span style='color:#d4af37;'>.</span></h1>"
                + "      <p style='margin:5px 0 0 0; font-size:12px; color:#a0aec0; letter-spacing:1px;'>OFFICIAL TAX INVOICE & ORDER CONFIRMATION</p>"
                + "    </div>"
                + "    <div style='padding:24px;'>"
                + "      <div style='display:flex; justify-content:space-between; margin-bottom:20px; font-size:13px; color:#a0aec0;'>"
                + "        <div><strong>Billed To:</strong><br><span style='color:#ffffff; font-size:15px;'>" + recipientName + "</span><br>" + recipientEmail + "</div>"
                + "        <div style='text-align:right;'><strong>Invoice #:</strong> INV-ORD-" + event.getOrderId() + "<br><strong>Date:</strong> " + dateStr + "<br><strong>Status:</strong> <span style='color:#48bb78;'>PAID / CONFIRMED</span></div>"
                + "      </div>"
                + "      <table style='width:100%; border-collapse:collapse; margin:20px 0; font-size:14px;'>"
                + "        <thead>"
                + "          <tr style='background-color:#202026; color:#a0aec0; text-transform:uppercase; font-size:11px; letter-spacing:1px;'>"
                + "            <th style='padding:10px 12px; text-align:left;'>Item</th>"
                + "            <th style='padding:10px 12px; text-align:center;'>Qty</th>"
                + "            <th style='padding:10px 12px; text-align:right;'>Price</th>"
                + "            <th style='padding:10px 12px; text-align:right;'>Total</th>"
                + "          </tr>"
                + "        </thead>"
                + "        <tbody>" + itemsHtml.toString() + "</tbody>"
                + "      </table>"
                + "      <div style='text-align:right; margin-top:20px; border-top:1px solid #2d3748; padding-top:16px;'>"
                + "        <p style='margin:4px 0; color:#a0aec0;'>Shipping: <span style='color:#48bb78;'>FREE VIP Delivery</span></p>"
                + "        <h2 style='margin:8px 0; color:#ffffff;'>Grand Total: <span style='color:#d4af37;'>₹" + totalAmount + "</span></h2>"
                + "      </div>"
                + "    </div>"
                + "    <div style='background-color:#0d0d0f; padding:16px; border-top:1px solid #2d3748; text-align:center; font-size:12px; color:#718096;'>"
                + "      Thank you for choosing AudioHub. For any inquiries, reply to this email or visit our support desk."
                + "    </div>"
                + "  </div>"
                + "</body>"
                + "</html>";
    }
}