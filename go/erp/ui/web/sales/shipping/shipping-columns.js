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
// Sales Shipping Module - Column Configurations
// Table column definitions for all Sales Shipping models

(function() {
    'use strict';

    window.SalesShipping = window.SalesShipping || {};

    const { renderDate, renderMoney } = Layer8DRenderers;
    const render = SalesShipping.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    SalesShipping.columns = {
        SalesDeliveryOrder: [
            { key: 'deliveryOrderId', label: 'ID', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'deliveryNumber', label: 'Delivery #', sortKey: 'deliveryNumber', filterKey: 'deliveryNumber' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'plannedShipDate',
                label: 'Planned',
                sortKey: 'plannedShipDate',
                render: (item) => renderDate(item.plannedShipDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.deliveryStatus(item.status)
            }
        ],

        SalesDeliveryLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitOfMeasure', label: 'UOM', sortKey: 'unitOfMeasure' },
            { key: 'description', label: 'Description', sortKey: 'description' }
        ],

        SalesPickRelease: [
            { key: 'pickReleaseId', label: 'ID', sortKey: 'pickReleaseId', filterKey: 'pickReleaseId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            {
                key: 'releaseDate',
                label: 'Released',
                sortKey: 'releaseDate',
                render: (item) => renderDate(item.releaseDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.pickStatus(item.status)
            }
        ],

        SalesPackingSlip: [
            { key: 'packingSlipId', label: 'ID', sortKey: 'packingSlipId', filterKey: 'packingSlipId' },
            { key: 'slipNumber', label: 'Slip #', sortKey: 'slipNumber', filterKey: 'slipNumber' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            {
                key: 'packDate',
                label: 'Pack Date',
                sortKey: 'packDate',
                render: (item) => renderDate(item.packDate)
            },
            { key: 'totalPackages', label: 'Packages', sortKey: 'totalPackages' },
            { key: 'totalWeight', label: 'Weight', sortKey: 'totalWeight' }
        ],

        SalesShippingDoc: [
            { key: 'docId', label: 'ID', sortKey: 'docId', filterKey: 'docId' },
            { key: 'docNumber', label: 'Doc #', sortKey: 'docNumber', filterKey: 'docNumber' },
            { key: 'docType', label: 'Type', sortKey: 'docType' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            {
                key: 'issueDate',
                label: 'Issue Date',
                sortKey: 'issueDate',
                render: (item) => renderDate(item.issueDate)
            },
            { key: 'issuedBy', label: 'Issued By', sortKey: 'issuedBy' }
        ],

        SalesDeliveryConfirm: [
            { key: 'confirmId', label: 'ID', sortKey: 'confirmId', filterKey: 'confirmId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            {
                key: 'confirmDate',
                label: 'Confirmed',
                sortKey: 'confirmDate',
                render: (item) => renderDate(item.confirmDate)
            },
            { key: 'receivedBy', label: 'Received By', sortKey: 'receivedBy' },
            { key: 'signaturePath', label: 'Signature', sortKey: 'signaturePath' }
        ]
    };

})();
