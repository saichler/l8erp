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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Procurement Module - Form Configurations
 * Desktop Equivalent: scm/procurement/procurement-forms.js
 */
(function() {
    'use strict';

    window.MobileProcurement = window.MobileProcurement || {};
    const f = window.Layer8FormFactory;
    const enums = MobileProcurement.enums;

    MobileProcurement.forms = {
    ScmPurchaseRequisition: f.form('Purchase Requisition', [
        f.section('Requisition Details', [
            ...f.text('requisitionNumber', 'Requisition #', true),
            ...f.reference('requesterId', 'Requester', 'Employee'),
            ...f.reference('departmentId', 'Department', 'Department'),
            ...f.date('requestDate', 'Request Date', true),
            ...f.select('status', 'Status', enums.REQUISITION_STATUS),
            ...f.text('priority', 'Priority'),
            ...f.textarea('description', 'Description'),
            ...f.money('estimatedTotal', 'Estimated Total'),
            ...f.text('approvalWorkflowId', 'Approval Workflow'),
        ]),
        f.section('Lines', [
            ...f.inlineTable('lines', 'Requisition Lines', [
                { key: 'lineId', label: 'Line ID', hidden: true },
                { key: 'lineNumber', label: '#', type: 'number' },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'quantity', label: 'Qty', type: 'number', required: true },
                { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                { key: 'estimatedUnitPrice', label: 'Est. Unit Price', type: 'money' },
                { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor' },
                { key: 'deliveryDate', label: 'Delivery Date', type: 'date' }
            ])
        ])
    ]),

    ScmRequestForQuotation: f.form('Request for Quotation', [
        f.section('RFQ Details', [
            ...f.text('rfqNumber', 'RFQ #', true),
            ...f.reference('requisitionId', 'Requisition', 'ScmPurchaseRequisition'),
            ...f.date('issueDate', 'Issue Date', true),
            ...f.date('responseDeadline', 'Response Deadline'),
            ...f.select('status', 'Status', enums.REQUISITION_STATUS),
            ...f.textarea('description', 'Description'),
            ...f.textarea('notes', 'Notes'),
            ...f.text('vendorIds', 'Vendor Ids'),
        ])
    ]),

    ScmPurchaseOrder: f.form('Purchase Order', [
        f.section('Order Details', [
            ...f.text('orderNumber', 'PO #', true),
            ...f.reference('vendorId', 'Vendor', 'Vendor', true),
            ...f.date('orderDate', 'Order Date', true),
            ...f.date('expectedDelivery', 'Expected Delivery'),
            ...f.select('status', 'Status', enums.PO_STATUS),
            ...f.text('paymentTerms', 'Payment Terms'),
            ...f.textarea('notes', 'Notes'),
            ...f.money('totalAmount', 'Total Amount'),
            ...f.address('shippingAddress'),
            ...f.text('requisitionId', 'Requisition'),
            ...f.text('rfqId', 'Rfq'),
        ]),
        f.section('Order Lines', [
            ...f.inlineTable('lines', 'PO Lines', [
                { key: 'lineId', label: 'Line ID', hidden: true },
                { key: 'lineNumber', label: '#', type: 'number' },
                { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                { key: 'description', label: 'Description', type: 'text' },
                { key: 'quantity', label: 'Qty', type: 'number', required: true },
                { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                { key: 'receivedQuantity', label: 'Received Qty', type: 'number' }
            ])
        ])
    ]),

    ScmBlanketOrder: f.form('Blanket Order', [
        f.section('Order Details', [
            ...f.text('orderNumber', 'Order #', true),
            ...f.reference('vendorId', 'Vendor', 'Vendor', true),
            ...f.date('startDate', 'Start Date', true),
            ...f.date('endDate', 'End Date', true),
            ...f.money('maxAmount', 'Max Amount'),
            ...f.select('status', 'Status', enums.PO_STATUS),
            ...f.textarea('description', 'Description'),
            ...f.money('usedAmount', 'Used Amount'),
        ])
    ]),

    ScmSupplierScorecard: f.form('Supplier Scorecard', [
        f.section('Scorecard Details', [
            ...f.reference('vendorId', 'Vendor', 'Vendor', true),
            ...f.number('qualityScore', 'Quality Score'),
            ...f.number('deliveryScore', 'Delivery Score'),
            ...f.number('priceScore', 'Price Score'),
            ...f.number('serviceScore', 'Service Score'),
            ...f.number('overallScore', 'Overall Score'),
            ...f.textarea('notes', 'Notes'),
            ...f.date('evaluationPeriod.startDate', 'Evaluation Period Start'),
            ...f.date('evaluationPeriod.endDate', 'Evaluation Period End'),
        ])
    ])
};

})();
