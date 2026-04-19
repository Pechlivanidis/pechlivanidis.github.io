// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        mobileMenu.classList.add('hidden');
    }
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fixed Navigation Background on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animations on Scroll
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use requestAnimationFrame to ensure smooth animation
            requestAnimationFrame(() => {
                entry.target.classList.add('animate-on-scroll');
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with initial class to prevent layout shift
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll-no-delay');
    observer.observe(section);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            e.preventDefault();
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Form is valid, allow FormSubmit.co to handle the submission
        console.log('Form Data:', data);
        showNotification('Sending your message...', 'info');
        // Form will submit naturally to FormSubmit.co
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-50 animate-fade-in`;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Typing Animation for Hero Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation on page load
window.addEventListener('load', () => {
    // Optional: Add typing animation for hero title
    // Uncomment if you want this effect
    // const heroTitle = document.querySelector('h1 span');
    // if (heroTitle) {
    //     typeWriter(heroTitle, 'Your Name', 80);
    // }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    let scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '#78716C';
            });
            
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = '#D97706';
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Parallax Effect (Optional)
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((element) => {
        const scrollPosition = window.scrollY;
        const parallaxSpeed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
    });
}

window.addEventListener('scroll', parallaxScroll);

// Lazy Loading for Images (Optional)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-placeholder');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Back to Top Button
function createBackToTopButton() {
    const backToTopBtn = document.querySelector('[href="#home"]');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.pointerEvents = 'auto';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
        });
    }
}

createBackToTopButton();

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
    }
});

// Copy to Clipboard for Email
document.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="mailto:"]')) {
        const email = e.target.getAttribute('href').replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            showNotification(`Email copied: ${email}`, 'success');
        });
    }
});

// Performance: Debounce scroll events
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

// Smooth scroll behavior fallback for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView();
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio page loaded successfully!');
    
    // Add any initialization code here
    // Example: Load animations, fetch data, etc.
});

// Print Functionality
function printCV() {
    window.print();
}

// Add print button functionality if exists
const printBtn = document.querySelector('[aria-label="Print CV"]');
if (printBtn) {
    printBtn.addEventListener('click', printCV);
}

// Toggle Dark Mode (if implemented)
function toggleDarkMode() {
    document.documentElement.style.colorScheme = 
        document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', document.documentElement.style.colorScheme);
}

// Check for saved theme preference or default to light mode
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.style.colorScheme = savedTheme;
}

// Initialize theme on page load
window.addEventListener('load', initTheme);

// Export functions for external use
window.portfolio = {
    toggleDarkMode,
    printCV,
    showNotification
};
