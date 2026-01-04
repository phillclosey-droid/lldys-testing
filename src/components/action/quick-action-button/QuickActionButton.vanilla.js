/**
 * QuickActionButton Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all icon paths.
 * 
 * Usage:
 * 1. Include QuickActionButton.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-icon attributes
 * 4. Icons automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        // Get current page path
        const currentPath = window.location.pathname;
        
        // Count how many levels deep we are from root
        const pathParts = currentPath.split('/').filter(part => part !== '');
        
        // Check if we're in src/components/
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/action/quick-action-button/
            return '../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // In journeys folder: journeys/fresh-test/
            return '../../assets';
        }
        
        // Default: assume we're 2 levels deep
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
     * Initialize all QuickActionButton components on the page
     */
    function initQuickActionButtons() {
        const ASSETS_BASE = getAssetsPath();
        
        console.log('QuickActionButton: ASSETS_BASE =', ASSETS_BASE); // Debug log
        
        // Find all quick action buttons
        const buttons = document.querySelectorAll('.quick-action-button');
        
        console.log('QuickActionButton: Found', buttons.length, 'buttons'); // Debug log
        
        buttons.forEach(button => {
            // Initialize icon
            const iconImg = button.querySelector('.icon-container img[data-icon]');
            if (iconImg) {
                const iconFile = iconImg.getAttribute('data-icon');
                const iconCategory = iconImg.getAttribute('data-icon-category');
                
                if (iconFile) {
                    const category = iconCategory || iconCategories[iconFile] || 'navigation';
                    const iconPath = `${ASSETS_BASE}/icons/${category}/${iconFile}.svg`;
                    iconImg.src = iconPath;
                    console.log('QuickActionButton: Set icon:', iconPath); // Debug log
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuickActionButtons);
    } else {
        initQuickActionButtons();
    }
    
    // Export for manual re-initialization
    window.initQuickActionButtons = initQuickActionButtons;
})();
