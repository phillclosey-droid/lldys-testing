// Checkbox Group Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all checkbox-group components on the page
     */
    function initCheckboxGroups() {
        const checkboxGroups = document.querySelectorAll('.checkbox-group');
        
        checkboxGroups.forEach(group => {
            setupCheckboxInteractions(group);
        });
    }

    /**
     * Setup checkbox click interactions and label associations
     */
    function setupCheckboxInteractions(group) {
        const items = group.querySelectorAll('.checkbox-item');
        
        items.forEach((item, index) => {
            const checkbox = item.querySelector('.checkbox-input');
            const label = item.querySelector('.checkbox-item-label');
            
            if (!checkbox || !label) return;
            
            // Generate unique ID if not present
            if (!checkbox.id) {
                checkbox.id = `checkbox-${Date.now()}-${index}`;
            }
            
            // Associate label with checkbox (if not already done)
            if (!label.getAttribute('for')) {
                label.setAttribute('for', checkbox.id);
            }
            
            // Dispatch custom event when checkbox changes
            checkbox.addEventListener('change', function() {
                const event = new CustomEvent('checkbox-group-change', {
                    detail: {
                        checkboxId: checkbox.id,
                        checked: checkbox.checked,
                        value: checkbox.value || checkbox.id
                    },
                    bubbles: true
                });
                group.dispatchEvent(event);
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCheckboxGroups);
    } else {
        initCheckboxGroups();
    }

    // Export for manual initialization if needed
    window.CheckboxGroupComponent = {
        init: initCheckboxGroups
    };
})();
