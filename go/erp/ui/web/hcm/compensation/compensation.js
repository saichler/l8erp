// Compensation Management Module - Column Configurations and Form Definitions
// Handles: SalaryGrade, SalaryStructure, EmployeeCompensation, MeritIncrease, MeritCycle, BonusPlan, BonusPayment, EquityGrant, CompensationStatement, MarketBenchmark

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney, formatNumber } = ERPUtils;
    const { renderEnum, createStatusRenderer, renderBoolean, renderDate, renderMoney } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COMPENSATION_TYPE = {
        0: 'Unspecified',
        1: 'Salary',
        2: 'Hourly',
        3: 'Commission',
        4: 'Piece Rate'
    };

    const COMPENSATION_TYPE_VALUES = {
        'salary': 1,
        'hourly': 2,
        'commission': 3,
        'piece': 4,
        'rate': 4
    };

    const MERIT_INCREASE_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Under Review',
        4: 'Approved',
        5: 'Rejected',
        6: 'Processed'
    };

    const MERIT_INCREASE_STATUS_VALUES = {
        'draft': 1,
        'submitted': 2,
        'review': 3,
        'approved': 4,
        'rejected': 5,
        'processed': 6
    };

    const MERIT_INCREASE_STATUS_CLASSES = {
        1: 'erp-status-inactive',    // Draft
        2: 'erp-status-pending',     // Submitted
        3: 'erp-status-pending',     // Under Review
        4: 'erp-status-active',      // Approved
        5: 'erp-status-terminated',  // Rejected
        6: 'erp-status-active'       // Processed
    };

    const MERIT_CYCLE_STATUS = {
        0: 'Unspecified',
        1: 'Planning',
        2: 'Open',
        3: 'Under Review',
        4: 'Approved',
        5: 'Closed'
    };

    const MERIT_CYCLE_STATUS_VALUES = {
        'planning': 1,
        'open': 2,
        'review': 3,
        'approved': 4,
        'closed': 5
    };

    const MERIT_CYCLE_STATUS_CLASSES = {
        1: 'erp-status-pending',     // Planning
        2: 'erp-status-active',      // Open
        3: 'erp-status-pending',     // Under Review
        4: 'erp-status-active',      // Approved
        5: 'erp-status-inactive'     // Closed
    };

    const BONUS_PLAN_TYPE = {
        0: 'Unspecified',
        1: 'Annual',
        2: 'Spot',
        3: 'Signing',
        4: 'Retention',
        5: 'Referral',
        6: 'Performance',
        7: 'Profit Sharing',
        8: 'Project',
        9: 'Sales Commission'
    };

    const BONUS_PLAN_TYPE_VALUES = {
        'annual': 1,
        'spot': 2,
        'signing': 3,
        'retention': 4,
        'referral': 5,
        'performance': 6,
        'profit': 7,
        'sharing': 7,
        'project': 8,
        'sales': 9,
        'commission': 9
    };

    const BONUS_FREQUENCY = {
        0: 'Unspecified',
        1: 'Annual',
        2: 'Semi-Annual',
        3: 'Quarterly',
        4: 'Monthly',
        5: 'One-Time'
    };

    const BONUS_FREQUENCY_VALUES = {
        'annual': 1,
        'semi': 2,
        'quarterly': 3,
        'monthly': 4,
        'onetime': 5,
        'one': 5
    };

    const BONUS_FUNDING_TYPE = {
        0: 'Unspecified',
        1: 'Fixed',
        2: '% of Profits',
        3: '% of Revenue',
        4: 'Discretionary'
    };

    const BONUS_FUNDING_TYPE_VALUES = {
        'fixed': 1,
        'profits': 2,
        'revenue': 3,
        'discretionary': 4
    };

    const BONUS_PAYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending Approval',
        3: 'Approved',
        4: 'Scheduled',
        5: 'Paid',
        6: 'Cancelled'
    };

    const BONUS_PAYMENT_STATUS_VALUES = {
        'draft': 1,
        'pending': 2,
        'approved': 3,
        'scheduled': 4,
        'paid': 5,
        'cancelled': 6
    };

    const BONUS_PAYMENT_STATUS_CLASSES = {
        1: 'erp-status-inactive',    // Draft
        2: 'erp-status-pending',     // Pending Approval
        3: 'erp-status-active',      // Approved
        4: 'erp-status-pending',     // Scheduled
        5: 'erp-status-active',      // Paid
        6: 'erp-status-terminated'   // Cancelled
    };

    const EQUITY_GRANT_TYPE = {
        0: 'Unspecified',
        1: 'ISO',
        2: 'NSO',
        3: 'RSU',
        4: 'RSA',
        5: 'ESPP',
        6: 'Phantom',
        7: 'SAR'
    };

    const EQUITY_GRANT_TYPE_VALUES = {
        'iso': 1,
        'nso': 2,
        'rsu': 3,
        'rsa': 4,
        'espp': 5,
        'phantom': 6,
        'sar': 7
    };

    const EQUITY_GRANT_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Active',
        3: 'Fully Vested',
        4: 'Exercised',
        5: 'Expired',
        6: 'Forfeited',
        7: 'Cancelled'
    };

    const EQUITY_GRANT_STATUS_VALUES = {
        'pending': 1,
        'active': 2,
        'vested': 3,
        'fully': 3,
        'exercised': 4,
        'expired': 5,
        'forfeited': 6,
        'cancelled': 7
    };

    const EQUITY_GRANT_STATUS_CLASSES = {
        1: 'erp-status-pending',     // Pending
        2: 'erp-status-active',      // Active
        3: 'erp-status-active',      // Fully Vested
        4: 'erp-status-active',      // Exercised
        5: 'erp-status-inactive',    // Expired
        6: 'erp-status-terminated',  // Forfeited
        7: 'erp-status-terminated'   // Cancelled
    };

    const VESTING_TYPE = {
        0: 'Unspecified',
        1: 'Time-Based',
        2: 'Performance-Based',
        3: 'Hybrid',
        4: 'Immediate'
    };

    const VESTING_TYPE_VALUES = {
        'time': 1,
        'performance': 2,
        'hybrid': 3,
        'immediate': 4
    };

    const VESTING_FREQUENCY = {
        0: 'Unspecified',
        1: 'Monthly',
        2: 'Quarterly',
        3: 'Annually'
    };

    const VESTING_FREQUENCY_VALUES = {
        'monthly': 1,
        'quarterly': 2,
        'annually': 3,
        'annual': 3
    };

    // PAY_FREQUENCY - duplicated from payroll.js for module independence
    const PAY_FREQUENCY = {
        0: 'Unspecified',
        1: 'Weekly',
        2: 'Bi-Weekly',
        3: 'Semi-Monthly',
        4: 'Monthly',
        5: 'Quarterly',
        6: 'Annually'
    };

    const PAY_FREQUENCY_VALUES = {
        'weekly': 1,
        'biweekly': 2,
        'bi-weekly': 2,
        'semimonthly': 3,
        'semi-monthly': 3,
        'monthly': 4,
        'quarterly': 5,
        'annually': 6,
        'annual': 6
    };

    // ============================================================================
    // STATUS RENDERERS (using factory)
    // ============================================================================

    const renderMeritIncreaseStatus = createStatusRenderer(MERIT_INCREASE_STATUS, MERIT_INCREASE_STATUS_CLASSES);
    const renderMeritCycleStatus = createStatusRenderer(MERIT_CYCLE_STATUS, MERIT_CYCLE_STATUS_CLASSES);
    const renderBonusPaymentStatus = createStatusRenderer(BONUS_PAYMENT_STATUS, BONUS_PAYMENT_STATUS_CLASSES);
    const renderEquityGrantStatus = createStatusRenderer(EQUITY_GRANT_STATUS, EQUITY_GRANT_STATUS_CLASSES);

    // ============================================================================
    // MODULE-SPECIFIC RENDERERS
    // ============================================================================

    function renderCompensationType(type) {
        return renderEnum(type, COMPENSATION_TYPE);
    }

    function renderBonusPlanType(type) {
        return renderEnum(type, BONUS_PLAN_TYPE);
    }

    function renderBonusFrequency(freq) {
        return renderEnum(freq, BONUS_FREQUENCY);
    }

    function renderBonusFundingType(type) {
        return renderEnum(type, BONUS_FUNDING_TYPE);
    }

    function renderEquityGrantType(type) {
        return renderEnum(type, EQUITY_GRANT_TYPE);
    }

    function renderVestingType(type) {
        return renderEnum(type, VESTING_TYPE);
    }

    function renderVestingFrequency(freq) {
        return renderEnum(freq, VESTING_FREQUENCY);
    }

    function renderPayFrequency(freq) {
        return PAY_FREQUENCY[freq] || 'Unknown';
    }

    function renderPercentageComp(value) {
        if (value === null || value === undefined) return '-';
        return `${value.toFixed(1)}%`;
    }

    function renderCompaRatio(ratio) {
        if (ratio === null || ratio === undefined) return '-';
        const percentage = (ratio * 100).toFixed(1);
        let cssClass = '';
        if (ratio < 0.85) cssClass = 'erp-status-terminated';
        else if (ratio < 0.95) cssClass = 'erp-status-pending';
        else if (ratio <= 1.05) cssClass = 'erp-status-active';
        else if (ratio <= 1.15) cssClass = 'erp-status-pending';
        else cssClass = 'erp-status-terminated';
        return `<span class="erp-status ${cssClass}">${percentage}%</span>`;
    }

    function renderShares(shares) {
        if (shares === null || shares === undefined) return '-';
        return new Intl.NumberFormat('en-US').format(shares);
    }

    function renderSalaryRange(item) {
        const min = renderMoney(item.minimum);
        const max = renderMoney(item.maximum);
        if (min === '-' && max === '-') return '-';
        return `${min} - ${max}`;
    }

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
                render: (item) => renderSalaryRange(item)
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
                enumValues: PAY_FREQUENCY_VALUES,
                render: (item) => renderPayFrequency(item.payFrequency)
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
                enumValues: PAY_FREQUENCY_VALUES,
                render: (item) => renderPayFrequency(item.payFrequency)
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
                enumValues: COMPENSATION_TYPE_VALUES,
                render: (item) => renderCompensationType(item.compensationType)
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
                enumValues: PAY_FREQUENCY_VALUES,
                render: (item) => renderPayFrequency(item.payFrequency)
            },
            {
                key: 'compaRatio',
                label: 'Compa Ratio',
                sortKey: 'compaRatio',
                render: (item) => renderCompaRatio(item.compaRatio)
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
                render: (item) => renderPercentageComp(item.proposedPercentage)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: MERIT_INCREASE_STATUS_VALUES,
                render: (item) => renderMeritIncreaseStatus(item.status)
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
                enumValues: MERIT_CYCLE_STATUS_VALUES,
                render: (item) => renderMeritCycleStatus(item.status)
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
                render: (item) => renderPercentageComp(item.budgetPercentage)
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
                enumValues: BONUS_PLAN_TYPE_VALUES,
                render: (item) => renderBonusPlanType(item.planType)
            },
            { key: 'planYear', label: 'Year', sortKey: 'planYear', filterKey: 'planYear' },
            {
                key: 'frequency',
                label: 'Frequency',
                sortKey: 'frequency',
                filterKey: 'frequency',
                enumValues: BONUS_FREQUENCY_VALUES,
                render: (item) => renderBonusFrequency(item.frequency)
            },
            {
                key: 'targetPercentage',
                label: 'Target %',
                sortKey: 'targetPercentage',
                render: (item) => renderPercentageComp(item.targetPercentage)
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
                enumValues: BONUS_PLAN_TYPE_VALUES,
                render: (item) => renderBonusPlanType(item.bonusType)
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
                enumValues: BONUS_PAYMENT_STATUS_VALUES,
                render: (item) => renderBonusPaymentStatus(item.status)
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
                enumValues: EQUITY_GRANT_TYPE_VALUES,
                render: (item) => renderEquityGrantType(item.grantType)
            },
            {
                key: 'sharesGranted',
                label: 'Shares',
                sortKey: 'sharesGranted',
                render: (item) => renderShares(item.sharesGranted)
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
                enumValues: EQUITY_GRANT_STATUS_VALUES,
                render: (item) => renderEquityGrantStatus(item.status)
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
                render: (item) => renderCompaRatio(item.marketIndex)
            }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const COMPENSATION_FORMS = {
        SalaryGrade: {
            title: 'Salary Grade',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'salaryStructureId', label: 'Salary Structure', type: 'lookup', lookupModel: 'SalaryStructure' },
                        { key: 'gradeCode', label: 'Grade Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'level', label: 'Level', type: 'number', required: true }
                    ]
                },
                {
                    title: 'Salary Range',
                    fields: [
                        { key: 'minimum.amount', label: 'Minimum (cents)', type: 'number', required: true },
                        { key: 'midpoint.amount', label: 'Midpoint (cents)', type: 'number', required: true },
                        { key: 'maximum.amount', label: 'Maximum (cents)', type: 'number', required: true },
                        { key: 'spreadPercentage', label: 'Spread %', type: 'number' },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: PAY_FREQUENCY }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        SalaryStructure: {
            title: 'Salary Structure',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Settings',
                    fields: [
                        { key: 'currencyCode', label: 'Currency', type: 'text', required: true },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: PAY_FREQUENCY, required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeCompensation: {
            title: 'Employee Compensation',
            sections: [
                {
                    title: 'Employee',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'compensationType', label: 'Compensation Type', type: 'select', options: COMPENSATION_TYPE, required: true },
                        { key: 'salaryGradeId', label: 'Salary Grade', type: 'lookup', lookupModel: 'SalaryGrade' }
                    ]
                },
                {
                    title: 'Compensation',
                    fields: [
                        { key: 'baseSalary.amount', label: 'Base Salary (cents)', type: 'number', required: true },
                        { key: 'hourlyRate.amount', label: 'Hourly Rate (cents)', type: 'number' },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: PAY_FREQUENCY, required: true },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'compaRatio', label: 'Compa Ratio', type: 'number' },
                        { key: 'fte', label: 'FTE', type: 'number' }
                    ]
                },
                {
                    title: 'Effective Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'changeReason', label: 'Change Reason', type: 'text' }
                    ]
                }
            ]
        },

        MeritIncrease: {
            title: 'Merit Increase',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'meritCycleId', label: 'Merit Cycle', type: 'lookup', lookupModel: 'MeritCycle', required: true },
                        { key: 'reviewId', label: 'Performance Review', type: 'lookup', lookupModel: 'PerformanceReview' },
                        { key: 'status', label: 'Status', type: 'select', options: MERIT_INCREASE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Salary',
                    fields: [
                        { key: 'currentSalary.amount', label: 'Current Salary (cents)', type: 'number' },
                        { key: 'proposedIncrease.amount', label: 'Proposed Increase (cents)', type: 'number' },
                        { key: 'proposedPercentage', label: 'Proposed %', type: 'number' },
                        { key: 'newSalary.amount', label: 'New Salary (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Performance',
                    fields: [
                        { key: 'performanceRating', label: 'Performance Rating', type: 'number' },
                        { key: 'compaRatioBefore', label: 'Compa Ratio Before', type: 'number' },
                        { key: 'compaRatioAfter', label: 'Compa Ratio After', type: 'number' }
                    ]
                },
                {
                    title: 'Effective Date',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        MeritCycle: {
            title: 'Merit Cycle',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'year', label: 'Year', type: 'number', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: MERIT_CYCLE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'planningStartDate', label: 'Planning Start', type: 'date' },
                        { key: 'planningEndDate', label: 'Planning End', type: 'date' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' }
                    ]
                },
                {
                    title: 'Budget',
                    fields: [
                        { key: 'totalBudget.amount', label: 'Total Budget (cents)', type: 'number' },
                        { key: 'budgetPercentage', label: 'Budget %', type: 'number' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        BonusPlan: {
            title: 'Bonus Plan',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'planType', label: 'Plan Type', type: 'select', options: BONUS_PLAN_TYPE, required: true },
                        { key: 'planYear', label: 'Plan Year', type: 'number', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: BONUS_FREQUENCY }
                    ]
                },
                {
                    title: 'Target',
                    fields: [
                        { key: 'targetPercentage', label: 'Target %', type: 'number' },
                        { key: 'maximumPercentage', label: 'Maximum %', type: 'number' },
                        { key: 'targetAmount.amount', label: 'Target Amount (cents)', type: 'number' },
                        { key: 'maximumAmount.amount', label: 'Maximum Amount (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Funding',
                    fields: [
                        { key: 'fundingType', label: 'Funding Type', type: 'select', options: BONUS_FUNDING_TYPE },
                        { key: 'fundingPoolPercentage', label: 'Funding Pool %', type: 'number' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'payoutDate', label: 'Payout Date', type: 'date' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BonusPayment: {
            title: 'Bonus Payment',
            sections: [
                {
                    title: 'Payment Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'bonusPlanId', label: 'Bonus Plan', type: 'lookup', lookupModel: 'BonusPlan' },
                        { key: 'bonusType', label: 'Bonus Type', type: 'select', options: BONUS_PLAN_TYPE, required: true },
                        { key: 'reason', label: 'Reason', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: BONUS_PAYMENT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Amount',
                    fields: [
                        { key: 'targetAmount.amount', label: 'Target Amount (cents)', type: 'number' },
                        { key: 'actualAmount.amount', label: 'Actual Amount (cents)', type: 'number', required: true },
                        { key: 'payoutPercentage', label: 'Payout %', type: 'number' }
                    ]
                },
                {
                    title: 'Performance Factors',
                    fields: [
                        { key: 'individualPerformanceFactor', label: 'Individual Factor', type: 'number' },
                        { key: 'teamPerformanceFactor', label: 'Team Factor', type: 'number' },
                        { key: 'companyPerformanceFactor', label: 'Company Factor', type: 'number' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'awardDate', label: 'Award Date', type: 'date' },
                        { key: 'paymentDate', label: 'Payment Date', type: 'date' },
                        { key: 'isTaxable', label: 'Taxable', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        EquityGrant: {
            title: 'Equity Grant',
            sections: [
                {
                    title: 'Grant Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'grantType', label: 'Grant Type', type: 'select', options: EQUITY_GRANT_TYPE, required: true },
                        { key: 'grantNumber', label: 'Grant Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: EQUITY_GRANT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Shares & Value',
                    fields: [
                        { key: 'sharesGranted', label: 'Shares Granted', type: 'number', required: true },
                        { key: 'grantPrice.amount', label: 'Grant Price (cents)', type: 'number' },
                        { key: 'fairMarketValue.amount', label: 'Fair Market Value (cents)', type: 'number' },
                        { key: 'totalValue.amount', label: 'Total Value (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Vesting',
                    fields: [
                        { key: 'sharesVested', label: 'Shares Vested', type: 'number' },
                        { key: 'sharesUnvested', label: 'Shares Unvested', type: 'number' },
                        { key: 'sharesExercised', label: 'Shares Exercised', type: 'number' },
                        { key: 'sharesForfeited', label: 'Shares Forfeited', type: 'number' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'grantDate', label: 'Grant Date', type: 'date', required: true },
                        { key: 'vestStartDate', label: 'Vest Start Date', type: 'date' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CompensationStatement: {
            title: 'Compensation Statement',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'statementYear', label: 'Year', type: 'number', required: true },
                        { key: 'asOfDate', label: 'As Of Date', type: 'date' }
                    ]
                },
                {
                    title: 'Base Compensation',
                    fields: [
                        { key: 'baseSalary.amount', label: 'Base Salary (cents)', type: 'number' },
                        { key: 'hourlyEquivalent.amount', label: 'Hourly Equivalent (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Variable Pay',
                    fields: [
                        { key: 'bonusTarget.amount', label: 'Bonus Target (cents)', type: 'number' },
                        { key: 'bonusActual.amount', label: 'Bonus Actual (cents)', type: 'number' },
                        { key: 'commissions.amount', label: 'Commissions (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Equity',
                    fields: [
                        { key: 'equityValue.amount', label: 'Equity Value (cents)', type: 'number' },
                        { key: 'equityShares', label: 'Equity Shares', type: 'number' }
                    ]
                },
                {
                    title: 'Output',
                    fields: [
                        { key: 'pdfUrl', label: 'PDF URL', type: 'text' }
                    ]
                }
            ]
        },

        MarketBenchmark: {
            title: 'Market Benchmark',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'jobId', label: 'Job', type: 'lookup', lookupModel: 'Job' },
                        { key: 'jobTitle', label: 'Job Title', type: 'text', required: true },
                        { key: 'surveySource', label: 'Survey Source', type: 'text', required: true },
                        { key: 'surveyYear', label: 'Survey Year', type: 'number', required: true },
                        { key: 'marketDefinition', label: 'Market Definition', type: 'text' }
                    ]
                },
                {
                    title: 'Market Data (Base)',
                    fields: [
                        { key: 'market25th.amount', label: '25th Percentile (cents)', type: 'number' },
                        { key: 'market50th.amount', label: '50th Percentile (cents)', type: 'number' },
                        { key: 'market75th.amount', label: '75th Percentile (cents)', type: 'number' },
                        { key: 'market90th.amount', label: '90th Percentile (cents)', type: 'number' },
                        { key: 'marketAverage.amount', label: 'Market Average (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Total Cash Data',
                    fields: [
                        { key: 'totalCash25th.amount', label: 'Total Cash 25th (cents)', type: 'number' },
                        { key: 'totalCash50th.amount', label: 'Total Cash 50th (cents)', type: 'number' },
                        { key: 'totalCash75th.amount', label: 'Total Cash 75th (cents)', type: 'number' }
                    ]
                },
                {
                    title: 'Comparison',
                    fields: [
                        { key: 'internalAverage.amount', label: 'Internal Average (cents)', type: 'number' },
                        { key: 'marketIndex', label: 'Market Index', type: 'number' }
                    ]
                },
                {
                    title: 'Dates',
                    fields: [
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    const COMPENSATION_PRIMARY_KEYS = {
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

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.Compensation = {
        columns: COMPENSATION_COLUMNS,
        forms: COMPENSATION_FORMS,
        primaryKeys: COMPENSATION_PRIMARY_KEYS,
        enums: {
            COMPENSATION_TYPE,
            COMPENSATION_TYPE_VALUES,
            MERIT_INCREASE_STATUS,
            MERIT_INCREASE_STATUS_VALUES,
            MERIT_CYCLE_STATUS,
            MERIT_CYCLE_STATUS_VALUES,
            BONUS_PLAN_TYPE,
            BONUS_PLAN_TYPE_VALUES,
            BONUS_FREQUENCY,
            BONUS_FREQUENCY_VALUES,
            BONUS_FUNDING_TYPE,
            BONUS_FUNDING_TYPE_VALUES,
            BONUS_PAYMENT_STATUS,
            BONUS_PAYMENT_STATUS_VALUES,
            EQUITY_GRANT_TYPE,
            EQUITY_GRANT_TYPE_VALUES,
            EQUITY_GRANT_STATUS,
            EQUITY_GRANT_STATUS_VALUES,
            VESTING_TYPE,
            VESTING_TYPE_VALUES,
            VESTING_FREQUENCY,
            VESTING_FREQUENCY_VALUES,
            PAY_FREQUENCY,
            PAY_FREQUENCY_VALUES
        },
        render: {
            compensationType: renderCompensationType,
            meritIncreaseStatus: renderMeritIncreaseStatus,
            meritCycleStatus: renderMeritCycleStatus,
            bonusPlanType: renderBonusPlanType,
            bonusFrequency: renderBonusFrequency,
            bonusFundingType: renderBonusFundingType,
            bonusPaymentStatus: renderBonusPaymentStatus,
            equityGrantType: renderEquityGrantType,
            equityGrantStatus: renderEquityGrantStatus,
            vestingType: renderVestingType,
            vestingFrequency: renderVestingFrequency,
            payFrequency: renderPayFrequency,
            money: renderMoney,
            boolean: renderBoolean,
            date: renderDate,
            percentage: renderPercentageComp,
            compaRatio: renderCompaRatio,
            shares: renderShares,
            salaryRange: renderSalaryRange
        }
    };

})();
