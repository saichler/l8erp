package tests

import (
	"github.com/saichler/l8erp/go/erp/sales/backorders"
	"github.com/saichler/l8erp/go/erp/sales/billingmilestones"
	"github.com/saichler/l8erp/go/erp/sales/billingschedules"
	"github.com/saichler/l8erp/go/erp/sales/commissioncalcs"
	"github.com/saichler/l8erp/go/erp/sales/commissionplans"
	"github.com/saichler/l8erp/go/erp/sales/customercontracts"
	"github.com/saichler/l8erp/go/erp/sales/customerhierarchies"
	"github.com/saichler/l8erp/go/erp/sales/customerprices"
	"github.com/saichler/l8erp/go/erp/sales/customersegments"
	"github.com/saichler/l8erp/go/erp/sales/deliveryconfirms"
	"github.com/saichler/l8erp/go/erp/sales/deliverylines"
	"github.com/saichler/l8erp/go/erp/sales/deliveryorders"
	"github.com/saichler/l8erp/go/erp/sales/discountrules"
	"github.com/saichler/l8erp/go/erp/sales/orderallocations"
	"github.com/saichler/l8erp/go/erp/sales/packingslips"
	"github.com/saichler/l8erp/go/erp/sales/partnerchannels"
	"github.com/saichler/l8erp/go/erp/sales/pickreleases"
	"github.com/saichler/l8erp/go/erp/sales/pricelistentries"
	"github.com/saichler/l8erp/go/erp/sales/pricelists"
	"github.com/saichler/l8erp/go/erp/sales/promotionalprices"
	"github.com/saichler/l8erp/go/erp/sales/quantitybreaks"
	"github.com/saichler/l8erp/go/erp/sales/quotationlines"
	"github.com/saichler/l8erp/go/erp/sales/returnorderlines"
	"github.com/saichler/l8erp/go/erp/sales/returnorders"
	"github.com/saichler/l8erp/go/erp/sales/revenueschedules"
	"github.com/saichler/l8erp/go/erp/sales/salesforecasts"
	"github.com/saichler/l8erp/go/erp/sales/salesorderlines"
	"github.com/saichler/l8erp/go/erp/sales/salesorders"
	"github.com/saichler/l8erp/go/erp/sales/salesquotations"
	"github.com/saichler/l8erp/go/erp/sales/salestargets"
	"github.com/saichler/l8erp/go/erp/sales/salesterritories"
	"github.com/saichler/l8erp/go/erp/sales/shippingdocs"
	"github.com/saichler/l8erp/go/erp/sales/territoryassigns"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceHandlersSALES(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := backorders.BackOrders(vnic); !ok || h == nil {
		log.Fail(t, "BackOrder service handler not found")
	}
	if h, ok := billingmilestones.BillingMilestones(vnic); !ok || h == nil {
		log.Fail(t, "BillingMilestone service handler not found")
	}
	if h, ok := billingschedules.BillingSchedules(vnic); !ok || h == nil {
		log.Fail(t, "BillingSchedule service handler not found")
	}
	if h, ok := commissioncalcs.CommissionCalcs(vnic); !ok || h == nil {
		log.Fail(t, "CommissionCalc service handler not found")
	}
	if h, ok := commissionplans.CommissionPlans(vnic); !ok || h == nil {
		log.Fail(t, "CommissionPlan service handler not found")
	}
	if h, ok := customercontracts.CustomerContracts(vnic); !ok || h == nil {
		log.Fail(t, "CustomerContract service handler not found")
	}
	if h, ok := customerhierarchies.CustomerHierarchies(vnic); !ok || h == nil {
		log.Fail(t, "CustomerHierarchy service handler not found")
	}
	if h, ok := customerprices.CustomerPrices(vnic); !ok || h == nil {
		log.Fail(t, "CustomerPrice service handler not found")
	}
	if h, ok := customersegments.CustomerSegments(vnic); !ok || h == nil {
		log.Fail(t, "CustomerSegment service handler not found")
	}
	if h, ok := deliveryconfirms.DeliveryConfirms(vnic); !ok || h == nil {
		log.Fail(t, "DeliveryConfirm service handler not found")
	}
	if h, ok := deliverylines.DeliveryLines(vnic); !ok || h == nil {
		log.Fail(t, "DeliveryLine service handler not found")
	}
	if h, ok := deliveryorders.DeliveryOrders(vnic); !ok || h == nil {
		log.Fail(t, "DeliveryOrder service handler not found")
	}
	if h, ok := discountrules.DiscountRules(vnic); !ok || h == nil {
		log.Fail(t, "DiscountRule service handler not found")
	}
	if h, ok := orderallocations.OrderAllocations(vnic); !ok || h == nil {
		log.Fail(t, "OrderAllocation service handler not found")
	}
	if h, ok := packingslips.PackingSlips(vnic); !ok || h == nil {
		log.Fail(t, "PackingSlip service handler not found")
	}
	if h, ok := partnerchannels.PartnerChannels(vnic); !ok || h == nil {
		log.Fail(t, "PartnerChannel service handler not found")
	}
	if h, ok := pickreleases.PickReleases(vnic); !ok || h == nil {
		log.Fail(t, "PickRelease service handler not found")
	}
	if h, ok := pricelistentries.PriceListEntries(vnic); !ok || h == nil {
		log.Fail(t, "PriceListEntry service handler not found")
	}
	if h, ok := pricelists.PriceLists(vnic); !ok || h == nil {
		log.Fail(t, "PriceList service handler not found")
	}
	if h, ok := promotionalprices.PromotionalPrices(vnic); !ok || h == nil {
		log.Fail(t, "PromotionalPrice service handler not found")
	}
	if h, ok := quantitybreaks.QuantityBreaks(vnic); !ok || h == nil {
		log.Fail(t, "QuantityBreak service handler not found")
	}
	if h, ok := quotationlines.QuotationLines(vnic); !ok || h == nil {
		log.Fail(t, "QuotationLine service handler not found")
	}
	if h, ok := returnorderlines.ReturnOrderLines(vnic); !ok || h == nil {
		log.Fail(t, "ReturnOrderLine service handler not found")
	}
	if h, ok := returnorders.ReturnOrders(vnic); !ok || h == nil {
		log.Fail(t, "ReturnOrder service handler not found")
	}
	if h, ok := revenueschedules.RevenueSchedules(vnic); !ok || h == nil {
		log.Fail(t, "RevenueSchedule service handler not found")
	}
	if h, ok := salesforecasts.SalesForecasts(vnic); !ok || h == nil {
		log.Fail(t, "SalesForecast service handler not found")
	}
	if h, ok := salesorderlines.SalesOrderLines(vnic); !ok || h == nil {
		log.Fail(t, "SalesOrderLine service handler not found")
	}
	if h, ok := salesorders.SalesOrders(vnic); !ok || h == nil {
		log.Fail(t, "SalesOrder service handler not found")
	}
	if h, ok := salesquotations.SalesQuotations(vnic); !ok || h == nil {
		log.Fail(t, "SalesQuotation service handler not found")
	}
	if h, ok := salestargets.SalesTargets(vnic); !ok || h == nil {
		log.Fail(t, "SalesTarget service handler not found")
	}
	if h, ok := salesterritories.SalesTerritories(vnic); !ok || h == nil {
		log.Fail(t, "SalesTerritory service handler not found")
	}
	if h, ok := shippingdocs.ShippingDocs(vnic); !ok || h == nil {
		log.Fail(t, "ShippingDoc service handler not found")
	}
	if h, ok := territoryassigns.TerritoryAssigns(vnic); !ok || h == nil {
		log.Fail(t, "TerritoryAssign service handler not found")
	}
}
