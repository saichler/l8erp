/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Permission filtering and theming.
//
// The permission half matters because FailFastNoSilentFallback Rule 2 calls a
// degraded permission load a SECURITY bug, not a resilience feature: if
// /permissions fails and Layer8DPermissions stays unset, l8ui reads that as
// permissive and shows a restricted user more Add/Edit/Delete buttons than
// they are entitled to -- indistinguishable from legitimate full access.
//
// The theme half is L8UIThemeCompliance: components must resolve their colours
// from --layer8d-* tokens, and dark mode is central rather than per-component.

import { test, expect, assertNoPageErrors, waitForDesktopReady } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { Api } from '../../fixtures/api';
import { ENV } from '../../fixtures/env';
import { desktopServices } from '../../fixtures/inventory';

test.describe('permissions', () => {
    test('the shell loaded a non-empty permission map @smoke', async ({ app }) => {
        const perms = await app.evaluate(() => {
            const w = window as unknown as { Layer8DPermissions?: Record<string, number[]> };
            return w.Layer8DPermissions || null;
        });
        expect(perms, 'Layer8DPermissions was never set -- /permissions failed silently').not.toBeNull();
        expect(Object.keys(perms as object).length).toBeGreaterThan(0);
    });

    test('every model the UI navigates to appears in the permission map', async ({ app }) => {
        const perms = (await app.evaluate(() => {
            const w = window as unknown as { Layer8DPermissions?: Record<string, number[]> };
            return w.Layer8DPermissions || {};
        })) as Record<string, number[]>;

        // Layer8DPermissionFilter.canView returns false for any model absent
        // from a non-empty map, which hides the service from the sub-nav.
        const models = [...new Set(desktopServices().map((x) => x.service.model))];
        const absent = models.filter((m) => !(m in perms));
        expect(
            absent,
            `models the UI can navigate to but /permissions never mentions -- these are ` +
            `hidden from the operator by canView():\n  ${absent.join('\n  ')}`
        ).toEqual([]);
    });

    test('a restricted account sees fewer sections than the operator', async ({ page, context }) => {
        let limited: Api;
        try {
            limited = await Api.login(ENV.limitedUser, ENV.limitedPass);
        } catch (e) {
            test.skip(true, `limited account unavailable: ${(e as Error).message}`);
            return;
        }

        await context.addInitScript(
            ([t, u]) => {
                try {
                    sessionStorage.setItem('bearerToken', t as string);
                    sessionStorage.setItem('username', u as string);
                } catch { /* ignore */ }
            },
            [limited.token, ENV.limitedUser]
        );
        await page.goto(ENV.desktopShell);
        await waitForDesktopReady(page);

        const nav = new DesktopNav(page);
        // The permission filter runs as part of that boot sequence, so the
        // readiness gate above already covers it.

        const perms = await limited.permissions();
        const visible = await nav.visibleSections();

        // The hr-clerk role is scoped to HCM, so a section whose every model is
        // absent from its permission map must not be offered.
        const leaked = desktopServices()
            .filter((x) => visible.includes(x.section))
            .filter((x) => !(x.service.model in perms))
            .map((x) => `${x.section}/${x.service.model}`);

        const sections = [...new Set(leaked.map((l) => l.split('/')[0]))];
        expect(
            sections,
            `sections offered to "${ENV.limitedUser}" containing only models it has no ` +
            `permission for: ${sections.join(', ')}`
        ).toEqual([]);

        await limited.dispose();
    });

    test('write buttons are hidden for a model the user cannot POST', async ({ app }) => {
        const perms = (await app.evaluate(() => {
            const w = window as unknown as { Layer8DPermissions?: Record<string, number[]> };
            return w.Layer8DPermissions || {};
        })) as Record<string, number[]>;

        const readOnlyModel = desktopServices().find(
            (x) => perms[x.service.model] && !perms[x.service.model].includes(1)
        );
        test.skip(!readOnlyModel, 'this account can POST to every model');

        const { section, moduleKey, service } = readOnlyModel!;
        const nav = new DesktopNav(app);
        await nav.openSection(section);
        await nav.openModule(moduleKey);
        await nav.openService(moduleKey, service.key);

        const add = nav.tableContainer(moduleKey, service.key).locator('.l8-btn-primary');
        expect(
            await add.count(),
            `${service.model} offers an Add button although /permissions withholds POST`
        ).toBe(0);
    });
});

test.describe('theme', () => {
    test('the theme tokens resolve @smoke', async ({ app }) => {
        const unresolved = await app.evaluate(() => {
            const names = [
                '--layer8d-primary', '--layer8d-bg-white', '--layer8d-bg-light',
                '--layer8d-bg-input', '--layer8d-text-dark', '--layer8d-text-medium',
                '--layer8d-border', '--layer8d-success', '--layer8d-warning', '--layer8d-error'
            ];
            const cs = getComputedStyle(document.documentElement);
            return names.filter((n) => !cs.getPropertyValue(n).trim());
        });
        expect(
            unresolved,
            `--layer8d-* tokens that resolve to nothing: ${unresolved.join(', ')}`
        ).toEqual([]);
    });

    test('switching to dark mode repaints the shell', async ({ app, consoleErrors }) => {
        const toggle = app.locator('.theme-toggle, [data-theme-toggle], #theme-switcher').first();
        test.skip(!(await toggle.count()), 'no theme toggle in this shell');

        const before = await app.evaluate(() => getComputedStyle(document.body).backgroundColor);
        await toggle.click();
        await app.waitForTimeout(600);

        const attr = await app.evaluate(() => document.documentElement.getAttribute('data-theme'));
        const after = await app.evaluate(() => getComputedStyle(document.body).backgroundColor);

        expect(
            attr === 'dark' || after !== before,
            'the theme toggle changed neither data-theme nor the rendered background'
        ).toBeTruthy();
        assertNoPageErrors(consoleErrors);
    });
});
