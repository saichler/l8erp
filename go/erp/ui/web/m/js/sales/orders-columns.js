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

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesOrders.enums;
    const render = MobileSalesOrders.render;

    MobileSalesOrders.columns = {
        SalesQuotation: [
            ...col.id('quotationId'),
            ...col.col('quotationNumber', 'Quote #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('quotationDate', 'Date'),
            ...col.date('validUntil', 'Valid Until'),
            ...col.status('status', 'Status', enums.QUOTATION_STATUS_VALUES, render.quotationStatus),
            ...col.money('totalAmount', 'Total')
        ],

        SalesQuotationLine: [
            ...col.id('lineId'),
            ...col.col('quotationId', 'Quotation'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantity', 'Qty'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineTotal', 'Total')
        ],

        SalesOrder: [
            ...col.id('salesOrderId'),
            ...col.col('orderNumber', 'Order #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('orderDate', 'Order Date'),
            ...col.status('status', 'Status', enums.ORDER_STATUS_VALUES, render.orderStatus),
            ...col.money('totalAmount', 'Total')
        ],

        SalesOrderLine: [
            ...col.id('lineId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantity', 'Qty'),
            ...col.money('unitPrice', 'Unit Price'),
            ...col.money('lineTotal', 'Total')
        ],

        SalesOrderAllocation: [
            ...col.id('allocationId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.col('allocatedQuantity', 'Allocated'),
            ...col.status('status', 'Status', enums.ALLOCATION_STATUS_VALUES, render.allocationStatus)
        ],

        SalesBackOrder: [
            ...col.id('backOrderId'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('itemId', 'Item'),
            ...col.col('backOrderQuantity', 'Qty'),
            ...col.date('expectedDate', 'Expected')
        ],

        SalesReturnOrder: [
            ...col.id('returnOrderId'),
            ...col.col('returnNumber', 'Return #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('returnDate', 'Date'),
            ...col.status('status', 'Status', enums.RETURN_STATUS_VALUES, render.returnStatus)
        ],

        SalesReturnOrderLine: [
            ...col.id('lineId'),
            ...col.col('returnOrderId', 'Return'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantity', 'Qty'),
            ...col.col('description', 'Description')
        ]
    };

    MobileSalesOrders.primaryKeys = {
        SalesQuotation: 'quotationId', SalesQuotationLine: 'lineId',
        SalesOrder: 'salesOrderId', SalesOrderLine: 'lineId',
        SalesOrderAllocation: 'allocationId', SalesBackOrder: 'backOrderId',
        SalesReturnOrder: 'returnOrderId', SalesReturnOrderLine: 'lineId'
    };

})();
