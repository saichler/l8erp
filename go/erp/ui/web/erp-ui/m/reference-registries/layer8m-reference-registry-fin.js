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
    ...refFinM.idOnly('JournalEntryLine', 'lineId'),
    ...refFinM.batch([
        ['FiscalYear', 'fiscalYearId', 'yearName'],
        ['FiscalPeriod', 'fiscalPeriodId', 'periodName']
    ]),
    ...refFinM.coded('Currency', 'currencyId', 'code', 'name'),
    ...refFinM.batchIdOnly([
        ['ExchangeRate', 'exchangeRateId'],
        ['AccountBalance', 'balanceId']
    ]),

    // ========================================
    // Accounts Payable
    // ========================================
    ...refFinM.coded('Vendor', 'vendorId', 'vendorNumber', 'name'),
    ...refFinM.simple('VendorContact', 'contactId', 'contactName'),
    ...refFinM.simple('PurchaseInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFinM.idOnly('PurchaseInvoiceLine', 'lineId'),
    ...refFinM.idOnly('PaymentSchedule', 'scheduleId'),
    ...refFinM.simple('VendorPayment', 'paymentId', 'paymentNumber'),
    ...refFinM.batchIdOnly([
        ['PaymentAllocation', 'allocationId'],
        ['VendorStatement', 'statementId']
    ]),

    // ========================================
    // Accounts Receivable
    // ========================================
    ...refFinM.coded('Customer', 'customerId', 'customerNumber', 'name'),
    ...refFinM.coded('SalesCustomer', 'customerId', 'customerNumber', 'name'),
    ...refFinM.simple('CustomerContact', 'contactId', 'contactName'),
    ...refFinM.simple('SalesInvoice', 'invoiceId', 'invoiceNumber'),
    ...refFinM.idOnly('SalesInvoiceLine', 'lineId'),
    ...refFinM.simple('CustomerPayment', 'paymentId', 'paymentNumber'),
    ...refFinM.idOnly('PaymentApplication', 'applicationId'),
    ...refFinM.simple('CreditMemo', 'creditMemoId', 'memoNumber'),
    ...refFinM.idOnly('DunningLetter', 'letterId'),

    // ========================================
    // Cash Management
    // ========================================
    ...refFinM.simple('BankAccount', 'bankAccountId', 'accountName'),
    ...refFinM.batchIdOnly([
        ['BankTransaction', 'transactionId'],
        ['BankReconciliation', 'reconciliationId'],
        ['CashForecast', 'forecastId'],
        ['FundTransfer', 'transferId'],
        ['PettyCash', 'pettyCashId']
    ]),

    // ========================================
    // Fixed Assets
    // ========================================
    ...refFinM.coded('Asset', 'assetId', 'assetNumber', 'name'),
    ...refFinM.simple('AssetCategory', 'categoryId', 'name', 'Category'),
    ...refFinM.batchIdOnly([
        ['DepreciationSchedule', 'scheduleId'],
        ['AssetDisposal', 'disposalId'],
        ['AssetTransfer', 'transferId'],
        ['AssetMaintenance', 'maintenanceId'],
        ['AssetRevaluation', 'revaluationId']
    ]),

    // ========================================
    // Budgeting
    // ========================================
    ...refFinM.simple('Budget', 'budgetId', 'budgetName', 'Budget'),
    ...refFinM.idOnly('BudgetLine', 'lineId'),
    ...refFinM.idOnly('BudgetTransfer', 'transferId'),
    ...refFinM.batch([
        ['BudgetScenario', 'scenarioId', 'name'],
        ['CapitalExpenditure', 'capexId', 'name']
    ]),
    ...refFinM.idOnly('Forecast', 'forecastId'),

    // ========================================
    // Tax
    // ========================================
    ...refFinM.coded('TaxCode', 'taxCodeId', 'code', 'name'),
    ...refFinM.batch([
        ['TaxJurisdiction', 'jurisdictionId', 'name'],
        ['TaxRule', 'ruleId', 'name'],
        ['WithholdingTaxConfig', 'configId', 'name']
    ]),
    ...refFinM.batchIdOnly([
        ['TaxReturn', 'returnId'],
        ['TaxExemption', 'exemptionId']
    ])
};

// Register with the central registry
Layer8MReferenceRegistry.register(window.Layer8MReferenceRegistryFIN);
