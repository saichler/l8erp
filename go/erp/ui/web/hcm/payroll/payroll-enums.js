/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Payroll Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Payroll = window.Payroll || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PAY_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Weekly', 'weekly'], ['Bi-Weekly', 'biweekly'],
        ['Bi-Weekly', 'bi-weekly'], ['Semi-Monthly', 'semimonthly'],
        ['Semi-Monthly', 'semi-monthly'], ['Monthly', 'monthly'], ['Annually', 'annually'],
        ['Annually', 'annual']
    ]);

    const PAY_COMPONENT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Earning', 'earning', 'layer8d-status-active'],
        ['Deduction', 'deduction', 'layer8d-status-terminated'],
        ['Tax', 'tax', 'layer8d-status-pending'],
        ['Employer Contribution', 'employer', 'layer8d-status-inactive'],
        ['Employer Contribution', 'contribution', 'layer8d-status-inactive']
    ]);

    const PAY_COMPONENT_CATEGORY = factory.simple([
        'Unspecified', 'Regular', 'Overtime', 'Bonus', 'Commission', 'PTO',
        'Holiday', 'Sick', 'Shift Differential', 'Tips',
        'Health Insurance', 'Dental Insurance', 'Vision Insurance',
        'Life Insurance', '401(k)', 'HSA', 'FSA',
        'Garnishment', 'Union Dues', 'Loan Repayment',
        'Federal Tax', 'State Tax', 'Local Tax',
        'Social Security', 'Medicare', 'FUTA', 'SUTA'
    ]);

    const CALCULATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Percentage', 'percentage'],
        ['Percentage', 'percent'], ['Hourly', 'hourly'], ['Formula', 'formula']
    ]);

    const PAYROLL_RUN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Pending Approval', 'pending', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Processing', 'processing', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated'],
        ['Error', 'error', 'layer8d-status-terminated']
    ]);

    const PAYROLL_RUN_TYPE = factory.withValues([
        ['Unspecified', null], ['Regular', 'regular'], ['Supplemental', 'supplemental'],
        ['Bonus', 'bonus'], ['Correction', 'correction'], ['Final', 'final']
    ]);

    const TAX_TYPE = factory.withValues([
        ['Unspecified', null], ['Federal Income', 'federal'], ['State Income', 'state'],
        ['Local Income', 'local'], ['Social Security', 'social'],
        ['Social Security', 'ss'], ['Medicare', 'medicare']
    ]);

    const FILING_STATUS = factory.withValues([
        ['Unspecified', null], ['Single', 'single'],
        ['Married Filing Jointly', 'married'], ['Married Filing Jointly', 'jointly'],
        ['Married Filing Separately', 'separately'],
        ['Head of Household', 'head'], ['Head of Household', 'household'],
        ['Qualifying Widow(er)', 'widow']
    ]);

    const ACCOUNT_TYPE = factory.withValues([
        ['Unspecified', null], ['Checking', 'checking'], ['Savings', 'savings']
    ]);

    const DEPOSIT_TYPE = factory.withValues([
        ['Unspecified', null], ['Full (Remainder)', 'full'], ['Full (Remainder)', 'remainder'],
        ['Fixed Amount', 'fixed'], ['Percentage', 'percentage'], ['Percentage', 'percent']
    ]);

    const GARNISHMENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Child Support', 'child'], ['Spousal Support', 'spousal'],
        ['Spousal Support', 'alimony'], ['Tax Levy', 'tax'], ['Tax Levy', 'levy'],
        ['Creditor', 'creditor'], ['Student Loan', 'student'], ['Student Loan', 'loan'],
        ['Bankruptcy', 'bankruptcy']
    ]);

    const GARNISHMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Suspended', 'suspended', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const YEAR_END_DOC_TYPE = factory.withValues([
        ['Unspecified', null], ['W-2', 'w2'], ['W-2', 'w-2'],
        ['W-2C', 'w2c'], ['W-2C', 'w-2c'],
        ['1099-MISC', '1099'], ['1099-MISC', '1099-misc'],
        ['1099-NEC', '1099-nec'], ['T4 (Canada)', 't4'], ['T4A (Canada)', 't4a']
    ]);

    const YEAR_END_DOC_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Generated', 'generated', 'layer8d-status-pending'],
        ['Issued', 'issued', 'layer8d-status-active'],
        ['Filed', 'filed', 'layer8d-status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Payroll.enums = {
        PAY_FREQUENCY: PAY_FREQUENCY.enum,
        PAY_FREQUENCY_VALUES: PAY_FREQUENCY.values,
        PAY_COMPONENT_TYPE: PAY_COMPONENT_TYPE.enum,
        PAY_COMPONENT_TYPE_VALUES: PAY_COMPONENT_TYPE.values,
        PAY_COMPONENT_CATEGORY: PAY_COMPONENT_CATEGORY.enum,
        CALCULATION_TYPE: CALCULATION_TYPE.enum,
        CALCULATION_TYPE_VALUES: CALCULATION_TYPE.values,
        PAYROLL_RUN_STATUS: PAYROLL_RUN_STATUS.enum,
        PAYROLL_RUN_STATUS_VALUES: PAYROLL_RUN_STATUS.values,
        PAYROLL_RUN_TYPE: PAYROLL_RUN_TYPE.enum,
        PAYROLL_RUN_TYPE_VALUES: PAYROLL_RUN_TYPE.values,
        TAX_TYPE: TAX_TYPE.enum,
        TAX_TYPE_VALUES: TAX_TYPE.values,
        FILING_STATUS: FILING_STATUS.enum,
        FILING_STATUS_VALUES: FILING_STATUS.values,
        ACCOUNT_TYPE: ACCOUNT_TYPE.enum,
        ACCOUNT_TYPE_VALUES: ACCOUNT_TYPE.values,
        DEPOSIT_TYPE: DEPOSIT_TYPE.enum,
        DEPOSIT_TYPE_VALUES: DEPOSIT_TYPE.values,
        GARNISHMENT_TYPE: GARNISHMENT_TYPE.enum,
        GARNISHMENT_TYPE_VALUES: GARNISHMENT_TYPE.values,
        GARNISHMENT_STATUS: GARNISHMENT_STATUS.enum,
        GARNISHMENT_STATUS_VALUES: GARNISHMENT_STATUS.values,
        YEAR_END_DOC_TYPE: YEAR_END_DOC_TYPE.enum,
        YEAR_END_DOC_TYPE_VALUES: YEAR_END_DOC_TYPE.values,
        YEAR_END_DOC_STATUS: YEAR_END_DOC_STATUS.enum,
        YEAR_END_DOC_STATUS_VALUES: YEAR_END_DOC_STATUS.values
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderComponentType = createStatusRenderer(PAY_COMPONENT_TYPE.enum, PAY_COMPONENT_TYPE.classes);
    const renderPayrollRunStatus = createStatusRenderer(PAYROLL_RUN_STATUS.enum, PAYROLL_RUN_STATUS.classes);
    const renderGarnishmentStatus = createStatusRenderer(GARNISHMENT_STATUS.enum, GARNISHMENT_STATUS.classes);
    const renderYearEndDocStatus = createStatusRenderer(YEAR_END_DOC_STATUS.enum, YEAR_END_DOC_STATUS.classes);

    window.Payroll.render = {
        payFrequency: (v) => renderEnum(v, PAY_FREQUENCY.enum),
        componentType: renderComponentType,
        componentCategory: (v) => renderEnum(v, PAY_COMPONENT_CATEGORY.enum),
        calculationType: (v) => renderEnum(v, CALCULATION_TYPE.enum),
        payrollRunStatus: renderPayrollRunStatus,
        payrollRunType: (v) => renderEnum(v, PAYROLL_RUN_TYPE.enum),
        taxType: (v) => renderEnum(v, TAX_TYPE.enum),
        filingStatus: (v) => renderEnum(v, FILING_STATUS.enum),
        accountType: (v) => renderEnum(v, ACCOUNT_TYPE.enum),
        depositType: (v) => renderEnum(v, DEPOSIT_TYPE.enum),
        garnishmentType: (v) => renderEnum(v, GARNISHMENT_TYPE.enum),
        garnishmentStatus: renderGarnishmentStatus,
        yearEndDocType: (v) => renderEnum(v, YEAR_END_DOC_TYPE.enum),
        yearEndDocStatus: renderYearEndDocStatus,
        money: renderMoney, boolean: renderBoolean, date: renderDate
    };

    window.Payroll._internal = {
        renderComponentType, renderPayrollRunStatus, renderGarnishmentStatus, renderYearEndDocStatus
    };

})();
