/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// FIN Module - Configuration
// Module definitions and service mappings

(function() {
    'use strict';

    // Create FIN namespace
    window.FIN = window.FIN || {};

    // FIN Module Configuration
    FIN.modules = {
        'general-ledger': {
            label: 'General Ledger',
            icon: '📒',
            services: [
                { key: 'accounts', label: 'Accounts', icon: '📒', endpoint: '/erp/31/Account', model: 'Account' },
                { key: 'journal-entries', label: 'Journal Entries', icon: '📝', endpoint: '/erp/31/JrnlEntry', model: 'JournalEntry' },
                { key: 'journal-entry-lines', label: 'Entry Lines', icon: '📋', endpoint: '/erp/31/JrnlLine', model: 'JournalEntryLine' },
                { key: 'fiscal-years', label: 'Fiscal Years', icon: '📅', endpoint: '/erp/31/FiscalYr', model: 'FiscalYear' },
                { key: 'fiscal-periods', label: 'Fiscal Periods', icon: '📆', endpoint: '/erp/31/FiscalPd', model: 'FiscalPeriod' },
                { key: 'currencies', label: 'Currencies', icon: '💱', endpoint: '/erp/31/Currency', model: 'Currency' },
                { key: 'exchange-rates', label: 'Exchange Rates', icon: '📈', endpoint: '/erp/31/XchgRate', model: 'ExchangeRate' },
                { key: 'account-balances', label: 'Balances', icon: '💰', endpoint: '/erp/31/AcctBal', model: 'AccountBalance' }
            ]
        },
        'accounts-payable': {
            label: 'Accounts Payable',
            icon: '📤',
            services: [
                { key: 'vendors', label: 'Vendors', icon: '🏢', endpoint: '/erp/31/Vendor', model: 'Vendor' },
                { key: 'vendor-contacts', label: 'Vendor Contacts', icon: '👤', endpoint: '/erp/31/VndrCont', model: 'VendorContact' },
                { key: 'purchase-invoices', label: 'Purchase Invoices', icon: '📄', endpoint: '/erp/31/PurchInv', model: 'PurchaseInvoice' },
                { key: 'purchase-invoice-lines', label: 'Invoice Lines', icon: '📋', endpoint: '/erp/31/PurchLine', model: 'PurchaseInvoiceLine' },
                { key: 'payment-schedules', label: 'Payment Schedules', icon: '📅', endpoint: '/erp/31/PmtSched', model: 'PaymentSchedule' },
                { key: 'vendor-payments', label: 'Vendor Payments', icon: '💳', endpoint: '/erp/31/VndrPmt', model: 'VendorPayment' },
                { key: 'payment-allocations', label: 'Payment Allocations', icon: '🔗', endpoint: '/erp/31/PmtAlloc', model: 'PaymentAllocation' },
                { key: 'vendor-statements', label: 'Vendor Statements', icon: '📊', endpoint: '/erp/31/VndrStmt', model: 'VendorStatement' }
            ]
        },
        'accounts-receivable': {
            label: 'Accounts Receivable',
            icon: '📥',
            services: [
                { key: 'customers', label: 'Customers', icon: '👥', endpoint: '/erp/31/Customer', model: 'Customer' },
                { key: 'customer-contacts', label: 'Customer Contacts', icon: '👤', endpoint: '/erp/31/CustCont', model: 'CustomerContact' },
                { key: 'sales-invoices', label: 'Sales Invoices', icon: '📄', endpoint: '/erp/31/SalesInv', model: 'SalesInvoice' },
                { key: 'sales-invoice-lines', label: 'Invoice Lines', icon: '📋', endpoint: '/erp/31/SalesLine', model: 'SalesInvoiceLine' },
                { key: 'customer-payments', label: 'Customer Payments', icon: '💳', endpoint: '/erp/31/CustPmt', model: 'CustomerPayment' },
                { key: 'payment-applications', label: 'Payment Applications', icon: '🔗', endpoint: '/erp/31/PmtApp', model: 'PaymentApplication' },
                { key: 'credit-memos', label: 'Credit Memos', icon: '📝', endpoint: '/erp/31/CrdtMemo', model: 'CreditMemo' },
                { key: 'dunning-letters', label: 'Dunning Letters', icon: '📨', endpoint: '/erp/31/DunLtr', model: 'DunningLetter' }
            ]
        },
        'cash': {
            label: 'Cash Management',
            icon: '🏦',
            services: [
                { key: 'bank-accounts', label: 'Bank Accounts', icon: '🏦', endpoint: '/erp/31/BankAcct', model: 'BankAccount' },
                { key: 'bank-transactions', label: 'Transactions', icon: '💵', endpoint: '/erp/31/BankTxn', model: 'BankTransaction' },
                { key: 'bank-reconciliations', label: 'Reconciliations', icon: '✅', endpoint: '/erp/31/BankRec', model: 'BankReconciliation' },
                { key: 'cash-forecasts', label: 'Cash Forecasts', icon: '📊', endpoint: '/erp/31/CashFcst', model: 'CashForecast' },
                { key: 'fund-transfers', label: 'Fund Transfers', icon: '🔄', endpoint: '/erp/31/FundXfer', model: 'FundTransfer' },
                { key: 'petty-cash', label: 'Petty Cash', icon: '💰', endpoint: '/erp/31/PettyCash', model: 'PettyCash' }
            ]
        },
        'fixed-assets': {
            label: 'Fixed Assets',
            icon: '🏗️',
            services: [
                { key: 'assets', label: 'Assets', icon: '🏗️', endpoint: '/erp/31/Asset', model: 'Asset' },
                { key: 'asset-categories', label: 'Categories', icon: '📁', endpoint: '/erp/31/AstCat', model: 'AssetCategory' },
                { key: 'depreciation-schedules', label: 'Depreciation', icon: '📉', endpoint: '/erp/31/DeprSched', model: 'DepreciationSchedule' },
                { key: 'asset-disposals', label: 'Disposals', icon: '🗑️', endpoint: '/erp/31/AstDisp', model: 'AssetDisposal' },
                { key: 'asset-transfers', label: 'Transfers', icon: '🔄', endpoint: '/erp/31/AstXfer', model: 'AssetTransfer' },
                { key: 'asset-maintenance', label: 'Maintenance', icon: '🔧', endpoint: '/erp/31/AstMaint', model: 'AssetMaintenance' },
                { key: 'asset-revaluations', label: 'Revaluations', icon: '📊', endpoint: '/erp/31/AstReval', model: 'AssetRevaluation' }
            ]
        },
        'budgeting': {
            label: 'Budgeting',
            icon: '📊',
            services: [
                { key: 'budgets', label: 'Budgets', icon: '📊', endpoint: '/erp/31/Budget', model: 'Budget' },
                { key: 'budget-lines', label: 'Budget Lines', icon: '📋', endpoint: '/erp/31/BdgtLine', model: 'BudgetLine' },
                { key: 'budget-transfers', label: 'Budget Transfers', icon: '🔄', endpoint: '/erp/31/BdgtXfer', model: 'BudgetTransfer' },
                { key: 'budget-scenarios', label: 'Scenarios', icon: '🎯', endpoint: '/erp/31/BdgtScen', model: 'BudgetScenario' },
                { key: 'capital-expenditures', label: 'Capital Expenditures', icon: '🏗️', endpoint: '/erp/31/CapEx', model: 'CapitalExpenditure' },
                { key: 'forecasts', label: 'Forecasts', icon: '📈', endpoint: '/erp/31/Forecast', model: 'Forecast' }
            ]
        },
        'tax': {
            label: 'Tax',
            icon: '🏛️',
            services: [
                { key: 'tax-codes', label: 'Tax Codes', icon: '🏷️', endpoint: '/erp/31/TaxCode', model: 'TaxCode' },
                { key: 'tax-jurisdictions', label: 'Jurisdictions', icon: '🌐', endpoint: '/erp/31/TaxJuris', model: 'TaxJurisdiction' },
                { key: 'tax-rules', label: 'Tax Rules', icon: '📜', endpoint: '/erp/31/TaxRule', model: 'TaxRule' },
                { key: 'tax-returns', label: 'Tax Returns', icon: '📄', endpoint: '/erp/31/TaxRtn', model: 'TaxReturn' },
                { key: 'tax-exemptions', label: 'Exemptions', icon: '✋', endpoint: '/erp/31/TaxExmpt', model: 'TaxExemption' },
                { key: 'withholding-tax-configs', label: 'Withholding Configs', icon: '⚙️', endpoint: '/erp/31/WhtTxCfg', model: 'WithholdingTaxConfig' }
            ]
        }
    };

    // Render status badge (uses shared erp-status-* classes)
    FIN.renderStatus = function(status) {
        const statusMap = {
            1: { label: 'Active', class: 'erp-status-active' },
            0: { label: 'Inactive', class: 'erp-status-inactive' },
            2: { label: 'Pending', class: 'erp-status-pending' },
            3: { label: 'Closed', class: 'erp-status-terminated' }
        };

        const config = statusMap[status] || { label: status, class: '' };
        return `<span class="erp-status ${config.class}">${ERPUtils.escapeHtml(config.label)}</span>`;
    };

})();
