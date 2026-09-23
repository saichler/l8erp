/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// The suite's test fixture. Every spec imports `test`/`expect` from here.
//
// It provides:
//   - `api`     an authenticated API client (per worker),
//   - `app`     a page already authenticated into the desktop shell,
//   - `mobile`  a page already authenticated into the mobile shell,
//   - `consoleErrors` every console error / uncaught exception the page raised.
//
// The console-error capture is the single highest-value thing here. The failure
// mode this codebase actually suffers is FailFastNoSilentFallback's: a script
// tag missing from a shell, so a global is undefined, so an IIFE dies with
// `ReferenceError: <Global> is not defined`, and the feature renders as an
// empty table with no visible error. Nothing in go/tests/ can see that. A
// listener on `pageerror` can, and it sees it on EVERY spec, not just a
// dedicated one -- which is why it is wired into the fixture rather than a
// single test.

import { test as base, expect, Page, BrowserContext } from '@playwright/test';
import { Api } from './api';
import { ENV } from './env';

export interface ConsoleCapture {
    /** Uncaught exceptions (pageerror) -- always a real bug. */
    pageErrors: string[];
    /** console.error(...) calls. */
    consoleErrors: string[];
    /** Failed network requests, as "METHOD url -> status". */
    failedRequests: string[];
    /** Everything above, flattened, for a single assertion. */
    all(): string[];
}

function attachCapture(page: Page): ConsoleCapture {
    const cap: ConsoleCapture = {
        pageErrors: [], consoleErrors: [], failedRequests: [],
        all() { return [...this.pageErrors, ...this.consoleErrors, ...this.failedRequests]; }
    };
    page.on('pageerror', (e) => cap.pageErrors.push(`${e.name}: ${e.message}`));
    page.on('console', (msg) => {
        if (msg.type() === 'error') cap.consoleErrors.push(msg.text());
    });
    page.on('response', (res) => {
        const s = res.status();
        // 401 on /auth during a deliberate bad-login spec is expected; specs
        // that care assert on it directly. Everything >= 400 is recorded and
        // the spec decides.
        if (s >= 400) cap.failedRequests.push(`${res.request().method()} ${res.url()} -> ${s}`);
    });
    return cap;
}

/**
 * Seeds the bearer token the way the real login does.
 *
 * Playwright's own storageState only persists cookies and localStorage. This
 * app keeps its token in sessionStorage (SetupConfiguration: "Bearer token in
 * sessionStorage.bearerToken"), so the session has to be injected by hand,
 * before any script on the page runs.
 */
async function seedSession(context: BrowserContext, token: string, username: string) {
    await context.addInitScript(
        ([t, u]) => {
            try {
                sessionStorage.setItem('bearerToken', t as string);
                sessionStorage.setItem('username', u as string);
            } catch {
                /* private mode / blocked storage -- the spec will fail visibly at login */
            }
        },
        [token, username]
    );
}

/**
 * Waits until the desktop shell has finished booting.
 *
 * app.js's DOMContentLoaded handler awaits FIVE network round-trips -- config,
 * currency cache, exchange rates, /permissions and ModConfig -- and only then,
 * at app.js:223, attaches the `.nav-link` click handlers. A click dispatched
 * before that point lands on an element with no listener and is silently lost:
 * no error, no navigation, and `active` never appears on the link.
 *
 * `loadSection('dashboard')` runs immediately before the handlers are wired, so
 * the default section's markup being present proves the wiring is done.
 */
export async function waitForDesktopReady(page: Page): Promise<void> {
    await expect(page.locator('.app-container')).toBeVisible({ timeout: 30000 });
    await expect(
        page.locator('#content-area .section-container'),
        'the shell never finished booting -- the default section never rendered'
    ).toBeVisible({ timeout: 45000 });
}

/** Mobile equivalent: app-core.js renders the home grid once it is ready. */
export async function waitForMobileReady(page: Page): Promise<void> {
    await expect(
        page.locator('.nav-card-grid'),
        'the mobile shell never rendered its home grid'
    ).toBeVisible({ timeout: 45000 });
}

type Fixtures = {
    api: Api;
    consoleErrors: ConsoleCapture;
    app: Page;
    mobile: Page;
};

export const test = base.extend<Fixtures>({
    api: async ({}, use) => {
        const api = await Api.login();
        await use(api);
        await api.dispose();
    },

    consoleErrors: async ({ page }, use) => {
        await use(attachCapture(page));
    },

    app: async ({ page, context, api, consoleErrors }, use) => {
        void consoleErrors; // ensure listeners are attached before navigation
        await seedSession(context, api.token, ENV.user);
        await page.goto(ENV.desktopShell);
        await waitForDesktopReady(page);
        await use(page);
    },

    mobile: async ({ page, context, api, consoleErrors }, use) => {
        void consoleErrors;
        await seedSession(context, api.token, ENV.user);
        await page.goto(ENV.mobileShell);
        await waitForMobileReady(page);
        await use(page);
    }
});

export { expect };

/**
 * Fails the test if the page raised an uncaught exception or logged an error.
 *
 * `allow` takes substrings for known-noisy messages; keep it empty unless there
 * is a genuinely external cause, and never add an entry to silence a real
 * regression -- that is the same mistake as trimming a deps-check list.
 */
export function assertNoPageErrors(cap: ConsoleCapture, allow: string[] = []) {
    const tolerated = (s: string) => allow.some((a) => s.includes(a));
    const fatal = cap.pageErrors.filter((s) => !tolerated(s));
    const logged = cap.consoleErrors.filter((s) => !tolerated(s));
    expect(fatal, `uncaught exception(s) on the page:\n  ${fatal.join('\n  ')}`).toEqual([]);
    expect(logged, `console.error(s) on the page:\n  ${logged.join('\n  ')}`).toEqual([]);
}
