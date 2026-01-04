/* 
  ServiceHeroPanel Component JavaScript - TOKEN LED
  
  Minimal initialization - most functionality handled by nested components.
  
  Dependencies:
  - Pictogram.vanilla.js (handles pictogram image loading)
  - NotificationHint.vanilla.js (handles hint interactions)
  - Accordion.vanilla.js (handles expand/collapse)
  - ActionButton.vanilla.js (handles button icons)
*/

(function() {
    'use strict';
    
    // ServiceHeroPanel initialization
    function initServiceHeroPanel() {
        const panels = document.querySelectorAll('.service-hero-panel');
        
        panels.forEach(function(panel) {
            // Component is initialized
            // Nested components (Pictogram, Accordion, etc.) handle their own initialization
            
            // Optional: Add custom event listeners or interactions here
            panel.setAttribute('data-service-hero-panel-initialized', 'true');
        });
        
        console.log('ServiceHeroPanel initialized:', panels.length, 'instance(s)');
    }
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServiceHeroPanel);
    } else {
        initServiceHeroPanel();
    }
    
    // Re-initialize on dynamic content
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    initServiceHeroPanel();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
