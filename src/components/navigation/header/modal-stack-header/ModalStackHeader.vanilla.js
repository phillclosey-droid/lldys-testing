/**
 * ModalStackHeader Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Handles StatusBar (nested component).
 * 
 * Usage:
 * 1. Include ModalStackHeader.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML structure
 * 4. Icons automatically populate on page load
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
        
        console.log('[ModalStackHeader] Script path:', scriptPath);
        
        if (!scriptPath) {
            console.log('[ModalStackHeader] No script path, using default');
            return '../../assets';
        }
        
        const pathParts = scriptPath.split('/');
        const srcIndex = pathParts.findIndex(part => part === 'src');
        
        console.log('[ModalStackHeader] Path parts:', pathParts);
        console.log('[ModalStackHeader] src index:', srcIndex);
        
        if (srcIndex !== -1) {
            // In src/components/navigation/header/modal-stack-header/
            // Go up 5 levels to root
            const assetsPath = '../../../../../assets';
            console.log('[ModalStackHeader] Using assets path:', assetsPath);
            return assetsPath;
        }
        
        console.log('[ModalStackHeader] Using default assets path');
        return '../../assets';
    }
    
    /**
     * Initialize all ModalStackHeader components on the page
     */
    function initModalStackHeaders() {
        const ASSETS_BASE = getAssetsPath();
        
        console.log('[ModalStackHeader] Assets base:', ASSETS_BASE);
        
        // Find all modal stack headers
        const headers = document.querySelectorAll('.modal-stack-header');
        console.log('[ModalStackHeader] Found', headers.length, 'headers');
        
        headers.forEach((header, index) => {
            // Initialize all icons with data-icon attribute
            const icons = header.querySelectorAll('[data-icon]');
            console.log('[ModalStackHeader] Header', index, 'has', icons.length, 'icons');
            
            icons.forEach(icon => {
                const iconFile = icon.getAttribute('data-icon');
                const iconCategory = icon.getAttribute('data-icon-category') || 'navigation';
                
                if (iconFile) {
                    const iconPath = `${ASSETS_BASE}/icons/${iconCategory}/${iconFile}.svg`;
                    console.log('[ModalStackHeader] Setting icon path:', iconPath);
                    icon.src = iconPath;
                }
            });
        });
        
        console.log('[ModalStackHeader] Initialization complete');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModalStackHeaders);
    } else {
        initModalStackHeaders();
    }
    
    // Export for manual re-initialization
    window.initModalStackHeaders = initModalStackHeaders;
})();
