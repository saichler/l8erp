# ERP UI Extensions - Usage Guide

This directory contains ERP-specific extensions to the Layer8 UI library (`l8ui/`). These files register project-specific configurations with the generic library components.

**Relationship to l8ui:** The `l8ui/` library provides generic, reusable components. The `erp-ui/` directory extends those components with ERP-specific data (module icons, navigation configs, reference registries).

---

## Directory Structure

```
erp-ui/
├── GUIDE.md                    # This file
├── erp-svg-templates.js        # ERP module SVG illustrations
└── m/                          # Mobile-specific extensions
    ├── reference-registries/   # Reference picker configs per module
    │   ├── layer8m-reference-registry-hcm.js
    │   ├── layer8m-reference-registry-scm.js
    │   ├── layer8m-reference-registry-mfg.js
    │   ├── layer8m-reference-registry-sales.js
    │   ├── layer8m-reference-registry-crm.js
    │   ├── layer8m-reference-registry-prj.js
    │   └── layer8m-reference-registry-ecom.js
    └── nav-configs/            # Navigation hierarchy configs
        ├── layer8m-nav-config-base.js      # Module list
        ├── layer8m-nav-config-icons.js     # SVG icons
        ├── layer8m-nav-config-fin-hcm.js   # FIN & HCM services
        ├── layer8m-nav-config-scm-sales.js # SCM & Sales services
        ├── layer8m-nav-config-prj-other.js # PRJ, CRM, MFG, etc.
        └── layer8m-nav-config.js           # Final assembly
```

---

## 1. SVG Templates (`erp-svg-templates.js`)

Registers ERP module illustration templates with `Layer8SvgFactory`.

### Available Templates

| Key | Description |
|-----|-------------|
| `people` | HCM/HR module (people icons) |
| `financial` | Financial module (coins/charts) |
| `supplyChain` | SCM module (trucks/boxes) |
| `sales` | Sales module (cart/handshake) |
| `crm` | CRM module (people/hearts) |
| `manufacturing` | MFG module (gears/factory) |
| `projects` | PRJ module (gantt/milestones) |
| `analytics` | BI module (charts/graphs) |
| `documents` | Documents module (files/folders) |
| `ecommerce` | E-commerce module (cart/store) |
| `compliance` | Compliance module (shield/checkmarks) |

### Usage

```js
// Get SVG content with custom color
const svg = Layer8SvgFactory.get('financial', '#2196F3');

// Use in section config
Layer8SectionConfigs.register('fin', {
    svgContent: Layer8SvgFactory.get('financial', '#2196F3'),
    // ...
});
```

### Adding a New Template

```js
// In erp-svg-templates.js
Layer8SvgFactory.registerTemplate('myModule', function(color) {
    return `<svg viewBox="0 0 400 300" class="l8-illustration">
        <circle cx="200" cy="150" r="80" fill="${color}" opacity="0.2"/>
        <!-- Add your SVG content here -->
    </svg>`;
});
```

---

## 2. Mobile Reference Registries

Each file registers model configurations for the reference picker component.

### Pattern

```js
// layer8m-reference-registry-xxx.js
const ref = window.Layer8RefFactory;

window.Layer8MReferenceRegistryXXX = {
    // Simple: displayColumn is the name field
    ...ref.simple('Model', 'modelId', 'name', 'Display Label'),

    // Coded: displays as "code - name"
    ...ref.coded('Entity', 'entityId', 'code', 'name'),

    // Person: displays as "lastName, firstName"
    ...ref.person('Employee', 'employeeId', 'lastName', 'firstName'),

    // ID-only: no display formatting needed
    ...ref.idOnly('LineItem', 'lineId'),

    // Custom: full control
    CustomModel: {
        idColumn: 'customId',
        displayColumn: 'name',
        selectColumns: ['customId', 'name', 'code', 'extra'],
        displayFormat: function(item) {
            return item.code + ' - ' + item.name + ' (' + item.extra + ')';
        },
        displayLabel: 'Custom'
    }
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryXXX);
```

### Layer8RefFactory Methods

| Method | Parameters | Output Format |
|--------|------------|---------------|
| `simple` | model, idCol, displayCol, label? | `name` |
| `coded` | model, idCol, codeCol, nameCol | `code - name` |
| `person` | model, idCol, lastCol?, firstCol? | `lastName, firstName` |
| `idOnly` | model, idCol | (no display) |

### Loading Order

**Important:** The main reference registry (`l8ui/m/js/layer8m-reference-registry.js`) must load before these files.

```html
<!-- In m/app.html -->
<!-- Core registry (provides register() method) -->
<script src="../l8ui/m/js/layer8m-reference-registry.js"></script>

<!-- Project-specific registries (call register()) -->
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-hcm.js"></script>
<script src="../erp-ui/m/reference-registries/layer8m-reference-registry-scm.js"></script>
<!-- ... more as needed -->
```

### Adding a New Module Registry

1. Create file: `erp-ui/m/reference-registries/layer8m-reference-registry-newmodule.js`
2. Follow the pattern above
3. Add script tag to `m/app.html` after other registries
4. Verify field names match protobuf definitions (check `.pb.go` files)

---

## 3. Mobile Navigation Configs

Split across multiple files for maintainability (<500 lines each).

### File Responsibilities

| File | Purpose |
|------|---------|
| `layer8m-nav-config-base.js` | Module list and `LAYER8M_NAV_CONFIG` initialization |
| `layer8m-nav-config-icons.js` | SVG icons for modules/services |
| `layer8m-nav-config-fin-hcm.js` | FIN and HCM module services |
| `layer8m-nav-config-scm-sales.js` | SCM and Sales module services |
| `layer8m-nav-config-prj-other.js` | PRJ, CRM, MFG, BI, COMP, ECOM, Documents, SYS |
| `layer8m-nav-config.js` | Final assembly and `getIcon()` method |

### Loading Order

```html
<!-- In m/app.html -->
<script src="../erp-ui/m/nav-configs/layer8m-nav-config-base.js"></script>
<script src="../erp-ui/m/nav-configs/layer8m-nav-config-icons.js"></script>
<script src="../erp-ui/m/nav-configs/layer8m-nav-config-fin-hcm.js"></script>
<script src="../erp-ui/m/nav-configs/layer8m-nav-config-scm-sales.js"></script>
<script src="../erp-ui/m/nav-configs/layer8m-nav-config-prj-other.js"></script>
<script src="../erp-ui/m/nav-configs/layer8m-nav-config.js"></script>

<!-- Then the nav component -->
<script src="../l8ui/m/js/layer8m-nav.js"></script>
```

### Adding a New Module

1. Add module to `layer8m-nav-config-base.js`:
```js
window.LAYER8M_NAV_CONFIG = {
    modules: [
        // ...existing modules
        { key: 'newmodule', label: 'New Module', icon: 'newmodule', hasSubModules: true }
    ]
};
```

2. Add icon to `layer8m-nav-config-icons.js`:
```js
window.LAYER8M_NAV_CONFIG.icons = {
    // ...existing icons
    'newmodule': '<svg>...</svg>'
};
```

3. Add services to the appropriate category file (or create new one):
```js
// In layer8m-nav-config-prj-other.js (or new file)
LAYER8M_NAV_CONFIG.newmodule = {
    subModules: [
        { key: 'submod1', label: 'Sub Module 1', icon: 'icon1' }
    ],
    services: {
        'submod1': [
            { key: 'service1', label: 'Service 1', icon: 'icon1',
              endpoint: '/XX/Service', model: 'Model', idField: 'modelId' }
        ]
    }
};
```

### Service Definition Schema

```js
{
    key: 'employees',           // Unique key for routing
    label: 'Employees',         // Display name
    icon: 'employees',          // Icon key (from icons object)
    endpoint: '/30/Employee',   // API endpoint (without apiPrefix)
    model: 'Employee',          // Protobuf model name (MUST match exactly)
    idField: 'employeeId',      // Primary key field name
    readOnly: false             // Optional: true = no Add/Edit/Delete
}
```

---

## 4. Desktop Reference Registries

Desktop reference registries live in the main web directory (`js/reference-registry-*.js`), not in erp-ui. They use `Layer8DReferenceRegistry.register()`:

```js
// js/reference-registry-hcm.js
const ref = window.Layer8RefFactory;
Layer8DReferenceRegistry.register({
    ...ref.simple('Employee', 'employeeId', 'lastName', 'Employee'),
    ...ref.simple('Department', 'departmentId', 'name', 'Department')
});
```

---

## 5. Checklist for Adding a New ERP Module

### Mobile

- [ ] Create `erp-ui/m/reference-registries/layer8m-reference-registry-{module}.js`
- [ ] Add script tag to `m/app.html`
- [ ] Add module to `layer8m-nav-config-base.js`
- [ ] Add icon to `layer8m-nav-config-icons.js`
- [ ] Add services to appropriate nav config file
- [ ] Verify model names match protobuf types exactly

### Desktop

- [ ] Add SVG template to `erp-svg-templates.js` (if new visual needed)
- [ ] Create `js/reference-registry-{module}.js`
- [ ] Add script tag to `app.html`

### Verification

```bash
# Check model names match protobuf
grep "model: '" erp-ui/m/nav-configs/*.js | grep -v "//"

# Check for missing registrations
grep -h "lookupModel: '" ../m/js/**/*-forms.js | sed "s/.*lookupModel: '\\([^']*\\)'.*/\\1/" | sort -u
```

---

## 6. Common Mistakes

1. **Model name mismatch**: Using `Employee` in nav config when protobuf type is `HcmEmployee`
2. **Field name mismatch**: Using `employeeCode` when protobuf field is `code`
3. **Wrong loading order**: Loading module registry before main registry
4. **Missing icon**: Referencing an icon key that doesn't exist in icons object
5. **Duplicate keys**: Same service key in multiple modules

---

## 7. Relationship to l8ui

| Concern | l8ui (generic) | erp-ui (project-specific) |
|---------|----------------|---------------------------|
| SVG Factory | `layer8-svg-factory.js` (base + register) | `erp-svg-templates.js` (ERP icons) |
| Reference Registry | `layer8m-reference-registry.js` (base + register) | `m/reference-registries/*` (ERP models) |
| Navigation | `layer8m-nav.js` (behavior) | `m/nav-configs/*` (ERP hierarchy) |
| Forms | `layer8m-forms.js` (rendering) | `m/js/*/\*-forms.js` (ERP form defs) |

The l8ui library never imports from erp-ui. Instead, erp-ui files call registration methods on l8ui components to extend them with project-specific data.
