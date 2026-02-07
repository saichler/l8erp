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
 * Mobile Sales Shipping Module - Column Configurations
 * Desktop Equivalent: sales/shipping/shipping-columns.js
 */
(function() {
    'use strict';

    const enums = MobileSalesShipping.enums;
    const render = MobileSalesShipping.render;

    MobileSalesShipping.columns = {
        DeliveryOrder: [
            { key: 'deliveryOrderId', label: 'ID', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'deliveryNumber', label: 'Delivery #', sortKey: 'deliveryNumber', filterKey: 'deliveryNumber' },
            { key: 'salesOrderId', label: 'Order', sortKey: 'salesOrderId', filterKey: 'salesOrderId' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            { key: 'plannedShipDate', label: 'Planned', sortKey: 'plannedShipDate', render: (item) => Layer8MRenderers.renderDate(item.plannedShipDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.DELIVERY_STATUS_VALUES, render: (item) => render.deliveryStatus(item.status) }
        ],

        DeliveryLine: [
            { key: 'lineId', label: 'ID', sortKey: 'lineId', filterKey: 'lineId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'itemId', label: 'Item', sortKey: 'itemId', filterKey: 'itemId' },
            { key: 'quantity', label: 'Qty', sortKey: 'quantity' },
            { key: 'unitOfMeasure', label: 'UOM', sortKey: 'unitOfMeasure' },
            { key: 'lotNumber', label: 'Lot #', sortKey: 'lotNumber' }
        ],

        PickRelease: [
            { key: 'pickReleaseId', label: 'ID', sortKey: 'pickReleaseId', filterKey: 'pickReleaseId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'warehouseId', label: 'Warehouse', sortKey: 'warehouseId', filterKey: 'warehouseId' },
            { key: 'releaseDate', label: 'Released', sortKey: 'releaseDate', render: (item) => Layer8MRenderers.renderDate(item.releaseDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.PICK_STATUS_VALUES, render: (item) => render.pickStatus(item.status) }
        ],

        PackingSlip: [
            { key: 'packingSlipId', label: 'ID', sortKey: 'packingSlipId', filterKey: 'packingSlipId' },
            { key: 'slipNumber', label: 'Slip #', sortKey: 'slipNumber', filterKey: 'slipNumber' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'packDate', label: 'Pack Date', sortKey: 'packDate', render: (item) => Layer8MRenderers.renderDate(item.packDate) },
            { key: 'totalPackages', label: 'Packages', sortKey: 'totalPackages' },
            { key: 'totalWeight', label: 'Weight', sortKey: 'totalWeight' }
        ],

        ShippingDoc: [
            { key: 'docId', label: 'ID', sortKey: 'docId', filterKey: 'docId' },
            { key: 'docNumber', label: 'Doc #', sortKey: 'docNumber', filterKey: 'docNumber' },
            { key: 'docType', label: 'Type', sortKey: 'docType' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'issueDate', label: 'Issued', sortKey: 'issueDate', render: (item) => Layer8MRenderers.renderDate(item.issueDate) },
            { key: 'issuedBy', label: 'Issued By', sortKey: 'issuedBy' }
        ],

        DeliveryConfirm: [
            { key: 'confirmId', label: 'ID', sortKey: 'confirmId', filterKey: 'confirmId' },
            { key: 'deliveryOrderId', label: 'Delivery', sortKey: 'deliveryOrderId', filterKey: 'deliveryOrderId' },
            { key: 'confirmDate', label: 'Confirmed', sortKey: 'confirmDate', render: (item) => Layer8MRenderers.renderDate(item.confirmDate) },
            { key: 'receivedBy', label: 'Received By', sortKey: 'receivedBy' },
            { key: 'signaturePath', label: 'Signature', sortKey: 'signaturePath' }
        ]
    };

    MobileSalesShipping.primaryKeys = {
        DeliveryOrder: 'deliveryOrderId', DeliveryLine: 'lineId',
        PickRelease: 'pickReleaseId', PackingSlip: 'packingSlipId',
        ShippingDoc: 'docId', DeliveryConfirm: 'confirmId'
    };

})();
