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
 * Mobile Sales Analytics Module - Enum Definitions
 * Desktop Equivalent: sales/analytics/analytics-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesAnalytics = window.MobileSalesAnalytics || {};
    MobileSalesAnalytics.enums = {};

    // ============================================================================
    // TERRITORY TYPE
    // ============================================================================

    MobileSalesAnalytics.enums.TERRITORY_TYPE = {
        0: 'Unspecified', 1: 'Geographic', 2: 'Industry', 3: 'Account Based', 4: 'Product'
    };
    MobileSalesAnalytics.enums.TERRITORY_TYPE_VALUES = {
        'geographic': 1, 'industry': 2, 'account': 3, 'product': 4
    };
    MobileSalesAnalytics.enums.TERRITORY_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-pending'
    };

    // ============================================================================
    // COMMISSION TYPE
    // ============================================================================

    MobileSalesAnalytics.enums.COMMISSION_TYPE = {
        0: 'Unspecified', 1: 'Percentage', 2: 'Fixed', 3: 'Tiered'
    };
    MobileSalesAnalytics.enums.COMMISSION_TYPE_VALUES = {
        'percentage': 1, 'fixed': 2, 'tiered': 3
    };
    MobileSalesAnalytics.enums.COMMISSION_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending'
    };

    // ============================================================================
    // FORECAST CATEGORY
    // ============================================================================

    MobileSalesAnalytics.enums.FORECAST_CATEGORY = {
        0: 'Unspecified', 1: 'Pipeline', 2: 'Best Case', 3: 'Committed', 4: 'Closed'
    };
    MobileSalesAnalytics.enums.FORECAST_CATEGORY_VALUES = {
        'pipeline': 1, 'best case': 2, 'committed': 3, 'closed': 4
    };
    MobileSalesAnalytics.enums.FORECAST_CATEGORY_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-active'
    };

    // ============================================================================
    // TARGET STATUS
    // ============================================================================

    MobileSalesAnalytics.enums.TARGET_STATUS = {
        0: 'Unspecified', 1: 'On Track', 2: 'At Risk', 3: 'Behind', 4: 'Achieved', 5: 'Missed'
    };
    MobileSalesAnalytics.enums.TARGET_STATUS_VALUES = {
        'on track': 1, 'at risk': 2, 'behind': 3, 'achieved': 4, 'missed': 5
    };
    MobileSalesAnalytics.enums.TARGET_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated', 4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesAnalytics.render = {
        territoryType: Layer8MRenderers.createStatusRenderer(
            MobileSalesAnalytics.enums.TERRITORY_TYPE,
            MobileSalesAnalytics.enums.TERRITORY_TYPE_CLASSES
        ),
        commissionType: Layer8MRenderers.createStatusRenderer(
            MobileSalesAnalytics.enums.COMMISSION_TYPE,
            MobileSalesAnalytics.enums.COMMISSION_TYPE_CLASSES
        ),
        forecastCategory: Layer8MRenderers.createStatusRenderer(
            MobileSalesAnalytics.enums.FORECAST_CATEGORY,
            MobileSalesAnalytics.enums.FORECAST_CATEGORY_CLASSES
        ),
        targetStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesAnalytics.enums.TARGET_STATUS,
            MobileSalesAnalytics.enums.TARGET_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
