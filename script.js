const projects = [
    { 
        name: "Calculator Application", 
        description: "A fully functional calculator with arithmetic operations, memory functions, and responsive design. Built with vanilla JavaScript.",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    { 
        name: "Task Management System", 
        description: "A comprehensive to-do list application with task categorization, priority levels, and local storage persistence.",
        tech: ["HTML", "CSS", "JavaScript", "LocalStorage"]
    },
    { 
        name: "Interactive Game", 
        description: "A number guessing game with multiple difficulty levels, score tracking, and responsive feedback system.",
        tech: ["HTML", "CSS", "JavaScript", "Game Logic"]
    },
    { 
        name: "Portfolio Website", 
        description: "This responsive portfolio website featuring clean design, dynamic content loading, and form validation.",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    },
    { 
        name: "Weather Dashboard", 
        description: "A weather application that displays current conditions and forecasts using API integration.",
        tech: ["HTML", "CSS", "JavaScript", "API Integration"]
    },
    { 
        name: "Recipe Collection", 
        description: "A recipe finder and organizer with search functionality, ingredient lists, and preparation steps.",
        tech: ["HTML", "CSS", "JavaScript", "Data Management"]
    }
];

// DOM Elements
const projectList = document.getElementById("project-list");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = darkModeToggle.querySelector("i");
const darkModeText = darkModeToggle.querySelector("span");
const darkModeStatus = document.getElementById("darkModeStatus");
const html = document.documentElement;
const nav = document.querySelector(".sticky-nav");

// Dark Mode State
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize Dark Mode
function initDarkMode() {
    if (isDarkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// Enable Dark Mode
function enableDarkMode() {
    html.classList.add('dark-mode');
    darkModeIcon.className = 'fas fa-sun';
    darkModeText.textContent = 'Light Mode';
    darkModeStatus.textContent = 'Dark Mode Active';
    localStorage.setItem('darkMode', 'true');
    isDarkMode = true;
}

// Disable Dark Mode
function disableDarkMode() {
    html.classList.remove('dark-mode');
    darkModeIcon.className = 'fas fa-moon';
    darkModeText.textContent = 'Dark Mode';
    darkModeStatus.textContent = 'Light Mode Active';
    localStorage.setItem('darkMode', 'false');
    isDarkMode = false;
}

// Toggle Dark Mode
function toggleDarkMode() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// Phone Number Validation
function isValidPhone(phone) {
    if (!phone.trim()) {
        return { valid: true, message: '' }; // Phone is optional
    }
    
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid phone number (international format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (phoneRegex.test(cleaned) && cleaned.length >= 10 && cleaned.length <= 15) {
        return { valid: true, message: '' };
    }
    
    return { 
        valid: false, 
        message: "Please enter a valid phone number (10-15 digits, country code optional)" 
    };
}

// Load projects dynamically
function loadProjects() {
    projects.forEach(project => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        `;
        projectList.appendChild(li);
    });
}

// Form validation and submission
contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Reset form message
    formMessage.textContent = "";
    formMessage.style.backgroundColor = "";
    formMessage.style.color = "";
    formMessage.style.border = "";

    // Validate form
    let errors = [];

    // Name validation
    if (name === "") {
        errors.push("Name is required");
    } else if (name.length < 2) {
        errors.push("Name must be at least 2 characters long");
    }

    // Email validation
    if (email === "") {
        errors.push("Email is required");
    } else if (!isValidEmail(email)) {
        errors.push("Please enter a valid email address");
    }

    // Phone validation
    const phoneValidation = isValidPhone(phone);
    if (!phoneValidation.valid) {
        errors.push(phoneValidation.message);
    }

    // Message validation
    if (message === "") {
        errors.push("Message is required");
    } else if (message.length < 10) {
        errors.push("Message should be at least 10 characters long");
    }

    // Show errors or success
    if (errors.length > 0) {
        showFormMessage(errors.join('. '), "error");
        return;
    }

    // Success message
    showFormMessage("Thank you for your message. I will respond within 24 hours.", "success");
    
    // Reset form
    contactForm.reset();
    
    // Log form data (for demonstration)
    console.log("Form submitted:", { name, email, phone, message });
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(text, type) {
    formMessage.textContent = text;
    
    if (type === "error") {
        formMessage.style.backgroundColor = "#fee";
        formMessage.style.color = "#c00";
        formMessage.style.border = "1px solid #fcc";
    } else if (type === "success") {
        formMessage.style.backgroundColor = "#efe";
        formMessage.style.color = "#080";
        formMessage.style.border = "1px solid #cfc";
    }
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        }
        
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

// Mobile menu toggle
menuToggle.addEventListener("click", function() {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", function(e) {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
    }
});

// Sticky Navigation Scroll Effect
window.addEventListener("scroll", function() {
    // Add/remove scrolled class for nav styling
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
        nav.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    } else {
        nav.classList.remove("scrolled");
        nav.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
    }
});

// Dark Mode Toggle Event
darkModeToggle.addEventListener("click", toggleDarkMode);

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize features
    initDarkMode();
    loadProjects();
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-list li');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form input validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#f87171';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(248, 113, 113)') {
                this.style.borderColor = '';
            }
        });
    });
});