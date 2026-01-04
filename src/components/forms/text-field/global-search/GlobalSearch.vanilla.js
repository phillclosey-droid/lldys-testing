// Global Search Vanilla JS - Interactive Functionality

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
     * Initialize all global-search components on the page
     */
    function initGlobalSearches() {
        const searches = document.querySelectorAll('.global-search');
        
        searches.forEach(search => {
            loadIcons(search);
            setupSearchInteractions(search);
        });
    }

    /**
     * Load icons
     */
    function loadIcons(search) {
        const ASSETS_BASE = getAssetsPath();
        
        // Search icon
        const searchIcon = search.querySelector('.global-search-icon img');
        if (searchIcon) {
            searchIcon.src = `${ASSETS_BASE}/icons/navigation/search.svg`;
            searchIcon.alt = 'Search';
        }

        // Voice icon
        const voiceIcon = search.querySelector('.global-search-voice img');
        if (voiceIcon) {
            voiceIcon.src = `${ASSETS_BASE}/icons/navigation/microphone.svg`;
            voiceIcon.alt = 'Voice search';
        }

        // Close icon
        const closeIcon = search.querySelector('.global-search-close img');
        if (closeIcon) {
            closeIcon.src = `${ASSETS_BASE}/icons/navigation/close.svg`;
            closeIcon.alt = 'Clear search';
        }
    }

    /**
     * Setup global search interactions
     */
    function setupSearchInteractions(search) {
        const inputContainer = search.querySelector('.global-search-input');
        const inputField = search.querySelector('.global-search-input-field');
        const closeButton = search.querySelector('.global-search-close');
        const voiceButton = search.querySelector('.global-search-voice');
        
        if (!inputContainer || !inputField) return;

        // Store original placeholder
        const originalPlaceholder = inputField.getAttribute('placeholder');

        // Focus on input field - remove placeholder
        inputField.addEventListener('focus', function() {
            inputContainer.classList.add('is-active');
            this.setAttribute('placeholder', '');
            
            // Dispatch custom event
            const event = new CustomEvent('global-search-focus', {
                bubbles: true
            });
            search.dispatchEvent(event);
        });

        // Blur on input field - restore placeholder if empty
        inputField.addEventListener('blur', function() {
            if (!inputField.value) {
                inputContainer.classList.remove('is-active');
                this.setAttribute('placeholder', originalPlaceholder);
            }
        });

        // Input change - show close button when text exists
        inputField.addEventListener('input', function() {
            if (this.value) {
                inputContainer.classList.add('has-text');
            } else {
                inputContainer.classList.remove('has-text');
            }

            // Dispatch custom event
            const event = new CustomEvent('global-search-input', {
                detail: {
                    value: this.value
                },
                bubbles: true
            });
            search.dispatchEvent(event);
        });

        // Enter key to submit
        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value) {
                inputContainer.classList.add('is-submitted');
                inputContainer.classList.remove('is-active');
                this.blur();

                // Dispatch custom event
                const event = new CustomEvent('global-search-submit', {
                    detail: {
                        value: this.value
                    },
                    bubbles: true
                });
                search.dispatchEvent(event);
            }
        });

        // Close button clears input
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                inputField.value = '';
                inputContainer.classList.remove('has-text');
                inputContainer.classList.remove('is-submitted');
                inputField.focus();

                // Dispatch custom event
                const event = new CustomEvent('global-search-clear', {
                    bubbles: true
                });
                search.dispatchEvent(event);
            });
        }

        // Voice button
        if (voiceButton) {
            voiceButton.addEventListener('click', function() {
                // Dispatch custom event
                const event = new CustomEvent('global-search-voice', {
                    bubbles: true
                });
                search.dispatchEvent(event);
            });
        }

        // Click on container focuses input
        inputContainer.addEventListener('click', function() {
            inputField.focus();
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalSearches);
    } else {
        initGlobalSearches();
    }

    // Export for manual initialization if needed
    window.GlobalSearchComponent = {
        init: initGlobalSearches
    };
})();
