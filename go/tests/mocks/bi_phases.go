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
package main

import (
	"fmt"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateBiPhase1 creates foundation data: reports, templates, dashboards, KPIs, data sources
func generateBiPhase1(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating BI Reports...")
	reports := generateBiReports(store)
	if err := client.post("/erp/35/BiReport", &bi.BiReportList{List: reports}); err != nil {
		return fmt.Errorf("bi reports: %w", err)
	}
	for _, r := range reports {
		store.BiReportIDs = append(store.BiReportIDs, r.ReportId)
	}
	fmt.Printf(" %d created\n", len(reports))

	fmt.Printf("  Creating Report Templates...")
	templates := generateBiReportTemplates(store)
	if err := client.post("/erp/35/BiRptTpl", &bi.BiReportTemplateList{List: templates}); err != nil {
		return fmt.Errorf("report templates: %w", err)
	}
	for _, t := range templates {
		store.BiReportTemplateIDs = append(store.BiReportTemplateIDs, t.TemplateId)
	}
	fmt.Printf(" %d created\n", len(templates))

	fmt.Printf("  Creating Dashboards...")
	dashboards := generateBiDashboards(store)
	if err := client.post("/erp/35/BiDashbrd", &bi.BiDashboardList{List: dashboards}); err != nil {
		return fmt.Errorf("dashboards: %w", err)
	}
	for _, d := range dashboards {
		store.BiDashboardIDs = append(store.BiDashboardIDs, d.DashboardId)
	}
	fmt.Printf(" %d created\n", len(dashboards))

	fmt.Printf("  Creating KPIs...")
	kpis := generateBiKPIs(store)
	if err := client.post("/erp/35/BiKPI", &bi.BiKPIList{List: kpis}); err != nil {
		return fmt.Errorf("kpis: %w", err)
	}
	for _, k := range kpis {
		store.BiKPIIDs = append(store.BiKPIIDs, k.KpiId)
	}
	fmt.Printf(" %d created\n", len(kpis))

	fmt.Printf("  Creating Data Sources...")
	sources := generateDataSources()
	if err := client.post("/erp/35/BiDataSrc", &bi.BiDataSourceList{List: sources}); err != nil {
		return fmt.Errorf("data sources: %w", err)
	}
	for _, s := range sources {
		store.BiDataSourceIDs = append(store.BiDataSourceIDs, s.SourceId)
	}
	fmt.Printf(" %d created\n", len(sources))

	return nil
}

// generateBiPhase2 creates report management data: schedules, executions, access, subscriptions
func generateBiPhase2(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Report Schedules...")
	schedules := generateBiReportSchedules(store)
	if err := client.post("/erp/35/BiRptSched", &bi.BiReportScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("report schedules: %w", err)
	}
	for _, s := range schedules {
		store.BiReportScheduleIDs = append(store.BiReportScheduleIDs, s.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	fmt.Printf("  Creating Report Executions...")
	executions := generateBiReportExecutions(store)
	if err := client.post("/erp/35/BiRptExec", &bi.BiReportExecutionList{List: executions}); err != nil {
		return fmt.Errorf("report executions: %w", err)
	}
	for _, e := range executions {
		store.BiReportExecutionIDs = append(store.BiReportExecutionIDs, e.ExecutionId)
	}
	fmt.Printf(" %d created\n", len(executions))

	fmt.Printf("  Creating Report Access...")
	accesses := generateBiReportAccess(store)
	if err := client.post("/erp/35/BiRptAccs", &bi.BiReportAccessList{List: accesses}); err != nil {
		return fmt.Errorf("report access: %w", err)
	}
	for _, a := range accesses {
		store.BiReportAccessIDs = append(store.BiReportAccessIDs, a.AccessId)
	}
	fmt.Printf(" %d created\n", len(accesses))

	fmt.Printf("  Creating Report Subscriptions...")
	subscriptions := generateBiReportSubscriptions(store)
	if err := client.post("/erp/35/BiRptSub", &bi.BiReportSubscriptionList{List: subscriptions}); err != nil {
		return fmt.Errorf("report subscriptions: %w", err)
	}
	for _, s := range subscriptions {
		store.BiReportSubscriptionIDs = append(store.BiReportSubscriptionIDs, s.SubscriptionId)
	}
	fmt.Printf(" %d created\n", len(subscriptions))

	return nil
}

// generateBiPhase3 creates dashboard management data: widgets, thresholds, drilldowns, shares
func generateBiPhase3(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Dashboard Widgets...")
	widgets := generateBiDashboardWidgets(store)
	if err := client.post("/erp/35/BiWidget", &bi.BiDashboardWidgetList{List: widgets}); err != nil {
		return fmt.Errorf("dashboard widgets: %w", err)
	}
	for _, w := range widgets {
		store.BiDashboardWidgetIDs = append(store.BiDashboardWidgetIDs, w.WidgetId)
	}
	fmt.Printf(" %d created\n", len(widgets))

	fmt.Printf("  Creating KPI Thresholds...")
	thresholds := generateBiKPIThresholds(store)
	if err := client.post("/erp/35/BiKPIThrs", &bi.BiKPIThresholdList{List: thresholds}); err != nil {
		return fmt.Errorf("kpi thresholds: %w", err)
	}
	for _, t := range thresholds {
		store.BiKPIThresholdIDs = append(store.BiKPIThresholdIDs, t.ThresholdId)
	}
	fmt.Printf(" %d created\n", len(thresholds))

	fmt.Printf("  Creating Drilldowns...")
	drilldowns := generateBiDrilldowns(store)
	if err := client.post("/erp/35/BiDrill", &bi.BiDrilldownList{List: drilldowns}); err != nil {
		return fmt.Errorf("drilldowns: %w", err)
	}
	for _, d := range drilldowns {
		store.BiDrilldownIDs = append(store.BiDrilldownIDs, d.DrilldownId)
	}
	fmt.Printf(" %d created\n", len(drilldowns))

	fmt.Printf("  Creating Dashboard Shares...")
	shares := generateBiDashboardShares(store)
	if err := client.post("/erp/35/BiDashShr", &bi.BiDashboardShareList{List: shares}); err != nil {
		return fmt.Errorf("dashboard shares: %w", err)
	}
	for _, s := range shares {
		store.BiDashboardShareIDs = append(store.BiDashboardShareIDs, s.ShareId)
	}
	fmt.Printf(" %d created\n", len(shares))

	return nil
}

// generateBiPhase4 creates analytics data: cubes, models, predictions, trends, scenarios, benchmarks
func generateBiPhase4(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating Data Cubes...")
	cubes := generateDataCubes(store)
	if err := client.post("/erp/35/BiCube", &bi.BiDataCubeList{List: cubes}); err != nil {
		return fmt.Errorf("data cubes: %w", err)
	}
	for _, c := range cubes {
		store.BiDataCubeIDs = append(store.BiDataCubeIDs, c.CubeId)
	}
	fmt.Printf(" %d created\n", len(cubes))

	fmt.Printf("  Creating Analysis Models...")
	models := generateAnalysisModels(store)
	if err := client.post("/erp/35/BiAnaModel", &bi.BiAnalysisModelList{List: models}); err != nil {
		return fmt.Errorf("analysis models: %w", err)
	}
	for _, m := range models {
		store.BiAnalysisModelIDs = append(store.BiAnalysisModelIDs, m.ModelId)
	}
	fmt.Printf(" %d created\n", len(models))

	fmt.Printf("  Creating Predictions...")
	predictions := generatePredictions(store)
	if err := client.post("/erp/35/BiPredict", &bi.BiPredictionList{List: predictions}); err != nil {
		return fmt.Errorf("predictions: %w", err)
	}
	for _, p := range predictions {
		store.BiPredictionIDs = append(store.BiPredictionIDs, p.PredictionId)
	}
	fmt.Printf(" %d created\n", len(predictions))

	fmt.Printf("  Creating Trend Analyses...")
	trends := generateTrendAnalyses(store)
	if err := client.post("/erp/35/BiTrend", &bi.BiTrendAnalysisList{List: trends}); err != nil {
		return fmt.Errorf("trend analyses: %w", err)
	}
	for _, t := range trends {
		store.BiTrendAnalysisIDs = append(store.BiTrendAnalysisIDs, t.AnalysisId)
	}
	fmt.Printf(" %d created\n", len(trends))

	fmt.Printf("  Creating Scenarios...")
	scenarios := generateScenarios(store)
	if err := client.post("/erp/35/BiScenario", &bi.BiScenarioList{List: scenarios}); err != nil {
		return fmt.Errorf("scenarios: %w", err)
	}
	for _, s := range scenarios {
		store.BiScenarioIDs = append(store.BiScenarioIDs, s.ScenarioId)
	}
	fmt.Printf(" %d created\n", len(scenarios))

	fmt.Printf("  Creating Benchmarks...")
	benchmarks := generateBenchmarks(store)
	if err := client.post("/erp/35/BiBenchmrk", &bi.BiBenchmarkList{List: benchmarks}); err != nil {
		return fmt.Errorf("benchmarks: %w", err)
	}
	for _, b := range benchmarks {
		store.BiBenchmarkIDs = append(store.BiBenchmarkIDs, b.BenchmarkId)
	}
	fmt.Printf(" %d created\n", len(benchmarks))

	return nil
}

// generateBiPhase5 creates data management: ETL jobs, schedules, quality rules, master data, governance
func generateBiPhase5(client *HCMClient, store *MockDataStore) error {
	fmt.Printf("  Creating ETL Jobs...")
	jobs := generateETLJobs(store)
	if err := client.post("/erp/35/BiETLJob", &bi.BiETLJobList{List: jobs}); err != nil {
		return fmt.Errorf("etl jobs: %w", err)
	}
	for _, j := range jobs {
		store.BiETLJobIDs = append(store.BiETLJobIDs, j.JobId)
	}
	fmt.Printf(" %d created\n", len(jobs))

	fmt.Printf("  Creating ETL Schedules...")
	schedules := generateETLSchedules(store)
	if err := client.post("/erp/35/BiETLSched", &bi.BiETLScheduleList{List: schedules}); err != nil {
		return fmt.Errorf("etl schedules: %w", err)
	}
	for _, s := range schedules {
		store.BiETLScheduleIDs = append(store.BiETLScheduleIDs, s.ScheduleId)
	}
	fmt.Printf(" %d created\n", len(schedules))

	fmt.Printf("  Creating Data Quality Rules...")
	rules := generateDataQualityRules(store)
	if err := client.post("/erp/35/BiDQRule", &bi.BiDataQualityRuleList{List: rules}); err != nil {
		return fmt.Errorf("data quality rules: %w", err)
	}
	for _, r := range rules {
		store.BiDataQualityRuleIDs = append(store.BiDataQualityRuleIDs, r.RuleId)
	}
	fmt.Printf(" %d created\n", len(rules))

	fmt.Printf("  Creating Master Data Configs...")
	configs := generateMasterDataConfigs(store)
	if err := client.post("/erp/35/BiMDConfig", &bi.BiMasterDataConfigList{List: configs}); err != nil {
		return fmt.Errorf("master data configs: %w", err)
	}
	for _, c := range configs {
		store.BiMasterDataConfigIDs = append(store.BiMasterDataConfigIDs, c.ConfigId)
	}
	fmt.Printf(" %d created\n", len(configs))

	fmt.Printf("  Creating Data Governance...")
	governance := generateDataGovernance(store)
	if err := client.post("/erp/35/BiDataGov", &bi.BiDataGovernanceList{List: governance}); err != nil {
		return fmt.Errorf("data governance: %w", err)
	}
	for _, g := range governance {
		store.BiDataGovernanceIDs = append(store.BiDataGovernanceIDs, g.GovernanceId)
	}
	fmt.Printf(" %d created\n", len(governance))

	return nil
}
