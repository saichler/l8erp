/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Create / read / update / delete through the real UI, against the real API.
//
// HCM Job Family is the subject: four fields (code, name, description,
// isActive), two of them required, no cross-module foreign key. That keeps the
// spec about the CRUD pipeline -- form render, collection, save, refresh,
// edit prefill, delete confirm -- rather than about seeding dependencies.
//
// Hygiene (PostImplementationE2ETesting):
//   - every row this spec creates is removed in afterEach, through the API,
//   - cleanup failures are reported but never decide the test result,
//   - a unique per-run code means parallel workers never collide,
//   - assertions filter for THIS row and never assert a total count.

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { DesktopTable } from '../../pages/DesktopTable';
import { Popup } from '../../pages/Popup';
import { safeCleanup } from '../../fixtures/api';
import { clickSaveAndWaitForOutcome } from '../../drivers/forms';

const ENDPOINT = '/30/JobFamily';
const MODEL = 'JobFamily';
const PK = 'jobFamilyId';
const SECTION = 'hcm';
const MODULE = 'core-hr';
const SERVICE = 'job-families';

function uniqueCode(): string {
    return `E2E${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100)}`;
}

test.describe('CRUD through the UI', () => {
    const created: string[] = [];

    test.afterEach(async ({ api }) => {
        // Remove by code rather than by captured id: if the spec failed midway
        // the id may never have been read back, but the row still exists.
        for (const code of created.splice(0)) {
            await safeCleanup(`${MODEL} ${code}`, async () => {
                const res = await api.query(ENDPOINT, `select * from ${MODEL} where code=${code}`);
                for (const row of res.list) {
                    const id = row[PK] as string;
                    if (id) await api.deleteById(ENDPOINT, MODEL, PK, id);
                }
            });
        }
    });

    test('create, find, edit and delete a Job Family @smoke', async ({ app, api, consoleErrors }) => {
        const nav = new DesktopNav(app);
        const table = new DesktopTable(app, MODULE, SERVICE);
        const popup = new Popup(app);

        await nav.openSection(SECTION);
        await nav.openModule(MODULE);
        await nav.openService(MODULE, SERVICE);
        await table.waitForResolved();

        // --- create -------------------------------------------------------
        const code = uniqueCode();
        created.push(code);
        const name = `E2E Job Family ${code}`;

        await expect(table.addButton()).toBeVisible();
        await table.addButton().click();
        await popup.waitForOpen();

        // The form must actually render its configured fields; a form that
        // renders empty is the EnumRendererColumnCascade symptom.
        const labels = await popup.fieldLabels();
        expect(labels, 'the Add form rendered no fields').not.toEqual([]);
        expect(labels.join('|')).toContain('Code');

        await popup.fill('code', code);
        await popup.fill('name', name);
        await popup.fill('description', 'created by the e2e suite');

        const saved = await popup.save();
        expect(saved, 'the Add form produced no write').not.toBeNull();
        expect(saved!.status, `save returned HTTP ${saved!.status}`).toBeLessThan(400);
        await popup.waitForClosed();

        // --- read back ----------------------------------------------------
        // Filter for this row instead of trusting page 1: on a live cluster
        // there is no guarantee a new row lands on the first page.
        await table.filterBy('code', code);
        const row = table.root.locator(`.l8-table tbody tr`).filter({ hasText: code });
        await expect(row, `the created Job Family ${code} never appeared in the table`)
            .toHaveCount(1, { timeout: 20000 });

        const viaApi = await api.query(ENDPOINT, `select * from ${MODEL} where code=${code}`);
        expect(viaApi.list.length, 'the row is in the table but not in the API').toBe(1);
        const id = viaApi.list[0][PK] as string;
        expect(id, 'the created record has no primary key').toBeTruthy();

        // --- update -------------------------------------------------------
        const newName = `${name} (edited)`;
        await table.editButton(id).click();
        await popup.waitForOpen();

        // Edit must prefill from the record -- a blank edit form silently
        // overwrites the row with empty values on save.
        await expect(popup.input('code')).toHaveValue(code);
        await popup.fill('name', newName);
        const updated = await popup.save();
        expect(updated, 'the Edit form produced no write').not.toBeNull();
        expect(updated!.status, `update returned HTTP ${updated!.status}`).toBeLessThan(400);
        await popup.waitForClosed();

        // Poll, not one read: a GET issued right after the PUT can still be
        // served the pre-edit row (observed once in a smoke run; the identical
        // query was answered from before the write). The edit must land within
        // the window -- a write that never shows up still fails here.
        await expect
            .poll(async () => {
                const r = await api.query(ENDPOINT, `select * from ${MODEL} where code=${code}`);
                return r.list[0]?.name;
            }, { timeout: 10000, message: 'the edited name never reached the API' })
            .toBe(newName);

        // --- row click opens the detail view ------------------------------
        await table.filterBy('code', code);
        await table.clickRow(id);
        await popup.waitForOpen();
        const shown = await popup.readOnlyValues();
        expect(
            Object.values(shown).join(' '),
            'the detail popup did not show the record'
        ).toContain(code);
        await popup.close();

        // --- delete -------------------------------------------------------
        await table.filterBy('code', code);
        app.once('dialog', (d) => d.accept());
        await table.deleteButton(id).click();

        const confirm = app.locator('.probler-popup-overlay .probler-popup-footer .btn-primary');
        if (await confirm.count()) await confirm.click();

        await expect
            .poll(async () => {
                const r = await api.query(ENDPOINT, `select * from ${MODEL} where code=${code}`);
                return r.list.length;
            }, { timeout: 20000, message: 'the record was not deleted' })
            .toBe(0);

        created.splice(created.indexOf(code), 1); // already gone
        assertNoPageErrors(consoleErrors);
    });

    test('required-field validation blocks an empty save', async ({ app, consoleErrors }) => {
        const nav = new DesktopNav(app);
        const table = new DesktopTable(app, MODULE, SERVICE);
        const popup = new Popup(app);

        await nav.openSection(SECTION);
        await nav.openModule(MODULE);
        await nav.openService(MODULE, SERVICE);
        await table.waitForResolved();

        await table.addButton().click();
        await popup.waitForOpen();

        // Either the popup stays open with an error, or a notification fires --
        // what must NOT happen is a silent close with a row written.
        const outcome = await clickSaveAndWaitForOutcome(app, popup);
        expect(
            outcome,
            'saving an empty required form neither blocked nor reported an error'
        ).toBe('blocked');

        await popup.close().catch(() => undefined);
        assertNoPageErrors(consoleErrors, ['required']);
    });
});
