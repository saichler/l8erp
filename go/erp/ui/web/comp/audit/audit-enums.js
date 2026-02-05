/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompAudit = window.CompAudit || {};

    CompAudit.enums = {
        auditType: ['Internal', 'External', 'Regulatory', 'Compliance', 'Financial', 'Operational', 'IT', 'Special'],
        auditStatus: ['Planned', 'Scheduled', 'In Progress', 'Fieldwork Complete', 'Report Draft', 'Completed', 'Cancelled'],
        auditFrequency: ['Annual', 'Semi-Annual', 'Quarterly', 'Monthly', 'Ad-hoc'],
        findingSeverity: ['Critical', 'Major', 'Moderate', 'Minor', 'Observation'],
        findingStatus: ['Open', 'Management Response', 'Remediation In Progress', 'Remediated', 'Closed', 'Risk Accepted'],
        remediationStatus: ['Open', 'In Progress', 'Completed', 'Verified', 'Overdue', 'Cancelled'],
        remediationPriority: ['Critical', 'High', 'Medium', 'Low'],
        reportType: ['Audit Report', 'Compliance Report', 'Risk Report', 'Summary Report', 'Management Letter'],
        reportStatus: ['Draft', 'Under Review', 'Final', 'Published', 'Archived']
    };
})();
