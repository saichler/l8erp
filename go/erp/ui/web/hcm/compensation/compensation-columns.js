// Compensation Management Module - Column Configurations
// Part 2 of 4 - Load after compensation-enums.js

(function() {
    'use strict';

    // Import shared utilities
    const { renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // Get enums and render functions from compensation-enums.js
    const enums = window.Compensation.enums;
    const internal = window.Compensation._internal;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const COMPENSATION_COLUMNS = {
        SalaryGrade: [
            { key: 'gradeId', label: 'ID', sortKey: 'gradeId', filterKey: 'gradeId' },
            { key: 'gradeCode', label: 'Code', sortKey: 'gradeCode', filterKey: 'gradeCode' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'level', label: 'Level', sortKey: 'level', filterKey: 'level' },
            {
                key: 'range',
                label: 'Salary Range',
                render: (item) => internal.renderSalaryRange(item)
            },
            {
                key: 'midpoint',
                label: 'Midpoint',
                sortKey: 'midpoint',
                render: (item) => renderMoney(item.midpoint)
            },
            {
                key: 'payFrequency',
                label: 'Frequency',
                sortKey: 'payFrequency',
                filterKey: 'payFrequency',
                enumValues: enums.PAY_FREQUENCY_VALUES,
                render: (item) => internal.renderPayFrequency(item.payFrequency)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        SalaryStructure: [
            { key: 'structureId', label: 'ID', sortKey: 'structureId', filterKey: 'structureId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'currencyCode', label: 'Currency', sortKey: 'currencyCode', filterKey: 'currencyCode' },
            {
                key: 'payFrequency',
                label: 'Frequency',
                sortKey: 'payFrequency',
                filterKey: 'payFrequency',
                enumValues: enums.PAY_FREQUENCY_VALUES,
                render: (item) => internal.renderPayFrequency(item.payFrequency)
            },
            {
                key: 'grades',
                label: 'Grades',
                render: (item) => item.grades ? item.grades.length : 0
            },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        EmployeeCompensation: [
            { key: 'compensationId', label: 'ID', sortKey: 'compensationId', filterKey: 'compensationId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'compensationType',
                label: 'Type',
                sortKey: 'compensationType',
                filterKey: 'compensationType',
                enumValues: enums.COMPENSATION_TYPE_VALUES,
                render: (item) => internal.renderCompensationType(item.compensationType)
            },
            {
                key: 'baseSalary',
                label: 'Base Salary',
                sortKey: 'baseSalary',
                render: (item) => renderMoney(item.baseSalary)
            },
            {
                key: 'payFrequency',
                label: 'Frequency',
                sortKey: 'payFrequency',
                filterKey: 'payFrequency',
                enumValues: enums.PAY_FREQUENCY_VALUES,
                render: (item) => internal.renderPayFrequency(item.payFrequency)
            },
            {
                key: 'compaRatio',
                label: 'Compa Ratio',
                sortKey: 'compaRatio',
                render: (item) => internal.renderCompaRatio(item.compaRatio)
            },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            }
        ],

        MeritIncrease: [
            { key: 'increaseId', label: 'ID', sortKey: 'increaseId', filterKey: 'increaseId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'meritCycleId', label: 'Cycle', sortKey: 'meritCycleId', filterKey: 'meritCycleId' },
            {
                key: 'currentSalary',
                label: 'Current',
                sortKey: 'currentSalary',
                render: (item) => renderMoney(item.currentSalary)
            },
            {
                key: 'proposedIncrease',
                label: 'Increase',
                sortKey: 'proposedIncrease',
                render: (item) => renderMoney(item.proposedIncrease)
            },
            {
                key: 'proposedPercentage',
                label: 'Increase %',
                sortKey: 'proposedPercentage',
                render: (item) => internal.renderPercentageComp(item.proposedPercentage)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.MERIT_INCREASE_STATUS_VALUES,
                render: (item) => internal.renderMeritIncreaseStatus(item.status)
            },
            { key: 'performanceRating', label: 'Rating', sortKey: 'performanceRating' }
        ],

        MeritCycle: [
            { key: 'cycleId', label: 'ID', sortKey: 'cycleId', filterKey: 'cycleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'year', label: 'Year', sortKey: 'year', filterKey: 'year' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.MERIT_CYCLE_STATUS_VALUES,
                render: (item) => internal.renderMeritCycleStatus(item.status)
            },
            {
                key: 'totalBudget',
                label: 'Budget',
                sortKey: 'totalBudget',
                render: (item) => renderMoney(item.totalBudget)
            },
            {
                key: 'budgetPercentage',
                label: 'Budget %',
                sortKey: 'budgetPercentage',
                render: (item) => internal.renderPercentageComp(item.budgetPercentage)
            },
            {
                key: 'effectiveDate',
                label: 'Effective',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            }
        ],

        BonusPlan: [
            { key: 'planId', label: 'ID', sortKey: 'planId', filterKey: 'planId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'planType',
                label: 'Type',
                sortKey: 'planType',
                filterKey: 'planType',
                enumValues: enums.BONUS_PLAN_TYPE_VALUES,
                render: (item) => internal.renderBonusPlanType(item.planType)
            },
            { key: 'planYear', label: 'Year', sortKey: 'planYear', filterKey: 'planYear' },
            {
                key: 'frequency',
                label: 'Frequency',
                sortKey: 'frequency',
                filterKey: 'frequency',
                enumValues: enums.BONUS_FREQUENCY_VALUES,
                render: (item) => internal.renderBonusFrequency(item.frequency)
            },
            {
                key: 'targetPercentage',
                label: 'Target %',
                sortKey: 'targetPercentage',
                render: (item) => internal.renderPercentageComp(item.targetPercentage)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        BonusPayment: [
            { key: 'paymentId', label: 'ID', sortKey: 'paymentId', filterKey: 'paymentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'bonusPlanId', label: 'Plan', sortKey: 'bonusPlanId', filterKey: 'bonusPlanId' },
            {
                key: 'bonusType',
                label: 'Type',
                sortKey: 'bonusType',
                filterKey: 'bonusType',
                enumValues: enums.BONUS_PLAN_TYPE_VALUES,
                render: (item) => internal.renderBonusPlanType(item.bonusType)
            },
            {
                key: 'actualAmount',
                label: 'Amount',
                sortKey: 'actualAmount',
                render: (item) => renderMoney(item.actualAmount)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.BONUS_PAYMENT_STATUS_VALUES,
                render: (item) => internal.renderBonusPaymentStatus(item.status)
            },
            {
                key: 'paymentDate',
                label: 'Payment Date',
                sortKey: 'paymentDate',
                render: (item) => renderDate(item.paymentDate)
            }
        ],

        EquityGrant: [
            { key: 'grantId', label: 'ID', sortKey: 'grantId', filterKey: 'grantId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'grantNumber', label: 'Grant #', sortKey: 'grantNumber', filterKey: 'grantNumber' },
            {
                key: 'grantType',
                label: 'Type',
                sortKey: 'grantType',
                filterKey: 'grantType',
                enumValues: enums.EQUITY_GRANT_TYPE_VALUES,
                render: (item) => internal.renderEquityGrantType(item.grantType)
            },
            {
                key: 'sharesGranted',
                label: 'Shares',
                sortKey: 'sharesGranted',
                render: (item) => internal.renderShares(item.sharesGranted)
            },
            {
                key: 'grantPrice',
                label: 'Grant Price',
                sortKey: 'grantPrice',
                render: (item) => renderMoney(item.grantPrice)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: enums.EQUITY_GRANT_STATUS_VALUES,
                render: (item) => internal.renderEquityGrantStatus(item.status)
            },
            {
                key: 'grantDate',
                label: 'Grant Date',
                sortKey: 'grantDate',
                render: (item) => renderDate(item.grantDate)
            }
        ],

        CompensationStatement: [
            { key: 'statementId', label: 'ID', sortKey: 'statementId', filterKey: 'statementId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'statementYear', label: 'Year', sortKey: 'statementYear', filterKey: 'statementYear' },
            {
                key: 'baseSalary',
                label: 'Base Salary',
                sortKey: 'baseSalary',
                render: (item) => renderMoney(item.baseSalary)
            },
            {
                key: 'bonusActual',
                label: 'Bonus',
                sortKey: 'bonusActual',
                render: (item) => renderMoney(item.bonusActual)
            },
            {
                key: 'equityValue',
                label: 'Equity',
                sortKey: 'equityValue',
                render: (item) => renderMoney(item.equityValue)
            },
            {
                key: 'totalCashCompensation',
                label: 'Total Cash',
                sortKey: 'totalCashCompensation',
                render: (item) => renderMoney(item.totalCashCompensation)
            },
            {
                key: 'totalCompensation',
                label: 'Total Comp',
                sortKey: 'totalCompensation',
                render: (item) => renderMoney(item.totalCompensation)
            }
        ],

        MarketBenchmark: [
            { key: 'benchmarkId', label: 'ID', sortKey: 'benchmarkId', filterKey: 'benchmarkId' },
            { key: 'jobTitle', label: 'Job Title', sortKey: 'jobTitle', filterKey: 'jobTitle' },
            { key: 'surveySource', label: 'Source', sortKey: 'surveySource', filterKey: 'surveySource' },
            { key: 'surveyYear', label: 'Year', sortKey: 'surveyYear', filterKey: 'surveyYear' },
            {
                key: 'market50th',
                label: '50th %ile',
                sortKey: 'market50th',
                render: (item) => renderMoney(item.market50th)
            },
            {
                key: 'market75th',
                label: '75th %ile',
                sortKey: 'market75th',
                render: (item) => renderMoney(item.market75th)
            },
            {
                key: 'internalAverage',
                label: 'Internal Avg',
                sortKey: 'internalAverage',
                render: (item) => renderMoney(item.internalAverage)
            },
            {
                key: 'marketIndex',
                label: 'Market Index',
                sortKey: 'marketIndex',
                render: (item) => internal.renderCompaRatio(item.marketIndex)
            }
        ]
    };

    // ============================================================================
    // EXPORT COLUMNS TO NAMESPACE
    // ============================================================================

    window.Compensation.columns = COMPENSATION_COLUMNS;

})();
