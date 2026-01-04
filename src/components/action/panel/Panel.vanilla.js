/**
 * Panel Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Supports three variants: none (text-only), icon, and pictogram.
 * 
 * Usage:
 * 1. Include Panel.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-icon, data-pictogram, and data-chevron attributes
 * 4. Images automatically populate on page load
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
            return '../../assets';
        }
        
        const pathParts = scriptPath.split('/');
        const srcIndex = pathParts.findIndex(part => part === 'src');
        
        if (srcIndex !== -1) {
            // In src/components/action/panel/
            return '../../../../assets';
        }
        
        return '../../assets';
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
        'chevron-right': 'arrows',
        'chevron-left': 'arrows',
    };
    
    /**
     * Initialize all Panel components on the page
     */
    function initPanels() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all panels
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach(panel => {
            // Initialize panel icon (24px left icon)
            const panelIcon = panel.querySelector('[data-icon]');
            if (panelIcon) {
                const iconFile = panelIcon.getAttribute('data-icon');
                const iconCategory = panelIcon.getAttribute('data-icon-category');
                
                if (iconFile) {
                    const category = iconCategory || iconCategories[iconFile] || 'navigation';
                    panelIcon.src = `${ASSETS_BASE}/icons/${category}/${iconFile}.svg`;
                }
            }
            
            // Initialize pictogram (40px circle)
            const pictogramImg = panel.querySelector('.pictogram img[data-pictogram]');
            if (pictogramImg) {
                const pictogramFile = pictogramImg.getAttribute('data-pictogram');
                if (pictogramFile) {
                    pictogramImg.src = `${ASSETS_BASE}/pictograms/${pictogramFile}.svg`;
                }
            }
            
            // Initialize chevron (always present)
            const chevronImg = panel.querySelector('.panel-chevron img[data-chevron]');
            if (chevronImg) {
                chevronImg.src = `${ASSETS_BASE}/icons/arrows/chevron-right.svg`;
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPanels);
    } else {
        initPanels();
    }
    
    // Export for manual re-initialization
    window.initPanels = initPanels;
})();
