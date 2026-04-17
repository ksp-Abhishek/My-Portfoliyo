package com.abhishek.portfolio.repository;

import com.abhishek.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    
    // Find messages by is_read status
    List<ContactMessage> findByIsRead(Boolean isRead);
    
    // Find messages by email
    List<ContactMessage> findByEmail(String email);
    
    // Find messages created after a specific date
    List<ContactMessage> findByCreatedAtAfter(LocalDateTime date);
    
    // Count unread messages
    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.isRead = false")
    long countUnreadMessages();
    
    // Find messages by name containing (case-insensitive)
    @Query("SELECT c FROM ContactMessage c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<ContactMessage> findByNameContaining(@Param("name") String name);
    
    // Find messages by subject containing (case-insensitive)
    @Query("SELECT c FROM ContactMessage c WHERE LOWER(c.subject) LIKE LOWER(CONCAT('%', :subject, '%'))")
    List<ContactMessage> findBySubjectContaining(@Param("subject") String subject);
    
    // Find messages created within a date range
    @Query("SELECT c FROM ContactMessage c WHERE c.createdAt BETWEEN :startDate AND :endDate")
    List<ContactMessage> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    // Find recent messages (last N messages)
    @Query("SELECT c FROM ContactMessage c ORDER BY c.createdAt DESC")
    List<ContactMessage> findRecentMessages();
}
