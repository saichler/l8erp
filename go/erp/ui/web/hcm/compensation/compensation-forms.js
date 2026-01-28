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
// Compensation Management Module - Form Definitions
// Part 3 of 4 - Load after compensation-columns.js

(function() {
    'use strict';

    // Get enums from compensation-enums.js
    const enums = window.Compensation.enums;

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
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'salaryStructureId', label: 'Salary Structure', type: 'reference', lookupModel: 'SalaryStructure' },
                        { key: 'gradeCode', label: 'Grade Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'level', label: 'Level', type: 'number', required: true }
                    ]
                },
                {
                    title: 'Salary Range',
                    fields: [
                        { key: 'minimum.amount', label: 'Minimum', type: 'currency', required: true },
                        { key: 'midpoint.amount', label: 'Midpoint', type: 'currency', required: true },
                        { key: 'maximum.amount', label: 'Maximum', type: 'currency', required: true },
                        { key: 'spreadPercentage', label: 'Spread', type: 'percentage' },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: enums.PAY_FREQUENCY }
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
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                },
                {
                    title: 'Settings',
                    fields: [
                        { key: 'currencyCode', label: 'Currency', type: 'text', required: true },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: enums.PAY_FREQUENCY, required: true }
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'compensationType', label: 'Compensation Type', type: 'select', options: enums.COMPENSATION_TYPE, required: true },
                        { key: 'salaryGradeId', label: 'Salary Grade', type: 'reference', lookupModel: 'SalaryGrade' }
                    ]
                },
                {
                    title: 'Compensation',
                    fields: [
                        { key: 'baseSalary.amount', label: 'Base Salary', type: 'currency', required: true },
                        { key: 'hourlyRate.amount', label: 'Hourly Rate', type: 'currency' },
                        { key: 'payFrequency', label: 'Pay Frequency', type: 'select', options: enums.PAY_FREQUENCY, required: true },
                        { key: 'currencyCode', label: 'Currency', type: 'text' },
                        { key: 'compaRatio', label: 'Compa Ratio', type: 'percentage' },
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'meritCycleId', label: 'Merit Cycle', type: 'reference', lookupModel: 'MeritCycle', required: true },
                        { key: 'reviewId', label: 'Performance Review', type: 'reference', lookupModel: 'PerformanceReview' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MERIT_INCREASE_STATUS, required: true }
                    ]
                },
                {
                    title: 'Salary',
                    fields: [
                        { key: 'currentSalary.amount', label: 'Current Salary', type: 'currency' },
                        { key: 'proposedIncrease.amount', label: 'Proposed Increase', type: 'currency' },
                        { key: 'proposedPercentage', label: 'Proposed', type: 'percentage' },
                        { key: 'newSalary.amount', label: 'New Salary', type: 'currency' }
                    ]
                },
                {
                    title: 'Performance',
                    fields: [
                        { key: 'performanceRating', label: 'Performance Rating', type: 'rating', min: 1, max: 5 },
                        { key: 'compaRatioBefore', label: 'Compa Ratio Before', type: 'percentage' },
                        { key: 'compaRatioAfter', label: 'Compa Ratio After', type: 'percentage' }
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
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'year', label: 'Year', type: 'number', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.MERIT_CYCLE_STATUS, required: true }
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
                        { key: 'totalBudget.amount', label: 'Total Budget', type: 'currency' },
                        { key: 'budgetPercentage', label: 'Budget', type: 'percentage' },
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
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'planType', label: 'Plan Type', type: 'select', options: enums.BONUS_PLAN_TYPE, required: true },
                        { key: 'planYear', label: 'Plan Year', type: 'number', required: true },
                        { key: 'frequency', label: 'Frequency', type: 'select', options: enums.BONUS_FREQUENCY }
                    ]
                },
                {
                    title: 'Target',
                    fields: [
                        { key: 'targetPercentage', label: 'Target', type: 'percentage' },
                        { key: 'maximumPercentage', label: 'Maximum', type: 'percentage' },
                        { key: 'targetAmount.amount', label: 'Target Amount', type: 'currency' },
                        { key: 'maximumAmount.amount', label: 'Maximum Amount', type: 'currency' }
                    ]
                },
                {
                    title: 'Funding',
                    fields: [
                        { key: 'fundingType', label: 'Funding Type', type: 'select', options: enums.BONUS_FUNDING_TYPE },
                        { key: 'fundingPoolPercentage', label: 'Funding Pool', type: 'percentage' }
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'bonusPlanId', label: 'Bonus Plan', type: 'reference', lookupModel: 'BonusPlan' },
                        { key: 'bonusType', label: 'Bonus Type', type: 'select', options: enums.BONUS_PLAN_TYPE, required: true },
                        { key: 'reason', label: 'Reason', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.BONUS_PAYMENT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Amount',
                    fields: [
                        { key: 'targetAmount.amount', label: 'Target Amount', type: 'currency' },
                        { key: 'actualAmount.amount', label: 'Actual Amount', type: 'currency', required: true },
                        { key: 'payoutPercentage', label: 'Payout', type: 'percentage' }
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'grantType', label: 'Grant Type', type: 'select', options: enums.EQUITY_GRANT_TYPE, required: true },
                        { key: 'grantNumber', label: 'Grant Number', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.EQUITY_GRANT_STATUS, required: true }
                    ]
                },
                {
                    title: 'Shares & Value',
                    fields: [
                        { key: 'sharesGranted', label: 'Shares Granted', type: 'number', required: true },
                        { key: 'grantPrice.amount', label: 'Grant Price', type: 'currency' },
                        { key: 'fairMarketValue.amount', label: 'Fair Market Value', type: 'currency' },
                        { key: 'totalValue.amount', label: 'Total Value', type: 'currency' }
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
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'statementYear', label: 'Year', type: 'number', required: true },
                        { key: 'asOfDate', label: 'As Of Date', type: 'date' }
                    ]
                },
                {
                    title: 'Base Compensation',
                    fields: [
                        { key: 'baseSalary.amount', label: 'Base Salary', type: 'currency' },
                        { key: 'hourlyEquivalent.amount', label: 'Hourly Equivalent', type: 'currency' }
                    ]
                },
                {
                    title: 'Variable Pay',
                    fields: [
                        { key: 'bonusTarget.amount', label: 'Bonus Target', type: 'currency' },
                        { key: 'bonusActual.amount', label: 'Bonus Actual', type: 'currency' },
                        { key: 'commissions.amount', label: 'Commissions', type: 'currency' }
                    ]
                },
                {
                    title: 'Equity',
                    fields: [
                        { key: 'equityValue.amount', label: 'Equity Value', type: 'currency' },
                        { key: 'equityShares', label: 'Equity Shares', type: 'number' }
                    ]
                },
                {
                    title: 'Output',
                    fields: [
                        { key: 'pdfUrl', label: 'PDF URL', type: 'url' }
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
                        { key: 'organizationId', label: 'Organization', type: 'reference', lookupModel: 'Organization' },
                        { key: 'jobId', label: 'Job', type: 'reference', lookupModel: 'Job' },
                        { key: 'jobTitle', label: 'Job Title', type: 'text', required: true },
                        { key: 'surveySource', label: 'Survey Source', type: 'text', required: true },
                        { key: 'surveyYear', label: 'Survey Year', type: 'number', required: true },
                        { key: 'marketDefinition', label: 'Market Definition', type: 'text' }
                    ]
                },
                {
                    title: 'Market Data (Base)',
                    fields: [
                        { key: 'market25th.amount', label: '25th Percentile', type: 'currency' },
                        { key: 'market50th.amount', label: '50th Percentile', type: 'currency' },
                        { key: 'market75th.amount', label: '75th Percentile', type: 'currency' },
                        { key: 'market90th.amount', label: '90th Percentile', type: 'currency' },
                        { key: 'marketAverage.amount', label: 'Market Average', type: 'currency' }
                    ]
                },
                {
                    title: 'Total Cash Data',
                    fields: [
                        { key: 'totalCash25th.amount', label: 'Total Cash 25th', type: 'currency' },
                        { key: 'totalCash50th.amount', label: 'Total Cash 50th', type: 'currency' },
                        { key: 'totalCash75th.amount', label: 'Total Cash 75th', type: 'currency' }
                    ]
                },
                {
                    title: 'Comparison',
                    fields: [
                        { key: 'internalAverage.amount', label: 'Internal Average', type: 'currency' },
                        { key: 'marketIndex', label: 'Market Index', type: 'percentage' }
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
    // EXPORT FORMS TO NAMESPACE
    // ============================================================================

    window.Compensation.forms = COMPENSATION_FORMS;
    window.Compensation.primaryKeys = COMPENSATION_PRIMARY_KEYS;

})();
