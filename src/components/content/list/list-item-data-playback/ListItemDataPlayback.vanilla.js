/**
 * List Item Data Playback Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes chevron icons.
 * 
 * Usage:
 * 1. Include ListItemDataPlayback.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-action-icon attribute
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
        
        if (!scriptPath) {
            return '../../../../../assets';
        }
        
        const pathParts = scriptPath.split('/');
        const srcIndex = pathParts.findIndex(part => part === 'src');
        
        if (srcIndex !== -1) {
            // Count how many levels deep we are from src
            const levelsDeep = pathParts.length - srcIndex - 2; // -2 for src and filename
            const upLevels = '../'.repeat(levelsDeep);
            return upLevels + 'assets';
        }
        
        return '../../../../../assets';
    }
    
    /**
     * Initialize all List Item Data Playback components on the page
     */
    function initListItemDataPlayback() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all list item data playback components
        const listItems = document.querySelectorAll('.list-item-data-playback');
        
        listItems.forEach(item => {
            // Initialize action icon (chevron)
            const actionIconImg = item.querySelector('.list-item-data-action-icon img[data-action-icon]');
            if (actionIconImg) {
                const iconFile = actionIconImg.getAttribute('data-action-icon') || 'chevron-right';
                actionIconImg.src = `${ASSETS_BASE}/icons/arrows/${iconFile}.svg`;
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initListItemDataPlayback);
    } else {
        initListItemDataPlayback();
    }
    
    // Export for manual re-initialization
    window.initListItemDataPlayback = initListItemDataPlayback;
})();
