// Custom cursor effects
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Track cursor movement
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.border = '1px solid var(--primary-color)';
            cursor.style.backgroundColor = 'rgba(74, 99, 231, 0.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.border = '2px solid var(--primary-color)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
});

// Text typing animation
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Typed !== 'undefined') {
        const options = {
            strings: ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver'],
            typeSpeed: 100,
            backSpeed: 60,
            backDelay: 2000,
            loop: true
        };
        
        const element = document.querySelector('.typing-text');
        if (element) {
            new Typed('.typing-text', options);
        }
    }
});

// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Animated counter for stats
    function animateCounter(target, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            target.innerHTML = currentCount;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                target.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar span');
        skillBars.forEach(bar => {
            const width = bar.classList.contains('html') ? '95%' : 
                          bar.classList.contains('js') ? '85%' :
                          bar.classList.contains('react') ? '80%' : '75%';
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // Detect when skills section is in viewport
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        observer.observe(skillsSection);
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal-element');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                elementObserver.unobserve(entry.target);
            }
        });
    }, {threshold: 0.1});
    
    revealElements.forEach(element => {
        elementObserver.observe(element);
    });
});

// Fixed header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active menu item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});

// Portfolio filtering with animations
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.transition = 'all 0.3s ease';
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Image hover parallax effect
document.addEventListener('DOMContentLoaded', function() {
    const parallaxItems = document.querySelectorAll('.parallax-item');
    
    parallaxItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                
                // Email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        valid = false;
                        input.classList.add('error');
                    }
                }
            });
            
            if (valid) {
                // Form submission success animation
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = 'Message Sent!';
                    submitBtn.classList.add('success');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);
                }, 1500);
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Page preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
