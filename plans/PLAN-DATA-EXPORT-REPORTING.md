# Plan: Data Export & Reporting

## Context

The MISSING-FEATURES.md identifies Data Export & Reporting as a significant gap. Currently only CSV export exists (backend `CsvExport` service + `Layer8CsvExport` JS component). The gap covers: Excel/PDF export, print-friendly views, financial reports (balance sheet, P&L, trial balance, etc.), module-specific reports, report builder, scheduled reports, and email distribution.

The BI module already has extensive proto types for reports (`BiReport`, `BiReportSchedule`, `BiReportExecution`, `BiReportTemplate`) but no execution engine. Financial data structures exist (`Account` with `AccountBalance`, `JournalEntry` with lines, `Budget` with variance fields, `FiscalYear`/`FiscalPeriod`). The l8notify infrastructure has email/webhook channels but no ERP-specific wiring yet.

---

## Phase 1: Excel Export Service

**Goal:** Add Excel export alongside existing CSV export, following the same architectural pattern.

### 1.1 Proto Types (in `l8types` — upstream)

Add to `api.proto` (or a new `export.proto` in the l8types repo):

```protobuf
message L8ExcelExportRequest {
  string model_type = 1;
  string service_name = 2;
  int32 service_area = 3;
}

message L8ExcelExportResponse {
  bytes file_data = 1;       // Binary Excel file (base64 in JSON transport)
  string filename = 2;
  int32 row_count = 3;
}
```

**Dependency:** Add `github.com/xuri/excelize/v2` to l8services vendor for `.xlsx` generation.

### 1.2 Backend Service (in `l8services`)

New service: `go/vendor/github.com/saichler/l8services/go/services/excelexport/`

Files (following CsvExport pattern):
- `ExcelExport.go` — Service registration, `ServiceName = "XlsExport"`, `ServiceArea = 0`
- `ExcelExportPost.go` — Paginated data fetch (reuse CsvExport's pagination pattern), build Excel workbook
- `ExcelFormatter.go` — Use introspector L8Node to discover scalar fields, format values, create styled header row + data rows
- `ExcelExportStubs.go` — Stub unsupported methods

Key differences from CSV:
- Returns `bytes` (binary) instead of `string`
- Adds column auto-width, header styling (bold, background color)
- Date fields formatted as Excel date type
- Money fields formatted as currency

### 1.3 Frontend Component

New file: `l8ui/shared/layer8-excel-export.js`

- Same API as `Layer8CsvExport.export({modelName, serviceName, serviceArea, filename})`
- POST to `/0/XlsExport`
- Handle binary response (base64 decode → Blob with `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` MIME)
- Download via same anchor-click pattern

### 1.4 Table Integration

- Add "Export Excel" button next to existing CSV export button in `layer8d-table-events.js` and `layer8m-table.js`
- Both buttons in a dropdown or side-by-side

### 1.5 Activation

- Register in `go/erp/ui/main/main.go`: `excelexport.Activate(nic1)`
- Add script include in `app.html` and `m/app.html`

---

## Phase 2: PDF Export Service

**Goal:** Server-side PDF generation for any model type.

### 2.1 Proto Types (in `l8types`)

```protobuf
message L8PdfExportRequest {
  string model_type = 1;
  string service_name = 2;
  int32 service_area = 3;
  string title = 4;           // Report title (optional)
  bool landscape = 5;         // Landscape orientation (default portrait)
}

message L8PdfExportResponse {
  bytes file_data = 1;
  string filename = 2;
  int32 row_count = 3;
}
```

**Dependency:** Add `github.com/jung-kurt/gofpdf` (or `github.com/go-pdf/fpdf`) to l8services vendor.

### 2.2 Backend Service (in `l8services`)

New service: `go/vendor/github.com/saichler/l8services/go/services/pdfexport/`

Files:
- `PdfExport.go` — `ServiceName = "PdfExport"`, `ServiceArea = 0`
- `PdfExportPost.go` — Paginated fetch, build PDF document
- `PdfFormatter.go` — Table layout with headers, auto-sized columns, page breaks, date in footer
- `PdfExportStubs.go`

### 2.3 Frontend + Integration

- `l8ui/shared/layer8-pdf-export.js` — Same pattern, `application/pdf` MIME
- Add "Export PDF" button to table pagination bar (alongside CSV + Excel)

---

## Phase 3: Print-Friendly Views

**Goal:** CSS-based print optimization so users can Ctrl+P any table or detail view.

### 3.1 Print Stylesheet

New file: `l8ui/shared/layer8-print.css`

- `@media print` rules that:
  - Hide sidebar, header, navigation, pagination controls, action buttons
  - Show table at full width with borders
  - Force white background, black text
  - Page break rules for tables
  - Show detail/form views cleanly

### 3.2 Print Button

- Add a "Print" button (`window.print()`) to the table toolbar
- No backend changes needed

---

## Phase 4: Financial Reports (FIN Module)

**Goal:** Server-side report generation for standard financial statements. These are computed aggregations over existing Account, AccountBalance, JournalEntry, and Budget data.

### 4.1 New Proto Types

New file: `proto/fin-reports.proto`

```protobuf
message FinReportRequest {
  string report_type = 1;          // "balance_sheet", "income_statement", "trial_balance", etc.
  string fiscal_period_id = 2;     // Period to report on
  string fiscal_year_id = 3;       // Year context
  string department_id = 4;        // Optional department filter
  string currency_id = 5;          // Reporting currency
}

message FinReportResponse {
  string report_type = 1;
  string title = 2;
  string period_name = 3;
  string generated_at = 4;
  repeated FinReportSection sections = 5;
  erp.Money grand_total = 6;
}

message FinReportSection {
  string title = 1;                // e.g., "Assets", "Liabilities", "Revenue"
  repeated FinReportLine lines = 2;
  erp.Money section_total = 3;
}

message FinReportLine {
  string account_id = 1;
  string account_number = 2;
  string account_name = 3;
  int32 level = 4;                 // Indentation level
  bool is_header = 5;              // Header/subtotal row
  erp.Money amount = 6;
  erp.Money budget_amount = 7;     // For budget vs actual
  erp.Money variance = 8;
  double variance_percent = 9;
  erp.Money prior_period = 10;     // For comparative
}
```

Also add `FinReportResponseList` with standard list convention.

### 4.2 Report Service

New directory: `go/erp/fin/finreports/`

- `FinReportService.go` — `ServiceName = "FinReport"`, `ServiceArea = 40`
- `FinReportPost.go` — POST handler that dispatches by `report_type`:
  - `generateBalanceSheet()` — Assets/Liabilities/Equity accounts, ending balances for period
  - `generateIncomeStatement()` — Revenue/Expense accounts, period activity
  - `generateTrialBalance()` — All accounts, debit/credit balances
  - `generateBudgetVsActual()` — Budget lines with actual amounts and variance
  - `generateAgedReceivables()` — Open SalesInvoices grouped by aging buckets (0-30, 31-60, 61-90, 90+)
  - `generateAgedPayables()` — Open PurchaseInvoices grouped by aging buckets
  - `generateGLDetail()` — JournalEntry lines for a specific account + period
- `report_balance_sheet.go` — Fetches Accounts (type=ASSET,LIABILITY,EQUITY) + AccountBalances for period, builds hierarchy
- `report_income_statement.go` — Fetches Accounts (type=REVENUE,EXPENSE) + period activity
- `report_trial_balance.go` — All accounts with debit/credit ending balances
- `report_budget_vs_actual.go` — Budget lines joined with AccountBalance actuals
- `report_aged_ar.go` — Open SalesInvoices, group by days outstanding
- `report_aged_ap.go` — Open PurchaseInvoices, group by days outstanding
- `report_gl_detail.go` — JournalEntryLines filtered by account + period

Each report function uses `common.GetEntities` / L8Query to fetch data, then builds `FinReportResponse`.

### 4.3 UI — Financial Reports Tab

New sub-section under FIN module: "Reports"

Desktop: `go/erp/ui/web/fin/reports/` with:
- `fin-reports-config.js` — Report type selector + parameter form
- `fin-reports-viewer.js` — Renders `FinReportResponse` as a formatted HTML table with section headers, indentation, totals
- Export buttons: PDF, Excel, CSV (reuse Phase 1-2 services, or direct client-side rendering for the formatted report)

Mobile: Equivalent viewer in `go/erp/ui/web/m/js/fin/`

### 4.4 Navigation

- Add "Reports" service entry to FIN section config (`fin-section-config.js`)
- Add to mobile nav config

---

## Phase 5: Module-Specific Reports

**Goal:** Lightweight, query-based reports for each module using the same `FinReportResponse` structure (renamed to a generic report response) or module-specific report types.

### 5.1 Generic Report Response

Rename/generalize: Create `L8ReportRequest` / `L8ReportResponse` in `api.proto` (l8types) so any module can return structured report data. OR keep `FinReport*` types for FIN and create a shared `L8Report*` for cross-module use.

### 5.2 Module Report Services

Each module gets a report service (one file each, ~100-200 lines) that computes aggregations:

| Module | Service | Reports |
|--------|---------|---------|
| HCM | `HcmReport` (area 30) | Headcount by dept, turnover rate, compensation summary, leave balances |
| SCM | `ScmReport` (area 50) | Inventory valuation, stock aging, purchase analysis |
| Sales | `SalesReport` (area 60) | Sales by region/product/customer, pipeline summary, quota attainment |
| MFG | `MfgReport` (area 70) | Production efficiency, scrap rates, capacity utilization |
| CRM | `CrmReport` (area 80) | Lead conversion rate, case resolution time, customer satisfaction |
| PRJ | `PrjReport` (area 90) | Resource utilization, budget burn, milestone tracking |

Each follows the same pattern as Phase 4: POST with report type + filters, returns structured sections/lines.

### 5.3 UI Integration

- Add "Reports" sub-section to each module's section config
- Reuse the report viewer component from Phase 4 (parameterized for any module)
- Each module's report page: dropdown to select report type, parameter inputs, "Generate" button, rendered results with export options

---

## Phase 6: Report Builder (BI Module Wiring)

**Goal:** Wire the existing BI `BiReport` types to an execution engine so users can define and run ad-hoc reports.

### 6.1 Report Execution Engine

New file: `go/erp/bi/reports/report_executor.go`

- `ExecuteReport(report *bi.BiReport, vnic ifs.IVNic) (*bi.BiReportExecution, error)`
- Parses `report.Query` as L8Query
- Executes against the appropriate service (determined by model type in query)
- Formats results based on `report.DefaultFormat` (CSV/Excel/PDF)
- Creates `BiReportExecution` record with results

### 6.2 After-Hook on BiReport

- When BiReport status changes to PUBLISHED, validate the query is parseable
- POST to BiReport with `status=EXECUTE` (or a separate execute endpoint) triggers execution

### 6.3 UI — Report Builder Page

Enhanced BI Reports section:
- Query editor (textarea with L8Query syntax)
- "Run" button → POST to execute
- Results rendered in table or chart (based on report type)
- "Export" dropdown (CSV/Excel/PDF) for results
- Execution history tab (existing `BiReportExecution` inline table)

---

## Phase 7: Scheduled Reports & Email Distribution

**Goal:** Periodic report execution with email delivery.

### 7.1 Report Scheduler

New file: `go/erp/bi/reports/report_scheduler.go`

- Background goroutine started on service activation
- Periodically checks `BiReportSchedule` records where `is_active=true` and `next_run <= now`
- For each due schedule: execute the parent report, update `last_run`, compute `next_run`
- Create `BiReportExecution` record

### 7.2 Email Delivery

New file: `go/erp/bi/reports/report_email.go`

- After successful execution, if schedule has `delivery_email`:
  - Attach the generated file (CSV/Excel/PDF based on `output_format`)
  - Send via Go `net/smtp` (configurable SMTP settings)
  - Also deliver to all `BiReportSubscription` subscribers

### 7.3 SMTP Configuration

- Add SMTP config to system settings (host, port, username, password, from address)
- Or leverage l8notify's existing `SmtpConfig` if it can be wired

---

## Phase 8: End-to-End Verification

For every phase:
1. Build: `cd go && go build ./...`
2. Verify no regressions: existing CSV export still works
3. Test each new export format end-to-end via the UI
4. Test financial reports with mock data (accounts, journal entries, budgets exist)
5. Test report builder: create a BiReport, execute it, verify results
6. Test scheduled reports: create schedule, verify execution fires, email sent

---

## Traceability Matrix

| # | Gap (from MISSING-FEATURES.md) | Phase |
|---|-------------------------------|-------|
| 1 | Excel Export | Phase 1 |
| 2 | PDF Export | Phase 2 |
| 3 | Print-Friendly Views | Phase 3 |
| 4 | Balance Sheet | Phase 4 |
| 5 | Income Statement / P&L | Phase 4 |
| 6 | Cash Flow Statement | Phase 4 (deferred — requires dedicated transaction tracking beyond current types) |
| 7 | Trial Balance | Phase 4 |
| 8 | Aged Receivables / Payables | Phase 4 |
| 9 | General Ledger Detail | Phase 4 |
| 10 | Budget vs Actual | Phase 4 |
| 11 | HCM reports (headcount, turnover, compensation, leave) | Phase 5 |
| 12 | SCM reports (inventory valuation, stock aging, purchase) | Phase 5 |
| 13 | Sales reports (by region/product/customer, pipeline, quota) | Phase 5 |
| 14 | MFG reports (efficiency, scrap, capacity) | Phase 5 |
| 15 | CRM reports (lead conversion, case resolution, CSAT) | Phase 5 |
| 16 | PRJ reports (utilization, budget burn, milestones) | Phase 5 |
| 17 | Report Builder | Phase 6 |
| 18 | Scheduled Reports | Phase 7 |
| 19 | Email Report Distribution | Phase 7 |

**Deferred:**
- Cash Flow Statement — requires dedicated cash movement tracking beyond current FIN types (separate effort)

---

## Dependencies & Ordering

```
Phase 1 (Excel) ──┐
Phase 2 (PDF)   ──┼── Phase 4 (FIN Reports) ── Phase 5 (Module Reports) ── Phase 6 (Report Builder) ── Phase 7 (Scheduler + Email)
Phase 3 (Print) ──┘
```

Phases 1, 2, 3 are independent and can be done in parallel. Phase 4+ depends on export services being available. Phase 6 depends on Phase 4/5 patterns. Phase 7 depends on Phase 6.

---

## Key Files to Modify/Create

### Upstream (l8types/l8services repos)
- `l8types/proto/api.proto` — Add Excel/PDF export request/response types
- `l8services/go/services/excelexport/` — New service (4 files)
- `l8services/go/services/pdfexport/` — New service (4 files)

### This Repo (l8erp)
- `proto/fin-reports.proto` — Financial report types
- `go/erp/fin/finreports/` — FIN report service (8+ files)
- `go/erp/*/reports/` — Module report services (6 modules, 1-2 files each)
- `go/erp/bi/reports/report_executor.go` — Report execution engine
- `go/erp/bi/reports/report_scheduler.go` — Background scheduler
- `go/erp/bi/reports/report_email.go` — Email delivery
- `go/erp/ui/main/main.go` — Activate new services
- `go/erp/ui/web/l8ui/shared/layer8-excel-export.js` — Excel export JS
- `go/erp/ui/web/l8ui/shared/layer8-pdf-export.js` — PDF export JS
- `go/erp/ui/web/l8ui/shared/layer8-print.css` — Print stylesheet
- `go/erp/ui/web/l8ui/edit_table/layer8d-table-events.js` — Add export buttons
- `go/erp/ui/web/l8ui/m/js/layer8m-table.js` — Add mobile export buttons
- `go/erp/ui/web/fin/reports/` — FIN reports UI (config + viewer)
- `go/erp/ui/web/*/reports/` — Module report UI per module
- `go/erp/ui/web/app.html` + `m/app.html` — Script includes
- Section configs for FIN, HCM, SCM, Sales, MFG, CRM, PRJ, BI — Add "Reports" nav entries
