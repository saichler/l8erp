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
 * Mobile BI Dashboards Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: bi/dashboards/dashboards-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileBiDashboards = window.MobileBiDashboards || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DASHBOARD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Published', 'published', 'status-active'],
        ['Archived', 'archived', 'status-inactive']
    ]);

    const WIDGET_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Chart', 'chart', 'status-active'],
        ['Table', 'table', 'status-active'],
        ['KPI', 'kpi', 'status-active'],
        ['Map', 'map', 'status-active'],
        ['Gauge', 'gauge', 'status-active'],
        ['Text', 'text', 'status-pending'],
        ['Filter', 'filter', 'status-pending']
    ]);

    const CHART_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Bar', 'bar', 'status-active'],
        ['Line', 'line', 'status-active'],
        ['Pie', 'pie', 'status-active'],
        ['Area', 'area', 'status-active'],
        ['Scatter', 'scatter', 'status-active'],
        ['Donut', 'donut', 'status-active'],
        ['Combo', 'combo', 'status-active']
    ]);

    const KPI_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['On Target', 'ontarget', 'status-active'],
        ['At Risk', 'atrisk', 'status-pending'],
        ['Off Target', 'offtarget', 'status-terminated']
    ]);

    const THRESHOLD_OPERATOR = factory.create([
        ['Unspecified', null, ''],
        ['Greater Than', 'greaterthan', 'status-active'],
        ['Less Than', 'lessthan', 'status-active'],
        ['Equal', 'equal', 'status-active'],
        ['Greater or Equal', 'greaterorequal', 'status-active'],
        ['Less or Equal', 'lessorequal', 'status-active'],
        ['Between', 'between', 'status-active']
    ]);

    const TREND_DIRECTION = factory.create([
        ['Unspecified', null, ''],
        ['Up', 'up', 'status-active'],
        ['Down', 'down', 'status-terminated'],
        ['Flat', 'flat', 'status-pending']
    ]);

    const ACCESS_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['View', 'view', 'status-inactive'],
        ['Execute', 'execute', 'status-pending'],
        ['Edit', 'edit', 'status-active'],
        ['Admin', 'admin', 'status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBiDashboards.enums = {
        DASHBOARD_STATUS: DASHBOARD_STATUS.enum,
        DASHBOARD_STATUS_VALUES: DASHBOARD_STATUS.values,
        DASHBOARD_STATUS_CLASSES: DASHBOARD_STATUS.classes,
        WIDGET_TYPE: WIDGET_TYPE.enum,
        WIDGET_TYPE_VALUES: WIDGET_TYPE.values,
        WIDGET_TYPE_CLASSES: WIDGET_TYPE.classes,
        CHART_TYPE: CHART_TYPE.enum,
        CHART_TYPE_VALUES: CHART_TYPE.values,
        CHART_TYPE_CLASSES: CHART_TYPE.classes,
        KPI_STATUS: KPI_STATUS.enum,
        KPI_STATUS_VALUES: KPI_STATUS.values,
        KPI_STATUS_CLASSES: KPI_STATUS.classes,
        THRESHOLD_OPERATOR: THRESHOLD_OPERATOR.enum,
        THRESHOLD_OPERATOR_VALUES: THRESHOLD_OPERATOR.values,
        THRESHOLD_OPERATOR_CLASSES: THRESHOLD_OPERATOR.classes,
        TREND_DIRECTION: TREND_DIRECTION.enum,
        TREND_DIRECTION_VALUES: TREND_DIRECTION.values,
        TREND_DIRECTION_CLASSES: TREND_DIRECTION.classes,
        ACCESS_LEVEL: ACCESS_LEVEL.enum,
        ACCESS_LEVEL_VALUES: ACCESS_LEVEL.values,
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiDashboards.render = {
        dashboardStatus: createStatusRenderer(DASHBOARD_STATUS.enum, DASHBOARD_STATUS.classes),
        widgetType: createStatusRenderer(WIDGET_TYPE.enum, WIDGET_TYPE.classes),
        chartType: createStatusRenderer(CHART_TYPE.enum, CHART_TYPE.classes),
        kpiStatus: createStatusRenderer(KPI_STATUS.enum, KPI_STATUS.classes),
        thresholdOperator: createStatusRenderer(THRESHOLD_OPERATOR.enum, THRESHOLD_OPERATOR.classes),
        trendDirection: createStatusRenderer(TREND_DIRECTION.enum, TREND_DIRECTION.classes),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        date: renderDate
    };

})();
