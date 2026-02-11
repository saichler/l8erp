/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/erp/scm/blanketorders"
	"github.com/saichler/l8erp/go/erp/scm/carriers"
	"github.com/saichler/l8erp/go/erp/scm/cyclecounts"
	"github.com/saichler/l8erp/go/erp/scm/demandforecasts"
	"github.com/saichler/l8erp/go/erp/scm/demandplans"
	"github.com/saichler/l8erp/go/erp/scm/distributionreqs"
	"github.com/saichler/l8erp/go/erp/scm/dockschedules"
	"github.com/saichler/l8erp/go/erp/scm/forecastmodels"
	"github.com/saichler/l8erp/go/erp/scm/freightrates"
	"github.com/saichler/l8erp/go/erp/scm/itemcategories"
	"github.com/saichler/l8erp/go/erp/scm/items"
	"github.com/saichler/l8erp/go/erp/scm/leadtimes"
	"github.com/saichler/l8erp/go/erp/scm/loadplans"
	"github.com/saichler/l8erp/go/erp/scm/materialreqs"
	"github.com/saichler/l8erp/go/erp/scm/newproductplans"
	"github.com/saichler/l8erp/go/erp/scm/promoplans"
	"github.com/saichler/l8erp/go/erp/scm/purchaseorders"
	"github.com/saichler/l8erp/go/erp/scm/purchasereqs"
	"github.com/saichler/l8erp/go/erp/scm/receivingorders"
	"github.com/saichler/l8erp/go/erp/scm/returnauths"
	"github.com/saichler/l8erp/go/erp/scm/rfqs"
	"github.com/saichler/l8erp/go/erp/scm/routes"
	"github.com/saichler/l8erp/go/erp/scm/safetystocks"
	"github.com/saichler/l8erp/go/erp/scm/shipments"
	"github.com/saichler/l8erp/go/erp/scm/suppliercollabs"
	"github.com/saichler/l8erp/go/erp/scm/supplierscorecards"
	"github.com/saichler/l8erp/go/erp/scm/supplyplans"
	"github.com/saichler/l8erp/go/erp/scm/warehouses"
	"github.com/saichler/l8erp/go/erp/scm/waveplans"
)

func ActivateSCMServices(creds, dbname string, nic ifs.IVNic) {
	// Procurement
	purchasereqs.Activate(creds, dbname, nic)
	rfqs.Activate(creds, dbname, nic)
	purchaseorders.Activate(creds, dbname, nic)
	blanketorders.Activate(creds, dbname, nic)
	supplierscorecards.Activate(creds, dbname, nic)
	// Inventory Management
	items.Activate(creds, dbname, nic)
	itemcategories.Activate(creds, dbname, nic)
	cyclecounts.Activate(creds, dbname, nic)
	// Warehouse Management
	warehouses.Activate(creds, dbname, nic)
	receivingorders.Activate(creds, dbname, nic)
	waveplans.Activate(creds, dbname, nic)
	dockschedules.Activate(creds, dbname, nic)
	// Logistics and Transportation
	carriers.Activate(creds, dbname, nic)
	freightrates.Activate(creds, dbname, nic)
	shipments.Activate(creds, dbname, nic)
	routes.Activate(creds, dbname, nic)
	loadplans.Activate(creds, dbname, nic)
	returnauths.Activate(creds, dbname, nic)
	// Demand Planning
	demandforecasts.Activate(creds, dbname, nic)
	forecastmodels.Activate(creds, dbname, nic)
	demandplans.Activate(creds, dbname, nic)
	promoplans.Activate(creds, dbname, nic)
	newproductplans.Activate(creds, dbname, nic)
	// Supply Planning
	materialreqs.Activate(creds, dbname, nic)
	distributionreqs.Activate(creds, dbname, nic)
	supplyplans.Activate(creds, dbname, nic)
	suppliercollabs.Activate(creds, dbname, nic)
	safetystocks.Activate(creds, dbname, nic)
	leadtimes.Activate(creds, dbname, nic)
}
