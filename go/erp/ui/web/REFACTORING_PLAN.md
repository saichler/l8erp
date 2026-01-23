# ERP UI Component Refactoring Plan

## Overview

This plan creates a shared component library for the ERP system that can be used across all modules (HCM, Finance, Supply Chain, CRM, etc.). The goal is to ensure consistent look & feel, reduce code duplication, and simplify future module development.

## Architecture

```
go/erp/ui/web/
├── shared/                      # NEW: Shared ERP components
│   ├── erp-utils.js            # Utility functions (escape, format, etc.)
│   ├── erp-renderers.js        # Display renderers (status, date, money, etc.)
│   ├── erp-forms.js            # Form generation & handling (moved from hcm-forms.js)
│   └── erp-theme.css           # Shared CSS variables & base styles
├── popup/                       # Generic popup component (already exists)
│   ├── popup.css
│   ├── popup-forms.css
│   ├── popup-content.css
│   └── popup.js
├── edit_table/                  # Generic table component (already exists)
│   ├── table.css
│   └── table.js
├── hcm/                         # HCM module (uses shared components)
│   ├── hcm.js                  # Module config & initialization
│   ├── hcm.css                 # HCM-specific styles only
│   ├── core-hr/
│   │   └── core-hr.js          # Core HR entities (columns, forms, enums)
│   ├── payroll/
│   │   └── payroll.js
│   └── ...
├── finance/                     # FUTURE: Finance module
│   ├── finance.js
│   └── ...
├── scm/                         # FUTURE: Supply Chain module
│   ├── scm.js
│   └── ...
└── app.html
```

---

## Phase 1: Create Shared Utilities

### File: `shared/erp-utils.js`

```javascript
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
        return Math.floor(date.getTime() / 1000);
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
```

---

## Phase 2: Create Shared Renderers

### File: `shared/erp-renderers.js`

```javascript
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
```

---

## Phase 3: Create Shared Theme CSS

### File: `shared/erp-theme.css`

```css
/**
 * ERP Shared Theme
 * CSS variables and base styles for consistent look & feel
 */

/* ============================================ */
/* CSS VARIABLES (Design Tokens) */
/* ============================================ */

:root {
    /* Primary Colors */
    --erp-primary: #0ea5e9;
    --erp-primary-dark: #0284c7;
    --erp-primary-light: #7dd3fc;

    /* Text Colors */
    --erp-text-dark: #2d3748;
    --erp-text-medium: #4a5568;
    --erp-text-muted: #718096;
    --erp-text-light: #a0aec0;

    /* Background Colors */
    --erp-bg-white: #ffffff;
    --erp-bg-light: #f7fafc;
    --erp-bg-input: #f1f5f9;

    /* Border Colors */
    --erp-border: #e2e8f0;
    --erp-border-dark: #cbd5e0;

    /* Status Colors */
    --erp-success: #22c55e;
    --erp-success-bg: rgba(34, 197, 94, 0.1);
    --erp-warning: #f59e0b;
    --erp-warning-bg: rgba(245, 158, 11, 0.1);
    --erp-error: #ef4444;
    --erp-error-bg: rgba(239, 68, 68, 0.1);
    --erp-info: #3b82f6;
    --erp-info-bg: rgba(59, 130, 246, 0.1);

    /* Typography */
    --erp-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --erp-font-mono: 'SF Mono', 'Monaco', 'Consolas', monospace;

    /* Font Sizes */
    --erp-font-xs: 11px;
    --erp-font-sm: 12px;
    --erp-font-base: 14px;
    --erp-font-lg: 16px;
    --erp-font-xl: 18px;

    /* Spacing (8px baseline) */
    --erp-space-xs: 4px;
    --erp-space-sm: 8px;
    --erp-space-md: 16px;
    --erp-space-lg: 24px;
    --erp-space-xl: 32px;

    /* Border Radius */
    --erp-radius-sm: 4px;
    --erp-radius-md: 8px;
    --erp-radius-lg: 12px;

    /* Shadows */
    --erp-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --erp-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --erp-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

    /* Focus Ring */
    --erp-focus-ring: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

/* ============================================ */
/* STATUS BADGES */
/* ============================================ */

.erp-status {
    display: inline-block;
    padding: 4px 10px;
    border-radius: var(--erp-radius-sm);
    font-size: var(--erp-font-xs);
    font-weight: 600;
    font-family: var(--erp-font-family);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.erp-status-active {
    background: var(--erp-success-bg);
    color: var(--erp-success);
}

.erp-status-pending {
    background: var(--erp-warning-bg);
    color: var(--erp-warning);
}

.erp-status-inactive {
    background: rgba(107, 114, 128, 0.1);
    color: #6b7280;
}

.erp-status-terminated {
    background: var(--erp-error-bg);
    color: var(--erp-error);
}

.erp-status-info {
    background: var(--erp-info-bg);
    color: var(--erp-info);
}

/* ============================================ */
/* TAGS */
/* ============================================ */

.erp-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: var(--erp-radius-sm);
    font-size: var(--erp-font-xs);
    font-weight: 500;
    background: var(--erp-bg-input);
    color: var(--erp-text-medium);
}

/* ============================================ */
/* EMPTY STATE */
/* ============================================ */

.erp-empty {
    color: var(--erp-text-light);
    font-style: italic;
}

/* ============================================ */
/* BUTTONS */
/* ============================================ */

.erp-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--erp-space-sm);
    padding: 12px 24px;
    border: none;
    border-radius: var(--erp-radius-md);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--erp-font-family);
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
}

.erp-btn-primary {
    background: var(--erp-primary);
    color: white;
    box-shadow: 0 2px 4px rgba(14, 165, 233, 0.2);
}

.erp-btn-primary:hover {
    background: var(--erp-primary-dark);
    box-shadow: 0 4px 8px rgba(14, 165, 233, 0.25);
    transform: translateY(-1px);
}

.erp-btn-secondary {
    background: var(--erp-bg-white);
    color: var(--erp-text-medium);
    border: 1px solid var(--erp-border);
}

.erp-btn-secondary:hover {
    background: var(--erp-bg-light);
    border-color: var(--erp-border-dark);
    color: var(--erp-text-dark);
}

.erp-btn-danger {
    background: var(--erp-error);
    color: white;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

.erp-btn-danger:hover {
    background: #dc2626;
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.25);
    transform: translateY(-1px);
}

.erp-btn-small {
    padding: 8px 16px;
    font-size: var(--erp-font-sm);
}

/* ============================================ */
/* FORM ELEMENTS */
/* ============================================ */

.erp-form-group {
    margin-bottom: var(--erp-space-lg);
}

.erp-form-group:last-child {
    margin-bottom: 0;
}

.erp-form-label {
    display: block;
    margin-bottom: var(--erp-space-sm);
    font-weight: 600;
    font-size: 13px;
    color: var(--erp-text-dark);
    font-family: var(--erp-font-family);
}

.erp-form-input,
.erp-form-select,
.erp-form-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--erp-border);
    border-radius: var(--erp-radius-md);
    font-size: var(--erp-font-base);
    font-family: var(--erp-font-family);
    color: var(--erp-text-dark);
    background: var(--erp-bg-white);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    box-sizing: border-box;
}

.erp-form-input:focus,
.erp-form-select:focus,
.erp-form-textarea:focus {
    outline: none;
    border-color: var(--erp-primary);
    box-shadow: var(--erp-focus-ring);
}

.erp-form-input:disabled,
.erp-form-select:disabled,
.erp-form-textarea:disabled {
    background: var(--erp-bg-input);
    color: var(--erp-text-muted);
    cursor: not-allowed;
}

.erp-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--erp-space-lg);
}

/* ============================================ */
/* CARDS */
/* ============================================ */

.erp-card {
    background: var(--erp-bg-white);
    border: 1px solid var(--erp-border);
    border-radius: var(--erp-radius-lg);
    padding: var(--erp-space-lg);
}

.erp-card-header {
    font-size: var(--erp-font-lg);
    font-weight: 700;
    color: var(--erp-primary);
    margin-bottom: var(--erp-space-md);
    padding-bottom: var(--erp-space-sm);
    border-bottom: 1px solid var(--erp-border);
}

/* ============================================ */
/* RESPONSIVE */
/* ============================================ */

@media (max-width: 768px) {
    .erp-form-row {
        grid-template-columns: 1fr;
    }
}
```

---

## Phase 4: Move Form Handling to Shared

### File: `shared/erp-forms.js`

Move the generic form generation from `hcm-forms.js` to `shared/erp-forms.js`:

```javascript
/**
 * ERP Shared Form Handler
 * Generic form generation and handling for all ERP modules
 */
(function() {
    'use strict';

    const { escapeHtml, escapeAttr, formatDateForInput, parseDateToTimestamp } = ERPUtils;

    // ========================================
    // FORM GENERATION
    // ========================================

    function generateFormHtml(formDef, data = {}) {
        const sections = formDef.sections;
        let html = '<form id="erp-edit-form">';

        // Tabs header
        html += '<div class="probler-popup-tabs">';
        sections.forEach((section, idx) => {
            const activeClass = idx === 0 ? ' active' : '';
            html += `<div class="probler-popup-tab${activeClass}" data-tab="tab-${idx}">${escapeHtml(section.title)}</div>`;
        });
        html += '</div>';

        // Tab content
        html += '<div class="probler-popup-tab-content">';
        sections.forEach((section, idx) => {
            const activeClass = idx === 0 ? ' active' : '';
            html += `<div class="probler-popup-tab-pane${activeClass}" data-pane="tab-${idx}">`;
            html += '<div class="detail-grid"><div class="detail-section detail-full-width">';

            const fields = section.fields;
            for (let i = 0; i < fields.length; i += 2) {
                const field1 = fields[i];
                const field2 = fields[i + 1];

                if (field2) {
                    html += '<div class="form-row">';
                    html += generateFieldHtml(field1, data[field1.key]);
                    html += generateFieldHtml(field2, data[field2.key]);
                    html += '</div>';
                } else {
                    html += generateFieldHtml(field1, data[field1.key]);
                }
            }

            html += '</div></div></div>';
        });
        html += '</div></form>';

        return html;
    }

    function generateFieldHtml(field, value) {
        const required = field.required ? 'required' : '';
        const requiredMark = field.required ? ' <span style="color: var(--erp-error);">*</span>' : '';

        let inputHtml = '';

        switch (field.type) {
            case 'text':
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'number':
                inputHtml = `<input type="number" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
                break;

            case 'date':
                const dateValue = value ? formatDateForInput(value) : '';
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${dateValue}" ${required} placeholder="YYYY-MM-DD">`;
                break;

            case 'textarea':
                inputHtml = `<textarea id="field-${field.key}" name="${field.key}" rows="3" ${required}>${escapeHtml(value || '')}</textarea>`;
                break;

            case 'select':
                inputHtml = generateSelectHtml(field, value);
                break;

            case 'checkbox':
                const checked = value ? 'checked' : '';
                return `
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="field-${field.key}" name="${field.key}" ${checked} style="width: auto;">
                            <span>${escapeHtml(field.label)}</span>
                        </label>
                    </div>
                `;

            case 'lookup':
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required} placeholder="Enter ${field.lookupModel} ID">`;
                break;

            default:
                inputHtml = `<input type="text" id="field-${field.key}" name="${field.key}" value="${escapeAttr(value || '')}" ${required}>`;
        }

        return `
            <div class="form-group">
                <label for="field-${field.key}">${escapeHtml(field.label)}${requiredMark}</label>
                ${inputHtml}
            </div>
        `;
    }

    function generateSelectHtml(field, selectedValue) {
        let html = `<select id="field-${field.key}" name="${field.key}" ${field.required ? 'required' : ''}>`;
        html += '<option value="">-- Select --</option>';

        for (const [val, label] of Object.entries(field.options)) {
            const selected = String(selectedValue) === String(val) ? 'selected' : '';
            html += `<option value="${escapeAttr(val)}" ${selected}>${escapeHtml(label)}</option>`;
        }

        html += '</select>';
        return html;
    }

    // ========================================
    // FORM DATA HANDLING
    // ========================================

    function collectFormData(formDef) {
        const form = document.getElementById('erp-edit-form');
        if (!form) return null;

        const data = {};

        formDef.sections.forEach(section => {
            section.fields.forEach(field => {
                const element = form.elements[field.key];
                if (!element) return;

                let value;
                switch (field.type) {
                    case 'checkbox':
                        value = element.checked;
                        break;
                    case 'number':
                        value = element.value ? parseFloat(element.value) : null;
                        break;
                    case 'date':
                        value = parseDateToTimestamp(element.value);
                        break;
                    default:
                        value = element.value || null;
                }

                data[field.key] = value;
            });
        });

        return data;
    }

    function validateFormData(formDef, data) {
        const errors = [];

        formDef.sections.forEach(section => {
            section.fields.forEach(field => {
                if (field.required) {
                    const value = data[field.key];
                    if (value === null || value === undefined || value === '') {
                        errors.push({ field: field.key, message: `${field.label} is required` });
                    }
                }
            });
        });

        return errors;
    }

    // ========================================
    // CRUD OPERATIONS
    // ========================================

    async function fetchRecord(endpoint, primaryKey, id) {
        const query = encodeURIComponent(JSON.stringify({
            text: `select * from * where ${primaryKey}=${id}`
        }));

        const response = await fetch(`${endpoint}?body=${query}`, {
            method: 'GET',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) throw new Error('Failed to fetch record');

        const result = await response.json();
        return result.list && result.list.length > 0 ? result.list[0] : null;
    }

    async function saveRecord(endpoint, primaryKey, data, isEdit = false) {
        const method = isEdit ? 'PUT' : 'POST';
        const url = isEdit ? `${endpoint}?id=${data[primaryKey]}` : endpoint;

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(typeof getAuthHeaders === 'function' ? getAuthHeaders() : {})
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to save record');
        return await response.json();
    }

    async function deleteRecord(endpoint, id) {
        const response = await fetch(`${endpoint}?id=${id}`, {
            method: 'DELETE',
            headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
        });

        if (!response.ok) throw new Error('Failed to delete record');
        return true;
    }

    // ========================================
    // MODAL HELPERS
    // ========================================

    function openAddForm(serviceConfig, formDef, onSuccess) {
        const title = `Add ${formDef.title}`;
        const content = generateFormHtml(formDef, {});

        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            onSave: async () => {
                const data = collectFormData(formDef);
                const errors = validateFormData(formDef, data);

                if (errors.length > 0) {
                    alert(errors.map(e => e.message).join('\n'));
                    return;
                }

                try {
                    await saveRecord(serviceConfig.endpoint, serviceConfig.primaryKey, data, false);
                    ERPPopup.close();
                    if (onSuccess) onSuccess();
                } catch (error) {
                    alert('Failed to save: ' + error.message);
                }
            }
        });
    }

    async function openEditForm(serviceConfig, formDef, id, onSuccess) {
        const title = `Edit ${formDef.title}`;

        ERPPopup.show({
            title: title,
            content: '<div style="padding: 40px; text-align: center;">Loading...</div>',
            size: 'large',
            showFooter: false
        });

        try {
            const record = await fetchRecord(serviceConfig.endpoint, serviceConfig.primaryKey, id);
            if (!record) {
                ERPPopup.close();
                alert('Record not found');
                return;
            }

            const content = generateFormHtml(formDef, record);
            ERPPopup.updateContent(content);

            // Re-show with footer
            ERPPopup.close();
            ERPPopup.show({
                title: title,
                content: content,
                size: 'large',
                onSave: async () => {
                    const data = collectFormData(formDef);
                    data[serviceConfig.primaryKey] = id;

                    const errors = validateFormData(formDef, data);
                    if (errors.length > 0) {
                        alert(errors.map(e => e.message).join('\n'));
                        return;
                    }

                    try {
                        await saveRecord(serviceConfig.endpoint, serviceConfig.primaryKey, data, true);
                        ERPPopup.close();
                        if (onSuccess) onSuccess();
                    } catch (error) {
                        alert('Failed to save: ' + error.message);
                    }
                }
            });
        } catch (error) {
            ERPPopup.close();
            alert('Failed to load record: ' + error.message);
        }
    }

    function openViewForm(serviceConfig, formDef, data) {
        const title = `${formDef.title} Details`;
        const content = generateFormHtml(formDef, data);

        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            showFooter: false,
            onShow: (body) => {
                body.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });
            }
        });
    }

    function confirmDelete(serviceConfig, id, onSuccess) {
        if (!confirm('Are you sure you want to delete this record?')) return;

        deleteRecord(serviceConfig.endpoint, id)
            .then(() => {
                if (onSuccess) onSuccess();
            })
            .catch(error => {
                alert('Failed to delete: ' + error.message);
            });
    }

    // ========================================
    // EXPORT
    // ========================================

    window.ERPForms = {
        generateFormHtml,
        generateFieldHtml,
        collectFormData,
        validateFormData,
        fetchRecord,
        saveRecord,
        deleteRecord,
        openAddForm,
        openEditForm,
        openViewForm,
        confirmDelete
    };

})();
```

---

## Phase 5: Update HTML Loading Order

### Update `app.html`

```html
<!DOCTYPE html>
<html>
<head>
    <!-- ... existing head content ... -->

    <!-- ERP Shared Theme (load first) -->
    <link rel="stylesheet" href="shared/erp-theme.css">

    <!-- Existing CSS files -->
    <link rel="stylesheet" href="css/base-core.css">
    <link rel="stylesheet" href="css/components-modals.css">
    <!-- ... -->

    <!-- Popup Component -->
    <link rel="stylesheet" href="popup/popup.css">
    <link rel="stylesheet" href="popup/popup-forms.css">
    <link rel="stylesheet" href="popup/popup-content.css">

    <!-- Module-specific CSS -->
    <link rel="stylesheet" href="hcm/hcm.css">
</head>
<body>
    <!-- ... body content ... -->

    <!-- ERP Shared Scripts (load first, in order) -->
    <script src="shared/erp-utils.js"></script>
    <script src="shared/erp-renderers.js"></script>
    <script src="shared/erp-forms.js"></script>

    <!-- Generic Components -->
    <script src="popup/popup.js"></script>
    <script src="edit_table/table.js"></script>

    <!-- HCM Module -->
    <script src="hcm/core-hr/core-hr.js"></script>
    <script src="hcm/payroll/payroll.js"></script>
    <script src="hcm/benefits/benefits.js"></script>
    <script src="hcm/time/time.js"></script>
    <script src="hcm/talent/talent.js"></script>
    <script src="hcm/learning/learning.js"></script>
    <script src="hcm/compensation/compensation.js"></script>
    <script src="hcm/hcm-forms.js"></script>
    <script src="hcm/hcm.js"></script>

    <!-- Future modules will follow same pattern -->
    <!-- <script src="finance/finance.js"></script> -->
    <!-- <script src="scm/scm.js"></script> -->
</body>
</html>
```

---

## Phase 6: Refactor Module Files

### Example: Refactored `core-hr.js`

```javascript
/**
 * HCM Core HR Module
 * Entity definitions for Employee, Position, Job, etc.
 */
(function() {
    'use strict';

    // Use shared utilities
    const { formatDate, formatMoney } = ERPUtils;
    const { renderEnum, renderStatus, renderBoolean, renderDate, createStatusRenderer } = ERPRenderers;

    // ========================================
    // ENUMS
    // ========================================

    const EMPLOYMENT_STATUS = {
        1: 'Active',
        2: 'On Leave',
        3: 'Suspended',
        4: 'Terminated'
    };

    const EMPLOYMENT_TYPE = {
        1: 'Full-Time',
        2: 'Part-Time',
        3: 'Contract',
        4: 'Intern'
    };

    // ... other enums ...

    // ========================================
    // STATUS RENDERERS (using factory)
    // ========================================

    const renderEmploymentStatus = createStatusRenderer(EMPLOYMENT_STATUS);
    const renderPositionStatus = createStatusRenderer(POSITION_STATUS);

    // ========================================
    // COLUMNS
    // ========================================

    const COLUMNS = {
        Employee: [
            { key: 'employeeId', label: 'ID' },
            { key: 'employeeNumber', label: 'Number' },
            { key: 'firstName', label: 'First Name' },
            { key: 'lastName', label: 'Last Name' },
            {
                key: 'employmentStatus',
                label: 'Status',
                enumValues: { active: 1, leave: 2, suspended: 3, terminated: 4 },
                render: (item) => renderEmploymentStatus(item.employmentStatus)
            },
            {
                key: 'hireDate',
                label: 'Hire Date',
                render: (item) => renderDate(item.hireDate)
            }
        ],
        // ... other entities ...
    };

    // ========================================
    // FORMS
    // ========================================

    const FORMS = {
        Employee: {
            title: 'Employee',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'employeeNumber', label: 'Employee Number', type: 'text', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'hireDate', label: 'Hire Date', type: 'date', required: true },
                        { key: 'employmentStatus', label: 'Status', type: 'select', options: EMPLOYMENT_STATUS, required: true },
                        { key: 'employmentType', label: 'Type', type: 'select', options: EMPLOYMENT_TYPE, required: true }
                    ]
                }
            ]
        },
        // ... other entities ...
    };

    // ========================================
    // PRIMARY KEYS
    // ========================================

    const PRIMARY_KEYS = {
        Employee: 'employeeId',
        Position: 'positionId',
        Job: 'jobId',
        // ...
    };

    // ========================================
    // EXPORT
    // ========================================

    window.CoreHR = {
        enums: {
            EMPLOYMENT_STATUS,
            EMPLOYMENT_TYPE,
            // ...
        },
        columns: COLUMNS,
        forms: FORMS,
        primaryKeys: PRIMARY_KEYS,
        render: {
            employmentStatus: renderEmploymentStatus,
            employmentType: (type) => renderEnum(type, EMPLOYMENT_TYPE),
            date: renderDate,
            boolean: renderBoolean
        }
    };

})();
```

---

## Implementation Checklist

### Phase 1: Create Shared Directory & Files
- [ ] Create `shared/` directory
- [ ] Create `shared/erp-utils.js`
- [ ] Create `shared/erp-renderers.js`
- [ ] Create `shared/erp-theme.css`
- [ ] Create `shared/erp-forms.js`

### Phase 2: Update HTML
- [ ] Add shared CSS/JS to `app.html`
- [ ] Ensure correct load order

### Phase 3: Refactor Modules (one at a time)
- [ ] Refactor `core-hr.js`
- [ ] Test core-hr functionality
- [ ] Refactor `payroll.js`
- [ ] Refactor `benefits.js`
- [ ] Refactor `time.js`
- [ ] Refactor `talent.js`
- [ ] Refactor `learning.js`
- [ ] Refactor `compensation.js`

### Phase 4: Update Main Files
- [ ] Update `hcm.js` to use shared utilities
- [ ] Update `hcm-forms.js` to delegate to `ERPForms`
- [ ] Remove `employee-detail.js` duplicates

### Phase 5: Cleanup
- [ ] Remove unused functions from module files
- [ ] Update any remaining hardcoded styles to use CSS variables
- [ ] Test all modules end-to-end

---

## Benefits

| Benefit | Description |
|---------|-------------|
| **Consistency** | All modules use same rendering, styling, and behavior |
| **Maintainability** | Fix bugs or update styles in one place |
| **New Module Speed** | Future modules only define data, not utilities |
| **Reduced Code** | ~400 lines of duplicate code eliminated |
| **Theme Support** | Easy to add dark mode or custom themes via CSS variables |

---

## Future Module Template

When creating a new ERP module (e.g., Finance), follow this structure:

```javascript
/**
 * Finance Module
 */
(function() {
    'use strict';

    const { renderEnum, renderStatus, renderDate, renderMoney, createStatusRenderer } = ERPRenderers;

    // 1. Define enums
    const INVOICE_STATUS = { 1: 'Draft', 2: 'Sent', 3: 'Paid', 4: 'Overdue' };

    // 2. Create status renderers
    const renderInvoiceStatus = createStatusRenderer(INVOICE_STATUS);

    // 3. Define columns
    const COLUMNS = {
        Invoice: [
            { key: 'invoiceNumber', label: 'Invoice #' },
            { key: 'amount', label: 'Amount', render: (item) => renderMoney(item.amount) },
            { key: 'status', label: 'Status', render: (item) => renderInvoiceStatus(item.status) },
            { key: 'dueDate', label: 'Due Date', render: (item) => renderDate(item.dueDate) }
        ]
    };

    // 4. Define forms
    const FORMS = {
        Invoice: {
            title: 'Invoice',
            sections: [/* ... */]
        }
    };

    // 5. Export
    window.Finance = {
        enums: { INVOICE_STATUS },
        columns: COLUMNS,
        forms: FORMS,
        primaryKeys: { Invoice: 'invoiceId' }
    };
})();
```
