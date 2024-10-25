console.log('typed-effect.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Typed.js effect');
    new Typed('#typed-text', {
        strings: ['Your trusted resource^1000', 'for disaster preparedness^1000', 'response, and recovery^1000'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        onStringTyped: (arrayPos, self) => {
            console.log('Typed string:', self.strings[arrayPos]);
        }
    });
});