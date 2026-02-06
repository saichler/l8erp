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
 * Mobile Payroll Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/payroll/payroll.js (enums section)
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderMoney, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobilePayroll = window.MobilePayroll || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PAY_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Weekly', 'weekly'], ['Bi-Weekly', 'biweekly'],
        ['Semi-Monthly', 'semimonthly'], ['Monthly', 'monthly'], ['Annually', 'annually']
    ]);

    const PAY_COMPONENT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Earning', 'earning', 'status-active'],
        ['Deduction', 'deduction', 'status-terminated'],
        ['Tax', 'tax', 'status-pending'],
        ['Employer Contribution', 'employer', 'status-inactive']
    ]);

    const PAY_COMPONENT_CATEGORY = factory.simple([
        'Unspecified',
        'Regular', 'Overtime', 'Bonus', 'Commission', 'PTO',
        'Holiday', 'Sick', 'Shift Differential', 'Tips',
        'Health Insurance', 'Dental Insurance', 'Vision Insurance',
        'Life Insurance', '401(k)', 'HSA', 'FSA',
        'Garnishment', 'Union Dues', 'Loan Repayment',
        'Federal Tax', 'State Tax', 'Local Tax',
        'Social Security', 'Medicare', 'FUTA', 'SUTA'
    ]);

    const CALCULATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['Percentage', 'percentage'],
        ['Hourly', 'hourly'], ['Formula', 'formula']
    ]);

    const PAYROLL_RUN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Pending Approval', 'pending', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Processing', 'processing', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated'],
        ['Error', 'error', 'status-terminated']
    ]);

    const PAYROLL_RUN_TYPE = factory.withValues([
        ['Unspecified', null], ['Regular', 'regular'], ['Supplemental', 'supplemental'],
        ['Bonus', 'bonus'], ['Correction', 'correction'], ['Final', 'final']
    ]);

    const TAX_TYPE = factory.withValues([
        ['Unspecified', null], ['Federal Income', 'federal'], ['State Income', 'state'],
        ['Local Income', 'local'], ['Social Security', 'social'], ['Medicare', 'medicare']
    ]);

    const FILING_STATUS = factory.withValues([
        ['Unspecified', null], ['Single', 'single'], ['Married Filing Jointly', 'married'],
        ['Married Filing Separately', 'separately'], ['Head of Household', 'head'],
        ['Qualifying Widow(er)', 'widow']
    ]);

    const ACCOUNT_TYPE = factory.withValues([
        ['Unspecified', null], ['Checking', 'checking'], ['Savings', 'savings']
    ]);

    const DEPOSIT_TYPE = factory.withValues([
        ['Unspecified', null], ['Full (Remainder)', 'full'], ['Fixed Amount', 'fixed'], ['Percentage', 'percentage']
    ]);

    const GARNISHMENT_TYPE = factory.withValues([
        ['Unspecified', null], ['Child Support', 'child'], ['Spousal Support', 'spousal'],
        ['Tax Levy', 'tax'], ['Creditor', 'creditor'], ['Student Loan', 'student'], ['Bankruptcy', 'bankruptcy']
    ]);

    const GARNISHMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Suspended', 'suspended', 'status-pending'],
        ['Completed', 'completed', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const YEAR_END_DOC_TYPE = factory.withValues([
        ['Unspecified', null], ['W-2', 'w2'], ['W-2C', 'w2c'], ['1099-MISC', '1099'],
        ['1099-NEC', '1099-nec'], ['T4 (Canada)', 't4'], ['T4A (Canada)', 't4a']
    ]);

    const YEAR_END_DOC_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Generated', 'generated', 'status-pending'],
        ['Issued', 'issued', 'status-active'],
        ['Filed', 'filed', 'status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePayroll.enums = {
        PAY_FREQUENCY: PAY_FREQUENCY.enum,
        PAY_FREQUENCY_VALUES: PAY_FREQUENCY.values,
        PAY_COMPONENT_TYPE: PAY_COMPONENT_TYPE.enum,
        PAY_COMPONENT_TYPE_VALUES: PAY_COMPONENT_TYPE.values,
        PAY_COMPONENT_TYPE_CLASSES: PAY_COMPONENT_TYPE.classes,
        PAY_COMPONENT_CATEGORY: PAY_COMPONENT_CATEGORY.enum,
        CALCULATION_TYPE: CALCULATION_TYPE.enum,
        CALCULATION_TYPE_VALUES: CALCULATION_TYPE.values,
        PAYROLL_RUN_STATUS: PAYROLL_RUN_STATUS.enum,
        PAYROLL_RUN_STATUS_VALUES: PAYROLL_RUN_STATUS.values,
        PAYROLL_RUN_STATUS_CLASSES: PAYROLL_RUN_STATUS.classes,
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
        GARNISHMENT_STATUS_CLASSES: GARNISHMENT_STATUS.classes,
        YEAR_END_DOC_TYPE: YEAR_END_DOC_TYPE.enum,
        YEAR_END_DOC_TYPE_VALUES: YEAR_END_DOC_TYPE.values,
        YEAR_END_DOC_STATUS: YEAR_END_DOC_STATUS.enum,
        YEAR_END_DOC_STATUS_VALUES: YEAR_END_DOC_STATUS.values,
        YEAR_END_DOC_STATUS_CLASSES: YEAR_END_DOC_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePayroll.render = {
        payFrequency: (v) => renderEnum(v, PAY_FREQUENCY.enum),
        componentType: createStatusRenderer(PAY_COMPONENT_TYPE.enum, PAY_COMPONENT_TYPE.classes),
        componentCategory: (v) => renderEnum(v, PAY_COMPONENT_CATEGORY.enum),
        calculationType: (v) => renderEnum(v, CALCULATION_TYPE.enum),
        payrollRunStatus: createStatusRenderer(PAYROLL_RUN_STATUS.enum, PAYROLL_RUN_STATUS.classes),
        payrollRunType: (v) => renderEnum(v, PAYROLL_RUN_TYPE.enum),
        taxType: (v) => renderEnum(v, TAX_TYPE.enum),
        filingStatus: (v) => renderEnum(v, FILING_STATUS.enum),
        accountType: (v) => renderEnum(v, ACCOUNT_TYPE.enum),
        depositType: (v) => renderEnum(v, DEPOSIT_TYPE.enum),
        garnishmentType: (v) => renderEnum(v, GARNISHMENT_TYPE.enum),
        garnishmentStatus: createStatusRenderer(GARNISHMENT_STATUS.enum, GARNISHMENT_STATUS.classes),
        yearEndDocType: (v) => renderEnum(v, YEAR_END_DOC_TYPE.enum),
        yearEndDocStatus: createStatusRenderer(YEAR_END_DOC_STATUS.enum, YEAR_END_DOC_STATUS.classes),
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate
    };

})();
