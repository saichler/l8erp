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
 * Mobile Procurement Module - Form Configurations
 * Desktop Equivalent: scm/procurement/procurement-forms.js
 */
(function() {
    'use strict';

    const enums = MobileProcurement.enums;

    MobileProcurement.forms = {
        ScmPurchaseRequisition: {
            title: 'Purchase Requisition',
            sections: [
                {
                    title: 'Requisition Details',
                    fields: [
                        { key: 'requisitionNumber', label: 'Requisition #', type: 'text', required: true },
                        { key: 'requesterId', label: 'Requester', type: 'reference', lookupModel: 'Employee' },
                        { key: 'departmentId', label: 'Department', type: 'reference', lookupModel: 'Department' },
                        { key: 'requestDate', label: 'Request Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REQUISITION_STATUS },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmRequisitionLine: {
            title: 'Requisition Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'requisitionId', label: 'Requisition', type: 'reference', lookupModel: 'ScmPurchaseRequisition', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'estimatedUnitPrice', label: 'Est. Unit Price', type: 'currency' },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor' },
                        { key: 'deliveryDate', label: 'Delivery Date', type: 'date' }
                    ]
                }
            ]
        },

        ScmRequestForQuotation: {
            title: 'Request for Quotation',
            sections: [
                {
                    title: 'RFQ Details',
                    fields: [
                        { key: 'rfqNumber', label: 'RFQ #', type: 'text', required: true },
                        { key: 'requisitionId', label: 'Requisition', type: 'reference', lookupModel: 'ScmPurchaseRequisition' },
                        { key: 'issueDate', label: 'Issue Date', type: 'date', required: true },
                        { key: 'responseDeadline', label: 'Response Deadline', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.REQUISITION_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmPurchaseOrder: {
            title: 'Purchase Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'PO #', type: 'text', required: true },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
                        { key: 'expectedDelivery', label: 'Expected Delivery', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PO_STATUS },
                        { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmPurchaseOrderLine: {
            title: 'PO Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'purchaseOrderId', label: 'Purchase Order', type: 'reference', lookupModel: 'ScmPurchaseOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' }
                    ]
                }
            ]
        },

        ScmBlanketOrder: {
            title: 'Blanket Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order #', type: 'text', required: true },
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'maxAmount', label: 'Max Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PO_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        ScmSupplierScorecard: {
            title: 'Supplier Scorecard',
            sections: [
                {
                    title: 'Scorecard Details',
                    fields: [
                        { key: 'vendorId', label: 'Vendor', type: 'reference', lookupModel: 'Vendor', required: true },
                        { key: 'qualityScore', label: 'Quality Score', type: 'number' },
                        { key: 'deliveryScore', label: 'Delivery Score', type: 'number' },
                        { key: 'priceScore', label: 'Price Score', type: 'number' },
                        { key: 'serviceScore', label: 'Service Score', type: 'number' },
                        { key: 'overallScore', label: 'Overall Score', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

})();
