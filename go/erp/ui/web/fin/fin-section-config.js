/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Financial Section Configuration for Layer8SectionGenerator
(function() {
    'use strict';

    Layer8SectionConfigs.register('financial', {
        title: 'Financial Management',
        subtitle: 'General Ledger, AP, AR, Cash, Assets, Budget & Tax',
        icon: '💰',
        svgContent: Layer8SvgFactory.generate('financial'),
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
