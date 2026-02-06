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
// Sales Billing Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesBilling = window.SalesBilling || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BILLING_FREQUENCY = factory.create([
        ['Unspecified', null, ''],
        ['One-Time', 'onetime', 'layer8d-status-active'],
        ['Monthly', 'monthly', 'layer8d-status-active'],
        ['Quarterly', 'quarterly', 'layer8d-status-active'],
        ['Milestone', 'milestone', 'layer8d-status-pending']
    ]);

    const MILESTONE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Achieved', 'achieved', 'layer8d-status-active'],
        ['Billed', 'billed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const REVENUE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Deferred', 'deferred', 'layer8d-status-pending'],
        ['Partially Recognized', 'partial', 'layer8d-status-pending'],
        ['Recognized', 'recognized', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesBilling.enums = {
        BILLING_FREQUENCY: BILLING_FREQUENCY.enum,
        BILLING_FREQUENCY_CLASSES: BILLING_FREQUENCY.classes,
        MILESTONE_STATUS: MILESTONE_STATUS.enum,
        MILESTONE_STATUS_CLASSES: MILESTONE_STATUS.classes,
        REVENUE_STATUS: REVENUE_STATUS.enum,
        REVENUE_STATUS_CLASSES: REVENUE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesBilling.render = {
        billingFrequency: createStatusRenderer(BILLING_FREQUENCY.enum, BILLING_FREQUENCY.classes),
        milestoneStatus: createStatusRenderer(MILESTONE_STATUS.enum, MILESTONE_STATUS.classes),
        revenueStatus: createStatusRenderer(REVENUE_STATUS.enum, REVENUE_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
