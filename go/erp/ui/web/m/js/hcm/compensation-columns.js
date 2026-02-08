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
 * Mobile Compensation Management Module - Column Configurations
 * Desktop Equivalent: hcm/compensation/compensation-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompensation.enums;
    const render = MobileCompensation.render;

    MobileCompensation.columns = {
        SalaryGrade: [
            ...col.id('gradeId'),
            ...col.col('gradeCode', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('level', 'Level'),
            ...col.custom('range', 'Salary Range', (item) => render.salaryRange(item)),
            ...col.money('midpoint', 'Midpoint'),
            ...col.status('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, render.payFrequency),
            ...col.boolean('isActive', 'Active')
        ],

        SalaryStructure: [
            ...col.id('structureId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.col('currencyId', 'Currency'),
            ...col.status('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, render.payFrequency),
            ...col.custom('grades', 'Grades', (item) => item.grades ? item.grades.length : 0),
            ...col.date('effectiveDate', 'Effective'),
            ...col.boolean('isActive', 'Active')
        ],

        EmployeeCompensation: [
            ...col.id('compensationId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('compensationType', 'Type', enums.COMPENSATION_TYPE_VALUES, render.compensationType),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.status('payFrequency', 'Frequency', enums.PAY_FREQUENCY_VALUES, render.payFrequency),
            ...col.custom('compaRatio', 'Compa Ratio', (item) => render.compaRatio(item.compaRatio)),
            ...col.date('effectiveDate', 'Effective')
        ],

        MeritIncrease: [
            ...col.id('increaseId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('meritCycleId', 'Cycle'),
            ...col.money('currentSalary', 'Current'),
            ...col.money('proposedIncrease', 'Increase'),
            ...col.custom('proposedPercentage', 'Increase %', (item) => render.percentage(item.proposedPercentage)),
            ...col.status('status', 'Status', enums.MERIT_INCREASE_STATUS_VALUES, render.meritIncreaseStatus),
            ...col.col('performanceRating', 'Rating')
        ],

        MeritCycle: [
            ...col.id('cycleId'),
            ...col.col('name', 'Name'),
            ...col.col('year', 'Year'),
            ...col.status('status', 'Status', enums.MERIT_CYCLE_STATUS_VALUES, render.meritCycleStatus),
            ...col.money('totalBudget', 'Budget'),
            ...col.custom('budgetPercentage', 'Budget %', (item) => render.percentage(item.budgetPercentage)),
            ...col.date('effectiveDate', 'Effective')
        ],

        BonusPlan: [
            ...col.id('planId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('planType', 'Type', enums.BONUS_PLAN_TYPE_VALUES, render.bonusPlanType),
            ...col.col('planYear', 'Year'),
            ...col.status('frequency', 'Frequency', enums.BONUS_FREQUENCY_VALUES, render.bonusFrequency),
            ...col.custom('targetPercentage', 'Target %', (item) => render.percentage(item.targetPercentage)),
            ...col.boolean('isActive', 'Active')
        ],

        BonusPayment: [
            ...col.id('paymentId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('bonusPlanId', 'Plan'),
            ...col.status('bonusType', 'Type', enums.BONUS_PLAN_TYPE_VALUES, render.bonusPlanType),
            ...col.money('actualAmount', 'Amount'),
            ...col.status('status', 'Status', enums.BONUS_PAYMENT_STATUS_VALUES, render.bonusPaymentStatus),
            ...col.date('paymentDate', 'Payment Date')
        ],

        EquityGrant: [
            ...col.id('grantId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('grantNumber', 'Grant #'),
            ...col.status('grantType', 'Type', enums.EQUITY_GRANT_TYPE_VALUES, render.equityGrantType),
            ...col.custom('sharesGranted', 'Shares', (item) => render.shares(item.sharesGranted)),
            ...col.money('grantPrice', 'Grant Price'),
            ...col.status('status', 'Status', enums.EQUITY_GRANT_STATUS_VALUES, render.equityGrantStatus),
            ...col.date('grantDate', 'Grant Date')
        ],

        CompensationStatement: [
            ...col.id('statementId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('statementYear', 'Year'),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.money('bonusActual', 'Bonus'),
            ...col.money('equityValue', 'Equity'),
            ...col.money('totalCashCompensation', 'Total Cash'),
            ...col.money('totalCompensation', 'Total Comp')
        ],

        MarketBenchmark: [
            ...col.id('benchmarkId'),
            ...col.col('jobTitle', 'Job Title'),
            ...col.col('surveySource', 'Source'),
            ...col.col('surveyYear', 'Year'),
            ...col.money('market50th', '50th %ile'),
            ...col.money('market75th', '75th %ile'),
            ...col.money('internalAverage', 'Internal Avg'),
            ...col.custom('marketIndex', 'Market Index', (item) => render.compaRatio(item.marketIndex))
        ]
    };

    MobileCompensation.primaryKeys = {
        SalaryGrade: 'gradeId', SalaryStructure: 'structureId', EmployeeCompensation: 'compensationId',
        MeritIncrease: 'increaseId', MeritCycle: 'cycleId', BonusPlan: 'planId',
        BonusPayment: 'paymentId', EquityGrant: 'grantId', CompensationStatement: 'statementId', MarketBenchmark: 'benchmarkId'
    };

})();
