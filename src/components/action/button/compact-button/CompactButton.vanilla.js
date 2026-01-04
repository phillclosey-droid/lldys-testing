/**
 * CompactButton Vanilla JavaScript - Icon Loading
 * Handles SVG icon loading for compact buttons
 */

(function() {
    'use strict';

    /**
     * Determines the correct path to the assets folder based on current location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/action/button-stack/')) {
            return '../../../../../assets';
        } else if (currentPath.includes('/src/components/action/button/')) {
            return '../../../../../assets';
        } else if (currentPath.includes('/src/components/')) {
            return '../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            return '../../assets';
        }
        
        return '../../../../assets';
    }

    /**
     * Load an SVG icon
     */
    function loadIcon(imgElement, iconName, category) {
        const assetsPath = getAssetsPath();
        const iconPath = `${assetsPath}/icons/${category}/${iconName}.svg`;
        imgElement.src = iconPath;
    }

    /**
     * Initialize all compact button icons
     */
    function initCompactButtons() {
        const buttons = document.querySelectorAll('.compact-button');
        
        buttons.forEach(button => {
            const icons = button.querySelectorAll('[data-icon]');
            
            icons.forEach(icon => {
                const iconName = icon.getAttribute('data-icon');
                const category = icon.getAttribute('data-icon-category') || 'interface';
                
                if (iconName) {
                    loadIcon(icon, iconName, category);
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompactButtons);
    } else {
        initCompactButtons();
    }

    // Export for external use
    window.CompactButton = {
        init: initCompactButtons,
        loadIcon: loadIcon
    };
})();
