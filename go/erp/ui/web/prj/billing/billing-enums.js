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
// Projects Billing Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.PrjBilling = window.PrjBilling || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BILLING_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Time & Materials', 'tm', 'layer8d-status-active'],
        ['Fixed Price', 'fixed', 'layer8d-status-active'],
        ['Milestone', 'milestone', 'layer8d-status-pending'],
        ['Retainer', 'retainer', 'layer8d-status-active'],
        ['Not Billable', 'notbillable', 'layer8d-status-inactive']
    ]);

    const INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Sent', 'sent', 'layer8d-status-active'],
        ['Paid', 'paid', 'layer8d-status-active'],
        ['Overdue', 'overdue', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const REVENUE_RECOGNITION_METHOD = factory.create([
        ['Unspecified', null, ''],
        ['Completed Contract', 'completed', 'layer8d-status-active'],
        ['Percentage of Completion', 'poc', 'layer8d-status-active'],
        ['As Invoiced', 'invoiced', 'layer8d-status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    PrjBilling.enums = {
        BILLING_TYPE: BILLING_TYPE.enum,
        BILLING_TYPE_CLASSES: BILLING_TYPE.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        REVENUE_RECOGNITION_METHOD: REVENUE_RECOGNITION_METHOD.enum,
        REVENUE_RECOGNITION_METHOD_CLASSES: REVENUE_RECOGNITION_METHOD.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    PrjBilling.render = {
        billingType: createStatusRenderer(BILLING_TYPE.enum, BILLING_TYPE.classes),
        invoiceStatus: createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes),
        revenueRecognitionMethod: createStatusRenderer(REVENUE_RECOGNITION_METHOD.enum, REVENUE_RECOGNITION_METHOD.classes),
        date: renderDate,
        money: renderMoney
    };

})();
