/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// CRM Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    const crmSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="crmGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <path d="M 170,55 Q 180,50 190,55 L 200,60 Q 210,65 200,70 L 190,65 Q 180,60 175,65" fill="none" stroke="url(#crmGradient1)" stroke-width="3" opacity="0.6"/>
                <path d="M 210,55 Q 200,50 190,55" fill="none" stroke="url(#crmGradient1)" stroke-width="3" opacity="0.6"/>
                <circle cx="175" cy="50" r="6" fill="url(#crmGradient1)" opacity="0.5"/>
                <circle cx="205" cy="50" r="6" fill="url(#crmGradient1)" opacity="0.5"/>
                <circle cx="400" cy="60" r="18" fill="none" stroke="url(#crmGradient1)" stroke-width="2" opacity="0.5"/>
                <circle cx="400" cy="60" r="12" fill="none" stroke="url(#crmGradient1)" stroke-width="2" opacity="0.6"/>
                <circle cx="400" cy="60" r="6" fill="url(#crmGradient1)" opacity="0.7"/>
                <path d="M 580,45 L 620,45 L 610,65 L 590,65 Z" fill="url(#crmGradient1)" opacity="0.5"/>
                <rect x="593" y="65" width="14" height="15" rx="2" fill="url(#crmGradient1)" opacity="0.6"/>
                <circle cx="795" cy="48" r="8" fill="url(#crmGradient1)" opacity="0.5"/>
                <path d="M 780,60 Q 795,75 810,60" fill="url(#crmGradient1)" opacity="0.4"/>
                <path d="M 790,70 L 795,78 L 800,70 Q 795,65 790,70" fill="#0ea5e9" opacity="0.6"/>
                <rect x="975" y="60" width="8" height="20" rx="1" fill="url(#crmGradient1)" opacity="0.5"/>
                <rect x="988" y="50" width="8" height="30" rx="1" fill="url(#crmGradient1)" opacity="0.6"/>
                <rect x="1001" y="40" width="8" height="40" rx="1" fill="url(#crmGradient1)" opacity="0.7"/>
                <path d="M 979,58 L 992,48 L 1005,38" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.8"/>
            </g>
            <path d="M 215,60 Q 300,45 380,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 420,60 Q 500,75 580,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 620,60 Q 700,45 780,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 815,60 Q 895,75 975,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('crm', {
        title: 'Customer Relationship Management',
        subtitle: 'Leads, Opportunities, Accounts, Marketing, Service & Field Service',
        icon: '🤝',
        svgContent: crmSvg,
        initFn: 'initializeCrm',
        modules: [
            {
                key: 'leads', label: 'Leads', icon: '🎯',
                services: [
                    { key: 'leads', label: 'Leads', icon: '🎯', isDefault: true },
                    { key: 'lead-sources', label: 'Lead Sources', icon: '📍' },
                    { key: 'lead-scores', label: 'Lead Scores', icon: '📊' },
                    { key: 'lead-activities', label: 'Activities', icon: '📝' },
                    { key: 'lead-assigns', label: 'Assignments', icon: '👤' },
                    { key: 'lead-conversions', label: 'Conversions', icon: '🔄' }
                ]
            },
            {
                key: 'opportunities', label: 'Opportunities', icon: '💼', isDefault: true,
                services: [
                    { key: 'opportunities', label: 'Opportunities', icon: '💼', isDefault: true },
                    { key: 'opp-stages', label: 'Stages', icon: '📈' },
                    { key: 'opp-competitors', label: 'Competitors', icon: '🏁' },
                    { key: 'opp-products', label: 'Products', icon: '📦' },
                    { key: 'opp-teams', label: 'Teams', icon: '👥' },
                    { key: 'opp-activities', label: 'Activities', icon: '📝' }
                ]
            },
            {
                key: 'accounts', label: 'Accounts', icon: '🏢',
                services: [
                    { key: 'accounts', label: 'Accounts', icon: '🏢', isDefault: true },
                    { key: 'contacts', label: 'Contacts', icon: '👤' },
                    { key: 'interactions', label: 'Interactions', icon: '💬' },
                    { key: 'relationships', label: 'Relationships', icon: '🔗' },
                    { key: 'health-scores', label: 'Health Scores', icon: '❤️' },
                    { key: 'account-plans', label: 'Account Plans', icon: '📋' }
                ]
            },
            {
                key: 'marketing', label: 'Marketing', icon: '📣',
                services: [
                    { key: 'campaigns', label: 'Campaigns', icon: '📣', isDefault: true },
                    { key: 'campaign-members', label: 'Members', icon: '👥' },
                    { key: 'email-templates', label: 'Email Templates', icon: '📧' },
                    { key: 'marketing-lists', label: 'Marketing Lists', icon: '📋' },
                    { key: 'campaign-responses', label: 'Responses', icon: '💬' },
                    { key: 'campaign-rois', label: 'Campaign ROI', icon: '📊' }
                ]
            },
            {
                key: 'service', label: 'Service', icon: '🎧',
                services: [
                    { key: 'cases', label: 'Cases', icon: '🎫', isDefault: true },
                    { key: 'case-comments', label: 'Comments', icon: '💬' },
                    { key: 'kb-articles', label: 'KB Articles', icon: '📚' },
                    { key: 'slas', label: 'SLAs', icon: '⏱️' },
                    { key: 'escalations', label: 'Escalations', icon: '🚨' },
                    { key: 'surveys', label: 'Surveys', icon: '📝' }
                ]
            },
            {
                key: 'fieldservice', label: 'Field Service', icon: '🔧',
                services: [
                    { key: 'service-orders', label: 'Service Orders', icon: '📋', isDefault: true },
                    { key: 'technicians', label: 'Technicians', icon: '👷' },
                    { key: 'service-contracts', label: 'Contracts', icon: '📄' },
                    { key: 'service-schedules', label: 'Schedules', icon: '📅' },
                    { key: 'service-parts', label: 'Parts', icon: '🔩' },
                    { key: 'service-visits', label: 'Visits', icon: '🚗' }
                ]
            }
        ]
    });
})();
