/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Enums — subset of HCM enums relevant to manager workflows
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};
    var factory = Layer8EnumFactory;

    // Leave request status (with CSS classes)
    var LEAVE_REQUEST_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive'],
        ['Under Review', 'underReview', 'layer8d-status-pending']
    ]);

    // Leave types
    var LEAVE_TYPE = factory.simple([
        'Unspecified', 'Annual', 'Sick', 'Personal', 'Maternity', 'Paternity',
        'Bereavement', 'Jury Duty', 'Military', 'Sabbatical', 'Unpaid', 'Compensatory'
    ]);

    // Timesheet status
    var TIMESHEET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-inactive'],
        ['Locked', 'locked', 'layer8d-status-inactive']
    ]);

    // Goal status
    var GOAL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Active', 'active', 'layer8d-status-active'],
        ['On Track', 'onTrack', 'layer8d-status-active'],
        ['At Risk', 'atRisk', 'layer8d-status-pending'],
        ['Behind', 'behind', 'layer8d-status-inactive'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // Goal priority
    var GOAL_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-draft'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-inactive']
    ]);

    // Performance review status
    var REVIEW_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-draft'],
        ['Self-Assessment', 'selfAssessment', 'layer8d-status-pending'],
        ['Manager Review', 'managerReview', 'layer8d-status-pending'],
        ['Calibration', 'calibration', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Acknowledged', 'acknowledged', 'layer8d-status-active']
    ]);

    // Renderers
    var renderEnum = Layer8DRenderers.renderEnum;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    MGR.enums = {
        LEAVE_TYPE: LEAVE_TYPE.enum,
        LEAVE_REQUEST_STATUS: LEAVE_REQUEST_STATUS.enum,
        LEAVE_REQUEST_STATUS_CLASSES: LEAVE_REQUEST_STATUS.classes,
        TIMESHEET_STATUS: TIMESHEET_STATUS.enum,
        TIMESHEET_STATUS_CLASSES: TIMESHEET_STATUS.classes,
        GOAL_STATUS: GOAL_STATUS.enum,
        GOAL_STATUS_CLASSES: GOAL_STATUS.classes,
        GOAL_PRIORITY: GOAL_PRIORITY.enum,
        GOAL_PRIORITY_CLASSES: GOAL_PRIORITY.classes,
        REVIEW_STATUS: REVIEW_STATUS.enum,
        REVIEW_STATUS_CLASSES: REVIEW_STATUS.classes
    };

    MGR.render = {
        leaveType: function(v) { return renderEnum(v, LEAVE_TYPE.enum); },
        leaveRequestStatus: createStatusRenderer(LEAVE_REQUEST_STATUS.enum, LEAVE_REQUEST_STATUS.classes),
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        goalStatus: createStatusRenderer(GOAL_STATUS.enum, GOAL_STATUS.classes),
        goalPriority: createStatusRenderer(GOAL_PRIORITY.enum, GOAL_PRIORITY.classes),
        reviewStatus: createStatusRenderer(REVIEW_STATUS.enum, REVIEW_STATUS.classes)
    };
})();
