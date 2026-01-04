/**
 * TileGrid Web Component
 * Self-contained native web component with embedded CSS from TileGrid.vanilla.css
 * COMPOSITIONAL - Uses <tile-component> as nested web components
 */

class TileGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['variant'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'link-only';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../../../../../../css/cancara-tokens.css">
      <style>
        /* EXACT CSS from TileGrid.vanilla.css */
        :host {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-16);
        }

        .tile-grid-header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
          padding-left: var(--spacing-16);
        }

        ::slotted(.tile-grid-heading) {
          font-family: var(--type-style-3-family);
          font-size: var(--type-style-3-size);
          font-weight: var(--type-style-3-weight);
          line-height: var(--type-style-3-line-height);
          letter-spacing: var(--type-style-3-letter-spacing);
          color: var(--text-default);
          margin: 0;
          padding-bottom: var(--spacing-16);
        }

        ::slotted(.tile-grid-view-all) {
          font-family: var(--type-style-5-family);
          font-size: var(--type-style-5-size);
          font-weight: var(--type-style-5-weight);
          line-height: var(--type-style-5-line-height);
          color: var(--text-default);
          text-decoration: underline;
          padding: var(--spacing-12) var(--spacing-16);
          border-radius: var(--radius-default);
          background-color: transparent;
          cursor: pointer;
        }

        .tile-grid-tiles {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-16);
        }

        ::slotted(.tile-grid-row) {
          display: flex;
          flex-direction: row;
          gap: var(--spacing-16);
          padding: 0 var(--spacing-16);
        }
      </style>
      
      <slot name="header"></slot>
      <div class="tile-grid-tiles">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tile-grid', TileGrid);
