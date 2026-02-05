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
    // Load all KPI stats in parallel
    async loadAll() {
        const config = window.DashboardConfig;
        if (!config || !config.kpis) {
            console.error('DashboardConfig not found');
            return;
        }

        // Load all KPIs in parallel
        const promises = config.kpis.map(kpi => this.loadKPI(kpi));
        await Promise.all(promises);
    },

    // Load a single KPI
    async loadKPI(kpi) {
        const element = document.getElementById(`dashboard-stat-${kpi.id}`);
        if (!element) {
            return;
        }

        try {
            const body = encodeURIComponent(JSON.stringify({ text: kpi.query }));
            const endpoint = Layer8DConfig.resolveEndpoint(kpi.endpoint);
            const url = endpoint + '?body=' + body;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(typeof getAuthHeaders === 'function' ? getAuthHeaders() : {})
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            let count = 0;
            if (data && data.metadata?.keyCount?.counts) {
                count = data.metadata.keyCount.counts[kpi.countField] || 0;
            }

            element.textContent = this.formatNumber(count);
            element.classList.remove('loading');
        } catch (error) {
            console.error(`Failed to load KPI ${kpi.id}:`, error);
            element.textContent = '0';
            element.classList.remove('loading');
        }
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
        if (typeof loadSection === 'function') {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === section) {
                    link.classList.add('active');
                }
            });
            // Load the section
            loadSection(section);
        }
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
