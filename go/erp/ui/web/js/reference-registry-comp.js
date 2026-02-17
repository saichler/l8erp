/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * ERP Reference Registry - Compliance Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
(function() {
    'use strict';

    const refComp = window.Layer8RefFactory;

    Layer8DReferenceRegistry.register({
        // ========================================
        // Compliance - Regulatory
        // ========================================
        ...refComp.coded('CompRegulation', 'regulationId', 'code', 'name'),
        ...refComp.simple('CompCertification', 'certificationId', 'name'),

        // ========================================
        // Compliance - Internal Controls
        // ========================================
        ...refComp.coded('CompControl', 'controlId', 'code', 'name'),
        ...refComp.coded('CompPolicyDocument', 'documentId', 'code', 'title'),
        ...refComp.simple('CompApprovalMatrix', 'matrixId', 'name'),

        // ========================================
        // Compliance - Risk Management
        // ========================================
        ...refComp.coded('CompRiskRegister', 'riskId', 'riskNumber', 'name'),
        ...refComp.coded('CompIncident', 'incidentId', 'incidentNumber', 'title'),
        ...refComp.coded('CompInsurancePolicy', 'insuranceId', 'policyNumber', 'name'),

        // ========================================
        // Compliance - Audit Management
        // ========================================
        ...refComp.simple('CompAuditSchedule', 'scheduleId', 'name'),
        ...refComp.coded('CompAuditFinding', 'findingId', 'findingNumber', 'title'),
        ...refComp.simple('CompComplianceReport', 'reportId', 'title')
    });
})();
