/* 3-Tabs-Fixed Component JavaScript - SELF-CONTAINED */

(function() {
  'use strict';

  // Component initialization
  function initThreeTabsFixed() {
    const tabComponents = document.querySelectorAll('.tabs-3-fixed');
    
    tabComponents.forEach(component => {
      const tabs = component.querySelectorAll('.tab');
      const layout = component.classList.contains('layout-alt-01') ? 'alt-01' : 'default';
      
      // Get border segments for alt-01 layout
      const borderSegments = layout === 'alt-01' 
        ? component.querySelectorAll('.active-border-segment')
        : null;
      
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          tab.classList.add('active');
          
          // Update border segments for alt-01 layout
          if (borderSegments) {
            borderSegments.forEach(segment => segment.classList.remove('active'));
            if (borderSegments[index]) {
              borderSegments[index].classList.add('active');
            }
          }
          
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

  // Auto-initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeTabsFixed);
  } else {
    initThreeTabsFixed();
  }

  // Export for manual initialization
  window.ThreeTabsFixedComponent = {
    init: initThreeTabsFixed
  };
})();
