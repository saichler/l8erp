/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Costing Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgCosting = window.MfgCosting || {};

    const f = window.Layer8FormFactory;
    const enums = MfgCosting.enums;

    MfgCosting.forms = {
        MfgStandardCost: f.form('Standard Cost', [
            f.section('Cost Details', [
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.money('materialCost', 'Material Cost'),
                ...f.money('laborCost', 'Labor Cost'),
                ...f.money('overheadCost', 'Overhead Cost'),
                ...f.money('outsideProcessingCost', 'Outside Processing Cost'),
                ...f.money('totalCost', 'Total Cost'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgCostRollup: f.form('Cost Rollup', [
            f.section('Rollup Details', [
                ...f.text('rollupNumber', 'Rollup Number', true),
                ...f.textarea('description', 'Description'),
                ...f.date('runDate', 'Run Date'),
                ...f.select('status', 'Status', enums.ROLLUP_STATUS),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgActualCost: f.form('Actual Cost', [
            f.section('Cost Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.text('costType', 'Cost Type'),
                ...f.text('costElement', 'Cost Element'),
                ...f.money('amount', 'Amount', true),
                ...f.number('quantity', 'Quantity'),
                ...f.date('transactionDate', 'Transaction Date'),
                ...f.text('sourceType', 'Source Type'),
                ...f.text('sourceId', 'Source ID'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgCostVariance: f.form('Cost Variance', [
            f.section('Variance Details', [
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder', true),
                ...f.select('varianceType', 'Variance Type', enums.VARIANCE_TYPE),
                ...f.text('costType', 'Cost Type'),
                ...f.money('standardCost', 'Standard Cost'),
                ...f.money('actualCost', 'Actual Cost'),
                ...f.money('varianceAmount', 'Variance Amount'),
                ...f.number('variancePercent', 'Variance %'),
                ...f.date('analysisDate', 'Analysis Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgOverhead: f.form('Overhead', [
            f.section('Overhead Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('allocationMethod', 'Allocation Method', enums.ALLOCATION_METHOD),
                ...f.number('rate', 'Rate'),
                ...f.text('costCenter', 'Cost Center'),
                ...f.checkbox('isActive', 'Active'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MfgOverheadAlloc: f.form('Overhead Allocation', [
            f.section('Allocation Details', [
                ...f.reference('overheadId', 'Overhead', 'MfgOverhead', true),
                ...f.reference('workOrderId', 'Work Order', 'MfgWorkOrder'),
                ...f.reference('workCenterId', 'Work Center', 'MfgWorkCenter'),
                ...f.date('allocationDate', 'Allocation Date', true),
                ...f.number('allocationBase', 'Allocation Base'),
                ...f.money('allocatedAmount', 'Allocated Amount', true),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    MfgCosting.primaryKeys = {
        MfgStandardCost: 'costId',
        MfgCostRollup: 'rollupId',
        MfgActualCost: 'actualCostId',
        MfgCostVariance: 'varianceId',
        MfgOverhead: 'overheadId',
        MfgOverheadAlloc: 'allocationId'
    };

})();
