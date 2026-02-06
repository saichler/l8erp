/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compensation Management Module - Form Definitions
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = window.Compensation.enums;

    window.Compensation.forms = {
        SalaryGrade: f.form('Salary Grade', [
            f.section('Basic Information', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('salaryStructureId', 'Salary Structure', 'SalaryStructure'),
                ...f.text('gradeCode', 'Grade Code', true),
                ...f.text('name', 'Name', true),
                ...f.number('level', 'Level', true)
            ]),
            f.section('Salary Range', [
                ...f.money('minimum.amount', 'Minimum', true),
                ...f.money('midpoint.amount', 'Midpoint', true),
                ...f.money('maximum.amount', 'Maximum', true),
                ...f.number('spreadPercentage', 'Spread'),
                ...f.text('currencyCode', 'Currency'),
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
                ...f.text('currencyCode', 'Currency', true),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY, true)
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
                ...f.reference('salaryGradeId', 'Salary Grade', 'SalaryGrade')
            ]),
            f.section('Compensation', [
                ...f.money('baseSalary.amount', 'Base Salary', true),
                ...f.money('hourlyRate.amount', 'Hourly Rate'),
                ...f.select('payFrequency', 'Pay Frequency', enums.PAY_FREQUENCY, true),
                ...f.text('currencyCode', 'Currency'),
                ...f.number('compaRatio', 'Compa Ratio'),
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
                ...f.select('status', 'Status', enums.MERIT_INCREASE_STATUS, true)
            ]),
            f.section('Salary', [
                ...f.money('currentSalary.amount', 'Current Salary'),
                ...f.money('proposedIncrease.amount', 'Proposed Increase'),
                ...f.number('proposedPercentage', 'Proposed'),
                ...f.money('newSalary.amount', 'New Salary')
            ]),
            f.section('Performance', [
                ...f.number('performanceRating', 'Performance Rating'),
                ...f.number('compaRatioBefore', 'Compa Ratio Before'),
                ...f.number('compaRatioAfter', 'Compa Ratio After')
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
                ...f.select('status', 'Status', enums.MERIT_CYCLE_STATUS, true)
            ]),
            f.section('Dates', [
                ...f.date('planningStartDate', 'Planning Start'),
                ...f.date('planningEndDate', 'Planning End'),
                ...f.date('effectiveDate', 'Effective Date')
            ]),
            f.section('Budget', [
                ...f.money('totalBudget.amount', 'Total Budget'),
                ...f.number('budgetPercentage', 'Budget'),
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
                ...f.select('frequency', 'Frequency', enums.BONUS_FREQUENCY)
            ]),
            f.section('Target', [
                ...f.number('targetPercentage', 'Target'),
                ...f.number('maximumPercentage', 'Maximum'),
                ...f.money('targetAmount.amount', 'Target Amount'),
                ...f.money('maximumAmount.amount', 'Maximum Amount')
            ]),
            f.section('Funding', [
                ...f.select('fundingType', 'Funding Type', enums.BONUS_FUNDING_TYPE),
                ...f.number('fundingPoolPercentage', 'Funding Pool')
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
                ...f.select('status', 'Status', enums.BONUS_PAYMENT_STATUS, true)
            ]),
            f.section('Amount', [
                ...f.money('targetAmount.amount', 'Target Amount'),
                ...f.money('actualAmount.amount', 'Actual Amount', true),
                ...f.number('payoutPercentage', 'Payout')
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
                ...f.select('status', 'Status', enums.EQUITY_GRANT_STATUS, true)
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
                ...f.date('asOfDate', 'As Of Date')
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
                ...f.text('marketDefinition', 'Market Definition')
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
                ...f.number('marketIndex', 'Market Index')
            ]),
            f.section('Dates', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

    window.Compensation.primaryKeys = {
        SalaryGrade: 'gradeId',
        SalaryStructure: 'structureId',
        EmployeeCompensation: 'compensationId',
        MeritIncrease: 'increaseId',
        MeritCycle: 'cycleId',
        BonusPlan: 'planId',
        BonusPayment: 'paymentId',
        EquityGrant: 'grantId',
        CompensationStatement: 'statementId',
        MarketBenchmark: 'benchmarkId'
    };

})();
