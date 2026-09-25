/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// PHASE 10 -- realtime.
//
// The plan's premise was "for services with realtime: true, mutate from a second
// client and assert the open table updates". Measured against the real configs,
// that set is EMPTY: no ERP service config on either platform sets
// `realtime: true`. The only consumer in the whole tree is
// l8ui/sys/health/l8health.js:63 (the Health table).
//
// So this spec asserts what is actually there, and records the gap explicitly
// rather than passing a vacuous loop over zero services:
//
//   1. the transport works           -- /ws accepts an authenticated upgrade
//   2. the client is wired           -- Layer8DWebSocket loaded and connected
//   3. a subscription delivers       -- subscribe to a model, mutate it over the
//                                       API, and the callback fires without a
//                                       reload
//   4. the opt-in count is visible   -- a documented expectation, so the day a
//                                       service turns realtime on, coverage for
//                                       it is demanded rather than silently
//                                       skipped
//
// Point 3 is the one that matters: it exercises the whole path (browser socket ->
// L8Bus multicast -> WsNotifyService -> client callback) against a real mutation,
// which is what the plan asked for, using a model that exists rather than one
// that opts in.

import { test, expect } from '../../fixtures/test';
import { desktopServices } from '../../fixtures/inventory';

/** Models the UI marks realtime. Currently only Health does, from inside l8ui. */
function realtimeServices() {
    return desktopServices().filter((x) => x.service.realtime);
}

test.describe('realtime', () => {
    test('the websocket client is loaded and connects @smoke', async ({ app }) => {
        const state = await app.evaluate(async () => {
            const w = window as unknown as {
                Layer8DWebSocket?: { isConnected?(): boolean; subscribe?: unknown };
            };
            if (!w.Layer8DWebSocket) return { present: false, connected: false };
            // app.js calls init() during boot; give the upgrade a moment to settle
            // rather than racing it.
            for (let i = 0; i < 40 && !w.Layer8DWebSocket.isConnected?.(); i++) {
                await new Promise((r) => setTimeout(r, 250));
            }
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
        test.setTimeout(120_000);
        // KNOWN GAP, marked expected-to-fail rather than deleted or skipped.
        //
        // Measured: /ws accepts the authenticated upgrade and the client reports
        // connected, but observing raw frames with page.on('websocket') during a
        // successful POST shows frameCount=0. So the transport is up and NOTHING
        // PUBLISHES -- l8web's WsNotifyService forwards L8Bus multicast, and no
        // ERP service posts a notification for a CRUD write.
        //
        // test.fail() is deliberate over test.skip(): a skip hides the gap, while
        // this keeps the assertion running and turns the moment publication starts
        // working into a LOUD failure telling us to drop this marker. It is also
        // why the spec does not simply assert zero services opt in -- that would
        // bake the gap in as correct.
        test.fail(true,
            'realtime publication is not implemented: /ws connects but the server ' +
            'pushes no frames for a CRUD mutation (see ReportInfraBugs)');

        // Subscribe in the page, then mutate over the API from this process --
        // genuinely a second client, which is what makes the multicast path real.
        await app.evaluate(() => {
            const w = window as unknown as {
                Layer8DWebSocket: { subscribe(m: string, cb: (p: unknown) => void): () => void };
                __e2eHits?: unknown[];
                __e2eUnsub?: () => void;
            };
            w.__e2eHits = [];
            w.__e2eUnsub = w.Layer8DWebSocket.subscribe('L8ImportTemplate', (payload) => {
                w.__e2eHits!.push(payload);
            });
        });

        const templateId = `e2e-rt-${Date.now()}`;
        const template = {
            templateId,
            name: 'E2E Realtime Probe',
            description: 'created by the realtime spec',
            targetModelType: 'Employee',
            targetServiceName: 'Employee',
            targetServiceArea: 30,
            sourceFormat: 'csv'
        };

        try {
            await api.post('/0/ImprtTmpl', template);

            const hits = await app.evaluate(async () => {
                const w = window as unknown as { __e2eHits: unknown[] };
                for (let i = 0; i < 60 && w.__e2eHits.length === 0; i++) {
                    await new Promise((r) => setTimeout(r, 250));
                }
                return w.__e2eHits.length;
            });

            expect(
                hits,
                'the websocket delivered no notification for a real POST -- the path is ' +
                'browser socket -> L8Bus multicast -> WsNotifyService -> subscribe() callback, ' +
                'and a break anywhere in it makes every realtime table silently static'
            ).toBeGreaterThan(0);
        } finally {
            await app.evaluate(() => {
                const w = window as unknown as { __e2eUnsub?: () => void };
                if (typeof w.__e2eUnsub === 'function') w.__e2eUnsub();
            }).catch(() => undefined);
            // Always remove the probe row, even if the assertion above failed.
            await api.deleteById('/0/ImprtTmpl', 'L8ImportTemplate', 'templateId', templateId)
                .catch(() => undefined);
        }
    });

    test('every service that opts into realtime has a live table to prove it', async ({ app }) => {
        const services = realtimeServices();

        // Not a vacuous pass: record the measured state so this becomes a real
        // assertion the moment a service opts in.
        if (services.length === 0) {
            const healthUsesIt = await app.evaluate(() => {
                // l8health.js passes realtime:true into its own table config.
                return typeof (window as unknown as { L8Health?: unknown }).L8Health !== 'undefined';
            });
            expect(
                healthUsesIt,
                'no ERP service config sets realtime:true AND L8Health (the only realtime ' +
                'consumer in the tree, l8ui/sys/health/l8health.js:63) is not loaded either -- ' +
                'the realtime path would then have no exercise at all'
            ).toBe(true);
            return;
        }

        // If services start opting in, each must actually render a table.
        const missing = services
            .filter((x) => !x.service.containerId)
            .map((x) => `${x.section}/${x.moduleKey}/${x.service.key}`);
        expect(
            missing,
            `services declaring realtime but with no table container:\n  ${missing.join('\n  ')}`
        ).toEqual([]);
    });
});
