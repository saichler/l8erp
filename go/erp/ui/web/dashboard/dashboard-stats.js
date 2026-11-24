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

// Dashboard Stats Loader
window.DashboardStats = {
    // The live KPI handle (ErpLiveKpis) of the dashboard currently shown;
    // initializeDashboard starts it, leaving the section stops it.
    live: null,

    // Start (or restart) the live KPIs under the 'dashboard' live slot.
    start() {
        const config = window.DashboardConfig;
        if (!config || !config.kpis) throw new Error('DashboardConfig not found');
        this.live = ErpLiveKpis.start({
            id: 'dashboard',
            kpis: config.kpis,
            resolveEndpoint: (endpoint) => Layer8DConfig.resolveEndpoint(endpoint),
            getJson: async (url) => {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            },
            render: (kpi, count) => this.renderKPI(kpi, count),
            isShown: () => !!document.getElementById('dashboard-stats-grid')
        });
        return this.live;
    },

    // Stop the live KPIs (the user left the dashboard section).
    stop() {
        if (this.live) {
            this.live.stop();
            this.live = null;
        }
    },

    // Render one KPI value; count === null means the load failed.
    renderKPI(kpi, count) {
        const element = document.getElementById(`dashboard-stat-${kpi.id}`);
        if (!element) return;
        element.textContent = count === null ? 'error' : this.formatNumber(count);
        element.classList.toggle('error', count === null);
        element.classList.remove('loading');
    },

    // Format large numbers with commas
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    },

    // Navigate to module section when card is clicked
    navigateToSection(section) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === section) {
                link.classList.add('active');
            }
        });
        // Load the section
        loadSection(section);
    },

    // Render the stats grid
    renderStatsGrid() {
        const config = window.DashboardConfig;
        if (!config || !config.kpis) {
            return '';
        }

        return config.kpis.map(kpi => {
            const iconSvg = config.icons[kpi.icon] || config.icons.hcm;
            return `
                <div class="dashboard-stat-card" onclick="DashboardStats.navigateToSection('${kpi.section}')">
                    <div class="dashboard-stat-icon ${kpi.icon}">
                        ${iconSvg}
                    </div>
                    <div class="dashboard-stat-content">
                        <div class="dashboard-stat-value loading" id="dashboard-stat-${kpi.id}">-</div>
                        <div class="dashboard-stat-label">${kpi.label}</div>
                    </div>
                </div>
            `;
        }).join('');
    }
};
