/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRisk = window.CompRisk || {};

    CompRisk.enums = {
        riskCategory: ['Strategic', 'Operational', 'Financial', 'Compliance', 'Reputational', 'Technology', 'Legal'],
        riskLevel: ['Critical', 'High', 'Medium', 'Low', 'Very Low'],
        riskStatus: ['Open', 'Mitigated', 'Accepted', 'Transferred', 'Closed'],
        riskLikelihood: ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare'],
        riskImpact: ['Catastrophic', 'Major', 'Moderate', 'Minor', 'Insignificant'],
        assessmentType: ['Initial', 'Periodic', 'Ad-hoc', 'Post-Incident'],
        incidentSeverity: ['Critical', 'Major', 'Moderate', 'Minor'],
        incidentStatus: ['Open', 'Investigating', 'Contained', 'Resolved', 'Closed'],
        mitigationStatus: ['Planned', 'In Progress', 'Completed', 'Cancelled', 'On Hold'],
        mitigationStrategy: ['Avoid', 'Mitigate', 'Transfer', 'Accept'],
        insuranceStatus: ['Active', 'Expired', 'Pending Renewal', 'Cancelled'],
        insuranceType: ['General Liability', 'Cyber', 'D&O', 'E&O', 'Property', 'Workers Comp', 'Business Interruption', 'Other'],
        premiumFrequency: ['Annual', 'Semi-Annual', 'Quarterly', 'Monthly']
    };
})();
