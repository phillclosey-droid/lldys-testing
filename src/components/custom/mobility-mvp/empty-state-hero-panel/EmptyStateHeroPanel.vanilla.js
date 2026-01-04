/**
 * EmptyStateHeroPanel Component JavaScript - Auto-initializes assets
 * 
 * Handles automatic initialization of:
 * - Icons (using existing icon system)
 * - Pictograms (using existing pictogram system)
 * 
 * Auto-runs on page load via DOMContentLoaded
 */

(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmptyStateHeroPanel);
  } else {
    initEmptyStateHeroPanel();
  }
  
  function initEmptyStateHeroPanel() {
    console.log('[EmptyStateHeroPanel] Initializing component');
    
    // Initialize icons if the functions exist
    // These come from the existing icon/pictogram initialization scripts
    if (typeof window.initActionIcons === 'function') {
      window.initActionIcons();
      console.log('[EmptyStateHeroPanel] Icons initialized');
    }
    
    if (typeof window.initPictograms === 'function') {
      window.initPictograms();
      console.log('[EmptyStateHeroPanel] Pictograms initialized');
    }
    
    // Force icon initialization after a short delay if needed
    // This handles cases where the main initialization hasn't run yet
    setTimeout(function() {
      if (window.initActionIcons) window.initActionIcons();
      if (window.initPictograms) window.initPictograms();
    }, 100);
  }
  
})();
