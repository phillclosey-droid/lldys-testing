/**
 * Spinner (with Icon Overlay) Component - Self-Initializing Script
 * 
 * Loads icon overlay on top of native spinner.
 * 
 * Usage:
 * 1. Include Spinner.vanilla.css
 * 2. Include NativeSpinner.vanilla.js (dependency)
 * 3. Include this script after NativeSpinner.vanilla.js
 * 4. Add HTML with data-spinner-icon attribute
 * 5. Icon auto-populates on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder from current script location
     */
    function getAssetsPath() {
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1];
        const scriptPath = currentScript.src;
        
        if (!scriptPath) {
            return '../../../../assets';
        }
        
        const pathParts = scriptPath.split('/');
        const srcIndex = pathParts.findIndex(part => part === 'src');
        
        if (srcIndex !== -1) {
            // We're at: /src/components/os/spinner/Spinner.vanilla.js
            // We need: /assets
            // That's 4 levels up from the JS file location
            return '../../../../assets';
        }
        
        return '../../../../assets';
    }
    
    /**
     * Initialize icon overlays for all spinner-with-icon components
     */
    function initSpinnerIcons() {
        const ASSETS_BASE = getAssetsPath();
        const spinners = document.querySelectorAll('.spinner-with-icon');
        
        spinners.forEach(spinner => {
            const iconOverlay = spinner.querySelector('.spinner-icon-overlay img[data-spinner-icon]');
            
            if (iconOverlay) {
                const iconName = iconOverlay.getAttribute('data-spinner-icon');
                
                if (iconName) {
                    // Determine icon folder based on icon name
                    // Default to 'action' folder for common icons
                    const iconFolder = 'action'; // Could be extended to support other folders
                    iconOverlay.src = `${ASSETS_BASE}/icons/${iconFolder}/${iconName}.svg`;
                    
                    console.log('Loading spinner icon:', iconName, 'from', iconOverlay.src);
                }
            }
        });
        
        console.log('Initialized', spinners.length, 'spinner icon overlays');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSpinnerIcons);
    } else {
        initSpinnerIcons();
    }
    
    // Export for manual re-initialization
    window.initSpinnerIcons = initSpinnerIcons;
})();
