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
                ...f.textarea('notes', 'Notes'),
                ...f.date('actualShipDate', 'Actual Ship Date'),
                ...f.date('plannedDeliveryDate', 'Planned Delivery Date'),
                ...f.date('actualDeliveryDate', 'Actual Delivery Date'),
                ...f.address('shipToAddress'),
                ...f.text('trackingNumber', 'Tracking Number'),
                ...f.money('shippingCost', 'Shipping Cost'),
            ]),
            f.section('Delivery Lines', [
                ...f.inlineTable('lines', 'Delivery Lines', [
                    { key: 'lineId', label: 'Line ID', hidden: true },
                    { key: 'salesOrderLineId', label: 'Order Line', type: 'text' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'quantity', label: 'Qty', type: 'number', required: true },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'lotNumber', label: 'Lot #', type: 'text' },
                    { key: 'serialNumber', label: 'Serial #', type: 'text' }
                ])
            ]),
            f.section('Pick Releases', [
                ...f.inlineTable('pickReleases', 'Pick Releases', [
                    { key: 'pickReleaseId', label: 'ID', hidden: true },
                    { key: 'warehouseId', label: 'Warehouse', type: 'reference', lookupModel: 'ScmWarehouse' },
                    { key: 'releaseDate', label: 'Released', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.PICK_STATUS },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ]),
            f.section('Packing Slips', [
                ...f.inlineTable('packingSlips', 'Packing Slips', [
                    { key: 'packingSlipId', label: 'ID', hidden: true },
                    { key: 'slipNumber', label: 'Slip #', type: 'text' },
                    { key: 'packDate', label: 'Pack Date', type: 'date' },
                    { key: 'totalPackages', label: 'Packages', type: 'number' },
                    { key: 'totalWeight', label: 'Weight', type: 'number' }
                ])
            ]),
            f.section('Shipping Documents', [
                ...f.inlineTable('shippingDocs', 'Shipping Documents', [
                    { key: 'docId', label: 'ID', hidden: true },
                    { key: 'docNumber', label: 'Doc #', type: 'text' },
                    { key: 'docType', label: 'Type', type: 'text' },
                    { key: 'issueDate', label: 'Issue Date', type: 'date' },
                    { key: 'issuedBy', label: 'Issued By', type: 'text' }
                ])
            ]),
            f.section('Confirmations', [
                ...f.inlineTable('confirms', 'Delivery Confirmations', [
                    { key: 'confirmId', label: 'ID', hidden: true },
                    { key: 'confirmDate', label: 'Confirm Date', type: 'date' },
                    { key: 'receivedBy', label: 'Received By', type: 'text' },
                    { key: 'isDamaged', label: 'Damaged', type: 'checkbox' },
                    { key: 'notes', label: 'Notes', type: 'text' }
                ])
            ])
        ])
    };

    SalesShipping.primaryKeys = {
        SalesDeliveryOrder: 'deliveryOrderId'
    };

})();
