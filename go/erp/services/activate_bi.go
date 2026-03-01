/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Reporting
	"github.com/saichler/l8erp/go/erp/bi/reports"
	"github.com/saichler/l8erp/go/erp/bi/reporttemplates"

	// Dashboards
	"github.com/saichler/l8erp/go/erp/bi/dashboards"
	"github.com/saichler/l8erp/go/erp/bi/kpis"

	// Analytics
	"github.com/saichler/l8erp/go/erp/bi/analysismodels"
	"github.com/saichler/l8erp/go/erp/bi/benchmarks"
	"github.com/saichler/l8erp/go/erp/bi/datacubes"
	"github.com/saichler/l8erp/go/erp/bi/scenarios"
	"github.com/saichler/l8erp/go/erp/bi/trendanalyses"

	// Data Management
	"github.com/saichler/l8erp/go/erp/bi/datagovernances"
	"github.com/saichler/l8erp/go/erp/bi/dataqualityrules"
	"github.com/saichler/l8erp/go/erp/bi/datasources"
	"github.com/saichler/l8erp/go/erp/bi/etljobs"
	"github.com/saichler/l8erp/go/erp/bi/masterdataconfigs"
)

func collectBiActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		// Reporting
		func() { reports.Activate(creds, dbname, nic) },
		func() { reporttemplates.Activate(creds, dbname, nic) },
		// Dashboards
		func() { dashboards.Activate(creds, dbname, nic) },
		func() { kpis.Activate(creds, dbname, nic) },
		// Analytics
		func() { datacubes.Activate(creds, dbname, nic) },
		func() { analysismodels.Activate(creds, dbname, nic) },
		func() { trendanalyses.Activate(creds, dbname, nic) },
		func() { scenarios.Activate(creds, dbname, nic) },
		func() { benchmarks.Activate(creds, dbname, nic) },
		// Data Management
		func() { datasources.Activate(creds, dbname, nic) },
		func() { etljobs.Activate(creds, dbname, nic) },
		func() { dataqualityrules.Activate(creds, dbname, nic) },
		func() { masterdataconfigs.Activate(creds, dbname, nic) },
		func() { datagovernances.Activate(creds, dbname, nic) },
	}
}
