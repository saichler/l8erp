/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// FIN Module Configuration - Uses Layer8ModuleConfigFactory
Layer8ModuleConfigFactory.create({
    namespace: 'FIN',
    modules: {
        'general-ledger': {
            label: 'General Ledger', icon: '📒',
            services: [
                { key: 'accounts', label: 'Accounts', icon: '📒', endpoint: '/40/Account', model: 'Account' },
                { key: 'journal-entries', label: 'Journal Entries', icon: '📝', endpoint: '/40/JrnlEntry', model: 'JournalEntry' },
                { key: 'fiscal-years', label: 'Fiscal Years', icon: '📅', endpoint: '/40/FiscalYr', model: 'FiscalYear' },
                { key: 'currencies', label: 'Currencies', icon: '💱', endpoint: '/40/Currency', model: 'Currency' },
                { key: 'exchange-rates', label: 'Exchange Rates', icon: '📈', endpoint: '/40/XchgRate', model: 'ExchangeRate' }
            ]
        },
        'accounts-payable': {
            label: 'Accounts Payable', icon: '📤',
            services: [
                { key: 'vendors', label: 'Vendors', icon: '🏢', endpoint: '/40/Vendor', model: 'Vendor' },
                { key: 'purchase-invoices', label: 'Purchase Invoices', icon: '📄', endpoint: '/40/PurchInv', model: 'PurchaseInvoice' },
                { key: 'payment-schedules', label: 'Payment Schedules', icon: '📅', endpoint: '/40/PmtSched', model: 'PaymentSchedule' },
                { key: 'vendor-payments', label: 'Vendor Payments', icon: '💳', endpoint: '/40/VndrPmt', model: 'VendorPayment' },
                { key: 'vendor-statements', label: 'Vendor Statements', icon: '📊', endpoint: '/40/VndrStmt', model: 'VendorStatement' }
            ]
        },
        'accounts-receivable': {
            label: 'Accounts Receivable', icon: '📥',
            services: [
                { key: 'customers', label: 'Customers', icon: '👥', endpoint: '/40/Customer', model: 'Customer' },
                { key: 'sales-invoices', label: 'Sales Invoices', icon: '📄', endpoint: '/40/SalesInv', model: 'SalesInvoice' },
                { key: 'customer-payments', label: 'Customer Payments', icon: '💳', endpoint: '/40/CustPmt', model: 'CustomerPayment' },
                { key: 'credit-memos', label: 'Credit Memos', icon: '📝', endpoint: '/40/CrdtMemo', model: 'CreditMemo' },
                { key: 'dunning-letters', label: 'Dunning Letters', icon: '📨', endpoint: '/40/DunLtr', model: 'DunningLetter' }
            ]
        },
        'cash': {
            label: 'Cash Management', icon: '🏦',
            services: [
                { key: 'bank-accounts', label: 'Bank Accounts', icon: '🏦', endpoint: '/40/BankAcct', model: 'BankAccount' },
                { key: 'cash-forecasts', label: 'Cash Forecasts', icon: '📊', endpoint: '/40/CashFcst', model: 'CashForecast' },
                { key: 'fund-transfers', label: 'Fund Transfers', icon: '🔄', endpoint: '/40/FundXfer', model: 'FundTransfer' },
                { key: 'petty-cash', label: 'Petty Cash', icon: '💰', endpoint: '/40/PettyCash', model: 'PettyCash' }
            ]
        },
        'fixed-assets': {
            label: 'Fixed Assets', icon: '🏗️',
            services: [
                { key: 'assets', label: 'Assets', icon: '🏗️', endpoint: '/40/Asset', model: 'Asset' },
                { key: 'asset-categories', label: 'Categories', icon: '📁', endpoint: '/40/AstCat', model: 'AssetCategory' }
            ]
        },
        'budgeting': {
            label: 'Budgeting', icon: '📊',
            services: [
                { key: 'budgets', label: 'Budgets', icon: '📊', endpoint: '/40/Budget', model: 'Budget' },
                { key: 'capital-expenditures', label: 'Capital Expenditures', icon: '🏗️', endpoint: '/40/CapEx', model: 'CapitalExpenditure' },
                { key: 'forecasts', label: 'Forecasts', icon: '📈', endpoint: '/40/Forecast', model: 'Forecast' }
            ]
        },
        'tax': {
            label: 'Tax', icon: '🏛️',
            services: [
                { key: 'tax-codes', label: 'Tax Codes', icon: '🏷️', endpoint: '/40/TaxCode', model: 'TaxCode' },
                { key: 'tax-jurisdictions', label: 'Jurisdictions', icon: '🌐', endpoint: '/40/TaxJuris', model: 'TaxJurisdiction' },
                { key: 'tax-rules', label: 'Tax Rules', icon: '📜', endpoint: '/40/TaxRule', model: 'TaxRule' },
                { key: 'tax-exemptions', label: 'Exemptions', icon: '✋', endpoint: '/40/TaxExmpt', model: 'TaxExemption' }
            ]
        }
    },
    submodules: ['GeneralLedger', 'AccountsPayable', 'AccountsReceivable', 'CashManagement', 'FixedAssets', 'Budgeting', 'TaxManagement']
});
