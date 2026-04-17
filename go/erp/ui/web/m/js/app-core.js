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
/**
 * Mobile App Core - Navigation and initialization
 */
(function() {
    'use strict';

    // Section URL mappings
    // Modules with nav config (financial, hcm, scm, etc.) are handled by
    // Layer8MNav via _loadDashboardForModule — no static HTML needed.
    const SECTIONS = {
        'dashboard': 'sections/dashboard.html',
        'system': 'sections/system.html'
    };

    let currentSection = 'dashboard';
    let sectionCache = {};

    // Global showErrorAndLogout for layer8d-module-filter.js compatibility
    window.showErrorAndLogout = function(message, detail) {
        if (typeof Layer8MAuth !== 'undefined') {
            Layer8MAuth.showErrorAndLogout(message, detail);
        } else {
            alert(message + (detail ? '\n\n' + detail : ''));
            window.location.href = '/l8ui/login/';
        }
    };

    window.MobileApp = {
        /**
         * Initialize the app
         */
        async init() {
            // Check authentication
            if (!Layer8MAuth.requireAuth()) return;

            // Load configuration
            await Layer8MConfig.load();

            // Load shared desktop config (needed by Layer8DModuleFilter)
            await Layer8DConfig.load();

            // Set user info
            this.updateUserInfo();

            // Get auth token for API calls
            const token = Layer8MAuth.getBearerToken();

            // Load currency cache for Money form fields
            try {
                const query = encodeURIComponent(JSON.stringify({ text: 'select * from Currency where isActive=true' }));
                const resp = await fetch(`/erp/40/Currency?body=${query}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    if (data.list && window.Layer8DUtils) Layer8DUtils.setCurrencyCache(data.list);
                }
            } catch (e) { console.warn('Failed to load currencies:', e); }

            // Load exchange rate cache for currency conversion
            try {
                const xrQuery = encodeURIComponent(JSON.stringify({ text: 'select * from ExchangeRate' }));
                const xrResp = await fetch(`/erp/40/XchgRate?body=${xrQuery}`, {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                if (xrResp.ok) {
                    const xrData = await xrResp.json();
                    if (xrData.list && window.Layer8DUtils) Layer8DUtils.setExchangeRateCache(xrData.list);
                }
            } catch (e) { console.warn('Failed to load exchange rates:', e); }

            // Load per-type action permissions for the current user
            try {
                const permResp = await fetch('/permissions', {
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                if (permResp.ok) {
                    window.Layer8DPermissions = await permResp.json();
                }
            } catch (e) { console.warn('Failed to load permissions:', e); }

            // Load module configuration — blocks app if server not ready
            if (typeof Layer8DModuleFilter !== 'undefined') {
                const configLoaded = await Layer8DModuleFilter.load(token);
                if (!configLoaded) return; // logout already triggered
                this.applyModuleFilter();
            }

            // Initialize portal switcher in header
            if (typeof Layer8MPortalSwitcher !== 'undefined') {
                const headerActions = document.querySelector('.header-actions');
                if (headerActions) {
                    Layer8MPortalSwitcher.init({
                        container: headerActions,
                        insertBefore: document.getElementById('refresh-btn'),
                        apiPrefix: Layer8MConfig.getApiPrefix(),
                        currentPath: window.location.pathname
                    });
                }
            }

            // Initialize mobile AI chat bubble
            if (typeof L8AgentBubbleMobile !== 'undefined') {
                L8AgentBubbleMobile.init({ chatEndpoint: '/120/AgntChat' });
            }

            // Setup navigation
            this.initSidebar();

            // Setup refresh button
            document.getElementById('refresh-btn')?.addEventListener('click', () => {
                this.loadSection(currentSection, true);
            });

            // Load initial section from hash or default
            const hash = window.location.hash.slice(1);
            const section = SECTIONS[hash] ? hash : 'dashboard';
            await this.loadSection(section);

            // Handle hash changes
            window.addEventListener('hashchange', () => {
                const newSection = window.location.hash.slice(1);
                if (SECTIONS[newSection] && newSection !== currentSection) {
                    this.loadSection(newSection);
                }
            });
        },

        /**
         * Update user info in UI
         */
        updateUserInfo() {
            const username = Layer8MAuth.getUsername();
            const initial = username.charAt(0).toUpperCase();

            document.getElementById('user-name').textContent = username;
            document.getElementById('user-avatar').textContent = initial;
        },

        /**
         * Initialize sidebar
         */
        initSidebar() {
            const menuToggle = document.getElementById('menu-toggle');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');

            menuToggle?.addEventListener('click', () => this.openSidebar());
            overlay?.addEventListener('click', () => this.closeSidebar());

            // Sidebar navigation items
            document.querySelectorAll('.sidebar-item[data-section]').forEach(item => {
                item.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const section = item.dataset.section;
                    const module = item.dataset.module;
                    this.closeSidebar();
                    await this.loadSection(section);
                    // If item has a module, navigate to it after loading the section
                    if (module && window.Layer8MNav) {
                        Layer8MNav.navigateToModule(module);
                    }
                });
            });
        },

        /**
         * Open sidebar
         */
        openSidebar() {
            document.getElementById('sidebar')?.classList.add('open');
            document.getElementById('sidebar-overlay')?.classList.add('visible');
            document.body.style.overflow = 'hidden';
        },

        /**
         * Close sidebar
         */
        closeSidebar() {
            document.getElementById('sidebar')?.classList.remove('open');
            document.getElementById('sidebar-overlay')?.classList.remove('visible');
            document.body.style.overflow = '';
        },

        /**
         * Load a section
         */
        async loadSection(section, forceReload = false) {
            // Modules with nav config use the dashboard + Layer8MNav instead of static HTML
            if (section !== 'dashboard' && window.LAYER8M_NAV_CONFIG && LAYER8M_NAV_CONFIG[section]) {
                await this._loadDashboardForModule(section, forceReload);
                return;
            }

            const sectionUrl = SECTIONS[section];
            if (!sectionUrl) {
                console.error('Unknown section:', section);
                return;
            }

            // Update navigation state
            this.updateNavState(section);

            const contentArea = document.getElementById('content-area');
            if (!contentArea) return;

            // Show loading
            contentArea.style.opacity = '0.5';

            try {
                // Check cache
                if (!forceReload && sectionCache[section]) {
                    contentArea.innerHTML = sectionCache[section];
                } else {
                    const response = await fetch(sectionUrl + '?t=' + Date.now());
                    if (!response.ok) throw new Error('Failed to load section');
                    const html = await response.text();
                    sectionCache[section] = html;
                    contentArea.innerHTML = html;
                }

                // Execute scripts
                this.executeScripts(contentArea);

                // Initialize section
                this.initSection(section);

                currentSection = section;
                window.location.hash = section;

                // Scroll to top
                contentArea.scrollTop = 0;

            } catch (error) {
                console.error('Error loading section:', error);
                contentArea.innerHTML = `
                    <div class="empty-state">
                        <span class="empty-state-icon">&#x26A0;</span>
                        <h4 class="empty-state-title">Failed to load</h4>
                        <p class="empty-state-message">Please try again</p>
                        <button class="btn btn-primary" onclick="MobileApp.loadSection('${section}', true)">Retry</button>
                    </div>
                `;
            }

            contentArea.style.opacity = '1';
        },

        /**
         * Load dashboard and navigate to a module via Layer8MNav
         */
        async _loadDashboardForModule(moduleKey, forceReload) {
            this.updateNavState(moduleKey);

            const contentArea = document.getElementById('content-area');
            if (!contentArea) return;

            contentArea.style.opacity = '0.5';

            try {
                // Load dashboard HTML if not cached
                if (!forceReload && sectionCache['dashboard']) {
                    contentArea.innerHTML = sectionCache['dashboard'];
                } else {
                    const response = await fetch(SECTIONS['dashboard'] + '?t=' + Date.now());
                    if (!response.ok) throw new Error('Failed to load dashboard');
                    const html = await response.text();
                    sectionCache['dashboard'] = html;
                    contentArea.innerHTML = html;
                }

                this.executeScripts(contentArea);
                this.initSection('dashboard');

                // Navigate directly to the module
                Layer8MNav.navigateToModule(moduleKey);

                currentSection = moduleKey;
                window.location.hash = moduleKey;
                contentArea.scrollTop = 0;
            } catch (error) {
                console.error('Error loading module:', error);
            }

            contentArea.style.opacity = '1';
        },

        /**
         * Update navigation active state
         */
        updateNavState(section) {
            // Sidebar
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === section) {
                    item.classList.add('active');
                }
            });
        },

        /**
         * Execute scripts loaded via innerHTML
         */
        executeScripts(container) {
            const scripts = container.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        },

        /**
         * Initialize section-specific code
         */
        initSection(section) {
            // Map section names to init function names
            const initFunctions = {
                'dashboard': 'initMobileDashboard',
                'system': 'initMobileSystem'
            };

            const initFn = initFunctions[section];
            if (initFn && typeof window[initFn] === 'function') {
                window[initFn]();
            }
        },

        /**
         * Get current section
         */
        getCurrentSection() {
            return currentSection;
        },

        /**
         * Logout
         */
        logout() {
            Layer8MAuth.logout();
        },

        /**
         * Apply module filter to sidebar - hide disabled modules
         */
        applyModuleFilter() {
            if (!window.Layer8DModuleFilter) return;
            document.querySelectorAll('.sidebar-item[data-section]').forEach(item => {
                const section = item.dataset.section;
                // dashboard and system are never filtered
                if (section === 'dashboard' || item.dataset.module === 'system') return;
                // Map sidebar section to module key
                const moduleKey = item.dataset.module || section;
                if (!Layer8DModuleFilter.isEnabled(moduleKey)) {
                    item.style.display = 'none';
                }
            });
        },

        /**
         * Switch to desktop version
         */
        switchToDesktop() {
            localStorage.setItem('preferDesktop', 'true');
            window.location.href = '../hcm/';
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => MobileApp.init());
    } else {
        MobileApp.init();
    }

})();
