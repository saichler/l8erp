# Plan: File Upload Component (Phase C.4) — v4

## Context

Phase C.4 from MISSING-FEATURES.md. The DOC module has 11 fully implemented services with metadata fields for files (`fileName`, `fileSize`, `mimeType`, `storagePath`, `checksum`) — but **zero** infrastructure for actually uploading, storing, or downloading file content.

**Constraint**: 5MB max file size. Base64 overhead (~33%) → ~6.7MB max JSON payload.

**Prerequisite**: The CsvExport service (currently in `l8erp/go/erp/common/csvexport/`) is also a generic Layer 8 service — it uses only introspector, L8Query, and service handlers, nothing ERP-specific. It must be moved to `l8services` first, alongside the new FileStore service.

---

## Phase 0: Move CsvExport to l8services

### 0a. Create in l8services

**Location**: `l8services/go/services/csvexport/`

Following the l8services file-per-method convention, the existing 3 files map to:

| l8erp source | l8services target |
|---|---|
| `CsvExportService.go` (39 lines) | `CsvExport.go` — struct, Activate(), constants |
| `CsvExportHandler.go` (130 lines) | `CsvExportPost.go` — Post() logic (~70 lines) |
| | `CsvExportStubs.go` — Put/Patch/Delete/Get/Failed/etc. (~40 lines) |
| `csv_formatter.go` (151 lines) | `CsvFormatter.go` — buildHeaders, extractRow, formatValue, buildCSV (unchanged) |

**Rename**: `CsvExportHandler` struct → `CsvExport` (matches l8services naming: `BaseService`, `DCache`, etc.)

**No logic changes** — just package move + struct rename. All imports (`l8types`, `l8srlz`, `l8utils`, `l8reflect`) are already in l8services' `go.mod`.

### 0b. Delete from l8erp

Delete the directory: `go/erp/common/csvexport/`

### 0c. Update l8erp imports

**File: `go/erp/ui/main1/main.go`**:
```go
// BEFORE:
import "github.com/saichler/l8erp/go/erp/common/csvexport"
csvexport.Activate(nic1)

// AFTER:
import "github.com/saichler/l8services/go/services/csvexport"
csvexport.Activate(nic1)
```

**File: `go/erp/ui/main2/main2.go`** — Same change.

### 0d. Vendor update

```bash
cd l8erp/go && go mod vendor
```

### 0e. Verify

```bash
go build ./erp/ui/main1/ && go vet ./erp/...
```

The JS component (`layer8-csv-export.js`) stays in l8erp's l8ui — it calls `POST /erp/0/CsvExport` which works regardless of where the backend service lives.

---

## Part 1: Proto Types (in l8types project)

**File: `l8types/proto/api.proto`** — Add messages:

```protobuf
message L8FileUploadRequest {
    string file_name = 1;       // Original filename
    string mime_type = 2;       // e.g., "application/pdf"
    bytes file_data = 3;        // File content (base64 in JSON, max 5MB)
    string document_id = 4;     // For storage path organization
    int32 version = 5;          // Version number
}

message L8FileUploadResponse {
    string storage_path = 1;    // Server path where file was stored
    string file_name = 2;       // Original filename
    int64 file_size = 3;        // Size in bytes
    string mime_type = 4;       // MIME type
    string checksum = 5;        // SHA-256 hash
}

message L8FileDownloadRequest {
    string storage_path = 1;    // Path to retrieve
}

message L8FileDownloadResponse {
    bytes file_data = 1;        // File content (base64 in JSON)
    string file_name = 2;       // Original filename
    string mime_type = 3;       // MIME type
    int64 file_size = 4;        // Size in bytes
}
```

After adding: `cd l8types/proto && ./make-bindings.sh`, then update vendors downstream.

---

## Part 2: FileStore Backend Service (in l8services project)

**Location**: `l8services/go/services/filestore/`

### File 1: `FileStore.go` (~50 lines)

Main struct, Activate/DeActivate, constants.

```go
package filestore

const (
    ServiceName = "FileStore"
    ServiceArea = byte(0)
    MaxFileSize = 5 * 1024 * 1024  // 5MB
)

var StorageRoot = "/data/l8files"  // configurable via SetStorageRoot()

type FileStore struct {
    sla *ifs.ServiceLevelAgreement
}

func SetStorageRoot(path string) {
    StorageRoot = path
}

func Activate(vnic ifs.IVNic) {
    vnic.Resources().Registry().Register(&l8api.L8FileUploadRequest{})
    vnic.Resources().Registry().Register(&l8api.L8FileUploadResponse{})
    vnic.Resources().Registry().Register(&l8api.L8FileDownloadRequest{})
    vnic.Resources().Registry().Register(&l8api.L8FileDownloadResponse{})

    handler := &FileStore{}
    sla := ifs.NewServiceLevelAgreement(handler, ServiceName, ServiceArea, false, nil)

    ws := web.New(ServiceName, ServiceArea, 0)
    ws.AddEndpoint(&l8api.L8FileUploadRequest{}, ifs.POST, &l8api.L8FileUploadResponse{})
    ws.AddEndpoint(&l8api.L8FileDownloadRequest{}, ifs.PUT, &l8api.L8FileDownloadResponse{})
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}

func (this *FileStore) Activate(sla *ifs.ServiceLevelAgreement, vnic ifs.IVNic) error {
    this.sla = sla
    return nil
}

func (this *FileStore) DeActivate() error { return nil }
```

### File 2: `FileStorePost.go` (~70 lines)

Upload handler — receives file bytes, validates size, computes SHA-256, stores to disk.

```go
func (this *FileStore) Post(elems ifs.IElements, vnic ifs.IVNic) ifs.IElements {
    req, ok := elems.Element().(*l8api.L8FileUploadRequest)
    // Validate: type, fileData not empty, <= MaxFileSize, fileName required
    // sha256.Sum256(req.FileData) → checksum
    // filepath.Join(StorageRoot, documentId, version, fileName) → storagePath
    // os.MkdirAll + os.WriteFile
    // Return L8FileUploadResponse
}
```

### File 3: `FileStorePut.go` (~50 lines)

Download handler — validates path under StorageRoot, reads file, returns bytes.

```go
func (this *FileStore) Put(elems ifs.IElements, vnic ifs.IVNic) ifs.IElements {
    req, ok := elems.Element().(*l8api.L8FileDownloadRequest)
    // Validate: type, storagePath not empty
    // filepath.Clean → prevent traversal
    // strings.HasPrefix(cleanPath, StorageRoot) → access control
    // os.ReadFile → data
    // Return L8FileDownloadResponse
}
```

### File 4: `FileStoreStubs.go` (~40 lines)

Unused IServiceHandler methods — Patch/Delete/Get/GetCopy/Failed return nil or error. WebService() returns `this.sla.WebService()`. TransactionConfig() returns nil.

### File 5: `FileStoreUtils.go` (~35 lines)

`detectMimeType(fileName string) string` — maps file extensions to MIME types.

---

## Part 3: ERP Integration — Service Activation

After `go mod vendor` in l8erp:

**File: `go/erp/ui/main1/main.go`** — Add after csvexport.Activate:
```go
filestore.Activate(nic1)
```

**File: `go/erp/ui/main2/main2.go`** — Same addition.

---

## Part 4: Desktop UI — File Upload Shared Component

### File: `go/erp/ui/web/l8ui/shared/layer8-file-upload.js` (~130 lines)

Global: `window.Layer8FileUpload`

```javascript
Layer8FileUpload = {
    MAX_FILE_SIZE: 5 * 1024 * 1024,  // 5MB

    /**
     * Upload a file via the FileStore protobuf service.
     * Reads file as ArrayBuffer → base64 → POST /erp/0/FileStore
     */
    upload: function(file, documentId, version) {
        // Client-side size validation
        // FileReader.readAsArrayBuffer → btoa → fetch POST
        // Returns Promise<{ storagePath, fileName, fileSize, mimeType, checksum }>
    },

    /**
     * Download a file via the FileStore protobuf service.
     * PUT /erp/0/FileStore → base64 response → Blob → browser download
     */
    download: function(storagePath, fileName) {
        // fetch PUT → atob → Uint8Array → Blob → <a download>
    },

    formatSize: function(bytes) {
        // B / KB / MB / GB display
    }
};
```

---

## Part 5: Desktop UI — Form Field Type `file`

### 5a. Form Factory Method

**File: `l8ui/shared/layer8-form-factory.js`** — Add:
```javascript
file: function(key, label, required) {
    const field = { key: key, label: label || this._toTitleCase(key), type: 'file' };
    if (required) field.required = true;
    return [field];
},
```

### 5b. Field Rendering

**File: `l8ui/shared/layer8d-forms-fields.js`** — Add `case 'file':` in `generateFieldHtml()`:
- Read-only: file name + size + Download button
- Editable: existing file info (if any) + drop area with `<input type="file">` + status text
- Drop area text: "Drop file here or click to browse (max 5MB)"

### 5c. Data Collection

**File: `l8ui/shared/layer8d-forms-data.js`**:
1. Add `'file'` to compound field guard
2. Add `case 'file':` — reads `dropArea.dataset.uploadResult`, spreads `storagePath`, `fileName`, `fileSize`, `mimeType`, `checksum` onto the data object

### 5d. Upload Trigger on File Select / Drop

**File: `l8ui/shared/layer8d-forms-fields-ext.js`** — Add:
- `attachFileUploadHandlers(formContainer)` — wires change + dragover/dragleave/drop events
- `triggerFileUpload(file, key, dropArea)` — validates size, calls `Layer8FileUpload.upload()`, stores result in `dropArea.dataset.uploadResult`, updates status text

---

## Part 6: CSS

**File: `go/erp/ui/web/l8ui/shared/layer8-file-upload.css`** (~40 lines)

Uses `--layer8d-*` theme tokens:
- `.l8-file-drop-area` — dashed border, rounded, hover/drag highlight
- `.l8-file-drag-over` — primary border color + light background
- `.l8-file-drop-text` — muted text
- `.l8-file-status` — upload status text
- `.l8-file-existing` — current file info row
- `.l8-file-display` — read-only file info + download button

---

## Part 7: Mobile UI

**File: `l8ui/m/js/layer8m-forms-fields.js`** — Add `renderFileField()`:
- Read-only: file name + download button
- Editable: native `<input type="file">` (mobile shows camera/gallery picker) + status text
- Client-side 5MB validation
- No drag-and-drop (not practical on touch)

---

## Part 8: DOC Module Form Integration

**File: `go/erp/ui/web/documents/storage/storage-forms.js`**

Replace `f.text('storagePath', 'Storage Path')` with `f.file('storagePath', 'File')`.

The file field type uploads on select and populates `storagePath`, `fileName`, `fileSize`, `mimeType`, `checksum` on the DocDocument when saving.

---

## Part 9: Script Includes

**File: `app.html`** — Add CSS + JS includes for `layer8-file-upload`
**File: `m/app.html`** — Same

---

## Part 10: GUIDE.md Update

Document `Layer8FileUpload` API, `f.file()` factory method, backend service endpoints, CSS classes.

---

## Files Summary

### Phase 0: CsvExport migration

| # | Project | File | Action |
|---|---------|------|--------|
| 0a | l8services | `go/services/csvexport/CsvExport.go` | Create (~45 lines) |
| 0b | l8services | `go/services/csvexport/CsvExportPost.go` | Create (~70 lines) |
| 0c | l8services | `go/services/csvexport/CsvExportStubs.go` | Create (~40 lines) |
| 0d | l8services | `go/services/csvexport/CsvFormatter.go` | Create (~150 lines) |
| 0e | l8erp | `go/erp/common/csvexport/` | Delete (3 files) |
| 0f | l8erp | `go/erp/ui/main1/main.go` | Modify import path |
| 0g | l8erp | `go/erp/ui/main2/main2.go` | Modify import path |

### Parts 1-10: FileStore + UI

| # | Project | File | Action |
|---|---------|------|--------|
| 1 | l8types | `proto/api.proto` | Modify (+20 lines) |
| 2 | l8services | `go/services/filestore/FileStore.go` | Create (~50 lines) |
| 3 | l8services | `go/services/filestore/FileStorePost.go` | Create (~70 lines) |
| 4 | l8services | `go/services/filestore/FileStorePut.go` | Create (~50 lines) |
| 5 | l8services | `go/services/filestore/FileStoreStubs.go` | Create (~40 lines) |
| 6 | l8services | `go/services/filestore/FileStoreUtils.go` | Create (~35 lines) |
| 7 | l8erp | `go/erp/ui/main1/main.go` | Modify (+2 lines) |
| 8 | l8erp | `go/erp/ui/main2/main2.go` | Modify (+2 lines) |
| 9 | l8erp | `l8ui/shared/layer8-file-upload.js` | Create (~130 lines) |
| 10 | l8erp | `l8ui/shared/layer8-file-upload.css` | Create (~40 lines) |
| 11 | l8erp | `l8ui/shared/layer8-form-factory.js` | Modify (+8 lines) |
| 12 | l8erp | `l8ui/shared/layer8d-forms-fields.js` | Modify (+30 lines) |
| 13 | l8erp | `l8ui/shared/layer8d-forms-data.js` | Modify (+15 lines) |
| 14 | l8erp | `l8ui/shared/layer8d-forms-fields-ext.js` | Modify (+40 lines) |
| 15 | l8erp | `l8ui/m/js/layer8m-forms-fields.js` | Modify (+30 lines) |
| 16 | l8erp | `documents/storage/storage-forms.js` | Modify (+1 line) |
| 17 | l8erp | `app.html` | Modify (+2 lines) |
| 18 | l8erp | `m/app.html` | Modify (+2 lines) |
| 19 | l8erp | `l8ui/GUIDE.md` | Modify (+40 lines) |

## Implementation Order

1. **l8types**: Add FileStore proto messages → `make-bindings.sh`
2. **l8services**: Move CsvExport (4 files) → `go build` + `go vet`
3. **l8services**: Create FileStore (5 files) → `go build` + `go vet`
4. **l8erp**: `go mod vendor` (picks up l8types + l8services)
5. **l8erp**: Delete `go/erp/common/csvexport/`, update main.go imports
6. **l8erp**: Add `filestore.Activate(nic1)` to main.go
7. **l8erp**: UI components (JS/CSS/forms) → `node -c` syntax checks
8. **l8erp**: `go build ./erp/ui/main1/` → verify

## Key References

| What | Where |
|------|-------|
| CsvExport current code | `l8erp/go/erp/common/csvexport/` (3 files, ~320 lines) |
| l8services BaseService | `l8services/go/services/base/BaseService.go` |
| l8services DCache | `l8services/go/services/dcache/DCache.go` |
| l8services go.mod | has l8types, l8srlz, l8utils, l8reflect — all CsvExport deps |
| DocDocument proto | `l8erp/proto/doc-storage.proto:35` |
| Form factory | `l8ui/shared/layer8-form-factory.js` |
| Form field rendering | `l8ui/shared/layer8d-forms-fields.js` |
| Form data collection | `l8ui/shared/layer8d-forms-data.js` |

## Verification

1. `cd l8types/proto && ./make-bindings.sh`
2. `cd l8services/go && go build ./services/csvexport/ && go build ./services/filestore/ && go vet ./services/...`
3. `cd l8erp/go && go mod vendor && go build ./erp/ui/main1/`
4. `node -c` on all new/modified JS files
5. Test CsvExport still works (any table → Export → CSV downloads)
6. Test FileStore: DocDocument form → select file (< 5MB) → upload → save → download
7. Test > 5MB file → client rejects before upload
