package com.abhishek.portfolio.service;

import com.abhishek.portfolio.model.ContactMessage;
import com.abhishek.portfolio.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    
    private final ContactMessageRepository contactMessageRepository;
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${portfolio.admin.email:abhishekkashyapa13@gmail.com}")
    private String adminEmail;
    
    @Autowired
    public ContactService(ContactMessageRepository contactMessageRepository, 
                         JavaMailSender mailSender) {
        this.contactMessageRepository = contactMessageRepository;
        this.mailSender = mailSender;
    }
    
    /**
     * Save a new contact message
     */
    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }
    
    /**
     * Get all contact messages
     */
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findRecentMessages();
    }
    
    /**
     * Get unread messages count
     */
    public long getUnreadMessagesCount() {
        return contactMessageRepository.countUnreadMessages();
    }
    
    /**
     * Mark a message as read
     */
    public ContactMessage markAsRead(Long id) {
        Optional<ContactMessage> messageOpt = contactMessageRepository.findById(id);
        if (messageOpt.isPresent()) {
            ContactMessage message = messageOpt.get();
            message.setIsRead(true);
            return contactMessageRepository.save(message);
        }
        throw new RuntimeException("Message not found with id: " + id);
    }
    
    /**
     * Delete a message
     */
    public void deleteMessage(Long id) {
        if (!contactMessageRepository.existsById(id)) {
            throw new RuntimeException("Message not found with id: " + id);
        }
        contactMessageRepository.deleteById(id);
    }
    
    /**
     * Get messages by email
     */
    public List<ContactMessage> getMessagesByEmail(String email) {
        return contactMessageRepository.findByEmail(email);
    }
    
    /**
     * Send email notification to admin
     */
    public void sendEmailNotification(ContactMessage message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(adminEmail);
            mailMessage.setSubject("New Contact Message: " + message.getSubject());
            
            String emailBody = String.format(
                "You have received a new contact message from your portfolio website.\n\n" +
                "Name: %s\n" +
                "Email: %s\n" +
                "Subject: %s\n" +
                "Message: %s\n" +
                "Received at: %s\n\n" +
                "Please respond to the sender at their earliest convenience.",
                message.getName(),
                message.getEmail(),
                message.getSubject(),
                message.getMessage(),
                message.getCreatedAt()
            );
            
            mailMessage.setText(emailBody);
            mailSender.send(mailMessage);
            
        } catch (Exception e) {
            // Log the error but don't throw it to avoid breaking the contact submission
            System.err.println("Failed to send email notification: " + e.getMessage());
        }
    }
    
    /**
     * Send auto-reply to the sender
     */
    public void sendAutoReply(ContactMessage message) {
        try {
            SimpleMailMessage autoReply = new SimpleMailMessage();
            autoReply.setFrom(fromEmail);
            autoReply.setTo(message.getEmail());
            autoReply.setSubject("Thank you for contacting Abhishek Kashyap");
            
            String replyBody = String.format(
                "Dear %s,\n\n" +
                "Thank you for reaching out through my portfolio website. I have received your message:\n\n" +
                "Subject: %s\n" +
                "Message: %s\n\n" +
                "I appreciate your interest and will get back to you as soon as possible.\n\n" +
                "Best regards,\n" +
                "Abhishek Kashyap\n\n" +
                "---\n" +
                "This is an automated response. Please do not reply to this email.",
                message.getName(),
                message.getSubject(),
                message.getMessage()
            );
            
            autoReply.setText(replyBody);
            mailSender.send(autoReply);
            
        } catch (Exception e) {
            // Log the error but don't throw it
            System.err.println("Failed to send auto-reply: " + e.getMessage());
        }
    }
    
    /**
     * Get messages from last N days
     */
    public List<ContactMessage> getMessagesFromLastDays(int days) {
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        return contactMessageRepository.findByCreatedAtAfter(startDate);
    }
    
    /**
     * Search messages by name
     */
    public List<ContactMessage> searchMessagesByName(String name) {
        return contactMessageRepository.findByNameContaining(name);
    }
    
    /**
     * Search messages by subject
     */
    public List<ContactMessage> searchMessagesBySubject(String subject) {
        return contactMessageRepository.findBySubjectContaining(subject);
    }
}
