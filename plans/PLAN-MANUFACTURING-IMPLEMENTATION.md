# Manufacturing Module - Implementation Plan

## Overview

Implement the Manufacturing (MFG) module following the exact patterns established by HCM, FIN, SCM, and Sales. This covers 36 Prime Objects across 6 submodules: Engineering, Production, Shop Floor, Quality, Planning, and Costing.

Reference documents:
- `plans/ERP_MODULES.md` (Section 6)
- `plans/PLAN-SALES-IMPLEMENTATION.md` (pattern reference)
- Global rules in `~/.claude/rules/`
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (Money, AuditInfo, Address, DateRange). References SCM's Item/Warehouse, FIN's Account, HCM's Employee via cross-module service calls. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | MFG entities will be referenced by Projects (project-based manufacturing), BI (production analytics), and Compliance (quality audits). BOM and WorkOrder are designed as shared entities. |
| **Read Before Implementing** | Plan requires reading ALL HCM, FIN, SCM, and Sales code (services, callbacks, protos, UI) before writing any MFG code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 36 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All Manufacturing services use `ServiceArea = byte(70)`. |
| **ServiceCallback Auto-Generate ID** | All callbacks include `common.GenerateID()` in `Before()` for POST actions. See Section 3b. |
| **Vendor Dependencies** | Step 7 includes `go mod vendor` after proto generation. |
| **Mobile Parity** | Desktop and mobile UI are implemented together per mobile-parity.md. |
| **Mock Completeness** | All 36 services will have mock data generators per mock-completeness.md. |
| **Mock Endpoint Construction** | All endpoints use exact ServiceName constants per mock-endpoint-construction.md. |
| **JS Model Names** | All JS model names use `Mfg` prefix matching protobuf types per js-protobuf-model-names.md. |
| **JS Field Names** | All JS field names match protobuf JSON tags per js-protobuf-field-names.md. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

Manufacturing references entities from other modules:

| Referenced Entity | Source Module | How MFG Uses It |
|-------------------|--------------|-------------------|
| **Item** | SCM (Inventory) | BOM components, work order items, finished goods |
| **Warehouse** | SCM (Warehouse) | Material staging, finished goods storage |
| **Employee** | HCM (Core HR) | Machine operators, supervisors, quality inspectors |
| **Account** | FIN (GL) | WIP accounts, variance accounts, COGS posting |
| **Vendor** | FIN (AP) | Outside processing vendors |
| **SalesOrder** | Sales (Orders) | Make-to-order production triggers |

These are accessed via cross-module service calls. No duplication of these entities in MFG protos.

### 0c. Future-Proof Note

MfgBom (Bill of Materials) and MfgWorkOrder will also be referenced by future modules:
- **Projects** will reference MfgWorkOrder for project-based manufacturing
- **BI** will reference MfgWorkOrder and MfgQualityInspection for production analytics
- **Compliance** will reference MfgQualityInspection and MfgNCR for quality audits

---

## Step 1: Create Proto Files (prefix: `mfg-`)

Create 7 proto files under `proto/`:

| File | Contents |
|------|----------|
| `mfg-common.proto` | MFG-specific shared types and enums. Imports `erp-common.proto`. |
| `mfg-engineering.proto` | 6 Prime Objects: Bom, BomLine, Routing, RoutingOperation, EngChangeOrder, EngChangeDetail |
| `mfg-production.proto` | 6 Prime Objects: WorkOrder, WorkOrderOp, ProductionOrder, ProdOrderLine, ProdBatch, ProdConsumption |
| `mfg-shopfloor.proto` | 6 Prime Objects: WorkCenter, WorkCenterCap, LaborEntry, MachineEntry, ShiftSchedule, DowntimeEvent |
| `mfg-quality.proto` | 6 Prime Objects: QualityPlan, InspectionPoint, QualityInspection, TestResult, NCR, NCRAction |
| `mfg-planning.proto` | 6 Prime Objects: MrpRun, MrpRequirement, CapacityPlan, CapacityLoad, ProdSchedule, ScheduleBlock |
| `mfg-costing.proto` | 6 Prime Objects: StandardCost, CostRollup, ActualCost, CostVariance, Overhead, OverheadAlloc |

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (36 Prime Objects = 72 messages total)
- All use `package mfg` and `option go_package = "./types/mfg"`
- Import `mfg-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file
- **All type names use `Mfg` prefix** (e.g., `MfgWorkOrder`, not `WorkOrder`)

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after Sales docker runs:

```bash
# Manufacturing
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-engineering.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-production.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-shopfloor.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-quality.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=mfg-costing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/mfg/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (36 services)

Create directory `go/erp/mfg/` with 36 service packages. Each package has exactly 2 files.

**All Manufacturing services use `ServiceArea = byte(70)`.**

### Service Directory Listing (36 packages)

**Engineering** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `boms/` | `MfgBom` | MfgBom | BomId |
| `bomlines/` | `MfgBomLine` | MfgBomLine | LineId |
| `routings/` | `MfgRouting` | MfgRouting | RoutingId |
| `routingoperations/` | `MfgRoutOp` | MfgRoutingOperation | OperationId |
| `engchangeorders/` | `MfgECO` | MfgEngChangeOrder | ChangeOrderId |
| `engchangedetails/` | `MfgECODtl` | MfgEngChangeDetail | DetailId |

**Production** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `workorders/` | `MfgWO` | MfgWorkOrder | WorkOrderId |
| `workorderops/` | `MfgWOOp` | MfgWorkOrderOp | OperationId |
| `productionorders/` | `MfgProdOrd` | MfgProductionOrder | ProdOrderId |
| `prodorderlines/` | `MfgPOLine` | MfgProdOrderLine | LineId |
| `prodbatches/` | `MfgBatch` | MfgProdBatch | BatchId |
| `prodconsumptions/` | `MfgConsump` | MfgProdConsumption | ConsumptionId |

**Shop Floor** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `workcenters/` | `MfgWC` | MfgWorkCenter | WorkCenterId |
| `workcentercaps/` | `MfgWCCap` | MfgWorkCenterCap | CapacityId |
| `laborentries/` | `MfgLabor` | MfgLaborEntry | EntryId |
| `machineentries/` | `MfgMachine` | MfgMachineEntry | EntryId |
| `shiftschedules/` | `MfgShift` | MfgShiftSchedule | ScheduleId |
| `downtimeevents/` | `MfgDowntm` | MfgDowntimeEvent | EventId |

**Quality** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `qualityplans/` | `MfgQP` | MfgQualityPlan | PlanId |
| `inspectionpoints/` | `MfgInspPt` | MfgInspectionPoint | PointId |
| `qualityinspections/` | `MfgQInsp` | MfgQualityInspection | InspectionId |
| `testresults/` | `MfgTest` | MfgTestResult | ResultId |
| `ncrs/` | `MfgNCR` | MfgNCR | NcrId |
| `ncractions/` | `MfgNCRAct` | MfgNCRAction | ActionId |

**Planning** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `mrpruns/` | `MfgMRP` | MfgMrpRun | RunId |
| `mrprequirements/` | `MfgMRPReq` | MfgMrpRequirement | RequirementId |
| `capacityplans/` | `MfgCapPln` | MfgCapacityPlan | PlanId |
| `capacityloads/` | `MfgCapLd` | MfgCapacityLoad | LoadId |
| `prodschedules/` | `MfgSched` | MfgProdSchedule | ScheduleId |
| `scheduleblocks/` | `MfgSchdBlk` | MfgScheduleBlock | BlockId |

**Costing** (`ServiceArea = byte(70)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `standardcosts/` | `MfgStdCst` | MfgStandardCost | CostId |
| `costrollups/` | `MfgCstRol` | MfgCostRollup | RollupId |
| `actualcosts/` | `MfgActCst` | MfgActualCost | ActualCostId |
| `costvariances/` | `MfgCstVar` | MfgCostVariance | VarianceId |
| `overheads/` | `MfgOvrhd` | MfgOverhead | OverheadId |
| `overheadallocs/` | `MfgOHAlloc` | MfgOverheadAlloc | AllocationId |

---

## Step 4: Integrate MFG into Centralized `erp_main.go`

**Important:** There is NO separate `mfg_main.go` file. All modules are activated from the centralized `go/erp/main/erp_main.go`.

### 4a. Add MFG Imports

Add MFG service imports to `erp_main.go` after the existing Sales imports (all 36 packages).

### 4b. Add Function Call in main()

```go
    activateHCMServices(nic)
    activateFinServices(nic)
    activateSCMServices(nic)
    activateSalesServices(nic)
    activateMfgServices(nic)  // Add this line
```

### 4c. Create `activateMfgServices()` Function

Add function after `activateSalesServices()` with all 36 service activations.

---

## Step 5: Register MFG Types in UI

Add to `go/erp/ui/main.go`:

1. Add import: `"github.com/saichler/l8erp/go/types/mfg"`
2. Add call: `registerMfgTypes(resources)`
3. Create `registerMfgTypes()` function with all 36 types (see pattern from Sales).

---

## Step 6: Create Desktop UI

### 6a. Directory Structure

Create `go/erp/ui/web/mfg/` with this structure:

```
mfg/
├── mfg-config.js           # Module config with all services
├── mfg-init.js             # Module initialization
├── mfg.css                 # Module-specific styles
├── engineering/
│   ├── engineering-enums.js
│   ├── engineering-columns.js
│   ├── engineering-forms.js
│   └── engineering.js
├── production/
│   ├── production-enums.js
│   ├── production-columns.js
│   ├── production-forms.js
│   └── production.js
├── shopfloor/
│   ├── shopfloor-enums.js
│   ├── shopfloor-columns.js
│   ├── shopfloor-forms.js
│   └── shopfloor.js
├── quality/
│   ├── quality-enums.js
│   ├── quality-columns.js
│   ├── quality-forms.js
│   └── quality.js
├── planning/
│   ├── planning-enums.js
│   ├── planning-columns.js
│   ├── planning-forms.js
│   └── planning.js
└── costing/
    ├── costing-enums.js
    ├── costing-columns.js
    ├── costing-forms.js
    └── costing.js
```

### 6b. Module Config File: `mfg/mfg-config.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.Mfg = window.Mfg || {};

    Mfg.modules = {
        'engineering': {
            label: 'Engineering',
            icon: '📐',
            services: [
                { key: 'boms', label: 'BOMs', icon: '📋', endpoint: '/70/MfgBom', model: 'MfgBom' },
                { key: 'bom-lines', label: 'BOM Lines', icon: '📝', endpoint: '/70/MfgBomLine', model: 'MfgBomLine' },
                { key: 'routings', label: 'Routings', icon: '🔄', endpoint: '/70/MfgRouting', model: 'MfgRouting' },
                { key: 'routing-ops', label: 'Routing Ops', icon: '⚙️', endpoint: '/70/MfgRoutOp', model: 'MfgRoutingOperation' },
                { key: 'change-orders', label: 'Change Orders', icon: '📑', endpoint: '/70/MfgECO', model: 'MfgEngChangeOrder' },
                { key: 'change-details', label: 'ECO Details', icon: '📄', endpoint: '/70/MfgECODtl', model: 'MfgEngChangeDetail' }
            ]
        },
        'production': {
            label: 'Production',
            icon: '🏭',
            services: [
                { key: 'work-orders', label: 'Work Orders', icon: '📦', endpoint: '/70/MfgWO', model: 'MfgWorkOrder' },
                { key: 'wo-operations', label: 'WO Operations', icon: '⚙️', endpoint: '/70/MfgWOOp', model: 'MfgWorkOrderOp' },
                { key: 'prod-orders', label: 'Prod Orders', icon: '📋', endpoint: '/70/MfgProdOrd', model: 'MfgProductionOrder' },
                { key: 'prod-lines', label: 'Prod Lines', icon: '📝', endpoint: '/70/MfgPOLine', model: 'MfgProdOrderLine' },
                { key: 'batches', label: 'Batches', icon: '📦', endpoint: '/70/MfgBatch', model: 'MfgProdBatch' },
                { key: 'consumptions', label: 'Consumptions', icon: '📉', endpoint: '/70/MfgConsump', model: 'MfgProdConsumption' }
            ]
        },
        'shopfloor': {
            label: 'Shop Floor',
            icon: '🔧',
            services: [
                { key: 'work-centers', label: 'Work Centers', icon: '🏭', endpoint: '/70/MfgWC', model: 'MfgWorkCenter' },
                { key: 'wc-capacity', label: 'WC Capacity', icon: '📊', endpoint: '/70/MfgWCCap', model: 'MfgWorkCenterCap' },
                { key: 'labor', label: 'Labor Entries', icon: '👷', endpoint: '/70/MfgLabor', model: 'MfgLaborEntry' },
                { key: 'machine', label: 'Machine Entries', icon: '⚙️', endpoint: '/70/MfgMachine', model: 'MfgMachineEntry' },
                { key: 'shifts', label: 'Shift Schedules', icon: '📅', endpoint: '/70/MfgShift', model: 'MfgShiftSchedule' },
                { key: 'downtime', label: 'Downtime', icon: '⏸️', endpoint: '/70/MfgDowntm', model: 'MfgDowntimeEvent' }
            ]
        },
        'quality': {
            label: 'Quality',
            icon: '✅',
            services: [
                { key: 'plans', label: 'Quality Plans', icon: '📋', endpoint: '/70/MfgQP', model: 'MfgQualityPlan' },
                { key: 'inspection-points', label: 'Insp Points', icon: '🎯', endpoint: '/70/MfgInspPt', model: 'MfgInspectionPoint' },
                { key: 'inspections', label: 'Inspections', icon: '🔍', endpoint: '/70/MfgQInsp', model: 'MfgQualityInspection' },
                { key: 'test-results', label: 'Test Results', icon: '📊', endpoint: '/70/MfgTest', model: 'MfgTestResult' },
                { key: 'ncrs', label: 'NCRs', icon: '⚠️', endpoint: '/70/MfgNCR', model: 'MfgNCR' },
                { key: 'ncr-actions', label: 'NCR Actions', icon: '📝', endpoint: '/70/MfgNCRAct', model: 'MfgNCRAction' }
            ]
        },
        'planning': {
            label: 'Planning',
            icon: '📈',
            services: [
                { key: 'mrp-runs', label: 'MRP Runs', icon: '🔄', endpoint: '/70/MfgMRP', model: 'MfgMrpRun' },
                { key: 'mrp-requirements', label: 'MRP Reqs', icon: '📋', endpoint: '/70/MfgMRPReq', model: 'MfgMrpRequirement' },
                { key: 'capacity-plans', label: 'Capacity Plans', icon: '📊', endpoint: '/70/MfgCapPln', model: 'MfgCapacityPlan' },
                { key: 'capacity-loads', label: 'Capacity Loads', icon: '📈', endpoint: '/70/MfgCapLd', model: 'MfgCapacityLoad' },
                { key: 'schedules', label: 'Prod Schedules', icon: '📅', endpoint: '/70/MfgSched', model: 'MfgProdSchedule' },
                { key: 'schedule-blocks', label: 'Sched Blocks', icon: '🗓️', endpoint: '/70/MfgSchdBlk', model: 'MfgScheduleBlock' }
            ]
        },
        'costing': {
            label: 'Costing',
            icon: '💰',
            services: [
                { key: 'standard-costs', label: 'Standard Costs', icon: '💵', endpoint: '/70/MfgStdCst', model: 'MfgStandardCost' },
                { key: 'cost-rollups', label: 'Cost Rollups', icon: '📊', endpoint: '/70/MfgCstRol', model: 'MfgCostRollup' },
                { key: 'actual-costs', label: 'Actual Costs', icon: '💰', endpoint: '/70/MfgActCst', model: 'MfgActualCost' },
                { key: 'variances', label: 'Variances', icon: '📉', endpoint: '/70/MfgCstVar', model: 'MfgCostVariance' },
                { key: 'overheads', label: 'Overheads', icon: '🏢', endpoint: '/70/MfgOvrhd', model: 'MfgOverhead' },
                { key: 'overhead-allocs', label: 'OH Allocations', icon: '📋', endpoint: '/70/MfgOHAlloc', model: 'MfgOverheadAlloc' }
            ]
        }
    };

    Mfg.submodules = ['MfgEngineering', 'MfgProduction', 'MfgShopFloor', 'MfgQuality', 'MfgPlanning', 'MfgCosting'];
})();
```

### 6c. Production Submodule Example Files

#### `production/production-enums.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};
    MfgProduction.enums = {};

    // WORK ORDER STATUS
    MfgProduction.enums.WORK_ORDER_STATUS = {
        0: 'Unspecified',
        1: 'Planned',
        2: 'Released',
        3: 'In Progress',
        4: 'On Hold',
        5: 'Completed',
        6: 'Closed',
        7: 'Cancelled'
    };

    MfgProduction.enums.WORK_ORDER_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive',
        7: 'layer8d-status-terminated'
    };

    // OPERATION STATUS
    MfgProduction.enums.OPERATION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Skipped'
    };

    MfgProduction.enums.OPERATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // BATCH STATUS
    MfgProduction.enums.BATCH_STATUS = {
        0: 'Unspecified',
        1: 'Created',
        2: 'In Process',
        3: 'Completed',
        4: 'Rejected'
    };

    MfgProduction.enums.BATCH_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    MfgProduction.render = {};

    MfgProduction.render.workOrderStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.WORK_ORDER_STATUS,
        MfgProduction.enums.WORK_ORDER_STATUS_CLASSES
    );

    MfgProduction.render.operationStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.OPERATION_STATUS,
        MfgProduction.enums.OPERATION_STATUS_CLASSES
    );

    MfgProduction.render.batchStatus = Layer8DRenderers.createStatusRenderer(
        MfgProduction.enums.BATCH_STATUS,
        MfgProduction.enums.BATCH_STATUS_CLASSES
    );

    MfgProduction.render.date = Layer8DRenderers.renderDate;
    MfgProduction.render.money = Layer8DRenderers.renderMoney;
})();
```

#### `production/production-columns.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = MfgProduction.render;

    MfgProduction.columns = {
        MfgWorkOrder: [
            { key: 'workOrderId', label: 'ID', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'workOrderNumber', label: 'WO #', sortKey: 'workOrderNumber', filterKey: 'workOrderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantityOrdered', label: 'Qty Ordered', sortKey: 'quantityOrdered' },
            { key: 'quantityCompleted', label: 'Qty Completed', sortKey: 'quantityCompleted' },
            {
                key: 'plannedStartDate',
                label: 'Planned Start',
                sortKey: 'plannedStartDate',
                render: (item) => renderDate(item.plannedStartDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.workOrderStatus(item.status)
            }
        ],

        MfgWorkOrderOp: [
            { key: 'operationId', label: 'ID', sortKey: 'operationId', filterKey: 'operationId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId', filterKey: 'workOrderId' },
            { key: 'operationNumber', label: 'Op #', sortKey: 'operationNumber' },
            { key: 'workCenterId', label: 'Work Center', sortKey: 'workCenterId' },
            { key: 'setupTime', label: 'Setup (hrs)', sortKey: 'setupTime' },
            { key: 'runTime', label: 'Run (hrs)', sortKey: 'runTime' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.operationStatus(item.status)
            }
        ],

        MfgProductionOrder: [
            { key: 'prodOrderId', label: 'ID', sortKey: 'prodOrderId', filterKey: 'prodOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'scheduledDate',
                label: 'Scheduled',
                sortKey: 'scheduledDate',
                render: (item) => renderDate(item.scheduledDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.workOrderStatus(item.status)
            }
        ],

        MfgProdOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'prodOrderId', label: 'Prod Order', sortKey: 'prodOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'requiredQty', label: 'Required Qty', sortKey: 'requiredQty' },
            { key: 'issuedQty', label: 'Issued Qty', sortKey: 'issuedQty' }
        ],

        MfgProdBatch: [
            { key: 'batchId', label: 'ID', sortKey: 'batchId', filterKey: 'batchId' },
            { key: 'batchNumber', label: 'Batch #', sortKey: 'batchNumber', filterKey: 'batchNumber' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.batchStatus(item.status)
            }
        ],

        MfgProdConsumption: [
            { key: 'consumptionId', label: 'ID', sortKey: 'consumptionId', filterKey: 'consumptionId' },
            { key: 'workOrderId', label: 'Work Order', sortKey: 'workOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            {
                key: 'consumptionDate',
                label: 'Date',
                sortKey: 'consumptionDate',
                render: (item) => renderDate(item.consumptionDate)
            }
        ]
    };
})();
```

#### `production/production-forms.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MfgProduction = window.MfgProduction || {};

    const enums = MfgProduction.enums;

    MfgProduction.forms = {
        MfgWorkOrder: {
            title: 'Work Order',
            sections: [
                {
                    title: 'Work Order Details',
                    fields: [
                        { key: 'workOrderNumber', label: 'WO Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'bomId', label: 'BOM', type: 'reference', lookupModel: 'MfgBom' },
                        { key: 'routingId', label: 'Routing', type: 'reference', lookupModel: 'MfgRouting' },
                        { key: 'quantityOrdered', label: 'Qty Ordered', type: 'number', required: true },
                        { key: 'plannedStartDate', label: 'Planned Start', type: 'date' },
                        { key: 'plannedEndDate', label: 'Planned End', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.WORK_ORDER_STATUS },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder' },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgWorkOrderOp: {
            title: 'Work Order Operation',
            sections: [
                {
                    title: 'Operation Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'operationNumber', label: 'Operation #', type: 'number', required: true },
                        { key: 'workCenterId', label: 'Work Center', type: 'reference', lookupModel: 'MfgWorkCenter', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'setupTime', label: 'Setup Time (hrs)', type: 'number' },
                        { key: 'runTime', label: 'Run Time (hrs)', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.OPERATION_STATUS }
                    ]
                }
            ]
        },

        MfgProductionOrder: {
            title: 'Production Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order Number', type: 'text', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.WORK_ORDER_STATUS },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MfgProdOrderLine: {
            title: 'Production Order Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'prodOrderId', label: 'Prod Order', type: 'reference', lookupModel: 'MfgProductionOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'requiredQty', label: 'Required Qty', type: 'number', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' }
                    ]
                }
            ]
        },

        MfgProdBatch: {
            title: 'Production Batch',
            sections: [
                {
                    title: 'Batch Details',
                    fields: [
                        { key: 'batchNumber', label: 'Batch Number', type: 'text', required: true },
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BATCH_STATUS }
                    ]
                }
            ]
        },

        MfgProdConsumption: {
            title: 'Production Consumption',
            sections: [
                {
                    title: 'Consumption Details',
                    fields: [
                        { key: 'workOrderId', label: 'Work Order', type: 'reference', lookupModel: 'MfgWorkOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'consumptionDate', label: 'Date', type: 'date' }
                    ]
                }
            ]
        }
    };

    MfgProduction.primaryKeys = {
        MfgWorkOrder: 'workOrderId',
        MfgWorkOrderOp: 'operationId',
        MfgProductionOrder: 'prodOrderId',
        MfgProdOrderLine: 'lineId',
        MfgProdBatch: 'batchId',
        MfgProdConsumption: 'consumptionId'
    };
})();
```

#### `production/production.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    // MfgProduction namespace initialized by enum, column, and form files
    // This file can contain any additional production-specific logic
})();
```

### 6d. Module Init File: `mfg/mfg-init.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    Layer8DModuleFactory.create({
        namespace: 'Mfg',
        defaultModule: 'production',
        defaultService: 'work-orders',
        sectionSelector: 'production',
        initializerName: 'initializeMfg',
        requiredNamespaces: ['MfgEngineering', 'MfgProduction', 'MfgShopFloor', 'MfgQuality', 'MfgPlanning', 'MfgCosting']
    });
})();
```

### 6e. Section HTML: `sections/mfg.html`

Create section HTML following the Sales pattern with:
- Header with parallax effect and MFG-themed SVG icons (gears, factory, quality checkmarks)
- Module tabs: Engineering, Production, Shop Floor, Quality, Planning, Costing
- Each module has subnav with all its services
- Table containers with IDs: `{module}-{service}-table-container`

Example structure:
```html
<div class="section-container hcm-section">
    <!-- Header with Parallax Effect (MFG themed: gears, factory icons) -->
    <div class="hcm-header-frame parallax-container">
        <!-- SVG with manufacturing icons -->
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab" data-module="engineering">📐 Engineering</button>
        <button class="hcm-module-tab active" data-module="production">🏭 Production</button>
        <button class="hcm-module-tab" data-module="shopfloor">🔧 Shop Floor</button>
        <button class="hcm-module-tab" data-module="quality">✅ Quality</button>
        <button class="hcm-module-tab" data-module="planning">📈 Planning</button>
        <button class="hcm-module-tab" data-module="costing">💰 Costing</button>
    </div>

    <div class="section-content">
        <!-- Production Module (default active) -->
        <div class="hcm-module-content active" data-module="production">
            <nav class="hcm-subnav">
                <a class="hcm-subnav-item active" data-service="work-orders">📦 Work Orders</a>
                <a class="hcm-subnav-item" data-service="wo-operations">⚙️ WO Operations</a>
                <!-- ... other services -->
            </nav>
            <div class="hcm-service-content">
                <div class="hcm-service-view active" data-service="work-orders">
                    <div class="hcm-table-container" id="production-work-orders-table-container"></div>
                </div>
                <!-- ... other service views -->
            </div>
        </div>
        <!-- ... other modules -->
    </div>
</div>
```

### 6f. Wiring in `app.html`

Add after Sales scripts:

```html
<!-- Manufacturing CSS -->
<link rel="stylesheet" href="mfg/mfg.css">

<!-- Manufacturing Config -->
<script src="mfg/mfg-config.js"></script>

<!-- Manufacturing Submodules -->
<script src="mfg/engineering/engineering-enums.js"></script>
<script src="mfg/engineering/engineering-columns.js"></script>
<script src="mfg/engineering/engineering-forms.js"></script>
<script src="mfg/engineering/engineering.js"></script>

<script src="mfg/production/production-enums.js"></script>
<script src="mfg/production/production-columns.js"></script>
<script src="mfg/production/production-forms.js"></script>
<script src="mfg/production/production.js"></script>

<script src="mfg/shopfloor/shopfloor-enums.js"></script>
<script src="mfg/shopfloor/shopfloor-columns.js"></script>
<script src="mfg/shopfloor/shopfloor-forms.js"></script>
<script src="mfg/shopfloor/shopfloor.js"></script>

<script src="mfg/quality/quality-enums.js"></script>
<script src="mfg/quality/quality-columns.js"></script>
<script src="mfg/quality/quality-forms.js"></script>
<script src="mfg/quality/quality.js"></script>

<script src="mfg/planning/planning-enums.js"></script>
<script src="mfg/planning/planning-columns.js"></script>
<script src="mfg/planning/planning-forms.js"></script>
<script src="mfg/planning/planning.js"></script>

<script src="mfg/costing/costing-enums.js"></script>
<script src="mfg/costing/costing-columns.js"></script>
<script src="mfg/costing/costing-forms.js"></script>
<script src="mfg/costing/costing.js"></script>

<!-- Manufacturing Init (LAST) -->
<script src="mfg/mfg-init.js"></script>
```

### 6g. Wiring in `sections.js`

Add section mapping:

```javascript
const sections = {
    // ... existing sections
    mfg: 'sections/mfg.html'
};

const sectionInitializers = {
    // ... existing initializers
    mfg: () => { if (typeof initializeMfg === 'function') initializeMfg(); }
};
```

---

## Step 7: Create Mobile UI (Mobile Parity)

### 7a. Directory Structure

Create `go/erp/ui/web/m/js/mfg/` with files for each submodule:

```
m/js/mfg/
├── engineering-enums.js
├── engineering-columns.js
├── engineering-forms.js
├── production-enums.js
├── production-columns.js
├── production-forms.js
├── shopfloor-enums.js
├── shopfloor-columns.js
├── shopfloor-forms.js
├── quality-enums.js
├── quality-columns.js
├── quality-forms.js
├── planning-enums.js
├── planning-columns.js
├── planning-forms.js
├── costing-enums.js
├── costing-columns.js
├── costing-forms.js
└── mfg-index.js
```

### 7b. Mobile Registry: `m/js/mfg/mfg-index.js`

```javascript
/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    const modules = [
        MobileMfgEngineering,
        MobileMfgProduction,
        MobileMfgShopFloor,
        MobileMfgQuality,
        MobileMfgPlanning,
        MobileMfgCosting
    ];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) {
                return mod;
            }
        }
        return null;
    }

    window.MobileMfg = {
        getFormDef(modelName) {
            const mod = findModule(modelName);
            return mod && mod.forms && mod.forms[modelName] || null;
        },
        getColumns(modelName) {
            const mod = findModule(modelName);
            return mod && mod.columns && mod.columns[modelName] || null;
        },
        getEnums(modelName) {
            const mod = findModule(modelName);
            return mod && mod.enums || null;
        },
        getPrimaryKey(modelName) {
            const mod = findModule(modelName);
            return mod && mod.primaryKeys && mod.primaryKeys[modelName] || null;
        },
        hasModel(modelName) {
            return findModule(modelName) !== null;
        },
        modules: {
            Engineering: MobileMfgEngineering,
            Production: MobileMfgProduction,
            ShopFloor: MobileMfgShopFloor,
            Quality: MobileMfgQuality,
            Planning: MobileMfgPlanning,
            Costing: MobileMfgCosting
        }
    };
})();
```

### 7c. Mobile Nav Config Update

In `l8ui/m/js/layer8m-nav-config.js`:

1. Add mfg to modules list:
```javascript
{ key: 'mfg', label: 'Manufacturing', icon: 'mfg', hasSubModules: true }
```

2. Add full config block:
```javascript
mfg: {
    subModules: [
        { key: 'engineering', label: 'Engineering', icon: 'mfg' },
        { key: 'production', label: 'Production', icon: 'mfg' },
        { key: 'shopfloor', label: 'Shop Floor', icon: 'mfg' },
        { key: 'quality', label: 'Quality', icon: 'mfg' },
        { key: 'planning', label: 'Planning', icon: 'mfg' },
        { key: 'costing', label: 'Costing', icon: 'mfg' }
    ],
    services: {
        'engineering': [
            { key: 'boms', label: 'BOMs', icon: 'mfg', endpoint: '/70/MfgBom', model: 'MfgBom', idField: 'bomId' },
            { key: 'bom-lines', label: 'BOM Lines', icon: 'mfg', endpoint: '/70/MfgBomLine', model: 'MfgBomLine', idField: 'lineId' },
            // ... all engineering services
        ],
        'production': [
            { key: 'work-orders', label: 'Work Orders', icon: 'mfg', endpoint: '/70/MfgWO', model: 'MfgWorkOrder', idField: 'workOrderId' },
            // ... all production services
        ],
        // ... all other submodules
    }
}
```

### 7d. Mobile Nav.js Update

In `layer8m-nav.js`, add `MobileMfg` to registry lookups in `_getServiceColumns`, `_getServiceFormDef`, etc.

### 7e. Mobile app.html Update

Add script tags and sidebar link:

```html
<!-- MFG Mobile Scripts -->
<script src="js/mfg/engineering-enums.js"></script>
<script src="js/mfg/engineering-columns.js"></script>
<script src="js/mfg/engineering-forms.js"></script>
<!-- ... all submodule files -->
<script src="js/mfg/mfg-index.js"></script>

<!-- Sidebar -->
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="mfg">
    <span class="sidebar-item-icon"><!-- MFG icon SVG --></span>
    Manufacturing
</a>
```

---

## Step 8: Reference Registry Updates

### CRITICAL: Verify Field Names First

Before writing registry entries, grep the .pb.go files:

```bash
grep -A 30 "type MfgWorkOrder struct" go/types/mfg/*.pb.go | grep 'json:"'
```

### Desktop Reference Registry

Add to `reference-registry-*.js`:

```javascript
// Manufacturing models
MfgBom: {
    idColumn: 'bomId',
    displayColumn: 'bomNumber',
    selectColumns: ['bomId', 'bomNumber', 'description'],
    displayFormat: function(item) { return item.bomNumber + ' - ' + item.description; },
    displayLabel: 'BOM'
},
MfgRouting: {
    idColumn: 'routingId',
    displayColumn: 'routingNumber',
    selectColumns: ['routingId', 'routingNumber', 'description'],
    displayLabel: 'Routing'
},
MfgWorkOrder: {
    idColumn: 'workOrderId',
    displayColumn: 'workOrderNumber',
    selectColumns: ['workOrderId', 'workOrderNumber'],
    displayLabel: 'Work Order'
},
MfgWorkCenter: {
    idColumn: 'workCenterId',
    displayColumn: 'name',
    selectColumns: ['workCenterId', 'code', 'name'],
    displayFormat: function(item) { return item.code + ' - ' + item.name; },
    displayLabel: 'Work Center'
},
MfgQualityPlan: {
    idColumn: 'planId',
    displayColumn: 'name',
    displayLabel: 'Quality Plan'
},
MfgNCR: {
    idColumn: 'ncrId',
    displayColumn: 'ncrNumber',
    displayLabel: 'NCR'
},
MfgProductionOrder: {
    idColumn: 'prodOrderId',
    displayColumn: 'orderNumber',
    displayLabel: 'Production Order'
}
```

### Mobile Reference Registry

Add same entries to `layer8m-reference-registry.js`.

---

## Step 9: Mock Data Generation

### Phase Ordering (36 services, 10 phases)

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | MfgWorkCenter, MfgShiftSchedule | None |
| 2 | MfgWorkCenterCap, MfgQualityPlan, MfgOverhead | Phase 1 |
| 3 | MfgBom, MfgRouting | SCM Item |
| 4 | MfgBomLine, MfgRoutingOperation, MfgInspectionPoint | Phase 3 |
| 5 | MfgStandardCost, MfgCostRollup, MfgCapacityPlan | Phase 3 + Phase 1 |
| 6 | MfgWorkOrder, MfgProductionOrder, MfgMrpRun, MfgProdSchedule | Phase 3 + SCM Item |
| 7 | MfgWorkOrderOp, MfgProdOrderLine, MfgProdBatch, MfgMrpRequirement | Phase 6 |
| 8 | MfgLaborEntry, MfgMachineEntry, MfgProdConsumption, MfgDowntimeEvent | Phase 6 + HCM Employee |
| 9 | MfgQualityInspection, MfgTestResult, MfgActualCost, MfgCapacityLoad, MfgScheduleBlock | Phase 6 |
| 10 | MfgNCR, MfgNCRAction, MfgCostVariance, MfgOverheadAlloc, MfgEngChangeOrder, MfgEngChangeDetail | Phase 9 |

### Files to Create

| File | Contents |
|------|----------|
| `gen_mfg_foundation.go` | Phases 1-2 |
| `gen_mfg_engineering.go` | Phases 3-4 |
| `gen_mfg_production.go` | Phases 6-7 |
| `gen_mfg_shopfloor.go` | Phase 8 |
| `gen_mfg_quality.go` | Phases 9-10 |
| `gen_mfg_planning.go` | MRP, capacity, schedules |
| `gen_mfg_costing.go` | Standard, actual costs, variances |
| `mfg_phases.go` | Phase orchestration (1-5) |
| `mfg_phases6_10.go` | Phase orchestration (6-10) |

---

## Step 10: Verify Build

1. Run `go build ./erp/mfg/...`
2. Run `go vet ./erp/mfg/...`
3. Run `go build ./erp/ui/...`
4. Verify UI loads in browser with Manufacturing section
5. Verify mobile card navigation shows Manufacturing
6. Run mock data generation

---

## Files Summary

### Files to Modify

| File | Change |
|------|--------|
| `go/erp/ui/web/js/sections.js` | Add `mfg` section mapping |
| `go/erp/ui/web/app.html` | Add MFG CSS + script tags |
| `l8ui/m/js/layer8m-nav-config.js` | Add MFG module config |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileMfg` to registries |
| `m/app.html` | Add MFG scripts + sidebar |
| Desktop reference registry | Add MFG models |
| Mobile reference registry | Add MFG models |

### Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Desktop UI config | 2 | `mfg/mfg-{config,init}.js` |
| Desktop UI CSS | 1 | `mfg/mfg.css` |
| Desktop submodule files | 24 | `mfg/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/mfg.html` |
| Mobile submodule files | 18 | `m/js/mfg/*` |
| Mobile registry | 1 | `m/js/mfg/mfg-index.js` |
| Mock generators | 9 | `go/tests/mocks/gen_mfg_*.go` |
| **Total** | ~56 UI files | |

---

## Prime Objects Summary (36 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Engineering | MfgBom | MfgBom | BomId |
| 2 | Engineering | MfgBomLine | MfgBomLine | LineId |
| 3 | Engineering | MfgRouting | MfgRouting | RoutingId |
| 4 | Engineering | MfgRoutingOperation | MfgRoutOp | OperationId |
| 5 | Engineering | MfgEngChangeOrder | MfgECO | ChangeOrderId |
| 6 | Engineering | MfgEngChangeDetail | MfgECODtl | DetailId |
| 7 | Production | MfgWorkOrder | MfgWO | WorkOrderId |
| 8 | Production | MfgWorkOrderOp | MfgWOOp | OperationId |
| 9 | Production | MfgProductionOrder | MfgProdOrd | ProdOrderId |
| 10 | Production | MfgProdOrderLine | MfgPOLine | LineId |
| 11 | Production | MfgProdBatch | MfgBatch | BatchId |
| 12 | Production | MfgProdConsumption | MfgConsump | ConsumptionId |
| 13 | Shop Floor | MfgWorkCenter | MfgWC | WorkCenterId |
| 14 | Shop Floor | MfgWorkCenterCap | MfgWCCap | CapacityId |
| 15 | Shop Floor | MfgLaborEntry | MfgLabor | EntryId |
| 16 | Shop Floor | MfgMachineEntry | MfgMachine | EntryId |
| 17 | Shop Floor | MfgShiftSchedule | MfgShift | ScheduleId |
| 18 | Shop Floor | MfgDowntimeEvent | MfgDowntm | EventId |
| 19 | Quality | MfgQualityPlan | MfgQP | PlanId |
| 20 | Quality | MfgInspectionPoint | MfgInspPt | PointId |
| 21 | Quality | MfgQualityInspection | MfgQInsp | InspectionId |
| 22 | Quality | MfgTestResult | MfgTest | ResultId |
| 23 | Quality | MfgNCR | MfgNCR | NcrId |
| 24 | Quality | MfgNCRAction | MfgNCRAct | ActionId |
| 25 | Planning | MfgMrpRun | MfgMRP | RunId |
| 26 | Planning | MfgMrpRequirement | MfgMRPReq | RequirementId |
| 27 | Planning | MfgCapacityPlan | MfgCapPln | PlanId |
| 28 | Planning | MfgCapacityLoad | MfgCapLd | LoadId |
| 29 | Planning | MfgProdSchedule | MfgSched | ScheduleId |
| 30 | Planning | MfgScheduleBlock | MfgSchdBlk | BlockId |
| 31 | Costing | MfgStandardCost | MfgStdCst | CostId |
| 32 | Costing | MfgCostRollup | MfgCstRol | RollupId |
| 33 | Costing | MfgActualCost | MfgActCst | ActualCostId |
| 34 | Costing | MfgCostVariance | MfgCstVar | VarianceId |
| 35 | Costing | MfgOverhead | MfgOvrhd | OverheadId |
| 36 | Costing | MfgOverheadAlloc | MfgOHAlloc | AllocationId |

**ServiceArea for ALL services: `byte(70)`**

**All ServiceName values are <= 10 characters.**

**All Proto type names and JS model names use `Mfg` prefix.**
