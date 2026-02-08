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

    const render = MobileEcomOrders.render;

    MobileEcomOrders.columns = {
        EcomOrder: [
            { key: 'orderId', label: 'ID', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'orderNumber', label: 'Order Number', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.orderStatus(item.status) },
            { key: 'paymentStatus', label: 'Payment Status', sortKey: 'paymentStatus', render: (item) => render.paymentStatus(item.paymentStatus) },
            { key: 'orderDate', label: 'Order Date', sortKey: 'orderDate', render: (item) => Layer8MRenderers.renderDate(item.orderDate) },
            { key: 'totalAmount', label: 'Total Amount', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) }
        ],

        EcomOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'orderId', label: 'Order', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'productId', label: 'Product', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'lineTotal', label: 'Line Total', sortKey: 'lineTotal', render: (item) => Layer8MRenderers.renderMoney(item.lineTotal) }
        ],

        EcomOrderStatusHistory: [
            { key: 'statusId', label: 'ID', sortKey: 'statusId', filterKey: 'statusId' },
            { key: 'orderId', label: 'Order', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'previousStatus', label: 'Previous Status', sortKey: 'previousStatus', render: (item) => render.orderStatus(item.previousStatus) },
            { key: 'newStatus', label: 'New Status', sortKey: 'newStatus', render: (item) => render.orderStatus(item.newStatus) },
            { key: 'changedAt', label: 'Changed At', sortKey: 'changedAt', render: (item) => Layer8MRenderers.renderDate(item.changedAt) }
        ],

        EcomReturn: [
            { key: 'returnId', label: 'ID', sortKey: 'returnId', filterKey: 'returnId' },
            { key: 'returnNumber', label: 'Return Number', sortKey: 'returnNumber', filterKey: 'returnNumber' },
            { key: 'orderId', label: 'Order', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'status', label: 'Status', sortKey: 'status', render: (item) => render.returnStatus(item.status) },
            { key: 'requestedDate', label: 'Requested Date', sortKey: 'requestedDate', render: (item) => Layer8MRenderers.renderDate(item.requestedDate) },
            { key: 'refundAmount', label: 'Refund Amount', sortKey: 'refundAmount', render: (item) => Layer8MRenderers.renderMoney(item.refundAmount) }
        ],

        EcomReturnLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'returnId', label: 'Return', sortKey: 'returnId', filterKey: 'returnId' },
            { key: 'productId', label: 'Product', sortKey: 'productId', filterKey: 'productId' },
            { key: 'sku', label: 'SKU', sortKey: 'sku', filterKey: 'sku' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'refundAmount', label: 'Refund Amount', sortKey: 'refundAmount', render: (item) => Layer8MRenderers.renderMoney(item.refundAmount) }
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
