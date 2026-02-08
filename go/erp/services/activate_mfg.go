/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
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

func ActivateMfgServices(creds, dbname string, nic ifs.IVNic) {
	// Engineering
	boms.Activate(creds, dbname, nic)
	bomlines.Activate(creds, dbname, nic)
	routings.Activate(creds, dbname, nic)
	routingoperations.Activate(creds, dbname, nic)
	engchangeorders.Activate(creds, dbname, nic)
	engchangedetails.Activate(creds, dbname, nic)
	// Production
	workorders.Activate(creds, dbname, nic)
	workorderops.Activate(creds, dbname, nic)
	productionorders.Activate(creds, dbname, nic)
	prodorderlines.Activate(creds, dbname, nic)
	prodbatches.Activate(creds, dbname, nic)
	prodconsumptions.Activate(creds, dbname, nic)
	// Shop Floor
	workcenters.Activate(creds, dbname, nic)
	workcentercaps.Activate(creds, dbname, nic)
	laborentries.Activate(creds, dbname, nic)
	machineentries.Activate(creds, dbname, nic)
	shiftschedules.Activate(creds, dbname, nic)
	downtimeevents.Activate(creds, dbname, nic)
	// Quality
	qualityplans.Activate(creds, dbname, nic)
	inspectionpoints.Activate(creds, dbname, nic)
	qualityinspections.Activate(creds, dbname, nic)
	testresults.Activate(creds, dbname, nic)
	ncrs.Activate(creds, dbname, nic)
	ncractions.Activate(creds, dbname, nic)
	// Planning
	mrpruns.Activate(creds, dbname, nic)
	mrprequirements.Activate(creds, dbname, nic)
	capacityplans.Activate(creds, dbname, nic)
	capacityloads.Activate(creds, dbname, nic)
	prodschedules.Activate(creds, dbname, nic)
	scheduleblocks.Activate(creds, dbname, nic)
	// Costing
	standardcosts.Activate(creds, dbname, nic)
	costrollups.Activate(creds, dbname, nic)
	actualcosts.Activate(creds, dbname, nic)
	costvariances.Activate(creds, dbname, nic)
	overheads.Activate(creds, dbname, nic)
	overheadallocs.Activate(creds, dbname, nic)
}
