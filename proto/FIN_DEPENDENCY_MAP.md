# Financial Management Prime Object Dependency Map

This document provides a comprehensive map of all Prime Object dependencies in the Financial Management module. A **Prime Object Dependency** is where a Prime Object attribute (or nested attribute) references another Prime Object instance via its ID attribute.

## Table of Contents

1. [Overview](#overview)
2. [Dependency Summary](#dependency-summary)
3. [Module Dependencies](#module-dependencies)
   - [General Ledger](#general-ledger)
   - [Accounts Payable](#accounts-payable)
   - [Accounts Receivable](#accounts-receivable)
   - [Cash Management](#cash-management)
   - [Fixed Assets](#fixed-assets)
   - [Budgeting and Planning](#budgeting-and-planning)
   - [Tax Management](#tax-management)
4. [Dependency Graph](#dependency-graph)
5. [Circular Dependencies](#circular-dependencies)
6. [Mock Data Generation Guidelines](#mock-data-generation-guidelines)

---

## Overview

The Financial Management module contains **49 Prime Objects** across 7 sub-modules. These objects form a complex web of dependencies that must be respected when:
- Creating mock data for testing
- Seeding databases
- Validating data integrity
- Building UI lookup fields

### Statistics

| Module | Prime Objects | Internal Dependencies | Cross-Module Dependencies |
|--------|---------------|----------------------|---------------------------|
| General Ledger | 8 | 8 | 0 |
| Accounts Payable | 8 | 14 | 4 |
| Accounts Receivable | 8 | 12 | 4 |
| Cash Management | 6 | 7 | 2 |
| Fixed Assets | 7 | 11 | 4 |
| Budgeting and Planning | 6 | 8 | 2 |
| Tax Management | 6 | 5 | 2 |
| **Total** | **49** | **65** | **18** |

---

## Dependency Summary

### Foundational Objects (No Dependencies)

These Prime Objects have no dependencies on other Prime Objects and should be created first:

| Object | Module | Primary Key |
|--------|--------|-------------|
| Currency | General Ledger | `currency_id` |
| FiscalYear | General Ledger | `fiscal_year_id` |
| AssetCategory | Fixed Assets | `category_id` |
| TaxJurisdiction | Tax Management | `jurisdiction_id` |

### Most Referenced Objects

Objects that are most frequently referenced by other Prime Objects:

| Object | Times Referenced | Referenced By |
|--------|-----------------|---------------|
| **Account** | 14 | JournalEntryLine, BankAccount, AssetCategory, BudgetLine, PurchaseInvoiceLine, SalesInvoiceLine, etc. |
| **Vendor** | 7 | VendorContact, PurchaseInvoice, VendorPayment, PaymentSchedule, VendorStatement, AssetMaintenance, WithholdingTaxConfig |
| **Customer** | 6 | CustomerContact, SalesInvoice, CustomerPayment, CreditMemo, DunningLetter, TaxExemption |
| **FiscalPeriod** | 6 | JournalEntry, AccountBalance, DepreciationSchedule, BudgetLine, TaxReturn, Forecast |
| **BankAccount** | 5 | BankTransaction, BankReconciliation, FundTransfer (x2), VendorPayment, CustomerPayment |
| **FiscalYear** | 4 | FiscalPeriod, Budget, CapitalExpenditure, Forecast |
| **TaxCode** | 4 | TaxRule, TaxExemption, WithholdingTaxConfig, PurchaseInvoiceLine, SalesInvoiceLine |
| **Currency** | 3 | Account, BankAccount, ExchangeRate (x2) |

---

## Module Dependencies

### General Ledger

#### Account
**Primary Key:** `account_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `parent_account_id` | Account (self) | No |
| `currency_id` | Currency | No |

#### JournalEntry
**Primary Key:** `journal_entry_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `fiscal_period_id` | FiscalPeriod | Yes |

#### JournalEntryLine
**Primary Key:** `line_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `journal_entry_id` | JournalEntry | Yes |
| `account_id` | Account | Yes |

#### FiscalYear
**Primary Key:** `fiscal_year_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### FiscalPeriod
**Primary Key:** `fiscal_period_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `fiscal_year_id` | FiscalYear | Yes |

#### Currency
**Primary Key:** `currency_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### ExchangeRate
**Primary Key:** `exchange_rate_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `from_currency_id` | Currency | Yes |
| `to_currency_id` | Currency | Yes |

#### AccountBalance
**Primary Key:** `balance_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `account_id` | Account | Yes |
| `fiscal_period_id` | FiscalPeriod | Yes |

---

### Accounts Payable

#### Vendor
**Primary Key:** `vendor_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `default_account_id` | Account | No |
| `currency_id` | Currency | No |

#### VendorContact
**Primary Key:** `contact_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |

#### PurchaseInvoice
**Primary Key:** `invoice_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |
| `currency_id` | Currency | No |
| `fiscal_period_id` | FiscalPeriod | No |

#### PurchaseInvoiceLine
**Primary Key:** `line_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `invoice_id` | PurchaseInvoice | Yes |
| `account_id` | Account | Yes |
| `tax_code_id` | TaxCode | No |

#### PaymentSchedule
**Primary Key:** `schedule_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |
| `invoice_id` | PurchaseInvoice | Yes |

#### VendorPayment
**Primary Key:** `payment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |
| `bank_account_id` | BankAccount | No |

#### PaymentAllocation
**Primary Key:** `allocation_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `payment_id` | VendorPayment | Yes |
| `invoice_id` | PurchaseInvoice | Yes |

#### VendorStatement
**Primary Key:** `statement_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |

---

### Accounts Receivable

#### Customer
**Primary Key:** `customer_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `default_account_id` | Account | No |
| `currency_id` | Currency | No |

#### CustomerContact
**Primary Key:** `contact_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `customer_id` | Customer | Yes |

#### SalesInvoice
**Primary Key:** `invoice_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `customer_id` | Customer | Yes |
| `currency_id` | Currency | No |
| `fiscal_period_id` | FiscalPeriod | No |

#### SalesInvoiceLine
**Primary Key:** `line_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `invoice_id` | SalesInvoice | Yes |
| `account_id` | Account | Yes |
| `tax_code_id` | TaxCode | No |

#### CustomerPayment
**Primary Key:** `payment_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `customer_id` | Customer | Yes |
| `bank_account_id` | BankAccount | No |

#### PaymentApplication
**Primary Key:** `application_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `payment_id` | CustomerPayment | Yes |
| `invoice_id` | SalesInvoice | Yes |

#### CreditMemo
**Primary Key:** `credit_memo_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `customer_id` | Customer | Yes |
| `original_invoice_id` | SalesInvoice | No |

#### DunningLetter
**Primary Key:** `letter_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `customer_id` | Customer | Yes |

---

### Cash Management

#### BankAccount
**Primary Key:** `bank_account_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `currency_id` | Currency | No |
| `gl_account_id` | Account | Yes |

#### BankTransaction
**Primary Key:** `transaction_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `bank_account_id` | BankAccount | Yes |

#### BankReconciliation
**Primary Key:** `reconciliation_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `bank_account_id` | BankAccount | Yes |

#### CashForecast
**Primary Key:** `forecast_id`

| Attribute | References | Required |
|-----------|------------|----------|
| *(none)* | - | - |

#### FundTransfer
**Primary Key:** `transfer_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `from_bank_account_id` | BankAccount | Yes |
| `to_bank_account_id` | BankAccount | Yes |

#### PettyCash
**Primary Key:** `petty_cash_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `custodian_employee_id` | Employee (HCM) | No |

---

### Fixed Assets

#### Asset
**Primary Key:** `asset_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `category_id` | AssetCategory | Yes |
| `department_id` | Department (HCM) | No |
| `gl_account_id` | Account | No |

#### AssetCategory
**Primary Key:** `category_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `gl_account_id` | Account | No |
| `depreciation_expense_account_id` | Account | No |
| `accumulated_depreciation_account_id` | Account | No |

#### DepreciationSchedule
**Primary Key:** `schedule_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `asset_id` | Asset | Yes |
| `fiscal_period_id` | FiscalPeriod | Yes |

#### AssetDisposal
**Primary Key:** `disposal_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `asset_id` | Asset | Yes |
| `gain_loss_account_id` | Account | No |

#### AssetTransfer
**Primary Key:** `transfer_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `asset_id` | Asset | Yes |
| `from_department_id` | Department (HCM) | No |
| `to_department_id` | Department (HCM) | No |

#### AssetMaintenance
**Primary Key:** `maintenance_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `asset_id` | Asset | Yes |
| `vendor_id` | Vendor | No |

#### AssetRevaluation
**Primary Key:** `revaluation_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `asset_id` | Asset | Yes |

---

### Budgeting and Planning

#### Budget
**Primary Key:** `budget_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `fiscal_year_id` | FiscalYear | Yes |
| `department_id` | Department (HCM) | No |

#### BudgetLine
**Primary Key:** `line_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `budget_id` | Budget | Yes |
| `account_id` | Account | Yes |
| `fiscal_period_id` | FiscalPeriod | No |

#### BudgetTransfer
**Primary Key:** `transfer_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `from_budget_line_id` | BudgetLine | Yes |
| `to_budget_line_id` | BudgetLine | Yes |

#### BudgetScenario
**Primary Key:** `scenario_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `base_budget_id` | Budget | Yes |

#### CapitalExpenditure
**Primary Key:** `capex_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `department_id` | Department (HCM) | No |
| `fiscal_year_id` | FiscalYear | No |

#### Forecast
**Primary Key:** `forecast_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `fiscal_year_id` | FiscalYear | No |

---

### Tax Management

#### TaxCode
**Primary Key:** `tax_code_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `gl_account_id` | Account | No |

#### TaxJurisdiction
**Primary Key:** `jurisdiction_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `parent_jurisdiction_id` | TaxJurisdiction (self) | No |

#### TaxRule
**Primary Key:** `rule_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `tax_code_id` | TaxCode | Yes |
| `jurisdiction_id` | TaxJurisdiction | Yes |

#### TaxReturn
**Primary Key:** `return_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `jurisdiction_id` | TaxJurisdiction | Yes |
| `fiscal_period_id` | FiscalPeriod | Yes |

#### TaxExemption
**Primary Key:** `exemption_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `tax_code_id` | TaxCode | Yes |
| `customer_id` | Customer | No |
| `vendor_id` | Vendor | No |

#### WithholdingTaxConfig
**Primary Key:** `config_id`

| Attribute | References | Required |
|-----------|------------|----------|
| `vendor_id` | Vendor | Yes |
| `tax_code_id` | TaxCode | Yes |

---

## Dependency Graph

```
                              ┌───────────┐
                              │ Currency  │
                              └─────┬─────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
     ┌───────────┐           ┌────────────┐           ┌───────────┐
     │  Account  │◄──┐       │ExchangeRate│           │BankAccount│
     └─────┬─────┘   │       └────────────┘           └─────┬─────┘
           │         │                                       │
     ┌─────┼─────┐   │       ┌──────────┐            ┌──────┼──────┐
     │     │     │   │       │FiscalYear│            │      │      │
     │     │     │   │       └────┬─────┘            ▼      ▼      ▼
     │     │     │   │            │            ┌─────────┐ ┌────┐ ┌──────┐
     │     │     │   │            ▼            │BankTxn  │ │Fund│ │BankRe│
     │     │     │   │     ┌────────────┐      └─────────┘ │Xfer│ │concil│
     │     │     │   │     │FiscalPeriod│                   └────┘ └──────┘
     │     │     │   │     └──────┬─────┘
     │     │     │   │            │
     │     │     │   ├────────────┼──────────────────────┐
     │     │     │   │            │                      │
     ▼     ▼     ▼   │            ▼                      ▼
┌────────┐ │  ┌──────┴───┐  ┌──────────┐          ┌──────────┐
│JrnlLine│ │  │AcctBal   │  │JrnlEntry │          │DeprSched │
└────────┘ │  └──────────┘  └──────────┘          └──────────┘
           │                                            │
           │                                            ▼
           │                                      ┌───────────┐
           │                                      │   Asset   │
           │                                      └─────┬─────┘
           │                                            │
           │                      ┌──────────┬──────────┼──────────┐
           │                      ▼          ▼          ▼          ▼
           │                ┌──────────┐┌──────────┐┌────────┐┌────────┐
           │                │AstDispose││AstXfer   ││AstMaint││AstReval│
           │                └──────────┘└──────────┘└────────┘└────────┘
           │
     ┌─────┴──────────────────┐
     │                        │
     ▼                        ▼
┌──────────┐           ┌───────────┐
│  Vendor  │           │ Customer  │
└────┬─────┘           └─────┬─────┘
     │                       │
     ├────────┐              ├────────┐
     │        │              │        │
     ▼        ▼              ▼        ▼
┌─────────┐ ┌──────┐  ┌─────────┐ ┌──────┐
│PurchInv │ │VndrCt│  │SalesInv │ │CustCt│
└────┬────┘ └──────┘  └────┬────┘ └──────┘
     │                      │
     ├──────┐               ├──────┐
     ▼      ▼               ▼      ▼
┌────────┐┌──────┐   ┌────────┐┌──────┐
│PurchLn ││PaySch│   │SalesLn ││CrdMem│
└────────┘└──────┘   └────────┘└──────┘
     │                      │
     ▼                      ▼
┌──────────┐          ┌──────────┐
│VndrPay   │          │CustPay   │
└────┬─────┘          └────┬─────┘
     │                      │
     ▼                      ▼
┌──────────┐          ┌──────────┐
│PayAlloc  │          │PayAppl   │
└──────────┘          └──────────┘


┌─────────────────┐          ┌────────────────┐
│ TaxJurisdiction │          │    TaxCode     │
└────────┬────────┘          └───────┬────────┘
         │                           │
         ├──────┐             ┌──────┼──────┐
         ▼      ▼             ▼      ▼      ▼
   ┌──────────┐┌────────┐┌──────┐┌──────┐┌──────┐
   │ TaxRule  ││TaxRtrn ││TxExmt││WhtCfg││(InvLn│
   └──────────┘└────────┘└──────┘└──────┘│lines)│
                                          └──────┘

┌──────────┐
│  Budget  │◄── FiscalYear, Department(HCM)
└────┬─────┘
     │
     ├──────────┐
     ▼          ▼
┌──────────┐┌──────────┐
│BudgetLine││BdgtScen  │
└────┬─────┘└──────────┘
     │
     ▼
┌──────────┐
│BdgtXfer  │
└──────────┘
```

---

## Circular Dependencies

The following self-referential (circular) dependencies exist:

| Object | Attribute | Description |
|--------|-----------|-------------|
| Account | `parent_account_id` | Chart of accounts hierarchy |
| TaxJurisdiction | `parent_jurisdiction_id` | Jurisdiction hierarchy (Federal → State → Local) |

**Handling Circular Dependencies in Mock Data:**
1. Create root-level objects first (where parent_id is null)
2. Create child objects in subsequent passes
3. Use a maximum depth limit (recommended: 5 levels for accounts, 3 levels for jurisdictions)

---

## Mock Data Generation Guidelines

### Creation Order

To ensure referential integrity, create mock data in the following order:

#### Phase 1: Foundation Objects (No Dependencies)
```
1. Currency
2. FiscalYear
3. AssetCategory
4. TaxJurisdiction (create root first, then children)
```

#### Phase 2: Core Financial Structure
```
5. FiscalPeriod
6. Account (create root accounts first, then children)
7. TaxCode
```

#### Phase 3: Entity Master Data
```
8. Vendor
9. VendorContact
10. Customer
11. CustomerContact
12. BankAccount
13. ExchangeRate
```

#### Phase 4: Configuration Objects
```
14. TaxRule
15. TaxExemption
16. WithholdingTaxConfig
17. Budget
18. BudgetLine
19. BudgetTransfer
20. BudgetScenario
21. CapitalExpenditure
22. Forecast
```

#### Phase 5: Transaction Objects - AP
```
23. PurchaseInvoice
24. PurchaseInvoiceLine
25. PaymentSchedule
26. VendorPayment
27. PaymentAllocation
28. VendorStatement
```

#### Phase 6: Transaction Objects - AR
```
29. SalesInvoice
30. SalesInvoiceLine
31. CustomerPayment
32. PaymentApplication
33. CreditMemo
34. DunningLetter
```

#### Phase 7: GL Transactions
```
35. JournalEntry
36. JournalEntryLine
37. AccountBalance
```

#### Phase 8: Cash and Assets
```
38. BankTransaction
39. BankReconciliation
40. FundTransfer
41. PettyCash
42. Asset
43. DepreciationSchedule
44. AssetDisposal
45. AssetTransfer
46. AssetMaintenance
47. AssetRevaluation
```

#### Phase 9: Tax Filing
```
48. TaxReturn
```

### ID Generation Strategy

For consistent mock data, use the following ID patterns:

| Object Type | ID Pattern | Example |
|-------------|------------|---------|
| Account | `ACCT-{4-digit}` | `ACCT-1000` |
| Vendor | `VND-{4-digit}` | `VND-0001` |
| Customer | `CUST-{4-digit}` | `CUST-0001` |
| PurchaseInvoice | `PI-{6-digit}` | `PI-000001` |
| SalesInvoice | `SI-{6-digit}` | `SI-000001` |
| JournalEntry | `JE-{6-digit}` | `JE-000001` |
| Asset | `AST-{4-digit}` | `AST-0001` |
| BankAccount | `BA-{4-digit}` | `BA-0001` |
| Budget | `BDG-{4-digit}` | `BDG-0001` |
| Other | `{PREFIX}-{UUID-short}` | `TXCD-a1b2c3` |

### Recommended Mock Data Quantities

For a realistic test dataset:

| Object | Recommended Count | Notes |
|--------|-------------------|-------|
| Currency | 5-10 | USD, EUR, GBP, JPY, CAD, etc. |
| FiscalYear | 3 | Prior, current, next |
| FiscalPeriod | 36 | 12 per fiscal year |
| Account | 200-500 | Full chart of accounts |
| Vendor | 50-100 | Various categories |
| Customer | 100-200 | Various sizes |
| PurchaseInvoice | 500-1000 | Mix of statuses |
| SalesInvoice | 1000-2000 | Mix of statuses |
| JournalEntry | 200-500 | Various sources |
| BankAccount | 5-10 | Operating, payroll, savings |
| Asset | 100-300 | Various categories |
| Budget | 10-20 | Per department |

### Consistency Rules

1. **Double-Entry**: Every JournalEntry's lines must have total debits = total credits
2. **Period Integrity**: Transactions must reference open fiscal periods
3. **Date Consistency**: Invoice date <= due date; payment date >= invoice date
4. **Balance Consistency**: AccountBalance.ending_balance = beginning_balance + period_debit - period_credit
5. **Allocation Consistency**: Sum of PaymentAllocation amounts <= VendorPayment amount
6. **Application Consistency**: Sum of PaymentApplication amounts <= CustomerPayment amount
7. **Credit Limit**: Customer open invoices should respect credit_limit where set
8. **Asset Depreciation**: Accumulated depreciation should not exceed acquisition_cost - salvage_value
9. **Budget Balance**: Sum of BudgetLine amounts should equal Budget total_amount
10. **Currency Consistency**: Invoice currency should match vendor/customer default currency where set

---

## Cross-Module Reference Summary

| From Module | To Module | Objects Involved |
|-------------|-----------|------------------|
| Accounts Payable | General Ledger | Account (via PurchaseInvoiceLine, Vendor) |
| Accounts Payable | Cash Management | BankAccount (via VendorPayment) |
| Accounts Payable | Tax Management | TaxCode (via PurchaseInvoiceLine) |
| Accounts Receivable | General Ledger | Account (via SalesInvoiceLine, Customer) |
| Accounts Receivable | Cash Management | BankAccount (via CustomerPayment) |
| Accounts Receivable | Tax Management | TaxCode (via SalesInvoiceLine) |
| Cash Management | General Ledger | Account (via BankAccount.gl_account_id) |
| Cash Management | HCM | Employee (via PettyCash.custodian_employee_id) |
| Fixed Assets | General Ledger | Account (via Asset, AssetCategory, AssetDisposal) |
| Fixed Assets | Accounts Payable | Vendor (via AssetMaintenance) |
| Fixed Assets | HCM | Department (via Asset, AssetTransfer) |
| Budgeting | General Ledger | Account (via BudgetLine), FiscalYear, FiscalPeriod |
| Budgeting | HCM | Department (via Budget, CapitalExpenditure) |
| Tax Management | General Ledger | Account (via TaxCode) |
| Tax Management | Accounts Payable | Vendor (via WithholdingTaxConfig, TaxExemption) |
| Tax Management | Accounts Receivable | Customer (via TaxExemption) |

---

## HCM Cross-Module Dependencies

The Financial Management module references HCM objects in a few places. These are **optional** references and should be handled gracefully when HCM data is not available:

| FIN Object | HCM Object | Attribute | Notes |
|------------|------------|-----------|-------|
| PettyCash | Employee | `custodian_employee_id` | Petty cash fund custodian |
| Asset | Department | `department_id` | Asset's assigned department |
| AssetTransfer | Department | `from_department_id`, `to_department_id` | Transfer between departments |
| Budget | Department | `department_id` | Departmental budget |
| CapitalExpenditure | Department | `department_id` | CapEx requesting department |

---

*Document generated for L8ERP Financial Management Module*
*Version: 1.0*
*Last Updated: 2026-01-28*
