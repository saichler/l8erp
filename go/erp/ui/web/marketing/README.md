# ERP by Layer 8 - Marketing Website

A professional marketing landing page for ERP by Layer 8, showcasing the enterprise resource planning system's features, modules, and capabilities.

## Directory Structure

```
marketing/
├── index.html                    # Main desktop landing page
├── favicon.ico                   # ERP favicon
├── logo.gif                      # ERP logo
├── Layer8Logo.gif                # Layer 8 ecosystem logo
├── README.md                     # This file
│
├── css/                          # Desktop stylesheets
│   ├── landing-base.css          # CSS variables, resets, utilities
│   ├── landing-header.css        # Fixed navigation bar
│   ├── landing-hero.css          # Hero section with parallax
│   ├── landing-sections.css      # Module cards, features, stats
│   ├── landing-footer.css        # Footer layout
│   ├── landing-animations.css    # Keyframe animations
│   ├── landing-modals.css        # Modal styling
│   └── landing-responsive.css    # Media queries
│
├── js/
│   ├── landing.js                # Main interactions, modals, parallax
│   └── mobile-detect.js          # Mobile device detection/redirect
│
├── modals/                       # Dynamic modal content
│   ├── demo-modal.html           # Demo credentials
│   ├── about-modal.html          # About ERP by Layer 8
│   └── modules-modal.html        # Detailed module descriptions
│
└── m/                            # Mobile version
    ├── index.html                # Mobile landing page
    └── css/
        ├── mobile-base.css       # Mobile variables and base
        ├── mobile-header.css     # Hamburger navigation
        ├── mobile-hero.css       # Mobile hero section
        ├── mobile-sections.css   # Mobile cards and grids
        ├── mobile-footer.css     # Mobile footer
        └── mobile-modals.css     # Mobile modal styling
```

## Features

### Desktop Version
- **Glass morphism design** with blur effects and transparency
- **Animated hero section** with SVG illustration and floating shapes
- **Parallax scrolling** effects on hero background
- **Intersection Observer** animations for scroll reveals
- **Dynamic modal system** with async loading and caching
- **Responsive design** supporting tablet and desktop breakpoints
- **Smooth scroll** navigation with header offset

### Mobile Version
- **Touch-optimized** UI with 48px minimum touch targets
- **Hamburger menu** with slide-out navigation drawer
- **Simplified animations** for better performance
- **Bottom-sheet modals** for native mobile feel
- **Safe area support** for notched devices

## Sections

1. **Hero** - Main headline with animated background
2. **Modules** - 12 integrated ERP modules displayed in cards
3. **Features** - 12 enterprise features in a grid layout
4. **Architecture** - 3-layer architecture diagram with tech stack
5. **Stats** - Key metrics (13+ modules, 100% Go, etc.)
6. **Get Started** - 4-step quick start guide with code example
7. **Resources** - Documentation, API, tutorials, community links

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#0ea5e9` | Buttons, links, accents |
| Primary Dark | `#0284c7` | Hover states |
| Secondary Cyan | `#06b6d4` | Gradients |
| Background Dark | `#0f172a` | Page background |
| Accent Brown | `#a08873` | Layer 8 brand accent |
| Text Light | `#f8fafc` | Primary text |
| Text Muted | `#94a3b8` | Secondary text |

## Usage

### Accessing the Site
The marketing site is the default landing page for the ERP web application:
- Root URL (`/go/erp/ui/web/`) redirects to marketing
- Direct access: `/go/erp/ui/web/marketing/`
- Mobile version: `/go/erp/ui/web/marketing/m/`

### Navigation Links
- **Try Demo** → `/go/erp/ui/web/login/`
- **Modules/Features/etc.** → Smooth scroll to section

### Mobile Detection
Mobile users are automatically redirected to the mobile version. Users can:
- Click "Desktop Version" in mobile footer to switch
- This sets `localStorage.preferDesktop = 'true'`

## Modals

Modals are loaded dynamically from the `modals/` directory:

```javascript
// Open a modal by name
openModal('demo');  // Loads modals/demo-modal.html
openModal('about'); // Loads modals/about-modal.html
```

To trigger a modal from HTML:
```html
<button data-modal="demo">View Demo</button>
```

## Demo Credentials

| Field | Value |
|-------|-------|
| Username | `operator` |
| Password | `Oper123!` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Mobile Chrome (Android 8+)

## Customization

### Adding a New Module Card
Edit `index.html` and add to the `.modules-grid`:
```html
<div class="module-card reveal">
    <div class="module-icon">&#128640;</div>
    <h3>Module Name</h3>
    <p>Module description goes here.</p>
</div>
```

### Adding a New Modal
1. Create `modals/your-modal.html`:
```html
<div class="modal">
    <div class="modal-header">
        <h3>Modal Title</h3>
        <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
        <!-- Content -->
    </div>
    <div class="modal-footer">
        <button class="btn btn-secondary" data-close-modal>Close</button>
    </div>
</div>
```

2. Trigger it:
```html
<button data-modal="your">Open Modal</button>
```

### Modifying Colors
Edit CSS variables in `css/landing-base.css`:
```css
:root {
    --erp-primary: #0ea5e9;
    --erp-primary-dark: #0284c7;
    /* ... */
}
```

## Performance

- No external JavaScript frameworks
- CSS animations use `transform` and `opacity` for GPU acceleration
- Modals are cached after first load
- Images use appropriate formats (GIF for logos)
- Intersection Observer for lazy animations

## Related Files

- `/go/erp/ui/web/index.html` - Redirect to marketing
- `/go/erp/ui/web/login/` - Login page
- `/go/erp/ui/web/app.html` - Main ERP application
