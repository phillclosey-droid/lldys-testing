// Custom Popup Modal Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all popup-modal components on the page
     */
    function initPopupModals() {
        const modals = document.querySelectorAll('.popup-modal-overlay');
        
        modals.forEach(modal => {
            setupPopupModalInteractions(modal);
        });
    }

    /**
     * Setup popup modal interactions
     */
    function setupPopupModalInteractions(overlay) {
        const buttons = overlay.querySelectorAll('.popup-modal-button');
        
        // Button clicks
        buttons.forEach((button, index) => {
            button.addEventListener('click', function() {
                const event = new CustomEvent('popup-modal-button-click', {
                    bubbles: true,
                    detail: { buttonIndex: index }
                });
                overlay.dispatchEvent(event);
            });
        });

        // Close on overlay click (outside modal)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                const event = new CustomEvent('popup-modal-close', {
                    bubbles: true
                });
                overlay.dispatchEvent(event);
                overlay.style.display = 'none';
            }
        });
    }

    /**
     * Show a popup modal
     */
    function showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    /**
     * Hide a popup modal
     */
    function hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopupModals);
    } else {
        initPopupModals();
    }

    // Export for manual initialization if needed
    window.CustomPopupModalComponent = {
        init: initPopupModals,
        show: showModal,
        hide: hideModal
    };
})();
