# Plan 2.1: Missing Form Field Types

## Scope

Add 8 new form field types to the desktop and mobile form framework. Each field type requires changes to 4 files (desktop render, desktop collect, factory, mobile).

## Concern: File/Attachment Upload

File/Attachment Upload is **fundamentally different** from the other 8 field types. All other types are pure UI components — they render HTML inputs and collect scalar or array values that get serialized into the existing protobuf fields. File Upload requires:

1. **Server-side file storage backend** — where do the bytes go? (filesystem, S3, database blob)
2. **Multipart upload endpoint** — the existing `/erp/<area>/<service>` POST endpoint handles JSON protobuf, not multipart/form-data
3. **Download/retrieval endpoint** — serving the file back to the browser
4. **File size limits, MIME validation, virus scanning** — production concerns
5. **Protobuf schema changes** — current `string` fields for file references would need to point to a storage location

This is backend infrastructure work (listed in MISSING-FEATURES.md section 8.9 as "File storage backend"). **Recommendation: Defer File/Attachment Upload to a dedicated phase.** It does not belong in a UI field type ticket — it's an entire subsystem.

**The remaining 8 field types are pure UI and can be implemented together.**

---

## Implementation Plan

### Tier 1: Drop-In Replacements (minimal complexity)

These replace existing field types with better UX — no new data types needed.

#### 1. Toggle Switch (`toggle`)
- **Renders**: CSS-styled toggle switch instead of plain checkbox
- **Data**: Boolean (same as `checkbox`)
- **Factory**: `f.toggle(key, label)` — alias that produces `{ type: 'toggle' }`
- **Collect**: Same as `checkbox` — reads `.checked`
- **CSS**: Add `.l8-toggle` styles to shared theme
- **Usage**: Any boolean field where toggle is more intuitive (isActive, isEnabled, etc.)

#### 2. Slider/Range (`slider`)
- **Renders**: HTML5 `<input type="range">` with min/max/step + live value label
- **Data**: Number (float64 or int32)
- **Factory**: `f.slider(key, label, min, max, step)` — field gets `{ type: 'slider', min, max, step }`
- **Collect**: Parse `.value` as float (same as `number`)
- **Usage**: BI thresholds, COMP risk scores, satisfaction ratings

### Tier 2: Array/Multi-Value Fields (moderate complexity)

These introduce `[]string` or `[]int` collection patterns.

#### 3. Tags/Chips Input (`tags`)
- **Renders**: Text input with chip container below. Type + Enter adds a chip. Click X removes.
- **Data**: `[]string` — stored as repeated string proto field
- **Factory**: `f.tags(key, label)` — field gets `{ type: 'tags' }`
- **Collect**: Read hidden JSON array from `data-tags-value` attribute
- **Pre-populate on edit**: Parse existing `[]string` array into chips
- **Usage**: CRM tags, DOC keywords, ECOM product tags

#### 4. Multi-Select Dropdown (`multiselect`)
- **Renders**: Dropdown with checkboxes for each option. Selected items shown as chips above.
- **Data**: `[]int32` or `[]string` — stored as repeated field
- **Factory**: `f.multiselect(key, label, options)` — field gets `{ type: 'multiselect', options }`
- **Collect**: Read checked values from hidden JSON or iterate checkbox states
- **Pre-populate on edit**: Parse existing array into checked states
- **Usage**: HCM skills, PRJ team member selection

#### 5. Time-of-Day Picker (`time`)
- **Note**: Factory method `f.time()` already exists but renders as `text`. This upgrades it.
- **Renders**: `<input type="time">` (native browser time picker) with HH:MM display
- **Data**: String "HH:MM" or int32 (minutes since midnight)
- **Factory**: Update existing `f.time()` to produce `{ type: 'time' }` (currently produces `text`)
- **Collect**: Read `.value` as "HH:MM" string
- **Usage**: HCM schedules (shift start/end), MFG shifts

### Tier 3: Enhanced Interaction Fields (higher complexity)

#### 6. Rich Text Editor (`richtext`)
- **Renders**: `<div contenteditable="true">` with a simple toolbar (bold, italic, bullet list, numbered list, link)
- **Data**: String (HTML) — stored in existing `string` proto fields (description, notes, etc.)
- **Factory**: `f.richtext(key, label)` — field gets `{ type: 'richtext' }`
- **Collect**: Read `.innerHTML` from the contenteditable div
- **Pre-populate on edit**: Set `.innerHTML` from existing string value
- **No external library** — use browser's `execCommand` for basic formatting
- **XSS**: Sanitize on collect (strip `<script>`, `onerror=`, etc.)
- **Usage**: DOC content, CRM case notes, PRJ descriptions
- **Limitation**: No image embedding (that would require file upload infrastructure)

#### 7. Autocomplete/Typeahead (`autocomplete`)
- **Enhances**: Existing `reference` field type with type-ahead search
- **Renders**: Text input with dropdown suggestion list that filters as user types
- **Data**: String ID (same as `reference`)
- **Mechanism**: On keyup (debounced 300ms), query the existing reference registry's endpoint with a `LIKE` filter, show matching results in a dropdown
- **Factory**: Not a new factory method — enhance existing `f.reference()` behavior via a config flag or apply globally to all reference pickers
- **Collect**: Same as `reference` — `data-ref-id` attribute
- **Fallback**: If fewer than threshold results, show full list (current behavior)

#### 8. Address Autocomplete (`addressAutocomplete`)
- **Current state**: `f.address()` expands to 6 plain text fields (street1, street2, city, state, zip, country)
- **Enhancement**: Add typeahead to the street1 field that fills in city/state/zip/country
- **External API**: This requires Google Places API or similar geocoding service
- **Recommendation**: **Defer this one.** It needs an external API key, backend proxy for the API call, and is non-trivial to set up. The current 6-field address input works fine for data entry.
- **Alternative**: Add a `country` dropdown (static list) to replace the free-text country field. This is low-effort and improves data quality without external dependencies.

---

## Summary: What to Implement

| # | Field Type | Tier | Effort | Status |
|---|-----------|------|--------|--------|
| 1 | Toggle Switch | 1 | Low | Implement |
| 2 | Slider/Range | 1 | Low | Implement |
| 3 | Tags/Chips | 2 | Medium | Implement |
| 4 | Multi-Select | 2 | Medium | Implement |
| 5 | Time Picker | 2 | Low | Implement |
| 6 | Rich Text | 3 | Medium | Implement |
| 7 | Autocomplete | 3 | Medium | Implement |
| 8 | Address Autocomplete | 3 | High | **Defer** (external API) |
| 9 | File Upload | - | Very High | **Defer** (backend infra) |

**Implementing: 7 field types. Deferring: 2 (File Upload, Address Autocomplete).**

---

## Files Modified Per Field Type

Each field type touches these 4 files:

1. **`l8ui/shared/layer8d-forms-fields.js`** (440 lines) — add `case` in `generateFieldHtml()`
2. **`l8ui/shared/layer8d-forms-data.js`** (287 lines) — add `case` in `collectFormData()`
3. **`l8ui/shared/layer8-form-factory.js`** (483 lines) — add factory method
4. **`l8ui/m/js/layer8m-forms.js`** (498 lines) — add mobile render + collect

Plus shared CSS:
5. **`l8ui/shared/layer8d-theme.css`** or new `l8ui/shared/layer8d-form-fields.css` — styles for toggle, slider, tags, multiselect, richtext toolbar

**File size concern**: `layer8-form-factory.js` (483 lines) and `layer8m-forms.js` (498 lines) are near the 500-line limit. If adding 7 field types pushes them over, split:
- Factory: extract preset groups (`address`, `contact`, `audit`, `person`) to `layer8-form-presets.js`
- Mobile: extract field renderers to `layer8m-form-fields.js` (already partially exists)

---

## Implementation Order

1. **Tier 1** (Toggle + Slider) — simplest, validates the pattern
2. **Tier 2** (Tags + Multi-Select + Time Picker) — array data types
3. **Tier 3** (Rich Text + Autocomplete) — most complex

Each tier: implement desktop, implement mobile, test, move to next tier.

---

## What This Does NOT Include

- **File/Attachment Upload** — deferred (needs backend file storage)
- **Address Autocomplete** — deferred (needs external geocoding API)
- **Updating existing forms to USE the new field types** — that's a separate pass. This plan only adds the field type infrastructure. Adopting them in actual form definitions (e.g., changing CRM tags from `f.text()` to `f.tags()`) would be a follow-up task.
- **Protobuf changes** — none needed. Tags/multiselect use existing `repeated string` fields. All other types map to existing scalar types.
