/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */

package services

import (
	"github.com/saichler/l8types/go/ifs"
	// Engineering
	"github.com/saichler/l8erp/go/erp/mfg/boms"
	"github.com/saichler/l8erp/go/erp/mfg/engchangeorders"
	"github.com/saichler/l8erp/go/erp/mfg/routings"
	// Production
	"github.com/saichler/l8erp/go/erp/mfg/productionorders"
	"github.com/saichler/l8erp/go/erp/mfg/workorders"
	// Shop Floor
	"github.com/saichler/l8erp/go/erp/mfg/downtimeevents"
	"github.com/saichler/l8erp/go/erp/mfg/shiftschedules"
	"github.com/saichler/l8erp/go/erp/mfg/workcentercaps"
	"github.com/saichler/l8erp/go/erp/mfg/workcenters"
	// Quality
	"github.com/saichler/l8erp/go/erp/mfg/ncrs"
	"github.com/saichler/l8erp/go/erp/mfg/qualityinspections"
	"github.com/saichler/l8erp/go/erp/mfg/qualityplans"
	// Planning
	"github.com/saichler/l8erp/go/erp/mfg/capacityplans"
	"github.com/saichler/l8erp/go/erp/mfg/mrpruns"
	"github.com/saichler/l8erp/go/erp/mfg/prodschedules"
	// Costing
	"github.com/saichler/l8erp/go/erp/mfg/costrollups"
	"github.com/saichler/l8erp/go/erp/mfg/overheads"
	"github.com/saichler/l8erp/go/erp/mfg/standardcosts"
)

func collectMfgActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Engineering
		func() { boms.Activate(creds, dbname, nic) },
		func() { routings.Activate(creds, dbname, nic) },
		func() { engchangeorders.Activate(creds, dbname, nic) },
		// Production
		func() { workorders.Activate(creds, dbname, nic) },
		func() { productionorders.Activate(creds, dbname, nic) },
		// Shop Floor
		func() { workcenters.Activate(creds, dbname, nic) },
		func() { workcentercaps.Activate(creds, dbname, nic) },
		func() { shiftschedules.Activate(creds, dbname, nic) },
		func() { downtimeevents.Activate(creds, dbname, nic) },
		// Quality
		func() { qualityplans.Activate(creds, dbname, nic) },
		func() { qualityinspections.Activate(creds, dbname, nic) },
		func() { ncrs.Activate(creds, dbname, nic) },
		// Planning
		func() { mrpruns.Activate(creds, dbname, nic) },
		func() { capacityplans.Activate(creds, dbname, nic) },
		func() { prodschedules.Activate(creds, dbname, nic) },
		// Costing
		func() { standardcosts.Activate(creds, dbname, nic) },
		func() { costrollups.Activate(creds, dbname, nic) },
		func() { overheads.Activate(creds, dbname, nic) },
	}
}
