package ui

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

func registerSalesTypes(resources ifs.IResources) {
	// Customer Management
	common.RegisterType[sales.SalesCustomerHierarchy, sales.SalesCustomerHierarchyList](resources, "HierarchyId")
	common.RegisterType[sales.SalesCustomerSegment, sales.SalesCustomerSegmentList](resources, "SegmentId")
	common.RegisterType[sales.SalesCustomerContract, sales.SalesCustomerContractList](resources, "ContractId")
	common.RegisterType[sales.SalesPartnerChannel, sales.SalesPartnerChannelList](resources, "PartnerId")

	// Orders
	common.RegisterType[sales.SalesQuotation, sales.SalesQuotationList](resources, "QuotationId")
	common.RegisterType[sales.SalesQuotationLine, sales.SalesQuotationLineList](resources, "LineId")
	common.RegisterType[sales.SalesOrder, sales.SalesOrderList](resources, "SalesOrderId")
	common.RegisterType[sales.SalesOrderLine, sales.SalesOrderLineList](resources, "LineId")
	common.RegisterType[sales.SalesOrderAllocation, sales.SalesOrderAllocationList](resources, "AllocationId")
	common.RegisterType[sales.SalesBackOrder, sales.SalesBackOrderList](resources, "BackOrderId")
	common.RegisterType[sales.SalesReturnOrder, sales.SalesReturnOrderList](resources, "ReturnOrderId")
	common.RegisterType[sales.SalesReturnOrderLine, sales.SalesReturnOrderLineList](resources, "LineId")

	// Pricing
	common.RegisterType[sales.SalesPriceList, sales.SalesPriceListList](resources, "PriceListId")
	common.RegisterType[sales.SalesPriceListEntry, sales.SalesPriceListEntryList](resources, "EntryId")
	common.RegisterType[sales.SalesCustomerPrice, sales.SalesCustomerPriceList](resources, "CustomerPriceId")
	common.RegisterType[sales.SalesDiscountRule, sales.SalesDiscountRuleList](resources, "RuleId")
	common.RegisterType[sales.SalesPromotionalPrice, sales.SalesPromotionalPriceList](resources, "PromoId")
	common.RegisterType[sales.SalesQuantityBreak, sales.SalesQuantityBreakList](resources, "BreakId")

	// Shipping and Delivery
	common.RegisterType[sales.SalesDeliveryOrder, sales.SalesDeliveryOrderList](resources, "DeliveryOrderId")
	common.RegisterType[sales.SalesDeliveryLine, sales.SalesDeliveryLineList](resources, "LineId")
	common.RegisterType[sales.SalesPickRelease, sales.SalesPickReleaseList](resources, "PickReleaseId")
	common.RegisterType[sales.SalesPackingSlip, sales.SalesPackingSlipList](resources, "PackingSlipId")
	common.RegisterType[sales.SalesShippingDoc, sales.SalesShippingDocList](resources, "DocId")
	common.RegisterType[sales.SalesDeliveryConfirm, sales.SalesDeliveryConfirmList](resources, "ConfirmId")

	// Billing
	common.RegisterType[sales.SalesBillingSchedule, sales.SalesBillingScheduleList](resources, "ScheduleId")
	common.RegisterType[sales.SalesBillingMilestone, sales.SalesBillingMilestoneList](resources, "MilestoneId")
	common.RegisterType[sales.SalesRevenueSchedule, sales.SalesRevenueScheduleList](resources, "ScheduleId")

	// Analytics
	common.RegisterType[sales.SalesTarget, sales.SalesTargetList](resources, "TargetId")
	common.RegisterType[sales.SalesTerritory, sales.SalesTerritoryList](resources, "TerritoryId")
	common.RegisterType[sales.SalesTerritoryAssign, sales.SalesTerritoryAssignList](resources, "AssignmentId")
	common.RegisterType[sales.SalesCommissionPlan, sales.SalesCommissionPlanList](resources, "PlanId")
	common.RegisterType[sales.SalesCommissionCalc, sales.SalesCommissionCalcList](resources, "CalcId")
	common.RegisterType[sales.SalesForecast, sales.SalesForecastList](resources, "ForecastId")
}
