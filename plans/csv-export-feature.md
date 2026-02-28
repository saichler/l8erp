# Plan: CSV Export Feature (Backend Service + UI Component)

## Context

Phase C item 3 from MISSING-FEATURES.md. Currently the system has no data export capability. Users need to export table data as CSV files. The feature must be generic — working for all 242 services without per-model code.

**User requirements:**
- Backend service (not client-side generation)
- Proto types in **l8types** (generic, not ERP-specific)
- UI components in **l8ui** (generic, not ERP-specific)
- Request contains model type name + service name + area (NOT a raw query)
- Server builds paginated queries internally (`select * from ModelType limit 500 page N`)
- Server uses the introspector to get the node and its attributes for column headers
- Page through results until an empty page is returned

## Architecture

```
UI (Export Button click)
  → POST /erp/0/CsvExport  { modelType: "Employee", serviceName: "Employee", serviceArea: 30 }
  → CsvExportHandler.Post()
      → introspector.NodeByTypeName("Employee")  → L8Node with Attributes map
      → loop:
            query = "select * from Employee limit 500 page N"
            object.NewQuery(query) → handler.Get(elems) → resp.Elements()
            extract field values per attribute → append CSV rows
            N++ until len(Elements()) == 0
      → return L8CsvExportResponse { csvData, filename, rowCount }
  → UI receives response → triggers browser file download
```

---

## Part 1: Proto Types (in l8types project)

**File: `l8types/proto/api.proto`** — Add two messages:

```protobuf
message L8CsvExportRequest {
    string model_type = 1;      // Protobuf type name (e.g., "Employee")
    string service_name = 2;    // ServiceName constant (e.g., "Employee")
    int32 service_area = 3;     // ServiceArea (e.g., 30 for HCM)
}

message L8CsvExportResponse {
    string csv_data = 1;        // Full CSV content (headers + rows)
    string filename = 2;        // Suggested filename (e.g., "Employee_2026-02-28.csv")
    int32 row_count = 3;        // Total rows exported
}
```

After adding: `cd l8types/proto && ./make-bindings.sh`, then `cd l8erp/go && go mod vendor`

---

## Part 2: Backend Service (3 new files in l8erp)

### File 1: `go/erp/common/csvexport/CsvExportService.go` (~45 lines)

- `ServiceName = "CsvExport"`, `ServiceArea = byte(0)`
- `Activate(vnic ifs.IVNic)` — custom activation (no DB needed):
  - Creates SLA with `&CsvExportHandler{}` as service point handler
  - Registers POST endpoint: `L8CsvExportRequest` → `L8CsvExportResponse`
  - Calls `vnic.Resources().Services().Activate(sla, vnic)`

### File 2: `go/erp/common/csvexport/CsvExportHandler.go` (~130 lines)

Implements `ifs.IServiceHandler`. Only `Post()` has logic; all other methods return nil/error.

**Post() logic:**

1. Type-assert element to `*l8api.L8CsvExportRequest`
2. Get node: `vnic.Resources().Introspector().NodeByTypeName(req.ModelType)`
3. Build sorted header list from `node.Attributes` — skip nested struct/slice/map attributes (not CSV-friendly)
4. Get target handler: `vnic.Resources().Services().ServiceHandler(req.ServiceName, byte(req.ServiceArea))`
5. Paginated fetch loop:
   ```go
   page, limit := 0, 500
   var rows [][]string
   for {
       q := fmt.Sprintf("select * from %s limit %d page %d", req.ModelType, limit, page)
       elems, _ := object.NewQuery(q, vnic.Resources())
       resp := handler.Get(elems, vnic)
       items := resp.Elements()
       if len(items) == 0 { break }
       for _, item := range items {
           rows = append(rows, extractRow(item, headers, node, vnic.Resources()))
       }
       page++
   }
   ```
6. Build CSV string, return `L8CsvExportResponse{CsvData, Filename, RowCount}`

**Other IServiceHandler methods:** `Activate` stores SLA + returns nil. `DeActivate`, `Get`, `Put`, `Patch`, `Delete`, `GetCopy`, `Failed` return nil. `TransactionConfig` returns nil. `WebService` returns `sla.WebService()`.

### File 3: `go/erp/common/csvexport/csv_formatter.go` (~90 lines)

- `buildHeaders(node *l8reflect.L8Node) []string` — sorted attribute names, skip IsSlice/IsMap/IsStruct children
- `extractRow(item interface{}, headers []string, node *l8reflect.L8Node, resources ifs.IResources) []string` — use Go reflect to read fields by name from protobuf struct
- `formatValue(val interface{}) string`:
  - `*erp.Money` → decimal amount string
  - `int64` (timestamp fields) → `time.Unix(v,0).Format("2006-01-02")`
  - `bool` → "true"/"false"
  - `int32` (enum) → numeric string
  - `nil` / zero → ""
- `escapeCSV(s string) string` — RFC 4180 quoting (commas, quotes, newlines)
- `buildCSV(headers []string, rows [][]string) string` — join with commas and newlines

---

## Part 3: Service Activation

**File: `go/erp/ui/main1/main.go`** — Add after VNic creation (line ~44):
```go
csvexport.Activate(nic1)
```

**File: `go/erp/ui/main2/main2.go`** — Same addition.

---

## Part 4: Desktop UI Component (in l8ui)

### File: `go/erp/ui/web/l8ui/shared/layer8d-csv-export.js` (~80 lines)

Global: `window.Layer8DCsvExport`

```javascript
Layer8DCsvExport.export = function(options) {
    // options: { modelName, serviceName, serviceArea, filename }
    // 1. Show "Exporting..." notification
    // 2. POST to /erp/0/CsvExport with JSON body:
    //    { modelType: options.modelName, serviceName: options.serviceName, serviceArea: options.serviceArea }
    // 3. On success: parse response, create Blob from csvData
    // 4. Create hidden <a href=blobURL download=filename>, click it, revoke URL
    // 5. Show "Exported N rows" notification
    // 6. On error: show error notification
}
```

### Integration: Export button in table pagination bar

**File: `go/erp/ui/web/l8ui/edit_table/layer8d-table-render.js`**

In `renderPagination()`, add export button next to the Add button:
```javascript
const exportButton = `<button class="l8-btn l8-btn-secondary l8-btn-small" data-action="export" title="Export CSV">↓ Export</button>`;
```

**File: `go/erp/ui/web/l8ui/edit_table/layer8d-table-core.js`**

Add click handler for `data-action="export"` in existing event delegation:
```javascript
if (action === 'export') {
    Layer8DCsvExport.export({
        modelName: this.modelName,
        serviceName: this.endpoint.split('/').pop(),    // last segment
        serviceArea: parseInt(this.endpoint.split('/')[2]), // area segment
        filename: this.modelName
    });
}
```

---

## Part 5: Mobile UI Component (in l8ui)

### File: `go/erp/ui/web/l8ui/m/js/layer8m-csv-export.js` (~60 lines)

Same `Layer8MCsvExport.export()` logic — POST, download blob. Uses mobile notification if available.

### Integration in mobile table

**File: `go/erp/ui/web/l8ui/m/js/layer8m-table.js`**

Add export button to mobile table header/action area with same click handler pattern.

---

## Part 6: Script Includes

**File: `go/erp/ui/web/app.html`** — Add after table scripts, before view-factory:
```html
<script src="l8ui/shared/layer8d-csv-export.js"></script>
```

**File: `go/erp/ui/web/m/app.html`** — Add in mobile script section:
```html
<script src="l8ui/m/js/layer8m-csv-export.js"></script>
```

---

## Part 7: GUIDE.md Update

**File: `go/erp/ui/web/l8ui/GUIDE.md`** — Add section documenting:
- `Layer8DCsvExport.export(options)` API (desktop)
- `Layer8MCsvExport.export(options)` API (mobile)
- Options: `modelName`, `serviceName`, `serviceArea`, `filename`
- Backend endpoint: `POST /erp/0/CsvExport`

---

## Files Summary

| # | File | Action | ~Lines |
|---|------|--------|--------|
| 1 | `l8types/proto/api.proto` | Modify | +12 |
| 2 | `go/erp/common/csvexport/CsvExportService.go` | Create | 45 |
| 3 | `go/erp/common/csvexport/CsvExportHandler.go` | Create | 130 |
| 4 | `go/erp/common/csvexport/csv_formatter.go` | Create | 90 |
| 5 | `go/erp/ui/main1/main.go` | Modify | +2 |
| 6 | `go/erp/ui/main2/main2.go` | Modify | +2 |
| 7 | `l8ui/shared/layer8d-csv-export.js` | Create | 80 |
| 8 | `l8ui/edit_table/layer8d-table-render.js` | Modify | +3 |
| 9 | `l8ui/edit_table/layer8d-table-core.js` | Modify | +15 |
| 10 | `l8ui/m/js/layer8m-csv-export.js` | Create | 60 |
| 11 | `l8ui/m/js/layer8m-table.js` | Modify | +10 |
| 12 | `app.html` | Modify | +1 |
| 13 | `m/app.html` | Modify | +1 |
| 14 | `l8ui/GUIDE.md` | Modify | +30 |

## Key References

| What | Where |
|------|-------|
| `IIntrospector.NodeByTypeName()` | `vendor/.../l8types/go/ifs/Introspector.go:34` |
| `L8Node.Attributes` | `vendor/.../l8types/go/types/l8reflect/reflect.pb.go:138` |
| `object.NewQuery()` | `vendor/.../l8srlz/go/serialize/object/Elements.go:58` |
| `IServiceHandler` lookup | `go/erp/common/service_factory.go:80` |
| `IElements.Elements()` | `vendor/.../l8types/go/ifs/API.go:36` |
| Table pagination render | `l8ui/edit_table/layer8d-table-render.js:72` |
| Existing custom SLA pattern | `go/erp/ui/main1/main.go:54` |

## Verification

1. `cd l8types/proto && ./make-bindings.sh` — generate new proto types
2. `cd l8erp/go && go mod vendor` — update vendored l8types
3. `go build ./erp/common/csvexport/` — compile new service
4. `go build ./erp/ui/main1/` — compile with activation
5. `go vet ./erp/...` — static analysis
6. `node -c` on all new/modified JS files — syntax check
7. Start server → open any table → click Export → CSV downloads with correct headers and all rows
