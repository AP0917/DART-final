console.log('animate-on-scroll.js loaded');

// Animate elements on scroll
function animateOnScroll() {
    console.log('Animate on scroll function called');
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
            console.log('Element animated:', element);
        }
    });
}

window.addEventListener('scroll', animateOnScroll);