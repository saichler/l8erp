package tests

import (
	"github.com/saichler/l8erp/go/erp/bi/analysismodels"
	"github.com/saichler/l8erp/go/erp/bi/benchmarks"
	"github.com/saichler/l8erp/go/erp/bi/dashboards"
	"github.com/saichler/l8erp/go/erp/bi/datacubes"
	"github.com/saichler/l8erp/go/erp/bi/datagovernances"
	"github.com/saichler/l8erp/go/erp/bi/dataqualityrules"
	"github.com/saichler/l8erp/go/erp/bi/datasources"
	"github.com/saichler/l8erp/go/erp/bi/etljobs"
	"github.com/saichler/l8erp/go/erp/bi/kpis"
	"github.com/saichler/l8erp/go/erp/bi/masterdataconfigs"
	"github.com/saichler/l8erp/go/erp/bi/reports"
	"github.com/saichler/l8erp/go/erp/bi/reporttemplates"
	"github.com/saichler/l8erp/go/erp/bi/scenarios"
	"github.com/saichler/l8erp/go/erp/bi/trendanalyses"
	"github.com/saichler/l8types/go/ifs"
	"testing"
)

func testServiceGettersBI(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if _, err := analysismodels.BiAnalysisModel("test-id", vnic); err != nil {
		log.Fail(t, "BiAnalysisModel getter failed: ", err.Error())
	}
	if _, err := benchmarks.BiBenchmark("test-id", vnic); err != nil {
		log.Fail(t, "BiBenchmark getter failed: ", err.Error())
	}
	if _, err := dashboards.BiDashboard("test-id", vnic); err != nil {
		log.Fail(t, "BiDashboard getter failed: ", err.Error())
	}
	if _, err := datacubes.BiDataCube("test-id", vnic); err != nil {
		log.Fail(t, "BiDataCube getter failed: ", err.Error())
	}
	if _, err := datagovernances.BiDataGovernance("test-id", vnic); err != nil {
		log.Fail(t, "BiDataGovernance getter failed: ", err.Error())
	}
	if _, err := dataqualityrules.BiDataQualityRule("test-id", vnic); err != nil {
		log.Fail(t, "BiDataQualityRule getter failed: ", err.Error())
	}
	if _, err := datasources.BiDataSource("test-id", vnic); err != nil {
		log.Fail(t, "BiDataSource getter failed: ", err.Error())
	}
	if _, err := etljobs.BiETLJob("test-id", vnic); err != nil {
		log.Fail(t, "BiETLJob getter failed: ", err.Error())
	}
	if _, err := kpis.BiKPI("test-id", vnic); err != nil {
		log.Fail(t, "BiKPI getter failed: ", err.Error())
	}
	if _, err := masterdataconfigs.BiMasterDataConfig("test-id", vnic); err != nil {
		log.Fail(t, "BiMasterDataConfig getter failed: ", err.Error())
	}
	if _, err := reports.BiReport("test-id", vnic); err != nil {
		log.Fail(t, "BiReport getter failed: ", err.Error())
	}
	if _, err := reporttemplates.BiReportTemplate("test-id", vnic); err != nil {
		log.Fail(t, "BiReportTemplate getter failed: ", err.Error())
	}
	if _, err := scenarios.BiScenario("test-id", vnic); err != nil {
		log.Fail(t, "BiScenario getter failed: ", err.Error())
	}
	if _, err := trendanalyses.BiTrendAnalysis("test-id", vnic); err != nil {
		log.Fail(t, "BiTrendAnalysis getter failed: ", err.Error())
	}
}
