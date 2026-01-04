/* 
  ServiceAlert Component JavaScript - TOKEN LED
  
  Handles close button functionality.
  
  Dependencies:
  - ActionButton.vanilla.js (handles button icons)
*/

(function() {
    'use strict';
    
    // ServiceAlert initialization
    function initServiceAlert() {
        const alerts = document.querySelectorAll('.service-alert');
        
        alerts.forEach(function(alert) {
            const closeButton = alert.querySelector('.service-alert-close');
            
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    // Get current height for animation
                    const currentHeight = alert.offsetHeight;
                    
                    // Set explicit height, then animate to 0
                    alert.style.height = currentHeight + 'px';
                    alert.style.overflow = 'hidden';
                    alert.style.transition = 'height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out';
                    
                    // Force reflow
                    alert.offsetHeight;
                    
                    // Animate out
                    alert.style.height = '0';
                    alert.style.opacity = '0';
                    alert.style.marginBottom = '0';
                    
                    setTimeout(function() {
                        alert.remove();
                    }, 300);
                    
                    // Dispatch custom event
                    const event = new CustomEvent('service-alert-closed', {
                        detail: { alert: alert }
                    });
                    document.dispatchEvent(event);
                });
            }
            
            // Component is initialized
            alert.setAttribute('data-service-alert-initialized', 'true');
        });
        
        console.log('ServiceAlert initialized:', alerts.length, 'instance(s)');
    }
    
    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initServiceAlert);
    } else {
        initServiceAlert();
    }
    
    // Re-initialize on dynamic content
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    initServiceAlert();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
