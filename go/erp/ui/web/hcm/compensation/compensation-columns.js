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
// Compensation Management Module - Column Configurations
// Part 2 of 4 - Load after compensation-enums.js

(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = window.Compensation.enums;
    const internal = window.Compensation._internal;

    window.Compensation.columns = {
        SalaryGrade: [
            ...col.id('gradeId'),
            ...col.basic([['gradeCode', 'Code'], 'name', 'level']),
            ...col.custom('range', 'Salary Range', (item) => internal.renderSalaryRange(item)),
            ...col.money('midpoint', 'Midpoint'),
            ...col.enum('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, internal.renderPayFrequency),
            ...col.boolean('isActive', 'Active')
        ],

        SalaryStructure: [
            ...col.id('structureId'),
            ...col.basic(['code', 'name', ['currencyCode', 'Currency']]),
            ...col.enum('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, internal.renderPayFrequency),
            ...col.custom('grades', 'Grades', (item) => item.grades ? item.grades.length : 0, { sortKey: false }),
            ...col.date('effectiveDate', 'Effective'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeCompensation: [
            ...col.id('compensationId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('compensationType', 'Type', enums.COMPENSATION_TYPE_VALUES, internal.renderCompensationType),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.enum('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, internal.renderPayFrequency),
            ...col.custom('compaRatio', 'Compa Ratio', (item) => internal.renderCompaRatio(item.compaRatio)),
            ...col.date('effectiveDate', 'Effective')
        ],

        MeritIncrease: [
            ...col.id('increaseId'),
            ...col.basic([['employeeId', 'Employee'], ['meritCycleId', 'Cycle']]),
            ...col.money('currentSalary', 'Current'),
            ...col.money('proposedIncrease', 'Increase'),
            ...col.custom('proposedPercentage', 'Increase %', (item) => internal.renderPercentageComp(item.proposedPercentage)),
            ...col.enum('status', 'Status', enums.MERIT_INCREASE_STATUS_VALUES, internal.renderMeritIncreaseStatus),
            ...col.col('performanceRating', 'Rating')
        ],

        MeritCycle: [
            ...col.id('cycleId'),
            ...col.basic(['name', 'year']),
            ...col.enum('status', 'Status', enums.MERIT_CYCLE_STATUS_VALUES, internal.renderMeritCycleStatus),
            ...col.money('totalBudget', 'Budget'),
            ...col.custom('budgetPercentage', 'Budget %', (item) => internal.renderPercentageComp(item.budgetPercentage)),
            ...col.date('effectiveDate', 'Effective')
        ],

        BonusPlan: [
            ...col.id('planId'),
            ...col.basic(['code', 'name']),
            ...col.enum('planType', 'Type', enums.BONUS_PLAN_TYPE_VALUES, internal.renderBonusPlanType),
            ...col.col('planYear', 'Year'),
            ...col.enum('frequency', 'Frequency', enums.BONUS_FREQUENCY_VALUES, internal.renderBonusFrequency),
            ...col.custom('targetPercentage', 'Target %', (item) => internal.renderPercentageComp(item.targetPercentage)),
            ...col.boolean('isActive', 'Active')
        ],

        BonusPayment: [
            ...col.id('paymentId'),
            ...col.basic([['employeeId', 'Employee'], ['bonusPlanId', 'Plan']]),
            ...col.enum('bonusType', 'Type', enums.BONUS_PLAN_TYPE_VALUES, internal.renderBonusPlanType),
            ...col.money('actualAmount', 'Amount'),
            ...col.enum('status', 'Status', enums.BONUS_PAYMENT_STATUS_VALUES, internal.renderBonusPaymentStatus),
            ...col.date('paymentDate', 'Payment Date')
        ],

        EquityGrant: [
            ...col.id('grantId'),
            ...col.basic([['employeeId', 'Employee'], ['grantNumber', 'Grant #']]),
            ...col.enum('grantType', 'Type', enums.EQUITY_GRANT_TYPE_VALUES, internal.renderEquityGrantType),
            ...col.custom('sharesGranted', 'Shares', (item) => internal.renderShares(item.sharesGranted)),
            ...col.money('grantPrice', 'Grant Price'),
            ...col.enum('status', 'Status', enums.EQUITY_GRANT_STATUS_VALUES, internal.renderEquityGrantStatus),
            ...col.date('grantDate', 'Grant Date')
        ],

        CompensationStatement: [
            ...col.id('statementId'),
            ...col.basic([['employeeId', 'Employee'], ['statementYear', 'Year']]),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.money('bonusActual', 'Bonus'),
            ...col.money('equityValue', 'Equity'),
            ...col.money('totalCashCompensation', 'Total Cash'),
            ...col.money('totalCompensation', 'Total Comp')
        ],

        MarketBenchmark: [
            ...col.id('benchmarkId'),
            ...col.basic([['jobTitle', 'Job Title'], ['surveySource', 'Source'], ['surveyYear', 'Year']]),
            ...col.money('market50th', '50th %ile'),
            ...col.money('market75th', '75th %ile'),
            ...col.money('internalAverage', 'Internal Avg'),
            ...col.custom('marketIndex', 'Market Index', (item) => internal.renderCompaRatio(item.marketIndex))
        ]
    };
})();
