# Sales and Distribution Module - Implementation Plan

## Overview

Implement the Sales and Distribution (Sales) module following the exact patterns established by HCM, FIN, and SCM. This covers 33 Prime Objects across 6 submodules: Customer Management, Sales Orders, Pricing, Shipping & Delivery, Billing, and Sales Analytics.

Reference documents:
- `plans/ERP_MODULES.md` (Section 5)
- `plans/PLAN-SCM-IMPLEMENTATION.md` (pattern reference)
- `plans/global-rules-all.md` (global rules)
- `l8ui/GUIDE.md` (Layer8 UI component usage)

### Global Rules Compliance

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums). All files stay well under 500 lines. |
| **No Duplicate Code** | Reuses `erp-common.proto` shared types (Money, AuditInfo, Address, ContactInfo, DateRange). References FIN's Customer, Account, and SCM's Item via cross-module service calls. Uses all Layer8 shared UI components. |
| **Future-Proof Design** | Sales entities will be referenced by CRM (leads, opportunities link to quotes/orders) and E-Commerce (order sync). SalesOrder and PriceList are designed as shared entities. |
| **Read Before Implementing** | Plan requires reading ALL HCM, FIN, and SCM code (services, callbacks, protos, UI) before writing any Sales code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented below. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |
| **ServiceName <= 10 chars** | All 33 ServiceName constants are 10 characters or fewer. See Prime Objects Summary. |
| **ServiceArea same per Module** | All Sales services use `ServiceArea = byte(60)`. |
| **Mobile Parity** | Desktop and mobile UI are implemented together. |

---

## Step 0: Prerequisites

### 0a. Verify `erp-common.proto` exists

Shared `erp-common.proto` contains: Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange. Already created during FIN implementation.

### 0b. Verify cross-module references

Sales references entities from other modules:

| Referenced Entity | Source Module | How Sales Uses It |
|-------------------|--------------|-------------------|
| **Customer** | FIN (AR) | Sales orders, quotations, delivery orders reference customers |
| **Account** | FIN (GL) | Revenue accounts, discount accounts for posting |
| **SalesInvoice** | FIN (AR) | Sales triggers invoice creation in FIN after delivery |
| **Item** | SCM (Inventory) | Order lines, price lists reference items from SCM |
| **Warehouse** | SCM (Warehouse) | Shipping origin, pick release locations |
| **Employee** | HCM (Core HR) | Salespeople, territory assignments, commission recipients |

These are accessed via cross-module service calls (same pattern as SCM referencing FIN's Vendor). No duplication of these entities in Sales protos.

### 0c. Evaluate shared types for `erp-common.proto`

Consider whether `TaxCalculation` should be added to `erp-common.proto` since it will be used by Sales (order tax), FIN (invoice tax), and E-Commerce (cart tax):

```protobuf
message TaxCalculation {
  string tax_code = 1;
  double tax_rate = 2;
  erp.Money taxable_amount = 3;
  erp.Money tax_amount = 4;
}
```

If added, regenerate all module types and verify builds before proceeding.

### 0d. FIN already handles billing

FIN's Accounts Receivable already defines `SalesInvoice`, `SalesInvoiceLine`, `CustomerPayment`, `PaymentApplication`, and `CreditMemo`. The Sales module's Billing submodule handles billing *schedules* and *revenue recognition* -- the triggers and rules -- while FIN handles the actual invoice records and payment processing. Sales creates deliveries; FIN creates invoices from those deliveries.

### Future-Proof Note: SalesOrder and PriceList

SalesOrder and PriceList are defined as Sales Prime Objects but will also be referenced by future modules:
- **CRM** will reference SalesQuotation and SalesOrder for pipeline tracking
- **E-Commerce** will reference PriceList and SalesOrder for storefront integration
- **BI** will reference SalesOrder and CommissionCalc for analytics

---

## Step 1: Create Proto Files (prefix: `sales-`)

Create 8 proto files under `proto/`:

| File | Contents |
|------|----------|
| `sales-common.proto` | Sales-specific shared types and enums. Imports `erp-common.proto`. |
| `sales-customer.proto` | 4 Prime Objects: CustomerHierarchy, CustomerSegment, CustomerContract, PartnerChannel |
| `sales-orders.proto` | 8 Prime Objects: SalesQuotation, QuotationLine, SalesOrder, SalesOrderLine, OrderAllocation, BackOrder, ReturnOrder, ReturnOrderLine |
| `sales-pricing.proto` | 6 Prime Objects: PriceList, PriceListEntry, CustomerPrice, DiscountRule, PromotionalPrice, QuantityBreak |
| `sales-shipping.proto` | 6 Prime Objects: DeliveryOrder, DeliveryLine, PickRelease, PackingSlip, ShippingDoc, DeliveryConfirm |
| `sales-billing.proto` | 3 Prime Objects: BillingSchedule, BillingMilestone, RevenueSchedule |
| `sales-analytics.proto` | 6 Prime Objects: SalesTarget, SalesTerritory, TerritoryAssign, CommissionPlan, CommissionCalc, SalesForecast |

### Proto Pattern

Follow the exact pattern from HCM, FIN, and SCM:

```protobuf
/*
  2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
syntax = "proto3";

package sales;

option go_package = "./types/sales";

import "sales-common.proto";
import "api.proto";

// ============================================================================
// SALES ORDER MESSAGES
// ============================================================================

// @PrimeObject
// SalesOrder represents a confirmed customer order
message SalesOrder {
  string sales_order_id = 1;
  string order_number = 2;
  string customer_id = 3;            // cross-ref: FIN Customer
  string salesperson_id = 4;         // cross-ref: HCM Employee
  int64 order_date = 5;
  int64 requested_delivery_date = 6;
  SalesOrderStatus status = 7;
  string quotation_id = 8;           // optional: linked quotation
  string ship_to_address_id = 9;
  string bill_to_address_id = 10;
  string payment_terms = 11;
  string currency_code = 12;
  erp.Money subtotal = 13;
  erp.Money discount_total = 14;
  erp.Money tax_total = 15;
  erp.Money total_amount = 16;
  string warehouse_id = 17;          // cross-ref: SCM Warehouse
  string notes = 18;
  string priority = 19;
  map<string, string> custom_fields = 20;
  erp.AuditInfo audit_info = 21;
}

message SalesOrderList {
  repeated SalesOrder list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation
- **Every Prime Object MUST have a companion `<Name>List` message** (33 Prime Objects = 66 messages total)
- All use `package sales` and `option go_package = "./types/sales"`
- Import `sales-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `erp.AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility
- License header on every file

### Sales-Specific Enums (defined in `sales-common.proto`)

```protobuf
enum QuotationStatus {
  QUOTATION_STATUS_UNSPECIFIED = 0;
  QUOTATION_STATUS_DRAFT = 1;
  QUOTATION_STATUS_SENT = 2;
  QUOTATION_STATUS_ACCEPTED = 3;
  QUOTATION_STATUS_REJECTED = 4;
  QUOTATION_STATUS_EXPIRED = 5;
  QUOTATION_STATUS_CANCELLED = 6;
}

enum SalesOrderStatus {
  SALES_ORDER_STATUS_UNSPECIFIED = 0;
  SALES_ORDER_STATUS_DRAFT = 1;
  SALES_ORDER_STATUS_CONFIRMED = 2;
  SALES_ORDER_STATUS_IN_PROGRESS = 3;
  SALES_ORDER_STATUS_PARTIALLY_SHIPPED = 4;
  SALES_ORDER_STATUS_SHIPPED = 5;
  SALES_ORDER_STATUS_DELIVERED = 6;
  SALES_ORDER_STATUS_CANCELLED = 7;
}

enum ReturnStatus {
  RETURN_STATUS_UNSPECIFIED = 0;
  RETURN_STATUS_REQUESTED = 1;
  RETURN_STATUS_APPROVED = 2;
  RETURN_STATUS_RECEIVED = 3;
  RETURN_STATUS_INSPECTED = 4;
  RETURN_STATUS_PROCESSED = 5;
  RETURN_STATUS_REJECTED = 6;
}

enum DeliveryStatus {
  DELIVERY_STATUS_UNSPECIFIED = 0;
  DELIVERY_STATUS_PLANNED = 1;
  DELIVERY_STATUS_PICKING = 2;
  DELIVERY_STATUS_PACKED = 3;
  DELIVERY_STATUS_SHIPPED = 4;
  DELIVERY_STATUS_DELIVERED = 5;
  DELIVERY_STATUS_FAILED = 6;
}

enum PricingMethod {
  PRICING_METHOD_UNSPECIFIED = 0;
  PRICING_METHOD_FIXED = 1;
  PRICING_METHOD_COST_PLUS = 2;
  PRICING_METHOD_VOLUME = 3;
  PRICING_METHOD_CONTRACT = 4;
}

enum DiscountType {
  DISCOUNT_TYPE_UNSPECIFIED = 0;
  DISCOUNT_TYPE_PERCENTAGE = 1;
  DISCOUNT_TYPE_FIXED_AMOUNT = 2;
  DISCOUNT_TYPE_BUY_X_GET_Y = 3;
  DISCOUNT_TYPE_TIERED = 4;
}

enum CommissionType {
  COMMISSION_TYPE_UNSPECIFIED = 0;
  COMMISSION_TYPE_PERCENTAGE = 1;
  COMMISSION_TYPE_FIXED = 2;
  COMMISSION_TYPE_TIERED = 3;
}

enum TerritoryType {
  TERRITORY_TYPE_UNSPECIFIED = 0;
  TERRITORY_TYPE_GEOGRAPHIC = 1;
  TERRITORY_TYPE_INDUSTRY = 2;
  TERRITORY_TYPE_ACCOUNT_BASED = 3;
  TERRITORY_TYPE_PRODUCT = 4;
}

enum BillingFrequency {
  BILLING_FREQUENCY_UNSPECIFIED = 0;
  BILLING_FREQUENCY_ONE_TIME = 1;
  BILLING_FREQUENCY_MONTHLY = 2;
  BILLING_FREQUENCY_QUARTERLY = 3;
  BILLING_FREQUENCY_MILESTONE = 4;
}

enum ForecastCategory {
  FORECAST_CATEGORY_UNSPECIFIED = 0;
  FORECAST_CATEGORY_PIPELINE = 1;
  FORECAST_CATEGORY_BEST_CASE = 2;
  FORECAST_CATEGORY_COMMITTED = 3;
  FORECAST_CATEGORY_CLOSED = 4;
}

enum ContractStatus {
  CONTRACT_STATUS_UNSPECIFIED = 0;
  CONTRACT_STATUS_DRAFT = 1;
  CONTRACT_STATUS_ACTIVE = 2;
  CONTRACT_STATUS_EXPIRED = 3;
  CONTRACT_STATUS_TERMINATED = 4;
  CONTRACT_STATUS_RENEWED = 5;
}
```

---

## Step 2: Generate Go Types via `make-bindings.sh`

Add to `proto/make-bindings.sh` after SCM docker runs:

```bash
# Sales and Distribution
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-customer.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-orders.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-pricing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-shipping.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-billing.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=sales-analytics.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

Generated files land in `go/types/sales/`.

Run: `cd proto/ && bash make-bindings.sh`

---

## Step 3: Create Go Services (33 services)

Create directory `go/erp/sales/` with 33 service packages. Each package has exactly 2 files.

**All Sales services use `ServiceArea = byte(60)`.**

### 3a. Service File Pattern (`<ServiceName>Service.go`)

Follow the exact HCM/FIN/SCM pattern:

```go
package salesorders

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/sales"
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "SalesOrder"
    ServiceArea = byte(60)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil { panic(err) }
    db := common.OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true,
        newSalesOrderServiceCallback())
    sla.SetServiceItem(&sales.SalesOrder{})
    sla.SetServiceItemList(&sales.SalesOrderList{})
    sla.SetPrimaryKeys("SalesOrderId")
    sla.SetArgs(p)
    sla.SetTransactional(true)
    sla.SetReplication(true)
    sla.SetReplicationCount(3)

    ws := web.New(ServiceName, ServiceArea, 0)
    ws.AddEndpoint(&sales.SalesOrder{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&sales.SalesOrderList{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&sales.SalesOrder{}, ifs.PUT, &l8web.L8Empty{})
    ws.AddEndpoint(&sales.SalesOrder{}, ifs.PATCH, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &sales.SalesOrderList{})
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}
```

### 3b. Callback File Pattern (`<ServiceName>ServiceCallback.go`)

Same validation pattern as HCM/FIN/SCM.

### Service Directory Listing (33 packages)

**Customer Management** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `customerhierarchies/` | `CustHier` | CustomerHierarchy | HierarchyId |
| `customersegments/` | `CustSegmt` | CustomerSegment | SegmentId |
| `customercontracts/` | `CustContr` | CustomerContract | ContractId |
| `partnerchannels/` | `Partner` | PartnerChannel | PartnerId |

**Sales Orders** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `salesquotations/` | `SalesQuote` | SalesQuotation | QuotationId |
| `quotationlines/` | `QuoteLine` | QuotationLine | LineId |
| `salesorders/` | `SalesOrder` | SalesOrder | SalesOrderId |
| `salesorderlines/` | `OrderLine` | SalesOrderLine | LineId |
| `orderallocations/` | `OrderAlloc` | OrderAllocation | AllocationId |
| `backorders/` | `BackOrder` | BackOrder | BackOrderId |
| `returnorders/` | `ReturnOrd` | ReturnOrder | ReturnOrderId |
| `returnorderlines/` | `ReturnLine` | ReturnOrderLine | LineId |

**Pricing** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `pricelists/` | `PriceList` | PriceList | PriceListId |
| `pricelistentries/` | `PriceEntry` | PriceListEntry | EntryId |
| `customerprices/` | `CustPrice` | CustomerPrice | CustomerPriceId |
| `discountrules/` | `DiscntRule` | DiscountRule | RuleId |
| `promotionalprices/` | `PromoPrice` | PromotionalPrice | PromoId |
| `quantitybreaks/` | `QtyBreak` | QuantityBreak | BreakId |

**Shipping and Delivery** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `deliveryorders/` | `DlvryOrder` | DeliveryOrder | DeliveryOrderId |
| `deliverylines/` | `DlvryLine` | DeliveryLine | LineId |
| `pickreleases/` | `PickRlease` | PickRelease | PickReleaseId |
| `packingslips/` | `PackSlip` | PackingSlip | PackingSlipId |
| `shippingdocs/` | `ShipDoc` | ShippingDoc | DocId |
| `deliveryconfirms/` | `DlvryConf` | DeliveryConfirm | ConfirmId |

**Billing** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `billingschedules/` | `BillSched` | BillingSchedule | ScheduleId |
| `billingmilestones/` | `BillMilstn` | BillingMilestone | MilestoneId |
| `revenueschedules/` | `RevSched` | RevenueSchedule | ScheduleId |

**Sales Analytics** (`ServiceArea = byte(60)` for all):

| Package | ServiceName | Proto Message | Primary Key |
|---------|-------------|---------------|-------------|
| `salestargets/` | `SalesTrgt` | SalesTarget | TargetId |
| `salesterritories/` | `Territory` | SalesTerritory | TerritoryId |
| `territoryassigns/` | `TerrAssign` | TerritoryAssign | AssignmentId |
| `commissionplans/` | `CommPlan` | CommissionPlan | PlanId |
| `commissioncalcs/` | `CommCalc` | CommissionCalc | CalcId |
| `salesforecasts/` | `SalesFcast` | SalesForecast | ForecastId |

---

## Step 4: Create `sales_main.go`

Create `go/erp/sales/sales_main.go` following `go/erp/scm/scm_main.go`:

```go
package main

import (
    "fmt"
    "github.com/saichler/l8bus/go/overlay/vnic"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8types/go/ifs"
    "os/exec"
    "time"

    // Customer Management
    "github.com/saichler/l8erp/go/erp/sales/customerhierarchies"
    "github.com/saichler/l8erp/go/erp/sales/customersegments"
    "github.com/saichler/l8erp/go/erp/sales/customercontracts"
    "github.com/saichler/l8erp/go/erp/sales/partnerchannels"

    // Sales Orders
    "github.com/saichler/l8erp/go/erp/sales/salesquotations"
    "github.com/saichler/l8erp/go/erp/sales/quotationlines"
    "github.com/saichler/l8erp/go/erp/sales/salesorders"
    "github.com/saichler/l8erp/go/erp/sales/salesorderlines"
    "github.com/saichler/l8erp/go/erp/sales/orderallocations"
    "github.com/saichler/l8erp/go/erp/sales/backorders"
    "github.com/saichler/l8erp/go/erp/sales/returnorders"
    "github.com/saichler/l8erp/go/erp/sales/returnorderlines"

    // Pricing
    "github.com/saichler/l8erp/go/erp/sales/pricelists"
    "github.com/saichler/l8erp/go/erp/sales/pricelistentries"
    "github.com/saichler/l8erp/go/erp/sales/customerprices"
    "github.com/saichler/l8erp/go/erp/sales/discountrules"
    "github.com/saichler/l8erp/go/erp/sales/promotionalprices"
    "github.com/saichler/l8erp/go/erp/sales/quantitybreaks"

    // Shipping and Delivery
    "github.com/saichler/l8erp/go/erp/sales/deliveryorders"
    "github.com/saichler/l8erp/go/erp/sales/deliverylines"
    "github.com/saichler/l8erp/go/erp/sales/pickreleases"
    "github.com/saichler/l8erp/go/erp/sales/packingslips"
    "github.com/saichler/l8erp/go/erp/sales/shippingdocs"
    "github.com/saichler/l8erp/go/erp/sales/deliveryconfirms"

    // Billing
    "github.com/saichler/l8erp/go/erp/sales/billingschedules"
    "github.com/saichler/l8erp/go/erp/sales/billingmilestones"
    "github.com/saichler/l8erp/go/erp/sales/revenueschedules"

    // Sales Analytics
    "github.com/saichler/l8erp/go/erp/sales/salestargets"
    "github.com/saichler/l8erp/go/erp/sales/salesterritories"
    "github.com/saichler/l8erp/go/erp/sales/territoryassigns"
    "github.com/saichler/l8erp/go/erp/sales/commissionplans"
    "github.com/saichler/l8erp/go/erp/sales/commissioncalcs"
    "github.com/saichler/l8erp/go/erp/sales/salesforecasts"
)

func main() {
    res := common.CreateResources("sales")
    ifs.SetNetworkMode(ifs.NETWORK_K8s)
    nic := vnic.NewVirtualNetworkInterface(res, nil)
    nic.Start()
    nic.WaitForConnection()
    startDb(nic)
    activateServices(nic)
    common.WaitForSignal(res)
}

func activateServices(nic ifs.IVNic) {
    // Customer Management
    customerhierarchies.Activate(common.DB_CREDS, common.DB_NAME, nic)
    customersegments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    customercontracts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    partnerchannels.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Sales Orders
    salesquotations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    quotationlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    orderallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    backorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    returnorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    returnorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Pricing
    pricelists.Activate(common.DB_CREDS, common.DB_NAME, nic)
    pricelistentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
    customerprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
    discountrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    promotionalprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
    quantitybreaks.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Shipping and Delivery
    deliveryorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
    deliverylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    pickreleases.Activate(common.DB_CREDS, common.DB_NAME, nic)
    packingslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
    shippingdocs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    deliveryconfirms.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Billing
    billingschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    billingmilestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
    revenueschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Sales Analytics
    salestargets.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesterritories.Activate(common.DB_CREDS, common.DB_NAME, nic)
    territoryassigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
    commissionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
    commissioncalcs.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
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

### Layer8 Component Architecture

The Sales module uses the Layer8 generic UI component libraries (see `l8ui/GUIDE.md` for full API reference). Module files contain ONLY configuration data.

**Desktop components** (`Layer8D*` prefix):
- `Layer8DModuleFactory.create()` bootstraps the entire module
- `Layer8DTable` for data tables with server-side paging/sorting/filtering
- `Layer8DForms` for add/edit/view forms in popups
- `Layer8DRenderers` for status badges and enum rendering
- `Layer8DReferenceRegistry` for reference field lookups

**Mobile components** (`Layer8M*` prefix):
- `LAYER8M_NAV_CONFIG` for card-based navigation hierarchy
- `Layer8MNav` for navigation controller
- `Layer8MEditTable` for card-based CRUD tables
- `Layer8MForms` for mobile forms
- `Layer8MRenderers` for mobile renderers

### Sales-Specific Field Type Patterns

| Pattern | Field Type | Example |
|---------|-----------|---------|
| Monetary amounts | `currency` | Order total, unit price, discount amount |
| Quantities | `number` | Order qty, allocated qty, shipped qty |
| Percentages | `percentage` | Discount %, commission rate, tax rate |
| Customer references | `reference` + `lookupModel: 'Customer'` | Order customer (cross-module to FIN) |
| Item references | `reference` + `lookupModel: 'Item'` | Order line item (cross-module to SCM) |
| Warehouse references | `reference` + `lookupModel: 'Warehouse'` | Ship-from warehouse (cross-module to SCM) |
| Employee references | `reference` + `lookupModel: 'Employee'` | Salesperson (cross-module to HCM) |
| Dates | `date` | Order date, delivery date, expiry date |
| Status enums | `select` + `options: enums.X` | Order status, quotation status |
| Active/boolean flags | `checkbox` | Is active, is default |
| Descriptions/notes | `textarea` | Order notes, contract terms |
| Codes/identifiers | `text` | Order number, quotation number |

### 5a. Desktop UI Files

Create `go/erp/ui/web/l8ui/sales/` directory:

**Module config:** `l8ui/sales/sales-config.js`

```javascript
(function() {
    'use strict';
    window.Sales = window.Sales || {};

    Sales.modules = {
        'customers': {
            label: 'Customers',
            icon: '👥',
            services: [
                { key: 'hierarchies', label: 'Hierarchies', icon: '🏢', endpoint: '/60/CustHier', model: 'CustomerHierarchy' },
                { key: 'segments', label: 'Segments', icon: '📊', endpoint: '/60/CustSegmt', model: 'CustomerSegment' },
                { key: 'contracts', label: 'Contracts', icon: '📄', endpoint: '/60/CustContr', model: 'CustomerContract' },
                { key: 'partners', label: 'Partners', icon: '🤝', endpoint: '/60/Partner', model: 'PartnerChannel' }
            ]
        },
        'orders': {
            label: 'Orders',
            icon: '📋',
            services: [
                { key: 'quotations', label: 'Quotations', icon: '📝', endpoint: '/60/SalesQuote', model: 'SalesQuotation' },
                { key: 'sales-orders', label: 'Sales Orders', icon: '📦', endpoint: '/60/SalesOrder', model: 'SalesOrder' },
                { key: 'allocations', label: 'Allocations', icon: '📌', endpoint: '/60/OrderAlloc', model: 'OrderAllocation' },
                { key: 'back-orders', label: 'Back Orders', icon: '⏳', endpoint: '/60/BackOrder', model: 'BackOrder' },
                { key: 'returns', label: 'Returns', icon: '↩️', endpoint: '/60/ReturnOrd', model: 'ReturnOrder' }
            ]
        },
        'pricing': {
            label: 'Pricing',
            icon: '💰',
            services: [
                { key: 'price-lists', label: 'Price Lists', icon: '📃', endpoint: '/60/PriceList', model: 'PriceList' },
                { key: 'customer-prices', label: 'Customer Prices', icon: '🏷️', endpoint: '/60/CustPrice', model: 'CustomerPrice' },
                { key: 'discounts', label: 'Discounts', icon: '🎫', endpoint: '/60/DiscntRule', model: 'DiscountRule' },
                { key: 'promotions', label: 'Promotions', icon: '🎯', endpoint: '/60/PromoPrice', model: 'PromotionalPrice' },
                { key: 'qty-breaks', label: 'Qty Breaks', icon: '📈', endpoint: '/60/QtyBreak', model: 'QuantityBreak' }
            ]
        },
        'shipping': {
            label: 'Shipping',
            icon: '🚚',
            services: [
                { key: 'deliveries', label: 'Deliveries', icon: '📬', endpoint: '/60/DlvryOrder', model: 'DeliveryOrder' },
                { key: 'pick-releases', label: 'Pick Releases', icon: '📋', endpoint: '/60/PickRlease', model: 'PickRelease' },
                { key: 'packing', label: 'Packing Slips', icon: '📦', endpoint: '/60/PackSlip', model: 'PackingSlip' },
                { key: 'ship-docs', label: 'Ship Docs', icon: '📄', endpoint: '/60/ShipDoc', model: 'ShippingDoc' },
                { key: 'confirmations', label: 'Confirmations', icon: '✅', endpoint: '/60/DlvryConf', model: 'DeliveryConfirm' }
            ]
        },
        'billing': {
            label: 'Billing',
            icon: '💳',
            services: [
                { key: 'schedules', label: 'Billing Schedules', icon: '📅', endpoint: '/60/BillSched', model: 'BillingSchedule' },
                { key: 'milestones', label: 'Milestones', icon: '🏁', endpoint: '/60/BillMilstn', model: 'BillingMilestone' },
                { key: 'revenue', label: 'Revenue Recog', icon: '📊', endpoint: '/60/RevSched', model: 'RevenueSchedule' }
            ]
        },
        'analytics': {
            label: 'Analytics',
            icon: '📊',
            services: [
                { key: 'targets', label: 'Sales Targets', icon: '🎯', endpoint: '/60/SalesTrgt', model: 'SalesTarget' },
                { key: 'territories', label: 'Territories', icon: '🗺️', endpoint: '/60/Territory', model: 'SalesTerritory' },
                { key: 'commissions', label: 'Commissions', icon: '💵', endpoint: '/60/CommPlan', model: 'CommissionPlan' },
                { key: 'forecasts', label: 'Forecasts', icon: '🔮', endpoint: '/60/SalesFcast', model: 'SalesForecast' }
            ]
        }
    };

    Sales.submodules = ['SalesCustomers', 'SalesOrders', 'SalesPricing', 'SalesShipping', 'SalesBilling', 'SalesAnalytics'];
})();
```

**Submodule data files (per submodule):**

| Folder | Files |
|--------|-------|
| `customers/` | `customers-enums.js`, `customers-columns.js`, `customers-forms.js`, `customers.js` |
| `orders/` | `orders-enums.js`, `orders-columns.js`, `orders-forms.js`, `orders.js` |
| `pricing/` | `pricing-enums.js`, `pricing-columns.js`, `pricing-forms.js`, `pricing.js` |
| `shipping/` | `shipping-enums.js`, `shipping-columns.js`, `shipping-forms.js`, `shipping.js` |
| `billing/` | `billing-enums.js`, `billing-columns.js`, `billing-forms.js`, `billing.js` |
| `analytics/` | `analytics-enums.js`, `analytics-columns.js`, `analytics-forms.js`, `analytics.js` |

**Module init:** `l8ui/sales/sales-init.js`

```javascript
(function() {
    'use strict';
    Layer8DModuleFactory.create({
        namespace: 'Sales',
        defaultModule: 'orders',
        defaultService: 'sales-orders',
        sectionSelector: 'orders',
        initializerName: 'initializeSales',
        requiredNamespaces: ['SalesCustomers', 'SalesOrders', 'SalesPricing', 'SalesShipping', 'SalesBilling', 'SalesAnalytics']
    });
})();
```

### 5b. Desktop Section HTML

**File:** `sections/sales.html`

Follow the exact pattern from `sections/hcm.html`. CSS classes use `hcm-` prefix (shared CSS). Table container IDs follow `{moduleKey}-{serviceKey}-table-container`.

```html
<div class="section-container sales-section">
    <div class="page-header">
        <h1>Sales & Distribution</h1>
    </div>

    <!-- Module Tabs -->
    <div class="hcm-module-tabs">
        <button class="hcm-module-tab" data-module="customers">...</button>
        <button class="hcm-module-tab active" data-module="orders">...</button>
        <button class="hcm-module-tab" data-module="pricing">...</button>
        <button class="hcm-module-tab" data-module="shipping">...</button>
        <button class="hcm-module-tab" data-module="billing">...</button>
        <button class="hcm-module-tab" data-module="analytics">...</button>
    </div>

    <!-- One hcm-module-content div per module, each with hcm-subnav and service views -->
    <!-- Table container ID format: {moduleKey}-{serviceKey}-table-container -->
    <!-- e.g., id="orders-sales-orders-table-container" -->
</div>
```

### 5c. Desktop Wiring

**app.html** - Add script tags after SCM scripts:

```html
<!-- Sales CSS -->
<link rel="stylesheet" href="l8ui/sales/sales.css">

<!-- Sales Config -->
<script src="l8ui/sales/sales-config.js"></script>
<!-- Sales Submodules (enums, columns, forms, entry per submodule) -->
<script src="l8ui/sales/customers/customers-enums.js"></script>
<script src="l8ui/sales/customers/customers-columns.js"></script>
<script src="l8ui/sales/customers/customers-forms.js"></script>
<script src="l8ui/sales/customers/customers.js"></script>
<!-- repeat for orders, pricing, shipping, billing, analytics -->
<!-- Sales Init (last) -->
<script src="l8ui/sales/sales-init.js"></script>
```

**sections.js** - Add mapping:

```javascript
const sections = { ..., sales: 'sections/sales.html' };
const sectionInitializers = { ..., sales: () => { if (typeof initializeSales === 'function') initializeSales(); } };
```

**Reference registry** - Add Sales models to `reference-registry-*.js`:

```javascript
Layer8DReferenceRegistry.register({
    SalesQuotation: { idColumn: 'quotationId', displayColumn: 'quotationNumber', displayLabel: 'Quotation' },
    SalesOrder: { idColumn: 'salesOrderId', displayColumn: 'orderNumber', displayLabel: 'Sales Order' },
    PriceList: { idColumn: 'priceListId', displayColumn: 'name', displayLabel: 'Price List' },
    CustomerContract: { idColumn: 'contractId', displayColumn: 'contractNumber', displayLabel: 'Contract' },
    SalesTerritory: { idColumn: 'territoryId', displayColumn: 'name', displayLabel: 'Territory' },
    CommissionPlan: { idColumn: 'planId', displayColumn: 'name', displayLabel: 'Commission Plan' },
    DeliveryOrder: { idColumn: 'deliveryOrderId', displayColumn: 'deliveryNumber', displayLabel: 'Delivery' }
});
```

### 5d. Mobile UI Files

Create `m/js/sales/` directory:

**Per submodule:** `customers-enums.js`, `customers-columns.js`, `customers-forms.js` (same data as desktop but with `Mobile` prefix namespace and `primary`/`secondary` column markers)

**Registry:** `m/js/sales/sales-index.js`

```javascript
(function() {
    'use strict';
    const modules = [MobileSalesCustomers, MobileSalesOrders, MobileSalesPricing,
                     MobileSalesShipping, MobileSalesBilling, MobileSalesAnalytics];

    function findModule(modelName) {
        for (const mod of modules) {
            if (mod.columns && mod.columns[modelName]) return mod;
        }
        return null;
    }

    window.MobileSales = {
        getFormDef(modelName) { const m = findModule(modelName); return m && m.forms && m.forms[modelName] || null; },
        getColumns(modelName) { const m = findModule(modelName); return m && m.columns && m.columns[modelName] || null; },
        getTransformData(modelName) { const m = findModule(modelName); return m && m.transformData || null; },
        hasModel(modelName) { return findModule(modelName) !== null; }
    };
})();
```

### 5e. Mobile Nav Config

In `l8ui/m/js/layer8m-nav-config.js`:

1. Change sales module to `hasSubModules: true`:
```javascript
{ key: 'sales', label: 'Sales', icon: 'sales', hasSubModules: true }
```

2. Add config block:
```javascript
sales: {
    subModules: [
        { key: 'customers', label: 'Customers', icon: 'sales' },
        { key: 'orders', label: 'Orders', icon: 'sales' },
        { key: 'pricing', label: 'Pricing', icon: 'sales' },
        { key: 'shipping', label: 'Shipping', icon: 'sales' },
        { key: 'billing', label: 'Billing', icon: 'sales' },
        { key: 'analytics', label: 'Analytics', icon: 'sales' }
    ],
    services: {
        'customers': [
            { key: 'hierarchies', label: 'Hierarchies', icon: 'sales', endpoint: '/60/CustHier', model: 'CustomerHierarchy', idField: 'hierarchyId' },
            { key: 'segments', label: 'Segments', icon: 'sales', endpoint: '/60/CustSegmt', model: 'CustomerSegment', idField: 'segmentId' },
            { key: 'contracts', label: 'Contracts', icon: 'sales', endpoint: '/60/CustContr', model: 'CustomerContract', idField: 'contractId' },
            { key: 'partners', label: 'Partners', icon: 'sales', endpoint: '/60/Partner', model: 'PartnerChannel', idField: 'partnerId' }
        ],
        'orders': [
            { key: 'quotations', label: 'Quotations', icon: 'sales', endpoint: '/60/SalesQuote', model: 'SalesQuotation', idField: 'quotationId' },
            { key: 'sales-orders', label: 'Sales Orders', icon: 'sales', endpoint: '/60/SalesOrder', model: 'SalesOrder', idField: 'salesOrderId' },
            { key: 'allocations', label: 'Allocations', icon: 'sales', endpoint: '/60/OrderAlloc', model: 'OrderAllocation', idField: 'allocationId' },
            { key: 'back-orders', label: 'Back Orders', icon: 'sales', endpoint: '/60/BackOrder', model: 'BackOrder', idField: 'backOrderId' },
            { key: 'returns', label: 'Returns', icon: 'sales', endpoint: '/60/ReturnOrd', model: 'ReturnOrder', idField: 'returnOrderId' }
        ],
        'pricing': [
            { key: 'price-lists', label: 'Price Lists', icon: 'sales', endpoint: '/60/PriceList', model: 'PriceList', idField: 'priceListId' },
            { key: 'customer-prices', label: 'Customer Prices', icon: 'sales', endpoint: '/60/CustPrice', model: 'CustomerPrice', idField: 'customerPriceId' },
            { key: 'discounts', label: 'Discounts', icon: 'sales', endpoint: '/60/DiscntRule', model: 'DiscountRule', idField: 'ruleId' },
            { key: 'promotions', label: 'Promotions', icon: 'sales', endpoint: '/60/PromoPrice', model: 'PromotionalPrice', idField: 'promoId' },
            { key: 'qty-breaks', label: 'Qty Breaks', icon: 'sales', endpoint: '/60/QtyBreak', model: 'QuantityBreak', idField: 'breakId' }
        ],
        'shipping': [
            { key: 'deliveries', label: 'Deliveries', icon: 'sales', endpoint: '/60/DlvryOrder', model: 'DeliveryOrder', idField: 'deliveryOrderId' },
            { key: 'pick-releases', label: 'Pick Releases', icon: 'sales', endpoint: '/60/PickRlease', model: 'PickRelease', idField: 'pickReleaseId' },
            { key: 'packing', label: 'Packing Slips', icon: 'sales', endpoint: '/60/PackSlip', model: 'PackingSlip', idField: 'packingSlipId' },
            { key: 'ship-docs', label: 'Ship Docs', icon: 'sales', endpoint: '/60/ShipDoc', model: 'ShippingDoc', idField: 'docId' },
            { key: 'confirmations', label: 'Confirmations', icon: 'sales', endpoint: '/60/DlvryConf', model: 'DeliveryConfirm', idField: 'confirmId' }
        ],
        'billing': [
            { key: 'schedules', label: 'Billing Schedules', icon: 'sales', endpoint: '/60/BillSched', model: 'BillingSchedule', idField: 'scheduleId' },
            { key: 'milestones', label: 'Milestones', icon: 'sales', endpoint: '/60/BillMilstn', model: 'BillingMilestone', idField: 'milestoneId' },
            { key: 'revenue', label: 'Revenue Recog', icon: 'sales', endpoint: '/60/RevSched', model: 'RevenueSchedule', idField: 'scheduleId' }
        ],
        'analytics': [
            { key: 'targets', label: 'Sales Targets', icon: 'sales', endpoint: '/60/SalesTrgt', model: 'SalesTarget', idField: 'targetId' },
            { key: 'territories', label: 'Territories', icon: 'sales', endpoint: '/60/Territory', model: 'SalesTerritory', idField: 'territoryId' },
            { key: 'commissions', label: 'Commissions', icon: 'sales', endpoint: '/60/CommPlan', model: 'CommissionPlan', idField: 'planId' },
            { key: 'forecasts', label: 'Forecasts', icon: 'sales', endpoint: '/60/SalesFcast', model: 'SalesForecast', idField: 'forecastId' }
        ]
    }
}
```

### 5f. Mobile Nav.js Registry

In `l8ui/m/js/layer8m-nav.js`, add `window.MobileSales` to the registry arrays in `_getServiceColumns`, `_getServiceFormDef`, and `_getServiceTransformData`.

### 5g. Mobile app.html

Add script tags before nav config:
```html
<script src="js/sales/customers-enums.js"></script>
<script src="js/sales/customers-columns.js"></script>
<script src="js/sales/customers-forms.js"></script>
<!-- repeat for orders, pricing, shipping, billing, analytics -->
<script src="js/sales/sales-index.js"></script>
```

Add sidebar link:
```html
<a href="#dashboard" class="sidebar-item" data-section="dashboard" data-module="sales">
    <span class="sidebar-item-icon"><svg>...</svg></span>
    Sales
</a>
```

### 5h. Mobile Reference Registry

Add Sales models to `l8ui/m/js/layer8m-reference-registry.js`.

---

## Step 6: Mock Data Generation

Follow `plans/global-rules-all.md` Section 3 (Mock Data Generation).

**Phase ordering:**

| Phase | Models | Dependencies |
|-------|--------|-------------|
| 1 | CustomerSegment, SalesTerritory | None |
| 2 | CustomerHierarchy, PartnerChannel, PriceList, CommissionPlan | Phase 1 |
| 3 | CustomerContract, PriceListEntry, QuantityBreak, CustomerPrice, DiscountRule, PromotionalPrice | Phase 2 + FIN Customer |
| 4 | SalesTarget, TerritoryAssign, SalesForecast | Phase 2 + HCM Employee |
| 5 | SalesQuotation, QuotationLine | Phase 3 + FIN Customer + SCM Item |
| 6 | SalesOrder, SalesOrderLine, OrderAllocation, BackOrder | Phase 5 |
| 7 | DeliveryOrder, DeliveryLine, PickRelease | Phase 6 + SCM Warehouse |
| 8 | PackingSlip, ShippingDoc, DeliveryConfirm | Phase 7 |
| 9 | ReturnOrder, ReturnOrderLine | Phase 6 |
| 10 | BillingSchedule, BillingMilestone, RevenueSchedule, CommissionCalc | Phase 6 |

**Files to create:**

| File | Contents |
|------|----------|
| `gen_sales_foundation.go` | Phases 1-2: Segments, territories, price lists, commission plans |
| `gen_sales_pricing.go` | Phase 3: Price entries, customer prices, discounts, promotions |
| `gen_sales_orders.go` | Phases 5-6: Quotations, sales orders, allocations, back orders |
| `gen_sales_shipping.go` | Phases 7-8: Deliveries, pick releases, packing, shipping docs |
| `gen_sales_analytics.go` | Phase 4: Targets, territory assignments, forecasts |
| `gen_sales_billing.go` | Phases 9-10: Returns, billing schedules, revenue, commissions |
| `sales_phases.go` | Phase orchestration |

---

## Step 7: Verify Build

1. Run `cd proto/ && bash make-bindings.sh`
2. Run `go build ./...` from project root
3. Run `go vet ./...`
4. Verify UI loads in browser with Sales section showing module tabs
5. Verify mobile card navigation shows Sales with all submodules

---

## Implementation Order

1. **Proto files** - `sales-common.proto` first, then all submodule protos
2. **Generate types** - Run `make-bindings.sh`
3. **Pricing services** - Foundation (PriceList, PriceListEntry, CustomerPrice, DiscountRule, PromotionalPrice, QuantityBreak)
4. **Customer services** - CustomerHierarchy, CustomerSegment, CustomerContract, PartnerChannel (references FIN Customer)
5. **Sales Order services** - SalesQuotation -> SalesOrder -> SalesOrderLine chain (references FIN Customer, SCM Item)
6. **Shipping services** - DeliveryOrder -> PickRelease -> PackingSlip chain (references SCM Warehouse)
7. **Billing services** - BillingSchedule, BillingMilestone, RevenueSchedule (references SalesOrder)
8. **Analytics services** - SalesTarget, SalesTerritory, CommissionPlan, SalesForecast (references HCM Employee)
9. **Return services** - ReturnOrder, ReturnOrderLine (references SalesOrder)
10. **sales_main.go** - Wire everything together
11. **Desktop UI** - Config, enums, columns, forms per submodule, section HTML, init
12. **Mobile UI** - Enums, columns, forms, registry, nav config
13. **Mock data** - Generator and phase files
14. **Verify** - Build, vet, browser test

---

## Files to Modify

| File | Change |
|------|--------|
| `proto/make-bindings.sh` | Add `sales-*.proto` docker runs |
| `l8ui/shared/layer8d-reference-registry.js` | Add Sales model reference configs |
| `l8ui/m/js/layer8m-reference-registry.js` | Add Sales model reference configs |
| `l8ui/m/js/layer8m-nav-config.js` | Enable `sales` module + add config block |
| `l8ui/m/js/layer8m-nav.js` | Add `MobileSales` to registry lookups |
| `go/erp/ui/web/js/sections.js` | Add `sales` section mapping + initializer |
| `go/erp/ui/web/app.html` | Add Sales CSS + script tags |
| `m/app.html` | Add Sales script tags + sidebar link |

## Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Sales proto files | 8 | `proto/sales-*.proto` |
| Generated Go types | 8 | `go/types/sales/*.pb.go` (auto) |
| Service files | 66 (33x2) | `go/erp/sales/<service>/{Service,Callback}.go` |
| Main entry | 1 | `go/erp/sales/sales_main.go` |
| Desktop UI config | 2 | `l8ui/sales/sales-{config,init}.js` |
| Desktop UI CSS | 1 | `l8ui/sales/sales.css` |
| Desktop submodule files | 24 | `l8ui/sales/<sub>/{enums,columns,forms,entry}.js` |
| Desktop section HTML | 1 | `sections/sales.html` |
| Desktop reference registry | 1 | `reference-registry-sales.js` |
| Mobile submodule files | 18 | `m/js/sales/{enums,columns,forms}.js` per sub |
| Mobile registry | 1 | `m/js/sales/sales-index.js` |
| Mock data generators | 7 | `go/tests/mocks/gen_sales_*.go` + `sales_phases.go` |
| **Total** | ~138 files | |

---

## Cross-Module Integration Points

| Sales Entity | References | Source Module | Integration Pattern |
|-------------|-----------|--------------|-------------------|
| SalesOrder | Customer | FIN (AR) | Cross-module reference for order customer |
| SalesOrder | Employee | HCM (Core HR) | Cross-module reference for salesperson |
| SalesOrderLine | Item | SCM (Inventory) | Cross-module reference for order items |
| DeliveryOrder | Warehouse | SCM (Warehouse) | Cross-module reference for ship-from |
| DeliveryOrder | SalesOrder | Sales (Orders) | Intra-module reference |
| ReturnOrder | SalesOrder | Sales (Orders) | Intra-module reference for original order |
| BillingSchedule | SalesOrder | Sales (Orders) | Intra-module reference |
| BillingSchedule | SalesInvoice | FIN (AR) | Cross-module reference for generated invoice |
| CommissionCalc | Employee | HCM (Core HR) | Cross-module reference for commission recipient |
| TerritoryAssign | Employee | HCM (Core HR) | Cross-module reference for salesperson |
| CustomerContract | Customer | FIN (AR) | Cross-module reference for contract customer |
| PriceListEntry | Item | SCM (Inventory) | Cross-module reference for priced item |
| CustomerPrice | Customer | FIN (AR) | Cross-module reference |

---

## Prime Objects Summary (33 total)

| # | Submodule | Prime Object | ServiceName | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | Customer | CustomerHierarchy | CustHier | HierarchyId |
| 2 | Customer | CustomerSegment | CustSegmt | SegmentId |
| 3 | Customer | CustomerContract | CustContr | ContractId |
| 4 | Customer | PartnerChannel | Partner | PartnerId |
| 5 | Orders | SalesQuotation | SalesQuote | QuotationId |
| 6 | Orders | QuotationLine | QuoteLine | LineId |
| 7 | Orders | SalesOrder | SalesOrder | SalesOrderId |
| 8 | Orders | SalesOrderLine | OrderLine | LineId |
| 9 | Orders | OrderAllocation | OrderAlloc | AllocationId |
| 10 | Orders | BackOrder | BackOrder | BackOrderId |
| 11 | Orders | ReturnOrder | ReturnOrd | ReturnOrderId |
| 12 | Orders | ReturnOrderLine | ReturnLine | LineId |
| 13 | Pricing | PriceList | PriceList | PriceListId |
| 14 | Pricing | PriceListEntry | PriceEntry | EntryId |
| 15 | Pricing | CustomerPrice | CustPrice | CustomerPriceId |
| 16 | Pricing | DiscountRule | DiscntRule | RuleId |
| 17 | Pricing | PromotionalPrice | PromoPrice | PromoId |
| 18 | Pricing | QuantityBreak | QtyBreak | BreakId |
| 19 | Shipping | DeliveryOrder | DlvryOrder | DeliveryOrderId |
| 20 | Shipping | DeliveryLine | DlvryLine | LineId |
| 21 | Shipping | PickRelease | PickRlease | PickReleaseId |
| 22 | Shipping | PackingSlip | PackSlip | PackingSlipId |
| 23 | Shipping | ShippingDoc | ShipDoc | DocId |
| 24 | Shipping | DeliveryConfirm | DlvryConf | ConfirmId |
| 25 | Billing | BillingSchedule | BillSched | ScheduleId |
| 26 | Billing | BillingMilestone | BillMilstn | MilestoneId |
| 27 | Billing | RevenueSchedule | RevSched | ScheduleId |
| 28 | Analytics | SalesTarget | SalesTrgt | TargetId |
| 29 | Analytics | SalesTerritory | Territory | TerritoryId |
| 30 | Analytics | TerritoryAssign | TerrAssign | AssignmentId |
| 31 | Analytics | CommissionPlan | CommPlan | PlanId |
| 32 | Analytics | CommissionCalc | CommCalc | CalcId |
| 33 | Analytics | SalesForecast | SalesFcast | ForecastId |

**ServiceArea for ALL services: `byte(60)`**

**All ServiceName values are <= 10 characters.**
