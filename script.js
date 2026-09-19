// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const dotGrid = document.getElementById('dotGrid');

// Create Dot Grid Background
function createDotGrid() {
    if (!dotGrid) return;
    
    const dotSpacing = 30; // Space between dots
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const cols = Math.ceil(windowWidth / dotSpacing);
    const rows = Math.ceil(windowHeight / dotSpacing);
    
    // Clear existing dots
    dotGrid.innerHTML = '';
    
    // Create dots
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = `${col * dotSpacing + dotSpacing / 2}px`;
            dot.style.top = `${row * dotSpacing + dotSpacing / 2}px`;
            
            // Add hover effect
            dot.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.background = 'rgba(255, 215, 0, 0.8)';
                this.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.7)';
            });
            
            dot.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.background = 'rgba(255, 215, 0, 0.3)';
                this.style.boxShadow = 'none';
            });
            
            dotGrid.appendChild(dot);
        }
    }
}

// Initialize dot grid on load
document.addEventListener('DOMContentLoaded', () => {
    createDotGrid();
});

// Recreate dot grid on window resize
window.addEventListener('resize', () => {
    createDotGrid();
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements that should animate
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('section, .portfolio-item, .testimonial-item, .article-item, .skill-item');
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
});

// Call reveal on scroll
window.addEventListener('scroll', reveal);

// Call reveal on load
reveal();

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Typing Animation for Hero Title
function initTypeWriter() {
    const greetingElement = document.querySelector('.hero-title .greeting');
    const nameElement = document.querySelector('.hero-title .name');
    const professionElement = document.querySelector('.hero-title .profession');
    const cursorElement = document.querySelector('.typing-cursor');
    const greetingWrapper = document.querySelector('.hero-title .greeting-wrapper');
    const nameWrapper = document.querySelector('.hero-title .name-wrapper');
    const professionWrapper = document.querySelector('.hero-title .profession-wrapper');
    
    if (!greetingElement || !nameElement || !professionElement) return;
    
    const greetingText = "Hello, I'm";
    const nameText = "Abhishek Kashyap";
    const roles = [
        "Java Developer",
        "Spring Boot Developer",
        "Full Stack Developer",
        "Backend Developer"
    ];
    
    // Clear elements initially
    greetingElement.textContent = '';
    nameElement.textContent = '';
    professionElement.textContent = '';
    
    // Place cursor initially in greeting wrapper
    if (cursorElement && greetingWrapper) {
        greetingWrapper.appendChild(cursorElement);
    }
    
    let charIndex = 0;
    
    // Step 1: Type Greeting ("Hello, I'm")
    function typeGreeting() {
        if (charIndex < greetingText.length) {
            greetingElement.textContent += greetingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeGreeting, 70);
        } else {
            charIndex = 0;
            // Move cursor to name
            if (cursorElement && nameWrapper) {
                nameWrapper.appendChild(cursorElement);
            }
            setTimeout(typeName, 300);
        }
    }
    
    // Step 2: Type Name ("Abhishek Kashyap")
    function typeName() {
        if (charIndex < nameText.length) {
            nameElement.textContent += nameText.charAt(charIndex);
            charIndex++;
            setTimeout(typeName, 80);
        } else {
            charIndex = 0;
            // Move cursor to profession
            if (cursorElement && professionWrapper) {
                professionWrapper.appendChild(cursorElement);
            }
            setTimeout(typeProfession, 400);
        }
    }
    
    // Step 3: Type & Cycle Professions
    let roleIndex = 0;
    let isDeleting = false;
    
    function typeProfession() {
        const currentRole = roles[roleIndex];
        
        if (!isDeleting) {
            // Typing forward
            professionElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeProfession, 2200);
                return;
            }
            setTimeout(typeProfession, 75);
        } else {
            // Deleting backward
            professionElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeProfession, 350);
                return;
            }
            setTimeout(typeProfession, 40);
        }
    }
    
    // Start typing sequence
    setTimeout(typeGreeting, 250);
}

// Initialize typing animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypeWriter);
} else {
    initTypeWriter();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Portfolio Item Hover Effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        if (!email) {
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Here you would normally send the data to your backend
            // For now, we'll simulate a successful submission
            await simulateContactFormSubmission({ email });
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Simulate contact form submission (replace with actual backend call)
async function simulateContactFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Contact form data:', data);
            resolve();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Floating Animation for Profile Card
function floatAnimation() {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.style.animation = 'float 4s ease-in-out infinite';
    }
}

// Add floating keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', floatAnimation);

// Golden Glow Effect on Hover
function addGoldenGlow() {
    const interactiveElements = document.querySelectorAll('.btn, .social-link, .portfolio-item, .testimonial-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', addGoldenGlow);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(() => {
    updateActiveNavLink();
    reveal();
}, 10));

// Console Welcome Message
console.log('%c Welcome to Abhishek Kashyap\'s Dark Portfolio! ', 'background: linear-gradient(135deg, #FFD700, #FFA500); color: #000; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%c Feel free to explore and get in touch! ', 'color: #FFD700; font-size: 12px; font-style: italic;');
