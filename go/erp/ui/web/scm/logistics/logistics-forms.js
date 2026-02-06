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
                ...f.text('contactInfo', 'Contact Info'),
                ...f.text('website', 'Website'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        ScmFreightRate: f.form('Freight Rate', [
            f.section('Rate Details', [
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
                ...f.text('origin', 'Origin', true),
                ...f.text('destination', 'Destination', true),
                ...f.money('ratePerUnit', 'Rate per Unit', true),
                ...f.text('unitOfMeasure', 'Unit of Measure'),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expirationDate', 'Expiration Date')
            ])
        ]),

        ScmShipment: f.form('Shipment', [
            f.section('Shipment Details', [
                ...f.text('shipmentNumber', 'Shipment Number', true),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier', true),
                ...f.text('origin', 'Origin'),
                ...f.text('destination', 'Destination'),
                ...f.date('shipDate', 'Ship Date', true),
                ...f.date('expectedDelivery', 'Expected Delivery'),
                ...f.select('status', 'Status', enums.SHIPMENT_STATUS),
                ...f.money('freightCost', 'Freight Cost')
            ])
        ]),

        ScmRoute: f.form('Route', [
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
                ...f.text('signatureRef', 'Signature Reference'),
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

    Logistics.primaryKeys = {
        ScmCarrier: 'carrierId',
        ScmFreightRate: 'rateId',
        ScmShipment: 'shipmentId',
        ScmRoute: 'routeId',
        ScmLoadPlan: 'loadPlanId',
        ScmDeliveryProof: 'proofId',
        ScmFreightAudit: 'auditId',
        ScmReturnAuthorization: 'rmaId'
    };

})();
