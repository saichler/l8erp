/*
© 2025 Sharon Aicler (saichler@gmail.com)
FIN and SCM module ID stores for mock data generation
*/
package main

// FINStore holds generated IDs for FIN module
type FINStore struct {
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
}
