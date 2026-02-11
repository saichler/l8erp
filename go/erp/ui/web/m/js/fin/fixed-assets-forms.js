/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Fixed Assets Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileFixedAssets = window.MobileFixedAssets || {};

    const f = window.Layer8FormFactory;
    const enums = MobileFixedAssets.enums;

    MobileFixedAssets.forms = {
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
                ...f.inlineTable('depreciationSchedules', 'Depreciation Schedules', [
                    { key: 'scheduleId', label: 'Schedule ID', hidden: true },
                    { key: 'depreciationDate', label: 'Date', type: 'date' },
                    { key: 'depreciationAmount', label: 'Depreciation', type: 'money' },
                    { key: 'accumulatedAmount', label: 'Accumulated', type: 'money' },
                    { key: 'remainingValue', label: 'Remaining', type: 'money' }
                ])
            ]),
            f.section('Disposals', [
                ...f.inlineTable('disposals', 'Asset Disposals', [
                    { key: 'disposalId', label: 'Disposal ID', hidden: true },
                    { key: 'disposalDate', label: 'Date', type: 'date' },
                    { key: 'disposalMethod', label: 'Method', type: 'select', options: enums.DISPOSAL_METHOD },
                    { key: 'disposalProceeds', label: 'Proceeds', type: 'money' },
                    { key: 'gainLoss', label: 'Gain/Loss', type: 'money' }
                ])
            ]),
            f.section('Transfers', [
                ...f.inlineTable('transfers', 'Asset Transfers', [
                    { key: 'transferId', label: 'Transfer ID', hidden: true },
                    { key: 'fromDepartmentId', label: 'From Dept', type: 'text' },
                    { key: 'toDepartmentId', label: 'To Dept', type: 'text' },
                    { key: 'transferDate', label: 'Date', type: 'date' },
                    { key: 'reason', label: 'Reason', type: 'text' }
                ])
            ]),
            f.section('Maintenance', [
                ...f.inlineTable('maintenance', 'Asset Maintenance', [
                    { key: 'maintenanceId', label: 'Maintenance ID', hidden: true },
                    { key: 'maintenanceType', label: 'Type', type: 'select', options: enums.MAINTENANCE_TYPE },
                    { key: 'scheduledDate', label: 'Scheduled', type: 'date' },
                    { key: 'status', label: 'Status', type: 'select', options: enums.MAINTENANCE_STATUS },
                    { key: 'cost', label: 'Cost', type: 'money' }
                ])
            ]),
            f.section('Revaluations', [
                ...f.inlineTable('revaluations', 'Asset Revaluations', [
                    { key: 'revaluationId', label: 'Revaluation ID', hidden: true },
                    { key: 'revaluationDate', label: 'Date', type: 'date' },
                    { key: 'previousValue', label: 'Previous Value', type: 'money' },
                    { key: 'newValue', label: 'New Value', type: 'money' },
                    { key: 'adjustmentAmount', label: 'Adjustment', type: 'money' }
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

})();
