console.log('disaster-map.js loaded');

// Interactive disaster risk map
const map = document.querySelector('.map-container img');
if (map) {
    map.addEventListener('mousemove', (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        const tooltip = document.createElement('div');
        tooltip.classList.add('map-tooltip');
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y + 10}px`;
        tooltip.textContent = `Risk level: ${getRiskLevel(x, y)}`;
        map.appendChild(tooltip);
    });

    map.addEventListener('mouseleave', () => {
        const tooltip = map.querySelector('.map-tooltip');
        if (tooltip) tooltip.remove();
    });
}

function getRiskLevel(x, y) {
    // This is a placeholder function. In a real application, you would
    // use actual data to determine risk levels based on coordinates.
    const risk = Math.floor(Math.random() * 5) + 1;
    return ['Very Low', 'Low', 'Moderate', 'High', 'Very High'][risk - 1];
}