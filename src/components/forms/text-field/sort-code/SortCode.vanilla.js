// Sort Code Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all sort-code components on the page
     */
    function initSortCodes() {
        const sortCodes = document.querySelectorAll('.sort-code');
        
        sortCodes.forEach(sortCode => {
            setupSortCodeInteractions(sortCode);
        });
    }

    /**
     * Setup sort code interactions
     */
    function setupSortCodeInteractions(sortCode) {
        const inputs = sortCode.querySelectorAll('.sort-code-input-field');
        const containers = sortCode.querySelectorAll('.sort-code-input-box');
        
        if (!inputs || inputs.length === 0) return;

        inputs.forEach((input, index) => {
            // Click on container focuses input
            if (containers[index]) {
                containers[index].addEventListener('click', function() {
                    input.focus();
                });
            }

            // Only allow 2 digits
            input.addEventListener('input', function(e) {
                // Remove non-digits
                this.value = this.value.replace(/\D/g, '');
                
                // Limit to 2 characters
                if (this.value.length > 2) {
                    this.value = this.value.slice(0, 2);
                }

                // Auto-focus next input if 2 digits entered
                if (this.value.length === 2 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }

                // Dispatch custom event
                const event = new CustomEvent('sort-code-input', {
                    detail: {
                        index: index,
                        value: this.value,
                        allValues: Array.from(inputs).map(inp => inp.value),
                        complete: Array.from(inputs).every(inp => inp.value.length === 2)
                    },
                    bubbles: true
                });
                sortCode.dispatchEvent(event);

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
                const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
                
                // Distribute pasted digits across inputs (2 per input)
                let currentIndex = index;
                let charIndex = 0;
                
                while (charIndex < pasteData.length && currentIndex < inputs.length) {
                    const chunk = pasteData.substr(charIndex, 2);
                    inputs[currentIndex].value = chunk;
                    charIndex += 2;
                    currentIndex++;
                }

                // Focus last filled input or next empty
                const lastFilledIndex = Math.min(currentIndex - 1, inputs.length - 1);
                inputs[lastFilledIndex].focus();

                checkCompletion();
            });
        });

        function checkCompletion() {
            const allFilled = Array.from(inputs).every(input => input.value.length === 2);
            
            if (allFilled) {
                const values = Array.from(inputs).map(inp => inp.value);
                const sortCodeValue = values.join('-');
                
                const event = new CustomEvent('sort-code-complete', {
                    detail: {
                        values: values,
                        sortCode: sortCodeValue
                    },
                    bubbles: true
                });
                sortCode.dispatchEvent(event);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSortCodes);
    } else {
        initSortCodes();
    }

    // Export for manual initialization if needed
    window.SortCodeComponent = {
        init: initSortCodes
    };
})();
