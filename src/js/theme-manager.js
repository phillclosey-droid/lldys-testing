// Cancara Theme Manager
// Reads theme preference from localStorage and applies it to the page

(function() {
    // Get stored theme preference
    const storedTheme = localStorage.getItem('cancara-theme');
    
    // Apply theme immediately to prevent flash
    if (storedTheme) {
        document.body.setAttribute('data-theme', storedTheme);
    }
    
    // Update theme toggle text if it exists
    window.addEventListener('DOMContentLoaded', function() {
        const themeText = document.getElementById('theme-text');
        if (themeText && storedTheme) {
            themeText.textContent = storedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
    });
})();
