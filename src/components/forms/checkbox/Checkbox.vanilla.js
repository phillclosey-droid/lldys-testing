// Checkbox Vanilla JS - Load checkmark icon

(function() {
    'use strict';

    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/forms/checkbox/
            return '../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // In journeys folder: journeys/some-journey/
            return '../../assets';
        }
        
        return '../../assets';
    }

    /**
     * Initialize all checkbox components on the page
     */
    function initCheckboxes() {
        loadCheckmarkIcons();
    }

    /**
     * Load tick icons for all checkboxes
     */
    function loadCheckmarkIcons() {
        const ASSETS_BASE = getAssetsPath();
        const checkmarkIcons = document.querySelectorAll('.checkbox-icon-wrapper img');
        checkmarkIcons.forEach(img => {
            // Only set src if it's not already set or is a placeholder
            if (!img.src || img.getAttribute('data-icon') === 'checkmark') {
                img.src = `${ASSETS_BASE}/icons/action/tick.svg`;
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckboxes);
    } else {
        initCheckboxes();
    }

    // Export for manual initialization if needed
    window.CheckboxComponent = {
        init: initCheckboxes
    };
})();
