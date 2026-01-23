/**
 * ERP Shared Utilities
 * Common utility functions used across all ERP modules
 */
(function() {
    'use strict';

    // ========================================
    // HTML ESCAPING
    // ========================================

    function escapeHtml(text) {
        if (text === null || text === undefined) return '';
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    function escapeAttr(text) {
        if (text === null || text === undefined) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    // ========================================
    // DATE FORMATTING
    // ========================================

    function formatDate(timestamp, options = {}) {
        if (!timestamp) return '-';

        const defaults = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { ...defaults, ...options });
    }

    function formatDateTime(timestamp) {
        if (!timestamp) return '-';
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function formatDateForInput(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp * 1000);
        return date.toISOString().split('T')[0];
    }

    function parseDateToTimestamp(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : Math.floor(date.getTime() / 1000);
    }

    // ========================================
    // NUMBER FORMATTING
    // ========================================

    function formatMoney(value, currency = 'USD') {
        if (value === null || value === undefined) return '-';

        let amount;
        let currencyCode = currency;

        // Handle Money object { amount: cents, currencyCode: 'USD' }
        if (typeof value === 'object') {
            amount = value.amount !== undefined ? value.amount / 100 : 0;
            currencyCode = value.currencyCode || currency;
        } else {
            // Assume value is in cents
            amount = value / 100;
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode
        }).format(amount);
    }

    function formatNumber(value, decimals = 0) {
        if (value === null || value === undefined) return '-';
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value);
    }

    function formatPercentage(value, decimals = 2) {
        if (value === null || value === undefined) return '-';
        return `${Number(value).toFixed(decimals)}%`;
    }

    // ========================================
    // STRING FORMATTING
    // ========================================

    function formatLabel(key) {
        if (!key) return '';
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/Id$/, ' ID')
            .replace(/_/g, ' ')
            .trim();
    }

    function truncate(text, maxLength = 50) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - 3) + '...';
    }

    // ========================================
    // EXPORT
    // ========================================

    window.ERPUtils = {
        // HTML
        escapeHtml,
        escapeAttr,

        // Dates
        formatDate,
        formatDateTime,
        formatDateForInput,
        parseDateToTimestamp,

        // Numbers
        formatMoney,
        formatNumber,
        formatPercentage,

        // Strings
        formatLabel,
        truncate
    };

})();
