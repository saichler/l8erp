/*
© 2025 Sharon Aicler (saichler@gmail.com)
FIN and SCM module ID stores for mock data generation
*/
package mocks

// FINStore holds generated IDs for FIN module
type FINStore struct {
	// FIN Phase 1: Foundation
	CurrencyIDs        []string
	FiscalYearIDs      []string
	AssetCategoryIDs   []string
	TaxJurisdictionIDs []string

	// FIN Phase 2: Core Financial (FiscalPeriodIDs populated from embedded FiscalYear.Periods)
	FiscalPeriodIDs []string
	AccountIDs      []string
	TaxCodeIDs      []string

	// FIN Phase 3: Entity Master
	VendorIDs       []string
	CustomerIDs     []string
	BankAccountIDs  []string
	ExchangeRateIDs []string

	// FIN Phase 4: Configuration
	TaxRuleIDs    []string
	TaxExemptionIDs []string
	BudgetIDs     []string
	CapExIDs      []string
	ForecastIDs   []string

	// FIN Phase 5: AP Transactions
	PurchaseInvoiceIDs []string
	PaymentScheduleIDs []string
	VendorPaymentIDs   []string
	VendorStatementIDs []string

	// FIN Phase 6: AR Transactions
	SalesInvoiceIDs    []string
	CustomerPaymentIDs []string
	CreditMemoIDs      []string
	DunningLetterIDs   []string

	// FIN Phase 7: GL Transactions
	JournalEntryIDs []string

	// FIN Phase 8: Cash & Assets
	CashForecastIDs []string
	FundTransferIDs []string
	PettyCashIDs    []string
	AssetIDs        []string
}

// SCMStore holds generated IDs for SCM module
type SCMStore struct {
	// SCM Phase 1: Foundation
	ItemCategoryIDs  []string
	SCMWarehouseIDs  []string
	SCMCarrierIDs    []string
	ForecastModelIDs []string

	// SCM Phase 2: Inventory Core
	ItemIDs        []string
	BinIDs         []string // Populated from embedded ScmWarehouse.Bins
	FreightRateIDs []string

	// SCM Phase 3: Procurement
	PurchaseRequisitionIDs []string
	RFQIDs                 []string
	BlanketOrderIDs        []string
	SupplierScorecardIDs   []string

	// SCM Phase 4: Purchase Orders
	SCMPurchaseOrderIDs []string

	// SCM Phase 5: Warehouse Operations
	ReceivingOrderIDs []string
	WavePlanIDs       []string
	DockScheduleIDs   []string

	// SCM Phase 6: Inventory Transactions
	CycleCountIDs []string

	// SCM Phase 7: Logistics
	ShipmentIDs            []string
	RouteIDs               []string
	LoadPlanIDs            []string
	ReturnAuthorizationIDs []string

	// SCM Phase 8: Planning
	DemandForecastIDs          []string
	DemandPlanIDs              []string
	PromotionalPlanIDs         []string
	NewProductPlanIDs          []string
	MaterialRequirementIDs     []string
	DistributionRequirementIDs []string
	SupplyPlanIDs              []string
	SupplierCollaborationIDs   []string
	SafetyStockIDs             []string
	LeadTimeIDs                []string
}
