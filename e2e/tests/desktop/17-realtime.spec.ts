/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// PHASE 10 -- realtime.
//
// Every screen is live: l8ui tables, data-source views and their mobile
// counterparts default to realtime (a server-side view registers its query with
// `register=true` and applies pushed changes in place; `realtime: false` opts
// out). The server pushes a change only to sessions whose REGISTERED query
// matches the record, so every probe here registers before it mutates.
//
//   1. the client is wired      -- Layer8DWebSocket loaded and connected
//   2. a subscription delivers  -- register, subscribe, mutate over the API from
//                                  a second client, the callback fires
//   3. a screen is live         -- an open table shows a row another client
//                                  created and drops it when that client
//                                  deletes it, with no re-fetch

import { test, expect } from '../../fixtures/test';
import { DesktopNav } from '../../pages/DesktopNav';
import { DesktopTable } from '../../pages/DesktopTable';
import { QueryRecorder } from '../../fixtures/queries';

test.describe('realtime', () => {
    test('the websocket client is loaded and connects @smoke', async ({ app }) => {
        // app.js calls init() during boot; wait for the upgrade to report
        // connected rather than racing it.
        await app.waitForFunction(() => {
            const w = window as unknown as { Layer8DWebSocket?: { isConnected?(): boolean } };
            return !w.Layer8DWebSocket || !!w.Layer8DWebSocket.isConnected?.();
        }, null, { timeout: 10000 }).catch(() => undefined);   // asserted below
        const state = await app.evaluate(() => {
            const w = window as unknown as {
                Layer8DWebSocket?: { isConnected?(): boolean; subscribe?: unknown };
            };
            if (!w.Layer8DWebSocket) return { present: false, connected: false };
            return { present: true, connected: !!w.Layer8DWebSocket.isConnected?.() };
        });

        expect(
            state.present,
            'Layer8DWebSocket is not on window -- layer8d-websocket.js is missing from ' +
            'app.html, and layer8d-data-source.js guards on it with typeof, so every ' +
            'realtime subscription would silently never fire'
        ).toBe(true);
        expect(
            state.connected,
            'Layer8DWebSocket never reported connected -- /ws refused the authenticated ' +
            'upgrade (the server side is l8web WebSocketManager / WsNotifyService)'
        ).toBe(true);
    });

    test('a subscription receives a notification for a real mutation', async ({ app, api }) => {
        // Register exactly the way a live view does, then subscribe, then mutate
        // over the API from this process -- genuinely a second client, which is
        // what makes the multicast path real. JobFamily is an ordinary
        // ORM-backed service; L8ImportTemplate (/0/ImprtTmpl) was used before
        // and pushes nothing even to a registered query.
        const registered = await app.evaluate(async () => {
            const w = window as unknown as {
                Layer8DWebSocket: { subscribe(m: string, cb: (p: unknown) => void): () => void };
                Layer8DConfig: { resolveEndpoint(p: string): string };
                getAuthHeaders(): Record<string, string>;
                __e2eHits?: unknown[];
                __e2eUnsub?: () => void;
            };
            w.__e2eHits = [];
            w.__e2eUnsub = w.Layer8DWebSocket.subscribe('JobFamily', (payload) => {
                w.__e2eHits!.push(payload);
            });
            const q = encodeURIComponent(JSON.stringify(
                { text: 'select * from JobFamily limit 10 page 0 register=true' }));
            const r = await fetch(w.Layer8DConfig.resolveEndpoint('/30/JobFamily') + '?body=' + q,
                { headers: w.getAuthHeaders() });
            return r.status;
        });
        expect(registered, 'registering the query failed').toBe(200);

        const code = `E2ESUB${Date.now()}`;
        let id = '';
        try {
            await api.post('/30/JobFamily', { code, name: `E2E Realtime ${code}`, description: 'realtime probe' });
            const created = await api.query('/30/JobFamily', `select * from JobFamily where code=${code}`);
            id = String(created.list[0]?.jobFamilyId ?? '');

            await app.waitForFunction(
                () => (window as unknown as { __e2eHits: unknown[] }).__e2eHits.length > 0,
                null, { timeout: 15000 }
            ).catch(() => undefined);   // asserted below
            const hits = await app.evaluate(
                () => (window as unknown as { __e2eHits: unknown[] }).__e2eHits.length);

            expect(
                hits,
                'the websocket delivered no notification for a real POST to a registered ' +
                'query -- the path is browser socket -> L8Bus multicast -> WsNotifyService -> ' +
                'subscribe() callback, and a break anywhere in it makes every screen static'
            ).toBeGreaterThan(0);
        } finally {
            await app.evaluate(() => {
                const w = window as unknown as { __e2eUnsub?: () => void };
                if (typeof w.__e2eUnsub === 'function') w.__e2eUnsub();
            }).catch(() => undefined);
            // Always remove the probe row, even if the assertion above failed.
            if (id) await api.deleteById('/30/JobFamily', 'JobFamily', 'jobFamilyId', id).catch(() => undefined);
        }
    });

    test('an open table shows another client\'s add and delete without re-fetching', async ({ app, api }) => {
        const nav = new DesktopNav(app);
        await nav.openSection('hcm');
        await nav.openModule('core-hr');
        await nav.openService('core-hr', 'job-families');
        const table = new DesktopTable(app, 'core-hr', 'job-families');
        await table.waitForResolved();

        const code = `E2ERT${Date.now()}`;
        const row = table.root.locator('.l8-table tbody tr').filter({ hasText: code });
        const queries = QueryRecorder.forPage(app);
        let id = '';
        try {
            const before = queries.forModel('JobFamily').length;
            await api.post('/30/JobFamily', { code, name: `E2E Realtime ${code}`, description: 'realtime probe' });
            const created = await api.query('/30/JobFamily', `select * from JobFamily where code=${code}`);
            id = String(created.list[0]?.jobFamilyId ?? '');

            // A live add lands at the top of page 1, straight from the push.
            await expect(row, 'the row another client created never appeared in the open table')
                .toHaveCount(1, { timeout: 15000 });

            await api.deleteById('/30/JobFamily', 'JobFamily', 'jobFamilyId', id);
            id = '';
            await expect(row, 'the row another client deleted is still in the open table')
                .toHaveCount(0, { timeout: 15000 });

            expect(
                queries.forModel('JobFamily').length,
                'the table re-fetched to show the change -- live updates must apply the pushed record'
            ).toBe(before);
        } finally {
            if (id) await api.deleteById('/30/JobFamily', 'JobFamily', 'jobFamilyId', id).catch(() => undefined);
        }
    });
});
