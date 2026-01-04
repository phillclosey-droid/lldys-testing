/* RadioButton Vanilla JS - SELF-CONTAINED */

(function() {
  'use strict';

  // Initialize all radio buttons on the page
  function initRadioButtons() {
    const radioButtons = document.querySelectorAll('.radio-button');
    
    radioButtons.forEach(button => {
      // Only add click handler if not disabled
      if (!button.disabled && !button.classList.contains('disabled')) {
        button.addEventListener('click', handleRadioClick);
      }
    });
  }

  // Handle radio button click
  function handleRadioClick(event) {
    const clickedButton = event.currentTarget;
    const groupName = clickedButton.getAttribute('data-radio-group');
    
    if (!groupName) {
      // If no group name, just toggle the individual button
      toggleRadio(clickedButton);
      return;
    }
    
    // Get all radio buttons in the same group
    const groupButtons = document.querySelectorAll(
      `.radio-button[data-radio-group="${groupName}"]`
    );
    
    // Deselect all buttons in the group
    groupButtons.forEach(button => {
      button.classList.remove('selected');
      button.setAttribute('aria-checked', 'false');
    });
    
    // Select the clicked button
    clickedButton.classList.add('selected');
    clickedButton.setAttribute('aria-checked', 'true');
    
    // Dispatch custom event for programmatic usage
    const changeEvent = new CustomEvent('radiochange', {
      detail: {
        group: groupName,
        value: clickedButton.getAttribute('data-value')
      },
      bubbles: true
    });
    clickedButton.dispatchEvent(changeEvent);
  }

  // Toggle individual radio button (for standalone usage)
  function toggleRadio(button) {
    const isSelected = button.classList.contains('selected');
    
    if (isSelected) {
      button.classList.remove('selected');
      button.setAttribute('aria-checked', 'false');
    } else {
      button.classList.add('selected');
      button.setAttribute('aria-checked', 'true');
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRadioButtons);
  } else {
    initRadioButtons();
  }

  // Export public API
  window.RadioButton = {
    init: initRadioButtons,
    select: function(button) {
      if (button.disabled || button.classList.contains('disabled')) return;
      handleRadioClick({ currentTarget: button });
    },
    deselect: function(button) {
      button.classList.remove('selected');
      button.setAttribute('aria-checked', 'false');
    }
  };
})();
