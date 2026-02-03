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
// Sales Orders Module - Column Configurations
// Table column definitions for all Sales Orders models

(function() {
    'use strict';

    window.SalesOrders = window.SalesOrders || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesOrders.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesOrders.columns = {
        SalesQuotation: [
            { key: 'quotationId', label: 'ID', sortKey: 'quotationId', filterKey: 'quotationId' },
            { key: 'quotationNumber', label: 'Quote #', sortKey: 'quotationNumber', filterKey: 'quotationNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'quotationDate',
                label: 'Date',
                sortKey: 'quotationDate',
                render: (item) => renderDate(item.quotationDate)
            },
            {
                key: 'validUntil',
                label: 'Valid Until',
                sortKey: 'validUntil',
                render: (item) => renderDate(item.validUntil)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.quotationStatus(item.status)
            },
            {
                key: 'totalAmount',
                label: 'Total',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            }
        ],

        QuotationLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'quotationId', label: 'Quotation', sortKey: 'quotationId', filterKey: 'quotationId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'lineTotal',
                label: 'Total',
                sortKey: 'lineTotal',
                render: (item) => renderMoney(item.lineTotal)
            }
        ],

        SalesOrder: [
            { key: 'salesOrderId', label: 'ID', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'orderDate',
                label: 'Order Date',
                sortKey: 'orderDate',
                render: (item) => renderDate(item.orderDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.orderStatus(item.status)
            },
            {
                key: 'totalAmount',
                label: 'Total',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            }
        ],

        SalesOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'lineTotal',
                label: 'Total',
                sortKey: 'lineTotal',
                render: (item) => renderMoney(item.lineTotal)
            }
        ],

        OrderAllocation: [
            { key: 'allocationId', label: 'ID', sortKey: 'allocationId', filterKey: 'allocationId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'allocatedQty', label: 'Allocated', sortKey: 'allocatedQty' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.allocationStatus(item.status)
            }
        ],

        BackOrder: [
            { key: 'backOrderId', label: 'ID', sortKey: 'backOrderId', filterKey: 'backOrderId' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'backOrderQty', label: 'Qty', sortKey: 'backOrderQty' },
            {
                key: 'expectedDate',
                label: 'Expected',
                sortKey: 'expectedDate',
                render: (item) => renderDate(item.expectedDate)
            }
        ],

        ReturnOrder: [
            { key: 'returnOrderId', label: 'ID', sortKey: 'returnOrderId', filterKey: 'returnOrderId' },
            { key: 'returnNumber', label: 'Return #', sortKey: 'returnNumber', filterKey: 'returnNumber' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'returnDate',
                label: 'Date',
                sortKey: 'returnDate',
                render: (item) => renderDate(item.returnDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.returnStatus(item.status)
            }
        ],

        ReturnOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'returnOrderId', label: 'Return', sortKey: 'returnOrderId', filterKey: 'returnOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'returnQty', label: 'Qty', sortKey: 'returnQty' },
            { key: 'reason', label: 'Reason', sortKey: 'reason' }
        ]
    };

})();
