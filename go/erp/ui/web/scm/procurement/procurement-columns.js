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
// Procurement Module - Column Configurations
// Table column definitions for all Procurement models

(function() {
    'use strict';

    // Ensure Procurement namespace exists
    window.Procurement = window.Procurement || {};

    const { renderDate, renderMoney } = ERPRenderers;
    const render = Procurement.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Procurement.columns = {
        PurchaseRequisition: [
            { key: 'requisitionId', label: 'ID', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            { key: 'requisitionNumber', label: 'Req #', sortKey: 'requisitionNumber', filterKey: 'requisitionNumber' },
            { key: 'requesterId', label: 'Requester', sortKey: 'requesterId', filterKey: 'requesterId' },
            {
                key: 'requestDate',
                label: 'Date',
                sortKey: 'requestDate',
                render: (item) => renderDate(item.requestDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.requisitionStatus(item.status)
            },
            {
                key: 'estimatedTotal',
                label: 'Est. Total',
                sortKey: 'estimatedTotal',
                render: (item) => renderMoney(item.estimatedTotal)
            }
        ],

        RequisitionLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'requisitionId', label: 'Requisition', sortKey: 'requisitionId', filterKey: 'requisitionId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'estimatedUnitPrice',
                label: 'Unit Price',
                sortKey: 'estimatedUnitPrice',
                render: (item) => renderMoney(item.estimatedUnitPrice)
            },
            {
                key: 'deliveryDate',
                label: 'Delivery',
                sortKey: 'deliveryDate',
                render: (item) => renderDate(item.deliveryDate)
            }
        ],

        RequestForQuotation: [
            { key: 'rfqId', label: 'ID', sortKey: 'rfqId', filterKey: 'rfqId' },
            { key: 'rfqNumber', label: 'RFQ #', sortKey: 'rfqNumber', filterKey: 'rfqNumber' },
            {
                key: 'issueDate',
                label: 'Issued',
                sortKey: 'issueDate',
                render: (item) => renderDate(item.issueDate)
            },
            {
                key: 'responseDeadline',
                label: 'Deadline',
                sortKey: 'responseDeadline',
                render: (item) => renderDate(item.responseDeadline)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.requisitionStatus(item.status)
            }
        ],

        PurchaseOrder: [
            { key: 'purchaseOrderId', label: 'ID', sortKey: 'purchaseOrderId', filterKey: 'purchaseOrderId' },
            { key: 'orderNumber', label: 'PO #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
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
                render: (item) => render.poStatus(item.status)
            },
            {
                key: 'totalAmount',
                label: 'Total',
                sortKey: 'totalAmount',
                render: (item) => renderMoney(item.totalAmount)
            }
        ],

        PurchaseOrderLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'purchaseOrderId', label: 'PO', sortKey: 'purchaseOrderId', filterKey: 'purchaseOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            {
                key: 'unitPrice',
                label: 'Unit Price',
                sortKey: 'unitPrice',
                render: (item) => renderMoney(item.unitPrice)
            },
            {
                key: 'totalPrice',
                label: 'Total',
                sortKey: 'totalPrice',
                render: (item) => renderMoney(item.totalPrice)
            }
        ],

        BlanketOrder: [
            { key: 'blanketOrderId', label: 'ID', sortKey: 'blanketOrderId', filterKey: 'blanketOrderId' },
            { key: 'orderNumber', label: 'Order #', sortKey: 'orderNumber', filterKey: 'orderNumber' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            {
                key: 'startDate',
                label: 'Start',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.poStatus(item.status)
            },
            {
                key: 'maxAmount',
                label: 'Max Amount',
                sortKey: 'maxAmount',
                render: (item) => renderMoney(item.maxAmount)
            }
        ],

        SupplierScorecard: [
            { key: 'scorecardId', label: 'ID', sortKey: 'scorecardId', filterKey: 'scorecardId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'qualityScore', label: 'Quality', sortKey: 'qualityScore' },
            { key: 'deliveryScore', label: 'Delivery', sortKey: 'deliveryScore' },
            { key: 'overallScore', label: 'Overall', sortKey: 'overallScore' }
        ]
    };

})();
