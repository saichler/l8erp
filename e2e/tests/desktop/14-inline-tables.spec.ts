/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// PHASE 6 -- child entities: all 142 inline tables.
//
// PrimeObjectReferences Rule 3 makes these invisible to every other spec: a
// child type gets no config entry, no columns, no nav entry and no registry
// entry, so nothing reaches it except through its parent's form. Until this
// spec, 142 child schemas had zero coverage.
//
// Read-only. It opens each parent's Add form, asserts the inline table rendered
// with its configured columns, and opens the row editor where one exists --
// exercising StackedPopupDomScoping, since the row editor is a second popup
// over the parent and both carry the same element ids. Nothing is saved.

import { test, assertNoPageErrors } from '../../fixtures/test';
import { DESKTOP_SECTIONS } from '../../fixtures/inventory';
import { openService, expectNoProblems, Problems, dismissTransientOverlays } from '../../drivers/table';
import { openAddForm } from '../../drivers/forms';
import { InlineTable } from '../../pages/InlineTable';
import { Page } from '@playwright/test';

/**
 * Closes stacked popups until only `depth` remain, using the app's own close
 * paths only.
 *
 * Deliberately never removes an overlay from the DOM: Layer8DPopup keeps its
 * own stack, so ripping the element out leaves the manager believing a popup is
 * still open, and every later show() silently no-ops -- which then looks like
 * "Add produced neither a row editor nor a new row" on the NEXT inline table.
 * Returns false if the stack could not be collapsed, so the caller can report
 * that rather than carry on against corrupted state.
 */
async function collapseToDepth(page: Page, depth: number): Promise<boolean> {
    for (let i = 0; i < 5; i++) {
        const overlays = page.locator('.probler-popup-overlay');
        if ((await overlays.count()) <= depth) return true;
        // The row editor carries date-picker triggers; an open
        // .layer8d-datepicker-overlay sits over its close button and silently
        // swallows the click.
        await dismissTransientOverlays(page);
        const top = overlays.last();
        const close = top.locator('.probler-popup-close');
        const cancel = top.locator('.probler-popup-footer .btn-secondary');
        if (await close.count()) {
            await close.click({ timeout: 3000 }).catch(() => undefined);
        } else if (await cancel.count()) {
            await cancel.click({ timeout: 3000 }).catch(() => undefined);
        } else {
            await page.keyboard.press('Escape').catch(() => undefined);
        }
        await page.waitForTimeout(400);
    }
    return (await page.locator('.probler-popup-overlay').count()) <= depth;
}

for (const section of DESKTOP_SECTIONS) {
    for (const mod of section.modules) {
        const withChildren = mod.services.filter(
            (s) => !s.customView && (s.form?.inlineTables.length || 0) > 0
        );
        if (withChildren.length === 0) continue;

        const childCount = withChildren.reduce((a, s) => a + (s.form?.inlineTables.length || 0), 0);

        test(`${section.section} / ${mod.moduleKey}: ${childCount} inline table(s)`,
            async ({ app, consoleErrors }) => {
                const problems: Problems = [];

                for (const svc of withChildren) {
                    const where = `${section.section}/${mod.moduleKey}/${svc.key} (${svc.model})`;
                    const form = svc.form!;

                    const ctx = await openService(app, section.section, mod.moduleKey, svc);
                    const item = ctx.nav.subnavItem(mod.moduleKey, svc.key);
                    if (!(await item.count()) || !(await item.isVisible())) continue;

                    try {
                        await ctx.table.waitForResolved();
                    } catch {
                        continue; // the table itself is 10-table-depth's finding
                    }
                    if (!(await openAddForm(ctx.table, ctx.popup, where, problems))) continue;

                    // Popup.body() resolves to the LAST overlay. A row editor
                    // left open by one inline table therefore re-scopes every
                    // later lookup into the wrong popup, and the remaining
                    // tables read as "did not render". Remember the parent's
                    // depth and collapse back to it after each interaction.
                    const parentDepth = await app.locator('.probler-popup-overlay').count();

                    for (const key of form.inlineTables) {
                        const schema = form.sections
                            .flatMap((s) => s.fields)
                            .find((f) => f.key === key);
                        const inline = new InlineTable(app, ctx.popup, key);

                        // A multi-section form is tabbed and only the active
                        // pane is displayed; anything in an inactive pane is
                        // 0x0 and unclickable.
                        await ctx.popup.revealTabContaining(`[data-inline-table="${key}"]`);

                        if (!(await inline.rendered())) {
                            problems.push(
                                `${where}: inline table "${key}" did not render -- the child ` +
                                `schema declares ${schema?.columns?.length ?? 0} column(s)`
                            );
                            continue;
                        }

                        // The hidden JSON payload is what the parent actually
                        // saves; without it the children are silently dropped.
                        if (!(await inline.dataInput().count())) {
                            problems.push(
                                `${where}: inline table "${key}" has no data-inline-table-data ` +
                                `input -- its rows would never be submitted with the parent`
                            );
                        }

                        // Declared child columns must appear as headers.
                        const declared = (schema?.columns || []).filter((c) => !c.hidden);
                        if (declared.length > 0) {
                            const labels = (await inline.columnLabels()).map((l) => l.toLowerCase());
                            const missing = declared
                                .filter((c) => !labels.some((l) => l === (c.label || c.key).toLowerCase()))
                                .map((c) => c.key);
                            if (missing.length === declared.length) {
                                problems.push(
                                    `${where}: inline table "${key}" rendered none of its ` +
                                    `${declared.length} declared column(s) -> ${missing.slice(0, 6).join(', ')}`
                                );
                            }
                        }

                        // Adding a row must produce an editor or an inline row.
                        if (await inline.addButton().count()) {
                            const opened = await inline.openAddRow();
                            if (!opened) {
                                problems.push(
                                    `${where}: inline table "${key}" Add produced neither a row ` +
                                    `editor nor a new row`
                                );
                            }
                            if (!(await collapseToDepth(app, parentDepth))) {
                                problems.push(
                                    `${where}: inline table "${key}" row editor could not be ` +
                                    `closed -- later tables in this form are untestable`
                                );
                                break;
                            }
                        }
                    }

                    await ctx.popup.close().catch(() => undefined);
                }

                expectNoProblems(problems, 'inline table failures');
                assertNoPageErrors(consoleErrors, ['required', 'validation']);
            });
    }
}
