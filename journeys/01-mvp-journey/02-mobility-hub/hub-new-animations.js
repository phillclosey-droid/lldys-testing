/**
 * Hub Animations - Modified Version
 * Replaces card flip with icon flip + ghost panel animations
 */

// Override the card flip animation with new sequence
function animateNewTaskCompletion(newTask, progressPercent, totalCompleted, totalTasks) {
    const ghostPanel = document.querySelector(`.flip-container[data-task="${newTask}"] .hero-panel-ghost-compact`);
    const subtitle = ghostPanel ? ghostPanel.querySelector('.hero-panel-ghost-subtitle') : null;
    const iconButton = ghostPanel ? ghostPanel.querySelector('.hero-panel-ghost-button') : null;
    const progressFill = document.querySelector('.hero-panel-progress-fill');
    const progressText = document.querySelector('.hero-panel-progress-text');
    const progressSubtext = document.querySelector('.hero-panel-progress-subtext');
    
    console.log('[HUB-ANIM] Starting new animation sequence for:', newTask);
    
    // Wait 400ms for scroll to complete before starting animations
    setTimeout(function() {
        console.log('[HUB-ANIM] Scroll complete, starting animations');
        
        // Step 1: Update text FIRST
        if (progressText) progressText.textContent = `Your car profile is ${progressPercent}% complete`;
        if (progressSubtext) progressSubtext.textContent = `${totalCompleted} of ${totalTasks} tasks completed`;
        console.log('[HUB-ANIM] Text updated');
        
        // Step 2: Animate progress bar (starts immediately, duration 1s)
        setTimeout(function() {
            if (progressFill) {
                progressFill.style.transition = 'width 1s ease';
                progressFill.style.width = progressPercent + '%';
                console.log('[HUB-ANIM] Progress bar animating to:', progressPercent + '%');
            }
        }, 50);
    
    // Step 3: Change subtitle and flip icon (1300ms - after progress finishes)
    setTimeout(function() {
        // Change subtitle text
        if (subtitle) {
            subtitle.textContent = 'Added';
            console.log('[HUB-ANIM] Subtitle changed to Added');
        }
        
        // Flip the icon circle
        if (iconButton) {
            iconButton.style.transform = 'rotateY(180deg)';
            iconButton.style.transition = 'transform 0.6s ease';
            iconButton.style.transformStyle = 'preserve-3d';
            console.log('[HUB-ANIM] Icon button flipping');
            
            // Change icon to tick after half the flip (so it appears correctly when rotated)
            setTimeout(function() {
                const icon = iconButton.querySelector('img');
                if (icon) {
                    // The tick needs to be pre-flipped so it appears correct after rotation
                    icon.setAttribute('data-action-icon', 'tick');
                    icon.setAttribute('src', '../../../assets/icons/action/tick.svg');
                    icon.style.transform = 'scaleX(-1)'; // Flip horizontally to compensate
                    console.log('[HUB-ANIM] Icon changed to tick');
                }
            }, 300);
        }
    }, 1300);
    
    // Step 4: Fade out ghost panel - timing depends on if 100% or 75%
    const fadeOutDelay = (progressPercent === 100) ? 1500 : 2200;  // Faster for 100%
    setTimeout(function() {
        const flipContainer = document.querySelector(`.flip-container[data-task="${newTask}"]`);
        if (flipContainer) {
            flipContainer.style.transition = 'opacity 0.4s ease';
            flipContainer.style.opacity = '0';
            console.log('[HUB-ANIM] Ghost panel fading out');
        }
    }, fadeOutDelay);
    
    // Step 5: Handle panel visibility and expansion - timing depends on if 100% or 75%
    const expansionDelay = (progressPercent === 100) ? 1900 : 2600;
    setTimeout(function() {
        const dashboardGrid = document.querySelector('.hero-panel-dashboard-grid');
        
        // If 100% complete, hide the entire dashboard grid
        if (progressPercent === 100) {
            // Hide completed panel's wrapper immediately
            const completedPanel = document.querySelector(`.flip-container[data-task="${newTask}"]`);
            if (completedPanel && completedPanel.parentElement) {
                completedPanel.parentElement.style.visibility = 'hidden';
                completedPanel.parentElement.style.pointerEvents = 'none';
                console.log('[HUB-ANIM] Completed panel wrapper hidden (visibility)');
            }
            
            // Fade out the entire dashboard grid
            if (dashboardGrid) {
                dashboardGrid.style.transition = 'opacity 0.4s ease';
                dashboardGrid.style.opacity = '0';
                console.log('[HUB-ANIM] 100% - Fading out entire dashboard grid');
            }
            
            // After fade completes, LOCK hero panel height BEFORE hiding anything
            setTimeout(function() {
                const heroPanel = document.querySelector('.hero-panel');
                const dashboardGrid = document.querySelector('.hero-panel-dashboard-grid');
                
                // Step 1: Lock the height FIRST before any content changes
                if (heroPanel) {
                    const currentHeight = heroPanel.getBoundingClientRect().height;
                    heroPanel.style.minHeight = currentHeight + 'px';
                    heroPanel.style.height = currentHeight + 'px';
                    heroPanel.style.maxHeight = currentHeight + 'px';
                    console.log('[HUB-ANIM] 100% - Hero panel height LOCKED at', currentHeight + 'px');
                }
                
                // Step 2: NOW hide the dashboard (height won't change because it's locked)
                if (dashboardGrid) {
                    dashboardGrid.style.display = 'none';
                    console.log('[HUB-ANIM] 100% - Dashboard hidden but height locked');
                }
                
                // Fade out progress section and fade in notification (height still locked)
                setTimeout(function() {
                    const progressSection = document.getElementById('progress-section');
                    const notification = document.getElementById('completion-notification');
                    
                    if (progressSection && notification) {
                        // Fade out progress
                        progressSection.style.transition = 'opacity 0.4s ease';
                        progressSection.style.opacity = '0';
                        
                        setTimeout(function() {
                            progressSection.style.display = 'none';
                            notification.style.display = 'block';
                            notification.style.marginBottom = '16px';
                            
                            // Fade in notification
                            setTimeout(function() {
                                notification.style.transition = 'opacity 0.4s ease';
                                notification.style.opacity = '1';
                                console.log('[HUB-ANIM] 100% - Notification shown, height STILL locked');
                                
                                // Step 3: NOW animate hero panel height AFTER notification is visible
                                setTimeout(function() {
                                    if (heroPanel) {
                                        // Remove height constraints and enable transition
                                        heroPanel.style.minHeight = '';
                                        heroPanel.style.maxHeight = '';
                                        heroPanel.style.transition = 'height 0.5s ease';
                                        
                                        // Calculate new natural height
                                        heroPanel.style.height = 'auto';
                                        const newHeight = heroPanel.getBoundingClientRect().height;
                                        
                                        // Snap back to locked height
                                        heroPanel.style.height = currentHeight + 'px';
                                        
                                        // Force reflow
                                        heroPanel.offsetHeight;
                                        
                                        // Animate to new height
                                        heroPanel.style.height = newHeight + 'px';
                                        
                                        console.log('[HUB-ANIM] 100% - Animating height from', currentHeight, 'to', newHeight);
                                        
                                        // Clean up after animation
                                        setTimeout(function() {
                                            heroPanel.style.height = 'auto';
                                            heroPanel.style.transition = '';
                                        }, 500);
                                    }
                                }, 300); // Delay after notification appears
                            }, 50);
                        }, 400);
                    }
                }, 100);
            }, 400);
        } else {
            // Not 100% yet - expand remaining panel
            const otherTask = newTask === 'insurance' ? 'servicing' : 'insurance';
            const otherPanel = document.querySelector(`.flip-container[data-task="${otherTask}"]`);
            const dashboardRow = document.querySelector('.hero-panel-dashboard-row');
            
            // Hide completed panel's wrapper (the <a> tag) - keep in flow for smooth animation
            const completedPanel = document.querySelector(`.flip-container[data-task="${newTask}"]`);
            if (completedPanel && completedPanel.parentElement) {
                completedPanel.parentElement.style.visibility = 'hidden';
                completedPanel.parentElement.style.pointerEvents = 'none';
                console.log('[HUB-ANIM] Completed panel wrapper hidden (visibility)');
            }
            
            // Expand remaining panel to full width and remove gap
            if (otherPanel && dashboardRow) {
                // Remove gap from dashboard row
                dashboardRow.style.gap = '0';
                dashboardRow.style.transition = 'gap 0.4s ease';
                // Expand panel's wrapper (the <a> tag)
                if (otherPanel.parentElement) {
                    otherPanel.parentElement.style.flex = '1 1 100%';
                    otherPanel.parentElement.style.maxWidth = '100%';
                    otherPanel.parentElement.style.transition = 'flex 0.4s ease, max-width 0.4s ease';
                }
                console.log('[HUB-ANIM] Remaining panel expanding');
            }
            
            // After animation completes, fully remove the hidden panel
            setTimeout(function() {
                if (completedPanel && completedPanel.parentElement) {
                    completedPanel.parentElement.style.display = 'none';
                }
            }, 400);
        }
    }, expansionDelay);
    
    // Step 6: Show list item with height animation - timing depends on if 100% or 75%
    const listItemDelay = (progressPercent === 100) ? 2300 : 3000;
    setTimeout(function() {
        const listItem = document.getElementById(`${newTask}-list-item`);
        if (listItem) {
            // Set initial height to 0
            listItem.style.height = '0';
            listItem.style.overflow = 'hidden';
            listItem.style.display = 'flex';
            
            // Force reflow
            listItem.offsetHeight;
            
            // Get the natural height
            listItem.style.height = 'auto';
            const naturalHeight = listItem.offsetHeight;
            listItem.style.height = '0';
            
            // Force reflow again
            listItem.offsetHeight;
            
            // Animate to natural height
            listItem.style.transition = 'height 0.4s ease, opacity 0.4s ease';
            listItem.style.height = naturalHeight + 'px';
            listItem.style.opacity = '1';
            
            // Clean up after animation
            setTimeout(function() {
                listItem.style.height = 'auto';
                listItem.style.overflow = 'visible';
                
                // Reload SVG icons for the newly shown list item
                if (window.reloadInlineSVGs) {
                    window.reloadInlineSVGs();
                    console.log('[HUB-ANIM] Reloaded SVG icons after list item show');
                }
            }, 400);
            
            console.log('[HUB-ANIM] List item animated in');
        }
    }, listItemDelay);
    
    }, 400); // End of scroll delay wrapper
    
    // Return timing info for 100% completion handling
    return {
        progressUpdateTime: 450,  // Text updates after scroll (400ms + 50ms)
        totalAnimationTime: 3800  // Total duration (3400 + 400 scroll delay)
    };
}

// Make function globally available
window.animateNewTaskCompletion = animateNewTaskCompletion;

console.log('[HUB-ANIM] Animation override script loaded');