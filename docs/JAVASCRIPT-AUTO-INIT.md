# Self-Contained Components with JavaScript - Complete Guide

## Overview

All HTML components are now **fully self-contained** with automatic asset initialization via JavaScript. No manual path configuration needed!

---

## ✅ Components with JavaScript Auto-Init

### 1. **CustomHeader** 
- **CSS:** `CustomHeader.vanilla.css` (includes StatusBar + NotificationBadge)
- **JS:** `CustomHeader.vanilla.js` (auto-initializes icons)
- **HTML:** Uses `data-icon` attributes

### 2. **BottomNav**
- **CSS:** `BottomNav.vanilla.css` (self-contained)
- **JS:** `BottomNav.vanilla.js` (auto-initializes tab icons)
- **HTML:** Uses `data-tab-icon` attributes

### 3. **Panel**
- **CSS:** `Panel.vanilla.css` (includes Pictogram styles)
- **JS:** `Panel.vanilla.js` (auto-initializes icons/pictograms)
- **HTML:** Uses `data-icon`, `data-pictogram`, `data-chevron` attributes

### 4. **GhostPanel**
- **CSS:** `GhostPanel.vanilla.css` (includes Illustration styles)
- **JS:** `GhostPanel.vanilla.js` (auto-initializes illustrations/icons)
- **HTML:** Uses `data-illustration`, `data-action-icon` attributes

### 5. **Pictogram** (Standalone)
- **CSS:** `Pictogram.vanilla.css`
- **JS:** `Pictogram.vanilla.js` (auto-initializes pictograms)
- **HTML:** Uses `data-pictogram` attribute

### 6. **Illustration** (Standalone)
- **CSS:** `Illustration.vanilla.css`
- **JS:** `Illustration.vanilla.js` (auto-initializes illustrations)
- **HTML:** Uses `data-illustration` attribute

---

## How It Works

### Path Auto-Detection

Each `.vanilla.js` file:
1. Detects its own location in the file system
2. Calculates the correct path to `/assets` folder
3. Finds all component instances on the page
4. Populates image `src` attributes automatically

### Data Attributes

Instead of hardcoding paths in HTML:

**❌ Old Way (Manual):**
```html
<img id="my-icon" src="../../../../assets/icons/navigation/home.svg">
```

**✅ New Way (Auto):**
```html
<img data-icon="home" data-icon-category="navigation">
```

The JavaScript reads the `data-icon` attribute and automatically constructs the correct path!

---

## Usage Pattern

### Step 1: Import CSS
```html
<link rel="stylesheet" href="path/to/Component.vanilla.css">
```

### Step 2: Add HTML with Data Attributes
```html
<div class="component">
    <img data-icon="home" data-icon-category="navigation" alt="">
</div>
```

### Step 3: Import JS (before `</body>`)
```html
<script src="path/to/Component.vanilla.js"></script>
```

### Step 4: Done! ✅
Images automatically populate on page load. No manual initialization needed.

---

## Complete Example: Journey Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Journey Page</title>
    
    <!-- Design Tokens -->
    <link rel="stylesheet" href="../../src/css/cancara-tokens.css">
    
    <!-- Component CSS (Self-contained) -->
    <link rel="stylesheet" href="../../src/components/navigation/custom-header/CustomHeader.vanilla.css">
    <link rel="stylesheet" href="../../src/components/action/panel/Panel.vanilla.css">
    <link rel="stylesheet" href="../../src/components/action/ghost-panel/GhostPanel.vanilla.css">
</head>
<body>
    <!-- CustomHeader -->
    <div class="custom-header">
        <div class="header-bar">
            <div class="header-leading">
                <div class="hit-target">
                    <div class="icon-wrapper icon-18">
                        <img data-icon="burger-menu" data-icon-category="navigation" alt="">
                    </div>
                </div>
            </div>
            <div class="header-title-wrapper">
                <div class="header-title">My Page</div>
            </div>
        </div>
    </div>
    
    <!-- Panel with Pictogram -->
    <div class="panel-wrapper">
        <div class="panel">
            <div class="pictogram pict-default">
                <img data-pictogram="Piggy_Bank_Lloyds_-_V2" alt="">
            </div>
            <div class="panel-vstack">
                <div class="panel-heading">Savings Account</div>
                <div class="panel-description">£12,450 saved</div>
            </div>
            <div class="panel-chevron">
                <img data-chevron alt="">
            </div>
        </div>
    </div>
    
    <!-- GhostPanel with Illustration -->
    <div class="ghost-panel-wrapper">
        <div class="ghost-panel">
            <div class="ghost-panel-illustration ill-primary">
                <img data-illustration="Cards_Lloyds_-_V2" alt="">
            </div>
            <div class="ghost-panel-vstack">
                <div class="ghost-panel-heading">Apply for credit card</div>
                <div class="ghost-panel-description">Exclusive rewards</div>
            </div>
            <div class="ghost-panel-icon-button">
                <div class="ghost-panel-icon-button-icon">
                    <img data-action-icon="plus" alt="">
                </div>
            </div>
        </div>
    </div>
    
    <!-- Component JS (Auto-initializes everything) -->
    <script src="../../src/components/navigation/custom-header/CustomHeader.vanilla.js"></script>
    <script src="../../src/components/action/panel/Panel.vanilla.js"></script>
    <script src="../../src/components/action/ghost-panel/GhostPanel.vanilla.js"></script>
</body>
</html>
```

**That's it!** All images populate automatically. No manual path management. 🎉

---

## Data Attributes Reference

### CustomHeader
- `data-icon`: Icon filename (e.g., "burger-menu", "search", "person")
- `data-icon-category`: Icon folder (e.g., "navigation", "people", "finance")

### BottomNav
- `data-tab-icon`: Tab number (1-5)
- `data-icon-state`: "inactive" or "active"

### Panel
- `data-icon`: Icon filename (e.g., "current-account")
- `data-icon-category`: Icon folder (e.g., "finance")
- `data-pictogram`: Pictogram filename without .svg (e.g., "Piggy_Bank_Lloyds_-_V2")
- `data-chevron`: Auto-populates chevron-right (no value needed)

### GhostPanel
- `data-illustration`: Illustration filename without .svg (e.g., "Savings_Lloyds_-_V2")
- `data-action-icon`: Action icon filename (default: "plus")
- Variant class (ill-primary, ill-secondary-alt-04, etc.) determines folder

### Pictogram
- `data-pictogram`: Pictogram filename without .svg

### Illustration
- `data-illustration`: Illustration filename without .svg
- Variant class determines folder (ill-default-alt-01 → /illustrations/default-alt-01/)

---

## Benefits

### ✅ **Zero Manual Configuration**
- No ASSETS_BASE constants
- No ICONS objects
- No initializeIcons() functions
- Components "just work"

### ✅ **Location Independent**
- Same HTML works in component folder
- Same HTML works in journey pages
- JavaScript auto-detects location

### ✅ **Easy to Use**
- Just add data attributes
- Import CSS + JS
- Done!

### ✅ **Easy to Maintain**
- Change asset location once (in .js file)
- All instances update automatically
- No hunting through HTML

### ✅ **Clean HTML**
- No hardcoded paths
- No empty src="" attributes waiting for JS
- Semantic data attributes

---

## CSS Still Required

**Yes!** CSS files are still needed and separate from JS:

- **CSS** = Styling (colors, sizes, layouts, animations)
- **JS** = Asset loading (populating image sources)

Both are required for components to work properly.

---

## Migration Guide

### Old Approach (Manual):
```html
<script>
const ASSETS_BASE = '../../assets';
const ICONS = {
    home: `${ASSETS_BASE}/icons/navigation/home.svg`,
};
function initializeIcons() {
    document.getElementById('home-icon').src = ICONS.home;
}
window.addEventListener('DOMContentLoaded', initializeIcons);
</script>
```

### New Approach (Auto):
```html
<img data-icon="home" data-icon-category="navigation" alt="">
<script src="path/to/Component.vanilla.js"></script>
```

Much simpler! 🎉

---

## File Structure

```
src/
└── components/
    ├── navigation/
    │   ├── custom-header/
    │   │   ├── CustomHeader.html (with data attributes)
    │   │   ├── CustomHeader.vanilla.css (self-contained)
    │   │   └── CustomHeader.vanilla.js (auto-init)
    │   └── bottom-nav/
    │       ├── BottomNav.html (with data attributes)
    │       ├── BottomNav.vanilla.css (self-contained)
    │       └── BottomNav.vanilla.js (auto-init)
    ├── action/
    │   ├── panel/
    │   │   ├── Panel.html (with data attributes)
    │   │   ├── Panel.vanilla.css (self-contained)
    │   │   └── Panel.vanilla.js (auto-init)
    │   └── ghost-panel/
    │       ├── GhostPanel.html (with data attributes)
    │       ├── GhostPanel.vanilla.css (self-contained)
    │       └── GhostPanel.vanilla.js (auto-init)
    └── content/
        └── icon/
            ├── pictogram/
            │   ├── Pictogram.html (with data attributes)
            │   ├── Pictogram.vanilla.css (self-contained)
            │   └── Pictogram.vanilla.js (auto-init)
            └── illustration/
                ├── Illustration.html (with data attributes)
                ├── Illustration.vanilla.css (self-contained)
                └── Illustration.vanilla.js (auto-init)
```

---

## Next Steps

When creating new components:

1. **Create CSS** with all styling (include nested component styles)
2. **Create JS** with auto-init logic and path detection
3. **Create HTML** using data attributes (not hardcoded paths)
4. **Test** in both component folder and journey pages
5. **Document** data attributes and usage

That's it! 🚀
