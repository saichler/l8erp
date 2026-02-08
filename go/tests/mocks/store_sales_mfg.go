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
	SalesDeliveryOrderIDs   []string
	SalesDeliveryLineIDs    []string
	SalesPickReleaseIDs     []string
	SalesShippingDocIDs     []string
	SalesPackingSlipIDs     []string
	SalesDeliveryConfirmIDs []string

	// Sales Phase 7: Billing
	SalesBillingScheduleIDs  []string
	SalesBillingMilestoneIDs []string
	SalesRevenueScheduleIDs  []string

	// Sales Phase 8: Analytics
	SalesCommissionPlanIDs  []string
	SalesCommissionCalcIDs  []string
	SalesTerritoryAssignIDs []string
	SalesTargetIDs          []string
	SalesForecastIDs        []string
}

// MFGStore holds generated IDs for MFG module
type MFGStore struct {
	// MFG Phase 1: Foundation (Shop Floor & Engineering)
	MfgWorkCenterIDs    []string
	MfgWorkCenterCapIDs []string
	MfgShiftScheduleIDs []string
	MfgBomIDs           []string
	MfgBomLineIDs       []string
	MfgRoutingIDs       []string
	MfgRoutingOpIDs     []string

	// MFG Phase 2: Engineering Change & Quality Plans
	MfgEngChangeOrderIDs  []string
	MfgEngChangeDetailIDs []string
	MfgQualityPlanIDs     []string
	MfgInspectionPointIDs []string

	// MFG Phase 3: Work Orders & Production
	MfgWorkOrderIDs       []string
	MfgWorkOrderOpIDs     []string
	MfgProductionOrderIDs []string
	MfgProdOrderLineIDs   []string
	MfgProdBatchIDs       []string

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
}
