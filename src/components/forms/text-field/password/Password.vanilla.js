/* Password Component JavaScript - SELF-CONTAINED */

(function() {
  'use strict';

  // Component initialization
  function initPassword() {
    const passwordContainers = document.querySelectorAll('.password-container');
    
    passwordContainers.forEach(container => {
      const input = container.querySelector('.password-input');
      const wrapper = container.querySelector('.password-wrapper');
      const toggleBtn = container.querySelector('.password-toggle');
      
      if (!input || !toggleBtn) return;
      
      // Make clicking anywhere on wrapper focus the input (except toggle button)
      wrapper.addEventListener('click', (e) => {
        if (e.target === toggleBtn || toggleBtn.contains(e.target)) {
          return;
        }
        input.focus();
      });
      
      // Toggle password visibility
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
        
        // Keep focus on input after toggle
        input.focus();
      });
      
      // Dispatch custom events when password changes
      input.addEventListener('input', () => {
        const event = new CustomEvent('password-changed', {
          detail: {
            value: input.value,
            isVisible: input.type === 'text'
          },
          bubbles: true
        });
        container.dispatchEvent(event);
      });
    });
  }

  // Helper function to set error state
  function setError(container, errorMessage) {
    const wrapper = container.querySelector('.password-wrapper');
    const hint = container.querySelector('.password-hint');
    
    if (wrapper) {
      wrapper.classList.add('error');
    }
    
    if (hint && errorMessage) {
      hint.textContent = errorMessage;
      hint.classList.add('error');
    }
  }

  // Helper function to clear error state
  function clearError(container) {
    const wrapper = container.querySelector('.password-wrapper');
    const hint = container.querySelector('.password-hint');
    
    if (wrapper) {
      wrapper.classList.remove('error');
    }
    
    if (hint) {
      hint.classList.remove('error');
    }
  }

  // Export helper functions
  window.PasswordComponent = {
    init: initPassword,
    setError: setError,
    clearError: clearError
  };

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPassword);
  } else {
    initPassword();
  }

})();
