/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Reference Registry - FIN Module
 * Reference configurations for Financial Management models
 * Uses Layer8RefFactory for reduced boilerplate
 */
const refFinM = window.Layer8RefFactory;

window.Layer8MReferenceRegistryFIN = {
    // ========================================
    // General Ledger
    // ========================================
    ...refFinM.coded('Account', 'accountId', 'accountNumber', 'name'),
    ...refFinM.coded('FinAccount', 'accountId', 'accountNumber', 'name'),
    ...refFinM.simple('JournalEntry', 'journalEntryId', 'entryNumber'),
    ...refFinM.simple('FiscalYear', 'fiscalYearId', 'yearName'),
    ...refFinM.coded('Currency', 'currencyId', 'code', 'name'),
    ...refFinM.idOnly('ExchangeRate', 'exchangeRateId'),

    // ========================================
    // Accounts Payable
    // ========================================
    ...refFinM.coded('Vendor', 'vendorId', 'vendorNumber', 'name'),
    ...refFinM.simple('PurchaseInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFinM.idOnly('PaymentSchedule', 'scheduleId'),
    ...refFinM.simple('VendorPayment', 'paymentId', 'paymentNumber'),
    ...refFinM.idOnly('VendorStatement', 'statementId'),

    // ========================================
    // Accounts Receivable
    // ========================================
    ...refFinM.coded('Customer', 'customerId', 'customerNumber', 'name'),
    ...refFinM.coded('SalesCustomer', 'customerId', 'customerNumber', 'name'),
    ...refFinM.simple('SalesInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFinM.simple('CustomerPayment', 'paymentId', 'paymentNumber'),
    ...refFinM.simple('CreditMemo', 'creditMemoId', 'memoNumber'),
    ...refFinM.idOnly('DunningLetter', 'letterId'),

    // ========================================
    // Cash Management
    // ========================================
    ...refFinM.simple('BankAccount', 'bankAccountId', 'accountName'),
    ...refFinM.batchIdOnly([
        ['CashForecast', 'forecastId'],
        ['FundTransfer', 'transferId'],
        ['PettyCash', 'pettyCashId']
    ]),

    // ========================================
    // Fixed Assets
    // ========================================
    ...refFinM.coded('Asset', 'assetId', 'assetNumber', 'name'),
    ...refFinM.simple('AssetCategory', 'categoryId', 'name', 'Category'),

    // ========================================
    // Budgeting
    // ========================================
    ...refFinM.simple('Budget', 'budgetId', 'budgetName', 'Budget'),
    ...refFinM.simple('CapitalExpenditure', 'capexId', 'name'),
    ...refFinM.idOnly('Forecast', 'forecastId'),

    // ========================================
    // Tax
    // ========================================
    ...refFinM.coded('TaxCode', 'taxCodeId', 'code', 'name'),
    ...refFinM.batch([
        ['TaxJurisdiction', 'jurisdictionId', 'name'],
        ['TaxRule', 'ruleId', 'name']
    ]),
    ...refFinM.idOnly('TaxExemption', 'exemptionId')
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryFIN);
