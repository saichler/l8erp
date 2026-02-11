/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Manufacturing Engineering Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MfgEngineering = window.MfgEngineering || {};

    const f = window.Layer8FormFactory;
    const enums = MfgEngineering.enums;

    MfgEngineering.forms = {
        MfgBom: f.form('Bill of Materials', [
            f.section('BOM Details', [
                ...f.text('bomNumber', 'BOM Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.select('bomType', 'BOM Type', enums.BOM_TYPE),
                ...f.select('status', 'Status', enums.BOM_STATUS),
                ...f.text('revision', 'Revision'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('baseQuantity', 'Base Quantity'),
                ...f.text('unitOfMeasure', 'UOM'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('BOM Lines', [
                ...f.inlineTable('lines', 'BOM Lines', [
                    { key: 'lineId', label: 'ID', hidden: true },
                    { key: 'lineNumber', label: 'Line #', type: 'number' },
                    { key: 'componentItemId', label: 'Component', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'quantityPer', label: 'Qty Per', type: 'number' },
                    { key: 'unitOfMeasure', label: 'UOM', type: 'text' },
                    { key: 'scrapPercent', label: 'Scrap %', type: 'number' },
                    { key: 'isCritical', label: 'Critical', type: 'checkbox' }
                ])
            ])
        ]),

        MfgRouting: f.form('Routing', [
            f.section('Routing Details', [
                ...f.text('routingNumber', 'Routing Number', true),
                ...f.reference('itemId', 'Item', 'ScmItem', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.ROUTING_STATUS),
                ...f.text('revision', 'Revision'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Operations', [
                ...f.inlineTable('operations', 'Routing Operations', [
                    { key: 'operationId', label: 'ID', hidden: true },
                    { key: 'operationNumber', label: 'Op #', type: 'number' },
                    { key: 'operationName', label: 'Name', type: 'text' },
                    { key: 'workCenterId', label: 'Work Center', type: 'text' },
                    { key: 'setupTime', label: 'Setup Time', type: 'number' },
                    { key: 'runTime', label: 'Run Time', type: 'number' }
                ])
            ])
        ]),

        MfgEngChangeOrder: f.form('Engineering Change Order', [
            f.section('ECO Details', [
                ...f.text('ecoNumber', 'ECO Number', true),
                ...f.text('title', 'Title', true),
                ...f.textarea('description', 'Description'),
                ...f.select('status', 'Status', enums.ECO_STATUS),
                ...f.reference('requestedBy', 'Requested By', 'Employee'),
                ...f.date('requestDate', 'Request Date'),
                ...f.date('requiredDate', 'Required Date'),
                ...f.number('priority', 'Priority'),
                ...f.textarea('reason', 'Reason'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Change Details', [
                ...f.inlineTable('details', 'ECO Details', [
                    { key: 'detailId', label: 'ID', hidden: true },
                    { key: 'changeType', label: 'Change Type', type: 'text' },
                    { key: 'affectedId', label: 'Affected ID', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'oldValue', label: 'Old Value', type: 'text' },
                    { key: 'newValue', label: 'New Value', type: 'text' }
                ])
            ])
        ])
    };

    MfgEngineering.primaryKeys = {
        MfgBom: 'bomId',
        MfgRouting: 'routingId',
        MfgEngChangeOrder: 'changeOrderId'
    };

})();
