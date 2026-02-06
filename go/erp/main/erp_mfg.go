/*
 * MFG (Manufacturing) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"

	// Engineering
	"github.com/saichler/l8erp/go/erp/mfg/bomlines"
	"github.com/saichler/l8erp/go/erp/mfg/boms"
	"github.com/saichler/l8erp/go/erp/mfg/engchangedetails"
	"github.com/saichler/l8erp/go/erp/mfg/engchangeorders"
	"github.com/saichler/l8erp/go/erp/mfg/routingoperations"
	"github.com/saichler/l8erp/go/erp/mfg/routings"

	// Production
	"github.com/saichler/l8erp/go/erp/mfg/prodbatches"
	"github.com/saichler/l8erp/go/erp/mfg/prodconsumptions"
	"github.com/saichler/l8erp/go/erp/mfg/prodorderlines"
	"github.com/saichler/l8erp/go/erp/mfg/productionorders"
	"github.com/saichler/l8erp/go/erp/mfg/workorderops"
	"github.com/saichler/l8erp/go/erp/mfg/workorders"

	// Shop Floor
	"github.com/saichler/l8erp/go/erp/mfg/downtimeevents"
	"github.com/saichler/l8erp/go/erp/mfg/laborentries"
	"github.com/saichler/l8erp/go/erp/mfg/machineentries"
	"github.com/saichler/l8erp/go/erp/mfg/shiftschedules"
	"github.com/saichler/l8erp/go/erp/mfg/workcentercaps"
	"github.com/saichler/l8erp/go/erp/mfg/workcenters"

	// Quality
	"github.com/saichler/l8erp/go/erp/mfg/inspectionpoints"
	"github.com/saichler/l8erp/go/erp/mfg/ncractions"
	"github.com/saichler/l8erp/go/erp/mfg/ncrs"
	"github.com/saichler/l8erp/go/erp/mfg/qualityinspections"
	"github.com/saichler/l8erp/go/erp/mfg/qualityplans"
	"github.com/saichler/l8erp/go/erp/mfg/testresults"

	// Planning
	"github.com/saichler/l8erp/go/erp/mfg/capacityloads"
	"github.com/saichler/l8erp/go/erp/mfg/capacityplans"
	"github.com/saichler/l8erp/go/erp/mfg/mrprequirements"
	"github.com/saichler/l8erp/go/erp/mfg/mrpruns"
	"github.com/saichler/l8erp/go/erp/mfg/prodschedules"
	"github.com/saichler/l8erp/go/erp/mfg/scheduleblocks"

	// Costing
	"github.com/saichler/l8erp/go/erp/mfg/actualcosts"
	"github.com/saichler/l8erp/go/erp/mfg/costrollups"
	"github.com/saichler/l8erp/go/erp/mfg/costvariances"
	"github.com/saichler/l8erp/go/erp/mfg/overheadallocs"
	"github.com/saichler/l8erp/go/erp/mfg/overheads"
	"github.com/saichler/l8erp/go/erp/mfg/standardcosts"
)

func activateMfgServices(nic ifs.IVNic) {
	// Engineering
	boms.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bomlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	routingoperations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	engchangeorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	engchangedetails.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Production
	workorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	workorderops.Activate(common.DB_CREDS, common.DB_NAME, nic)
	productionorders.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodorderlines.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodbatches.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodconsumptions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Shop Floor
	workcenters.Activate(common.DB_CREDS, common.DB_NAME, nic)
	workcentercaps.Activate(common.DB_CREDS, common.DB_NAME, nic)
	laborentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	machineentries.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shiftschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	downtimeevents.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Quality
	qualityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	inspectionpoints.Activate(common.DB_CREDS, common.DB_NAME, nic)
	qualityinspections.Activate(common.DB_CREDS, common.DB_NAME, nic)
	testresults.Activate(common.DB_CREDS, common.DB_NAME, nic)
	ncrs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	ncractions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Planning
	mrpruns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	mrprequirements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capacityplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	capacityloads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	prodschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	scheduleblocks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Costing
	standardcosts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	costrollups.Activate(common.DB_CREDS, common.DB_NAME, nic)
	actualcosts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	costvariances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	overheads.Activate(common.DB_CREDS, common.DB_NAME, nic)
	overheadallocs.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
