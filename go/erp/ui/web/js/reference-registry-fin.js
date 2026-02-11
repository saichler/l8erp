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
    ...refFin.simple('FiscalYear', 'fiscalYearId', 'yearName'),
    ...refFin.coded('Currency', 'currencyId', 'code', 'name'),
    ...refFin.idOnly('ExchangeRate', 'exchangeRateId'),

    // ========================================
    // Financial Management - Accounts Payable
    // ========================================
    ...refFin.coded('Vendor', 'vendorId', 'vendorNumber', 'name'),
    ...refFin.simple('PurchaseInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFin.idOnly('PaymentSchedule', 'scheduleId'),
    ...refFin.simple('VendorPayment', 'paymentId', 'paymentNumber'),
    ...refFin.idOnly('VendorStatement', 'statementId'),

    // ========================================
    // Financial Management - Accounts Receivable
    // ========================================
    ...refFin.coded('Customer', 'customerId', 'customerNumber', 'name'),
    ...refFin.coded('SalesCustomer', 'customerId', 'customerNumber', 'name'),  // Alias for Customer
    ...refFin.simple('SalesInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFin.simple('CustomerPayment', 'paymentId', 'paymentNumber'),
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
        ['CashForecast', 'forecastId'],
        ['FundTransfer', 'transferId'],
        ['PettyCash', 'pettyCashId']
    ]),

    // ========================================
    // Financial Management - Fixed Assets
    // ========================================
    ...refFin.coded('Asset', 'assetId', 'assetNumber', 'name'),
    ...refFin.simple('AssetCategory', 'categoryId', 'name', 'Category'),

    // ========================================
    // Financial Management - Budgeting
    // ========================================
    ...refFin.simple('Budget', 'budgetId', 'budgetName', 'Budget'),
    ...refFin.simple('CapitalExpenditure', 'capexId', 'name'),
    ...refFin.idOnly('Forecast', 'forecastId'),

    // ========================================
    // Financial Management - Tax
    // ========================================
    ...refFin.coded('TaxCode', 'taxCodeId', 'code', 'name'),
    ...refFin.batch([
        ['TaxJurisdiction', 'jurisdictionId', 'name'],
        ['TaxRule', 'ruleId', 'name']
    ]),
    ...refFin.idOnly('TaxExemption', 'exemptionId')
};
