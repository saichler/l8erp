/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Dashboard KPIs and top-level navigation.
//
// The dashboard is the one place in the app that builds its query text by hand
// (dashboard/dashboard-config.js) instead of going through Layer8QueryBuilder,
// which is why it kept working while every table in the app was broken. That
// asymmetry is worth an explicit test: a dashboard KPI agreeing with the API
// while the matching section renders nothing is the exact shape of the bug
// this suite exists to catch.

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { DESKTOP_SECTIONS } from '../../fixtures/inventory';

test.describe('dashboard @smoke', () => {
    test('every KPI tile resolves to a number', async ({ app }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('dashboard');

        const tiles = app.locator('.dashboard-stat-card');
        await expect(tiles.first()).toBeVisible({ timeout: 20000 });

        const count = await tiles.count();
        expect(count, 'dashboard rendered no KPI tiles').toBeGreaterThan(0);

        const stuck: string[] = [];
        for (let i = 0; i < count; i++) {
            const tile = tiles.nth(i);
            const label = (await tile.locator('.dashboard-stat-label').innerText()).trim();
            const value = tile.locator('.dashboard-stat-value');
            // The loader clears `.loading` once it has a number; a tile still
            // showing the placeholder means the fetch failed.
            await expect(value).not.toHaveClass(/loading/, { timeout: 25000 }).catch(() => {
                stuck.push(`${label} (still loading)`);
            });
            const text = (await value.innerText()).trim();
            if (text === '-' || text === '') stuck.push(`${label} (no value)`);
        }
        expect(stuck, `KPI tiles that never produced a value:\n  ${stuck.join('\n  ')}`).toEqual([]);
    });

    test('KPI counts agree with the API', async ({ app, api }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('dashboard');
        await expect(app.locator('.dashboard-stat-card').first()).toBeVisible({ timeout: 20000 });

        // Read the config the page actually shipped rather than duplicating it.
        const kpis = await app.evaluate(() => {
            const w = window as unknown as {
                DashboardConfig?: { kpis: { id: string; label: string; endpoint: string; query: string }[] };
            };
            return w.DashboardConfig ? w.DashboardConfig.kpis : [];
        });
        expect(kpis.length, 'DashboardConfig.kpis is empty').toBeGreaterThan(0);

        const mismatches: string[] = [];
        for (const kpi of kpis) {
            const res = await api.query(kpi.endpoint, kpi.query);
            const apiTotal = res.metadata?.keyCount?.counts?.Total ?? 0;

            const shown = (await app.locator(`#dashboard-stat-${kpi.id}`).innerText()).trim();
            // The tile abbreviates (1.2K / 3.4M), so compare only when it did not.
            if (/^\d+$/.test(shown) && Number(shown) !== apiTotal) {
                mismatches.push(`${kpi.label}: tile=${shown} api=${apiTotal}`);
            }
        }
        expect(mismatches, `KPI tiles disagreeing with the API:\n  ${mismatches.join('\n  ')}`).toEqual([]);
    });
});

test.describe('navigation @smoke', () => {
    test('every module section in the inventory has a sidebar entry', async ({ app }) => {
        const nav = new DesktopNav(app);
        const visible = await nav.visibleSections();
        const missing = DESKTOP_SECTIONS
            .map((s) => s.section)
            .filter((s) => !visible.includes(s));
        expect(
            missing,
            `sections with a module config but no visible sidebar link ` +
            `(check Layer8DModuleFilter / Layer8DPermissionFilter): ${missing.join(', ')}`
        ).toEqual([]);
    });

    for (const section of DESKTOP_SECTIONS) {
        test(`section "${section.section}" renders its tabs and sub-nav`, async ({ app, consoleErrors }) => {
            const nav = new DesktopNav(app);
            await nav.openSection(section.section);

            // Every module declared by the config must have produced a content pane.
            const missingPanes: string[] = [];
            for (const mod of section.modules) {
                if (!(await nav.moduleContent(mod.moduleKey).count())) {
                    missingPanes.push(mod.moduleKey);
                }
            }
            expect(
                missingPanes,
                `modules declared in ${section.namespace}.modules but not rendered by ` +
                `Layer8SectionGenerator: ${missingPanes.join(', ')}`
            ).toEqual([]);

            // Every service must have produced a table container.
            const missingContainers: string[] = [];
            for (const mod of section.modules) {
                for (const svc of mod.services) {
                    if (!(await app.locator(`#${svc.containerId}`).count())) {
                        missingContainers.push(svc.containerId);
                    }
                }
            }
            expect(
                missingContainers,
                `service containers the section never generated:\n  ${missingContainers.join('\n  ')}`
            ).toEqual([]);

            assertNoPageErrors(consoleErrors);
        });
    }
});
