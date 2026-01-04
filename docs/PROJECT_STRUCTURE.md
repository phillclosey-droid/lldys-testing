# Cancara Design System - Project Structure

## Overview
This document explains the folder structure of the Cancara Design System. For detailed information about assets (icons, illustrations, pictograms, fonts), see `ASSETS_GUIDE.md`.

## Root Directory Structure

```
cancara-design/
├── assets/              # All visual assets (see ASSETS_GUIDE.md)
├── build-scripts/       # Build and deployment scripts
├── docs/                # Project documentation
├── journeys/            # User journey/flow documentation
├── scripts/             # Utility scripts
└── src/                 # Source code for components and styles
```

---

## `/src` - Source Code

The main source directory containing all components, styles, and configuration.

### `/src/components`

Component library organized by category. Each component typically includes:
- `.html` - Vanilla HTML version
- `.jsx` - React version
- `.vanilla.css` - Vanilla CSS styles
- `.module.css` - CSS modules for React
- `-test.html` or `-preview.html` - Test/preview page

#### Component Categories

**`/src/components/action`** - Interactive action components
```
action/
├── ghost-panel/              # Transparent overlay panel
├── panel/                    # Standard panel component
├── quick-action-button/      # Quick action buttons
└── tile/                     # Tile/card components
```

**`/src/components/content`** - Content display components
```
content/
└── icon/
    ├── illustration/         # Large illustrations
    └── pictogram/            # Icon pictograms
```

**`/src/components/navigation`** - Navigation components
```
navigation/
├── bottom-nav/               # Bottom navigation bar
├── custom-header/            # Mobile app header (iOS/Android)
│   ├── CustomHeader.html
│   ├── CustomHeader.vanilla.css
│   └── custom-header-test.html
└── status-bar/               # Device status bar
```

**`/src/components/notification`** - Notification components
```
notification/
├── notification-badge/       # Notification count badge
│   ├── NotificationBadge.html
│   ├── NotificationBadge.vanilla.css
│   └── notification-badge-test.html
└── notification-tag/         # Notification tag/label
```

### `/src/css`

Global styles and design tokens.

```
css/
└── cancara-tokens.css        # Design system tokens (colors, spacing, typography, etc.)
```

### `/src/config`

Configuration files for the design system.

```
config/
├── README.md
├── iconPaths.js              # Icon path mappings for React
└── iconPaths-vanilla.js      # Icon path mappings for vanilla JS
```

### `/src/templates`

Page templates and layouts.

```
templates/
└── base-template/            # Base page template
    ├── BaseTemplate.jsx
    ├── BaseTemplate.module.css
    ├── base-template.html
    └── base-template.css
```

---

## Path Reference Guide

### From Components to Other Resources

**From any component directory** (e.g., `/src/components/navigation/custom-header/`):

**To CSS Tokens:**
```
../../../css/cancara-tokens.css
```
(3 levels up to src, then into css/)

**To Assets:**
```
../../../../assets/[asset-type]/[filename]
```
(4 levels up to root, then into assets/)

**Examples:**
```html
<!-- Icons -->
<img src="../../../../assets/icons/navigation/burger-menu.svg">

<!-- Illustrations -->
<img src="../../../../assets/illustrations/primary/illustration-name.svg">

<!-- Fonts (in CSS) -->
@font-face {
  src: url('../../../../assets/fonts/font-name.woff2');
}
```

**To Other Components:**
```
../../[category]/[component-name]/[component-file]
```

**Example - Custom Header to Notification Badge:**
```html
<link rel="stylesheet" href="../../notification/notification-badge/NotificationBadge.vanilla.css">
```

---

## File Naming Conventions

### Component Files
- **HTML Components:** `ComponentName.html` (PascalCase)
- **React Components:** `ComponentName.jsx` (PascalCase)
- **Vanilla CSS:** `ComponentName.vanilla.css` (PascalCase)
- **CSS Modules:** `ComponentName.module.css` (PascalCase)
- **Test/Preview:** `component-name-test.html` or `component-name-preview.html` (kebab-case)

### Asset Files
- **Icons:** `kebab-case-name.svg` (lowercase with hyphens)
- **Illustrations:** `Illustration_Name.svg` (PascalCase with underscores)
- **Pictograms:** `Pictogram_Name.svg` (PascalCase with underscores)

---

## Technology Stack

### Vanilla HTML/CSS Components
- Pure HTML5
- CSS3 with CSS Custom Properties (CSS Variables)
- Vanilla JavaScript for interactions
- No build step required

### React Components
- React 18+
- CSS Modules for scoped styling
- Modern ES6+ JavaScript

### Design Tokens
- CSS Custom Properties for theming
- Light/Dark mode support via `data-theme` attribute
- Token-based design system

---

## Component Dependencies

### Nested Components
Some components use other components as dependencies:

**Custom Header** depends on:
- Status Bar (built-in via CSS)
- Notification Badge (from `/notification/notification-badge/`)

**How to Include:**
```html
<!-- 1. Design Tokens (ALWAYS REQUIRED) -->
<link rel="stylesheet" href="../../../css/cancara-tokens.css">

<!-- 2. Dependency Components -->
<link rel="stylesheet" href="../../notification/notification-badge/NotificationBadge.vanilla.css">

<!-- 3. Main Component -->
<link rel="stylesheet" href="CustomHeader.vanilla.css">
```

---

## Quick Start Guide

### Using a Component

1. **Identify the component** you need in `/src/components/`
2. **Check dependencies** in the component's HTML file header
3. **Include design tokens** first (cancara-tokens.css)
4. **Include dependency stylesheets** if any
5. **Include component stylesheet**
6. **Copy HTML structure** from component file
7. **Update asset paths** based on your file location

### Example: Using Custom Header

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 1. Design Tokens -->
    <link rel="stylesheet" href="path/to/cancara-tokens.css">
    
    <!-- 2. Dependency: Notification Badge -->
    <link rel="stylesheet" href="path/to/NotificationBadge.vanilla.css">
    
    <!-- 3. Component Styles -->
    <link rel="stylesheet" href="path/to/CustomHeader.vanilla.css">
</head>
<body data-theme="light">
    <!-- Copy component HTML from CustomHeader.html -->
</body>
</html>
```

---

## Additional Documentation

- **`ASSETS_GUIDE.md`** - Detailed guide to icons, illustrations, pictograms, and fonts
- **Component READMEs** - See individual component folders for specific usage guides
- **`/config/README.md`** - Configuration documentation

---

## Notes

- All paths use **relative references** (e.g., `../../../`)
- Design tokens are **required** for all components
- Components support **light and dark themes** via `data-theme` attribute
- Test files demonstrate proper usage and theming
