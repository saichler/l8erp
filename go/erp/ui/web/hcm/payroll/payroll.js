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
// Payroll Module - Column Configurations and Form Definitions
// Handles: PayStructure, PayComponent, PayrollRun, Payslip, TaxWithholding, DirectDeposit, Garnishment, YearEndDocument

(function() {
    'use strict';

    // Use shared utilities
    const { formatMoney } = ERPUtils;
    const { renderEnum, renderStatus, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PAY_FREQUENCY = {
        0: 'Unspecified',
        1: 'Weekly',
        2: 'Bi-Weekly',
        3: 'Semi-Monthly',
        4: 'Monthly',
        5: 'Annually'
    };

    const PAY_FREQUENCY_VALUES = {
        'weekly': 1,
        'biweekly': 2,
        'bi-weekly': 2,
        'semimonthly': 3,
        'semi-monthly': 3,
        'monthly': 4,
        'annually': 5,
        'annual': 5
    };

    const PAY_COMPONENT_TYPE = {
        0: 'Unspecified',
        1: 'Earning',
        2: 'Deduction',
        3: 'Tax',
        4: 'Employer Contribution'
    };

    const PAY_COMPONENT_TYPE_VALUES = {
        'earning': 1,
        'deduction': 2,
        'tax': 3,
        'employer': 4,
        'contribution': 4
    };

    const PAY_COMPONENT_TYPE_CLASSES = {
        1: 'erp-status-active',      // Earning - green
        2: 'erp-status-terminated',  // Deduction - red
        3: 'erp-status-pending',     // Tax - orange
        4: 'erp-status-inactive'     // Employer - gray
    };

    const PAY_COMPONENT_CATEGORY = {
        0: 'Unspecified',
        1: 'Regular', 2: 'Overtime', 3: 'Bonus', 4: 'Commission', 5: 'PTO',
        6: 'Holiday', 7: 'Sick', 8: 'Shift Differential', 9: 'Tips',
        20: 'Health Insurance', 21: 'Dental Insurance', 22: 'Vision Insurance',
        23: 'Life Insurance', 24: '401(k)', 25: 'HSA', 26: 'FSA',
        27: 'Garnishment', 28: 'Union Dues', 29: 'Loan Repayment',
        40: 'Federal Tax', 41: 'State Tax', 42: 'Local Tax',
        43: 'Social Security', 44: 'Medicare', 45: 'FUTA', 46: 'SUTA'
    };

    const CALCULATION_TYPE = {
        0: 'Unspecified', 1: 'Fixed', 2: 'Percentage', 3: 'Hourly', 4: 'Formula'
    };

    const CALCULATION_TYPE_VALUES = {
        'fixed': 1, 'percentage': 2, 'percent': 2, 'hourly': 3, 'formula': 4
    };

    const PAYROLL_RUN_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Approved',
        4: 'Processing', 5: 'Completed', 6: 'Cancelled', 7: 'Error'
    };

    const PAYROLL_RUN_STATUS_VALUES = {
        'draft': 1, 'pending': 2, 'approved': 3, 'processing': 4,
        'completed': 5, 'cancelled': 6, 'error': 7
    };

    const PAYROLL_RUN_STATUS_CLASSES = {
        1: 'erp-status-inactive', 2: 'erp-status-pending', 3: 'erp-status-active',
        4: 'erp-status-pending', 5: 'erp-status-active', 6: 'erp-status-terminated',
        7: 'erp-status-terminated'
    };

    const PAYROLL_RUN_TYPE = {
        0: 'Unspecified', 1: 'Regular', 2: 'Supplemental', 3: 'Bonus', 4: 'Correction', 5: 'Final'
    };

    const PAYROLL_RUN_TYPE_VALUES = {
        'regular': 1, 'supplemental': 2, 'bonus': 3, 'correction': 4, 'final': 5
    };

    const TAX_TYPE = {
        0: 'Unspecified', 1: 'Federal Income', 2: 'State Income', 3: 'Local Income',
        4: 'Social Security', 5: 'Medicare'
    };

    const TAX_TYPE_VALUES = {
        'federal': 1, 'state': 2, 'local': 3, 'social': 4, 'ss': 4, 'medicare': 5
    };

    const FILING_STATUS = {
        0: 'Unspecified', 1: 'Single', 2: 'Married Filing Jointly',
        3: 'Married Filing Separately', 4: 'Head of Household', 5: 'Qualifying Widow(er)'
    };

    const FILING_STATUS_VALUES = {
        'single': 1, 'married': 2, 'jointly': 2, 'separately': 3, 'head': 4, 'household': 4, 'widow': 5
    };

    const ACCOUNT_TYPE = { 0: 'Unspecified', 1: 'Checking', 2: 'Savings' };
    const ACCOUNT_TYPE_VALUES = { 'checking': 1, 'savings': 2 };

    const DEPOSIT_TYPE = { 0: 'Unspecified', 1: 'Full (Remainder)', 2: 'Fixed Amount', 3: 'Percentage' };
    const DEPOSIT_TYPE_VALUES = { 'full': 1, 'remainder': 1, 'fixed': 2, 'percentage': 3, 'percent': 3 };

    const GARNISHMENT_TYPE = {
        0: 'Unspecified', 1: 'Child Support', 2: 'Spousal Support', 3: 'Tax Levy',
        4: 'Creditor', 5: 'Student Loan', 6: 'Bankruptcy'
    };

    const GARNISHMENT_TYPE_VALUES = {
        'child': 1, 'spousal': 2, 'alimony': 2, 'tax': 3, 'levy': 3,
        'creditor': 4, 'student': 5, 'loan': 5, 'bankruptcy': 6
    };

    const GARNISHMENT_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Suspended', 3: 'Completed', 4: 'Cancelled' };
    const GARNISHMENT_STATUS_VALUES = { 'active': 1, 'suspended': 2, 'completed': 3, 'cancelled': 4 };
    const GARNISHMENT_STATUS_CLASSES = {
        1: 'erp-status-active', 2: 'erp-status-pending', 3: 'erp-status-inactive', 4: 'erp-status-terminated'
    };

    const YEAR_END_DOC_TYPE = {
        0: 'Unspecified', 1: 'W-2', 2: 'W-2C', 3: '1099-MISC', 4: '1099-NEC', 5: 'T4 (Canada)', 6: 'T4A (Canada)'
    };

    const YEAR_END_DOC_TYPE_VALUES = {
        'w2': 1, 'w-2': 1, 'w2c': 2, 'w-2c': 2, '1099': 3, '1099-misc': 3, '1099-nec': 4, 't4': 5, 't4a': 6
    };

    const YEAR_END_DOC_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Generated', 3: 'Issued', 4: 'Filed' };
    const YEAR_END_DOC_STATUS_VALUES = { 'draft': 1, 'generated': 2, 'issued': 3, 'filed': 4 };
    const YEAR_END_DOC_STATUS_CLASSES = {
        1: 'erp-status-inactive', 2: 'erp-status-pending', 3: 'erp-status-active', 4: 'erp-status-active'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderComponentType = createStatusRenderer(PAY_COMPONENT_TYPE, PAY_COMPONENT_TYPE_CLASSES);
    const renderPayrollRunStatus = createStatusRenderer(PAYROLL_RUN_STATUS, PAYROLL_RUN_STATUS_CLASSES);
    const renderGarnishmentStatus = createStatusRenderer(GARNISHMENT_STATUS, GARNISHMENT_STATUS_CLASSES);
    const renderYearEndDocStatus = createStatusRenderer(YEAR_END_DOC_STATUS, YEAR_END_DOC_STATUS_CLASSES);

    // Simple enum renderers
    const renderPayFrequency = (freq) => renderEnum(freq, PAY_FREQUENCY);
    const renderComponentCategory = (cat) => renderEnum(cat, PAY_COMPONENT_CATEGORY);
    const renderCalculationType = (type) => renderEnum(type, CALCULATION_TYPE);
    const renderPayrollRunType = (type) => renderEnum(type, PAYROLL_RUN_TYPE);
    const renderTaxType = (type) => renderEnum(type, TAX_TYPE);
    const renderFilingStatus = (status) => renderEnum(status, FILING_STATUS);
    const renderAccountType = (type) => renderEnum(type, ACCOUNT_TYPE);
    const renderDepositType = (type) => renderEnum(type, DEPOSIT_TYPE);
    const renderGarnishmentType = (type) => renderEnum(type, GARNISHMENT_TYPE);
    const renderYearEndDocType = (type) => renderEnum(type, YEAR_END_DOC_TYPE);

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const PAYROLL_COLUMNS = {
        PayStructure: [
            { key: 'payStructureId', label: 'ID', sortKey: 'payStructureId', filterKey: 'payStructureId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'currencyCode', label: 'Currency', sortKey: 'currencyCode', filterKey: 'currencyCode' },
            { key: 'payFrequency', label: 'Frequency', sortKey: 'payFrequency', filterKey: 'payFrequency', enumValues: PAY_FREQUENCY_VALUES, render: (item) => renderPayFrequency(item.payFrequency) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => renderBoolean(item.isActive) }
        ],

        PayComponent: [
            { key: 'componentId', label: 'ID', sortKey: 'componentId', filterKey: 'componentId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'componentType', label: 'Type', sortKey: 'componentType', filterKey: 'componentType', enumValues: PAY_COMPONENT_TYPE_VALUES, render: (item) => renderComponentType(item.componentType) },
            { key: 'calculationType', label: 'Calculation', sortKey: 'calculationType', filterKey: 'calculationType', enumValues: CALCULATION_TYPE_VALUES, render: (item) => renderCalculationType(item.calculationType) },
            { key: 'isTaxable', label: 'Taxable', sortKey: 'isTaxable', render: (item) => renderBoolean(item.isTaxable) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => renderBoolean(item.isActive) }
        ],

        PayrollRun: [
            { key: 'payrollRunId', label: 'ID', sortKey: 'payrollRunId', filterKey: 'payrollRunId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'runType', label: 'Type', sortKey: 'runType', filterKey: 'runType', enumValues: PAYROLL_RUN_TYPE_VALUES, render: (item) => renderPayrollRunType(item.runType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: PAYROLL_RUN_STATUS_VALUES, render: (item) => renderPayrollRunStatus(item.status) },
            { key: 'paymentDate', label: 'Payment Date', sortKey: 'paymentDate', render: (item) => renderDate(item.paymentDate) },
            { key: 'employeeCount', label: 'Employees', sortKey: 'employeeCount' },
            { key: 'totalNet', label: 'Total Net', sortKey: 'totalNet', render: (item) => renderMoney(item.totalNet) }
        ],

        Payslip: [
            { key: 'payslipId', label: 'ID', sortKey: 'payslipId', filterKey: 'payslipId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'payrollRunId', label: 'Payroll Run', sortKey: 'payrollRunId', filterKey: 'payrollRunId' },
            { key: 'paymentDate', label: 'Payment Date', sortKey: 'paymentDate', render: (item) => renderDate(item.paymentDate) },
            { key: 'grossPay', label: 'Gross', sortKey: 'grossPay', render: (item) => renderMoney(item.grossPay) },
            { key: 'totalDeductions', label: 'Deductions', sortKey: 'totalDeductions', render: (item) => renderMoney(item.totalDeductions) },
            { key: 'netPay', label: 'Net Pay', sortKey: 'netPay', render: (item) => renderMoney(item.netPay) }
        ],

        TaxWithholding: [
            { key: 'withholdingId', label: 'ID', sortKey: 'withholdingId', filterKey: 'withholdingId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'taxType', label: 'Tax Type', sortKey: 'taxType', filterKey: 'taxType', enumValues: TAX_TYPE_VALUES, render: (item) => renderTaxType(item.taxType) },
            { key: 'taxJurisdiction', label: 'Jurisdiction', sortKey: 'taxJurisdiction', filterKey: 'taxJurisdiction' },
            { key: 'filingStatus', label: 'Filing Status', sortKey: 'filingStatus', filterKey: 'filingStatus', enumValues: FILING_STATUS_VALUES, render: (item) => renderFilingStatus(item.filingStatus) },
            { key: 'exempt', label: 'Exempt', sortKey: 'exempt', render: (item) => renderBoolean(item.exempt) }
        ],

        DirectDeposit: [
            { key: 'directDepositId', label: 'ID', sortKey: 'directDepositId', filterKey: 'directDepositId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'bankName', label: 'Bank', sortKey: 'bankName', filterKey: 'bankName' },
            { key: 'accountNumberMasked', label: 'Account', sortKey: 'accountNumberMasked' },
            { key: 'accountType', label: 'Type', sortKey: 'accountType', filterKey: 'accountType', enumValues: ACCOUNT_TYPE_VALUES, render: (item) => renderAccountType(item.accountType) },
            { key: 'depositType', label: 'Deposit', sortKey: 'depositType', filterKey: 'depositType', enumValues: DEPOSIT_TYPE_VALUES, render: (item) => renderDepositType(item.depositType) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => renderBoolean(item.isActive) }
        ],

        Garnishment: [
            { key: 'garnishmentId', label: 'ID', sortKey: 'garnishmentId', filterKey: 'garnishmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'garnishmentType', label: 'Type', sortKey: 'garnishmentType', filterKey: 'garnishmentType', enumValues: GARNISHMENT_TYPE_VALUES, render: (item) => renderGarnishmentType(item.garnishmentType) },
            { key: 'caseNumber', label: 'Case #', sortKey: 'caseNumber', filterKey: 'caseNumber' },
            { key: 'payeeName', label: 'Payee', sortKey: 'payeeName', filterKey: 'payeeName' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: GARNISHMENT_STATUS_VALUES, render: (item) => renderGarnishmentStatus(item.status) },
            { key: 'amountPerPeriod', label: 'Per Period', sortKey: 'amountPerPeriod', render: (item) => renderMoney(item.amountPerPeriod) }
        ],

        YearEndDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'taxYear', label: 'Tax Year', sortKey: 'taxYear', filterKey: 'taxYear' },
            { key: 'documentType', label: 'Type', sortKey: 'documentType', filterKey: 'documentType', enumValues: YEAR_END_DOC_TYPE_VALUES, render: (item) => renderYearEndDocType(item.documentType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: YEAR_END_DOC_STATUS_VALUES, render: (item) => renderYearEndDocStatus(item.status) },
            { key: 'issuedDate', label: 'Issued', sortKey: 'issuedDate', render: (item) => renderDate(item.issuedDate) },
            { key: 'isCorrected', label: 'Corrected', sortKey: 'isCorrected', render: (item) => renderBoolean(item.isCorrected) }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const PAYROLL_FORMS = {
        PayStructure: {
            title: 'Pay Structure',
            sections: [{
                title: 'Basic Information',
                fields: [
                    { key: 'code', label: 'Code', type: 'text', required: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                    { key: 'currencyCode', label: 'Currency Code', type: 'text', required: true },
                    { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: PAY_FREQUENCY, required: true },
                    { key: 'isActive', label: 'Active', type: 'checkbox' },
                    { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                    { key: 'endDate', label: 'End Date', type: 'date' }
                ]
            }]
        },

        PayComponent: {
            title: 'Pay Component',
            sections: [
                { title: 'Component Details', fields: [
                    { key: 'code', label: 'Code', type: 'text', required: true },
                    { key: 'name', label: 'Name', type: 'text', required: true },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                    { key: 'componentType', label: 'Type', type: 'select', options: PAY_COMPONENT_TYPE, required: true },
                    { key: 'category', label: 'Category', type: 'select', options: PAY_COMPONENT_CATEGORY },
                    { key: 'calculationType', label: 'Calculation', type: 'select', options: CALCULATION_TYPE, required: true }
                ]},
                { title: 'Calculation Settings', fields: [
                    { key: 'rate', label: 'Rate/Percentage', type: 'number' },
                    { key: 'hoursMultiplier', label: 'Hours Multiplier', type: 'number' },
                    { key: 'isTaxable', label: 'Taxable', type: 'checkbox' },
                    { key: 'isPreTax', label: 'Pre-Tax', type: 'checkbox' },
                    { key: 'affectsOvertime', label: 'Affects Overtime', type: 'checkbox' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' },
                    { key: 'displayOrder', label: 'Display Order', type: 'number' }
                ]}
            ]
        },

        PayrollRun: {
            title: 'Payroll Run',
            sections: [{ title: 'Run Details', fields: [
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization', required: true },
                { key: 'runType', label: 'Run Type', type: 'select', options: PAYROLL_RUN_TYPE, required: true },
                { key: 'status', label: 'Status', type: 'select', options: PAYROLL_RUN_STATUS, required: true },
                { key: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
                { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },

        Payslip: {
            title: 'Payslip',
            sections: [
                { title: 'Payslip Details', fields: [
                    { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                    { key: 'payrollRunId', label: 'Payroll Run', type: 'reference', lookupModel: 'PayrollRun', required: true },
                    { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true }
                ]},
                { title: 'Hours', fields: [
                    { key: 'regularHours', label: 'Regular Hours', type: 'number' },
                    { key: 'overtimeHours', label: 'Overtime Hours', type: 'number' },
                    { key: 'ptoHours', label: 'PTO Hours', type: 'number' },
                    { key: 'holidayHours', label: 'Holiday Hours', type: 'number' }
                ]}
            ]
        },

        TaxWithholding: {
            title: 'Tax Withholding',
            sections: [{ title: 'Tax Information', fields: [
                { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                { key: 'taxType', label: 'Tax Type', type: 'select', options: TAX_TYPE, required: true },
                { key: 'taxJurisdiction', label: 'Jurisdiction', type: 'text', required: true },
                { key: 'formVersion', label: 'Form Version', type: 'text' },
                { key: 'filingStatus', label: 'Filing Status', type: 'select', options: FILING_STATUS, required: true },
                { key: 'allowances', label: 'Allowances', type: 'number' },
                { key: 'useNewW4', label: 'Use 2020+ W-4', type: 'checkbox' },
                { key: 'exempt', label: 'Exempt', type: 'checkbox' },
                { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                { key: 'signedDate', label: 'Signed Date', type: 'date' }
            ]}]
        },

        DirectDeposit: {
            title: 'Direct Deposit',
            sections: [{ title: 'Account Information', fields: [
                { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                { key: 'accountName', label: 'Account Name', type: 'text' },
                { key: 'bankName', label: 'Bank Name', type: 'text', required: true },
                { key: 'routingNumber', label: 'Routing Number', type: 'routingNumber', required: true },
                { key: 'accountType', label: 'Account Type', type: 'select', options: ACCOUNT_TYPE, required: true },
                { key: 'depositType', label: 'Deposit Type', type: 'select', options: DEPOSIT_TYPE, required: true },
                { key: 'percentage', label: 'Percentage', type: 'percentage' },
                { key: 'priority', label: 'Priority', type: 'number' },
                { key: 'isActive', label: 'Active', type: 'checkbox' },
                { key: 'isPrenoteComplete', label: 'Prenote Complete', type: 'checkbox' },
                { key: 'effectiveDate', label: 'Effective Date', type: 'date' }
            ]}]
        },

        Garnishment: {
            title: 'Garnishment',
            sections: [
                { title: 'Garnishment Details', fields: [
                    { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                    { key: 'garnishmentType', label: 'Type', type: 'select', options: GARNISHMENT_TYPE, required: true },
                    { key: 'caseNumber', label: 'Case Number', type: 'text', required: true },
                    { key: 'issuingAuthority', label: 'Issuing Authority', type: 'text' },
                    { key: 'payeeName', label: 'Payee Name', type: 'text', required: true },
                    { key: 'payeeAddress', label: 'Payee Address', type: 'textarea' },
                    { key: 'status', label: 'Status', type: 'select', options: GARNISHMENT_STATUS, required: true }
                ]},
                { title: 'Amount Details', fields: [
                    { key: 'percentage', label: 'Percentage', type: 'percentage' },
                    { key: 'priority', label: 'Priority', type: 'number' },
                    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                    { key: 'endDate', label: 'End Date', type: 'date' },
                    { key: 'notes', label: 'Notes', type: 'textarea' }
                ]}
            ]
        },

        YearEndDocument: {
            title: 'Year-End Document',
            sections: [{ title: 'Document Details', fields: [
                { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                { key: 'taxYear', label: 'Tax Year', type: 'number', required: true },
                { key: 'documentType', label: 'Document Type', type: 'select', options: YEAR_END_DOC_TYPE, required: true },
                { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                { key: 'status', label: 'Status', type: 'select', options: YEAR_END_DOC_STATUS, required: true },
                { key: 'issuedDate', label: 'Issued Date', type: 'date' },
                { key: 'isCorrected', label: 'Is Correction', type: 'checkbox' },
                { key: 'originalDocumentId', label: 'Original Document ID', type: 'text' },
                { key: 'fileUrl', label: 'File URL', type: 'url' }
            ]}]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const PAYROLL_PRIMARY_KEYS = {
        PayStructure: 'payStructureId', PayComponent: 'componentId', PayrollRun: 'payrollRunId',
        Payslip: 'payslipId', TaxWithholding: 'withholdingId', DirectDeposit: 'directDepositId',
        Garnishment: 'garnishmentId', YearEndDocument: 'documentId'
    };

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.Payroll = {
        columns: PAYROLL_COLUMNS,
        forms: PAYROLL_FORMS,
        primaryKeys: PAYROLL_PRIMARY_KEYS,
        enums: {
            PAY_FREQUENCY, PAY_FREQUENCY_VALUES, PAY_COMPONENT_TYPE, PAY_COMPONENT_TYPE_VALUES,
            PAY_COMPONENT_CATEGORY, CALCULATION_TYPE, CALCULATION_TYPE_VALUES,
            PAYROLL_RUN_STATUS, PAYROLL_RUN_STATUS_VALUES, PAYROLL_RUN_TYPE, PAYROLL_RUN_TYPE_VALUES,
            TAX_TYPE, TAX_TYPE_VALUES, FILING_STATUS, FILING_STATUS_VALUES,
            ACCOUNT_TYPE, ACCOUNT_TYPE_VALUES, DEPOSIT_TYPE, DEPOSIT_TYPE_VALUES,
            GARNISHMENT_TYPE, GARNISHMENT_TYPE_VALUES, GARNISHMENT_STATUS, GARNISHMENT_STATUS_VALUES,
            YEAR_END_DOC_TYPE, YEAR_END_DOC_TYPE_VALUES, YEAR_END_DOC_STATUS, YEAR_END_DOC_STATUS_VALUES
        },
        render: {
            payFrequency: renderPayFrequency, componentType: renderComponentType,
            componentCategory: renderComponentCategory, calculationType: renderCalculationType,
            payrollRunStatus: renderPayrollRunStatus, payrollRunType: renderPayrollRunType,
            taxType: renderTaxType, filingStatus: renderFilingStatus, accountType: renderAccountType,
            depositType: renderDepositType, garnishmentType: renderGarnishmentType,
            garnishmentStatus: renderGarnishmentStatus, yearEndDocType: renderYearEndDocType,
            yearEndDocStatus: renderYearEndDocStatus, money: renderMoney, boolean: renderBoolean, date: renderDate
        }
    };

})();
