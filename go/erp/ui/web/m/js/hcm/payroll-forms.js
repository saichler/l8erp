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
 * Mobile Payroll Module - Form Configurations
 * Desktop Equivalent: hcm/payroll/payroll.js (forms section)
 */
(function() {
    'use strict';

    const enums = MobilePayroll.enums;

    MobilePayroll.forms = {
        PayStructure: {
            title: 'Pay Structure',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'currencyCode', label: 'Currency Code', type: 'text', required: true },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: enums.PAY_FREQUENCY, required: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                }
            ]
        },

        PayComponent: {
            title: 'Pay Component',
            sections: [
                {
                    title: 'Component Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'componentType', label: 'Type', type: 'select', options: enums.PAY_COMPONENT_TYPE, required: true },
                        { key: 'category', label: 'Category', type: 'select', options: enums.PAY_COMPONENT_CATEGORY },
                        { key: 'calculationType', label: 'Calculation', type: 'select', options: enums.CALCULATION_TYPE, required: true }
                    ]
                },
                {
                    title: 'Calculation Settings',
                    fields: [
                        { key: 'rate', label: 'Rate/Percentage', type: 'number' },
                        { key: 'hoursMultiplier', label: 'Hours Multiplier', type: 'number' },
                        { key: 'isTaxable', label: 'Taxable', type: 'checkbox' },
                        { key: 'isPreTax', label: 'Pre-Tax', type: 'checkbox' },
                        { key: 'affectsOvertime', label: 'Affects Overtime', type: 'checkbox' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'displayOrder', label: 'Display Order', type: 'number' }
                    ]
                }
            ]
        },

        PayrollRun: {
            title: 'Payroll Run',
            sections: [
                {
                    title: 'Run Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization', required: true },
                        { key: 'runType', label: 'Run Type', type: 'select', options: enums.PAYROLL_RUN_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PAYROLL_RUN_STATUS, required: true },
                        { key: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
                        { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        Payslip: {
            title: 'Payslip',
            sections: [
                {
                    title: 'Payslip Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'payrollRunId', label: 'Payroll Run', type: 'reference', lookupModel: 'PayrollRun', required: true },
                        { key: 'paymentDate', label: 'Payment Date', type: 'date', required: true }
                    ]
                },
                {
                    title: 'Hours',
                    fields: [
                        { key: 'regularHours', label: 'Regular Hours', type: 'number' },
                        { key: 'overtimeHours', label: 'Overtime Hours', type: 'number' },
                        { key: 'ptoHours', label: 'PTO Hours', type: 'number' },
                        { key: 'holidayHours', label: 'Holiday Hours', type: 'number' }
                    ]
                }
            ]
        },

        TaxWithholding: {
            title: 'Tax Withholding',
            sections: [
                {
                    title: 'Tax Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'taxType', label: 'Tax Type', type: 'select', options: enums.TAX_TYPE, required: true },
                        { key: 'taxJurisdiction', label: 'Jurisdiction', type: 'text', required: true },
                        { key: 'formVersion', label: 'Form Version', type: 'text' },
                        { key: 'filingStatus', label: 'Filing Status', type: 'select', options: enums.FILING_STATUS, required: true },
                        { key: 'allowances', label: 'Allowances', type: 'number' },
                        { key: 'useNewW4', label: 'Use 2020+ W-4', type: 'checkbox' },
                        { key: 'exempt', label: 'Exempt', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'signedDate', label: 'Signed Date', type: 'date' }
                    ]
                }
            ]
        },

        DirectDeposit: {
            title: 'Direct Deposit',
            sections: [
                {
                    title: 'Account Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'accountName', label: 'Account Name', type: 'text' },
                        { key: 'bankName', label: 'Bank Name', type: 'text', required: true },
                        { key: 'routingNumber', label: 'Routing Number', type: 'routingNumber', required: true },
                        { key: 'accountType', label: 'Account Type', type: 'select', options: enums.ACCOUNT_TYPE, required: true },
                        { key: 'depositType', label: 'Deposit Type', type: 'select', options: enums.DEPOSIT_TYPE, required: true },
                        { key: 'percentage', label: 'Percentage', type: 'percentage' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'isPrenoteComplete', label: 'Prenote Complete', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' }
                    ]
                }
            ]
        },

        Garnishment: {
            title: 'Garnishment',
            sections: [
                {
                    title: 'Garnishment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'garnishmentType', label: 'Type', type: 'select', options: enums.GARNISHMENT_TYPE, required: true },
                        { key: 'caseNumber', label: 'Case Number', type: 'text', required: true },
                        { key: 'issuingAuthority', label: 'Issuing Authority', type: 'text' },
                        { key: 'payeeName', label: 'Payee Name', type: 'text', required: true },
                        { key: 'payeeAddress', label: 'Payee Address', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.GARNISHMENT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Amount Details',
                    fields: [
                        { key: 'percentage', label: 'Percentage', type: 'percentage' },
                        { key: 'priority', label: 'Priority', type: 'number' },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        YearEndDocument: {
            title: 'Year-End Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'taxYear', label: 'Tax Year', type: 'number', required: true },
                        { key: 'documentType', label: 'Document Type', type: 'select', options: enums.YEAR_END_DOC_TYPE, required: true },
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.YEAR_END_DOC_STATUS, required: true },
                        { key: 'issuedDate', label: 'Issued Date', type: 'date' },
                        { key: 'isCorrected', label: 'Is Correction', type: 'checkbox' },
                        { key: 'originalDocumentId', label: 'Original Document ID', type: 'text' },
                        { key: 'fileUrl', label: 'File URL', type: 'url' }
                    ]
                }
            ]
        }
    };

})();
