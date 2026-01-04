// Toggle Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all toggle components on the page
     */
    function initToggles() {
        const toggles = document.querySelectorAll('.toggle');
        
        toggles.forEach(toggle => {
            const tabs = toggle.querySelectorAll('.toggle-tab');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Don't do anything if disabled
                    if (this.disabled) return;
                    
                    // Remove active class from all tabs in this toggle
                    tabs.forEach(t => t.classList.remove('is-active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('is-active');
                    
                    // Dispatch custom event with the selected value
                    const event = new CustomEvent('toggle-change', {
                        detail: {
                            value: this.getAttribute('data-value'),
                            label: this.textContent.trim()
                        },
                        bubbles: true
                    });
                    toggle.dispatchEvent(event);
                });
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggles);
    } else {
        initToggles();
    }

    // Export for manual initialization if needed
    window.ToggleComponent = {
        init: initToggles
    };
})();
