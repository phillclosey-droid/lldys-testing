# Cancara Design System Documentation

Welcome to the Cancara Design System documentation. These guides will help you understand and work with the project structure and assets.

## Documentation Index

### 📁 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
**Complete guide to the project organization**

Learn about:
- Directory structure and organization
- Component categories and locations
- Path reference guides
- File naming conventions
- Technology stack
- Quick start guide

**Start here if:** You're new to the project or need to understand where files are located.

---

### 🎨 [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)
**Detailed guide to all visual assets**

Covers:
- Icons (UI elements)
- Illustrations (large graphics)
- Pictograms (conceptual icons)
- Fonts (typography)
- Asset organization and usage
- Path references
- Best practices

**Start here if:** You need to use or add icons, illustrations, pictograms, or fonts.

---

## Quick Navigation

### Finding Components
All components are in `/src/components/` organized by category:
- **action/** - Interactive components (panels, tiles, buttons)
- **content/** - Display components (illustrations, pictograms)
- **navigation/** - Navigation components (headers, nav bars)
- **notification/** - Notification components (badges, tags)

### Finding Assets
All visual assets are in `/assets/`:
- **icons/** - Small UI icons (18-24px)
- **illustrations/** - Large decorative images
- **pictograms/** - Medium conceptual graphics
- **fonts/** - Typography files

### Design Tokens
Global design system variables are in:
```
/src/css/cancara-tokens.css
```

This includes colors, spacing, typography, and other design tokens.

---

## Common Tasks

### Using a Component
1. Find component in `/src/components/[category]/`
2. Include design tokens CSS first
3. Include any component dependencies
4. Include component CSS
5. Copy HTML structure
6. Update asset paths for your location

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md#quick-start-guide) for detailed steps.

### Adding an Icon
1. Export as optimized SVG
2. Name using `kebab-case.svg`
3. Add to `/assets/icons/[appropriate-category]/`
4. Test in both light and dark themes

See [ASSETS_GUIDE.md](./ASSETS_GUIDE.md#icons-assetsicons) for guidelines.

### Creating an Illustration
1. Create light and dark mode versions
2. Name using `Title_Case.svg` and `Title_Case_-_Dark_Mode.svg`
3. Add to `/assets/illustrations/[color-scheme]/`
4. Ensure both versions work in context

See [ASSETS_GUIDE.md](./ASSETS_GUIDE.md#illustrations-assetsillustrations) for details.

---

## Key Concepts

### Component Structure
Each component typically includes:
- `.html` - Vanilla HTML implementation
- `.jsx` - React implementation  
- `.vanilla.css` - Vanilla CSS styles
- `.module.css` - CSS Modules for React
- `-test.html` - Test/preview page

### Path Conventions
All paths use **relative references**:
- From component to tokens: `../../../css/cancara-tokens.css`
- From component to assets: `../../../../assets/[type]/[file]`
- Between components: `../../[category]/[component]/[file]`

### Theme Support
The design system supports light and dark themes:
- Set via `data-theme="light"` or `data-theme="dark"` on `<body>`
- Design tokens automatically adjust
- Provide theme-specific assets where needed

---

## Contributing

When adding new components or assets:

1. **Follow naming conventions** documented in these guides
2. **Include both light and dark support** where applicable
3. **Update documentation** if adding new categories
4. **Test thoroughly** in both themes
5. **Optimize assets** (compress SVGs, remove metadata)

---

## Additional Resources

- **Design Tokens:** `/src/css/cancara-tokens.css`
- **Icon Configuration:** `/src/config/iconPaths.js`
- **Component Examples:** Look for `*-test.html` or `*-preview.html` files

---

## Questions?

For specific component usage, check:
1. Component's HTML header comments
2. Component's test/preview HTML file
3. These documentation files

For path questions, refer to:
- [PROJECT_STRUCTURE.md - Path Reference Guide](./PROJECT_STRUCTURE.md#path-reference-guide)
- [ASSETS_GUIDE.md - Asset Path Reference](./ASSETS_GUIDE.md#asset-path-reference)
