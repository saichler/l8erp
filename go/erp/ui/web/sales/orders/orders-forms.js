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
// Sales Orders Module - Form Definitions
// Form field configurations for all Sales Orders models

(function() {
    'use strict';

    window.SalesOrders = window.SalesOrders || {};

    const enums = SalesOrders.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesOrders.forms = {
        SalesQuotation: {
            title: 'Sales Quotation',
            sections: [
                {
                    title: 'Quotation Details',
                    fields: [
                        { key: 'quotationNumber', label: 'Quotation #', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee' },
                        { key: 'quotationDate', label: 'Quotation Date', type: 'date', required: true },
                        { key: 'validUntil', label: 'Valid Until', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.QUOTATION_STATUS },
                        { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        QuotationLine: {
            title: 'Quotation Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'quotationId', label: 'Quotation', type: 'reference', lookupModel: 'SalesQuotation', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency', required: true },
                        { key: 'discountPercent', label: 'Discount %', type: 'number' }
                    ]
                }
            ]
        },

        SalesOrder: {
            title: 'Sales Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order #', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'salespersonId', label: 'Salesperson', type: 'reference', lookupModel: 'Employee' },
                        { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
                        { key: 'requestedDeliveryDate', label: 'Requested Delivery', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ORDER_STATUS },
                        { key: 'quotationId', label: 'Quotation', type: 'reference', lookupModel: 'SalesQuotation' },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'priority', label: 'Priority', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesOrderLine: {
            title: 'Sales Order Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency', required: true },
                        { key: 'discountPercent', label: 'Discount %', type: 'number' },
                        { key: 'requestedDate', label: 'Requested Date', type: 'date' }
                    ]
                }
            ]
        },

        OrderAllocation: {
            title: 'Order Allocation',
            sections: [
                {
                    title: 'Allocation Details',
                    fields: [
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'lineId', label: 'Order Line', type: 'reference', lookupModel: 'SalesOrderLine' },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'binId', label: 'Bin', type: 'reference', lookupModel: 'ScmBin' },
                        { key: 'allocatedQty', label: 'Allocated Qty', type: 'number', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ALLOCATION_STATUS }
                    ]
                }
            ]
        },

        BackOrder: {
            title: 'Back Order',
            sections: [
                {
                    title: 'Back Order Details',
                    fields: [
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'lineId', label: 'Order Line', type: 'reference', lookupModel: 'SalesOrderLine' },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'backOrderQty', label: 'Back Order Qty', type: 'number', required: true },
                        { key: 'expectedDate', label: 'Expected Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ReturnOrder: {
            title: 'Return Order',
            sections: [
                {
                    title: 'Return Details',
                    fields: [
                        { key: 'returnNumber', label: 'Return #', type: 'text', required: true },
                        { key: 'salesOrderId', label: 'Original Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'returnDate', label: 'Return Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RETURN_STATUS },
                        { key: 'returnReason', label: 'Reason', type: 'textarea' },
                        { key: 'warehouseId', label: 'Return Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ReturnOrderLine: {
            title: 'Return Order Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'returnOrderId', label: 'Return Order', type: 'reference', lookupModel: 'ReturnOrder', required: true },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'returnQty', label: 'Return Qty', type: 'number', required: true },
                        { key: 'reason', label: 'Reason', type: 'text' },
                        { key: 'condition', label: 'Condition', type: 'text' },
                        { key: 'disposition', label: 'Disposition', type: 'text' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesOrders.primaryKeys = {
        SalesQuotation: 'quotationId',
        QuotationLine: 'lineId',
        SalesOrder: 'salesOrderId',
        SalesOrderLine: 'lineId',
        OrderAllocation: 'allocationId',
        BackOrder: 'backOrderId',
        ReturnOrder: 'returnOrderId',
        ReturnOrderLine: 'lineId'
    };

})();
