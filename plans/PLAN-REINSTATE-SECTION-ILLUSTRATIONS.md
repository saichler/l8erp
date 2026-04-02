# Plan: Make Section Title SVG Illustrations Visible

## Problem

The section title SVG illustrations exist and render, but are nearly invisible against the tan gradient background. The dashboard title has visible illustrations because its SVG elements are larger and bolder. The factory-generated section SVGs use small shapes at low opacity that blend into the background.

## Target

Match the dashboard's illustration visibility. The dashboard SVG uses:
- Larger shapes: bar charts (12px wide, 25-35px tall), pie chart (r=20), line graph with r=4 data points, gauge, KPI card (60x40)
- Higher opacities on elements: 0.5-0.8
- Four animated dots (not two)
- `preserveAspectRatio="xMidYMid slice"` for proper scaling

## Fix

Two files need changes:

### File 1: `l8ui/shared/layer8-svg-factory.js`

1. **Increase grid opacity** from `0.1` to `0.2` — grid lines more visible against tan
2. **Increase path opacity** from `0.3` to `0.5` — connection lines more visible
3. **Increase gradient stop-opacity** from `0.4/0.2` to `0.6/0.4` — fill colors stronger
4. **Add two more animated dots** (4 total, matching dashboard) with varied durations
5. **Add `preserveAspectRatio="xMidYMid slice"`** to the SVG element

### File 2: `erp-ui/erp-svg-templates.js`

Increase all element opacities across all 11 templates to match dashboard visibility:

- Gradient-filled shapes: `0.5` → `0.7`, `0.6` → `0.8`, `0.7` → `0.9`
- White detail elements: `0.7` → `0.9`, `0.8` → `1.0`
- Increase shape sizes by ~30% (e.g., circles from r=12-18 to r=16-24, rects wider/taller)

Templates to update (11 total):
1. `people` — HCM
2. `financial` — FIN
3. `supplyChain` — SCM
4. `sales` — Sales
5. `crm` — CRM
6. `manufacturing` — MFG
7. `projects` — PRJ
8. `analytics` — BI
9. `documents` — DOC
10. `ecommerce` — ECOM
11. `compliance` — COMP

## Files Changed

| File | Change |
|------|--------|
| `l8ui/shared/layer8-svg-factory.js` | Increase grid/path/gradient opacity, add 2 animated dots, add preserveAspectRatio |
| `erp-ui/erp-svg-templates.js` | Increase element opacities and sizes across all 11 templates |

## Verification

After rebuild, navigate to each desktop section and confirm:
- SVG illustration shapes are clearly visible against the tan gradient background
- Animated dots pulse visibly
- Connection lines between shapes are visible
- Grid background is subtly visible
- Overall look matches the dashboard title's illustration visibility
