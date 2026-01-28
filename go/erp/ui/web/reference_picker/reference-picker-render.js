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
 * ERP Reference Picker - Rendering
 * DOM creation and list rendering
 */
(function() {
    'use strict';

    const internal = ERPReferencePicker._internal;

    /**
     * Create the picker DOM element
     */
    internal.createPickerElement = function(config) {
        const picker = document.createElement('div');
        picker.className = 'erp-refpicker';

        const title = config.title || `Select ${config.modelName}`;
        const placeholder = config.placeholder || 'Search...';
        const displayLabel = config.displayLabel || config.displayColumn;

        picker.innerHTML = `
            <div class="erp-refpicker-header">
                <span class="erp-refpicker-title">${internal.escapeHtml(title)}</span>
                <button type="button" class="erp-refpicker-close" title="Close">&times;</button>
            </div>
            <div class="erp-refpicker-search">
                <input type="text" class="erp-refpicker-filter"
                       placeholder="${internal.escapeHtml(placeholder)}"
                       autocomplete="off">
            </div>
            <div class="erp-refpicker-sort-header">
                <button type="button" class="erp-refpicker-sort-btn" data-column="${config.displayColumn}">
                    <span class="sort-label">${internal.escapeHtml(displayLabel)}</span>
                    <span class="sort-indicator">▲</span>
                </button>
            </div>
            <div class="erp-refpicker-list"></div>
            <div class="erp-refpicker-pagination">
                <div class="erp-refpicker-page-btns"></div>
                <div class="erp-refpicker-page-info"></div>
            </div>
            <div class="erp-refpicker-footer">
                <button type="button" class="erp-refpicker-clear-btn">Clear</button>
                <button type="button" class="erp-refpicker-select-btn">Select</button>
            </div>
        `;

        return picker;
    };

    /**
     * Render list items
     */
    internal.renderList = function(picker, config, state) {
        const listEl = picker.querySelector('.erp-refpicker-list');

        if (state.data.length === 0) {
            const emptyMsg = config.emptyMessage || 'No results found';
            listEl.innerHTML = `<div class="erp-refpicker-empty">${internal.escapeHtml(emptyMsg)}</div>`;
            return;
        }

        listEl.innerHTML = state.data.map((item, index) => {
            const id = item[config.idColumn];
            const display = config.displayFormat
                ? config.displayFormat(item)
                : item[config.displayColumn];
            const isSelected = String(id) === String(state.selectedId);

            return `
                <div class="erp-refpicker-item ${isSelected ? 'selected' : ''}"
                     data-id="${internal.escapeHtml(String(id))}"
                     data-display="${internal.escapeHtml(String(display))}"
                     data-index="${index}"
                     tabindex="0">
                    <span class="erp-refpicker-radio">${isSelected ? '●' : '○'}</span>
                    <span class="erp-refpicker-label">${internal.escapeHtml(String(display))}</span>
                </div>
            `;
        }).join('');
    };

    /**
     * Render pagination controls
     */
    internal.renderPagination = function(picker, config, state) {
        const pageBtnsEl = picker.querySelector('.erp-refpicker-page-btns');
        const pageInfoEl = picker.querySelector('.erp-refpicker-page-info');

        const totalPages = Math.ceil(state.totalItems / config.pageSize) || 1;
        const currentPage = state.currentPage + 1; // Display as 1-indexed

        // Page info
        const start = state.totalItems === 0 ? 0 : (state.currentPage * config.pageSize) + 1;
        const end = Math.min((state.currentPage + 1) * config.pageSize, state.totalItems);
        pageInfoEl.textContent = state.totalItems > 0
            ? `${start}-${end} of ${state.totalItems}`
            : 'No results';

        // Page buttons
        let html = '';

        // Previous button
        html += `<button type="button" class="erp-refpicker-page-btn"
                         data-action="prev" ${state.currentPage === 0 ? 'disabled' : ''}>
                    ◀
                 </button>`;

        // Page numbers (show max 5 pages)
        const maxVisiblePages = 5;
        let startPage = Math.max(0, state.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages);

        if (endPage - startPage < maxVisiblePages) {
            startPage = Math.max(0, endPage - maxVisiblePages);
        }

        if (startPage > 0) {
            html += `<button type="button" class="erp-refpicker-page-btn" data-page="0">1</button>`;
            if (startPage > 1) {
                html += `<span class="erp-refpicker-page-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i < endPage; i++) {
            const isActive = i === state.currentPage;
            html += `<button type="button" class="erp-refpicker-page-btn ${isActive ? 'active' : ''}"
                             data-page="${i}">${i + 1}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                html += `<span class="erp-refpicker-page-ellipsis">...</span>`;
            }
            html += `<button type="button" class="erp-refpicker-page-btn"
                             data-page="${totalPages - 1}">${totalPages}</button>`;
        }

        // Next button
        html += `<button type="button" class="erp-refpicker-page-btn"
                         data-action="next" ${state.currentPage >= totalPages - 1 ? 'disabled' : ''}>
                    ▶
                 </button>`;

        pageBtnsEl.innerHTML = html;
    };

    /**
     * Update sort indicator
     */
    internal.updateSortIndicator = function(picker, state) {
        const indicator = picker.querySelector('.sort-indicator');
        if (indicator) {
            indicator.textContent = state.sortDirection === 'asc' ? '▲' : '▼';
        }
    };

})();
