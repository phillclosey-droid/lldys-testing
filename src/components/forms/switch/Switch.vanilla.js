/**
 * Switch Vanilla JavaScript - AUTO-INITIALIZATION
 * 
 * Provides enhanced switch functionality:
 * - Smooth animations
 * - Touch gesture support
 * - Custom events
 * - Keyboard enhancements
 * - ARIA attribute management
 * 
 * Auto-initializes all .switch-input elements on page load.
 */

(function() {
  'use strict';

  /**
   * Switch class - Manages individual switch instances
   */
  class Switch {
    constructor(input) {
      this.input = input;
      this.container = input.closest('.switch-container');
      this.track = this.container.querySelector('.switch-track');
      this.handle = this.container.querySelector('.switch-handle');
      
      if (!this.container || !this.track || !this.handle) {
        console.warn('Switch: Invalid DOM structure', input);
        return;
      }

      this.init();
    }

    init() {
      // Set up ARIA attributes
      this.setupAccessibility();
      
      // Add event listeners
      this.addEventListeners();
      
      // Mark as initialized
      this.input.dataset.switchInitialized = 'true';
    }

    setupAccessibility() {
      // Add ARIA attributes if not present
      if (!this.input.hasAttribute('role')) {
        this.input.setAttribute('role', 'switch');
      }
      
      // Set aria-checked based on current state
      this.updateAriaChecked();
      
      // Add aria-label if label text exists
      const label = this.container.querySelector('.switch-label');
      if (label && !this.input.hasAttribute('aria-label')) {
        this.input.setAttribute('aria-labelledby', this.generateId(label));
      }
    }

    updateAriaChecked() {
      this.input.setAttribute('aria-checked', this.input.checked.toString());
    }

    generateId(element) {
      if (!element.id) {
        element.id = 'switch-label-' + Math.random().toString(36).substr(2, 9);
      }
      return element.id;
    }

    addEventListeners() {
      // Listen for change events
      this.input.addEventListener('change', this.handleChange.bind(this));
      
      // Enhanced keyboard support
      this.input.addEventListener('keydown', this.handleKeydown.bind(this));
      
      // Touch gesture support
      if ('ontouchstart' in window) {
        this.track.addEventListener('touchstart', this.handleTouchStart.bind(this));
      }
    }

    handleChange(event) {
      // Update ARIA attributes
      this.updateAriaChecked();
      
      // Dispatch custom event with more details
      const customEvent = new CustomEvent('switch:change', {
        detail: {
          checked: this.input.checked,
          value: this.input.value,
          input: this.input
        },
        bubbles: true
      });
      this.container.dispatchEvent(customEvent);
    }

    handleKeydown(event) {
      // Add additional keyboard shortcuts if needed
      // Space and Enter toggle (native behavior)
    }

    handleTouchStart(event) {
      // Add touch feedback class
      this.track.classList.add('switch-touching');
      
      const handleTouchEnd = () => {
        this.track.classList.remove('switch-touching');
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
      };
      
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
    }

    // Public API methods
    
    toggle() {
      if (!this.input.disabled) {
        this.input.checked = !this.input.checked;
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    setChecked(checked) {
      if (!this.input.disabled) {
        this.input.checked = checked;
        this.input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    isChecked() {
      return this.input.checked;
    }

    enable() {
      this.input.disabled = false;
    }

    disable() {
      this.input.disabled = true;
    }
  }

  /**
   * Initialize all switches on the page
   */
  function initializeSwitches() {
    const switches = document.querySelectorAll('.switch-input:not([data-switch-initialized])');
    
    switches.forEach(input => {
      new Switch(input);
    });
  }

  /**
   * Observe DOM for dynamically added switches
   */
  function observeDynamicSwitches() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if node itself is a switch input
            if (node.classList && node.classList.contains('switch-input')) {
              new Switch(node);
            }
            // Check for switch inputs within added node
            const switches = node.querySelectorAll && node.querySelectorAll('.switch-input:not([data-switch-initialized])');
            if (switches) {
              switches.forEach(input => new Switch(input));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Auto-initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializeSwitches();
      observeDynamicSwitches();
    });
  } else {
    initializeSwitches();
    observeDynamicSwitches();
  }

  /**
   * Expose utility for manual initialization
   */
  window.CancaraSwitch = {
    init: initializeSwitches,
    create: (input) => new Switch(input)
  };

  /**
   * Add CSS for touch feedback if not present
   */
  const touchStyles = `
    .switch-track.switch-touching {
      transform: scale(0.95);
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = touchStyles;
  
  if (document.head) {
    document.head.appendChild(styleSheet);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.head.appendChild(styleSheet);
    });
  }

})();
