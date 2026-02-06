/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Financial Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    // Custom SVG with financial icons (dollar signs, chart bars, ledger lines)
    const finSvg = `
        <svg class="hcm-illustration" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="finGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <circle cx="200" cy="60" r="15" fill="url(#finGradient1)" opacity="0.6"/>
                <text x="200" y="66" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold" opacity="0.8">$</text>
                <rect x="385" y="55" width="6" height="20" rx="1" fill="url(#finGradient1)" opacity="0.5"/>
                <rect x="394" y="45" width="6" height="30" rx="1" fill="url(#finGradient1)" opacity="0.6"/>
                <rect x="403" y="50" width="6" height="25" rx="1" fill="url(#finGradient1)" opacity="0.5"/>
                <rect x="412" y="40" width="6" height="35" rx="1" fill="url(#finGradient1)" opacity="0.7"/>
                <circle cx="600" cy="60" r="18" fill="url(#finGradient1)" opacity="0.7"/>
                <text x="600" y="67" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold" opacity="0.8">$</text>
                <line x1="770" y1="45" x2="830" y2="45" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
                <line x1="770" y1="55" x2="830" y2="55" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
                <line x1="770" y1="65" x2="830" y2="65" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
                <line x1="770" y1="75" x2="830" y2="75" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
                <circle cx="800" cy="60" r="14" fill="url(#finGradient1)" opacity="0.5"/>
                <circle cx="1000" cy="60" r="16" fill="url(#finGradient1)" opacity="0.6"/>
                <text x="1000" y="67" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold" opacity="0.8">$</text>
            </g>
            <path d="M 215,60 Q 300,40 385,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 418,50 Q 500,70 582,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 618,60 Q 700,45 770,55" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <path d="M 830,60 Q 900,75 984,60" fill="none" stroke="#0ea5e9" stroke-width="1" opacity="0.3"/>
            <circle cx="300" cy="50" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="700" cy="55" r="3" fill="#0ea5e9" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/>
            </circle>
        </svg>`;

    Layer8SectionConfigs.register('financial', {
        title: 'Financial Management',
        subtitle: 'General Ledger, AP, AR, Cash, Assets, Budget & Tax',
        icon: '💰',
        svgContent: finSvg,
        initFn: 'initializeFIN',
        modules: [
            {
                key: 'general-ledger',
                label: 'General Ledger',
                icon: '📒',
                isDefault: true,
                services: [
                    { key: 'accounts', label: 'Accounts', icon: '📒', isDefault: true },
                    { key: 'journal-entries', label: 'Journal Entries', icon: '📝' },
                    { key: 'journal-entry-lines', label: 'Entry Lines', icon: '📋' },
                    { key: 'fiscal-years', label: 'Fiscal Years', icon: '📅' },
                    { key: 'fiscal-periods', label: 'Fiscal Periods', icon: '📆' },
                    { key: 'currencies', label: 'Currencies', icon: '💱' },
                    { key: 'exchange-rates', label: 'Exchange Rates', icon: '📈' },
                    { key: 'account-balances', label: 'Balances', icon: '💰' }
                ]
            },
            {
                key: 'accounts-payable',
                label: 'Accounts Payable',
                icon: '📤',
                services: [
                    { key: 'vendors', label: 'Vendors', icon: '🏢', isDefault: true },
                    { key: 'vendor-contacts', label: 'Vendor Contacts', icon: '👤' },
                    { key: 'purchase-invoices', label: 'Purchase Invoices', icon: '📄' },
                    { key: 'purchase-invoice-lines', label: 'Invoice Lines', icon: '📋' },
                    { key: 'payment-schedules', label: 'Payment Schedules', icon: '📅' },
                    { key: 'vendor-payments', label: 'Vendor Payments', icon: '💳' },
                    { key: 'payment-allocations', label: 'Payment Allocations', icon: '🔗' },
                    { key: 'vendor-statements', label: 'Vendor Statements', icon: '📊' }
                ]
            },
            {
                key: 'accounts-receivable',
                label: 'Accounts Receivable',
                icon: '📥',
                services: [
                    { key: 'customers', label: 'Customers', icon: '👥', isDefault: true },
                    { key: 'customer-contacts', label: 'Customer Contacts', icon: '👤' },
                    { key: 'sales-invoices', label: 'Sales Invoices', icon: '📄' },
                    { key: 'sales-invoice-lines', label: 'Invoice Lines', icon: '📋' },
                    { key: 'customer-payments', label: 'Customer Payments', icon: '💳' },
                    { key: 'payment-applications', label: 'Payment Applications', icon: '🔗' },
                    { key: 'credit-memos', label: 'Credit Memos', icon: '📝' },
                    { key: 'dunning-letters', label: 'Dunning Letters', icon: '📨' }
                ]
            },
            {
                key: 'cash',
                label: 'Cash Management',
                icon: '🏦',
                services: [
                    { key: 'bank-accounts', label: 'Bank Accounts', icon: '🏦', isDefault: true },
                    { key: 'bank-transactions', label: 'Transactions', icon: '💵' },
                    { key: 'bank-reconciliations', label: 'Reconciliations', icon: '✅' },
                    { key: 'cash-forecasts', label: 'Cash Forecasts', icon: '📊' },
                    { key: 'fund-transfers', label: 'Fund Transfers', icon: '🔄' },
                    { key: 'petty-cash', label: 'Petty Cash', icon: '💰' }
                ]
            },
            {
                key: 'fixed-assets',
                label: 'Fixed Assets',
                icon: '🏗️',
                services: [
                    { key: 'assets', label: 'Assets', icon: '🏗️', isDefault: true },
                    { key: 'asset-categories', label: 'Categories', icon: '📁' },
                    { key: 'depreciation-schedules', label: 'Depreciation', icon: '📉' },
                    { key: 'asset-disposals', label: 'Disposals', icon: '🗑️' },
                    { key: 'asset-transfers', label: 'Transfers', icon: '🔄' },
                    { key: 'asset-maintenance', label: 'Maintenance', icon: '🔧' },
                    { key: 'asset-revaluations', label: 'Revaluations', icon: '📊' }
                ]
            },
            {
                key: 'budgeting',
                label: 'Budgeting',
                icon: '📊',
                services: [
                    { key: 'budgets', label: 'Budgets', icon: '📊', isDefault: true },
                    { key: 'budget-lines', label: 'Budget Lines', icon: '📋' },
                    { key: 'budget-transfers', label: 'Budget Transfers', icon: '🔄' },
                    { key: 'budget-scenarios', label: 'Scenarios', icon: '🎯' },
                    { key: 'capital-expenditures', label: 'Capital Expenditures', icon: '🏗️' },
                    { key: 'forecasts', label: 'Forecasts', icon: '📈' }
                ]
            },
            {
                key: 'tax',
                label: 'Tax',
                icon: '🏛️',
                services: [
                    { key: 'tax-codes', label: 'Tax Codes', icon: '🏷️', isDefault: true },
                    { key: 'tax-jurisdictions', label: 'Jurisdictions', icon: '🌐' },
                    { key: 'tax-rules', label: 'Tax Rules', icon: '📜' },
                    { key: 'tax-returns', label: 'Tax Returns', icon: '📄' },
                    { key: 'tax-exemptions', label: 'Exemptions', icon: '✋' },
                    { key: 'withholding-tax-configs', label: 'Withholding Configs', icon: '⚙️' }
                ]
            }
        ]
    });
})();
