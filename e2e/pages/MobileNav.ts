/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Page objects for the real mobile bundle at /m/app.html.
//
// PostImplementationE2ETesting is explicit that mobile means the mobile bundle
// at its own URL, never a resized desktop viewport -- the two shells load
// different script sets (341 vs 388 files here) and diverge in exactly the
// places a resized desktop would hide.
//
// Selectors from l8ui/m/js/layer8m-nav.js (`.nav-card[data-module]`,
// `.nav-card-grid`, `.nav-back-btn`, `.data-list-title`) and
// l8ui/m/js/layer8m-table.js (`.mobile-table-cards`, `.mobile-table-card-row`,
// `.mobile-table-empty`, `.mobile-table-pagination`).

import { Locator, Page, expect } from '@playwright/test';

export class MobileNav {
    constructor(private page: Page) {}

    cardGrid(): Locator { return this.page.locator('.nav-card-grid'); }
    cards(): Locator { return this.page.locator('.nav-card'); }
    backButton(): Locator { return this.page.locator('.nav-back-btn, .data-list-back-btn').first(); }
    title(): Locator { return this.page.locator('.nav-title, .data-list-title').first(); }
    emptyState(): Locator { return this.page.locator('.nav-empty-state'); }

    moduleCard(moduleKey: string): Locator {
        return this.page.locator(`.nav-card[data-module="${moduleKey}"]`);
    }

    /** A card by its visible label -- sub-module and service cards carry no data-module. */
    cardByLabel(label: string): Locator {
        return this.page.locator('.nav-card').filter({ hasText: label }).first();
    }

    async waitForHome(timeout = 20000): Promise<void> {
        await expect(this.cardGrid()).toBeVisible({ timeout });
    }

    async openModule(moduleKey: string): Promise<void> {
        await this.moduleCard(moduleKey).click();
        await expect(this.cardGrid()).toBeVisible({ timeout: 15000 });
    }

    async openByLabel(label: string): Promise<void> {
        await this.cardByLabel(label).click();
    }

    async back(): Promise<void> {
        await this.backButton().click();
    }

    /** Module keys currently rendered on the home grid. */
    async visibleModules(): Promise<string[]> {
        return this.page.$$eval('.nav-card[data-module]', (els) =>
            els
                .filter((e) => (e as HTMLElement).style.display !== 'none')
                .map((e) => e.getAttribute('data-module') || '')
                .filter(Boolean)
        );
    }

    /**
     * Drills home -> module -> sub-module -> service and returns the L8Query
     * the shell issued, or null if it never issued one.
     */
    async openService(
        moduleKey: string, subModuleLabel: string, serviceLabel: string, model: string
    ): Promise<string | null> {
        const queryPromise = this.page
            .waitForRequest(
                (req) => req.url().includes('body=') &&
                         decodeURIComponent(req.url()).includes(`from ${model} `),
                { timeout: 20000 }
            )
            .catch(() => null);

        await this.openModule(moduleKey);
        const sub = this.cardByLabel(subModuleLabel);
        if (await sub.count()) await sub.click();
        const svc = this.cardByLabel(serviceLabel);
        if (await svc.count()) await svc.click();

        const req = await queryPromise;
        if (!req) return null;
        const body = new URL(req.url()).searchParams.get('body');
        return body ? (JSON.parse(body).text as string) : null;
    }
}

export class MobileTable {
    constructor(private page: Page) {}

    cards(): Locator { return this.page.locator('.mobile-table-cards .mobile-table-card-row'); }
    wrapper(): Locator { return this.page.locator('.mobile-table-wrapper'); }
    empty(): Locator { return this.page.locator('.mobile-table-empty'); }
    error(): Locator { return this.page.locator('.mobile-table-error'); }
    loading(): Locator { return this.page.locator('.mobile-table-loading'); }
    pagination(): Locator { return this.page.locator('.mobile-table-pagination'); }
    filters(): Locator { return this.page.locator('.mobile-table-filters'); }

    /** Same three-way resolution as the desktop table, plus the error card. */
    async waitForResolved(timeout = 20000): Promise<'cards' | 'empty' | 'error'> {
        await expect
            .poll(
                async () => {
                    if (await this.cards().count() > 0) return 'cards';
                    if (await this.error().count() > 0) return 'error';
                    if (await this.empty().count() > 0) return 'empty';
                    return 'pending';
                },
                { timeout, message: 'mobile table never resolved into cards, empty, or error' }
            )
            .not.toBe('pending');

        if (await this.cards().count() > 0) return 'cards';
        if (await this.error().count() > 0) return 'error';
        return 'empty';
    }

    /** Field labels on the first card -- catches the DEFAULT_COLUMNS fallback. */
    async firstCardLabels(): Promise<string[]> {
        const first = this.cards().first();
        if (!(await first.count())) return [];
        const labels = await first.locator('.mobile-table-card-label').allInnerTexts();
        return labels.map((l) => l.replace(/:$/, '').trim()).filter(Boolean);
    }
}
