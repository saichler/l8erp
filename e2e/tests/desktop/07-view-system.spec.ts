/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// The view system: every service that declares an alternate view must be able
// to switch into it and render.
//
// PostImplementationE2ETesting names two bugs from this exact area that no
// backend test could catch: a shared factory silently never resolving
// `service.alternateViews` because of a field-name mismatch, and a stale chart
// instance surviving a section re-render. Both only show up by switching the
// view and looking at what lands in the container.

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { DesktopTable } from '../../pages/DesktopTable';
import { desktopServicesWithAlternateViews, DESKTOP_SECTIONS } from '../../fixtures/inventory';

// What a rendered view of each type puts in the container.
const VIEW_MARKERS: Record<string, string> = {
    table: '.l8-table, .l8-empty-state',
    chart: 'svg, canvas, .layer8d-chart, .l8-empty-state',
    kanban: '.layer8d-kanban-board, .l8-empty-state',
    calendar: '.layer8d-calendar, .l8-empty-state',
    timeline: '.layer8d-timeline, .l8-empty-state',
    gantt: '.layer8d-gantt, .l8-empty-state',
    tree: '.layer8d-tree-grid, .l8-empty-state',
    wizard: '.layer8d-wizard, .l8-empty-state'
};

const withAlternates = desktopServicesWithAlternateViews();

test.describe('view system', () => {
    test('the view factory has every declared type registered', async ({ app }) => {
        const declared = new Set<string>();
        for (const x of withAlternates) {
            declared.add(x.service.viewType);
            x.service.alternateViews.forEach((v) => declared.add(v));
        }

        const missing = await app.evaluate((types: string[]) => {
            const w = window as unknown as { Layer8DViewFactory: { has(t: string): boolean } };
            return types.filter((t) => !w.Layer8DViewFactory.has(t));
        }, [...declared]);

        expect(
            missing,
            `view types declared by a module config but never registered with ` +
            `Layer8DViewFactory: ${missing.join(', ')}`
        ).toEqual([]);
    });

    test('services declaring alternate views render a view switcher', async ({ app }) => {
        test.skip(withAlternates.length === 0, 'no service declares an alternate view');

        const bySection = new Map<string, typeof withAlternates>();
        for (const x of withAlternates) {
            if (!bySection.has(x.section)) bySection.set(x.section, []);
            bySection.get(x.section)!.push(x);
        }

        const nav = new DesktopNav(app);
        const missing: string[] = [];

        for (const [section, services] of bySection) {
            await nav.openSection(section);
            for (const { moduleKey, service } of services) {
                await nav.openModule(moduleKey);
                await nav.openService(moduleKey, service.key);
                const slot = nav.viewSwitcherSlot(moduleKey, service.key);
                if (!(await slot.count()) || (await slot.innerHTML()).trim() === '') {
                    missing.push(
                        `${section}/${moduleKey}/${service.key} declares ` +
                        `[${service.alternateViews.join(', ')}] but rendered no switcher`
                    );
                }
            }
        }
        expect(missing, `missing view switchers:\n  ${missing.join('\n  ')}`).toEqual([]);
    });

    for (const { section, moduleKey, service } of withAlternates) {
        const views = [...new Set([service.viewType, ...service.alternateViews])];
        test(`${section}/${moduleKey}/${service.key} renders [${views.join(', ')}]`,
            async ({ app, consoleErrors }) => {
                const nav = new DesktopNav(app);
                await nav.openSection(section);
                await nav.openModule(moduleKey);
                await nav.openService(moduleKey, service.key);

                const table = new DesktopTable(app, moduleKey, service.key);
                await table.waitForResolved();

                const container = nav.tableContainer(moduleKey, service.key);
                const slot = nav.viewSwitcherSlot(moduleKey, service.key);
                const failures: string[] = [];

                for (const view of views) {
                    // Layer8ViewSwitcher.render() emits an icon button plus a
                    // floating menu of .l8-view-menu-item[data-view-type].
                    // Reaching an item means opening the menu first, and the
                    // attribute is data-view-TYPE -- looking for data-view
                    // silently matches nothing, the view never switches, and
                    // every non-default view then "renders nothing" because the
                    // default table is still on screen.
                    const toggle = slot.locator('.l8-view-toggle');
                    if (await toggle.count()) {
                        await toggle.first().click().catch(() => undefined);
                        await app.waitForTimeout(200);
                    }
                    const option = slot.locator(
                        `[data-view-type="${view}"], option[value="${view}"]`
                    );
                    if (await option.count()) {
                        const tag = await option.first().evaluate((e) => e.tagName.toLowerCase());
                        if (tag === 'option') {
                            await slot.locator('select').selectOption(view);
                        } else {
                            await option.first().click();
                        }
                        await app.waitForTimeout(1500);
                    } else {
                        // Close the menu we just opened: left open it floats
                        // over the module tabs and the NEXT test's
                        // openModule() click lands on it instead.
                        if (await toggle.count()) {
                            await toggle.first().click().catch(() => undefined);
                        }
                        failures.push(
                            `${view}: the switcher offers no option for it ` +
                            `(looked for [data-view-type="${view}"])`
                        );
                        continue;
                    }

                    const marker = VIEW_MARKERS[view] || '*';
                    if (!(await container.locator(marker).count())) {
                        failures.push(
                            `${view}: container has no ${marker} -- the view rendered nothing`
                        );
                    }
                }

                // Same reason: an open .l8-view-menu outlives this test and
                // intercepts the next one's navigation clicks.
                await app.locator('.l8-view-menu.open, .l8-view-menu[style*="block"]')
                    .first().click({ timeout: 500 }).catch(() => undefined);
                await app.keyboard.press('Escape').catch(() => undefined);

                expect(failures, `view failures:\n  ${failures.join('\n  ')}`).toEqual([]);
                assertNoPageErrors(consoleErrors);
            });
    }

    test('re-entering a section does not leave a stale view behind', async ({ app, consoleErrors }) => {
        // The stale-instance bug: a view survives a section re-render and the
        // second visit draws into a detached container, so the section looks
        // empty or double-renders.
        const nav = new DesktopNav(app);
        const first = DESKTOP_SECTIONS[0];
        const mod = first.modules[0];
        const svc = mod.services[0];

        for (let i = 0; i < 2; i++) {
            await nav.openSection(first.section);
            await nav.openModule(mod.moduleKey);
            await nav.openService(mod.moduleKey, svc.key);
            const table = new DesktopTable(app, mod.moduleKey, svc.key);
            await table.waitForResolved();
            await nav.openSection('dashboard');
        }

        await nav.openSection(first.section);
        const containers = app.locator(`#${svc.containerId}`);
        expect(
            await containers.count(),
            'the service container exists more than once -- a previous render was never torn down'
        ).toBe(1);
        assertNoPageErrors(consoleErrors);
    });
});
