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

    // Ensure Logistics namespace exists
    window.Logistics = window.Logistics || {};

    const { renderBoolean, renderDate, renderMoney } = Layer8DRenderers;
    const render = Logistics.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Logistics.columns = {
        ScmCarrier: [
            { key: 'carrierId', label: 'ID', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'carrierType',
                label: 'Type',
                sortKey: 'carrierType',
                render: (item) => render.carrierType(item.carrierType)
            },
            { key: 'contactInfo', label: 'Contact', sortKey: 'contactInfo', filterKey: 'contactInfo' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        ScmFreightRate: [
            { key: 'rateId', label: 'ID', sortKey: 'rateId', filterKey: 'rateId' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'origin', label: 'Origin', sortKey: 'origin', filterKey: 'origin' },
            { key: 'destination', label: 'Destination', sortKey: 'destination', filterKey: 'destination' },
            {
                key: 'ratePerUnit',
                label: 'Rate/Unit',
                sortKey: 'ratePerUnit',
                render: (item) => renderMoney(item.ratePerUnit)
            },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            }
        ],

        ScmShipment: [
            { key: 'shipmentId', label: 'ID', sortKey: 'shipmentId', filterKey: 'shipmentId' },
            { key: 'shipmentNumber', label: 'Shipment #', sortKey: 'shipmentNumber', filterKey: 'shipmentNumber' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            {
                key: 'shipDate',
                label: 'Ship Date',
                sortKey: 'shipDate',
                render: (item) => renderDate(item.shipDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.shipmentStatus(item.status)
            },
            {
                key: 'freightCost',
                label: 'Cost',
                sortKey: 'freightCost',
                render: (item) => renderMoney(item.freightCost)
            }
        ],

        ScmRoute: [
            { key: 'routeId', label: 'ID', sortKey: 'routeId', filterKey: 'routeId' },
            { key: 'name', label: 'Route', sortKey: 'name', filterKey: 'name' },
            { key: 'origin', label: 'Origin', sortKey: 'origin', filterKey: 'origin' },
            { key: 'destination', label: 'Destination', sortKey: 'destination', filterKey: 'destination' },
            { key: 'distance', label: 'Distance', sortKey: 'distance' },
            { key: 'estimatedTime', label: 'Est. Time', sortKey: 'estimatedTime' }
        ],

        ScmLoadPlan: [
            { key: 'loadPlanId', label: 'ID', sortKey: 'loadPlanId', filterKey: 'loadPlanId' },
            {
                key: 'plannedDate',
                label: 'Planned',
                sortKey: 'plannedDate',
                render: (item) => renderDate(item.plannedDate)
            },
            { key: 'shipmentId', label: 'Shipment', sortKey: 'shipmentId', filterKey: 'shipmentId' },
            { key: 'vehicleId', label: 'Vehicle', sortKey: 'vehicleId', filterKey: 'vehicleId' },
            { key: 'totalWeight', label: 'Weight', sortKey: 'totalWeight' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmDeliveryProof: [
            { key: 'proofId', label: 'ID', sortKey: 'proofId', filterKey: 'proofId' },
            { key: 'shipmentId', label: 'Shipment', sortKey: 'shipmentId', filterKey: 'shipmentId' },
            {
                key: 'deliveryDate',
                label: 'Delivered',
                sortKey: 'deliveryDate',
                render: (item) => renderDate(item.deliveryDate)
            },
            { key: 'receivedBy', label: 'Received By', sortKey: 'receivedBy', filterKey: 'receivedBy' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ],

        ScmFreightAudit: [
            { key: 'auditId', label: 'ID', sortKey: 'auditId', filterKey: 'auditId' },
            { key: 'shipmentId', label: 'Shipment', sortKey: 'shipmentId', filterKey: 'shipmentId' },
            { key: 'carrierId', label: 'Carrier', sortKey: 'carrierId', filterKey: 'carrierId' },
            {
                key: 'invoicedAmount',
                label: 'Invoiced',
                sortKey: 'invoicedAmount',
                render: (item) => renderMoney(item.invoicedAmount)
            },
            {
                key: 'actualAmount',
                label: 'Actual',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'variance',
                label: 'Variance',
                sortKey: 'variance',
                render: (item) => renderMoney(item.variance)
            }
        ],

        ScmReturnAuthorization: [
            { key: 'rmaId', label: 'ID', sortKey: 'rmaId', filterKey: 'rmaId' },
            { key: 'rmaNumber', label: 'RMA #', sortKey: 'rmaNumber', filterKey: 'rmaNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'returnDate',
                label: 'Return Date',
                sortKey: 'returnDate',
                render: (item) => renderDate(item.returnDate)
            },
            { key: 'reason', label: 'Reason', sortKey: 'reason', filterKey: 'reason' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taskStatus(item.status)
            }
        ]
    };

})();
