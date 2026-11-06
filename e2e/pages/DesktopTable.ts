/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Page object for Layer8DTable, scoped to one service's container.
//
// Selectors come from l8ui/edit_table/layer8d-table-render.js: `.l8-table`,
// `.l8-filter-input`, `.l8-pagination`, `.l8-empty-state`, rows carrying
// `data-id`, action buttons carrying `data-action`.

import { Locator, Page, expect } from '@playwright/test';

/** Attribute that tags DOM the next render is expected to replace. */
export const STALE = 'data-e2e-stale';

export class DesktopTable {
    readonly root: Locator;

    constructor(private page: Page, moduleKey: string, serviceKey: string) {
        this.root = page.locator(`#${moduleKey}-${serviceKey}-table-container`);
    }

    table(): Locator { return this.root.locator('.l8-table'); }

    /**
     * Data rows.
     *
     * layer8d-table-render.js renders `<tr class="..." data-row-index="N">` --
     * the row itself carries NO data-id; that attribute is only on the action
     * buttons inside the last cell. Selecting on `tr[data-id]` matches nothing
     * and makes a perfectly healthy table look like it never rendered.
     */
    rows(): Locator { return this.root.locator('.l8-table tbody tr[data-row-index]'); }
    emptyState(): Locator { return this.root.locator('.l8-empty-state'); }
    pagination(): Locator { return this.root.locator('.l8-pagination'); }
    paginationInfo(): Locator { return this.root.locator('.l8-pagination-info'); }
    addButton(): Locator { return this.root.locator('.l8-btn-primary'); }
    filterInputs(): Locator { return this.root.locator('.l8-filter-input'); }
    headers(): Locator { return this.root.locator('.l8-table-header-row th'); }
    exportDropdown(): Locator { return this.root.locator('.l8-export-dropdown'); }

    /**
     * Waits until the view has resolved into one of its two legitimate end
     * states: rows, or an explicit empty state. A container that is still blank
     * after the timeout means the view threw before rendering -- exactly the
     * class of failure that shipped invisibly here before.
     */
    async waitForResolved(timeout = 20000): Promise<'rows' | 'empty'> {
        const id = await this.root.getAttribute('id');
        let lastError = '';

        await expect
            .poll(
                async () => {
                    if (await this.rows().count() > 0) return 'rows';
                    if (await this.emptyState().count() > 0) return 'empty';
                    // Layer8DTable.showError() replaces the container with a
                    // bare styled <div> carrying no class, so the error state
                    // is invisible to a class-based selector. Detect it as
                    // "text, but no table and no empty state" and surface the
                    // message -- otherwise a render bug reports as a timeout
                    // and reads like the view never fetched at all.
                    lastError = await this.errorText();
                    if (lastError) return 'error';
                    return 'pending';
                },
                {
                    timeout,
                    message:
                        `table container ${id} never resolved. ` +
                        `It rendered no rows, no empty state and no error -- the view most ` +
                        `likely threw before fetching.`
                }
            )
            .not.toBe('pending');

        if (await this.rows().count() > 0) return 'rows';
        if (await this.emptyState().count() > 0) return 'empty';
        throw new Error(
            `table container ${id} rendered an ERROR instead of data: "${lastError}". ` +
            `The API may be fine -- a column renderer returning a non-string makes ` +
            `layer8d-table-render.js:236 throw, and fetchData's catch relabels it.`
        );
    }

    /**
     * The message Layer8DTable.showError() painted, if any.
     * Empty string when the container holds a real table or empty state.
     */
    async errorText(): Promise<string> {
        if (await this.table().count()) return '';
        if (await this.emptyState().count()) return '';
        const text = (await this.root.innerText().catch(() => '')).trim();
        return text;
    }

    /** Column labels as rendered, minus the trailing Actions column. */
    async columnLabels(): Promise<string[]> {
        const labels = await this.headers().allInnerTexts();
        return labels.map((l) => l.trim()).filter((l) => l && l !== 'Actions');
    }

    /**
     * Runs `action` and waits until the table has rendered again.
     *
     * Layer8DTable.render() and showError() both replace the container's whole
     * innerHTML, and a server-side table renders only once its response has
     * been parsed (layer8d-table-data.js fetchData -> setServerData -> render).
     * So: tag the current children, act, and wait for no tagged child to
     * remain. That is the render itself, not a guess at how long it takes --
     * the filter debounce, the request and the parse are all covered.
     *
     * Returns false when nothing re-rendered within `timeout`.
     */
    async rerender(action: () => Promise<unknown>, timeout = 20000): Promise<boolean> {
        await this.root.evaluate((el, attr) => {
            Array.from(el.children).forEach((c) => c.setAttribute(attr, '1'));
        }, STALE).catch(() => undefined);
        await action();
        return expect(this.root.locator(`:scope > [${STALE}]`))
            .toHaveCount(0, { timeout })
            .then(() => true, () => false);
    }

    /**
     * Types into a column's filter box and waits for the filtered render.
     *
     * Filtering before asserting visibility is a hygiene rule from
     * PostImplementationE2ETesting: on a live cluster a specific row is not
     * guaranteed to be on page 1, so specs filter for the row they created
     * instead of trusting default paging.
     */
    async filterBy(columnKey: string, value: string): Promise<boolean> {
        const input = this.root.locator(`.l8-filter-input[data-column="${columnKey}"]`);
        await expect(input).toBeVisible();
        return this.rerender(() => input.fill(value));
    }

    /** The row whose action buttons carry this record id. */
    rowById(id: string): Locator {
        return this.root.locator('.l8-table tbody tr').filter({
            has: this.page.locator(`[data-action][data-id="${id}"]`)
        });
    }

    async clickRow(id: string): Promise<void> {
        await this.rowById(id).locator('td').first().click();
    }

    editButton(id: string): Locator {
        return this.rowById(id).locator('[data-action="edit"]');
    }

    deleteButton(id: string): Locator {
        return this.rowById(id).locator('[data-action="delete"]');
    }

    /** Total the pagination bar reports, or null when it isn't shown. */
    async reportedTotal(): Promise<number | null> {
        if (!(await this.paginationInfo().count())) return null;
        const text = await this.paginationInfo().innerText();
        const m = text.match(/of\s+([\d,]+)/i);
        return m ? Number(m[1].replace(/,/g, '')) : null;
    }
}
