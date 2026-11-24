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
// Main application initialization

// Get authentication headers with bearer token
function getAuthHeaders() {
    const bearerToken = sessionStorage.getItem('bearerToken');
    return {
        'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
        'Content-Type': 'application/json'
    };
}

// Utility function for making authenticated API calls
async function makeAuthenticatedRequest(url, options = {}) {
    const bearerToken = sessionStorage.getItem('bearerToken');

    if (!bearerToken) {
        console.error('No bearer token found');
        showErrorAndLogout('Your session has expired or is missing.', 'No authentication token was found. Please log in again.');
        return;
    }

    // Add Authorization header with bearer token
    const headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers: headers
        });

        // If unauthorized, show error and redirect to login
        if (response.status === 401) {
            showErrorAndLogout('Unauthorized — your session has expired.', 'The server returned 401 for endpoint: ' + url);
            return;
        }

        return response;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Logout function
function logout() {
    // Clear bearer token from sessionStorage and localStorage
    sessionStorage.removeItem('bearerToken');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('rememberedUser');

    // Redirect to login page
    window.location.href = 'l8ui/login/index.html';
}

// Show error popup before logging out — gives user visibility into what went wrong
function showErrorAndLogout(message, detail) {
    // Clear tokens immediately so no further API calls are attempted
    sessionStorage.removeItem('bearerToken');
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('rememberedUser');

    // Show a blocking popup (Layer8DPopup is required -- see erp-deps-check.js)
    {
        Layer8DPopup.show({
            title: 'Session Error',
            content: '<div style="padding:16px;">' +
                '<p style="margin-bottom:12px;font-size:15px;">' + Layer8DUtils.escapeHtml(message) + '</p>' +
                (detail ? '<pre style="background:var(--layer8d-bg-light);padding:12px;border-radius:6px;font-size:12px;max-height:200px;overflow:auto;white-space:pre-wrap;word-break:break-word;">' + Layer8DUtils.escapeHtml(detail) + '</pre>' : '') +
                '</div>',
            size: 'medium',
            showFooter: true,
            saveButtonText: 'Go to Login',
            showCancelButton: false,
            onSave: function() {
                Layer8DPopup.close();
                window.location.href = 'l8ui/login/index.html';
            }
        });
    }
}

// Fetch a startup resource the app cannot work without. Any failure throws
// (FailFastNoSilentFallback): a missing permissions map is read by l8ui as
// PERMISSIVE, and a missing currency cache breaks every Money field.
async function fetchRequiredJson(url, bearerToken, what) {
    const resp = await fetch(url, {
        headers: { 'Authorization': `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error(what + ': ' + url + ' returned HTTP ' + resp.status);
    const data = await resp.json();
    if (data === null || typeof data !== 'object') throw new Error(what + ': ' + url + ' did not return an object');
    return data;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Load app configuration first
    await Layer8DConfig.load();

    // Check if bearer token exists (user is logged in)
    // Using sessionStorage so session is cleared when browser tab is closed
    const bearerToken = sessionStorage.getItem('bearerToken');
    if (!bearerToken) {
        // No popup here — user simply hasn't logged in yet, redirect silently
        window.location.href = 'l8ui/login/index.html';
        return;
    }

    // Sync bearer token to localStorage so iframes can access it
    localStorage.setItem('bearerToken', bearerToken);
    // Also expose on window for iframes that check parent
    window.bearerToken = bearerToken;

    // Set username in header from current session
    const username = sessionStorage.getItem('currentUser') || 'Admin';
    document.querySelector('.username').textContent = username;

    // Initialize portal switcher (non-blocking)
    Layer8DPortalSwitcher.init({
        container: document.querySelector('.header-right'),
        insertBefore: document.querySelector('.user-menu'),
        apiPrefix: Layer8DConfig.getApiPrefix(),
        currentPath: window.location.pathname
    });

    // Required startup data: the per-type action permissions, then the
    // currency + exchange-rate caches (Money fields). A failure stops the app.
    try {
        // Permissions first: everything after it is decided by them.
        const perms = await fetchRequiredJson('/permissions', bearerToken, 'Permissions');
        window.Layer8DPermissions = perms;
        const canGet = (model) => Array.isArray(perms[model]) && perms[model].indexOf(5) !== -1;

        // Currency caches only for accounts allowed to read them (the server
        // answers an unpermitted read with an error); a fetch that is made
        // and fails stops the app.
        let currencies = [];
        if (canGet('Currency')) {
            const query = encodeURIComponent(JSON.stringify({ text: 'select * from Currency where isActive=true' }));
            currencies = (await fetchRequiredJson(`/erp/40/Currency?body=${query}`, bearerToken, 'Currency cache')).list || [];
        }
        Layer8DUtils.setCurrencyCache(currencies);

        let rates = [];
        if (canGet('ExchangeRate')) {
            const xrQuery = encodeURIComponent(JSON.stringify({ text: 'select * from ExchangeRate' }));
            rates = (await fetchRequiredJson(`/erp/40/XchgRate?body=${xrQuery}`, bearerToken, 'Exchange-rate cache')).list || [];
        }
        Layer8DUtils.setExchangeRateCache(rates);
    } catch (e) {
        console.error('ERP startup failed:', e);
        showErrorAndLogout('The application could not load required data.', e.message);
        throw e;
    }

    // Load module configuration — blocks app if server not ready
    const configLoaded = await Layer8DModuleFilter.load(bearerToken);
    if (!configLoaded) return; // logout already triggered
    Layer8DModuleFilter.applyToSidebar();

    // Apply permission-based nav filtering (hide modules/services user can't GET)
    {
        // Register resolver: maps section/module/service to model name via module configs
        // Section key -> the global that Layer8ModuleConfigFactory created, which
        // is literally `window[config.namespace]` -- so these must match each
        // module config's `namespace:` string EXACTLY, including case.
        //
        // Eight were wrong: MFG/CRM/BI/DOC/ECOM/COMP are actually
        // Mfg/Crm/Bi/Doc/Ecom/Comp, and lending + aia were missing outright.
        // A miss makes the resolver return null and sidebarModels[section]
        // empty, so Layer8DPermissionFilter had nothing to judge and left the
        // section visible for every account -- 8 of 13 sections were never
        // permission-filtered at all.
        const nsMap = {
            'hcm': 'HCM', 'financial': 'FIN', 'scm': 'SCM', 'sales': 'Sales',
            'manufacturing': 'Mfg', 'crm': 'Crm', 'projects': 'Prj', 'bi': 'Bi',
            'documents': 'Doc', 'ecommerce': 'Ecom', 'compliance': 'Comp',
            'lending': 'Lending'
        };
        // Fail loudly on drift instead of silently degrading to "show it"
        // (FailFastNoSilentFallback / ReportInfraBugs).
        Object.keys(nsMap).forEach(function(section) {
            if (!window[nsMap[section]]) {
                console.error('app.js nsMap: section "' + section + '" maps to window.' +
                    nsMap[section] + ', which is not defined -- that section cannot be ' +
                    'permission-filtered and will stay visible to every account.');
            }
        });
        Layer8DPermissionFilter.registerResolver(function(sectionKey, moduleKey, serviceKey) {
            var ns = window[nsMap[sectionKey]];
            if (!ns || !ns.modules || !ns.modules[moduleKey]) return null;
            var svc = ns.modules[moduleKey].services.find(function(s) { return s.key === serviceKey; });
            return svc ? svc.model : null;
        });

        // Build sidebar model map and apply
        var sidebarModels = {};
        Object.keys(nsMap).forEach(function(section) {
            var ns = window[nsMap[section]];
            if (!ns || !ns.modules) return;
            var models = [];
            Object.values(ns.modules).forEach(function(mod) {
                if (mod.services) mod.services.forEach(function(svc) { if (svc.model) models.push(svc.model); });
            });
            sidebarModels[section] = models;
        });
        Layer8DPermissionFilter.applyToSidebar(sidebarModels);
    }

    // Floating chat bubble (l8chat): users, groups and Tanto, the AI agent.
    // Desktop: before Layer8DWebSocket.init() (L8Chat rule).
    L8ChatBubble.init({ endpoints: ERP_CHAT_ENDPOINTS });

    // Initialize WebSocket for real-time updates
    Layer8DWebSocket.init();

    // Load default section (dashboard)
    loadSection('dashboard');

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Load the selected section
            const section = this.getAttribute('data-section');
            loadSection(section);
        });
    });

    // Parallax scroll effect for main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('scroll', function() {
            const scrollPosition = this.scrollTop;

            // Parallax for dashboard hero
            const dashboardHero = this.querySelector('.dashboard-hero .hero-illustration');
            if (dashboardHero) {
                const parallaxOffset = scrollPosition * 0.3;
                dashboardHero.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only handle valid anchor links (not just '#')
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
