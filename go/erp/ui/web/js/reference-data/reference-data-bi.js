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
 * Shared Reference Data - BI Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataBi = {
        // ========================================
        // BI - Reporting
        // ========================================
        ...ref.simple('BiReport', 'reportId', 'name'),
        ...ref.simple('BiReportTemplate', 'templateId', 'name'),

        // ========================================
        // BI - Dashboards
        // ========================================
        ...ref.simple('BiDashboard', 'dashboardId', 'name'),
        ...ref.simple('BiKPI', 'kpiId', 'name'),

        // ========================================
        // BI - Analytics
        // ========================================
        ...ref.simple('BiDataCube', 'cubeId', 'name'),
        ...ref.simple('BiAnalysisModel', 'modelId', 'name'),
        ...ref.simple('BiTrendAnalysis', 'analysisId', 'name'),
        ...ref.simple('BiScenario', 'scenarioId', 'name'),
        ...ref.simple('BiBenchmark', 'benchmarkId', 'name'),

        // ========================================
        // BI - Data Management
        // ========================================
        ...ref.simple('BiDataSource', 'sourceId', 'name'),
        ...ref.simple('BiETLJob', 'jobId', 'name'),
        ...ref.simple('BiDataQualityRule', 'ruleId', 'name'),
        ...ref.simple('BiMasterDataConfig', 'configId', 'name'),
        ...ref.simple('BiDataGovernance', 'governanceId', 'name')
    };
})();
