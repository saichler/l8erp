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
// Sales Analytics Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesAnalytics = window.SalesAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const TERRITORY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Geographic', 'geographic', 'layer8d-status-active'],
        ['Industry', 'industry', 'layer8d-status-active'],
        ['Account Based', 'account', 'layer8d-status-pending'],
        ['Product', 'product', 'layer8d-status-pending']
    ]);

    const COMMISSION_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Percentage', 'percentage', 'layer8d-status-active'],
        ['Fixed', 'fixed', 'layer8d-status-active'],
        ['Tiered', 'tiered', 'layer8d-status-pending']
    ]);

    const FORECAST_CATEGORY = factory.create([
        ['Unspecified', null, ''],
        ['Pipeline', 'pipeline', 'layer8d-status-pending'],
        ['Best Case', 'bestcase', 'layer8d-status-pending'],
        ['Committed', 'committed', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-active']
    ]);

    const TARGET_PERIOD = factory.create([
        ['Unspecified', null, ''],
        ['Monthly', 'monthly', 'layer8d-status-active'],
        ['Quarterly', 'quarterly', 'layer8d-status-active'],
        ['Annual', 'annual', 'layer8d-status-active']
    ]);

    const TARGET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['On Track', 'ontrack', 'layer8d-status-active'],
        ['At Risk', 'atrisk', 'layer8d-status-pending'],
        ['Behind', 'behind', 'layer8d-status-terminated'],
        ['Achieved', 'achieved', 'layer8d-status-active'],
        ['Missed', 'missed', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesAnalytics.enums = {
        TERRITORY_TYPE: TERRITORY_TYPE.enum,
        TERRITORY_TYPE_CLASSES: TERRITORY_TYPE.classes,
        COMMISSION_TYPE: COMMISSION_TYPE.enum,
        COMMISSION_TYPE_CLASSES: COMMISSION_TYPE.classes,
        FORECAST_CATEGORY: FORECAST_CATEGORY.enum,
        FORECAST_CATEGORY_CLASSES: FORECAST_CATEGORY.classes,
        TARGET_PERIOD: TARGET_PERIOD.enum,
        TARGET_PERIOD_CLASSES: TARGET_PERIOD.classes,
        TARGET_STATUS: TARGET_STATUS.enum,
        TARGET_STATUS_CLASSES: TARGET_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesAnalytics.render = {
        territoryType: createStatusRenderer(TERRITORY_TYPE.enum, TERRITORY_TYPE.classes),
        commissionType: createStatusRenderer(COMMISSION_TYPE.enum, COMMISSION_TYPE.classes),
        forecastCategory: createStatusRenderer(FORECAST_CATEGORY.enum, FORECAST_CATEGORY.classes),
        targetPeriod: createStatusRenderer(TARGET_PERIOD.enum, TARGET_PERIOD.classes),
        targetStatus: createStatusRenderer(TARGET_STATUS.enum, TARGET_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
