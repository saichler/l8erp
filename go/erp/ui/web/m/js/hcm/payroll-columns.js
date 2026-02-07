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

    const enums = MobilePayroll.enums;
    const render = MobilePayroll.render;

    MobilePayroll.columns = {
        PayStructure: [
            { key: 'payStructureId', label: 'ID', sortKey: 'payStructureId', filterKey: 'payStructureId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'currencyId', label: 'Currency', sortKey: 'currencyId', filterKey: 'currencyId' },
            { key: 'payFrequency', label: 'Frequency', sortKey: 'payFrequency', filterKey: 'payFrequency', enumValues: enums.PAY_FREQUENCY_VALUES, render: (item) => render.payFrequency(item.payFrequency) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        PayComponent: [
            { key: 'componentId', label: 'ID', sortKey: 'componentId', filterKey: 'componentId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'componentType', label: 'Type', sortKey: 'componentType', filterKey: 'componentType', enumValues: enums.PAY_COMPONENT_TYPE_VALUES, render: (item) => render.componentType(item.componentType) },
            { key: 'calculationType', label: 'Calculation', sortKey: 'calculationType', filterKey: 'calculationType', enumValues: enums.CALCULATION_TYPE_VALUES, render: (item) => render.calculationType(item.calculationType) },
            { key: 'isTaxable', label: 'Taxable', sortKey: 'isTaxable', render: (item) => Layer8MRenderers.renderBoolean(item.isTaxable) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        PayrollRun: [
            { key: 'payrollRunId', label: 'ID', sortKey: 'payrollRunId', filterKey: 'payrollRunId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'runType', label: 'Type', sortKey: 'runType', filterKey: 'runType', enumValues: enums.PAYROLL_RUN_TYPE_VALUES, render: (item) => render.payrollRunType(item.runType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.PAYROLL_RUN_STATUS_VALUES, render: (item) => render.payrollRunStatus(item.status) },
            { key: 'paymentDate', label: 'Payment Date', sortKey: 'paymentDate', render: (item) => Layer8MRenderers.renderDate(item.paymentDate) },
            { key: 'employeeCount', label: 'Employees', sortKey: 'employeeCount' },
            { key: 'totalNet', label: 'Total Net', sortKey: 'totalNet', render: (item) => Layer8MRenderers.renderMoney(item.totalNet) }
        ],

        Payslip: [
            { key: 'payslipId', label: 'ID', sortKey: 'payslipId', filterKey: 'payslipId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'payrollRunId', label: 'Payroll Run', sortKey: 'payrollRunId', filterKey: 'payrollRunId' },
            { key: 'paymentDate', label: 'Payment Date', sortKey: 'paymentDate', render: (item) => Layer8MRenderers.renderDate(item.paymentDate) },
            { key: 'grossPay', label: 'Gross', sortKey: 'grossPay', render: (item) => Layer8MRenderers.renderMoney(item.grossPay) },
            { key: 'totalDeductions', label: 'Deductions', sortKey: 'totalDeductions', render: (item) => Layer8MRenderers.renderMoney(item.totalDeductions) },
            { key: 'netPay', label: 'Net Pay', sortKey: 'netPay', render: (item) => Layer8MRenderers.renderMoney(item.netPay) }
        ],

        TaxWithholding: [
            { key: 'withholdingId', label: 'ID', sortKey: 'withholdingId', filterKey: 'withholdingId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'taxType', label: 'Tax Type', sortKey: 'taxType', filterKey: 'taxType', enumValues: enums.TAX_TYPE_VALUES, render: (item) => render.taxType(item.taxType) },
            { key: 'taxJurisdiction', label: 'Jurisdiction', sortKey: 'taxJurisdiction', filterKey: 'taxJurisdiction' },
            { key: 'filingStatus', label: 'Filing Status', sortKey: 'filingStatus', filterKey: 'filingStatus', enumValues: enums.FILING_STATUS_VALUES, render: (item) => render.filingStatus(item.filingStatus) },
            { key: 'exempt', label: 'Exempt', sortKey: 'exempt', render: (item) => Layer8MRenderers.renderBoolean(item.exempt) }
        ],

        DirectDeposit: [
            { key: 'directDepositId', label: 'ID', sortKey: 'directDepositId', filterKey: 'directDepositId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'bankName', label: 'Bank', sortKey: 'bankName', filterKey: 'bankName' },
            { key: 'accountNumberMasked', label: 'Account', sortKey: 'accountNumberMasked' },
            { key: 'accountType', label: 'Type', sortKey: 'accountType', filterKey: 'accountType', enumValues: enums.ACCOUNT_TYPE_VALUES, render: (item) => render.accountType(item.accountType) },
            { key: 'depositType', label: 'Deposit', sortKey: 'depositType', filterKey: 'depositType', enumValues: enums.DEPOSIT_TYPE_VALUES, render: (item) => render.depositType(item.depositType) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        Garnishment: [
            { key: 'garnishmentId', label: 'ID', sortKey: 'garnishmentId', filterKey: 'garnishmentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'garnishmentType', label: 'Type', sortKey: 'garnishmentType', filterKey: 'garnishmentType', enumValues: enums.GARNISHMENT_TYPE_VALUES, render: (item) => render.garnishmentType(item.garnishmentType) },
            { key: 'caseNumber', label: 'Case #', sortKey: 'caseNumber', filterKey: 'caseNumber' },
            { key: 'payeeName', label: 'Payee', sortKey: 'payeeName', filterKey: 'payeeName' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.GARNISHMENT_STATUS_VALUES, render: (item) => render.garnishmentStatus(item.status) },
            { key: 'amountPerPeriod', label: 'Per Period', sortKey: 'amountPerPeriod', render: (item) => Layer8MRenderers.renderMoney(item.amountPerPeriod) }
        ],

        YearEndDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'taxYear', label: 'Tax Year', sortKey: 'taxYear', filterKey: 'taxYear' },
            { key: 'documentType', label: 'Type', sortKey: 'documentType', filterKey: 'documentType', enumValues: enums.YEAR_END_DOC_TYPE_VALUES, render: (item) => render.yearEndDocType(item.documentType) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.YEAR_END_DOC_STATUS_VALUES, render: (item) => render.yearEndDocStatus(item.status) },
            { key: 'issuedDate', label: 'Issued', sortKey: 'issuedDate', render: (item) => Layer8MRenderers.renderDate(item.issuedDate) },
            { key: 'isCorrected', label: 'Corrected', sortKey: 'isCorrected', render: (item) => Layer8MRenderers.renderBoolean(item.isCorrected) }
        ]
    };

    MobilePayroll.primaryKeys = {
        PayStructure: 'payStructureId', PayComponent: 'componentId', PayrollRun: 'payrollRunId',
        Payslip: 'payslipId', TaxWithholding: 'withholdingId', DirectDeposit: 'directDepositId',
        Garnishment: 'garnishmentId', YearEndDocument: 'documentId'
    };

})();
