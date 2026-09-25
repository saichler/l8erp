/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Page object for the desktop shell's navigation.
//
// Selectors come from the markup Layer8SectionGenerator emits
// (l8ui/shared/layer8-section-generator.js) and the shell body copied from
// l8erp's app.html (AppHtmlBodyFromL8erp): sidebar `.nav-link[data-section]`,
// content in `#content-area`, module tabs `.l8-module-tab[data-module]`,
// sub-nav `.l8-subnav-item[data-service]`, and one table container per service
// at `{moduleKey}-{serviceKey}-table-container`.

import { Page, Locator, expect } from '@playwright/test';

export class DesktopNav {
    constructor(private page: Page) {}

    contentArea(): Locator {
        return this.page.locator('#content-area');
    }

    sidebarLink(section: string): Locator {
        return this.page.locator(`.nav-link[data-section="${section}"]`);
    }

    /** Sections whose sidebar entry is currently visible to this user. */
    async visibleSections(): Promise<string[]> {
        return this.page.$$eval('.nav-link[data-section]', (links) =>
            links
                .filter((l) => {
                    const li = l.closest('li') as HTMLElement | null;
                    return !li || li.style.display !== 'none';
                })
                .map((l) => l.getAttribute('data-section') || '')
                .filter(Boolean)
        );
    }

    /**
     * Clicks a sidebar section and waits for its generated markup to land.
     *
     * Waiting on `.section-container` alone is NOT enough and produces flaky,
     * half-rendered reads: sections.js sets `#content-area` to opacity 0, then
     * replaces its innerHTML 200ms later, then restores opacity 50ms after
     * that. Between the click and the swap the PREVIOUS section's container is
     * still in the DOM and already visible, so the wait resolves immediately
     * and any assertion that follows races the replacement.
     *
     * Opacity back at 1 is the signal that the second timeout has fired, which
     * means the new markup is in place and the generator has run.
     */
    async openSection(section: string): Promise<void> {
        await this.sidebarLink(section).click();
        await expect(this.sidebarLink(section)).toHaveClass(/active/, { timeout: 15000 });
        await expect(this.contentArea().locator('.section-container')).toBeVisible({ timeout: 15000 });
        await expect
            .poll(
                async () =>
                    this.contentArea().evaluate((el) => getComputedStyle(el).opacity),
                { timeout: 15000, message: `section "${section}" never finished fading in` }
            )
            .toBe('1');
    }

    moduleTab(moduleKey: string): Locator {
        return this.page.locator(`.l8-module-tab[data-module="${moduleKey}"]`);
    }

    moduleContent(moduleKey: string): Locator {
        return this.page.locator(`.l8-module-content[data-module="${moduleKey}"]`);
    }

    subnavItem(moduleKey: string, serviceKey: string): Locator {
        return this.moduleContent(moduleKey).locator(`.l8-subnav-item[data-service="${serviceKey}"]`);
    }

    tableContainer(moduleKey: string, serviceKey: string): Locator {
        return this.page.locator(`#${moduleKey}-${serviceKey}-table-container`);
    }

    viewSwitcherSlot(moduleKey: string, serviceKey: string): Locator {
        return this.page.locator(`#${moduleKey}-${serviceKey}-view-switcher`);
    }

    /** Switches module tab, if the section has more than one. */
    async openModule(moduleKey: string): Promise<void> {
        const tab = this.moduleTab(moduleKey);
        const content = this.moduleContent(moduleKey);

        // Click, then confirm, and retry the click if the pane did not activate.
        //
        // A single click with one assertion was the suite's most persistent
        // flake: `.l8-module-content[data-module="X"]` never gaining `active`
        // has hit inventory, shopfloor, campaigns and dashboards across runs.
        // A tab click can be swallowed -- by a floating view-switcher menu, a
        // date-picker overlay, or a section still swapping its DOM -- and one
        // lost click in a spec that navigates 50 times was a hard failure.
        //
        // This retries the app's own path rather than forcing state, and still
        // FAILS if the pane genuinely never activates, so a real navigation bug
        // is reported exactly as before.
        for (let attempt = 0; attempt < 3; attempt++) {
            if (await content.evaluate((el) => el.classList.contains('active')).catch(() => false)) {
                return;
            }
            if (attempt > 0) {
                // Something is plausibly covering the tab; clear it the way the
                // app would before trying again.
                await this.page.keyboard.press('Escape').catch(() => undefined);
                await this.page.waitForTimeout(250);
            }
            if ((await tab.count()) && (await tab.isVisible().catch(() => false))) {
                await tab.click({ timeout: 5000 }).catch(() => undefined);
            }
            await content.waitFor({ state: 'attached', timeout: 5000 }).catch(() => undefined);
            await this.page.waitForTimeout(400);
        }
        await expect(content).toHaveClass(/active/, { timeout: 10000 });
    }

    /**
     * Forces the active table to re-fetch.
     *
     * layer8d-module-navigation.js exposes refreshCurrentTable() on each module
     * namespace; calling it is how the app itself refreshes after a write, so
     * the test uses the same path rather than reloading the page.
     */
    async refreshCurrentTable(namespace: string): Promise<void> {
        await this.page.evaluate((ns: string) => {
            const w = window as unknown as Record<string, { refreshCurrentTable?: () => void }>;
            w[ns]?.refreshCurrentTable?.();
        }, namespace);
        await this.page.waitForTimeout(1200);
    }

    /**
     * Clicks a service's sub-nav item. Does not wait for a request -- use a
     * QueryRecorder for that, because the module's DEFAULT service is loaded
     * during initialize() and re-clicking an already-initialised service does
     * not re-fetch, so "a request arrives after this click" is simply false for
     * a healthy default service.
     */
    async openService(moduleKey: string, serviceKey: string): Promise<void> {
        const item = this.subnavItem(moduleKey, serviceKey);
        if (await item.count()) {
            if (await item.isVisible()) await item.click();
        }
    }
}
