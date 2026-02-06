/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Talent Management - Recruiting Enums
 * Requisition, Applicant, Application enums and values
 */
(function() {
    'use strict';

    window.TalentEnumsRecruiting = {
        REQUISITION_STATUS: {
            0: 'Unspecified',
            1: 'Draft',
            2: 'Pending Approval',
            3: 'Approved',
            4: 'Open',
            5: 'On Hold',
            6: 'Filled',
            7: 'Cancelled',
            8: 'Closed'
        },

        REQUISITION_STATUS_VALUES: {
            'draft': 1,
            'pending': 2,
            'approval': 2,
            'approved': 3,
            'open': 4,
            'hold': 5,
            'filled': 6,
            'cancelled': 7,
            'closed': 8
        },

        REQUISITION_STATUS_CLASSES: {
            1: 'layer8d-status-inactive',
            2: 'layer8d-status-pending',
            3: 'layer8d-status-active',
            4: 'layer8d-status-active',
            5: 'layer8d-status-pending',
            6: 'layer8d-status-active',
            7: 'layer8d-status-terminated',
            8: 'layer8d-status-inactive'
        },

        REQUISITION_TYPE: {
            0: 'Unspecified',
            1: 'New Position',
            2: 'Replacement',
            3: 'Expansion',
            4: 'Temporary',
            5: 'Intern'
        },

        REQUISITION_TYPE_VALUES: {
            'new': 1,
            'position': 1,
            'replacement': 2,
            'expansion': 3,
            'temporary': 4,
            'temp': 4,
            'intern': 5
        },

        APPLICANT_SOURCE: {
            0: 'Unspecified',
            1: 'Career Site',
            2: 'LinkedIn',
            3: 'Indeed',
            4: 'Glassdoor',
            5: 'Referral',
            6: 'Agency',
            7: 'University',
            8: 'Job Fair',
            9: 'Internal',
            10: 'Other'
        },

        APPLICANT_SOURCE_VALUES: {
            'career': 1,
            'site': 1,
            'linkedin': 2,
            'indeed': 3,
            'glassdoor': 4,
            'referral': 5,
            'agency': 6,
            'university': 7,
            'fair': 8,
            'internal': 9,
            'other': 10
        },

        APPLICATION_STATUS: {
            0: 'Unspecified',
            1: 'New',
            2: 'In Review',
            3: 'Interviewing',
            4: 'Offer Pending',
            5: 'Offer Extended',
            6: 'Hired',
            7: 'Rejected',
            8: 'Withdrawn'
        },

        APPLICATION_STATUS_VALUES: {
            'new': 1,
            'review': 2,
            'interviewing': 3,
            'offer': 4,
            'pending': 4,
            'extended': 5,
            'hired': 6,
            'rejected': 7,
            'withdrawn': 8
        },

        APPLICATION_STATUS_CLASSES: {
            1: 'layer8d-status-pending',
            2: 'layer8d-status-pending',
            3: 'layer8d-status-active',
            4: 'layer8d-status-pending',
            5: 'layer8d-status-active',
            6: 'layer8d-status-active',
            7: 'layer8d-status-terminated',
            8: 'layer8d-status-inactive'
        },

        APPLICATION_STAGE: {
            0: 'Unspecified',
            1: 'Screening',
            2: 'Phone Screen',
            3: 'Interview 1',
            4: 'Interview 2',
            5: 'Final Interview',
            6: 'Reference Check',
            7: 'Background Check',
            8: 'Offer',
            9: 'Closed'
        },

        APPLICATION_STAGE_VALUES: {
            'screening': 1,
            'phone': 2,
            'interview1': 3,
            'interview2': 4,
            'final': 5,
            'reference': 6,
            'background': 7,
            'offer': 8,
            'closed': 9
        },

        DISPOSITION_REASON: {
            0: 'Unspecified',
            1: 'Under Qualified',
            2: 'Over Qualified',
            3: 'Better Candidate',
            4: 'Compensation Mismatch',
            5: 'Failed Interview',
            6: 'Failed Background',
            7: 'Withdrew',
            8: 'Declined Offer',
            9: 'Position Filled',
            10: 'Position Cancelled',
            11: 'No Show'
        },

        DISPOSITION_REASON_VALUES: {
            'under': 1,
            'qualified': 1,
            'over': 2,
            'better': 3,
            'compensation': 4,
            'failed': 5,
            'interview': 5,
            'background': 6,
            'withdrew': 7,
            'declined': 8,
            'filled': 9,
            'cancelled': 10,
            'noshow': 11
        }
    };

})();
