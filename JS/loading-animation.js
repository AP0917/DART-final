console.log('loading-animation.js is loaded');
// Add a loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('loader--hidden');
        loader.addEventListener('transitionend', () => {
            document.body.removeChild(loader);
        });
    }
});