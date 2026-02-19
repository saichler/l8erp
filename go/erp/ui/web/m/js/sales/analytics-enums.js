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
 * Mobile Sales Analytics Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/analytics/analytics-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesAnalytics = window.MobileSalesAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TERRITORY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Geographic', 'geographic', 'status-active'],
        ['Industry', 'industry', 'status-active'],
        ['Account Based', 'account', 'status-pending'],
        ['Product', 'product', 'status-pending']
    ]);

    const COMMISSION_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Percentage', 'percentage', 'status-active'],
        ['Fixed', 'fixed', 'status-active'],
        ['Tiered', 'tiered', 'status-pending']
    ]);

    const FORECAST_CATEGORY = factory.create([
        ['Unspecified', null, ''],
        ['Pipeline', 'pipeline', 'status-pending'],
        ['Best Case', 'best case', 'status-pending'],
        ['Committed', 'committed', 'status-active'],
        ['Closed', 'closed', 'status-active']
    ]);

    const TARGET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['On Track', 'on track', 'status-active'],
        ['At Risk', 'at risk', 'status-pending'],
        ['Behind', 'behind', 'status-terminated'],
        ['Achieved', 'achieved', 'status-active'],
        ['Missed', 'missed', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesAnalytics.enums = {
        TERRITORY_TYPE: TERRITORY_TYPE.enum,
        TERRITORY_TYPE_VALUES: TERRITORY_TYPE.values,
        TERRITORY_TYPE_CLASSES: TERRITORY_TYPE.classes,
        COMMISSION_TYPE: COMMISSION_TYPE.enum,
        COMMISSION_TYPE_VALUES: COMMISSION_TYPE.values,
        COMMISSION_TYPE_CLASSES: COMMISSION_TYPE.classes,
        FORECAST_CATEGORY: FORECAST_CATEGORY.enum,
        FORECAST_CATEGORY_VALUES: FORECAST_CATEGORY.values,
        FORECAST_CATEGORY_CLASSES: FORECAST_CATEGORY.classes,
        TARGET_STATUS: TARGET_STATUS.enum,
        TARGET_STATUS_VALUES: TARGET_STATUS.values,
        TARGET_STATUS_CLASSES: TARGET_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesAnalytics.render = {
        territoryType: createStatusRenderer(TERRITORY_TYPE.enum, TERRITORY_TYPE.classes),
        commissionType: createStatusRenderer(COMMISSION_TYPE.enum, COMMISSION_TYPE.classes),
        forecastCategory: createStatusRenderer(FORECAST_CATEGORY.enum, FORECAST_CATEGORY.classes),
        targetStatus: createStatusRenderer(TARGET_STATUS.enum, TARGET_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
