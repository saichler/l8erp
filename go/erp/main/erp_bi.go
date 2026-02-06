/*
 * BI (Business Intelligence) service activations
 */

package main

import (
	"github.com/saichler/l8erp/go/erp/common"
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

func activateBiServices(nic ifs.IVNic) {
	// Reporting
	reports.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reporttemplates.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportexecutions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportaccesses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	reportsubscriptions.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Dashboards
	dashboards.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dashboardwidgets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kpis.Activate(common.DB_CREDS, common.DB_NAME, nic)
	kpithresholds.Activate(common.DB_CREDS, common.DB_NAME, nic)
	drilldowns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dashboardshares.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Analytics
	datacubes.Activate(common.DB_CREDS, common.DB_NAME, nic)
	analysismodels.Activate(common.DB_CREDS, common.DB_NAME, nic)
	predictions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	trendanalyses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	scenarios.Activate(common.DB_CREDS, common.DB_NAME, nic)
	benchmarks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Data Management
	datasources.Activate(common.DB_CREDS, common.DB_NAME, nic)
	etljobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	etlschedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dataqualityrules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	masterdataconfigs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	datagovernances.Activate(common.DB_CREDS, common.DB_NAME, nic)
}
