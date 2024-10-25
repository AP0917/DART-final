console.log('Index.js loaded');
// Parallax scrolling effect for the header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.crypto-design');
    header.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

// AJAX Loading for courses
document.querySelector('.btn-start').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('courses.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('main').innerHTML = data;
        });
});

// Animate featured items on scroll
const featuredItems = document.querySelectorAll('.featured-item');
window.addEventListener('scroll', () => {
    featuredItems.forEach(item => {
        const itemPos = item.getBoundingClientRect().top;
        if (window.innerHeight > itemPos) {
            item.classList.add('animate');
        }
    });
});
