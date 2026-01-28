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
 * Mobile Compensation Management Module - Enum Definitions
 * Desktop Equivalent: hcm/compensation/compensation-enums.js
 */
(function() {
    'use strict';

    window.MobileCompensation = window.MobileCompensation || {};
    MobileCompensation.enums = {};

    // ============================================================================
    // COMPENSATION TYPE
    // ============================================================================

    MobileCompensation.enums.COMPENSATION_TYPE = {
        0: 'Unspecified', 1: 'Salary', 2: 'Hourly', 3: 'Commission', 4: 'Piece Rate'
    };
    MobileCompensation.enums.COMPENSATION_TYPE_VALUES = {
        'salary': 1, 'hourly': 2, 'commission': 3, 'piece': 4, 'rate': 4
    };

    // ============================================================================
    // MERIT INCREASE STATUS
    // ============================================================================

    MobileCompensation.enums.MERIT_INCREASE_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Under Review', 4: 'Approved', 5: 'Rejected', 6: 'Processed'
    };
    MobileCompensation.enums.MERIT_INCREASE_STATUS_VALUES = {
        'draft': 1, 'submitted': 2, 'review': 3, 'approved': 4, 'rejected': 5, 'processed': 6
    };
    MobileCompensation.enums.MERIT_INCREASE_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-pending',
        4: 'status-active', 5: 'status-terminated', 6: 'status-active'
    };

    // ============================================================================
    // MERIT CYCLE STATUS
    // ============================================================================

    MobileCompensation.enums.MERIT_CYCLE_STATUS = {
        0: 'Unspecified', 1: 'Planning', 2: 'Open', 3: 'Under Review', 4: 'Approved', 5: 'Closed'
    };
    MobileCompensation.enums.MERIT_CYCLE_STATUS_VALUES = {
        'planning': 1, 'open': 2, 'review': 3, 'approved': 4, 'closed': 5
    };
    MobileCompensation.enums.MERIT_CYCLE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-inactive'
    };

    // ============================================================================
    // BONUS PLAN TYPE
    // ============================================================================

    MobileCompensation.enums.BONUS_PLAN_TYPE = {
        0: 'Unspecified', 1: 'Annual', 2: 'Spot', 3: 'Signing', 4: 'Retention',
        5: 'Referral', 6: 'Performance', 7: 'Profit Sharing', 8: 'Project', 9: 'Sales Commission'
    };
    MobileCompensation.enums.BONUS_PLAN_TYPE_VALUES = {
        'annual': 1, 'spot': 2, 'signing': 3, 'retention': 4, 'referral': 5,
        'performance': 6, 'profit': 7, 'sharing': 7, 'project': 8, 'sales': 9, 'commission': 9
    };

    // ============================================================================
    // BONUS FREQUENCY
    // ============================================================================

    MobileCompensation.enums.BONUS_FREQUENCY = {
        0: 'Unspecified', 1: 'Annual', 2: 'Semi-Annual', 3: 'Quarterly', 4: 'Monthly', 5: 'One-Time'
    };
    MobileCompensation.enums.BONUS_FREQUENCY_VALUES = {
        'annual': 1, 'semi': 2, 'quarterly': 3, 'monthly': 4, 'onetime': 5, 'one': 5
    };

    // ============================================================================
    // BONUS FUNDING TYPE
    // ============================================================================

    MobileCompensation.enums.BONUS_FUNDING_TYPE = {
        0: 'Unspecified', 1: 'Fixed', 2: '% of Profits', 3: '% of Revenue', 4: 'Discretionary'
    };
    MobileCompensation.enums.BONUS_FUNDING_TYPE_VALUES = {
        'fixed': 1, 'profits': 2, 'revenue': 3, 'discretionary': 4
    };

    // ============================================================================
    // BONUS PAYMENT STATUS
    // ============================================================================

    MobileCompensation.enums.BONUS_PAYMENT_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Approved', 4: 'Scheduled', 5: 'Paid', 6: 'Cancelled'
    };
    MobileCompensation.enums.BONUS_PAYMENT_STATUS_VALUES = {
        'draft': 1, 'pending': 2, 'approved': 3, 'scheduled': 4, 'paid': 5, 'cancelled': 6
    };
    MobileCompensation.enums.BONUS_PAYMENT_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active',
        4: 'status-pending', 5: 'status-active', 6: 'status-terminated'
    };

    // ============================================================================
    // EQUITY GRANT TYPE
    // ============================================================================

    MobileCompensation.enums.EQUITY_GRANT_TYPE = {
        0: 'Unspecified', 1: 'ISO', 2: 'NSO', 3: 'RSU', 4: 'RSA', 5: 'ESPP', 6: 'Phantom', 7: 'SAR'
    };
    MobileCompensation.enums.EQUITY_GRANT_TYPE_VALUES = {
        'iso': 1, 'nso': 2, 'rsu': 3, 'rsa': 4, 'espp': 5, 'phantom': 6, 'sar': 7
    };

    // ============================================================================
    // EQUITY GRANT STATUS
    // ============================================================================

    MobileCompensation.enums.EQUITY_GRANT_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Active', 3: 'Fully Vested', 4: 'Exercised', 5: 'Expired', 6: 'Forfeited', 7: 'Cancelled'
    };
    MobileCompensation.enums.EQUITY_GRANT_STATUS_VALUES = {
        'pending': 1, 'active': 2, 'vested': 3, 'fully': 3, 'exercised': 4,
        'expired': 5, 'forfeited': 6, 'cancelled': 7
    };
    MobileCompensation.enums.EQUITY_GRANT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-active',
        5: 'status-inactive', 6: 'status-terminated', 7: 'status-terminated'
    };

    // ============================================================================
    // VESTING TYPE
    // ============================================================================

    MobileCompensation.enums.VESTING_TYPE = {
        0: 'Unspecified', 1: 'Time-Based', 2: 'Performance-Based', 3: 'Hybrid', 4: 'Immediate'
    };
    MobileCompensation.enums.VESTING_TYPE_VALUES = {
        'time': 1, 'performance': 2, 'hybrid': 3, 'immediate': 4
    };

    // ============================================================================
    // VESTING FREQUENCY
    // ============================================================================

    MobileCompensation.enums.VESTING_FREQUENCY = {
        0: 'Unspecified', 1: 'Monthly', 2: 'Quarterly', 3: 'Annually'
    };
    MobileCompensation.enums.VESTING_FREQUENCY_VALUES = {
        'monthly': 1, 'quarterly': 2, 'annually': 3, 'annual': 3
    };

    // ============================================================================
    // PAY FREQUENCY (duplicated for module independence)
    // ============================================================================

    MobileCompensation.enums.PAY_FREQUENCY = {
        0: 'Unspecified', 1: 'Weekly', 2: 'Bi-Weekly', 3: 'Semi-Monthly', 4: 'Monthly', 5: 'Quarterly', 6: 'Annually'
    };
    MobileCompensation.enums.PAY_FREQUENCY_VALUES = {
        'weekly': 1, 'biweekly': 2, 'bi-weekly': 2, 'semimonthly': 3,
        'semi-monthly': 3, 'monthly': 4, 'quarterly': 5, 'annually': 6, 'annual': 6
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileCompensation.render = {
        compensationType: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.COMPENSATION_TYPE),
        meritIncreaseStatus: MobileRenderers.createStatusRenderer(
            MobileCompensation.enums.MERIT_INCREASE_STATUS,
            MobileCompensation.enums.MERIT_INCREASE_STATUS_CLASSES
        ),
        meritCycleStatus: MobileRenderers.createStatusRenderer(
            MobileCompensation.enums.MERIT_CYCLE_STATUS,
            MobileCompensation.enums.MERIT_CYCLE_STATUS_CLASSES
        ),
        bonusPlanType: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.BONUS_PLAN_TYPE),
        bonusFrequency: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.BONUS_FREQUENCY),
        bonusFundingType: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.BONUS_FUNDING_TYPE),
        bonusPaymentStatus: MobileRenderers.createStatusRenderer(
            MobileCompensation.enums.BONUS_PAYMENT_STATUS,
            MobileCompensation.enums.BONUS_PAYMENT_STATUS_CLASSES
        ),
        equityGrantType: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.EQUITY_GRANT_TYPE),
        equityGrantStatus: MobileRenderers.createStatusRenderer(
            MobileCompensation.enums.EQUITY_GRANT_STATUS,
            MobileCompensation.enums.EQUITY_GRANT_STATUS_CLASSES
        ),
        vestingType: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.VESTING_TYPE),
        vestingFrequency: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.VESTING_FREQUENCY),
        payFrequency: (v) => MobileRenderers.renderEnum(v, MobileCompensation.enums.PAY_FREQUENCY),
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
            const min = MobileRenderers.renderMoney(item.minimum);
            const max = MobileRenderers.renderMoney(item.maximum);
            if (min === '-' && max === '-') return '-';
            return `${min} - ${max}`;
        },
        money: MobileRenderers.renderMoney,
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate
    };

})();
