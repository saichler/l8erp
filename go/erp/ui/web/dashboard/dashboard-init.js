/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Unsubscribe handles from the previous dashboard load, so re-entering the
// dashboard replaces its websocket listeners instead of stacking them.
var dashboardUnsubscribers = [];

// Dashboard Initialization
window.initializeDashboard = function() {
    // Render the stats grid
    const statsGrid = document.getElementById('dashboard-stats-grid');
    if (statsGrid && window.DashboardStats) {
        statsGrid.innerHTML = DashboardStats.renderStatsGrid();
    }

    // Load all stats
    if (window.DashboardStats) {
        DashboardStats.loadAll();
    }

    // Live KPIs: a pushed change to any KPI model reloads the counts (debounced,
    // so a burst of changes reloads once).
    dashboardUnsubscribers.forEach(function(unsubscribe) { unsubscribe(); });
    dashboardUnsubscribers = [];
    if (typeof Layer8DWebSocket !== 'undefined' && window.DashboardConfig) {
        var refreshTimer = null;
        DashboardConfig.kpis.forEach(function(kpi) {
            dashboardUnsubscribers.push(Layer8DWebSocket.subscribe(kpi.model, function() {
                clearTimeout(refreshTimer);
                refreshTimer = setTimeout(function() {
                    DashboardStats.loadAll();
                }, 1000);
            }));
        });
    }
};
