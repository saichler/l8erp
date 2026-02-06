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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Shipping Module - Form Configurations
 * Desktop Equivalent: sales/shipping/shipping-forms.js
 */
window.MobileSalesShipping = window.MobileSalesShipping || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesShipping.enums;

    MobileSalesShipping.forms = {
        DeliveryOrder: f.form('Delivery Order', [
            f.section('Delivery Details', [
                ...f.text('deliveryNumber', 'Delivery #', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('plannedDate', 'Planned Date', true),
                ...f.select('status', 'Status', enums.DELIVERY_STATUS),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
                ...f.text('shippingMethod', 'Shipping Method'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DeliveryLine: f.form('Delivery Line', [
            f.section('Line Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'DeliveryOrder', true),
                ...f.reference('salesOrderLineId', 'Order Line', 'SalesOrderLine'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.number('pickedQty', 'Picked Qty'),
                ...f.number('shippedQty', 'Shipped Qty'),
                ...f.text('lotNumber', 'Lot #'),
                ...f.text('serialNumber', 'Serial #')
            ])
        ]),

        PickRelease: f.form('Pick Release', [
            f.section('Release Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'DeliveryOrder', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('releaseDate', 'Release Date', true),
                ...f.select('status', 'Status', enums.PICK_STATUS),
                ...f.number('priority', 'Priority'),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        PackingSlip: f.form('Packing Slip', [
            f.section('Slip Details', [
                ...f.text('slipNumber', 'Slip #', true),
                ...f.reference('deliveryOrderId', 'Delivery Order', 'DeliveryOrder', true),
                ...f.date('packDate', 'Pack Date', true),
                ...f.reference('packedBy', 'Packed By', 'Employee'),
                ...f.number('totalPackages', 'Total Packages'),
                ...f.number('totalWeight', 'Total Weight'),
                ...f.text('weightUnit', 'Weight Unit'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ShippingDoc: f.form('Shipping Document', [
            f.section('Document Details', [
                ...f.text('docNumber', 'Document #', true),
                ...f.text('docType', 'Document Type', true),
                ...f.reference('deliveryOrderId', 'Delivery Order', 'DeliveryOrder', true),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
                ...f.text('trackingNumber', 'Tracking Number'),
                ...f.date('shipDate', 'Ship Date'),
                ...f.date('estimatedArrival', 'Est. Arrival'),
                ...f.money('freightCost', 'Freight Cost'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        DeliveryConfirm: f.form('Delivery Confirmation', [
            f.section('Confirmation Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'DeliveryOrder', true),
                ...f.date('confirmDate', 'Confirm Date', true),
                ...f.text('receivedBy', 'Received By'),
                ...f.checkbox('signatureOnFile', 'Signature On File'),
                ...f.text('condition', 'Condition'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
