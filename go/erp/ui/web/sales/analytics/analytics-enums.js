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
// Sales Analytics Module - Enum Definitions
// All enum constants and value mappings for Sales Analytics models

(function() {
    'use strict';

    // Create SalesAnalytics namespace
    window.SalesAnalytics = window.SalesAnalytics || {};
    SalesAnalytics.enums = {};

    // ============================================================================
    // TERRITORY TYPE
    // ============================================================================

    SalesAnalytics.enums.TERRITORY_TYPE = {
        0: 'Unspecified',
        1: 'Geographic',
        2: 'Industry',
        3: 'Account Based',
        4: 'Product'
    };

    SalesAnalytics.enums.TERRITORY_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-pending'
    };

    // ============================================================================
    // COMMISSION TYPE
    // ============================================================================

    SalesAnalytics.enums.COMMISSION_TYPE = {
        0: 'Unspecified',
        1: 'Percentage',
        2: 'Fixed',
        3: 'Tiered'
    };

    SalesAnalytics.enums.COMMISSION_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending'
    };

    // ============================================================================
    // FORECAST CATEGORY
    // ============================================================================

    SalesAnalytics.enums.FORECAST_CATEGORY = {
        0: 'Unspecified',
        1: 'Pipeline',
        2: 'Best Case',
        3: 'Committed',
        4: 'Closed'
    };

    SalesAnalytics.enums.FORECAST_CATEGORY_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active'
    };

    // ============================================================================
    // TARGET STATUS
    // ============================================================================

    SalesAnalytics.enums.TARGET_STATUS = {
        0: 'Unspecified',
        1: 'On Track',
        2: 'At Risk',
        3: 'Behind',
        4: 'Achieved',
        5: 'Missed'
    };

    SalesAnalytics.enums.TARGET_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesAnalytics.render = {};

    SalesAnalytics.render.territoryType = Layer8DRenderers.createStatusRenderer(
        SalesAnalytics.enums.TERRITORY_TYPE,
        SalesAnalytics.enums.TERRITORY_TYPE_CLASSES
    );

    SalesAnalytics.render.commissionType = Layer8DRenderers.createStatusRenderer(
        SalesAnalytics.enums.COMMISSION_TYPE,
        SalesAnalytics.enums.COMMISSION_TYPE_CLASSES
    );

    SalesAnalytics.render.forecastCategory = Layer8DRenderers.createStatusRenderer(
        SalesAnalytics.enums.FORECAST_CATEGORY,
        SalesAnalytics.enums.FORECAST_CATEGORY_CLASSES
    );

    SalesAnalytics.render.targetStatus = Layer8DRenderers.createStatusRenderer(
        SalesAnalytics.enums.TARGET_STATUS,
        SalesAnalytics.enums.TARGET_STATUS_CLASSES
    );

    SalesAnalytics.render.date = Layer8DRenderers.renderDate;
    SalesAnalytics.render.money = Layer8DRenderers.renderMoney;

})();
