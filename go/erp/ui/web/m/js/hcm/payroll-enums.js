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
 * Mobile Payroll Module - Enum Definitions
 * Desktop Equivalent: hcm/payroll/payroll.js (enums section)
 */
(function() {
    'use strict';

    window.MobilePayroll = window.MobilePayroll || {};
    MobilePayroll.enums = {};

    // ============================================================================
    // PAY FREQUENCY
    // ============================================================================

    MobilePayroll.enums.PAY_FREQUENCY = {
        0: 'Unspecified',
        1: 'Weekly',
        2: 'Bi-Weekly',
        3: 'Semi-Monthly',
        4: 'Monthly',
        5: 'Annually'
    };

    MobilePayroll.enums.PAY_FREQUENCY_VALUES = {
        'weekly': 1,
        'biweekly': 2,
        'bi-weekly': 2,
        'semimonthly': 3,
        'semi-monthly': 3,
        'monthly': 4,
        'annually': 5,
        'annual': 5
    };

    // ============================================================================
    // PAY COMPONENT TYPE
    // ============================================================================

    MobilePayroll.enums.PAY_COMPONENT_TYPE = {
        0: 'Unspecified',
        1: 'Earning',
        2: 'Deduction',
        3: 'Tax',
        4: 'Employer Contribution'
    };

    MobilePayroll.enums.PAY_COMPONENT_TYPE_VALUES = {
        'earning': 1,
        'deduction': 2,
        'tax': 3,
        'employer': 4,
        'contribution': 4
    };

    MobilePayroll.enums.PAY_COMPONENT_TYPE_CLASSES = {
        1: 'status-active',
        2: 'status-terminated',
        3: 'status-pending',
        4: 'status-inactive'
    };

    // ============================================================================
    // PAY COMPONENT CATEGORY
    // ============================================================================

    MobilePayroll.enums.PAY_COMPONENT_CATEGORY = {
        0: 'Unspecified',
        1: 'Regular', 2: 'Overtime', 3: 'Bonus', 4: 'Commission', 5: 'PTO',
        6: 'Holiday', 7: 'Sick', 8: 'Shift Differential', 9: 'Tips',
        20: 'Health Insurance', 21: 'Dental Insurance', 22: 'Vision Insurance',
        23: 'Life Insurance', 24: '401(k)', 25: 'HSA', 26: 'FSA',
        27: 'Garnishment', 28: 'Union Dues', 29: 'Loan Repayment',
        40: 'Federal Tax', 41: 'State Tax', 42: 'Local Tax',
        43: 'Social Security', 44: 'Medicare', 45: 'FUTA', 46: 'SUTA'
    };

    // ============================================================================
    // CALCULATION TYPE
    // ============================================================================

    MobilePayroll.enums.CALCULATION_TYPE = {
        0: 'Unspecified', 1: 'Fixed', 2: 'Percentage', 3: 'Hourly', 4: 'Formula'
    };

    MobilePayroll.enums.CALCULATION_TYPE_VALUES = {
        'fixed': 1, 'percentage': 2, 'percent': 2, 'hourly': 3, 'formula': 4
    };

    // ============================================================================
    // PAYROLL RUN STATUS
    // ============================================================================

    MobilePayroll.enums.PAYROLL_RUN_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Approved',
        4: 'Processing', 5: 'Completed', 6: 'Cancelled', 7: 'Error'
    };

    MobilePayroll.enums.PAYROLL_RUN_STATUS_VALUES = {
        'draft': 1, 'pending': 2, 'approved': 3, 'processing': 4,
        'completed': 5, 'cancelled': 6, 'error': 7
    };

    MobilePayroll.enums.PAYROLL_RUN_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active',
        4: 'status-pending', 5: 'status-active', 6: 'status-terminated',
        7: 'status-terminated'
    };

    // ============================================================================
    // PAYROLL RUN TYPE
    // ============================================================================

    MobilePayroll.enums.PAYROLL_RUN_TYPE = {
        0: 'Unspecified', 1: 'Regular', 2: 'Supplemental', 3: 'Bonus', 4: 'Correction', 5: 'Final'
    };

    MobilePayroll.enums.PAYROLL_RUN_TYPE_VALUES = {
        'regular': 1, 'supplemental': 2, 'bonus': 3, 'correction': 4, 'final': 5
    };

    // ============================================================================
    // TAX TYPE
    // ============================================================================

    MobilePayroll.enums.TAX_TYPE = {
        0: 'Unspecified', 1: 'Federal Income', 2: 'State Income', 3: 'Local Income',
        4: 'Social Security', 5: 'Medicare'
    };

    MobilePayroll.enums.TAX_TYPE_VALUES = {
        'federal': 1, 'state': 2, 'local': 3, 'social': 4, 'ss': 4, 'medicare': 5
    };

    // ============================================================================
    // FILING STATUS
    // ============================================================================

    MobilePayroll.enums.FILING_STATUS = {
        0: 'Unspecified', 1: 'Single', 2: 'Married Filing Jointly',
        3: 'Married Filing Separately', 4: 'Head of Household', 5: 'Qualifying Widow(er)'
    };

    MobilePayroll.enums.FILING_STATUS_VALUES = {
        'single': 1, 'married': 2, 'jointly': 2, 'separately': 3, 'head': 4, 'household': 4, 'widow': 5
    };

    // ============================================================================
    // ACCOUNT TYPE
    // ============================================================================

    MobilePayroll.enums.ACCOUNT_TYPE = { 0: 'Unspecified', 1: 'Checking', 2: 'Savings' };
    MobilePayroll.enums.ACCOUNT_TYPE_VALUES = { 'checking': 1, 'savings': 2 };

    // ============================================================================
    // DEPOSIT TYPE
    // ============================================================================

    MobilePayroll.enums.DEPOSIT_TYPE = { 0: 'Unspecified', 1: 'Full (Remainder)', 2: 'Fixed Amount', 3: 'Percentage' };
    MobilePayroll.enums.DEPOSIT_TYPE_VALUES = { 'full': 1, 'remainder': 1, 'fixed': 2, 'percentage': 3, 'percent': 3 };

    // ============================================================================
    // GARNISHMENT TYPE
    // ============================================================================

    MobilePayroll.enums.GARNISHMENT_TYPE = {
        0: 'Unspecified', 1: 'Child Support', 2: 'Spousal Support', 3: 'Tax Levy',
        4: 'Creditor', 5: 'Student Loan', 6: 'Bankruptcy'
    };

    MobilePayroll.enums.GARNISHMENT_TYPE_VALUES = {
        'child': 1, 'spousal': 2, 'alimony': 2, 'tax': 3, 'levy': 3,
        'creditor': 4, 'student': 5, 'loan': 5, 'bankruptcy': 6
    };

    // ============================================================================
    // GARNISHMENT STATUS
    // ============================================================================

    MobilePayroll.enums.GARNISHMENT_STATUS = { 0: 'Unspecified', 1: 'Active', 2: 'Suspended', 3: 'Completed', 4: 'Cancelled' };
    MobilePayroll.enums.GARNISHMENT_STATUS_VALUES = { 'active': 1, 'suspended': 2, 'completed': 3, 'cancelled': 4 };
    MobilePayroll.enums.GARNISHMENT_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-inactive', 4: 'status-terminated'
    };

    // ============================================================================
    // YEAR END DOCUMENT
    // ============================================================================

    MobilePayroll.enums.YEAR_END_DOC_TYPE = {
        0: 'Unspecified', 1: 'W-2', 2: 'W-2C', 3: '1099-MISC', 4: '1099-NEC', 5: 'T4 (Canada)', 6: 'T4A (Canada)'
    };

    MobilePayroll.enums.YEAR_END_DOC_TYPE_VALUES = {
        'w2': 1, 'w-2': 1, 'w2c': 2, 'w-2c': 2, '1099': 3, '1099-misc': 3, '1099-nec': 4, 't4': 5, 't4a': 6
    };

    MobilePayroll.enums.YEAR_END_DOC_STATUS = { 0: 'Unspecified', 1: 'Draft', 2: 'Generated', 3: 'Issued', 4: 'Filed' };
    MobilePayroll.enums.YEAR_END_DOC_STATUS_VALUES = { 'draft': 1, 'generated': 2, 'issued': 3, 'filed': 4 };
    MobilePayroll.enums.YEAR_END_DOC_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-active'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePayroll.render = {
        payFrequency: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.PAY_FREQUENCY),
        componentType: MobileRenderers.createStatusRenderer(
            MobilePayroll.enums.PAY_COMPONENT_TYPE,
            MobilePayroll.enums.PAY_COMPONENT_TYPE_CLASSES
        ),
        componentCategory: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.PAY_COMPONENT_CATEGORY),
        calculationType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.CALCULATION_TYPE),
        payrollRunStatus: MobileRenderers.createStatusRenderer(
            MobilePayroll.enums.PAYROLL_RUN_STATUS,
            MobilePayroll.enums.PAYROLL_RUN_STATUS_CLASSES
        ),
        payrollRunType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.PAYROLL_RUN_TYPE),
        taxType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.TAX_TYPE),
        filingStatus: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.FILING_STATUS),
        accountType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.ACCOUNT_TYPE),
        depositType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.DEPOSIT_TYPE),
        garnishmentType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.GARNISHMENT_TYPE),
        garnishmentStatus: MobileRenderers.createStatusRenderer(
            MobilePayroll.enums.GARNISHMENT_STATUS,
            MobilePayroll.enums.GARNISHMENT_STATUS_CLASSES
        ),
        yearEndDocType: (v) => MobileRenderers.renderEnum(v, MobilePayroll.enums.YEAR_END_DOC_TYPE),
        yearEndDocStatus: MobileRenderers.createStatusRenderer(
            MobilePayroll.enums.YEAR_END_DOC_STATUS,
            MobilePayroll.enums.YEAR_END_DOC_STATUS_CLASSES
        ),
        money: MobileRenderers.renderMoney,
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate
    };

})();
