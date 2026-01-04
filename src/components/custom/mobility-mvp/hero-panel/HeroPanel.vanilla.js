/**
 * HeroPanel Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Handles pictograms, icons, and action buttons.
 * 
 * Usage:
 * 1. Include HeroPanel.vanilla.css and Pictogram.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data attributes
 * 4. Images automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder from current script location
     */
    function getAssetsPath() {
        // Manual override if needed
        if (window.HERO_PANEL_ASSETS_PATH) {
            return window.HERO_PANEL_ASSETS_PATH;
        }
        
        // Find THIS script's src attribute
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('HeroPanel.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('HeroPanel: Could not find script src');
            return './assets';
        }
        
        // Remove the filename to get directory
        const scriptDir = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
        
        // Replace known component path with assets
        if (scriptDir.includes('src/components/custom/mobility-mvp/hero-panel')) {
            return scriptDir.replace(/src\/components\/custom\/mobility-mvp\/hero-panel.*/, 'assets');
        }
        
        // Fallback: Navigate up from script location to assets
        return scriptDir + '/../../../../../assets';
    }
    
    /**
     * Initialize all HeroPanel components on the page
     */
    function initHeroPanels() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all hero panels
        const heroPanels = document.querySelectorAll('.hero-panel-container');
        
        heroPanels.forEach(panel => {
            // Note: Pictograms are initialized by Pictogram.vanilla.js
            // This script only handles non-pictogram icons
            
            // Initialize edit icon
            const editIcon = panel.querySelector('.hero-panel-edit-icon[data-icon]');
            if (editIcon) {
                const iconFile = editIcon.getAttribute('data-icon');
                const iconFolder = editIcon.getAttribute('data-icon-folder') || 'edit';
                if (iconFile) {
                    editIcon.src = `${ASSETS_BASE}/icons/${iconFolder}/${iconFile}.svg`;
                }
            }
            
            // Initialize service panel icons
            const serviceIcons = panel.querySelectorAll('.hero-panel-service-circle img[data-icon]');
            serviceIcons.forEach(icon => {
                const iconFile = icon.getAttribute('data-icon');
                const iconFolder = icon.getAttribute('data-icon-folder') || 'miscellaneous';
                if (iconFile) {
                    icon.src = `${ASSETS_BASE}/icons/${iconFolder}/${iconFile}.svg`;
                }
            });
            
            // Initialize ghost panel action buttons
            const actionIcons = panel.querySelectorAll('.hero-panel-ghost-button-icon img[data-action-icon]');
            actionIcons.forEach(icon => {
                const iconFile = icon.getAttribute('data-action-icon') || 'plus';
                const iconFolder = icon.getAttribute('data-icon-folder') || 'action';
                icon.src = `${ASSETS_BASE}/icons/${iconFolder}/${iconFile}.svg`;
            });
            
            // Initialize car image if provided
            const carImageContainer = panel.querySelector('.hero-panel-car-image[data-car-image]');
            if (carImageContainer) {
                const carImageUrl = carImageContainer.getAttribute('data-car-image');
                if (carImageUrl && carImageUrl.trim() !== '') {
                    const img = document.createElement('img');
                    img.src = carImageUrl;
                    img.alt = 'Car image';
                    carImageContainer.appendChild(img);
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroPanels);
    } else {
        initHeroPanels();
    }
    
    // Export for manual re-initialization
    window.initHeroPanels = initHeroPanels;
})();
