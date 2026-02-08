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
 * Mobile PRJ Billing Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: prj/billing/billing-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobilePrjBilling = window.MobilePrjBilling || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BILLING_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Time & Materials', 'tm', 'status-active'],
        ['Fixed Price', 'fixed', 'status-active'],
        ['Milestone', 'milestone', 'status-pending'],
        ['Retainer', 'retainer', 'status-active'],
        ['Not Billable', 'notbillable', 'status-inactive']
    ]);

    const INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Pending', 'pending', 'status-pending'],
        ['Sent', 'sent', 'status-active'],
        ['Paid', 'paid', 'status-active'],
        ['Overdue', 'overdue', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const REVENUE_RECOGNITION_METHOD = factory.create([
        ['Unspecified', null, ''],
        ['Completed Contract', 'completed', 'status-active'],
        ['Percentage of Completion', 'poc', 'status-active'],
        ['As Invoiced', 'invoiced', 'status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePrjBilling.enums = {
        BILLING_TYPE: BILLING_TYPE.enum,
        BILLING_TYPE_VALUES: BILLING_TYPE.values,
        BILLING_TYPE_CLASSES: BILLING_TYPE.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_VALUES: INVOICE_STATUS.values,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        REVENUE_RECOGNITION_METHOD: REVENUE_RECOGNITION_METHOD.enum,
        REVENUE_RECOGNITION_METHOD_VALUES: REVENUE_RECOGNITION_METHOD.values,
        REVENUE_RECOGNITION_METHOD_CLASSES: REVENUE_RECOGNITION_METHOD.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePrjBilling.render = {
        billingType: createStatusRenderer(BILLING_TYPE.enum, BILLING_TYPE.classes),
        invoiceStatus: createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes),
        revenueRecognitionMethod: createStatusRenderer(REVENUE_RECOGNITION_METHOD.enum, REVENUE_RECOGNITION_METHOD.classes),
        date: renderDate,
        money: renderMoney
    };

})();
