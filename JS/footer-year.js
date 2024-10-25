console.log('footer-year.js is loaded');
// Dynamically update the current year in the footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});