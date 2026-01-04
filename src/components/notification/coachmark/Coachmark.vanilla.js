// Coachmark Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all coachmark components on the page
     */
    function initCoachmarks() {
        const coachmarks = document.querySelectorAll('.coachmark');
        
        coachmarks.forEach(coachmark => {
            setupCoachmarkInteractions(coachmark);
        });

        // Initialize popups
        const popups = document.querySelectorAll('.coachmark-popup');
        popups.forEach(popup => {
            setupPopupInteractions(popup);
        });
    }

    /**
     * Setup coachmark tooltip interactions
     */
    function setupCoachmarkInteractions(coachmark) {
        const closeButton = coachmark.querySelector('.coachmark-close');
        const nextButton = coachmark.querySelector('.coachmark-action');

        // Close button
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                const event = new CustomEvent('coachmark-close', {
                    bubbles: true
                });
                coachmark.dispatchEvent(event);
            });
        }

        // Next/Done button
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                const actionText = this.querySelector('.coachmark-action-text').textContent.trim();
                const isDone = actionText.toLowerCase() === 'done';
                
                const event = new CustomEvent(isDone ? 'coachmark-done' : 'coachmark-next', {
                    bubbles: true
                });
                coachmark.dispatchEvent(event);
            });
        }
    }

    /**
     * Setup popup overlay interactions
     */
    function setupPopupInteractions(popup) {
        const overlay = popup.querySelector('.coachmark-overlay');
        const coachmark = popup.querySelector('.coachmark');

        // Click overlay to close (but not the coachmark itself)
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                // Only close if clicking directly on overlay, not on coachmark
                if (e.target === overlay) {
                    const event = new CustomEvent('coachmark-popup-close', {
                        bubbles: true
                    });
                    popup.dispatchEvent(event);
                }
            });
        }

        // Listen for coachmark events and bubble them up
        if (coachmark) {
            ['coachmark-close', 'coachmark-next', 'coachmark-done'].forEach(eventName => {
                coachmark.addEventListener(eventName, function(e) {
                    // Re-dispatch on popup
                    const popupEvent = new CustomEvent(eventName, {
                        bubbles: true
                    });
                    popup.dispatchEvent(popupEvent);
                });
            });
        }
    }

    /**
     * Position coachmark relative to cutout
     */
    function positionCoachmark(popup, cutoutX, cutoutY, cutoutWidth, cutoutHeight, arrowPosition = 'top') {
        const coachmark = popup.querySelector('.coachmark');
        const cutout = popup.querySelector('.coachmark-cutout');
        
        if (!coachmark || !cutout) return;

        // Set cutout position and size
        cutout.style.left = cutoutX + 'px';
        cutout.style.top = cutoutY + 'px';
        cutout.style.width = cutoutWidth + 'px';
        cutout.style.height = cutoutHeight + 'px';

        // Position coachmark based on arrow position
        if (arrowPosition === 'top') {
            // Coachmark below cutout, arrow points up
            coachmark.style.top = (cutoutY + cutoutHeight + 12) + 'px';
        } else {
            // Coachmark above cutout, arrow points down
            coachmark.style.bottom = (window.innerHeight - cutoutY + 12) + 'px';
        }

        // Center horizontally relative to cutout
        const coachmarkWidth = coachmark.offsetWidth;
        const centerX = cutoutX + (cutoutWidth / 2) - (coachmarkWidth / 2);
        coachmark.style.left = Math.max(16, Math.min(centerX, window.innerWidth - coachmarkWidth - 16)) + 'px';
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCoachmarks);
    } else {
        initCoachmarks();
    }

    // Export for manual initialization and positioning
    window.CoachmarkComponent = {
        init: initCoachmarks,
        position: positionCoachmark
    };
})();
