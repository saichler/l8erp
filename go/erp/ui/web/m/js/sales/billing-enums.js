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
 * Mobile Sales Billing Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: sales/billing/billing-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileSalesBilling = window.MobileSalesBilling || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BILLING_FREQUENCY = factory.create([
        ['Unspecified', null, ''],
        ['One-Time', 'one-time', 'status-active'],
        ['Monthly', 'monthly', 'status-active'],
        ['Quarterly', 'quarterly', 'status-active'],
        ['Milestone', 'milestone', 'status-pending']
    ]);

    const MILESTONE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Achieved', 'achieved', 'status-active'],
        ['Billed', 'billed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const REVENUE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Deferred', 'deferred', 'status-pending'],
        ['Partially Recognized', 'partial', 'status-pending'],
        ['Recognized', 'recognized', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileSalesBilling.enums = {
        BILLING_FREQUENCY: BILLING_FREQUENCY.enum,
        BILLING_FREQUENCY_VALUES: BILLING_FREQUENCY.values,
        BILLING_FREQUENCY_CLASSES: BILLING_FREQUENCY.classes,
        MILESTONE_STATUS: MILESTONE_STATUS.enum,
        MILESTONE_STATUS_VALUES: MILESTONE_STATUS.values,
        MILESTONE_STATUS_CLASSES: MILESTONE_STATUS.classes,
        REVENUE_STATUS: REVENUE_STATUS.enum,
        REVENUE_STATUS_VALUES: REVENUE_STATUS.values,
        REVENUE_STATUS_CLASSES: REVENUE_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesBilling.render = {
        billingFrequency: createStatusRenderer(BILLING_FREQUENCY.enum, BILLING_FREQUENCY.classes),
        milestoneStatus: createStatusRenderer(MILESTONE_STATUS.enum, MILESTONE_STATUS.classes),
        revenueStatus: createStatusRenderer(REVENUE_STATUS.enum, REVENUE_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
