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
 * Mobile Logistics Module - Column Configurations
 * Desktop Equivalent: scm/logistics/logistics-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileLogistics.enums;
    const render = MobileLogistics.render;

    MobileLogistics.columns = {
        ScmCarrier: [
            ...col.id('carrierId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('carrierType', 'Type', enums.CARRIER_TYPE_VALUES, render.carrierType),
            ...col.col('contactInfo', 'Contact'),
            ...col.boolean('isActive', 'Active')
        ],

        ScmFreightRate: [
            ...col.id('rateId'),
            ...col.col('carrierId', 'Carrier'),
            ...col.col('origin', 'Origin'),
            ...col.col('destination', 'Destination'),
            ...col.money('ratePerUnit', 'Rate/Unit'),
            ...col.date('effectiveDate', 'Effective')
        ],

        ScmShipment: [
            ...col.id('shipmentId'),
            ...col.col('shipmentNumber', 'Shipment #'),
            ...col.col('carrierId', 'Carrier'),
            ...col.date('shipDate', 'Ship Date'),
            ...col.status('status', 'Status', enums.SHIPMENT_STATUS_VALUES, render.shipmentStatus),
            ...col.money('freightCost', 'Cost')
        ],

        ScmRoute: [
            ...col.id('routeId'),
            ...col.col('name', 'Route'),
            ...col.col('origin', 'Origin'),
            ...col.col('destination', 'Destination'),
            ...col.col('distance', 'Distance'),
            ...col.col('estimatedTime', 'Est. Time')
        ],

        ScmLoadPlan: [
            ...col.id('loadPlanId'),
            ...col.date('plannedDate', 'Planned'),
            ...col.col('shipmentId', 'Shipment'),
            ...col.col('vehicleId', 'Vehicle'),
            ...col.col('totalWeight', 'Weight'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ],

        ScmReturnAuthorization: [
            ...col.id('rmaId'),
            ...col.col('rmaNumber', 'RMA #'),
            ...col.col('customerId', 'Customer'),
            ...col.date('returnDate', 'Return Date'),
            ...col.col('reason', 'Reason'),
            ...col.status('status', 'Status', enums.TASK_STATUS_VALUES, render.taskStatus)
        ]
    };

    MobileLogistics.primaryKeys = {
        ScmCarrier: 'carrierId', ScmFreightRate: 'rateId', ScmShipment: 'shipmentId',
        ScmRoute: 'routeId', ScmLoadPlan: 'loadPlanId', ScmReturnAuthorization: 'rmaId'
    };

})();
