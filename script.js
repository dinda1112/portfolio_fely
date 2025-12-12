// ============================================================
// JAVASCRIPT FEATURE #1: MOBILE MENU TOGGLE
// ============================================================
// This feature allows users to open/close the navigation menu on mobile devices
// by clicking the hamburger icon (☰)

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');

// When hamburger button is clicked, toggle the 'active' class on the menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking any navigation link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================================
// JAVASCRIPT FEATURE #2: SMOOTH SCROLLING NAVIGATION
// ============================================================
// This feature provides smooth scrolling animation when clicking navigation links
// instead of jumping instantly to sections

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default jump behavior
        const targetId = link.getAttribute('href'); // Get section ID (e.g., #projects)
        const targetSection = document.querySelector(targetId);
        
        // Smoothly scroll to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ============================================================
// JAVASCRIPT FEATURE #3: ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
// ============================================================
// This feature automatically highlights the current section's nav link
// as you scroll through the page, and adds shadow to navbar when scrolled

const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Determine which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active state on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Add shadow effect to navbar when user scrolls down
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


const projectCards = document.querySelectorAll('.project-card');

// Observer options define when the animation should trigger
const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -100px 0px' // Start animation slightly before element is fully visible
};

// Create an observer that watches when elements enter the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay for cascading animation effect
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // 100ms delay between each card
        }
    });
}, observerOptions);

// Observe all project cards
projectCards.forEach(card => observer.observe(card));

// ============================================================
// JAVASCRIPT FEATURE #5: SCROLL TO TOP BUTTON
// ============================================================
// This feature shows a button when user scrolls down, clicking it smoothly
// scrolls back to the top of the page

const scrollTopBtn = document.getElementById('scrollTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// JAVASCRIPT FEATURE #6: CONTACT FORM HANDLING
// ============================================================
// This feature handles form submission with validation and user feedback

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Display success message (in a real app, you'd send this to a server)
    alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
    
    // Reset form fields
    contactForm.reset();
});

// ============================================================
// JAVASCRIPT FEATURE #7: PARALLAX EFFECT ON HERO SECTION
// ============================================================
// This feature creates a subtle parallax scrolling effect on the hero content
// and fades it out as the user scrolls down

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Move hero content slower than scroll speed for parallax effect
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        // Fade out hero content as user scrolls
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// ============================================================
// JAVASCRIPT FEATURE #8: PROJECT PREVIEW MODAL
// ============================================================
// This feature opens a modal window to display project screenshots
// when clicking on "Preview" links

const modal = document.getElementById('projectModal');
const modalImages = modal.querySelectorAll('.modal-img');
const closeModal = document.querySelector('.close-modal');
const previewLinks = document.querySelectorAll('.project-link');

// Project images data - maps each project to its screenshots
const projectImages = {
    0: ['math1.jpeg', 'math2.jpeg', 'math3.jpeg'],    // Math Game
    1: ['zoom1.jpeg', 'zoom2.jpeg', 'zoom3.jpeg'],    // Car Rental
    2: ['kuts1.jpeg', 'kuts2.jpeg', 'kuts3.jpeg']     // KUTS App
};

// Open modal when clicking preview link
previewLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Set images for the selected project
        const images = projectImages[index];
        modalImages.forEach((img, i) => {
            img.src = images[i];
            
            // Add mobile class only for KUTS app (index 2) for better display
            if (index === 2) {
                img.classList.add('mobile');
            } else {
                img.classList.remove('mobile');
            }
        });
        
        // Show modal and prevent body scrolling
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal when clicking the X button
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
