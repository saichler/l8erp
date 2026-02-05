/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    // Register COMP types with the reference registry
    if (typeof Layer8DReferenceRegistry !== 'undefined') {
        // Regulatory
        Layer8DReferenceRegistry.register('CompRegulation', {
            endpoint: '/110/CompReg',
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            selectColumns: ['regulationId', 'code', 'name']
        });

        Layer8DReferenceRegistry.register('CompRequirement', {
            endpoint: '/110/CompReq',
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            selectColumns: ['requirementId', 'code', 'name']
        });

        Layer8DReferenceRegistry.register('CompComplianceStatus', {
            endpoint: '/110/CompStatus',
            displayFormat: function(item) {
                return item.entityType + ': ' + item.status;
            },
            selectColumns: ['statusId', 'entityType', 'status']
        });

        Layer8DReferenceRegistry.register('CompCertification', {
            endpoint: '/110/CompCert',
            displayFormat: function(item) {
                return item.name;
            },
            selectColumns: ['certificationId', 'name', 'type']
        });

        Layer8DReferenceRegistry.register('CompViolationRecord', {
            endpoint: '/110/CompVioltn',
            displayFormat: function(item) {
                return item.violationNumber;
            },
            selectColumns: ['violationId', 'violationNumber', 'severity']
        });

        // Internal Controls
        Layer8DReferenceRegistry.register('CompControl', {
            endpoint: '/110/CompCtrl',
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            selectColumns: ['controlId', 'code', 'name']
        });

        Layer8DReferenceRegistry.register('CompControlAssessment', {
            endpoint: '/110/CompCtrlAs',
            displayFormat: function(item) {
                return item.assessmentId;
            },
            selectColumns: ['assessmentId', 'controlId', 'result']
        });

        Layer8DReferenceRegistry.register('CompPolicyDocument', {
            endpoint: '/110/CompPolicy',
            displayFormat: function(item) {
                return item.code + ' - ' + item.title;
            },
            selectColumns: ['documentId', 'code', 'title']
        });

        Layer8DReferenceRegistry.register('CompApprovalMatrix', {
            endpoint: '/110/CompAprvMx',
            displayFormat: function(item) {
                return item.name;
            },
            selectColumns: ['matrixId', 'name', 'documentType']
        });

        Layer8DReferenceRegistry.register('CompSegregationRule', {
            endpoint: '/110/CompSegrul',
            displayFormat: function(item) {
                return item.name;
            },
            selectColumns: ['ruleId', 'name', 'riskLevel']
        });

        // Risk Management
        Layer8DReferenceRegistry.register('CompRiskRegister', {
            endpoint: '/110/CompRisk',
            displayFormat: function(item) {
                return item.riskNumber + ' - ' + item.name;
            },
            selectColumns: ['riskId', 'riskNumber', 'name']
        });

        Layer8DReferenceRegistry.register('CompRiskAssessment', {
            endpoint: '/110/CompRiskAs',
            displayFormat: function(item) {
                return item.assessmentId;
            },
            selectColumns: ['assessmentId', 'riskId', 'riskLevel']
        });

        Layer8DReferenceRegistry.register('CompIncident', {
            endpoint: '/110/CompIncdnt',
            displayFormat: function(item) {
                return item.incidentNumber + ' - ' + item.title;
            },
            selectColumns: ['incidentId', 'incidentNumber', 'title']
        });

        Layer8DReferenceRegistry.register('CompMitigationPlan', {
            endpoint: '/110/CompMitig',
            displayFormat: function(item) {
                return item.name;
            },
            selectColumns: ['planId', 'name', 'status']
        });

        Layer8DReferenceRegistry.register('CompInsurancePolicy', {
            endpoint: '/110/CompInsur',
            displayFormat: function(item) {
                return item.policyNumber + ' - ' + item.name;
            },
            selectColumns: ['insuranceId', 'policyNumber', 'name']
        });

        // Audit Management
        Layer8DReferenceRegistry.register('CompAuditSchedule', {
            endpoint: '/110/CompAudSch',
            displayFormat: function(item) {
                return item.name;
            },
            selectColumns: ['scheduleId', 'name', 'auditType']
        });

        Layer8DReferenceRegistry.register('CompAuditFinding', {
            endpoint: '/110/CompAudFnd',
            displayFormat: function(item) {
                return item.findingNumber + ' - ' + item.title;
            },
            selectColumns: ['findingId', 'findingNumber', 'title']
        });

        Layer8DReferenceRegistry.register('CompRemediationAction', {
            endpoint: '/110/CompRemed',
            displayFormat: function(item) {
                return item.actionId;
            },
            selectColumns: ['actionId', 'description', 'status']
        });

        Layer8DReferenceRegistry.register('CompAuditReport', {
            endpoint: '/110/CompAudRpt',
            displayFormat: function(item) {
                return item.title;
            },
            selectColumns: ['reportId', 'title', 'reportType']
        });

        Layer8DReferenceRegistry.register('CompComplianceReport', {
            endpoint: '/110/CompCmpRpt',
            displayFormat: function(item) {
                return item.title;
            },
            selectColumns: ['reportId', 'title', 'reportType']
        });
    }
})();
