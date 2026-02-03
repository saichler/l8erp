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
 * Mobile Sales Billing Module - Enum Definitions
 * Desktop Equivalent: sales/billing/billing-enums.js
 */
(function() {
    'use strict';

    window.MobileSalesBilling = window.MobileSalesBilling || {};
    MobileSalesBilling.enums = {};

    // ============================================================================
    // BILLING FREQUENCY
    // ============================================================================

    MobileSalesBilling.enums.BILLING_FREQUENCY = {
        0: 'Unspecified', 1: 'One-Time', 2: 'Monthly', 3: 'Quarterly', 4: 'Milestone'
    };
    MobileSalesBilling.enums.BILLING_FREQUENCY_VALUES = {
        'one-time': 1, 'onetime': 1, 'monthly': 2, 'quarterly': 3, 'milestone': 4
    };
    MobileSalesBilling.enums.BILLING_FREQUENCY_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-pending'
    };

    // ============================================================================
    // MILESTONE STATUS
    // ============================================================================

    MobileSalesBilling.enums.MILESTONE_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Achieved', 3: 'Billed', 4: 'Cancelled'
    };
    MobileSalesBilling.enums.MILESTONE_STATUS_VALUES = {
        'pending': 1, 'achieved': 2, 'billed': 3, 'cancelled': 4
    };
    MobileSalesBilling.enums.MILESTONE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive'
    };

    // ============================================================================
    // REVENUE STATUS
    // ============================================================================

    MobileSalesBilling.enums.REVENUE_STATUS = {
        0: 'Unspecified', 1: 'Deferred', 2: 'Partially Recognized', 3: 'Recognized', 4: 'Cancelled'
    };
    MobileSalesBilling.enums.REVENUE_STATUS_VALUES = {
        'deferred': 1, 'partial': 2, 'recognized': 3, 'cancelled': 4
    };
    MobileSalesBilling.enums.REVENUE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileSalesBilling.render = {
        billingFrequency: Layer8MRenderers.createStatusRenderer(
            MobileSalesBilling.enums.BILLING_FREQUENCY,
            MobileSalesBilling.enums.BILLING_FREQUENCY_CLASSES
        ),
        milestoneStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesBilling.enums.MILESTONE_STATUS,
            MobileSalesBilling.enums.MILESTONE_STATUS_CLASSES
        ),
        revenueStatus: Layer8MRenderers.createStatusRenderer(
            MobileSalesBilling.enums.REVENUE_STATUS,
            MobileSalesBilling.enums.REVENUE_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
