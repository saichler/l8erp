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
 * Mobile Compensation Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: hcm/compensation/compensation-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderMoney, renderBoolean, renderDate } = Layer8MRenderers;

    window.MobileCompensation = window.MobileCompensation || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COMPENSATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Salary', 'salary'], ['Hourly', 'hourly'],
        ['Commission', 'commission'], ['Piece Rate', 'piece']
    ]);

    const MERIT_INCREASE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Under Review', 'review', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Processed', 'processed', 'status-active']
    ]);

    const MERIT_CYCLE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planning', 'planning', 'status-pending'],
        ['Open', 'open', 'status-active'],
        ['Under Review', 'review', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const BONUS_PLAN_TYPE = factory.withValues([
        ['Unspecified', null], ['Annual', 'annual'], ['Spot', 'spot'], ['Signing', 'signing'],
        ['Retention', 'retention'], ['Referral', 'referral'], ['Performance', 'performance'],
        ['Profit Sharing', 'profit'], ['Project', 'project'], ['Sales Commission', 'sales']
    ]);

    const BONUS_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Annual', 'annual'], ['Semi-Annual', 'semi'],
        ['Quarterly', 'quarterly'], ['Monthly', 'monthly'], ['One-Time', 'onetime']
    ]);

    const BONUS_FUNDING_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['% of Profits', 'profits'],
        ['% of Revenue', 'revenue'], ['Discretionary', 'discretionary']
    ]);

    const BONUS_PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-inactive'],
        ['Pending Approval', 'pending', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Scheduled', 'scheduled', 'status-pending'],
        ['Paid', 'paid', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const EQUITY_GRANT_TYPE = factory.withValues([
        ['Unspecified', null], ['ISO', 'iso'], ['NSO', 'nso'], ['RSU', 'rsu'],
        ['RSA', 'rsa'], ['ESPP', 'espp'], ['Phantom', 'phantom'], ['SAR', 'sar']
    ]);

    const EQUITY_GRANT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Fully Vested', 'vested', 'status-active'],
        ['Exercised', 'exercised', 'status-active'],
        ['Expired', 'expired', 'status-inactive'],
        ['Forfeited', 'forfeited', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const VESTING_TYPE = factory.withValues([
        ['Unspecified', null], ['Time-Based', 'time'], ['Performance-Based', 'performance'],
        ['Hybrid', 'hybrid'], ['Immediate', 'immediate']
    ]);

    const VESTING_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Monthly', 'monthly'], ['Quarterly', 'quarterly'], ['Annually', 'annually']
    ]);

    const PAY_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Weekly', 'weekly'], ['Bi-Weekly', 'biweekly'],
        ['Semi-Monthly', 'semimonthly'], ['Monthly', 'monthly'],
        ['Quarterly', 'quarterly'], ['Annually', 'annually']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileCompensation.enums = {
        COMPENSATION_TYPE: COMPENSATION_TYPE.enum,
        COMPENSATION_TYPE_VALUES: COMPENSATION_TYPE.values,
        MERIT_INCREASE_STATUS: MERIT_INCREASE_STATUS.enum,
        MERIT_INCREASE_STATUS_VALUES: MERIT_INCREASE_STATUS.values,
        MERIT_INCREASE_STATUS_CLASSES: MERIT_INCREASE_STATUS.classes,
        MERIT_CYCLE_STATUS: MERIT_CYCLE_STATUS.enum,
        MERIT_CYCLE_STATUS_VALUES: MERIT_CYCLE_STATUS.values,
        MERIT_CYCLE_STATUS_CLASSES: MERIT_CYCLE_STATUS.classes,
        BONUS_PLAN_TYPE: BONUS_PLAN_TYPE.enum,
        BONUS_PLAN_TYPE_VALUES: BONUS_PLAN_TYPE.values,
        BONUS_FREQUENCY: BONUS_FREQUENCY.enum,
        BONUS_FREQUENCY_VALUES: BONUS_FREQUENCY.values,
        BONUS_FUNDING_TYPE: BONUS_FUNDING_TYPE.enum,
        BONUS_FUNDING_TYPE_VALUES: BONUS_FUNDING_TYPE.values,
        BONUS_PAYMENT_STATUS: BONUS_PAYMENT_STATUS.enum,
        BONUS_PAYMENT_STATUS_VALUES: BONUS_PAYMENT_STATUS.values,
        BONUS_PAYMENT_STATUS_CLASSES: BONUS_PAYMENT_STATUS.classes,
        EQUITY_GRANT_TYPE: EQUITY_GRANT_TYPE.enum,
        EQUITY_GRANT_TYPE_VALUES: EQUITY_GRANT_TYPE.values,
        EQUITY_GRANT_STATUS: EQUITY_GRANT_STATUS.enum,
        EQUITY_GRANT_STATUS_VALUES: EQUITY_GRANT_STATUS.values,
        EQUITY_GRANT_STATUS_CLASSES: EQUITY_GRANT_STATUS.classes,
        VESTING_TYPE: VESTING_TYPE.enum,
        VESTING_TYPE_VALUES: VESTING_TYPE.values,
        VESTING_FREQUENCY: VESTING_FREQUENCY.enum,
        VESTING_FREQUENCY_VALUES: VESTING_FREQUENCY.values,
        PAY_FREQUENCY: PAY_FREQUENCY.enum,
        PAY_FREQUENCY_VALUES: PAY_FREQUENCY.values
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompensation.render = {
        compensationType: (v) => renderEnum(v, COMPENSATION_TYPE.enum),
        meritIncreaseStatus: createStatusRenderer(MERIT_INCREASE_STATUS.enum, MERIT_INCREASE_STATUS.classes),
        meritCycleStatus: createStatusRenderer(MERIT_CYCLE_STATUS.enum, MERIT_CYCLE_STATUS.classes),
        bonusPlanType: (v) => renderEnum(v, BONUS_PLAN_TYPE.enum),
        bonusFrequency: (v) => renderEnum(v, BONUS_FREQUENCY.enum),
        bonusFundingType: (v) => renderEnum(v, BONUS_FUNDING_TYPE.enum),
        bonusPaymentStatus: createStatusRenderer(BONUS_PAYMENT_STATUS.enum, BONUS_PAYMENT_STATUS.classes),
        equityGrantType: (v) => renderEnum(v, EQUITY_GRANT_TYPE.enum),
        equityGrantStatus: createStatusRenderer(EQUITY_GRANT_STATUS.enum, EQUITY_GRANT_STATUS.classes),
        vestingType: (v) => renderEnum(v, VESTING_TYPE.enum),
        vestingFrequency: (v) => renderEnum(v, VESTING_FREQUENCY.enum),
        payFrequency: (v) => renderEnum(v, PAY_FREQUENCY.enum),
        percentage: (value) => {
            if (value === null || value === undefined) return '-';
            return `${Number(value).toFixed(1)}%`;
        },
        compaRatio: (ratio) => {
            if (ratio === null || ratio === undefined) return '-';
            const percentage = (ratio * 100).toFixed(1);
            let cssClass = 'status-active';
            if (ratio < 0.85 || ratio > 1.15) cssClass = 'status-terminated';
            else if (ratio < 0.95 || ratio > 1.05) cssClass = 'status-pending';
            return `<span class="status-badge ${cssClass}">${percentage}%</span>`;
        },
        shares: (shares) => {
            if (shares === null || shares === undefined) return '-';
            return new Intl.NumberFormat('en-US').format(shares);
        },
        salaryRange: (item) => {
            const min = renderMoney(item.minimum);
            const max = renderMoney(item.maximum);
            if (min === '-' && max === '-') return '-';
            return `${min} - ${max}`;
        },
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate
    };

})();
