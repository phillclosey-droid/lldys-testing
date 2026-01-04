// 2-Tabs-Fixed Component - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all 2-tabs-fixed components on the page
     */
    function initTwoTabsFixed() {
        const tabComponents = document.querySelectorAll('.tabs-2-fixed');
        
        tabComponents.forEach(component => {
            setupTabInteractions(component);
        });
    }

    /**
     * Setup tab interactions
     */
    function setupTabInteractions(component) {
        const tabs = component.querySelectorAll('.tab');
        const activeBorderSegments = component.querySelectorAll('.active-border-segment');
        
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Update active border for alt-01 layout
                if (activeBorderSegments.length > 0) {
                    activeBorderSegments.forEach((segment, i) => {
                        if (i === index) {
                            segment.classList.add('active');
                        } else {
                            segment.classList.remove('active');
                        }
                    });
                }
                
                // Dispatch custom event
                const event = new CustomEvent('tab-changed', {
                    bubbles: true,
                    detail: { tabIndex: index, tabElement: tab }
                });
                component.dispatchEvent(event);
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTwoTabsFixed);
    } else {
        initTwoTabsFixed();
    }

    // Export for manual initialization if needed
    window.TwoTabsFixedComponent = {
        init: initTwoTabsFixed
    };
})();
