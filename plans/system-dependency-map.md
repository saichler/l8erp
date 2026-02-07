# ERP System Dependency Map

## Source of Truth

All dependency information is derived from the mock data generation system in `go/tests/mocks/`. The mock generator must create data in dependency order to satisfy server-side validation. This ordering IS the system's dependency tree.

---

## Section 1: Module Dependency Graph

### Execution Order

```
 ┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
 │ FIN (1-3)   │────▶│     HCM     │────▶│   FIN (4-9)     │
 │ Foundation  │     │ (all phases)│     │   Remaining     │
 └─────────────┘     └─────────────┘     └────────┬────────┘
       │                    │                      │
       │  CurrencyIDs       │  EmployeeIDs         │  VendorIDs
       │  CustomerIDs       │  ManagerIDs          │  CustomerIDs
       │  AccountIDs        │  DepartmentIDs       │  AccountIDs
       │                    │                      │
       │                    │              ┌───────▼────────┐
       │                    │              │      SCM       │
       │                    │              │  (Phases 1-8)  │
       │                    │              └───────┬────────┘
       │                    │                      │
       │                    │         ItemIDs      │  SCMWarehouseIDs
       │                    │         SCMCarrierIDs│  BinIDs
       │                    │                      │
       │                    │              ┌───────▼────────┐
       │                    │              │     Sales      │
       │                    │              │  (Phases 1-8)  │
       │                    │              └───────┬────────┘
       │                    │                      │
       │                    │         SalesOrderIDs│
       │                    │                      │
       │                    │              ┌───────▼────────┐
       │                    │              │      MFG       │
       │                    │              │  (Phases 1-7)  │
       │                    │              └────────────────┘
       │                    │
       │                    │              ┌────────────────┐
       │                    └─────────────▶│      CRM       │
       │                                   │  (Phases 1-9)  │
       │                                   └───────┬────────┘
       │                                           │
       │                              CrmAccountIDs│
       │                                           │
       │                                   ┌───────▼────────┐
       │                                   │      PRJ       │
       │                                   │  (Phases 1-8)  │
       │                                   └────────────────┘
       │
       │         ┌──────────────────────────────────────────┐
       └────────▶│  BI, DOC, ECOM, COMP (Phases 1-5 each)  │
                 │  (depend on HCM EmployeeIDs + FIN IDs)   │
                 └──────────────────────────────────────────┘
```

### Dependency Chain Summary

```
FIN(1-3) ◀──▶ HCM  (circular, resolved by splitting FIN)
    │
    ▼
FIN(4-9) ──▶ SCM ──▶ Sales ──▶ MFG
                │
                ├──▶ CRM ──▶ PRJ
                │
                ├──▶ BI
                ├──▶ DOC
                ├──▶ ECOM
                └──▶ COMP
```

---

## Section 2: Cross-Module Key Exports

These are ID slices produced by one module and consumed by other modules via `pickRef()` or direct index access.

### FIN Exports (ServiceArea 40)

| ID Slice | Entity | Produced In | Consumed By |
|---|---|---|---|
| `CurrencyIDs` | Currency | FIN Phase 1 | HCM (compensation, payroll), Sales (pricing, orders), MFG (costing, work centers), ECOM (customers, carts), PRJ (billing), COMP (controls) |
| `FiscalYearIDs` | FiscalYear | FIN Phase 1 | FIN Phase 2 (FiscalPeriods) |
| `AccountIDs` | Account | FIN Phase 2 | FIN (GL, budgets), Sales (billing/revenue) |
| `VendorIDs` | Vendor | FIN Phase 3 | SCM (procurement, purchase orders) |
| `CustomerIDs` | Customer | FIN Phase 3 | Sales (orders, quotations, contracts, shipping, billing), MFG (production orders), CRM (accounts), ECOM (orders, returns), SCM (logistics, returns), PRJ (projects, invoices) |
| `BankAccountIDs` | BankAccount | FIN Phase 3 | FIN (cash management) |
| `TaxCodeIDs` | TaxCode | FIN Phase 2 | FIN (tax rules, exemptions, invoices) |
| `TaxJurisdictionIDs` | TaxJurisdiction | FIN Phase 1 | FIN (tax rules, exemptions) |
| `AssetCategoryIDs` | AssetCategory | FIN Phase 1 | FIN (assets) |

### HCM Exports (ServiceArea 10)

| ID Slice | Entity | Produced In | Consumed By |
|---|---|---|---|
| `EmployeeIDs` | Employee | HCM Phase 3 | **ALL modules**: FIN (assets), SCM (implicit), Sales (salesperson), MFG (labor, operators, requesters), CRM (owners, assignees), PRJ (task assignees, resources), BI (report owners, executors), DOC (document owners, signers), ECOM (order processors), COMP (owners, assessors, auditors) |
| `ManagerIDs` | Employee (subset) | HCM Phase 3 | FIN (implicit), CRM (escalation), PRJ (approvers), COMP (escalation, approvers) |
| `DepartmentIDs` | Department | HCM Phase 2 | FIN (budgets, assets), PRJ (resource pools), DOC (folder owners), COMP (regulations, controls, incidents) |

### SCM Exports (ServiceArea 50)

| ID Slice | Entity | Produced In | Consumed By |
|---|---|---|---|
| `ItemIDs` | ScmItem | SCM Phase 2 | Sales (order lines, quotation lines, pricing), MFG (BOMs, work orders, production, quality, costing, planning) |
| `SCMWarehouseIDs` | ScmWarehouse | SCM Phase 1 | Sales (orders, shipping), MFG (production, shop floor), ECOM (orders), CRM (field service parts) |
| `SCMCarrierIDs` | ScmCarrier | SCM Phase 1 | Sales (shipping), SCM (logistics) |
| `BinIDs` | ScmBin | SCM Phase 2 | MFG (shop floor consumptions) |
| `SCMPurchaseOrderIDs` | ScmPurchaseOrder | SCM Phase 4 | SCM Phase 5 (receiving orders) |

### Sales Exports (ServiceArea 60)

| ID Slice | Entity | Produced In | Consumed By |
|---|---|---|---|
| `SalesOrderIDs` | SalesOrder | Sales Phase 5 | MFG (work orders, production orders) |

### CRM Exports (ServiceArea 80)

| ID Slice | Entity | Produced In | Consumed By |
|---|---|---|---|
| `CrmAccountIDs` | CrmAccount | CRM Phase 3 | PRJ (projects), CRM internal (leads, opportunities, service, field service, interactions, health scores, account plans) |
| `CrmContactIDs` | CrmContact | CRM Phase 3 | CRM internal (leads, service, field service, interactions) |
| `CrmLeadSourceIDs` | CrmLeadSource | CRM Phase 1 | CRM internal (accounts, leads, opportunities) |
| `CrmCampaignIDs` | CrmCampaign | CRM Phase 4 | CRM internal (leads, opportunities, campaign responses) |
| `CrmSLAIDs` | CrmSLA | CRM Phase 8 | CRM internal (cases, service, field service contracts) |

---

## Section 3: Per-Module Phase Dependency Trees

### FIN — Financial Management (ServiceArea 40)

```
FIN Phase 1: Foundation (NO dependencies)
  ├── CurrencyIDs          (Currency)
  ├── FiscalYearIDs        (FiscalYear)
  ├── AssetCategoryIDs     (AssetCategory)
  └── TaxJurisdictionIDs   (TaxJurisdiction)

FIN Phase 2: Core Financial
  ├── FiscalPeriodIDs      → FiscalYearIDs
  ├── AccountIDs           → CurrencyIDs
  └── TaxCodeIDs           → TaxJurisdictionIDs

FIN Phase 3: Entity Master
  ├── VendorIDs            → CurrencyIDs
  ├── VendorContactIDs     → VendorIDs
  ├── CustomerIDs          → CurrencyIDs
  ├── CustomerContactIDs   → CustomerIDs
  ├── BankAccountIDs       → CurrencyIDs
  └── ExchangeRateIDs      → CurrencyIDs

  ─── HCM runs here (needs CurrencyIDs, provides EmployeeIDs/DepartmentIDs) ───

FIN Phase 4: Configuration
  ├── TaxRuleIDs           → TaxCodeIDs, TaxJurisdictionIDs
  ├── TaxExemptionIDs      → TaxCodeIDs, TaxJurisdictionIDs
  ├── WHTaxConfigIDs       → TaxCodeIDs
  ├── BudgetIDs            → DepartmentIDs [HCM], FiscalYearIDs
  ├── BudgetLineIDs        → BudgetIDs, AccountIDs
  ├── BudgetTransferIDs    → BudgetIDs, AccountIDs
  ├── BudgetScenarioIDs    → BudgetIDs
  ├── CapExIDs             → DepartmentIDs [HCM], AccountIDs
  └── ForecastIDs          → AccountIDs, DepartmentIDs [HCM]

FIN Phase 5: AP Transactions
  ├── PurchaseInvoiceIDs      → VendorIDs, CurrencyIDs
  ├── PurchaseInvoiceLineIDs  → PurchaseInvoiceIDs, AccountIDs
  ├── PaymentScheduleIDs      → PurchaseInvoiceIDs
  ├── VendorPaymentIDs        → VendorIDs, BankAccountIDs
  ├── PaymentAllocationIDs    → VendorPaymentIDs, PurchaseInvoiceIDs
  └── VendorStatementIDs      → VendorIDs

FIN Phase 6: AR Transactions
  ├── SalesInvoiceIDs       → CustomerIDs, CurrencyIDs
  ├── SalesInvoiceLineIDs   → SalesInvoiceIDs, AccountIDs
  ├── CustomerPaymentIDs    → CustomerIDs, BankAccountIDs
  ├── PaymentAppIDs         → CustomerPaymentIDs, SalesInvoiceIDs
  ├── CreditMemoIDs         → CustomerIDs, SalesInvoiceIDs
  └── DunningLetterIDs      → CustomerIDs

FIN Phase 7: GL Transactions
  ├── JournalEntryIDs       → FiscalPeriodIDs, CurrencyIDs
  ├── JournalEntryLineIDs   → JournalEntryIDs, AccountIDs
  └── AccountBalanceIDs     → AccountIDs, FiscalPeriodIDs

FIN Phase 8: Cash & Assets
  ├── BankTransactionIDs    → BankAccountIDs
  ├── BankReconIDs          → BankAccountIDs
  ├── CashForecastIDs       → BankAccountIDs, CurrencyIDs
  ├── FundTransferIDs       → BankAccountIDs
  ├── PettyCashIDs          → EmployeeIDs [HCM], CurrencyIDs
  ├── AssetIDs              → AssetCategoryIDs, DepartmentIDs [HCM], EmployeeIDs [HCM]
  ├── DepreciationIDs       → AssetIDs
  ├── AssetDisposalIDs      → AssetIDs
  ├── AssetTransferIDs      → AssetIDs, DepartmentIDs [HCM]
  ├── AssetMaintenanceIDs   → AssetIDs
  └── AssetRevaluationIDs   → AssetIDs

FIN Phase 9: Tax Filing
  └── TaxReturnIDs          → TaxJurisdictionIDs, FiscalPeriodIDs
```

### HCM — Human Capital Management (ServiceArea 10)

```
HCM Phase 1: Foundation (external: CurrencyIDs [FIN])
  ├── JobFamilyIDs
  ├── CarrierIDs
  ├── CertificationIDs
  └── SkillIDs

HCM Phase 2: Core Organizational
  ├── OrganizationIDs
  ├── JobIDs               → JobFamilyIDs
  ├── DepartmentIDs        → OrganizationIDs
  └── PositionIDs          → DepartmentIDs, JobIDs

HCM Phase 3: Employees & Config
  ├── EmployeeIDs          → PositionIDs, DepartmentIDs
  ├── ManagerIDs           (subset of EmployeeIDs)
  ├── PayStructureIDs
  ├── PayComponentIDs      → PayStructureIDs
  ├── LeavePolicyIDs
  ├── ShiftIDs
  ├── HolidayIDs
  ├── BenefitPlanIDs       → CarrierIDs
  ├── SalaryStructureIDs   → CurrencyIDs [FIN]
  ├── SalaryGradeIDs       → CurrencyIDs [FIN]
  ├── BonusPlanIDs
  ├── MeritCycleIDs
  ├── CourseIDs
  └── CourseSessionIDs     → CourseIDs

HCM Phase 4: Employee-Dependent
  ├── DocumentIDs              → EmployeeIDs
  ├── TimesheetIDs             → EmployeeIDs
  ├── LeaveBalanceIDs          → EmployeeIDs, LeavePolicyIDs
  ├── BenefitEnrollmentIDs     → EmployeeIDs, BenefitPlanIDs
  ├── EmployeeSkillIDs         → EmployeeIDs, SkillIDs
  ├── PerformanceReviewIDs     → EmployeeIDs, ManagerIDs
  ├── GoalIDs                  → EmployeeIDs
  └── EmployeeCompensationIDs  → EmployeeIDs, CurrencyIDs [FIN]

HCM Phase 5: Transaction Objects
  ├── PayrollRunIDs         → PayStructureIDs
  ├── PayslipIDs            → PayrollRunIDs, EmployeeIDs
  ├── TaxWithholdingIDs     → EmployeeIDs
  ├── DirectDepositIDs      → EmployeeIDs
  ├── GarnishmentIDs        → EmployeeIDs
  ├── YearEndDocumentIDs    → EmployeeIDs
  ├── LeaveRequestIDs       → EmployeeIDs, LeavePolicyIDs
  ├── ScheduleIDs           → EmployeeIDs, ShiftIDs
  ├── AbsenceIDs            → EmployeeIDs
  ├── DependentIDs          → EmployeeIDs
  ├── LifeEventIDs          → EmployeeIDs
  ├── COBRAEventIDs         → EmployeeIDs, BenefitPlanIDs
  ├── ComplianceRecordIDs   → EmployeeIDs
  ├── MeritIncreaseIDs      → EmployeeIDs, MeritCycleIDs
  ├── BonusPaymentIDs       → EmployeeIDs, BonusPlanIDs
  ├── EquityGrantIDs        → EmployeeIDs
  ├── CompStatementIDs      → EmployeeIDs
  ├── MarketBenchmarkIDs
  ├── CourseEnrollmentIDs   → EmployeeIDs, CourseSessionIDs
  ├── EmpCertificationIDs   → EmployeeIDs, CertificationIDs
  ├── TrainingRecordIDs     → EmployeeIDs, CourseIDs
  ├── FeedbackIDs           → EmployeeIDs
  └── OnboardingTaskIDs     → EmployeeIDs

HCM Phase 6: Talent Acquisition
  ├── JobRequisitionIDs     → PositionIDs, DepartmentIDs, ManagerIDs
  ├── ApplicantIDs
  ├── ApplicationIDs        → ApplicantIDs, JobRequisitionIDs
  ├── SuccessionPlanIDs     → PositionIDs, EmployeeIDs
  └── CareerPathIDs         → JobIDs
```

### SCM — Supply Chain Management (ServiceArea 50)

```
SCM Phase 1: Foundation (external: CurrencyIDs [FIN])
  ├── ItemCategoryIDs
  ├── SCMWarehouseIDs
  ├── SCMCarrierIDs
  └── ForecastModelIDs

SCM Phase 2: Inventory Core
  ├── ItemIDs              → ItemCategoryIDs
  ├── BinIDs               → SCMWarehouseIDs
  └── FreightRateIDs       → SCMCarrierIDs

SCM Phase 3: Procurement (external: VendorIDs [FIN], EmployeeIDs [HCM])
  ├── PurchaseRequisitionIDs  → EmployeeIDs [HCM], ItemIDs
  ├── RequisitionLineIDs      → PurchaseRequisitionIDs, ItemIDs
  ├── RFQIDs                  → VendorIDs [FIN]
  ├── BlanketOrderIDs         → VendorIDs [FIN]
  └── SupplierScorecardIDs    → VendorIDs [FIN]

SCM Phase 4: Purchase Orders
  ├── SCMPurchaseOrderIDs   → VendorIDs [FIN], SCMWarehouseIDs
  └── POLineIDs             → SCMPurchaseOrderIDs, ItemIDs

SCM Phase 5: Warehouse Operations
  ├── ReceivingOrderIDs     → SCMPurchaseOrderIDs, SCMWarehouseIDs
  ├── PutawayTaskIDs        → ReceivingOrderIDs, ItemIDs, BinIDs
  ├── PickTaskIDs           → WavePlanIDs, ItemIDs, BinIDs
  ├── PackTaskIDs           → PickTaskIDs, ItemIDs
  ├── ShipTaskIDs           → PackTaskIDs, SCMCarrierIDs
  ├── WavePlanIDs           → SCMWarehouseIDs
  └── DockScheduleIDs       → SCMWarehouseIDs, SCMCarrierIDs

SCM Phase 6: Inventory Transactions
  ├── StockMovementIDs      → ItemIDs, SCMWarehouseIDs, BinIDs
  ├── LotNumberIDs          → ItemIDs
  ├── SerialNumberIDs       → ItemIDs
  ├── CycleCountIDs         → SCMWarehouseIDs, BinIDs
  ├── ReorderPointIDs       → ItemIDs, SCMWarehouseIDs
  └── InventoryValuationIDs → ItemIDs, SCMWarehouseIDs

SCM Phase 7: Logistics (external: CustomerIDs [FIN])
  ├── ShipmentIDs              → SCMCarrierIDs, SCMWarehouseIDs, CustomerIDs [FIN]
  ├── RouteIDs                 → SCMCarrierIDs, SCMWarehouseIDs
  ├── LoadPlanIDs              → ShipmentIDs
  ├── DeliveryProofIDs         → ShipmentIDs
  ├── FreightAuditIDs          → ShipmentIDs, SCMCarrierIDs
  └── ReturnAuthorizationIDs   → CustomerIDs [FIN], ShipmentIDs, ItemIDs

SCM Phase 8: Planning
  ├── DemandForecastIDs          → ItemIDs, ForecastModelIDs
  ├── DemandPlanIDs              → ItemIDs
  ├── PromotionalPlanIDs         → ItemIDs
  ├── NewProductPlanIDs          → ItemCategoryIDs
  ├── ForecastAccuracyIDs        → ForecastModelIDs, ItemIDs
  ├── MaterialRequirementIDs     → ItemIDs, SCMWarehouseIDs
  ├── DistributionRequirementIDs → ItemIDs, SCMWarehouseIDs
  ├── SupplyPlanIDs              → ItemIDs, VendorIDs [FIN]
  ├── SupplierCollaborationIDs   → VendorIDs [FIN]
  ├── SafetyStockIDs             → ItemIDs, SCMWarehouseIDs
  └── LeadTimeIDs                → ItemIDs, VendorIDs [FIN]
```

### Sales — Sales & Distribution (ServiceArea 60)

```
Sales Phase 1: Foundation (external: CurrencyIDs [FIN])
  ├── SalesTerritoryIDs
  ├── SalesPriceListIDs          → CurrencyIDs [FIN]
  ├── SalesCustomerHierarchyIDs
  └── SalesCustomerSegmentIDs

Sales Phase 2: Customer & Partners (external: CustomerIDs [FIN], EmployeeIDs [HCM])
  ├── SalesPartnerChannelIDs     → CustomerIDs [FIN]
  └── SalesCustomerContractIDs   → CustomerIDs [FIN], EmployeeIDs [HCM], SalesPriceListIDs

Sales Phase 3: Pricing Setup (external: ItemIDs [SCM], CustomerIDs [FIN], CurrencyIDs [FIN])
  ├── SalesPriceListEntryIDs     → SalesPriceListIDs, ItemIDs [SCM], CurrencyIDs [FIN]
  ├── SalesCustomerPriceIDs      → CustomerIDs [FIN], ItemIDs [SCM], CurrencyIDs [FIN]
  ├── SalesDiscountRuleIDs       → CustomerIDs [FIN], ItemIDs [SCM]
  ├── SalesPromotionalPriceIDs   → ItemIDs [SCM]
  └── SalesQuantityBreakIDs      → ItemIDs [SCM]

Sales Phase 4: Quotations (external: CustomerIDs [FIN], EmployeeIDs [HCM], CurrencyIDs [FIN])
  ├── SalesQuotationIDs          → CustomerIDs [FIN], EmployeeIDs [HCM], CurrencyIDs [FIN]
  └── SalesQuotationLineIDs      → SalesQuotationIDs, ItemIDs [SCM]

Sales Phase 5: Orders (external: CustomerIDs [FIN], EmployeeIDs [HCM], SCMWarehouseIDs [SCM])
  ├── SalesOrderIDs              → CustomerIDs [FIN], EmployeeIDs [HCM], SCMWarehouseIDs [SCM], CurrencyIDs [FIN]
  ├── SalesOrderLineIDs          → SalesOrderIDs, ItemIDs [SCM]
  ├── SalesOrderAllocationIDs    → SalesOrderIDs, CustomerIDs [FIN], SCMWarehouseIDs [SCM]
  ├── SalesBackOrderIDs          → ItemIDs [SCM], SCMWarehouseIDs [SCM]
  ├── SalesReturnOrderIDs        → CustomerIDs [FIN], SCMWarehouseIDs [SCM]
  └── SalesReturnOrderLineIDs    → SalesReturnOrderIDs, ItemIDs [SCM]

Sales Phase 6: Shipping (external: SCMWarehouseIDs [SCM], SCMCarrierIDs [SCM], EmployeeIDs [HCM])
  ├── SalesDeliveryOrderIDs      → SalesOrderIDs, CustomerIDs [FIN], SCMWarehouseIDs [SCM], SCMCarrierIDs [SCM]
  ├── SalesDeliveryLineIDs       → SalesDeliveryOrderIDs, SalesOrderLineIDs
  ├── SalesPickReleaseIDs        → SalesDeliveryOrderIDs, SCMWarehouseIDs [SCM], EmployeeIDs [HCM]
  ├── SalesShippingDocIDs        → SalesDeliveryOrderIDs
  ├── SalesPackingSlipIDs        → SalesDeliveryOrderIDs
  └── SalesDeliveryConfirmIDs    → SalesDeliveryOrderIDs

Sales Phase 7: Billing (external: CustomerIDs [FIN], AccountIDs [FIN])
  ├── SalesBillingScheduleIDs    → SalesOrderIDs, SalesCustomerContractIDs, CustomerIDs [FIN]
  ├── SalesBillingMilestoneIDs   → SalesBillingScheduleIDs
  └── SalesRevenueScheduleIDs    → SalesOrderIDs, SalesCustomerContractIDs, AccountIDs [FIN]

Sales Phase 8: Analytics (external: EmployeeIDs [HCM], CustomerIDs [FIN])
  ├── SalesCommissionPlanIDs     → SalesTerritoryIDs
  ├── SalesCommissionCalcIDs     → SalesCommissionPlanIDs, EmployeeIDs [HCM], SalesOrderIDs
  ├── SalesTerritoryAssignIDs    → SalesTerritoryIDs, EmployeeIDs [HCM]
  ├── SalesTargetIDs             → EmployeeIDs [HCM], SalesTerritoryIDs
  └── SalesForecastIDs           → EmployeeIDs [HCM], SalesTerritoryIDs, CustomerIDs [FIN]
```

### MFG — Manufacturing (ServiceArea 70)

```
MFG Phase 1: Foundation (external: CurrencyIDs [FIN], ItemIDs [SCM], SCMWarehouseIDs [SCM])
  ├── MfgWorkCenterIDs       → CurrencyIDs [FIN]
  ├── MfgWorkCenterCapIDs    → MfgWorkCenterIDs
  ├── MfgShiftScheduleIDs
  ├── MfgBomIDs              → ItemIDs [SCM]
  ├── MfgBomLineIDs          → MfgBomIDs, ItemIDs [SCM], MfgRoutingOpIDs
  ├── MfgRoutingIDs          → ItemIDs [SCM]
  └── MfgRoutingOpIDs        → MfgRoutingIDs, MfgWorkCenterIDs

MFG Phase 2: Engineering & Quality Plans (external: EmployeeIDs [HCM])
  ├── MfgEngChangeOrderIDs   → EmployeeIDs [HCM]
  ├── MfgEngChangeDetailIDs  → MfgEngChangeOrderIDs, MfgBomIDs, MfgRoutingIDs, ItemIDs [SCM]
  ├── MfgQualityPlanIDs      → ItemIDs [SCM]
  └── MfgInspectionPointIDs  → MfgQualityPlanIDs, MfgRoutingOpIDs

MFG Phase 3: Work Orders & Production (external: EmployeeIDs [HCM], CustomerIDs [FIN], SalesOrderIDs [Sales])
  ├── MfgWorkOrderIDs        → ItemIDs [SCM], MfgBomIDs, MfgRoutingIDs, MfgWorkCenterIDs, SCMWarehouseIDs [SCM], SalesOrderIDs [Sales]
  ├── MfgWorkOrderOpIDs      → MfgWorkOrderIDs, MfgWorkCenterIDs, MfgRoutingOpIDs, EmployeeIDs [HCM]
  ├── MfgProductionOrderIDs  → CustomerIDs [FIN], EmployeeIDs [HCM], SalesOrderIDs [Sales]
  ├── MfgProdOrderLineIDs    → MfgProductionOrderIDs, ItemIDs [SCM], SCMWarehouseIDs [SCM], MfgWorkOrderIDs
  └── MfgProdBatchIDs        → MfgWorkOrderIDs, ItemIDs [SCM], SCMWarehouseIDs [SCM]

MFG Phase 4: Shop Floor (external: EmployeeIDs [HCM], BinIDs [SCM])
  ├── MfgLaborEntryIDs       → MfgWorkOrderIDs, EmployeeIDs [HCM], MfgWorkCenterIDs, MfgWorkOrderOpIDs
  ├── MfgMachineEntryIDs     → MfgWorkOrderIDs, MfgWorkCenterIDs, MfgWorkOrderOpIDs, EmployeeIDs [HCM]
  ├── MfgDowntimeEventIDs    → MfgWorkOrderIDs, EmployeeIDs [HCM]
  └── MfgProdConsumpIDs      → MfgWorkOrderIDs, ItemIDs [SCM], SCMWarehouseIDs [SCM], BinIDs [SCM], MfgWorkOrderOpIDs

MFG Phase 5: Quality Transactions (external: EmployeeIDs [HCM])
  ├── MfgQualityInspectionIDs → MfgQualityPlanIDs, MfgWorkOrderIDs, EmployeeIDs [HCM], ItemIDs [SCM], SCMWarehouseIDs [SCM]
  ├── MfgTestResultIDs        → MfgQualityInspectionIDs, MfgInspectionPointIDs, EmployeeIDs [HCM]
  ├── MfgNCRIDs               → ItemIDs [SCM], MfgWorkOrderIDs, MfgQualityInspectionIDs, EmployeeIDs [HCM]
  └── MfgNCRActionIDs         → MfgNCRIDs, EmployeeIDs [HCM]

MFG Phase 6: Planning
  ├── MfgMrpRunIDs
  ├── MfgMrpRequirementIDs   → MfgMrpRunIDs, ItemIDs [SCM], SCMWarehouseIDs [SCM]
  ├── MfgCapacityPlanIDs
  ├── MfgCapacityLoadIDs     → MfgCapacityPlanIDs, MfgWorkCenterIDs
  ├── MfgProdScheduleIDs
  └── MfgScheduleBlockIDs    → MfgProdScheduleIDs, MfgWorkOrderIDs, MfgWorkOrderOpIDs, MfgWorkCenterIDs

MFG Phase 7: Costing (external: CurrencyIDs [FIN], EmployeeIDs [HCM])
  ├── MfgStandardCostIDs     → ItemIDs [SCM], CurrencyIDs [FIN]
  ├── MfgCostRollupIDs
  ├── MfgActualCostIDs       → MfgWorkOrderIDs, EmployeeIDs [HCM]
  ├── MfgCostVarianceIDs     → MfgWorkOrderIDs, MfgStandardCostIDs
  ├── MfgOverheadIDs         → MfgWorkCenterIDs, CurrencyIDs [FIN]
  └── MfgOverheadAllocIDs    → MfgOverheadIDs, MfgWorkOrderIDs, MfgWorkCenterIDs
```

### CRM — Customer Relationship Management (ServiceArea 80)

```
CRM Phase 1: Leads Foundation (external: EmployeeIDs [HCM])
  ├── CrmLeadSourceIDs
  ├── CrmLeadScoreIDs
  └── CrmLeadAssignIDs       → EmployeeIDs [HCM]

CRM Phase 2: Opportunity Stages
  └── CrmOppStageIDs

CRM Phase 3: Accounts & Contacts (external: CustomerIDs [FIN], EmployeeIDs [HCM])
  ├── CrmAccountIDs          → EmployeeIDs [HCM], CustomerIDs [FIN]
  └── CrmContactIDs          → CrmAccountIDs, EmployeeIDs [HCM], CrmLeadSourceIDs

CRM Phase 4: Marketing (external: EmployeeIDs [HCM])
  ├── CrmMarketingListIDs    → EmployeeIDs [HCM]
  ├── CrmEmailTemplateIDs    → EmployeeIDs [HCM]
  ├── CrmCampaignIDs         → EmployeeIDs [HCM], CrmMarketingListIDs
  ├── CrmCampaignMemberIDs   → CrmCampaignIDs
  ├── CrmCampaignResponseIDs → CrmCampaignIDs
  └── CrmCampaignROIIDs      → CrmCampaignIDs

CRM Phase 5: Leads (external: EmployeeIDs [HCM])
  ├── CrmLeadIDs             → CrmLeadSourceIDs, EmployeeIDs [HCM], CrmCampaignIDs
  └── CrmLeadActivityIDs     → CrmLeadIDs, EmployeeIDs [HCM]

CRM Phase 6: Opportunities (external: EmployeeIDs [HCM])
  ├── CrmOpportunityIDs      → CrmAccountIDs, CrmContactIDs, EmployeeIDs [HCM], CrmLeadSourceIDs, CrmCampaignIDs, CrmOppStageIDs
  ├── CrmOppCompetitorIDs    → CrmOpportunityIDs
  ├── CrmOppProductIDs       → CrmOpportunityIDs
  ├── CrmOppTeamIDs          → CrmOpportunityIDs, EmployeeIDs [HCM]
  └── CrmOppActivityIDs      → CrmOpportunityIDs, EmployeeIDs [HCM]

CRM Phase 7: Account Management
  ├── CrmInteractionIDs      → CrmContactIDs, EmployeeIDs [HCM]
  ├── CrmRelationshipIDs     → CrmAccountIDs
  ├── CrmHealthScoreIDs      → CrmAccountIDs
  ├── CrmAccountPlanIDs      → CrmAccountIDs, EmployeeIDs [HCM]
  └── CrmLeadConversionIDs   → CrmLeadIDs, CrmAccountIDs, CrmContactIDs, EmployeeIDs [HCM]

CRM Phase 8: Customer Service (external: ManagerIDs [HCM])
  ├── CrmSLAIDs
  ├── CrmEscalationIDs       → ManagerIDs [HCM]
  ├── CrmCaseIDs             → CrmAccountIDs, CrmContactIDs, EmployeeIDs [HCM], CrmSLAIDs
  ├── CrmCaseCommentIDs      → CrmCaseIDs, EmployeeIDs [HCM]
  ├── CrmKBArticleIDs        → EmployeeIDs [HCM]
  └── CrmSurveyIDs           → CrmAccountIDs, CrmContactIDs, EmployeeIDs [HCM]

CRM Phase 9: Field Service (external: SCMWarehouseIDs [SCM])
  ├── CrmTechnicianIDs       → EmployeeIDs [HCM]
  ├── CrmServiceContractIDs  → CrmAccountIDs, CrmSLAIDs, EmployeeIDs [HCM]
  ├── CrmServiceOrderIDs     → CrmAccountIDs, CrmContactIDs, CrmServiceContractIDs, CrmTechnicianIDs, EmployeeIDs [HCM]
  ├── CrmServiceScheduleIDs  → CrmTechnicianIDs
  ├── CrmServicePartIDs      → CrmServiceOrderIDs, SCMWarehouseIDs [SCM]
  └── CrmServiceVisitIDs     → CrmTechnicianIDs
```

### PRJ — Project Management (ServiceArea 90)

```
PRJ Phase 1: Foundation (external: ManagerIDs [HCM])
  ├── PrjProjectTemplateIDs
  ├── PrjExpenseCategoryIDs
  ├── PrjExpensePolicyIDs
  └── PrjApprovalRuleIDs     → ManagerIDs [HCM]

PRJ Phase 2: Projects & Phases (external: CustomerIDs [FIN], CrmAccountIDs [CRM], ManagerIDs [HCM], DepartmentIDs [HCM])
  ├── PrjProjectIDs          → CustomerIDs [FIN], CrmAccountIDs [CRM], ManagerIDs [HCM], DepartmentIDs [HCM], PrjProjectTemplateIDs
  └── PrjPhaseIDs            → PrjProjectIDs

PRJ Phase 3: Resources (external: ManagerIDs [HCM], DepartmentIDs [HCM])
  ├── PrjResourcePoolIDs     → ManagerIDs [HCM], DepartmentIDs [HCM]
  ├── PrjResourceIDs         → PrjResourcePoolIDs
  ├── PrjResourceSkillIDs    → PrjResourceIDs
  └── PrjCapacityPlanIDs     → PrjResourcePoolIDs

PRJ Phase 4: Project Details (external: EmployeeIDs [HCM])
  ├── PrjTaskIDs             → PrjProjectIDs, PrjPhaseIDs, EmployeeIDs [HCM]
  ├── PrjMilestoneIDs        → PrjProjectIDs, PrjPhaseIDs, EmployeeIDs [HCM]
  ├── PrjDeliverableIDs      → PrjProjectIDs, PrjMilestoneIDs, PrjTaskIDs, EmployeeIDs [HCM]
  ├── PrjDependencyIDs       → PrjProjectIDs
  └── PrjRiskIDs             → PrjProjectIDs, EmployeeIDs [HCM]

PRJ Phase 5: Resource Management
  ├── PrjAllocationIDs       → PrjResourceIDs, PrjProjectIDs
  ├── PrjBookingIDs          → PrjResourceIDs, PrjProjectIDs
  ├── PrjUtilizationIDs      → PrjResourceIDs
  └── PrjBillingRateIDs      → PrjResourceIDs, CurrencyIDs [FIN]

PRJ Phase 6: Time & Expense (external: EmployeeIDs [HCM], ManagerIDs [HCM])
  ├── PrjTimesheetIDs        → PrjResourceIDs, PrjProjectIDs
  ├── PrjTimesheetEntryIDs   → PrjTimesheetIDs, PrjResourceIDs, PrjProjectIDs, PrjPhaseIDs
  ├── PrjExpenseReportIDs    → PrjResourceIDs, PrjProjectIDs, EmployeeIDs [HCM], ManagerIDs [HCM]
  └── PrjExpenseEntryIDs     → PrjExpenseReportIDs, EmployeeIDs [HCM], ManagerIDs [HCM], CurrencyIDs [FIN]

PRJ Phase 7: Billing (external: CustomerIDs [FIN], CurrencyIDs [FIN])
  ├── PrjBillingScheduleIDs    → PrjProjectIDs
  ├── PrjProjectInvoiceIDs     → PrjProjectIDs, CustomerIDs [FIN]
  ├── PrjBillingMilestoneIDs   → PrjBillingScheduleIDs, PrjProjectIDs, PrjMilestoneIDs
  ├── PrjInvoiceLineIDs        → PrjProjectInvoiceIDs, PrjProjectIDs, PrjTaskIDs
  ├── PrjRevenueRecognitionIDs → PrjProjectIDs, PrjProjectInvoiceIDs
  └── PrjProjectBudgetIDs      → PrjProjectIDs, CurrencyIDs [FIN]

PRJ Phase 8: Analytics (external: EmployeeIDs [HCM], DepartmentIDs [HCM])
  ├── PrjStatusReportIDs       → PrjProjectIDs, EmployeeIDs [HCM]
  ├── PrjEarnedValueIDs        → PrjProjectIDs
  ├── PrjBudgetVarianceIDs     → PrjProjectIDs, PrjProjectBudgetIDs, PrjPhaseIDs
  ├── PrjResourceForecastIDs   → PrjProjectIDs, PrjResourceIDs, PrjResourcePoolIDs
  ├── PrjPortfolioViewIDs      → EmployeeIDs [HCM], DepartmentIDs [HCM]
  ├── PrjProjectKPIIDs         → PrjProjectIDs
  └── PrjProjectIssueIDs       → PrjProjectIDs, PrjTaskIDs, EmployeeIDs [HCM]
```

### BI — Business Intelligence (ServiceArea 35)

```
BI Phase 1: Foundation (external: EmployeeIDs [HCM])
  ├── BiReportIDs
  ├── BiReportTemplateIDs
  ├── BiDashboardIDs         → EmployeeIDs [HCM]
  ├── BiKPIIDs
  └── BiDataSourceIDs

BI Phase 2: Report Management
  ├── BiReportScheduleIDs       → BiReportIDs
  ├── BiReportExecutionIDs      → BiReportIDs, EmployeeIDs [HCM]
  ├── BiReportAccessIDs         → BiReportIDs, EmployeeIDs [HCM]
  └── BiReportSubscriptionIDs   → BiReportIDs, BiReportScheduleIDs, EmployeeIDs [HCM]

BI Phase 3: Dashboard Management
  ├── BiDashboardWidgetIDs   → BiDashboardIDs, BiDataSourceIDs, BiReportIDs, BiKPIIDs
  ├── BiKPIThresholdIDs      → BiKPIIDs
  ├── BiDrilldownIDs         → BiReportIDs, BiDashboardWidgetIDs, BiDashboardIDs
  └── BiDashboardShareIDs    → BiDashboardIDs, EmployeeIDs [HCM]

BI Phase 4: Analytics
  ├── BiDataCubeIDs          → BiDataSourceIDs
  ├── BiAnalysisModelIDs     → BiDataSourceIDs, EmployeeIDs [HCM]
  ├── BiPredictionIDs        → BiAnalysisModelIDs, EmployeeIDs [HCM]
  ├── BiTrendAnalysisIDs     → BiDataSourceIDs, EmployeeIDs [HCM]
  ├── BiScenarioIDs          → BiDataSourceIDs, EmployeeIDs [HCM]
  └── BiBenchmarkIDs         → BiDataSourceIDs

BI Phase 5: Data Management
  ├── BiETLJobIDs               → BiDataSourceIDs, EmployeeIDs [HCM]
  ├── BiETLScheduleIDs          → BiETLJobIDs
  ├── BiDataQualityRuleIDs      → BiDataSourceIDs
  ├── BiMasterDataConfigIDs     → BiDataSourceIDs
  └── BiDataGovernanceIDs       → BiDataSourceIDs
```

### DOC — Document Management (ServiceArea 100)

```
DOC Phase 1: Compliance Foundation
  ├── DocRetentionPolicyIDs

DOC Phase 2: Storage Foundation (external: EmployeeIDs [HCM], DepartmentIDs [HCM])
  ├── DocFolderIDs           → EmployeeIDs [HCM], DepartmentIDs [HCM], DocRetentionPolicyIDs
  ├── DocCategoryIDs
  └── DocTagIDs

DOC Phase 3: Documents & Versions (external: EmployeeIDs [HCM])
  ├── DocDocumentIDs         → DocFolderIDs, DocCategoryIDs, EmployeeIDs [HCM]
  └── DocVersionIDs          → DocDocumentIDs, EmployeeIDs [HCM]

DOC Phase 4: Workflow (external: EmployeeIDs [HCM])
  ├── DocCheckoutIDs            → DocDocumentIDs, DocVersionIDs, EmployeeIDs [HCM]
  ├── DocApprovalWorkflowIDs    → DocDocumentIDs, EmployeeIDs [HCM]
  ├── DocWorkflowStepIDs        → DocApprovalWorkflowIDs, EmployeeIDs [HCM]
  ├── DocSignatureIDs           → DocDocumentIDs, DocVersionIDs, EmployeeIDs [HCM]
  └── DocReviewCommentIDs       → DocDocumentIDs, DocVersionIDs, DocApprovalWorkflowIDs, EmployeeIDs [HCM]

DOC Phase 5: Integration (external: EmployeeIDs [HCM])
  ├── DocAttachmentIDs       → DocDocumentIDs, EmployeeIDs [HCM]
  ├── DocTemplateIDs         → EmployeeIDs [HCM]
  ├── DocTemplateFieldIDs    → DocTemplateIDs
  ├── DocEmailCaptureIDs     → DocDocumentIDs, DocFolderIDs
  └── DocScanJobIDs          → DocFolderIDs, DocCategoryIDs, EmployeeIDs [HCM]

DOC Phase 6: Compliance (external: EmployeeIDs [HCM])
  ├── DocLegalHoldIDs        → EmployeeIDs [HCM]
  ├── DocAccessLogIDs        → DocDocumentIDs, DocVersionIDs
  ├── DocArchiveJobIDs       → DocFolderIDs, DocRetentionPolicyIDs, EmployeeIDs [HCM]
  └── DocAuditTrailIDs       → DocDocumentIDs, DocVersionIDs
```

### ECOM — E-Commerce (ServiceArea 110)

```
ECOM Phase 1: Catalog Foundation
  ├── EcomCategoryIDs
  └── EcomAttributeIDs

ECOM Phase 2: Products
  ├── EcomProductIDs         → EcomCategoryIDs
  ├── EcomImageIDs           → EcomProductIDs
  └── EcomVariantIDs         → EcomProductIDs

ECOM Phase 3: Customers (external: CurrencyIDs [FIN])
  ├── EcomCustomerIDs        → CurrencyIDs [FIN]
  ├── EcomAddressIDs         → EcomCustomerIDs
  ├── EcomWishlistIDs        → EcomCustomerIDs
  ├── EcomWishItemIDs        → EcomWishlistIDs, EcomProductIDs
  └── EcomCartIDs            → EcomCustomerIDs, CurrencyIDs [FIN]

ECOM Phase 4: Promotions & Methods
  ├── EcomPromotionIDs
  ├── EcomCouponIDs          → EcomPromotionIDs
  ├── EcomPriceRuleIDs       → EcomCategoryIDs
  ├── EcomShippingIDs
  └── EcomPaymentIDs

ECOM Phase 5: Orders (external: SCMWarehouseIDs [SCM], EmployeeIDs [HCM])
  ├── EcomOrderIDs           → EcomCustomerIDs, EcomShippingIDs, EcomPaymentIDs, SCMWarehouseIDs [SCM]
  ├── EcomOrderLineIDs       → EcomOrderIDs, EcomProductIDs, EcomVariantIDs
  ├── EcomOrderStatusIDs     → EcomOrderIDs, EmployeeIDs [HCM]
  ├── EcomReturnIDs          → EcomOrderIDs, EcomCustomerIDs, EmployeeIDs [HCM]
  └── EcomReturnLineIDs      → EcomReturnIDs, EcomOrderLineIDs, EcomProductIDs, EcomVariantIDs
```

### COMP — Compliance & Risk (ServiceArea 120)

```
COMP Phase 1: Foundation (external: EmployeeIDs [HCM], DepartmentIDs [HCM])
  ├── CompRegulationIDs
  ├── CompControlIDs            → DepartmentIDs [HCM], ManagerIDs [HCM], CurrencyIDs [FIN]
  ├── CompPolicyDocumentIDs     → EmployeeIDs [HCM], ManagerIDs [HCM], DepartmentIDs [HCM]
  └── CompInsurancePolicyIDs    → EmployeeIDs [HCM]

COMP Phase 2: Core
  ├── CompRequirementIDs        → CompRegulationIDs, EmployeeIDs [HCM]
  ├── CompApprovalMatrixIDs
  ├── CompSegregationRuleIDs
  ├── CompRiskRegisterIDs       → DepartmentIDs [HCM], EmployeeIDs [HCM]
  └── CompAuditScheduleIDs      → EmployeeIDs [HCM]

COMP Phase 3: Assessments
  ├── CompComplianceStatusIDs   → CompRequirementIDs, EmployeeIDs [HCM]
  ├── CompControlAssessmentIDs  → CompControlIDs, EmployeeIDs [HCM], CompAuditScheduleIDs
  ├── CompCertificationIDs      → CompRegulationIDs, EmployeeIDs [HCM]
  ├── CompRiskAssessmentIDs     → CompRiskRegisterIDs, EmployeeIDs [HCM]
  └── CompMitigationPlanIDs     → CompRiskRegisterIDs, EmployeeIDs [HCM]

COMP Phase 4: Events
  ├── CompViolationRecordIDs    → CompRequirementIDs, EmployeeIDs [HCM], ManagerIDs [HCM], DepartmentIDs [HCM], CompRiskRegisterIDs
  ├── CompIncidentIDs           → EmployeeIDs [HCM], ManagerIDs [HCM], DepartmentIDs [HCM], CompRiskRegisterIDs
  └── CompAuditFindingIDs       → CompAuditScheduleIDs, ManagerIDs [HCM]

COMP Phase 5: Reports
  ├── CompRemediationActionIDs  → CompAuditFindingIDs, EmployeeIDs [HCM], ManagerIDs [HCM]
  ├── CompAuditReportIDs        → CompAuditScheduleIDs, EmployeeIDs [HCM]
  └── CompComplianceReportIDs   → CompRegulationIDs, EmployeeIDs [HCM], ManagerIDs [HCM]
```

---

## Section 4: Entity Count Summary

| Module | Phases | Entity Count | Cross-Module Dependencies |
|--------|--------|-------------|--------------------------|
| **FIN** | 9 (split 1-3 + 4-9) | 75 | HCM (EmployeeIDs, DepartmentIDs) |
| **HCM** | 6 | 78 | FIN (CurrencyIDs) |
| **SCM** | 8 | 138 | FIN (VendorIDs, CustomerIDs, CurrencyIDs), HCM (EmployeeIDs) |
| **Sales** | 8 | 57 | FIN (CustomerIDs, CurrencyIDs, AccountIDs), HCM (EmployeeIDs), SCM (ItemIDs, SCMWarehouseIDs, SCMCarrierIDs) |
| **MFG** | 7 | 110 | FIN (CustomerIDs, CurrencyIDs), HCM (EmployeeIDs), SCM (ItemIDs, SCMWarehouseIDs, BinIDs), Sales (SalesOrderIDs) |
| **CRM** | 9 | 60 | FIN (CustomerIDs), HCM (EmployeeIDs, ManagerIDs), SCM (SCMWarehouseIDs) |
| **PRJ** | 8 | 115 | FIN (CustomerIDs, CurrencyIDs), HCM (EmployeeIDs, ManagerIDs, DepartmentIDs), CRM (CrmAccountIDs) |
| **BI** | 5 | 42 | HCM (EmployeeIDs) |
| **DOC** | 6 | 75 | HCM (EmployeeIDs, DepartmentIDs) |
| **ECOM** | 5 | 108 | FIN (CurrencyIDs), SCM (SCMWarehouseIDs), HCM (EmployeeIDs) |
| **COMP** | 5 | 141 | FIN (CurrencyIDs), HCM (EmployeeIDs, ManagerIDs, DepartmentIDs) |

### Universal Dependencies (required by all/most modules)

| ID Slice | Module | Why Universal |
|---|---|---|
| `CurrencyIDs` | FIN | Every module with Money fields needs currency |
| `EmployeeIDs` | HCM | Every module has ownership, assignment, or audit fields |
| `ManagerIDs` | HCM | Approval workflows, escalation chains |
| `DepartmentIDs` | HCM | Organizational structure for budgets, reporting |

### Bridge Dependencies (connecting module chains)

| ID Slice | From → To | Purpose |
|---|---|---|
| `VendorIDs` | FIN → SCM | Procurement, purchase orders |
| `CustomerIDs` | FIN → Sales/MFG/CRM/ECOM/SCM/PRJ | Order processing, contracts, accounts |
| `ItemIDs` | SCM → Sales/MFG | Order lines, BOMs, production |
| `SCMWarehouseIDs` | SCM → Sales/MFG/ECOM/CRM | Fulfillment, production, field service |
| `SalesOrderIDs` | Sales → MFG | Make-to-order production |
| `CrmAccountIDs` | CRM → PRJ | Project-to-account linking |
