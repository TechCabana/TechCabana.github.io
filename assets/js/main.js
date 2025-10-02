// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Get the height of the fixed navigation
            const nav = document.querySelector('nav');
            const navHeight = nav.offsetHeight;
            
            // Calculate the target position minus nav height
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            // Smooth scroll to the calculated position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect: adds/removes 'scrolled' class
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    const scrollThreshold = 50;

    if (window.scrollY > scrollThreshold) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
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
        font-family: 'Lato', sans-serif;
        text-align: center;
    `;
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => messageBox.style.opacity = '1', 10);

    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.addEventListener('transitionend', () => messageBox.remove());
    }, 3000);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showMessageBox(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Intersection Observer for fade-in animations on elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

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

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
        demoModal.classList.remove('active');
        demoIframe.src = '';
    });
}

demoModal.addEventListener('click', function(e) {
    if (e.target === demoModal) {
        demoModal.classList.remove('active');
        demoIframe.src = '';
    }
});

// Interactive Skill Level Filter
document.addEventListener('DOMContentLoaded', function() {
    const legendItems = document.querySelectorAll('.legend-item');
    
    if (legendItems.length > 0) {
        legendItems.forEach(item => {
            item.addEventListener('click', function() {
                const level = this.getAttribute('data-level');
                
                legendItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                filterSkills(level);
            });
        });
    }
});

function filterSkills(level) {
    const allTechSkills = document.querySelectorAll('.tech-logo');
    const allProfSkills = document.querySelectorAll('.professional-skill-box');
    
    const allSkills = [...allTechSkills, ...allProfSkills];
    
    allSkills.forEach(skill => {
        const skillLevel = skill.getAttribute('data-level');
        
        if (level === 'all') {
            skill.classList.remove('hidden');
        } else if (skillLevel === level) {
            skill.classList.remove('hidden');
        } else {
            skill.classList.add('hidden');
        }
    });
}

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX SCROLL EFFECT =====
// Weighted parallax with smooth, natural movement
let parallaxTicking = false;

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Hero parallax - lighter weight (0.3 factor)
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < window.innerHeight) {
                const heroTransform = scrolled * 0.3;
                const heroOpacity = Math.max(0, 1 - (scrolled / 700));
                hero.style.transform = `translateY(${heroTransform}px)`;
                hero.style.opacity = heroOpacity;
            }
            
            // Section headers parallax - very subtle (0.08 factor)
            document.querySelectorAll('.section-header, .section-title').forEach(header => {
                const rect = header.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / windowHeight;
                    const offset = progress * 30; // Max 30px movement
                    header.style.transform = `translateY(${offset}px)`;
                }
            });
            
            // Cards and skills parallax - minimal (0.03 factor)
            document.querySelectorAll('.project-card, .skills-half').forEach(card => {
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const progress = (windowHeight - rect.top) / windowHeight;
                    const offset = progress * 15; // Max 15px movement
                    
                    // Check if card is being hovered (don't override hover transform)
                    const currentTransform = card.style.transform;
                    if (!currentTransform || !currentTransform.includes('scale')) {
                        card.style.transform = `translateY(${offset}px)`;
                    }
                }
            });
            
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    // Track mouse position for radial gradient effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update CSS custom properties for dynamic gradient
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
    
    // Enhanced hover effect
    card.addEventListener('mouseenter', function() {
        // Preserve parallax while adding hover effect
        const currentTransform = this.style.transform;
        const yOffset = currentTransform.match(/translateY\(([^)]+)\)/);
        const yValue = yOffset ? yOffset[1] : '0px';
        
        this.style.transform = `translateY(calc(${yValue} - 8px)) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        // Return to parallax position
        const rect = this.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = (windowHeight - rect.top) / windowHeight;
        const offset = progress * 15;
        
        this.style.transform = `translateY(${offset}px) scale(1)`;
    });
});

// Smooth scroll behavior enhancement
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations when tab is hidden
        document.body.style.willChange = 'auto';
    } else {
        // Resume animations when tab is visible
        document.body.style.willChange = 'transform';
    }
});

// Initialize: Set initial active nav link
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`.nav-links a[href="${hash}"]`);
        if (targetLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            targetLink.classList.add('active');
        }
    } else {
        // Set home as active by default
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

console.log('Portfolio initialized!');