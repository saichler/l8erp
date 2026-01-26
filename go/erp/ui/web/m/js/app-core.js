/**
 * Mobile App Core - Navigation and initialization
 */
(function() {
    'use strict';

    // Section URL mappings - All ERP modules matching desktop version
    const SECTIONS = {
        // Dashboard
        'dashboard': 'sections/dashboard.html',

        // Financial Management
        'financial': 'sections/financial.html',

        // Human Capital Management (HCM)
        'hcm-employees': 'sections/hcm/employees.html',
        'hcm-organization': 'sections/hcm/organization.html',
        'hcm-payroll': 'sections/hcm/payroll.html',
        'hcm-benefits': 'sections/hcm/benefits.html',
        'hcm-time': 'sections/hcm/time.html',
        'hcm-talent': 'sections/hcm/talent.html',
        'hcm-learning': 'sections/hcm/learning.html',
        'hcm-compensation': 'sections/hcm/compensation.html',

        // Supply Chain Management
        'scm': 'sections/scm.html',

        // Manufacturing
        'manufacturing': 'sections/manufacturing.html',

        // Sales & Distribution
        'sales': 'sections/sales.html',

        // Customer Relationship Management
        'crm': 'sections/crm.html',

        // Project Management
        'projects': 'sections/projects.html',

        // Business Intelligence
        'bi': 'sections/bi.html',

        // Document Management
        'documents': 'sections/documents.html',

        // E-Commerce
        'ecommerce': 'sections/ecommerce.html',

        // Compliance & Risk Management
        'compliance': 'sections/compliance.html',

        // System Administration
        'system': 'sections/system.html'
    };

    // Primary sections shown in bottom nav
    const PRIMARY_SECTIONS = ['dashboard', 'hcm-employees', 'hcm-time'];

    let currentSection = 'dashboard';
    let sectionCache = {};

    window.MobileApp = {
        /**
         * Initialize the app
         */
        async init() {
            // Check authentication
            if (!MobileAuth.requireAuth()) return;

            // Load configuration
            await MobileConfig.load();

            // Set user info
            this.updateUserInfo();

            // Setup navigation
            this.initNavigation();
            this.initSidebar();
            this.initMoreDrawer();

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
            const username = MobileAuth.getUsername();
            const initial = username.charAt(0).toUpperCase();

            document.getElementById('user-name').textContent = username;
            document.getElementById('user-avatar').textContent = initial;
        },

        /**
         * Initialize bottom navigation
         */
        initNavigation() {
            document.querySelectorAll('.nav-item[data-section]').forEach(item => {
                item.addEventListener('click', (e) => {
                    const section = item.dataset.section;
                    if (section === 'more') {
                        e.preventDefault();
                        this.openMoreDrawer();
                    } else if (SECTIONS[section]) {
                        e.preventDefault();
                        this.loadSection(section);
                    }
                });
            });
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
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = item.dataset.section;
                    this.closeSidebar();
                    this.loadSection(section);
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
         * Initialize more drawer
         */
        initMoreDrawer() {
            const drawer = document.getElementById('more-drawer');
            const closeBtn = drawer?.querySelector('.close-drawer-btn');

            closeBtn?.addEventListener('click', () => this.closeMoreDrawer());

            drawer?.addEventListener('click', (e) => {
                if (e.target === drawer) this.closeMoreDrawer();
            });

            // More menu items
            document.querySelectorAll('.more-menu-item[data-section]').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = item.dataset.section;
                    this.closeMoreDrawer();
                    this.loadSection(section);
                });
            });
        },

        /**
         * Open more drawer
         */
        openMoreDrawer() {
            document.getElementById('more-drawer')?.classList.add('open');
            document.body.style.overflow = 'hidden';
        },

        /**
         * Close more drawer
         */
        closeMoreDrawer() {
            document.getElementById('more-drawer')?.classList.remove('open');
            document.body.style.overflow = '';
        },

        /**
         * Load a section
         */
        async loadSection(section, forceReload = false) {
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
         * Update navigation active state
         */
        updateNavState(section) {
            // Bottom nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === section) {
                    item.classList.add('active');
                }
            });

            // If not in primary sections, highlight "More"
            if (!PRIMARY_SECTIONS.includes(section)) {
                document.querySelector('.nav-item-more')?.classList.add('active');
            }

            // Sidebar
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === section) {
                    item.classList.add('active');
                }
            });

            // More menu
            document.querySelectorAll('.more-menu-item').forEach(item => {
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
                'hcm-employees': 'initMobileEmployees',
                'hcm-organization': 'initMobileOrganization',
                'hcm-payroll': 'initMobilePayroll',
                'hcm-benefits': 'initMobileBenefits',
                'hcm-time': 'initMobileTime',
                'hcm-talent': 'initMobileTalent',
                'hcm-learning': 'initMobileLearning',
                'hcm-compensation': 'initMobileCompensation'
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
            MobileAuth.logout();
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
