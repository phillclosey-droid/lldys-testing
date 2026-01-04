/**
 * IconButton Web Component
 * Self-contained native web component with embedded CSS from IconButton.vanilla.css
 */

class IconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['type', 'size', 'modifier', 'icon', 'icon-category', 'disabled', 'assets-path'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute('type') || 'primary';
    const size = this.getAttribute('size') || 'default';
    const modifier = this.getAttribute('modifier') || '';
    const icon = this.getAttribute('icon') || '';
    const iconCategory = this.getAttribute('icon-category') || 'arrows';
    const disabled = this.hasAttribute('disabled');
    const assetsPath = this.getAttribute('assets-path') || '../../../../../assets';
    
    const buttonClasses = `icon-button size-${size} btn-${type}${modifier ? ' btn-' + modifier : ''}`;
    const iconSrc = icon ? `${assetsPath}/icons/${iconCategory}/${icon}.svg` : '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../../../../css/cancara-tokens.css">
      <style>
        /* EXACT CSS from IconButton.vanilla.css */
        .icon-button {
          border-radius: var(--btn-icon-corner-radius);
          display: inline-flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.2s, border-color 0.2s;
          border: none;
          background: transparent;
          font-family: inherit;
        }

        .icon-button:disabled {
          cursor: not-allowed;
        }

        .icon-button-icon {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .icon-button-icon img {
          object-fit: contain;
        }

        .size-default {
          height: 44px;
          width: 44px;
          padding: 0;
        }

        .size-default .icon-button-icon {
          width: 100%;
          height: 100%;
        }

        .size-default .icon-button-icon img {
          height: 18px;
          width: 18px;
        }

        .size-small {
          height: var(--btn-icon-min-size-small);
          width: var(--btn-icon-min-size-small);
          padding: 0;
        }

        .size-small .icon-button-icon {
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .size-small .icon-button-icon img {
          height: var(--spacing-16);
          width: var(--spacing-16);
        }

        .btn-primary {
          background-color: var(--bg-action-default);
          border: var(--border-width-02) solid transparent;
        }

        .btn-primary .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        .btn-primary:active,
        .btn-primary.pressed {
          background-color: var(--bg-action-pressed);
        }

        .btn-primary:disabled,
        .btn-primary.disabled {
          background-color: var(--bg-action-disabled);
        }

        :host-context([data-theme="dark"]) .btn-primary .icon-button-icon img {
          filter: none;
        }

        .btn-primary.btn-brand-accent {
          background-color: var(--btn-brand-accent-primary-bg-default);
          border-color: var(--btn-brand-accent-primary-bg-default);
        }

        .btn-primary.btn-brand-accent .icon-button-icon img {
          filter: none;
        }

        .btn-primary.btn-brand-accent:active,
        .btn-primary.btn-brand-accent.pressed {
          background-color: var(--btn-brand-accent-primary-bg-pressed);
          border-color: var(--btn-brand-accent-primary-bg-pressed);
        }

        .btn-primary.btn-brand-accent:disabled,
        .btn-primary.btn-brand-accent.disabled {
          background-color: var(--bg-action-disabled);
          border-color: transparent;
        }

        .btn-primary.btn-on-color {
          background-color: var(--bg-action-on-color-default);
        }

        .btn-primary.btn-on-color .icon-button-icon img {
          filter: none;
        }

        .btn-primary.btn-on-color:active,
        .btn-primary.btn-on-color.pressed {
          background-color: var(--bg-action-on-color-pressed);
        }

        .btn-primary.btn-on-color:active .icon-button-icon img,
        .btn-primary.btn-on-color.pressed .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        :host-context([data-theme="dark"]) .btn-primary.btn-on-color:active .icon-button-icon img,
        :host-context([data-theme="dark"]) .btn-primary.btn-on-color.pressed .icon-button-icon img {
          filter: none;
        }

        .btn-primary.btn-on-color:disabled,
        .btn-primary.btn-on-color.disabled {
          background-color: var(--bg-action-on-color-disabled);
        }

        .btn-secondary {
          background-color: var(--bg-action-transparent);
          border: var(--btn-icon-border-width) solid var(--text-default);
        }

        .btn-secondary .icon-button-icon img {
          filter: none;
        }

        .btn-secondary:active,
        .btn-secondary.pressed {
          background-color: var(--bg-action-pressed);
          border-color: transparent;
        }

        .btn-secondary:active .icon-button-icon img,
        .btn-secondary.pressed .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        .btn-secondary:disabled,
        .btn-secondary.disabled {
          background-color: var(--bg-action-disabled);
          border-color: transparent;
        }

        :host-context([data-theme="dark"]) .btn-secondary .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        :host-context([data-theme="dark"]) .btn-secondary:active .icon-button-icon img,
        :host-context([data-theme="dark"]) .btn-secondary.pressed .icon-button-icon img {
          filter: none;
        }

        .btn-secondary.btn-on-color {
          background-color: var(--bg-action-on-color-transparent);
          border: var(--btn-icon-border-width) solid var(--color-black);
        }

        .btn-secondary.btn-on-color .icon-button-icon img {
          filter: none;
        }

        :host-context([data-theme="dark"]) .btn-secondary.btn-on-color {
          border-color: var(--color-white);
        }

        :host-context([data-theme="dark"]) .btn-secondary.btn-on-color .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        .btn-secondary.btn-on-color:active,
        .btn-secondary.btn-on-color.pressed {
          background-color: var(--bg-action-on-color-pressed);
          border-color: transparent;
        }

        .btn-secondary.btn-on-color:active .icon-button-icon img,
        .btn-secondary.btn-on-color.pressed .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        :host-context([data-theme="dark"]) .btn-secondary.btn-on-color:active .icon-button-icon img,
        :host-context([data-theme="dark"]) .btn-secondary.btn-on-color.pressed .icon-button-icon img {
          filter: none;
        }

        .btn-secondary.btn-on-color:disabled,
        .btn-secondary.btn-on-color.disabled {
          background-color: var(--bg-action-on-color-disabled);
          border-color: transparent;
        }

        .btn-tertiary {
          background-color: var(--bg-action-transparent);
          border: var(--border-width-02) solid transparent;
        }

        .btn-tertiary .icon-button-icon img {
          filter: none;
        }

        .btn-tertiary:active,
        .btn-tertiary.pressed {
          background-color: var(--bg-action-pressed);
        }

        .btn-tertiary:active .icon-button-icon img,
        .btn-tertiary.pressed .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        .btn-tertiary:disabled,
        .btn-tertiary.disabled {
          background-color: var(--bg-action-disabled);
        }

        :host-context([data-theme="dark"]) .btn-tertiary .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        :host-context([data-theme="dark"]) .btn-tertiary:active .icon-button-icon img,
        :host-context([data-theme="dark"]) .btn-tertiary.pressed .icon-button-icon img {
          filter: none;
        }

        .btn-tertiary.btn-on-color {
          background-color: var(--bg-action-on-color-transparent);
          border: var(--border-width-02) solid transparent;
        }

        .btn-tertiary.btn-on-color .icon-button-icon img {
          filter: none;
        }

        :host-context([data-theme="dark"]) .btn-tertiary.btn-on-color .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        .btn-tertiary.btn-on-color:active,
        .btn-tertiary.btn-on-color.pressed {
          background-color: var(--bg-action-on-color-pressed);
        }

        .btn-tertiary.btn-on-color:active .icon-button-icon img,
        .btn-tertiary.btn-on-color.pressed .icon-button-icon img {
          filter: brightness(0) invert(1);
        }

        :host-context([data-theme="dark"]) .btn-tertiary.btn-on-color:active .icon-button-icon img,
        :host-context([data-theme="dark"]) .btn-tertiary.btn-on-color.pressed .icon-button-icon img {
          filter: none;
        }

        .btn-tertiary.btn-on-color:disabled,
        .btn-tertiary.btn-on-color.disabled {
          background-color: var(--bg-action-on-color-disabled);
        }
      </style>
      
      <!-- EXACT HTML structure from IconButton -->
      <button class="${buttonClasses}" ${disabled ? 'disabled' : ''}>
        <div class="icon-button-icon">
          ${iconSrc ? `<img src="${iconSrc}" alt="">` : ''}
        </div>
      </button>
    `;
  }
}

customElements.define('icon-button', IconButton);
