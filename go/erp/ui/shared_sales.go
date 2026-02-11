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
	common.RegisterType[sales.SalesOrder, sales.SalesOrderList](resources, "SalesOrderId")
	common.RegisterType[sales.SalesReturnOrder, sales.SalesReturnOrderList](resources, "ReturnOrderId")

	// Pricing
	common.RegisterType[sales.SalesPriceList, sales.SalesPriceListList](resources, "PriceListId")
	common.RegisterType[sales.SalesDiscountRule, sales.SalesDiscountRuleList](resources, "RuleId")
	common.RegisterType[sales.SalesPromotionalPrice, sales.SalesPromotionalPriceList](resources, "PromoId")

	// Shipping and Delivery
	common.RegisterType[sales.SalesDeliveryOrder, sales.SalesDeliveryOrderList](resources, "DeliveryOrderId")

	// Billing
	common.RegisterType[sales.SalesBillingSchedule, sales.SalesBillingScheduleList](resources, "ScheduleId")
	common.RegisterType[sales.SalesRevenueSchedule, sales.SalesRevenueScheduleList](resources, "ScheduleId")

	// Analytics
	common.RegisterType[sales.SalesTarget, sales.SalesTargetList](resources, "TargetId")
	common.RegisterType[sales.SalesTerritory, sales.SalesTerritoryList](resources, "TerritoryId")
	common.RegisterType[sales.SalesCommissionPlan, sales.SalesCommissionPlanList](resources, "PlanId")
	common.RegisterType[sales.SalesForecast, sales.SalesForecastList](resources, "ForecastId")
}
