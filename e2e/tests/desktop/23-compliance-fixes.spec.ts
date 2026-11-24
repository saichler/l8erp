/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance fixes (l8book ai docs audit), desktop shell and desktop portals.
//
//   1. FailFastNoSilentFallback -- the startup dependency check
//      (erp-ui/erp-deps-check.js) passes on a healthy boot and fails loudly,
//      naming the global, when a script is missing.
//   2. FailFastNoSilentFallback -- a failed /permissions fetch stops the app
//      visibly instead of leaving Layer8DPermissions unset (read as PERMISSIVE).
//   3. LiveUpdates -- the dashboard KPIs are one live component: registered
//      under the 'dashboard' slot, reloaded by a pushed change, released when
//      the user leaves the section.
//   4. Theme -- every page initializes the theme switcher itself, including
//      the mgr / partner / projclient portals.
//   5. L8UIThemeCompliance -- project CSS uses no legacy alias tokens and puts
//      no literal white text on a --layer8d-primary background.

import { test, expect } from '../../fixtures/test';
import { seedSession } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { ENV } from '../../fixtures/env';
import { Api } from '../../fixtures/api';
import { Page } from '@playwright/test';

type LiveWindow = {
    ErpLiveKpis: { get(id: string): { isLive(): boolean } | null };
    Layer8DWebSocket: { liveIds(): string[] };
};

/** Project stylesheet rules that break theme compliance (alias tokens, white on primary). */
async function themeViolations(page: Page): Promise<string[]> {
    return page.evaluate(() => {
        const ALIASES = /var\(--(accent-color|bg-primary|bg-secondary|bg-tertiary|bg-card|text-primary|text-secondary|text-tertiary|border-color|noc-cyan|primary)[,)]/;
        const WHITE = /^(white|#fff|#ffffff|rgb\(255, 255, 255\))$/i;
        const out: string[] = [];
        for (const sheet of Array.from(document.styleSheets)) {
            const href = sheet.href || '';
            if (!href || href.includes('/l8ui/') || href.includes('/l8-site-base/')) continue;
            let rules: CSSRuleList;
            try { rules = sheet.cssRules; } catch { continue; }
            const walk = (list: CSSRuleList) => {
                for (const r of Array.from(list)) {
                    const grouped = (r as CSSGroupingRule).cssRules;
                    if (grouped) { walk(grouped); continue; }
                    const style = (r as CSSStyleRule).style;
                    if (!style) continue;
                    const text = r.cssText;
                    const where = href.replace(location.origin, '') + ' ' + (r as CSSStyleRule).selectorText;
                    if (ALIASES.test(text)) out.push('alias token: ' + where);
                    const bg = (style.getPropertyValue('background') + style.getPropertyValue('background-color')
                        + style.getPropertyValue('background-image'));
                    if (bg.includes('--layer8d-primary') && WHITE.test(style.getPropertyValue('color').trim())) {
                        out.push('white on primary: ' + where);
                    }
                }
            };
            walk(rules);
        }
        return out;
    });
}

test.describe('compliance: startup dependency check', () => {
    test('a healthy boot passes the deps-check with nothing missing @smoke', async ({ freshApp }) => {
        await freshApp.waitForFunction(() => !!(window as unknown as { ERP_DEPS_CHECK?: unknown }).ERP_DEPS_CHECK);
        const result = await freshApp.evaluate(() =>
            (window as unknown as { ERP_DEPS_CHECK: { shell: string; checked: number; missing: string[] } }).ERP_DEPS_CHECK);
        expect(result.shell).toBe('desktop');
        expect(result.checked, 'the deps-check list is suspiciously short').toBeGreaterThan(80);
        expect(result.missing, 'globals missing at boot').toEqual([]);
        await expect(freshApp.locator('#erp-deps-check-error')).toHaveCount(0);
    });

    test('a missing script fails the boot loudly, naming the global', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.route('**/l8ui/dashboard/layer8d-widget.js*', (route) => route.abort());
        const errors: string[] = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await page.goto(ENV.desktopShell);

        const banner = page.locator('#erp-deps-check-error');
        await expect(banner, 'no full-screen deps-check error for a missing script').toBeVisible();
        await expect(banner).toContainText('Layer8DWidget');
        expect(errors.some((m) => m.includes('Layer8DWidget')), 'the deps-check did not throw').toBe(true);
    });
});

test.describe('compliance: required startup fetches fail fast', () => {
    test('a failed /permissions stops the app with a visible error', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.route('**/permissions', (route) => route.fulfill({ status: 500, body: 'boom' }));
        await page.goto(ENV.desktopShell);

        await expect(page.getByText('The application could not load required data.'),
            'a failed /permissions was swallowed -- l8ui reads an unset Layer8DPermissions as PERMISSIVE')
            .toBeVisible();
        await expect(page.getByText('/permissions returned HTTP 500')).toBeVisible();
        const perms = await page.evaluate(() => (window as unknown as { Layer8DPermissions?: unknown }).Layer8DPermissions);
        expect(perms, 'permissions were set although the fetch failed').toBeUndefined();
    });

    test('an account without Currency access still boots (no fail-fast false positive)', async ({ page, context }) => {
        // hrclerk has no GET on Currency/ExchangeRate: the server rejects that
        // read, so the shell must skip those caches -- decided by /permissions --
        // instead of treating a legitimate denial as a startup failure.
        const limited = await Api.login(ENV.limitedUser, ENV.limitedPass);
        try {
            await seedSession(context, limited.token, ENV.limitedUser);
            const errors: string[] = [];
            page.on('pageerror', (e) => errors.push(e.message));
            await page.goto(ENV.desktopShell);
            await expect(page.locator('#content-area .section-container')).toBeVisible({ timeout: 45000 });
            await expect(page.getByText('The application could not load required data.')).toHaveCount(0);
            const perms = await page.evaluate(() =>
                (window as unknown as { Layer8DPermissions?: Record<string, number[]> }).Layer8DPermissions);
            expect(perms, 'permissions were not loaded').toBeTruthy();
            expect(perms && perms.Currency, 'test premise: hrclerk must not read Currency').toBeUndefined();
            expect(errors.filter((m) => m.includes('startup') || m.includes('Currency'))).toEqual([]);
        } finally {
            await limited.dispose();
        }
    });

    test('a failed currency fetch stops the app with a visible error', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.route('**/erp/40/Currency*', (route) => route.fulfill({ status: 503, body: 'down' }));
        await page.goto(ENV.desktopShell);
        await expect(page.getByText('The application could not load required data.')).toBeVisible();
        await expect(page.getByText(/Currency cache: .* returned HTTP 503/)).toBeVisible();
    });
});

test.describe('compliance: live dashboard KPIs', () => {
    test('the dashboard holds the "dashboard" live slot while shown', async ({ app }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('dashboard');
        await app.waitForFunction(() => {
            const w = window as unknown as LiveWindow;
            const h = w.ErpLiveKpis.get('dashboard');
            return !!h && h.isLive();
        });
        const ids = await app.evaluate(() => (window as unknown as LiveWindow).Layer8DWebSocket.liveIds());
        expect(ids).toContain('dashboard');
        expect(ids.length, 'more live components than MAX_LIVE').toBeLessThanOrEqual(5);
    });

    test('a pushed change to a KPI model reloads the KPIs', async ({ page, context, api }) => {
        // l8web keeps ONE websocket per user (WebSocketManager.connections[aaaId])
        // and drops that user's live registrations when it is replaced. Every
        // other session in this suite is the operator, so the watching browser
        // runs as a different account (read-only viewer); the write that must
        // be pushed to it comes from the operator API.
        const viewer = await Api.login(ENV.readOnlyUser, ENV.readOnlyPass);
        try {
            await seedSession(context, viewer.token, ENV.readOnlyUser);
            await page.goto(ENV.desktopShell);
            await page.waitForFunction(() => {
                const w = window as unknown as LiveWindow & { Layer8DWebSocket: { isConnected(): boolean } };
                return !!w.ErpLiveKpis?.get('dashboard')?.isLive() && w.Layer8DWebSocket.isConnected();
            });
            await expect(page.locator('#dashboard-stat-total-documents')).not.toHaveText('-');

            // The KPI query is paged (limit 1 page 0): the server pushes an
            // update only for the row on that page, so update exactly that row.
            const page0 = await api.query<Record<string, unknown>>('/45/DocDoc', 'select * from DocDocument limit 1 page 0');
            const doc = page0.list[0];
            test.skip(!doc, 'no DocDocument seeded');
            const original = String(doc.description ?? '');

            const reload = page.waitForRequest((req) =>
                req.url().includes('/45/DocDoc?body=') &&
                decodeURIComponent(req.url()).includes('"registerId":"dashboard"'),
                { timeout: 20000 });
            try {
                await api.put('/45/DocDoc', { ...doc, description: original + ' [e2e live]' });
                await reload;   // a KPI re-fetch triggered by the push, not by navigation
            } finally {
                await api.put('/45/DocDoc', { ...doc, description: original }).catch(() => undefined);
            }
        } finally {
            await viewer.dispose();
        }
    });

    test('leaving the dashboard releases its live slot', async ({ app }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('dashboard');
        await app.waitForFunction(() => !!(window as unknown as LiveWindow).ErpLiveKpis.get('dashboard'));
        await nav.openSection('hcm');
        const handle = await app.evaluate(() => (window as unknown as LiveWindow).ErpLiveKpis.get('dashboard'));
        expect(handle, 'the dashboard kept its live KPI handle after the user left the section').toBeNull();
    });
});

test.describe('compliance: theme on every portal page', () => {
    for (const portal of ['mgr', 'partner', 'projclient']) {
        test(`desktop ${portal} portal initializes the theme switcher`, async ({ page, context, api }) => {
            await seedSession(context, api.token, ENV.user);
            await context.addInitScript(() => {
                try { localStorage.setItem('layer8d-theme', 'dark'); } catch { /* blocked storage */ }
            });
            await page.goto(`/${portal}.html`);
            await expect(page.locator('html'), `${portal}.html ignored the saved theme`)
                .toHaveAttribute('data-theme', 'dark');
            await expect(page.locator('.layer8d-theme-picker')).toBeVisible();
        });
    }
});

test.describe('compliance: project CSS theme tokens', () => {
    test('desktop shell CSS uses layer8d tokens and on-primary text', async ({ app }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('hcm');   // loads the HCM stylesheets' rules into use
        const bad = await themeViolations(app);
        expect(bad, 'theme-compliance violations in project CSS:\n  ' + bad.join('\n  ')).toEqual([]);
    });
});
