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
 * Mobile Payroll Module - Column Configurations
 * Desktop Equivalent: hcm/payroll/payroll.js (columns section)
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobilePayroll.enums;
    const render = MobilePayroll.render;

    MobilePayroll.columns = {
        PayStructure: [
            ...col.id('payStructureId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('currencyId', 'Currency'),
            ...col.status('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, render.payFrequency),
            ...col.boolean('isActive', 'Active')
        ],

        PayComponent: [
            ...col.id('componentId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('componentType', 'Type', enums.PAY_COMPONENT_TYPE_VALUES, render.componentType),
            ...col.status('calculationType', 'Calculation', enums.CALCULATION_TYPE_VALUES, render.calculationType),
            ...col.boolean('isTaxable', 'Taxable'),
            ...col.boolean('isActive', 'Active')
        ],

        PayrollRun: [
            ...col.id('payrollRunId'),
            ...col.col('name', 'Name'),
            ...col.status('runType', 'Type', enums.PAYROLL_RUN_TYPE_VALUES, render.payrollRunType),
            ...col.status('status', 'Status', enums.PAYROLL_RUN_STATUS_VALUES, render.payrollRunStatus),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.col('employeeCount', 'Employees'),
            ...col.money('totalNet', 'Total Net')
        ],

        Payslip: [
            ...col.id('payslipId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('payrollRunId', 'Payroll Run'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.money('grossPay', 'Gross'),
            ...col.money('totalDeductions', 'Deductions'),
            ...col.money('netPay', 'Net Pay')
        ],

        TaxWithholding: [
            ...col.id('withholdingId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('taxType', 'Tax Type', enums.TAX_TYPE_VALUES, render.taxType),
            ...col.col('taxJurisdiction', 'Jurisdiction'),
            ...col.status('filingStatus', 'Filing Status', enums.FILING_STATUS_VALUES, render.filingStatus),
            ...col.boolean('exempt', 'Exempt')
        ],

        DirectDeposit: [
            ...col.id('directDepositId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('bankName', 'Bank'),
            ...col.col('accountNumberMasked', 'Account'),
            ...col.status('accountType', 'Type', enums.ACCOUNT_TYPE_VALUES, render.accountType),
            ...col.status('depositType', 'Deposit', enums.DEPOSIT_TYPE_VALUES, render.depositType),
            ...col.boolean('isActive', 'Active')
        ],

        Garnishment: [
            ...col.id('garnishmentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('garnishmentType', 'Type', enums.GARNISHMENT_TYPE_VALUES, render.garnishmentType),
            ...col.col('caseNumber', 'Case #'),
            ...col.col('payeeName', 'Payee'),
            ...col.status('status', 'Status', enums.GARNISHMENT_STATUS_VALUES, render.garnishmentStatus),
            ...col.money('amountPerPeriod', 'Per Period')
        ],

        YearEndDocument: [
            ...col.id('documentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('taxYear', 'Tax Year'),
            ...col.status('documentType', 'Type', enums.YEAR_END_DOC_TYPE_VALUES, render.yearEndDocType),
            ...col.status('status', 'Status', enums.YEAR_END_DOC_STATUS_VALUES, render.yearEndDocStatus),
            ...col.date('issuedDate', 'Issued'),
            ...col.boolean('isCorrected', 'Corrected')
        ]
    };

    MobilePayroll.primaryKeys = {
        PayStructure: 'payStructureId', PayComponent: 'componentId', PayrollRun: 'payrollRunId',
        Payslip: 'payslipId', TaxWithholding: 'withholdingId', DirectDeposit: 'directDepositId',
        Garnishment: 'garnishmentId', YearEndDocument: 'documentId'
    };

})();
