/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Procurement Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.Procurement = window.Procurement || {};

    const f = window.Layer8FormFactory;
    const enums = Procurement.enums;

    Procurement.forms = {
        ScmPurchaseRequisition: f.form('Purchase Requisition', [
            f.section('Requisition Details', [
                ...f.text('requisitionNumber', 'Requisition #', true),
                ...f.reference('requesterId', 'Requester', 'Employee'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.date('requestDate', 'Request Date', true),
                ...f.select('status', 'Status', enums.REQUISITION_STATUS),
                ...f.text('priority', 'Priority'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        ScmRequisitionLine: f.form('Requisition Line', [
            f.section('Line Details', [
                ...f.reference('requisitionId', 'Requisition', 'ScmPurchaseRequisition', true),
                ...f.reference('itemId', 'Item', 'ScmItem'),
                ...f.textarea('description', 'Description'),
                ...f.number('quantity', 'Quantity', true),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.money('estimatedUnitPrice', 'Est. Unit Price'),
                ...f.reference('vendorId', 'Vendor', 'Vendor'),
                ...f.date('deliveryDate', 'Delivery Date')
            ])
        ]),

        ScmRequestForQuotation: f.form('Request for Quotation', [
            f.section('RFQ Details', [
                ...f.text('rfqNumber', 'RFQ #', true),
                ...f.reference('requisitionId', 'Requisition', 'ScmPurchaseRequisition'),
                ...f.date('issueDate', 'Issue Date', true),
                ...f.date('responseDeadline', 'Response Deadline'),
                ...f.select('status', 'Status', enums.REQUISITION_STATUS),
                ...f.textarea('description', 'Description'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmPurchaseOrder: f.form('Purchase Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'PO #', true),
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.date('orderDate', 'Order Date', true),
                ...f.date('expectedDelivery', 'Expected Delivery'),
                ...f.select('status', 'Status', enums.PO_STATUS),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        ScmPurchaseOrderLine: f.form('PO Line', [
            f.section('Line Details', [
                ...f.reference('purchaseOrderId', 'Purchase Order', 'ScmPurchaseOrder', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.number('quantity', 'Quantity', true),
                ...f.money('unitPrice', 'Unit Price', true),
                ...f.text('unitOfMeasure', 'UOM')
            ])
        ]),

        ScmBlanketOrder: f.form('Blanket Order', [
            f.section('Order Details', [
                ...f.text('orderNumber', 'Order #', true),
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.money('maxAmount', 'Max Amount'),
                ...f.select('status', 'Status', enums.PO_STATUS),
                ...f.textarea('description', 'Description')
            ])
        ]),

        ScmSupplierScorecard: f.form('Supplier Scorecard', [
            f.section('Scorecard Details', [
                ...f.reference('vendorId', 'Vendor', 'Vendor', true),
                ...f.number('qualityScore', 'Quality Score'),
                ...f.number('deliveryScore', 'Delivery Score'),
                ...f.number('priceScore', 'Price Score'),
                ...f.number('serviceScore', 'Service Score'),
                ...f.number('overallScore', 'Overall Score'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    Procurement.primaryKeys = {
        ScmPurchaseRequisition: 'requisitionId',
        ScmRequisitionLine: 'lineId',
        ScmRequestForQuotation: 'rfqId',
        ScmPurchaseOrder: 'purchaseOrderId',
        ScmPurchaseOrderLine: 'lineId',
        ScmBlanketOrder: 'blanketOrderId',
        ScmSupplierScorecard: 'scorecardId'
    };

})();
