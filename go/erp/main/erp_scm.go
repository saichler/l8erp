/*
 * SCM (Supply Chain Management) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/scm/bins"
	"github.com/saichler/l8erp/go/erp/scm/blanketorders"
	"github.com/saichler/l8erp/go/erp/scm/carriers"
	"github.com/saichler/l8erp/go/erp/scm/cyclecounts"
	"github.com/saichler/l8erp/go/erp/scm/deliveryproofs"
	"github.com/saichler/l8erp/go/erp/scm/demandforecasts"
	"github.com/saichler/l8erp/go/erp/scm/demandplans"
	"github.com/saichler/l8erp/go/erp/scm/distributionreqs"
	"github.com/saichler/l8erp/go/erp/scm/dockschedules"
	"github.com/saichler/l8erp/go/erp/scm/forecastaccuracies"
	"github.com/saichler/l8erp/go/erp/scm/forecastmodels"
	"github.com/saichler/l8erp/go/erp/scm/freightaudits"
	"github.com/saichler/l8erp/go/erp/scm/freightrates"
	"github.com/saichler/l8erp/go/erp/scm/inventoryvaluations"
	"github.com/saichler/l8erp/go/erp/scm/itemcategories"
	"github.com/saichler/l8erp/go/erp/scm/items"
	"github.com/saichler/l8erp/go/erp/scm/leadtimes"
	"github.com/saichler/l8erp/go/erp/scm/loadplans"
	"github.com/saichler/l8erp/go/erp/scm/lotnumbers"
	"github.com/saichler/l8erp/go/erp/scm/materialreqs"
	"github.com/saichler/l8erp/go/erp/scm/newproductplans"
	"github.com/saichler/l8erp/go/erp/scm/packtasks"
	"github.com/saichler/l8erp/go/erp/scm/picktasks"
	"github.com/saichler/l8erp/go/erp/scm/polines"
	"github.com/saichler/l8erp/go/erp/scm/promoplans"
	"github.com/saichler/l8erp/go/erp/scm/purchaseorders"
	"github.com/saichler/l8erp/go/erp/scm/purchasereqs"
	"github.com/saichler/l8erp/go/erp/scm/putawaytasks"
	"github.com/saichler/l8erp/go/erp/scm/receivingorders"
	"github.com/saichler/l8erp/go/erp/scm/reorderpoints"
	"github.com/saichler/l8erp/go/erp/scm/requisitionlines"
	"github.com/saichler/l8erp/go/erp/scm/returnauths"
	"github.com/saichler/l8erp/go/erp/scm/rfqs"
	"github.com/saichler/l8erp/go/erp/scm/routes"
	"github.com/saichler/l8erp/go/erp/scm/safetystocks"
	"github.com/saichler/l8erp/go/erp/scm/serialnumbers"
	"github.com/saichler/l8erp/go/erp/scm/shipments"
	"github.com/saichler/l8erp/go/erp/scm/shiptasks"
	"github.com/saichler/l8erp/go/erp/scm/stockmovements"
	"github.com/saichler/l8erp/go/erp/scm/suppliercollabs"
	"github.com/saichler/l8erp/go/erp/scm/supplierscorecards"
	"github.com/saichler/l8erp/go/erp/scm/supplyplans"
	"github.com/saichler/l8erp/go/erp/scm/warehouses"
	"github.com/saichler/l8erp/go/erp/scm/waveplans"
	"github.com/saichler/l8types/go/ifs"
)

func activateSCMServices(nic ifs.IVNic) {
	// Procurement
	purchasereqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	requisitionlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	rfqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	purchaseorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	polines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	blanketorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	supplierscorecards.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Inventory Management
	items.Activate(common.DB_CREDS, common.DB_NAME, nic)
	itemcategories.Activate(common.DB_CREDS, common.DB_NAME, nic)
	stockmovements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	lotnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	serialnumbers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cyclecounts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reorderpoints.Activate(common.DB_CREDS, common.DB_NAME, nic)
	inventoryvaluations.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Warehouse Management
	warehouses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bins.Activate(common.DB_CREDS, common.DB_NAME, nic)
	receivingorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	putawaytasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	picktasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	packtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shiptasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	waveplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dockschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Logistics and Transportation
	carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	freightrates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shipments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	loadplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	deliveryproofs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	freightaudits.Activate(common.DB_CREDS, common.DB_NAME, nic)
	returnauths.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Demand Planning
	demandforecasts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecastmodels.Activate(common.DB_CREDS, common.DB_NAME, nic)
	demandplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	promoplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	newproductplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	forecastaccuracies.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Supply Planning
	materialreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	distributionreqs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	supplyplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	suppliercollabs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	safetystocks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leadtimes.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
