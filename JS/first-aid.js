document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all emergency cards for scroll animations
    document.querySelectorAll('.emergency-card').forEach(card => {
        observer.observe(card);
    });

    // Hover effect for steps
    document.querySelectorAll('.steps-list li').forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.color = '#007BFF';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.color = '#333';
        });
    });

    // Click event for emergency banner
    const emergencyBanner = document.querySelector('.emergency-banner');
    if (emergencyBanner) {
        emergencyBanner.addEventListener('click', function() {
            if (confirm('Would you like to call emergency services (112)?')) {
                window.location.href = 'tel:112';
            }
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize Video.js players
    var players = document.querySelectorAll('.video-js');
    players.forEach(function(player) {
        videojs(player.id);
    });
});