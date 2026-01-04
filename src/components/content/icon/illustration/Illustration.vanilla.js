/**
 * Illustration Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes illustration image paths.
 * Works with file:// protocol for portable, offline use across different directory depths.
 * Automatically determines folder based on variant class.
 * 
 * Usage:
 * 1. Include Illustration.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-illustration attribute and variant class
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
        if (window.ILLUSTRATION_ASSETS_PATH) {
            return window.ILLUSTRATION_ASSETS_PATH;
        }
        
        // Find THIS script's src attribute
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('Illustration.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('Illustration: Could not find script src');
            return './assets';
        }
        
        // Remove the filename to get directory
        const scriptDir = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
        
        // Replace known component path with assets
        if (scriptDir.includes('src/components/content/icon/illustration')) {
            return scriptDir.replace(/src\/components\/content\/icon\/illustration.*/, 'assets');
        }
        
        // Fallback: Navigate up from script location to assets
        return scriptDir + '/../../../../../assets';
    }
    
    /**
     * Get illustration variant folder from class name
     */
    function getIllustrationFolder(illustrationElement) {
        const classes = illustrationElement.className.split(' ');
        const variantClass = classes.find(c => c.startsWith('ill-'));
        
        if (!variantClass) return 'default';
        
        // Map class to folder name
        const variantMap = {
            'ill-default': 'default',
            'ill-default-alt-01': 'default-alt-01',
            'ill-default-alt-02': 'default-alt-02',
            'ill-primary': 'primary',
            'ill-primary-alt-01': 'primary-alt-01',
            'ill-primary-alt-02': 'primary-alt-02',
            'ill-primary-alt-03': 'primary-alt-03',
            'ill-secondary': 'secondary',
            'ill-secondary-alt-01': 'secondary-alt-01',
            'ill-secondary-alt-02': 'secondary-alt-02',
            'ill-secondary-alt-03': 'secondary-alt-03',
            'ill-secondary-alt-04': 'secondary-alt-04',
        };
        
        return variantMap[variantClass] || 'default';
    }
    
    /**
     * Initialize all Illustration components on the page
     */
    function initIllustrations() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all illustrations
        const illustrations = document.querySelectorAll('.illustration');
        
        illustrations.forEach(illustration => {
            const img = illustration.querySelector('img[data-illustration]');
            if (img && !img.src) {  // Only set if not already set
                const illustrationFile = img.getAttribute('data-illustration');
                if (illustrationFile) {
                    const folder = getIllustrationFolder(illustration);
                    const imagePath = `${ASSETS_BASE}/illustrations/${folder}/${illustrationFile}.svg`;
                    img.src = imagePath;
                    
                    // Debug logging
                    if (window.DEBUG_ILLUSTRATIONS) {
                        console.log('Illustration loaded:', {
                            file: illustrationFile,
                            folder: folder,
                            assetsBase: ASSETS_BASE,
                            fullPath: imagePath
                        });
                    }
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIllustrations);
    } else {
        initIllustrations();
    }
    
    // Export for manual re-initialization
    window.initIllustrations = initIllustrations;
})();
