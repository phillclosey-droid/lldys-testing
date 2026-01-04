// Calendar Picker Vanilla JS - Interactive Functionality

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
     * Initialize all calendar-picker components on the page
     */
    function initCalendarPickers() {
        const pickers = document.querySelectorAll('.calendar-picker');
        
        pickers.forEach(picker => {
            loadCalendarIcon(picker);
            setupCalendarInteractions(picker);
        });
    }

    /**
     * Load calendar icon
     */
    function loadCalendarIcon(picker) {
        const ASSETS_BASE = getAssetsPath();
        const icons = picker.querySelectorAll('.calendar-picker-icon img');
        icons.forEach(img => {
            img.src = `${ASSETS_BASE}/icons/date-and-time/calendar.svg`;
            img.alt = 'Calendar';
        });
    }

    /**
     * Setup calendar picker interactions
     */
    function setupCalendarInteractions(picker) {
        const inputContainer = picker.querySelector('.calendar-picker-input');
        const nativeInput = picker.querySelector('.calendar-picker-native-input');
        const valueDisplay = picker.querySelector('.calendar-picker-value');
        const iconButton = picker.querySelector('.calendar-picker-icon-button');
        const icon = picker.querySelector('.calendar-picker-icon');
        
        if (!inputContainer || !nativeInput || !valueDisplay) return;

        // Format date for display
        function formatDate(dateString) {
            if (!dateString) return '';
            
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options);
        }

        // Click on input container opens native date picker
        inputContainer.addEventListener('click', function() {
            if (!picker.classList.contains('is-disabled')) {
                nativeInput.showPicker?.(); // Modern browsers
                nativeInput.focus(); // Fallback
                inputContainer.classList.add('is-active');
            }
        });

        // Click on icon button (inline layout) opens native date picker
        if (iconButton) {
            iconButton.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!picker.classList.contains('is-disabled')) {
                    nativeInput.showPicker?.();
                    nativeInput.focus();
                    inputContainer.classList.add('is-active');
                }
            });
        }

        // Click on icon (default layout) opens native date picker
        if (icon && !iconButton) {
            icon.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!picker.classList.contains('is-disabled')) {
                    nativeInput.showPicker?.();
                    nativeInput.focus();
                    inputContainer.classList.add('is-active');
                }
            });
        }

        // Update display when date changes
        nativeInput.addEventListener('change', function() {
            const formattedDate = formatDate(this.value);
            valueDisplay.textContent = formattedDate || 'Select date';
            
            // Dispatch custom event
            const event = new CustomEvent('calendar-picker-change', {
                detail: {
                    value: this.value,
                    formattedValue: formattedDate
                },
                bubbles: true
            });
            picker.dispatchEvent(event);
        });

        // Remove active state on blur
        nativeInput.addEventListener('blur', function() {
            inputContainer.classList.remove('is-active');
        });

        // Initialize with current value if any
        if (nativeInput.value) {
            valueDisplay.textContent = formatDate(nativeInput.value);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendarPickers);
    } else {
        initCalendarPickers();
    }

    // Export for manual initialization if needed
    window.CalendarPickerComponent = {
        init: initCalendarPickers
    };
})();
