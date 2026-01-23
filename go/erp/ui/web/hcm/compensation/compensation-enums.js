// Compensation Management Module - Enum Definitions and Render Functions
// Part 1 of 4 - Load this file first

(function() {
    'use strict';

    // Initialize Compensation namespace
    window.Compensation = window.Compensation || {};

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
    // EXPORT ENUMS TO NAMESPACE
    // ============================================================================

    window.Compensation.enums = {
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
    };

    window.Compensation.render = {
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
    };

    // Export internal functions for use by other compensation files
    window.Compensation._internal = {
        renderMeritIncreaseStatus,
        renderMeritCycleStatus,
        renderBonusPaymentStatus,
        renderEquityGrantStatus,
        renderCompensationType,
        renderBonusPlanType,
        renderBonusFrequency,
        renderBonusFundingType,
        renderEquityGrantType,
        renderVestingType,
        renderVestingFrequency,
        renderPayFrequency,
        renderPercentageComp,
        renderCompaRatio,
        renderShares,
        renderSalaryRange
    };

})();
