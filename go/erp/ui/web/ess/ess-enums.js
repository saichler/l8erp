/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Enums — subset of HCM enums relevant to employee self-service
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};
    var factory = Layer8EnumFactory;

    // Leave types
    var LEAVE_TYPE = factory.simple([
        'Unspecified', 'Annual', 'Sick', 'Personal', 'Maternity', 'Paternity',
        'Bereavement', 'Jury Duty', 'Military', 'Sabbatical', 'Unpaid', 'Compensatory'
    ]);

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

    // Enrollment status
    var ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Waived', 'waived', 'layer8d-status-draft'],
        ['Terminated', 'terminated', 'layer8d-status-inactive'],
        ['COBRA', 'cobra', 'layer8d-status-pending']
    ]);

    // Coverage level
    var COVERAGE_LEVEL = factory.simple([
        'Unspecified', 'Employee Only', 'Employee + Spouse',
        'Employee + Children', 'Family', 'Employee + One'
    ]);

    // Course enrollment status
    var COURSE_ENROLLMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Enrolled', 'enrolled', 'layer8d-status-pending'],
        ['In Progress', 'inProgress', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-inactive'],
        ['Withdrawn', 'withdrawn', 'layer8d-status-inactive'],
        ['Waitlisted', 'waitlisted', 'layer8d-status-draft']
    ]);

    // Certification status
    var CERT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Pending Renewal', 'pendingRenewal', 'layer8d-status-pending'],
        ['Revoked', 'revoked', 'layer8d-status-inactive'],
        ['Suspended', 'suspended', 'layer8d-status-pending']
    ]);

    // Year-end doc type
    var YEAR_END_DOC_TYPE = factory.simple([
        'Unspecified', 'W-2', '1099', 'T4', 'P60', 'P11D', 'Payment Summary'
    ]);

    // Holiday type
    var HOLIDAY_TYPE = factory.simple([
        'Unspecified', 'Public', 'Company', 'Regional', 'Floating', 'Religious'
    ]);

    // Renderers
    var renderEnum = Layer8DRenderers.renderEnum;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;

    ESS.enums = {
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
        REVIEW_STATUS_CLASSES: REVIEW_STATUS.classes,
        ENROLLMENT_STATUS: ENROLLMENT_STATUS.enum,
        ENROLLMENT_STATUS_CLASSES: ENROLLMENT_STATUS.classes,
        COVERAGE_LEVEL: COVERAGE_LEVEL.enum,
        COURSE_ENROLLMENT_STATUS: COURSE_ENROLLMENT_STATUS.enum,
        COURSE_ENROLLMENT_STATUS_CLASSES: COURSE_ENROLLMENT_STATUS.classes,
        CERT_STATUS: CERT_STATUS.enum,
        CERT_STATUS_CLASSES: CERT_STATUS.classes,
        YEAR_END_DOC_TYPE: YEAR_END_DOC_TYPE.enum,
        HOLIDAY_TYPE: HOLIDAY_TYPE.enum
    };

    ESS.render = {
        leaveType: function(v) { return renderEnum(v, LEAVE_TYPE.enum); },
        leaveRequestStatus: createStatusRenderer(LEAVE_REQUEST_STATUS.enum, LEAVE_REQUEST_STATUS.classes),
        timesheetStatus: createStatusRenderer(TIMESHEET_STATUS.enum, TIMESHEET_STATUS.classes),
        goalStatus: createStatusRenderer(GOAL_STATUS.enum, GOAL_STATUS.classes),
        goalPriority: createStatusRenderer(GOAL_PRIORITY.enum, GOAL_PRIORITY.classes),
        reviewStatus: createStatusRenderer(REVIEW_STATUS.enum, REVIEW_STATUS.classes),
        enrollmentStatus: createStatusRenderer(ENROLLMENT_STATUS.enum, ENROLLMENT_STATUS.classes),
        coverageLevel: function(v) { return renderEnum(v, COVERAGE_LEVEL.enum); },
        courseEnrollmentStatus: createStatusRenderer(COURSE_ENROLLMENT_STATUS.enum, COURSE_ENROLLMENT_STATUS.classes),
        certStatus: createStatusRenderer(CERT_STATUS.enum, CERT_STATUS.classes),
        yearEndDocType: function(v) { return renderEnum(v, YEAR_END_DOC_TYPE.enum); },
        holidayType: function(v) { return renderEnum(v, HOLIDAY_TYPE.enum); }
    };
})();
