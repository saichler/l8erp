/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Logistics Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.Logistics = window.Logistics || {};

    const f = window.Layer8FormFactory;
    const enums = Logistics.enums;

    Logistics.forms = {
        ScmCarrier: f.form('Carrier', [
            f.section('Carrier Information', [
                ...f.text('code', 'Carrier Code', true),
                ...f.text('name', 'Name', true),
                ...f.select('carrierType', 'Carrier Type', enums.CARRIER_TYPE, true),
                ...f.contact('contactInfo'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('rating', 'Rating'),
                ...f.text('notes', 'Notes'),
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
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('minWeight', 'Min Weight'),
                ...f.number('maxWeight', 'Max Weight'),
                ...f.text('notes', 'Notes'),
            ])
        ]),

        ScmShipment: f.form('Shipment', [
            f.section('Shipment Details', [
                ...f.text('shipmentNumber', 'Shipment Number', true),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
                ...f.reference('originWarehouseId', 'Origin Warehouse', 'ScmWarehouse'),
                ...f.address('destinationAddress'),
                ...f.date('shipDate', 'Ship Date', true),
                ...f.date('expectedDelivery', 'Expected Delivery'),
                ...f.select('status', 'Status', enums.SHIPMENT_STATUS),
                ...f.money('freightCost', 'Freight Cost'),
                ...f.text('customerId', 'Customer'),
                ...f.number('actualDelivery', 'Actual Delivery'),
                ...f.text('trackingNumber', 'Tracking Number'),
                ...f.number('totalWeight', 'Total Weight'),
            ]),
            f.section('Delivery Proofs', [
                ...f.inlineTable('deliveryProofs', 'Delivery Proofs', [
                    { key: 'proofId', label: 'Proof ID', hidden: true },
                    { key: 'deliveryDate', label: 'Delivery Date', type: 'date', required: true },
                    { key: 'receivedBy', label: 'Received By', type: 'text', required: true },
                    { key: 'signature', label: 'Signature', type: 'text' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ]),
            f.section('Freight Audits', [
                ...f.inlineTable('freightAudits', 'Freight Audits', [
                    { key: 'auditId', label: 'Audit ID', hidden: true },
                    { key: 'carrierId', label: 'Carrier', type: 'reference', lookupModel: 'ScmCarrier' },
                    { key: 'invoicedAmount', label: 'Invoiced', type: 'money' },
                    { key: 'actualAmount', label: 'Actual', type: 'money' },
                    { key: 'variance', label: 'Variance', type: 'money' },
                    { key: 'status', label: 'Status', type: 'text' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ])
        ]),

        ScmRoute: f.form('Route', [
            f.section('Route Details', [
                ...f.text('name', 'Route Name', true),
                ...f.text('origin', 'Origin', true),
                ...f.text('destination', 'Destination', true),
                ...f.number('distance', 'Distance'),
                ...f.text('estimatedTime', 'Estimated Time'),
                ...f.textarea('description', 'Description'),
                ...f.text('carrierId', 'Carrier'),
                ...f.checkbox('isActive', 'Active'),
                ...f.text('notes', 'Notes'),
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
                ...f.textarea('notes', 'Notes'),
                ...f.number('maxWeight', 'Max Weight'),
                ...f.number('maxVolume', 'Max Volume'),
            ])
        ]),

        ScmReturnAuthorization: f.form('Return Authorization', [
            f.section('RMA Details', [
                ...f.text('rmaNumber', 'RMA Number', true),
                ...f.reference('customerId', 'Customer', 'Customer'),
                ...f.date('returnDate', 'Return Date', true),
                ...f.textarea('reason', 'Reason', true),
                ...f.select('status', 'Status', enums.TASK_STATUS),
                ...f.textarea('notes', 'Notes'),
                ...f.text('originalShipmentId', 'Original Shipment'),
                ...f.text('itemsDescription', 'Items Description'),
                ...f.money('refundAmount', 'Refund Amount'),
            ])
        ])
    };

    Logistics.primaryKeys = {
        ScmCarrier: 'carrierId',
        ScmFreightRate: 'rateId',
        ScmShipment: 'shipmentId',
        ScmRoute: 'routeId',
        ScmLoadPlan: 'loadPlanId',
        ScmReturnAuthorization: 'rmaId'
    };

})();
