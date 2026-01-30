# Financial Management Services Implementation Plan

## Overview

Create service files for all Financial Management Prime Objects, using the HCM service pattern (`go/erp/hcm/employees/EmployeeService.go`) as the template. Each service will be in its own package directory under `go/erp/fin/`.

## Service Template Pattern

Each service follows this pattern:

```go
package <lowercase_name>

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/fin"
    "github.com/saichler/l8orm/go/orm/persist"
    "github.com/saichler/l8orm/go/orm/plugins/postgres"
    "github.com/saichler/l8srlz/go/serialize/object"
    "github.com/saichler/l8types/go/ifs"
    "github.com/saichler/l8types/go/types/l8api"
    "github.com/saichler/l8types/go/types/l8web"
    "github.com/saichler/l8utils/go/utils/web"
)

const (
    ServiceName = "<ObjectName>"
    ServiceArea = byte(<unique_number>)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    // ... setup code
    sla.SetServiceItem(&fin.<ObjectName>{})
    sla.SetServiceItemList(&fin.<ObjectName>List{})
    sla.SetPrimaryKeys("<primary_key_field>")
    // ... endpoint setup
}

func <PluralName>(vnic ifs.IVNic) (ifs.IServiceHandler, bool) { ... }
func <SingularName>(<key> string, vnic ifs.IVNic) (*fin.<ObjectName>, error) { ... }
```

## Prime Objects by Module (49 services)

### General Ledger Module (8 objects) - ServiceArea: 100-107
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 1 | Account | accounts/ | 100 | AccountId |
| 2 | JournalEntry | journalentries/ | 101 | JournalEntryId |
| 3 | JournalEntryLine | journalentrylines/ | 102 | LineId |
| 4 | FiscalYear | fiscalyears/ | 103 | FiscalYearId |
| 5 | FiscalPeriod | fiscalperiods/ | 104 | FiscalPeriodId |
| 6 | Currency | currencies/ | 105 | CurrencyId |
| 7 | ExchangeRate | exchangerates/ | 106 | ExchangeRateId |
| 8 | AccountBalance | accountbalances/ | 107 | BalanceId |

### Accounts Payable Module (8 objects) - ServiceArea: 110-117
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 9 | Vendor | vendors/ | 110 | VendorId |
| 10 | VendorContact | vendorcontacts/ | 111 | ContactId |
| 11 | PurchaseInvoice | purchaseinvoices/ | 112 | InvoiceId |
| 12 | PurchaseInvoiceLine | purchaseinvoicelines/ | 113 | LineId |
| 13 | PaymentSchedule | paymentschedules/ | 114 | ScheduleId |
| 14 | VendorPayment | vendorpayments/ | 115 | PaymentId |
| 15 | PaymentAllocation | paymentallocations/ | 116 | AllocationId |
| 16 | VendorStatement | vendorstatements/ | 117 | StatementId |

### Accounts Receivable Module (8 objects) - ServiceArea: 120-127
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 17 | Customer | customers/ | 120 | CustomerId |
| 18 | CustomerContact | customercontacts/ | 121 | ContactId |
| 19 | SalesInvoice | salesinvoices/ | 122 | InvoiceId |
| 20 | SalesInvoiceLine | salesinvoicelines/ | 123 | LineId |
| 21 | CustomerPayment | customerpayments/ | 124 | PaymentId |
| 22 | PaymentApplication | paymentapplications/ | 125 | ApplicationId |
| 23 | CreditMemo | creditmemos/ | 126 | CreditMemoId |
| 24 | DunningLetter | dunningletters/ | 127 | LetterId |

### Cash Management Module (6 objects) - ServiceArea: 130-135
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 25 | BankAccount | bankaccounts/ | 130 | BankAccountId |
| 26 | BankTransaction | banktransactions/ | 131 | TransactionId |
| 27 | BankReconciliation | bankreconciliations/ | 132 | ReconciliationId |
| 28 | CashForecast | cashforecasts/ | 133 | ForecastId |
| 29 | FundTransfer | fundtransfers/ | 134 | TransferId |
| 30 | PettyCash | pettycash/ | 135 | PettyCashId |

### Fixed Assets Module (7 objects) - ServiceArea: 140-146
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 31 | Asset | assets/ | 140 | AssetId |
| 32 | AssetCategory | assetcategories/ | 141 | CategoryId |
| 33 | DepreciationSchedule | depreciationschedules/ | 142 | ScheduleId |
| 34 | AssetDisposal | assetdisposals/ | 143 | DisposalId |
| 35 | AssetTransfer | assettransfers/ | 144 | TransferId |
| 36 | AssetMaintenance | assetmaintenance/ | 145 | MaintenanceId |
| 37 | AssetRevaluation | assetrevaluations/ | 146 | RevaluationId |

### Budgeting and Planning Module (6 objects) - ServiceArea: 150-155
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 38 | Budget | budgets/ | 150 | BudgetId |
| 39 | BudgetLine | budgetlines/ | 151 | LineId |
| 40 | BudgetTransfer | budgettransfers/ | 152 | TransferId |
| 41 | BudgetScenario | budgetscenarios/ | 153 | ScenarioId |
| 42 | CapitalExpenditure | capitalexpenditures/ | 154 | CapexId |
| 43 | Forecast | forecasts/ | 155 | ForecastId |

### Tax Management Module (6 objects) - ServiceArea: 160-165
| # | Object | Directory | ServiceArea | Primary Key |
|---|--------|-----------|-------------|-------------|
| 44 | TaxCode | taxcodes/ | 160 | TaxCodeId |
| 45 | TaxJurisdiction | taxjurisdictions/ | 161 | JurisdictionId |
| 46 | TaxRule | taxrules/ | 162 | RuleId |
| 47 | TaxReturn | taxreturns/ | 163 | ReturnId |
| 48 | TaxExemption | taxexemptions/ | 164 | ExemptionId |
| 49 | WithholdingTaxConfig | withholdingtaxconfigs/ | 165 | ConfigId |

---

## Directory Structure

```
go/erp/fin/
├── fin_main.go
├── accounts/
│   └── AccountService.go
├── journalentries/
│   └── JournalEntryService.go
├── journalentrylines/
│   └── JournalEntryLineService.go
├── fiscalyears/
│   └── FiscalYearService.go
├── fiscalperiods/
│   └── FiscalPeriodService.go
├── currencies/
│   └── CurrencyService.go
├── exchangerates/
│   └── ExchangeRateService.go
├── accountbalances/
│   └── AccountBalanceService.go
├── vendors/
│   └── VendorService.go
├── vendorcontacts/
│   └── VendorContactService.go
├── purchaseinvoices/
│   └── PurchaseInvoiceService.go
├── purchaseinvoicelines/
│   └── PurchaseInvoiceLineService.go
├── paymentschedules/
│   └── PaymentScheduleService.go
├── vendorpayments/
│   └── VendorPaymentService.go
├── paymentallocations/
│   └── PaymentAllocationService.go
├── vendorstatements/
│   └── VendorStatementService.go
├── customers/
│   └── CustomerService.go
├── customercontacts/
│   └── CustomerContactService.go
├── salesinvoices/
│   └── SalesInvoiceService.go
├── salesinvoicelines/
│   └── SalesInvoiceLineService.go
├── customerpayments/
│   └── CustomerPaymentService.go
├── paymentapplications/
│   └── PaymentApplicationService.go
├── creditmemos/
│   └── CreditMemoService.go
├── dunningletters/
│   └── DunningLetterService.go
├── bankaccounts/
│   └── BankAccountService.go
├── banktransactions/
│   └── BankTransactionService.go
├── bankreconciliations/
│   └── BankReconciliationService.go
├── cashforecasts/
│   └── CashForecastService.go
├── fundtransfers/
│   └── FundTransferService.go
├── pettycash/
│   └── PettyCashService.go
├── assets/
│   └── AssetService.go
├── assetcategories/
│   └── AssetCategoryService.go
├── depreciationschedules/
│   └── DepreciationScheduleService.go
├── assetdisposals/
│   └── AssetDisposalService.go
├── assettransfers/
│   └── AssetTransferService.go
├── assetmaintenance/
│   └── AssetMaintenanceService.go
├── assetrevaluations/
│   └── AssetRevaluationService.go
├── budgets/
│   └── BudgetService.go
├── budgetlines/
│   └── BudgetLineService.go
├── budgettransfers/
│   └── BudgetTransferService.go
├── budgetscenarios/
│   └── BudgetScenarioService.go
├── capitalexpenditures/
│   └── CapitalExpenditureService.go
├── forecasts/
│   └── ForecastService.go
├── taxcodes/
│   └── TaxCodeService.go
├── taxjurisdictions/
│   └── TaxJurisdictionService.go
├── taxrules/
│   └── TaxRuleService.go
├── taxreturns/
│   └── TaxReturnService.go
├── taxexemptions/
│   └── TaxExemptionService.go
└── withholdingtaxconfigs/
    └── WithholdingTaxConfigService.go
```

---

## Updated fin_main.go activateServices Function

```go
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
```

---

## Implementation Steps

1. **Define protobuf types** for all 49 objects under `proto/fin/`
2. **Generate Go code** from protobuf definitions
3. **Create 49 service directories** under `go/erp/fin/`
4. **Create 49 service files** following the template pattern
5. **Create 49 callback files** for business logic
6. **Create fin_main.go** with:
   - Import statements for all 49 packages
   - activateServices function calling all Activate functions
7. **Test compilation** with `go build`

---

## Service File Template

Each service file (e.g., `AccountService.go`) follows this pattern:

```go
// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.

package accounts

import (
    "errors"
    _ "github.com/lib/pq"
    "github.com/saichler/l8erp/go/erp/common"
    "github.com/saichler/l8erp/go/types/fin"
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
    ServiceArea = byte(100)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
    _, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
    if err != nil {
        panic(err)
    }
    db := common.OpenDBConection(dbname, user, pass)
    p := postgres.NewPostgres(db, vnic.Resources())

    sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, nil)
    sla.SetServiceItem(&fin.Account{})
    sla.SetServiceItemList(&fin.AccountList{})
    sla.SetPrimaryKeys("AccountId")
    sla.SetArgs(p)

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

---

## Cross-Module Integration Points

Financial Management integrates with other ERP modules:

| Integration | Direction | Description |
|-------------|-----------|-------------|
| HCM Payroll → GL | Inbound | Payroll journal entries post to General Ledger |
| HCM Payroll → AP | Inbound | Tax remittance creates AP entries |
| SCM Procurement → AP | Inbound | Purchase orders create AP invoices |
| Sales → AR | Inbound | Sales orders create AR invoices |
| Manufacturing → GL | Inbound | Production costs post to GL |
| Projects → GL | Inbound | Project costs post to GL |
| Fixed Assets → GL | Internal | Depreciation posts to GL automatically |
| AP/AR → Cash | Internal | Payments flow through Cash Management |
| GL → Budgeting | Internal | Actuals compared against budgets |
| All Transactions → Tax | Internal | Tax calculation on all financial transactions |

---

## Summary

- **Total Prime Objects**: 49
- **New Services to Create**: 49
- **Modules**: 7 (General Ledger, Accounts Payable, Accounts Receivable, Cash Management, Fixed Assets, Budgeting & Planning, Tax Management)
