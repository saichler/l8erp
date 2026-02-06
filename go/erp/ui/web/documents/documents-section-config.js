/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Documents Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const docSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="docGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <rect x="155" y="35" width="35" height="45" rx="3" fill="url(#docGradient1)" opacity="0.4"/>
                <rect x="160" y="40" width="35" height="45" rx="3" fill="url(#docGradient1)" opacity="0.5"/>
                <rect x="165" y="45" width="35" height="45" rx="3" fill="url(#docGradient1)" opacity="0.6"/>
                <line x1="173" y1="55" x2="192" y2="55" stroke="#0ea5e9" stroke-width="1.5" opacity="0.8"/>
                <line x1="173" y1="62" x2="188" y2="62" stroke="#0ea5e9" stroke-width="1.5" opacity="0.8"/>
                <rect x="385" y="40" width="25" height="30" rx="3" fill="url(#docGradient1)" opacity="0.5"/>
                <rect x="420" y="40" width="25" height="30" rx="3" fill="url(#docGradient1)" opacity="0.5"/>
                <path d="M 410,55 L 420,55" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.7"/>
                <circle cx="600" cy="60" r="20" fill="none" stroke="url(#docGradient1)" stroke-width="3" opacity="0.4"/>
                <circle cx="600" cy="60" r="8" fill="url(#docGradient1)" opacity="0.6"/>
                <line x1="600" y1="40" x2="600" y2="48" stroke="#0ea5e9" stroke-width="2" opacity="0.7"/>
                <line x1="580" y1="60" x2="588" y2="60" stroke="#0ea5e9" stroke-width="2" opacity="0.7"/>
                <path d="M 795,35 L 795,65 Q 795,85 815,90 Q 835,85 835,65 L 835,35 L 815,30 L 795,35" fill="url(#docGradient1)" opacity="0.5"/>
                <path d="M 805,55 L 812,65 L 828,48" fill="none" stroke="#0ea5e9" stroke-width="2.5" opacity="0.8"/>
                <rect x="980" y="40" width="20" height="15" rx="2" fill="url(#docGradient1)" opacity="0.5"/>
                <rect x="1010" y="50" width="18" height="12" rx="2" fill="url(#docGradient1)" opacity="0.5"/>
                <rect x="1010" y="68" width="18" height="12" rx="2" fill="url(#docGradient1)" opacity="0.5"/>
            </g>
            <path d="M 200,55 Q 295,40 385,50" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 445,60 Q 520,75 580,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 705,45 795,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 835,60 Q 910,75 980,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="295" cy="45" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="705" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('documents', {
        title: 'Document Management',
        subtitle: 'Storage, Workflow, Integration & Compliance',
        icon: '📁',
        svgContent: docSvg,
        initFn: 'initializeDoc',
        modules: [
            {
                key: 'storage', label: 'Storage', icon: '📄', isDefault: true,
                services: [
                    { key: 'documents', label: 'Documents', icon: '📄', isDefault: true },
                    { key: 'folders', label: 'Folders', icon: '📁' },
                    { key: 'categories', label: 'Categories', icon: '🏷️' },
                    { key: 'tags', label: 'Tags', icon: '🔖' },
                    { key: 'versions', label: 'Versions', icon: '📚' }
                ]
            },
            {
                key: 'workflow', label: 'Workflow', icon: '🔄',
                services: [
                    { key: 'checkouts', label: 'Checkouts', icon: '🔓', isDefault: true },
                    { key: 'approval-workflows', label: 'Approvals', icon: '✅' },
                    { key: 'workflow-steps', label: 'Steps', icon: '🔢' },
                    { key: 'signatures', label: 'Signatures', icon: '✍️' },
                    { key: 'review-comments', label: 'Comments', icon: '💬' }
                ]
            },
            {
                key: 'integration', label: 'Integration', icon: '🔗',
                services: [
                    { key: 'attachments', label: 'Attachments', icon: '📎', isDefault: true },
                    { key: 'templates', label: 'Templates', icon: '📋' },
                    { key: 'template-fields', label: 'Fields', icon: '🔤' },
                    { key: 'email-captures', label: 'Email Capture', icon: '📧' },
                    { key: 'scan-jobs', label: 'Scan Jobs', icon: '🖨️' }
                ]
            },
            {
                key: 'compliance', label: 'Compliance', icon: '🛡️',
                services: [
                    { key: 'retention-policies', label: 'Retention', icon: '📅', isDefault: true },
                    { key: 'legal-holds', label: 'Legal Holds', icon: '⚖️' },
                    { key: 'access-logs', label: 'Access Logs', icon: '📊' },
                    { key: 'archive-jobs', label: 'Archives', icon: '🗄️' },
                    { key: 'audit-trails', label: 'Audit Trails', icon: '🔍' }
                ]
            }
        ]
    });
})();
