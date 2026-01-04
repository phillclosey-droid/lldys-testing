// Error Banner Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all error-banner components on the page
     */
    function initErrorBanners() {
        const errorBanners = document.querySelectorAll('.error-banner');
        
        errorBanners.forEach(errorBanner => {
            setupErrorBannerInteractions(errorBanner);
        });
    }

    /**
     * Setup error banner interactions
     */
    function setupErrorBannerInteractions(errorBanner) {
        const closeButton = errorBanner.querySelector('.error-banner-close');

        // Close button
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                const event = new CustomEvent('error-banner-close', {
                    bubbles: true
                });
                errorBanner.dispatchEvent(event);
                
                // Optional: Remove from DOM
                errorBanner.remove();
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initErrorBanners);
    } else {
        initErrorBanners();
    }

    // Export for manual initialization if needed
    window.ErrorBannerComponent = {
        init: initErrorBanners
    };
})();
