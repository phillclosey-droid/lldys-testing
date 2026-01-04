// MI Field Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all mi-field components on the page
     */
    function initMIFields() {
        const fields = document.querySelectorAll('.mi-field');
        
        fields.forEach(field => {
            setupMIFieldInteractions(field);
        });
    }

    /**
     * Setup MI field interactions
     */
    function setupMIFieldInteractions(field) {
        const inputs = field.querySelectorAll('.mi-field-input');
        
        if (!inputs || inputs.length === 0) return;

        inputs.forEach((input, index) => {
            // Only allow single character
            input.addEventListener('input', function(e) {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0, 1);
                }

                // Auto-focus next input if character entered
                if (this.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }

                // Dispatch custom event
                const event = new CustomEvent('mi-field-input', {
                    detail: {
                        index: index,
                        value: this.value,
                        allValues: Array.from(inputs).map(inp => inp.value)
                    },
                    bubbles: true
                });
                field.dispatchEvent(event);

                // Check if all fields are filled
                checkCompletion();
            });

            // Handle backspace
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });

            // Handle paste
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pasteData = e.clipboardData.getData('text');
                
                // Distribute pasted characters across inputs
                for (let i = 0; i < Math.min(pasteData.length, inputs.length - index); i++) {
                    if (inputs[index + i]) {
                        inputs[index + i].value = pasteData[i];
                    }
                }

                // Focus last filled input or next empty
                const lastFilledIndex = Math.min(index + pasteData.length - 1, inputs.length - 1);
                inputs[lastFilledIndex].focus();

                checkCompletion();
            });
        });

        function checkCompletion() {
            const allFilled = Array.from(inputs).every(input => input.value.length === 1);
            
            if (allFilled) {
                const values = Array.from(inputs).map(inp => inp.value);
                const event = new CustomEvent('mi-field-complete', {
                    detail: {
                        values: values,
                        combined: values.join('')
                    },
                    bubbles: true
                });
                field.dispatchEvent(event);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMIFields);
    } else {
        initMIFields();
    }

    // Export for manual initialization if needed
    window.MIFieldComponent = {
        init: initMIFields
    };
})();
