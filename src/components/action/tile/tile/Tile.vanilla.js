/**
 * Tile Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Handles pictograms, icons, and chevrons.
 * 
 * Usage:
 * 1. Include Tile.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data attributes
 * 4. Images automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder based on current page location
     * Dynamically determines nesting depth for accurate pathing
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/action/tile/tile/
            return '../../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // Count the depth of nesting in journeys folder
            // Extract the part after '/journeys/'
            const afterJourneys = currentPath.split('/journeys/')[1];
            if (!afterJourneys) return '../../assets';
            
            // Count directory separators to determine depth
            // journeys/page.html = ['page.html'] = 1 part = ../../assets
            // journeys/folder/page.html = ['folder', 'page.html'] = 2 parts = ../../../assets
            // journeys/01-mvp/01-summary/page.html = ['01-mvp', '01-summary', 'page.html'] = 3 parts = ../../../../assets
            const pathParts = afterJourneys.split('/').filter(part => part.length > 0);
            const depth = pathParts.length;
            
            // We need (depth + 1) levels up: depth to get out of nested folders, +1 to get out of journeys
            const upLevels = '../'.repeat(depth + 1);
            return `${upLevels}assets`;
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
     * Initialize all Tile components on the page
     */
    function initTiles() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all tiles
        const tiles = document.querySelectorAll('.tile');
        
        tiles.forEach(tile => {
            // Initialize pictograms
            const pictogramImg = tile.querySelector('.pictogram img[data-pictogram]');
            if (pictogramImg) {
                const pictogramFile = pictogramImg.getAttribute('data-pictogram');
                if (pictogramFile) {
                    pictogramImg.src = `${ASSETS_BASE}/pictograms/${pictogramFile}.svg`;
                }
            }
            
            // Initialize icons (small icons, not chevrons)
            const iconImgs = tile.querySelectorAll('.tile-icon img[data-icon]');
            iconImgs.forEach(iconImg => {
                const iconFile = iconImg.getAttribute('data-icon');
                const iconCategory = iconImg.getAttribute('data-icon-category');
                
                if (iconFile) {
                    const category = iconCategory || iconCategories[iconFile] || 'navigation';
                    iconImg.src = `${ASSETS_BASE}/icons/${category}/${iconFile}.svg`;
                }
            });
            
            // Initialize chevrons
            const chevronImgs = tile.querySelectorAll('.tile-icon img[data-chevron]');
            chevronImgs.forEach(chevronImg => {
                chevronImg.src = `${ASSETS_BASE}/icons/arrows/chevron-right.svg`;
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTiles);
    } else {
        initTiles();
    }
    
    // Export for manual re-initialization
    window.initTiles = initTiles;
})();
