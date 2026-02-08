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
 * Mobile ECOM Orders Module - Column Configurations
 * Desktop Equivalent: ecom/orders/orders-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const render = MobileEcomOrders.render;

    MobileEcomOrders.columns = {
        EcomOrder: [
            ...col.id('orderId'),
            ...col.col('orderNumber', 'Order Number'),
            ...col.col('customerId', 'Customer'),
            ...col.enum('status', 'Status', null, render.orderStatus),
            ...col.enum('paymentStatus', 'Payment Status', null, render.paymentStatus),
            ...col.date('orderDate', 'Order Date'),
            ...col.money('totalAmount', 'Total Amount')
        ],

        EcomOrderLine: [
            ...col.id('lineId'),
            ...col.col('orderId', 'Order'),
            ...col.col('productId', 'Product'),
            ...col.col('sku', 'SKU'),
            ...col.col('name', 'Name'),
            ...col.col('quantity', 'Quantity'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineTotal', 'Line Total')
        ],

        EcomOrderStatusHistory: [
            ...col.id('statusId'),
            ...col.col('orderId', 'Order'),
            ...col.enum('previousStatus', 'Previous Status', null, render.orderStatus),
            ...col.enum('newStatus', 'New Status', null, render.orderStatus),
            ...col.date('changedAt', 'Changed At')
        ],

        EcomReturn: [
            ...col.id('returnId'),
            ...col.col('returnNumber', 'Return Number'),
            ...col.col('orderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.enum('status', 'Status', null, render.returnStatus),
            ...col.date('requestedDate', 'Requested Date'),
            ...col.money('refundAmount', 'Refund Amount')
        ],

        EcomReturnLine: [
            ...col.id('lineId'),
            ...col.col('returnId', 'Return'),
            ...col.col('productId', 'Product'),
            ...col.col('sku', 'SKU'),
            ...col.col('name', 'Name'),
            ...col.col('quantity', 'Quantity'),
            ...col.money('refundAmount', 'Refund Amount')
        ]
    };

    MobileEcomOrders.primaryKeys = {
        EcomOrder: 'orderId',
        EcomOrderLine: 'lineId',
        EcomOrderStatusHistory: 'statusId',
        EcomReturn: 'returnId',
        EcomReturnLine: 'lineId'
    };

})();
