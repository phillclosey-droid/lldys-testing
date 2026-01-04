// Notification Hint Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all notification-hint components on the page
     */
    function initNotificationHints() {
        const hints = document.querySelectorAll('.notification-hint');
        
        hints.forEach(hint => {
            setupNotificationHintInteractions(hint);
        });
    }

    /**
     * Setup notification hint interactions
     */
    function setupNotificationHintInteractions(hint) {
        const content = hint.querySelector('.notification-hint-content');

        // Click on hint (optional interaction)
        if (content) {
            content.addEventListener('click', function() {
                const event = new CustomEvent('notification-hint-click', {
                    bubbles: true
                });
                hint.dispatchEvent(event);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotificationHints);
    } else {
        initNotificationHints();
    }

    // Export for manual initialization if needed
    window.NotificationHintComponent = {
        init: initNotificationHints
    };
})();
