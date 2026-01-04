/**
 * CustomHeader Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Works with file:// protocol for portable, offline use across different directory depths.
 * Handles StatusBar and NotificationBadge (nested components).
 * 
 * Usage:
 * 1. Include CustomHeader.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML structure
 * 4. Icons automatically populate on page load
 * 
 * Path Resolution Strategy:
 * - Uses the script's own src attribute to determine its location relative to the HTML
 * - Calculates the path from the script directory back to the project root
 * - Then navigates to assets folder
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder using the script's src attribute
     * This works reliably for file:// protocol across different HTML locations
     */
    function getAssetsPath() {
        // Manual override if needed
        if (window.CUSTOM_HEADER_ASSETS_PATH) {
            return window.CUSTOM_HEADER_ASSETS_PATH;
        }
        
        // Find THIS script's src attribute
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('CustomHeader.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('CustomHeader: Could not find script src');
            return './assets';
        }
        
        // The script is located at: /src/components/navigation/header/custom-header/CustomHeader.vanilla.js
        const scriptInternalPath = 'src/components/navigation/header/custom-header/CustomHeader.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            // Replace the internal path with 'assets'
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        // Fallback: count "../" at the start
        const upLevels = (scriptSrc.match(/\.\.\//g) || []).length;
        return '../'.repeat(upLevels) + 'assets';
    }
    
    /**
     * Initialize all CustomHeader components on the page
     */
    function initCustomHeaders() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all custom headers
        const headers = document.querySelectorAll('.custom-header');
        
        headers.forEach(header => {
            // Initialize all icons with data-icon attribute
            const icons = header.querySelectorAll('[data-icon]');
            icons.forEach(icon => {
                const iconFile = icon.getAttribute('data-icon');
                const iconCategory = icon.getAttribute('data-icon-category') || 'navigation';
                
                if (iconFile && !icon.src) {
                    icon.src = `${ASSETS_BASE}/icons/${iconCategory}/${iconFile}.svg`;
                    
                    // Debug logging
                    if (window.DEBUG_CUSTOM_HEADER) {
                        console.log('Icon loaded:', {
                            file: iconFile,
                            category: iconCategory,
                            assetsBase: ASSETS_BASE,
                            fullPath: icon.src
                        });
                    }
                }
            });
        });
        
        // Also initialize icons OUTSIDE the header that might use data-icon
        // This includes the tick icons in step items
        const globalIcons = document.querySelectorAll('[data-icon]:not(.custom-header [data-icon])');
        globalIcons.forEach(icon => {
            const iconFile = icon.getAttribute('data-icon');
            const iconCategory = icon.getAttribute('data-icon-category') || 'action';
            
            if (iconFile && !icon.src) {
                icon.src = `${ASSETS_BASE}/icons/${iconCategory}/${iconFile}.svg`;
                
                // Debug logging
                if (window.DEBUG_CUSTOM_HEADER) {
                    console.log('Global icon loaded:', {
                        file: iconFile,
                        category: iconCategory,
                        assetsBase: ASSETS_BASE,
                        fullPath: icon.src
                    });
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCustomHeaders);
    } else {
        initCustomHeaders();
    }
    
    // Export for manual re-initialization
    window.initCustomHeaders = initCustomHeaders;
})();
