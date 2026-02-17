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
                { key: 'certifications', label: 'Certifications', icon: '🏆', endpoint: '/110/CompCert', model: 'CompCertification' }
            ]
        },
        'controls': {
            label: 'Internal Controls', icon: '🔒',
            services: [
                { key: 'controls', label: 'Controls', icon: '🎛️', endpoint: '/110/CompCtrl', model: 'CompControl' },
                { key: 'policies', label: 'Policies', icon: '📑', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument' },
                { key: 'approval-matrices', label: 'Approval Matrices', icon: '✓', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix' }
            ]
        },
        'risk': {
            label: 'Risk Management', icon: '⚡',
            services: [
                { key: 'risk-registers', label: 'Risk Registers', icon: '📚', endpoint: '/110/CompRisk', model: 'CompRiskRegister' },
                { key: 'incidents', label: 'Incidents', icon: '🚨', endpoint: '/110/CompIncdnt', model: 'CompIncident' },
                { key: 'insurance-policies', label: 'Insurance Policies', icon: '📄', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy' }
            ]
        },
        'audit': {
            label: 'Audit Management', icon: '🔍',
            services: [
                { key: 'audit-schedules', label: 'Audit Schedules', icon: '📅', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule' },
                { key: 'audit-findings', label: 'Audit Findings', icon: '🔎', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding' },
                { key: 'compliance-reports', label: 'Compliance Reports', icon: '📋', endpoint: '/110/CompCmpRpt', model: 'CompComplianceReport' }
            ]
        }
    },
    submodules: ['CompRegulatory', 'CompControls', 'CompRisk', 'CompAudit']
});
