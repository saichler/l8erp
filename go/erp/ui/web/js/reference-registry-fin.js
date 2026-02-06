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
/**
 * ERP Reference Registry - Financial Models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refFin = window.Layer8RefFactory;

window.Layer8DReferenceRegistryFIN = {
    // ========================================
    // Financial Management - General Ledger
    // ========================================
    ...refFin.coded('Account', 'accountId', 'accountNumber', 'name'),
    ...refFin.coded('FinAccount', 'accountId', 'accountNumber', 'name'),  // Alias for Account
    ...refFin.simple('JournalEntry', 'journalEntryId', 'entryNumber'),
    ...refFin.idOnly('JournalEntryLine', 'lineId'),
    ...refFin.batch([
        ['FiscalYear', 'fiscalYearId', 'yearName'],
        ['FiscalPeriod', 'fiscalPeriodId', 'periodName']
    ]),
    ...refFin.coded('Currency', 'currencyId', 'code', 'name'),
    ...refFin.batchIdOnly([
        ['ExchangeRate', 'exchangeRateId'],
        ['AccountBalance', 'balanceId']
    ]),

    // ========================================
    // Financial Management - Accounts Payable
    // ========================================
    ...refFin.coded('Vendor', 'vendorId', 'vendorNumber', 'name'),
    ...refFin.simple('VendorContact', 'contactId', 'contactName'),
    ...refFin.simple('PurchaseInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFin.idOnly('PurchaseInvoiceLine', 'lineId'),
    ...refFin.idOnly('PaymentSchedule', 'scheduleId'),
    ...refFin.simple('VendorPayment', 'paymentId', 'paymentNumber'),
    ...refFin.batchIdOnly([
        ['PaymentAllocation', 'allocationId'],
        ['VendorStatement', 'statementId']
    ]),

    // ========================================
    // Financial Management - Accounts Receivable
    // ========================================
    ...refFin.coded('Customer', 'customerId', 'customerNumber', 'name'),
    ...refFin.coded('SalesCustomer', 'customerId', 'customerNumber', 'name'),  // Alias for Customer
    ...refFin.simple('CustomerContact', 'contactId', 'contactName'),
    ...refFin.simple('SalesInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFin.idOnly('SalesInvoiceLine', 'lineId'),
    ...refFin.simple('CustomerPayment', 'paymentId', 'paymentNumber'),
    ...refFin.idOnly('PaymentApplication', 'applicationId'),
    ...refFin.simple('CreditMemo', 'creditMemoId', 'memoNumber'),
    ...refFin.idOnly('DunningLetter', 'letterId'),

    // ========================================
    // Financial Management - Cash Management
    // ========================================
    BankAccount: {
        idColumn: 'bankAccountId',
        displayColumn: 'accountName',
        selectColumns: ['bankAccountId', 'accountName', 'bankName'],
        displayFormat: function(item) {
            return item.bankName + ' - ' + item.accountName;
        },
        displayLabel: 'Bank Account'
    },
    ...refFin.batchIdOnly([
        ['BankTransaction', 'transactionId'],
        ['BankReconciliation', 'reconciliationId'],
        ['CashForecast', 'forecastId'],
        ['FundTransfer', 'transferId'],
        ['PettyCash', 'pettyCashId']
    ]),

    // ========================================
    // Financial Management - Fixed Assets
    // ========================================
    ...refFin.coded('Asset', 'assetId', 'assetNumber', 'name'),
    ...refFin.simple('AssetCategory', 'categoryId', 'name', 'Category'),
    ...refFin.batchIdOnly([
        ['DepreciationSchedule', 'scheduleId'],
        ['AssetDisposal', 'disposalId'],
        ['AssetTransfer', 'transferId'],
        ['AssetMaintenance', 'maintenanceId'],
        ['AssetRevaluation', 'revaluationId']
    ]),

    // ========================================
    // Financial Management - Budgeting
    // ========================================
    ...refFin.simple('Budget', 'budgetId', 'budgetName', 'Budget'),
    ...refFin.idOnly('BudgetLine', 'lineId'),
    ...refFin.idOnly('BudgetTransfer', 'transferId'),
    ...refFin.batch([
        ['BudgetScenario', 'scenarioId', 'name'],
        ['CapitalExpenditure', 'capexId', 'name']
    ]),
    ...refFin.idOnly('Forecast', 'forecastId'),

    // ========================================
    // Financial Management - Tax
    // ========================================
    ...refFin.coded('TaxCode', 'taxCodeId', 'code', 'name'),
    ...refFin.batch([
        ['TaxJurisdiction', 'jurisdictionId', 'name'],
        ['TaxRule', 'ruleId', 'name'],
        ['WithholdingTaxConfig', 'configId', 'name']
    ]),
    ...refFin.batchIdOnly([
        ['TaxReturn', 'returnId'],
        ['TaxExemption', 'exemptionId']
    ])
};
