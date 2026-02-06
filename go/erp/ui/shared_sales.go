package main

import (
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

func registerSalesTypes(resources ifs.IResources) {
	// Customer Management
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerHierarchy{}, "HierarchyId")
	resources.Registry().Register(&sales.SalesCustomerHierarchyList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerSegment{}, "SegmentId")
	resources.Registry().Register(&sales.SalesCustomerSegmentList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerContract{}, "ContractId")
	resources.Registry().Register(&sales.SalesCustomerContractList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPartnerChannel{}, "PartnerId")
	resources.Registry().Register(&sales.SalesPartnerChannelList{})

	// Orders
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuotation{}, "QuotationId")
	resources.Registry().Register(&sales.SalesQuotationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuotationLine{}, "LineId")
	resources.Registry().Register(&sales.SalesQuotationLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrder{}, "SalesOrderId")
	resources.Registry().Register(&sales.SalesOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrderLine{}, "LineId")
	resources.Registry().Register(&sales.SalesOrderLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesOrderAllocation{}, "AllocationId")
	resources.Registry().Register(&sales.SalesOrderAllocationList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBackOrder{}, "BackOrderId")
	resources.Registry().Register(&sales.SalesBackOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesReturnOrder{}, "ReturnOrderId")
	resources.Registry().Register(&sales.SalesReturnOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesReturnOrderLine{}, "LineId")
	resources.Registry().Register(&sales.SalesReturnOrderLineList{})

	// Pricing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPriceList{}, "PriceListId")
	resources.Registry().Register(&sales.SalesPriceListList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPriceListEntry{}, "EntryId")
	resources.Registry().Register(&sales.SalesPriceListEntryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCustomerPrice{}, "CustomerPriceId")
	resources.Registry().Register(&sales.SalesCustomerPriceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDiscountRule{}, "RuleId")
	resources.Registry().Register(&sales.SalesDiscountRuleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPromotionalPrice{}, "PromoId")
	resources.Registry().Register(&sales.SalesPromotionalPriceList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesQuantityBreak{}, "BreakId")
	resources.Registry().Register(&sales.SalesQuantityBreakList{})

	// Shipping and Delivery
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryOrder{}, "DeliveryOrderId")
	resources.Registry().Register(&sales.SalesDeliveryOrderList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryLine{}, "LineId")
	resources.Registry().Register(&sales.SalesDeliveryLineList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPickRelease{}, "PickReleaseId")
	resources.Registry().Register(&sales.SalesPickReleaseList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesPackingSlip{}, "PackingSlipId")
	resources.Registry().Register(&sales.SalesPackingSlipList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesShippingDoc{}, "DocId")
	resources.Registry().Register(&sales.SalesShippingDocList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesDeliveryConfirm{}, "ConfirmId")
	resources.Registry().Register(&sales.SalesDeliveryConfirmList{})

	// Billing
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBillingSchedule{}, "ScheduleId")
	resources.Registry().Register(&sales.SalesBillingScheduleList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesBillingMilestone{}, "MilestoneId")
	resources.Registry().Register(&sales.SalesBillingMilestoneList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesRevenueSchedule{}, "ScheduleId")
	resources.Registry().Register(&sales.SalesRevenueScheduleList{})

	// Analytics
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTarget{}, "TargetId")
	resources.Registry().Register(&sales.SalesTargetList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTerritory{}, "TerritoryId")
	resources.Registry().Register(&sales.SalesTerritoryList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesTerritoryAssign{}, "AssignmentId")
	resources.Registry().Register(&sales.SalesTerritoryAssignList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCommissionPlan{}, "PlanId")
	resources.Registry().Register(&sales.SalesCommissionPlanList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesCommissionCalc{}, "CalcId")
	resources.Registry().Register(&sales.SalesCommissionCalcList{})
	resources.Introspector().Decorators().AddPrimaryKeyDecorator(&sales.SalesForecast{}, "ForecastId")
	resources.Registry().Register(&sales.SalesForecastList{})
}
