/* Tab-Collection-Scroll Component JavaScript - SELF-CONTAINED */

(function() {
  'use strict';

  // Component initialization
  function initTabCollectionScroll() {
    const tabComponents = document.querySelectorAll('.tab-collection-scroll');
    
    tabComponents.forEach(component => {
      const tabs = component.querySelectorAll('.tab');
      const tabsContainer = component.querySelector('.tabs-container');
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Scroll the active tab to center
          scrollToCenterTab(tab, tabsContainer);
          
          // Dispatch custom event
          const event = new CustomEvent('tab-changed', {
            detail: {
              tabIndex: index,
              tabElement: tab
            },
            bubbles: true
          });
          component.dispatchEvent(event);
        });
      });
    });
  }

  // Scroll active tab to center
  function scrollToCenterTab(tab, container) {
    if (!tab || !container) return;
    
    const tabRect = tab.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Center the tab in the container
    const scrollLeft = tab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  }

  // Auto-initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabCollectionScroll);
  } else {
    initTabCollectionScroll();
  }

  // Export for manual initialization
  window.TabCollectionScrollComponent = {
    init: initTabCollectionScroll
  };
})();
