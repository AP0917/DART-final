// emergency-contacts.js
document.addEventListener('DOMContentLoaded', function() {
    // Click event for emergency banner
    const emergencyBanner = document.querySelector('.emergency-banner');
    if (emergencyBanner) {
        emergencyBanner.addEventListener('click', function() {
            if (confirm('Would you like to call emergency services (112)?')) {
                window.location.href = 'tel:112';
            }
        });
    }

    // Table row click event to copy number
    const rows = document.querySelectorAll('.emergency-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const number = this.cells[1].innerText.trim();
            copyToClipboard(number, this);
        });
    });

    function copyToClipboard(text, row) {
        navigator.clipboard.writeText(text);
        const tooltip = row.querySelector('.tooltip');
        tooltip.style.display = 'block';
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 2000); // Tooltip displayed for 2 seconds
        console.log("Copied: " + text); // Optional: Log to console
    }
});
