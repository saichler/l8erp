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
// BI Dashboards Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.BiDashboards = window.BiDashboards || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DASHBOARD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Archived', 'archived', 'layer8d-status-inactive']
    ]);

    const WIDGET_TYPE = factory.simple([
        'Unspecified', 'Chart', 'Table', 'KPI', 'Map', 'Gauge', 'Text', 'Filter'
    ]);

    const CHART_TYPE = factory.simple([
        'Unspecified', 'Bar', 'Line', 'Pie', 'Area', 'Scatter', 'Donut', 'Combo'
    ]);

    const KPI_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['On Target', 'target', 'layer8d-status-active'],
        ['At Risk', 'risk', 'layer8d-status-pending'],
        ['Off Target', 'off', 'layer8d-status-terminated']
    ]);

    const THRESHOLD_OPERATOR = factory.simple([
        'Unspecified', 'Greater Than', 'Less Than', 'Equal',
        'Greater or Equal', 'Less or Equal', 'Between'
    ]);

    const TREND_DIRECTION = factory.create([
        ['Unspecified', null, ''],
        ['Up', 'up', 'layer8d-status-active'],
        ['Down', 'down', 'layer8d-status-terminated'],
        ['Flat', 'flat', 'layer8d-status-pending']
    ]);

    const ACCESS_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['View', 'view', 'layer8d-status-inactive'],
        ['Execute', 'execute', 'layer8d-status-pending'],
        ['Edit', 'edit', 'layer8d-status-active'],
        ['Admin', 'admin', 'layer8d-status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    BiDashboards.enums = {
        DASHBOARD_STATUS: DASHBOARD_STATUS.enum,
        DASHBOARD_STATUS_CLASSES: DASHBOARD_STATUS.classes,
        WIDGET_TYPE: WIDGET_TYPE.enum,
        CHART_TYPE: CHART_TYPE.enum,
        KPI_STATUS: KPI_STATUS.enum,
        KPI_STATUS_CLASSES: KPI_STATUS.classes,
        THRESHOLD_OPERATOR: THRESHOLD_OPERATOR.enum,
        TREND_DIRECTION: TREND_DIRECTION.enum,
        TREND_DIRECTION_CLASSES: TREND_DIRECTION.classes,
        ACCESS_LEVEL: ACCESS_LEVEL.enum,
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    BiDashboards.render = {
        dashboardStatus: createStatusRenderer(DASHBOARD_STATUS.enum, DASHBOARD_STATUS.classes),
        widgetType: (v) => renderEnum(v, WIDGET_TYPE.enum),
        chartType: (v) => renderEnum(v, CHART_TYPE.enum),
        kpiStatus: createStatusRenderer(KPI_STATUS.enum, KPI_STATUS.classes),
        thresholdOperator: (v) => renderEnum(v, THRESHOLD_OPERATOR.enum),
        trendDirection: createStatusRenderer(TREND_DIRECTION.enum, TREND_DIRECTION.classes),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        date: renderDate
    };

})();
