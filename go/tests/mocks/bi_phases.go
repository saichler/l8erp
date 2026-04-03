/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
package mocks

import (

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiPhase1 creates foundation data: data sources, report templates, reports (with embedded children), dashboards (with embedded children), KPIs (with embedded thresholds)
func generateBiPhase1(client *HCMClient, store *MockDataStore) error {
	sources := generateDataSources()
	if err := runOp(client, "Data Sources", "/erp/35/BiDataSrc", &bi.BiDataSourceList{List: sources}, extractIDs(sources, func(v interface{}) string { return v.(*bi.BiDataSource).SourceId }), &store.BiDataSourceIDs); err != nil {
		return err
	}

	templates := generateBiReportTemplates(store)
	if err := runOp(client, "Report Templates", "/erp/35/BiRptTpl", &bi.BiReportTemplateList{List: templates}, extractIDs(templates, func(v interface{}) string { return v.(*bi.BiReportTemplate).TemplateId }), &store.BiReportTemplateIDs); err != nil {
		return err
	}

	kpis := generateBiKPIs(store)
	if err := runOp(client, "KPIs (with thresholds)", "/erp/35/BiKPI", &bi.BiKPIList{List: kpis}, extractIDs(kpis, func(v interface{}) string { return v.(*bi.BiKPI).KpiId }), &store.BiKPIIDs); err != nil {
		return err
	}

	reports := generateBiReports(store)
	if err := runOp(client, "Reports (with executions, access, subscriptions, schedules)", "/erp/35/BiReport", &bi.BiReportList{List: reports}, extractIDs(reports, func(v interface{}) string { return v.(*bi.BiReport).ReportId }), &store.BiReportIDs); err != nil {
		return err
	}

	dashboards := generateBiDashboards(store)
	if err := runOp(client, "Dashboards (with widgets, shares, drilldowns)", "/erp/35/BiDashbrd", &bi.BiDashboardList{List: dashboards}, extractIDs(dashboards, func(v interface{}) string { return v.(*bi.BiDashboard).DashboardId }), &store.BiDashboardIDs); err != nil {
		return err
	}

	return nil
}

// generateBiPhase2 creates analytics data: cubes, models (with embedded predictions), trends, scenarios, benchmarks
func generateBiPhase2(client *HCMClient, store *MockDataStore) error {
	cubes := generateDataCubes(store)
	if err := runOp(client, "Data Cubes", "/erp/35/BiCube", &bi.BiDataCubeList{List: cubes}, extractIDs(cubes, func(v interface{}) string { return v.(*bi.BiDataCube).CubeId }), &store.BiDataCubeIDs); err != nil {
		return err
	}

	models := generateAnalysisModels(store)
	if err := runOp(client, "Analysis Models (with predictions)", "/erp/35/BiAnaModel", &bi.BiAnalysisModelList{List: models}, extractIDs(models, func(v interface{}) string { return v.(*bi.BiAnalysisModel).ModelId }), &store.BiAnalysisModelIDs); err != nil {
		return err
	}

	trends := generateTrendAnalyses(store)
	if err := runOp(client, "Trend Analyses", "/erp/35/BiTrend", &bi.BiTrendAnalysisList{List: trends}, extractIDs(trends, func(v interface{}) string { return v.(*bi.BiTrendAnalysis).AnalysisId }), &store.BiTrendAnalysisIDs); err != nil {
		return err
	}

	scenarios := generateScenarios(store)
	if err := runOp(client, "Scenarios", "/erp/35/BiScenario", &bi.BiScenarioList{List: scenarios}, extractIDs(scenarios, func(v interface{}) string { return v.(*bi.BiScenario).ScenarioId }), &store.BiScenarioIDs); err != nil {
		return err
	}

	benchmarks := generateBenchmarks(store)
	if err := runOp(client, "Benchmarks", "/erp/35/BiBenchmrk", &bi.BiBenchmarkList{List: benchmarks}, extractIDs(benchmarks, func(v interface{}) string { return v.(*bi.BiBenchmark).BenchmarkId }), &store.BiBenchmarkIDs); err != nil {
		return err
	}

	return nil
}

// generateBiPhase3 creates data management: ETL jobs (with embedded schedules), quality rules, master data, governance
func generateBiPhase3(client *HCMClient, store *MockDataStore) error {
	jobs := generateETLJobs(store)
	if err := runOp(client, "ETL Jobs (with schedules)", "/erp/35/BiETLJob", &bi.BiETLJobList{List: jobs}, extractIDs(jobs, func(v interface{}) string { return v.(*bi.BiETLJob).JobId }), &store.BiETLJobIDs); err != nil {
		return err
	}

	rules := generateDataQualityRules(store)
	if err := runOp(client, "Data Quality Rules", "/erp/35/BiDQRule", &bi.BiDataQualityRuleList{List: rules}, extractIDs(rules, func(v interface{}) string { return v.(*bi.BiDataQualityRule).RuleId }), &store.BiDataQualityRuleIDs); err != nil {
		return err
	}

	configs := generateMasterDataConfigs(store)
	if err := runOp(client, "Master Data Configs", "/erp/35/BiMDConfig", &bi.BiMasterDataConfigList{List: configs}, extractIDs(configs, func(v interface{}) string { return v.(*bi.BiMasterDataConfig).ConfigId }), &store.BiMasterDataConfigIDs); err != nil {
		return err
	}

	governance := generateDataGovernance(store)
	if err := runOp(client, "Data Governance", "/erp/35/BiDataGov", &bi.BiDataGovernanceList{List: governance}, extractIDs(governance, func(v interface{}) string { return v.(*bi.BiDataGovernance).GovernanceId }), &store.BiDataGovernanceIDs); err != nil {
		return err
	}

	return nil
}
