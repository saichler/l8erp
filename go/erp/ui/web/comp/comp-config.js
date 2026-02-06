/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Compliance Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'Comp',
    modules: {
        'regulatory': {
            label: 'Regulatory', icon: '📜',
            services: [
                { key: 'regulations', label: 'Regulations', icon: '📋', endpoint: '/110/CompReg', model: 'CompRegulation' },
                { key: 'requirements', label: 'Requirements', icon: '📝', endpoint: '/110/CompReq', model: 'CompRequirement' },
                { key: 'compliance-statuses', label: 'Compliance Status', icon: '✅', endpoint: '/110/CompStatus', model: 'CompComplianceStatus' },
                { key: 'certifications', label: 'Certifications', icon: '🏆', endpoint: '/110/CompCert', model: 'CompCertification' },
                { key: 'violations', label: 'Violations', icon: '⚠️', endpoint: '/110/CompVioltn', model: 'CompViolationRecord' }
            ]
        },
        'controls': {
            label: 'Internal Controls', icon: '🔒',
            services: [
                { key: 'controls', label: 'Controls', icon: '🎛️', endpoint: '/110/CompCtrl', model: 'CompControl' },
                { key: 'assessments', label: 'Assessments', icon: '📊', endpoint: '/110/CompCtrlAs', model: 'CompControlAssessment' },
                { key: 'policies', label: 'Policies', icon: '📑', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument' },
                { key: 'approval-matrices', label: 'Approval Matrices', icon: '✓', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix' },
                { key: 'segregation-rules', label: 'Segregation Rules', icon: '🔀', endpoint: '/110/CompSegrul', model: 'CompSegregationRule' }
            ]
        },
        'risk': {
            label: 'Risk Management', icon: '⚡',
            services: [
                { key: 'risk-registers', label: 'Risk Registers', icon: '📚', endpoint: '/110/CompRisk', model: 'CompRiskRegister' },
                { key: 'risk-assessments', label: 'Risk Assessments', icon: '📈', endpoint: '/110/CompRiskAs', model: 'CompRiskAssessment' },
                { key: 'incidents', label: 'Incidents', icon: '🚨', endpoint: '/110/CompIncdnt', model: 'CompIncident' },
                { key: 'mitigation-plans', label: 'Mitigation Plans', icon: '🛡️', endpoint: '/110/CompMitig', model: 'CompMitigationPlan' },
                { key: 'insurance-policies', label: 'Insurance Policies', icon: '📄', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy' }
            ]
        },
        'audit': {
            label: 'Audit Management', icon: '🔍',
            services: [
                { key: 'audit-schedules', label: 'Audit Schedules', icon: '📅', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule' },
                { key: 'audit-findings', label: 'Audit Findings', icon: '🔎', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding' },
                { key: 'remediation-actions', label: 'Remediation Actions', icon: '🔧', endpoint: '/110/CompRemed', model: 'CompRemediationAction' },
                { key: 'audit-reports', label: 'Audit Reports', icon: '📊', endpoint: '/110/CompAudRpt', model: 'CompAuditReport' },
                { key: 'compliance-reports', label: 'Compliance Reports', icon: '📋', endpoint: '/110/CompCmpRpt', model: 'CompComplianceReport' }
            ]
        }
    },
    submodules: ['CompRegulatory', 'CompControls', 'CompRisk', 'CompAudit']
});
