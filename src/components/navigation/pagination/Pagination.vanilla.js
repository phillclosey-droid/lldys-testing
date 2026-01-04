// Pagination Vanilla JS - Interactive Functionality

(function() {
    'use strict';

    /**
     * Calculate path to assets folder based on current page location
     */
    function getAssetsPath() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/src/components/')) {
            // In component folder: src/components/navigation/pagination/
            return '../../../../assets';
        } else if (currentPath.includes('/journeys/')) {
            // In journeys folder: journeys/some-journey/
            return '../../assets';
        }
        
        return '../../assets';
    }

    /**
     * Initialize all pagination components on the page
     */
    function initPagination() {
        const paginations = document.querySelectorAll('.pagination');
        
        paginations.forEach(pagination => {
            loadIcons(pagination);
            setupNavigation(pagination);
        });
    }

    /**
     * Load chevron icons for arrow navigation
     */
    function loadIcons(pagination) {
        const ASSETS_BASE = getAssetsPath();
        
        const prevIcons = pagination.querySelectorAll('[data-icon="chevron-left"]');
        prevIcons.forEach(img => {
            img.src = `${ASSETS_BASE}/icons/arrows/chevron-left.svg`;
        });

        const nextIcons = pagination.querySelectorAll('[data-icon="chevron-right"]');
        nextIcons.forEach(img => {
            img.src = `${ASSETS_BASE}/icons/arrows/chevron-right.svg`;
        });
    }

    /**
     * Setup navigation click handlers
     */
    function setupNavigation(pagination) {
        const prevBtn = pagination.querySelector('[data-action="prev"]');
        const nextBtn = pagination.querySelector('[data-action="next"]');
        const dots = pagination.querySelectorAll('.pagination-dot');
        
        let currentPage = 1;
        const totalPages = dots.length;

        function updatePagination(newPage) {
            if (newPage < 1 || newPage > totalPages) return;
            
            currentPage = newPage;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.remove('is-active', 'is-inactive', 'is-far');
                
                if (index + 1 === currentPage) {
                    dot.classList.add('is-active');
                } else {
                    // Determine if dot should be far (small) or inactive (normal)
                    const distance = Math.abs((index + 1) - currentPage);
                    if (totalPages >= 5 && distance > 1) {
                        dot.classList.add('is-far');
                    } else {
                        dot.classList.add('is-inactive');
                    }
                }
            });
            
            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentPage === 1;
            }
            if (nextBtn) {
                nextBtn.disabled = currentPage === totalPages;
            }
            
            // Dispatch custom event
            const event = new CustomEvent('pagination-change', {
                detail: { page: currentPage, totalPages },
                bubbles: true
            });
            pagination.dispatchEvent(event);
        }

        // Setup prev button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updatePagination(currentPage - 1);
            });
        }

        // Setup next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updatePagination(currentPage + 1);
            });
        }

        // Initialize
        updatePagination(1);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPagination);
    } else {
        initPagination();
    }

    // Export for manual initialization if needed
    window.PaginationComponent = {
        init: initPagination
    };
})();
