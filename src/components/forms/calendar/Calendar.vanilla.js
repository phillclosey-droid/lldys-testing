/**
 * Calendar Component - Self-Initializing Script
 * 
 * Handles date selection, month navigation with actual month changing, and state management
 * Auto-initializes on page load
 * 
 * Usage:
 * 1. Include Calendar.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with proper calendar structure
 * 4. Calendar automatically handles date selection and month changes
 */

(function() {
    'use strict';
    
    // Month names for display
    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    /**
     * Initialize all Calendar components on the page
     */
    function initCalendars() {
        const calendars = document.querySelectorAll('.calendar');
        
        calendars.forEach(calendar => {
            initCalendar(calendar);
        });
    }
    
    /**
     * Initialize a single calendar instance
     */
    function initCalendar(calendar) {
        const isNative = calendar.classList.contains('calendar-native');
        const isCustom = calendar.classList.contains('calendar-custom');
        
        // Initialize calendar state
        const currentDate = new Date();
        calendar.dataset.currentMonth = currentDate.getMonth();
        calendar.dataset.currentYear = currentDate.getFullYear();
        
        const dates = calendar.querySelectorAll('.calendar-date:not(.calendar-date-empty):not(.calendar-date-disabled)');
        
        // Navigation buttons
        let prevBtn, nextBtn;
        
        if (isNative) {
            // Native: small arrow buttons
            prevBtn = calendar.querySelector('.calendar-nav-prev');
            nextBtn = calendar.querySelector('.calendar-nav-next');
        } else if (isCustom) {
            // Custom: large month stepper buttons
            prevBtn = calendar.querySelector('.calendar-stepper-prev');
            nextBtn = calendar.querySelector('.calendar-stepper-next');
        }
        
        // Action buttons
        const cancelBtn = calendar.querySelector('.link-button:first-child, .calendar-cancel-link');
        const okBtn = calendar.querySelector('.link-button:last-child');
        
        let selectedDate = calendar.querySelector('.calendar-date-selected');
        
        // Handle date selection
        dates.forEach(date => {
            date.addEventListener('click', function() {
                // Remove previous selection
                if (selectedDate) {
                    selectedDate.classList.remove('calendar-date-selected');
                }
                
                // Add selection to clicked date
                this.classList.add('calendar-date-selected');
                selectedDate = this;
                
                // Dispatch custom event
                calendar.dispatchEvent(new CustomEvent('dateselected', {
                    detail: {
                        date: this.textContent,
                        element: this
                    }
                }));
            });
        });
        
        // Handle navigation - Previous month
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                changeMonth(calendar, -1);
            });
        }
        
        // Handle navigation - Next month
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                changeMonth(calendar, 1);
            });
        }
        
        // Handle action buttons
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                calendar.dispatchEvent(new CustomEvent('cancel'));
            });
        }
        
        if (okBtn) {
            okBtn.addEventListener('click', function() {
                calendar.dispatchEvent(new CustomEvent('confirm', {
                    detail: {
                        selectedDate: selectedDate ? selectedDate.textContent : null,
                        month: calendar.dataset.currentMonth,
                        year: calendar.dataset.currentYear
                    }
                }));
            });
        }
    }
    
    /**
     * Change the displayed month
     * @param {Element} calendar - Calendar element
     * @param {number} direction - -1 for previous, +1 for next
     */
    function changeMonth(calendar, direction) {
        let month = parseInt(calendar.dataset.currentMonth);
        let year = parseInt(calendar.dataset.currentYear);
        
        // Update month/year
        month += direction;
        
        if (month < 0) {
            month = 11;
            year--;
        } else if (month > 11) {
            month = 0;
            year++;
        }
        
        // Store new values
        calendar.dataset.currentMonth = month;
        calendar.dataset.currentYear = year;
        
        // Update display
        const monthText = calendar.querySelector('.calendar-month-text');
        if (monthText) {
            monthText.textContent = `${MONTH_NAMES[month]} ${year}`;
        }
        
        // Dispatch event
        calendar.dispatchEvent(new CustomEvent('monthchange', {
            detail: {
                direction: direction > 0 ? 'next' : 'prev',
                month: month,
                year: year,
                monthName: MONTH_NAMES[month]
            }
        }));
        
        // Note: In a full implementation, you would regenerate the calendar grid here
        // For this demo, we're just updating the month/year display
    }
    
    /**
     * Get selected date from calendar
     * @param {Element} calendar - Calendar element
     * @returns {string|null} Selected date text or null
     */
    function getSelectedDate(calendar) {
        const selected = calendar.querySelector('.calendar-date-selected');
        return selected ? selected.textContent : null;
    }
    
    /**
     * Set selected date programmatically
     * @param {Element} calendar - Calendar element
     * @param {string} dateText - Date text to select
     */
    function setSelectedDate(calendar, dateText) {
        const dates = calendar.querySelectorAll('.calendar-date');
        const currentSelected = calendar.querySelector('.calendar-date-selected');
        
        // Remove current selection
        if (currentSelected) {
            currentSelected.classList.remove('calendar-date-selected');
        }
        
        // Find and select new date
        dates.forEach(date => {
            if (date.textContent.trim() === dateText.toString()) {
                date.classList.add('calendar-date-selected');
            }
        });
    }
    
    /**
     * Clear selected date
     * @param {Element} calendar - Calendar element
     */
    function clearSelectedDate(calendar) {
        const selected = calendar.querySelector('.calendar-date-selected');
        if (selected) {
            selected.classList.remove('calendar-date-selected');
        }
    }
    
    /**
     * Set month display
     * @param {Element} calendar - Calendar element
     * @param {number} month - Month (0-11)
     * @param {number} year - Year
     */
    function setMonthDisplay(calendar, month, year) {
        calendar.dataset.currentMonth = month;
        calendar.dataset.currentYear = year;
        
        const monthText = calendar.querySelector('.calendar-month-text');
        if (monthText) {
            monthText.textContent = `${MONTH_NAMES[month]} ${year}`;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendars);
    } else {
        initCalendars();
    }
    
    // Export functions for external use
    window.CalendarComponent = {
        init: initCalendars,
        getSelectedDate: getSelectedDate,
        setSelectedDate: setSelectedDate,
        clearSelectedDate: clearSelectedDate,
        setMonthDisplay: setMonthDisplay,
        changeMonth: changeMonth
    };
})();
