/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package main

// MockDataStore holds generated IDs for reference
type MockDataStore struct {
	// Phase 1: Foundation
	JobFamilyIDs     []string
	CarrierIDs       []string
	CertificationIDs []string
	SkillIDs         []string

	// Phase 2: Core Organizational
	OrganizationIDs []string
	JobIDs          []string
	DepartmentIDs   []string
	PositionIDs     []string

	// Phase 3: Employees & Config
	EmployeeIDs        []string
	ManagerIDs         []string // Subset of employees who are managers
	PayStructureIDs    []string
	PayComponentIDs    []string
	LeavePolicyIDs     []string
	ShiftIDs           []string
	HolidayIDs         []string
	BenefitPlanIDs     []string
	SalaryStructureIDs []string
	SalaryGradeIDs     []string
	BonusPlanIDs       []string
	MeritCycleIDs      []string
	CourseIDs          []string
	CourseSessionIDs   []string

	// Phase 4: Employee-Dependent
	DocumentIDs             []string
	TimesheetIDs            []string
	LeaveBalanceIDs         []string
	BenefitEnrollmentIDs    []string
	EmployeeSkillIDs        []string
	PerformanceReviewIDs    []string
	GoalIDs                 []string
	EmployeeCompensationIDs []string

	// Phase 5: Transaction Objects
	PayrollRunIDs       []string
	PayslipIDs          []string
	TaxWithholdingIDs   []string
	DirectDepositIDs    []string
	GarnishmentIDs      []string
	YearEndDocumentIDs  []string
	LeaveRequestIDs     []string
	ScheduleIDs         []string
	AbsenceIDs          []string
	DependentIDs        []string
	LifeEventIDs        []string
	COBRAEventIDs       []string
	ComplianceRecordIDs []string
	MeritIncreaseIDs    []string
	BonusPaymentIDs     []string
	EquityGrantIDs      []string
	CompStatementIDs    []string
	MarketBenchmarkIDs  []string
	CourseEnrollmentIDs []string
	EmpCertificationIDs []string
	TrainingRecordIDs   []string
	FeedbackIDs         []string
	OnboardingTaskIDs   []string

	// Phase 6: Talent Acquisition
	JobRequisitionIDs []string
	ApplicantIDs      []string
	ApplicationIDs    []string
	SuccessionPlanIDs []string
	CareerPathIDs     []string

	// FIN Phase 1: Foundation
	CurrencyIDs        []string
	FiscalYearIDs      []string
	AssetCategoryIDs   []string
	TaxJurisdictionIDs []string

	// FIN Phase 2: Core Financial
	FiscalPeriodIDs []string
	AccountIDs      []string
	TaxCodeIDs      []string

	// FIN Phase 3: Entity Master
	VendorIDs          []string
	VendorContactIDs   []string
	CustomerIDs        []string
	CustomerContactIDs []string
	BankAccountIDs     []string
	ExchangeRateIDs    []string

	// FIN Phase 4: Configuration
	TaxRuleIDs        []string
	TaxExemptionIDs   []string
	WHTaxConfigIDs    []string
	BudgetIDs         []string
	BudgetLineIDs     []string
	BudgetTransferIDs []string
	BudgetScenarioIDs []string
	CapExIDs          []string
	ForecastIDs       []string

	// FIN Phase 5: AP Transactions
	PurchaseInvoiceIDs     []string
	PurchaseInvoiceLineIDs []string
	PaymentScheduleIDs     []string
	VendorPaymentIDs       []string
	PaymentAllocationIDs   []string
	VendorStatementIDs     []string

	// FIN Phase 6: AR Transactions
	SalesInvoiceIDs     []string
	SalesInvoiceLineIDs []string
	CustomerPaymentIDs  []string
	PaymentAppIDs       []string
	CreditMemoIDs       []string
	DunningLetterIDs    []string

	// FIN Phase 7: GL Transactions
	JournalEntryIDs     []string
	JournalEntryLineIDs []string
	AccountBalanceIDs   []string

	// FIN Phase 8: Cash & Assets
	BankTransactionIDs  []string
	BankReconIDs        []string
	CashForecastIDs     []string
	FundTransferIDs     []string
	PettyCashIDs        []string
	AssetIDs            []string
	DepreciationIDs     []string
	AssetDisposalIDs    []string
	AssetTransferIDs    []string
	AssetMaintenanceIDs []string
	AssetRevaluationIDs []string

	// FIN Phase 9: Tax Filing
	TaxReturnIDs []string

	// SCM Phase 1: Foundation
	ItemCategoryIDs  []string
	SCMWarehouseIDs  []string
	SCMCarrierIDs    []string
	ForecastModelIDs []string

	// SCM Phase 2: Inventory Core
	ItemIDs        []string
	BinIDs         []string
	FreightRateIDs []string

	// SCM Phase 3: Procurement
	PurchaseRequisitionIDs []string
	RequisitionLineIDs     []string
	RFQIDs                 []string
	BlanketOrderIDs        []string
	SupplierScorecardIDs   []string

	// SCM Phase 4: Purchase Orders
	SCMPurchaseOrderIDs []string
	POLineIDs           []string

	// SCM Phase 5: Warehouse Operations
	ReceivingOrderIDs []string
	PutawayTaskIDs    []string
	PickTaskIDs       []string
	PackTaskIDs       []string
	ShipTaskIDs       []string
	WavePlanIDs       []string
	DockScheduleIDs   []string

	// SCM Phase 6: Inventory Transactions
	StockMovementIDs      []string
	LotNumberIDs          []string
	SerialNumberIDs       []string
	CycleCountIDs         []string
	ReorderPointIDs       []string
	InventoryValuationIDs []string

	// SCM Phase 7: Logistics
	ShipmentIDs            []string
	RouteIDs               []string
	LoadPlanIDs            []string
	DeliveryProofIDs       []string
	FreightAuditIDs        []string
	ReturnAuthorizationIDs []string

	// SCM Phase 8: Planning
	DemandForecastIDs          []string
	DemandPlanIDs              []string
	PromotionalPlanIDs         []string
	NewProductPlanIDs          []string
	ForecastAccuracyIDs        []string
	MaterialRequirementIDs     []string
	DistributionRequirementIDs []string
	SupplyPlanIDs              []string
	SupplierCollaborationIDs   []string
	SafetyStockIDs             []string
	LeadTimeIDs                []string

	// Sales Phase 1: Foundation
	SalesTerritoryIDs         []string
	SalesPriceListIDs         []string
	SalesCustomerHierarchyIDs []string
	SalesCustomerSegmentIDs   []string

	// Sales Phase 2: Customer & Partners
	SalesPartnerChannelIDs   []string
	SalesCustomerContractIDs []string

	// Sales Phase 3: Pricing Setup
	SalesPriceListEntryIDs   []string
	SalesCustomerPriceIDs    []string
	SalesDiscountRuleIDs     []string
	SalesPromotionalPriceIDs []string
	SalesQuantityBreakIDs    []string

	// Sales Phase 4: Quotations
	SalesQuotationIDs     []string
	SalesQuotationLineIDs []string

	// Sales Phase 5: Orders
	SalesOrderIDs           []string
	SalesOrderLineIDs       []string
	SalesOrderAllocationIDs []string
	SalesBackOrderIDs       []string
	SalesReturnOrderIDs     []string
	SalesReturnOrderLineIDs []string

	// Sales Phase 6: Shipping
	SalesDeliveryOrderIDs  []string
	SalesDeliveryLineIDs   []string
	SalesPickReleaseIDs    []string
	SalesShippingDocIDs    []string
	SalesPackingSlipIDs    []string
	SalesDeliveryConfirmIDs []string

	// Sales Phase 7: Billing
	SalesBillingScheduleIDs  []string
	SalesBillingMilestoneIDs []string
	SalesRevenueScheduleIDs  []string

	// Sales Phase 8: Analytics
	SalesCommissionPlanIDs []string
	SalesCommissionCalcIDs  []string
	SalesTerritoryAssignIDs []string
	SalesTargetIDs          []string
	SalesForecastIDs        []string

	// MFG Phase 1: Foundation (Shop Floor & Engineering)
	MfgWorkCenterIDs     []string
	MfgWorkCenterCapIDs  []string
	MfgShiftScheduleIDs  []string
	MfgBomIDs            []string
	MfgBomLineIDs        []string
	MfgRoutingIDs        []string
	MfgRoutingOpIDs      []string

	// MFG Phase 2: Engineering Change & Quality Plans
	MfgEngChangeOrderIDs  []string
	MfgEngChangeDetailIDs []string
	MfgQualityPlanIDs     []string
	MfgInspectionPointIDs []string

	// MFG Phase 3: Work Orders & Production
	MfgWorkOrderIDs      []string
	MfgWorkOrderOpIDs    []string
	MfgProductionOrderIDs []string
	MfgProdOrderLineIDs  []string
	MfgProdBatchIDs      []string

	// MFG Phase 4: Shop Floor Transactions
	MfgLaborEntryIDs    []string
	MfgMachineEntryIDs  []string
	MfgDowntimeEventIDs []string
	MfgProdConsumpIDs   []string

	// MFG Phase 5: Quality Transactions
	MfgQualityInspectionIDs []string
	MfgTestResultIDs        []string
	MfgNCRIDs               []string
	MfgNCRActionIDs         []string

	// MFG Phase 6: Planning
	MfgMrpRunIDs         []string
	MfgMrpRequirementIDs []string
	MfgCapacityPlanIDs   []string
	MfgCapacityLoadIDs   []string
	MfgProdScheduleIDs   []string
	MfgScheduleBlockIDs  []string

	// MFG Phase 7: Costing
	MfgStandardCostIDs  []string
	MfgCostRollupIDs    []string
	MfgActualCostIDs    []string
	MfgCostVarianceIDs  []string
	MfgOverheadIDs      []string
	MfgOverheadAllocIDs []string

	// CRM Phase 1: Leads Foundation
	CrmLeadSourceIDs []string
	CrmLeadScoreIDs  []string
	CrmLeadAssignIDs []string

	// CRM Phase 2: Leads
	CrmLeadIDs           []string
	CrmLeadActivityIDs   []string
	CrmLeadConversionIDs []string

	// CRM Phase 3: Opportunities Foundation
	CrmOppStageIDs []string

	// CRM Phase 4: Opportunities
	CrmOpportunityIDs   []string
	CrmOppCompetitorIDs []string
	CrmOppProductIDs    []string
	CrmOppTeamIDs       []string
	CrmOppActivityIDs   []string

	// CRM Phase 5: Accounts
	CrmAccountIDs      []string
	CrmContactIDs      []string
	CrmInteractionIDs  []string
	CrmRelationshipIDs []string
	CrmHealthScoreIDs  []string
	CrmAccountPlanIDs  []string

	// CRM Phase 6: Marketing
	CrmCampaignIDs         []string
	CrmCampaignMemberIDs   []string
	CrmEmailTemplateIDs    []string
	CrmMarketingListIDs    []string
	CrmCampaignResponseIDs []string
	CrmCampaignROIIDs      []string

	// CRM Phase 7: Customer Service
	CrmSLAIDs         []string
	CrmEscalationIDs  []string
	CrmCaseIDs        []string
	CrmCaseCommentIDs []string
	CrmKBArticleIDs   []string
	CrmSurveyIDs      []string

	// CRM Phase 8: Field Service
	CrmTechnicianIDs       []string
	CrmServiceContractIDs  []string
	CrmServiceOrderIDs     []string
	CrmServiceScheduleIDs  []string
	CrmServicePartIDs      []string
	CrmServiceVisitIDs     []string

	// PRJ Phase 1: Foundation
	PrjProjectTemplateIDs []string
	PrjExpenseCategoryIDs []string
	PrjExpensePolicyIDs   []string
	PrjApprovalRuleIDs    []string

	// PRJ Phase 2: Projects & Phases
	PrjProjectIDs []string
	PrjPhaseIDs   []string

	// PRJ Phase 3: Resources
	PrjResourcePoolIDs  []string
	PrjResourceIDs      []string
	PrjResourceSkillIDs []string
	PrjCapacityPlanIDs  []string

	// PRJ Phase 4: Project Details
	PrjTaskIDs        []string
	PrjMilestoneIDs   []string
	PrjDeliverableIDs []string
	PrjDependencyIDs  []string
	PrjRiskIDs        []string

	// PRJ Phase 5: Resource Management
	PrjAllocationIDs   []string
	PrjBookingIDs      []string
	PrjUtilizationIDs  []string
	PrjBillingRateIDs  []string

	// PRJ Phase 6: Time & Expense
	PrjTimesheetIDs      []string
	PrjTimesheetEntryIDs []string
	PrjExpenseReportIDs  []string
	PrjExpenseEntryIDs   []string

	// PRJ Phase 7: Billing
	PrjBillingScheduleIDs   []string
	PrjBillingMilestoneIDs  []string
	PrjProjectInvoiceIDs    []string
	PrjInvoiceLineIDs       []string
	PrjRevenueRecognitionIDs []string
	PrjProjectBudgetIDs     []string

	// PRJ Phase 8: Analytics
	PrjStatusReportIDs     []string
	PrjEarnedValueIDs      []string
	PrjBudgetVarianceIDs   []string
	PrjResourceForecastIDs []string
	PrjPortfolioViewIDs    []string
	PrjProjectKPIIDs       []string
	PrjProjectIssueIDs     []string
}
