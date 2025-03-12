document.addEventListener('DOMContentLoaded', function() {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Add hover effect for team members with 3D tilt
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply the rotation transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        member.addEventListener('mouseleave', function() {
            // Reset to initial state
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
        
        // Add click event to make navigation smoother
        const profileLink = member.querySelector('.view-profile');
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add a nice fade-out effect before navigating
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // Create floating particles in the background for a more dynamic feel
    createParticles();

    // Add smooth scroll to top
    const scrollToTop = document.createElement('div');
    scrollToTop.classList.add('scroll-to-top');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTop);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.classList.add('active');
        } else {
            scrollToTop.classList.remove('active');
        }
    });

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Function to create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    document.body.prepend(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties for each particle
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Add a page transition effect when navigating between pages
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});

// Implement a loading animation when the page loads
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
