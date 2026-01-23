/**
 * ERP Reference Picker - Event Handling
 * All event listeners and keyboard navigation
 */
(function() {
    'use strict';

    const internal = ERPReferencePicker._internal;

    /**
     * Setup all event handlers for the picker
     */
    internal.setupEvents = function(picker, inputElement, config, state) {
        // Close button
        picker.querySelector('.erp-refpicker-close').addEventListener('click', () => {
            ERPReferencePicker.close();
        });

        // Filter input with debounce
        const filterInput = picker.querySelector('.erp-refpicker-filter');
        const debouncedFilter = internal.debounce(async (value) => {
            state.filterValue = value;
            state.currentPage = 0;
            await internal.refresh(picker, config, state);
        }, config.filterDebounceMs || 500);

        filterInput.addEventListener('input', (e) => {
            debouncedFilter(e.target.value);
        });

        // Immediate filter on Enter key
        filterInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                state.filterValue = filterInput.value;
                state.currentPage = 0;
                internal.refresh(picker, config, state);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                focusFirstItem(picker);
            }
        });

        // Sort toggle
        picker.querySelector('.erp-refpicker-sort-btn').addEventListener('click', async () => {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
            state.currentPage = 0;
            await internal.refresh(picker, config, state);
        });

        // Item selection (click)
        picker.querySelector('.erp-refpicker-list').addEventListener('click', (e) => {
            const item = e.target.closest('.erp-refpicker-item');
            if (item) {
                selectItem(picker, config, state, item);
            }
        });

        // Item selection (keyboard)
        picker.querySelector('.erp-refpicker-list').addEventListener('keydown', (e) => {
            const item = e.target.closest('.erp-refpicker-item');
            if (!item) return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectItem(picker, config, state, item);
                // Also confirm selection on Enter
                if (e.key === 'Enter') {
                    confirmSelection(inputElement, config, state);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                focusNextItem(item);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                focusPrevItem(item, picker);
            }
        });

        // Pagination buttons
        picker.querySelector('.erp-refpicker-page-btns').addEventListener('click', async (e) => {
            const btn = e.target.closest('.erp-refpicker-page-btn');
            if (!btn || btn.disabled) return;

            const action = btn.dataset.action;
            const page = btn.dataset.page;

            if (action === 'prev') {
                state.currentPage = Math.max(0, state.currentPage - 1);
            } else if (action === 'next') {
                const totalPages = Math.ceil(state.totalItems / config.pageSize);
                state.currentPage = Math.min(totalPages - 1, state.currentPage + 1);
            } else if (page !== undefined) {
                state.currentPage = parseInt(page, 10);
            }

            await internal.refresh(picker, config, state);
        });

        // Select button
        picker.querySelector('.erp-refpicker-select-btn').addEventListener('click', () => {
            confirmSelection(inputElement, config, state);
        });

        // Clear button
        picker.querySelector('.erp-refpicker-clear-btn').addEventListener('click', () => {
            inputElement.value = '';
            delete inputElement.dataset.refId;
            delete inputElement.dataset.refItem;

            if (config.onChange) {
                config.onChange(null, '', null);
            }

            ERPReferencePicker.close();
        });

        // Global keyboard handler
        document.addEventListener('keydown', internal.handleEscapeKey);
    };

    /**
     * Select an item in the list
     */
    function selectItem(picker, config, state, itemEl) {
        // Update state
        state.selectedId = itemEl.dataset.id;
        state.selectedDisplay = itemEl.dataset.display;

        // Find the full item data
        const index = parseInt(itemEl.dataset.index, 10);
        state.selectedItem = state.data[index] || null;

        // Update visual selection
        picker.querySelectorAll('.erp-refpicker-item').forEach(el => {
            el.classList.remove('selected');
            el.querySelector('.erp-refpicker-radio').textContent = '○';
        });
        itemEl.classList.add('selected');
        itemEl.querySelector('.erp-refpicker-radio').textContent = '●';
    }

    /**
     * Confirm selection and close picker
     */
    function confirmSelection(inputElement, config, state) {
        if (state.selectedId) {
            inputElement.value = state.selectedDisplay || '';
            inputElement.dataset.refId = state.selectedId;

            // Store full item data as JSON for complex use cases
            if (state.selectedItem) {
                inputElement.dataset.refItem = JSON.stringify(state.selectedItem);
            }

            if (config.onChange) {
                config.onChange(state.selectedId, state.selectedDisplay, state.selectedItem);
            }

            ERPReferencePicker.close();
        }
    }

    /**
     * Focus the first item in the list
     */
    function focusFirstItem(picker) {
        const firstItem = picker.querySelector('.erp-refpicker-item');
        if (firstItem) {
            firstItem.focus();
        }
    }

    /**
     * Focus the next item in the list
     */
    function focusNextItem(currentItem) {
        const next = currentItem.nextElementSibling;
        if (next && next.classList.contains('erp-refpicker-item')) {
            next.focus();
        }
    }

    /**
     * Focus the previous item, or filter input if at top
     */
    function focusPrevItem(currentItem, picker) {
        const prev = currentItem.previousElementSibling;
        if (prev && prev.classList.contains('erp-refpicker-item')) {
            prev.focus();
        } else {
            picker.querySelector('.erp-refpicker-filter').focus();
        }
    }

})();
