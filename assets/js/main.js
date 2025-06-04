// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const target = document.querySelector(this.getAttribute('href')); // Get the target element
        if (target) {
            target.scrollIntoView({ // Scroll to the target element
                behavior: 'smooth', // Enable smooth scrolling
                block: 'start' // Align the top of the target with the top of the viewport
            });
        }
    });
});

// Navbar scroll effect: adds/removes 'scrolled' class
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const scrollThreshold = 50; // Distance in pixels to scroll before changing nav style

    if (window.scrollY > scrollThreshold) {
        nav.classList.add('scrolled'); // Add 'scrolled' class
    } else {
        nav.classList.remove('scrolled'); // Remove 'scrolled' class
    }
});

// Custom alert/message box function (replaces native alert)
function showMessageBox(message, type = 'info') {
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${type === 'error' ? '#f44336' : '#4CAF50'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        font-family: 'Lato', sans-serif; /* Using Lato as per your site's font */
        text-align: center;
    `;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    // Fade in
    setTimeout(() => messageBox.style.opacity = '1', 10);

    // Fade out and remove after 3 seconds
    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    
    // Simulate form submission process
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...'; // Change button text
    submitBtn.disabled = true; // Disable button to prevent multiple submissions
    
    // Simulate API call or processing time
    setTimeout(() => {
        // Use custom message box instead of alert
        showMessageBox(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        this.reset(); // Reset form fields
        submitBtn.textContent = originalText; // Restore button text
        submitBtn.disabled = false; // Re-enable button
    }, 1500);
});

// Intersection Observer for fade-in animations on elements
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Reduce trigger area slightly from bottom
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Add fade-in class if intersecting
        }
    });
}, observerOptions);

// Observe elements for animation: skill cards, project cards, and contact items
document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Mobile menu functionality
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    // Toggle display style for mobile navigation links
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Project card hover effects (already present and functional)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)'; // Lift and slightly scale on hover
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)'; // Reset on mouse leave
    });
});

// Demo Modal Logic
const demoModal = document.getElementById('demoModal');
const demoIframe = document.getElementById('demoIframe');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const viewDemoButtons = document.querySelectorAll('.view-demo-btn');

viewDemoButtons.forEach(button => {
    button.addEventListener('click', function() {
        const demoSrc = this.getAttribute('data-demo-src');
        if (demoSrc) {
            demoIframe.src = demoSrc;
            demoModal.classList.add('active');
        }
    });
});

modalCloseBtn.addEventListener('click', function() {
    demoModal.classList.remove('active');
    demoIframe.src = ''; // Clear iframe src when closing
});

// Close modal when clicking outside the content
demoModal.addEventListener('click', function(e) {
    if (e.target === demoModal) {
        demoModal.classList.remove('active');
        demoIframe.src = '';
    }
});
