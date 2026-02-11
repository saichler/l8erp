/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Fixed Assets Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.FixedAssets = window.FixedAssets || {};

    const f = window.Layer8FormFactory;
    const enums = FixedAssets.enums;

    FixedAssets.forms = {
        Asset: f.form('Asset', [
            f.section('Asset Information', [
                ...f.text('assetNumber', 'Asset Number', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('categoryId', 'Category', 'AssetCategory', true),
                ...f.select('status', 'Status', enums.ASSET_STATUS),
                ...f.money('acquisitionCost', 'Acquisition Cost', true),
                ...f.date('acquisitionDate', 'Acquisition Date', true),
                ...f.text('location', 'Location'),
                ...f.text('serialNumber', 'Serial Number')
            ]),
            f.section('Depreciation Schedules', [
                ...f.inlineTable('depreciationSchedules', 'Depreciation', [
                    { key: 'scheduleId', label: 'Schedule ID', hidden: true },
                    { key: 'fiscalPeriodId', label: 'Period', type: 'text' },
                    { key: 'depreciationDate', label: 'Date', type: 'date', required: true },
                    { key: 'depreciationAmount', label: 'Depreciation', type: 'money' },
                    { key: 'accumulatedAmount', label: 'Accumulated', type: 'money' },
                    { key: 'remainingValue', label: 'Remaining', type: 'money' },
                    { key: 'isPosted', label: 'Posted', type: 'checkbox' }
                ])
            ]),
            f.section('Disposals', [
                ...f.inlineTable('disposals', 'Asset Disposals', [
                    { key: 'disposalId', label: 'Disposal ID', hidden: true },
                    { key: 'disposalDate', label: 'Date', type: 'date', required: true },
                    { key: 'disposalMethod', label: 'Method', type: 'select', options: enums.DISPOSAL_METHOD },
                    { key: 'disposalProceeds', label: 'Proceeds', type: 'money' },
                    { key: 'netBookValueAtDisposal', label: 'NBV', type: 'money' },
                    { key: 'gainLoss', label: 'Gain/Loss', type: 'money' },
                    { key: 'buyerName', label: 'Buyer', type: 'text' }
                ])
            ]),
            f.section('Transfers', [
                ...f.inlineTable('transfers', 'Asset Transfers', [
                    { key: 'transferId', label: 'Transfer ID', hidden: true },
                    { key: 'transferDate', label: 'Date', type: 'date', required: true },
                    { key: 'fromDepartmentId', label: 'From Dept', type: 'text' },
                    { key: 'toDepartmentId', label: 'To Dept', type: 'text' },
                    { key: 'fromLocation', label: 'From Location', type: 'text' },
                    { key: 'toLocation', label: 'To Location', type: 'text' },
                    { key: 'reason', label: 'Reason', type: 'text' }
                ])
            ]),
            f.section('Maintenance', [
                ...f.inlineTable('maintenance', 'Asset Maintenance', [
                    { key: 'maintenanceId', label: 'Maintenance ID', hidden: true },
                    { key: 'maintenanceType', label: 'Type', type: 'select', options: enums.MAINTENANCE_TYPE },
                    { key: 'status', label: 'Status', type: 'select', options: enums.MAINTENANCE_STATUS },
                    { key: 'scheduledDate', label: 'Scheduled', type: 'date', required: true },
                    { key: 'completedDate', label: 'Completed', type: 'date' },
                    { key: 'cost', label: 'Cost', type: 'money' },
                    { key: 'description', label: 'Description', type: 'text' }
                ])
            ]),
            f.section('Revaluations', [
                ...f.inlineTable('revaluations', 'Asset Revaluations', [
                    { key: 'revaluationId', label: 'Revaluation ID', hidden: true },
                    { key: 'revaluationDate', label: 'Date', type: 'date', required: true },
                    { key: 'previousValue', label: 'Previous', type: 'money' },
                    { key: 'newValue', label: 'New Value', type: 'money', required: true },
                    { key: 'adjustmentAmount', label: 'Adjustment', type: 'money' },
                    { key: 'reason', label: 'Reason', type: 'text' },
                    { key: 'appraiser', label: 'Appraiser', type: 'text' }
                ])
            ])
        ]),

        AssetCategory: f.form('Asset Category', [
            f.section('Category Information', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('defaultDepreciationMethod', 'Depreciation Method', enums.DEPRECIATION_METHOD, true),
                ...f.number('defaultUsefulLifeMonths', 'Useful Life (Months)', true)
            ])
        ])
    };

    FixedAssets.primaryKeys = {
        Asset: 'assetId',
        AssetCategory: 'categoryId'
    };

})();
