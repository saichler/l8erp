/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Compliance Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('compliance', {
        title: 'Compliance & Risk',
        subtitle: 'Regulatory Compliance, Controls, Risk & Audit Management',
        icon: '🛡️',
        svgContent: Layer8SvgFactory.generate('compliance'),
        initFn: 'initializeComp',
        modules: [
            {
                key: 'regulatory', label: 'Regulatory', icon: '📜', isDefault: true,
                services: [
                    { key: 'regulations', label: 'Regulations', icon: '📋', isDefault: true },
                    { key: 'certifications', label: 'Certifications', icon: '🏆' }
                ]
            },
            {
                key: 'controls', label: 'Internal Controls', icon: '🔒',
                services: [
                    { key: 'controls', label: 'Controls', icon: '🎛️', isDefault: true },
                    { key: 'policies', label: 'Policies', icon: '📑' },
                    { key: 'approval-matrices', label: 'Approval Matrices', icon: '✓' }
                ]
            },
            {
                key: 'risk', label: 'Risk Management', icon: '⚡',
                services: [
                    { key: 'risk-registers', label: 'Risk Registers', icon: '📚', isDefault: true },
                    { key: 'incidents', label: 'Incidents', icon: '🚨' },
                    { key: 'insurance-policies', label: 'Insurance', icon: '📄' }
                ]
            },
            {
                key: 'audit', label: 'Audit', icon: '🔍',
                services: [
                    { key: 'audit-schedules', label: 'Audit Schedules', icon: '📅', isDefault: true },
                    { key: 'audit-findings', label: 'Findings', icon: '🔎' },
                    { key: 'compliance-reports', label: 'Compliance Reports', icon: '📋' }
                ]
            }
        ]
    });
})();
