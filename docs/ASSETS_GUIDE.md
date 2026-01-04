# Cancara Design System - Assets Guide

## Overview
This document provides a detailed guide to all visual assets in the Cancara Design System, including icons, illustrations, pictograms, and fonts.

For general project structure, see `PROJECT_STRUCTURE.md`.

---

## Assets Directory Structure

```
assets/
├── fonts/              # Typography font files
├── icons/              # Small UI icons (18px-24px)
├── illustrations/      # Large decorative images
└── pictograms/         # Medium conceptual icons
```

---

## Icons (`/assets/icons/`)

Small, functional UI icons organized by category. Typically used at 18px or 24px size.

### Icon Categories

```
icons/
├── action/                 # Action-related icons (add, delete, edit, etc.)
├── arrows/                 # Directional arrows and chevrons
├── communication/          # Communication icons (phone, email, message)
├── currency/               # Currency symbols
├── devices/                # Device icons (phone, laptop, tablet)
├── documents/              # Document and file icons
├── edit/                   # Editing tools (pencil, eraser, etc.)
├── finance/                # Financial icons (cards, money, etc.)
├── goals/                  # Goal and achievement icons
├── graphs/                 # Charts and graph icons
├── health/                 # Health and wellness icons
├── lifestyle/              # Lifestyle icons
├── logo-markup/            # Logo variations
├── miscellaneous/          # Uncategorized icons
├── navigation/             # Navigation controls
├── people/                 # People and user icons
├── placeholder/            # Placeholder icons
├── security/               # Security and privacy icons
├── sentiment-system/       # Emotional state icons
├── share/                  # Sharing and social icons
├── travel/                 # Travel and location icons
├── video/                  # Video controls
└── weather/                # Weather icons
```

### Navigation Icons
Commonly used icons for app/web navigation:

| Icon | Filename | Usage |
|------|----------|-------|
| ☰ | `burger-menu.svg` | Main menu toggle |
| × | `close.svg` | Close/dismiss actions |
| ⚙️ | `filter.svg` | Filter controls |
| 🏠 | `home.svg` | Home navigation |
| ⋮ | `kebab-menu.svg` | More options (vertical) |
| ☰ | `menu.svg` | Menu options |
| 🎤🚫 | `microphone-off.svg` | Mute microphone |
| 🎤 | `microphone.svg` | Active microphone |
| 🔔 | `notifications.svg` | Notifications |
| 🔍 | `search.svg` | Search functionality |

### Icon Usage

**In HTML:**
```html
<img src="../../../assets/icons/navigation/burger-menu.svg" alt="Menu">
```

**In CSS:**
```css
.icon {
  background-image: url('../../../assets/icons/navigation/search.svg');
}
```

**Icon Sizing:**
- Standard size: 18px × 18px
- Large size: 24px × 24px
- Container with padding: 44px × 44px (for touch targets)

### Icon Guidelines
- **Format:** SVG (vector, scalable)
- **Color:** Icons should be designed to work with CSS color filters
- **Naming:** `kebab-case-name.svg` (lowercase with hyphens)
- **Optimization:** Icons should be optimized/compressed SVGs

---

## Illustrations (`/assets/illustrations/`)

Large decorative images used for empty states, onboarding, marketing, etc.

### Illustration Color Schemes

```
illustrations/
├── default/                # Default neutral illustrations
├── default-alt-01/         # Alternative neutral variant 1
├── default-alt-02/         # Alternative neutral variant 2
├── primary/                # Primary brand color scheme
├── primary-alt-01/         # Primary variant 1
├── primary-alt-02/         # Primary variant 2
├── primary-alt-03/         # Primary variant 3
├── secondary/              # Secondary brand color scheme
├── secondary-alt-01/       # Secondary variant 1
├── secondary-alt-02/       # Secondary variant 2
├── secondary-alt-03/       # Secondary variant 3
└── secondary-alt-04/       # Secondary variant 4
```

### Illustration Variants

Each category contains **light and dark mode versions**:
- `Illustration_Name.svg` - Light mode
- `Illustration_Name_-_Dark_Mode.svg` - Dark mode

**Example:**
```
primary/
├── Notifications_Lloyds_-_V2.svg
└── Notifications_Lloyds_-_V2_-_Dark_Mode.svg
```

### Theme-Based Selection

```html
<!-- Light mode -->
<img src="../../../assets/illustrations/primary/Welcome_Lloyds_-_V2.svg" 
     class="light-mode-only">

<!-- Dark mode -->
<img src="../../../assets/illustrations/primary/Welcome_Lloyds_-_V2_-_Dark_Mode.svg" 
     class="dark-mode-only">
```

### Illustration Usage

**In Components:**
```javascript
// Select based on theme
const theme = document.body.getAttribute('data-theme');
const illustrationPath = theme === 'dark' 
  ? '../../../assets/illustrations/primary/Image_-_Dark_Mode.svg'
  : '../../../assets/illustrations/primary/Image.svg';
```

### Illustration Guidelines
- **Format:** SVG (vector)
- **Naming:** `PascalCase_With_Underscores.svg`
- **Size:** Responsive, typically 200px-400px wide
- **Color Schemes:** Match brand guidelines
- **Always provide:** Light and dark mode versions

---

## Pictograms (`/assets/pictograms/`)

Medium-sized conceptual icons representing ideas, services, or features. More detailed than icons, simpler than illustrations.

### Pictogram Examples

| Pictogram | Filename | Concept |
|-----------|----------|---------|
| 🤖 | `AI_Lloyds_-_V2.svg` | Artificial Intelligence |
| 🏦 | `Bank_Lloyds_-_V2.svg` | Banking |
| 🛒 | `Basket_Lloyds_-_V2.svg` | Shopping |
| 💳 | `Card_Lloyds_-_V2.svg` | Credit/Debit Card |
| 💬 | `Chat_Lloyds_-_V2.svg` | Chat/Messaging |
| 📧 | `Email_Lloyds_-_V2.svg` | Email |
| 🏠 | `Home_Lloyds_-_V2.svg` | Home/Property |
| 🔒 | `Lock_Lloyds_-_V2.svg` | Security |
| 💰 | `Pay_Lloyds_-_V2.svg` | Payments |
| 🔍 | `Search_Lloyds_-_V2.svg` | Search |
| 🛡️ | `Shield_Lloyds_-_V2.svg` | Protection |
| 👤 | `Person_Lloyds_-_V2.svg` | User/Person |

### Categories Represented
- **Financial:** Cards, Cash, Investments, Savings
- **Business:** Small Business, Large Business, Corporate
- **Communication:** Chat, Email, Messages, Phone
- **Technology:** AI, Mobile, Digital Payments
- **Security:** Lock, Shield, ID Verification
- **Services:** Healthcare, Insurance, Real Estate
- **Activities:** Shopping, Travel, Holiday

### Pictogram Usage

**In Component:**
```html
<div class="pictogram-wrapper">
    <img src="../../../assets/pictograms/Bank_Lloyds_-_V2.svg" 
         alt="Banking services">
</div>
```

**Sizing:**
```css
.pictogram-wrapper img {
  width: 64px;
  height: 64px;
}
```

### Pictogram Guidelines
- **Format:** SVG
- **Naming:** `Title_Case_With_Underscores_Lloyds_-_V2.svg`
- **Size:** Typically 48px-96px
- **Style:** Consistent line weight and style
- **Brand:** "Lloyds" identifier in filename
- **Version:** "-_V2" indicates current version

---

## Fonts (`/assets/fonts/`)

Typography assets for the Cancara Design System.

### Font Family: GT Ultra

The design system uses the **GT Ultra** font family with two main variants:

#### GT Ultra Median
Primary body text and UI elements.

**Available Weights:**
```
GT-Ultra-Median-Thin.otf           (Thin/100)
GT-Ultra-Median-Regular.otf        (Regular/400)
GT-Ultra-Median-Bold.otf           (Bold/700)
GT-Ultra-Median-Black.otf          (Black/900)
GT-Ultra-Median-Ultra.otf          (Ultra/950)
GT-Ultra-Median-Lloyds-Bold.ttf    (Brand-specific Bold)
```

#### GT Ultra Standard  
Alternative variant for specific use cases.

**Available Weights:**
```
GT-Ultra-Standard-Thin.otf         (Thin/100)
GT-Ultra-Standard-Regular.otf      (Regular/400)
GT-Ultra-Standard-Bold.otf         (Bold/700)
```

### Font Implementation

**In CSS:**
```css
@font-face {
  font-family: 'GT Ultra Median';
  src: url('../../../assets/fonts/GT-Ultra-Median-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'GT Ultra Median';
  src: url('../../../assets/fonts/GT-Ultra-Median-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}
```

**Using Design Tokens:**
```css
/* Tokens are defined in /src/css/cancara-tokens.css */
body {
  font-family: var(--font-family-body);     /* GT Ultra Median */
  font-weight: var(--font-weight-regular);  /* 400 */
}

h1 {
  font-family: var(--font-family-heading);  /* GT Ultra Median */
  font-weight: var(--font-weight-bold);     /* 700 */
}
```

### Font Loading Best Practices

**Preload Critical Fonts:**
```html
<link rel="preload" 
      href="../../../assets/fonts/GT-Ultra-Median-Regular.otf" 
      as="font" 
      type="font/otf" 
      crossorigin>
```

**Font Display Strategy:**
```css
@font-face {
  font-family: 'GT Ultra Median';
  font-display: swap;  /* Show fallback while loading */
  /* ... */
}
```

---

## Asset Path Reference

### From Component Files

**Component location:** `/src/components/[category]/[component-name]/`

**To assets:**
```
../../../../assets/[asset-type]/[subfolder]/[filename]
```

**Examples:**
```html
<!-- From /src/components/navigation/custom-header/ -->

<!-- Icon -->
<img src="../../../../assets/icons/navigation/burger-menu.svg">

<!-- Illustration -->
<img src="../../../../assets/illustrations/primary/Welcome_Lloyds_-_V2.svg">

<!-- Pictogram -->
<img src="../../../../assets/pictograms/Bank_Lloyds_-_V2.svg">
```

### From CSS Files

```css
/* From /src/components/navigation/custom-header/CustomHeader.vanilla.css */

.icon {
  background: url('../../../../assets/icons/navigation/search.svg');
}

@font-face {
  src: url('../../../../assets/fonts/GT-Ultra-Median-Bold.otf');
}
```

---

## Asset Organization Best Practices

### 1. Use Appropriate Asset Type
- **Icons:** Small UI controls (18-24px)
- **Pictograms:** Conceptual medium graphics (48-96px)
- **Illustrations:** Large decorative images (200-400px)

### 2. Consider Theme Support
- Provide light/dark variants for illustrations
- Ensure icons work with color filters
- Test pictograms in both themes

### 3. Optimize File Sizes
- Compress SVGs
- Remove unnecessary metadata
- Use SVGO or similar tools

### 4. Maintain Naming Consistency
- Icons: `kebab-case.svg`
- Illustrations: `Title_Case_-_Dark_Mode.svg`
- Pictograms: `Title_Case_Lloyds_-_V2.svg`
- Fonts: `Font-Family-Weight.otf`

### 5. Document New Assets
- Add to appropriate category
- Update this guide with new categories
- Include usage examples

---

## Quick Reference

| Asset Type | Location | Size | Format | Naming |
|------------|----------|------|--------|--------|
| Icons | `/assets/icons/` | 18-24px | SVG | kebab-case.svg |
| Illustrations | `/assets/illustrations/` | 200-400px | SVG | Title_Case.svg |
| Pictograms | `/assets/pictograms/` | 48-96px | SVG | Title_Case_Lloyds_-_V2.svg |
| Fonts | `/assets/fonts/` | - | OTF/TTF | Font-Family-Weight.otf |

---

## Related Documentation

- **`PROJECT_STRUCTURE.md`** - Overall project organization
- **`/src/config/README.md`** - Icon path configuration
- **Design Tokens** - `/src/css/cancara-tokens.css`
