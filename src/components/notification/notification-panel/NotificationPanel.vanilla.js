// Notification Panel Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all notification-panel components on the page
     */
    function initNotificationPanels() {
        const panels = document.querySelectorAll('.notification-panel');
        
        panels.forEach(panel => {
            setupNotificationPanelInteractions(panel);
        });
    }

    /**
     * Setup notification panel interactions
     */
    function setupNotificationPanelInteractions(panel) {
        const content = panel.querySelector('.notification-panel-content');
        const actionButton = panel.querySelector('.notification-panel-action');

        // Click on panel (not on action button)
        if (content) {
            content.addEventListener('click', function(e) {
                // Don't trigger if clicking action button
                if (e.target.closest('.notification-panel-action')) {
                    return;
                }
                
                const event = new CustomEvent('notification-panel-click', {
                    bubbles: true
                });
                panel.dispatchEvent(event);
            });
        }

        // Action button click
        if (actionButton) {
            actionButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent panel click
                
                const event = new CustomEvent('notification-panel-action', {
                    bubbles: true
                });
                panel.dispatchEvent(event);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotificationPanels);
    } else {
        initNotificationPanels();
    }

    // Export for manual initialization if needed
    window.NotificationPanelComponent = {
        init: initNotificationPanels
    };
})();
