/**
 * ActionButton Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all icon paths.
 * Works with file:// protocol for portable, offline use across different directory depths.
 * 
 * Usage:
 * 1. Include ActionButton.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-icon attributes
 * 4. Icons automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder using the script's src attribute
     * This works reliably for file:// protocol across different HTML locations
     */
    function getAssetsPath() {
        if (window.ACTION_BUTTON_ASSETS_PATH) {
            return window.ACTION_BUTTON_ASSETS_PATH;
        }
        
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('ActionButton.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('ActionButton: Could not find script src');
            return './assets';
        }
        
        const scriptInternalPath = 'src/components/action/button/action-button/ActionButton.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        const upLevels = (scriptSrc.match(/\.\.\//g) || []).length;
        return '../'.repeat(upLevels) + 'assets';
    }
    
    /**
     * Icon category mapping for common icons
     */
    const iconCategories = {
        'home': 'navigation',
        'search': 'navigation',
        'burger-menu': 'navigation',
        'person': 'people',
        'current-account': 'finance',
        'savings-account': 'finance',
        'card': 'finance',
        'arrow-right': 'arrows',
        'arrow-left': 'arrows',
        'chevron-right': 'arrows',
        'chevron-left': 'arrows',
    };
    
    /**
     * Initialize all ActionButton components on the page
     */
    function initActionButtons() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all action buttons
        const buttons = document.querySelectorAll('.action-button');
        
        buttons.forEach(button => {
            // Initialize icon
            const iconImg = button.querySelector('.action-button-icon img[data-icon]');
            if (iconImg && !iconImg.src) {
                const iconFile = iconImg.getAttribute('data-icon');
                const iconCategory = iconImg.getAttribute('data-icon-category');
                
                if (iconFile) {
                    const category = iconCategory || iconCategories[iconFile] || 'navigation';
                    iconImg.src = `${ASSETS_BASE}/icons/${category}/${iconFile}.svg`;
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initActionButtons);
    } else {
        initActionButtons();
    }
    
    // Export for manual re-initialization
    window.initActionButtons = initActionButtons;
})();
