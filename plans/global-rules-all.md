# L8ERP Global Rules (All)

These are Claude Code global rules for the Layer8 ERP project. Load this file at the start of a session to apply all rules.

**Source files:** `~/.claude/rules/*.md` (41 rule files)

---

## Table of Contents

### Architecture & Process
1. [Plan Approval Workflow](#1-plan-approval-workflow)
2. [Code Maintainability Standards](#2-code-maintainability-standards)
3. [Prime Object Rules](#3-prime-object-rules)
4. [Report Infrastructure Bugs Instead of Working Around Them](#4-report-infrastructure-bugs-instead-of-working-around-them)

### Protobuf
5. [Protobuf Generation](#5-protobuf-generation)
6. [Protobuf List Type Convention](#6-protobuf-list-type-convention)
7. [Protobuf Enum Zero Value Convention](#7-protobuf-enum-zero-value-convention)

### Go/Server
8. [Third-Party Code Lives in Vendor](#8-third-party-code-lives-in-vendor)
9. [Test Location and Approach](#9-test-location-and-approach)
10. [Test Data Field Verification](#10-test-data-field-verification)
11. [Clean Up Test Binaries](#11-clean-up-test-binaries)
12. [Run-Local Script Requirement](#12-run-local-script-requirement)
13. [Deployment Artifacts Must Be Included in PRDs](#13-deployment-artifacts-must-be-included-in-prds)

### L8Query
14. [L8Query Model Names Must Match Protobuf Types](#14-l8query-model-names-must-match-protobuf-types)
15. [L8Query Must Use SELECT * for Detail Popups](#15-l8query-must-use-select--for-detail-popups)
16. [GetEntities with Empty Filter Must Use L8Query](#16-getentities-with-empty-filter-must-use-l8query)
17. [Service GET Requests Require L8Query](#17-service-get-requests-require-l8query)

### JavaScript Field Naming
18. [JavaScript Protobuf Field Name Verification](#18-javascript-protobuf-field-name-verification)

### JavaScript Forms
19. [Nested Protobuf Types in Form Definitions](#19-nested-protobuf-types-in-form-definitions)
20. [Compound Form Field Data Collection](#20-compound-form-field-data-collection)

### JavaScript Columns & Renderers
21. [Column Factory Completeness](#21-column-factory-completeness)
22. [Enum Renderer API](#22-enum-renderer-api)
23. [Enum and Renderer Completeness](#23-enum-and-renderer-completeness)

### JavaScript Template/DOM
24. [Template Literal Ternary Edit Safety](#24-template-literal-ternary-edit-safety)
25. [Stacked Popup DOM Scoping](#25-stacked-popup-dom-scoping)

### UI Integration
26. [UI Module Integration Checklist](#26-ui-module-integration-checklist)
27. [Module Init sectionSelector Must Match defaultModule](#27-module-init-sectionselector-must-match-defaultmodule)
28. [Reference Registry Completeness](#28-reference-registry-completeness)
29. [Layer8DTable: Pagination Metadata Must Only Be Read on Page 1](#29-layer8dtable-pagination-metadata-must-only-be-read-on-page-1)
30. [Immutability Must Be Reflected in the UI](#30-immutability-must-be-reflected-in-the-ui)
31. [Mobile Parity](#31-mobile-parity)
32. [Do NOT Touch the Demo Directory](#32-do-not-touch-the-demo-directory)

### L8UI
33. [L8UI Theme Compliance](#33-l8ui-theme-compliance)
34. [L8UI Guide Update](#34-l8ui-guide-update)
35. [L8UI GUIDE.md Prerequisite](#35-l8ui-guidemd-prerequisite)

### Mock Data
36. [Mock Data Generation](#36-mock-data-generation)
37. [Data Completeness Pipeline](#37-data-completeness-pipeline)
38. [Mock Endpoint Construction](#38-mock-endpoint-construction)
39. [Mock Phase Ordering](#39-mock-phase-ordering)

### Deployment & Configuration
40. [Login JSON Adaptation](#40-login-json-adaptation)
41. [ModConfig Failure Must Not Logout](#41-modconfig-failure-must-not-logout)

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

## ServiceName
ServiceName should not be larger than 10 characters.

## ServiceArea
ServiceArea should be the same for Services under the same Module.

## ServiceCallback Auto-Generate ID
Every `*ServiceCallback.go` must auto-generate the primary key ID on POST (Add) operations. In the `Before()` method, insert `common.GenerateID(&entity.PrimaryKeyField)` between the type assertion and the `validate()` call, guarded by `if action == ifs.POST`. The primary key field name is found in the corresponding `*Service.go` file's `SetPrimaryKeys("XxxId")` call. This ensures that Add operations from the UI (which don't include the primary key field in the form) succeed without "XxxId is required" errors.

## UI Type Registration
When creating a service, the model type must be registered in the UI. Add it to the appropriate `register<Module>Types` function in `go/erp/ui/main.go`. Follow the existing pattern: use `introspect.AddPrimaryKeyDecorator` to mark the primary key field, then call `registry.Register` with the type. If a `register<Module>Types` function doesn't exist for your module, create one following the pattern of `registerFinTypes` or `registerScmTypes`.

## Guidelines
- Each file should have a single responsibility
- Use logical module/package organization
- Check for existing shared utilities before creating new ones

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
    repeated SalesOrderLine lines = 20;
    repeated SalesOrderAllocation allocations = 21;
    erp.AuditInfo audit_info = 30;
}

message SalesOrderLine {
    string line_id = 1;
    string item_id = 2;
    int32 quantity = 3;
    erp.Money unit_price = 4;
}

// WRONG: Child type as separate service
// go/erp/sales/salesorderlines/SalesOrderLineService.go  <-- SHOULD NOT EXIST
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
    repeated CoverageOption coverage_options = 14;
    repeated PlanCost costs = 15;
    EligibilityRules eligibility = 16;
}
```

## Rule 2: Cross-References Between Prime Objects

Prime Objects MUST NEVER contain direct struct references (`*OtherPrimeType` or `[]*OtherPrimeType`) to other Prime Objects. Prime Objects refer to each other **ONLY via ID fields** (string).

### Why This Is Critical
When the introspector inspects a type, it recursively inspects all nested struct fields. If Prime Object A contains `[]*PrimeObjectB`, inspecting A creates a node for B in the introspector's `typeToNode` map WITHOUT B's primary key decorator. When B's service later activates and adds its decorator, it goes to a different node in `pathToNode`. This causes "Decorator Not Found" errors at runtime.

### Correct Pattern
```protobuf
// WRONG - Direct reference to another Prime Object
message BenefitEnrollment {
    repeated Dependent covered_dependents = 15;
}

// CORRECT - Reference via ID only
message BenefitEnrollment {
    repeated string covered_dependent_ids = 15;
}
```

### What Is Allowed
- Prime Objects MAY contain fields of **shared/common types** (e.g., `erp.Money`, `erp.Address`, `erp.AuditInfo`, `erp.ContactInfo`, `erp.DateRange`)
- Prime Objects MAY contain `repeated` fields of **embedded child types** (types without their own service)
- Prime Objects MAY reference other Prime Objects via **string ID fields**

## Rule 3: UI Implications of Prime vs Child

### Prime Object UI Stack (standalone)
A Prime Object gets ALL of the following:
- **Config entry** in `*-config.js`
- **Column definitions** in `*-columns.js`
- **Form definition** in `*-forms.js`
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
- **Inline table in parent form** — child rows displayed via `f.inlineTable()` within the parent's form definition
- **Mock data inline** — generated as part of the parent's `repeated` field

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

## Verification

### Before creating a new service
1. Apply the Prime Object Test (Rule 1) — does the entity pass ALL four criteria?
2. If it has a parent_id field that is always required, it is a child — embed it in the parent
3. If unsure, default to embedded child

### Before creating or modifying a protobuf message
1. Check if any `*Type` or `repeated Type` fields reference a Prime Object
2. If yes, replace with the corresponding ID field(s)
3. After fixing proto, regenerate bindings, update mock generators, forms, and columns

---

# 4. Report Infrastructure Bugs Instead of Working Around Them

**Source:** `report-infra-bugs.md`

## Rule
When an expected scenario does not work properly due to a bug in the underlying infrastructure (framework, SDK, shared libraries), do NOT alter the code to work around the bug. Instead, highlight the bug to the user and let them fix it.

## What This Means
- If a function call should work based on its documented/expected behavior but doesn't, report it — don't remove the call or add workarounds.
- If a framework API returns unexpected results, flag it — don't restructure the code to avoid the API.
- If a shared component has a bug that causes downstream failures, identify the root cause — don't patch over it in the consuming code.

## What to Report
1. **What fails**: The exact error or unexpected behavior
2. **Where the bug is**: Which infrastructure function/API is misbehaving
3. **Expected behavior**: What the function should do based on its contract
4. **Actual behavior**: What it actually does
5. **Impact**: What features are blocked until the bug is fixed

---

# 5. Protobuf Generation

**Source:** `protobuf-generation.md`

## Rule
Whenever ANY `.proto` file is created, modified, or removed, you **MUST** run `make-bindings.sh` to regenerate ALL protobuf bindings. **NO EXCEPTIONS.**

**NEVER attempt to compile individual proto files manually.** Do NOT run individual `docker run` commands or `protoc` commands. The ONLY way to generate bindings is via `make-bindings.sh`. This is a hard requirement — violating it wastes time and produces errors.

## How to Run

```bash
cd proto && ./make-bindings.sh
```

**Do NOT use the `sed` pipe method** (`sed 's/-it /-i /g' make-bindings.sh | bash`) — it silently fails on some steps. Run the script directly.

**What will break if you try other methods:**
- Running the script via `sed` pipe — silently fails on some steps
- Running individual `docker run` commands manually — misses dependency ordering, move steps, and sed fixups
- Running `wget` + `protoc` commands manually — misses the full pipeline
- Running from any directory other than `proto/` — paths break

The script handles everything automatically:
1. Downloads `api.proto` dependency
2. Compiles ALL proto files in the correct order
3. Moves generated `.pb.go` files to `/go/types/`
4. Fixes import paths

## When to Run
- After ANY change to ANY `.proto` file (add field, remove field, add message, remove message, add import, etc.)
- After adding a new `.proto` file (also update `make-bindings.sh` to include it)
- After removing a `.proto` file (also update `make-bindings.sh` to remove it)

## After Running
1. Verify `.pb.go` files exist in `/go/types/<module>/`
2. Build dependent code to ensure types are correct: `go build ./...`

## Field Name Verification
After generation, verify field names by checking the .pb.go files:
```bash
grep -A 30 "type TypeName struct" go/types/<module>/*.pb.go | grep 'json:"'
```

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
```bash
grep -A3 "List {" proto/*.proto | head -20
```

---

# 7. Protobuf Enum Zero Value Convention

**Source:** `proto-enum-zero-value.md`

## Rule
Every protobuf enum MUST have an invalid/unspecified zero value as its first entry. The zero value MUST NOT represent a valid, meaningful state.

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

// WRONG - 0 is a valid value
enum Priority {
  LOW = 0;      // BAD: unset fields appear as LOW
  MEDIUM = 1;
  HIGH = 2;
}
```

## Verification
```bash
grep -A1 "^enum " proto/*.proto | grep "= 0" | grep -iv "unspecified\|invalid\|unknown"
```

---

# 8. Third-Party Code Lives in Vendor

**Source:** `vendor-third-party-code.md`

## Rule
All third-party dependencies are vendored. The `vendor/` directory under the **Go module root** (`go/vendor/`) is the location for all external code. When searching for code across the project's dependencies, look in `go/vendor/`, not in `$GOPATH`, module cache, or sibling project directories.

## Vendor Location
The Go module root is `go/` (where `go.mod` lives), so the vendor directory is at:
```
<project-root>/go/vendor/github.com/saichler/<dependency>/...
```

**Do NOT search sibling directories** like `/home/saichler/proj/src/github.com/saichler/<dep>/` — those are separate checkouts that may be at different versions than what the project depends on. Always use the vendored copy.

## Implications
- When tracing code into dependencies, find the source in `go/vendor/`
- Do NOT use `go get` to fetch code for reading — it's already in `go/vendor/`
- After adding or updating any dependency, run `cd go && go mod vendor`

---

# 9. Test Location and Approach

**Source:** `test-location-and-approach.md`

## Rule
All tests MUST live in the `go/tests/` directory. Do NOT place `_test.go` files alongside source code in package directories.

Tests MUST use the system API (IVNic, service endpoints, HTTP calls) to exercise functionality end-to-end. Do NOT write unit tests that directly call unexported/internal functions.

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
```bash
find go/ -name "*_test.go" -not -path "go/tests/*"
# If any results appear, those tests are in the wrong location
```

---

# 10. Test Data Field Verification

**Source:** `test-data-field-verification.md`

## Rule
When constructing test data as `map[string]interface{}` for HTTP POST/PUT requests, every key in the map MUST exist as a field on the target protobuf struct. Never guess or assume field names — always verify against the `.pb.go` file first.

## Why This Matters
The server deserializes JSON request bodies against registered protobuf types. If the JSON contains a field that doesn't exist on the protobuf struct, the parser rejects the entire payload with `unknown field "xxx"`. This causes a `400 Bad Request` with the cryptic error `Cannot find pb for method POST`.

## Verification Before Writing Test Data
```bash
grep -A 40 "type <TypeName> struct" go/types/<module>/*.pb.go | grep 'json:"'
```

## Common Mistakes
| Mistake | Why It Happens |
|---------|---------------|
| Using a field from a related type | e.g., `message` belongs to Event, not Alarm |
| Inventing descriptive fields | e.g., adding `"reason"` when the struct has `"reasonCode"` |
| Using Go field name instead of JSON name | e.g., `"AlarmId"` instead of `"alarmId"` |

---

# 11. Clean Up Test Binaries

**Source:** `cleanup-test-binaries.md`

## Rule
When running `go build` to verify compilation, NEVER use `go build ./path/to/main/package/` — for `main` packages this produces a binary in the current working directory.

### Preferred: Build all packages at once (no binaries produced)
```bash
go build ./...
```

### If you must build a specific main package:
```bash
go build -o /dev/null ./path/to/main/package/
```

---

# 12. Run-Local Script Requirement

**Source:** `run-local-script.md`

## Rule
Every Layer 8 project that has a fully implemented PRD (backend services, UI, mock data) MUST include a `run-local.sh` script at the Go module root (e.g., `go/run-local.sh`) that starts the entire system locally.

## How to Create
**Always start by copying `l8erp/go/run-local.sh` and adapting it** to the new project. Do NOT write from scratch.

### Adaptation steps:
1. **Copy**: `cp <path-to-l8erp>/go/run-local.sh <new-project>/go/run-local.sh`
2. **Read the entire script** to understand what it does
3. **Adjust** binary names, service paths, UI paths, ports, credentials
4. **Remove** components that don't apply
5. **Add** any project-specific components
6. **Test** end-to-end

## What the Script Must Do
1. Clean and fetch dependencies
2. Start infrastructure (e.g., database container)
3. Build all binaries into a `demo/` directory
4. Copy web assets to `demo/`
5. Generate a `kill_demo.sh` cleanup script
6. Start all services in correct order
7. Wait for services to be ready, then upload mock data
8. Wait for user, then clean up

---

# 13. Deployment Artifacts Must Be Included in PRDs

**Source:** `deployment-artifacts.md`

## Rule
Every PRD that introduces a new deployable service (a new `main` package with its own binary) MUST include a section specifying the deployment artifacts: `build.sh`, `Dockerfile`, K8s YAML, and updates to `build-all-images.sh` and `k8s/deploy.sh`/`k8s/undeploy.sh`.

## Existing Deployment Architecture

### Docker Images (5 images)
Each main method has a `build.sh` + `Dockerfile` in its directory:

| Image | Directory | Base Image | K8s Kind |
|-------|-----------|------------|----------|
| `saichler/erp` | `go/erp/main/` | `saichler/erp-postgres` | StatefulSet |
| `saichler/erp-web` | `go/erp/ui/` | `saichler/erp-security` | DaemonSet (hostNetwork) |
| `saichler/erp-vnet` | `go/erp/vnet/` | `saichler/erp-security` | DaemonSet (hostNetwork) |
| `saichler/erp-logs-vnet` | `go/logs/vnet/` | `saichler/erp-security` | DaemonSet (hostNetwork) |
| `saichler/erp-log-agent` | `go/logs/agent/` | `saichler/erp-security` | DaemonSet |

### Build Pipeline
- **Per-image**: `build.sh` runs `docker build --no-cache --platform=linux/amd64` and `docker push`
- **All images**: `go/build-all-images.sh` calls each `build.sh` in order
- **Dockerfile pattern**: Multi-stage build — `saichler/builder:latest` compiles Go, final stage copies binary to runtime image

### Kubernetes Manifests (`k8s/`)
- `deploy.sh` — applies all YAMLs in dependency order
- `undeploy.sh` — deletes all resources
- Each service gets its own namespace
- All containers mount `/data` from host via `hostPath`

## PRD Section Template

When a PRD introduces a new deployable service, include:
- **Image name**, **directory**, **base images**, **binary name**
- **build.sh** (standard pattern)
- **Dockerfile** (multi-stage pattern)
- **K8s manifest** (namespace, kind, hostNetwork, volumes)
- **Updates** to `build-all-images.sh`, `deploy.sh`, `undeploy.sh`

## When This Does NOT Apply
- New services added to an EXISTING image — no new deployment artifacts needed
- Pure UI changes — served by the existing `erp-web` image
- Library/shared code changes — compiled into existing images

---

# 14. L8Query Model Names Must Match Protobuf Types

**Source:** `protobuf-model-names.md`

## Rule
Everywhere a model name is used — L8Query strings, JS config, forms, columns, reference lookups, navigation — it MUST be the **protobuf type name**, NOT the ServiceName constant. These are often different.

## Common Mismatches

| ServiceName (HTTP path) | Protobuf Type (use this) |
|------------------------|-----------------------------|
| `Sprint` | `BugsSprint` |
| `Project` | `BugsProject` |
| `Territory` | `SalesTerritory` |
| `DlvryOrder` | `ScmDeliveryOrder` |
| `MfgWorkOrd` | `MfgWorkOrder` |
| `ImprtTmpl` | `L8ImportTemplate` |

## Where Model Names Are Used

### In L8Query Strings
```javascript
// CORRECT — protobuf type name
const query = 'select * from SalesTerritory';

// WRONG — ServiceName
const query = 'select * from Territory';  // 400 Bad Request
```

### In JavaScript UI Files
1. **Config files** (`*-config.js`): `{ model: 'SalesReturnOrder' }`
2. **Form definitions** (`*-forms.js`): `Module.forms = { SalesReturnOrder: { ... } }`
3. **Column definitions** (`*-columns.js`): `Module.columns = { SalesReturnOrder: [...] }`
4. **Primary key mappings**: `Module.primaryKeys = { SalesReturnOrder: 'returnOrderId' }`
5. **Reference lookups**: `{ lookupModel: 'ScmWarehouse' }`
6. **Navigation configs**: `{ model: 'SalesReturnOrder' }`

## Finding the Correct Names
```bash
# Find protobuf types for a module
grep "type Sales" go/types/sales/*.pb.go | grep "struct {"

# Confirm a specific type exists
grep "type.*struct {" go/types/<module>/*.pb.go | grep -i <keyword>
```

## Error Symptoms
- HTTP 400 Bad Request on a GET with `?body=` query parameter
- Server log: `Cannot find node for table <wrong-name>`

---

# 15. L8Query Must Use SELECT * for Detail Popups

**Source:** `l8query-select-star-for-detail.md`

## Rule
When a detail popup/modal is opened for any entity and an L8Query is constructed to fetch that entity's data, the query MUST use `select * from ...`. Never use `select attr1, attr2, ... from ...` with a specific column list.

## Why This Matters
Detail forms display ALL fields of an entity. If the query selects only specific columns, the response omits the remaining fields. The detail form then shows empty values for those fields.

## Correct Pattern
```javascript
const query = `select * from AlarmDefinition where definition_id=${id}`;
```

## When SELECT specific columns IS acceptable
- Table/list views where only visible columns are needed
- Reference lookups that only need ID + display name
- Autocomplete/search dropdowns
- Aggregation queries

---

# 16. GetEntities with Empty Filter Must Use L8Query

**Source:** `get-all-entities-l8query.md`

## Rule
When calling `common.GetEntities` with an empty filter (all zero-value fields), the filter-based lookup will return no results. To fetch all entities of a type, you MUST use an L8Query instead.

## Correct Pattern
```go
// WRONG — empty filter returns nothing
years, err := common.GetEntities("FiscalYr", 40, &fin.FiscalYear{}, vnic)

// CORRECT — L8Query fetches all entities
// Use "select * from FiscalYear" (protobuf type name, NOT ServiceName)
```

---

# 17. Service GET Requests Require L8Query

**Source:** `service-get-requires-l8query.md`

## Rule
Every HTTP GET request to a Layer 8 service endpoint MUST include an L8Query passed as a `?body=` query parameter. A bare `fetch('/erp/{area}/{ServiceName}', { method: 'GET' })` with no query parameter will ALWAYS fail.

## Why This Matters
The Layer 8 server expects ALL GET requests to contain a JSON-encoded L8Query in the `?body=` URL parameter. When no `?body=` is provided, the server returns:
```
Cannot find pb for method GET
L8Query-proto: syntax error (line 1:1): unexpected token
```

## The Wrong Pattern
```javascript
// WRONG — bare GET with no L8Query
fetch('/erp/0/ImprtTmpl', { method: 'GET', headers: getHeaders() })
```

## The Correct Pattern
```javascript
// CORRECT — L8Query passed as ?body= parameter
const query = 'select * from L8ImportTemplate';  // Use PROTOBUF TYPE NAME, not ServiceName
const body = encodeURIComponent(JSON.stringify({ text: query }));
fetch('/erp/0/ImprtTmpl?body=' + body, { method: 'GET', headers: getHeaders() })
```

## Two Requirements in One
1. **`?body=` parameter is mandatory** — the server has no default "return everything" behavior
2. **The `from` clause must use the protobuf type name** — NOT the ServiceName

| Component | Example | Used Where |
|-----------|---------|------------|
| ServiceName | `ImprtTmpl` | URL path: `/erp/0/ImprtTmpl?body=...` |
| Protobuf type | `L8ImportTemplate` | L8Query: `select * from L8ImportTemplate` |

## When This Does NOT Apply
- `Layer8DTable` and `Layer8DDataSource` handle L8Query construction automatically
- POST, PUT, DELETE requests use JSON body in the request payload, not `?body=`

## Verification
```bash
grep -n "fetch('/erp/" *.js | grep "GET" | grep -v "?body="
```

---

# 18. JavaScript Protobuf Field Name Verification

**Source:** `js-protobuf-field-names.md`

## Rule
Every field name used in JavaScript (columns, forms, reference registries, renderers) MUST be verified against the protobuf JSON field name before use. Never guess, assume, or invent field names.

## MANDATORY: Protobuf-First Workflow

1. **BEFORE writing any field name**, read the protobuf struct:
   ```bash
   grep -A 40 "type ModelName struct" go/types/<module>/*.pb.go
   ```

2. Extract the JSON field name from the `protobuf` tag (`json=camelCaseName`):
   ```
   protobuf:"bytes,7,opt,name=projected_inflows,json=projectedInflows,proto3"
   ```
   The correct JS field name is `projectedInflows`.

3. **ONLY use field names that exist in the protobuf struct.**

## Field Name Format
Protobuf `snake_case` converts to `camelCase` in JSON:

| Protobuf Field | JSON Name | Common Mistake |
|----------------|-----------|----------------|
| `warehouse_id` | `warehouseId` | `warehouseID` |
| `code` | `code` | `warehouseCode` |
| `is_active` | `isActive` | `active` |

## Common Mismatch Categories
| Category | Example Wrong | Example Correct |
|---|---|---|
| Singular vs Plural | `projectedInflow` | `projectedInflows` |
| Abbreviated | `allocatedQty` | `allocatedQuantity` |
| Missing prefix | `reason` | `reasonCode` |
| Fabricated field | `salePrice` | `disposalProceeds` |
| Wrong prefix | `fromDepartment` | `fromDepartmentId` |

## CRITICAL: "Number" Field Pitfall

**DO NOT assume all "number" fields are named the same way across models.**

| Model | Correct Field | Common Mistake |
|-------|---------------|----------------|
| `MfgWorkOrder` | `workOrderNumber` | `orderNumber` |
| `MfgProductionOrder` | `orderNumber` | (correct) |
| `MfgBom` | `bomNumber` | `bomId` |

**Always verify**: `grep -A15 "type MfgWorkOrder struct" go/types/mfg/*.pb.go | grep -E "Number|number"`

## Applies To
- Desktop column files: `go/erp/ui/web/*/**/*-columns.js`
- Desktop form files: `go/erp/ui/web/*/**/*-forms.js`
- Mobile column files: `go/erp/ui/web/m/js/**/*-columns.js`
- Mobile form files: `go/erp/ui/web/m/js/**/*-forms.js`
- Reference registries: `reference-registry-*.js`, `layer8m-reference-registry.js`

## Error Symptoms
- Table rows appear but specific columns are empty (no data, no error) — completely silent
- Server log: `cannot find property for col <model>.<field>:Unknown attribute <model>.<field>`

## Quick Field Name Lookup
```bash
grep -A 30 "type TypeName struct" go/types/<module>/*.pb.go | grep 'json:"'
```

---

# 19. Nested Protobuf Types in Form Definitions

**Source:** `money-field-type-mapping.md`

## Rule
Before using any form factory method (`f.text()`, `f.number()`, etc.) for a field, you MUST check its protobuf type. If the protobuf type is a nested object (pointer to another struct like `*erp.Something`), a repeated field (`[]string`, `[]*Type`), or a map (`map[string]string`), you CANNOT use scalar form methods like `f.text()`, `f.number()`, or `f.textarea()`. These will display `[object Object]`.

## How to Check
```bash
grep -A 30 "type ModelName struct" go/types/<module>/*.pb.go
```

If a field's Go type starts with `*`, `[]`, or `map[`, it is NOT a simple scalar — it requires special handling.

## Current Type Mappings

| Go Type Pattern | Form Factory | Why |
|----------------|-------------|-----|
| `string`, `int32`, `int64`, `float64`, `bool` | `f.text()`, `f.number()`, `f.checkbox()` | Simple scalars |
| `*erp.Money` | `f.money()` | Nested `{amount, currencyCode}` |
| `*erp.Address` | `...f.address('prefix')` | Expands to 6 address fields |
| `*erp.ContactInfo` | `...f.contact('prefix')` | Expands to email + phone |
| `*erp.DateRange` | Two `f.date('parent.startDate/endDate')` | Two timestamps |
| `*erp.AuditInfo` | `...f.audit()` | Read-only metadata |
| Any new `*erp.X` | **Create handler first** | Never use scalar fallback |

## Error Symptoms
- `[object Object]` in form field → nested type using scalar form method
- Save corrupts data → form sends scalar but server expects nested object

---

# 20. Compound Form Field Data Collection

**Source:** `compound-form-field-data-collection.md`

## Rule
When a form field type renders **multiple sub-elements** with modified names (e.g., `fieldKey.__amount`, `fieldKey.__currencyId`), the data collection code MUST NOT rely on `form.elements[field.key]` to find the element — it won't exist.

## The Trap
This bug is **silent** — no console error, no visible failure during form rendering. The form looks correct, the user fills in values, but on save the server rejects with "Field is required" because the data was never collected.

## Checklist for Compound Field Types
1. **Rendering**: Sub-elements use `name="${field.key}.__subField"` convention
2. **Data collection guard**: Add the field type to the guard exception
3. **Data collection case**: Use `form.elements[field.key + '.__subField']` to find sub-elements
4. **Test manually**: Verify saving a form with the compound field actually sends data

## Current Compound Field Types
- `money` — renders `fieldKey.__currencyId` (`<select>`) + `fieldKey.__amount` (formatted input)

---

# 21. Column Factory Completeness

**Source:** `column-factory-completeness.md`

## Rule
1. Every column factory method used in `*-columns.js` MUST exist in `layer8-column-factory.js`.
2. Every `col.enum()` and `col.status()` call MUST pass a valid function as the `renderer` argument (4th parameter).

Both failures produce the same catastrophic result: ALL tables fall back to DEFAULT_COLUMNS (`id`, `name`, `status`), making the entire UI appear broken.

## Why This Is Critical
JavaScript object literal construction is atomic. If ANY spread expression throws during construction, the ENTIRE assignment fails:

```javascript
Module.columns = {
    ModelA: [
        ...col.id('id'),          // would work
        ...col.col('name'),       // would work
        ...col.number('qty'),     // THROWS if col.number doesn't exist
    ],
    ModelB: [...],                // never reached
};
```

## Available Factory Methods
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

## Error Symptoms
- ALL table sections show only `id`, `name`, `status` columns
- TypeError in console: `col.xxx is not a function` or `renderer is not a function`

---

# 22. Enum Renderer API

**Source:** `enum-renderer-api.md`

## Rule
`createEnumRenderer` does NOT exist in `Layer8DRenderers`. Never use it. The correct patterns are:

### Plain enum (text label only)
```javascript
// CORRECT — wrap renderEnum in an arrow function
myField: (value) => renderEnum(value, MY_ENUM.enum),

// WRONG — createEnumRenderer does not exist
myField: createEnumRenderer(MY_ENUM.enum),
```

### Status enum (colored badge)
```javascript
// CORRECT — createStatusRenderer exists and returns a function
myStatus: createStatusRenderer(MY_STATUS.enum, MY_STATUS.classes),
```

## Available Functions in Layer8DRenderers

| Function | Type | Usage |
|----------|------|-------|
| `renderEnum(value, enumMap)` | Direct renderer | Wrap: `(v) => renderEnum(v, map)` |
| `renderStatus(value, enumMap, classMap)` | Direct renderer | Wrap: `(v) => renderStatus(v, map, classes)` |
| `createStatusRenderer(enumMap, classMap)` | Factory (returns function) | Call directly |
| `renderDate` | Function reference | Assign directly: `date: renderDate` |

## Correct Destructuring
```javascript
// CORRECT
const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

// WRONG — createEnumRenderer does not exist
const { createStatusRenderer, createEnumRenderer, renderDate } = Layer8DRenderers;
```

---

# 23. Enum and Renderer Completeness

**Source:** `enum-renderer-completeness.md`

Two related rules that both cause silent cascading failures if violated.

## Rule 1: Every f.select() Must Reference an Exported Enum

Every `f.select()` call in a form definition MUST reference an enum that is **defined and exported** in the corresponding `*-enums.js` file.

`f.select('field', 'Label', enums.SOME_ENUM)` stores `enums.SOME_ENUM` as `field.options`. If `SOME_ENUM` is not exported, `field.options` is `undefined`. When the detail modal opens, `generateSelectHtml()` throws:
```
Uncaught TypeError: Cannot convert undefined or null to object
```

### Checklist When Adding f.select()
1. Identify the enum name
2. Open the `*-enums.js` file and verify it exists in the `.enums = { ... }` export
3. If missing: check protobuf for values, add `factory.create([...])`, add to exports, add renderer
4. Verify on BOTH desktop and mobile

## Rule 2: Renderer Factory vs Direct Call

When assigning a renderer to a render object property, you MUST distinguish between **factory functions** (return a renderer) and **direct renderers** (render immediately).

### Factory Functions (call directly — they return functions)
```javascript
bugStatus: createStatusRenderer(BUG_STATUS.enum, BUG_STATUS.classes),
```

### Direct Renderers (must wrap)
```javascript
// WRONG — calls renderEnum immediately
assigneeType: renderEnum(ASSIGNEE_TYPE.enum),

// CORRECT — use factory or wrap manually
assigneeType: (value) => renderEnum(value, ASSIGNEE_TYPE.enum),
```

## The Shared Cascade Failure

Both rules produce the same catastrophic result:
1. TypeError in enums file → `Module.render` never assigned
2. Columns file: `const render = Module.render` → `undefined`
3. ALL tables fall back to DEFAULT_COLUMNS: `id`, `name`, `status`
4. No console error unless DevTools is open before page load

---

# 24. Template Literal Ternary Edit Safety

**Source:** `template-literal-ternary-edits.md`

## Rule
When wrapping existing content inside a JavaScript template literal with a conditional expression (`${condition ? \`...\` : ''}`), the Edit tool's `old_string` MUST include enough context to cover BOTH the opening AND closing of the new nesting level.

## The Dangerous Pattern

### WRONG: Partial edit that only covers the opening
```javascript
// old_string covers lines 5-10 but not the closing tags
// new_string wraps in ternary but doesn't close it
```

### CORRECT: Edit includes enough context to close the ternary
```javascript
// old_string covers lines 5-12 (includes the closing tags)
// new_string properly opens AND closes the ternary
${items.length > 0 ? `
<div class="section">...</div>
` : ''}
```

## Verification
After ANY edit that adds ternary expressions inside template literals:
1. **Run `node -c <file>` immediately** to check for syntax errors
2. Count opening `${` and closing `}` — they must match
3. Count backticks — every `` ` `` inside a `${}` needs a matching close

## Error Symptoms
- Clicking a button/row does nothing (the handler function is undefined)
- No visible error at all (the most common case — the file silently fails to parse)

---

# 25. Stacked Popup DOM Scoping

**Source:** `stacked-popup-dom-scoping.md`

## Rule
Never use `document.getElementById()` or `document.querySelector()` to find elements inside a popup when the popup system supports stacking (nested modals). Always scope DOM lookups to the **active popup's body**.

## Why This Is Critical
The Layer8DPopup system uses a modal stack. When a child popup opens on top of a parent popup, both exist in the DOM simultaneously. `document.getElementById()` returns the **first** one in DOM order — which is the parent, not the active child popup.

## The Correct Pattern
```javascript
let form = null;
if (typeof Layer8DPopup !== 'undefined') {
    const body = Layer8DPopup.getBody();
    if (body) {
        form = body.querySelector('#layer8d-edit-form');
    }
}
if (!form) {
    form = document.getElementById('layer8d-edit-form'); // fallback when no popup
}
```

## Key APIs
- **Desktop**: `Layer8DPopup.getBody()` — returns the topmost non-stacked popup's body element
- **Mobile**: `popup.body` — passed directly to callbacks, already scoped

---

# 26. UI Module Integration Checklist

**Source:** `ui-module-integration.md`

## Rule
When implementing a new ERP module, the UI integration is NOT complete until ALL of the following files are created/updated.

## Required Steps for Desktop UI

### 1. Section HTML File
- **File**: `go/erp/ui/web/sections/<module>.html`
- Must contain the full module structure (NOT a placeholder)

### 2. Section Initializer
- **File**: `go/erp/ui/web/js/sections.js`
- Add module to `sectionInitializers` object

### 3. Module CSS
- **File**: `go/erp/ui/web/<module>/<module>.css`
- Include module-specific accent color

### 4. Reference Registry
- **File**: `go/erp/ui/web/js/reference-registry-<module>.js`
- Must be included in `app.html`

### 5. app.html Updates
All of the following must be added:
- CSS include in `<head>`
- Reference registry include
- Module scripts (config, enums, columns, forms, entry points, init)

## Verification Commands
```bash
grep -l "under development" go/erp/ui/web/sections/<module>.html && echo "ERROR: Placeholder still present"
grep "<module>:" go/erp/ui/web/js/sections.js
grep "<module>/<module>.css" go/erp/ui/web/app.html
grep "reference-registry-<module>.js" go/erp/ui/web/app.html
grep "<module>-init.js" go/erp/ui/web/app.html
```

---

# 27. Module Init sectionSelector Must Match defaultModule

**Source:** `module-init-section-selector.md`

## Rule
In `*-init.js` files that use `Layer8DModuleFactory.create()`, the `sectionSelector` property MUST match the `defaultModule` property value.

## Why This Matters
The navigation code searches for the section container using:
```javascript
document.querySelector(`.hcm-module-content[data-module="${config.sectionSelector}"]`)
```

If `sectionSelector` doesn't match any `data-module` attribute in the HTML, the module will fail to initialize with:
```
<Module> section container not found
```

## Correct Pattern
```javascript
Layer8DModuleFactory.create({
    namespace: 'Prj',
    defaultModule: 'planning',        // <-- These must match
    defaultService: 'projects',
    sectionSelector: 'planning',      // <-- These must match
    initializerName: 'initializePrj',
    requiredNamespaces: [...]
});
```

## Examples from Existing Modules

| Module | defaultModule | sectionSelector |
|--------|---------------|-----------------|
| CRM    | opportunities | opportunities   |
| PRJ    | planning      | planning        |
| HCM    | core-hr       | core-hr         |
| FIN    | general-ledger| general-ledger  |

---

# 28. Reference Registry Completeness

**Source:** `reference-registry-completeness.md`

## Rule
Every model used as a `lookupModel` in form definitions MUST have a corresponding entry in the reference registry.

## Required Actions

### Before Adding a Reference Field
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

## Common Patterns
- `...ref.simple('ModelName', 'primaryKeyId', 'displayField', 'Label')` — most common
- `...ref.coded('ModelName', 'primaryKeyId', 'code', 'name')` — code + name display
- `...ref.person('ModelName', 'primaryKeyId')` — firstName + lastName
- `...ref.idOnly('ModelName', 'primaryKeyId')` — no display needed

## Error Symptom
```
Reference input missing required config: fieldName
```

---

# 29. Layer8DTable: Pagination Metadata Must Only Be Read on Page 1 (CRITICAL)

**Source:** `layer8d-table-pagination-metadata.md`

## Rule
In `Layer8DTable.prototype.fetchData()`, the response metadata (`data.metadata.keyCount.counts.Total`) MUST only be read and stored when `page === 1`. On all subsequent pages (page 2+), the previously stored `this.totalItems` value MUST be reused.

## Why This Is Critical
The server only computes aggregate metadata when processing page 0 (the first page). Subsequent page responses return zero or stale metadata. If `fetchData` reads metadata on every page, page 2+ will overwrite the correct `totalItems` with 0.

- **Page 1**: "Page 1 of 2002" (correct)
- **Page 2**: "Page 2 of 1" (totalItems overwritten with 0)

## The Correct Pattern
```javascript
let totalCount = 0;
if (page === 1 && data.metadata?.keyCount?.counts) {
    totalCount = data.metadata.keyCount.counts.Total || 0;
    this.totalItems = totalCount;
} else {
    totalCount = this.totalItems;  // Reuse cached value
}
```

## What Resets to Page 1 (Triggers Fresh Metadata)
- Filter changes
- Sort changes
- Page size changes
- Base where clause changes
- Initial load / `init()`

## This Bug Has Recurred Multiple Times
**When modifying ANY pagination or data-fetching code, verify the `page === 1` guard is intact.**

---

# 30. Immutability Must Be Reflected in the UI

**Source:** `immutability-ui-alignment.md`

## Rule
When an entity or field is defined as immutable (in the PRD, proto, or backend validation), the UI MUST be updated to match.

## Entity-Level Immutability
If an entity rejects PUT requests:
- Table view MUST be set to read-only mode
- Detail popups MUST render all fields as display-only
- "Edit" / "Save" buttons MUST be hidden or disabled

## Field-Level Immutability
If specific fields are protected from modification on PUT:
- Those fields MUST render as read-only in edit forms
- Editable fields remain as normal inputs
- Visually distinguish between editable and read-only fields

---

# 31. Mobile Parity

**Source:** `mobile-parity.md`

## Rule
Every UI feature must have **functional parity** between desktop and mobile. This means not just the UI element, but also its **behavioral effects** on the rest of the application.

### 1. When Implementing a New Feature
Before marking any UI task as complete, verify the feature works on both desktop (`go/erp/ui/web/`) and mobile (`go/erp/ui/web/m/`).

### 2. When Touching Any Section or Module
Audit the **entire section** for desktop/mobile parity gaps. Compare:
- Desktop section HTML vs mobile section HTML
- Desktop JS features vs mobile equivalents
- Script includes in `app.html` vs `m/app.html`

### 3. Behavioral Effects (CRITICAL)
A feature includes **all its downstream effects**, not just the UI element itself. When implementing a feature, trace its effects across the entire application on BOTH platforms.

**Ask yourself**: "If a user performs this action on mobile, will the result be identical to performing it on desktop?" If not, there's a parity gap.

## Verification Checklist
1. Does the desktop version have detail popups? Does mobile?
2. Does the desktop version have interactive features? Does mobile?
3. Are all shared scripts included in both `app.html` and `m/app.html`?
4. Are section HTML files placeholders on one side but functional on the other?
5. Does the feature's EFFECT propagate to all navigation and display components on both platforms?

---

# 32. Do NOT Touch the Demo Directory

**Source:** `demo-directory-sync.md`

## Rule
The `/go/demo/` directory is auto-generated and used for local testing only. Do NOT edit, copy to, or sync files in that directory. Ever.

## Why This Matters
The demo directory is rebuilt from scratch by `run-local.sh`. Any manual changes or syncs to it are wasted effort — they will be overwritten on the next run. The source of truth is always the source web directory (e.g., `go/erp/ui/web/` for l8erp, `go/bugs/website/web/` for l8bugs).

## What This Means
- Do NOT `cp` source files into `go/demo/web/`
- Do NOT edit files under `go/demo/` directly
- Do NOT diff source against demo to check for sync
- Only edit files in the source web directory — `run-local.sh` handles the rest

---

# 33. L8UI Theme Compliance

**Source:** `l8ui-theme-compliance.md`

## Rule
All UI components in the `l8ui/` directory MUST use the canonical `--layer8d-*` CSS custom properties defined in `layer8d-theme.css`. Never introduce generic/unprefixed CSS variable names.

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
| Border | `var(--layer8d-border)` | `var(--border-color, ...)` |
| Status colors | `var(--layer8d-success)`, `var(--layer8d-warning)`, `var(--layer8d-error)` | hardcoded hex |

### No Per-View Dark Mode Blocks
Dark mode is handled centrally in `layer8d-theme.css`. Component CSS files MUST NOT contain their own `[data-theme="dark"]` blocks.

## Buttons
Reuse shared button classes: `layer8d-btn layer8d-btn-primary layer8d-btn-small`

## JavaScript Color References
JS render files MUST NOT hardcode hex color values. Use:
- `Layer8DChart.readThemeColor(varName, fallback)` for individual colors
- `Layer8DChart.getThemePalette()` for chart color arrays

## Verification
```bash
grep 'var(--accent-color\|var(--bg-primary\|var(--text-primary\|var(--border-color' <file>
# should return nothing
```

---

# 34. L8UI Guide Update

**Source:** `l8ui-guide-update.md`

## Rule
Whenever a component in the `l8ui/` directory is **created, modified, or deleted**, the `l8ui/GUIDE.md` file MUST be updated to reflect the change.

## What to Document
For each component:
1. **Global object name** (e.g., `window.Layer8DChart`)
2. **Constructor options** or factory parameters
3. **Public methods** with parameter signatures
4. **viewConfig options** (if applicable)
5. **Registration** with Layer8DViewFactory if applicable

---

# 35. L8UI GUIDE.md Prerequisite

**Source:** `l8ui-guide-prerequisite.md`

## Rule
Before implementing or using ANY l8ui component (desktop or mobile), you MUST read the `l8ui/GUIDE.md` file in the project's web directory.

## When This Applies
- Creating a new module or section UI
- Adding a new view type to an existing service
- Modifying how services are initialized or registered
- Using any Layer8D* or Layer8M* component
- Configuring viewConfig options
- Adding script includes to app.html or m/app.html

## What to Look For
1. Component APIs (constructor options, public methods)
2. viewConfig options per view type
3. Script loading order and dependencies
4. Module creation pattern (Layer8DModuleFactory.create())
5. Mobile equivalents and differences

## Location
- **L8ERP**: `go/erp/ui/web/l8ui/GUIDE.md`
- **L8Bugs**: `go/bugs/website/web/l8ui/GUIDE.md`

---

# 36. Mock Data Generation

**Source:** `mock-data-generation.md`

## Location
All mock data files live in `go/tests/mocks/`. The system generates phased, dependency-ordered mock data with realistic distributions.

## Step-by-Step Process

### Step 1: Read protobuf files
- Identify all structs, field names/types, and enums
- Note cross-module references

### Step 2: Determine phase ordering
- Foundation (no deps) -> Core entities -> Dependent objects -> Transactions -> Planning/Analytics

### Step 3: Add data arrays to `data.go`

### Step 4: Add ID slices to `store.go`

### Step 5: Create generator files (parallelizable)
- One file per logical group
- Each file must stay under 500 lines
- Patterns: `createAuditInfo()`, `&erp.Money{Amount: <cents>, CurrencyCode: "USD"}`, `time.Unix()`, `store.*IDs` with modulo indexing

### Step 6: Create phase orchestration files
- Each phase calls generator, posts to endpoint, appends IDs to store

### Step 7: Update `main.go`

### Step 8: Build and verify
- `go build ./tests/mocks/` and `go vet ./tests/mocks/`

## Key Patterns

### Cross-module references
- HCM: `EmployeeIDs`, `ManagerIDs`, `DepartmentIDs`
- FIN: `VendorIDs`, `CustomerIDs`
- SCM: `ItemIDs`
- Always check `len(store.*IDs) > 0` before accessing

---

# 37. Data Completeness Pipeline

**Source:** `data-completeness-pipeline.md`

## Rule
Every protobuf field must flow through the full pipeline: **Proto fields -> Forms/Columns -> Mock data**. A gap at any stage produces silent empty cells with no errors.

## Stage 1: Proto -> Forms and Columns

Every non-system field in a protobuf struct MUST appear in both the form and column definitions.

### System Fields (excluded by default)
- Primary key ID, `auditInfo`, `customFields`

### If intentionally excluded, add a comment:
```javascript
// Omitted: internalScore — system-calculated, not user-editable
```

## Stage 2: Columns -> Mock Data

Every field with a UI column definition MUST be populated by the mock data generator with a **non-zero value**. Protobuf `omitempty` omits zero values from JSON.

### Special cases:
- **Enum fields**: Must use non-zero values (0 = UNSPECIFIED, omitted by `omitempty`)
- **Conditional fields**: Populate on records in the appropriate state

## Stage 3: All Services -> Mock Generators

ALL services in a module MUST have corresponding mock data generators.

### Phase organization:
```
Phase 1: Foundation (no dependencies)
Phase 2: Core entities (depend on foundation)
Phase 3: Configuration (depend on core)
Phase 4: Transactions (depend on configuration)
Phase 5: Line items (depend on transactions)
```

## Verification Commands
```bash
# Stage 1: Compare protobuf fields vs form fields
grep -A 40 "type ModelName struct" go/types/<module>/*.pb.go | grep -oP 'json:"\K[^,"]+' | sort

# Stage 2: Check mock generator populates each column field
grep "<FieldName>:" go/tests/mocks/gen_*.go

# Stage 3: Count services vs generators
ls -d go/erp/<module>/*/ | wc -l
```

## Checklist Before PR
- [ ] Every protobuf field appears in forms and columns (or has comment)
- [ ] Every column field is populated in mock generators with non-zero values
- [ ] All services have mock generators
- [ ] store.go has ID slices for all entities
- [ ] All generators are called in phase files
- [ ] `go build ./tests/mocks/` and `go vet ./tests/mocks/` pass

---

# 38. Mock Endpoint Construction

**Source:** `mock-endpoint-construction.md`

## Endpoint Format
```
/erp/{ServiceArea}/{ServiceName}
```

## Finding the Correct ServiceName
The `ServiceName` constant is defined in each service's `*Service.go` file:

```go
// In go/erp/sales/salesterritories/SalesTerritoryService.go
const (
    ServiceName = "Territory"  // <-- Use this value
    ServiceArea = byte(60)
)
```

Mock endpoint: `/erp/60/Territory` (NOT `/erp/60/SalesTerritory`)

## ServiceName Constraint
ServiceName must be 10 characters or less. This is why names are abbreviated:
- `Territory` not `SalesTerritory`
- `DlvryOrder` not `DeliveryOrder`

## Verification
```bash
grep "ServiceName = " go/erp/{module}/**/*Service.go
```

---

# 39. Mock Phase Ordering

**Source:** `mock-phase-ordering.md`

## Rule
When adding server-side validation for a foreign key field, you MUST verify that the mock data phase ordering ensures the referenced entity's IDs are populated BEFORE any generator that uses them.

## The `pickRef` Trap
```go
func pickRef(ids []string, index int) string {
    if len(ids) == 0 {
        return ""  // Silent empty string, not an error!
    }
    return ids[index%len(ids)]
}
```

## Current Module Phase Order (in `main_phases.go`)
```
1. FIN Foundation (Phases 1-3) — CurrencyIDs, FiscalYearIDs, Vendors, Customers
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
- FIN Phase 4+: Uses `store.DepartmentIDs` and `store.EmployeeIDs` from HCM.

## Common Cross-Module Dependencies
| Field | Source Module | Used By |
|-------|-------------|---------|
| CurrencyIDs | FIN Phase 1 | ALL modules |
| EmployeeIDs | HCM Phase 1-3 | FIN 8, CRM, PRJ, MFG, Sales |
| DepartmentIDs | HCM Phase 1 | FIN 4+8, PRJ, MFG |
| VendorIDs | FIN Phase 2 | SCM, MFG |
| CustomerIDs | FIN Phase 2 | Sales, ECOM, CRM |
| ItemIDs | SCM Phase 1 | Sales, MFG, ECOM |

---

# 40. Login JSON Adaptation

**Source:** `login-json-adaptation.md`

## Rule
When `login.json` is copied from l8erp (or any other project) to a new project, it MUST be immediately adjusted. Do NOT leave the l8erp defaults in place.

## Fields to Update

| Field | l8erp Default | What to Change To |
|-------|--------------|-------------------|
| `login.appTitle` | `"ERP by Layer 8"` | Project name (e.g., `"L8ID"`, `"L8Bugs"`) |
| `login.appDescription` | `"Enterprise Resource Planning"` | Project description |
| `app.apiPrefix` | `"/erp"` | Project's PREFIX constant (e.g., `"/l8id"`, `"/bugs"`) |

## Why This Is Critical
The `apiPrefix` field is read by the l8ui shared components to construct ALL API URLs. If it remains `"/erp"`, every API call from the UI will hit `/erp/...` instead of the project's actual prefix, causing 404 errors on every request.

## Where to Find the Correct apiPrefix
```bash
grep "PREFIX" go/<project>/common/defaults.go
```

## Verification
```bash
grep "apiPrefix" go/<project>/ui/web/login.json
# Must NOT contain "/erp"
grep "appTitle" go/<project>/ui/web/login.json
# Must NOT contain "ERP by Layer 8"
```

---

# 41. ModConfig Failure Must Not Logout

**Source:** `modconfig-failure-no-logout.md`

## Rule
When implementing a new PRD project that copies `app.js` from l8erp, the `Layer8DModuleFilter.load()` call MUST be either removed or made non-blocking. A failed ModConfig fetch must NEVER log the user out.

## Why This Matters
The l8erp `app.js` calls `Layer8DModuleFilter.load(bearerToken)` on startup, which fetches `/0/ModConfig`. This service is l8erp-specific — new projects don't have it. When the fetch returns 404/error, `Layer8DModuleFilter.load()` internally calls `logout()`, redirecting the user to the login page in an infinite loop.

## The Trap
The logout happens INSIDE `Layer8DModuleFilter.load()` (in the shared l8ui library), not in `app.js`. Wrapping the call in try/catch does NOT help.

## Fix Pattern
If the new project does not have a ModConfig service, remove the block entirely:
```javascript
// <ProjectName> does not use ModConfig — skip Layer8DModuleFilter to avoid logout on 404
```

## Also Check When Copying app.js
Other l8erp-specific fetches that may not apply:
- Currency cache loading (`/erp/40/Currency`)
- Exchange rate cache loading (`/erp/40/XchgRate`)
- Any endpoint with `/erp/` prefix
