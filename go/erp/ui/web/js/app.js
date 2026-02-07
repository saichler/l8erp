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
        window.location.href = 'l8ui/login/index.html';
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

        // If unauthorized, redirect to login
        if (response.status === 401) {
            sessionStorage.removeItem('bearerToken');
            window.location.href = 'l8ui/login/index.html';
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
