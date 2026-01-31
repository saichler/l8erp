# Financial Management Module - Implementation Plan

## Overview

Implement the Financial Management module following the exact same patterns as HCM. This covers 49 Prime Objects across 7 submodules: General Ledger, Accounts Payable, Accounts Receivable, Cash Management, Fixed Assets, Budgeting & Planning, and Tax Management.

Reference documents: `PLAN-FIN-SERVICES.md`, `PLAN-FIN-UI.md`, `proto/FIN_DEPENDENCY_MAP.md`

### Global Rules Compliance

This plan has been cross-referenced against `.claude/rules/maintainability.md`:

| Rule | How This Plan Complies |
|------|----------------------|
| **File Size < 500 lines** | Service files ~80 lines, callbacks ~240 lines. UI split per submodule (columns, forms, enums, detail views). All files stay well under 500 lines. |
| **No Duplicate Code** | Step 0 extracts shared types (Money, AuditInfo, Address, ContactInfo) into `erp-common.proto` to avoid duplication between HCM and FIN. Reuse `go/erp/common/` validation utilities. |
| **Future-Proof Design** | Vendor and Customer are defined as FIN Prime Objects but designed as shared ERP entities. SCM (Procurement) and Sales modules will reference them via cross-module dependencies rather than redefining them. `erp-common.proto` shared types are reusable by all future modules. |
| **Read Before Implementing** | Plan requires reading ALL HCM code (services, callbacks, protos, UI) before writing any FIN code. |
| **Component Integration Analysis** | All ServiceArea assignments, endpoint construction, L8Query support, and initialization arguments are documented. |
| **Demo Directory** | All UI work targets `go/erp/ui/web/`, never `go/demo/`. |
| **Single Responsibility** | One service per package (2 files each). UI split into columns/forms/enums per submodule. |

---

## Step 0: Extract Shared ERP Types (Pre-requisite)

**Why:** The global rules require "No Duplicate Code" and "Future-Proof Design". Types like Money, AuditInfo, Address, and ContactInfo exist in `hcm-common.proto` and would be duplicated in `fin-common.proto`. Future modules (SCM, Sales, CRM) will also need them.

**Action:** Create a shared `erp-common.proto` and refactor both HCM and FIN to import from it.

### 0a. Create `proto/erp-common.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "./types/erp";

// Shared types used across all ERP modules

message Money {
  int64 amount = 1;
  string currency_code = 2;
}

message AuditInfo {
  int64 created_at = 1;
  string created_by = 2;
  int64 modified_at = 3;
  string modified_by = 4;
}

message Address {
  string address_id = 1;
  AddressType address_type = 2;
  string line1 = 3;
  string line2 = 4;
  string city = 5;
  string state_province = 6;
  string postal_code = 7;
  string country_code = 8;
  bool is_primary = 9;
}

enum AddressType {
  ADDRESS_TYPE_UNSPECIFIED = 0;
  ADDRESS_TYPE_HOME = 1;
  ADDRESS_TYPE_WORK = 2;
  ADDRESS_TYPE_MAILING = 3;
  ADDRESS_TYPE_BILLING = 4;
}

message ContactInfo {
  string contact_id = 1;
  ContactType contact_type = 2;
  string value = 3;
  bool is_primary = 4;
  bool is_verified = 5;
}

enum ContactType {
  CONTACT_TYPE_UNSPECIFIED = 0;
  CONTACT_TYPE_PHONE_MOBILE = 1;
  CONTACT_TYPE_PHONE_HOME = 2;
  CONTACT_TYPE_PHONE_WORK = 3;
  CONTACT_TYPE_EMAIL_PERSONAL = 4;
  CONTACT_TYPE_EMAIL_WORK = 5;
  CONTACT_TYPE_FAX = 6;
}

message DateRange {
  int64 start_date = 1;
  int64 end_date = 2;
}
```

### 0b. Refactor `hcm-common.proto`

Remove Money, AuditInfo, Address, AddressType, ContactInfo, ContactType, DateRange from `hcm-common.proto` and replace with:

```protobuf
import "erp-common.proto";
```

Keep HCM-specific types (EmergencyContact, Gender, MaritalStatus, EmploymentType, PayFrequency, EligibilityRules, VerificationStatus) in `hcm-common.proto`. Update references from `AuditInfo` to `erp.AuditInfo`, `Money` to `erp.Money`, etc. throughout all `hcm-*.proto` files.

### 0c. Update `make-bindings.sh`

Add `erp-common.proto` as the first docker run entry (before HCM and FIN).

### 0d. Regenerate HCM types and verify build

Run `make-bindings.sh` and `go build ./...` to ensure HCM still compiles after the refactor.

### Future-Proof Note: Vendor and Customer

Vendor and Customer are defined as FIN Prime Objects but will also be referenced by future modules:
- **SCM** will reference Vendor for procurement
- **Sales** will reference Customer for order management
- **CRM** will reference Customer for relationship management

These entities live in the FIN module as their system-of-record, and other modules will reference them via cross-module service calls (same pattern as HCM's Department being referenced by FIN's Budget and AssetTransfer).

---

## Step 1: Create Proto Files (prefix: `fin-`)

Create 8 proto files under `proto/`:

| File | Contents |
|------|----------|
| `fin-common.proto` | FIN-specific shared types and enums (AccountType, InvoiceStatus, PaymentStatus, etc.). Imports `erp-common.proto` for Money, AuditInfo, Address, ContactInfo. |
| `fin-general_ledger.proto` | 8 Prime Objects: Account, JournalEntry, JournalEntryLine, FiscalYear, FiscalPeriod, Currency, ExchangeRate, AccountBalance |
| `fin-accounts_payable.proto` | 8 Prime Objects: Vendor, VendorContact, PurchaseInvoice, PurchaseInvoiceLine, PaymentSchedule, VendorPayment, PaymentAllocation, VendorStatement |
| `fin-accounts_receivable.proto` | 8 Prime Objects: Customer, CustomerContact, SalesInvoice, SalesInvoiceLine, CustomerPayment, PaymentApplication, CreditMemo, DunningLetter |
| `fin-cash_management.proto` | 6 Prime Objects: BankAccount, BankTransaction, BankReconciliation, CashForecast, FundTransfer, PettyCash |
| `fin-fixed_assets.proto` | 7 Prime Objects: Asset, AssetCategory, DepreciationSchedule, AssetDisposal, AssetTransfer, AssetMaintenance, AssetRevaluation |
| `fin-budgeting.proto` | 6 Prime Objects: Budget, BudgetLine, BudgetTransfer, BudgetScenario, CapitalExpenditure, Forecast |
| `fin-tax.proto` | 6 Prime Objects: TaxCode, TaxJurisdiction, TaxRule, TaxReturn, TaxExemption, WithholdingTaxConfig |

### Proto Pattern

Follow the exact pattern from `proto/hcm-core_hr.proto`:

```protobuf
/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
syntax = "proto3";

package fin;

option go_package = "./types/fin";

import "fin-common.proto";
import "api.proto";

// ============================================================================
// GENERAL LEDGER MESSAGES
// ============================================================================

// @PrimeObject
// Account represents a GL account in the chart of accounts
message Account {
  string account_id = 1;
  string account_number = 2;
  string name = 3;
  // ... fields
  AuditInfo audit_info = N;
}

message AccountList {
  repeated Account list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### Key Rules

- Every Prime Object gets `// @PrimeObject` comment annotation above it
- **Every Prime Object MUST have a companion `<Name>List` message** (49 Prime Objects = 98 messages total):
  ```protobuf
  message AccountList {
    repeated Account list = 1;
    l8api.L8MetaData metadata = 2;
  }
  ```
  The service layer requires both `fin.<Name>{}` and `fin.<Name>List{}` for `sla.SetServiceItem()` and `sla.SetServiceItemList()`
- All use `package fin` and `option go_package = "./types/fin"`
- Import `fin-common.proto` and `api.proto`
- Enums start with `_UNSPECIFIED = 0`
- Include `AuditInfo audit_info` as the last field on every Prime Object
- Use `map<string, string> custom_fields` for extensibility where appropriate
- License header on every file

### Shared Types Strategy

`fin-common.proto` imports `erp-common.proto` for shared types (Money, AuditInfo, Address, ContactInfo, DateRange) and defines only FIN-specific types and enums. This avoids code duplication per the global rules and ensures future modules (SCM, Sales, CRM) can reuse the same shared types.

---

## Step 2: Generate Go Types via `make-bindings.sh`

Update `proto/make-bindings.sh` to include the new `fin-*.proto` files. The existing script uses a Docker container (`saichler/protoc:latest`) to generate Go bindings.

Add these lines after the existing HCM docker runs (note: `erp-common.proto` is added in Step 0):

```bash
# Financial Management
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-common.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-general_ledger.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-accounts_payable.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-accounts_receivable.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-cash_management.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-fixed_assets.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-budgeting.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
docker run --user "$(id -u):$(id -g)" -e PROTO=fin-tax.proto --mount type=bind,source="$PWD",target=/home/proto/ -it saichler/protoc:latest
```

The script moves generated output to `../go/types/` and runs `sed` to fix import paths. Since the fin protos use `option go_package = "./types/fin"`, the generated files will land in `go/types/fin/`.

**File to modify:** `proto/make-bindings.sh`

Run after creating all proto files:
```bash
cd proto/ && bash make-bindings.sh
```

---

## Step 3: Create Go Services (49 services)

Create directory `go/erp/fin/` with 49 service packages. Each package has exactly 2 files:

### 3a. `<ServiceName>Service.go`

Pattern from `go/erp/hcm/employees/EmployeeService.go`:

```go
// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.

package accounts

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/fin"        // <-- fin, not hcm
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "Account"
    ServiceArea = byte(100)   // <-- FIN uses 100+ range
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil { panic(err) }
    db := common.OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true,
        newAccountServiceCallback())
    sla.SetServiceItem(&fin.Account{})
    sla.SetServiceItemList(&fin.AccountList{})
    sla.SetPrimaryKeys("AccountId")
    sla.SetArgs(p)
    sla.SetTransactional(true)
    sla.SetReplication(true)
    sla.SetReplicationCount(3)

    ws := web.New(ServiceName, ServiceArea, 0)
    ws.AddEndpoint(&fin.Account{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&fin.AccountList{}, ifs.POST, &l8web.L8Empty{})
    ws.AddEndpoint(&fin.Account{}, ifs.PUT, &l8web.L8Empty{})
    ws.AddEndpoint(&fin.Account{}, ifs.PATCH, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
    ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &fin.AccountList{})
    sla.SetWebService(ws)

    vnic.Resources().Services().Activate(sla, vnic)
}

func Accounts(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
    return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func Account(accountId string, vnic ifs.IVNic) (*fin.Account, error) {
    this, ok := Accounts(vnic)
    if !ok {
        return nil, errors.New("No Account Service Found")
    }
    filter := &fin.Account{AccountId: accountId}
    resp := this.Get(object.New(nil, filter), vnic)
    if resp.Error() != nil {
        return nil, resp.Error()
    }
    return resp.Element().(*fin.Account), nil
}
```

### 3b. `<ServiceName>ServiceCallback.go`

Pattern from HCM callbacks:

```go
package accounts

import (
    "errors"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/fin"
    "github.com/saichler/l8types/go/ifs"
)

type AccountServiceCallback struct{}

func newAccountServiceCallback() *AccountServiceCallback {
    return &AccountServiceCallback{}
}

func (this *AccountServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    account, ok := any.(*fin.Account)
    if !ok {
        return nil, false, errors.New("invalid account type")
    }
    err := validate(account, vnic)
    if err != nil {
        return nil, false, err
    }
    return nil, true, nil
}

func (this *AccountServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
    return nil, true, nil
}

func validate(account *fin.Account, vnic ifs.IVNic) error {
    if err := common.ValidateRequired(account.AccountId, "AccountId"); err != nil {
        return err
    }
    if err := common.ValidateRequired(account.Name, "Name"); err != nil {
        return err
    }
    // ... additional validations
    return nil
}
```

### Service Directory Listing (49 packages)

**General Ledger (ServiceArea 100-107):**
`accounts/`, `journalentries/`, `journalentrylines/`, `fiscalyears/`, `fiscalperiods/`, `currencies/`, `exchangerates/`, `accountbalances/`

**Accounts Payable (ServiceArea 110-117):**
`vendors/`, `vendorcontacts/`, `purchaseinvoices/`, `purchaseinvoicelines/`, `paymentschedules/`, `vendorpayments/`, `paymentallocations/`, `vendorstatements/`

**Accounts Receivable (ServiceArea 120-127):**
`customers/`, `customercontacts/`, `salesinvoices/`, `salesinvoicelines/`, `customerpayments/`, `paymentapplications/`, `creditmemos/`, `dunningletters/`

**Cash Management (ServiceArea 130-135):**
`bankaccounts/`, `banktransactions/`, `bankreconciliations/`, `cashforecasts/`, `fundtransfers/`, `pettycash/`

**Fixed Assets (ServiceArea 140-146):**
`assets/`, `assetcategories/`, `depreciationschedules/`, `assetdisposals/`, `assettransfers/`, `assetmaintenance/`, `assetrevaluations/`

**Budgeting (ServiceArea 150-155):**
`budgets/`, `budgetlines/`, `budgettransfers/`, `budgetscenarios/`, `capitalexpenditures/`, `forecasts/`

**Tax (ServiceArea 160-165):**
`taxcodes/`, `taxjurisdictions/`, `taxrules/`, `taxreturns/`, `taxexemptions/`, `withholdingtaxconfigs/`

---

## Step 4: Create `fin_main.go`

Create `go/erp/fin/fin_main.go` following `go/erp/hcm/hcm_main.go`:

```go
package main

import (
    "fmt"
    "github.com/saichler/l8bus/go/overlay/vnic"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8types/go/ifs"
    "os/exec"
    "time"

    // General Ledger
    "github.com/saichler/l8erp/go/erp/fin/accounts"
    "github.com/saichler/l8erp/go/erp/fin/journalentries"
    "github.com/saichler/l8erp/go/erp/fin/journalentrylines"
    "github.com/saichler/l8erp/go/erp/fin/fiscalyears"
    "github.com/saichler/l8erp/go/erp/fin/fiscalperiods"
    "github.com/saichler/l8erp/go/erp/fin/currencies"
    "github.com/saichler/l8erp/go/erp/fin/exchangerates"
    "github.com/saichler/l8erp/go/erp/fin/accountbalances"

    // Accounts Payable
    "github.com/saichler/l8erp/go/erp/fin/vendors"
    "github.com/saichler/l8erp/go/erp/fin/vendorcontacts"
    "github.com/saichler/l8erp/go/erp/fin/purchaseinvoices"
    "github.com/saichler/l8erp/go/erp/fin/purchaseinvoicelines"
    "github.com/saichler/l8erp/go/erp/fin/paymentschedules"
    "github.com/saichler/l8erp/go/erp/fin/vendorpayments"
    "github.com/saichler/l8erp/go/erp/fin/paymentallocations"
    "github.com/saichler/l8erp/go/erp/fin/vendorstatements"

    // Accounts Receivable
    "github.com/saichler/l8erp/go/erp/fin/customers"
    "github.com/saichler/l8erp/go/erp/fin/customercontacts"
    "github.com/saichler/l8erp/go/erp/fin/salesinvoices"
    "github.com/saichler/l8erp/go/erp/fin/salesinvoicelines"
    "github.com/saichler/l8erp/go/erp/fin/customerpayments"
    "github.com/saichler/l8erp/go/erp/fin/paymentapplications"
    "github.com/saichler/l8erp/go/erp/fin/creditmemos"
    "github.com/saichler/l8erp/go/erp/fin/dunningletters"

    // Cash Management
    "github.com/saichler/l8erp/go/erp/fin/bankaccounts"
    "github.com/saichler/l8erp/go/erp/fin/banktransactions"
    "github.com/saichler/l8erp/go/erp/fin/bankreconciliations"
    "github.com/saichler/l8erp/go/erp/fin/cashforecasts"
    "github.com/saichler/l8erp/go/erp/fin/fundtransfers"
    "github.com/saichler/l8erp/go/erp/fin/pettycash"

    // Fixed Assets
    "github.com/saichler/l8erp/go/erp/fin/assets"
    "github.com/saichler/l8erp/go/erp/fin/assetcategories"
    "github.com/saichler/l8erp/go/erp/fin/depreciationschedules"
    "github.com/saichler/l8erp/go/erp/fin/assetdisposals"
    "github.com/saichler/l8erp/go/erp/fin/assettransfers"
    "github.com/saichler/l8erp/go/erp/fin/assetmaintenance"
    "github.com/saichler/l8erp/go/erp/fin/assetrevaluations"

    // Budgeting and Planning
    "github.com/saichler/l8erp/go/erp/fin/budgets"
    "github.com/saichler/l8erp/go/erp/fin/budgetlines"
    "github.com/saichler/l8erp/go/erp/fin/budgettransfers"
    "github.com/saichler/l8erp/go/erp/fin/budgetscenarios"
    "github.com/saichler/l8erp/go/erp/fin/capitalexpenditures"
    "github.com/saichler/l8erp/go/erp/fin/forecasts"

    // Tax Management
    "github.com/saichler/l8erp/go/erp/fin/taxcodes"
    "github.com/saichler/l8erp/go/erp/fin/taxjurisdictions"
    "github.com/saichler/l8erp/go/erp/fin/taxrules"
    "github.com/saichler/l8erp/go/erp/fin/taxreturns"
    "github.com/saichler/l8erp/go/erp/fin/taxexemptions"
    "github.com/saichler/l8erp/go/erp/fin/withholdingtaxconfigs"
)

func main() {
    res := common.CreateResources("fin")
    ifs.SetNetworkMode(ifs.NETWORK_K8s)
    nic := vnic.NewVirtualNetworkInterface(res, nil)
    nic.Start()
    nic.WaitForConnection()
    startDb(nic)
    activateServices(nic)
    common.WaitForSignal(res)
}

func activateServices(nic ifs.IVNic) {
    // General Ledger
    accounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    journalentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
    journalentrylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    fiscalyears.Activate(common.DB_CREDS, common.DB_NAME, nic)
    fiscalperiods.Activate(common.DB_CREDS, common.DB_NAME, nic)
    currencies.Activate(common.DB_CREDS, common.DB_NAME, nic)
    exchangerates.Activate(common.DB_CREDS, common.DB_NAME, nic)
    accountbalances.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Accounts Payable
    vendors.Activate(common.DB_CREDS, common.DB_NAME, nic)
    vendorcontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    purchaseinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
    purchaseinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    paymentschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    vendorpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    paymentallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    vendorstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Accounts Receivable
    customers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    customercontacts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesinvoices.Activate(common.DB_CREDS, common.DB_NAME, nic)
    salesinvoicelines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    customerpayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
    paymentapplications.Activate(common.DB_CREDS, common.DB_NAME, nic)
    creditmemos.Activate(common.DB_CREDS, common.DB_NAME, nic)
    dunningletters.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Cash Management
    bankaccounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    banktransactions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    bankreconciliations.Activate(common.DB_CREDS, common.DB_NAME, nic)
    cashforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
    fundtransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    pettycash.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Fixed Assets
    assets.Activate(common.DB_CREDS, common.DB_NAME, nic)
    assetcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
    depreciationschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    assetdisposals.Activate(common.DB_CREDS, common.DB_NAME, nic)
    assettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    assetmaintenance.Activate(common.DB_CREDS, common.DB_NAME, nic)
    assetrevaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Budgeting and Planning
    budgets.Activate(common.DB_CREDS, common.DB_NAME, nic)
    budgetlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
    budgettransfers.Activate(common.DB_CREDS, common.DB_NAME, nic)
    budgetscenarios.Activate(common.DB_CREDS, common.DB_NAME, nic)
    capitalexpenditures.Activate(common.DB_CREDS, common.DB_NAME, nic)
    forecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)

    // Tax Management
    taxcodes.Activate(common.DB_CREDS, common.DB_NAME, nic)
    taxjurisdictions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    taxrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
    taxreturns.Activate(common.DB_CREDS, common.DB_NAME, nic)
    taxexemptions.Activate(common.DB_CREDS, common.DB_NAME, nic)
    withholdingtaxconfigs.Activate(common.DB_CREDS, common.DB_NAME, nic)
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

The FIN module MUST use the same shared component ecosystem as HCM. These components already exist and handle all generic UI behavior:

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

**The FIN module files are thin configuration wrappers, NOT reimplementations.** They:
1. Define module/service configuration (`fin-config.js`)
2. Delegate to `ERPForms` for all form handling (`fin-forms.js` and `fin-crud.js`)
3. Use `L8Table` for all data tables (`fin-service.js`)
4. Use `ERPPopup` for all modals
5. Only provide data definitions (columns, forms, enums) per submodule

### Data Flow (same as HCM)

```
fin-navigation.js → FIN.loadServiceView(moduleKey, serviceKey)
  → fin-service.js → Creates L8Table with columns from submodule
    → L8Table handles paging, sorting, filtering via L8Query
  → User clicks Add/Edit → fin-crud.js → ERPForms.openAddForm/openEditForm
    → ERPForms generates form HTML from submodule form definition
    → ERPPopup.show() displays modal
    → ERPDatePicker, ERPReferencePicker, ERPInputFormatter auto-attach
  → User saves → ERPForms.saveRecord() → PUT/POST to endpoint
    → FIN.refreshCurrentTable() reloads L8Table
```

### Form & Picker Implementation Guidelines

The shared `ERPForms` component (`shared/erp-forms.js`) handles all form generation, field rendering, data collection, and CRUD operations. FIN submodule files only define **data configurations** (form definitions, primary keys). They never implement form rendering or picker logic.

#### Form Definition Structure

Each submodule defines forms as a map of model name to form definition. Pattern from `core-hr-forms.js`:

```javascript
window.GeneralLedger = window.GeneralLedger || {};

GeneralLedger.forms = {
    Account: {
        title: 'Account',                  // Display title for modal header
        sections: [                         // Tabs in the form modal
            {
                title: 'Account Details',   // Tab label
                fields: [                   // Fields displayed in this tab
                    { key: 'accountNumber', label: 'Account #', type: 'text', required: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'accountType', label: 'Type', type: 'select', options: enums.ACCOUNT_TYPE, required: true },
                    { key: 'parentAccountId', label: 'Parent Account', type: 'reference', lookupModel: 'Account' },
                    { key: 'currencyId', label: 'Currency', type: 'reference', lookupModel: 'Currency' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ]
            }
        ]
    },
    // ... more models
};

GeneralLedger.primaryKeys = {
    Account: 'accountId',
    JournalEntry: 'journalEntryId',
    // ...
};
```

#### Supported Field Types

Each field `type` determines how the input is rendered and how its value is collected. **No custom rendering code is needed in FIN files** -- `ERPForms.generateFieldHtml()` handles everything.

| Type | Renders As | Data Collection | Shared Component |
|------|-----------|----------------|-----------------|
| `text` | `<input type="text">` | String value | None (native HTML) |
| `number` | `<input type="number">` | `parseFloat()` | None (native HTML) |
| `date` | Text input with calendar button | `parseDateToTimestamp()` (epoch) | **ERPDatePicker** auto-attaches to `.date-input` elements |
| `textarea` | `<textarea rows="3">` | String value | None (native HTML) |
| `select` | `<select>` dropdown | `parseInt()` (enum integer) | None, uses `options` property (see Enums below) |
| `checkbox` | Checkbox with inline label | Boolean (`element.checked`) | None (native HTML) |
| `reference` | Readonly input with "Click to select..." | ID from `data-ref-id` attribute | **ERPReferencePicker** auto-attaches (see Reference Fields below) |
| `ssn` | Masked text input (###-##-####) | Raw digits via `ERPInputFormatter.getValue()` | **ERPInputFormatter** auto-attaches |
| `ein` | Masked text input (##-#######) | Raw digits | **ERPInputFormatter** |
| `phone` | Masked text input | Raw digits | **ERPInputFormatter** |
| `currency` | Currency-formatted input ($1,234.56) | Integer cents via `parseInt()` | **ERPInputFormatter** |
| `percentage` | Percentage input (12.5%) | Float via `parseFloat()` | **ERPInputFormatter** |
| `email` | Email-validated input | String | **ERPInputFormatter** |
| `url` | URL-validated input | String | **ERPInputFormatter** |
| `hours` | Hours:minutes input | Integer minutes | **ERPInputFormatter** |
| `rating` | Rating input (1-5) | Integer | **ERPInputFormatter** |
| `routingNumber` | Masked routing number | Raw digits | **ERPInputFormatter** |
| `colorCode` | Color hex input | String | **ERPInputFormatter** |

#### How Auto-Attachment Works

When a form modal opens, `ERPForms.attachDatePickers(container)` is called via `ERPPopup`'s `onShow` callback. This single function triggers three attachment chains:

1. **Date fields**: Finds all `input.date-input` elements, calls `ERPDatePicker.attach(input)` for each
2. **Formatted fields**: Calls `ERPInputFormatter.attachAll(container)`, which finds all elements with `data-format` attributes
3. **Reference fields**: Calls `attachReferencePickers(container)`, which finds all `input.reference-input` elements and calls `ERPReferencePicker.attach(input, config)` for each

**No manual attachment code is needed in FIN files.** The form definitions drive everything.

#### Reference Fields (type: `reference`)

Reference fields create a lookup picker. Configuration comes from two sources:

1. **Field definition**: `{ type: 'reference', lookupModel: 'Account' }` -- specifies which model to look up
2. **ERPReferenceRegistry**: Maps model names to lookup config (`idColumn`, `displayColumn`, `selectColumns`, `displayFormat`)

```javascript
// In reference-registry.js (shared):
Account: {
    idColumn: 'accountId',
    displayColumn: 'name',
    selectColumns: ['accountId', 'accountNumber', 'name'],
    displayFormat: function(item) {
        return item.accountNumber + ' - ' + item.name;
    },
    displayLabel: 'Account'
},
```

**Endpoint auto-discovery**: `ERPForms.getEndpointForModel()` searches module configs to find the API endpoint for a model name. Currently it only searches `HCM.modules`. **This function must be updated** to also search `FIN.modules` (and future module namespaces). This is a required change in `shared/erp-forms.js`.

#### Select Fields with Enums (type: `select`)

Enum dropdowns use `options` property pointing to an enum map. Define enums in the submodule's `*-enums.js` file:

```javascript
// general-ledger-enums.js
GeneralLedger.enums = {
    ACCOUNT_TYPE: {
        1: 'Asset',
        2: 'Liability',
        3: 'Equity',
        4: 'Revenue',
        5: 'Expense'
    },
    JOURNAL_STATUS: {
        1: 'Draft',
        2: 'Posted',
        3: 'Reversed'
    },
    PERIOD_STATUS: {
        1: 'Open',
        2: 'Closed',
        3: 'Locked'
    }
};
```

Then reference in form definitions: `{ key: 'accountType', label: 'Type', type: 'select', options: enums.ACCOUNT_TYPE }`

#### Formatted Field Options

Formatted fields support additional properties for customization:

```javascript
// Currency with custom symbol
{ key: 'amount', label: 'Amount', type: 'currency', symbol: '$', decimals: 2 }

// Percentage with range
{ key: 'taxRate', label: 'Tax Rate', type: 'percentage', min: 0, max: 100, decimals: 4 }
```

These map to `data-format-*` attributes that `ERPInputFormatter` reads.

#### FIN-Specific Field Type Patterns

Common financial field patterns the FIN forms will use:

| Pattern | Field Type | Example |
|---------|-----------|---------|
| Monetary amounts | `currency` | Invoice total, payment amount, budget amount |
| Tax/interest rates | `percentage` | Tax rate, interest rate, depreciation rate |
| GL account references | `reference` + `lookupModel: 'Account'` | Debit account, credit account, expense account |
| Vendor/customer lookups | `reference` + `lookupModel: 'Vendor'` or `'Customer'` | Invoice vendor, payment vendor |
| Period references | `reference` + `lookupModel: 'FiscalPeriod'` | Posting period, budget period |
| Invoice/document numbers | `text` + `required: true` | Invoice number, check number |
| Dates (posting, due, etc.) | `date` | Invoice date, due date, payment date |
| Status enums | `select` + `options: enums.X` | Invoice status, payment status |
| Active flags | `checkbox` | Is active, is posted, is reconciled |
| Descriptions/notes | `textarea` | Journal description, vendor notes |

#### Example: Purchase Invoice Form (Accounts Payable)

```javascript
AccountsPayable.forms = {
    PurchaseInvoice: {
        title: 'Purchase Invoice',
        sections: [
            {
                title: 'Invoice Details',
                fields: [
                    { key: 'invoiceNumber', label: 'Invoice #', type: 'text', required: true },
                    { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                    { key: 'invoiceDate', label: 'Invoice Date', type: 'date', required: true },
                    { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                    { key: 'status', label: 'Status', type: 'select', options: enums.INVOICE_STATUS },
                    { key: 'currencyId', label: 'Currency', type: 'reference', lookupModel: 'Currency' },
                    { key: 'totalAmount', label: 'Total Amount', type: 'currency', required: true },
                    { key: 'taxAmount', label: 'Tax Amount', type: 'currency' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'apAccountId', label: 'AP Account', type: 'reference', lookupModel: 'Account' }
                ]
            },
            {
                title: 'Payment Terms',
                fields: [
                    { key: 'paymentTermDays', label: 'Payment Terms (Days)', type: 'number' },
                    { key: 'discountPercent', label: 'Early Pay Discount %', type: 'percentage' },
                    { key: 'discountDays', label: 'Discount Days', type: 'number' },
                    { key: 'isPaid', label: 'Paid', type: 'checkbox' }
                ]
            }
        ]
    }
};
```

#### Required Shared Component Update

**`shared/erp-forms.js` > `getEndpointForModel()`** must be updated to search across all module namespaces, not just `HCM.modules`:

```javascript
function getEndpointForModel(modelName) {
    // Search all registered module namespaces
    const namespaces = ['HCM', 'FIN'];  // Add future modules here
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

This change ensures reference pickers work for FIN models (Account, Vendor, Customer, etc.) and also enables cross-module references (e.g., HCM forms referencing FIN models).

---

### L8Table (Edit Table) Implementation Guidelines

The `L8Table` component (`edit_table/table-*.js`) handles all data tables with server-side paging, sorting, and filtering. FIN submodule column definition files only provide **configuration** -- no table logic is implemented in FIN files.

#### L8Table Constructor Options

```javascript
new L8Table({
    // Required
    containerId: string,         // DOM element ID where table renders
    columns: Array<ColumnDef>,   // Column definitions (see below)

    // Server-side data fetching
    serverSide: true,            // Always true for ERP services
    endpoint: string,            // API endpoint (e.g., '/erp/31/Account')
    modelName: string,           // Model name for L8Query (e.g., 'Account')
    baseWhereClause: string,     // Optional: base WHERE for all queries

    // Primary key
    primaryKey: string,          // Field name used as row identifier

    // Paging
    pageSize: 10,                // Rows per page (default: 10)
    pageSizeOptions: [5, 10, 25, 50],  // Page size dropdown options

    // Sorting & filtering
    sortable: true,              // Enable column header sorting (default: true)
    filterable: true,            // Enable filter row (default: true)
    filterDebounceMs: 1000,      // Debounce delay for server-side filters (ms)

    // Event handlers
    onAdd: function(),           // Add button clicked
    onEdit: function(id),        // Edit action clicked (receives item ID)
    onDelete: function(id),      // Delete action clicked (receives item ID)
    onRowClick: function(item, id),  // Row clicked (receives full item + ID)

    // UI
    showActions: true,           // Show Edit/Delete action column
    addButtonText: string,       // Add button label (e.g., 'Add Account')
    emptyMessage: string,        // Empty state text (default: 'No data found.')

    // Optional hooks
    transformData: function(item),   // Transform each fetched item before display
    onDataLoaded: function(),        // Callback after data loads
});
```

#### Column Definition Object

Each column in the `columns` array:

```javascript
{
    key: string,                   // Required: property path in data item (supports dot notation)
    label: string,                 // Required: column header text

    sortKey: string,               // Optional: field name for sort-by clause (defaults to key)
    filterKey: string,             // Optional: field name for filter clause (defaults to key)
    enumValues: Object,            // Optional: { 'display': code } for filter validation
    render: function(item, index), // Optional: custom HTML render function
    width: string,                 // Optional: CSS width
}
```

**Key rule**: If a column should be sortable, provide `sortKey`. If filterable, provide `filterKey`. If neither is provided, the column uses `key` as default for both. Omit both to disable sort/filter for that column.

#### L8Query Construction (Server-Side Paging/Filtering/Sorting)

L8Table automatically builds L8Query strings sent to the backend:

```
select * from {modelName} where {conditions} limit {pageSize} page {pageIndex} sort-by {sortField} {descending}
```

**Examples of generated queries:**

```sql
-- No filters, first page
select * from Account limit 10 page 0

-- With text filter (wildcard appended automatically)
select * from Account where name=Cash* limit 10 page 0

-- With enum filter (value converted to enum code via enumValues)
select * from Account where accountType=1 limit 10 page 0

-- With sorting
select * from Account limit 10 page 0 sort-by accountNumber

-- With descending sort (toggle by clicking header again)
select * from Account limit 10 page 0 sort-by accountNumber descending

-- With base WHERE clause + user filter
select * from JournalEntryLine where journalEntryId=JE123 and accountId=1001* limit 10 page 0

-- Multiple filters combined with AND
select * from Vendor where name=Acme* and status=1 limit 10 page 0 sort-by name
```

**Filter behavior:**
- **Text columns**: Wildcard `*` appended automatically for prefix matching
- **Enum columns**: Filter input validated against `enumValues` map; invalid values get CSS `invalid` class and are not sent to server
- **Debouncing**: Server-side filter requests are debounced (default 1000ms) to avoid excessive API calls
- **Focus preservation**: Filter input retains focus and cursor position across re-renders

#### Server Communication

```javascript
// Request format
fetch(endpoint + '?body=' + encodeURIComponent(JSON.stringify({ text: query })), {
    method: 'GET',
    headers: getAuthHeaders()
});

// Expected response format
{
    list: [...],                    // Array of items for current page
    metadata: {
        keyCount: {
            counts: {
                Total: number       // Total item count across all pages
            }
        }
    }
}
```

#### Pagination Controls

L8Table renders pagination automatically:
- Page size selector dropdown (5, 10, 25, 50)
- First / Previous / Next / Last navigation buttons
- "Page X of Y" display
- "Showing 1-10 of 100" info text

Methods:
```javascript
table.init();                        // Required: renders table and fetches first page
table.fetchData(page, pageSize);     // Fetch specific page
table.goToPage(pageNumber);          // Navigate to page
table.setBaseWhereClause("...");     // Change base filter (auto-refetches)
```

#### Column Definition Patterns for FIN

Each FIN submodule defines columns in its `*-columns.js` file following the HCM pattern:

```javascript
// general-ledger-columns.js
window.GeneralLedger = window.GeneralLedger || {};

const enums = GeneralLedger.enums;
const { escapeHtml } = ERPUtils;

GeneralLedger.columns = {};

GeneralLedger.columns.Account = [
    { key: 'accountId', label: 'ID', sortKey: 'accountId', filterKey: 'accountId' },
    { key: 'accountNumber', label: 'Account #', sortKey: 'accountNumber', filterKey: 'accountNumber' },
    { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
    {
        key: 'accountType',
        label: 'Type',
        sortKey: 'accountType',
        filterKey: 'accountType',
        enumValues: enums.ACCOUNT_TYPE_VALUES,    // { 'asset': 1, 'liability': 2, ... }
        render: (item) => renderEnum(item.accountType, enums.ACCOUNT_TYPE)
    },
    {
        key: 'normalBalance',
        label: 'Normal Balance',
        sortKey: 'normalBalance',
        filterKey: 'normalBalance',
        enumValues: enums.BALANCE_TYPE_VALUES,
        render: (item) => renderEnum(item.normalBalance, enums.BALANCE_TYPE)
    },
    {
        key: 'isActive',
        label: 'Active',
        sortKey: 'isActive',
        render: (item) => renderBoolean(item.isActive)
    }
];

GeneralLedger.columns.JournalEntry = [
    { key: 'journalEntryId', label: 'ID', sortKey: 'journalEntryId', filterKey: 'journalEntryId' },
    { key: 'entryNumber', label: 'Entry #', sortKey: 'entryNumber', filterKey: 'entryNumber' },
    {
        key: 'entryDate',
        label: 'Date',
        sortKey: 'entryDate',
        render: (item) => renderDate(item.entryDate)
    },
    { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
    {
        key: 'status',
        label: 'Status',
        sortKey: 'status',
        filterKey: 'status',
        enumValues: enums.JOURNAL_STATUS_VALUES,
        render: (item) => renderEnum(item.status, enums.JOURNAL_STATUS)
    },
    {
        key: 'totalAmount',
        label: 'Amount',
        sortKey: 'totalAmount',
        render: (item) => renderMoney(item.totalAmount)
    }
];
```

#### Enum Values for Filtering

Columns with enum types need TWO enum maps -- one for display (`ACCOUNT_TYPE`) and one for filter validation (`ACCOUNT_TYPE_VALUES`):

```javascript
// general-ledger-enums.js
GeneralLedger.enums = {
    // Display map: code → label (used by render functions)
    ACCOUNT_TYPE: {
        1: 'Asset',
        2: 'Liability',
        3: 'Equity',
        4: 'Revenue',
        5: 'Expense'
    },
    // Filter validation map: lowercase label → code (used by enumValues column property)
    ACCOUNT_TYPE_VALUES: {
        'asset': 1,
        'liability': 2,
        'equity': 3,
        'revenue': 4,
        'expense': 5
    },
    // ... repeat pattern for all enums
};
```

The `enumValues` property on a column tells L8Table how to validate and convert filter text to enum codes. When a user types "asset" in the filter row, L8Table looks up `enumValues['asset']` → `1` and sends `accountType=1` in the query.

#### Render Helper Functions

Use shared render utilities from `ERPUtils` and `ERPRenderers`:

| Function | Purpose | Column Type |
|----------|---------|-------------|
| `renderDate(value)` | Formats epoch timestamp to date string | Date columns |
| `renderMoney(value)` | Formats cents to currency display ($1,234.56) | Money/currency columns |
| `renderBoolean(value)` | Green checkmark / red X | Boolean columns |
| `renderEnum(value, enumMap)` | Converts enum code to display label | Enum columns |
| `escapeHtml(text)` | Escapes HTML entities | Text columns with custom render |
| `L8Table.statusTag(bool, trueLabel, falseLabel)` | Color-coded status badge | Status columns |

#### FIN Service Table Initialization Pattern

`fin-service.js` follows the exact same pattern as `hcm-service.js`:

```javascript
FIN._initializeServiceTable = function(moduleKey, service, tableId) {
    const containerId = `${moduleKey}-${service.key}-table-container`;
    const columns = FIN.getServiceColumns(service.model);      // Gets from GeneralLedger.columns, etc.
    const primaryKey = FIN.getServicePrimaryKey(service.model); // Gets from GeneralLedger.primaryKeys, etc.

    const table = new L8Table({
        containerId: containerId,
        endpoint: service.endpoint,        // e.g., '/erp/31/Account'
        modelName: service.model,          // e.g., 'Account'
        serverSide: true,
        columns: columns,
        primaryKey: primaryKey,
        pageSize: 10,
        onAdd: () => FIN._openAddModal(service),
        onEdit: (id) => FIN._openEditModal(service, id),
        onDelete: (id) => FIN._confirmDeleteItem(service, id),
        onRowClick: (item, id) => FIN._showDetailsModal(service, item, id),
        addButtonText: `Add ${service.label.replace(/s$/, '')}`
    });

    table.init();
    FIN._state.serviceTables[tableId] = table;
};
```

**Key points:**
- `table.init()` renders the table and fetches the first page of data automatically
- The table instance is stored in `FIN._state.serviceTables[tableId]` for later refresh
- `onAdd`/`onEdit`/`onDelete` delegate to `fin-crud.js` which delegates to `ERPForms`
- `onRowClick` opens a detail/view modal for the clicked record

#### Primary Key Registration

L8Table has a built-in fallback chain for primary key detection, but for clarity each FIN submodule should register its primary keys:

```javascript
GeneralLedger.primaryKeys = {
    Account: 'accountId',
    JournalEntry: 'journalEntryId',
    JournalEntryLine: 'lineId',
    FiscalYear: 'fiscalYearId',
    FiscalPeriod: 'fiscalPeriodId',
    Currency: 'currencyId',
    ExchangeRate: 'exchangeRateId',
    AccountBalance: 'balanceId'
};
```

**The built-in fallback chain in `table-data.js` must be updated** to include FIN primary key fields (e.g., `accountId`, `vendorId`, `customerId`, `invoiceId`, `bankAccountId`, `assetId`, `budgetId`, `taxCodeId`, etc.). Alternatively, always pass `primaryKey` explicitly in the L8Table constructor.

#### Using `baseWhereClause` for Child Records

For parent-child relationships (e.g., JournalEntry → JournalEntryLines, Invoice → InvoiceLines), use `baseWhereClause` to scope the child table:

```javascript
// When viewing journal entry detail, show only its lines
const linesTable = new L8Table({
    containerId: 'entry-lines-table',
    endpoint: '/erp/31/JrnlLine',
    modelName: 'JournalEntryLine',
    serverSide: true,
    columns: GeneralLedger.columns.JournalEntryLine,
    primaryKey: 'lineId',
    baseWhereClause: `journalEntryId=${currentEntryId}`,
    pageSize: 25
});
linesTable.init();
```

This pattern is used in detail views (`journal-entry-detail.js`, `vendor-detail.js`, `customer-detail.js`, `asset-detail.js`) to show related child records filtered by parent ID.

---

### 5a. Update shared `reference-registry.js`

Add FIN model configurations to `shared/reference-registry.js` so reference pickers work for Account, Vendor, Customer, BankAccount, and other lookup fields:

```javascript
// Financial Management references
Account:    { idColumn: 'accountId', displayColumn: 'name', selectColumns: ['accountId', 'accountNumber', 'name'] },
Vendor:     { idColumn: 'vendorId', displayColumn: 'name', selectColumns: ['vendorId', 'vendorNumber', 'name'] },
Customer:   { idColumn: 'customerId', displayColumn: 'name', selectColumns: ['customerId', 'customerNumber', 'name'] },
BankAccount:{ idColumn: 'bankAccountId', displayColumn: 'accountName', selectColumns: ['bankAccountId', 'accountName', 'bankName'] },
FiscalYear: { idColumn: 'fiscalYearId', displayColumn: 'yearName', selectColumns: ['fiscalYearId', 'yearName'] },
FiscalPeriod:{ idColumn: 'fiscalPeriodId', displayColumn: 'periodName', selectColumns: ['fiscalPeriodId', 'periodName'] },
Currency:   { idColumn: 'currencyId', displayColumn: 'name', selectColumns: ['currencyId', 'code', 'name'] },
TaxCode:    { idColumn: 'taxCodeId', displayColumn: 'name', selectColumns: ['taxCodeId', 'code', 'name'] },
AssetCategory:{ idColumn: 'categoryId', displayColumn: 'name', selectColumns: ['categoryId', 'name'] },
Budget:     { idColumn: 'budgetId', displayColumn: 'budgetName', selectColumns: ['budgetId', 'budgetName'] },
// ... additional models as needed for reference fields
```

### 5b. Replace placeholder `sections/financial.html`

Replace the current placeholder content (currently shows "This module is under development") with full module tabs, subnav, and table containers following the exact pattern of `sections/hcm.html`. Use CSS class prefix `fin-` instead of `hcm-`.

### 5c. Create `go/erp/ui/web/fin/` directory with these files:

**Core module files (thin wrappers over shared components):**
- `fin.js` - Entry point, verifies dependencies loaded (same pattern as `hcm.js`)
- `fin-config.js` - Module/service definitions (`FIN.modules` map with endpoints, same pattern as `hcm-config.js`)
- `fin-navigation.js` - Tab switching, delegates to L8Table and ERPForms (same pattern as `hcm-navigation.js`)
- `fin-service.js` - Creates L8Table instances, gets columns/forms from submodules (same pattern as `hcm-service.js`)
- `fin-crud.js` - Delegates to ERPForms for add/edit/delete modals (same pattern as `hcm-crud.js`)
- `fin-forms.js` - Thin wrapper that delegates to ERPForms (same pattern as `hcm-forms.js`)
- `fin.css` - Finance-specific styles (tab colors, icons)

**Submodule files (configuration only, no UI logic):**

Each submodule provides ONLY data definitions - columns, forms, enums, primary keys:

| Folder | Files |
|--------|-------|
| `general-ledger/` | `general-ledger.js`, `general-ledger-columns.js`, `general-ledger-forms.js`, `general-ledger-enums.js`, `journal-entry-detail.js` |
| `accounts-payable/` | `accounts-payable.js`, `accounts-payable-columns.js`, `accounts-payable-forms.js`, `accounts-payable-enums.js`, `vendor-detail.js` |
| `accounts-receivable/` | `accounts-receivable.js`, `accounts-receivable-columns.js`, `accounts-receivable-forms.js`, `accounts-receivable-enums.js`, `customer-detail.js` |
| `cash/` | `cash.js`, `cash-columns.js`, `cash-forms.js`, `cash-enums.js` |
| `fixed-assets/` | `fixed-assets.js`, `fixed-assets-columns.js`, `fixed-assets-forms.js`, `fixed-assets-enums.js`, `asset-detail.js` |
| `budgeting/` | `budgeting.js`, `budgeting-columns.js`, `budgeting-forms.js`, `budgeting-enums.js` |
| `tax/` | `tax.js`, `tax-columns.js`, `tax-forms.js`, `tax-enums.js` |

**Submodule registration pattern** (same as HCM's `CoreHR`, `Payroll`, etc.):

```javascript
window.GeneralLedger = {
    columns: { Account: [...], JournalEntry: [...], ... },
    forms: { Account: { title: 'Account', sections: [...] }, ... },
    primaryKeys: { Account: 'accountId', JournalEntry: 'journalEntryId', ... },
    detailsConfig: { ... },
    enums: { ... }
};
```

### 5d. Register FIN scripts in `app.html`

Add FIN module script tags to `app.html` after HCM scripts, following the same load order pattern.

---

## Step 6: Verify Build

1. Run `cd proto/ && bash make-bindings.sh` to generate Go types from proto files
2. Run `go build ./...` from the project root to verify compilation
3. Verify the UI loads in the browser with the Financial section showing module tabs

---

## Implementation Order

Given the dependency chain from `FIN_DEPENDENCY_MAP.md`, implement in this order:

0. **Extract shared types** - Create `erp-common.proto`, refactor `hcm-common.proto`, regenerate HCM types, verify HCM build
1. **FIN proto files** - `fin-common.proto` first (imports `erp-common.proto`), then all submodule protos
2. **Generate types** - Run `make-bindings.sh`
3. **GL services** - Foundation for everything (Account, FiscalYear, FiscalPeriod, Currency first)
4. **Tax services** - TaxCode/TaxJurisdiction needed by AP/AR invoice lines
5. **Cash services** - BankAccount needed by AP/AR payments
6. **AP services** - Vendor -> PurchaseInvoice -> VendorPayment chain
7. **AR services** - Customer -> SalesInvoice -> CustomerPayment chain
8. **Fixed Asset services** - References Account, Vendor, Department
9. **Budgeting services** - References Account, FiscalYear, FiscalPeriod
10. **fin_main.go** - Wire everything together
11. **UI** - Build frontend following HCM pattern

---

## Files to Modify

| File | Change |
|------|--------|
| `proto/hcm-common.proto` | Remove shared types (Money, AuditInfo, Address, ContactInfo, DateRange, AddressType, ContactType), import `erp-common.proto` instead |
| `proto/hcm-core_hr.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-payroll.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-benefits.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-time_attendance.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-talent.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-learning.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/hcm-compensation.proto` | Update type references to use `erp.` prefix for shared types |
| `proto/make-bindings.sh` | Add `erp-common.proto` and `fin-*.proto` docker runs |
| `go/erp/ui/web/shared/erp-forms.js` | Update `getEndpointForModel()` to search `FIN.modules` (and future namespaces), not just `HCM.modules` |
| `go/erp/ui/web/edit_table/table-data.js` | Add FIN primary key fields to the fallback chain (`accountId`, `vendorId`, `customerId`, `invoiceId`, `bankAccountId`, `assetId`, `budgetId`, `taxCodeId`, etc.) |
| `go/erp/ui/web/shared/reference-registry.js` | Add FIN model reference configs (Account, Vendor, Customer, etc.) |
| `go/erp/ui/web/sections/financial.html` | Replace placeholder with full module UI |
| `go/erp/ui/web/app.html` | Add FIN module script tags |

## Files to Create

| Category | Count | Location |
|----------|-------|----------|
| Shared ERP proto | 1 | `proto/erp-common.proto` |
| FIN proto files | 8 | `proto/fin-*.proto` |
| Generated Go types (shared) | 1 | `go/types/erp/*.pb.go` (auto-generated) |
| Generated Go types (FIN) | 8 | `go/types/fin/*.pb.go` (auto-generated) |
| Service files | 98 (49x2) | `go/erp/fin/<service>/{Service,Callback}.go` |
| Main entry | 1 | `go/erp/fin/fin_main.go` |
| UI core files | 7 | `go/erp/ui/web/fin/fin-*.{js,css}` |
| UI submodule files | ~35 | `go/erp/ui/web/fin/<submodule>/*.js` |
| **Total** | ~157 files | |

---

## Prime Objects Summary (49 total)

| # | Submodule | Prime Object | ServiceArea | Primary Key |
|---|-----------|-------------|-------------|-------------|
| 1 | GL | Account | 100 | AccountId |
| 2 | GL | JournalEntry | 101 | JournalEntryId |
| 3 | GL | JournalEntryLine | 102 | LineId |
| 4 | GL | FiscalYear | 103 | FiscalYearId |
| 5 | GL | FiscalPeriod | 104 | FiscalPeriodId |
| 6 | GL | Currency | 105 | CurrencyId |
| 7 | GL | ExchangeRate | 106 | ExchangeRateId |
| 8 | GL | AccountBalance | 107 | BalanceId |
| 9 | AP | Vendor | 110 | VendorId |
| 10 | AP | VendorContact | 111 | ContactId |
| 11 | AP | PurchaseInvoice | 112 | InvoiceId |
| 12 | AP | PurchaseInvoiceLine | 113 | LineId |
| 13 | AP | PaymentSchedule | 114 | ScheduleId |
| 14 | AP | VendorPayment | 115 | PaymentId |
| 15 | AP | PaymentAllocation | 116 | AllocationId |
| 16 | AP | VendorStatement | 117 | StatementId |
| 17 | AR | Customer | 120 | CustomerId |
| 18 | AR | CustomerContact | 121 | ContactId |
| 19 | AR | SalesInvoice | 122 | InvoiceId |
| 20 | AR | SalesInvoiceLine | 123 | LineId |
| 21 | AR | CustomerPayment | 124 | PaymentId |
| 22 | AR | PaymentApplication | 125 | ApplicationId |
| 23 | AR | CreditMemo | 126 | CreditMemoId |
| 24 | AR | DunningLetter | 127 | LetterId |
| 25 | Cash | BankAccount | 130 | BankAccountId |
| 26 | Cash | BankTransaction | 131 | TransactionId |
| 27 | Cash | BankReconciliation | 132 | ReconciliationId |
| 28 | Cash | CashForecast | 133 | ForecastId |
| 29 | Cash | FundTransfer | 134 | TransferId |
| 30 | Cash | PettyCash | 135 | PettyCashId |
| 31 | Assets | Asset | 140 | AssetId |
| 32 | Assets | AssetCategory | 141 | CategoryId |
| 33 | Assets | DepreciationSchedule | 142 | ScheduleId |
| 34 | Assets | AssetDisposal | 143 | DisposalId |
| 35 | Assets | AssetTransfer | 144 | TransferId |
| 36 | Assets | AssetMaintenance | 145 | MaintenanceId |
| 37 | Assets | AssetRevaluation | 146 | RevaluationId |
| 38 | Budget | Budget | 150 | BudgetId |
| 39 | Budget | BudgetLine | 151 | LineId |
| 40 | Budget | BudgetTransfer | 152 | TransferId |
| 41 | Budget | BudgetScenario | 153 | ScenarioId |
| 42 | Budget | CapitalExpenditure | 154 | CapexId |
| 43 | Budget | Forecast | 155 | ForecastId |
| 44 | Tax | TaxCode | 160 | TaxCodeId |
| 45 | Tax | TaxJurisdiction | 161 | JurisdictionId |
| 46 | Tax | TaxRule | 162 | RuleId |
| 47 | Tax | TaxReturn | 163 | ReturnId |
| 48 | Tax | TaxExemption | 164 | ExemptionId |
| 49 | Tax | WithholdingTaxConfig | 165 | ConfigId |
