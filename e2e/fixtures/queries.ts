/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Records every L8Query the page issues, from the moment it is attached.
//
// Why a recorder rather than `page.waitForRequest` at each navigation: the
// module factory loads a module's DEFAULT service during initialize(), before
// any click. Arming a waiter after clicking that service's sub-nav item waits
// for a request that already happened, times out, and reports a perfectly
// healthy service as "never issued a query".
//
// Clicking an already-active service does not re-fetch either --
// layer8d-module-navigation.js's loadServiceView only initialises a view when
// `!moduleNS._state.serviceTables[tableId]`. So "has this model been queried at
// any point in this page's life" is the question that actually matters, and
// only a recorder attached at page load can answer it.

import { Page } from '@playwright/test';

export class QueryRecorder {
    private queries: string[] = [];

    private constructor(page: Page) {
        page.on('request', (req) => {
            const url = req.url();
            if (!url.includes('body=')) return;
            try {
                const body = new URL(url).searchParams.get('body');
                if (!body) return;
                const text = JSON.parse(body).text;
                if (typeof text === 'string') this.queries.push(text);
            } catch {
                /* not an L8Query body -- ignore */
            }
        });
    }

    static attach(page: Page): QueryRecorder {
        return new QueryRecorder(page);
    }

    all(): string[] {
        return [...this.queries];
    }

    /** Every query whose `from` clause names this protobuf type. */
    forModel(model: string): string[] {
        const re = new RegExp(`\\bfrom\\s+${model}\\b`);
        return this.queries.filter((q) => re.test(q));
    }

    /**
     * Resolves with the first query issued for `model`, waiting up to
     * `timeoutMs` for one to appear if none has yet. Returns null on timeout.
     */
    async waitForModel(model: string, timeoutMs = 20000): Promise<string | null> {
        const deadline = Date.now() + timeoutMs;
        for (;;) {
            const hits = this.forModel(model);
            if (hits.length > 0) return hits[0];
            if (Date.now() > deadline) return null;
            await new Promise((r) => setTimeout(r, 200));
        }
    }
}
