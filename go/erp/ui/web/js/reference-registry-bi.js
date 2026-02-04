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
/**
 * ERP Reference Registry - BI Models
 * Registers Reporting, Dashboards, Analytics, and Data Management models.
 */
Layer8DReferenceRegistry.register({
    // ========================================
    // BI - Reporting
    // ========================================
    BiReport: {
        idColumn: 'reportId',
        displayColumn: 'name',
        selectColumns: ['reportId', 'name'],
        displayLabel: 'Report'
    },
    BiReportTemplate: {
        idColumn: 'templateId',
        displayColumn: 'name',
        selectColumns: ['templateId', 'name'],
        displayLabel: 'Report Template'
    },
    BiReportSchedule: {
        idColumn: 'scheduleId',
        displayColumn: 'name',
        selectColumns: ['scheduleId', 'name'],
        displayLabel: 'Report Schedule'
    },
    BiReportExecution: {
        idColumn: 'executionId',
        displayColumn: 'executionId'
    },
    BiReportAccess: {
        idColumn: 'accessId',
        displayColumn: 'accessId'
    },
    BiReportSubscription: {
        idColumn: 'subscriptionId',
        displayColumn: 'subscriptionId'
    },

    // ========================================
    // BI - Dashboards
    // ========================================
    BiDashboard: {
        idColumn: 'dashboardId',
        displayColumn: 'name',
        selectColumns: ['dashboardId', 'name'],
        displayLabel: 'Dashboard'
    },
    BiDashboardWidget: {
        idColumn: 'widgetId',
        displayColumn: 'name',
        selectColumns: ['widgetId', 'name'],
        displayLabel: 'Widget'
    },
    BiKPI: {
        idColumn: 'kpiId',
        displayColumn: 'name',
        selectColumns: ['kpiId', 'name'],
        displayLabel: 'KPI'
    },
    BiKPIThreshold: {
        idColumn: 'thresholdId',
        displayColumn: 'name',
        selectColumns: ['thresholdId', 'name'],
        displayLabel: 'KPI Threshold'
    },
    BiDrilldown: {
        idColumn: 'drilldownId',
        displayColumn: 'name',
        selectColumns: ['drilldownId', 'name'],
        displayLabel: 'Drilldown'
    },
    BiDashboardShare: {
        idColumn: 'shareId',
        displayColumn: 'shareId'
    },

    // ========================================
    // BI - Analytics
    // ========================================
    BiDataCube: {
        idColumn: 'cubeId',
        displayColumn: 'name',
        selectColumns: ['cubeId', 'name'],
        displayLabel: 'Data Cube'
    },
    BiAnalysisModel: {
        idColumn: 'modelId',
        displayColumn: 'name',
        selectColumns: ['modelId', 'name'],
        displayLabel: 'Analysis Model'
    },
    BiPrediction: {
        idColumn: 'predictionId',
        displayColumn: 'name',
        selectColumns: ['predictionId', 'name'],
        displayLabel: 'Prediction'
    },
    BiTrendAnalysis: {
        idColumn: 'analysisId',
        displayColumn: 'name',
        selectColumns: ['analysisId', 'name'],
        displayLabel: 'Trend Analysis'
    },
    BiScenario: {
        idColumn: 'scenarioId',
        displayColumn: 'name',
        selectColumns: ['scenarioId', 'name'],
        displayLabel: 'Scenario'
    },
    BiBenchmark: {
        idColumn: 'benchmarkId',
        displayColumn: 'name',
        selectColumns: ['benchmarkId', 'name'],
        displayLabel: 'Benchmark'
    },

    // ========================================
    // BI - Data Management
    // ========================================
    BiDataSource: {
        idColumn: 'sourceId',
        displayColumn: 'name',
        selectColumns: ['sourceId', 'name'],
        displayLabel: 'Data Source'
    },
    BiETLJob: {
        idColumn: 'jobId',
        displayColumn: 'name',
        selectColumns: ['jobId', 'name'],
        displayLabel: 'ETL Job'
    },
    BiETLSchedule: {
        idColumn: 'scheduleId',
        displayColumn: 'name',
        selectColumns: ['scheduleId', 'name'],
        displayLabel: 'ETL Schedule'
    },
    BiDataQualityRule: {
        idColumn: 'ruleId',
        displayColumn: 'name',
        selectColumns: ['ruleId', 'name'],
        displayLabel: 'Data Quality Rule'
    },
    BiMasterDataConfig: {
        idColumn: 'configId',
        displayColumn: 'name',
        selectColumns: ['configId', 'name'],
        displayLabel: 'Master Data Config'
    },
    BiDataGovernance: {
        idColumn: 'governanceId',
        displayColumn: 'name',
        selectColumns: ['governanceId', 'name'],
        displayLabel: 'Data Governance'
    }
});
