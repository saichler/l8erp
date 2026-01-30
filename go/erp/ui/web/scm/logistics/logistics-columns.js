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

    const { renderBoolean, renderDate, renderMoney } = ERPRenderers;
    const render = Logistics.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    Logistics.columns = {
        Carrier: [
            { key: 'carrierId', label: 'ID', sortKey: 'carrierId', filterKey: 'carrierId' },
            { key: 'carrierCode', label: 'Code', sortKey: 'carrierCode', filterKey: 'carrierCode' },
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

        FreightRate: [
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

        Shipment: [
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
                key: 'totalCost',
                label: 'Cost',
                sortKey: 'totalCost',
                render: (item) => renderMoney(item.totalCost)
            }
        ],

        Route: [
            { key: 'routeId', label: 'ID', sortKey: 'routeId', filterKey: 'routeId' },
            { key: 'routeName', label: 'Route', sortKey: 'routeName', filterKey: 'routeName' },
            { key: 'origin', label: 'Origin', sortKey: 'origin', filterKey: 'origin' },
            { key: 'destination', label: 'Destination', sortKey: 'destination', filterKey: 'destination' },
            { key: 'distance', label: 'Distance', sortKey: 'distance' },
            { key: 'estimatedTime', label: 'Est. Time', sortKey: 'estimatedTime' }
        ],

        LoadPlan: [
            { key: 'loadPlanId', label: 'ID', sortKey: 'loadPlanId', filterKey: 'loadPlanId' },
            { key: 'planName', label: 'Plan', sortKey: 'planName', filterKey: 'planName' },
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

        DeliveryProof: [
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
                key: 'isComplete',
                label: 'Complete',
                sortKey: 'isComplete',
                render: (item) => renderBoolean(item.isComplete)
            }
        ],

        FreightAudit: [
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
                key: 'auditedAmount',
                label: 'Audited',
                sortKey: 'auditedAmount',
                render: (item) => renderMoney(item.auditedAmount)
            },
            {
                key: 'variance',
                label: 'Variance',
                sortKey: 'variance',
                render: (item) => renderMoney(item.variance)
            }
        ],

        ReturnAuthorization: [
            { key: 'rmaId', label: 'ID', sortKey: 'rmaId', filterKey: 'rmaId' },
            { key: 'rmaNumber', label: 'RMA #', sortKey: 'rmaNumber', filterKey: 'rmaNumber' },
            { key: 'customerId', label: 'Customer', sortKey: 'customerId', filterKey: 'customerId' },
            {
                key: 'requestDate',
                label: 'Requested',
                sortKey: 'requestDate',
                render: (item) => renderDate(item.requestDate)
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
