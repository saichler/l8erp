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
// Compensation Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.Compensation = window.Compensation || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const COMPENSATION_TYPE = factory.withValues([
        ['Unspecified', null], ['Salary', 'salary'], ['Hourly', 'hourly'],
        ['Commission', 'commission'], ['Piece Rate', 'piece'], ['Piece Rate', 'rate']
    ]);

    const MERIT_INCREASE_STATUS = factory.create([
        ['Unspecified', null, ''], ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Under Review', 'review', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Processed', 'processed', 'layer8d-status-active']
    ]);

    const MERIT_CYCLE_STATUS = factory.create([
        ['Unspecified', null, ''], ['Planning', 'planning', 'layer8d-status-pending'],
        ['Open', 'open', 'layer8d-status-active'],
        ['Under Review', 'review', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    const BONUS_PLAN_TYPE = factory.withValues([
        ['Unspecified', null], ['Annual', 'annual'], ['Spot', 'spot'], ['Signing', 'signing'],
        ['Retention', 'retention'], ['Referral', 'referral'], ['Performance', 'performance'],
        ['Profit Sharing', 'profit'], ['Profit Sharing', 'sharing'],
        ['Project', 'project'], ['Sales Commission', 'sales'], ['Sales Commission', 'commission']
    ]);

    const BONUS_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Annual', 'annual'], ['Semi-Annual', 'semi'],
        ['Quarterly', 'quarterly'], ['Monthly', 'monthly'],
        ['One-Time', 'onetime'], ['One-Time', 'one']
    ]);

    const BONUS_FUNDING_TYPE = factory.withValues([
        ['Unspecified', null], ['Fixed', 'fixed'], ['% of Profits', 'profits'],
        ['% of Revenue', 'revenue'], ['Discretionary', 'discretionary']
    ]);

    const BONUS_PAYMENT_STATUS = factory.create([
        ['Unspecified', null, ''], ['Draft', 'draft', 'layer8d-status-inactive'],
        ['Pending Approval', 'pending', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['Paid', 'paid', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const EQUITY_GRANT_TYPE = factory.withValues([
        ['Unspecified', null], ['ISO', 'iso'], ['NSO', 'nso'], ['RSU', 'rsu'],
        ['RSA', 'rsa'], ['ESPP', 'espp'], ['Phantom', 'phantom'], ['SAR', 'sar']
    ]);

    const EQUITY_GRANT_STATUS = factory.create([
        ['Unspecified', null, ''], ['Pending', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Fully Vested', 'vested', 'layer8d-status-active'],
        ['Fully Vested', 'fully', 'layer8d-status-active'],
        ['Exercised', 'exercised', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Forfeited', 'forfeited', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const VESTING_TYPE = factory.withValues([
        ['Unspecified', null], ['Time-Based', 'time'], ['Performance-Based', 'performance'],
        ['Hybrid', 'hybrid'], ['Immediate', 'immediate']
    ]);

    const VESTING_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Monthly', 'monthly'], ['Quarterly', 'quarterly'],
        ['Annually', 'annually'], ['Annually', 'annual']
    ]);

    const PAY_FREQUENCY = factory.withValues([
        ['Unspecified', null], ['Weekly', 'weekly'], ['Bi-Weekly', 'biweekly'],
        ['Bi-Weekly', 'bi-weekly'], ['Semi-Monthly', 'semimonthly'],
        ['Semi-Monthly', 'semi-monthly'], ['Monthly', 'monthly'],
        ['Quarterly', 'quarterly'], ['Annually', 'annually'], ['Annually', 'annual']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Compensation.enums = {
        COMPENSATION_TYPE: COMPENSATION_TYPE.enum,
        COMPENSATION_TYPE_VALUES: COMPENSATION_TYPE.values,
        MERIT_INCREASE_STATUS: MERIT_INCREASE_STATUS.enum,
        MERIT_INCREASE_STATUS_VALUES: MERIT_INCREASE_STATUS.values,
        MERIT_CYCLE_STATUS: MERIT_CYCLE_STATUS.enum,
        MERIT_CYCLE_STATUS_VALUES: MERIT_CYCLE_STATUS.values,
        BONUS_PLAN_TYPE: BONUS_PLAN_TYPE.enum,
        BONUS_PLAN_TYPE_VALUES: BONUS_PLAN_TYPE.values,
        BONUS_FREQUENCY: BONUS_FREQUENCY.enum,
        BONUS_FREQUENCY_VALUES: BONUS_FREQUENCY.values,
        BONUS_FUNDING_TYPE: BONUS_FUNDING_TYPE.enum,
        BONUS_FUNDING_TYPE_VALUES: BONUS_FUNDING_TYPE.values,
        BONUS_PAYMENT_STATUS: BONUS_PAYMENT_STATUS.enum,
        BONUS_PAYMENT_STATUS_VALUES: BONUS_PAYMENT_STATUS.values,
        EQUITY_GRANT_TYPE: EQUITY_GRANT_TYPE.enum,
        EQUITY_GRANT_TYPE_VALUES: EQUITY_GRANT_TYPE.values,
        EQUITY_GRANT_STATUS: EQUITY_GRANT_STATUS.enum,
        EQUITY_GRANT_STATUS_VALUES: EQUITY_GRANT_STATUS.values,
        VESTING_TYPE: VESTING_TYPE.enum,
        VESTING_TYPE_VALUES: VESTING_TYPE.values,
        VESTING_FREQUENCY: VESTING_FREQUENCY.enum,
        VESTING_FREQUENCY_VALUES: VESTING_FREQUENCY.values,
        PAY_FREQUENCY: PAY_FREQUENCY.enum,
        PAY_FREQUENCY_VALUES: PAY_FREQUENCY.values
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderMeritIncreaseStatus = createStatusRenderer(MERIT_INCREASE_STATUS.enum, MERIT_INCREASE_STATUS.classes);
    const renderMeritCycleStatus = createStatusRenderer(MERIT_CYCLE_STATUS.enum, MERIT_CYCLE_STATUS.classes);
    const renderBonusPaymentStatus = createStatusRenderer(BONUS_PAYMENT_STATUS.enum, BONUS_PAYMENT_STATUS.classes);
    const renderEquityGrantStatus = createStatusRenderer(EQUITY_GRANT_STATUS.enum, EQUITY_GRANT_STATUS.classes);

    function renderPercentageComp(value) {
        if (value === null || value === undefined) return '-';
        return `${value.toFixed(1)}%`;
    }

    function renderCompaRatio(ratio) {
        if (ratio === null || ratio === undefined) return '-';
        const percentage = (ratio * 100).toFixed(1);
        let cssClass = '';
        if (ratio < 0.85) cssClass = 'layer8d-status-terminated';
        else if (ratio < 0.95) cssClass = 'layer8d-status-pending';
        else if (ratio <= 1.05) cssClass = 'layer8d-status-active';
        else if (ratio <= 1.15) cssClass = 'layer8d-status-pending';
        else cssClass = 'layer8d-status-terminated';
        return `<span class="layer8d-status ${cssClass}">${percentage}%</span>`;
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

    window.Compensation.render = {
        compensationType: (v) => renderEnum(v, COMPENSATION_TYPE.enum),
        meritIncreaseStatus: renderMeritIncreaseStatus,
        meritCycleStatus: renderMeritCycleStatus,
        bonusPlanType: (v) => renderEnum(v, BONUS_PLAN_TYPE.enum),
        bonusFrequency: (v) => renderEnum(v, BONUS_FREQUENCY.enum),
        bonusFundingType: (v) => renderEnum(v, BONUS_FUNDING_TYPE.enum),
        bonusPaymentStatus: renderBonusPaymentStatus,
        equityGrantType: (v) => renderEnum(v, EQUITY_GRANT_TYPE.enum),
        equityGrantStatus: renderEquityGrantStatus,
        vestingType: (v) => renderEnum(v, VESTING_TYPE.enum),
        vestingFrequency: (v) => renderEnum(v, VESTING_FREQUENCY.enum),
        payFrequency: (v) => PAY_FREQUENCY.enum[v] || 'Unknown',
        money: renderMoney,
        boolean: renderBoolean,
        date: renderDate,
        percentage: renderPercentageComp,
        compaRatio: renderCompaRatio,
        shares: renderShares,
        salaryRange: renderSalaryRange
    };

    window.Compensation._internal = {
        renderMeritIncreaseStatus, renderMeritCycleStatus, renderBonusPaymentStatus,
        renderEquityGrantStatus, renderPercentageComp, renderCompaRatio,
        renderShares, renderSalaryRange
    };

})();
