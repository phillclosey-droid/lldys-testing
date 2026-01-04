/**
 * Accordion Component - Self-Initializing Script
 * 
 * Handles accordion expand/collapse functionality
 * Works with file:// protocol for portable, offline use across different directory depths.
 * Auto-loads plus/minus icons
 * 
 * Usage:
 * 1. Include Accordion.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data attributes
 * 4. Click accordion headers to toggle
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder using the script's src attribute
     * This works reliably for file:// protocol across different HTML locations
     */
    function getAssetsPath() {
        if (window.ACCORDION_ASSETS_PATH) {
            return window.ACCORDION_ASSETS_PATH;
        }
        
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('Accordion.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('Accordion: Could not find script src');
            return './assets';
        }
        
        const scriptInternalPath = 'src/components/content/accordion/Accordion.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        const upLevels = (scriptSrc.match(/\.\.\//g) || []).length;
        return '../'.repeat(upLevels) + 'assets';
    }
    
    /**
     * Initialize all Accordion components on the page
     */
    function initAccordions() {
        const ASSETS_BASE = getAssetsPath();
        
        // Load plus icons
        const plusImgs = document.querySelectorAll('.accordion-icon-plus img[data-icon-plus]');
        plusImgs.forEach(img => {
            if (!img.src) {
                img.src = `${ASSETS_BASE}/icons/action/plus.svg`;
            }
        });
        
        // Load minus icons
        const minusImgs = document.querySelectorAll('.accordion-icon-minus img[data-icon-minus]');
        minusImgs.forEach(img => {
            if (!img.src) {
                img.src = `${ASSETS_BASE}/icons/action/minus.svg`;
            }
        });
        
        // Load label icons (18px icons in the label)
        const labelIcons = document.querySelectorAll('.accordion-label-icon img[data-icon]');
        labelIcons.forEach(img => {
            const iconFile = img.getAttribute('data-icon');
            const iconCategory = img.getAttribute('data-icon-category') || 'finance';
            if (iconFile && !img.src) {
                img.src = `${ASSETS_BASE}/icons/${iconCategory}/${iconFile}.svg`;
            }
        });
        
        // Load chevron icons (alternative icon style)
        const chevronImgs = document.querySelectorAll('.accordion-icon-chevron img[data-chevron-down]');
        chevronImgs.forEach(img => {
            if (!img.src) {
                img.src = `${ASSETS_BASE}/icons/arrows/chevron-down.svg`;
            }
        });
        
        // Add click handlers to accordion headers
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.closest('.accordion-item');
                
                // Toggle is-open class
                accordionItem.classList.toggle('is-open');
                
                // Toggle is-pressed class for visual feedback
                this.classList.add('is-pressed');
                setTimeout(() => {
                    this.classList.remove('is-pressed');
                }, 200);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccordions);
    } else {
        initAccordions();
    }
    
    // Export for manual re-initialization
    window.initAccordions = initAccordions;
})();
