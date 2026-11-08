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

// Dashboard Initialization
window.initializeDashboard = function() {
    // Render the stats grid
    const statsGrid = document.getElementById('dashboard-stats-grid');
    if (statsGrid && window.DashboardStats) {
        statsGrid.innerHTML = DashboardStats.renderStatsGrid();
    }

    // Load all stats. loadAll registers every KPI query (synchronously, before
    // its first request) under the 'dashboard' live slot, owned by this entry.
    if (window.DashboardStats) {
        DashboardStats.liveOwner = {};
        DashboardStats.loadAll();
    }

    // Live KPIs: a pushed change to any KPI model reloads the counts (debounced,
    // so a burst of changes reloads once). The listeners belong to the live
    // slot, so re-entering the dashboard or evicting it removes them.
    if (typeof Layer8DWebSocket !== 'undefined' && window.DashboardConfig && window.DashboardStats) {
        var refreshTimer = null;
        DashboardConfig.kpis.forEach(function(kpi) {
            Layer8DWebSocket.listen('dashboard', DashboardStats.liveOwner, kpi.model, function() {
                clearTimeout(refreshTimer);
                refreshTimer = setTimeout(function() {
                    DashboardStats.loadAll();
                }, 1000);
            });
        });
    }
};
