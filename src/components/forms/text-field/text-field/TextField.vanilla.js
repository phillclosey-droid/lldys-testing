/**
 * TextField Vanilla JavaScript - AUTO-INITIALIZATION
 * 
 * Provides enhanced text field functionality:
 * - Clear button functionality
 * - Auto-hide/show clear button based on input value
 * - Custom events for value changes
 * - Accessibility enhancements
 */

(function() {
  'use strict';

  /**
   * Calculate path to assets folder based on current page location
   */
  function getAssetsPath() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/src/components/')) {
      // In component folder: src/components/forms/text-field/text-field/
      return '../../../../../assets';
    } else if (currentPath.includes('/journeys/')) {
      // In journeys folder: journeys/some-journey/
      return '../../assets';
    }
    
    return '../../assets';
  }

  /**
   * TextField class - Manages individual text field instances
   */
  class TextField {
    constructor(input) {
      this.input = input;
      this.container = input.closest('.text-field-container');
      this.wrapper = input.closest('.text-field-wrapper');
      this.clearButton = this.wrapper?.querySelector('.text-field-clear');
      
      if (!this.container || !this.wrapper) {
        console.warn('TextField: Invalid DOM structure', input);
        return;
      }

      this.init();
    }

    init() {
      // Set up clear button functionality
      if (this.clearButton) {
        this.setupClearButton();
        this.updateClearButtonVisibility();
      }

      // Make wrapper clickable to focus input
      this.setupWrapperClick();

      // Add event listeners
      this.addEventListeners();
      
      // Mark as initialized
      this.input.dataset.textFieldInitialized = 'true';
    }

    setupWrapperClick() {
      if (this.wrapper) {
        this.wrapper.addEventListener('click', (e) => {
          // Don't focus if clicking on button or icon
          if (!e.target.closest('button') && !e.target.closest('.text-field-icon')) {
            this.input.focus();
          }
        });
      }
    }

    setupClearButton() {
      this.clearButton.addEventListener('click', () => {
        this.clear();
      });
    }

    addEventListeners() {
      // Update clear button visibility on input
      this.input.addEventListener('input', () => {
        this.updateClearButtonVisibility();
        this.dispatchChangeEvent();
      });

      // Update clear button visibility on value change
      this.input.addEventListener('change', () => {
        this.updateClearButtonVisibility();
      });
    }

    updateClearButtonVisibility() {
      if (!this.clearButton) return;
      
      if (this.input.value.length > 0 && !this.input.disabled) {
        this.clearButton.style.display = 'flex';
      } else {
        this.clearButton.style.display = 'none';
      }
    }

    dispatchChangeEvent() {
      const customEvent = new CustomEvent('textfield:change', {
        detail: {
          value: this.input.value,
          input: this.input
        },
        bubbles: true
      });
      this.container.dispatchEvent(customEvent);
    }

    // Public API methods
    
    clear() {
      if (!this.input.disabled) {
        this.input.value = '';
        this.updateClearButtonVisibility();
        this.input.focus();
        this.dispatchChangeEvent();
      }
    }

    setValue(value) {
      if (!this.input.disabled) {
        this.input.value = value;
        this.updateClearButtonVisibility();
        this.dispatchChangeEvent();
      }
    }

    getValue() {
      return this.input.value;
    }

    setError(errorMessage) {
      this.container.classList.add('text-field-error');
      
      // Set aria-invalid
      this.input.setAttribute('aria-invalid', 'true');
      
      // Create or update error message
      let hint = this.container.querySelector('.text-field-hint');
      if (!hint) {
        hint = document.createElement('div');
        hint.className = 'text-field-hint';
        const hintId = `error-${Math.random().toString(36).substr(2, 9)}`;
        hint.id = hintId;
        this.input.setAttribute('aria-describedby', hintId);
        this.wrapper.after(hint);
      }
      hint.textContent = errorMessage;
      
      // Add error icon if not exists
      if (!this.wrapper.querySelector('.text-field-icon-error')) {
        const icon = document.createElement('span');
        icon.className = 'text-field-icon text-field-icon-error';
        icon.setAttribute('aria-hidden', 'true');
        const img = document.createElement('img');
        const ASSETS_BASE = getAssetsPath();
        img.src = `${ASSETS_BASE}/icons/sentiment-system/critical-filled.svg`;
        img.alt = '';
        icon.appendChild(img);
        this.wrapper.appendChild(icon);
      }
    }

    clearError() {
      this.container.classList.remove('text-field-error');
      this.input.removeAttribute('aria-invalid');
      
      const errorIcon = this.wrapper.querySelector('.text-field-icon-error');
      if (errorIcon) {
        errorIcon.remove();
      }
    }

    enable() {
      this.input.disabled = false;
      this.updateClearButtonVisibility();
    }

    disable() {
      this.input.disabled = true;
      this.updateClearButtonVisibility();
    }
  }

  /**
   * Initialize all text fields on the page
   */
  function initializeTextFields() {
    const inputs = document.querySelectorAll('.text-field-input:not([data-text-field-initialized])');
    
    inputs.forEach(input => {
      new TextField(input);
    });
  }

  /**
   * Observe DOM for dynamically added text fields
   */
  function observeDynamicTextFields() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            // Check if node itself is a text field input
            if (node.classList && node.classList.contains('text-field-input')) {
              new TextField(node);
            }
            // Check for text field inputs within added node
            const inputs = node.querySelectorAll && node.querySelectorAll('.text-field-input:not([data-text-field-initialized])');
            if (inputs) {
              inputs.forEach(input => new TextField(input));
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
      initializeTextFields();
      observeDynamicTextFields();
    });
  } else {
    initializeTextFields();
    observeDynamicTextFields();
  }

  /**
   * Expose utility for manual initialization
   */
  window.CancaraTextField = {
    init: initializeTextFields,
    create: (input) => new TextField(input)
  };

})();
