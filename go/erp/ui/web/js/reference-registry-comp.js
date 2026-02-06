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
        ...refComp.coded('CompRequirement', 'requirementId', 'code', 'name'),
        CompComplianceStatus: {
            endpoint: '/110/CompStatus',
            idColumn: 'statusId',
            displayColumn: 'status',
            selectColumns: ['statusId', 'entityType', 'status'],
            displayFormat: function(item) {
                return item.entityType + ': ' + item.status;
            }
        },
        ...refComp.simple('CompCertification', 'certificationId', 'name'),
        ...refComp.simple('CompViolationRecord', 'violationId', 'violationNumber'),

        // ========================================
        // Compliance - Internal Controls
        // ========================================
        ...refComp.coded('CompControl', 'controlId', 'code', 'name'),
        ...refComp.idOnly('CompControlAssessment', 'assessmentId'),
        ...refComp.coded('CompPolicyDocument', 'documentId', 'code', 'title'),
        ...refComp.simple('CompApprovalMatrix', 'matrixId', 'name'),
        ...refComp.simple('CompSegregationRule', 'ruleId', 'name'),

        // ========================================
        // Compliance - Risk Management
        // ========================================
        ...refComp.coded('CompRiskRegister', 'riskId', 'riskNumber', 'name'),
        ...refComp.idOnly('CompRiskAssessment', 'assessmentId'),
        ...refComp.coded('CompIncident', 'incidentId', 'incidentNumber', 'title'),
        ...refComp.simple('CompMitigationPlan', 'planId', 'name'),
        ...refComp.coded('CompInsurancePolicy', 'insuranceId', 'policyNumber', 'name'),

        // ========================================
        // Compliance - Audit Management
        // ========================================
        ...refComp.simple('CompAuditSchedule', 'scheduleId', 'name'),
        ...refComp.coded('CompAuditFinding', 'findingId', 'findingNumber', 'title'),
        ...refComp.idOnly('CompRemediationAction', 'actionId'),
        ...refComp.simple('CompAuditReport', 'reportId', 'title'),
        ...refComp.simple('CompComplianceReport', 'reportId', 'title')
    });
})();
