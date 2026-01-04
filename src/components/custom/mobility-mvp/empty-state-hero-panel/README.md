# Empty State Component

## Overview
Self-contained hero panel variant for displaying empty/disconnected state when no vehicle is connected to the user's account.

## Location
```
/src/components/custom/mobility-mvp/empty-state/
├── EmptyState.html           # Component HTML structure
├── EmptyState.vanilla.css    # Component styles (token-led)
├── EmptyState.vanilla.js     # Asset initialization
├── empty-state-test.html     # Test/demo page
└── README.md                 # This file
```

## Features
- **User Greeting**: Shows user name with pictogram
- **Car Placeholder**: Covered car image (4:3 aspect ratio)
- **Benefits Description**: Center-aligned text explaining features
- **Icon Grid**: 4 column layout showing Tax, MOT, Insurance, Servicing
- **Primary Action**: Full-width button to connect vehicle
- **Token-Led**: All spacing, typography, and colors use design tokens
- **Dark Mode**: Fully supports light/dark theme switching

## Dependencies
Required CSS:
- `cancara-tokens.css` (design tokens)
- `Pictogram.vanilla.css` (for car icon)
- `ActionButton.vanilla.css` (for button)
- `EmptyState.vanilla.css` (component styles)

Required JS:
- `Pictogram.vanilla.js` (pictogram initialization)
- `ActionIcon.vanilla.js` (icon initialization)
- `EmptyState.vanilla.js` (component initialization)

## Usage

### Basic Implementation
```html
<!-- In <head> -->
<link rel="stylesheet" href="path/to/cancara-tokens.css">
<link rel="stylesheet" href="path/to/Pictogram.vanilla.css">
<link rel="stylesheet" href="path/to/ActionButton.vanilla.css">
<link rel="stylesheet" href="path/to/EmptyState.vanilla.css">

<!-- In <body> -->
<div class="empty-state-container">
  <!-- Copy content from EmptyState.html -->
</div>

<!-- Before </body> -->
<script src="path/to/Pictogram.vanilla.js"></script>
<script src="path/to/ActionIcon.vanilla.js"></script>
<script src="path/to/EmptyState.vanilla.js"></script>
```

### Integration Example
```html
<!-- Hidden by default, show when vehicle disconnected -->
<div class="empty-state-container" id="empty-state" style="display: none;">
  <!-- Component content -->
</div>

<script>
// Show empty state
function showEmptyState() {
  document.getElementById('empty-state').style.display = 'block';
}

// Hide empty state
function hideEmptyState() {
  document.getElementById('empty-state').style.display = 'none';
}
</script>
```

## Structure

### Top Row
- Pictogram (car icon)
- User name (type-style-6, subdued)
- CTA text "Connect your car" (type-style-3, default)

### Car Placeholder
- 4:3 aspect ratio container
- Centered car-placeholder.png image
- Padding: 24px horizontal, 16px vertical

### Description
- Center-aligned text
- Typography: type-style-4
- Content: Benefits overview

### Benefits Grid
- 4 equal columns (space-around)
- Each column:
  - Icon (32x32px)
  - Label (type-style-6)
- Services: Tax, MOT, Insurance, Servicing

### Action Button
- Full width primary button
- Text: "Connect my car"
- Standard action button component

## Customization

### Change User Name
```html
<div class="empty-state-user-name">Your Name</div>
```

### Change Description
```html
<div class="empty-state-description">
  Your custom description text here.
</div>
```

### Change Button Text
```html
<span class="action-button-text">Your Button Text</span>
```

### Add Button Action
```html
<button class="action-button btn-primary empty-state-button" onclick="yourFunction()">
  ...
</button>
```

## Design Tokens Used

### Typography
- `--type-style-3-*` (CTA text)
- `--type-style-4-*` (description)
- `--type-style-6-*` (user name, labels)

### Spacing
- `--spacing-04` (text gap)
- `--spacing-08` (grid gap, icon gap)
- `--spacing-12` (pictogram gap)
- `--spacing-16` (container padding)
- `--spacing-24` (section margins)

### Colors
- `--bg-panel-default` (container background)
- `--text-default` (primary text)
- `--text-subdued` (secondary text)

### Borders
- `--radius-default` (container border radius)

## Browser Support
Same as design token system:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Android Chrome 80+

## Testing
Open `empty-state-test.html` in a browser to:
- View component in isolation
- Test light/dark mode switching
- Verify icon initialization
- Check responsive behavior

## Notes
- Component is self-contained and doesn't modify global styles
- All assets (icons, pictograms) auto-initialize on page load
- Car placeholder image path: `../../../../assets/images/car-placeholder.png`
- Designed to match hero-panel component styling
- No edit button (unlike connected hero-panel)
- No progress tracking (unlike connected hero-panel)
