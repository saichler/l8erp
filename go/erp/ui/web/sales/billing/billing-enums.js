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
// Sales Billing Module - Enum Definitions
// All enum constants and value mappings for Sales Billing models

(function() {
    'use strict';

    // Create SalesBilling namespace
    window.SalesBilling = window.SalesBilling || {};
    SalesBilling.enums = {};

    // ============================================================================
    // BILLING FREQUENCY
    // ============================================================================

    SalesBilling.enums.BILLING_FREQUENCY = {
        0: 'Unspecified',
        1: 'One-Time',
        2: 'Monthly',
        3: 'Quarterly',
        4: 'Milestone'
    };

    SalesBilling.enums.BILLING_FREQUENCY_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending'
    };

    // ============================================================================
    // MILESTONE STATUS
    // ============================================================================

    SalesBilling.enums.MILESTONE_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Achieved',
        3: 'Billed',
        4: 'Cancelled'
    };

    SalesBilling.enums.MILESTONE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // ============================================================================
    // REVENUE STATUS
    // ============================================================================

    SalesBilling.enums.REVENUE_STATUS = {
        0: 'Unspecified',
        1: 'Deferred',
        2: 'Partially Recognized',
        3: 'Recognized',
        4: 'Cancelled'
    };

    SalesBilling.enums.REVENUE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesBilling.render = {};

    SalesBilling.render.billingFrequency = Layer8DRenderers.createStatusRenderer(
        SalesBilling.enums.BILLING_FREQUENCY,
        SalesBilling.enums.BILLING_FREQUENCY_CLASSES
    );

    SalesBilling.render.milestoneStatus = Layer8DRenderers.createStatusRenderer(
        SalesBilling.enums.MILESTONE_STATUS,
        SalesBilling.enums.MILESTONE_STATUS_CLASSES
    );

    SalesBilling.render.revenueStatus = Layer8DRenderers.createStatusRenderer(
        SalesBilling.enums.REVENUE_STATUS,
        SalesBilling.enums.REVENUE_STATUS_CLASSES
    );

    SalesBilling.render.date = Layer8DRenderers.renderDate;
    SalesBilling.render.money = Layer8DRenderers.renderMoney;

})();
