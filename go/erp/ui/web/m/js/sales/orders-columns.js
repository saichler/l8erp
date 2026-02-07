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
 * Mobile Sales Orders Module - Column Configurations
 * Desktop Equivalent: sales/orders/orders-columns.js
 */
(function() {
    'use strict';

    const enums = MobileSalesOrders.enums;
    const render = MobileSalesOrders.render;

    MobileSalesOrders.columns = {
        SalesQuotation: [
            { key: 'quotationId', label: 'ID', sortKey: 'quotationId', filterKey: 'quotationId' },
            { key: 'quotationNumber', label: 'Quote #', sortKey: 'quotationNumber', filterKey: 'quotationNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'quotationDate', label: 'Date', sortKey: 'quotationDate', render: (item) => Layer8MRenderers.renderDate(item.quotationDate) },
            { key: 'validUntil', label: 'Valid Until', sortKey: 'validUntil', render: (item) => Layer8MRenderers.renderDate(item.validUntil) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.QUOTATION_STATUS_VALUES, render: (item) => render.quotationStatus(item.status) },
            { key: 'totalAmount', label: 'Total', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) }
        ],

        QuotationLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'quotationId', label: 'Quotation', sortKey: 'quotationId', filterKey: 'quotationId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'lineTotal', label: 'Total', sortKey: 'lineTotal', render: (item) => Layer8MRenderers.renderMoney(item.lineTotal) }
        ],

        SalesOrder: [
            { key: 'salesOrderId', label: 'ID', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'orderDate', label: 'Order Date', sortKey: 'orderDate', render: (item) => Layer8MRenderers.renderDate(item.orderDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ORDER_STATUS_VALUES, render: (item) => render.orderStatus(item.status) },
            { key: 'totalAmount', label: 'Total', sortKey: 'totalAmount', render: (item) => Layer8MRenderers.renderMoney(item.totalAmount) }
        ],

        SalesOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'lineTotal', label: 'Total', sortKey: 'lineTotal', render: (item) => Layer8MRenderers.renderMoney(item.lineTotal) }
        ],

        OrderAllocation: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'allocatedQuantity', label: 'Allocated', sortKey: 'allocatedQuantity' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.ALLOCATION_STATUS_VALUES, render: (item) => render.allocationStatus(item.status) }
        ],

        BackOrder: [
            { key: 'backOrderId', label: 'ID', sortKey: 'backOrderId', filterKey: 'backOrderId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'backOrderQuantity', label: 'Qty', sortKey: 'backOrderQuantity' },
            { key: 'expectedDate', label: 'Expected', sortKey: 'expectedDate', render: (item) => Layer8MRenderers.renderDate(item.expectedDate) }
        ],

        ReturnOrder: [
            { key: 'returnOrderId', label: 'ID', sortKey: 'returnOrderId', filterKey: 'returnOrderId' },
            { key: 'returnNumber', label: 'Return #', sortKey: 'returnNumber', filterKey: 'returnNumber' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'returnDate', label: 'Date', sortKey: 'returnDate', render: (item) => Layer8MRenderers.renderDate(item.returnDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.RETURN_STATUS_VALUES, render: (item) => render.returnStatus(item.status) }
        ],

        ReturnOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'returnOrderId', label: 'Return', sortKey: 'returnOrderId', filterKey: 'returnOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ]
    };

    MobileSalesOrders.primaryKeys = {
        SalesQuotation: 'quotationId', QuotationLine: 'lineId',
        SalesOrder: 'salesOrderId', SalesOrderLine: 'lineId',
        OrderAllocation: 'allocationId', BackOrder: 'backOrderId',
        ReturnOrder: 'returnOrderId', ReturnOrderLine: 'lineId'
    };

})();
