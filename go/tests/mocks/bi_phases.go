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
	if err := runOp(client, "Data Sources", "/erp/35/BiDataSrc", &bi.BiDataSourceList{List: sources}, extractIDs(sources, func(e *bi.BiDataSource) string { return e.SourceId }), &store.BiDataSourceIDs); err != nil {
		return err
	}

	templates := generateBiReportTemplates(store)
	if err := runOp(client, "Report Templates", "/erp/35/BiRptTpl", &bi.BiReportTemplateList{List: templates}, extractIDs(templates, func(e *bi.BiReportTemplate) string { return e.TemplateId }), &store.BiReportTemplateIDs); err != nil {
		return err
	}

	kpis := generateBiKPIs(store)
	if err := runOp(client, "KPIs (with thresholds)", "/erp/35/BiKPI", &bi.BiKPIList{List: kpis}, extractIDs(kpis, func(e *bi.BiKPI) string { return e.KpiId }), &store.BiKPIIDs); err != nil {
		return err
	}

	reports := generateBiReports(store)
	if err := runOp(client, "Reports (with executions, access, subscriptions, schedules)", "/erp/35/BiReport", &bi.BiReportList{List: reports}, extractIDs(reports, func(e *bi.BiReport) string { return e.ReportId }), &store.BiReportIDs); err != nil {
		return err
	}

	dashboards := generateBiDashboards(store)
	if err := runOp(client, "Dashboards (with widgets, shares, drilldowns)", "/erp/35/BiDashbrd", &bi.BiDashboardList{List: dashboards}, extractIDs(dashboards, func(e *bi.BiDashboard) string { return e.DashboardId }), &store.BiDashboardIDs); err != nil {
		return err
	}

	return nil
}

// generateBiPhase2 creates analytics data: cubes, models (with embedded predictions), trends, scenarios, benchmarks
func generateBiPhase2(client *HCMClient, store *MockDataStore) error {
	cubes := generateDataCubes(store)
	if err := runOp(client, "Data Cubes", "/erp/35/BiCube", &bi.BiDataCubeList{List: cubes}, extractIDs(cubes, func(e *bi.BiDataCube) string { return e.CubeId }), &store.BiDataCubeIDs); err != nil {
		return err
	}

	models := generateAnalysisModels(store)
	if err := runOp(client, "Analysis Models (with predictions)", "/erp/35/BiAnaModel", &bi.BiAnalysisModelList{List: models}, extractIDs(models, func(e *bi.BiAnalysisModel) string { return e.ModelId }), &store.BiAnalysisModelIDs); err != nil {
		return err
	}

	trends := generateTrendAnalyses(store)
	if err := runOp(client, "Trend Analyses", "/erp/35/BiTrend", &bi.BiTrendAnalysisList{List: trends}, extractIDs(trends, func(e *bi.BiTrendAnalysis) string { return e.AnalysisId }), &store.BiTrendAnalysisIDs); err != nil {
		return err
	}

	scenarios := generateScenarios(store)
	if err := runOp(client, "Scenarios", "/erp/35/BiScenario", &bi.BiScenarioList{List: scenarios}, extractIDs(scenarios, func(e *bi.BiScenario) string { return e.ScenarioId }), &store.BiScenarioIDs); err != nil {
		return err
	}

	benchmarks := generateBenchmarks(store)
	if err := runOp(client, "Benchmarks", "/erp/35/BiBenchmrk", &bi.BiBenchmarkList{List: benchmarks}, extractIDs(benchmarks, func(e *bi.BiBenchmark) string { return e.BenchmarkId }), &store.BiBenchmarkIDs); err != nil {
		return err
	}

	return nil
}

// generateBiPhase3 creates data management: ETL jobs (with embedded schedules), quality rules, master data, governance
func generateBiPhase3(client *HCMClient, store *MockDataStore) error {
	jobs := generateETLJobs(store)
	if err := runOp(client, "ETL Jobs (with schedules)", "/erp/35/BiETLJob", &bi.BiETLJobList{List: jobs}, extractIDs(jobs, func(e *bi.BiETLJob) string { return e.JobId }), &store.BiETLJobIDs); err != nil {
		return err
	}

	rules := generateDataQualityRules(store)
	if err := runOp(client, "Data Quality Rules", "/erp/35/BiDQRule", &bi.BiDataQualityRuleList{List: rules}, extractIDs(rules, func(e *bi.BiDataQualityRule) string { return e.RuleId }), &store.BiDataQualityRuleIDs); err != nil {
		return err
	}

	configs := generateMasterDataConfigs(store)
	if err := runOp(client, "Master Data Configs", "/erp/35/BiMDConfig", &bi.BiMasterDataConfigList{List: configs}, extractIDs(configs, func(e *bi.BiMasterDataConfig) string { return e.ConfigId }), &store.BiMasterDataConfigIDs); err != nil {
		return err
	}

	governance := generateDataGovernance(store)
	if err := runOp(client, "Data Governance", "/erp/35/BiDataGov", &bi.BiDataGovernanceList{List: governance}, extractIDs(governance, func(e *bi.BiDataGovernance) string { return e.GovernanceId }), &store.BiDataGovernanceIDs); err != nil {
		return err
	}

	return nil
}
