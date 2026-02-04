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
/**
 * Mobile BI Dashboards Module - Enum Definitions
 * Desktop Equivalent: bi/dashboards/dashboards-enums.js
 */
(function() {
    'use strict';

    window.MobileBiDashboards = window.MobileBiDashboards || {};
    MobileBiDashboards.enums = {};

    // ============================================================================
    // DASHBOARD STATUS
    // ============================================================================

    MobileBiDashboards.enums.DASHBOARD_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Published', 3: 'Archived'
    };
    MobileBiDashboards.enums.DASHBOARD_STATUS_VALUES = {
        'draft': 1, 'published': 2, 'archived': 3
    };
    MobileBiDashboards.enums.DASHBOARD_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive'
    };

    // ============================================================================
    // WIDGET TYPE
    // ============================================================================

    MobileBiDashboards.enums.WIDGET_TYPE = {
        0: 'Unspecified', 1: 'Chart', 2: 'Table', 3: 'KPI', 4: 'Map', 5: 'Gauge', 6: 'Text', 7: 'Filter'
    };
    MobileBiDashboards.enums.WIDGET_TYPE_VALUES = {
        'chart': 1, 'table': 2, 'kpi': 3, 'map': 4, 'gauge': 5, 'text': 6, 'filter': 7
    };
    MobileBiDashboards.enums.WIDGET_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active',
        5: 'status-active', 6: 'status-pending', 7: 'status-pending'
    };

    // ============================================================================
    // CHART TYPE
    // ============================================================================

    MobileBiDashboards.enums.CHART_TYPE = {
        0: 'Unspecified', 1: 'Bar', 2: 'Line', 3: 'Pie', 4: 'Area', 5: 'Scatter', 6: 'Donut', 7: 'Combo'
    };
    MobileBiDashboards.enums.CHART_TYPE_VALUES = {
        'bar': 1, 'line': 2, 'pie': 3, 'area': 4, 'scatter': 5, 'donut': 6, 'combo': 7
    };
    MobileBiDashboards.enums.CHART_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active',
        5: 'status-active', 6: 'status-active', 7: 'status-active'
    };

    // ============================================================================
    // KPI STATUS
    // ============================================================================

    MobileBiDashboards.enums.KPI_STATUS = {
        0: 'Unspecified', 1: 'On Target', 2: 'At Risk', 3: 'Off Target'
    };
    MobileBiDashboards.enums.KPI_STATUS_VALUES = {
        'on target': 1, 'at risk': 2, 'off target': 3
    };
    MobileBiDashboards.enums.KPI_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated'
    };

    // ============================================================================
    // THRESHOLD OPERATOR
    // ============================================================================

    MobileBiDashboards.enums.THRESHOLD_OPERATOR = {
        0: 'Unspecified', 1: 'Greater Than', 2: 'Less Than', 3: 'Equal',
        4: 'Greater or Equal', 5: 'Less or Equal', 6: 'Between'
    };
    MobileBiDashboards.enums.THRESHOLD_OPERATOR_VALUES = {
        'greater than': 1, 'less than': 2, 'equal': 3,
        'greater or equal': 4, 'less or equal': 5, 'between': 6
    };
    MobileBiDashboards.enums.THRESHOLD_OPERATOR_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active',
        4: 'status-active', 5: 'status-active', 6: 'status-active'
    };

    // ============================================================================
    // TREND DIRECTION
    // ============================================================================

    MobileBiDashboards.enums.TREND_DIRECTION = {
        0: 'Unspecified', 1: 'Up', 2: 'Down', 3: 'Flat'
    };
    MobileBiDashboards.enums.TREND_DIRECTION_VALUES = {
        'up': 1, 'down': 2, 'flat': 3
    };
    MobileBiDashboards.enums.TREND_DIRECTION_CLASSES = {
        1: 'status-active', 2: 'status-terminated', 3: 'status-pending'
    };

    // ============================================================================
    // ACCESS LEVEL
    // ============================================================================

    MobileBiDashboards.enums.ACCESS_LEVEL = {
        0: 'Unspecified', 1: 'View', 2: 'Execute', 3: 'Edit', 4: 'Admin'
    };
    MobileBiDashboards.enums.ACCESS_LEVEL_VALUES = {
        'view': 1, 'execute': 2, 'edit': 3, 'admin': 4
    };
    MobileBiDashboards.enums.ACCESS_LEVEL_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-active'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiDashboards.render = {
        dashboardStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.DASHBOARD_STATUS,
            MobileBiDashboards.enums.DASHBOARD_STATUS_CLASSES
        ),
        widgetType: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.WIDGET_TYPE,
            MobileBiDashboards.enums.WIDGET_TYPE_CLASSES
        ),
        chartType: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.CHART_TYPE,
            MobileBiDashboards.enums.CHART_TYPE_CLASSES
        ),
        kpiStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.KPI_STATUS,
            MobileBiDashboards.enums.KPI_STATUS_CLASSES
        ),
        thresholdOperator: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.THRESHOLD_OPERATOR,
            MobileBiDashboards.enums.THRESHOLD_OPERATOR_CLASSES
        ),
        trendDirection: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.TREND_DIRECTION,
            MobileBiDashboards.enums.TREND_DIRECTION_CLASSES
        ),
        accessLevel: Layer8MRenderers.createStatusRenderer(
            MobileBiDashboards.enums.ACCESS_LEVEL,
            MobileBiDashboards.enums.ACCESS_LEVEL_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
