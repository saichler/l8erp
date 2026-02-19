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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Compensation Management Module - Form Configurations
 * Desktop Equivalent: hcm/compensation/compensation-forms.js
 */
window.MobileCompensation = window.MobileCompensation || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileCompensation.enums;

    MobileCompensation.forms = {
        SalaryGrade: f.form('Salary Grade', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('salaryStructureId', 'Salary Structure', 'SalaryStructure'),
                ...f.text('gradeCode', 'Grade Code', true),
                ...f.text('name', 'Name', true),
                ...f.number('level', 'Level', true),
                ...f.money('minimum', 'Minimum'),
                ...f.money('midpoint', 'Midpoint'),
                ...f.money('maximum', 'Maximum'),
            ]),
            f.section('Salary Range', [
                ...f.money('minimum.amount', 'Minimum', true),
                ...f.money('midpoint.amount', 'Midpoint', true),
                ...f.money('maximum.amount', 'Maximum', true),
                ...f.percentage('spreadPercentage', 'Spread'),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY)
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        SalaryStructure: f.form('Salary Structure', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description')
            ]),
            f.section('Settings', [
                ...f.reference('currencyId', 'Currency', 'Currency', true),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY, true)
            ]),
            f.section('Grades', [
                ...f.text('salaryGradeIds', 'Salary Grade IDs')
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        EmployeeCompensation: f.form('Employee Compensation', [
            f.section('Employee', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('compensationType', 'Compensation Type', enums.COMPENSATION_TYPE, true),
                ...f.reference('salaryGradeId', 'Salary Grade', 'SalaryGrade'),
                ...f.money('baseSalary', 'Base Salary'),
                ...f.money('hourlyRate', 'Hourly Rate'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
            ]),
            f.section('Compensation', [
                ...f.money('baseSalary.amount', 'Base Salary', true),
                ...f.money('hourlyRate.amount', 'Hourly Rate'),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY, true),
                ...f.reference('currencyId', 'Currency', 'Currency'),
                ...f.percentage('compaRatio', 'Compa Ratio'),
                ...f.number('fte', 'FTE')
            ]),
            f.section('Effective Dates', [
                ...f.date('effectiveDate', 'Effective Date', true),
                ...f.date('endDate', 'End Date'),
                ...f.text('changeReason', 'Change Reason')
            ])
        ]),

        MeritIncrease: f.form('Merit Increase', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('meritCycleId', 'Merit Cycle', 'MeritCycle', true),
                ...f.reference('reviewId', 'Performance Review', 'PerformanceReview'),
                ...f.select('status', 'Status', enums.MERIT_INCREASE_STATUS, true),
                ...f.money('currentSalary', 'Current Salary'),
                ...f.money('proposedIncrease', 'Proposed Increase'),
                ...f.money('newSalary', 'New Salary'),
                ...f.money('budgetAmount', 'Budget Amount'),
                ...f.money('managerRecommended', 'Manager Recommended'),
                ...f.money('hrApproved', 'Hr Approved'),
                ...f.text('submittedBy', 'Submitted By'),
                ...f.date('submittedDate', 'Submitted Date'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
            ]),
            f.section('Salary', [
                ...f.money('currentSalary.amount', 'Current Salary'),
                ...f.money('proposedIncrease.amount', 'Proposed Increase'),
                ...f.percentage('proposedPercentage', 'Proposed'),
                ...f.money('newSalary.amount', 'New Salary')
            ]),
            f.section('Performance', [
                ...f.rating('performanceRating', 'Performance Rating'),
                ...f.percentage('compaRatioBefore', 'Compa Ratio Before'),
                ...f.percentage('compaRatioAfter', 'Compa Ratio After')
            ]),
            f.section('Effective Date', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        MeritCycle: f.form('Merit Cycle', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('name', 'Name', true),
                ...f.number('year', 'Year', true),
                ...f.select('status', 'Status', enums.MERIT_CYCLE_STATUS, true),
                ...f.money('totalBudget', 'Total Budget'),
            ]),
            f.section('Dates', [
                ...f.date('planningStartDate', 'Planning Start'),
                ...f.date('planningEndDate', 'Planning End'),
                ...f.date('effectiveDate', 'Effective Date')
            ]),
            f.section('Budget', [
                ...f.money('totalBudget.amount', 'Total Budget'),
                ...f.percentage('budgetPercentage', 'Budget'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        BonusPlan: f.form('Bonus Plan', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('planType', 'Plan Type', enums.BONUS_PLAN_TYPE, true),
                ...f.number('planYear', 'Plan Year', true),
                ...f.select('frequency', 'Frequency', enums.BONUS_FREQUENCY),
                ...f.money('targetAmount', 'Target Amount'),
                ...f.money('maximumAmount', 'Maximum Amount'),
                ...f.number('prorationMethod', 'Proration Method'),
            ]),
            f.section('Target', [
                ...f.percentage('targetPercentage', 'Target'),
                ...f.percentage('maximumPercentage', 'Maximum'),
                ...f.money('targetAmount.amount', 'Target Amount'),
                ...f.money('maximumAmount.amount', 'Maximum Amount')
            ]),
            f.section('Funding', [
                ...f.select('fundingType', 'Funding Type', enums.BONUS_FUNDING_TYPE),
                ...f.percentage('fundingPoolPercentage', 'Funding Pool')
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.date('payoutDate', 'Payout Date'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        BonusPayment: f.form('Bonus Payment', [
            f.section('Payment Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.reference('bonusPlanId', 'Bonus Plan', 'BonusPlan'),
                ...f.select('bonusType', 'Bonus Type', enums.BONUS_PLAN_TYPE, true),
                ...f.text('reason', 'Reason'),
                ...f.select('status', 'Status', enums.BONUS_PAYMENT_STATUS, true),
                ...f.money('targetAmount', 'Target Amount'),
                ...f.money('actualAmount', 'Actual Amount'),
                ...f.date('performancePeriod.startDate', 'Performance Period Start'),
                ...f.date('performancePeriod.endDate', 'Performance Period End'),
                ...f.text('payrollRunId', 'Payroll Run'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
            ]),
            f.section('Amount', [
                ...f.money('targetAmount.amount', 'Target Amount'),
                ...f.money('actualAmount.amount', 'Actual Amount', true),
                ...f.percentage('payoutPercentage', 'Payout')
            ]),
            f.section('Performance Factors', [
                ...f.number('individualPerformanceFactor', 'Individual Factor'),
                ...f.number('teamPerformanceFactor', 'Team Factor'),
                ...f.number('companyPerformanceFactor', 'Company Factor')
            ]),
            f.section('Dates', [
                ...f.date('awardDate', 'Award Date'),
                ...f.date('paymentDate', 'Payment Date'),
                ...f.checkbox('isTaxable', 'Taxable'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        EquityGrant: f.form('Equity Grant', [
            f.section('Grant Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('grantType', 'Grant Type', enums.EQUITY_GRANT_TYPE, true),
                ...f.text('grantNumber', 'Grant Number'),
                ...f.select('status', 'Status', enums.EQUITY_GRANT_STATUS, true),
                ...f.text('planId', 'Plan'),
                ...f.money('grantPrice', 'Grant Price'),
                ...f.money('fairMarketValue', 'Fair Market Value'),
                ...f.money('totalValue', 'Total Value'),
                ...f.number('sharesCancelled', 'Shares Cancelled'),
                ...f.text('approvedBy', 'Approved By'),
                ...f.date('approvedDate', 'Approved Date'),
                ...f.text('boardApprovalDate', 'Board Approval Date'),
                ...f.text('agreementDocumentId', 'Agreement Document'),
            ]),
            f.section('Shares & Value', [
                ...f.number('sharesGranted', 'Shares Granted', true),
                ...f.money('grantPrice.amount', 'Grant Price'),
                ...f.money('fairMarketValue.amount', 'Fair Market Value'),
                ...f.money('totalValue.amount', 'Total Value')
            ]),
            f.section('Vesting', [
                ...f.number('sharesVested', 'Shares Vested'),
                ...f.number('sharesUnvested', 'Shares Unvested'),
                ...f.number('sharesExercised', 'Shares Exercised'),
                ...f.number('sharesForfeited', 'Shares Forfeited')
            ]),
            f.section('Dates', [
                ...f.date('grantDate', 'Grant Date', true),
                ...f.date('vestStartDate', 'Vest Start Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ]),

        CompensationStatement: f.form('Compensation Statement', [
            f.section('Basic Information', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.number('statementYear', 'Year', true),
                ...f.date('asOfDate', 'As Of Date'),
                ...f.money('baseSalary', 'Base Salary'),
                ...f.money('hourlyEquivalent', 'Hourly Equivalent'),
                ...f.money('bonusTarget', 'Bonus Target'),
                ...f.money('bonusActual', 'Bonus Actual'),
                ...f.money('commissions', 'Commissions'),
                ...f.money('equityValue', 'Equity Value'),
                ...f.money('employerHealthContribution', 'Employer Health Contribution'),
                ...f.money('employerDentalContribution', 'Employer Dental Contribution'),
                ...f.money('employerVisionContribution', 'Employer Vision Contribution'),
                ...f.money('employerLifeContribution', 'Employer Life Contribution'),
                ...f.money('employerDisabilityContribution', 'Employer Disability Contribution'),
                ...f.money('employerRetirementContribution', 'Employer Retirement Contribution'),
                ...f.money('employerHsaContribution', 'Employer HSA Contribution'),
                ...f.money('employerPayrollTaxes', 'Employer Payroll Taxes'),
                ...f.money('otherBenefitsValue', 'Other Benefits Value'),
                ...f.money('perksValue', 'Perks Value'),
                ...f.money('totalCashCompensation', 'Total Cash Compensation'),
                ...f.money('totalBenefitsValue', 'Total Benefits Value'),
                ...f.money('totalCompensation', 'Total Compensation'),
            ]),
            f.section('Base Compensation', [
                ...f.money('baseSalary.amount', 'Base Salary'),
                ...f.money('hourlyEquivalent.amount', 'Hourly Equivalent')
            ]),
            f.section('Variable Pay', [
                ...f.money('bonusTarget.amount', 'Bonus Target'),
                ...f.money('bonusActual.amount', 'Bonus Actual'),
                ...f.money('commissions.amount', 'Commissions')
            ]),
            f.section('Equity', [
                ...f.money('equityValue.amount', 'Equity Value'),
                ...f.number('equityShares', 'Equity Shares')
            ]),
            f.section('Output', [
                ...f.url('pdfUrl', 'PDF URL')
            ])
        ]),

        MarketBenchmark: f.form('Market Benchmark', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('jobId', 'Job', 'Job'),
                ...f.text('jobTitle', 'Job Title', true),
                ...f.text('surveySource', 'Survey Source', true),
                ...f.number('surveyYear', 'Survey Year', true),
                ...f.text('marketDefinition', 'Market Definition'),
                ...f.money('market25th', 'Market25th'),
                ...f.money('market50th', 'Market50th'),
                ...f.money('market75th', 'Market75th'),
                ...f.money('market90th', 'Market90th'),
                ...f.money('marketAverage', 'Market Average'),
                ...f.money('totalCash25th', 'Total Cash25th'),
                ...f.money('totalCash50th', 'Total Cash50th'),
                ...f.money('totalCash75th', 'Total Cash75th'),
                ...f.money('internalAverage', 'Internal Average'),
            ]),
            f.section('Market Data (Base)', [
                ...f.money('market25th.amount', '25th Percentile'),
                ...f.money('market50th.amount', '50th Percentile'),
                ...f.money('market75th.amount', '75th Percentile'),
                ...f.money('market90th.amount', '90th Percentile'),
                ...f.money('marketAverage.amount', 'Market Average')
            ]),
            f.section('Total Cash Data', [
                ...f.money('totalCash25th.amount', 'Total Cash 25th'),
                ...f.money('totalCash50th.amount', 'Total Cash 50th'),
                ...f.money('totalCash75th.amount', 'Total Cash 75th')
            ]),
            f.section('Comparison', [
                ...f.money('internalAverage.amount', 'Internal Average'),
                ...f.percentage('marketIndex', 'Market Index')
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
