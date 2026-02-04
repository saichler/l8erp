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
// Projects Billing Module - Enum Definitions

(function() {
    'use strict';

    window.PrjBilling = window.PrjBilling || {};
    PrjBilling.enums = {};

    // BILLING TYPE
    PrjBilling.enums.BILLING_TYPE = {
        0: 'Unspecified',
        1: 'Time & Materials',
        2: 'Fixed Price',
        3: 'Milestone',
        4: 'Retainer',
        5: 'Not Billable'
    };

    PrjBilling.enums.BILLING_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-inactive'
    };

    // INVOICE STATUS
    PrjBilling.enums.INVOICE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending',
        3: 'Sent',
        4: 'Paid',
        5: 'Overdue',
        6: 'Cancelled'
    };

    PrjBilling.enums.INVOICE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-inactive'
    };

    // REVENUE RECOGNITION METHOD
    PrjBilling.enums.REVENUE_RECOGNITION_METHOD = {
        0: 'Unspecified',
        1: 'Completed Contract',
        2: 'Percentage of Completion',
        3: 'As Invoiced'
    };

    PrjBilling.enums.REVENUE_RECOGNITION_METHOD_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active'
    };

    // RENDERERS
    PrjBilling.render = {};

    PrjBilling.render.billingType = Layer8DRenderers.createStatusRenderer(
        PrjBilling.enums.BILLING_TYPE,
        PrjBilling.enums.BILLING_TYPE_CLASSES
    );

    PrjBilling.render.invoiceStatus = Layer8DRenderers.createStatusRenderer(
        PrjBilling.enums.INVOICE_STATUS,
        PrjBilling.enums.INVOICE_STATUS_CLASSES
    );

    PrjBilling.render.revenueRecognitionMethod = Layer8DRenderers.createStatusRenderer(
        PrjBilling.enums.REVENUE_RECOGNITION_METHOD,
        PrjBilling.enums.REVENUE_RECOGNITION_METHOD_CLASSES
    );

    PrjBilling.render.date = Layer8DRenderers.renderDate;
    PrjBilling.render.money = Layer8DRenderers.renderMoney;

})();
