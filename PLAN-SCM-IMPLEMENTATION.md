# Supply Chain Management Module - Implementation Plan

## Overview

Implement the Supply Chain Management (SCM) module following the exact same patterns as HCM and FIN. This covers 44 Prime Objects across 6 submodules: Procurement, Inventory Management, Warehouse Management, Logistics & Transportation, Demand Planning, and Supply Planning.

Reference documents: `ERP_MODULES.md` (Section 3), `PLAN-FIN-IMPLEMENTATION.md` (pattern reference)

### Global Rules Compliance

This plan has been cross-referenced against `.claude/rules/maintainability.md`:

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums, detail views). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (Money, AuditInfo, Address, ContactInfo) created during FIN. References FIN's Vendor and Account via cross-module service calls instead of redefining them. Reuses `go/erp/common/` validation utilities. Reuses all shared UI components (ERPForms, L8Table, ERPPopup, ERPDatePicker, ERPReferencePicker, ERPInputFormatter). |
| **Future-Proof Design** | Item master is defined as an SCM Prime Object but designed as a shared ERP entity. Manufacturing will reference Item for BOMs, Sales will reference Item for order lines. `scm-common.proto` imports `erp-common.proto` for shared types reusable by all modules. |
| **Read Before Implementing** | Plan requires reading ALL HCM and FIN code (services, callbacks, protos, UI) before writing any SCM code. Use the Read tool to read each file completely, show key interfaces and props found, then implement. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 44 ServiceName constants are 10 characters or fewer. See Prime Objects Summary table for full listing. |
| **ServiceArea same per Module** | All SCM services use `ServiceArea = byte(200)`. |

---

## Step 0: Pre-requisites

### 0a. Verify `erp-common.proto` exists

The shared `erp-common.proto` was created during FIN implementation (Step 0 of `PLAN-FIN-IMPLEMENTATION.md`). Verify it contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. If not yet created, follow FIN Step 0 first.

### 0b. Verify cross-module references

SCM references entities from other modules:

| Referenced Entity | Source Module | How SCM Uses It |
|-------------------|--------------|-----------------|
| **Vendor** | FIN (Accounts Payable) | Procurement links POs and requisitions to vendors |
| **Account** | FIN (General Ledger) | Inventory valuation posts to GL accounts |
| **Customer** | FIN (Accounts Receivable) | Shipments and delivery proofs reference customers |
| **Employee** | HCM (Core HR) | Warehouse labor, requisition requesters |

These are accessed via cross-module service calls (same pattern as HCM's Department referenced by FIN). No duplication of these entities in SCM protos.

### 0c. Add SCM-specific shared types to `erp-common.proto` (if needed)

Evaluate whether `UnitOfMeasure` should be added to `erp-common.proto` since it will be used by SCM (Item, StockMovement), Manufacturing (BOM), and Sales (Order Lines):

```protobuf
message UnitOfMeasure {
  string uom_id = 1;
  string code = 2;        // e.g., "EA", "KG", "LB", "M"
  string name = 3;        // e.g., "Each", "Kilogram"
  string category = 4;    // e.g., "Weight", "Length", "Volume", "Count"
  double conversion_factor = 5;  // relative to base unit in category
}
```

If added, regenerate HCM and FIN types and verify builds before proceeding.

### Future-Proof Note: Item Master

Item is defined as an SCM Prime Object but will also be referenced by future modules:
- **Manufacturing** will reference Item for BOMs and production orders
- **Sales** will reference Item for sales order lines and pricing
- **E-Commerce** will reference Item for product catalog sync

Item lives in the SCM module as its system-of-record, and other modules will reference it via cross-module service calls (same pattern as FIN's Vendor).

---

## Step 1: Create Proto Files (prefix: `scm-`)

Create 7 proto files under `proto/`:

| File | Contents |
|------|----------|
| `scm-common.proto` | SCM-specific shared types and enums (MovementType, OrderStatus, ShipmentStatus, ItemType, ValuationMethod, etc.). Imports `erp-common.proto` for Money, AuditInfo, Address, ContactInfo. |
| `scm-procurement.proto` | 7 Prime Objects: PurchaseRequisition, RequisitionLine, RequestForQuotation, PurchaseOrder, PurchaseOrderLine, BlanketOrder, SupplierScorecard |
| `scm-inventory.proto` | 8 Prime Objects: Item, ItemCategory, StockMovement, LotNumber, SerialNumber, CycleCount, ReorderPoint, InventoryValuation |
| `scm-warehouse.proto` | 9 Prime Objects: Warehouse, Bin, ReceivingOrder, PutawayTask, PickTask, PackTask, ShipTask, WavePlan, DockSchedule |
| `scm-logistics.proto` | 8 Prime Objects: Carrier, FreightRate, Shipment, Route, LoadPlan, DeliveryProof, FreightAudit, ReturnAuthorization |
| `scm-demand_planning.proto` | 6 Prime Objects: DemandForecast, ForecastModel, DemandPlan, PromotionalPlan, NewProductPlan, ForecastAccuracy |
| `scm-supply_planning.proto` | 6 Prime Objects: MaterialRequirement, DistributionRequirement, SupplyPlan, SupplierCollaboration, SafetyStock, LeadTime |

### Proto Pattern

Follow the exact pattern from HCM and FIN proto files:

```protobuf
/*
  2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
syntax = "proto3";

package scm;

option go_package = "./types/scm";

import "scm-common.proto";
import "api.proto";

// ============================================================================
// PROCUREMENT MESSAGES
// ============================================================================

// @PrimeObject
// PurchaseRequisition represents a request to procure goods or services
message PurchaseRequisition {
  string requisition_id = 1;
  string requisition_number = 2;
  string requester_id = 3;         // cross-ref: HCM Employee
  string department_id = 4;        // cross-ref: HCM Department
  int64 request_date = 5;
  RequisitionStatus status = 6;
  string description = 7;
  string priority = 8;
  erp.Money estimated_total = 9;
  string approval_workflow_id = 10;
  map<string, string> custom_fields = 11;
  erp.AuditInfo audit_info = 12;
}

message PurchaseRequisitionList {
  repeated PurchaseRequisition list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation above it
- **Every Prime Object MUST have a companion `<Name>List` message** (44 Prime Objects = 88 messages total):
  ```protobuf
  message ItemList {
    repeated Item list = 1;
    l8api.L8MetaData metadata = 2;
  }
  ```
  The service layer requires both `scm.<Name>{}` and `scm.<Name>List{}` for `sla.SetServiceItem()` and `sla.SetServiceItemList()`
- All use `package scm` and `option go_package = "./types/scm"`
- Import `scm-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility where appropriate
- License header on every file

### Shared Types Strategy

`scm-common.proto` imports `erp-common.proto` for shared types (Money, AuditInfo, Address, ContactInfo, DateRange) and defines only SCM-specific types and enums. This avoids code duplication per the global rules and ensures future modules (Manufacturing, Sales) can reuse the same shared types.

### SCM-Specific Enums (defined in `scm-common.proto`)

```protobuf
enum RequisitionStatus {
  REQUISITION_STATUS_UNSPECIFIED = 0;
  REQUISITION_STATUS_DRAFT = 1;
  REQUISITION_STATUS_SUBMITTED = 2;
  REQUISITION_STATUS_APPROVED = 3;
  REQUISITION_STATUS_REJECTED = 4;
  REQUISITION_STATUS_FULFILLED = 5;
  REQUISITION_STATUS_CANCELLED = 6;
}

enum PurchaseOrderStatus {
  PO_STATUS_UNSPECIFIED = 0;
  PO_STATUS_DRAFT = 1;
  PO_STATUS_APPROVED = 2;
  PO_STATUS_SENT = 3;
  PO_STATUS_PARTIALLY_RECEIVED = 4;
  PO_STATUS_RECEIVED = 5;
  PO_STATUS_CLOSED = 6;
  PO_STATUS_CANCELLED = 7;
}

enum MovementType {
  MOVEMENT_TYPE_UNSPECIFIED = 0;
  MOVEMENT_TYPE_RECEIPT = 1;
  MOVEMENT_TYPE_ISSUE = 2;
  MOVEMENT_TYPE_TRANSFER = 3;
  MOVEMENT_TYPE_ADJUSTMENT = 4;
  MOVEMENT_TYPE_RETURN = 5;
  MOVEMENT_TYPE_SCRAP = 6;
}

enum ItemType {
  ITEM_TYPE_UNSPECIFIED = 0;
  ITEM_TYPE_RAW_MATERIAL = 1;
  ITEM_TYPE_FINISHED_GOOD = 2;
  ITEM_TYPE_SEMI_FINISHED = 3;
  ITEM_TYPE_MRO = 4;
  ITEM_TYPE_SERVICE = 5;
  ITEM_TYPE_CONSUMABLE = 6;
}

enum ValuationMethod {
  VALUATION_METHOD_UNSPECIFIED = 0;
  VALUATION_METHOD_FIFO = 1;
  VALUATION_METHOD_LIFO = 2;
  VALUATION_METHOD_WEIGHTED_AVG = 3;
  VALUATION_METHOD_STANDARD = 4;
}

enum ShipmentStatus {
  SHIPMENT_STATUS_UNSPECIFIED = 0;
  SHIPMENT_STATUS_PLANNED = 1;
  SHIPMENT_STATUS_PICKED_UP = 2;
  SHIPMENT_STATUS_IN_TRANSIT = 3;
  SHIPMENT_STATUS_DELIVERED = 4;
  SHIPMENT_STATUS_FAILED = 5;
  SHIPMENT_STATUS_RETURNED = 6;
}

enum TaskStatus {
  TASK_STATUS_UNSPECIFIED = 0;
  TASK_STATUS_PENDING = 1;
  TASK_STATUS_IN_PROGRESS = 2;
  TASK_STATUS_COMPLETED = 3;
  TASK_STATUS_CANCELLED = 4;
}

enum WarehouseType {
  WAREHOUSE_TYPE_UNSPECIFIED = 0;
  WAREHOUSE_TYPE_STANDARD = 1;
  WAREHOUSE_TYPE_COLD_STORAGE = 2;
  WAREHOUSE_TYPE_HAZMAT = 3;
  WAREHOUSE_TYPE_BONDED = 4;
  WAREHOUSE_TYPE_CROSS_DOCK = 5;
}

enum BinType {
  BIN_TYPE_UNSPECIFIED = 0;
  BIN_TYPE_STORAGE = 1;
  BIN_TYPE_PICKING = 2;
  BIN_TYPE_RECEIVING = 3;
  BIN_TYPE_SHIPPING = 4;
  BIN_TYPE_STAGING = 5;
  BIN_TYPE_QUARANTINE = 6;
}

enum CarrierType {
  CARRIER_TYPE_UNSPECIFIED = 0;
  CARRIER_TYPE_PARCEL = 1;
  CARRIER_TYPE_LTL = 2;
  CARRIER_TYPE_FTL = 3;
  CARRIER_TYPE_AIR = 4;
  CARRIER_TYPE_OCEAN = 5;
  CARRIER_TYPE_RAIL = 6;
  CARRIER_TYPE_COURIER = 7;
}

enum PlanningMethod {
  PLANNING_METHOD_UNSPECIFIED = 0;
  PLANNING_METHOD_MRP = 1;
  PLANNING_METHOD_REORDER_POINT = 2;
  PLANNING_METHOD_MIN_MAX = 3;
  PLANNING_METHOD_KANBAN = 4;
}

enum ForecastMethod {
  FORECAST_METHOD_UNSPECIFIED = 0;
  FORECAST_METHOD_MOVING_AVG = 1;
  FORECAST_METHOD_EXPONENTIAL = 2;
  FORECAST_METHOD_REGRESSION = 3;
  FORECAST_METHOD_SEASONAL = 4;
  FORECAST_METHOD_MANUAL = 5;
}
```

---

## Step 2: Generate Go Types via `make-bindings.sh`

Update `proto/make-bindings.sh` to include the new `scm-*.proto` files. Add these lines after the existing FIN docker runs:

```bash
# Supply Chain Management
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-procurement.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-inventory.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-warehouse.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-logistics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-demand_planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=scm-supply_planning.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Since the SCM protos use `option go_package = "./types/scm"`, the generated files will land in `go/types/scm/`.

**File to modify:** `proto/make-bindings.sh`

Run after creating all proto files:
```bash
cd proto/ && bash make-bindings.sh
```

---

## Step 3: Create Go Services (44 services)

Create directory `go/erp/scm/` with 44 service packages. Each package has exactly 2 files.

**IMPORTANT: All SCM services use `ServiceArea = byte(200)`** per the global rule that ServiceArea should be the same for services under the same module.

### 3a. `<ServiceName>Service.go`

Pattern from HCM/FIN services:

```go
// 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.

package items

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/scm"
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "Item"
    ServiceArea = byte(200)    // All SCM services use 200
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil { panic(err) }
    db := common.OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true,
        newItemServiceCallback())
    sla.SetServiceItem(&scm.Item{})
    sla.SetServiceItemList(&scm.ItemList{})
    sla.SetPrimaryKeys("ItemId")
    sla.SetArgs(p)
    sla.SetTransactional(true)
    sla.SetReplication(true)
    sla.SetReplicationCount(3)

    ws := web.New(ServiceName, ServiceArea, 0)
    ws.AddEndpoint(&scm.Item{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&scm.ItemList{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&scm.Item{}, ifs.PUT, &l8web.L8Empty{})
    ws.AddEndpoint(&scm.Item{}, ifs.PATCH, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &scm.ItemList{})
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}

func Items(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
    return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func Item(itemId string, vnic ifs.IVNic) (*scm.Item, error) {
    this, ok := Items(vnic)
    if !ok {
        return nil, errors.New("No Item Service Found")
    }
    filter := &scm.Item{ItemId: itemId}
    resp := this.Get(object.New(nil, filter), vnic)
    if resp.Error() != nil {
        return nil, resp.Error()
    }
    return resp.Element().(*scm.Item), nil
}
```

### 3b. `<ServiceName>ServiceCallback.go`

Pattern from HCM/FIN callbacks:

```go
package items

import (
    "errors"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/scm"
    "github.com/saichler/l8types/go/ifs"
)

type ItemServiceCallback struct{}

func newItemServiceCallback() *ItemServiceCallback {
    return &ItemServiceCallback{}
}

func (this *ItemServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    item, ok := any.(*scm.Item)
    if !ok {
        return nil, false, errors.New("invalid item type")
    }
    err := validate(item, vnic)
    if err != nil {
        return nil, false, err
    }
    return nil, true, nil
}

func (this *ItemServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    return nil, true, nil
}

func validate(item *scm.Item, vnic ifs.IVNic) error {
    if err := common.ValidateRequired(item.ItemId, "ItemId"); err != nil {
        return err
    }
    if err := common.ValidateRequired(item.Name, "Name"); err != nil {
        return err
    }
    // ... additional validations
    return nil
}
```

### Service Directory Listing (44 packages)

**Procurement** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `purchasereqs/` | `PurchReq` | PurchaseRequisition |
| `requisitionlines/` | `ReqLine` | RequisitionLine |
| `rfqs/` | `RFQ` | RequestForQuotation |
| `purchaseorders/` | `PurchOrder` | PurchaseOrder |
| `polines/` | `POLine` | PurchaseOrderLine |
| `blanketorders/` | `BlnktOrder` | BlanketOrder |
| `supplierscorecards/` | `SupplrCard` | SupplierScorecard |

**Inventory Management** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `items/` | `Item` | Item |
| `itemcategories/` | `ItemCat` | ItemCategory |
| `stockmovements/` | `StockMove` | StockMovement |
| `lotnumbers/` | `LotNumber` | LotNumber |
| `serialnumbers/` | `SerialNum` | SerialNumber |
| `cyclecounts/` | `CycleCount` | CycleCount |
| `reorderpoints/` | `ReorderPt` | ReorderPoint |
| `inventoryvaluations/` | `InvValue` | InventoryValuation |

**Warehouse Management** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `warehouses/` | `Warehouse` | Warehouse |
| `bins/` | `Bin` | Bin |
| `receivingorders/` | `RecvOrder` | ReceivingOrder |
| `putawaytasks/` | `PutAway` | PutawayTask |
| `picktasks/` | `PickTask` | PickTask |
| `packtasks/` | `PackTask` | PackTask |
| `shiptasks/` | `ShipTask` | ShipTask |
| `waveplans/` | `WavePlan` | WavePlan |
| `dockschedules/` | `DockSched` | DockSchedule |

**Logistics and Transportation** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `carriers/` | `Carrier` | Carrier |
| `freightrates/` | `FreightRt` | FreightRate |
| `shipments/` | `Shipment` | Shipment |
| `routes/` | `Route` | Route |
| `loadplans/` | `LoadPlan` | LoadPlan |
| `deliveryproofs/` | `DlvryProof` | DeliveryProof |
| `freightaudits/` | `FrtAudit` | FreightAudit |
| `returnauths/` | `ReturnAuth` | ReturnAuthorization |

**Demand Planning** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `demandforecasts/` | `DmndFcast` | DemandForecast |
| `forecastmodels/` | `FcastModel` | ForecastModel |
| `demandplans/` | `DemandPlan` | DemandPlan |
| `promoplans/` | `PromoPlan` | PromotionalPlan |
| `newproductplans/` | `NewProdPln` | NewProductPlan |
| `forecastaccuracies/` | `FcastAccur` | ForecastAccuracy |

**Supply Planning** (`ServiceArea = byte(200)` for all):

| Package | ServiceName | Proto Message |
|---------|-------------|---------------|
| `materialreqs/` | `MatReq` | MaterialRequirement |
| `distributionreqs/` | `DistReq` | DistributionRequirement |
| `supplyplans/` | `SupplyPlan` | SupplyPlan |
| `suppliercollabs/` | `SupCollab` | SupplierCollaboration |
| `safetystocks/` | `SafeStock` | SafetyStock |
| `leadtimes/` | `LeadTime` | LeadTime |

---

## Step 4: Create `scm_main.go`

Create `go/erp/scm/scm_main.go` following `go/erp/fin/fin_main.go`:

```go
// 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.

package main

import (
    "fmt"
    "github.com/saichler/l8bus/go/overlay/vnic"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8types/go/ifs"
    "os/exec"
    "time"

    // Procurement
    "github.com/saichler/l8erp/go/erp/scm/purchasereqs"
    "github.com/saichler/l8erp/go/erp/scm/requisitionlines"
    "github.com/saichler/l8erp/go/erp/scm/rfqs"
    "github.com/saichler/l8erp/go/erp/scm/purchaseorders"
    "github.com/saichler/l8erp/go/erp/scm/polines"
    "github.com/saichler/l8erp/go/erp/scm/blanketorders"
    "github.com/saichler/l8erp/go/erp/scm/supplierscorecards"

    // Inventory Management
    "github.com/saichler/l8erp/go/erp/scm/items"
    "github.com/saichler/l8erp/go/erp/scm/itemcategories"
    "github.com/saichler/l8erp/go/erp/scm/stockmovements"
    "github.com/saichler/l8erp/go/erp/scm/lotnumbers"
    "github.com/saichler/l8erp/go/erp/scm/serialnumbers"
    "github.com/saichler/l8erp/go/erp/scm/cyclecounts"
    "github.com/saichler/l8erp/go/erp/scm/reorderpoints"
    "github.com/saichler/l8erp/go/erp/scm/inventoryvaluations"

    // Warehouse Management
    "github.com/saichler/l8erp/go/erp/scm/warehouses"
    "github.com/saichler/l8erp/go/erp/scm/bins"
    "github.com/saichler/l8erp/go/erp/scm/receivingorders"
    "github.com/saichler/l8erp/go/erp/scm/putawaytasks"
    "github.com/saichler/l8erp/go/erp/scm/picktasks"
    "github.com/saichler/l8erp/go/erp/scm/packtasks"
    "github.com/saichler/l8erp/go/erp/scm/shiptasks"
    "github.com/saichler/l8erp/go/erp/scm/waveplans"
    "github.com/saichler/l8erp/go/erp/scm/dockschedules"

    // Logistics and Transportation
    "github.com/saichler/l8erp/go/erp/scm/carriers"
    "github.com/saichler/l8erp/go/erp/scm/freightrates"
    "github.com/saichler/l8erp/go/erp/scm/shipments"
    "github.com/saichler/l8erp/go/erp/scm/routes"
    "github.com/saichler/l8erp/go/erp/scm/loadplans"
    "github.com/saichler/l8erp/go/erp/scm/deliveryproofs"
    "github.com/saichler/l8erp/go/erp/scm/freightaudits"
    "github.com/saichler/l8erp/go/erp/scm/returnauths"

    // Demand Planning
    "github.com/saichler/l8erp/go/erp/scm/demandforecasts"
    "github.com/saichler/l8erp/go/erp/scm/forecastmodels"
    "github.com/saichler/l8erp/go/erp/scm/demandplans"
    "github.com/saichler/l8erp/go/erp/scm/promoplans"
    "github.com/saichler/l8erp/go/erp/scm/newproductplans"
    "github.com/saichler/l8erp/go/erp/scm/forecastaccuracies"

    // Supply Planning
    "github.com/saichler/l8erp/go/erp/scm/materialreqs"
    "github.com/saichler/l8erp/go/erp/scm/distributionreqs"
    "github.com/saichler/l8erp/go/erp/scm/supplyplans"
    "github.com/saichler/l8erp/go/erp/scm/suppliercollabs"
    "github.com/saichler/l8erp/go/erp/scm/safetystocks"
    "github.com/saichler/l8erp/go/erp/scm/leadtimes"
)

func main() {
    res := common.CreateResources("scm")
    ifs.SetNetworkMode(ifs.NETWORK_K8s)
    nic := vnic.NewVirtualNetworkInterface(res, nil)
    nic.Start()
    nic.WaitForConnection()
    startDb(nic)
    activateServices(nic)
    common.WaitForSignal(res)
}

func activateServices(nic ifs.IVNic) {
    // Procurement
    purchasereqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    requisitionlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    rfqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    purchaseorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    polines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    blanketorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    supplierscorecards.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Inventory Management
    items.Activate(common.DB_CREDS, common.DB_NAME, nic)
    itemcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
    stockmovements.Activate(common.DB_CREDS, common.DB_NAME, nic)
    lotnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    serialnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    cyclecounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    reorderpoints.Activate(common.DB_CREDS, common.DB_NAME, nic)
    inventoryvaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Warehouse Management
    warehouses.Activate(common.DB_CREDS, common.DB_NAME, nic)
    bins.Activate(common.DB_CREDS, common.DB_NAME, nic)
    receivingorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    putawaytasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    picktasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    packtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    shiptasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    waveplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    dockschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Logistics and Transportation
    carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    freightrates.Activate(common.DB_CREDS, common.DB_NAME, nic)
    shipments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    routes.Activate(common.DB_CREDS, common.DB_NAME, nic)
    loadplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    deliveryproofs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    freightaudits.Activate(common.DB_CREDS, common.DB_NAME, nic)
    returnauths.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Demand Planning
    demandforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    forecastmodels.Activate(common.DB_CREDS, common.DB_NAME, nic)
    demandplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    promoplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    newproductplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    forecastaccuracies.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Supply Planning
    materialreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    distributionreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    supplyplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    suppliercollabs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    safetystocks.Activate(common.DB_CREDS, common.DB_NAME, nic)
    leadtimes.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func startDb(nic ifs.IVNic) {
    _, user, pass, _, err := nic.Resources().Security().Credential(common.DB_CREDS, common.DB_NAME, nic.Resources())
    if err != nil { panic(common.DB_CREDS + " " + err.Error()) }
    fmt.Println("/start-postgres.sh", common.DB_NAME, user, pass)
    cmd := exec.Command("nohup", "/start-postgres.sh", common.DB_NAME, user, pass)
    out, err := cmd.Output()
    if err != nil { panic(err) }
    fmt.Println(string(out))
    time.Sleep(time.Second * 5)
}
```

---

## Step 5: Create Frontend UI

### Shared Component Architecture

The SCM module MUST use the same shared component ecosystem as HCM and FIN. These components already exist and handle all generic UI behavior:

| Shared Component | Location | What It Does |
|-----------------|----------|--------------|
| **ERPUtils** | `shared/erp-utils.js` | HTML escaping, date/money/number formatting, enum matching |
| **ERPConfig** | `shared/app-config.js` | App configuration, date format settings |
| **ERPForms** | `shared/erp-forms.js` | Generic form generation, CRUD operations, modal integration, field component attachment |
| **ERPRenderers** | `shared/erp-renderers.js` | Status badges, enum rendering, boolean rendering |
| **ERPReferenceRegistry** | `shared/reference-registry.js` | Central registry for lookup/reference field configs |
| **ERPPopup** | `popup/popup.js` | Modal dialog system |
| **L8Table** | `edit_table/table-*.js` | Data tables with server-side paging, sorting, filtering |
| **ERPDatePicker** | `datepicker/datepicker-*.js` | Calendar date picker |
| **ERPReferencePicker** | `reference_picker/reference-picker-*.js` | Lookup/reference field picker |
| **ERPInputFormatter** | `input_formatters/input-formatter-*.js` | Input masking (SSN, phone, currency, etc.) |
| **ERPNotification** | `notification/` | Toast notifications |

**The SCM module files are thin configuration wrappers, NOT reimplementations.** They:
1. Define module/service configuration (`scm-config.js`)
2. Delegate to `ERPForms` for all form handling (`scm-forms.js` and `scm-crud.js`)
3. Use `L8Table` for all data tables (`scm-service.js`)
4. Use `ERPPopup` for all modals
5. Only provide data definitions (columns, forms, enums) per submodule

### Data Flow (same as HCM and FIN)

```
scm-navigation.js -> SCM.loadServiceView(moduleKey, serviceKey)
  -> scm-service.js -> Creates L8Table with columns from submodule
    -> L8Table handles paging, sorting, filtering via L8Query
  -> User clicks Add/Edit -> scm-crud.js -> ERPForms.openAddForm/openEditForm
    -> ERPForms generates form HTML from submodule form definition
    -> ERPPopup.show() displays modal
    -> ERPDatePicker, ERPReferencePicker, ERPInputFormatter auto-attach
  -> User saves -> ERPForms.saveRecord() -> PUT/POST to endpoint
    -> SCM.refreshCurrentTable() reloads L8Table
```

### SCM-Specific Field Type Patterns

Common SCM field patterns the forms will use:

| Pattern | Field Type | Example |
|---------|-----------|---------|
| Monetary amounts | `currency` | PO total, freight cost, item unit price |
| Quantities | `number` | Order qty, stock qty, min/max levels |
| Weight/dimensions | `number` | Item weight, package dimensions |
| Percentages | `percentage` | Discount %, forecast accuracy % |
| Item references | `reference` + `lookupModel: 'Item'` | PO line item, stock movement item |
| Vendor references | `reference` + `lookupModel: 'Vendor'` | PO vendor, supplier scorecard vendor (cross-module to FIN) |
| Warehouse references | `reference` + `lookupModel: 'Warehouse'` | Stock movement warehouse, bin warehouse |
| GL Account references | `reference` + `lookupModel: 'Account'` | Inventory valuation account (cross-module to FIN) |
| Dates | `date` | Order date, ship date, receipt date, expiry date |
| Status enums | `select` + `options: enums.X` | PO status, shipment status, task status |
| Active/boolean flags | `checkbox` | Is active, is lot tracked, is serial tracked |
| Descriptions/notes | `textarea` | Item description, PO notes, route description |
| Codes/identifiers | `text` | Item number, PO number, warehouse code, carrier code |

### 5a. Update shared `reference-registry.js`

Add SCM model configurations to `shared/reference-registry.js`:

```javascript
// Supply Chain Management references
Item:          { idColumn: 'itemId', displayColumn: 'name', selectColumns: ['itemId', 'itemNumber', 'name'] },
ItemCategory:  { idColumn: 'categoryId', displayColumn: 'name', selectColumns: ['categoryId', 'name'] },
Warehouse:     { idColumn: 'warehouseId', displayColumn: 'name', selectColumns: ['warehouseId', 'code', 'name'] },
Bin:           { idColumn: 'binId', displayColumn: 'binCode', selectColumns: ['binId', 'binCode', 'warehouseId'] },
Carrier:       { idColumn: 'carrierId', displayColumn: 'name', selectColumns: ['carrierId', 'code', 'name'] },
Route:         { idColumn: 'routeId', displayColumn: 'name', selectColumns: ['routeId', 'name'] },
LotNumber:     { idColumn: 'lotId', displayColumn: 'lotNumber', selectColumns: ['lotId', 'lotNumber', 'itemId'] },
SerialNumber:  { idColumn: 'serialId', displayColumn: 'serialNumber', selectColumns: ['serialId', 'serialNumber', 'itemId'] },
PurchaseOrder: { idColumn: 'purchaseOrderId', displayColumn: 'orderNumber', selectColumns: ['purchaseOrderId', 'orderNumber'] },
// ... additional models as needed for reference fields
```

### 5b. Update shared `erp-forms.js`

Update `getEndpointForModel()` to search SCM modules:

```javascript
function getEndpointForModel(modelName) {
    const namespaces = ['HCM', 'FIN', 'SCM'];  // Added SCM
    for (const ns of namespaces) {
        const mod = window[ns];
        if (!mod || !mod.modules) continue;
        for (const moduleKey in mod.modules) {
            const module = mod.modules[moduleKey];
            if (module.services) {
                for (const service of module.services) {
                    if (service.model === modelName) {
                        return service.endpoint;
                    }
                }
            }
        }
    }
    return null;
}
```

### 5c. Create SCM section HTML

Replace placeholder `sections/supply-chain.html` (or create it) with full module tabs, subnav, and table containers following the exact pattern of `sections/hcm.html` and `sections/financial.html`. Use CSS class prefix `scm-` instead of `hcm-` or `fin-`.

### 5d. Create `go/erp/ui/web/scm/` directory with these files:

**Core module files (thin wrappers over shared components):**
- `scm.js` - Entry point, verifies dependencies loaded (same pattern as `hcm.js` / `fin.js`)
- `scm-config.js` - Module/service definitions (`SCM.modules` map with endpoints)
- `scm-navigation.js` - Tab switching, delegates to L8Table and ERPForms
- `scm-service.js` - Creates L8Table instances, gets columns/forms from submodules
- `scm-crud.js` - Delegates to ERPForms for add/edit/delete modals
- `scm-forms.js` - Thin wrapper that delegates to ERPForms
- `scm.css` - SCM-specific styles (tab colors, icons)

**Submodule files (configuration only, no UI logic):**

Each submodule provides ONLY data definitions -- columns, forms, enums, primary keys:

| Folder | Files |
|--------|-------|
| `procurement/` | `procurement.js`, `procurement-columns.js`, `procurement-forms.js`, `procurement-enums.js`, `purchase-order-detail.js` |
| `inventory/` | `inventory.js`, `inventory-columns.js`, `inventory-forms.js`, `inventory-enums.js`, `item-detail.js` |
| `warehouse/` | `warehouse.js`, `warehouse-columns.js`, `warehouse-forms.js`, `warehouse-enums.js`, `warehouse-detail.js` |
| `logistics/` | `logistics.js`, `logistics-columns.js`, `logistics-forms.js`, `logistics-enums.js`, `shipment-detail.js` |
| `demand-planning/` | `demand-planning.js`, `demand-planning-columns.js`, `demand-planning-forms.js`, `demand-planning-enums.js` |
| `supply-planning/` | `supply-planning.js`, `supply-planning-columns.js`, `supply-planning-forms.js`, `supply-planning-enums.js` |

**Submodule registration pattern** (same as HCM's `CoreHR`, FIN's `GeneralLedger`, etc.):

```javascript
window.Procurement = {
    columns: { PurchaseRequisition: [...], PurchaseOrder: [...], ... },
    forms: { PurchaseRequisition: { title: 'Purchase Requisition', sections: [...] }, ... },
    primaryKeys: { PurchaseRequisition: 'requisitionId', PurchaseOrder: 'purchaseOrderId', ... },
    detailsConfig: { ... },
    enums: { ... }
};
```

### 5e. Example: Item Form (Inventory Management)

```javascript
Inventory.forms = {
    Item: {
        title: 'Item',
        sections: [
            {
                title: 'Item Details',
                fields: [
                    { key: 'itemNumber', label: 'Item #', type: 'text', required: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'itemType', label: 'Type', type: 'select', options: enums.ITEM_TYPE, required: true },
                    { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'ItemCategory' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'unitCost', label: 'Unit Cost', type: 'currency' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ]
            },
            {
                title: 'Inventory Settings',
                fields: [
                    { key: 'valuationMethod', label: 'Valuation', type: 'select', options: enums.VALUATION_METHOD },
                    { key: 'planningMethod', label: 'Planning', type: 'select', options: enums.PLANNING_METHOD },
                    { key: 'isLotTracked', label: 'Lot Tracked', type: 'checkbox' },
                    { key: 'isSerialTracked', label: 'Serial Tracked', type: 'checkbox' },
                    { key: 'shelfLife', label: 'Shelf Life (days)', type: 'number' },
                    { key: 'defaultWarehouseId', label: 'Default Warehouse', type: 'reference', lookupModel: 'Warehouse' }
                ]
            }
        ]
    }
};
```

### 5f. Example: Purchase Order Column Definition

```javascript
Procurement.columns.PurchaseOrder = [
    { key: 'purchaseOrderId', label: 'ID', sortKey: 'purchaseOrderId', filterKey: 'purchaseOrderId' },
    { key: 'orderNumber', label: 'PO #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
    {
        key: 'orderDate',
        label: 'Order Date',
        sortKey: 'orderDate',
        render: (item) => renderDate(item.orderDate)
    },
    { key: 'vendorName', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
    {
        key: 'status',
        label: 'Status',
        sortKey: 'status',
        filterKey: 'status',
        enumValues: enums.PO_STATUS_VALUES,
        render: (item) => renderEnum(item.status, enums.PO_STATUS)
    },
    {
        key: 'totalAmount',
        label: 'Total',
        sortKey: 'totalAmount',
        render: (item) => renderMoney(item.totalAmount)
    },
    {
        key: 'expectedDelivery',
        label: 'Expected Delivery',
        sortKey: 'expectedDelivery',
        render: (item) => renderDate(item.expectedDelivery)
    }
];
```

### 5g. Register SCM scripts in `app.html`

Add SCM module script tags to `app.html` after FIN scripts, following the same load order pattern.

---

## Step 6: Verify Build

1. Run `cd proto/ && bash make-bindings.sh` to generate Go types from proto files
2. Run `go build ./...` from the project root to verify compilation
3. Verify the UI loads in the browser with the Supply Chain section showing module tabs

---

## Implementation Order

Given the dependency chain within SCM, implement in this order:

0. **Verify pre-requisites** - Confirm `erp-common.proto` exists, evaluate adding `UnitOfMeasure`
1. **SCM proto files** - `scm-common.proto` first (imports `erp-common.proto`), then all submodule protos
2. **Generate types** - Run `make-bindings.sh`
3. **Inventory services** - Foundation for everything (Item, ItemCategory first -- these are referenced by almost all other submodules)
4. **Procurement services** - PurchaseRequisition -> PurchaseOrder -> PurchaseOrderLine chain (references FIN's Vendor)
5. **Warehouse services** - Warehouse -> Bin -> ReceivingOrder -> task chain (references Item from inventory)
6. **Logistics services** - Carrier -> Shipment -> Route chain (references Warehouse, FIN's Customer)
7. **Demand Planning services** - DemandForecast -> ForecastModel -> DemandPlan (references Item)
8. **Supply Planning services** - MaterialRequirement -> SupplyPlan (references Item, Vendor, Warehouse)
9. **scm_main.go** - Wire everything together
10. **UI** - Build frontend following HCM/FIN pattern

---

## Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add `scm-*.proto` docker runs |
| `go/erp/ui/web/shared/erp-forms.js` | Update `getEndpointForModel()` to search `SCM.modules` (add `'SCM'` to namespaces array) |
| `go/erp/ui/web/edit_table/table-data.js` | Add SCM primary key fields to the fallback chain (`itemId`, `warehouseId`, `binId`, `carrierId`, `shipmentId`, `purchaseOrderId`, `requisitionId`, `routeId`, etc.) |
| `go/erp/ui/web/shared/reference-registry.js` | Add SCM model reference configs (Item, Warehouse, Bin, Carrier, PurchaseOrder, etc.) |
| `go/erp/ui/web/sections/supply-chain.html` | Replace placeholder with full module UI |
| `go/erp/ui/web/app.html` | Add SCM module script tags |

## Files to Create

| Category | Count | Location |
|----------|-------|----------|
| SCM proto files | 7 | `proto/scm-*.proto` |
| Generated Go types | 7 | `go/types/scm/*.pb.go` (auto-generated) |
| Service files | 88 (44x2) | `go/erp/scm/<service>/{Service,Callback}.go` |
| Main entry | 1 | `go/erp/scm/scm_main.go` |
| UI core files | 7 | `go/erp/ui/web/scm/scm-*.{js,css}` |
| UI submodule files | ~28 | `go/erp/ui/web/scm/<submodule>/*.js` |
| **Total** | ~138 files | |

---

## Cross-Module Integration Points

| SCM Entity | References | Source Module | Integration Pattern |
|------------|-----------|--------------|-------------------|
| PurchaseOrder | Vendor | FIN (AP) | Cross-module service call to get vendor details |
| PurchaseOrder | Account | FIN (GL) | GL account for expense posting |
| ReceivingOrder | PurchaseOrder | SCM (Procurement) | Intra-module reference for 3-way matching |
| Shipment | Customer | FIN (AR) | Cross-module service call for delivery destination |
| StockMovement | Account | FIN (GL) | GL account for inventory valuation journal entries |
| InventoryValuation | Account | FIN (GL) | GL account for balance sheet inventory value |
| SupplierScorecard | Vendor | FIN (AP) | Cross-module reference for vendor performance |
| WavePlan | Employee | HCM (Core HR) | Cross-module reference for labor assignment |

---

## Prime Objects Summary (44 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Procurement | PurchaseRequisition | PurchReq | RequisitionId |
| 2 | Procurement | RequisitionLine | ReqLine | LineId |
| 3 | Procurement | RequestForQuotation | RFQ | RfqId |
| 4 | Procurement | PurchaseOrder | PurchOrder | PurchaseOrderId |
| 5 | Procurement | PurchaseOrderLine | POLine | LineId |
| 6 | Procurement | BlanketOrder | BlnktOrder | BlanketOrderId |
| 7 | Procurement | SupplierScorecard | SupplrCard | ScorecardId |
| 8 | Inventory | Item | Item | ItemId |
| 9 | Inventory | ItemCategory | ItemCat | CategoryId |
| 10 | Inventory | StockMovement | StockMove | MovementId |
| 11 | Inventory | LotNumber | LotNumber | LotId |
| 12 | Inventory | SerialNumber | SerialNum | SerialId |
| 13 | Inventory | CycleCount | CycleCount | CycleCountId |
| 14 | Inventory | ReorderPoint | ReorderPt | ReorderPointId |
| 15 | Inventory | InventoryValuation | InvValue | ValuationId |
| 16 | Warehouse | Warehouse | Warehouse | WarehouseId |
| 17 | Warehouse | Bin | Bin | BinId |
| 18 | Warehouse | ReceivingOrder | RecvOrder | ReceivingOrderId |
| 19 | Warehouse | PutawayTask | PutAway | TaskId |
| 20 | Warehouse | PickTask | PickTask | TaskId |
| 21 | Warehouse | PackTask | PackTask | TaskId |
| 22 | Warehouse | ShipTask | ShipTask | TaskId |
| 23 | Warehouse | WavePlan | WavePlan | WavePlanId |
| 24 | Warehouse | DockSchedule | DockSched | ScheduleId |
| 25 | Logistics | Carrier | Carrier | CarrierId |
| 26 | Logistics | FreightRate | FreightRt | RateId |
| 27 | Logistics | Shipment | Shipment | ShipmentId |
| 28 | Logistics | Route | Route | RouteId |
| 29 | Logistics | LoadPlan | LoadPlan | LoadPlanId |
| 30 | Logistics | DeliveryProof | DlvryProof | ProofId |
| 31 | Logistics | FreightAudit | FrtAudit | AuditId |
| 32 | Logistics | ReturnAuthorization | ReturnAuth | RmaId |
| 33 | Demand | DemandForecast | DmndFcast | ForecastId |
| 34 | Demand | ForecastModel | FcastModel | ModelId |
| 35 | Demand | DemandPlan | DemandPlan | PlanId |
| 36 | Demand | PromotionalPlan | PromoPlan | PlanId |
| 37 | Demand | NewProductPlan | NewProdPln | PlanId |
| 38 | Demand | ForecastAccuracy | FcastAccur | AccuracyId |
| 39 | Supply | MaterialRequirement | MatReq | RequirementId |
| 40 | Supply | DistributionRequirement | DistReq | RequirementId |
| 41 | Supply | SupplyPlan | SupplyPlan | PlanId |
| 42 | Supply | SupplierCollaboration | SupCollab | CollaborationId |
| 43 | Supply | SafetyStock | SafeStock | SafetyStockId |
| 44 | Supply | LeadTime | LeadTime | LeadTimeId |

**ServiceArea for ALL services: `byte(200)`**

**All ServiceName values are <= 10 characters.**
