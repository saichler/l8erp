/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Sales Shipping Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.SalesShipping = window.SalesShipping || {};

    const f = window.Layer8FormFactory;
    const enums = SalesShipping.enums;

    SalesShipping.forms = {
        SalesDeliveryOrder: f.form('Delivery Order', [
            f.section('Delivery Details', [
                ...f.text('deliveryNumber', 'Delivery #', true),
                ...f.reference('salesOrderId', 'Sales Order', 'SalesOrder', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('plannedShipDate', 'Planned Date', true),
                ...f.select('status', 'Status', enums.DELIVERY_STATUS),
                ...f.reference('carrierId', 'Carrier', 'ScmCarrier'),
                ...f.text('shippingMethod', 'Shipping Method'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesDeliveryLine: f.form('Delivery Line', [
            f.section('Line Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder', true),
                ...f.reference('salesOrderLineId', 'Order Line', 'SalesOrderLine'),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.number('quantity', 'Quantity', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.text('lotNumber', 'Lot #'),
                ...f.text('serialNumber', 'Serial #')
            ])
        ]),

        SalesPickRelease: f.form('Pick Release', [
            f.section('Release Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder', true),
                ...f.reference('warehouseId', 'Warehouse', 'ScmWarehouse', true),
                ...f.date('releaseDate', 'Release Date', true),
                ...f.select('status', 'Status', enums.PICK_STATUS),
                ...f.number('priority', 'Priority'),
                ...f.reference('assignedTo', 'Assigned To', 'Employee'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesPackingSlip: f.form('Packing Slip', [
            f.section('Slip Details', [
                ...f.text('slipNumber', 'Slip #', true),
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder', true),
                ...f.date('packDate', 'Pack Date', true),
                ...f.reference('packedBy', 'Packed By', 'Employee'),
                ...f.number('totalPackages', 'Total Packages'),
                ...f.number('totalWeight', 'Total Weight'),
                ...f.text('weightUnit', 'Weight Unit'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesShippingDoc: f.form('Shipping Document', [
            f.section('Document Details', [
                ...f.text('docNumber', 'Document #', true),
                ...f.text('docType', 'Document Type', true),
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder', true),
                ...f.date('issueDate', 'Issue Date'),
                ...f.text('issuedBy', 'Issued By'),
                ...f.text('filePath', 'File Path'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        SalesDeliveryConfirm: f.form('Delivery Confirmation', [
            f.section('Confirmation Details', [
                ...f.reference('deliveryOrderId', 'Delivery Order', 'SalesDeliveryOrder', true),
                ...f.date('confirmDate', 'Confirm Date', true),
                ...f.text('receivedBy', 'Received By'),
                ...f.text('signaturePath', 'Signature Path'),
                ...f.checkbox('isDamaged', 'Damaged'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    SalesShipping.primaryKeys = {
        SalesDeliveryOrder: 'deliveryOrderId',
        SalesDeliveryLine: 'lineId',
        SalesPickRelease: 'pickReleaseId',
        SalesPackingSlip: 'packingSlipId',
        SalesShippingDoc: 'docId',
        SalesDeliveryConfirm: 'confirmId'
    };

})();
