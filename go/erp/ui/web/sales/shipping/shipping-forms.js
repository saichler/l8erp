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
// Sales Shipping Module - Form Definitions
// Form field configurations for all Sales Shipping models

(function() {
    'use strict';

    window.SalesShipping = window.SalesShipping || {};

    const enums = SalesShipping.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesShipping.forms = {
        SalesDeliveryOrder: {
            title: 'Delivery Order',
            sections: [
                {
                    title: 'Delivery Details',
                    fields: [
                        { key: 'deliveryNumber', label: 'Delivery #', type: 'text', required: true },
                        { key: 'salesOrderId', label: 'Sales Order', type: 'reference', lookupModel: 'SalesOrder', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'plannedDate', label: 'Planned Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.DELIVERY_STATUS },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                        { key: 'shippingMethod', label: 'Shipping Method', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesDeliveryLine: {
            title: 'Delivery Line',
            sections: [
                {
                    title: 'Line Details',
                    fields: [
                        { key: 'deliveryOrderId', label: 'Delivery Order', type: 'reference', lookupModel: 'SalesDeliveryOrder', required: true },
                        { key: 'salesOrderLineId', label: 'Order Line', type: 'reference', lookupModel: 'SalesOrderLine' },
                        { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'pickedQty', label: 'Picked Qty', type: 'number' },
                        { key: 'shippedQty', label: 'Shipped Qty', type: 'number' },
                        { key: 'lotNumber', label: 'Lot #', type: 'text' },
                        { key: 'serialNumber', label: 'Serial #', type: 'text' }
                    ]
                }
            ]
        },

        SalesPickRelease: {
            title: 'Pick Release',
            sections: [
                {
                    title: 'Release Details',
                    fields: [
                        { key: 'deliveryOrderId', label: 'Delivery Order', type: 'reference', lookupModel: 'SalesDeliveryOrder', required: true },
                        { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse', required: true },
                        { key: 'releaseDate', label: 'Release Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PICK_STATUS },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesPackingSlip: {
            title: 'Packing Slip',
            sections: [
                {
                    title: 'Slip Details',
                    fields: [
                        { key: 'slipNumber', label: 'Slip #', type: 'text', required: true },
                        { key: 'deliveryOrderId', label: 'Delivery Order', type: 'reference', lookupModel: 'SalesDeliveryOrder', required: true },
                        { key: 'packDate', label: 'Pack Date', type: 'date', required: true },
                        { key: 'packedBy', label: 'Packed By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'totalPackages', label: 'Total Packages', type: 'number' },
                        { key: 'totalWeight', label: 'Total Weight', type: 'number' },
                        { key: 'weightUnit', label: 'Weight Unit', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesShippingDoc: {
            title: 'Shipping Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'docNumber', label: 'Document #', type: 'text', required: true },
                        { key: 'docType', label: 'Document Type', type: 'text', required: true },
                        { key: 'deliveryOrderId', label: 'Delivery Order', type: 'reference', lookupModel: 'SalesDeliveryOrder', required: true },
                        { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                        { key: 'trackingNumber', label: 'Tracking Number', type: 'text' },
                        { key: 'shipDate', label: 'Ship Date', type: 'date' },
                        { key: 'estimatedArrival', label: 'Est. Arrival', type: 'date' },
                        { key: 'freightCost', label: 'Freight Cost', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesDeliveryConfirm: {
            title: 'Delivery Confirmation',
            sections: [
                {
                    title: 'Confirmation Details',
                    fields: [
                        { key: 'deliveryOrderId', label: 'Delivery Order', type: 'reference', lookupModel: 'SalesDeliveryOrder', required: true },
                        { key: 'confirmDate', label: 'Confirm Date', type: 'date', required: true },
                        { key: 'receivedBy', label: 'Received By', type: 'text' },
                        { key: 'signatureOnFile', label: 'Signature On File', type: 'checkbox' },
                        { key: 'condition', label: 'Condition', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesShipping.primaryKeys = {
        SalesDeliveryOrder: 'deliveryOrderId',
        SalesDeliveryLine: 'lineId',
        SalesPickRelease: 'pickReleaseId',
        SalesPackingSlip: 'packingSlipId',
        SalesShippingDoc: 'docId',
        SalesDeliveryConfirm: 'confirmId'
    };

})();
