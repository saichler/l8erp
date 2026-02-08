/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8types/go/ifs"

	// Reporting
	"github.com/saichler/l8erp/go/erp/bi/reportaccesses"
	"github.com/saichler/l8erp/go/erp/bi/reportexecutions"
	"github.com/saichler/l8erp/go/erp/bi/reports"
	"github.com/saichler/l8erp/go/erp/bi/reportschedules"
	"github.com/saichler/l8erp/go/erp/bi/reportsubscriptions"
	"github.com/saichler/l8erp/go/erp/bi/reporttemplates"

	// Dashboards
	"github.com/saichler/l8erp/go/erp/bi/dashboards"
	"github.com/saichler/l8erp/go/erp/bi/dashboardshares"
	"github.com/saichler/l8erp/go/erp/bi/dashboardwidgets"
	"github.com/saichler/l8erp/go/erp/bi/drilldowns"
	"github.com/saichler/l8erp/go/erp/bi/kpis"
	"github.com/saichler/l8erp/go/erp/bi/kpithresholds"

	// Analytics
	"github.com/saichler/l8erp/go/erp/bi/analysismodels"
	"github.com/saichler/l8erp/go/erp/bi/benchmarks"
	"github.com/saichler/l8erp/go/erp/bi/datacubes"
	"github.com/saichler/l8erp/go/erp/bi/predictions"
	"github.com/saichler/l8erp/go/erp/bi/scenarios"
	"github.com/saichler/l8erp/go/erp/bi/trendanalyses"

	// Data Management
	"github.com/saichler/l8erp/go/erp/bi/datagovernances"
	"github.com/saichler/l8erp/go/erp/bi/dataqualityrules"
	"github.com/saichler/l8erp/go/erp/bi/datasources"
	"github.com/saichler/l8erp/go/erp/bi/etljobs"
	"github.com/saichler/l8erp/go/erp/bi/etlschedules"
	"github.com/saichler/l8erp/go/erp/bi/masterdataconfigs"
)

func ActivateBiServices(creds, dbname string, nic ifs.IVNic) {
	// Reporting
	reports.Activate(creds, dbname, nic)
	reporttemplates.Activate(creds, dbname, nic)
	reportschedules.Activate(creds, dbname, nic)
	reportexecutions.Activate(creds, dbname, nic)
	reportaccesses.Activate(creds, dbname, nic)
	reportsubscriptions.Activate(creds, dbname, nic)

	// Dashboards
	dashboards.Activate(creds, dbname, nic)
	dashboardwidgets.Activate(creds, dbname, nic)
	kpis.Activate(creds, dbname, nic)
	kpithresholds.Activate(creds, dbname, nic)
	drilldowns.Activate(creds, dbname, nic)
	dashboardshares.Activate(creds, dbname, nic)

	// Analytics
	datacubes.Activate(creds, dbname, nic)
	analysismodels.Activate(creds, dbname, nic)
	predictions.Activate(creds, dbname, nic)
	trendanalyses.Activate(creds, dbname, nic)
	scenarios.Activate(creds, dbname, nic)
	benchmarks.Activate(creds, dbname, nic)

	// Data Management
	datasources.Activate(creds, dbname, nic)
	etljobs.Activate(creds, dbname, nic)
	etlschedules.Activate(creds, dbname, nic)
	dataqualityrules.Activate(creds, dbname, nic)
	masterdataconfigs.Activate(creds, dbname, nic)
	datagovernances.Activate(creds, dbname, nic)
}
