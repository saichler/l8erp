/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';
    window.CompRegulatory = window.CompRegulatory || {};

    CompRegulatory.enums = {
        regulationType: ['Financial', 'Environmental', 'Health & Safety', 'Data Privacy', 'Industry Specific', 'Labor', 'Tax', 'Trade', 'Other'],
        regulationStatus: ['Active', 'Pending', 'Retired', 'Draft'],
        jurisdictionLevel: ['Federal', 'State', 'Local', 'International', 'Industry'],
        requirementPriority: ['Critical', 'High', 'Medium', 'Low'],
        requirementStatus: ['Active', 'Pending', 'Retired', 'Under Review'],
        complianceStatus: ['Compliant', 'Non-Compliant', 'Partially Compliant', 'Pending Review', 'Not Applicable'],
        certificationType: ['ISO', 'SOC', 'PCI-DSS', 'HIPAA', 'GDPR', 'Industry Specific', 'Other'],
        certificationStatus: ['Active', 'Expired', 'Pending', 'Revoked', 'Suspended'],
        violationSeverity: ['Critical', 'Major', 'Minor', 'Observation'],
        violationStatus: ['Open', 'Under Investigation', 'Resolved', 'Closed', 'Appealed']
    };
})();
