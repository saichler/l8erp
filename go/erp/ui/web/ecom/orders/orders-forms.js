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
// E-Commerce Orders Module - Form Definitions

(function() {
    'use strict';

    window.EcomOrders = window.EcomOrders || {};

    const enums = EcomOrders.enums;

    EcomOrders.forms = {
        EcomOrder: {
            title: 'Order',
            sections: [
                {
                    title: 'Order Details',
                    fields: [
                        { key: 'orderNumber', label: 'Order Number', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'EcomCustomer', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ORDER_STATUS },
                        { key: 'paymentStatus', label: 'Payment Status', type: 'select', options: enums.PAYMENT_STATUS },
                        { key: 'orderDate', label: 'Order Date', type: 'date', required: true },
                        { key: 'subtotal', label: 'Subtotal', type: 'money' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                        { key: 'shippingAmount', label: 'Shipping Amount', type: 'money' },
                        { key: 'discountAmount', label: 'Discount Amount', type: 'money' },
                        { key: 'totalAmount', label: 'Total Amount', type: 'money' },
                        { key: 'shippingAddressId', label: 'Shipping Address', type: 'reference', lookupModel: 'EcomAddress' },
                        { key: 'billingAddressId', label: 'Billing Address', type: 'reference', lookupModel: 'EcomAddress' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomOrderLine: {
            title: 'Order Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'orderId', label: 'Order', type: 'reference', lookupModel: 'EcomOrder', required: true },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'sku', label: 'SKU', type: 'text' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                        { key: 'discountAmount', label: 'Discount Amount', type: 'money' },
                        { key: 'taxAmount', label: 'Tax Amount', type: 'money' },
                        { key: 'lineTotal', label: 'Line Total', type: 'money' }
                    ]
                }
            ]
        },

        EcomOrderStatusHistory: {
            title: 'Order Status History',
            sections: [
                {
                    title: 'Status Change Details',
                    fields: [
                        { key: 'orderId', label: 'Order', type: 'reference', lookupModel: 'EcomOrder', required: true },
                        { key: 'previousStatus', label: 'Previous Status', type: 'select', options: enums.ORDER_STATUS },
                        { key: 'newStatus', label: 'New Status', type: 'select', options: enums.ORDER_STATUS, required: true },
                        { key: 'changedAt', label: 'Changed At', type: 'date', required: true },
                        { key: 'changedBy', label: 'Changed By', type: 'text' },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomReturn: {
            title: 'Return',
            sections: [
                {
                    title: 'Return Details',
                    fields: [
                        { key: 'returnNumber', label: 'Return Number', type: 'text', required: true },
                        { key: 'orderId', label: 'Order', type: 'reference', lookupModel: 'EcomOrder', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'EcomCustomer', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.RETURN_STATUS },
                        { key: 'requestedDate', label: 'Requested Date', type: 'date', required: true },
                        { key: 'approvedDate', label: 'Approved Date', type: 'date' },
                        { key: 'receivedDate', label: 'Received Date', type: 'date' },
                        { key: 'refundAmount', label: 'Refund Amount', type: 'money' },
                        { key: 'reason', label: 'Reason', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        EcomReturnLine: {
            title: 'Return Line',
            sections: [
                {
                    title: 'Return Line Details',
                    fields: [
                        { key: 'returnId', label: 'Return', type: 'reference', lookupModel: 'EcomReturn', required: true },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'EcomProduct', required: true },
                        { key: 'sku', label: 'SKU', type: 'text' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                        { key: 'refundAmount', label: 'Refund Amount', type: 'money' },
                        { key: 'reason', label: 'Reason', type: 'textarea' },
                        { key: 'condition', label: 'Condition', type: 'text' }
                    ]
                }
            ]
        }
    };

    EcomOrders.primaryKeys = {
        EcomOrder: 'orderId',
        EcomOrderLine: 'lineId',
        EcomOrderStatusHistory: 'statusId',
        EcomReturn: 'returnId',
        EcomReturnLine: 'lineId'
    };

})();
