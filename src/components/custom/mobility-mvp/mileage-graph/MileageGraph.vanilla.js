// Mileage Graph Vanilla JS - Optional Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all mileage-graph components on the page
     */
    function initMileageGraphs() {
        const graphs = document.querySelectorAll('.mileage-graph');
        
        graphs.forEach(graph => {
            // Optional: Add any interactive functionality here
            // For now, this is a static visualization component
            console.log('Mileage graph initialized');
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMileageGraphs);
    } else {
        initMileageGraphs();
    }

    // Export for manual initialization if needed
    window.MileageGraphComponent = {
        init: initMileageGraphs
    };
})();
