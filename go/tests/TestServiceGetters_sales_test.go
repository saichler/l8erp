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

func testServiceGettersSALES(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := backorders.BackOrder("test-id", vnic); err != nil {
		log.Fail(t, "BackOrder getter failed: ", err.Error())
	}
	if _, err := billingmilestones.BillingMilestone("test-id", vnic); err != nil {
		log.Fail(t, "BillingMilestone getter failed: ", err.Error())
	}
	if _, err := billingschedules.BillingSchedule("test-id", vnic); err != nil {
		log.Fail(t, "BillingSchedule getter failed: ", err.Error())
	}
	if _, err := commissioncalcs.CommissionCalc("test-id", vnic); err != nil {
		log.Fail(t, "CommissionCalc getter failed: ", err.Error())
	}
	if _, err := commissionplans.CommissionPlan("test-id", vnic); err != nil {
		log.Fail(t, "CommissionPlan getter failed: ", err.Error())
	}
	if _, err := customercontracts.CustomerContract("test-id", vnic); err != nil {
		log.Fail(t, "CustomerContract getter failed: ", err.Error())
	}
	if _, err := customerhierarchies.CustomerHierarchy("test-id", vnic); err != nil {
		log.Fail(t, "CustomerHierarchy getter failed: ", err.Error())
	}
	if _, err := customerprices.CustomerPrice("test-id", vnic); err != nil {
		log.Fail(t, "CustomerPrice getter failed: ", err.Error())
	}
	if _, err := customersegments.CustomerSegment("test-id", vnic); err != nil {
		log.Fail(t, "CustomerSegment getter failed: ", err.Error())
	}
	if _, err := deliveryconfirms.DeliveryConfirm("test-id", vnic); err != nil {
		log.Fail(t, "DeliveryConfirm getter failed: ", err.Error())
	}
	if _, err := deliverylines.DeliveryLine("test-id", vnic); err != nil {
		log.Fail(t, "DeliveryLine getter failed: ", err.Error())
	}
	if _, err := deliveryorders.DeliveryOrder("test-id", vnic); err != nil {
		log.Fail(t, "DeliveryOrder getter failed: ", err.Error())
	}
	if _, err := discountrules.DiscountRule("test-id", vnic); err != nil {
		log.Fail(t, "DiscountRule getter failed: ", err.Error())
	}
	if _, err := orderallocations.OrderAllocation("test-id", vnic); err != nil {
		log.Fail(t, "OrderAllocation getter failed: ", err.Error())
	}
	if _, err := packingslips.PackingSlip("test-id", vnic); err != nil {
		log.Fail(t, "PackingSlip getter failed: ", err.Error())
	}
	if _, err := partnerchannels.PartnerChannel("test-id", vnic); err != nil {
		log.Fail(t, "PartnerChannel getter failed: ", err.Error())
	}
	if _, err := pickreleases.PickRelease("test-id", vnic); err != nil {
		log.Fail(t, "PickRelease getter failed: ", err.Error())
	}
	if _, err := pricelistentries.PriceListEntry("test-id", vnic); err != nil {
		log.Fail(t, "PriceListEntry getter failed: ", err.Error())
	}
	if _, err := pricelists.PriceList("test-id", vnic); err != nil {
		log.Fail(t, "PriceList getter failed: ", err.Error())
	}
	if _, err := promotionalprices.PromotionalPrice("test-id", vnic); err != nil {
		log.Fail(t, "PromotionalPrice getter failed: ", err.Error())
	}
	if _, err := quantitybreaks.QuantityBreak("test-id", vnic); err != nil {
		log.Fail(t, "QuantityBreak getter failed: ", err.Error())
	}
	if _, err := quotationlines.QuotationLine("test-id", vnic); err != nil {
		log.Fail(t, "QuotationLine getter failed: ", err.Error())
	}
	if _, err := returnorderlines.ReturnOrderLine("test-id", vnic); err != nil {
		log.Fail(t, "ReturnOrderLine getter failed: ", err.Error())
	}
	if _, err := returnorders.ReturnOrder("test-id", vnic); err != nil {
		log.Fail(t, "ReturnOrder getter failed: ", err.Error())
	}
	if _, err := revenueschedules.RevenueSchedule("test-id", vnic); err != nil {
		log.Fail(t, "RevenueSchedule getter failed: ", err.Error())
	}
	if _, err := salesforecasts.SalesForecast("test-id", vnic); err != nil {
		log.Fail(t, "SalesForecast getter failed: ", err.Error())
	}
	if _, err := salesorderlines.SalesOrderLine("test-id", vnic); err != nil {
		log.Fail(t, "SalesOrderLine getter failed: ", err.Error())
	}
	if _, err := salesorders.SalesOrder("test-id", vnic); err != nil {
		log.Fail(t, "SalesOrder getter failed: ", err.Error())
	}
	if _, err := salesquotations.SalesQuotation("test-id", vnic); err != nil {
		log.Fail(t, "SalesQuotation getter failed: ", err.Error())
	}
	if _, err := salestargets.SalesTarget("test-id", vnic); err != nil {
		log.Fail(t, "SalesTarget getter failed: ", err.Error())
	}
	if _, err := salesterritories.SalesTerritory("test-id", vnic); err != nil {
		log.Fail(t, "SalesTerritory getter failed: ", err.Error())
	}
	if _, err := shippingdocs.ShippingDoc("test-id", vnic); err != nil {
		log.Fail(t, "ShippingDoc getter failed: ", err.Error())
	}
	if _, err := territoryassigns.TerritoryAssign("test-id", vnic); err != nil {
		log.Fail(t, "TerritoryAssign getter failed: ", err.Error())
	}
}
