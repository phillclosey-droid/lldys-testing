// Radio Button Group Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all radio-button-group components on the page
     */
    function initRadioButtonGroups() {
        const radioButtonGroups = document.querySelectorAll('.radio-button-group');
        
        radioButtonGroups.forEach(group => {
            setupRadioButtonInteractions(group);
        });
    }

    /**
     * Setup radio button click interactions and label associations
     */
    function setupRadioButtonInteractions(group) {
        const items = group.querySelectorAll('.radio-button-item');
        const groupName = group.getAttribute('data-group-name') || `radio-group-${Date.now()}`;
        
        items.forEach((item, index) => {
            const radioInput = item.querySelector('input[type="radio"]');
            const radioButton = item.querySelector('.radio-button');
            const label = item.querySelector('.radio-button-item-label');
            
            if (!radioInput || !radioButton) return;
            
            // Set radio group name if not already set
            if (!radioInput.name) {
                radioInput.name = groupName;
            }
            
            // Generate unique ID if not present
            if (!radioInput.id) {
                radioInput.id = `${groupName}-${index}`;
            }
            
            // Associate label with radio input
            if (label && !label.getAttribute('for')) {
                label.setAttribute('for', radioInput.id);
            }
            
            // Sync radio button visual state with input
            function syncRadioState() {
                if (radioInput.checked) {
                    radioButton.classList.add('selected');
                } else {
                    radioButton.classList.remove('selected');
                }
                
                if (radioInput.disabled) {
                    radioButton.classList.add('disabled');
                    item.classList.add('is-disabled');
                } else {
                    radioButton.classList.remove('disabled');
                    item.classList.remove('is-disabled');
                }
            }
            
            // Initial sync
            syncRadioState();
            
            // Listen for changes
            radioInput.addEventListener('change', function() {
                // Update all radio buttons in this group
                items.forEach(otherItem => {
                    const otherInput = otherItem.querySelector('input[type="radio"]');
                    const otherButton = otherItem.querySelector('.radio-button');
                    if (otherInput && otherButton) {
                        if (otherInput.checked) {
                            otherButton.classList.add('selected');
                        } else {
                            otherButton.classList.remove('selected');
                        }
                    }
                });
                
                // Dispatch custom event
                const event = new CustomEvent('radio-button-group-change', {
                    detail: {
                        radioId: radioInput.id,
                        value: radioInput.value || radioInput.id,
                        groupName: radioInput.name
                    },
                    bubbles: true
                });
                group.dispatchEvent(event);
            });
            
            // Click on radio button visual
            radioButton.addEventListener('click', function(e) {
                if (!radioInput.disabled) {
                    radioInput.checked = true;
                    radioInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRadioButtonGroups);
    } else {
        initRadioButtonGroups();
    }

    // Export for manual initialization if needed
    window.RadioButtonGroupComponent = {
        init: initRadioButtonGroups
    };
})();
