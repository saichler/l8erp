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
// Logistics Module - Column Configurations
// Table column definitions for all Logistics models

(function() {
    'use strict';

    window.Logistics = window.Logistics || {};

    const col = window.Layer8ColumnFactory;
    const render = Logistics.render;

    Logistics.columns = {
        ScmCarrier: [
            ...col.id('carrierId'),
            ...col.basic(['code', 'name']),
            ...col.custom('carrierType', 'Type', (item) => render.carrierType(item.carrierType)),
            ...col.col('contactInfo', 'Contact'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmFreightRate: [
            ...col.id('rateId'),
            ...col.basic([['carrierId', 'Carrier'], 'origin', 'destination']),
            ...col.money('ratePerUnit', 'Rate/Unit'),
            ...col.date('effectiveDate', 'Effective')
        ],

        ScmShipment: [
            ...col.id('shipmentId'),
            ...col.basic([['shipmentNumber', 'Shipment #'], ['carrierId', 'Carrier']]),
            ...col.date('shipDate', 'Ship Date'),
            ...col.custom('status', 'Status', (item) => render.shipmentStatus(item.status)),
            ...col.money('freightCost', 'Cost')
        ],

        ScmRoute: [
            ...col.id('routeId'),
            ...col.basic([['name', 'Route'], 'origin', 'destination']),
            ...col.col('distance', 'Distance'),
            ...col.col('estimatedTime', 'Est. Time')
        ],

        ScmLoadPlan: [
            ...col.id('loadPlanId'),
            ...col.date('plannedDate', 'Planned'),
            ...col.basic([['shipmentId', 'Shipment'], ['vehicleId', 'Vehicle']]),
            ...col.col('totalWeight', 'Weight'),
            ...col.custom('status', 'Status', (item) => render.taskStatus(item.status))
        ],

        ScmDeliveryProof: [
            ...col.id('proofId'),
            ...col.col('shipmentId', 'Shipment'),
            ...col.date('deliveryDate', 'Delivered'),
            ...col.col('receivedBy', 'Received By'),
            ...col.custom('status', 'Status', (item) => render.taskStatus(item.status))
        ],

        ScmFreightAudit: [
            ...col.id('auditId'),
            ...col.basic([['shipmentId', 'Shipment'], ['carrierId', 'Carrier']]),
            ...col.money('invoicedAmount', 'Invoiced'),
            ...col.money('actualAmount', 'Actual'),
            ...col.money('variance', 'Variance')
        ],

        ScmReturnAuthorization: [
            ...col.id('rmaId'),
            ...col.basic([['rmaNumber', 'RMA #'], ['customerId', 'Customer']]),
            ...col.date('returnDate', 'Return Date'),
            ...col.col('reason', 'Reason'),
            ...col.custom('status', 'Status', (item) => render.taskStatus(item.status))
        ]
    };
})();
