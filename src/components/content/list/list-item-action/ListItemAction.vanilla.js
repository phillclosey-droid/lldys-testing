/**
 * List Item Action Component - Self-Initializing Script
 * 
 * Auto-detects component location and initializes all image paths.
 * Handles chevron icons and click interactions.
 * Works with nested Pictogram and Illustration components.
 * 
 * Usage:
 * 1. Include ListItemAction.vanilla.css
 * 2. Include Pictogram.vanilla.js (if using pictograms)
 * 3. Include Illustration.vanilla.js (if using illustrations)
 * 4. Include this script before </body>
 * 5. Add HTML with data attributes
 * 6. Images automatically populate on page load
 */

(function() {
    'use strict';
    
    /**
     * Calculate path to assets folder from current script location
     */
    function getAssetsPath() {
        // Manual override if needed
        if (window.LIST_ITEM_ACTION_ASSETS_PATH) {
            return window.LIST_ITEM_ACTION_ASSETS_PATH;
        }
        
        // Find THIS script's src attribute
        const scripts = document.querySelectorAll('script[src]');
        let scriptSrc = null;
        
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('ListItemAction.vanilla.js')) {
                scriptSrc = src;
                break;
            }
        }
        
        if (!scriptSrc) {
            console.error('ListItemAction: Could not find script src');
            return '../../../../../assets';
        }
        
        // The script is located at: /src/components/content/list/list-item-action/ListItemAction.vanilla.js
        const scriptInternalPath = 'src/components/content/list/list-item-action/ListItemAction.vanilla.js';
        
        if (scriptSrc.endsWith(scriptInternalPath)) {
            // Replace the internal path with 'assets'
            return scriptSrc.slice(0, -scriptInternalPath.length) + 'assets';
        }
        
        // Fallback: From list-item-action to root is 5 levels, then to assets
        return '../../../../../assets';
    }
    
    /**
     * Initialize all List Item Action components on the page
     */
    function initListItemActions() {
        const ASSETS_BASE = getAssetsPath();
        
        // Debug logging
        if (window.DEBUG_LIST_ITEM_ACTION) {
            console.log('ListItemAction: Initializing with ASSETS_BASE:', ASSETS_BASE);
        }
        
        // Initialize ALL chevron icons (both inside and outside list-item-action)
        const allChevrons = document.querySelectorAll('img[data-chevron]');
        
        if (window.DEBUG_LIST_ITEM_ACTION) {
            console.log('ListItemAction: Found', allChevrons.length, 'chevron icons total');
        }
        
        allChevrons.forEach(chevronIcon => {
            if (!chevronIcon.src) {  // Only set if not already set
                const chevronDirection = chevronIcon.getAttribute('data-chevron') || 'right';
                const chevronPath = `${ASSETS_BASE}/icons/arrows/chevron-${chevronDirection}.svg`;
                chevronIcon.src = chevronPath;
                
                if (window.DEBUG_LIST_ITEM_ACTION) {
                    console.log('ListItemAction: Set chevron src to:', chevronPath);
                }
            }
        });
        
        const listItems = document.querySelectorAll('.list-item-action');
        
        if (window.DEBUG_LIST_ITEM_ACTION) {
            console.log('ListItemAction: Found', listItems.length, 'list items');
        }
        
        listItems.forEach(listItem => {
            
            // Initialize standalone icons (not pictogram or illustration)
            const icon = listItem.querySelector('.list-item-icon img[data-icon]');
            if (icon) {
                const iconFile = icon.getAttribute('data-icon');
                const iconFolder = icon.getAttribute('data-icon-folder') || 'miscellaneous';
                if (iconFile) {
                    icon.src = `${ASSETS_BASE}/icons/${iconFolder}/${iconFile}.svg`;
                }
            }
            
            // Note: Pictogram and Illustration components are initialized by their own scripts
            // This script only handles the list item behavior and chevron icons
            
            // Initialize click behavior
            initListItem(listItem);
        });
    }
    
    /**
     * Initialize a single list item instance
     */
    function initListItem(listItem) {
        // Skip if disabled
        if (listItem.classList.contains('list-item-state-disabled')) {
            return;
        }
        
        // Handle click event
        listItem.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.classList.contains('list-item-link')) {
                return;
            }
            
            // Dispatch custom event
            listItem.dispatchEvent(new CustomEvent('listitemclick', {
                detail: {
                    element: listItem,
                    title: listItem.querySelector('.list-item-title')?.textContent,
                    description: listItem.querySelector('.list-item-description')?.textContent,
                    link: listItem.querySelector('.list-item-link')?.textContent
                },
                bubbles: true
            }));
        });
        
        // Handle keyboard navigation
        listItem.setAttribute('role', 'button');
        listItem.setAttribute('tabindex', '0');
        
        listItem.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                listItem.click();
            }
        });
    }
    
    /**
     * Get list item data
     * @param {Element} listItem - List item element
     * @returns {Object} List item data
     */
    function getListItemData(listItem) {
        return {
            title: listItem.querySelector('.list-item-title')?.textContent,
            description: listItem.querySelector('.list-item-description')?.textContent,
            link: listItem.querySelector('.list-item-link')?.textContent,
            hasIcon: listItem.classList.contains('asset-icon'),
            hasIllustration: listItem.classList.contains('asset-illustration'),
            hasPictogram: listItem.classList.contains('asset-pictogram'),
            isCompact: listItem.classList.contains('width-compact'),
            isFullWidth: listItem.classList.contains('width-fullwidth')
        };
    }
    
    /**
     * Set list item disabled state
     * @param {Element} listItem - List item element
     * @param {boolean} disabled - Whether to disable the item
     */
    function setDisabled(listItem, disabled) {
        if (disabled) {
            listItem.classList.add('list-item-state-disabled');
            listItem.setAttribute('aria-disabled', 'true');
        } else {
            listItem.classList.remove('list-item-state-disabled');
            listItem.removeAttribute('aria-disabled');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initListItemActions);
    } else {
        initListItemActions();
    }
    
    // Export functions for external use
    window.ListItemActionComponent = {
        init: initListItemActions,
        getData: getListItemData,
        setDisabled: setDisabled
    };
})();
