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

func testServiceHandlersBI(t *testing.T, vnic ifs.IVNic) {
	log := vnic.Resources().Logger()

	if h, ok := analysismodels.BiAnalysisModels(vnic); !ok || h == nil {
		log.Fail(t, "BiAnalysisModel service handler not found")
	}
	if h, ok := benchmarks.BiBenchmarks(vnic); !ok || h == nil {
		log.Fail(t, "BiBenchmark service handler not found")
	}
	if h, ok := dashboards.BiDashboards(vnic); !ok || h == nil {
		log.Fail(t, "BiDashboard service handler not found")
	}
	if h, ok := datacubes.BiDataCubes(vnic); !ok || h == nil {
		log.Fail(t, "BiDataCube service handler not found")
	}
	if h, ok := datagovernances.BiDataGovernances(vnic); !ok || h == nil {
		log.Fail(t, "BiDataGovernance service handler not found")
	}
	if h, ok := dataqualityrules.BiDataQualityRules(vnic); !ok || h == nil {
		log.Fail(t, "BiDataQualityRule service handler not found")
	}
	if h, ok := datasources.BiDataSources(vnic); !ok || h == nil {
		log.Fail(t, "BiDataSource service handler not found")
	}
	if h, ok := etljobs.BiETLJobs(vnic); !ok || h == nil {
		log.Fail(t, "BiETLJob service handler not found")
	}
	if h, ok := kpis.BiKPIs(vnic); !ok || h == nil {
		log.Fail(t, "BiKPI service handler not found")
	}
	if h, ok := masterdataconfigs.BiMasterDataConfigs(vnic); !ok || h == nil {
		log.Fail(t, "BiMasterDataConfig service handler not found")
	}
	if h, ok := reports.BiReports(vnic); !ok || h == nil {
		log.Fail(t, "BiReport service handler not found")
	}
	if h, ok := reporttemplates.BiReportTemplates(vnic); !ok || h == nil {
		log.Fail(t, "BiReportTemplate service handler not found")
	}
	if h, ok := scenarios.BiScenarios(vnic); !ok || h == nil {
		log.Fail(t, "BiScenario service handler not found")
	}
	if h, ok := trendanalyses.BiTrendAnalyses(vnic); !ok || h == nil {
		log.Fail(t, "BiTrendAnalysis service handler not found")
	}
}
