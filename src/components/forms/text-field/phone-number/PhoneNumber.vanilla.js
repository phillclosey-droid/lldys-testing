// Phone Number Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Initialize all phone-number components on the page
     */
    function initPhoneNumbers() {
        const phoneNumbers = document.querySelectorAll('.phone-number');
        
        phoneNumbers.forEach(phoneNumber => {
            setupPhoneNumberInteractions(phoneNumber);
        });
    }

    /**
     * Setup phone number interactions
     */
    function setupPhoneNumberInteractions(phoneNumber) {
        const phoneInput = phoneNumber.querySelector('.phone-number-phone-field');
        const extensionInput = phoneNumber.querySelector('.phone-number-extension-field');
        const phoneContainer = phoneNumber.querySelector('.phone-number-phone-input');
        const extensionContainer = phoneNumber.querySelector('.phone-number-extension-input');
        
        if (!phoneInput) return;

        // Store original placeholders
        const phoneOriginalPlaceholder = phoneInput.getAttribute('placeholder');
        const extensionOriginalPlaceholder = extensionInput ? extensionInput.getAttribute('placeholder') : '';

        // Phone input focus - remove placeholder
        phoneInput.addEventListener('focus', function() {
            this.setAttribute('placeholder', '');
        });

        // Phone input blur - restore placeholder if empty
        phoneInput.addEventListener('blur', function() {
            if (!this.value) {
                this.setAttribute('placeholder', phoneOriginalPlaceholder);
            }
        });

        // Click on phone container focuses input
        if (phoneContainer) {
            phoneContainer.addEventListener('click', function() {
                phoneInput.focus();
            });
        }

        // Phone input changes
        phoneInput.addEventListener('input', function() {
            // Dispatch custom event
            const event = new CustomEvent('phone-number-input', {
                detail: {
                    phoneNumber: this.value,
                    extension: extensionInput ? extensionInput.value : ''
                },
                bubbles: true
            });
            phoneNumber.dispatchEvent(event);
        });

        // Extension input changes
        if (extensionInput) {
            // Extension input focus - remove placeholder
            extensionInput.addEventListener('focus', function() {
                this.setAttribute('placeholder', '');
            });

            // Extension input blur - restore placeholder if empty
            extensionInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.setAttribute('placeholder', extensionOriginalPlaceholder);
                }
            });

            // Click on extension container focuses input
            if (extensionContainer) {
                extensionContainer.addEventListener('click', function() {
                    extensionInput.focus();
                });
            }

            extensionInput.addEventListener('input', function() {
                // Dispatch custom event
                const event = new CustomEvent('phone-number-extension-input', {
                    detail: {
                        phoneNumber: phoneInput.value,
                        extension: this.value
                    },
                    bubbles: true
                });
                phoneNumber.dispatchEvent(event);
            });
        }

        // Listen for country picker changes (nested component)
        const countryPicker = phoneNumber.querySelector('.country-picker');
        if (countryPicker) {
            countryPicker.addEventListener('country-picker-click', function(e) {
                // Re-dispatch as phone-number event
                const event = new CustomEvent('phone-number-country-change', {
                    detail: e.detail,
                    bubbles: true
                });
                phoneNumber.dispatchEvent(event);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPhoneNumbers);
    } else {
        initPhoneNumbers();
    }

    // Export for manual initialization if needed
    window.PhoneNumberComponent = {
        init: initPhoneNumbers
    };
})();
