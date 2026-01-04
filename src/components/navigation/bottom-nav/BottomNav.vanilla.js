/**
 * BottomNav Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all tab icon paths.
 * Works with file:// protocol for portable, offline use across different directory depths.
 * Handles both inactive and active icon states.
 * 
 * Usage:
 * 1. Include BottomNav.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML structure with data-tab-icon attributes
 * 4. Icons automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder using the script's src attribute
     * This works reliably for file:// protocol across different HTML locations
     */
    function getAssetsPath() {
        if (window.BOTTOM_NAV_ASSETS_PATH) {
            return window.BOTTOM_NAV_ASSETS_PATH;
        }
        
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('BottomNav.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('BottomNav: Could not find script src');
            return './assets';
        }
        
        const scriptInternalPath = 'src/components/navigation/bottom-nav/BottomNav.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        const upLevels = (scriptSrc.match(/\.\.\//g) || []).length;
        return '../'.repeat(upLevels) + 'assets';
    }
    
    /**
     * Initialize all BottomNav components on the page
     */
    function initBottomNavs() {
        const ASSETS_BASE = getAssetsPath();
        
        // Find all bottom navs
        const bottomNavs = document.querySelectorAll('.bottom-nav');
        
        bottomNavs.forEach(nav => {
            // Initialize all tab icons
            const tabIcons = nav.querySelectorAll('[data-tab-icon]');
            tabIcons.forEach(icon => {
                const iconNumber = icon.getAttribute('data-tab-icon');
                const iconState = icon.getAttribute('data-icon-state'); // 'inactive' or 'active'
                
                if (iconNumber && iconState && !icon.src) {
                    const suffix = iconState === 'active' ? '-active' : '';
                    icon.src = `${ASSETS_BASE}/icons/tabs/tab-${iconNumber}-icon${suffix}.svg`;
                }
            });
        });
    }
    
    /**
     * Set active tab (called by onclick handlers)
     */
    function setActiveTab(tabIndex, navElement) {
        const nav = navElement || document.querySelector('.bottom-nav');
        if (!nav) return;
        
        const tabs = nav.querySelectorAll('.bottom-nav-tab');
        const segments = nav.querySelectorAll('.active-border-segment');

        // Remove active class from all
        tabs.forEach(tab => tab.classList.remove('active'));
        segments.forEach(segment => segment.classList.remove('active'));

        // Add active class to selected
        if (tabs[tabIndex]) tabs[tabIndex].classList.add('active');
        if (segments[tabIndex]) segments[tabIndex].classList.add('active');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBottomNavs);
    } else {
        initBottomNavs();
    }
    
    // Export functions
    window.initBottomNavs = initBottomNavs;
    window.setActiveTab = setActiveTab;
})();
