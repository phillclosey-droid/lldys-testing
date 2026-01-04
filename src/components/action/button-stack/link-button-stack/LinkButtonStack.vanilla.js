// LinkButtonStack JavaScript - Minimal interaction handling

(function() {
    'use strict';
    
    /**
     * Initialize link button stacks
     */
    function initLinkButtonStacks() {
        const stacks = document.querySelectorAll('.link-button-stack');
        
        stacks.forEach(stack => {
            const buttons = stack.querySelectorAll('.link-button');
            
            buttons.forEach(button => {
                // Add active state on mouse down
                button.addEventListener('mousedown', function() {
                    if (!this.disabled && !this.classList.contains('disabled')) {
                        this.classList.add('pressed');
                    }
                });
                
                // Remove active state on mouse up
                button.addEventListener('mouseup', function() {
                    this.classList.remove('pressed');
                });
                
                // Remove active state if mouse leaves while pressed
                button.addEventListener('mouseleave', function() {
                    this.classList.remove('pressed');
                });
            });
        });
        
        console.log(`Initialized ${stacks.length} link button stack(s)`);
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLinkButtonStacks);
    } else {
        initLinkButtonStacks();
    }
    
    // Export for manual initialization if needed
    window.LinkButtonStack = {
        init: initLinkButtonStacks
    };
})();
