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
    if (!statsGrid) throw new Error('dashboard: #dashboard-stats-grid not found');
    statsGrid.innerHTML = DashboardStats.renderStatsGrid();

    // Live KPIs (ErpLiveKpis): every KPI query registers under the
    // 'dashboard' live slot, a pushed change to any KPI model reloads the
    // counts (debounced), and leaving the section releases the slot
    // (js/sections.js -> DashboardStats.stop()).
    DashboardStats.start();
};
