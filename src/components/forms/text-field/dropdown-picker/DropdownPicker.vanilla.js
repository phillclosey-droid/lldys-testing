// Dropdown Picker Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            return '../../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            return '../../assets';
        }
        
        return '../../assets';
    }

    /**
     * Initialize all dropdown-picker components on the page
     */
    function initDropdownPickers() {
        const pickers = document.querySelectorAll('.dropdown-picker');
        
        pickers.forEach(picker => {
            loadChevronIcon(picker);
            setupDropdownInteractions(picker);
        });
    }

    /**
     * Load chevron down icon
     */
    function loadChevronIcon(picker) {
        const ASSETS_BASE = getAssetsPath();
        const icons = picker.querySelectorAll('.dropdown-picker-icon img');
        icons.forEach(img => {
            img.src = `${ASSETS_BASE}/icons/arrows/chevron-down.svg`;
            img.alt = 'Select option';
        });
    }

    /**
     * Setup dropdown picker interactions
     */
    function setupDropdownInteractions(picker) {
        const inputContainer = picker.querySelector('.dropdown-picker-input');
        const iconButton = picker.querySelector('.dropdown-picker-icon-button');
        const icon = picker.querySelector('.dropdown-picker-icon');
        
        if (!inputContainer) return;

        // Click on input container toggles active state
        inputContainer.addEventListener('click', function() {
            if (!picker.classList.contains('is-disabled')) {
                inputContainer.classList.toggle('is-active');
                
                // Dispatch custom event
                const event = new CustomEvent('dropdown-picker-click', {
                    detail: {
                        isActive: inputContainer.classList.contains('is-active')
                    },
                    bubbles: true
                });
                picker.dispatchEvent(event);
            }
        });

        // Click on icon button (inline layout)
        if (iconButton) {
            iconButton.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!picker.classList.contains('is-disabled')) {
                    inputContainer.classList.toggle('is-active');
                    
                    const event = new CustomEvent('dropdown-picker-click', {
                        detail: {
                            isActive: inputContainer.classList.contains('is-active')
                        },
                        bubbles: true
                    });
                    picker.dispatchEvent(event);
                }
            });
        }

        // Click on icon (default layout)
        if (icon && !iconButton) {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!picker.classList.contains('is-disabled')) {
                    inputContainer.classList.toggle('is-active');
                }
            });
        }

        // Remove active state when clicking outside
        document.addEventListener('click', function(e) {
            if (!picker.contains(e.target)) {
                inputContainer.classList.remove('is-active');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdownPickers);
    } else {
        initDropdownPickers();
    }

    // Export for manual initialization if needed
    window.DropdownPickerComponent = {
        init: initDropdownPickers
    };
})();
