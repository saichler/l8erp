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

    const col = window.Layer8ColumnFactory;
    const enums = MobileSalesShipping.enums;
    const render = MobileSalesShipping.render;

    MobileSalesShipping.columns = {
        DeliveryOrder: [
            ...col.id('deliveryOrderId'),
            ...col.col('deliveryNumber', 'Delivery #'),
            ...col.col('salesOrderId', 'Order'),
            ...col.col('customerId', 'Customer'),
            ...col.date('plannedShipDate', 'Planned'),
            ...col.status('status', 'Status', enums.DELIVERY_STATUS_VALUES, render.deliveryStatus)
        ],

        DeliveryLine: [
            ...col.id('lineId'),
            ...col.col('deliveryOrderId', 'Delivery'),
            ...col.col('itemId', 'Item'),
            ...col.col('quantity', 'Qty'),
            ...col.col('unitOfMeasure', 'UOM'),
            ...col.col('lotNumber', 'Lot #')
        ],

        PickRelease: [
            ...col.id('pickReleaseId'),
            ...col.col('deliveryOrderId', 'Delivery'),
            ...col.col('warehouseId', 'Warehouse'),
            ...col.date('releaseDate', 'Released'),
            ...col.status('status', 'Status', enums.PICK_STATUS_VALUES, render.pickStatus)
        ],

        PackingSlip: [
            ...col.id('packingSlipId'),
            ...col.col('slipNumber', 'Slip #'),
            ...col.col('deliveryOrderId', 'Delivery'),
            ...col.date('packDate', 'Pack Date'),
            ...col.col('totalPackages', 'Packages'),
            ...col.col('totalWeight', 'Weight')
        ],

        ShippingDoc: [
            ...col.id('docId'),
            ...col.col('docNumber', 'Doc #'),
            ...col.col('docType', 'Type'),
            ...col.col('deliveryOrderId', 'Delivery'),
            ...col.date('issueDate', 'Issued'),
            ...col.col('issuedBy', 'Issued By')
        ],

        DeliveryConfirm: [
            ...col.id('confirmId'),
            ...col.col('deliveryOrderId', 'Delivery'),
            ...col.date('confirmDate', 'Confirmed'),
            ...col.col('receivedBy', 'Received By'),
            ...col.col('signaturePath', 'Signature')
        ]
    };

    MobileSalesShipping.primaryKeys = {
        DeliveryOrder: 'deliveryOrderId', DeliveryLine: 'lineId',
        PickRelease: 'pickReleaseId', PackingSlip: 'packingSlipId',
        ShippingDoc: 'docId', DeliveryConfirm: 'confirmId'
    };

})();
