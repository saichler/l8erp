/*
© 2025 Sharon Aicler (saichler@gmail.com)
Sales and MFG module ID stores for mock data generation
*/
package mocks

// SalesStore holds generated IDs for Sales module
type SalesStore struct {
	// Sales Phase 1: Foundation
	SalesTerritoryIDs         []string
	SalesPriceListIDs         []string
	SalesCustomerHierarchyIDs []string
	SalesCustomerSegmentIDs   []string

	// Sales Phase 2: Customer & Partners
	SalesPartnerChannelIDs   []string
	SalesCustomerContractIDs []string

	// Sales Phase 3: Pricing Setup
	SalesDiscountRuleIDs     []string
	SalesPromotionalPriceIDs []string

	// Sales Phase 4: Quotations
	SalesQuotationIDs []string

	// Sales Phase 5: Orders
	SalesOrderIDs       []string
	SalesReturnOrderIDs []string

	// Sales Phase 6: Shipping
	SalesDeliveryOrderIDs []string

	// Sales Phase 7: Billing
	SalesBillingScheduleIDs []string
	SalesRevenueScheduleIDs []string

	// Sales Phase 8: Analytics
	SalesCommissionPlanIDs []string
	SalesTargetIDs         []string
	SalesForecastIDs       []string
}

// MFGStore holds generated IDs for MFG module
type MFGStore struct {
	// MFG Phase 1: Foundation (Shop Floor & Engineering)
	MfgWorkCenterIDs    []string
	MfgWorkCenterCapIDs []string
	MfgShiftScheduleIDs []string
	MfgBomIDs           []string
	MfgRoutingIDs       []string

	// MFG Phase 2: Engineering Change & Quality Plans
	MfgEngChangeOrderIDs []string
	MfgQualityPlanIDs    []string

	// MFG Phase 3: Work Orders & Production
	MfgWorkOrderIDs       []string
	MfgProductionOrderIDs []string

	// MFG Phase 4: Shop Floor Transactions
	MfgDowntimeEventIDs []string

	// MFG Phase 5: Quality Transactions
	MfgQualityInspectionIDs []string
	MfgNCRIDs               []string

	// MFG Phase 6: Planning
	MfgMrpRunIDs       []string
	MfgCapacityPlanIDs []string
	MfgProdScheduleIDs []string

	// MFG Phase 7: Costing
	MfgStandardCostIDs []string
	MfgCostRollupIDs   []string
	MfgOverheadIDs     []string
}
