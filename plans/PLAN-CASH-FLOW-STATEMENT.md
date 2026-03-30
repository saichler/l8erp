# Plan: Cash Flow Statement

## Context

The Cash Flow Statement was deferred from the Data Export & Reporting plan because the existing FIN types lacked cash flow categorization (operating/investing/financing). This plan adds that categorization and implements the report using the **indirect method**, which is the standard approach under both GAAP and IFRS.

The indirect method derives cash flows from existing balance sheet and income statement data rather than tracking individual cash transactions. This means we do NOT need to tag every transaction — we compute cash flows from period-over-period balance changes on accounts that are already categorized by AccountType.

## Approach: Indirect Method

The indirect method builds the Cash Flow Statement from data that already exists:

1. **Operating Activities**: Start with Net Income (Revenue - Expenses from Income Statement), then adjust for:
   - Non-cash items: Accounts with `is_header=true` at certain levels can indicate depreciation/amortization
   - Working capital changes: Period-over-period balance changes on current asset and current liability accounts

2. **Investing Activities**: Period-over-period changes on long-term asset accounts (fixed assets, investments)

3. **Financing Activities**: Period-over-period changes on long-term liability and equity accounts (loans, equity, dividends)

### What's Missing

The only piece missing is a way to classify accounts into cash flow categories. Currently, `AccountType` has 5 values (Asset, Liability, Equity, Revenue, Expense), but there's no distinction between **current** vs **long-term** assets/liabilities. We need a `CashFlowCategory` field on `Account` to enable this classification.

---

## Phase 1: Proto Changes

### 1.1 Add CashFlowCategory enum to `proto/fin-common.proto`

```protobuf
enum CashFlowCategory {
  CASH_FLOW_CATEGORY_UNSPECIFIED = 0;
  CASH_FLOW_CATEGORY_OPERATING = 1;      // Current assets & liabilities, revenue, expense
  CASH_FLOW_CATEGORY_INVESTING = 2;      // Long-term assets (PP&E, investments)
  CASH_FLOW_CATEGORY_FINANCING = 3;      // Long-term liabilities, equity
  CASH_FLOW_CATEGORY_CASH = 4;           // Cash & cash equivalents (excluded from activities)
  CASH_FLOW_CATEGORY_NON_CASH = 5;       // Depreciation, amortization adjustments
}
```

### 1.2 Add field to Account in `proto/fin-general_ledger.proto`

Add after `level` (field 12):
```protobuf
CashFlowCategory cash_flow_category = 13;
```

### 1.3 Add enum value to FinReportType in `proto/fin-reports.proto`

```protobuf
FIN_REPORT_TYPE_CASH_FLOW_STATEMENT = 8;
```

### 1.4 Regenerate protobuf bindings

```bash
cd proto && ./make-bindings.sh
```

---

## Phase 2: Backend Report Generator

### 2.1 New file: `go/erp/fin/finreports/report_cash_flow.go`

Function: `generateCashFlowStatement(report *fin.FinReport, vnic ifs.IVNic) error`

Algorithm:
1. Fetch all active accounts with `common.GetEntities`
2. For each account, get the balance for `report.FiscalPeriodId` via `findBalance()`
3. Compute Net Income (sum of Revenue credit-debit, minus Expense debit-credit) — same logic as income statement
4. Group accounts by `CashFlowCategory`:
   - **OPERATING**: Net Income line + balance changes on OPERATING-categorized accounts
   - **INVESTING**: Balance changes on INVESTING-categorized accounts
   - **FINANCING**: Balance changes on FINANCING-categorized accounts
   - **CASH**: Opening and closing cash balances (for verification)
   - **NON_CASH**: Depreciation/amortization adjustments (added back to operating)
5. For each category, compute `period_change = ending_balance - beginning_balance`
   - Assets: increase = cash outflow (negative), decrease = cash inflow (positive)
   - Liabilities/Equity: increase = cash inflow (positive), decrease = cash outflow (negative)
6. Build 3 FinReportSections: "Operating Activities", "Investing Activities", "Financing Activities"
7. Grand total = Operating + Investing + Financing = Net Change in Cash
8. Verification line: should equal closing_cash - opening_cash

### 2.2 Update `FinReportServiceCallback.go`

Add case to `generateReport` switch:
```go
case fin.FinReportType_FIN_REPORT_TYPE_CASH_FLOW_STATEMENT:
    report.Title = "Cash Flow Statement"
    return generateCashFlowStatement(report, vnic)
```

### 2.3 Fallback for uncategorized accounts

If an account has `CASH_FLOW_CATEGORY_UNSPECIFIED`, apply a default mapping:
- `ACCOUNT_TYPE_REVENUE` / `ACCOUNT_TYPE_EXPENSE` -> Operating
- `ACCOUNT_TYPE_ASSET` -> Operating (conservative default for current assets)
- `ACCOUNT_TYPE_LIABILITY` -> Operating (conservative default for current liabilities)
- `ACCOUNT_TYPE_EQUITY` -> Financing

This ensures the report works even before users categorize all accounts. The fallback is imperfect (long-term assets default to operating) but safe — users can refine by setting `cash_flow_category` on their chart of accounts.

---

## Phase 3: UI Integration

### 3.1 Update `reports-enums.js`

Add `'Cash Flow Statement'` to the REPORT_TYPE enum (index 8 matching the proto enum value).

### 3.2 Update `reports-forms.js`

The existing report form already has a `reportType` select field. Adding the new enum value in 3.1 is sufficient — the form will show "Cash Flow Statement" as an option.

### 3.3 Update `reports-viewer.js`

The existing viewer renders FinReportSections generically (section title, indented lines, section totals, grand total). The Cash Flow Statement output follows this exact structure, so no viewer changes are needed — it will render correctly with the existing viewer.

### 3.4 Update Account forms

Add `cashFlowCategory` select field to the Account form definition in the General Ledger forms file, so users can categorize their chart of accounts.

---

## Phase 4: Mock Data

### 4.1 Update Account mock data

In `go/tests/mocks/gen_fin_foundation.go`, set `CashFlowCategory` on generated accounts based on the account's type and position:
- Cash/bank accounts -> `CASH_FLOW_CATEGORY_CASH`
- AR, Inventory, Prepaid -> `CASH_FLOW_CATEGORY_OPERATING`
- AP, Accrued liabilities -> `CASH_FLOW_CATEGORY_OPERATING`
- Fixed assets, Investments -> `CASH_FLOW_CATEGORY_INVESTING`
- Long-term debt, Equity -> `CASH_FLOW_CATEGORY_FINANCING`
- Depreciation accounts -> `CASH_FLOW_CATEGORY_NON_CASH`
- Revenue/Expense -> `CASH_FLOW_CATEGORY_OPERATING`

---

## Phase 5: End-to-End Verification

1. `cd proto && ./make-bindings.sh` — regenerate bindings
2. `cd go && go build ./...` — verify compilation
3. Verify Account struct has `CashFlowCategory` field in `.pb.go`
4. Verify FinReportType has `FIN_REPORT_TYPE_CASH_FLOW_STATEMENT = 8`
5. Verify `generateReport` dispatch includes the new case
6. Verify `reports-enums.js` includes the new report type
7. Verify Account form includes `cashFlowCategory` field

---

## Traceability Matrix

| # | Gap | Phase |
|---|-----|-------|
| 1 | No cash flow categorization enum | Phase 1.1 |
| 2 | Account has no cash_flow_category field | Phase 1.2 |
| 3 | No CASH_FLOW_STATEMENT report type | Phase 1.3 |
| 4 | No cash flow report generator | Phase 2.1 |
| 5 | Report dispatcher doesn't handle cash flow | Phase 2.2 |
| 6 | Uncategorized accounts need fallback | Phase 2.3 |
| 7 | UI report type selector missing cash flow | Phase 3.1 |
| 8 | Account form missing category field | Phase 3.4 |
| 9 | Mock accounts have no cash flow category | Phase 4.1 |

---

## Key Files to Modify/Create

| File | Action |
|------|--------|
| `proto/fin-common.proto` | Add CashFlowCategory enum |
| `proto/fin-general_ledger.proto` | Add cash_flow_category field to Account |
| `proto/fin-reports.proto` | Add CASH_FLOW_STATEMENT to FinReportType |
| `go/erp/fin/finreports/report_cash_flow.go` | **New** — report generator |
| `go/erp/fin/finreports/FinReportServiceCallback.go` | Add dispatch case |
| `go/erp/ui/web/fin/reports/reports-enums.js` | Add enum value |
| `go/erp/ui/web/fin/generalledger/generalledger-forms.js` | Add cashFlowCategory field |
| `go/tests/mocks/gen_fin_foundation.go` | Set CashFlowCategory on mock accounts |

---

## Design Decisions

1. **Indirect method over direct method**: The indirect method works with existing balance data. The direct method would require tracking every individual cash receipt and disbursement, which would need a fundamentally different data model.

2. **CashFlowCategory on Account, not on JournalEntry**: Categorizing at the account level (not transaction level) is simpler and matches how ERP systems typically implement this. All entries to an account inherit its cash flow classification.

3. **Fallback mapping for uncategorized accounts**: Rather than requiring all accounts to be categorized before the report works, we apply conservative defaults. This makes the feature immediately useful.

4. **Reuse FinReportSection/FinReportLine**: The existing report structure (sections with titled lines and money amounts) maps perfectly to the three-section cash flow statement. No new proto types needed for the report output.
