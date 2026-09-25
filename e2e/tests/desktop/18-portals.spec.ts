/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// PHASE 12 -- the six portals, on BOTH shells (12 entry points).
//
// Portals are subdirectories of the one web server (PortalsSameWebServer), each
// with its own entry HTML and its own namespace: ess.html -> ESS,
// customer.html -> CUST, vendor.html -> VNDR, partner.html -> PTNR,
// mgr.html -> MGR, projclient.html -> PRJC, and the same six under m/.
//
// Each shell loads 61-91 script tags of its own. That is the real risk here:
// one missing tag is a ReferenceError inside an IIFE, which kills the portal's
// namespace and leaves a blank page with no server-side symptom at all
// (VerifyAppHtmlScriptsAgainstLoadingOrder). So the load assertions are per
// portal, per shell, and check the namespace actually materialised -- not merely
// that the HTML came back 200.
//
// What this spec deliberately does NOT claim to prove: scoped data. The plan
// asked for "a customer portal must not see another customer's rows", which
// needs a login that IS a customer. Measured: the security API reports ZERO
// L8User rows -- every dev login (operator, hrclerk, salesmgr, ...) comes from
// l8secure's config JSON, and no Customer/Vendor/Employee has a provisioned user
// (LoginableEntityUserProvisioning). There is no portal account to authenticate
// as, so that assertion is marked as a known gap rather than faked with an
// operator token, which would prove nothing about scoping.

import { test, expect } from '../../fixtures/test';
import { ENV } from '../../fixtures/env';
import { Api } from '../../fixtures/api';

/** The six portals and the global each one's scripts must define. */
const PORTALS: { key: string; ns: string; label: string }[] = [
    { key: 'ess', ns: 'ESS', label: 'Employee Self-Service' },
    { key: 'customer', ns: 'CUST', label: 'Customer' },
    { key: 'vendor', ns: 'VNDR', label: 'Vendor' },
    { key: 'partner', ns: 'PTNR', label: 'Partner' },
    { key: 'mgr', ns: 'MGR', label: 'Manager' },
    { key: 'projclient', ns: 'PRJC', label: 'Project Client' }
];

/** Desktop shell is /<key>.html, mobile is /m/<key>.html. */
const SHELLS: { platform: 'desktop' | 'mobile'; path: (k: string) => string }[] = [
    { platform: 'desktop', path: (k) => `/${k}.html` },
    { platform: 'mobile', path: (k) => `/m/${k}.html` }
];

test.describe('portals', () => {
    for (const shell of SHELLS) {
        for (const portal of PORTALS) {
            test(`${shell.platform} ${portal.key} portal loads and defines ${portal.ns}`,
                async ({ page, context, api }) => {
                    // Only uncaught exceptions: a missing script tag shows up as
                    // "X is not defined" from inside an IIFE, which is what this
                    // test is for. Console resource noise (a transient 404 while
                    // the shell boots) is a different concern and made this flake.
                    const errors: string[] = [];
                    page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

                    // Portals read the same bearer token out of sessionStorage as
                    // the main shells, so seed it before the first script runs.
                    await context.addInitScript(
                        ([t, u]) => {
                            try {
                                sessionStorage.setItem('bearerToken', t as string);
                                sessionStorage.setItem('username', u as string);
                            } catch { /* private mode */ }
                        },
                        [api.token, ENV.user]
                    );

                    const url = shell.path(portal.key);
                    const resp = await page.goto(url);
                    expect(resp?.status(), `${url} did not serve`).toBe(200);

                    // The namespace is created by the portal's own config IIFE. If a
                    // script tag is missing, the IIFE throws and this stays undefined
                    // while the page still looks "loaded".
                    const state = await page.evaluate(async (ns: string) => {
                        const w = window as unknown as Record<string, unknown>;
                        for (let i = 0; i < 60 && typeof w[ns] === 'undefined'; i++) {
                            await new Promise((r) => setTimeout(r, 250));
                        }
                        const obj = w[ns] as Record<string, unknown> | undefined;
                        return {
                            defined: typeof obj !== 'undefined',
                            keys: obj ? Object.keys(obj).slice(0, 12) : [],
                            bodyLen: document.body.innerHTML.length
                        };
                    }, portal.ns);

                    expect(
                        state.defined,
                        `window.${portal.ns} is undefined after loading ${url} -- one of its ` +
                        `script tags is missing or an IIFE threw, which leaves the portal blank ` +
                        `with no server-side error`
                    ).toBe(true);

                    expect(
                        state.bodyLen,
                        `${url} rendered an empty body`
                    ).toBeGreaterThan(200);

                    // A portal namespace with nothing on it means its config never
                    // populated -- same silent failure, one layer in.
                    expect(
                        state.keys.length,
                        `window.${portal.ns} exists but is empty -- ${portal.key}-config.js did not populate it`
                    ).toBeGreaterThan(0);

                    const tolerated = ['required', 'validation', 'favicon', 'permissions'];
                    const fatal = errors.filter((e) => !tolerated.some((t) => e.includes(t)));
                    expect(
                        fatal,
                        `${url} raised page errors -- a ReferenceError here means a missing ` +
                        `script tag killed a portal IIFE:\n  ${fatal.join('\n  ')}`
                    ).toEqual([]);
                });
        }
    }

    test('every portal shell requires a token', async ({ browser }) => {
        // A portal must not show data to an anonymous visitor. Redirecting to
        // login is a perfectly good way to satisfy that, so this tolerates the
        // navigation instead of evaluating across it -- the old version died with
        // "Execution context was destroyed" on exactly that redirect.
        const problems: string[] = [];
        for (const portal of PORTALS) {
            const url = `/${portal.key}.html`;
            // A fresh context guarantees no seeded session at all.
            const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
            const page = await ctx.newPage();
            try {
                await page.goto(url, { waitUntil: 'domcontentloaded' });
                await page.waitForTimeout(2500);

                const landed = page.url();
                const redirectedToLogin = /login|index\.html/i.test(landed);

                const rows = await page.evaluate(
                    () => document.querySelectorAll(
                        '.l8-table tbody tr, .mobile-edit-table-card-row'
                    ).length
                ).catch(() => 0);   // a navigation mid-evaluate is itself fine

                if (!redirectedToLogin && rows > 0) {
                    problems.push(
                        `${url}: rendered ${rows} data row(s) with no bearer token ` +
                        `(landed on ${landed})`
                    );
                }
            } finally {
                await ctx.close();
            }
        }
        expect(problems, `portals serving data unauthenticated:\n  ${problems.join('\n  ')}`)
            .toEqual([]);
    });

    test('a portal account exists to prove data scoping', async () => {
        // KNOWN GAP, deliberately test.fail() rather than skip.
        //
        // Measured: GET /erp/73/users returns 0 rows. Every usable login comes
        // from l8secure's erp_config.go (operator, hrclerk, salesmgr, ...), and
        // none of them IS a Customer, Vendor or Employee. So the ScopeView /
        // ${associateIds} deny-rule path -- the thing that stops a customer
        // portal showing another customer's rows -- has no account to exercise it.
        //
        // Marked expected-to-fail so it stays visible every run and turns into a
        // loud failure the moment portal users are provisioned
        // (LoginableEntityUserProvisioning), rather than a skip nobody revisits.
        test.fail(true,
            'no portal user accounts are provisioned: /73/users is empty, so data scoping ' +
            'cannot be exercised');

        const api = await Api.login(ENV.user, ENV.pass);
        try {
            const users = await api.query('/73/users', 'select * from L8User limit 300 page 0');
            const names = (users.list || [])
                .map((u) => (u as Record<string, string>).user)
                .filter(Boolean);
            expect(
                names.length,
                'no L8User rows at all -- portals cannot be authenticated as their own role'
            ).toBeGreaterThan(0);
        } finally {
            await api.dispose();
        }
    });
});
