# Plan: Generic Data Import System

## Context

Phase E item 2 from MISSING-FEATURES.md. The system currently has CSV Export but no import capability. Data import is fundamentally different from export — external systems have different models, attribute names, value formats, and data structures. Expecting source data to match the target protobuf model is unrealistic.

This is a **generic system feature** (not ERP-specific):
- **Proto types** → `l8types/proto/api.proto`
- **Backend services** → `l8services/go/services/dataimport/`
- **UI components** → `l8ui/` (desktop shared + mobile)
- **ERP integration** → System section tab in l8erp

## Architecture Overview

```
                    ┌──────────────────────────────────────────────┐
                    │              System Section UI                │
                    │  ┌───────────────┬────────────┬────────────┐ │
                    │  │  Templates    │  Transfer  │   Import   │ │
                    │  │  (create/map) │ (exp/imp)  │  (execute) │ │
                    │  └──────┬────────┴─────┬──────┴─────┬──────┘ │
                    └─────────┼──────────────┼────────────┼────────┘
                              │              │            │
                 ┌────────────▼──┐    ┌──────▼─────┐  ┌──▼──────────┐
                 │  AI Mapping   │    │  Template  │  │   Import    │
                 │  Suggestion   │    │  Export/   │  │   Execute   │
                 │  + ModelInfo  │    │  Import    │  │   Service   │
                 └───────┬───────┘    └────────────┘  └──┬──────────┘
                         │                               │
                  ┌──────▼───────────────────────────────▼──────┐
                  │             Introspector                     │
                  │    (target model metadata + attributes)      │
                  └─────────────────────────────────────────────┘
```

### Three UI Tabs

| Tab | Purpose | Steps |
|-----|---------|-------|
| **Templates** | Create/manage import mapping templates | Upload file → AI suggests mapping → User refines → Save template |
| **Transfer** | Move templates between environments | Export templates as JSON file / Import templates from JSON file |
| **Import** | Execute the actual data import | Select template + upload data file → Parse + map + transform → POST records |

### Workflow: Staging → Production

1. **Staging**: Create template (Templates tab) → test with real imports (Import tab) → iterate until correct
2. **Transfer**: Export tested template as JSON file (Transfer tab)
3. **Production**: Import template JSON file (Transfer tab) → run import with production data (Import tab)

No dry-run mode needed — testing happens on staging with real imports through the full service pipeline (Before → ORM → After). This avoids threading a "dry run" flag through the cache, callbacks, ORM, and After hooks.

---

## Part 1: Proto Types (l8types/proto/api.proto)

### Import Template (persisted entity)

```protobuf
// An import mapping template — maps source columns to target model fields
message L8ImportTemplate {
    string template_id = 1;
    string name = 2;                        // e.g., "SAP Employee Import"
    string description = 3;
    string target_model_type = 4;           // Protobuf type name (e.g., "Employee")
    string target_service_name = 5;         // ServiceName constant
    int32 target_service_area = 6;          // ServiceArea
    string source_format = 7;              // "csv", "json", "xml"
    repeated L8ImportColumnMapping column_mappings = 8;
    repeated L8ImportValueTransform value_transforms = 9;
    L8ImportDefaultValues default_values = 10;
    l8api.AuditInfo audit_info = 20;
}

message L8ImportTemplateList {
    repeated L8ImportTemplate list = 1;
    l8api.L8MetaData metadata = 2;
}

// Maps one source column to one target field
message L8ImportColumnMapping {
    string source_column = 1;              // Header name in source file
    string target_field = 2;               // JSON field name on target protobuf
    bool skip = 3;                         // True = ignore this source column
}

// Value transformation rule for a mapped field
message L8ImportValueTransform {
    string target_field = 1;               // Which target field this applies to
    L8ImportTransformType transform_type = 2;
    string format_pattern = 3;             // e.g., "MM/DD/YYYY" for date parsing
    map<string, string> value_map = 4;     // e.g., {"Active": "1", "Inactive": "2"}
    string default_value = 5;              // Fallback when source is empty
    string concatenate_separator = 6;      // For CONCATENATE type
    repeated string concatenate_fields = 7;// Source columns to join
}

enum L8ImportTransformType {
    IMPORT_TRANSFORM_UNSPECIFIED = 0;
    IMPORT_TRANSFORM_DATE_FORMAT = 1;      // Parse date using format_pattern
    IMPORT_TRANSFORM_ENUM_MAP = 2;         // Map text labels to enum int values
    IMPORT_TRANSFORM_UNIT_CONVERT = 3;     // e.g., dollars→cents (multiply by 100)
    IMPORT_TRANSFORM_TRIM = 4;             // Trim whitespace
    IMPORT_TRANSFORM_UPPERCASE = 5;
    IMPORT_TRANSFORM_LOWERCASE = 6;
    IMPORT_TRANSFORM_DEFAULT = 7;          // Use default_value when source is empty
    IMPORT_TRANSFORM_CONCATENATE = 8;      // Join multiple source columns
    IMPORT_TRANSFORM_SPLIT = 9;            // Split one source column into target field
    IMPORT_TRANSFORM_MONEY = 10;           // Parse currency string into Money{amount, currencyCode}
}

// Default values for fields not present in the source file
message L8ImportDefaultValues {
    map<string, string> defaults = 1;      // target_field → default value string
}
```

### AI Mapping Request/Response

```protobuf
// Request AI to suggest column mappings
message L8ImportAIMappingRequest {
    string target_model_type = 1;          // Protobuf type name
    string target_service_name = 2;
    int32 target_service_area = 3;
    repeated string source_columns = 4;    // Headers from uploaded file
    repeated string sample_values = 5;     // First row values (helps AI infer types)
    string source_format = 6;              // "csv", "json", "xml"
}

message L8ImportAIMappingResponse {
    repeated L8ImportColumnMapping suggested_mappings = 1;
    repeated L8ImportValueTransform suggested_transforms = 2;
    float confidence = 3;                  // 0.0-1.0 overall confidence
    string explanation = 4;                // AI explanation of mapping rationale
}
```

### Import Execution Request/Response

```protobuf
message L8ImportExecuteRequest {
    string template_id = 1;
    string file_data = 2;                 // Base64-encoded file content
    string file_name = 3;
}

message L8ImportExecuteResponse {
    int32 total_rows = 1;
    int32 imported_rows = 2;
    int32 failed_rows = 3;
    repeated L8ImportRowError row_errors = 4;
}

message L8ImportRowError {
    int32 row_number = 1;
    string field = 2;
    string error_message = 3;
    string source_value = 4;              // What the source had
}
```

### Model Metadata (for UI to display target fields)

```protobuf
// Returns target model field metadata for the mapping UI
message L8ImportModelInfoRequest {
    string model_type = 1;
}

message L8ImportModelInfoResponse {
    string model_type = 1;
    repeated L8ImportFieldInfo fields = 2;
}

message L8ImportFieldInfo {
    string field_name = 1;                // JSON name (camelCase)
    string field_type = 2;               // "string", "int32", "int64", "bool", "float", "enum", "money", "date"
    bool is_required = 3;                // From primary key / decorator info
    bool is_primary_key = 4;
    map<string, int32> enum_values = 5;  // If enum: label→value (e.g., {"ACTIVE": 1, "INACTIVE": 2})
}
```

### Template Transfer Request/Response

```protobuf
// Export one or more templates as a portable bundle
message L8ImportTemplateExportRequest {
    repeated string template_ids = 1;     // Which templates to export
}

message L8ImportTemplateExportResponse {
    string export_data = 1;              // JSON string of templates (portable format)
    string filename = 2;                 // Suggested filename
    int32 template_count = 3;
}

// Import templates from a previously exported bundle
message L8ImportTemplateImportRequest {
    string import_data = 1;              // JSON string from export
    bool overwrite_existing = 2;         // If template with same name exists: overwrite or skip
}

message L8ImportTemplateImportResponse {
    int32 imported_count = 1;
    int32 skipped_count = 2;
    repeated string imported_names = 3;
    repeated string skipped_names = 4;   // Names that were skipped (already exist)
}
```

---

## Part 2: Backend Services (l8services/go/services/dataimport/)

### Service Structure

```
l8services/go/services/dataimport/
├── DataImport.go              // Service activation, registers all endpoints
├── DataImportTemplate.go      // ORM-backed CRUD for L8ImportTemplate
├── DataImportAI.go            // POST: AI mapping suggestion
├── DataImportExecute.go       // POST: actual data import execution
├── DataImportModelInfo.go     // POST: model metadata for mapping UI
├── DataImportTransfer.go      // POST: template export + template import
├── FileParser.go              // Multi-format parser (CSV, JSON, XML)
├── ValueTransformer.go        // Transform engine (date, enum, money, etc.)
└── RecordBuilder.go           // Build protobuf instances from mapped data
```

### File 1: DataImport.go (~70 lines)

Service activation — registers ALL proto types and creates endpoints.

```go
package dataimport

const (
    TemplateSvcName = "ImprtTmpl"  // Template CRUD (10 char max)
    ServiceArea     = byte(0)      // System service area
)
```

**Endpoints:**
| Method | Service | Request Type | Response Type |
|--------|---------|-------------|---------------|
| CRUD | ImprtTmpl | L8ImportTemplate | L8ImportTemplate |
| POST | ImprtAI | L8ImportAIMappingRequest | L8ImportAIMappingResponse |
| POST | ImprtExec | L8ImportExecuteRequest | L8ImportExecuteResponse |
| POST | ImprtInfo | L8ImportModelInfoRequest | L8ImportModelInfoResponse |
| POST | ImprtXfer | L8ImportTemplateExportRequest | L8ImportTemplateExportResponse |
| PUT | ImprtXfer | L8ImportTemplateImportRequest | L8ImportTemplateImportResponse |

The template service (`ImprtTmpl`) is a standard ORM-backed service with CRUD. The others are custom POST-only handlers (same pattern as CsvExport).

### File 2: DataImportTemplate.go (~30 lines)

Standard ORM service activation for `L8ImportTemplate`. Prime Object — users create, browse, edit, and delete templates. ServiceCallback validates: require name, target_model_type, target_service_name, target_service_area.

### File 3: DataImportAI.go (~80 lines)

**POST handler logic:**

1. Receive `L8ImportAIMappingRequest` (target model + source headers + sample values)
2. Get target model node: `introspector.NodeByTypeName(req.TargetModelType)`
3. Build field metadata from `node.Attributes` (field names, types, enum maps)
4. Call `IAIMappingProvider.SuggestMapping()` with target fields + source columns + samples
5. Return `L8ImportAIMappingResponse` with suggested mappings + transforms + confidence

**AI Integration Architecture:**

```go
type IAIMappingProvider interface {
    SuggestMapping(ctx context.Context, req *AIMappingInput) (*l8api.L8ImportAIMappingResponse, error)
}

type AIMappingInput struct {
    TargetFields   []FieldInfo    // name, type, required, enum values
    SourceColumns  []string       // headers
    SampleValues   []string       // first row
}
```

Two implementations:
- **HeuristicProvider** (default, no external dependency): Fuzzy string matching (Levenshtein distance, case-insensitive substring, snake/camel normalization, common abbreviation expansion). Handles ~70% of obvious mappings.
- **LLMProvider** (pluggable): Sends structured prompt to an LLM API. Configured at startup via `SetAIMappingProvider()`. Optional — system works without it.

### File 4: DataImportExecute.go (~100 lines)

**POST handler logic:**

1. Receive `L8ImportExecuteRequest` (template_id + file data)
2. Load template from ORM by template_id
3. Parse file using `FileParser` (format from template.SourceFormat or file extension)
4. For each row:
   a. Apply column mappings (source column → target field)
   b. Apply value transforms (date parsing, enum mapping, etc.)
   c. Build a protobuf instance using `RecordBuilder`
   d. Call `handler.Post(elements, vnic)` through the normal service pipeline
   e. This triggers the full lifecycle: Before() → ORM write → After()
5. Collect results: imported count, failed count, per-row errors
6. Return `L8ImportExecuteResponse`

Invalid rows are skipped and reported in `row_errors`. The import is **row-by-row, not all-or-nothing** — valid rows import even if some fail.

### File 5: DataImportModelInfo.go (~70 lines)

**POST handler logic:**

1. Receive `L8ImportModelInfoRequest` with model type name
2. Get node: `introspector.NodeByTypeName(req.ModelType)`
3. For each attribute in `node.Attributes`:
   - Skip IsStruct, IsSlice, IsMap (same logic as CsvExport's buildHeaders)
   - Determine field type from Go reflect kind
   - Check decorators for primary key flag
   - If enum: use the protobuf `_name` map to populate enum_values
4. Return `L8ImportModelInfoResponse` with field list

This gives the UI everything it needs to render the mapping interface without hardcoding any model knowledge.

### File 6: DataImportTransfer.go (~90 lines)

**POST handler (Export):**

1. Receive `L8ImportTemplateExportRequest` with list of template_ids
2. Load each template from ORM
3. Strip runtime-only fields (audit_info, template_id) — IDs are regenerated on import
4. Serialize as JSON array
5. Return `L8ImportTemplateExportResponse` with JSON string + suggested filename

**PUT handler (Import):**

1. Receive `L8ImportTemplateImportRequest` with JSON string + overwrite flag
2. Deserialize JSON array into `[]L8ImportTemplate`
3. For each template:
   a. Check if template with same `name` already exists (GET by name)
   b. If exists and `overwrite_existing` is false → skip, add to skipped_names
   c. If exists and `overwrite_existing` is true → PUT (update)
   d. If not exists → POST (create, new template_id auto-generated)
4. Return `L8ImportTemplateImportResponse` with counts and names

### File 7: FileParser.go (~130 lines)

Multi-format parser. Returns a uniform `ParsedFile` regardless of input format.

```go
type ParsedRow struct {
    RowNumber int
    Values    map[string]string  // column_name → value (all as strings)
}

type ParsedFile struct {
    Headers []string
    Rows    []ParsedRow
}

func ParseFile(data []byte, format string, fileName string) (*ParsedFile, error)
```

**Supported formats:**
- **CSV**: Standard `encoding/csv` reader. First row = headers.
- **JSON**: Array of objects `[{"field": "value"}, ...]`. Keys from first object = headers.
- **XML**: Expects `<rows><row><field>value</field>...</row></rows>` pattern. Element names = headers.

Format detection: Use `template.SourceFormat` first. If empty, infer from file extension in `fileName`. Fallback: try CSV.

### File 8: ValueTransformer.go (~120 lines)

Applies `L8ImportValueTransform` rules to raw string values.

```go
func TransformValue(raw string, transforms []*l8api.L8ImportValueTransform, fieldName string) (string, error)
```

**Transform implementations:**
| Type | Logic |
|------|-------|
| DATE_FORMAT | `time.Parse(format_pattern, raw)` → Unix timestamp string |
| ENUM_MAP | Lookup raw in `value_map`, return mapped value |
| UNIT_CONVERT | Parse as float, multiply by factor from `format_pattern` (e.g., "100" for dollars→cents) |
| TRIM | `strings.TrimSpace(raw)` |
| UPPERCASE | `strings.ToUpper(raw)` |
| LOWERCASE | `strings.ToLower(raw)` |
| DEFAULT | If raw is empty, use `default_value` |
| CONCATENATE | Join values from `concatenate_fields` with `concatenate_separator` |
| SPLIT | Split raw by `concatenate_separator`, take index from `format_pattern` |
| MONEY | Parse currency string (e.g., "$1,234.56") → `{"amount": 123456, "currencyCode": "USD"}` |

### File 9: RecordBuilder.go (~100 lines)

Builds a protobuf struct instance from mapped key-value pairs.

```go
func BuildRecord(modelType string, mappedValues map[string]string,
                 node *l8reflect.L8Node, registry ifs.IRegistry) (interface{}, error)
```

1. Create new instance of the target protobuf type via `registry.NewInstance(modelType)`
2. For each mapped field, use `node.Attributes[fieldName].FieldName` to get the Go struct field name
3. Use `reflect.ValueOf(instance).Elem().FieldByName(goFieldName)` to set values
4. Type-convert string values to the appropriate Go type based on the field's reflect.Kind

---

## Part 3: Service Activation

### In l8erp: `go/erp/ui/main1/main.go` and `main2/main2.go`

Add after existing service activations:
```go
dataimport.Activate(nic)
```

### Type Registration in `go/erp/ui/main.go`

Register `L8ImportTemplate` as a system type with primary key decorator:
```go
introspect.AddPrimaryKeyDecorator(&l8api.L8ImportTemplate{}, vnic.Resources(), "TemplateId")
vnic.Resources().Registry().Register(&l8api.L8ImportTemplate{})
```

---

## Part 4: Desktop UI — l8ui Library Components

### 4.1 Main Component: `l8ui/shared/layer8d-data-import.js` (~200 lines)

Global: `window.Layer8DDataImport`

Top-level component that manages the three-tab interface.

```javascript
Layer8DDataImport = {
    initialize(container) {
        // Render three tabs: Templates | Transfer | Import
        // Each tab has its own content area
        // Default to Templates tab
    },
    switchTab(tabName) {
        // 'templates', 'transfer', 'import'
    }
};
```

### 4.2 Templates Tab: `l8ui/shared/layer8d-import-templates.js` (~250 lines)

Global: `window.Layer8DImportTemplates`

**Step 1: Upload & Preview**
- File drop zone (reuses `layer8-file-upload.css` styles)
- Accept: `.csv`, `.json`, `.xml`, `.tsv`
- On file select: read file client-side, extract headers + first 5 rows as sample
- Target service/model selector: dropdown populated from the system's registered services

**Step 2: AI-Assisted Mapping**
- After file upload + model selection, POST to `/erp/0/ImprtAI` with:
  - `targetModelType`, `targetServiceName`, `targetServiceArea`
  - `sourceColumns` (headers from file)
  - `sampleValues` (first row values)
- Display AI response as pre-populated mapping table
- Show AI confidence score and explanation

**Step 3: Interactive Mapping Refinement**
- Two-column mapping table:
  - Left: Source columns (with sample values shown as hints)
  - Right: Target field dropdowns (populated from `/erp/0/ImprtInfo` response)
  - Each row: source column → target field dropdown + "Skip" checkbox
- Value transform configuration per mapping:
  - Auto-detected: if target is enum, show enum value mapper; if target is date, show date format input
  - Manual: user can add transforms (trim, uppercase, default value, etc.)
- Unmapped required fields highlighted in yellow with warning
- "Preview" button: shows first 5 rows with transforms applied (client-side)

**Step 4: Save Template**
- Template name + description inputs
- POST to `/erp/0/ImprtTmpl` with full template data
- Template appears in the templates list table below

**Template Management:**
- Table of saved templates (standard Layer8DTable)
- Edit: re-opens the mapping UI with existing mappings loaded
- Delete: confirms then DELETEs the template
- Duplicate: creates a copy with "-copy" suffix

### 4.3 Transfer Tab: `l8ui/shared/layer8d-import-transfer.js` (~150 lines)

Global: `window.Layer8DImportTransfer`

Two sections side by side (or stacked on mobile):

**Export Section:**
- List of templates with checkboxes (multi-select)
- "Export Selected" button
- POST to `/erp/0/ImprtXfer` with selected template_ids
- Server returns JSON bundle → triggers browser file download (same pattern as CSV export: Blob + createObjectURL)
- Suggested filename: `import-templates_YYYY-MM-DD.json`

**Import Section:**
- File drop zone for `.json` template files
- "Overwrite existing" toggle (default: off → skip duplicates)
- "Import Templates" button
- PUT to `/erp/0/ImprtXfer` with JSON file content + overwrite flag
- Results display:
  - "Imported: Template A, Template B"
  - "Skipped (already exists): Template C"
- After successful import, refresh the Templates tab table

### 4.4 Import Tab: `l8ui/shared/layer8d-import-execute.js` (~150 lines)

Global: `window.Layer8DImportExecute`

**UI:**
1. Template selector dropdown (fetches templates from `/erp/0/ImprtTmpl`)
2. File drop zone for data files
3. "Import Data" button (with confirmation dialog)
4. Progress indicator (for large files)
5. Results area:
   - Summary: "Imported 230 of 245 rows | 15 failed"
   - Errors table: row number, field, error message, source value
   - "Download Error Report" button (CSV of failed rows with error details)

**Flow:**
1. Select template + upload data file
2. Confirmation dialog: "This will import N rows into [ModelType]. Continue?"
3. POST to `/erp/0/ImprtExec` with `{templateId, fileData (base64), fileName}`
4. Display results
5. Option to download error report as CSV

### 4.5 CSS: `l8ui/shared/layer8d-data-import.css` (~100 lines)

Uses `--layer8d-*` theme tokens. Styles for:
- `.l8-import-tabs` — tab bar
- `.l8-import-tab-content` — content areas
- `.l8-import-mapping-table` — two-column mapping grid
- `.l8-import-mapping-row` — source→target row
- `.l8-import-sample` — sample value hints
- `.l8-import-results` — import results
- `.l8-import-summary-bar` — imported/failed count bar
- `.l8-import-confidence` — AI confidence display
- `.l8-import-transform` — value transform config area
- `.l8-import-transfer` — export/import sections layout

---

## Part 5: Mobile UI — l8ui Library Components

### `l8ui/m/js/layer8m-data-import.js` (~180 lines)

Global: `window.Layer8MDataImport`

Same three-tab structure, adapted for mobile:
- Tabs rendered as a horizontal scrollable bar
- Mapping table uses stacked layout (source on top, target dropdown below)
- File upload uses the native file picker (no drag-drop on mobile)
- Transfer sections stacked vertically
- Results use mobile card layout

---

## Part 6: ERP Integration — System Section

### 6.1 System Section HTML Update

**File: `go/erp/ui/web/sections/system.html`**

Add a new module tab "Data Import" alongside Health, Security, Modules, Logs:
```html
<button class="l8-module-tab" data-module="data-import">Data Import</button>
```

Add corresponding content area:
```html
<div class="l8-module-content" data-module="data-import">
    <div id="l8-data-import-container"></div>
</div>
```

### 6.2 System Config Update

**File: `l8ui/sys/l8sys-config.js`**

Add to `L8Sys.modules`:
```javascript
'data-import': {
    label: 'Data Import',
    services: [
        { key: 'templates', label: 'Templates', endpoint: '/0/ImprtTmpl', model: 'L8ImportTemplate' }
    ]
}
```

### 6.3 System Init Update

**File: `l8ui/sys/l8sys-init.js`**

Add initializer call:
```javascript
if (window.Layer8DDataImport) Layer8DDataImport.initialize(document.getElementById('l8-data-import-container'));
```

### 6.4 Mobile Section HTML

**File: `go/erp/ui/web/m/sections/system.html`**

Add "Data Import" tab with same structure for mobile.

### 6.5 Script Includes

**File: `go/erp/ui/web/app.html`**
```html
<link rel="stylesheet" href="l8ui/shared/layer8d-data-import.css">
<script src="l8ui/shared/layer8d-data-import.js"></script>
<script src="l8ui/shared/layer8d-import-templates.js"></script>
<script src="l8ui/shared/layer8d-import-transfer.js"></script>
<script src="l8ui/shared/layer8d-import-execute.js"></script>
```

**File: `go/erp/ui/web/m/app.html`**
```html
<script src="l8ui/m/js/layer8m-data-import.js"></script>
```

---

## Part 7: AI Mapping Provider

### Heuristic Provider (Default — No External Dependency)

Matching strategies (applied in order, first match wins):

1. **Exact match** (case-insensitive): "employeeId" = "EmployeeId"
2. **Snake/camel normalization**: "employee_id" = "employeeId", "first_name" = "firstName"
3. **Common abbreviation expansion**: "emp_id" → "employeeId", "dept" → "departmentId", "fname" → "firstName"
4. **Substring containment**: source "Employee First Name" contains "firstName" (after normalization)
5. **Levenshtein distance** (threshold ≤ 2): "emplyeeId" → "employeeId"

Confidence scoring: exact=1.0, normalized=0.9, abbreviation=0.8, substring=0.7, levenshtein=0.6

### LLM Provider (Pluggable)

Interface for AI-powered mapping:
```go
type IAIMappingProvider interface {
    SuggestMapping(ctx context.Context, req *AIMappingInput) (*l8api.L8ImportAIMappingResponse, error)
}

type AIMappingInput struct {
    TargetFields   []FieldInfo    // name, type, required, enum values
    SourceColumns  []string       // headers
    SampleValues   []string       // first row
}
```

The LLM provider builds a structured prompt:
```
You are mapping data from an external source to a target system model.

Target model: Employee
Target fields:
- employeeId (string, primary key, auto-generated)
- firstName (string, required)
- lastName (string, required)
- email (string)
- departmentId (string, reference to Department)
- status (enum: UNSPECIFIED=0, ACTIVE=1, INACTIVE=2, ON_LEAVE=3)
- hireDate (int64, unix timestamp)
- salary (Money: {amount: cents, currencyCode: string})

Source columns with sample values:
- "Emp #" → "E-1234"
- "First" → "John"
- "Last" → "Smith"
- "Email Address" → "john@example.com"
- "Dept Code" → "ENG-01"
- "Employment Status" → "Active"
- "Start Date" → "01/15/2024"
- "Annual Salary" → "$85,000.00"

Return JSON with mappings and transforms...
```

The provider is set at startup: `dataimport.SetAIMappingProvider(provider)`. If no provider is set, the heuristic provider is used.

---

## Files Summary

### l8types (proto)
| # | File | Action | ~Lines |
|---|------|--------|--------|
| 1 | `proto/api.proto` | Modify | +90 |

### l8services (backend)
| # | File | Action | ~Lines |
|---|------|--------|--------|
| 2 | `go/services/dataimport/DataImport.go` | Create | 70 |
| 3 | `go/services/dataimport/DataImportTemplate.go` | Create | 30 |
| 4 | `go/services/dataimport/DataImportAI.go` | Create | 80 |
| 5 | `go/services/dataimport/DataImportExecute.go` | Create | 100 |
| 6 | `go/services/dataimport/DataImportModelInfo.go` | Create | 70 |
| 7 | `go/services/dataimport/DataImportTransfer.go` | Create | 90 |
| 8 | `go/services/dataimport/FileParser.go` | Create | 130 |
| 9 | `go/services/dataimport/ValueTransformer.go` | Create | 120 |
| 10 | `go/services/dataimport/RecordBuilder.go` | Create | 100 |

### l8ui (UI components)
| # | File | Action | ~Lines |
|---|------|--------|--------|
| 11 | `l8ui/shared/layer8d-data-import.js` | Create | 200 |
| 12 | `l8ui/shared/layer8d-import-templates.js` | Create | 250 |
| 13 | `l8ui/shared/layer8d-import-transfer.js` | Create | 150 |
| 14 | `l8ui/shared/layer8d-import-execute.js` | Create | 150 |
| 15 | `l8ui/shared/layer8d-data-import.css` | Create | 100 |
| 16 | `l8ui/m/js/layer8m-data-import.js` | Create | 180 |

### l8erp (integration)
| # | File | Action | ~Lines |
|---|------|--------|--------|
| 17 | `sections/system.html` | Modify | +10 |
| 18 | `m/sections/system.html` | Modify | +10 |
| 19 | `l8ui/sys/l8sys-config.js` | Modify | +8 |
| 20 | `l8ui/sys/l8sys-init.js` | Modify | +3 |
| 21 | `app.html` | Modify | +5 |
| 22 | `m/app.html` | Modify | +2 |
| 23 | `go/erp/ui/main1/main.go` | Modify | +2 |
| 24 | `go/erp/ui/main2/main2.go` | Modify | +2 |
| 25 | `go/erp/ui/main.go` | Modify | +5 |
| 26 | `l8ui/GUIDE.md` | Modify | +40 |

---

## Implementation Phases

### Phase 1: Proto + Backend Foundation
1. Add proto messages to `api.proto`, run `make-bindings.sh`
2. Create `dataimport/` package in l8services: DataImport.go, DataImportTemplate.go, DataImportModelInfo.go
3. Create FileParser.go (CSV + JSON + XML)
4. Create ValueTransformer.go
5. Create RecordBuilder.go
6. Vendor updated l8types + l8services into l8erp

### Phase 2: AI Mapping + Import + Transfer Backend
7. Create DataImportAI.go with heuristic provider
8. Create DataImportExecute.go
9. Create DataImportTransfer.go (export + import templates)
10. Activate services in l8erp main files

### Phase 3: Desktop UI
11. Create CSS file
12. Create main component (layer8d-data-import.js)
13. Create Templates tab (layer8d-import-templates.js)
14. Create Transfer tab (layer8d-import-transfer.js)
15. Create Import tab (layer8d-import-execute.js)
16. Integrate into System section (HTML, config, init, app.html)

### Phase 4: Mobile UI
17. Create mobile component (layer8m-data-import.js)
18. Update mobile system section HTML + app.html

### Phase 5: Verification
19. Build: `go build ./...` in l8services and l8erp
20. Syntax check all JS files: `node -c`
21. Update GUIDE.md
22. Update MISSING-FEATURES.md

---

## Key Design Decisions

1. **Generic, not ERP-specific**: All proto types in l8types, all services in l8services, all UI in l8ui. The ERP project only has integration glue (activation + section HTML).

2. **AI is optional**: The heuristic provider works without any external AI service. LLM integration is a pluggable provider set at startup.

3. **No dry run — test on staging instead**: Rather than threading a "dry run" flag through the cache, callbacks, ORM, and After hooks, templates are developed and tested on staging with real imports. Tested templates are exported as JSON and imported into production via the Transfer tab. This is simpler, more reliable, and tests the full pipeline including After() hooks and cache behavior.

4. **Row-by-row import, not all-or-nothing**: Valid rows import even if some fail. Users get an error report for failed rows. This is more practical for large imports where a few bad rows shouldn't block the entire batch.

5. **Templates are reusable and portable**: Once a mapping is defined for a source system, it can be reused for future imports and transferred between environments. This is the key UX improvement over one-off column mapping.

6. **Multi-format support**: CSV, JSON, XML from day one. The `FileParser` abstraction normalizes all formats to the same `ParsedFile` structure, so the rest of the pipeline is format-agnostic.

7. **Template transfer replaces dry run**: Export/import of templates between staging and production environments. Templates carry no environment-specific data (IDs are regenerated on import, audit info is stripped on export). The overwrite flag handles the "update existing template" case.
