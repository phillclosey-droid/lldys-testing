/**
 * NotificationBadge Web Component
 * Self-contained native web component with embedded CSS from NotificationBadge.vanilla.css
 */

class NotificationBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['count', 'type'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    let count = this.getAttribute('count') || '12';
    // Cap at 99 to keep circular shape
    const numCount = parseInt(count);
    if (numCount > 99) {
      count = '99';
    }
    const type = this.getAttribute('type') || 'default';
    const badgeClass = type === 'offers' ? 'notification-badge notification-badge-offers' : 'notification-badge';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../../css/cancara-tokens.css">
      <style>
        /* EXACT CSS from NotificationBadge.vanilla.css */
        .notification-badge {
          border-radius: var(--radius-circle);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 0px var(--spacing-04);
          min-width: 16px;
          min-height: 16px;
          background-color: var(--color-red-critical);
        }

        .notification-badge-text {
          font-family: var(--type-style-12-family);
          font-size: var(--type-style-12-size);
          font-weight: var(--type-style-12-weight);
          line-height: var(--type-style-12-line-height);
          color: var(--color-white);
          text-align: center;
        }

        .notification-badge-offers {
          background-color: var(--color-green-bright);
        }

        .notification-badge-offers .notification-badge-text {
          color: var(--color-black);
        }
      </style>
      
      <!-- EXACT HTML from NotificationBadge.html -->
      <div class="${badgeClass}">
        <div class="notification-badge-text">${count}</div>
      </div>
    `;
  }
}

customElements.define('notification-badge', NotificationBadge);
