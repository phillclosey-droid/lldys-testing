/**
 * Native Spinner Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes spinner frames.
 * Supports 4 spinner sets with automatic light/dark mode switching.
 * 
 * Usage:
 * 1. Include NativeSpinner.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-spinner-set attribute
 * 4. Spinner frames automatically populate on page load
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
            // Fallback for local testing
            return '../../../../assets';
        }
        
        const pathParts = scriptPath.split('/');
        const srcIndex = pathParts.findIndex(part => part === 'src');
        
        if (srcIndex !== -1) {
            // We're at: /src/components/os/native-spinner-configuration/NativeSpinner.vanilla.js
            // We need: /assets
            // That's 4 levels up from the JS file location
            return '../../../../assets';
        }
        
        return '../../../../assets';
    }
    
    /**
     * Get current theme (light or dark)
     */
    function getCurrentTheme() {
        const htmlTheme = document.documentElement.getAttribute('data-theme');
        if (htmlTheme === 'dark' || htmlTheme === 'light') {
            return htmlTheme;
        }
        
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    
    /**
     * Initialize a single spinner
     */
    function initSpinner(spinner) {
        const ASSETS_BASE = getAssetsPath();
        const spinnerSet = spinner.getAttribute('data-spinner-set') || '1';
        const theme = getCurrentTheme();
        
        // Determine number of frames based on set
        let frameCount;
        
        switch(spinnerSet) {
            case '1':
                frameCount = 8;
                break;
            case '2':
                frameCount = 4;
                break;
            case '3':
                frameCount = 4;
                break;
            case '4':
                frameCount = 4;
                break;
            default:
                frameCount = 8;
        }
        
        // Clear existing images
        spinner.innerHTML = '';
        
        // Create frame images
        for (let i = 1; i <= frameCount; i++) {
            const img = document.createElement('img');
            
            // Determine filename based on set
            let filename;
            if (spinnerSet === '3') {
                // Set 3 uses 1.svg, 2.svg, 3.svg, 4.svg
                filename = `${i}.svg`;
            } else {
                // Other sets use 01.svg, 02.svg, etc.
                filename = `${String(i).padStart(2, '0')}.svg`;
            }
            
            const fullPath = `${ASSETS_BASE}/spinners/spinner-set-${spinnerSet}/${theme}/${filename}`;
            img.src = fullPath;
            img.alt = '';
            
            // Debug log
            console.log('Loading spinner frame:', fullPath);
            
            spinner.appendChild(img);
        }
        
        console.log('Initialized spinner - Set:', spinnerSet, 'Theme:', theme, 'Frames:', frameCount);
    }
    
    /**
     * Initialize all Native Spinner components on the page
     */
    function initNativeSpinners() {
        const spinners = document.querySelectorAll('.native-spinner');
        console.log('Found', spinners.length, 'spinners to initialize');
        spinners.forEach(initSpinner);
    }
    
    /**
     * Re-initialize spinners when theme changes
     */
    function setupThemeListener() {
        // Listen for data-theme attribute changes on html element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    console.log('Theme changed, re-initializing spinners');
                    initNativeSpinners();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
        
        // Also listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            // Only reinit if no explicit data-theme is set
            if (!document.documentElement.getAttribute('data-theme')) {
                console.log('System theme changed, re-initializing spinners');
                initNativeSpinners();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, initializing spinners');
            initNativeSpinners();
            setupThemeListener();
        });
    } else {
        console.log('DOM already loaded, initializing spinners immediately');
        initNativeSpinners();
        setupThemeListener();
    }
    
    // Export for manual re-initialization
    window.initNativeSpinners = initNativeSpinners;
})();
