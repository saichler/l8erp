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
// Logistics Module - Form Definitions
// Form field configurations for all Logistics models

(function() {
    'use strict';

    // Ensure Logistics namespace exists
    window.Logistics = window.Logistics || {};

    const enums = Logistics.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    Logistics.forms = {
        Carrier: {
            title: 'Carrier',
            sections: [
                {
                    title: 'Carrier Information',
                    fields: [
                        { key: 'carrierCode', label: 'Carrier Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'carrierType', label: 'Carrier Type', type: 'select', options: enums.CARRIER_TYPE, required: true },
                        { key: 'contactInfo', label: 'Contact Info', type: 'text' },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        FreightRate: {
            title: 'Freight Rate',
            sections: [
                {
                    title: 'Rate Details',
                    fields: [
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'Carrier', required: true },
                        { key: 'origin', label: 'Origin', type: 'text', required: true },
                        { key: 'destination', label: 'Destination', type: 'text', required: true },
                        { key: 'ratePerUnit', label: 'Rate per Unit', type: 'currency', required: true },
                        { key: 'unitOfMeasure', label: 'Unit of Measure', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                }
            ]
        },

        Shipment: {
            title: 'Shipment',
            sections: [
                {
                    title: 'Shipment Details',
                    fields: [
                        { key: 'shipmentNumber', label: 'Shipment Number', type: 'text', required: true },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'Carrier', required: true },
                        { key: 'origin', label: 'Origin', type: 'text' },
                        { key: 'destination', label: 'Destination', type: 'text' },
                        { key: 'shipDate', label: 'Ship Date', type: 'date', required: true },
                        { key: 'expectedDelivery', label: 'Expected Delivery', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.SHIPMENT_STATUS },
                        { key: 'totalCost', label: 'Total Cost', type: 'currency' }
                    ]
                }
            ]
        },

        Route: {
            title: 'Route',
            sections: [
                {
                    title: 'Route Details',
                    fields: [
                        { key: 'routeName', label: 'Route Name', type: 'text', required: true },
                        { key: 'origin', label: 'Origin', type: 'text', required: true },
                        { key: 'destination', label: 'Destination', type: 'text', required: true },
                        { key: 'distance', label: 'Distance', type: 'number' },
                        { key: 'estimatedTime', label: 'Estimated Time', type: 'text' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        LoadPlan: {
            title: 'Load Plan',
            sections: [
                {
                    title: 'Plan Details',
                    fields: [
                        { key: 'planName', label: 'Plan Name', type: 'text', required: true },
                        { key: 'shipmentId', label: 'Shipment', type: 'reference', lookupModel: 'Shipment', required: true },
                        { key: 'vehicleId', label: 'Vehicle', type: 'text' },
                        { key: 'totalWeight', label: 'Total Weight', type: 'number' },
                        { key: 'totalVolume', label: 'Total Volume', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        DeliveryProof: {
            title: 'Delivery Proof',
            sections: [
                {
                    title: 'Proof Details',
                    fields: [
                        { key: 'shipmentId', label: 'Shipment', type: 'reference', lookupModel: 'Shipment', required: true },
                        { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
                        { key: 'receivedBy', label: 'Received By', type: 'text', required: true },
                        { key: 'signatureRef', label: 'Signature Reference', type: 'text' },
                        { key: 'isComplete', label: 'Complete', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        FreightAudit: {
            title: 'Freight Audit',
            sections: [
                {
                    title: 'Audit Details',
                    fields: [
                        { key: 'shipmentId', label: 'Shipment', type: 'reference', lookupModel: 'Shipment', required: true },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'Carrier', required: true },
                        { key: 'invoicedAmount', label: 'Invoiced Amount', type: 'currency', required: true },
                        { key: 'auditedAmount', label: 'Audited Amount', type: 'currency' },
                        { key: 'variance', label: 'Variance', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        ReturnAuthorization: {
            title: 'Return Authorization',
            sections: [
                {
                    title: 'RMA Details',
                    fields: [
                        { key: 'rmaNumber', label: 'RMA Number', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer' },
                        { key: 'requestDate', label: 'Request Date', type: 'date', required: true },
                        { key: 'reason', label: 'Reason', type: 'textarea', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TASK_STATUS },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    Logistics.primaryKeys = {
        Carrier: 'carrierId',
        FreightRate: 'rateId',
        Shipment: 'shipmentId',
        Route: 'routeId',
        LoadPlan: 'loadPlanId',
        DeliveryProof: 'proofId',
        FreightAudit: 'auditId',
        ReturnAuthorization: 'rmaId'
    };

})();
