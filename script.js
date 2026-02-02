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
    const message = document.getElementById("message").value.trim();

    // Reset form message
    formMessage.textContent = "";
    formMessage.style.backgroundColor = "";
    formMessage.style.color = "";
    formMessage.style.border = "";

    // Validate form
    if (name === "" || email === "" || message === "") {
        showFormMessage("Please fill in all required fields.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage("Please enter a valid email address.", "error");
        return;
    }

    if (message.length < 10) {
        showFormMessage("Message should be at least 10 characters long.", "error");
        return;
    }

    // Success message
    showFormMessage("Thank you for your message. I will respond within 24 hours.", "success");
    
    // Reset form
    contactForm.reset();
    
    // Log form data (for demonstration)
    console.log("Form submitted:", { name, email, message });
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

// Navbar scroll effect
window.addEventListener("scroll", function() {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
        nav.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    } else {
        nav.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
    }
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
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
});