/**
 * Select Category Item Component - Self-Initializing Script
 * 
 * Handles category selection icons and interaction feedback
 * Auto-loads icons based on data attributes
 * Provides visual feedback on selection
 * 
 * Usage:
 * 1. Include SelectCategoryItem.vanilla.css
 * 2. Include this script before </body>
 * 3. Add HTML with data-icon and data-icon-category attributes
 * 4. Click category items to select (radio) or toggle (checkbox)
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/content/category-collection/select-category-item/
            return '../../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // In journeys folder: journeys/some-journey/
            return '../../assets';
        }
        
        // Default fallback
        return '../../assets';
    }
    
    /**
     * Initialize all Select Category Item components on the page
     */
    function initSelectCategoryItems() {
        const ASSETS_BASE = getAssetsPath();
        
        // Load all category icons
        const categoryIcons = document.querySelectorAll('.select-category-icon img[data-icon]');
        categoryIcons.forEach(img => {
            const iconFile = img.getAttribute('data-icon');
            const iconCategory = img.getAttribute('data-icon-category') || 'finance';
            
            if (iconFile) {
                const iconPath = `${ASSETS_BASE}/icons/${iconCategory}/${iconFile}.svg`;
                img.src = iconPath;
                
                // Add error handler for missing icons
                img.addEventListener('error', function() {
                    console.warn(`Icon not found: ${iconPath}`);
                    // Fallback to placeholder if exists
                    const fallbackPath = `${ASSETS_BASE}/icons/placeholder/circle.svg`;
                    this.src = fallbackPath;
                });
            }
        });
        
        // Add change event listeners to inputs for additional feedback
        const categoryInputs = document.querySelectorAll('.select-category-input');
        categoryInputs.forEach(input => {
            input.addEventListener('change', function() {
                const categoryItem = this.closest('.select-category-item');
                const button = this.nextElementSibling;
                
                if (this.checked) {
                    // Visual feedback on selection
                    categoryItem.setAttribute('aria-selected', 'true');
                    
                    // For radio buttons, unmark other items in the same group
                    if (this.type === 'radio') {
                        const groupName = this.name;
                        const radioGroup = document.querySelectorAll(
                            `.select-category-input[type="radio"][name="${groupName}"]`
                        );
                        
                        radioGroup.forEach(radio => {
                            if (radio !== this) {
                                const otherItem = radio.closest('.select-category-item');
                                otherItem.setAttribute('aria-selected', 'false');
                            }
                        });
                    }
                } else {
                    categoryItem.setAttribute('aria-selected', 'false');
                }
            });
            
            // Set initial aria-selected state
            const categoryItem = input.closest('.select-category-item');
            categoryItem.setAttribute('aria-selected', input.checked ? 'true' : 'false');
        });
        
        // Add keyboard navigation support
        categoryInputs.forEach((input, index) => {
            const categoryItem = input.closest('.select-category-item');
            
            // Handle Enter and Space keys on the label
            categoryItem.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    input.click();
                }
            });
        });
    }
    
    /**
     * Get selected categories
     * @param {string} selector - CSS selector for category selector container
     * @returns {Array} Array of selected values
     */
    function getSelectedCategories(selector = '.category-selector') {
        const container = document.querySelector(selector);
        if (!container) return [];
        
        const selectedInputs = container.querySelectorAll('.select-category-input:checked');
        return Array.from(selectedInputs).map(input => input.value);
    }
    
    /**
     * Set selected categories programmatically
     * @param {string} selector - CSS selector for category selector container
     * @param {Array|string} values - Value(s) to select
     */
    function setSelectedCategories(selector, values) {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const valuesToSelect = Array.isArray(values) ? values : [values];
        const inputs = container.querySelectorAll('.select-category-input');
        
        inputs.forEach(input => {
            if (valuesToSelect.includes(input.value)) {
                input.checked = true;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else if (input.type === 'radio') {
                input.checked = false;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }
    
    /**
     * Clear all selections in a category selector
     * @param {string} selector - CSS selector for category selector container
     */
    function clearSelectedCategories(selector) {
        const container = document.querySelector(selector);
        if (!container) return;
        
        const inputs = container.querySelectorAll('.select-category-input:checked');
        inputs.forEach(input => {
            input.checked = false;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSelectCategoryItems);
    } else {
        initSelectCategoryItems();
    }
    
    // Export functions for external use
    window.initSelectCategoryItems = initSelectCategoryItems;
    window.getSelectedCategories = getSelectedCategories;
    window.setSelectedCategories = setSelectedCategories;
    window.clearSelectedCategories = clearSelectedCategories;
})();
