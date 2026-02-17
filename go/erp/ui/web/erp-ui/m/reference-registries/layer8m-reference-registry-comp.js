/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - Compliance Module
 * Reference configurations for Compliance Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refCompM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryComp = {
    // ========================================
    // Regulatory
    // ========================================
    ...refCompM.coded('CompRegulation', 'regulationId', 'code', 'name'),
    ...refCompM.simple('CompCertification', 'certificationId', 'name'),

    // ========================================
    // Internal Controls
    // ========================================
    ...refCompM.coded('CompControl', 'controlId', 'code', 'name'),
    ...refCompM.coded('CompPolicyDocument', 'documentId', 'code', 'title'),
    ...refCompM.simple('CompApprovalMatrix', 'matrixId', 'name'),

    // ========================================
    // Risk Management
    // ========================================
    ...refCompM.coded('CompRiskRegister', 'riskId', 'riskNumber', 'name'),
    ...refCompM.coded('CompIncident', 'incidentId', 'incidentNumber', 'title'),
    ...refCompM.coded('CompInsurancePolicy', 'insuranceId', 'policyNumber', 'name'),

    // ========================================
    // Audit Management
    // ========================================
    ...refCompM.simple('CompAuditSchedule', 'scheduleId', 'name'),
    ...refCompM.coded('CompAuditFinding', 'findingId', 'findingNumber', 'title'),
    ...refCompM.simple('CompComplianceReport', 'reportId', 'title')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryComp);
