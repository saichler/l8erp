# Phase 16: Remaining Code Deduplication

Three areas of duplicate code remain after Phases 7-15. This plan addresses them in priority order.

---

## Tier 1: Service.go Boilerplate Elimination (243 files, ~5,000 lines saved)

### Problem
Every `*Service.go` file is exactly 44 lines with an identical structure. Only 5 values change per file:
- `ServiceName` (string)
- `ServiceArea` (byte)
- `PrimaryKey` (string)
- Type import path + type name (e.g., `sales.SalesOrder`)
- Callback constructor (`newXxxServiceCallback(vnic)`)

The 3 exported functions (`Activate`, plural handler, singular getter) are mechanically identical wrappers around `common.ActivateService`, `common.ServiceHandler`, and `common.GetEntity`.

### Current Pattern (44 lines each × 243 files = 10,692 lines)

```go
package salesorders

import (
    common "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/sales"
    "github.com/saichler/l8types/go/ifs"
)

const (
    ServiceName = "SalesOrder"
    ServiceArea = byte(60)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    common.ActivateService(common.ServiceConfig{
        ServiceName: ServiceName, ServiceArea: ServiceArea,
        PrimaryKey: "SalesOrderId", Callback: newSalesOrderServiceCallback(vnic),
    }, &sales.SalesOrder{}, &sales.SalesOrderList{}, creds, dbname, vnic)
}

func SalesOrders(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
    return common.ServiceHandler(ServiceName, ServiceArea, vnic)
}

func SalesOrder(salesOrderId string, vnic ifs.IVNic) (*sales.SalesOrder, error) {
    result, err := common.GetEntity(ServiceName, ServiceArea, &sales.SalesOrder{SalesOrderId: salesOrderId}, vnic)
    if err != nil || result == nil {
        return nil, err
    }
    return result.(*sales.SalesOrder), nil
}
```

### Solution: Code Generator

Create `tools/generate_services.go` — a Go program that reads a declarative service registry and generates all 243 `*Service.go` files.

#### Step 1: Create Service Registry (`tools/service_registry.go`)

A data-only file listing every service:

```go
type ServiceDef struct {
    Package       string // Go package name (e.g., "salesorders")
    Dir           string // Directory path relative to go/erp/ (e.g., "sales/salesorders")
    ServiceName   string // ServiceName constant (e.g., "SalesOrder")
    ServiceArea   byte   // ServiceArea constant (e.g., 60)
    PrimaryKey    string // Primary key field (e.g., "SalesOrderId")
    TypeImport    string // Type import path suffix (e.g., "sales")
    TypePrefix    string // Type prefix (e.g., "sales")
    TypeName      string // Protobuf type name (e.g., "SalesOrder")
    PluralFunc    string // Plural function name (e.g., "SalesOrders")
    SingularFunc  string // Singular function name (e.g., "SalesOrder")
    SingularParam string // Singular getter param name (e.g., "salesOrderId")
}

var ServiceRegistry = []ServiceDef{
    {Package: "salesorders", Dir: "sales/salesorders", ServiceName: "SalesOrder", ServiceArea: 60,
     PrimaryKey: "SalesOrderId", TypeImport: "sales", TypePrefix: "sales", TypeName: "SalesOrder",
     PluralFunc: "SalesOrders", SingularFunc: "SalesOrder", SingularParam: "salesOrderId"},
    // ... 242 more entries
}
```

#### Step 2: Create Generator (`tools/generate_services.go`)

Reads the registry, generates each `*Service.go` file using `text/template`. The template is the 44-line pattern with placeholders.

#### Step 3: Populate Registry from Existing Files

Create a one-time scraper (`tools/scrape_services.go`) that reads all 243 existing `*Service.go` files and extracts the 5 varying values into `service_registry.go`. This ensures zero manual transcription errors.

#### Step 4: Generate and Verify

```bash
cd go && go run tools/generate_services.go
git diff  # should show zero changes (generated = existing)
```

#### Step 5: Simplify activate_*.go Files

The 14 `activate_*.go` files can also be generated from the same registry, eliminating the manual `func() { pkg.Activate(creds, dbname, nic) }` wrappers.

Similarly, the `shared_*.go` type registration files (`common.RegisterType` calls) can be generated.

### Impact
- **243 Service.go files** become generated artifacts (still in repo, but maintainable via registry)
- **14 activate_*.go files** become generated
- **10 shared_*.go type registration files** become generated
- Adding a new service = 1 line in the registry + 1 ServiceCallback file
- **Net: ~267 hand-maintained files reduced to 1 registry file**

### Exceptions
7 report service files (32-33 lines) have a slightly different pattern. These can be handled with a `IsReport bool` flag in ServiceDef that uses the shorter template.

---

## Tier 2: Mock Generator Structural Deduplication (~800 lines saved)

### Problem
Five patterns repeat across 80+ generator files:

1. **Contact generation** — vendor contacts and customer contacts are ~85% identical (gen_fin_entities.go)
2. **Invoice amount calculation** — subtotal/tax/total/paid/balance logic identical in AR and AP (gen_fin_ar.go, gen_fin_ap.go)
3. **Invoice line generation** — make slice, loop, qty × price = lineAmount, identical structure
4. **Payment application/allocation** — same discount + allocation logic in AR and AP
5. **Status distribution** — `if i < n*60/100 { status = ACTIVE }` pattern repeats 60+ times

### Solution: Extract Shared Helpers to `utils.go`

#### Helper 1: `generatePersonContacts` (~30 lines saved per use, 5+ uses)

```go
// generatePersonContacts creates N contacts with random names and emails.
// Returns contacts as a slice of maps that callers convert to their specific type.
type ContactData struct {
    ContactID string
    ParentID  string
    FirstName string
    LastName  string
    Email     string
    Phone     string
    Title     string
    IsPrimary bool
}

func generatePersonContacts(parentID, idPrefix string, count, startIdx int, titles []string) []ContactData {
    contacts := make([]ContactData, count)
    for j := 0; j < count; j++ {
        name := randomName()
        parts := strings.SplitN(name, " ", 2)
        firstName, lastName := parts[0], ""
        if len(parts) > 1 {
            lastName = parts[1]
        }
        contacts[j] = ContactData{
            ContactID: fmt.Sprintf("%s-%03d", idPrefix, startIdx+j),
            ParentID:  parentID,
            FirstName: firstName,
            LastName:  lastName,
            Email:     fmt.Sprintf("%s@company.com", strings.ToLower(sanitizeEmail(firstName))),
            Phone:     randomPhone(),
            Title:     titles[j%len(titles)],
            IsPrimary: j == 0,
        }
    }
    return contacts
}
```

#### Helper 2: `calcInvoiceAmounts` (~15 lines saved per use, 4+ uses)

```go
type InvoiceAmounts struct {
    Subtotal    int64
    TaxAmount   int64
    TotalAmount int64
    AmountPaid  int64
    BalanceDue  int64
}

func calcInvoiceAmounts(store *MockDataStore, isPaid, isPartial bool) InvoiceAmounts {
    subtotal := int64(rand.Intn(980001)+20000) * 100
    taxAmount := subtotal * 7 / 100
    totalAmount := subtotal + taxAmount
    var amountPaid int64
    if isPaid {
        amountPaid = totalAmount
    } else if isPartial {
        amountPaid = totalAmount * int64(rand.Intn(70)+10) / 100
    }
    return InvoiceAmounts{
        Subtotal: subtotal, TaxAmount: taxAmount, TotalAmount: totalAmount,
        AmountPaid: amountPaid, BalanceDue: totalAmount - amountPaid,
    }
}
```

#### Helper 3: `generateInvoiceLines` (~20 lines saved per use, 4+ uses)

```go
type InvoiceLineData struct {
    LineID     string
    LineNumber int32
    Quantity   float64
    UnitPrice  int64
    LineAmount int64
    TaxAmount  int64
}

func generateInvoiceLines(idPrefix string, count, startIdx int) []InvoiceLineData {
    lines := make([]InvoiceLineData, count)
    for j := 0; j < count; j++ {
        qty := float64(rand.Intn(50) + 1)
        price := int64(rand.Intn(9901)+100) * 100
        amount := int64(qty) * price
        lines[j] = InvoiceLineData{
            LineID:     fmt.Sprintf("%s-%03d", idPrefix, startIdx+j),
            LineNumber: int32(j + 1),
            Quantity:   qty,
            UnitPrice:  price,
            LineAmount: amount,
            TaxAmount:  amount * 7 / 100,
        }
    }
    return lines
}
```

#### Helper 4: `pickStatus` (~2 lines saved per use, 60+ uses)

```go
// pickStatus returns a status value based on flavorable distribution.
// distribution is a slice of {status, cumulative_percent} pairs.
// Example: pickStatus(i, total, []StatusDist{{1, 60}, {2, 80}, {3, 100}})
type StatusDist struct {
    Value   int32
    CumPct  int // cumulative percentage threshold
}

func pickStatus(index, total int, dist []StatusDist) int32 {
    pct := index * 100 / total
    for _, d := range dist {
        if pct < d.CumPct {
            return d.Value
        }
    }
    return dist[len(dist)-1].Value
}
```

### Migration Plan

1. Add helpers to `go/tests/mocks/utils.go` (or new `utils_helpers.go` if utils.go approaches 500 lines)
2. Refactor `gen_fin_entities.go` (vendor/customer contacts)
3. Refactor `gen_fin_ar.go` and `gen_fin_ap.go` (invoice amounts + lines)
4. Refactor status distribution patterns across all gen_*.go files (search for `if i <` patterns)
5. Verify: `go build ./tests/mocks/...` and `go vet ./tests/mocks/...`

### Impact
- ~800 lines removed across ~20 files
- Consistent invoice/contact/status logic — fix once, applies everywhere
- New mock generators are faster to write (use helpers instead of copy-paste)

---

## Tier 3: Reference Registry Consolidation (~500 lines saved)

### Problem
Desktop and mobile maintain separate but ~95% identical reference registry files. Both use `Layer8RefFactory` but define the same models independently:

- Desktop: `js/reference-registry-*.js` (14 files)
- Mobile: `erp-ui/m/reference-registries/layer8m-reference-registry-*.js` (11 files)

### Current Pattern

**Desktop** (`reference-registry-sales.js`):
```js
(function() {
    const ref = window.Layer8RefFactory;
    window.Layer8DReferenceRegistrySales = {
        ...ref.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
        // ... 15 more entries
    };
    Layer8DReferenceRegistry.register(window.Layer8DReferenceRegistrySales);
})();
```

**Mobile** (`layer8m-reference-registry-sales.js`):
```js
(function() {
    const ref = window.Layer8RefFactory;
    window.Layer8MReferenceRegistrySales = {
        ...ref.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
        // ... same 15 entries duplicated
        // ... plus 7 mobile-specific alias entries
    };
    Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistrySales);
})();
```

### Solution: Shared Definition Files

#### Step 1: Create shared reference data files

Create `js/reference-data/reference-data-*.js` — one per module — containing only the data definitions (no registration call):

```js
// js/reference-data/reference-data-sales.js
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;
    window.ReferenceDataSales = {
        ...ref.simple('SalesOrder', 'salesOrderId', 'orderNumber', 'Sales Order'),
        ...ref.simple('SalesQuotation', 'quotationId', 'quotationNumber', 'Quotation'),
        // ... all entries shared between desktop and mobile
    };
})();
```

#### Step 2: Slim down desktop registry files

```js
// js/reference-registry-sales.js
(function() {
    'use strict';
    Layer8DReferenceRegistry.register(window.ReferenceDataSales);
})();
```

#### Step 3: Slim down mobile registry files

```js
// erp-ui/m/reference-registries/layer8m-reference-registry-sales.js
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;
    // Register shared definitions
    Layer8MReferenceRegistry.register(window.ReferenceDataSales);
    // Register mobile-specific aliases (if any)
    Layer8MReferenceRegistry.register({
        ...ref.simple('BillingSchedule', 'scheduleId', 'scheduleName', 'Billing Schedule'),
        // ... mobile-only aliases
    });
})();
```

#### Step 4: Update script loading

Add `reference-data-*.js` files to both `app.html` and `m/app.html` BEFORE the platform-specific registry files:

```html
<!-- Shared reference data (load before platform registries) -->
<script src="js/reference-data/reference-data-hcm.js"></script>
<script src="js/reference-data/reference-data-fin.js"></script>
<script src="js/reference-data/reference-data-scm.js"></script>
<!-- ... all modules -->

<!-- Platform-specific registration -->
<script src="js/reference-registry-hcm.js"></script>
<!-- ... -->
```

### Special Case: HCM

Desktop HCM uses `ref.batch()` and `ref.batchIdOnly()` for grouped definitions, while mobile uses individual `ref.simple()` calls. The shared file should use the individual style (more explicit, works on both platforms).

### Impact
- **14 desktop + 11 mobile = 25 files** reduced to 14 shared data files + 25 slim registration files
- ~500 lines of duplicated definitions eliminated
- Adding a new reference model = 1 line in the shared file (applies to both platforms)
- Mobile-specific aliases remain in mobile registry files

---

## Traceability Matrix

| # | Duplication Area | Tier | Files Affected | Lines Saved |
|---|-----------------|------|----------------|-------------|
| 1 | Service.go boilerplate | Tier 1 | 243 Service.go + 14 activate_*.go + 10 shared_*.go | ~5,000 |
| 2 | Mock contact generation | Tier 2 | 5+ gen_*.go files | ~150 |
| 3 | Mock invoice amounts | Tier 2 | 4+ gen_*.go files | ~120 |
| 4 | Mock invoice lines | Tier 2 | 4+ gen_*.go files | ~160 |
| 5 | Mock status distribution | Tier 2 | 60+ gen_*.go files | ~200 |
| 6 | Mock payment application | Tier 2 | 2 gen_*.go files | ~40 |
| 7 | Desktop/mobile ref registries | Tier 3 | 25 JS files | ~500 |
| **Total** | | | **~370 files** | **~6,170 lines** |

## Verification Phase

After each tier:

### Tier 1
```bash
cd go && go run tools/generate_services.go
git diff  # zero changes = generator produces identical output
go build ./...
```

### Tier 2
```bash
cd go && go build ./tests/mocks/... && go vet ./tests/mocks/...
```

### Tier 3
- Load desktop app.html in browser — verify all reference pickers resolve correctly
- Load mobile m/app.html — verify all reference pickers resolve correctly
- Check console for "Reference input missing required config" warnings

---

## Priority & Dependencies

**Tier 1** (Service.go generator) is the highest impact and has zero risk — generated files are verified against existing files before replacing them. Can proceed independently.

**Tier 2** (Mock helpers) is moderate impact with low risk — mock generators are test infrastructure, not production code. Can proceed independently.

**Tier 3** (Reference registries) is lower impact but improves developer experience — adding a reference model becomes a single edit instead of two. Can proceed independently.

All three tiers are independent and can be implemented in parallel.
