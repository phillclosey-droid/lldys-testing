/**
 * Pictogram Web Component
 * Self-contained native web component with embedded CSS from Pictogram.vanilla.css
 */

class PictogramComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant', 'src', 'alt'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../../../../css/cancara-tokens.css">
      <style>
        /* EXACT CSS from Pictogram.vanilla.css */
        .pictogram {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-circle);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .pictogram img {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }

        .pict-default {
          background-color: var(--color-green-mint);
        }

        .pict-default-alt-01 {
          background-color: var(--color-transparent);
          border: var(--border-width-02) dashed var(--border-default);
        }

        .pict-default-alt-02 {
          background-color: var(--color-gray-100);
        }

        .pict-primary {
          background-color: var(--color-green-promo-primary);
        }

        .pict-primary-alt-01 {
          background-color: var(--color-green-promo-primary-dark);
        }

        .pict-primary-alt-02 {
          background-color: var(--color-green-promo-primary-darker);
        }

        .pict-primary-alt-03 {
          background-color: var(--color-green-light);
        }

        .pict-secondary-alt-01 {
          background-color: var(--color-purple-promo);
        }

        .pict-secondary-alt-02 {
          background-color: var(--color-pink-promo);
        }

        .pict-secondary-alt-03 {
          background-color: var(--color-cyan-promo);
        }

        .pict-secondary-alt-04 {
          background-color: var(--color-orange-promo);
        }
      </style>
      
      <div class="pictogram pict-${variant}">
        ${src ? `<img src="${src}" alt="${alt}">` : ''}
      </div>
    `;
  }
}

customElements.define('pictogram-component', PictogramComponent);
