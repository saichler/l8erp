# Lending Management Module — Implementation Plan

## Overview

A new **Lending** section for l8erp that provides loan origination, credit line management, collateral tracking, payment processing, and lending analytics. This complements the existing FIN module (which handles GL, AP/AR, cash management, budgeting, tax) with dedicated lending lifecycle management.

**ServiceArea:** `130` (next available after AIA at 120)
**Proto prefix:** `lend-`
**Go package:** `go/erp/lend/`
**UI namespace:** `Lend` (desktop), `MobileLend` (mobile)

---

## Domain Model

### Prime Objects (own service, own lifecycle)

| Entity | ServiceName | Description |
|--------|-------------|-------------|
| `LendProduct` | `LendProd` | Loan product templates (terms, rates, fee structures) |
| `LendApplication` | `LendAppl` | Loan/credit applications with review workflow |
| `Loan` | `Loan` | Active loans with amortization, balances, status |
| `CreditLine` | `CrdtLine` | Revolving credit facilities with limits and drawdowns |
| `LendPayment` | `LendPmt` | Payments received against loans or credit lines |
| `LendCollateral` | `LendCltrl` | Pledged collateral assets (queried across loans) |

### Child Types (embedded in parent, no own service)

| Child | Parent | Description |
|-------|--------|-------------|
| `LoanDisbursement` | `Loan` | Fund disbursement records |
| `LoanFee` | `Loan` | Origination fees, late fees, service charges |
| `LoanAmortizationLine` | `Loan` | Amortization schedule entries |
| `CreditLineDrawdown` | `CreditLine` | Individual drawdowns against the credit line |
| `CreditLineRepayment` | `CreditLine` | Repayments against the credit line |
| `ApplicationDocument` | `LendApplication` | Supporting documents for an application |
| `PaymentAllocation` | `LendPayment` | Split of payment across principal/interest/fees |
| `CollateralValuation` | `LendCollateral` | Periodic valuation records |

### Cross-Module References (by ID only)

| Field | References | Module |
|-------|-----------|--------|
| `customerId` | `Customer` | FIN (40) |
| `vendorId` | `Vendor` | FIN (40) |
| `bankAccountId` | `BankAccount` | FIN (40) |
| `glAccountId` | `Account` | FIN (40) |
| `currencyId` | `Currency` | FIN (40) |
| `employeeId` | `Employee` | HCM (30) — loan officer/reviewer |

---

## Protobuf Design

### File: `proto/lend-common.proto`

Shared enums and child message types.

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";

// --- Enums ---

enum LendProductType {
  LEND_PRODUCT_TYPE_UNSPECIFIED = 0;
  LEND_PRODUCT_TYPE_TERM_LOAN = 1;
  LEND_PRODUCT_TYPE_LINE_OF_CREDIT = 2;
  LEND_PRODUCT_TYPE_BRIDGE_LOAN = 3;
  LEND_PRODUCT_TYPE_EQUIPMENT_LOAN = 4;
  LEND_PRODUCT_TYPE_WORKING_CAPITAL = 5;
  LEND_PRODUCT_TYPE_SBA_LOAN = 6;
}

enum LendProductStatus {
  LEND_PRODUCT_STATUS_UNSPECIFIED = 0;
  LEND_PRODUCT_STATUS_DRAFT = 1;
  LEND_PRODUCT_STATUS_ACTIVE = 2;
  LEND_PRODUCT_STATUS_DISCONTINUED = 3;
}

enum LendInterestType {
  LEND_INTEREST_TYPE_UNSPECIFIED = 0;
  LEND_INTEREST_TYPE_FIXED = 1;
  LEND_INTEREST_TYPE_VARIABLE = 2;
  LEND_INTEREST_TYPE_HYBRID = 3;
}

enum LendFrequency {
  LEND_FREQUENCY_UNSPECIFIED = 0;
  LEND_FREQUENCY_WEEKLY = 1;
  LEND_FREQUENCY_BIWEEKLY = 2;
  LEND_FREQUENCY_MONTHLY = 3;
  LEND_FREQUENCY_QUARTERLY = 4;
  LEND_FREQUENCY_ANNUALLY = 5;
}

enum LendApplicationStatus {
  LEND_APPLICATION_STATUS_UNSPECIFIED = 0;
  LEND_APPLICATION_STATUS_DRAFT = 1;
  LEND_APPLICATION_STATUS_SUBMITTED = 2;
  LEND_APPLICATION_STATUS_UNDER_REVIEW = 3;
  LEND_APPLICATION_STATUS_APPROVED = 4;
  LEND_APPLICATION_STATUS_DENIED = 5;
  LEND_APPLICATION_STATUS_WITHDRAWN = 6;
}

enum LoanStatus {
  LOAN_STATUS_UNSPECIFIED = 0;
  LOAN_STATUS_PENDING = 1;
  LOAN_STATUS_ACTIVE = 2;
  LOAN_STATUS_DELINQUENT = 3;
  LOAN_STATUS_DEFAULT = 4;
  LOAN_STATUS_PAID_OFF = 5;
  LOAN_STATUS_CLOSED = 6;
  LOAN_STATUS_RESTRUCTURED = 7;
}

enum CreditLineStatus {
  CREDIT_LINE_STATUS_UNSPECIFIED = 0;
  CREDIT_LINE_STATUS_PENDING = 1;
  CREDIT_LINE_STATUS_ACTIVE = 2;
  CREDIT_LINE_STATUS_FROZEN = 3;
  CREDIT_LINE_STATUS_CLOSED = 4;
  CREDIT_LINE_STATUS_EXPIRED = 5;
}

enum LendPaymentStatus {
  LEND_PAYMENT_STATUS_UNSPECIFIED = 0;
  LEND_PAYMENT_STATUS_SCHEDULED = 1;
  LEND_PAYMENT_STATUS_RECEIVED = 2;
  LEND_PAYMENT_STATUS_APPLIED = 3;
  LEND_PAYMENT_STATUS_REVERSED = 4;
  LEND_PAYMENT_STATUS_FAILED = 5;
}

enum LendPaymentMethod {
  LEND_PAYMENT_METHOD_UNSPECIFIED = 0;
  LEND_PAYMENT_METHOD_ACH = 1;
  LEND_PAYMENT_METHOD_WIRE = 2;
  LEND_PAYMENT_METHOD_CHECK = 3;
  LEND_PAYMENT_METHOD_CASH = 4;
  LEND_PAYMENT_METHOD_AUTO_DEBIT = 5;
}

enum LendCollateralType {
  LEND_COLLATERAL_TYPE_UNSPECIFIED = 0;
  LEND_COLLATERAL_TYPE_REAL_ESTATE = 1;
  LEND_COLLATERAL_TYPE_EQUIPMENT = 2;
  LEND_COLLATERAL_TYPE_INVENTORY = 3;
  LEND_COLLATERAL_TYPE_ACCOUNTS_RECEIVABLE = 4;
  LEND_COLLATERAL_TYPE_VEHICLE = 5;
  LEND_COLLATERAL_TYPE_SECURITIES = 6;
  LEND_COLLATERAL_TYPE_CASH_DEPOSIT = 7;
  LEND_COLLATERAL_TYPE_OTHER = 8;
}

enum LendCollateralStatus {
  LEND_COLLATERAL_STATUS_UNSPECIFIED = 0;
  LEND_COLLATERAL_STATUS_PLEDGED = 1;
  LEND_COLLATERAL_STATUS_RELEASED = 2;
  LEND_COLLATERAL_STATUS_SEIZED = 3;
  LEND_COLLATERAL_STATUS_LIQUIDATED = 4;
}

enum LendFeeType {
  LEND_FEE_TYPE_UNSPECIFIED = 0;
  LEND_FEE_TYPE_ORIGINATION = 1;
  LEND_FEE_TYPE_LATE_PAYMENT = 2;
  LEND_FEE_TYPE_PREPAYMENT_PENALTY = 3;
  LEND_FEE_TYPE_SERVICE = 4;
  LEND_FEE_TYPE_NSF = 5;
  LEND_FEE_TYPE_APPRAISAL = 6;
  LEND_FEE_TYPE_OTHER = 7;
}

enum LendDisbursementStatus {
  LEND_DISBURSEMENT_STATUS_UNSPECIFIED = 0;
  LEND_DISBURSEMENT_STATUS_PENDING = 1;
  LEND_DISBURSEMENT_STATUS_COMPLETED = 2;
  LEND_DISBURSEMENT_STATUS_FAILED = 3;
  LEND_DISBURSEMENT_STATUS_REVERSED = 4;
}

// --- Child Message Types ---

message LoanDisbursement {
  string disbursement_id = 1;
  l8common.Money amount = 2;
  int64 disbursement_date = 3;
  LendDisbursementStatus status = 4;
  string bank_account_id = 5;
  string reference_number = 6;
  string notes = 7;
}

message LoanFee {
  string fee_id = 1;
  LendFeeType fee_type = 2;
  l8common.Money amount = 3;
  int64 assessed_date = 4;
  int64 paid_date = 5;
  bool is_paid = 6;
  string description = 7;
}

message LoanAmortizationLine {
  int32 period_number = 1;
  int64 due_date = 2;
  l8common.Money payment_amount = 3;
  l8common.Money principal_amount = 4;
  l8common.Money interest_amount = 5;
  l8common.Money remaining_balance = 6;
  bool is_paid = 7;
}

message CreditLineDrawdown {
  string drawdown_id = 1;
  l8common.Money amount = 2;
  int64 drawdown_date = 3;
  string purpose = 4;
  string reference_number = 5;
}

message CreditLineRepayment {
  string repayment_id = 1;
  l8common.Money amount = 2;
  int64 repayment_date = 3;
  string reference_number = 4;
}

message ApplicationDocument {
  string document_id = 1;
  string document_name = 2;
  string document_type = 3;
  string storage_path = 4;
  string file_name = 5;
  int64 file_size = 6;
  string mime_type = 7;
  string checksum = 8;
  int64 uploaded_date = 9;
}

message PaymentAllocation {
  string allocation_id = 1;
  l8common.Money principal = 2;
  l8common.Money interest = 3;
  l8common.Money fees = 4;
  l8common.Money escrow = 5;
}

message CollateralValuation {
  string valuation_id = 1;
  l8common.Money appraised_value = 2;
  int64 valuation_date = 3;
  string appraiser = 4;
  string notes = 5;
}
```

### File: `proto/lend-products.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message LendProduct {
  string product_id = 1;
  string product_code = 2;
  string name = 3;
  string description = 4;
  LendProductType product_type = 5;
  LendProductStatus status = 6;
  LendInterestType interest_type = 7;
  double base_interest_rate = 8;
  double max_interest_rate = 9;
  double min_interest_rate = 10;
  l8common.Money min_loan_amount = 11;
  l8common.Money max_loan_amount = 12;
  int32 min_term_months = 13;
  int32 max_term_months = 14;
  LendFrequency payment_frequency = 15;
  double origination_fee_pct = 16;
  double late_fee_pct = 17;
  int32 grace_period_days = 18;
  bool prepayment_penalty = 19;
  bool collateral_required = 20;
  double min_credit_score = 21;
  string gl_receivable_account_id = 22;
  string gl_interest_income_account_id = 23;
  string gl_fee_income_account_id = 24;
  string currency_id = 25;
  bool is_active = 26;
  l8common.AuditInfo audit_info = 30;
  map<string, string> custom_fields = 31;
}

message LendProductList {
  repeated LendProduct list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### File: `proto/lend-applications.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message LendApplication {
  string application_id = 1;
  string application_number = 2;
  string product_id = 3;
  string customer_id = 4;
  l8common.Money requested_amount = 5;
  int32 requested_term_months = 6;
  string purpose = 7;
  LendApplicationStatus status = 8;
  int64 application_date = 9;
  int64 review_date = 10;
  int64 decision_date = 11;
  string loan_officer_id = 12;
  string reviewer_id = 13;
  double proposed_interest_rate = 14;
  l8common.Money approved_amount = 15;
  int32 approved_term_months = 16;
  double credit_score = 17;
  double debt_to_income_ratio = 18;
  string denial_reason = 19;
  string notes = 20;
  repeated ApplicationDocument documents = 21;
  l8common.AuditInfo audit_info = 30;
  map<string, string> custom_fields = 31;
}

message LendApplicationList {
  repeated LendApplication list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### File: `proto/lend-loans.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message Loan {
  string loan_id = 1;
  string loan_number = 2;
  string product_id = 3;
  string application_id = 4;
  string customer_id = 5;
  LoanStatus status = 6;
  l8common.Money original_amount = 7;
  l8common.Money outstanding_principal = 8;
  l8common.Money outstanding_interest = 9;
  l8common.Money outstanding_fees = 10;
  l8common.Money total_balance = 11;
  double interest_rate = 12;
  LendInterestType interest_type = 13;
  LendFrequency payment_frequency = 14;
  l8common.Money payment_amount = 15;
  int32 term_months = 16;
  int64 origination_date = 17;
  int64 maturity_date = 18;
  int64 first_payment_date = 19;
  int64 next_payment_date = 20;
  int64 last_payment_date = 21;
  int32 payments_made = 22;
  int32 payments_remaining = 23;
  int32 days_past_due = 24;
  string loan_officer_id = 25;
  string bank_account_id = 26;
  string gl_receivable_account_id = 27;
  string currency_id = 28;
  repeated LoanDisbursement disbursements = 40;
  repeated LoanFee fees = 41;
  repeated LoanAmortizationLine amortization_schedule = 42;
  l8common.AuditInfo audit_info = 50;
  map<string, string> custom_fields = 51;
}

message LoanList {
  repeated Loan list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### File: `proto/lend-creditlines.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message CreditLine {
  string credit_line_id = 1;
  string credit_line_number = 2;
  string product_id = 3;
  string application_id = 4;
  string customer_id = 5;
  CreditLineStatus status = 6;
  l8common.Money credit_limit = 7;
  l8common.Money available_balance = 8;
  l8common.Money outstanding_balance = 9;
  l8common.Money accrued_interest = 10;
  double interest_rate = 11;
  LendInterestType interest_type = 12;
  LendFrequency payment_frequency = 13;
  l8common.Money minimum_payment = 14;
  int64 opening_date = 15;
  int64 expiration_date = 16;
  int64 next_payment_date = 17;
  int64 last_activity_date = 18;
  int32 days_past_due = 19;
  string loan_officer_id = 20;
  string bank_account_id = 21;
  string gl_receivable_account_id = 22;
  string currency_id = 23;
  repeated CreditLineDrawdown drawdowns = 40;
  repeated CreditLineRepayment repayments = 41;
  l8common.AuditInfo audit_info = 50;
  map<string, string> custom_fields = 51;
}

message CreditLineList {
  repeated CreditLine list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### File: `proto/lend-payments.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message LendPayment {
  string payment_id = 1;
  string payment_number = 2;
  string loan_id = 3;
  string credit_line_id = 4;
  string customer_id = 5;
  LendPaymentStatus status = 6;
  l8common.Money amount = 7;
  int64 payment_date = 8;
  int64 due_date = 9;
  LendPaymentMethod payment_method = 10;
  string reference_number = 11;
  string bank_account_id = 12;
  bool is_extra_payment = 13;
  bool is_late = 14;
  l8common.Money late_fee = 15;
  string notes = 16;
  repeated PaymentAllocation allocations = 40;
  l8common.AuditInfo audit_info = 50;
  map<string, string> custom_fields = 51;
}

message LendPaymentList {
  repeated LendPayment list = 1;
  l8api.L8MetaData metadata = 2;
}
```

### File: `proto/lend-collateral.proto`

```protobuf
syntax = "proto3";
package erp;
option go_package = "github.com/saichler/l8erp/go/types/lend";
import "api.proto";
import "common.proto";
import "lend-common.proto";

message LendCollateral {
  string collateral_id = 1;
  string loan_id = 2;
  string credit_line_id = 3;
  string customer_id = 4;
  string name = 5;
  string description = 6;
  LendCollateralType collateral_type = 7;
  LendCollateralStatus status = 8;
  l8common.Money pledged_value = 9;
  l8common.Money current_value = 10;
  string serial_number = 11;
  string location = 12;
  string insurance_policy = 13;
  int64 pledge_date = 14;
  int64 release_date = 15;
  int64 last_valuation_date = 16;
  string notes = 17;
  repeated CollateralValuation valuations = 40;
  l8common.AuditInfo audit_info = 50;
  map<string, string> custom_fields = 51;
}

message LendCollateralList {
  repeated LendCollateral list = 1;
  l8api.L8MetaData metadata = 2;
}
```

---

## UI Design

### Section: `lending`

### Sub-Modules and Services

| Sub-Module | Key | Services |
|-----------|-----|----------|
| **Products** | `products` | Loan Products |
| **Origination** | `origination` | Applications |
| **Loans** | `loans` | Loans, Credit Lines |
| **Payments** | `payments` | Payments, Collateral |

### View Types

| Service | Views |
|---------|-------|
| Loan Products | table |
| Applications | table, kanban (by status) |
| Loans | table, chart (amount by status) |
| Credit Lines | table |
| Payments | table, calendar (by due date), chart (payments over time) |
| Collateral | table |

---

## Go Services

### Directory Structure

```
go/erp/lend/
├── common/
│   └── defaults.go              # PREFIX, ServiceArea=130
├── lendproducts/
│   ├── LendProductService.go
│   └── LendProductServiceCallback.go
├── lendapplications/
│   ├── LendApplicationService.go
│   └── LendApplicationServiceCallback.go
├── loans/
│   ├── LoanService.go
│   └── LoanServiceCallback.go
├── creditlines/
│   ├── CreditLineService.go
│   └── CreditLineServiceCallback.go
├── lendpayments/
│   ├── LendPaymentService.go
│   └── LendPaymentServiceCallback.go
└── lendcollateral/
    ├── LendCollateralService.go
    └── LendCollateralServiceCallback.go
```

### Service Activation (go/erp/services/)

Create `activate_lend.go` with `collectLendActivations()` following the existing collector pattern, then register it in `activate_all.go`'s `ActivateAllServices()`:

```go
// activate_lend.go
func collectLendActivations(creds, dbname string, nic ifs.IVNic) []func() {
    return []func(){
        func() { lendproducts.Activate(creds, dbname, nic) },
        func() { lendapplications.Activate(creds, dbname, nic) },
        func() { loans.Activate(creds, dbname, nic) },
        func() { creditlines.Activate(creds, dbname, nic) },
        func() { lendpayments.Activate(creds, dbname, nic) },
        func() { lendcollateral.Activate(creds, dbname, nic) },
    }
}
```

### Type Registration (go/erp/ui/)

Create `shared_lend.go` with `registerLendTypes(resources)`, then call it from `RegisterTypes()` in `shared.go`:

```go
// shared_lend.go
func registerLendTypes(resources ifs.IResources) {
    common.RegisterType(resources, &lend.LendProduct{}, &lend.LendProductList{}, "ProductId")
    common.RegisterType(resources, &lend.LendApplication{}, &lend.LendApplicationList{}, "ApplicationId")
    common.RegisterType(resources, &lend.Loan{}, &lend.LoanList{}, "LoanId")
    common.RegisterType(resources, &lend.CreditLine{}, &lend.CreditLineList{}, "CreditLineId")
    common.RegisterType(resources, &lend.LendPayment{}, &lend.LendPaymentList{}, "PaymentId")
    common.RegisterType(resources, &lend.LendCollateral{}, &lend.LendCollateralList{}, "CollateralId")
}
```

### Service Definitions

| Package | ServiceName | PrimaryKey | Validation |
|---------|-------------|------------|------------|
| `lendproducts` | `LendProd` | `productId` | name, productType, status required |
| `lendapplications` | `LendAppl` | `applicationId` | productId, customerId, requestedAmount required |
| `loans` | `Loan` | `loanId` | customerId, productId, originalAmount, termMonths required |
| `creditlines` | `CrdtLine` | `creditLineId` | customerId, creditLimit required |
| `lendpayments` | `LendPmt` | `paymentId` | loanId or creditLineId, amount, paymentDate required |
| `lendcollateral` | `LendCltrl` | `collateralId` | loanId or creditLineId, name, collateralType required |

All callbacks use `NewValidation[T]().Require(...).Build()` pattern (ValidationBuilder — pre-existing in codebase across 319 files; uses Go generics which conflicts with `no-go-generics.md` rule but is the established codebase convention).

---

## UI Files

### Desktop (`go/erp/ui/web/lending/`)

| File | Purpose |
|------|---------|
| `lending-section-config.js` | **Section config** — `Layer8SectionConfigs.register('lending', {...})` with title, subtitle, icon, svgContent, initFn, modules array (each with `isDefault` markers) |
| `lending-config.js` | Module config — `Layer8ModuleConfigFactory.create({namespace: 'Lend', ...})` |
| `products/products-enums.js` | Enums for LendProduct |
| `products/products-columns.js` | Column defs for LendProduct |
| `products/products-forms.js` | Form defs for LendProduct |
| `origination/origination-enums.js` | Enums for LendApplication |
| `origination/origination-columns.js` | Column defs for LendApplication |
| `origination/origination-forms.js` | Form defs for LendApplication |
| `loans/loans-enums.js` | Enums for Loan, CreditLine |
| `loans/loans-columns.js` | Column defs for Loan, CreditLine |
| `loans/loans-forms.js` | Form defs for Loan, CreditLine |
| `payments/payments-enums.js` | Enums for LendPayment, LendCollateral |
| `payments/payments-columns.js` | Column defs for LendPayment, LendCollateral |
| `payments/payments-forms.js` | Form defs for LendPayment, LendCollateral |
| `lending-init.js` | Factory init call |

### Default Selections

- **Default sub-module**: `products` (`isDefault: true`)
- **Default service per sub-module**: `loan-products` (products), `applications` (origination), `loans` (loans), `payments` (payments)
- **`lending-init.js`**: `defaultModule: 'products'`, `sectionSelector: 'products'` (must match per `module-init-section-selector.md`)

### SVG Template

Register a lending SVG template in `erp-ui/erp-svg-templates.js`:
```js
Layer8SvgFactory.registerTemplate('lending', function(color) { /* lending-themed SVG */ });
```
Referenced in section-config as: `svgContent: Layer8SvgFactory.get('lending', '#0ea5e9')`

### Mobile (`go/erp/ui/web/m/js/lending/`)

Same enum/column/form files with `MobileLend*` namespaces, plus `lending-index.js` registry.

### Section HTML (`go/erp/ui/web/sections/lending.html`)

Uses `Layer8SectionGenerator.generate('lending')` (same pattern as CRM, PRJ, etc.).

### Wiring

- `sections.js`: Add `lending: 'sections/lending.html'` and `lending: () => { if (typeof initializeLend === 'function') initializeLend(); }`
- `go/erp/ui/shared_lend.go`: Create `registerLendTypes()` (see Go Services section above)
- `go/erp/ui/shared.go`: Call `registerLendTypes(resources)` from `RegisterTypes()`
- `go/erp/services/activate_lend.go`: Create `collectLendActivations()` (see Go Services section above)
- `go/erp/services/activate_all.go`: Add `all = append(all, collectLendActivations(...)...)`
- Reference registries: Add entries for all 6 Prime Objects (desktop + mobile)
- `erp-ui/erp-svg-templates.js`: Register `lending` SVG template

### Desktop `app.html` Script Loading Order

Scripts must be added in this exact order (per `desktop-script-loading-order.md`):

```html
<!-- Lending: Section Config (before module config) -->
<script src="lending/lending-section-config.js"></script>
<!-- Lending: Module Config -->
<script src="lending/lending-config.js"></script>
<!-- Lending: Sub-module data (enums, columns, forms per sub-module) -->
<script src="lending/products/products-enums.js"></script>
<script src="lending/products/products-columns.js"></script>
<script src="lending/products/products-forms.js"></script>
<script src="lending/origination/origination-enums.js"></script>
<script src="lending/origination/origination-columns.js"></script>
<script src="lending/origination/origination-forms.js"></script>
<script src="lending/loans/loans-enums.js"></script>
<script src="lending/loans/loans-columns.js"></script>
<script src="lending/loans/loans-forms.js"></script>
<script src="lending/payments/payments-enums.js"></script>
<script src="lending/payments/payments-columns.js"></script>
<script src="lending/payments/payments-forms.js"></script>
<!-- Lending: Init (after all data files) -->
<script src="lending/lending-init.js"></script>
```

### Mobile `m/app.html` Script Loading Order

```html
<script src="js/lending/products-enums.js"></script>
<script src="js/lending/products-columns.js"></script>
<script src="js/lending/products-forms.js"></script>
<script src="js/lending/origination-enums.js"></script>
<script src="js/lending/origination-columns.js"></script>
<script src="js/lending/origination-forms.js"></script>
<script src="js/lending/loans-enums.js"></script>
<script src="js/lending/loans-columns.js"></script>
<script src="js/lending/loans-forms.js"></script>
<script src="js/lending/payments-enums.js"></script>
<script src="js/lending/payments-columns.js"></script>
<script src="js/lending/payments-forms.js"></script>
<script src="js/lending/lending-index.js"></script>
```

---

## Mock Data

### Store Fields (`go/tests/mocks/store.go`)

```go
// Lending (Phase: after FIN + HCM)
LendProductIDs      []string
LendApplicationIDs  []string
LoanIDs             []string
CreditLineIDs       []string
LendPaymentIDs      []string
LendCollateralIDs   []string
```

### Generator Files

| File | Entities | Dependencies |
|------|----------|-------------|
| `gen_lend_products.go` | LendProduct | CurrencyIDs |
| `gen_lend_origination.go` | LendApplication | LendProductIDs, CustomerIDs, EmployeeIDs |
| `gen_lend_loans.go` | Loan, CreditLine | LendProductIDs, LendApplicationIDs, CustomerIDs, EmployeeIDs, BankAccountIDs |
| `gen_lend_payments.go` | LendPayment, LendCollateral | LoanIDs, CreditLineIDs, CustomerIDs |

### Phase Order

Lending runs after FIN + HCM (needs CustomerIDs, EmployeeIDs, CurrencyIDs, BankAccountIDs).

```
Phase 1: Products (no cross-module deps beyond CurrencyIDs)
Phase 2: Applications (needs ProductIDs, CustomerIDs, EmployeeIDs)
Phase 3: Loans + Credit Lines (needs ApplicationIDs)
Phase 4: Payments + Collateral (needs LoanIDs, CreditLineIDs)
```

### Data Volumes

| Entity | Count | Notes |
|--------|-------|-------|
| LendProduct | 8 | Product templates |
| LendApplication | 50 | Mixed statuses (40% approved, 20% under review, etc.) |
| Loan | 30 | Subset of approved applications |
| CreditLine | 15 | Subset of approved applications |
| LendPayment | 200 | Multiple per loan, varying statuses |
| LendCollateral | 25 | Subset of loans that require collateral |

---

## Implementation Phases

### Phase 1: Protobuf + Go Services

1. Create 6 proto files under `proto/`
2. Update `make-bindings.sh` to include new proto files
3. **Pre-flight check**: Verify `make-bindings.sh` uses `-i` (not `-it`) on all `docker run` commands (per `protobuf-generation.md`). Fix if needed.
4. Run `cd proto && ./make-bindings.sh` to generate `go/types/lend/*.pb.go`
5. Create `go/erp/lend/common/defaults.go` with `ServiceArea = byte(130)`
6. Create all 6 service + callback file pairs (each service has `Activate()` calling `common.ActivateService()`)
7. Create `go/erp/services/activate_lend.go` with `collectLendActivations()` — register in `activate_all.go`
8. Create `go/erp/ui/shared_lend.go` with `registerLendTypes()` — call from `RegisterTypes()` in `shared.go`
9. Build and verify: `go build ./...`

### Phase 2: Desktop UI

1. Create `go/erp/ui/web/lending/` directory structure (with `products/`, `origination/`, `loans/`, `payments/` subdirectories)
2. Register lending SVG template in `erp-ui/erp-svg-templates.js`
3. Create `lending-section-config.js` with `Layer8SectionConfigs.register('lending', {...})` — include `isDefault: true` on `products` module and first service of each module
4. Create `lending-config.js` with `Layer8ModuleConfigFactory.create({namespace: 'Lend', ...})`
5. Create per-sub-module enums, columns, forms (4 sub-modules x 3 files = 12 files)
6. Create `lending-init.js` with `Layer8DModuleFactory.create({..., defaultModule: 'products', sectionSelector: 'products', ...})`
7. Create `sections/lending.html` with `Layer8SectionGenerator.generate('lending')`
8. Create `js/reference-data/reference-data-lend.js` and `js/reference-registry-lend.js`
9. Update `sections.js` with lending entry
10. Update `app.html` with all script tags in the exact order specified in the Wiring section above (section-config → config → enums → columns → forms per sub-module → init)
11. Verify: `node -c` all JS files

### Phase 3: Mobile UI

1. Create `m/js/lending/` directory structure
2. Create mobile enums, columns, forms (12 files with `MobileLend*` namespaces)
3. Create `lending-index.js` with `Layer8MModuleRegistry.create('MobileLend', ...)`
4. Create `erp-ui/m/reference-registries/layer8m-reference-registry-lend.js`
5. Add lending to nav config (add to `layer8m-nav-config-prj-other.js` or a new `layer8m-nav-config-lend.js`)
6. Register `MobileLend` in `layer8m-nav-data.js` lookup arrays (`_getServiceColumns`, `_getServiceFormDef`, `_getServiceTransformData`)
7. Update `m/app.html` with script tags in the exact order specified in the Wiring section above
8. Verify: `node -c` all JS files

### Phase 4: Mock Data

1. Add lending data arrays to `data.go` (product names, loan purposes, collateral descriptions, etc.)
2. Add ID slices to `store.go` (6 slices under `// Lending` comment block)
3. Create 4 generator files (`gen_lend_products.go`, `gen_lend_origination.go`, `gen_lend_loans.go`, `gen_lend_payments.go`)
4. **Verify mock endpoints**: Cross-reference every `client.post("/erp/130/...")` URL against the ServiceName constants (per `mock-endpoint-construction.md`): `LendProd`, `LendAppl`, `Loan`, `CrdtLine`, `LendPmt`, `LendCltrl`
5. Create `lend_phases.go` with `runLendPhases()` orchestration using `runPhase()` helper
6. Update `main_phases.go` — add `runLendPhases(client, store)` after FIN + HCM phases
7. Build and verify: `go build ./tests/mocks/cmd/`

### Phase 5: Integration Tests

Create integration tests in `go/tests/` (per `test-location-and-approach.md` — tests MUST be in `go/tests/`, NOT alongside source):

1. Create `go/tests/lend_test.go` (or split by entity if approaching 500 lines)
2. Tests exercise the system API via HTTP (POST/GET/PUT/DELETE through IVNic endpoints)
3. Test CRUD for all 6 services:
   - POST creates entity, verify response has auto-generated ID
   - GET retrieves entity by ID, verify all fields populated
   - PUT updates entity, verify changes persisted
   - DELETE removes entity, verify 404 on subsequent GET
4. Test cross-references: create a Loan referencing a valid Customer/Product, verify references resolve
5. Test validation: POST with missing required fields, verify 400 response
6. **Verify test data fields against `.pb.go`** before writing any `map[string]interface{}` (per `test-data-field-verification.md`)
7. Build and run: `go test ./tests/... -run TestLend -v`

### Phase 6: End-to-End Verification

For every service (desktop AND mobile):
1. Navigate to the lending section
2. Verify all 4 sub-module tabs render
3. Verify each service table loads data (not blank)
4. Verify row click opens detail popup with populated fields
5. Verify Add/Edit/Delete CRUD operations
6. Verify inline tables (disbursements, fees, amortization, drawdowns, documents, allocations, valuations)
7. Verify reference pickers resolve (Customer, Employee, Product, etc.)
8. Verify kanban view for Applications (by status)
9. Verify chart views for Loans and Payments
10. Verify calendar view for Payments (by due date)
11. Verify lending section appears in SYS module management UI (Layer8DModuleFilter)
12. Verify lending section can be enabled/disabled via module toggle

---

## Traceability Matrix

| # | Item | Phase |
|---|------|-------|
| 1 | Proto files (6) + make-bindings | Phase 1 |
| 2 | make-bindings.sh `-i` vs `-it` check | Phase 1 |
| 3 | Go services (6 pairs) | Phase 1 |
| 4 | `activate_lend.go` + `activate_all.go` wiring | Phase 1 |
| 5 | `shared_lend.go` + `shared.go` type registration | Phase 1 |
| 6 | SVG template registration in `erp-svg-templates.js` | Phase 2 |
| 7 | `lending-section-config.js` (Layer8SectionConfigs) | Phase 2 |
| 8 | `lending-config.js` (Layer8ModuleConfigFactory) | Phase 2 |
| 9 | Desktop enums (4 files) | Phase 2 |
| 10 | Desktop columns (4 files) | Phase 2 |
| 11 | Desktop forms (4 files) | Phase 2 |
| 12 | `lending-init.js` (sectionSelector = defaultModule = 'products') | Phase 2 |
| 13 | Section HTML (`sections/lending.html`) | Phase 2 |
| 14 | Desktop reference registry (`reference-data-lend.js` + `reference-registry-lend.js`) | Phase 2 |
| 15 | `sections.js` wiring | Phase 2 |
| 16 | `app.html` script tags (exact order: section-config → config → data files → init) | Phase 2 |
| 17 | Mobile enums (4 files) | Phase 3 |
| 18 | Mobile columns (4 files) | Phase 3 |
| 19 | Mobile forms (4 files) | Phase 3 |
| 20 | Mobile registry index (`lending-index.js`) | Phase 3 |
| 21 | Mobile reference registry (`layer8m-reference-registry-lend.js`) | Phase 3 |
| 22 | Nav config entry (module + subModules + services) | Phase 3 |
| 23 | Nav data registration (`_getServiceColumns`, etc.) | Phase 3 |
| 24 | `m/app.html` script tags (exact order) | Phase 3 |
| 25 | Mock data arrays in `data.go` | Phase 4 |
| 26 | Mock store ID slices in `store.go` | Phase 4 |
| 27 | Mock generators (4 files) | Phase 4 |
| 28 | Mock endpoint verification (ServiceName vs URL) | Phase 4 |
| 29 | `lend_phases.go` + `main_phases.go` wiring | Phase 4 |
| 30 | Integration tests in `go/tests/` (CRUD + validation) | Phase 5 |
| 31 | Test data field verification against `.pb.go` | Phase 5 |
| 32 | E2E verification all services (desktop + mobile) | Phase 6 |
| 33 | Kanban view (Applications) | Phase 6 |
| 34 | Chart views (Loans, Payments) | Phase 6 |
| 35 | Calendar view (Payments) | Phase 6 |
| 36 | Inline table editing (disbursements, fees, amortization, etc.) | Phase 6 |
| 37 | Reference picker resolution (Customer, Employee, Product, etc.) | Phase 6 |
| 38 | Module filter visibility (SYS module management) | Phase 6 |

---

## Compliance Checklist

### Protobuf Design (`proto-enum-zero-value.md`, `proto-list-convention.md`, `prime-object-references.md`)
- [x] Enum zero values are UNSPECIFIED
- [x] List types use `repeated X list = 1` + `l8api.L8MetaData metadata = 2`
- [x] No direct struct references between Prime Objects (ID refs only)
- [x] Child types embedded as `repeated` in parent
- [x] `make-bindings.sh` `-i` flag verified before running (`protobuf-generation.md`)

### Service Design (`maintainability.md`, `security-provider-interface.md`)
- [x] ServiceName <= 10 characters (LendProd=8, LendAppl=8, Loan=4, CrdtLine=8, LendPmt=7, LendCltrl=9)
- [x] ServiceArea consistent (all 130)
- [x] Callbacks auto-generate ID on POST (`common.GenerateID`)
- [x] Types registered via `shared_lend.go` + `shared.go` (correct pattern)
- [x] Services activated via `activate_lend.go` + `activate_all.go` (correct pattern)
- [x] Security handled by `ISecurityProvider` (framework default — no custom auth)

### UI Design (`adding-module-desktop.md`, `adding-module-mobile.md`, `checklist.md`)
- [x] Desktop and mobile parity (both platforms have enums, columns, forms, registry)
- [x] Uses factory patterns (ModuleConfigFactory, ModuleFactory, EnumFactory, ColumnFactory, FormFactory)
- [x] `lending-section-config.js` registers with `Layer8SectionConfigs.register()` (was missing, now added)
- [x] Section HTML uses `Layer8SectionGenerator.generate('lending')`
- [x] `sectionSelector` matches `defaultModule` = `'products'` (`module-init-section-selector.md`)
- [x] `isDefault: true` markers on default module and services
- [x] SVG template registered in `erp-svg-templates.js`
- [x] CSS uses `--layer8d-*` tokens (no custom CSS needed) (`l8ui-theme-compliance.md`)
- [x] Child types use inline tables (disbursements, fees, etc.) (`prime-object-references.md` Rule 3)
- [x] Script loading order explicitly specified for both `app.html` and `m/app.html` (`desktop-script-loading-order.md`)
- [x] Reference registries for all 6 Prime Objects on both platforms (`reference-registry-completeness.md`)

### Mock Data (`mock-data-generation.md`, `mock-phase-ordering.md`, `mock-endpoint-construction.md`)
- [x] All 6 services have generators
- [x] Phase ordering respects cross-module deps (after FIN + HCM)
- [x] Non-zero values for all enum fields
- [x] Mock endpoints verified against ServiceName constants (`mock-endpoint-construction.md`)

### Testing (`test-location-and-approach.md`, `test-data-field-verification.md`)
- [x] Integration tests located in `go/tests/` (not alongside source)
- [x] Tests use system API (HTTP via IVNic), not internal functions
- [x] Test data fields verified against `.pb.go` files before use

### Code Quality (`maintainability.md`, `cleanup-test-binaries.md`)
- [x] All files planned to stay under 500 lines
- [x] Build verification uses `go build ./...` (no stray binaries)
- [x] No duplicate behavioral code (all logic in shared factories)

### Plan Structure (`plan-traceability-and-verification.md`, `plan-approval-workflow.md`)
- [x] Traceability matrix maps every gap to a phase
- [x] Final verification phase (Phase 6) with E2E checklist
- [x] Plan written to `./plans/` directory
- [x] Module filter visibility verified in Phase 6

### Known Exceptions
- [~] **Go generics** (`no-go-generics.md`): ValidationBuilder uses `NewValidation[T]()` which is a Go generic. This conflicts with the no-generics rule, but the pattern is pre-existing in the codebase (319 files, Phase 15 Tier 4). This plan follows the established codebase convention.

### Duplication Audit (`plan-duplication-audit.md`)

Desktop and mobile each get 4 enum + 4 column + 4 form files (24 total). The desktop/mobile pairs share ~95% identical content, differing only by namespace (`LendProducts` vs `MobileLendProducts`) and mobile-specific column markers (`primary`/`secondary`).

**This is NOT a rule violation** for two reasons:
1. `plan-duplication-audit.md` explicitly classifies enum definitions, column definitions, and form definitions as **configuration** (stays per-instance), not behavioral code. The rule targets duplicated behavioral logic (CRUD, navigation, rendering, fetch calls), all of which lives in shared factories.
2. The desktop/mobile file split is the established architecture across all 11 existing modules. Extracting shared enum/form data would require refactoring the entire codebase's desktop/mobile pattern — out of scope for adding one module.

All behavioral code in this plan is zero-duplication: `Layer8DModuleFactory.create()` (1 call), `Layer8MModuleRegistry.create()` (1 call), `Layer8SectionConfigs.register()` (1 call). No custom CRUD, navigation, or rendering logic.

### Implementation Notes

#### Amortization Schedule — Client-Side Paginated Table

The `Loan` form includes an `amortization_schedule` repeated field that can have up to 360 rows (30-year monthly loan). Rather than rendering all rows in an unpaginated inline table, the Loan detail popup should render the amortization schedule in a **separate tab** using a `Layer8DTable` with `serverSide: false` and `setData()` for client-side pagination. This follows the same pattern used by System Health. The amortization table is **read-only** — the schedule is computed by the server, not user-edited.

The tab should use deferred rendering (initialize the table on tab activation, not on popup open) per the hidden-container guidance in `platform-conversion-data-flow.md`.

#### Business Logic in Service Callbacks

The following business logic should be implemented in the service callbacks during Phase 1. These are implementation details, not structural plan items:

| Logic | Callback Location | Description |
|-------|-------------------|-------------|
| **Amortization computation** | `LoanServiceCallback.After(POST)` | Compute full amortization schedule from principal, rate, term; populate `amortization_schedule` |
| **Payment allocation** | `LendPaymentServiceCallback.After(POST)` | Split payment across principal/interest/fees; update `Loan.outstanding_*` balances |
| **Credit line balance** | `CreditLineServiceCallback.After(PUT)` | Recalculate `available_balance` and `outstanding_balance` when drawdowns/repayments change |
| **Delinquency tracking** | `LoanServiceCallback` or scheduled | Update `days_past_due` and transition `status` to DELINQUENT/DEFAULT based on missed payments |
