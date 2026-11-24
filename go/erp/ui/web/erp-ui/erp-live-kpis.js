/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

// ErpLiveKpis - live KPI counts, shared by the desktop dashboard and the
// mobile home. One live component (one Layer8DWebSocket slot) per shell:
//   - every fetch goes through registerQuery (register + registerId),
//   - a pushed change to any KPI model reloads the counts (debounced),
//   - a websocket reconnect reloads (re-registers),
//   - evicted while still shown -> reload once to take a slot again,
//   - stop() releases the slot's listeners when the shell leaves the KPIs.
//
//   var handle = ErpLiveKpis.start({
//       id: 'dashboard',                       // live slot id
//       kpis: DashboardConfig.kpis,            // {id, endpoint, model, query, countField}
//       resolveEndpoint: fn(endpoint) -> url,
//       getJson: fn(url) -> Promise<json>,     // shell's authenticated GET
//       render: fn(kpi, count),                // count === null -> load failed
//       isShown: fn() -> bool                  // KPIs still on screen
//   });
//   handle.stop();
(function() {
    'use strict';

    var RELOAD_DEBOUNCE_MS = 1000;
    var current = {};   // slot id -> the handle that owns it

    function start(opts) {
        ['id', 'kpis', 'resolveEndpoint', 'getJson', 'render', 'isShown'].forEach(function(k) {
            if (!opts[k]) throw new Error('ErpLiveKpis.start: missing option "' + k + '"');
        });

        if (current[opts.id]) current[opts.id].stop();

        var owner = {};
        var timer = null;
        var stopped = false;
        var handle = {};

        function loadKPI(kpi) {
            var endpoint = opts.resolveEndpoint(kpi.endpoint);
            // Synchronous, before the first await: the slot exists before
            // listen() is called below.
            var query = Layer8DWebSocket.registerQuery(opts.id, owner, endpoint, kpi.query, {
                onReconnect: reload,
                onDetach: onDetach
            });
            var url = endpoint + '?body=' + encodeURIComponent(JSON.stringify(query));
            return opts.getJson(url).then(function(data) {
                if (stopped) return;
                var counts = data && data.metadata && data.metadata.keyCount && data.metadata.keyCount.counts;
                opts.render(kpi, counts ? (counts[kpi.countField || 'Total'] || 0) : 0);
            }).catch(function(err) {
                console.error('ErpLiveKpis: failed to load KPI "' + kpi.id + '":', err);
                if (!stopped) opts.render(kpi, null);
            });
        }

        function reload() {
            if (stopped) return Promise.resolve();
            return Promise.all(opts.kpis.map(loadKPI));
        }

        function scheduleReload() {
            clearTimeout(timer);
            timer = setTimeout(reload, RELOAD_DEBOUNCE_MS);
        }

        // Evicted (oldest of the live slots) or taken over. A takeover is a
        // newer handle for the same slot -- nothing to do. Evicted while the
        // KPIs are still shown -> register again so they stay live.
        function onDetach() {
            if (stopped || current[opts.id] !== handle) return;
            if (opts.isShown()) {
                reload().then(listenAll);
            }
        }

        function listenAll() {
            if (stopped) return;
            var models = {};
            opts.kpis.forEach(function(kpi) {
                if (!kpi.model) throw new Error('ErpLiveKpis: KPI "' + kpi.id + '" has no model');
                models[kpi.model] = true;
            });
            Object.keys(models).forEach(function(model) {
                Layer8DWebSocket.listen(opts.id, owner, model, scheduleReload);
            });
        }

        handle.reload = reload;
        handle.stop = function() {
            if (stopped) return;
            stopped = true;
            clearTimeout(timer);
            Layer8DWebSocket.release(opts.id, owner);
            if (current[opts.id] === handle) delete current[opts.id];
        };
        handle.isLive = function() {
            return !stopped && Layer8DWebSocket.liveIds().indexOf(opts.id) >= 0;
        };

        current[opts.id] = handle;
        var loading = reload();
        listenAll();
        handle.ready = loading;
        return handle;
    }

    window.ErpLiveKpis = {
        start: start,
        /** The handle currently owning a slot id (diagnostics and e2e). */
        get: function(id) { return current[id] || null; }
    };
})();
