/**
 * Pictogram Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes pictogram image paths.
 * Works with file:// protocol for portable, offline use across different directory depths.
 * 
 * Usage:
 * 1. Include Pictogram.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-pictogram attribute
 * 4. Images automatically populate on page load
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
        if (window.PICTOGRAM_ASSETS_PATH) {
            return window.PICTOGRAM_ASSETS_PATH;
        }
        
        // Find THIS script's src attribute
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('Pictogram.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('Pictogram: Could not find script src');
            return './assets';
        }
        
        // The script is located at: /src/components/content/icon/pictogram/Pictogram.vanilla.js
        const scriptInternalPath = 'src/components/content/icon/pictogram/Pictogram.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            // Replace the internal path with 'assets'
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        // Fallback: From icon/pictogram to root is 5 levels, then to assets
        return '../../../../../assets';
    }
    
    /**
     * Initialize all Pictogram components on the page
     */
    function initPictograms() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all pictograms
        const pictograms = document.querySelectorAll('.pictogram img[data-pictogram]');
        
        pictograms.forEach(img => {
            const pictogramFile = img.getAttribute('data-pictogram');
            if (pictogramFile && !img.src) {
                // Load from assets/pictograms/{file}.svg (no subfolders)
                img.src = `${ASSETS_BASE}/pictograms/${pictogramFile}.svg`;
                
                // Debug logging
                if (window.DEBUG_PICTOGRAMS) {
                    console.log('Pictogram loaded:', {
                        file: pictogramFile,
                        assetsBase: ASSETS_BASE,
                        fullPath: img.src
                    });
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPictograms);
    } else {
        initPictograms();
    }
    
    // Export for manual re-initialization
    window.initPictograms = initPictograms;
})();
