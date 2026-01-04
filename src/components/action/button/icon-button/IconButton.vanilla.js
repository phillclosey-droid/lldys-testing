// IconButton JavaScript - Icon loader (uses same system as ActionButton)

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            return '../../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            return '../../assets';
        }
        
        return '../../assets';
    }
    
    /**
     * Load an icon SVG and insert it into the img element
     */
    function loadIcon(imgElement) {
        const ASSETS_BASE = getAssetsPath();
        const iconName = imgElement.getAttribute('data-icon');
        const iconCategory = imgElement.getAttribute('data-icon-category') || 'arrows';
        
        if (!iconName) {
            console.warn('Icon element missing data-icon attribute');
            return;
        }
        
        const iconPath = `${ASSETS_BASE}/icons/${iconCategory}/${iconName}.svg`;
        
        // Set the src attribute
        imgElement.src = iconPath;
        imgElement.alt = iconName;
    }
    
    /**
     * Initialize all icon buttons
     */
    function initIconButtons() {
        const iconImages = document.querySelectorAll('.icon-button-icon img[data-icon]');
        iconImages.forEach(loadIcon);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIconButtons);
    } else {
        initIconButtons();
    }
    
    // Export for manual initialization if needed
    window.IconButton = {
        init: initIconButtons,
        loadIcon: loadIcon
    };
})();
