/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile ESS Portal Application Initialization
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    window.MobileESS = {
        currentSection: 'dashboard',
        _currentTable: null,

        async init() {
            // Check authentication
            if (!Layer8MAuth.requireAuth()) return;

            // Load configuration
            if (typeof Layer8MConfig !== 'undefined') await Layer8MConfig.load();
            if (typeof Layer8DConfig !== 'undefined') await Layer8DConfig.load();

            // Set user info
            var username = Layer8MAuth.getUsername();
            ESS.employeeName = username;
            ESS.employeeId = username;

            var nameEl = document.getElementById('user-name');
            if (nameEl) nameEl.textContent = username;
            var avatarEl = document.getElementById('user-avatar');
            if (avatarEl) avatarEl.textContent = username.charAt(0).toUpperCase();

            // Load permissions
            try {
                var token = Layer8MAuth.getBearerToken();
                var permResp = await fetch('/permissions', {
                    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
                });
                if (permResp.ok) {
                    window.Layer8DPermissions = await permResp.json();
                }
            } catch (e) { console.warn('Failed to load permissions:', e); }

            // Build sidebar navigation
            this._buildNav();

            // Setup sidebar toggle
            this._initSidebar();

            // Setup refresh button
            var refreshBtn = document.getElementById('refresh-btn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    MobileESS.loadSection(MobileESS.currentSection);
                });
            }

            // Load dashboard
            this.loadSection('dashboard');
        },

        _buildNav: function() {
            var navContainer = document.getElementById('ess-sidebar-nav');
            if (!navContainer || !ESS.nav) return;

            var html = '<div class="ess-nav-section">' +
                '<div class="ess-nav-section-title">Menu</div>';

            ESS.nav.forEach(function(item) {
                var activeClass = item.key === 'dashboard' ? ' active' : '';
                html += '<button class="ess-nav-item' + activeClass + '" data-section="' + item.key + '">' +
                    '<span class="ess-nav-icon">' + item.icon + '</span>' +
                    item.label +
                '</button>';
            });

            html += '</div>';
            navContainer.innerHTML = html;

            // Wire click handlers
            navContainer.querySelectorAll('.ess-nav-item').forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var section = this.getAttribute('data-section');
                    MobileESS.closeSidebar();
                    MobileESS.loadSection(section);
                });
            });
        },

        _initSidebar: function() {
            var menuToggle = document.getElementById('menu-toggle');
            var overlay = document.getElementById('sidebar-overlay');
            if (menuToggle) menuToggle.addEventListener('click', function() { MobileESS.openSidebar(); });
            if (overlay) overlay.addEventListener('click', function() { MobileESS.closeSidebar(); });
        },

        openSidebar: function() {
            var sidebar = document.getElementById('sidebar');
            var overlay = document.getElementById('sidebar-overlay');
            if (sidebar) sidebar.classList.add('open');
            if (overlay) overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        },

        closeSidebar: function() {
            var sidebar = document.getElementById('sidebar');
            var overlay = document.getElementById('sidebar-overlay');
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('visible');
            document.body.style.overflow = '';
        },

        loadSection: function(sectionKey) {
            var contentArea = document.getElementById('content-area');
            if (!contentArea) return;

            this.currentSection = sectionKey;

            // Update active nav
            document.querySelectorAll('.ess-nav-item').forEach(function(btn) {
                btn.classList.toggle('active', btn.getAttribute('data-section') === sectionKey);
            });

            if (sectionKey === 'dashboard') {
                ESS.mobileDashboard.render(contentArea);
                return;
            }

            var section = ESS.sections[sectionKey];
            if (!section) {
                contentArea.innerHTML = '<div class="empty-state"><h4 class="empty-state-title">Section not found</h4></div>';
                return;
            }

            var services = section.services;
            var tabsHtml = '<div class="ess-section-header"><h2 class="ess-section-title">' + section.label + '</h2></div>';
            tabsHtml += '<div class="ess-service-tabs">';
            services.forEach(function(svc, i) {
                var activeClass = i === 0 ? ' active' : '';
                tabsHtml += '<button class="ess-service-tab' + activeClass + '" data-service="' + svc.key + '">' +
                    (svc.icon || '') + ' ' + svc.label + '</button>';
            });
            tabsHtml += '</div>';
            tabsHtml += '<div id="ess-table-container"></div>';

            contentArea.innerHTML = tabsHtml;

            // Wire tab clicks
            var tabs = contentArea.querySelectorAll('.ess-service-tab');
            tabs.forEach(function(tab) {
                tab.addEventListener('click', function() {
                    tabs.forEach(function(t) { t.classList.remove('active'); });
                    tab.classList.add('active');
                    var svcKey = tab.getAttribute('data-service');
                    var svc = services.find(function(s) { return s.key === svcKey; });
                    MobileESS._renderTable(svc);
                });
            });

            // Render default
            this._renderTable(services[0]);
        },

        _renderTable: function(svc) {
            var container = document.getElementById('ess-table-container');
            if (!container || !svc) return;

            container.innerHTML = '';

            // Single-record services: fetch and show inline
            if (svc.singleRecord) {
                this._renderSingleRecord(svc, container);
                return;
            }

            var columns = ESS.columns[svc.model];
            if (!columns) {
                container.innerHTML = '<div class="empty-state"><p class="empty-state-message">No columns for ' + svc.model + '</p></div>';
                return;
            }

            var pkField = ESS.primaryKeys[svc.model] || 'id';

            var tableConfig = {
                columns: columns,
                modelName: svc.model,
                endpoint: Layer8DConfig.resolveEndpoint(svc.endpoint),
                serverSide: true,
                rowsPerPage: 15,
                onCardClick: function(item) {
                    MobileESS._showDetail(svc, item);
                }
            };

            // Apply employee-scoped filtering
            var sharedModels = ['Holiday', 'BenefitPlan'];
            if (ESS.employeeId && sharedModels.indexOf(svc.model) === -1) {
                tableConfig.baseWhereClause = "employeeId='" + ESS.employeeId + "'";
            }

            this._currentTable = new Layer8MTable('ess-table-container', tableConfig);
        },

        _renderSingleRecord: function(svc, container) {
            var where = ESS.employeeId ? " where employeeId='" + ESS.employeeId + "'" : '';
            var query = 'select * from ' + svc.model + where + ' limit 1 page 0';
            var body = encodeURIComponent(JSON.stringify({ text: query }));
            var endpoint = Layer8DConfig.resolveEndpoint(svc.endpoint);

            container.innerHTML = '<div class="loading">Loading</div>';

            fetch(endpoint + '?body=' + body, {
                headers: MobileESS._getHeaders()
            }).then(function(r) { return r.ok ? r.json() : null; })
              .then(function(data) {
                  if (!data || !data.list || data.list.length === 0) {
                      container.innerHTML = '<div class="empty-state"><p class="empty-state-message">No data found.</p></div>';
                      return;
                  }
                  var item = data.list[0];
                  var formDef = MobileESS._getFormDef(svc.model);
                  if (!formDef) {
                      container.innerHTML = '<div class="empty-state"><p class="empty-state-message">No form definition for ' + svc.model + '</p></div>';
                      return;
                  }
                  // Render read-only form inline in the container
                  var html = Layer8MForms.renderForm(formDef, item, true);
                  container.innerHTML = '<div style="padding:8px 0;">' + html + '</div>';
                  Layer8MForms.initFormFields(container, formDef);
                  container.querySelectorAll('input, select, textarea').forEach(function(el) {
                      el.disabled = true;
                  });
              }).catch(function() {
                  container.innerHTML = '<div class="empty-state"><p class="empty-state-message">Failed to load data.</p></div>';
              });
        },

        _showDetail: function(svc, item) {
            var formDef = this._getFormDef(svc.model);
            if (!formDef) return;

            var pkField = ESS.primaryKeys[svc.model] || 'id';
            var title = svc.label + ' Details';

            if (!svc.readOnly && ESS.forms[svc.model]) {
                // Editable — open edit form via Layer8MNavCrud pattern
                var serviceConfig = {
                    label: svc.label,
                    model: svc.model,
                    endpoint: svc.endpoint,
                    idField: pkField
                };
                window._Layer8MNavActiveTable = MobileESS._currentTable;
                Layer8MNavCrud.openServiceForm(serviceConfig, formDef, item);
            } else {
                // Read-only — render form in popup with all fields disabled
                var content = Layer8MForms.renderForm(formDef, item, true);
                Layer8MPopup.show({
                    title: title,
                    content: content,
                    size: 'large',
                    showFooter: false,
                    onShow: function(popup) {
                        Layer8MForms.initFormFields(popup.body, formDef);
                        popup.body.querySelectorAll('input, select, textarea').forEach(function(el) {
                            el.disabled = true;
                        });
                    }
                });
            }
        },

        _getFormDef: function(model) {
            if (typeof Layer8DServiceRegistry !== 'undefined') {
                return Layer8DServiceRegistry.getFormDef('HCM', model);
            }
            return null;
        },

        _getServiceConfig: function(svc) {
            var pkField = ESS.primaryKeys[svc.model] || 'id';
            return {
                endpoint: Layer8DConfig.resolveEndpoint(svc.endpoint),
                primaryKey: pkField,
                modelName: svc.model
            };
        },

        _getHeaders: function() {
            var token = Layer8MAuth.getBearerToken();
            return {
                'Authorization': token ? 'Bearer ' + token : '',
                'Content-Type': 'application/json'
            };
        },

        logout: function() {
            Layer8MAuth.logout();
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { MobileESS.init(); });
    } else {
        MobileESS.init();
    }
})();
