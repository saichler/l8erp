/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Projects Analytics Module - Column Configurations

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};

    const col = window.Layer8ColumnFactory;
    const render = PrjAnalytics.render;

    PrjAnalytics.columns = {
        PrjStatusReport: [
            ...col.id('statusId'),
            ...col.col('projectId', 'Project'),
            ...col.date('reportDate', 'Report Date'),
            ...col.enum('overallHealth', 'Overall Health', null, render.healthIndicator),
            ...col.enum('scheduleHealth', 'Schedule Health', null, render.healthIndicator),
            ...col.enum('budgetHealth', 'Budget Health', null, render.healthIndicator),
            ...col.enum('resourceHealth', 'Resource Health', null, render.healthIndicator),
            ...col.col('percentComplete', '% Complete')
        ],

        PrjPortfolioView: [
            ...col.id('viewId'),
            ...col.col('name', 'Name'),
            ...col.col('description', 'Description'),
            ...col.col('ownerId', 'Owner'),
            ...col.col('totalProjects', 'Total Projects'),
            ...col.col('onTrackCount', 'On Track'),
            ...col.col('atRiskCount', 'At Risk'),
            ...col.col('offTrackCount', 'Off Track')
        ],

        PrjProjectKPI: [
            ...col.id('kpiId'),
            ...col.col('projectId', 'Project'),
            ...col.col('kpiName', 'KPI Name'),
            ...col.col('targetValue', 'Target'),
            ...col.col('actualValue', 'Actual'),
            ...col.col('unitOfMeasure', 'Unit'),
            ...col.date('measurementDate', 'Measurement Date'),
            ...col.col('trend', 'Trend')
        ]
    };

})();
