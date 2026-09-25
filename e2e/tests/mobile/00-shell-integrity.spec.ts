/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile shell integrity, against the real bundle at /m/app.html.
//
// The two shells are NOT the same app: they load different script sets (341 vs
// 388 files here) and diverge exactly where a resized desktop viewport would
// hide the difference. MobileRules requires functional parity, and the only way
// to hold that line is to load the mobile bundle and check it independently.

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { INVENTORY, MOBILE_MODULES } from '../../fixtures/inventory';
import { MobileNav } from '../../pages/MobileNav';
import { missingGlobals, MOBILE_REQUIRED_GLOBALS } from '../../fixtures/globals';

test.describe('mobile shell integrity @smoke', () => {
    test('loads with no uncaught exception and no console error', async ({ mobile, consoleErrors }) => {
        await new MobileNav(mobile).waitForHome();
        await mobile.waitForTimeout(2000);
        assertNoPageErrors(consoleErrors);
    });

    test('every <script src> in m/app.html returns 200', async ({ mobile }) => {
        const failures = await mobile.evaluate(async () => {
            const srcs = Array.from(document.querySelectorAll('script[src]'))
                .map((s) => (s as HTMLScriptElement).getAttribute('src') || '');
            const bad: string[] = [];
            for (const src of srcs) {
                const res = await fetch(src, { method: 'HEAD' }).catch(() => null);
                if (!res || !res.ok) bad.push(`${src} -> ${res ? res.status : 'network error'}`);
            }
            return bad;
        });
        expect(failures, `script tags that do not resolve:\n  ${failures.join('\n  ')}`).toEqual([]);
    });

    test('no global the mobile bundle calls is undefined', async ({ mobile }) => {
        const missing = await missingGlobals(mobile, MOBILE_REQUIRED_GLOBALS);
        expect(
            missing,
            `globals no loaded script defines in the mobile shell -- add the tag to ` +
            `m/app.html:\n  ${missing.join('\n  ')}`
        ).toEqual([]);
    });

    test('the nav config is present and complete', async ({ mobile }) => {
        const cfg = await mobile.evaluate(() => {
            const w = window as unknown as {
                LAYER8M_NAV_CONFIG?: { modules?: { key: string }[] };
            };
            if (!w.LAYER8M_NAV_CONFIG) return null;
            return { modules: (w.LAYER8M_NAV_CONFIG.modules || []).map((m) => m.key) };
        });
        expect(cfg, 'LAYER8M_NAV_CONFIG is undefined -- nav configs loaded before nav core?').not.toBeNull();
        expect(cfg!.modules.length).toBeGreaterThan(0);
    });

    test('every nav-config module resolves columns through a module registry', async ({ mobile }) => {
        // The original version of this test took every window global starting
        // with "Mobile" and demanded it be a Layer8MModuleRegistry. Plenty
        // legitimately are not -- MobileEmployeeDetail is a detail-view helper,
        // MobileSysHealth a SYS module, MobileApp the app controller -- so it
        // reported three permanent false failures and never once looked at the
        // nav config its name refers to.
        //
        // Two assertions that do hold:
        //   1. anything that claims to be a registry exposes the whole API
        //      (Layer8MModuleRegistry.create provides all of these);
        //   2. every nav-config module with services has a registry that knows
        //      at least one of its models -- which is what actually breaks when
        //      a module's data files are missing from m/app.html.
        const result = await mobile.evaluate(() => {
            const w = window as unknown as Record<string, any>;
            const API = ['getColumns', 'getFormDef', 'getPrimaryKey', 'hasModel', 'getModuleName'];
            const incomplete: string[] = [];
            const registries: any[] = [];
            for (const n of Object.keys(w).filter((k) => k.startsWith('Mobile'))) {
                const reg = w[n];
                if (!reg || typeof reg !== 'object' || typeof reg.hasModel !== 'function') continue;
                registries.push(reg);
                const gaps = API.filter((m) => typeof reg[m] !== 'function');
                if (gaps.length) incomplete.push(`${n} is missing ${gaps.join(', ')}`);
            }

            const unserved: string[] = [];
            const cfg = w.LAYER8M_NAV_CONFIG || {};
            for (const mod of cfg.modules || []) {
                const block = cfg[mod.key];
                if (!block || !block.services) continue;
                const models: string[] = [];
                for (const list of Object.values(block.services) as any[][]) {
                    for (const svc of list) if (svc.model) models.push(svc.model);
                }
                if (models.length === 0) continue;
                if (!models.some((m) => registries.some((r) => r.hasModel(m)))) {
                    unserved.push(`${mod.key}: no registry knows any of its ${models.length} model(s)`);
                }
            }
            return { incomplete, unserved, registryCount: registries.length };
        });

        expect(result.registryCount, 'no Layer8MModuleRegistry on window at all').toBeGreaterThan(0);
        expect(result.incomplete, result.incomplete.join('\n  ')).toEqual([]);
        expect(result.unserved, result.unserved.join('\n  ')).toEqual([]);
    });

    test('the generated inventory reports no load failure for this shell', () => {
        expect(
            INVENTORY.mobile.failures,
            'mobile scripts that threw while loading -- every module whose enums/columns/' +
            'forms IIFE died here falls back to DEFAULT_COLUMNS:\n  ' +
            INVENTORY.mobile.failures.map((f) => `${f.src} -> ${f.error}`).join('\n  ')
        ).toEqual([]);
    });

    test('the home grid renders a card for every configured module', async ({ mobile }) => {
        const nav = new MobileNav(mobile);
        await nav.waitForHome();
        const visible = await nav.visibleModules();
        const missing = MOBILE_MODULES.map((m) => m.moduleKey).filter((k) => !visible.includes(k));
        expect(missing, `modules with services but no home card: ${missing.join(', ')}`).toEqual([]);
    });
});
