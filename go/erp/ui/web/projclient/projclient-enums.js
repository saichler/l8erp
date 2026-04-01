/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — enum definitions
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};
    var factory = Layer8EnumFactory;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;
    var renderEnum = Layer8DRenderers.renderEnum;

    // PrjProjectStatus (0-6)
    var PROJECT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Planned', 'planned', 'layer8d-status-info'],
        ['In Progress', 'inProgress', 'layer8d-status-active'],
        ['On Hold', 'onHold', 'layer8d-status-warning'],
        ['Completed', 'completed', 'layer8d-status-complete'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // PrjProjectType (0-6)
    var PROJECT_TYPE = factory.simple([
        'Unspecified', 'Internal', 'Client', 'Fixed Price',
        'Time & Materials', 'Retainer', 'Capital'
    ]);

    // PrjProjectPriority (0-4)
    var PROJECT_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-info'],
        ['Medium', 'medium', 'layer8d-status-active'],
        ['High', 'high', 'layer8d-status-warning'],
        ['Critical', 'critical', 'layer8d-status-error']
    ]);

    // PrjHealthIndicator (0-3)
    var HEALTH_INDICATOR = factory.create([
        ['Unspecified', null, ''],
        ['Green', 'green', 'layer8d-status-success'],
        ['Yellow', 'yellow', 'layer8d-status-warning'],
        ['Red', 'red', 'layer8d-status-error']
    ]);

    // PrjInvoiceStatus (0-6)
    var INVOICE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Sent', 'sent', 'layer8d-status-active'],
        ['Paid', 'paid', 'layer8d-status-success'],
        ['Overdue', 'overdue', 'layer8d-status-error'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // PrjBillingType (0-5)
    var BILLING_TYPE = factory.simple([
        'Unspecified', 'Time & Materials', 'Fixed Price',
        'Milestone', 'Retainer', 'Not Billable'
    ]);

    // PrjTimesheetStatus (0-4)
    var TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Submitted', 'submitted', 'layer8d-status-active'],
        ['Approved', 'approved', 'layer8d-status-success'],
        ['Rejected', 'rejected', 'layer8d-status-error']
    ]);

    // PrjExpenseStatus (0-5)
    var EXPENSE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Submitted', 'submitted', 'layer8d-status-active'],
        ['Approved', 'approved', 'layer8d-status-success'],
        ['Rejected', 'rejected', 'layer8d-status-error'],
        ['Paid', 'paid', 'layer8d-status-complete']
    ]);

    // Export enums
    PRJC.enums = {
        PROJECT_STATUS: PROJECT_STATUS.enum,
        PROJECT_STATUS_CLASSES: PROJECT_STATUS.classes,
        PROJECT_TYPE: PROJECT_TYPE.enum,
        PROJECT_PRIORITY: PROJECT_PRIORITY.enum,
        PROJECT_PRIORITY_CLASSES: PROJECT_PRIORITY.classes,
        HEALTH_INDICATOR: HEALTH_INDICATOR.enum,
        HEALTH_INDICATOR_CLASSES: HEALTH_INDICATOR.classes,
        INVOICE_STATUS: INVOICE_STATUS.enum,
        INVOICE_STATUS_CLASSES: INVOICE_STATUS.classes,
        BILLING_TYPE: BILLING_TYPE.enum,
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_CLASSES: TIMESHEET_STATUS.classes,
        EXPENSE_STATUS: EXPENSE_STATUS.enum,
        EXPENSE_STATUS_CLASSES: EXPENSE_STATUS.classes
    };

    // Export renderers
    PRJC.render = {
        projectStatus: createStatusRenderer(PROJECT_STATUS.enum, PROJECT_STATUS.classes),
        projectType: function(v) { return renderEnum(v, PROJECT_TYPE.enum); },
        projectPriority: createStatusRenderer(PROJECT_PRIORITY.enum, PROJECT_PRIORITY.classes),
        healthIndicator: createStatusRenderer(HEALTH_INDICATOR.enum, HEALTH_INDICATOR.classes),
        invoiceStatus: createStatusRenderer(INVOICE_STATUS.enum, INVOICE_STATUS.classes),
        billingType: function(v) { return renderEnum(v, BILLING_TYPE.enum); },
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        expenseStatus: createStatusRenderer(EXPENSE_STATUS.enum, EXPENSE_STATUS.classes)
    };
})();
