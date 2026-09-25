/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// PHASE 2 -- table depth for every desktop service.
//
// 03-service-coverage proves a service LOADS. This proves the table WORKS:
// paging past page 1 (including the total-preservation guard that
// Layer8DTablePaginationMetadata says has regressed four times), column
// filtering, sorting re-issuing the query, the row-click detail popup, and the
// rendered count agreeing with the API.
//
// Grouped one test per module so the shell is booted once and then walked --
// 56 tests covering 256 services, rather than 256 cold starts.

import { test, assertNoPageErrors } from '../../fixtures/test';
import { DESKTOP_SECTIONS } from '../../fixtures/inventory';
import {
    openService, assertPaging, assertSorting, assertFiltering,
    assertDetailPopup, assertCountMatchesApi, expectNoProblems, Problems
} from '../../drivers/table';

for (const section of DESKTOP_SECTIONS) {
    for (const mod of section.modules) {
        if (mod.services.length === 0) continue;

        test(`${section.section} / ${mod.moduleKey}: table depth (${mod.services.length} service(s))`,
            async ({ app, api, consoleErrors }) => {
                // Each service is a navigation plus paging assertions, so a
                // 9-service module needs far more than the flat 120s budget the
                // 1-service modules get. hcm/talent timed out on exactly this.
                test.setTimeout(Math.max(120_000, mod.services.length * 25_000));
                const problems: Problems = [];

                for (const svc of mod.services) {
                    // layer8d-service-registry.js:75 builds no table for a
                    // customView service (the AI agent chat renders its own
                    // UI), so table assertions do not apply.
                    if (svc.customView) continue;

                    const where = `${section.section}/${mod.moduleKey}/${svc.key} (${svc.model})`;

                    const ctx = await openService(app, section.section, mod.moduleKey, svc);

                    // A service hidden by the permission or module filter is a
                    // legitimate state, not a failure.
                    const item = ctx.nav.subnavItem(mod.moduleKey, svc.key);
                    if (!(await item.count()) || !(await item.isVisible())) continue;

                    try {
                        await ctx.table.waitForResolved();
                    } catch (e) {
                        problems.push(`${where}: ${(e as Error).message.split('\n')[0]}`);
                        continue;
                    }

                    await assertCountMatchesApi(ctx, api, svc, where, problems);
                    await assertDetailPopup(ctx, svc, where, problems);
                    await assertFiltering(ctx, api, svc, where, problems);
                    await assertSorting(ctx, svc, where, problems);
                    await assertPaging(ctx, api, svc, where, problems);
                }

                expectNoProblems(problems, 'table depth failures');
                assertNoPageErrors(consoleErrors);
            });
    }
}
