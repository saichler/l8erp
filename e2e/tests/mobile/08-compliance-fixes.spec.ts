/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Compliance fixes (l8book ai docs audit), mobile shell and mobile portals.
//
//   1. FailFastNoSilentFallback -- the startup dependency check passes on a
//      healthy boot and fails loudly when a script is missing; a failed
//      /permissions stops the app visibly.
//   2. L8Chat -- on mobile, L8ChatBubbleMobile.init() runs AFTER
//      Layer8DWebSocket.init().
//   3. LiveUpdates -- the home KPIs are live ('m-dashboard' slot), use the
//      desktop KPI definitions (same status filters), and agree with the API.
//   4. Mobile mgr actions report the outcome with the mobile toasts.
//   5. Theme -- the mgr / partner / projclient mobile portals initialize the
//      theme switcher; project CSS has no alias tokens / white on primary.

import { test, expect, seedSession } from '../../fixtures/test';
import { ENV } from '../../fixtures/env';
import { Api } from '../../fixtures/api';

type LiveWindow = {
    ErpLiveKpis: { get(id: string): { isLive(): boolean } | null };
    Layer8DWebSocket: { liveIds(): string[] };
    DashboardConfig: { kpis: { id: string; endpoint: string; query: string }[] };
};

test.describe('mobile compliance: startup', () => {
    test('a healthy boot passes the deps-check with nothing missing @smoke', async ({ freshMobile }) => {
        await freshMobile.waitForFunction(() => !!(window as unknown as { ERP_DEPS_CHECK?: unknown }).ERP_DEPS_CHECK);
        const result = await freshMobile.evaluate(() =>
            (window as unknown as { ERP_DEPS_CHECK: { shell: string; checked: number; missing: string[] } }).ERP_DEPS_CHECK);
        expect(result.shell).toBe('mobile');
        expect(result.checked).toBeGreaterThan(80);
        expect(result.missing).toEqual([]);
        await expect(freshMobile.locator('#erp-deps-check-error')).toHaveCount(0);
    });

    test('a missing script fails the boot loudly, naming the global', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.route('**/l8ui/m/js/layer8m-kanban.js*', (route) => route.abort());
        await page.goto(ENV.mobileShell);
        const banner = page.locator('#erp-deps-check-error');
        await expect(banner).toBeVisible();
        await expect(banner).toContainText('Layer8MKanban');
    });

    test('a failed /permissions stops the app with a visible error', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.route('**/permissions', (route) => route.fulfill({ status: 500, body: 'boom' }));
        await page.goto(ENV.mobileShell);
        await expect(page.getByText('The application could not load required data.')).toBeVisible();
        await expect(page.getByText('/permissions returned HTTP 500')).toBeVisible();
        const perms = await page.evaluate(() => (window as unknown as { Layer8DPermissions?: unknown }).Layer8DPermissions);
        expect(perms).toBeUndefined();
    });

    test('an account without Currency access still boots (no fail-fast false positive)', async ({ page, context }) => {
        const limited = await Api.login(ENV.limitedUser, ENV.limitedPass);
        try {
            await seedSession(context, limited.token, ENV.limitedUser);
            await page.goto(ENV.mobileShell);
            await expect(page.locator('.nav-card[data-module]').first()).toBeVisible({ timeout: 45000 });
            await expect(page.getByText('The application could not load required data.')).toHaveCount(0);
        } finally {
            await limited.dispose();
        }
    });

    test('the chat bubble initializes after the websocket', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        // Record the order of the two init() calls by wrapping each global's
        // init as soon as its script assigns it.
        await context.addInitScript(() => {
            const w = window as unknown as Record<string, unknown> & { __e2eInitOrder: string[] };
            w.__e2eInitOrder = [];
            for (const name of ['Layer8DWebSocket', 'L8ChatBubbleMobile']) {
                let value: unknown;
                Object.defineProperty(window, name, {
                    configurable: true,
                    get: () => value,
                    set: (v: { init?: (...a: unknown[]) => unknown }) => {
                        if (v && typeof v.init === 'function') {
                            const orig = v.init;
                            v.init = function(this: unknown, ...args: unknown[]) {
                                w.__e2eInitOrder.push(name);
                                return orig.apply(this, args);
                            };
                        }
                        value = v;
                    }
                });
            }
        });
        await page.goto(ENV.mobileShell);
        await page.waitForFunction(() =>
            (window as unknown as { __e2eInitOrder: string[] }).__e2eInitOrder.length >= 2);
        const order = await page.evaluate(() => (window as unknown as { __e2eInitOrder: string[] }).__e2eInitOrder);
        expect(order.indexOf('Layer8DWebSocket'), 'websocket init never ran').toBeGreaterThanOrEqual(0);
        expect(order.indexOf('L8ChatBubbleMobile'), 'mobile chat init ran before the websocket init')
            .toBeGreaterThan(order.indexOf('Layer8DWebSocket'));
    });
});

test.describe('mobile compliance: live home KPIs', () => {
    test('the home KPIs hold the "m-dashboard" live slot', async ({ mobile }) => {
        await mobile.waitForFunction(() => !!(window as unknown as LiveWindow).ErpLiveKpis.get('m-dashboard')?.isLive());
        const ids = await mobile.evaluate(() => (window as unknown as LiveWindow).Layer8DWebSocket.liveIds());
        expect(ids).toContain('m-dashboard');
        expect(ids.length).toBeLessThanOrEqual(5);
    });

    test('the home KPIs use the desktop definitions and agree with the API', async ({ mobile, api }) => {
        const kpis = await mobile.evaluate(() => (window as unknown as LiveWindow).DashboardConfig.kpis);
        expect(kpis.length).toBe(12);
        for (const kpi of kpis) {
            const el = mobile.locator(`#stat-${kpi.id}`);
            await expect(el, `mobile home has no tile for KPI ${kpi.id}`).toHaveCount(1);
            await expect(el).not.toHaveText('-');
            const res = await api.query(kpi.endpoint, kpi.query);
            const total = Number(res.metadata?.keyCount?.counts?.Total ?? 0);
            await expect(el, `KPI ${kpi.id} disagrees with the API`).toHaveText(String(total));
        }
    });
});

test.describe('mobile compliance: portals', () => {
    for (const portal of ['mgr', 'partner', 'projclient']) {
        test(`mobile ${portal} portal initializes the theme switcher`, async ({ page, context, api }) => {
            await seedSession(context, api.token, ENV.user);
            await context.addInitScript(() => {
                try { localStorage.setItem('layer8d-theme', 'dark'); } catch { /* blocked storage */ }
            });
            await page.goto(`/m/${portal}.html`);
            await expect(page.locator('html'), `m/${portal}.html ignored the saved theme`)
                .toHaveAttribute('data-theme', 'dark');
        });
    }

    test('a mobile manager action reports failure with a mobile toast', async ({ page, context, api }) => {
        await seedSession(context, api.token, ENV.user);
        await page.goto('/m/mgr.html');
        await page.waitForFunction(() => {
            const w = window as unknown as { MGR?: { _patchStatus?: unknown } };
            return !!w.MGR && typeof w.MGR._patchStatus === 'function';
        });
        await page.route(/\/30\/Timesheet(\?|$)/, (route) =>
            route.request().method() === 'PATCH' ? route.fulfill({ status: 500, body: 'no' }) : route.continue());
        await page.evaluate(() => {
            const w = window as unknown as { MGR: { _patchStatus(e: string, d: unknown, m: string): void } };
            w.MGR._patchStatus('/30/Timesheet', { timesheetId: 'e2e-none', status: 3 }, 'Timesheet approved.');
        });
        await expect(page.locator('.mobile-toast-error'), 'the failed action showed no feedback')
            .toContainText('HTTP 500');
    });
});

test.describe('mobile compliance: project CSS theme tokens', () => {
    test('mobile shell CSS uses layer8d tokens and on-primary text', async ({ mobile }) => {
        const bad = await mobile.evaluate(() => {
            const ALIASES = /var\(--(accent-color|bg-primary|bg-secondary|bg-tertiary|bg-card|text-primary|text-secondary|text-tertiary|border-color|noc-cyan|primary)[,)]/;
            const WHITE = /^(white|#fff|#ffffff|rgb\(255, 255, 255\))$/i;
            const out: string[] = [];
            for (const sheet of Array.from(document.styleSheets)) {
                const href = sheet.href || '';
                if (!href || href.includes('/l8ui/')) continue;
                let rules: CSSRuleList;
                try { rules = sheet.cssRules; } catch { continue; }
                const walk = (list: CSSRuleList) => {
                    for (const r of Array.from(list)) {
                        const grouped = (r as CSSGroupingRule).cssRules;
                        if (grouped) { walk(grouped); continue; }
                        const style = (r as CSSStyleRule).style;
                        if (!style) continue;
                        const where = href.replace(location.origin, '') + ' ' + (r as CSSStyleRule).selectorText;
                        if (ALIASES.test(r.cssText)) out.push('alias token: ' + where);
                        const bg = style.getPropertyValue('background') + style.getPropertyValue('background-color');
                        if (bg.includes('--layer8d-primary') && WHITE.test(style.getPropertyValue('color').trim())) {
                            out.push('white on primary: ' + where);
                        }
                    }
                };
                walk(rules);
            }
            return out;
        });
        expect(bad, 'theme-compliance violations in mobile project CSS:\n  ' + bad.join('\n  ')).toEqual([]);
    });
});
