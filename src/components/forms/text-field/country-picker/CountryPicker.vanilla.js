// Country Picker Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/forms/text-field/country-picker/
            return '../../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // In journeys folder: journeys/some-journey/
            return '../../assets';
        }
        
        return '../../assets';
    }

    /**
     * Initialize all country-picker components on the page
     */
    function initCountryPickers() {
        const pickers = document.querySelectorAll('.country-picker');
        
        pickers.forEach(picker => {
            loadChevronIcon(picker);
            setupCountryInteractions(picker);
        });
    }

    /**
     * Load chevron down icon
     */
    function loadChevronIcon(picker) {
        const ASSETS_BASE = getAssetsPath();
        const icons = picker.querySelectorAll('.country-picker-icon img');
        icons.forEach(img => {
            img.src = `${ASSETS_BASE}/icons/arrows/chevron-down.svg`;
            img.alt = 'Select country';
        });
    }

    /**
     * Setup country picker interactions
     */
    function setupCountryInteractions(picker) {
        const input = picker.querySelector('.country-picker-input');
        
        if (!input) return;

        // Click on input toggles active state
        input.addEventListener('click', function() {
            if (!picker.classList.contains('is-disabled')) {
                input.classList.toggle('is-active');
                
                // Dispatch custom event
                const event = new CustomEvent('country-picker-click', {
                    detail: {
                        isActive: input.classList.contains('is-active')
                    },
                    bubbles: true
                });
                picker.dispatchEvent(event);
            }
        });

        // Remove active state when clicking outside
        document.addEventListener('click', function(e) {
            if (!picker.contains(e.target)) {
                input.classList.remove('is-active');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountryPickers);
    } else {
        initCountryPickers();
    }

    // Export for manual initialization if needed
    window.CountryPickerComponent = {
        init: initCountryPickers
    };
})();
