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
 * ERP Shared Renderers
 * UI rendering functions for consistent display across all modules
 */
(function() {
    'use strict';

    const { escapeHtml, formatDate, formatMoney, formatPercentage } = ERPUtils;

    // ========================================
    // STATUS CLASSES (configurable per module)
    // ========================================

    const DEFAULT_STATUS_CLASSES = {
        // Positive states
        active: 'erp-status-active',
        approved: 'erp-status-active',
        completed: 'erp-status-active',
        paid: 'erp-status-active',

        // Warning states
        pending: 'erp-status-pending',
        review: 'erp-status-pending',
        draft: 'erp-status-pending',

        // Neutral states
        inactive: 'erp-status-inactive',
        cancelled: 'erp-status-inactive',

        // Negative states
        terminated: 'erp-status-terminated',
        rejected: 'erp-status-terminated',
        failed: 'erp-status-terminated',

        // Numeric status codes (legacy support)
        1: 'erp-status-active',
        2: 'erp-status-pending',
        3: 'erp-status-inactive',
        4: 'erp-status-terminated'
    };

    // ========================================
    // GENERIC RENDERERS
    // ========================================

    /**
     * Render an enum value as text
     */
    function renderEnum(value, enumMap, defaultLabel = '-') {
        if (value === null || value === undefined) return defaultLabel;
        return escapeHtml(enumMap[value] || defaultLabel);
    }

    /**
     * Render a status badge
     */
    function renderStatus(value, enumMap, classMap = {}) {
        if (value === null || value === undefined) return '-';

        const label = enumMap[value] || 'Unknown';
        const mergedClasses = { ...DEFAULT_STATUS_CLASSES, ...classMap };

        // Try to find class by value, then by lowercase label
        let cssClass = mergedClasses[value] ||
                       mergedClasses[String(value).toLowerCase()] ||
                       mergedClasses[label.toLowerCase()] ||
                       '';

        return `<span class="erp-status ${cssClass}">${escapeHtml(label)}</span>`;
    }

    /**
     * Create a status renderer for a specific enum
     */
    function createStatusRenderer(enumMap, classMap = {}) {
        return (value) => renderStatus(value, enumMap, classMap);
    }

    /**
     * Render a boolean value
     */
    function renderBoolean(value, options = {}) {
        const {
            trueText = 'Yes',
            falseText = 'No',
            trueClass = 'erp-status-active',
            falseClass = 'erp-status-inactive'
        } = options;

        const label = value ? trueText : falseText;
        const cssClass = value ? trueClass : falseClass;

        return `<span class="erp-status ${cssClass}">${escapeHtml(label)}</span>`;
    }

    /**
     * Render a date value
     */
    function renderDate(value, options = {}) {
        return formatDate(value, options);
    }

    /**
     * Render a money/currency value
     */
    function renderMoney(value, currency = 'USD') {
        return formatMoney(value, currency);
    }

    /**
     * Render a percentage value
     */
    function renderPercentage(value, decimals = 2) {
        return formatPercentage(value, decimals);
    }

    /**
     * Render a link
     */
    function renderLink(text, url, options = {}) {
        const { target = '_self', className = '' } = options;
        if (!url) return escapeHtml(text);
        return `<a href="${escapeHtml(url)}" target="${target}" class="${className}">${escapeHtml(text)}</a>`;
    }

    /**
     * Render a tag/badge
     */
    function renderTag(text, className = '') {
        return `<span class="erp-tag ${className}">${escapeHtml(text)}</span>`;
    }

    /**
     * Render multiple tags
     */
    function renderTags(items, className = '') {
        if (!items || items.length === 0) return '-';
        return items.map(item => renderTag(item, className)).join(' ');
    }

    /**
     * Render an empty/null value
     */
    function renderEmpty(value, emptyText = '-') {
        if (value === null || value === undefined || value === '') {
            return `<span class="erp-empty">${emptyText}</span>`;
        }
        return escapeHtml(String(value));
    }

    // ========================================
    // EXPORT
    // ========================================

    window.ERPRenderers = {
        // Generic
        renderEnum,
        renderStatus,
        createStatusRenderer,
        renderBoolean,
        renderDate,
        renderMoney,
        renderPercentage,
        renderLink,
        renderTag,
        renderTags,
        renderEmpty,

        // Constants
        DEFAULT_STATUS_CLASSES
    };

})();
