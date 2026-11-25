/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// The marketing site: the live demo is the largest call to action, the AI
// differentiators (masking, run-as-user, no agent credentials) are at the top,
// and the AI & Security page is linked from every page.
//
// These pages are public, so every test uses a fresh context with no session.

import { test, expect } from '../../fixtures/test';
import type { Browser, Page } from '@playwright/test';
import { ENV } from '../../fixtures/env';

const M = `${ENV.baseURL}/marketing`;
const PAGES = ['index.html', 'ai.html', 'architecture.html', 'modules.html', 'proof.html', 'start.html', 'about.html'];

async function open(browser: Browser, url: string, width = 1280): Promise<{ page: Page; errors: string[]; close: () => Promise<void> }> {
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const resp = await page.goto(url, { waitUntil: 'networkidle' });
    expect(resp?.status(), `${url} did not serve`).toBeLessThan(400);
    return { page, errors, close: () => ctx.close() };
}

async function fontSize(page: Page, selector: string): Promise<number> {
    return page.locator(selector).first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
}

async function expectDemoModal(page: Page): Promise<void> {
    const modal = page.locator('.modal-overlay.active .modal');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('operator');
    await expect(modal).toContainText('Oper123!');
    await expect(modal).toContainText('Tanto');
}

test.describe('marketing site', () => {
    test('the live demo is the biggest action at the top of the landing page @smoke', async ({ browser }) => {
        const { page, errors, close } = await open(browser, `${M}/index.html`);
        try {
            const cta = page.locator('#demoCta');
            await expect(cta).toBeVisible();
            await expect(cta).toContainText('operator');
            await expect(cta).toContainText('Oper123!');

            // Above the headline, and larger than the nav and the hero buttons.
            const ctaBox = (await cta.boundingBox())!;
            const h1Box = (await page.locator('.hero h1').boundingBox())!;
            expect(ctaBox.y).toBeLessThan(h1Box.y);
            const ctaFont = await fontSize(page, '.demo-cta-button');
            expect(ctaFont).toBeGreaterThanOrEqual(18);
            expect(ctaFont).toBeGreaterThan(await fontSize(page, '.nav-links a'));
            expect(ctaFont).toBeGreaterThan(await fontSize(page, '.hero-buttons .btn-secondary'));

            await page.locator('.demo-cta-button').click();
            await expectDemoModal(page);
            expect(errors).toEqual([]);
        } finally {
            await close();
        }
    });

    test('the AI differentiators come right after the hero', async ({ browser }) => {
        const { page, close } = await open(browser, `${M}/index.html`);
        try {
            await expect(page.locator('.hero h1')).toContainText('never sees your sensitive data');
            const firstSection = page.locator('main > section').nth(1);
            await expect(firstSection).toHaveId('ai');
            await expect(firstSection.locator('.ai-card')).toHaveCount(6);
            for (const tag of ['Data never leaks to the LLM', 'Runs as you', 'No credentials to steal']) {
                await expect(firstSection).toContainText(tag);
            }
            await expect(firstSection.locator('.compare-table tbody tr')).toHaveCount(5);
        } finally {
            await close();
        }
    });

    test('the AI & Security page explains the masking flow and opens the demo', async ({ browser }) => {
        const { page, errors, close } = await open(browser, `${M}/ai.html`);
        try {
            await expect(page.locator('.ai-flow li')).toHaveCount(5);
            await expect(page.locator('main')).toContainText('(l8ai.AIMask) = true');
            await expect(page.locator('main')).toContainText('237 sensitive fields');
            await page.locator('.demo-cta-button').click();
            await expectDemoModal(page);
            expect(errors).toEqual([]);
        } finally {
            await close();
        }
    });

    for (const file of PAGES) {
        test(`${file} links to AI & Security and to the live demo`, async ({ browser }) => {
            const { page, errors, close } = await open(browser, `${M}/${file}`);
            try {
                await expect(page.locator('a[href="ai.html"]').first()).toBeAttached();
                if (file !== 'about.html') {
                    await expect(page.locator('.nav-buttons .demo-button', { hasText: 'Live Demo' })).toBeVisible();
                }
                expect(errors).toEqual([]);
            } finally {
                await close();
            }
        });
    }

    test('the header fits the window: every nav item and button is fully on screen', async ({ browser }) => {
        for (const width of [1280, 1440, 1920]) {
            for (const file of ['index.html', 'ai.html', 'architecture.html']) {
                const { page, close } = await open(browser, `${M}/${file}`, width);
                try {
                    const items = page.locator('header .nav-links a, header .nav-buttons > *');
                    for (let i = 0; i < await items.count(); i++) {
                        const box = (await items.nth(i).boundingBox())!;
                        expect(box.x + box.width, `${file} @${width}: header item ${i} is cut off`).toBeLessThanOrEqual(width);
                        expect(box.height, `${file} @${width}: header item ${i} wraps`).toBeLessThan(56);
                    }
                } finally {
                    await close();
                }
            }
        }
    });

    test("another page's Live Demo button opens the demo on the landing page", async ({ browser }) => {
        const { page, close } = await open(browser, `${M}/architecture.html`);
        try {
            await page.locator('.nav-buttons .demo-button', { hasText: 'Live Demo' }).click();
            await expect(page).toHaveURL(/index\.html#demo$/);
            await expectDemoModal(page);
        } finally {
            await close();
        }
    });

    test('at phone width the demo button fills the row and nothing scrolls sideways', async ({ browser }) => {
        for (const file of ['index.html', 'ai.html']) {
            const { page, close } = await open(browser, `${M}/${file}`, 390);
            try {
                const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
                expect(overflow, `${file} scrolls sideways`).toBeLessThanOrEqual(0);
                const btn = (await page.locator('.demo-cta-button').boundingBox())!;
                const cta = (await page.locator('.demo-cta').boundingBox())!;
                expect(btn.width).toBeGreaterThan(cta.width * 0.8);
            } finally {
                await close();
            }
        }
    });

    test('the mobile landing page leads with the demo and the AI section', async ({ browser }) => {
        const { page, errors, close } = await open(browser, `${M}/m/index.html`, 390);
        try {
            await expect(page.locator('#demoCta')).toBeVisible();
            expect(await fontSize(page, '.demo-cta-button')).toBeGreaterThanOrEqual(18);
            await expect(page.locator('main > section').nth(1)).toHaveId('ai');
            await page.locator('.demo-cta-button').click();
            const modal = page.locator('#demoModalOverlay');
            await expect(modal).toBeVisible();
            await expect(modal).toContainText('operator');
            expect(errors).toEqual([]);
        } finally {
            await close();
        }
    });
});
