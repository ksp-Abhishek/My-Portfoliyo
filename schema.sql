-- Database Schema for Portfolio Contact Messages
-- Compatible with MySQL, H2, and other SQL databases

-- Create Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    
    -- Indexes for better performance
    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_is_read (is_read),
    INDEX idx_name (name)
);

-- Insert sample data (optional - for testing)
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES
('John Doe', 'john.doe@example.com', 'Project Inquiry', 'I would like to discuss a potential project collaboration.', FALSE),
('Jane Smith', 'jane.smith@example.com', 'Job Opportunity', 'We have an exciting opportunity that matches your skills.', TRUE),
('Mike Wilson', 'mike.wilson@example.com', 'Feedback', 'Your portfolio looks amazing! Great work on the AI project.', FALSE);

-- Create a view for unread messages
CREATE VIEW IF NOT EXISTS unread_messages AS
SELECT id, name, email, subject, message, created_at
FROM contact_messages
WHERE is_read = FALSE
ORDER BY created_at DESC;

-- Create a stored procedure for message statistics
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS GetMessageStatistics()
BEGIN
    SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN is_read = FALSE THEN 1 END) as unread_messages,
        COUNT(CASE WHEN is_read = TRUE THEN 1 END) as read_messages,
        DATE(created_at) as message_date
    FROM contact_messages
    WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
    GROUP BY DATE(created_at)
    ORDER BY message_date DESC;
END //
DELIMITER ;

-- Create trigger for automatic timestamp (for databases that don't support DEFAULT CURRENT_TIMESTAMP)
DELIMITER //
CREATE TRIGGER IF NOT EXISTS set_created_timestamp
BEFORE INSERT ON contact_messages
FOR EACH ROW
BEGIN
    IF NEW.created_at IS NULL THEN
        SET NEW.created_at = CURRENT_TIMESTAMP;
    END IF;
END //
DELIMITER ;

-- Add full-text search index (MySQL specific)
-- ALTER TABLE contact_messages ADD FULLTEXT(name, subject, message);

-- Comments for documentation
-- Table: contact_messages
-- Purpose: Store contact form submissions from the portfolio website
-- Fields:
--   id: Unique identifier for each message
--   name: Sender's name (2-100 characters)
--   email: Sender's email address
--   subject: Message subject (5-200 characters)
--   message: Message content (10-1000 characters)
--   created_at: Timestamp when message was submitted
--   is_read: Boolean flag to track if message has been read

-- Views:
--   unread_messages: Shows only unread messages ordered by creation date

-- Stored Procedures:
--   GetMessageStatistics: Returns message statistics for the last 30 days

-- Triggers:
--   set_created_timestamp: Automatically sets created_at if not provided
