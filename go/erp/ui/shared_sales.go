package ui

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
)

func registerSalesTypes(resources ifs.IResources) {
	// Customer Management
	common.RegisterType(resources, &sales.SalesCustomerHierarchy{}, &sales.SalesCustomerHierarchyList{}, "HierarchyId")
	common.RegisterType(resources, &sales.SalesCustomerSegment{}, &sales.SalesCustomerSegmentList{}, "SegmentId")
	common.RegisterType(resources, &sales.SalesCustomerContract{}, &sales.SalesCustomerContractList{}, "ContractId")
	common.RegisterType(resources, &sales.SalesPartnerChannel{}, &sales.SalesPartnerChannelList{}, "PartnerId")

	// Orders
	common.RegisterType(resources, &sales.SalesQuotation{}, &sales.SalesQuotationList{}, "QuotationId")
	common.RegisterType(resources, &sales.SalesOrder{}, &sales.SalesOrderList{}, "SalesOrderId")
	common.RegisterType(resources, &sales.SalesReturnOrder{}, &sales.SalesReturnOrderList{}, "ReturnOrderId")

	// Pricing
	common.RegisterType(resources, &sales.SalesPriceList{}, &sales.SalesPriceListList{}, "PriceListId")
	common.RegisterType(resources, &sales.SalesDiscountRule{}, &sales.SalesDiscountRuleList{}, "RuleId")
	common.RegisterType(resources, &sales.SalesPromotionalPrice{}, &sales.SalesPromotionalPriceList{}, "PromoId")

	// Shipping and Delivery
	common.RegisterType(resources, &sales.SalesDeliveryOrder{}, &sales.SalesDeliveryOrderList{}, "DeliveryOrderId")

	// Billing
	common.RegisterType(resources, &sales.SalesBillingSchedule{}, &sales.SalesBillingScheduleList{}, "ScheduleId")
	common.RegisterType(resources, &sales.SalesRevenueSchedule{}, &sales.SalesRevenueScheduleList{}, "ScheduleId")

	// Analytics
	common.RegisterType(resources, &sales.SalesTarget{}, &sales.SalesTargetList{}, "TargetId")
	common.RegisterType(resources, &sales.SalesTerritory{}, &sales.SalesTerritoryList{}, "TerritoryId")
	common.RegisterType(resources, &sales.SalesCommissionPlan{}, &sales.SalesCommissionPlanList{}, "PlanId")
	common.RegisterType(resources, &sales.SalesForecast{}, &sales.SalesForecastList{}, "ForecastId")
}
