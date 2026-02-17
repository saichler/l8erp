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
// E-Commerce Orders Module - Column Configurations

(function() {
    'use strict';

    window.EcomOrders = window.EcomOrders || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = EcomOrders.render;

    EcomOrders.columns = {
        EcomOrder: [
            { key: 'orderId', label: 'ID', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'orderNumber', label: 'Order Number', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.orderStatus(item.status)
            },
            {
                key: 'paymentStatus',
                label: 'Payment Status',
                sortKey: 'paymentStatus',
                render: (item) => render.paymentStatus(item.paymentStatus)
            },
            {
                key: 'orderDate',
                label: 'Order Date',
                sortKey: 'orderDate',
                render: (item) => renderDate(item.orderDate)
            },
            {
                key: 'totalAmount',
                label: 'Total Amount',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            }
        ],

        EcomReturn: [
            { key: 'returnId', label: 'ID', sortKey: 'returnId', filterKey: 'returnId' },
            { key: 'returnNumber', label: 'Return Number', sortKey: 'returnNumber', filterKey: 'returnNumber' },
            { key: 'orderId', label: 'Order', sortKey: 'orderId', filterKey: 'orderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.returnStatus(item.status)
            },
            {
                key: 'requestedDate',
                label: 'Requested Date',
                sortKey: 'requestedDate',
                render: (item) => renderDate(item.requestedDate)
            },
            {
                key: 'refundAmount',
                label: 'Refund Amount',
                sortKey: 'refundAmount',
                render: (item) => renderMoney(item.refundAmount)
            }
        ],

        // EcomOrderLine, EcomOrderStatusHistory, EcomReturnLine - now inline tables in parents
    };

})();
