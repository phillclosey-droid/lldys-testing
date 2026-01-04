class TileComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'default';
    const html = this.getVariantHTML(variant);
    
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../src/css/cancara-tokens.css">
      <link rel="stylesheet" href="../src/components/action/tile/tile/Tile.vanilla.css">
      <style>
        .tile {
          box-shadow: none !important;
        }
      </style>
      ${html}
    `;
    this.loadImages();
  }
  
  getVariantHTML(variant) {
    const variants = {
      'default': `<div class="tile tile-horizontal">
    <div class="pictogram pict-default">
        <img data-pictogram="Piggy_Bank_Lloyds_-_V2" alt="">
    </div>
    <div class="tile-vstack">
        <div class="tile-text-link">Open a savings account</div>
    </div>
    <div class="tile-icon tile-icon-12">
        <img data-chevron alt="">
    </div>
</div>`,
      'link-description': `<div class="tile tile-horizontal">
    <div class="pictogram pict-secondary-alt-04">
        <img data-pictogram="Calendar_Lloyds_-_V2" alt="">
    </div>
    <div class="tile-vstack">
        <div class="tile-text-description">Never miss a payment again</div>
        <div class="tile-text-link">Set up direct debit</div>
    </div>
    <div class="tile-icon tile-icon-12">
        <img data-chevron alt="">
    </div>
</div>`,
      'heading-description': `<div class="tile tile-horizontal">
    <div class="tile-vstack">
        <div class="tile-hstack">
            <div class="tile-icon tile-icon-18">
                <img data-icon="current-account" data-icon-category="finance" alt="">
            </div>
            <div class="tile-text-heading">Current Account</div>
        </div>
        <div class="tile-text-subtext">£2,547.89 available</div>
    </div>
    <div class="tile-icon tile-icon-12">
        <img data-chevron alt="">
    </div>
</div>`,
      'vertical-link': `<div class="tile tile-vertical">
    <div class="pictogram pict-primary-alt-01">
        <img data-pictogram="Piggy_Bank_Lloyds_-_V2" alt="">
    </div>
    <div class="tile-vstack">
        <div class="tile-text-link">Savings Account</div>
    </div>
    <div class="tile-icon tile-icon-12">
        <img data-chevron alt="">
    </div>
</div>`,
      'vertical-description': `<div class="tile tile-vertical">
    <div class="pictogram pict-secondary-alt-02">
        <img data-pictogram="Heart_Lloyds_-_V2" alt="">
    </div>
    <div class="tile-vstack">
        <div class="tile-text-description">Protect what matters most</div>
        <div class="tile-text-link">Get Insurance</div>
    </div>
    <div class="tile-icon tile-icon-12">
        <img data-chevron alt="">
    </div>
</div>`
    };
    
    return variants[variant] || variants['default'];
  }
  
  loadImages() {
    const assetsPath = '../assets';
    
    const pictogramImg = this.shadowRoot.querySelector('[data-pictogram]');
    if (pictogramImg) {
      const pictogramFile = pictogramImg.getAttribute('data-pictogram');
      pictogramImg.src = `${assetsPath}/pictograms/${pictogramFile}.svg`;
    }
    
    const iconImgs = this.shadowRoot.querySelectorAll('[data-icon]');
    iconImgs.forEach(iconImg => {
      const iconFile = iconImg.getAttribute('data-icon');
      const iconCategory = iconImg.getAttribute('data-icon-category') || 'navigation';
      iconImg.src = `${assetsPath}/icons/${iconCategory}/${iconFile}.svg`;
    });
    
    const chevronImg = this.shadowRoot.querySelector('[data-chevron]');
    if (chevronImg) {
      chevronImg.src = `${assetsPath}/icons/arrows/chevron-right.svg`;
    }
  }
}
customElements.define('tile-component', TileComponent);
