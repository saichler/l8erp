/*
 * Sales service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
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
)

func activateSalesServices(nic ifs.IVNic) {
	// Customer Management
	customerhierarchies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customersegments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customercontracts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	partnerchannels.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Sales Orders
	salesquotations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	quotationlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	orderallocations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	backorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Pricing
	pricelists.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pricelistentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	customerprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	discountrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	promotionalprices.Activate(common.DB_CREDS, common.DB_NAME, nic)
	quantitybreaks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Shipping and Delivery
	deliveryorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliverylines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	pickreleases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	packingslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shippingdocs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliveryconfirms.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Billing
	billingschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	billingmilestones.Activate(common.DB_CREDS, common.DB_NAME, nic)
	revenueschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Sales Analytics
	salestargets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesterritories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	territoryassigns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	commissionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	commissioncalcs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salesforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
