/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Compliance Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const compSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="compGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#0284c7;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            <g opacity="0.1">
                <line x1="0" y1="30" x2="1200" y2="30" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="60" x2="1200" y2="60" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="0" y1="90" x2="1200" y2="90" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="200" y1="0" x2="200" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="400" y1="0" x2="400" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="600" y1="0" x2="600" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="800" y1="0" x2="800" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
                <line x1="1000" y1="0" x2="1000" y2="120" stroke="#0ea5e9" stroke-width="0.5"/>
            </g>
            <g class="people-animation">
                <path d="M 175,45 L 175,75 Q 175,85 185,85 Q 195,85 195,75 L 195,45 L 185,40 L 175,45 Z" fill="url(#compGradient1)" opacity="0.6"/>
                <path d="M 180,55 L 185,62 L 195,50" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.8"/>
                <rect x="380" y="45" width="35" height="40" rx="2" fill="url(#compGradient1)" opacity="0.5"/>
                <line x1="387" y1="55" x2="408" y2="55" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <line x1="387" y1="65" x2="405" y2="65" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <line x1="387" y1="75" x2="402" y2="75" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <line x1="600" y1="45" x2="600" y2="80" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <line x1="580" y1="55" x2="620" y2="55" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <path d="M 575,55 L 572,70 L 588,70 L 585,55 Z" fill="url(#compGradient1)" opacity="0.5"/>
                <path d="M 615,55 L 612,70 L 628,70 L 625,55 Z" fill="url(#compGradient1)" opacity="0.5"/>
                <path d="M 795,80 L 810,50 L 825,80 Z" fill="url(#compGradient1)" opacity="0.5"/>
                <line x1="810" y1="58" x2="810" y2="70" stroke="#0ea5e9" stroke-width="2" opacity="0.8"/>
                <circle cx="810" cy="75" r="2" fill="#0ea5e9" opacity="0.8"/>
                <rect x="980" y="55" width="24" height="20" rx="3" fill="url(#compGradient1)" opacity="0.5"/>
                <path d="M 985,55 L 985,50 Q 985,42 992,42 Q 999,42 999,50 L 999,55" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.6"/>
                <circle cx="992" cy="65" r="3" fill="#0ea5e9" opacity="0.8"/>
            </g>
            <path d="M 195,60 Q 290,45 380,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 420,60 Q 510,75 580,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 705,45 795,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 830,60 Q 905,75 980,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('compliance', {
        title: 'Compliance & Risk',
        subtitle: 'Regulatory Compliance, Controls, Risk & Audit Management',
        icon: '🛡️',
        svgContent: compSvg,
        initFn: 'initializeComp',
        modules: [
            {
                key: 'regulatory', label: 'Regulatory', icon: '📜', isDefault: true,
                services: [
                    { key: 'regulations', label: 'Regulations', icon: '📋', isDefault: true },
                    { key: 'requirements', label: 'Requirements', icon: '📝' },
                    { key: 'compliance-statuses', label: 'Compliance Status', icon: '✅' },
                    { key: 'certifications', label: 'Certifications', icon: '🏆' },
                    { key: 'violations', label: 'Violations', icon: '⚠️' }
                ]
            },
            {
                key: 'controls', label: 'Internal Controls', icon: '🔒',
                services: [
                    { key: 'controls', label: 'Controls', icon: '🎛️', isDefault: true },
                    { key: 'assessments', label: 'Assessments', icon: '📊' },
                    { key: 'policies', label: 'Policies', icon: '📑' },
                    { key: 'approval-matrices', label: 'Approval Matrices', icon: '✓' },
                    { key: 'segregation-rules', label: 'Segregation Rules', icon: '🔀' }
                ]
            },
            {
                key: 'risk', label: 'Risk Management', icon: '⚡',
                services: [
                    { key: 'risk-registers', label: 'Risk Registers', icon: '📚', isDefault: true },
                    { key: 'risk-assessments', label: 'Risk Assessments', icon: '📈' },
                    { key: 'incidents', label: 'Incidents', icon: '🚨' },
                    { key: 'mitigation-plans', label: 'Mitigation Plans', icon: '🛡️' },
                    { key: 'insurance-policies', label: 'Insurance', icon: '📄' }
                ]
            },
            {
                key: 'audit', label: 'Audit', icon: '🔍',
                services: [
                    { key: 'audit-schedules', label: 'Audit Schedules', icon: '📅', isDefault: true },
                    { key: 'audit-findings', label: 'Findings', icon: '🔎' },
                    { key: 'remediation-actions', label: 'Remediation', icon: '🔧' },
                    { key: 'audit-reports', label: 'Audit Reports', icon: '📊' },
                    { key: 'compliance-reports', label: 'Compliance Reports', icon: '📋' }
                ]
            }
        ]
    });
})();
