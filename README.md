# Abhishek Kashyap - Modern Portfolio Website

A stunning, modern portfolio website built with HTML, CSS, JavaScript, and a Java Spring Boot backend. This portfolio showcases professional skills, projects, and experience with smooth animations and responsive design.

## Features

### Frontend
- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic animations
- **Sections**: Home, About, Skills, Projects, Experience, and Contact
- **Modern UI**: Uses Font Awesome icons, Google Fonts, and modern CSS techniques

### Backend
- **Spring Boot**: RESTful API built with Spring Boot 3.2.0
- **Database**: H2 for development, MySQL for production
- **Email Service**: Automatic email notifications for contact form submissions
- **Validation**: Input validation using Jakarta Bean Validation
- **CORS**: Cross-origin resource sharing configured for frontend integration

### Key Features
- Contact form with email notifications
- Message management system
- Responsive navigation with mobile menu
- Smooth scroll animations
- Parallax effects
- Typing animation for hero section
- Timeline for experience
- Skill cards with hover effects
- Project showcase
- Social media integration

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript**: Interactive features and animations
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### Backend
- **Java 17**: Programming language
- **Spring Boot 3.2.0**: Framework
- **Spring Data JPA**: Database access
- **Spring Mail**: Email service
- **Maven**: Build tool
- **H2 Database**: Development database
- **MySQL**: Production database

## Project Structure

```
portfolio/
|-- index.html              # Main HTML file
|-- styles.css              # CSS styling
|-- script.js               # JavaScript functionality
|-- pom.xml                 # Maven configuration
|-- schema.sql              # Database schema
|-- README.md               # This file
|-- src/
|   |-- main/
|   |   |-- java/
|   |   |   |-- com/abhishek/portfolio/
|   |   |   |   |-- PortfolioApplication.java
|   |   |   |   |-- controller/
|   |   |   |   |   |-- ContactController.java
|   |   |   |   |-- model/
|   |   |   |   |   |-- ContactMessage.java
|   |   |   |   |-- repository/
|   |   |   |   |   |-- ContactMessageRepository.java
|   |   |   |   |-- service/
|   |   |   |   |   |-- ContactService.java
|   |   |-- resources/
|   |   |   |-- application.properties
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL (for production)
- Node.js (optional, for development)

### Frontend Setup
1. Clone or download the project files
2. Open `index.html` in your browser
3. The portfolio will be immediately visible

### Backend Setup

#### Development (H2 Database)
1. Navigate to the project root directory
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
3. The API will be available at `http://localhost:8080/api`
4. H2 Console: `http://localhost:8080/api/h2-console`
   - JDBC URL: `jdbc:h2:mem:portfolio_db`
   - Username: `sa`
   - Password: `password`

#### Production (MySQL)
1. Create MySQL database:
   ```sql
   CREATE DATABASE portfolio_db;
   ```
2. Update `application.properties` with your MySQL credentials
3. Run the schema file:
   ```sql
   mysql -u root -p portfolio_db < schema.sql
   ```
4. Build and run:
   ```bash
   mvn clean package
   java -jar target/portfolio-backend-1.0.0.jar
   ```

## API Endpoints

### Contact Form
- `POST /api/contact/submit` - Submit contact message
- `GET /api/contact/messages` - Get all messages (admin)
- `GET /api/contact/unread-count` - Get unread messages count
- `PUT /api/contact/messages/{id}/read` - Mark message as read
- `DELETE /api/contact/messages/{id}` - Delete message
- `GET /api/contact/health` - Health check

### Email Configuration
To enable email notifications, update `application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

## Customization

### Personal Information
Update the following in `index.html`:
- Name and contact details
- Education information
- Skills and technologies
- Projects and experience
- Social media links

### Styling
Modify `styles.css` to:
- Change color scheme (update CSS variables)
- Adjust animations and transitions
- Modify responsive breakpoints
- Update fonts and typography

### Backend Configuration
Update `application.properties` for:
- Database settings
- Email configuration
- Server port
- CORS settings

## Deployment

### Frontend
Deploy the static files to any web hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Backend
Deploy the Spring Boot application to:
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean

## Features in Detail

### Animations
- Fade-in animations on scroll
- Typing effect for hero title
- Floating profile card
- Parallax scrolling
- Hover effects on cards
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile
- Flexible grid layouts
- Optimized images
- Touch-friendly interactions

### Contact System
- Form validation
- Email notifications
- Message management
- Auto-reply functionality
- Admin dashboard endpoints

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is open source and available under the MIT License.

## Contact
- **Email**: abhishekkashyapa13@gmail.com
- **Phone**: +91 9896927305
- **Address**: VPO Khora Kheri, Karnal, Haryana, India

---

**Built with passion by Abhishek Kashyap**
