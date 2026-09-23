/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Table chrome: paging, sorting, filtering, export, and the detail popup.
//
// Employee is the subject -- the mock set seeds 50 of them, which is enough
// for real paging (the fault that started this suite was an Employee list that
// rendered nothing while the dashboard counted 50).

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { DesktopTable } from '../../pages/DesktopTable';
import { Popup } from '../../pages/Popup';

const SECTION = 'hcm';
const MODULE = 'core-hr';
const SERVICE = 'employees';
const MODEL = 'Employee';
const ENDPOINT = '/30/Employee';

test.describe('table features', () => {
    test.beforeEach(async ({ app }) => {
        const nav = new DesktopNav(app);
        await nav.openSection(SECTION);
        await nav.openModule(MODULE);
        await nav.openService(MODULE, SERVICE);
    });

    test('renders rows and the count agrees with the API @smoke', async ({ app, api }) => {
        const table = new DesktopTable(app, MODULE, SERVICE);
        const state = await table.waitForResolved();

        const apiTotal = await api.total(ENDPOINT, MODEL);
        if (apiTotal === 0) {
            expect(state, 'API has no employees, so the table should say so').toBe('empty');
            return;
        }

        expect(state, `the API reports ${apiTotal} employees but the table rendered none`).toBe('rows');
        await expect(table.rows().first()).toBeVisible();

        const reported = await table.reportedTotal();
        if (reported !== null) {
            expect(reported, 'pagination total disagrees with the API').toBe(apiTotal);
        }
    });

    test('paging fetches the next page and keeps the total', async ({ app, api }) => {
        const total = await api.total(ENDPOINT, MODEL);
        test.skip(total <= 10, 'needs more than one page of data');

        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();

        // Rows carry data-row-index, not data-id, so identity comes from the
        // rendered text rather than an id attribute.
        const firstRows = await table.rows().allInnerTexts();

        // data-action="next" on the button, not the .l8-page-nav container.
        const next = table.root.locator('.l8-page-nav [data-action="next"]');
        await expect(next).toBeVisible();
        await next.click();
        await app.waitForTimeout(1200);

        const secondRows = await table.rows().allInnerTexts();
        expect(secondRows, 'page 2 rendered no rows').not.toEqual([]);
        expect(secondRows, 'page 2 shows the same rows as page 1').not.toEqual(firstRows);

        // Layer8DTablePaginationMetadata: page 2 must not zero out the total.
        const reported = await table.reportedTotal();
        if (reported !== null) {
            expect(reported, 'the total was lost when paging past page 1').toBe(total);
        }
    });

    test('a column filter narrows the result set', async ({ app, api }) => {
        const sample = await api.listFirstPage<Record<string, string>>(ENDPOINT, MODEL, 1);
        test.skip(sample.list.length === 0, 'no employees to filter on');

        const lastName = sample.list[0].lastName;
        test.skip(!lastName, 'sample employee has no lastName');

        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();
        await table.filterBy('name', lastName);

        const rows = table.rows();
        await expect(rows.first()).toBeVisible({ timeout: 20000 });
        const texts = await rows.allInnerTexts();
        // Assert the filter actually constrained the set, never an exact count.
        expect(
            texts.every((t) => t.toLowerCase().includes(lastName.toLowerCase())),
            `filtering by "${lastName}" returned rows that do not match it`
        ).toBeTruthy();
    });

    test('sorting re-issues the query with sort-by', async ({ app }) => {
        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();

        const sortable = table.root.locator('.l8-table-header-row th.sortable, .l8-table-header-row th')
            .filter({ has: app.locator('.l8-sort-indicator') })
            .first();
        test.skip(!(await sortable.count()), 'no sortable column rendered');

        const requestPromise = app.waitForRequest(
            (r) => decodeURIComponent(r.url()).includes('sort-by'),
            { timeout: 15000 }
        );
        await sortable.click();
        const req = await requestPromise;
        const query = JSON.parse(new URL(req.url()).searchParams.get('body') || '{}').text as string;
        expect(query).toContain('sort-by');
        expect(query).toContain(`from ${MODEL}`);
    });

    test('row click opens a detail popup with the record', async ({ app, api }) => {
        const sample = await api.listFirstPage<Record<string, string>>(ENDPOINT, MODEL, 1);
        test.skip(sample.list.length === 0, 'no employees');

        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();
        const popup = new Popup(app);

        await table.rows().first().locator('td').nth(1).click();
        await popup.waitForOpen();

        // Rule 2 of L8QueryRules: detail popups select *, so the popup must
        // show more than the handful of columns the table showed.
        const fields = await popup.fieldLabels();
        expect(fields.length, 'the detail popup rendered no fields').toBeGreaterThan(3);
        await popup.close();
    });

    test('CSV export is offered and produces a download', async ({ app }) => {
        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();

        const dropdown = table.exportDropdown();
        test.skip(!(await dropdown.count()), 'no export control rendered for this table');

        await dropdown.click();
        const csv = table.root.locator('.l8-export-option').filter({ hasText: /csv/i }).first();
        test.skip(!(await csv.count()), 'no CSV export option');

        const downloadPromise = app.waitForEvent('download', { timeout: 30000 }).catch(() => null);
        await csv.click();
        const download = await downloadPromise;
        expect(download, 'clicking CSV export produced no download').not.toBeNull();
    });

    test('changing page size re-queries with the new limit', async ({ app }) => {
        const table = new DesktopTable(app, MODULE, SERVICE);
        await table.waitForResolved();

        const select = table.root.locator('.l8-page-size-select');
        test.skip(!(await select.count()), 'no page-size selector rendered');

        const options = await select.locator('option').allInnerTexts();
        const bigger = options.map(Number).filter((n) => n > 10)[0];
        test.skip(!bigger, 'no larger page size available');

        const requestPromise = app.waitForRequest(
            (r) => decodeURIComponent(r.url()).includes(`limit ${bigger} `),
            { timeout: 15000 }
        );
        await select.selectOption(String(bigger));
        await requestPromise;
    });

    test.afterEach(async ({ consoleErrors }) => {
        assertNoPageErrors(consoleErrors);
    });
});
