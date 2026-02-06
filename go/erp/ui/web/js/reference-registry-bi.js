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
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refBi = window.Layer8RefFactory;

Layer8DReferenceRegistry.register({
    // ========================================
    // BI - Reporting
    // ========================================
    ...refBi.batch([
        ['BiReport', 'reportId', 'name'],
        ['BiReportTemplate', 'templateId', 'name'],
        ['BiReportSchedule', 'scheduleId', 'name']
    ]),
    ...refBi.batchIdOnly([
        ['BiReportExecution', 'executionId'],
        ['BiReportAccess', 'accessId'],
        ['BiReportSubscription', 'subscriptionId']
    ]),

    // ========================================
    // BI - Dashboards
    // ========================================
    ...refBi.batch([
        ['BiDashboard', 'dashboardId', 'name'],
        ['BiDashboardWidget', 'widgetId', 'name'],
        ['BiKPI', 'kpiId', 'name'],
        ['BiKPIThreshold', 'thresholdId', 'name'],
        ['BiDrilldown', 'drilldownId', 'name']
    ]),
    ...refBi.idOnly('BiDashboardShare', 'shareId'),

    // ========================================
    // BI - Analytics
    // ========================================
    ...refBi.batch([
        ['BiDataCube', 'cubeId', 'name'],
        ['BiAnalysisModel', 'modelId', 'name'],
        ['BiPrediction', 'predictionId', 'name'],
        ['BiTrendAnalysis', 'analysisId', 'name'],
        ['BiScenario', 'scenarioId', 'name'],
        ['BiBenchmark', 'benchmarkId', 'name']
    ]),

    // ========================================
    // BI - Data Management
    // ========================================
    ...refBi.batch([
        ['BiDataSource', 'sourceId', 'name'],
        ['BiETLJob', 'jobId', 'name'],
        ['BiETLSchedule', 'scheduleId', 'name'],
        ['BiDataQualityRule', 'ruleId', 'name'],
        ['BiMasterDataConfig', 'configId', 'name'],
        ['BiDataGovernance', 'governanceId', 'name']
    ])
});
