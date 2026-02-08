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
 * Mobile Logistics Module - Form Configurations
 * Desktop Equivalent: scm/logistics/logistics-forms.js
 */
(function() {
    'use strict';

    window.MobileLogistics = window.MobileLogistics || {};
    const f = window.Layer8FormFactory;
    const enums = MobileLogistics.enums;

    MobileLogistics.forms = {
    ScmCarrier: f.form('ScmCarrier', [
        f.section('Carrier Information', [
            ...f.text('code', 'Carrier Code', true),
            ...f.text('name', 'Name', true),
            ...f.select('carrierType', 'Carrier Type', enums.CARRIER_TYPE, true),
            ...f.contact('contactInfo'),
            ...f.checkbox('isActive', 'Active')
        ])
    ]),

    ScmFreightRate: f.form('Freight Rate', [
        f.section('Rate Details', [
            ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
            ...f.text('origin', 'Origin', true),
            ...f.text('destination', 'Destination', true),
            ...f.money('ratePerUnit', 'Rate per Unit', true),
            ...f.text('unitType', 'Unit Type'),
            ...f.date('effectiveDate', 'Effective Date', true),
            ...f.date('expiryDate', 'Expiry Date')
        ])
    ]),

    ScmShipment: f.form('ScmShipment', [
        f.section('Shipment Details', [
            ...f.text('shipmentNumber', 'Shipment Number', true),
            ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
            ...f.reference('originWarehouseId', 'Origin Warehouse', 'ScmWarehouse'),
            ...f.address('destinationAddress'),
            ...f.date('shipDate', 'Ship Date', true),
            ...f.date('expectedDelivery', 'Expected Delivery'),
            ...f.select('status', 'Status', enums.SHIPMENT_STATUS),
            ...f.money('freightCost', 'Freight Cost')
        ])
    ]),

    ScmRoute: f.form('ScmRoute', [
        f.section('Route Details', [
            ...f.text('name', 'Route Name', true),
            ...f.text('origin', 'Origin', true),
            ...f.text('destination', 'Destination', true),
            ...f.number('distance', 'Distance'),
            ...f.text('estimatedTime', 'Estimated Time'),
            ...f.textarea('description', 'Description')
        ])
    ]),

    ScmLoadPlan: f.form('Load Plan', [
        f.section('Plan Details', [
            ...f.date('plannedDate', 'Planned Date'),
            ...f.reference('shipmentId', 'Shipment', 'ScmShipment', true),
            ...f.text('vehicleId', 'Vehicle'),
            ...f.number('totalWeight', 'Total Weight'),
            ...f.number('totalVolume', 'Total Volume'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ]),

    ScmDeliveryProof: f.form('Delivery Proof', [
        f.section('Proof Details', [
            ...f.reference('shipmentId', 'Shipment', 'ScmShipment', true),
            ...f.date('deliveryDate', 'Delivery Date', true),
            ...f.text('receivedBy', 'Received By', true),
            ...f.text('signature', 'Signature'),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ]),

    ScmFreightAudit: f.form('Freight Audit', [
        f.section('Audit Details', [
            ...f.reference('shipmentId', 'Shipment', 'ScmShipment', true),
            ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
            ...f.money('invoicedAmount', 'Invoiced Amount', true),
            ...f.money('actualAmount', 'Actual Amount'),
            ...f.money('variance', 'Variance'),
            ...f.textarea('notes', 'Notes')
        ])
    ]),

    ScmReturnAuthorization: f.form('Return Authorization', [
        f.section('RMA Details', [
            ...f.text('rmaNumber', 'RMA Number', true),
            ...f.reference('customerId', 'Customer', 'Customer'),
            ...f.date('returnDate', 'Return Date', true),
            ...f.textarea('reason', 'Reason', true),
            ...f.select('status', 'Status', enums.TASK_STATUS),
            ...f.textarea('notes', 'Notes')
        ])
    ])
};

})();
