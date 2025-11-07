# Lloyds Web Apps Component Library

Modern, token-based component library for Lloyds Banking Group.

## 📁 Project Structure

```
lloyds-web-apps/
├── src/
│   ├── tokens/              # Design tokens (source of truth)
│   ├── components/          # Reusable UI components
│   ├── utils/               # Shared utilities
│   └── demos/               # Full page demos
├── assets/                  # Design assets
│   ├── fonts/
│   ├── images/
│   └── icons/
├── public/                  # Static files
└── docs/                    # Documentation
```

## 🎯 Component Pattern

Each component follows this structure:
```
components/[component-name]/
├── [component-name].js        # Component logic
├── [component-name].css       # Styles (uses tokens only!)
└── [component-name].demo.html # Isolated demo
```

## 🎨 Design Tokens

All tokens are in `/src/tokens/`:
- **tokens.json** - Structured token data (823 tokens)
- **tokens.css** - CSS custom properties

### Key Principles
1. **Never hardcode** - Always reference tokens
2. **Token-first** - Components inherit from design system
3. **Modular** - Each component works independently

## 🚀 Quick Start

\`\`\`html
<!-- Load tokens first -->
<link rel="stylesheet" href="src/tokens/tokens.css">

<!-- Load component -->
<link rel="stylesheet" href="src/components/button/button.css">
<script src="src/components/button/button.js" type="module"></script>
\`\`\`

## ✨ Token Usage

\`\`\`css
/* ✓ Good - uses tokens */
.my-component {
  color: var(--lloyds-text-generic-default);
  font-size: var(--lloyds-types-style5-fontsize);
  padding: var(--lloyds-spacing-size16);
}

/* ✗ Bad - hardcoded */
.my-component {
  color: #E8E8E8;
  font-size: 32px;
  padding: 16px;
}
\`\`\`

## 📦 What's Included

- ✅ Clean meta data (no brands_excluded, no alts)
- ✅ Removed all max100 variants
- ✅ 823 CSS custom properties
- ✅ Organized folder structure
- ✅ Ready for component development

## 🔧 Next Steps

1. Add your font files to \`assets/fonts/\`
2. Create your first component in \`src/components/\`
3. Build a demo page in \`src/demos/\`

---

**Version:** 2.0  
**Last Updated:** 2025-11-07
