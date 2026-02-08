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
    ...refCompM.coded('CompRequirement', 'requirementId', 'code', 'name'),
    ...refCompM.idOnly('CompComplianceStatus', 'statusId'),
    ...refCompM.simple('CompCertification', 'certificationId', 'name'),
    ...refCompM.simple('CompViolationRecord', 'violationId', 'violationNumber'),

    // ========================================
    // Internal Controls
    // ========================================
    ...refCompM.coded('CompControl', 'controlId', 'code', 'name'),
    ...refCompM.idOnly('CompControlAssessment', 'assessmentId'),
    ...refCompM.coded('CompPolicyDocument', 'documentId', 'code', 'title'),
    ...refCompM.simple('CompApprovalMatrix', 'matrixId', 'name'),
    ...refCompM.simple('CompSegregationRule', 'ruleId', 'name'),

    // ========================================
    // Risk Management
    // ========================================
    ...refCompM.coded('CompRiskRegister', 'riskId', 'riskNumber', 'name'),
    ...refCompM.idOnly('CompRiskAssessment', 'assessmentId'),
    ...refCompM.coded('CompIncident', 'incidentId', 'incidentNumber', 'title'),
    ...refCompM.simple('CompMitigationPlan', 'planId', 'name'),
    ...refCompM.coded('CompInsurancePolicy', 'insuranceId', 'policyNumber', 'name'),

    // ========================================
    // Audit Management
    // ========================================
    ...refCompM.simple('CompAuditSchedule', 'scheduleId', 'name'),
    ...refCompM.coded('CompAuditFinding', 'findingId', 'findingNumber', 'title'),
    ...refCompM.idOnly('CompRemediationAction', 'actionId'),
    ...refCompM.simple('CompAuditReport', 'reportId', 'title'),
    ...refCompM.simple('CompComplianceReport', 'reportId', 'title')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryComp);
