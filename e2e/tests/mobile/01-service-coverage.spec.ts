/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Full mobile service sweep -- every service in LAYER8M_NAV_CONFIG.
//
// The desktop counterpart of this file proves the desktop shell; this one is
// not a copy of it, because the shells genuinely differ: mobile drills
// home -> module -> sub-module -> service through nav cards instead of tabs and
// sub-nav, renders cards instead of a table, and resolves columns through
// Layer8MModuleRegistry rather than Layer8DServiceRegistry.
//
// MobileRules requires desktop/mobile functional parity; running both sweeps
// and diffing the failures is what makes a parity gap visible instead of
// something someone notices on a phone months later.

import { test, expect, assertNoPageErrors } from '../../fixtures/test';
import { MobileNav, MobileTable } from '../../pages/MobileNav';
import { MOBILE_MODULES } from '../../fixtures/inventory';

for (const mod of MOBILE_MODULES) {
    const serviceCount = mod.subModules.reduce((a, s) => a + s.services.length, 0);

    test(`mobile ${mod.moduleKey}: all ${serviceCount} service(s) load`,
        async ({ mobile, consoleErrors }) => {
            const nav = new MobileNav(mobile);
            const table = new MobileTable(mobile);
            const problems: string[] = [];

            for (const sub of mod.subModules) {
                for (const svc of sub.services) {
                    const where = `${mod.moduleKey}/${sub.subModuleKey}/${svc.key} (${svc.model})`;

                    await nav.waitForHome().catch(() => undefined);
                    const query = await nav.openService(
                        mod.moduleKey, sub.subModuleKey, svc.label, svc.model
                    );

                    if (query === null) {
                        problems.push(
                            `${where}: no L8Query was issued -- the drill-down never reached ` +
                            `the service, or the view threw before fetching`
                        );
                        await mobile.goto('/m/app.html');
                        continue;
                    }

                    if (!query.includes(`from ${svc.model}`)) {
                        problems.push(`${where}: wrong model in query -> "${query}"`);
                    }
                    if (!/limit \d+ page \d+/.test(query)) {
                        problems.push(`${where}: query is not paginated -> "${query}"`);
                    }

                    try {
                        const state = await table.waitForResolved();
                        if (state === 'error') {
                            problems.push(`${where}: the card list rendered its error state`);
                        }
                        if (state === 'cards') {
                            const labels = await table.firstCardLabels();
                            if (labels.length === 0) {
                                problems.push(`${where}: cards rendered with no field labels`);
                            }
                        }
                    } catch (e) {
                        problems.push(`${where}: ${(e as Error).message.split('\n')[0]}`);
                    }

                    // Back to the home grid for the next service.
                    await mobile.goto('/m/app.html');
                }
            }

            expect(problems, `mobile service failures:\n  ${problems.join('\n  ')}`).toEqual([]);
            assertNoPageErrors(consoleErrors);
        });
}
