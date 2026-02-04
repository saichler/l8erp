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
// BI Dashboards Module - Enum Definitions

(function() {
    'use strict';

    window.BiDashboards = window.BiDashboards || {};
    BiDashboards.enums = {};

    // DASHBOARD STATUS
    BiDashboards.enums.DASHBOARD_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Archived'
    };

    BiDashboards.enums.DASHBOARD_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive'
    };

    // WIDGET TYPE
    BiDashboards.enums.WIDGET_TYPE = {
        0: 'Unspecified',
        1: 'Chart',
        2: 'Table',
        3: 'KPI',
        4: 'Map',
        5: 'Gauge',
        6: 'Text',
        7: 'Filter'
    };

    BiDashboards.enums.WIDGET_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-pending',
        7: 'layer8d-status-pending'
    };

    // CHART TYPE
    BiDashboards.enums.CHART_TYPE = {
        0: 'Unspecified',
        1: 'Bar',
        2: 'Line',
        3: 'Pie',
        4: 'Area',
        5: 'Scatter',
        6: 'Donut',
        7: 'Combo'
    };

    BiDashboards.enums.CHART_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active',
        7: 'layer8d-status-active'
    };

    // KPI STATUS
    BiDashboards.enums.KPI_STATUS = {
        0: 'Unspecified',
        1: 'On Target',
        2: 'At Risk',
        3: 'Off Target'
    };

    BiDashboards.enums.KPI_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated'
    };

    // THRESHOLD OPERATOR
    BiDashboards.enums.THRESHOLD_OPERATOR = {
        0: 'Unspecified',
        1: 'Greater Than',
        2: 'Less Than',
        3: 'Equal',
        4: 'Greater or Equal',
        5: 'Less or Equal',
        6: 'Between'
    };

    BiDashboards.enums.THRESHOLD_OPERATOR_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active'
    };

    // TREND DIRECTION
    BiDashboards.enums.TREND_DIRECTION = {
        0: 'Unspecified',
        1: 'Up',
        2: 'Down',
        3: 'Flat'
    };

    BiDashboards.enums.TREND_DIRECTION_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending'
    };

    // ACCESS LEVEL
    BiDashboards.enums.ACCESS_LEVEL = {
        0: 'Unspecified',
        1: 'View',
        2: 'Execute',
        3: 'Edit',
        4: 'Admin'
    };

    BiDashboards.enums.ACCESS_LEVEL_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active'
    };

    // RENDERERS
    BiDashboards.render = {};

    BiDashboards.render.dashboardStatus = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.DASHBOARD_STATUS,
        BiDashboards.enums.DASHBOARD_STATUS_CLASSES
    );

    BiDashboards.render.widgetType = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.WIDGET_TYPE,
        BiDashboards.enums.WIDGET_TYPE_CLASSES
    );

    BiDashboards.render.chartType = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.CHART_TYPE,
        BiDashboards.enums.CHART_TYPE_CLASSES
    );

    BiDashboards.render.kpiStatus = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.KPI_STATUS,
        BiDashboards.enums.KPI_STATUS_CLASSES
    );

    BiDashboards.render.thresholdOperator = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.THRESHOLD_OPERATOR,
        BiDashboards.enums.THRESHOLD_OPERATOR_CLASSES
    );

    BiDashboards.render.trendDirection = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.TREND_DIRECTION,
        BiDashboards.enums.TREND_DIRECTION_CLASSES
    );

    BiDashboards.render.accessLevel = Layer8DRenderers.createStatusRenderer(
        BiDashboards.enums.ACCESS_LEVEL,
        BiDashboards.enums.ACCESS_LEVEL_CLASSES
    );

    BiDashboards.render.date = Layer8DRenderers.renderDate;

})();
