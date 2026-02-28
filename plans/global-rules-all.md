# L8ERP Global Rules (All)

These are Claude Code global rules for the Layer8 ERP project. Load this file at the start of a session to apply all rules.

**Source files:** `~/.claude/rules/*.md` (40 rule files)

---

## Table of Contents

### Architecture & Process
1. [Plan Approval Workflow](#1-plan-approval-workflow)
2. [Code Maintainability Standards](#2-code-maintainability-standards)
3. [Prime Object Rules](#3-prime-object-rules)

### Protobuf
4. [Protobuf Generation](#4-protobuf-generation)
5. [Proto Generation Method](#5-proto-generation-method)
6. [Protobuf List Type Convention](#6-protobuf-list-type-convention)
7. [Protobuf Enum Zero Value Convention](#7-protobuf-enum-zero-value-convention)

### Go/Server
8. [Third-Party Code Lives in Vendor](#8-third-party-code-lives-in-vendor)
9. [Test Location and Approach](#9-test-location-and-approach)
10. [Test Data Field Verification](#10-test-data-field-verification)

### L8Query
11. [L8Query Model Names Must Match Protobuf Types](#11-l8query-model-names-must-match-protobuf-types)
12. [L8Query Must Use SELECT * for Detail Popups](#12-l8query-must-use-select--for-detail-popups)

### JavaScript Field Naming
13. [JavaScript Protobuf Field Name Mapping](#13-javascript-protobuf-field-name-mapping)
14. [JS Column and Form Field Name Verification](#14-js-column-and-form-field-name-verification)
15. [JavaScript UI Model Names Must Match Protobuf Types](#15-javascript-ui-model-names-must-match-protobuf-types)

### JavaScript Forms
16. [Nested Protobuf Types in Form Definitions](#16-nested-protobuf-types-in-form-definitions)
17. [Compound Form Field Data Collection](#17-compound-form-field-data-collection)
18. [Form and Column Field Coverage](#18-form-and-column-field-coverage)
19. [Select Field Enum Completeness](#19-select-field-enum-completeness)

### JavaScript Columns & Renderers
20. [Column Factory Method Completeness](#20-column-factory-method-completeness)
21. [Column Factory Renderer Validation](#21-column-factory-renderer-validation)
22. [Renderer Factory vs Direct Call](#22-renderer-factory-vs-direct-call)

### JavaScript Template/DOM
23. [Template Literal Ternary Edit Safety](#23-template-literal-ternary-edit-safety)
24. [Stacked Popup DOM Scoping](#24-stacked-popup-dom-scoping)

### UI Integration
25. [UI Module Integration Checklist](#25-ui-module-integration-checklist)
26. [Module Init sectionSelector Must Match defaultModule](#26-module-init-sectionselector-must-match-defaultmodule)
27. [Reference Registry Completeness](#27-reference-registry-completeness)
28. [Server-Side Pagination Metadata](#28-server-side-pagination-metadata)
29. [Layer8DTable: Pagination Metadata Must Only Be Read on Page 1](#29-layer8dtable-pagination-metadata-must-only-be-read-on-page-1)
30. [Immutability Must Be Reflected in the UI](#30-immutability-must-be-reflected-in-the-ui)
31. [Mobile Parity](#31-mobile-parity)
32. [Demo Directory Must Stay in Sync with Source](#32-demo-directory-must-stay-in-sync-with-source)

### L8UI
33. [L8UI Theme Compliance](#33-l8ui-theme-compliance)
34. [L8UI Guide Update](#34-l8ui-guide-update)
35. [L8UI GUIDE.md Prerequisite](#35-l8ui-guidemd-prerequisite)

### Mock Data
36. [Mock Data Generation](#36-mock-data-generation)
37. [Mock Data Completeness](#37-mock-data-completeness)
38. [Mock Data Must Cover All UI Columns](#38-mock-data-must-cover-all-ui-columns)
39. [Mock Endpoint Construction](#39-mock-endpoint-construction)
40. [Mock Phase Ordering](#40-mock-phase-ordering)

---

# 1. Plan Approval Workflow

**Source:** `plan-approval-workflow.md`

## Rule
When a plan is created, it MUST be written to the `./plans` directory in the project root. Do NOT ask the user for approval directly — the user needs to share the plan with their peers first. Wait for the user to explicitly confirm that the plan has been approved before implementing it.

## Process
1. Write the plan to `./plans/<descriptive-name>.md`
2. Inform the user that the plan is ready at that path
3. **Stop and wait** — do not implement, do not ask "should I proceed?", do not call ExitPlanMode
4. Only begin implementation after the user explicitly says the plan is approved

---

# 2. Code Maintainability Standards

**Source:** `maintainability.md`

## File Size
Files that are over 500 lines of code are not maintainable, please make sure to refactor them and break them into smaller files logically.

### File Size Check (CRITICAL)
After ANY edit that adds more than 10 lines to a file, check the file's total line count.
If the file is approaching 450 lines, proactively split it before continuing.
If the file exceeds 500 lines, STOP and refactor immediately before proceeding.

## No Duplicate Code
Avoid duplicate code. Always check for existing utilities, functions, or components before writing new code. Consolidate duplicates into shared modules.

## Future-Proof Design
The ERP system has more modules that are not implemented yet. When designing components, consider that future modules (Financial, SCM, Manufacturing, Sales, CRM, Projects, BI, Documents, E-Commerce, Compliance, System) will follow similar patterns. Design shared components to be reusable across all modules.

## Read Before Implementing
When asked to implement something similar to an existing component, you MUST read ALL the code of the referenced component(s) first. Do not make any assumptions. Read every file, understand every pattern, and only then implement following the exact same patterns.
- Use the Read tool to read the file completely. Show the key interfaces and props found. Then implement.

## Component Integration Analysis
When implementing support for a component, perform deep analysis first:
- Understand all initialization arguments and configuration options
- Understand how endpoints are constructed (if applicable)
- Understand how L8Query is constructed for paging, filtering, and sorting (if supported)
- Only proceed with implementation after full understanding is documented

## Demo Directory
The `/go/demo/` directory is auto-generated and used for local testing only. Do not edit code in that directory. The source of truth is `/go/erp/ui/web/`.

## ServiceName
ServiceName should not be larger than 10 characters.

## ServiceArea
ServiceArea should be the same for Services under the same Module.

## ServiceCallback Auto-Generate ID
Every `*ServiceCallback.go` must auto-generate the primary key ID on POST (Add) operations. In the `Before()` method, insert `common.GenerateID(&entity.PrimaryKeyField)` between the type assertion and the `validate()` call, guarded by `if action == ifs.POST`. The primary key field name is found in the corresponding `*Service.go` file's `SetPrimaryKeys("XxxId")` call. This ensures that Add operations from the UI (which don't include the primary key field in the form) succeed without "XxxId is required" errors.

## UI Type Registration
When creating a service, the model type must be registered in the UI. Add it to the appropriate `register<Module>Types` function in `go/erp/ui/main.go`. Follow the existing pattern: use `introspect.AddPrimaryKeyDecorator` to mark the primary key field, then call `registry.Register` with the type. If a `register<Module>Types` function doesn't exist for your module, create one following the pattern of `registerFinTypes` or `registerScmTypes`.

## UI Endpoint Verification (CRITICAL)
When creating or updating UI module config files (`*-config.js`), you MUST verify every endpoint against the actual service definitions:
1. **Before writing any endpoint**, run: `grep "ServiceName = " /path/to/erp/<module>/*/*.go` to get ALL actual service names
2. **The endpoint in the config MUST exactly match** the `ServiceName` constant from the corresponding `*Service.go` file
3. **Never guess or abbreviate service names** - always verify against the source of truth
4. **Common mistakes to avoid**:
   - Using `MfgWO` instead of `MfgWorkOrd`
   - Using `MfgQP` instead of `MfgQCPlan`
   - Abbreviating names differently than the service definition
5. **After creating a config file**, verify all endpoints by comparing against the grep output

This rule exists because mismatched endpoints cause 404 errors at runtime and are difficult to debug. This bug has occurred multiple times (Sales, MFG modules) and MUST be prevented.

## Vendor All Third-Party Dependencies
All third-party dependencies must be vendored. After adding or updating any dependency, run `go mod vendor` to ensure the `vendor/` directory is up to date. Never rely on module cache alone — the vendor directory is the source of truth for third-party code.

## Guidelines
- Each file should have a single responsibility
- Use logical module/package organization
- Check for existing shared utilities before creating new ones

---

## Duplication Prevention Rules

### Second Instance Rule
When creating a second instance of any pattern (e.g., a second module, a second similar component), extract a shared abstraction immediately. Do not copy a file and replace identifiers. The second consumer is the forcing function for abstraction — do not wait for a third.

### Copy-Paste Detection
If the only differences between two files are identifiers, names, or configuration values, the logic MUST be extracted into a shared component that accepts those values as parameters. Before creating a new module or feature file, diff it against the nearest equivalent. If the diff shows only namespace changes (e.g., `HCM` to `FIN`), string literal changes, or data differences — the logic is generic and must be shared.

### Configuration vs. Logic Separation
Module-specific files should contain only data (configuration, definitions, mappings). All behavioral logic (CRUD operations, navigation, service lookups, DOM manipulation, event handlers, fetch calls) must live in shared components. A module consists of:
- A config file (unique data)
- Data files (enums, columns, forms — unique per sub-module)
- An init file that calls a shared factory (~10 lines)

### Shared Components Before the Second Module
The shared abstraction layer must be created as part of building the first module, or at latest refactored out before the second module ships. Never ship a second module by copying the first. If the first module embedded behavioral logic, the second module's implementation must include extracting that logic into shared components.

### New Module Checklist
Before creating a new module, verify it only needs configuration files:
- Does it need its own navigation logic? → No, use the shared navigation component.
- Does it need its own CRUD handlers? → No, use the shared CRUD component.
- Does it need its own form wrapper? → No, use the shared form framework.
- Does it need its own service lookup? → No, use the shared service registry.
If any answer is "yes," fix the shared component — do not work around it with a module-specific copy.

### Audit on Every Module Addition
When adding a new module, diff all existing module-level files. Any file with >80% similarity across modules is a refactoring candidate that MUST be addressed before the new module ships.

### Facades Are a Code Smell
If a wrapper file delegates 100% of its calls to another component, it should not exist. Delete it and reference the shared component directly. A file that only re-exports or proxies another component is dead weight.

### Backport Improvements Immediately
When a newer module improves on a pattern from an older module, the improvement must be backported to all existing modules immediately. Do not leave different implementations of the same logic across modules.

### Measure Boilerplate
If adding a new module requires more than 50 lines of structural/behavioral code (excluding domain-specific data like configs, enums, columns, forms), the shared abstraction layer needs improvement before proceeding.

### Document the Module Creation Recipe
Maintain a "How to Add a New Module" guide that specifies exactly which files to create and which shared components to use. If the guide says "copy an existing module," the architecture has failed. The guide should say: create config, create data files, create init file with a factory call. No copying. No behavioral code. Configuration only.

---

# 3. Prime Object Rules

**Source:** `prime-object-references.md`

## Rule 1: What IS a Prime Object

A **Prime Object** is an entity that can exist independently — it has its own identity, its own lifecycle, and is meaningful on its own without a parent. Prime Objects get their own service (service directory under `go/erp/<module>/`).

### Prime Object Test (ALL must be true)
Before creating a new service for a type, it MUST pass ALL of these:

1. **Independence**: Can this entity exist on its own without a parent? If deleting the parent makes this entity meaningless, it is NOT a Prime Object.
2. **Own lifecycle**: Does this entity have a lifecycle independent of any parent? If it is always created, updated, and deleted as part of a parent, it is NOT a Prime Object.
3. **Direct query need**: Do users need to query this entity across all parents? (e.g., "show all employees" makes sense; "show all order lines across all orders" does NOT — you always view lines within an order.)
4. **No parent ID dependency**: Does this entity's primary identity stand alone? If the entity's meaning requires knowing which parent it belongs to (e.g., "line 3 of order SO-001"), it is NOT a Prime Object.

### What is NOT a Prime Object (embedded child types)

These are types that belong to a parent and should be defined as `repeated` fields inside the parent's protobuf message — NOT as separate services:

- **Line items**: OrderLine, InvoiceLine, BomLine, QuotationLine
- **Entries/details**: TimesheetEntry, ExpenseEntry, LaborEntry, ChangeDetail
- **Components/operations**: RoutingOperation, WorkOrderOp, WorkflowStep
- **Assignments/members**: TerritoryAssign, CampaignMember, TeamMember
- **Child records**: CaseComment, LeadActivity, DeliveryConfirm, BackOrder
- **Configuration children**: PriceListEntry, QuantityBreak, KpiThreshold
- **Status/history records**: OrderStatusHistory, Checkpoint, AuditTrail

**Key indicator**: If the entity has a `parent_id` field (typically field 2) that is always required and always references a single parent type, it is a child — not a Prime Object.

### Correct pattern for child types

```protobuf
// CORRECT: Child types are embedded in the parent
message SalesOrder {
    string sales_order_id = 1;
    string order_number = 2;
    // ... parent fields ...
    repeated SalesOrderLine lines = 20;          // Embedded child
    repeated SalesOrderAllocation allocations = 21;  // Embedded child
    erp.AuditInfo audit_info = 30;
}

// Child type — has its own ID but NO service, NO List type
message SalesOrderLine {
    string line_id = 1;        // Own ID for addressing within parent
    string item_id = 2;        // Reference to another Prime Object (ScmItem)
    int32 quantity = 3;
    erp.Money unit_price = 4;
}

// WRONG: Child type as separate service
// go/erp/sales/salesorderlines/SalesOrderLineService.go  ← SHOULD NOT EXIST
```

### Examples

| Entity | Prime Object? | Why |
|--------|:---:|-----|
| Employee | Yes | Independent identity, own lifecycle, queried directly |
| SalesOrder | Yes | Independent document, own status lifecycle |
| Department | Yes | Organizational unit, exists independently |
| SalesOrderLine | **No** | Meaningless without its order, always viewed within order context |
| JournalEntryLine | **No** | Debit/credit line within a journal entry |
| MfgBomLine | **No** | Component within a BOM, not independent |
| CrmCaseComment | **No** | Comment on a case, meaningless alone |
| BenefitPlan | Yes | Plan definition exists independently |
| CoverageOption | **No** | Option within a benefit plan |

### Existing correct example: HCM BenefitPlan

```protobuf
message BenefitPlan {
    string plan_id = 1;
    // ... plan fields ...
    repeated CoverageOption coverage_options = 14;  // Embedded child (no service)
    repeated PlanCost costs = 15;                    // Embedded child (no service)
    EligibilityRules eligibility = 16;              // Embedded child (no service)
}
```

`CoverageOption`, `PlanCost`, and `EligibilityRules` do NOT have service directories. They are managed entirely through the `BenefitPlan` service. This is the correct pattern.

---

## Rule 2: Cross-References Between Prime Objects

Prime Objects MUST NEVER contain direct struct references (`*OtherPrimeType` or `[]*OtherPrimeType`) to other Prime Objects. Prime Objects refer to each other **ONLY via ID fields** (string).

### Why This Is Critical
When the introspector inspects a type, it recursively inspects all nested struct fields. If Prime Object A contains `[]*PrimeObjectB`, inspecting A creates a node for B in the introspector's `typeToNode` map WITHOUT B's primary key decorator. When B's service later activates and adds its decorator, it goes to a different node in `pathToNode`. This causes "Decorator Not Found" errors at runtime because `ElementToQuery` uses `NodeByTypeName` (reads `typeToNode`) and finds the old undecorated node.

This is NOT just a test issue — it breaks the ORM query path for any Get-by-filter operation on the referenced type.

### Correct Pattern
```protobuf
// WRONG - Direct reference to another Prime Object
message BenefitEnrollment {
    repeated Dependent covered_dependents = 15;  // BAD: Dependent is a Prime Object
}

// CORRECT - Reference via ID only
message BenefitEnrollment {
    repeated string covered_dependent_ids = 15;  // GOOD: Reference by ID
}
```

### What Is Allowed
- Prime Objects MAY contain fields of **shared/common types** (e.g., `erp.Money`, `erp.Address`, `erp.AuditInfo`, `erp.ContactInfo`, `erp.DateRange`)
- Prime Objects MAY contain `repeated` fields of **embedded child types** (types without their own service, e.g., `SalesOrderLine`, `CoverageOption`, `PlanCost`)
- Prime Objects MAY reference other Prime Objects via **string ID fields** (e.g., `employee_id`, `department_id`)

---

## Rule 3: UI Implications of Prime vs Child

The Prime Object classification directly determines how an entity appears in the UI. Getting this wrong creates standalone UI entries (config, columns, forms, nav) for entities that should only appear inline within their parent's form.

### Prime Object UI Stack (standalone)
A Prime Object gets ALL of the following:
- **Config entry** in `*-config.js` (service key, model, endpoint)
- **Column definitions** in `*-columns.js` (table columns for list view)
- **Form definition** in `*-forms.js` (standalone create/edit form)
- **Nav entry** in desktop section HTML and mobile `layer8m-nav-config.js`
- **Type registration** in `go/erp/ui/main.go`
- **Reference registry entry** (if other forms reference it via `lookupModel`)
- **Mock data generator** with its own ID slice in `store.go`

### Child Type UI (inline within parent)
A child type gets NONE of the above. Instead:
- **No config entry** — not a standalone service
- **No column definitions** — not shown in its own table
- **No standalone form** — not independently created/edited
- **No nav entry** — not navigable on its own
- **No type registration** — not a registered Prime Object
- **Inline table in parent form** — child rows displayed via `f.inlineTable()` within the parent's form definition
- **Mock data inline** — generated as part of the parent's `repeated` field, not as a separate generator

### Correct UI Pattern for Child Types

```javascript
// Parent form embeds child rows via inlineTable
SalesOrder: f.form('Sales Order', [
    f.section('Order Details', [
        ...f.text('orderNumber', 'Order #', true),
        ...f.reference('customerId', 'Customer', 'Customer', true),
    ]),
    f.section('Order Lines', [
        ...f.inlineTable('lines', 'Order Lines', [
            { key: 'lineId', label: 'Line ID', hidden: true },
            { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
            { key: 'quantity', label: 'Qty', type: 'number' },
            { key: 'unitPrice', label: 'Unit Price', type: 'money' },
        ]),
    ]),
])
```

### Wrong UI Pattern (child as standalone)

```javascript
// WRONG: Child type has its own config entry
{ key: 'salesorderlines', label: 'Order Lines', model: 'SalesOrderLine' }

// WRONG: Child type has its own form
SalesOrderLine: f.form('Order Line', [
    f.section('Line Details', [
        ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),  // parent ref
        ...f.reference('itemId', 'Item', 'ScmItem', true),
        ...f.number('quantity', 'Quantity', true),
    ]),
])
```

### Why This Matters
When a child is wrongly given standalone UI, users see it as an independent navigable entity — they can create "orphan" lines without an order, browse lines across all orders (which is never useful), and the parent form shows no children. The correct UX is always: navigate to the parent, see its children inline, edit children within the parent context.

---

## Verification

### Before creating a new service
1. Apply the Prime Object Test (Rule 1) — does the entity pass ALL four criteria?
2. If it has a parent_id field that is always required, it is a child — embed it in the parent instead
3. If unsure, default to embedded child. It is easy to promote a child to a Prime Object later; it is painful to demote a Prime Object to a child (requires deleting services, updating UI, etc.)

### Before creating or modifying a protobuf message
1. Check if any `*Type` or `repeated Type` fields reference a Prime Object
2. If yes, replace with the corresponding ID field(s)
3. After fixing proto, regenerate bindings, update mock generators, forms, and columns

```bash
# Find all Prime Object type names
for dir in $(find go/erp/ -mindepth 3 -maxdepth 3 -name '*Service.go'); do
    grep -oP 'type \K\w+(?= struct)' "$(dirname "$dir")/../../../types/$(basename "$(dirname "$(dirname "$dir")")")/"*.pb.go 2>/dev/null
done

# Check for direct references between Prime Objects in proto types
grep -rn '\[\]\*\|^\s*\*' go/types/**/*.pb.go | grep 'protobuf:' | grep -v 'List     \[' | grep -v 'erp\.\|l8api\.\|l8web\.'
```

## Historical Context
- **Rule 2** was discovered when `BenefitEnrollment.CoveredDependents []*Dependent` caused "Decorator Not Found in Dependent" errors.
- **Rule 1** was established after an audit found ~134 child entities (order lines, BOM lines, invoice lines, case comments, fiscal periods, bins, etc.) incorrectly implemented as separate Prime Objects with their own services across 10 modules. These should have been embedded `repeated` fields in their parent types from the start.
- **Rule 3** was added because those ~134 child entities each had a full standalone UI stack (config, columns, forms, nav entries) that should not have existed — children should only appear as inline tables within their parent's form.

---

# 4. Protobuf Generation

**Source:** `protobuf-generation.md`

## Rule
Whenever ANY `.proto` file is created, modified, or removed, you **MUST** run `make-bindings.sh` to regenerate ALL protobuf bindings. **NO EXCEPTIONS.**

**NEVER attempt to compile individual proto files manually.** Do NOT run individual `docker run` commands or `protoc` commands. The ONLY way to generate bindings is via `make-bindings.sh`. This is a hard requirement — violating it wastes time and produces errors.

## How to Run

```bash
cd proto && ./make-bindings.sh
```

**Do NOT use the `sed` pipe method** (`sed 's/-it /-i /g' make-bindings.sh | bash`) — it silently fails on some steps. Run the script directly.

The script handles everything automatically:
1. Downloads `api.proto` dependency
2. Compiles ALL proto files in the correct order
3. Moves generated `.pb.go` files to `/go/types/`
4. Fixes import paths

## When to Run
- After ANY change to ANY `.proto` file (add field, remove field, add message, remove message, add import, etc.)
- After adding a new `.proto` file (also update `make-bindings.sh` to include it)
- After removing a `.proto` file (also update `make-bindings.sh` to remove it)

## Why This Matters
- Generated .pb.go files contain the actual Go struct definitions
- Field names in generated code may differ from what you expect
- Building code that uses these types before generation will fail
- Mock data generators, services, and UI code all depend on these types
- The script handles cross-file imports, dependency ordering, and path fixups that manual compilation misses

## After Running
1. Verify `.pb.go` files exist in `/go/types/<module>/`
2. Build dependent code to ensure types are correct: `go build ./...`

## Field Name Verification
After generation, verify field names by checking the .pb.go files:
```bash
grep -A 30 "type TypeName struct" go/types/<module>/*.pb.go | grep 'json:"'
```

---

# 5. Proto Generation Method

**Source:** `proto-generation-method.md`

## Rule
To generate protobuf bindings, you MUST `cd` into the `proto/` directory and run `./make-bindings.sh` directly. **ANY other method will break.**

## The ONLY Correct Way
```bash
cd proto && ./make-bindings.sh
```

## What Will Break
- Running the script via `sed` pipe (`sed 's/-it /-i /g' make-bindings.sh | bash`) — silently fails on some steps
- Running individual `docker run` commands manually — misses dependency ordering, move steps, and sed fixups
- Running `wget` + `protoc` commands manually — misses the full pipeline
- Running from any directory other than `proto/` — paths break

## Why
The `make-bindings.sh` script is designed to run interactively from the `proto/` directory. It uses relative paths, Docker bind mounts with `$PWD`, and sequential steps that depend on each other. Any attempt to run it non-interactively or from a different directory will silently produce stale or incomplete output.

---

# 6. Protobuf List Type Convention

**Source:** `proto-list-convention.md`

## Rule
All protobuf list/collection message types must follow this exact pattern:

```protobuf
message SomeEntityList {
  repeated SomeEntity list = 1;
  l8api.L8MetaData metadata = 2;
}
```

## Key Points
- The repeated field MUST be named `list` (not `items`, `entries`, `data`, etc.)
- The `l8api.L8MetaData metadata` field MUST be included as field 2
- This pattern is required by the Layer8 framework for proper serialization and iteration

## Why This Matters
The Layer8 framework expects the `list` field name when iterating over collection types. Using a different field name (like `items`) will cause runtime errors such as:
```
invalid <TypeName> type
```

## Verification
Before creating new proto files, verify the pattern against existing modules:
```bash
grep -A3 "List {" proto/*.proto | head -20
```

## Example
```protobuf
// CORRECT
message EcomCategoryList {
  repeated EcomCategory list = 1;
  l8api.L8MetaData metadata = 2;
}

// WRONG - will cause runtime errors
message EcomCategoryList {
  repeated EcomCategory items = 1;
}
```

---

# 7. Protobuf Enum Zero Value Convention

**Source:** `proto-enum-zero-value.md`

## Rule
Every protobuf enum MUST have an invalid/unspecified zero value as its first entry. The zero value MUST NOT represent a valid, meaningful state.

## Why This Matters
Protobuf defaults unset enum fields to 0. If 0 is a valid value (e.g., "Active"), then unset fields silently appear as "Active" instead of being detectable as missing. This makes it impossible to distinguish "explicitly set to the first value" from "never set."

## Naming Convention
The zero value name MUST follow this pattern:
```
[MODULE_PREFIX_]FIELD_NAME_UNSPECIFIED = 0
```

Examples:
```protobuf
// CORRECT
enum AccountType {
  ACCOUNT_TYPE_UNSPECIFIED = 0;
  ACCOUNT_TYPE_ASSET = 1;
  ACCOUNT_TYPE_LIABILITY = 2;
}

enum MfgBomStatus {
  MFG_BOM_STATUS_UNSPECIFIED = 0;
  MFG_BOM_STATUS_DRAFT = 1;
  MFG_BOM_STATUS_ACTIVE = 2;
}

// WRONG - 0 is a valid value
enum Priority {
  LOW = 0;      // BAD: unset fields appear as LOW
  MEDIUM = 1;
  HIGH = 2;
}

// WRONG - no zero value
enum Status {
  ACTIVE = 1;   // BAD: no 0 value defined
  INACTIVE = 2;
}
```

## Verification
After creating or modifying any proto file with enums:
```bash
# Check all enums have a 0 value containing UNSPECIFIED, INVALID, or UNKNOWN
grep -A1 "^enum " proto/*.proto | grep "= 0" | grep -iv "unspecified\|invalid\|unknown"
```
If any results appear, those enums need a proper zero value.

## Current Compliance
All 289 ERP enums across 12 modules follow this convention (verified Feb 2026).

---

# 8. Third-Party Code Lives in Vendor

**Source:** `vendor-third-party-code.md`

## Rule
All third-party dependencies are vendored. The `vendor/` directory is the location for all external code. When searching for code across the project's dependencies, look in `vendor/`, not in `$GOPATH` or module cache.

## Implications
- When tracing code into dependencies (e.g., `l8bus`, `l8types`), find the source in `vendor/`
- Do NOT use `go get` to fetch code for reading — it's already in `vendor/`
- After adding or updating any dependency, run `go mod vendor`

---

# 9. Test Location and Approach

**Source:** `test-location-and-approach.md`

## Rule
All tests MUST live in the `go/tests/` directory. Do NOT place `_test.go` files alongside source code in package directories (e.g., do NOT create `go/alm/correlation/engine_test.go`).

Tests MUST use the system API (IVNic, service endpoints, HTTP calls) to exercise functionality end-to-end. Do NOT write unit tests that directly call unexported/internal functions. The test should interact with the system the same way a real client would.

## Why This Matters
- Tests alongside source code in package directories have access to unexported internals, which couples tests to implementation details and makes refactoring harder.
- Testing through the system API validates the full stack (validation, callbacks, persistence, service routing) rather than isolated functions.
- Centralizing tests in `go/tests/` keeps the source tree clean and makes it easy to find and run all tests.

## Correct Pattern
```
go/tests/
├── mocks/          # Mock data generators
├── integration/    # Integration tests using IVNic
└── ...
```

Tests should:
1. Set up the system (IVNic, services)
2. Call service endpoints (POST, GET, PUT, DELETE) via the API
3. Assert on the API responses

## Wrong Pattern
```
go/alm/correlation/engine_test.go      # WRONG: test next to source
go/alm/common/validation_test.go       # WRONG: test next to source
```

## Verification
Before creating any test file, check its path:
```bash
# All test files must be under go/tests/
find go/ -name "*_test.go" -not -path "go/tests/*"
# If any results appear, those tests are in the wrong location
```

---

# 10. Test Data Field Verification

**Source:** `test-data-field-verification.md`

## Rule
When constructing test data as `map[string]interface{}` for HTTP POST/PUT requests, every key in the map MUST exist as a field on the target protobuf struct. Never guess or assume field names — always verify against the `.pb.go` file first.

## Why This Matters
The server deserializes JSON request bodies against registered protobuf types. If the JSON contains a field that doesn't exist on the protobuf struct, the parser rejects the entire payload with `unknown field "xxx"`. This causes a `400 Bad Request` with the cryptic error `Cannot find pb for method POST` because the server tries all registered body types and none match.

## The Bug Pattern
```go
// WRONG — "message" does not exist on the Alarm struct
alarm := map[string]interface{}{
    "alarmId":  alarmId,
    "nodeId":   "test-node",
    "state":    1,
    "severity": 1,
    "message":  "Test Alarm",  // ← Alarm has no "message" field; Event does
}
client.Post("/alm/10/Alarm", alarm)
// Result: 400 Bad Request — Cannot find pb for method POST
```

```go
// CORRECT — all fields verified against Alarm struct in .pb.go
alarm := map[string]interface{}{
    "alarmId":      alarmId,
    "definitionId": defId,
    "nodeId":       "test-node",
    "state":        1,
    "severity":     1,
    "name":         "Test Alarm",  // ← "name" exists on Alarm struct
}
```

## Verification Before Writing Test Data
Before constructing any `map[string]interface{}` for an HTTP request:

```bash
# List all fields and their JSON names for the target type
grep -A 40 "type <TypeName> struct" go/types/<module>/*.pb.go | grep 'json:"'
```

Cross-check every key in your map against the output. If a key doesn't appear in the JSON tags, it will cause a silent 400 error.

## Common Mistakes
| Mistake | Why It Happens |
|---------|---------------|
| Using a field from a related type | e.g., `message` belongs to Event, not Alarm |
| Inventing descriptive fields | e.g., adding `"reason"` when the struct has `"reasonCode"` |
| Confusing parent/child fields | e.g., using `"orderId"` on a line item that has `"salesOrderId"` |
| Using Go field name instead of JSON name | e.g., `"AlarmId"` instead of `"alarmId"` or `"alarm_id"` |

## Error Symptom
- `400 Bad Request` on POST or PUT
- Server log: `Cannot find pb for method POST` or `Cannot find pb for method PUT`
- Followed by: `cannot find any matching body type <TypeName> ... unknown field "<fieldName>"`
- The error lists ALL unrecognized fields, helping identify which keys are wrong

## Applies To
- CRUD test data (`TestCRUD_test.go`)
- Validation test data (`TestValidation_test.go`)
- Any `map[string]interface{}` sent via HTTP to the server
- Mock data generators that use maps instead of protobuf structs (rare but possible)

---

# 11. L8Query Model Names Must Match Protobuf Types

**Source:** `l8query-model-names.md`

## Rule
When constructing L8Query strings (e.g., `select * from ModelName`), the model name MUST be the **protobuf type name**, NOT the ServiceName constant. These are often different.

## Why This Matters
The server resolves the `from` clause against the protobuf type registry. If the name doesn't match a registered protobuf type, the query returns a 400 Bad Request. The ServiceName is an HTTP routing label (max 10 chars); the protobuf type is the actual data model name.

## Common Mismatches

| ServiceName (HTTP path) | Protobuf Type (query model) |
|------------------------|-----------------------------|
| `Sprint` | `BugsSprint` |
| `Project` | `BugsProject` |
| `Assignee` | `BugsAssignee` |
| `Territory` | `SalesTerritory` |
| `DlvryOrder` | `ScmDeliveryOrder` |
| `MfgWorkOrd` | `MfgWorkOrder` |

ServiceName is found in `*Service.go` files. Protobuf type is found in `*.pb.go` files.

## Verification
Before writing any L8Query string, confirm the protobuf type:
```bash
grep "type.*struct {" go/types/<module>/*.pb.go | grep -i <keyword>
```

## Error Symptom
- HTTP 400 Bad Request on a GET with `?body=` query parameter
- Server log: `Cannot find node for table <wrong-name>`

---

# 12. L8Query Must Use SELECT * for Detail Popups

**Source:** `l8query-select-star-for-detail.md`

## Rule
When a detail popup/modal is opened for any entity and an L8Query is constructed to fetch that entity's data, the query MUST use `select * from ...`. Never use `select attr1, attr2, ... from ...` with a specific column list.

## Why This Matters
Detail forms display ALL fields of an entity. If the query selects only specific columns, the response omits the remaining fields. The detail form then shows empty values for those fields — no error, no warning, just blank inputs. The user sees a partially-filled form and assumes the data was never set.

## Correct Pattern
```javascript
// CORRECT — fetches all fields for the detail form
const query = `select * from AlarmDefinition where definition_id=${id}`;
```

```go
// CORRECT — fetches all fields
q := fmt.Sprintf("select * from Alarm where alarm_id=%s", alarmId)
```

## Wrong Pattern
```javascript
// WRONG — detail form will have empty fields for anything not listed
const query = `select name, status, severity from AlarmDefinition where definition_id=${id}`;
```

## When This Applies
- Detail popup/modal opened by clicking a table row
- Edit form pre-population
- Any single-entity fetch intended to display all entity fields
- CRUD test GET operations that verify full entity data

## When SELECT specific columns IS acceptable
- Table/list views where only visible columns are needed
- Reference lookups that only need ID + display name
- Autocomplete/search dropdowns
- Aggregation queries

---

# 13. JavaScript Protobuf Field Name Mapping

**Source:** `js-protobuf-field-names.md`

## Field Name Format
JavaScript code must use the exact JSON field names from protobuf definitions. Protobuf field names use `snake_case` which converts to `camelCase` in JSON.

## Finding the Correct Field Name
Before using a field name in JavaScript (reference registries, column definitions, forms, etc.):

1. Locate the protobuf type in `go/types/{module}/*.pb.go`
2. Find the field definition and look at the `json` tag
3. Use the JSON tag value (the part after `json:"` and before the comma)

## Example
For ScmWarehouse:
```go
// In go/types/scm/scm-warehouse.pb.go
type ScmWarehouse struct {
    WarehouseId string `protobuf:"..." json:"warehouseId,omitempty"`
    Code        string `protobuf:"..." json:"code,omitempty"`        // <-- JSON name is "code"
    Name        string `protobuf:"..." json:"name,omitempty"`
    ...
}
```

JavaScript should use:
```javascript
selectColumns: ['warehouseId', 'code', 'name'],  // Correct
displayFormat: function(item) {
    return item.code + ' - ' + item.name;        // Correct
}
```

**NOT** `warehouseCode` (incorrect - field doesn't exist)

## Common Naming Patterns
| Protobuf Field | JSON Name | Common Mistake |
|----------------|-----------|----------------|
| `warehouse_id` | `warehouseId` | `warehouseID` |
| `code` | `code` | `warehouseCode` |
| `is_active` | `isActive` | `active` |
| `audit_info` | `auditInfo` | `audit` |

## CRITICAL: "Number" Field Pitfall

**DO NOT assume all "number" fields are named the same way across models.**

Different models use different naming conventions for their number/identifier fields:

| Model | Correct Field | Common Mistake |
|-------|---------------|----------------|
| `MfgWorkOrder` | `workOrderNumber` | `orderNumber` |
| `MfgProductionOrder` | `orderNumber` | (correct) |
| `SalesOrder` | `orderNumber` | (correct) |
| `ScmPurchaseOrder` | `orderNumber` | (correct) |
| `MfgBom` | `bomNumber` | `bomId` |
| `MfgRouting` | `routingNumber` | `routingId` |

**Always verify** by checking the protobuf definition:
```bash
grep -A15 "type MfgWorkOrder struct" go/types/mfg/*.pb.go | grep -E "Number|number"
```

**Error symptom**: Server log shows:
```
cannot find property for col <model>.<field>:Unknown attribute <model>.<field>
```

## Verification Steps
Before adding field references in JavaScript:
1. Search the .pb.go file: `grep -A 20 "type TypeName struct" go/types/{module}/*.pb.go`
2. List all JSON field names from the struct
3. Use exact matches in JavaScript code

## Files That Reference Field Names
- `erp/ui/web/js/reference-registry-*.js` - Reference lookups
- `erp/ui/web/l8ui/m/js/layer8m-reference-registry.js` - Mobile reference lookups
- `erp/ui/web/{module}/js/*-columns.js` - Table column definitions
- `erp/ui/web/{module}/js/*-form.js` - Form field definitions

## Quick Field Name Lookup
```bash
# List all fields for a type
grep -A 30 "type ScmWarehouse struct" go/types/scm/*.pb.go | grep 'json:"'
```

---

# 14. JS Column and Form Field Name Verification

**Source:** `js-column-field-verification.md`

## Rule
Every field name used in JavaScript column definitions (`*-columns.js`) and form definitions (`*-forms.js`) MUST be verified against the protobuf JSON field name before use. Never guess, assume, or invent field names. This applies to ALL JS code that references data model fields.

## Root Cause
During refactoring (column factory, form factory, enum factory conversions), field names were written from memory or guessed instead of being verified against the protobuf `.pb.go` files. This introduced ~450 silent field name mismatches across 9 modules, causing empty table cells throughout the UI. The data existed on the server but was invisible because JS accessed non-existent properties.

## MANDATORY: Protobuf-First Workflow
When writing or refactoring ANY JS file that references data model fields:

1. **BEFORE writing any field name**, read the protobuf struct:
   ```bash
   grep -A 40 "type ModelName struct" go/types/<module>/*.pb.go
   ```

2. Extract the protobuf JSON field name from the `protobuf` tag (`json=camelCaseName`):
   ```
   protobuf:"bytes,7,opt,name=projected_inflows,json=projectedInflows,proto3"
   ```
   The correct JS field name is `projectedInflows`.

3. **ONLY use field names that exist in the protobuf struct.** Never invent fields.

4. **After writing**, verify every field name in the file against the protobuf struct. Every `key:` value and every `item.xxx` reference MUST have an exact match in the protobuf.

## Common Mismatch Categories
| Category | Example Wrong | Example Correct |
|---|---|---|
| Singular vs Plural | `projectedInflow` | `projectedInflows` |
| Abbreviated | `allocatedQty` | `allocatedQuantity` |
| Missing prefix | `reason` | `reasonCode` |
| Fabricated field | `salePrice` | `disposalProceeds` |
| Timestamp convention | `signedAt` | `signedDate` |
| Wrong prefix | `fromDepartment` | `fromDepartmentId` |
| Semantic guess | `oldValue` | `previousValue` |

## Applies To
- Desktop column files: `go/erp/ui/web/*/**/*-columns.js`
- Desktop form files: `go/erp/ui/web/*/**/*-forms.js`
- Mobile column files: `go/erp/ui/web/m/js/**/*-columns.js`
- Mobile form files: `go/erp/ui/web/m/js/**/*-forms.js`
- Any `render: (item) => fn(item.fieldName)` usage
- Reference registries

## Error Symptom
Table rows appear but specific columns are empty (no data, no error). The failure is completely silent — no console errors are produced. This makes it extremely hard to debug without checking the protobuf definitions.

## This Rule Is Non-Negotiable
During refactoring, it is tempting to write field names from memory to save time. DO NOT DO THIS. Always read the `.pb.go` file first. The cost of checking is seconds; the cost of not checking is hundreds of broken columns across the UI.

---

# 15. JavaScript UI Model Names Must Match Protobuf Types

**Source:** `js-protobuf-model-names.md`

## Rule
JavaScript UI model names MUST exactly match the protobuf type names. Do not abbreviate, omit prefixes, or modify the names.

## Why This Matters
The server uses protobuf type names to look up table schemas. If the JavaScript UI sends a different model name, the server returns "Cannot find node for table X" errors.

## Common Mistakes

### Module Prefix Omission
Protobuf types often have a module prefix (e.g., `Sales`, `Scm`, `Fin`). Never omit it:

| Wrong (JS) | Correct (JS) | Protobuf Type |
|------------|--------------|---------------|
| `ReturnOrder` | `SalesReturnOrder` | `SalesReturnOrder` |
| `CustomerHierarchy` | `SalesCustomerHierarchy` | `SalesCustomerHierarchy` |
| `PurchaseOrder` | `ScmPurchaseOrder` | `ScmPurchaseOrder` |
| `Warehouse` | `ScmWarehouse` | `ScmWarehouse` |

### Where Model Names Appear in JS

1. **Config files** (`*-config.js`):
   ```javascript
   { key: 'returns', label: 'Returns', model: 'SalesReturnOrder' }  // Correct
   { key: 'returns', label: 'Returns', model: 'ReturnOrder' }       // WRONG
   ```

2. **Form definitions** (`*-forms.js`):
   ```javascript
   SalesOrders.forms = {
       SalesReturnOrder: { ... }  // Correct - key must match protobuf type
       ReturnOrder: { ... }       // WRONG
   }
   ```

3. **Column definitions** (`*-columns.js`):
   ```javascript
   SalesOrders.columns = {
       SalesReturnOrder: [ ... ]  // Correct
       ReturnOrder: [ ... ]       // WRONG
   }
   ```

4. **Primary key mappings**:
   ```javascript
   SalesOrders.primaryKeys = {
       SalesReturnOrder: 'returnOrderId'  // Correct
       ReturnOrder: 'returnOrderId'       // WRONG
   }
   ```

5. **Reference lookups** (`lookupModel` in forms):
   ```javascript
   { key: 'warehouseId', type: 'reference', lookupModel: 'ScmWarehouse' }  // Correct
   { key: 'warehouseId', type: 'reference', lookupModel: 'Warehouse' }     // WRONG
   ```

6. **Navigation configs** (mobile/desktop nav):
   ```javascript
   { model: 'SalesReturnOrder' }  // Correct
   { model: 'ReturnOrder' }       // WRONG
   ```

## Verification Process

Before implementing UI for a module:

1. **Find the protobuf types**:
   ```bash
   grep "type Sales" go/types/sales/*.pb.go | grep "struct {"
   ```

2. **List all type names**:
   ```bash
   grep -oP "type \K\w+" go/types/sales/*.pb.go | grep -v "^is" | sort -u
   ```

3. **Use exact names** from the protobuf output in all JavaScript files.

## Error Symptom
```
(Error) - Cannot find node for table ReturnOrder
```
This means JS sent `ReturnOrder` but the protobuf type is `SalesReturnOrder`.

## Files to Check When Adding a Module

- `*-config.js` - service definitions with `model` property
- `*-forms.js` - form definition keys and `lookupModel` references
- `*-columns.js` - column definition keys
- `*-renderers.js` - any model references
- `layer8m-nav-config.js` - mobile navigation model references
- `reference-registry*.js` - reference registry keys

---

# 16. Nested Protobuf Types in Form Definitions

**Source:** `money-field-type-mapping.md`

## Rule
Before using any form factory method (`f.text()`, `f.number()`, etc.) for a field, you MUST check its protobuf type. If the protobuf type is a nested object (pointer to another struct like `*erp.Something`), a repeated field (`[]string`, `[]*Type`), or a map (`map[string]string`), you CANNOT use scalar form methods like `f.text()`, `f.number()`, or `f.textarea()`. These will display `[object Object]` because JavaScript stringifies the nested object.

## How to Check
```bash
# Look up the actual protobuf type for any field
grep -A 30 "type ModelName struct" go/types/<module>/*.pb.go
```

If a field's Go type starts with `*`, `[]`, or `map[`, it is NOT a simple scalar — it requires special handling.

## What to Do

### If a form factory method already exists for that type → use it
Example: `*erp.Money` → `f.money()`, `*erp.Address` → `f.address()`, `*erp.DateRange` → two `f.date()` calls

### If NO form factory method exists for that type → create one first
1. Add a factory method to `layer8-form-factory.js` that produces the correct `type:` value
2. Add a `case` handler in `layer8d-forms-fields.js` `generateFieldHtml()` to render it
3. Add a `case` handler in `layer8d-forms-data.js` `collectFormData()` to collect it
4. Then use the new factory method in form definitions

### Never work around it by using f.text() or f.textarea()
This will appear to work during development but will display `[object Object]` at runtime.

## Current Type Mappings

| Go Type Pattern | Form Factory | Why |
|----------------|-------------|-----|
| `string`, `int32`, `int64`, `float64`, `bool` | `f.text()`, `f.number()`, `f.checkbox()` | Simple scalars — safe |
| `*erp.Money` | `f.money()` | Nested `{amount, currencyCode}` |
| `*erp.Address` | `...f.address('prefix')` | Expands to 6 address fields |
| `*erp.ContactInfo` | `...f.contact('prefix')` | Expands to email + phone |
| `*erp.DateRange` | Two `f.date('parent.startDate/endDate')` | Two timestamps in nested object |
| `*erp.AuditInfo` | `...f.audit()` | Read-only metadata |
| `[]string` | `f.text()` (temporary) | Displays comma-separated; needs future `f.tags()` |
| Any new `*erp.X` | **Create handler first** | Never use scalar fallback |

## Error Symptoms
- `[object Object]` in form field → nested type using scalar form method
- Field empty on edit but table shows data → dot-notation key not resolving
- Save corrupts data → form sends scalar but server expects nested object

---

# 17. Compound Form Field Data Collection

**Source:** `compound-form-field-data-collection.md`

## Rule
When a form field type renders **multiple sub-elements** with modified names (e.g., `fieldKey.__amount`, `fieldKey.__currencyId`), the data collection code MUST NOT rely on `form.elements[field.key]` to find the element — it won't exist.

## Why This Matters
The standard data collection pattern is:
```javascript
const element = form.elements[field.key];
if (!element) return;  // ← Skips the ENTIRE field silently!
```

For compound fields (like `type: 'money'`), no single element has `name="fieldKey"`. The sub-elements have names like `fieldKey.__amount` and `fieldKey.__currencyId`. The guard silently skips data collection, the server receives no value, and required validation fails with a cryptic error.

## The Trap
This bug is **silent** — no console error, no visible failure during form rendering. The form looks correct, the user fills in values, but on save the server rejects with "Field is required" because the data was never collected.

## Checklist for Compound Field Types
When adding a new compound field type (a field that renders multiple sub-inputs):

1. **Rendering**: Sub-elements use `name="${field.key}.__subField"` convention
2. **Data collection guard**: Add the field type to the guard exception:
   ```javascript
   if (!element && field.type !== 'money' && field.type !== 'newCompoundType') return;
   ```
3. **Data collection case**: Use `form.elements[field.key + '.__subField']` or `form.querySelector()` to find sub-elements directly
4. **Test manually**: After implementing, verify that saving a form with the compound field actually sends the data to the server

## Current Compound Field Types
- `money` — renders `fieldKey.__currencyId` (`<select>`) + `fieldKey.__amount` (formatted input)

## Desktop vs Mobile
- **Desktop** (`layer8d-forms-data.js`): Uses `form.elements[field.key]` lookup — VULNERABLE to this bug
- **Mobile** (`layer8m-forms.js`): Iterates all `input, select, textarea` elements by name — NOT vulnerable (collects all sub-elements, then post-processes compound keys)

---

# 18. Form and Column Field Coverage

**Source:** `form-column-field-coverage.md`

## Rule
Every non-system field in a protobuf struct MUST be accounted for in both the form definition (`*-forms.js`) and column definition (`*-columns.js`). No field should be silently omitted.

## Why This Matters
When fields are silently skipped during form/column creation, the UI becomes incomplete in ways that are hard to detect. A selection field without its contextual fields (e.g., "Monthly" period without a month selector) renders the entire feature meaningless. Users can set a value but cannot provide the detail that gives it meaning.

## System Fields (Excluded by Default)
These fields are handled automatically and do NOT need form/column entries:
- Primary key ID (e.g., `targetId`) — auto-generated on POST
- `auditInfo` — rendered via `...f.audit()` or omitted (read-only metadata)
- `customFields` — generic map, not a domain field

## Process

### When Creating or Modifying Form/Column Definitions

1. **List all protobuf fields**:
   ```bash
   grep -A 30 "type ModelName struct" go/types/<module>/*.pb.go | grep 'json:"'
   ```

2. **For each non-system field**, verify it appears in:
   - The form definition (`*-forms.js`) — as an input field
   - The column definition (`*-columns.js`) — as a table column (at minimum the most important fields)

3. **If a field is intentionally excluded**, add a comment in the form definition explaining why:
   ```javascript
   // Omitted: internalScore — system-calculated, not user-editable
   ```

4. **Watch for dependent field groups** — fields that only make sense together:
   - Enum/type selector + detail fields (e.g., `period` + `quarter` + `month`)
   - Parent reference + child context (e.g., `orderId` + `lineNumber`)
   - Range pairs (e.g., `minQuantity` + `maxQuantity`)

   If any field in a dependent group is included, ALL fields in that group must be included.

## Verification Command
After creating or modifying any form definition, compare against the protobuf:
```bash
# List all protobuf JSON field names for the model
grep -A 40 "type ModelName struct" go/types/<module>/*.pb.go | \
  grep -oP 'json:"\K[^,"]+' | sort

# List all field keys in the form definition
grep -oP "key:\s*'[^']+'" <forms-file> | sort

# Compare (any field in protobuf but not in form needs justification)
```

## Error Symptoms
- A selection/enum field exists but its meaning is unclear (e.g., "Monthly" with no month shown)
- Users can create records but critical context is missing
- Table rows show partial information that doesn't tell the full story
- Data exists on the server but is invisible in the UI

## Common Dependent Field Groups
| Selector Field | Dependent Fields | Why |
|---------------|-----------------|-----|
| `period` (enum) | `month`, `quarter`, `year` | Period type without time specifics is meaningless |
| `addressType` | address fields | Type without address is meaningless |
| `paymentMethod` | method-specific fields | Method without details is meaningless |
| `status` (with reason) | `reason`, `reasonCode` | Status change without reason loses context |

---

# 19. Select Field Enum Completeness

**Source:** `select-enum-completeness.md`

## Rule
Every `f.select()` call in a form definition MUST reference an enum that is **defined and exported** in the corresponding `*-enums.js` file. Never add a `f.select()` with an enum reference without verifying the enum exists in the exports.

## Why This Is Critical
`f.select('field', 'Label', enums.SOME_ENUM)` stores `enums.SOME_ENUM` as `field.options`. If `SOME_ENUM` is not exported from the enums file, `field.options` is `undefined`. When the detail modal opens, `generateSelectHtml()` calls `Object.entries(field.options)` which throws:
```
Uncaught TypeError: Cannot convert undefined or null to object
    at Object.entries (<anonymous>)
    at generateSelectHtml (layer8d-forms-fields.js:284)
```

This crash is **deferred** — it only happens when a user clicks a row to open the detail view, not at page load. The table renders fine, making it hard to catch during development.

## The Bug Pattern
```javascript
// In *-forms.js:
const enums = SomeModule.enums;
SomeModule.forms = {
    SomeModel: f.form('Model', [
        f.section('Details', [
            ...f.select('status', 'Status', enums.SOME_STATUS),  // ← crashes if SOME_STATUS not exported
        ])
    ])
};

// In *-enums.js:
SomeModule.enums = {
    OTHER_STATUS: OTHER_STATUS.enum,        // ← SOME_STATUS is missing!
    OTHER_STATUS_CLASSES: OTHER_STATUS.classes
};
```

## Checklist When Adding f.select()
1. **Identify the enum name** used as the 3rd argument (e.g., `enums.SEGMENT_TYPE`)
2. **Open the corresponding `*-enums.js` file** and verify `SEGMENT_TYPE` exists in the `.enums = { ... }` export block
3. If missing:
   a. Check the protobuf for enum values: `grep -A 10 'EnumName_' go/types/<module>/*.pb.go`
   b. Add the `factory.create([...])` definition
   c. Add to the `.enums = { ... }` export
   d. Add a renderer to `.render = { ... }` if the enum is used in columns
4. **Verify on BOTH desktop and mobile** — enum files are separate per platform

## Verification Command
After creating or modifying any `*-forms.js` file:
```bash
# Extract all enum references from f.select() calls in the forms file
grep -oP "enums\.\K[A-Z_]+" <forms-file>

# Check each one exists in the corresponding enums file export block
grep "<ENUM_NAME>" <enums-file>
```

## Error Symptom
- Clicking a table row to open detail view throws `Cannot convert undefined or null to object`
- Stack trace shows `generateSelectHtml` → `generateFieldHtml` → `generateFormHtml`
- The table itself renders fine — only the detail modal crashes
- ALL rows crash, not just specific ones (since the field definition is static)

---

# 20. Column Factory Method Completeness

**Source:** `column-factory-method-completeness.md`

## Rule
Every column factory method used in `*-columns.js` files MUST exist in `layer8-column-factory.js`. If a column definition calls `col.someMethod()` and `someMethod` does not exist on the factory object, the entire column definition object literal will fail with a TypeError — silently breaking ALL tables across ALL sections.

## Why This Is Critical
JavaScript object literal construction is atomic. If ANY spread expression (`...col.missing()`) throws during construction, the ENTIRE assignment fails:

```javascript
// If col.number() doesn't exist, this ENTIRE object is never assigned
Module.columns = {
    ModelA: [
        ...col.id('id'),          // would work
        ...col.col('name'),       // would work
        ...col.number('qty'),     // THROWS TypeError — entire Module.columns = undefined
    ],
    ModelB: [...],                // never reached
    ModelC: [...],                // never reached
};
```

**Result**: `Module.columns` remains `undefined`. The service registry falls back to `DEFAULT_COLUMNS` (`id`, `name`, `status`) for ALL models. Most columns appear empty because the data fields don't match these default keys. No console error is visible unless the developer opens DevTools and checks for the TypeError.

## The Failure Mode
1. Developer adds `...col.number('field')` to column definitions
2. `col.number` is `undefined` (method doesn't exist on factory)
3. `col.number('field')` throws `TypeError: col.number is not a function`
4. The entire `Module.columns = { ... }` assignment fails
5. ALL models lose their column definitions — not just the one with the bad call
6. ALL tables fall back to DEFAULT_COLUMNS: `id`, `name`, `status`
7. User sees "most columns are empty across ALL sections"
8. No obvious error — looks like a data or serialization bug

## Prevention

### Before Using Any Factory Method
Verify the method exists in `layer8-column-factory.js`:
```bash
grep "function(key" layer8-column-factory.js | grep -oP '^\s+\K\w+'
```

### Available Factory Methods
Keep this list synchronized with the factory:
- `col(key, label)` — basic text column
- `basic(keys)` — multiple basic columns from array
- `number(key, label)` — numeric column
- `boolean(key, label, options)` — boolean column
- `status(key, label, enumValues, renderer)` — status badge column
- `enum(key, label, enumValues, renderer)` — enum text column
- `date(key, label)` — date column
- `money(key, label)` — money column
- `period(key, label)` — period column
- `id(key, label)` — ID column
- `custom(key, label, renderFn, options)` — custom render column
- `link(key, label, onClick, displayFn)` — clickable link column

### When Adding a New Column Type
If a new column type is needed (e.g., `percent`, `duration`, `badge`):
1. **Add the method to `layer8-column-factory.js` FIRST**
2. **Then** use it in `*-columns.js` files
3. **Never** use a factory method that doesn't exist yet

### Verification After Any Column Change
```bash
# Extract all factory method calls from column files
grep -oP 'col\.(\w+)\(' *-columns.js | sort -u

# Extract all defined methods from factory
grep -oP '^\s+(\w+):\s*function' layer8-column-factory.js | sort -u

# Any method in the first list but NOT in the second list will cause a total UI failure
```

## Error Symptom
- ALL table sections show only `id`, `name`, `status` columns (DEFAULT_COLUMNS)
- Most columns are empty across ALL sections — not just one model
- No server errors — data retrieval works correctly
- TypeError in console (only visible if DevTools is open): `col.xxx is not a function`
- Looks like a serialization or field name mismatch, but the real issue is a missing factory method

## Historical Context
This bug affected the l8bugs project when `col.number()` was used in column definitions but the `number()` method did not exist in the column factory. All 6 model tables (Bug, Feature, BugsProject, BugsAssignee, BugsDigest, BugsSprint) fell back to DEFAULT_COLUMNS, making it appear as though field names were mismatched with the protobuf.

---

# 21. Column Factory Renderer Validation

**Source:** `column-factory-renderer-validation.md`

## Rule
Every `col.enum()` and `col.status()` call MUST pass a valid function as the `renderer` argument (4th parameter). The renderer is captured in a closure at column-definition time and called later at render time. If it is `undefined`, the error only appears when data arrives — with an unhelpful "renderer is not a function" stack trace that does NOT identify which column caused it.

## Why This Is Critical
The column factory's `enum(key, label, enumValues, renderer)` and `status(key, label, enumValues, renderer)` methods create a closure: `render: (item) => renderer(item[key])`. If `renderer` is `undefined` at definition time:
- No error occurs when the column is defined (silent capture of `undefined`)
- No error occurs when the table initializes
- The crash only happens when data arrives and the table tries to render
- The error message ("renderer is not a function") gives no indication of WHICH column or module is broken
- All modules initialize successfully, making the bug extremely hard to trace

## Common Causes

### 1. Missing render property in enum file
```javascript
// enums file defines render object but misses a property
Module.render = {
    statusA: createStatusRenderer(...),
    // statusB is missing!
};

// columns file references the missing property
...col.enum('status', 'Status', null, render.statusB)  // renderer = undefined
```

### 2. Wrong argument order (3 args instead of 4)
```javascript
// WRONG: renderer goes into enumValues, 4th arg is undefined
...col.enum('status', 'Status', render.myFunc)

// CORRECT: null for enumValues, renderer as 4th arg
...col.enum('status', 'Status', null, render.myFunc)
```

### 3. Render object not yet populated
```javascript
// columns file captures render object before enums file runs
const render = Module.render;  // undefined if enums hasn't loaded yet
```

## Defensive Guard (Built Into Factory)
The column factory now validates `renderer` at definition time and logs a clear error:
```
Layer8ColumnFactory.enum('status', 'Status'): renderer is not a function (got undefined).
Check that the render object is populated before columns are defined.
```
If renderer is not a function, it falls back to `String(item[key] ?? '')` to prevent crashes.

## Verification
After creating or modifying any `*-columns.js` file:
1. Check that every `col.enum()` and `col.status()` call has exactly 4 arguments
2. Verify the 4th argument references a function that exists in the corresponding `*-enums.js` render object
3. Open the browser console — any renderer validation errors will appear immediately at page load (not deferred to data fetch)

---

# 22. Renderer Factory vs Direct Call

**Source:** `renderer-factory-vs-direct.md`

## Rule
When assigning a renderer function to a render object property, you MUST distinguish between **factory functions** (which return a renderer) and **direct renderers** (which render a value immediately). Calling a direct renderer as if it were a factory silently crashes the entire file.

## The Two Patterns

### Factory Functions (return a function)
These are called WITH arguments to CREATE a renderer:
```javascript
// createStatusRenderer IS a factory — returns a function
bugStatus: createStatusRenderer(BUG_STATUS.enum, BUG_STATUS.classes),
// Result: bugStatus is a FUNCTION that can be called later as bugStatus(value)
```

### Direct Renderers (render immediately)
These must be WRAPPED in a closure, not called directly:
```javascript
// WRONG — calls renderEnum immediately with wrong arguments, crashes
assigneeType: renderEnum(ASSIGNEE_TYPE.enum),
// renderEnum(value, enumMap) is called with (enumMap) as value — enumMap param is undefined → TypeError

// CORRECT — wrap in a closure to create a factory-like renderer
assigneeType: createEnumRenderer(ASSIGNEE_TYPE.enum),
// OR manually:
assigneeType: (value) => renderEnum(value, ASSIGNEE_TYPE.enum),
```

## Why This Crashes Everything
The render object is typically assigned inside an IIFE:
```javascript
(function() {
    Module.render = {
        bugStatus: createStatusRenderer(...),    // OK — factory
        assigneeType: renderEnum(ENUM_MAP),      // CRASHES — direct call with wrong args
        projectVisibility: renderEnum(ENUM_MAP), // never reached
    };
})();
```

When `renderEnum(ENUM_MAP)` throws TypeError, the ENTIRE IIFE fails. `Module.render` is never assigned. Then the columns file does `const render = Module.render;` which gets `undefined`. Then `render.bugStatus` throws another TypeError, preventing `Module.columns` from being assigned. ALL tables fall back to DEFAULT_COLUMNS (`id`, `name`, `status`).

## The Cascade
1. Direct renderer called as factory → TypeError in enums file
2. `Module.render` never assigned (stays undefined)
3. Columns file: `const render = Module.render` → render is undefined
4. `render.bugStatus` → TypeError in columns file
5. `Module.columns` never assigned
6. ALL tables use DEFAULT_COLUMNS: `{key:'id'}, {key:'name'}, {key:'status'}`
7. ID columns blank (data has `bugId` not `id`)
8. Name columns blank (data has `title` not `name`)
9. Status shows raw numbers (no renderer function)

## Available Renderer Functions

### Factories (call directly, they return functions)
- `createStatusRenderer(enumMap, classMap)` → returns `(value) => renderStatus(...)`
- `createEnumRenderer(enumMap, defaultLabel)` → returns `(value) => renderEnum(...)`

### Direct Renderers (must wrap in closure or use factory equivalent)
- `renderEnum(value, enumMap, defaultLabel)` — use `createEnumRenderer` instead
- `renderStatus(value, enumMap, classMap)` — use `createStatusRenderer` instead
- `renderDate(value, options)` — OK to assign directly as `date: renderDate` (function reference, not called)
- `renderBoolean(value, options)` — wrap: `(value) => renderBoolean(value, opts)`

## Verification
After creating or modifying any `*-enums.js` render object:
1. Check every property — is it calling a factory or a direct renderer?
2. If calling a direct renderer (more than 1 arg expected), it MUST be wrapped
3. Open the browser console — look for TypeError in the enums file
4. Check if `Module.render` is defined: `console.log(Module.render)` should not be undefined

## Error Symptoms
- ALL table sections show only `id`, `name`, `status` columns
- ID columns are blank (data uses model-specific IDs like `bugId`, `featureId`)
- Name columns are blank (data uses `title` or model-specific fields)
- Status columns show raw numbers (1, 2, 3) instead of labels
- NO console errors visible unless DevTools is open before page load
- Looks like field name mismatches or serialization issues, but the real cause is a crashed enums file

---

# 23. Template Literal Ternary Edit Safety

**Source:** `template-literal-ternary-edits.md`

## Rule
When wrapping existing content inside a JavaScript template literal with a conditional expression (`${condition ? \`...\` : ''}`), the Edit tool's `old_string` MUST include enough context to cover BOTH the opening AND closing of the new nesting level. Never add an opening `${condition ? \`` without also editing the corresponding closing to add `` \` : ''}`.

## Why This Is Critical
Template literals can nest (backticks inside `${}`), but every opening backtick needs a matching close. A partial edit that introduces a new nesting level without closing it creates a **syntax error that silently kills the entire JS file** — no console error, no runtime exception, just undefined functions.

## The Dangerous Pattern

### WRONG: Partial edit that only covers the opening
```javascript
// old_string covers lines 5-10
        <div class="section">
            <table>
                <tbody>${items.map(i => `...`).join('')}</tbody>

// new_string wraps in ternary but doesn't close it
        ${items.length > 0 ? `
        <div class="section">
            <table>
                <tbody>${items.map(i => `...`).join('')}</tbody>
```
The existing `</table></div>` and outer closing backtick remain unchanged, so the ternary is never closed with `` ` : ''}`.

### CORRECT: Edit includes enough context to close the ternary
```javascript
// old_string covers lines 5-12 (includes the closing tags)
        <div class="section">
            <table>
                <tbody>${items.map(i => `...`).join('')}</tbody>
            </table>
        </div>

// new_string properly opens AND closes the ternary
        ${items.length > 0 ? `
        <div class="section">
            <table>
                <tbody>${items.map(i => `...`).join('')}</tbody>
            </table>
        </div>
        ` : ''}
```

## Verification
After ANY edit that adds ternary expressions or conditional wrappers inside template literals:
1. **Run `node -c <file>` immediately** to check for syntax errors
2. Count opening `${` and closing `}` — they must match
3. Count backticks — every `` ` `` inside a `${}` expression needs a matching close
4. Verify every ternary `? \`` has a corresponding `` \` : ...}`

## Error Symptoms
- Clicking a button/row does nothing (the handler function is undefined because the file failed to load)
- "X is not a function" in console (if the caller has error handling)
- No visible error at all (the most common case — the file silently fails to parse)
- User reports "I don't see any change" after edits (the edited file isn't loading)

## When This Applies
- Adding null guards around optional HTML sections in template literals
- Wrapping table/div sections in `${array.length > 0 ? \`...\` : ''}` conditionals
- Any edit that introduces new `${}` nesting inside an existing template literal

---

# 24. Stacked Popup DOM Scoping

**Source:** `stacked-popup-dom-scoping.md`

## Rule
Never use `document.getElementById()` or `document.querySelector()` to find elements inside a popup when the popup system supports stacking (nested modals). Always scope DOM lookups to the **active popup's body**.

## Why This Is Critical
The Layer8DPopup system uses a modal stack. When a child popup opens on top of a parent popup, both exist in the DOM simultaneously. If both popups contain elements with the same ID (e.g., `<form id="layer8d-edit-form">`), `document.getElementById()` returns the **first** one in DOM order — which is the stacked (hidden) parent, not the active child popup. This causes data to be read from or written to the wrong form.

## The Bug Pattern
```javascript
// WRONG — finds the parent form when a child popup is stacked on top
const form = document.getElementById('layer8d-edit-form');
const data = collectFromForm(form); // collects empty/wrong data
```

```javascript
// CORRECT — scopes to the active (topmost) popup
let form = null;
if (typeof Layer8DPopup !== 'undefined') {
    const body = Layer8DPopup.getBody(); // returns topmost non-stacked popup body
    if (body) {
        form = body.querySelector('#layer8d-edit-form');
    }
}
if (!form) {
    form = document.getElementById('layer8d-edit-form'); // fallback when no popup
}
```

## When This Applies
- Any code that reads form data from a popup (collectFormData, getFormData)
- Any code that writes to or manipulates DOM elements inside a popup
- Any code triggered by popup button callbacks (onSave, onShow) that needs to find elements
- Inline table row editors (child popups opened from within a parent edit form)

## Key APIs
- **Desktop**: `Layer8DPopup.getBody()` — returns the topmost non-stacked popup's body element
- **Mobile**: `popup.body` — passed directly to callbacks by `Layer8MPopup`, already scoped correctly

## Error Symptom
- Editing a child row in an inline table and pressing Save/Update results in blanked data
- Form data collected is empty or contains the parent form's values instead of the child form's
- No console errors — the failure is completely silent

---

# 25. UI Module Integration Checklist

**Source:** `ui-module-integration.md`

## Rule
When implementing a new ERP module, the UI integration is NOT complete until ALL of the following files are created/updated. Do not mark the module as complete until this checklist is verified.

## Required Steps for Desktop UI

### 1. Section HTML File
- **File**: `go/erp/ui/web/sections/<module>.html`
- Must contain the full module structure (NOT a placeholder)
- Must include: header with SVG illustration, module tabs, service navigation, table containers
- Use existing sections (crm.html, hcm.html) as templates

### 2. Section Initializer
- **File**: `go/erp/ui/web/js/sections.js`
- Add module to `sectionInitializers` object:
  ```javascript
  <module>: () => {
      if (typeof initialize<Module> === 'function') {
          initialize<Module>();
      }
  },
  ```

### 3. Module CSS
- **File**: `go/erp/ui/web/<module>/<module>.css`
- Include module-specific accent color for header and active states
- Include status/priority/type color classes as needed

### 4. Reference Registry
- **File**: `go/erp/ui/web/js/reference-registry-<module>.js`
- Must be included in `app.html`

### 5. app.html Updates
All of the following must be added to `go/erp/ui/web/app.html`:

#### CSS Include (in `<head>` section)
```html
<link rel="stylesheet" href="<module>/<module>.css">
```

#### Reference Registry Include (after other reference registries)
```html
<script src="js/reference-registry-<module>.js"></script>
```

#### Module Scripts (after other module scripts, before SYS Module)
```html
<!-- <MODULE> Module -->
<script src="<module>/<module>-config.js"></script>
<script src="<module>/<submodule1>/<submodule1>-enums.js"></script>
<script src="<module>/<submodule1>/<submodule1>-columns.js"></script>
<script src="<module>/<submodule1>/<submodule1>-forms.js"></script>
<script src="<module>/<submodule1>/<submodule1>.js"></script>
<!-- ... repeat for all submodules ... -->
<script src="<module>/<module>-init.js"></script>
```

## Verification Commands

After implementation, verify with:
```bash
# Check section HTML is not a placeholder
grep -l "under development" go/erp/ui/web/sections/<module>.html && echo "ERROR: Placeholder still present"

# Check section initializer exists
grep "<module>:" go/erp/ui/web/js/sections.js

# Check CSS is included in app.html
grep "<module>/<module>.css" go/erp/ui/web/app.html

# Check reference registry is included
grep "reference-registry-<module>.js" go/erp/ui/web/app.html

# Check module scripts are included
grep "<module>-init.js" go/erp/ui/web/app.html
```

## Common Mistake
Creating the submodule JS files (enums, columns, forms) but forgetting to:
- Update the section HTML from placeholder to actual content
- Add section initializer to sections.js
- Add script includes to app.html
- Create and include the CSS file

This results in the module appearing in navigation but showing "under development" or not functioning when clicked.

---

# 26. Module Init sectionSelector Must Match defaultModule

**Source:** `module-init-section-selector.md`

## Rule
In `*-init.js` files that use `Layer8DModuleFactory.create()`, the `sectionSelector` property MUST match the `defaultModule` property value.

## Why This Matters
The navigation code in `layer8d-module-navigation.js` searches for the section container using:
```javascript
document.querySelector(`.hcm-module-content[data-module="${config.sectionSelector}"]`)
```

The `data-module` attributes in the HTML correspond to submodule names (e.g., `planning`, `resources`, `opportunities`), NOT the section name (e.g., `projects`, `crm`).

If `sectionSelector` doesn't match any `data-module` attribute in the HTML, the module will fail to initialize with the error:
```
<Module> section container not found
```

## Correct Pattern

```javascript
// CORRECT - sectionSelector matches defaultModule
Layer8DModuleFactory.create({
    namespace: 'Prj',
    defaultModule: 'planning',        // <-- These must match
    defaultService: 'projects',
    sectionSelector: 'planning',      // <-- These must match
    initializerName: 'initializePrj',
    requiredNamespaces: [...]
});
```

```javascript
// WRONG - sectionSelector uses section name instead of module name
Layer8DModuleFactory.create({
    namespace: 'Prj',
    defaultModule: 'planning',
    defaultService: 'projects',
    sectionSelector: 'projects',      // <-- WRONG: 'projects' is the section, not the module
    initializerName: 'initializePrj',
    requiredNamespaces: [...]
});
```

## Verification
When creating a module init file, verify:
1. `sectionSelector` === `defaultModule`
2. The HTML has `<div class="hcm-module-content" data-module="${sectionSelector}">`

## Examples from Existing Modules

| Module | defaultModule | sectionSelector |
|--------|---------------|-----------------|
| CRM    | opportunities | opportunities   |
| PRJ    | planning      | planning        |
| HCM    | core-hr       | core-hr         |
| FIN    | general-ledger| general-ledger  |

---

# 27. Reference Registry Completeness

**Source:** `reference-registry-completeness.md`

## Rule
Every model used as a `lookupModel` in form definitions MUST have a corresponding entry in the reference registry. Forms with unregistered lookupModels will fail silently or show console warnings.

## When This Applies
- When creating or modifying `*-forms.js` files
- When adding new `type: 'reference'` fields to forms
- When creating a new ERP module with reference lookups

## Required Actions

### Before Adding a Reference Field
Before adding a field like this to a form:
```javascript
{ key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer' }
```

Verify the model exists in the reference registry:
```bash
grep -r "Customer:" go/erp/ui/web/js/reference-registry-*.js
```

### If Model is NOT Registered
Add it to the appropriate reference registry file:

**Desktop:** `go/erp/ui/web/js/reference-registry-<module>.js`
```javascript
...refModule.simple('Customer', 'customerId', 'name', 'Customer'),
```

**Mobile:** `go/erp/ui/web/l8ui/m/js/layer8m-reference-registry-<module>.js`
```javascript
Customer: {
    idColumn: 'customerId',
    displayColumn: 'name',
    selectColumns: ['customerId', 'name'],
    displayLabel: 'Customer'
},
```

### Reference Registry Entry Requirements
Each entry must have:
- `idColumn`: The primary key field name (from protobuf)
- `displayColumn`: Field to show in the picker
- `selectColumns`: Fields to fetch for display
- `displayLabel`: Human-readable name (optional but recommended)
- `displayFormat`: Custom format function (optional, for complex displays)

## Verification Commands

### Check for Missing Registrations
```bash
# Get all lookupModel values used in forms
grep -rh "lookupModel: '" go/erp/ui/web --include="*-forms.js" | \
  sed "s/.*lookupModel: '\\([^']*\\)'.*/\\1/" | sort -u > /tmp/used.txt

# Get all registered models
grep -rhoE "(simple|coded|batch|batchIdOnly|idOnly|person)\\(['\"][^'\"]+['\"]" \
  go/erp/ui/web/js/reference-registry-*.js | \
  sed "s/.*(['\"]\\([^'\"]*\\)['\"].*/\\1/" | sort -u > /tmp/registered.txt

# Find missing
comm -23 /tmp/used.txt /tmp/registered.txt
```

### Verify a Specific Model
```bash
grep -r "ModelName:" go/erp/ui/web/js/reference-registry-*.js
```

## Common Patterns

### Simple Model (most common)
```javascript
...ref.simple('ModelName', 'primaryKeyId', 'displayField', 'Label'),
```

### Model with Code + Name Display
```javascript
...ref.coded('ModelName', 'primaryKeyId', 'code', 'name'),
```

### Person Model (firstName + lastName)
```javascript
...ref.person('ModelName', 'primaryKeyId'),
```

### ID-Only Model (no display needed)
```javascript
...ref.idOnly('ModelName', 'primaryKeyId'),
```

## Checklist for New Modules

When creating a new module:
1. [ ] Create `reference-registry-<module>.js` for desktop
2. [ ] Create `layer8m-reference-registry-<module>.js` for mobile
3. [ ] Add script includes to `app.html` and `m/app.html`
4. [ ] Register all models that will be used as lookupModel
5. [ ] Update merge file if using split pattern (e.g., `reference-registry-mfg-sales.js`)
6. [ ] Run verification command to confirm no missing registrations

## Error Symptom
```
Reference input missing required config: fieldName
```
This console warning means the lookupModel for that field is not in the reference registry.

---

# 28. Server-Side Pagination Metadata

**Source:** `server-pagination-metadata.md`

## Rule
Server-side paginated responses only return valid metadata (total count, key counts)
on the FIRST page (page 1). Metadata in subsequent page responses MUST be disregarded.

## Why
The server computes aggregate metadata (total counts, status breakdowns) only when
processing page 0 (the first page). Subsequent page responses may include stale,
partial, or zero metadata that does not reflect the actual dataset.

## Implementation Pattern
When processing server responses in pagination code:
- Page 1: Read and store metadata (totalItems, key counts)
- Page 2+: Preserve existing metadata, only update the data items

## What Resets to Page 1 (and triggers fresh metadata)
- Filter changes
- Sort changes (if server-side)
- Base where clause changes
- Page size changes
- Initial load

---

# 29. Layer8DTable: Pagination Metadata Must Only Be Read on Page 1 (CRITICAL)

**Source:** `layer8d-table-pagination-metadata.md`

## Rule
In `Layer8DTable.prototype.fetchData()` (in `layer8d-table-data.js`), the response metadata (`data.metadata.keyCount.counts.Total`) MUST only be read and stored when `page === 1`. On all subsequent pages (page 2+), the previously stored `this.totalItems` value MUST be reused.

## Why This Is Critical
The server only computes aggregate metadata (total count, status breakdowns, key counts) when processing page 0 (the first page). Subsequent page responses return **zero or stale metadata**. If `fetchData` reads metadata on every page, page 2+ will overwrite the correct `totalItems` with 0, causing:

- **Page 1**: "Page 1 of 2002" (correct)
- **Page 2**: "Page 2 of 1" (totalItems overwritten with 0, `Math.ceil(0/15) = 0` → displays as 1)

## The Correct Pattern
```javascript
// CORRECT — only read metadata on page 1
let totalCount = 0;
if (page === 1 && data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
    this.totalItems = totalCount;
} else {
    totalCount = this.totalItems;  // Reuse cached value
}
```

## The Wrong Pattern
```javascript
// WRONG — overwrites totalItems on every page
let totalCount = 0;
if (data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
}
this.setServerData(items, totalCount);  // totalCount is 0 on page 2+!
```

## What Resets to Page 1 (Triggers Fresh Metadata)
These actions set `currentPage = 1` before calling `fetchData`, so metadata is correctly refreshed:
- Filter changes (typing in filter inputs)
- Sort changes (clicking column headers)
- Page size changes (changing items per page)
- Base where clause changes (`setBaseWhereClause()`)
- Initial load / `init()`

## Applies To
- `layer8d-table-data.js` — `Layer8DTable.prototype.fetchData()`
- `layer8d-data-source.js` — `Layer8DDataSource.fetchData()` (already correct)
- Any future data-fetching component that uses server-side pagination

## This Bug Has Recurred Multiple Times
This exact bug has been introduced and fixed repeatedly. The pattern is:
1. Someone modifies `fetchData` or `setServerData`
2. The `page === 1` guard is accidentally removed or bypassed
3. Pagination breaks on page 2+ for ALL server-side tables
4. Symptom: "Page N of 1" on any page after the first

**When modifying ANY pagination or data-fetching code, verify the `page === 1` guard is intact.**

---

# 30. Immutability Must Be Reflected in the UI

**Source:** `immutability-ui-alignment.md`

## Rule
When an entity or field is defined as immutable (in the PRD, proto, or backend validation), the UI MUST be updated to match. Backend immutability without corresponding UI changes is incomplete implementation.

## Entity-Level Immutability
If an entity rejects PUT requests (the entire entity is immutable after creation):
- The table view MUST be set to read-only mode (no edit/update controls)
- Detail popups MUST render all fields as display-only (no editable inputs)
- The "Edit" / "Save" buttons MUST be hidden or disabled
- POST (create) and DELETE may still be allowed unless also restricted

## Field-Level Immutability
If specific fields on an entity are protected from modification on PUT:
- Those fields MUST render as read-only / display-only in edit forms
- Editable fields should remain as normal inputs
- The form should visually distinguish between editable and read-only fields

## Checklist
When implementing immutability at any level:
1. Backend: Add validation (reject PUT, protect fields)
2. UI config: Set service/table to read-only mode if entity-level
3. UI forms: Mark protected fields as display-only if field-level
4. Verify: Confirm the UI does not present controls that the backend will reject

---

# 31. Mobile Parity

**Source:** `mobile-parity.md`

## Rule
Every UI feature must have **functional parity** between desktop and mobile. This means not just the UI element, but also its **behavioral effects** on the rest of the application.

### 1. When Implementing a New Feature
Before marking any UI task as complete, verify the feature works on both desktop (`go/erp/ui/web/`) and mobile (`go/erp/ui/web/m/`). If only one side was implemented, implement the other before moving on.

### 2. When Touching Any Section or Module
Whenever you modify or work on a section (e.g., System, HCM, Financial), audit the **entire section** for desktop/mobile parity gaps before finishing. Compare:
- Desktop section HTML (`sections/<module>.html`) vs mobile section HTML (`m/sections/<module>.html`)
- Desktop JS features (detail popups, tabs, interactive elements) vs mobile equivalents
- Script includes in `app.html` vs `m/app.html`

If you find gaps, flag them to the user and offer to fix them.

### 3. Behavioral Effects (CRITICAL)
A feature includes **all its downstream effects**, not just the UI element itself. When implementing a feature, trace its effects across the entire application on BOTH platforms.

Examples:
- **Module enable/disable**: The toggle tree UI exists on both platforms. But does disabling a module actually HIDE it from navigation on both platforms? Check sidebar, dashboard cards, sub-module tabs, and service cards.
- **Configuration changes**: If a settings page changes behavior (e.g., currency selection, theme), does the change propagate to all UI components on both platforms?
- **Data operations**: If a CRUD operation on one view affects what's shown in another view, does that cross-view effect work on both platforms?

**Ask yourself**: "If a user performs this action on mobile, will the result be identical to performing it on desktop?" If not, there's a parity gap.

## Verification Checklist
When working on a section, ask yourself:
1. Does the desktop version have detail popups? Does mobile?
2. Does the desktop version have interactive features (sorting, filtering, tabs)? Does mobile?
3. Are all shared scripts included in both `app.html` and `m/app.html`?
4. Are section HTML files placeholders ("Under Development") on one side but functional on the other?
5. **Does the feature's EFFECT propagate to all navigation and display components on both platforms?**
6. **Do shared components (Layer8DModuleFilter, Layer8DUtils, etc.) get consumed by both desktop and mobile navigation?**

## Why This Matters
Parity is not just "does the same button exist on both platforms." It is "does the same action produce the same result on both platforms." A settings page that renders identically on both platforms but only affects desktop navigation is NOT at parity — the behavioral effect is missing on mobile.

---

# 32. Demo Directory Must Stay in Sync with Source

**Source:** `demo-directory-sync.md`

## Rule
The `/go/demo/web/` directory is a copy of `/go/bugs/website/web/` (or the equivalent source web directory). After modifying ANY file under the source web directory, the corresponding file in the demo directory MUST be updated immediately.

## Why This Matters
The demo directory serves as the local development/testing server's web root. If the source files are fixed but the demo copies are not updated, the user continues to see the bug in their browser. This creates confusion where "the fix was applied" but "nothing changed."

## Process
After editing any file under the source web directory:
```bash
# Copy the modified file to the demo directory
cp /go/bugs/website/web/<path> /go/demo/web/<path>

# Verify all files are in sync
diff -rq /go/bugs/website/web/l8ui/ /go/demo/web/l8ui/
diff -rq /go/bugs/website/web/m/ /go/demo/web/m/
```

## What to Sync
- All files under `l8ui/` (shared components, module files)
- All files under `m/` (mobile files)
- `app.html` and `m/app.html`
- CSS files, JS files, images

## What NOT to Sync
- `login.json` (demo may have different config)
- Server-generated files
- Build artifacts

---

# 33. L8UI Theme Compliance

**Source:** `l8ui-theme-compliance.md`

## Rule
All UI components in the `l8ui/` directory MUST use the canonical `--layer8d-*` CSS custom properties defined in `layer8d-theme.css`. Never introduce generic/unprefixed CSS variable names (e.g., `--accent-color`, `--bg-primary`, `--text-primary`) in component CSS files.

## CSS Variables

### Required Token Usage
| Purpose | Use | Never Use |
|---------|-----|-----------|
| Primary accent | `var(--layer8d-primary)` | `var(--accent-color, ...)` |
| White/card background | `var(--layer8d-bg-white)` | `var(--bg-primary, #ffffff)` |
| Light background | `var(--layer8d-bg-light)` | `var(--bg-secondary, ...)` |
| Input background | `var(--layer8d-bg-input)` | `var(--bg-tertiary, ...)` |
| Dark text | `var(--layer8d-text-dark)` | `var(--text-primary, ...)` |
| Medium text | `var(--layer8d-text-medium)` | `var(--text-secondary, ...)` |
| Light text | `var(--layer8d-text-light)` | `var(--text-tertiary, ...)` |
| Muted text | `var(--layer8d-text-muted)` | hardcoded `#718096` etc. |
| Border | `var(--layer8d-border)` | `var(--border-color, ...)` |
| Status colors | `var(--layer8d-success)`, `var(--layer8d-warning)`, `var(--layer8d-error)` | hardcoded hex |

### No Per-View Dark Mode Blocks
Dark mode is handled centrally in `layer8d-theme.css` via `[data-theme="dark"]` overrides on `--layer8d-*` tokens. Component CSS files MUST NOT contain their own `[data-theme="dark"]` blocks. If a component uses `--layer8d-*` tokens, dark mode works automatically.

## Buttons
Reuse the shared button classes from `layer8d-theme.css`:
- `layer8d-btn layer8d-btn-primary layer8d-btn-small` for primary actions
- `layer8d-btn layer8d-btn-secondary layer8d-btn-small` for secondary actions

Do NOT create per-view button styles (e.g., `.layer8d-kanban-add-btn`, `.layer8d-wizard-btn-primary`).

## JavaScript Color References
JS render files MUST NOT hardcode hex color values for theme-dependent elements (backgrounds, text, borders, chart palettes). Instead:

1. Use `Layer8DChart.readThemeColor(varName, fallback)` for individual colors
2. Use `Layer8DChart.getThemePalette()` for chart/data visualization color arrays
3. Cache theme colors at the start of a render pass if reading multiple values

### Example
```javascript
// WRONG
const color = '#3b82f6';
const colors = ['#0ea5e9', '#22c55e', '#f59e0b'];

// CORRECT
const color = Layer8DChart.readThemeColor('--layer8d-primary', '#0ea5e9');
const colors = Layer8DChart.getThemePalette();
```

## Verification
After creating or modifying any l8ui component CSS/JS:
1. `grep 'var(--accent-color\|var(--bg-primary\|var(--text-primary\|var(--border-color' <file>` should return nothing
2. `grep '#3b82f6' <file>` should return nothing (old indigo accent)
3. No `[data-theme="dark"]` blocks in the component CSS
4. `node -c <file>` passes for any modified JS files

---

# 34. L8UI Guide Update

**Source:** `l8ui-guide-update.md`

## Rule
Whenever a component in the `l8ui/` directory is **created, modified, or deleted**, the `l8ui/GUIDE.md` file MUST be updated to reflect the change. Do not mark the task as complete until the guide is up to date.

## What to Update
- **New component**: Add a new subsection under the appropriate API section (Desktop or Mobile) documenting the constructor/options, public methods, and any viewConfig options.
- **Modified component**: Update the existing subsection to reflect new methods, changed parameters, removed APIs, or new behavior.
- **New CSS file**: Add to the script/CSS loading order sections (Desktop section 3, Mobile section 4).
- **New JS file**: Add to the script loading order sections in the correct dependency position.
- **Deleted component**: Remove the subsection and any references from loading order sections.

## What to Document
For each component, the guide entry should include:
1. **Global object name** (e.g., `window.Layer8DChart`)
2. **Constructor options** or factory parameters
3. **Public methods** with parameter signatures
4. **viewConfig options** (if the component is a registered view type)
5. **Registration** with Layer8DViewFactory if applicable

## Why This Matters
The GUIDE.md is the primary reference for AI assistants and developers building with l8ui. If a component exists but isn't documented, it won't be used correctly (or at all), leading to reimplementation or incorrect integration.

---

# 35. L8UI GUIDE.md Prerequisite

**Source:** `l8ui-guide-prerequisite.md`

## Rule
Before implementing or using ANY l8ui component (desktop or mobile), you MUST read the `l8ui/GUIDE.md` file in the project's web directory. Do not write UI code that references l8ui components without first reading this guide.

## Why This Matters
The GUIDE.md documents all available l8ui components, their APIs, constructor options, viewConfig parameters, and integration patterns. Without reading it, you will:
- Miss existing components and reinvent functionality
- Use incorrect API signatures or viewConfig options
- Fail to follow established integration patterns (e.g., Layer8DViewFactory registration, Layer8DModuleFactory.create() options)

## When This Applies
- Creating a new module or section UI
- Adding a new view type (kanban, chart, etc.) to an existing service
- Modifying how services are initialized or registered
- Using any Layer8D* or Layer8M* component
- Configuring viewConfig options for any view type
- Adding script includes to app.html or m/app.html

## What to Look For in GUIDE.md
1. **Component APIs**: Constructor options, public methods, event callbacks
2. **viewConfig options**: Per-view-type configuration (kanban lanes, chart axes, etc.)
3. **Script loading order**: Dependency order for JS/CSS includes
4. **Module creation pattern**: How to use Layer8DModuleFactory.create()
5. **Mobile equivalents**: Mobile component APIs and differences from desktop

## Location
- **L8ERP**: `go/erp/ui/web/l8ui/GUIDE.md`
- **L8Bugs**: `go/bugs/website/web/l8ui/GUIDE.md`

---

# 36. Mock Data Generation

**Source:** `mock-data-generation.md`

## Location
All mock data files live in `go/tests/mocks/`. The system generates phased, dependency-ordered mock data with realistic ("flavorable") distributions.

## Prerequisites
- Module protobuf types exist in `go/types/<module>/`
- Module service area number is known (HCM=10, FIN=40, SCM=50)

## Step-by-Step Process

### Step 1: Read the new module's protobuf files
- Identify all structs (models), their exact field names/types, and enums
- Note cross-module references (fields pointing to HCM employees, FIN vendors, etc.)
- Pay close attention to actual field names — they often differ from what you'd guess (e.g., `RmaId` not `AuthorizationId`)

### Step 2: Determine phase ordering
- Group models by dependency: foundation objects first, then objects that reference them
- Typically 5-10 phases per module
- Foundation (no deps) -> Core entities -> Dependent objects -> Transactions -> Planning/Analytics

### Step 3: Add module data arrays to `data.go`
- Curated name arrays for realistic variety (category names, entity names, etc.)
- Place after existing module data with a comment header

### Step 4: Add ID slices to `store.go`
- One `[]string` per model in the `MockDataStore` struct, grouped by phase with comments
- Use module prefix for names that could collide with other modules (e.g., `SCMWarehouseIDs`, `SCMCarrierIDs`)

### Step 5: Create generator files (parallelizable)
- One file per logical group (e.g., `gen_<module>_foundation.go`, `gen_<module>_inventory.go`)
- Each file must stay under 500 lines
- Each function signature: `func generate<Models>(store *MockDataStore) []*<module>.<Model>`
  - Foundation generators with no store deps use: `func generate<Models>() []*<module>.<Model>`
- Patterns to follow:
  - Allocate slice, loop with flavorable distributions (e.g., 60% APPROVED status)
  - `createAuditInfo()` for all audit fields
  - `&erp.Money{Amount: <cents>, CurrencyCode: "USD"}` for monetary fields
  - `time.Unix()` / `.Unix()` for date fields
  - `&erp.DateRange{StartDate: ..., EndDate: ...}` for date ranges
  - Reference `store.*IDs` with modulo indexing for cross-model/cross-module links
  - ID format: `fmt.Sprintf("<prefix>-%03d", i+1)`
- These files can all be created in parallel since they have no interdependencies

### Step 6: Create phase orchestration files
- `<module>_phases.go` (and `<module>_phases<N>_<M>.go` if needed to stay under 500 lines)
- Each phase function:
  1. Calls the generator function
  2. Posts to `/erp/<serviceArea>/<ServiceName>` using `client.post()` with the `*List` wrapper type
  3. Appends returned IDs to `store.*IDs`
  4. Prints count
- ServiceName must be 10 characters or less

### Step 7: Update `main.go`
- Add phase calls after existing modules (with Printf headers)
- Add summary Printf section at the end showing key entity counts

### Step 8: Build and verify
- `go build ./tests/mocks/` and `go vet ./tests/mocks/`
- Most common error: proto field names differ from expectations — always verify against the `.pb.go` files

## Key Patterns

### Flavorable distributions
- Use proportional status assignment: e.g., first 60% get APPROVED, next 20% get IN_PROGRESS, rest cycle through remaining statuses
- Random but bounded values: `rand.Intn(max-min) + min`
- Money amounts in cents: `int64(rand.Intn(rangeSize) + minimum)`

### Cross-module references
- HCM: `EmployeeIDs`, `ManagerIDs`, `DepartmentIDs` (for managers, requesters, assignees)
- FIN: `VendorIDs` (for procurement, suppliers), `CustomerIDs` (for shipments, returns)
- Always check `len(store.*IDs) > 0` before accessing when the dependency is optional

### File naming convention
- Generator files: `gen_<module>_<group>.go`
- Phase files: `<module>_phases.go`, `<module>_phases<N>_<M>.go`

---

# 37. Mock Data Completeness

**Source:** `mock-completeness.md`

## Rule
When implementing mock data generators for a module, ALL services in that module MUST have corresponding mock data generators. No service should be left without mock data.

## Why This Matters
Incomplete mock data causes confusion during testing and development. Users see some tables populated and others empty, leading to debugging sessions to figure out if it's a bug or missing mock data.

## Verification Process

### Before Implementation
1. **List all services in the module**:
   ```bash
   ls -la go/erp/<module>/
   ```

2. **Extract service names from the directories**:
   Each subdirectory represents a service that needs mock data.

3. **Cross-reference with UI config**:
   Check `go/erp/ui/web/<module>/<module>-config.js` to see all services defined in the UI.

### During Implementation
Create a checklist of all services and mark them as you implement:

```
Module: Sales (33 services)
- [ ] customerhierarchies
- [ ] customersegments
- [ ] customercontracts
- [ ] partnerchannels
- [ ] pricelists
- [ ] pricelistentries
- [ ] customerprices
- [ ] discountrules
- [ ] promotionalprices
- [ ] quantitybreaks        <-- Easy to miss!
- [ ] salesquotations
- [ ] quotationlines
- [ ] salesorders
- [ ] salesorderlines
- [ ] orderallocations      <-- Easy to miss!
- [ ] backorders            <-- Easy to miss!
- [ ] returnorders
- [ ] returnorderlines      <-- Easy to miss!
- [ ] deliveryorders
- [ ] deliverylines
- [ ] pickreleases
- [ ] packingslips
- [ ] shippingdocs
- [ ] deliveryconfirms      <-- Easy to miss!
- [ ] billingschedules
- [ ] billingmilestones
- [ ] revenueschedules
- [ ] salesterritories
- [ ] territoryassigns
- [ ] commissionplans
- [ ] commissioncalcs
- [ ] salestargets
- [ ] salesforecasts
```

### After Implementation
1. **Verify store.go has ID slices for all entities**:
   ```bash
   grep "<Module>.*IDs" go/tests/mocks/store.go
   ```

2. **Verify all generators exist**:
   ```bash
   grep "func generate<Module>" go/tests/mocks/gen_<module>*.go
   ```

3. **Verify all phase calls exist**:
   ```bash
   grep "client.post.*/<serviceArea>/" go/tests/mocks/<module>_phases*.go
   ```

4. **Count services vs generators**:
   ```bash
   # Count services
   ls -d go/erp/<module>/*/ | wc -l

   # Count generators (should match)
   grep -c "func generate<Module>" go/tests/mocks/gen_<module>*.go
   ```

## Common Patterns That Lead to Missing Generators

### 1. Line Items
When a parent entity has line items, both need generators:
- ✅ SalesOrder → ✅ SalesOrderLine
- ✅ SalesReturnOrder → ❌ SalesReturnOrderLine (often missed!)
- ✅ SalesQuotation → ✅ SalesQuotationLine

### 2. Secondary/Support Entities
These are often overlooked:
- Allocations (OrderAllocation, InventoryAllocation)
- Back orders
- Confirmations (DeliveryConfirm, ReceivingConfirm)
- Break tables (QuantityBreak, PriceBreak)

### 3. Junction/Assignment Tables
- TerritoryAssign
- EmployeeSkill
- CourseEnrollment

## Generator File Organization

Organize generators by functional area to make completeness easier to verify:

```
gen_<module>_foundation.go    - Base/master data
gen_<module>_<area1>.go       - First functional area
gen_<module>_<area2>.go       - Second functional area
...
```

Each file should have a comment header listing what it generates:

```go
// gen_sales_orders.go
// Generates:
// - SalesQuotation
// - SalesQuotationLine
// - SalesOrder
// - SalesOrderLine
// - SalesOrderAllocation
// - SalesBackOrder
// - SalesReturnOrder
// - SalesReturnOrderLine
```

## Phase Organization

Group related entities in the same phase for dependency management:

```
Phase 1: Foundation (no dependencies)
Phase 2: Core entities (depend on foundation)
Phase 3: Configuration (depend on core)
Phase 4: Transactions (depend on configuration)
Phase 5: Line items (depend on transactions)
Phase 6+: Additional areas
```

## Checklist Before PR

- [ ] All services in `go/erp/<module>/` have generators
- [ ] All services in UI config have generators
- [ ] store.go has ID slices for all entities
- [ ] All generators are called in phase files
- [ ] Build passes: `go build ./tests/mocks/`
- [ ] Vet passes: `go vet ./tests/mocks/`

---

# 38. Mock Data Must Cover All UI Columns

**Source:** `mock-data-column-coverage.md`

## Rule
Every field that has a UI column definition (`*-columns.js`) MUST be populated by the corresponding mock data generator. If a column exists for a field, the mock data MUST set a non-zero value for that field. No column should display empty because mock data omitted the field.

## Why This Matters
Protobuf uses `omitempty` for JSON serialization. Any field left at its zero value (0 for int32, "" for string, 0 for enum) is omitted from the JSON response. The UI table then shows an empty cell. This creates the false impression of a bug when the real issue is incomplete mock data.

This is especially insidious because:
- The field name is correct in the column definition
- The field exists in the protobuf
- No error is logged anywhere
- The column renders fine — it just has no data to show

## Verification Process

### When Adding or Modifying Column Definitions
1. List all field keys used in the column definitions:
   ```bash
   grep -oP "col\.\w+\('[^']+'" <columns-file> | grep -oP "'[^']+'" | tr -d "'"
   ```

2. For each field key, verify the mock data generator sets that field:
   ```bash
   grep "<FieldName>:" go/tests/mocks/gen_*.go
   ```

3. If any column field is NOT set in the generator, add it immediately.

### When Adding or Modifying Mock Data Generators
1. List all column fields for the model:
   ```bash
   grep -A 50 "ModelName:" <columns-file>
   ```

2. Verify every column field is set in the generator.

## Special Cases

### Enum Fields
Enum fields with `omitempty` are omitted when set to 0 (the UNSPECIFIED value). Mock data for enum columns MUST use a non-zero enum value to ensure the column displays data.

### AI/Computed Fields
Fields populated by AI or background processes (e.g., `triageStatus`, `aiConfidence`, `aiEstimatedEffort`) still need mock data. Use realistic simulated values. A subset of records (e.g., first 20%) can be left at zero to simulate "pending" status.

### Conditional Fields
Fields that only apply in certain states (e.g., `resolvedDate` only for resolved bugs, `resolution` only for closed bugs) should be populated on records that are in the appropriate state.

## Checklist Before PR

When touching column definitions or mock generators:
- [ ] Every column field key has a matching field set in the mock generator
- [ ] Enum columns use non-zero values (at least on most records)
- [ ] `go build ./tests/mocks/` passes
- [ ] `go vet ./tests/mocks/` passes
- [ ] Run the test suite and visually verify tables show data in all columns

## Error Symptom
- Table columns appear but show no data (empty cells)
- No console errors, no server errors
- The protobuf field exists and the column key is correct
- Data appears for some columns but not others in the same row

---

# 39. Mock Endpoint Construction

**Source:** `mock-endpoint-construction.md`

## Endpoint Format
Mock endpoints must follow this exact format:
```
/erp/{ServiceArea}/{ServiceName}
```

## Finding the Correct ServiceName
The `ServiceName` constant is defined in each service's `*Service.go` file. Before writing a mock endpoint:

1. Locate the service file: `go/erp/{module}/{servicedir}/*Service.go`
2. Find the `ServiceName` constant (typically around line 30)
3. Use that exact value in the endpoint

## Example
For Sales Territory service:
```go
// In go/erp/sales/salesterritories/SalesTerritoryService.go
const (
    ServiceName = "Territory"  // <-- Use this value
    ServiceArea = byte(60)
)
```

Mock endpoint should be:
```go
client.post("/erp/60/Territory", &sales.SalesTerritoryList{...})
```

**NOT** `/erp/60/SalesTerritory` (incorrect - doesn't match ServiceName)

## ServiceName Constraint
ServiceName must be 10 characters or less (per maintainability.md). This is why names are abbreviated:
- `Territory` not `SalesTerritory`
- `DlvryOrder` not `DeliveryOrder`
- `CustSegmt` not `CustomerSegment`

## Verification Checklist
Before creating mock phase files:
1. Run: `grep "ServiceName = " go/erp/{module}/**/*Service.go` to list all service names
2. Cross-reference each mock endpoint against the grep output
3. Ensure exact match between endpoint path segment and ServiceName constant

## Common Mistakes to Avoid
- Using the type name (e.g., `SalesTerritory`) instead of ServiceName (`Territory`)
- Guessing abbreviated names instead of checking the actual constant
- Forgetting that ServiceName has a 10-character limit

---

# 40. Mock Phase Ordering

**Source:** `mock-phase-ordering.md`

## Rule
When adding server-side validation (e.g., `ValidateRequired`) for a foreign key field, you MUST verify that the mock data phase ordering ensures the referenced entity's IDs are populated BEFORE any generator that uses them.

## Why This Matters
Mock generators use `pickRef(store.XxxIDs, index)` to reference entities from other modules. If `store.XxxIDs` is empty (because the referenced module hasn't run yet), `pickRef` returns `""`, and any `ValidateRequired` check on that field will fail with "XxxId is required".

## The `pickRef` Trap
```go
func pickRef(ids []string, index int) string {
    if len(ids) == 0 {
        return ""  // ← Silent empty string, not an error!
    }
    return ids[index%len(ids)]
}
```

`pickRef` does NOT panic or warn when the slice is empty. It silently returns an empty string, which passes Go compilation but fails server validation at runtime.

## Current Module Phase Order (in `main_phases.go`)

FIN and HCM have a circular dependency, resolved by splitting FIN:
```
1. FIN Foundation (Phases 1-3) — CurrencyIDs, FiscalYearIDs, Accounts, Vendors, Customers
2. HCM (all phases)            — EmployeeIDs, DepartmentIDs (needs CurrencyIDs)
3. FIN Remaining (Phases 4-9)  — Budgets, AP, AR, GL, Assets, Tax (needs DepartmentIDs, EmployeeIDs)
4. SCM
5. Sales
6. MFG
7. CRM
8. PRJ
9. BI
10. DOC
11. ECOM
12. COMP
```

## Why FIN is Split
- FIN Phases 1-3: No HCM dependency. Provides CurrencyIDs needed by ALL modules.
- FIN Phase 4 (`gen_fin_config.go`): Uses `store.DepartmentIDs` for Budgets.
- FIN Phase 8 (`gen_fin_assets.go`): Uses `store.EmployeeIDs` and `store.DepartmentIDs`.
- HCM: Uses `store.CurrencyIDs` in gen_compensation.go, gen_payroll.go, gen_benefits.go, gen_employee_data.go.

**When splitting modules like this, use `runXxxFoundation()` and `runXxxRemaining()` in `main_phases_modules*.go`.**

## Checklist When Adding Required Validation

Before adding `common.ValidateRequired(entity.SomeId, "SomeId")` to a service callback:

1. **Identify which module generates the referenced IDs** (e.g., CurrencyIDs come from FIN)
2. **Check `main_phases.go`** to confirm that module runs BEFORE the module being validated
3. **Check mock generators** for the validated entity — verify they set the field using `pickRef(store.XxxIDs, ...)`
4. **If the referenced module runs AFTER**, either:
   - Reorder modules in `main_phases.go` (preferred if no circular dependency)
   - Move the referenced entity generation to an earlier cross-module bootstrap phase

## Common Cross-Module Dependencies
| Field | Source Module | Source Phase | Used By |
|-------|-------------|-------------|---------|
| CurrencyIDs | FIN | Phase 1 | ALL modules (via Money fields) |
| EmployeeIDs | HCM | Phase 1-3 | FIN 8, CRM, PRJ, MFG, Sales |
| DepartmentIDs | HCM | Phase 1 | FIN 4+8, PRJ, MFG |
| VendorIDs | FIN | Phase 2 | SCM, MFG |
| CustomerIDs | FIN | Phase 2 | Sales, ECOM, CRM |
| ItemIDs | SCM | Phase 1 | Sales, MFG, ECOM |

## Direct Index Access Trap
Some generators use `store.XxxIDs[i]` or `store.XxxIDs[0]` (direct index, not `pickRef`). These will **panic** with "index out of range" if the slice is empty, rather than silently returning "". Both patterns are dangerous but panics are at least immediately visible.
