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
 * Shared Reference Data - Financial Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataFin = {
        // ========================================
        // Financial Management - General Ledger
        // ========================================
        ...ref.coded('Account', 'accountId', 'accountNumber', 'name'),
        ...ref.coded('FinAccount', 'accountId', 'accountNumber', 'name'),  // Alias
        ...ref.simple('JournalEntry', 'journalEntryId', 'entryNumber'),
        ...ref.simple('FiscalYear', 'fiscalYearId', 'yearName'),
        ...ref.coded('Currency', 'currencyId', 'code', 'name'),
        ...ref.idOnly('ExchangeRate', 'exchangeRateId'),

        // ========================================
        // Financial Management - Accounts Payable
        // ========================================
        ...ref.coded('Vendor', 'vendorId', 'vendorNumber', 'name'),
        ...ref.simple('PurchaseInvoice', 'invoiceId', 'invoiceNumber'),
        ...ref.idOnly('PaymentSchedule', 'scheduleId'),
        ...ref.simple('VendorPayment', 'paymentId', 'paymentNumber'),
        ...ref.idOnly('VendorStatement', 'statementId'),

        // ========================================
        // Financial Management - Accounts Receivable
        // ========================================
        ...ref.coded('Customer', 'customerId', 'customerNumber', 'name'),
        ...ref.coded('SalesCustomer', 'customerId', 'customerNumber', 'name'),  // Alias
        ...ref.simple('SalesInvoice', 'invoiceId', 'invoiceNumber'),
        ...ref.simple('CustomerPayment', 'paymentId', 'paymentNumber'),
        ...ref.simple('CreditMemo', 'creditMemoId', 'memoNumber'),
        ...ref.idOnly('DunningLetter', 'letterId'),

        // ========================================
        // Financial Management - Cash Management
        // ========================================
        ...ref.idOnly('CashForecast', 'forecastId'),
        ...ref.idOnly('FundTransfer', 'transferId'),
        ...ref.idOnly('PettyCash', 'pettyCashId'),

        // ========================================
        // Financial Management - Fixed Assets
        // ========================================
        ...ref.coded('Asset', 'assetId', 'assetNumber', 'name'),
        ...ref.simple('AssetCategory', 'categoryId', 'name', 'Category'),

        // ========================================
        // Financial Management - Budgeting
        // ========================================
        ...ref.simple('Budget', 'budgetId', 'budgetName', 'Budget'),
        ...ref.simple('CapitalExpenditure', 'capexId', 'name'),
        ...ref.idOnly('Forecast', 'forecastId'),

        // ========================================
        // Financial Management - Tax
        // ========================================
        ...ref.coded('TaxCode', 'taxCodeId', 'code', 'name'),
        ...ref.simple('TaxJurisdiction', 'jurisdictionId', 'name'),
        ...ref.simple('TaxRule', 'ruleId', 'name'),
        ...ref.idOnly('TaxExemption', 'exemptionId')
    };
})();
