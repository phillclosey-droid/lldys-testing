/**
 * GhostPanel Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Handles illustrations and action button icons.
 * 
 * Usage:
 * 1. Include GhostPanel.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-illustration and data-action-icon attributes
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
            // In src/components/action/ghost-panel/
            return '../../../../assets';
        }
        
        return '../../assets';
    }
    
    /**
     * Get illustration variant folder from class name
     */
    function getIllustrationFolder(illustrationElement) {
        const classes = illustrationElement.className.split(' ');
        const variantClass = classes.find(c => c.startsWith('ill-'));
        
        if (!variantClass) return 'default-alt-01';
        
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
        
        return variantMap[variantClass] || 'default-alt-01';
    }
    
    /**
     * Initialize all GhostPanel components on the page
     */
    function initGhostPanels() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all ghost panels
        const ghostPanels = document.querySelectorAll('.ghost-panel');
        
        ghostPanels.forEach(panel => {
            // Initialize illustration
            const illustrationContainer = panel.querySelector('.ghost-panel-illustration');
            const illustrationImg = illustrationContainer?.querySelector('img[data-illustration]');
            
            if (illustrationImg) {
                const illustrationFile = illustrationImg.getAttribute('data-illustration');
                if (illustrationFile) {
                    const folder = getIllustrationFolder(illustrationContainer);
                    illustrationImg.src = `${ASSETS_BASE}/illustrations/${folder}/${illustrationFile}.svg`;
                }
            }
            
            // Initialize action button icon (default to plus)
            const actionIconImg = panel.querySelector('.ghost-panel-icon-button-icon img[data-action-icon]');
            if (actionIconImg) {
                const iconFile = actionIconImg.getAttribute('data-action-icon') || 'plus';
                actionIconImg.src = `${ASSETS_BASE}/icons/action/${iconFile}.svg`;
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGhostPanels);
    } else {
        initGhostPanels();
    }
    
    // Export for manual re-initialization
    window.initGhostPanels = initGhostPanels;
})();
