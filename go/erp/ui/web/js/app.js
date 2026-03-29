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

    // If Layer8DPopup is available, show a blocking popup
    if (typeof Layer8DPopup !== 'undefined') {
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
    } else {
        // Fallback if popup not loaded yet
        alert(message + (detail ? '\n\n' + detail : ''));
        window.location.href = 'l8ui/login/index.html';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Load app configuration first
    if (typeof Layer8DConfig !== 'undefined') {
        await Layer8DConfig.load();
    }

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

    // Load currency cache for Money form fields
    try {
        const query = encodeURIComponent(JSON.stringify({ text: 'select * from Currency where isActive=true' }));
        const resp = await fetch(`/erp/40/Currency?body=${query}`, {
            headers: { 'Authorization': `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
        });
        if (resp.ok) {
            const data = await resp.json();
            if (data.list) Layer8DUtils.setCurrencyCache(data.list);
        }
    } catch (e) { console.warn('Failed to load currencies:', e); }

    // Load exchange rate cache for currency conversion
    try {
        const xrQuery = encodeURIComponent(JSON.stringify({ text: 'select * from ExchangeRate' }));
        const xrResp = await fetch(`/erp/40/XchgRate?body=${xrQuery}`, {
            headers: { 'Authorization': `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
        });
        if (xrResp.ok) {
            const xrData = await xrResp.json();
            if (xrData.list) Layer8DUtils.setExchangeRateCache(xrData.list);
        }
    } catch (e) { console.warn('Failed to load exchange rates:', e); }

    // Load per-type action permissions for the current user
    try {
        const permResp = await fetch('/permissions', {
            headers: { 'Authorization': `Bearer ${bearerToken}`, 'Content-Type': 'application/json' }
        });
        if (permResp.ok) {
            window.Layer8DPermissions = await permResp.json();
        }
    } catch (e) { console.warn('Failed to load permissions:', e); }

    // Load module configuration — blocks app if server not ready
    if (typeof Layer8DModuleFilter !== 'undefined') {
        const configLoaded = await Layer8DModuleFilter.load(bearerToken);
        if (!configLoaded) return; // logout already triggered
        Layer8DModuleFilter.applyToSidebar();
    }

    // Apply permission-based nav filtering (hide modules/services user can't GET)
    if (typeof Layer8DPermissionFilter !== 'undefined') {
        // Register resolver: maps section/module/service to model name via module configs
        const nsMap = {
            'hcm': 'HCM', 'financial': 'FIN', 'scm': 'SCM', 'sales': 'Sales',
            'manufacturing': 'MFG', 'crm': 'CRM', 'projects': 'Prj', 'bi': 'BI',
            'documents': 'DOC', 'ecommerce': 'ECOM', 'compliance': 'COMP'
        };
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

    // Initialize floating AI chat bubble
    if (typeof L8AgentBubble !== 'undefined') {
        L8AgentBubble.init({ chatEndpoint: '/120/AgntChat' });
    }

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
