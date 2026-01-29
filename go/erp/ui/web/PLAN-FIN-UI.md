# Financial Management UI Implementation Plan

## Overview

Design a user-friendly UI for 49 Financial Management services organized into 7 functional modules. The UI follows the Probler app patterns with tabs, L8Table components, and consistent styling.

---

## Financial Services by Module (49 total)

| Module | Services | Count |
|--------|----------|-------|
| **General Ledger** | Account, JournalEntry, JournalEntryLine, FiscalYear, FiscalPeriod, Currency, ExchangeRate, AccountBalance | 8 |
| **Accounts Payable** | Vendor, VendorContact, PurchaseInvoice, PurchaseInvoiceLine, PaymentSchedule, VendorPayment, PaymentAllocation, VendorStatement | 8 |
| **Accounts Receivable** | Customer, CustomerContact, SalesInvoice, SalesInvoiceLine, CustomerPayment, PaymentApplication, CreditMemo, DunningLetter | 8 |
| **Cash Management** | BankAccount, BankTransaction, BankReconciliation, CashForecast, FundTransfer, PettyCash | 6 |
| **Fixed Assets** | Asset, AssetCategory, DepreciationSchedule, AssetDisposal, AssetTransfer, AssetMaintenance, AssetRevaluation | 7 |
| **Budgeting** | Budget, BudgetLine, BudgetTransfer, BudgetScenario, CapitalExpenditure, Forecast | 6 |
| **Tax** | TaxCode, TaxJurisdiction, TaxRule, TaxReturn, TaxExemption, WithholdingTaxConfig | 6 |

---

## UI Structure

### Navigation Hierarchy

```
Finance Section (main sidebar)
├── Module Tabs (horizontal, top of section)
│   ├── General Ledger
│   ├── Accounts Payable
│   ├── Accounts Receivable
│   ├── Cash
│   ├── Fixed Assets
│   ├── Budgeting
│   └── Tax
│
└── Each Tab → Sub-navigation (left sidebar or pill nav)
    └── Service Views → L8Table with CRUD
```

### Layout Design

```
┌─────────────────────────────────────────────────────────────────┐
│  Financial Management                                    💰      │
│  Manage your organization's financial operations                 │
├─────────────────────────────────────────────────────────────────┤
│ [Gen Ledger] [AP] [AR] [Cash] [Assets] [Budgeting] [Tax]       │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│  📊 Accounts│  ┌─────────────────────────────────────────────┐  │
│  📝 Journals│  │  Chart of Accounts                 [+ Add]  │  │
│  📅 Periods │  ├─────────────────────────────────────────────┤  │
│  💱 Currency│  │ # | Name | Type | Category | Balance | Act  │  │
│  📈 Rates   │  │---|------|------|----------|---------|------│  │
│  📊 Balances│  │ . | .... | .... | ........ | ....... | Ed|D │  │
│            │  │ . | .... | .... | ........ | ....... | Ed|D │  │
│            │  └─────────────────────────────────────────────┘  │
│            │                                                    │
└────────────┴────────────────────────────────────────────────────┘
```

---

## Module Details

### 1. General Ledger Tab
**Primary Focus**: Chart of accounts, journal entries, and fiscal period management

| Sub-Section | Icon | Description | Primary Actions |
|-------------|------|-------------|-----------------|
| Accounts | 📊 | Chart of accounts | View, Add, Edit, Deactivate |
| Journal Entries | 📝 | Manual and automated entries | View, Add, Post, Reverse |
| Entry Lines | 📋 | Debit/credit lines | View (child of Journal Entry) |
| Fiscal Years | 📅 | Year definitions | View, Add, Open, Close |
| Fiscal Periods | 📆 | Period definitions | View, Add, Open, Close |
| Currencies | 💱 | Currency setup | View, Add, Edit, Delete |
| Exchange Rates | 📈 | Rate management | View, Add, Edit, Delete |
| Account Balances | 📊 | Period balances | View (read-only, system-calculated) |

**Journal Entry Detail View** (modal or dedicated page):
- Header info, Entry lines with debit/credit, Totals verification (debits = credits)

### 2. Accounts Payable Tab
**Primary Focus**: Vendor management, invoice processing, and payments

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Vendors | 🏢 | Vendor master data |
| Vendor Contacts | 👤 | Vendor contact people |
| Purchase Invoices | 📄 | AP invoices |
| Invoice Lines | 📋 | Invoice line items |
| Payment Schedule | 📅 | Scheduled payments |
| Vendor Payments | 💸 | Payment processing |
| Allocations | 🔗 | Payment-to-invoice matching |
| Vendor Statements | 📊 | Statement reconciliation |

**Vendor Detail View**: Company info, contacts, open invoices, payment history, aging summary

### 3. Accounts Receivable Tab
**Primary Focus**: Customer management, billing, and collections

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Customers | 👥 | Customer master data |
| Customer Contacts | 👤 | Customer contact people |
| Sales Invoices | 📄 | AR invoices |
| Invoice Lines | 📋 | Invoice line items |
| Customer Payments | 💰 | Payment receipts |
| Payment Applications | 🔗 | Payment-to-invoice matching |
| Credit Memos | 📝 | Credit adjustments |
| Dunning Letters | 📮 | Collection letters |

**Customer Detail View**: Company info, contacts, open invoices, payment history, credit status, aging summary

### 4. Cash Management Tab
**Primary Focus**: Bank accounts, reconciliation, and cash flow

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Bank Accounts | 🏦 | Bank account setup |
| Transactions | 💳 | Bank transactions |
| Reconciliations | ✅ | Bank reconciliation |
| Cash Forecasts | 📈 | Cash flow projections |
| Fund Transfers | 🔄 | Inter-account transfers |
| Petty Cash | 💵 | Petty cash funds |

### 5. Fixed Assets Tab
**Primary Focus**: Asset tracking, depreciation, and lifecycle management

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Assets | 🏗️ | Asset master records |
| Categories | 📁 | Asset categories |
| Depreciation | 📉 | Depreciation schedules |
| Disposals | 🗑️ | Asset disposals |
| Transfers | 🔄 | Asset transfers |
| Maintenance | 🔧 | Maintenance records |
| Revaluations | 📊 | Asset revaluations |

**Asset Detail View**: Asset info, depreciation history, maintenance log, current book value

### 6. Budgeting Tab
**Primary Focus**: Budget creation, tracking, and capital planning

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Budgets | 📋 | Budget headers |
| Budget Lines | 📊 | Line item details |
| Transfers | 🔄 | Budget transfers |
| Scenarios | 🔮 | What-if analysis |
| Capital Expenses | 🏗️ | CapEx planning |
| Forecasts | 📈 | Rolling forecasts |

### 7. Tax Tab
**Primary Focus**: Tax configuration, compliance, and reporting

| Sub-Section | Icon | Description |
|-------------|------|-------------|
| Tax Codes | 🏷️ | Tax code setup |
| Jurisdictions | 🌍 | Tax jurisdictions |
| Tax Rules | 📜 | Calculation rules |
| Tax Returns | 📄 | Filing records |
| Exemptions | 🚫 | Tax exemptions |
| Withholding Config | ⚙️ | Withholding setup |

---

## File Structure

```
go/erp/ui/web/
├── sections/
│   └── fin.html                      # Main Finance section with module tabs
├── fin/
│   ├── fin.css                       # Finance-specific styles
│   ├── fin.js                        # Finance module initialization
│   ├── fin-config.js                 # Module/service definitions
│   ├── fin-navigation.js             # Tab switching and navigation
│   ├── fin-service.js                # Service table initialization
│   ├── fin-crud.js                   # Add/Edit/Delete modals
│   ├── fin-forms.js                  # Shared form utilities
│   │
│   ├── general-ledger/
│   │   ├── general-ledger.js         # GL module orchestration
│   │   ├── general-ledger-columns.js # Table column configs
│   │   ├── general-ledger-forms.js   # Form field definitions
│   │   ├── general-ledger-enums.js   # Enum definitions
│   │   └── journal-entry-detail.js   # Rich journal entry view
│   │
│   ├── accounts-payable/
│   │   ├── accounts-payable.js       # AP module orchestration
│   │   ├── accounts-payable-columns.js
│   │   ├── accounts-payable-forms.js
│   │   ├── accounts-payable-enums.js
│   │   └── vendor-detail.js          # Rich vendor view
│   │
│   ├── accounts-receivable/
│   │   ├── accounts-receivable.js    # AR module orchestration
│   │   ├── accounts-receivable-columns.js
│   │   ├── accounts-receivable-forms.js
│   │   ├── accounts-receivable-enums.js
│   │   └── customer-detail.js        # Rich customer view
│   │
│   ├── cash/
│   │   ├── cash.js                   # Cash module orchestration
│   │   ├── cash-columns.js
│   │   ├── cash-forms.js
│   │   └── cash-enums.js
│   │
│   ├── fixed-assets/
│   │   ├── fixed-assets.js           # Assets module orchestration
│   │   ├── fixed-assets-columns.js
│   │   ├── fixed-assets-forms.js
│   │   ├── fixed-assets-enums.js
│   │   └── asset-detail.js           # Rich asset view
│   │
│   ├── budgeting/
│   │   ├── budgeting.js              # Budget module orchestration
│   │   ├── budgeting-columns.js
│   │   ├── budgeting-forms.js
│   │   └── budgeting-enums.js
│   │
│   └── tax/
│       ├── tax.js                    # Tax module orchestration
│       ├── tax-columns.js
│       ├── tax-forms.js
│       └── tax-enums.js
```

---

## Implementation Phases

### Phase 1: Foundation
1. Create Finance section structure with module tabs
2. Set up fin.css with sub-navigation styles
3. Create fin.js for tab switching logic
4. Create fin-config.js, fin-navigation.js, fin-service.js, fin-crud.js, fin-forms.js

### Phase 2: General Ledger Module (MVP)
1. Implement Chart of Accounts (Account) with hierarchy view
2. Implement Journal Entries with line items
3. Implement Fiscal Years and Periods
4. Implement Currency and Exchange Rate management
5. Add Journal Entry detail view with debit/credit validation

### Phase 3: Accounts Payable Module
1. Vendor master data with detail view
2. Purchase Invoice entry with line items
3. Payment scheduling and processing
4. Payment-to-invoice allocation
5. Vendor statement reconciliation

### Phase 4: Accounts Receivable Module
1. Customer master data with detail view
2. Sales Invoice entry with line items
3. Customer payment receipts
4. Payment application to invoices
5. Credit memos and dunning letters

### Phase 5: Cash Management Module
1. Bank account setup with GL mapping
2. Bank transaction recording
3. Bank reconciliation workflow
4. Cash forecasting
5. Fund transfers between accounts

### Phase 6: Fixed Assets Module
1. Asset category setup
2. Asset master records with detail view
3. Depreciation schedule generation
4. Asset disposal and transfer processing
5. Maintenance and revaluation tracking

### Phase 7: Budgeting Module
1. Budget creation with line items
2. Budget transfer workflow
3. What-if scenario modeling
4. Capital expenditure planning
5. Rolling forecast management

### Phase 8: Tax Module
1. Tax code and jurisdiction setup
2. Tax rule configuration
3. Tax return tracking
4. Tax exemption management
5. Withholding tax configuration

---

## L8Table Configuration Pattern

Each service will use the L8Table component with this pattern:

```javascript
// Example: Accounts table
const accountTable = new L8Table({
    containerId: 'accounts-table',
    endpoint: '/erp/100/Account',
    modelName: 'Account',
    serverSide: true,
    columns: [
        { key: 'accountId', label: 'ID' },
        { key: 'accountNumber', label: 'Account #' },
        { key: 'accountName', label: 'Name' },
        { key: 'accountType', label: 'Type',
          enumValues: { asset: 1, liability: 2, equity: 3, revenue: 4, expense: 5 },
          render: (item) => getAccountTypeName(item.accountType) },
        { key: 'parentAccountId', label: 'Parent Account',
          render: (item) => getAccountName(item.parentAccountId) },
        { key: 'currencyCode', label: 'Currency' },
        { key: 'status', label: 'Status',
          render: (item) => L8Table.statusTag(item.status === 1, 'Active', 'Inactive') }
    ],
    onAdd: () => openAccountModal(),
    onEdit: (id) => openAccountModal(id),
    onDelete: (id) => confirmDelete('Account', id, () => deleteAccount(id)),
    addButtonText: 'Add Account'
});
accountTable.init();
```

---

## API Endpoints Reference

All Finance services use ServiceArea = 31. Endpoint format: `/erp/31/<ServiceName>`

| Service | Endpoint |
|---------|----------|
| Account | /erp/31/Account |
| JrnlEntry | /erp/31/JrnlEntry |
| JrnlLine | /erp/31/JrnlLine |
| FiscalYr | /erp/31/FiscalYr |
| FiscalPrd | /erp/31/FiscalPrd |
| Currency | /erp/31/Currency |
| ExchRate | /erp/31/ExchRate |
| AcctBal | /erp/31/AcctBal |
| Vendor | /erp/31/Vendor |
| VndrCont | /erp/31/VndrCont |
| PurchInv | /erp/31/PurchInv |
| PurchLine | /erp/31/PurchLine |
| PaySched | /erp/31/PaySched |
| VndrPay | /erp/31/VndrPay |
| PayAlloc | /erp/31/PayAlloc |
| VndrStmt | /erp/31/VndrStmt |
| Customer | /erp/31/Customer |
| CustCont | /erp/31/CustCont |
| SalesInv | /erp/31/SalesInv |
| SalesLine | /erp/31/SalesLine |
| CustPay | /erp/31/CustPay |
| PayAppl | /erp/31/PayAppl |
| CreditMem | /erp/31/CreditMem |
| DunLetter | /erp/31/DunLetter |
| BankAcct | /erp/31/BankAcct |
| BankTxn | /erp/31/BankTxn |
| BankRecon | /erp/31/BankRecon |
| CashFcst | /erp/31/CashFcst |
| FundXfer | /erp/31/FundXfer |
| PettyCash | /erp/31/PettyCash |
| Asset | /erp/31/Asset |
| AstCat | /erp/31/AstCat |
| DeprSched | /erp/31/DeprSched |
| AstDisp | /erp/31/AstDisp |
| AstXfer | /erp/31/AstXfer |
| AstMaint | /erp/31/AstMaint |
| AstReval | /erp/31/AstReval |
| Budget | /erp/31/Budget |
| BdgtLine | /erp/31/BdgtLine |
| BdgtXfer | /erp/31/BdgtXfer |
| BdgtScen | /erp/31/BdgtScen |
| CapEx | /erp/31/CapEx |
| Forecast | /erp/31/Forecast |
| TaxCode | /erp/31/TaxCode |
| TaxJuris | /erp/31/TaxJuris |
| TaxRule | /erp/31/TaxRule |
| TaxReturn | /erp/31/TaxReturn |
| TaxExmpt | /erp/31/TaxExmpt |
| WhtConfig | /erp/31/WhtConfig |

---

## UX Considerations

1. **Double-Entry Validation**: Journal entries must balance (total debits = total credits) before posting
2. **Period Controls**: Prevent posting to closed fiscal periods
3. **Aging Views**: Color-coded aging buckets for AP/AR (Current, 30, 60, 90, 120+ days)
4. **Reconciliation Workflow**: Step-by-step bank reconciliation with match/unmatch UI
5. **Drill-Down**: From account balances, drill into journal entries that make up the balance
6. **Search**: Global search across vendors, customers, invoices, and transactions
7. **Bulk Operations**: Batch payment processing, bulk invoice posting
8. **Responsive**: Mobile-friendly for approval workflows
9. **Keyboard Navigation**: Tab order and shortcuts for data entry-heavy screens
10. **Currency Display**: Consistent formatting with currency symbols and decimal precision

---

## Dependencies

- `edit_table/table.js` - L8Table component
- `edit_table/table.css` - Table styles
- `popup/popup.js` - Modal dialogs
- `confirm/confirm.js` - Confirmation dialogs
- `css/base-core.css` - Base styles
- `css/components-modals.css` - Modal styles
