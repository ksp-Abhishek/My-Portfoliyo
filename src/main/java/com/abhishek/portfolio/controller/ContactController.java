package com.abhishek.portfolio.controller;

import com.abhishek.portfolio.model.ContactMessage;
import com.abhishek.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ContactController {
    
    private final ContactService contactService;
    
    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }
    
    /**
     * Submit a new contact message
     */
    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitContactMessage(
            @Valid @RequestBody ContactMessage contactMessage) {
        try {
            ContactMessage savedMessage = contactService.saveContactMessage(contactMessage);
            
            // Send email notification
            contactService.sendEmailNotification(savedMessage);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Your message has been sent successfully!",
                "data", savedMessage
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to send message. Please try again.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Get all contact messages (admin endpoint)
     */
    @GetMapping("/messages")
    public ResponseEntity<Map<String, Object>> getAllMessages() {
        try {
            List<ContactMessage> messages = contactService.getAllMessages();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", messages,
                "count", messages.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to retrieve messages.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Get unread messages count
     */
    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Object>> getUnreadCount() {
        try {
            long count = contactService.getUnreadMessagesCount();
            return ResponseEntity.ok(Map.of(
                "success", true,
                "unreadCount", count
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to get unread count.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Mark message as read
     */
    @PutMapping("/messages/{id}/read")
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable Long id) {
        try {
            ContactMessage message = contactService.markAsRead(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message marked as read.",
                "data", message
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to mark message as read.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Delete a message
     */
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, Object>> deleteMessage(@PathVariable Long id) {
        try {
            contactService.deleteMessage(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message deleted successfully."
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to delete message.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Get messages by email
     */
    @GetMapping("/messages/by-email/{email}")
    public ResponseEntity<Map<String, Object>> getMessagesByEmail(@PathVariable String email) {
        try {
            List<ContactMessage> messages = contactService.getMessagesByEmail(email);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "data", messages,
                "count", messages.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to retrieve messages.",
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "healthy",
            "service", "Portfolio Contact API",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
