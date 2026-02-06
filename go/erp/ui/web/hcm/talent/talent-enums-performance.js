/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Talent Management - Performance Enums
 * Reviews, Goals, Feedback, Succession enums and values
 */
(function() {
    'use strict';

    window.TalentEnumsPerformance = {
        PERFORMANCE_REVIEW_STATUS: {
            0: 'Unspecified',
            1: 'Not Started',
            2: 'Self Review',
            3: 'Manager Review',
            4: 'Calibration',
            5: 'HR Review',
            6: 'Acknowledgment',
            7: 'Completed'
        },

        PERFORMANCE_REVIEW_STATUS_VALUES: {
            'not': 1,
            'started': 1,
            'self': 2,
            'manager': 3,
            'calibration': 4,
            'hr': 5,
            'acknowledgment': 6,
            'completed': 7
        },

        PERFORMANCE_REVIEW_STATUS_CLASSES: {
            1: 'layer8d-status-inactive',
            2: 'layer8d-status-pending',
            3: 'layer8d-status-pending',
            4: 'layer8d-status-pending',
            5: 'layer8d-status-pending',
            6: 'layer8d-status-pending',
            7: 'layer8d-status-active'
        },

        REVIEW_TYPE: {
            0: 'Unspecified',
            1: 'Annual',
            2: 'Semi-Annual',
            3: 'Quarterly',
            4: 'Probationary',
            5: 'Project',
            6: 'Ad Hoc'
        },

        REVIEW_TYPE_VALUES: {
            'annual': 1,
            'semi': 2,
            'quarterly': 3,
            'probationary': 4,
            'probation': 4,
            'project': 5,
            'adhoc': 6
        },

        GOAL_TYPE: {
            0: 'Unspecified',
            1: 'Individual',
            2: 'Team',
            3: 'Department',
            4: 'Company'
        },

        GOAL_TYPE_VALUES: {
            'individual': 1,
            'team': 2,
            'department': 3,
            'dept': 3,
            'company': 4
        },

        GOAL_CATEGORY: {
            0: 'Unspecified',
            1: 'Performance',
            2: 'Development',
            3: 'Career',
            4: 'Project'
        },

        GOAL_CATEGORY_VALUES: {
            'performance': 1,
            'development': 2,
            'career': 3,
            'project': 4
        },

        GOAL_STATUS: {
            0: 'Unspecified',
            1: 'Draft',
            2: 'Active',
            3: 'On Track',
            4: 'At Risk',
            5: 'Behind',
            6: 'Completed',
            7: 'Cancelled'
        },

        GOAL_STATUS_VALUES: {
            'draft': 1,
            'active': 2,
            'track': 3,
            'risk': 4,
            'behind': 5,
            'completed': 6,
            'cancelled': 7
        },

        GOAL_STATUS_CLASSES: {
            1: 'layer8d-status-inactive',
            2: 'layer8d-status-active',
            3: 'layer8d-status-active',
            4: 'layer8d-status-pending',
            5: 'layer8d-status-terminated',
            6: 'layer8d-status-active',
            7: 'layer8d-status-inactive'
        },

        GOAL_PRIORITY: {
            0: 'Unspecified',
            1: 'Low',
            2: 'Medium',
            3: 'High',
            4: 'Critical'
        },

        GOAL_PRIORITY_VALUES: {
            'low': 1,
            'medium': 2,
            'med': 2,
            'high': 3,
            'critical': 4
        },

        SUCCESSION_PLAN_STATUS: {
            0: 'Unspecified',
            1: 'Draft',
            2: 'Active',
            3: 'On Hold',
            4: 'Closed'
        },

        SUCCESSION_PLAN_STATUS_VALUES: {
            'draft': 1,
            'active': 2,
            'hold': 3,
            'closed': 4
        },

        SUCCESSION_PLAN_STATUS_CLASSES: {
            1: 'layer8d-status-inactive',
            2: 'layer8d-status-active',
            3: 'layer8d-status-pending',
            4: 'layer8d-status-inactive'
        },

        RISK_LEVEL: {
            0: 'Unspecified',
            1: 'Low',
            2: 'Medium',
            3: 'High',
            4: 'Critical'
        },

        RISK_LEVEL_VALUES: {
            'low': 1,
            'medium': 2,
            'med': 2,
            'high': 3,
            'critical': 4
        },

        READINESS_LEVEL: {
            0: 'Unspecified',
            1: 'Ready Now',
            2: 'Ready in 1 Year',
            3: 'Ready in 2 Years',
            4: 'Ready in 3+ Years'
        },

        READINESS_LEVEL_VALUES: {
            'now': 1,
            'ready': 1,
            '1': 2,
            '2': 3,
            '3': 4
        },

        FEEDBACK_TYPE: {
            0: 'Unspecified',
            1: '360 Review',
            2: 'Peer',
            3: 'Upward',
            4: 'Continuous',
            5: 'Recognition'
        },

        FEEDBACK_TYPE_VALUES: {
            '360': 1,
            'review': 1,
            'peer': 2,
            'upward': 3,
            'continuous': 4,
            'recognition': 5
        },

        FEEDBACK_RELATIONSHIP: {
            0: 'Unspecified',
            1: 'Manager',
            2: 'Peer',
            3: 'Direct Report',
            4: 'Skip Level',
            5: 'Cross Functional',
            6: 'External'
        },

        FEEDBACK_RELATIONSHIP_VALUES: {
            'manager': 1,
            'peer': 2,
            'direct': 3,
            'report': 3,
            'skip': 4,
            'cross': 5,
            'functional': 5,
            'external': 6
        },

        FEEDBACK_STATUS: {
            0: 'Unspecified',
            1: 'Requested',
            2: 'In Progress',
            3: 'Submitted',
            4: 'Declined'
        },

        FEEDBACK_STATUS_VALUES: {
            'requested': 1,
            'progress': 2,
            'submitted': 3,
            'declined': 4
        },

        FEEDBACK_STATUS_CLASSES: {
            1: 'layer8d-status-pending',
            2: 'layer8d-status-pending',
            3: 'layer8d-status-active',
            4: 'layer8d-status-terminated'
        }
    };

})();
