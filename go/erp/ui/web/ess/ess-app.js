/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Application Initialization
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    // Current employee state
    ESS.employeeId = '';
    ESS.employeeName = '';
    ESS.currentSection = 'dashboard';

    // Logout
    function logout() {
        sessionStorage.removeItem('bearerToken');
        localStorage.removeItem('bearerToken');
        localStorage.removeItem('rememberedUser');
        window.location.href = 'l8ui/login/index.html';
    }
    window.logout = logout;

    // Get auth headers
    function getAuthHeaders() {
        var bearerToken = sessionStorage.getItem('bearerToken');
        return {
            'Authorization': bearerToken ? 'Bearer ' + bearerToken : '',
            'Content-Type': 'application/json'
        };
    }
    window.getAuthHeaders = getAuthHeaders;

    // Load a section into the content area
    ESS.loadSection = function(sectionKey) {
        var contentArea = document.getElementById('ess-content-area');
        if (!contentArea) return;

        ESS.currentSection = sectionKey;

        // Update active nav
        var navLinks = document.querySelectorAll('.ess-nav-link');
        navLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionKey);
        });

        if (sectionKey === 'dashboard') {
            ESS.dashboard.render(contentArea);
            return;
        }

        // Render a section with service tabs and table
        var section = ESS.sections[sectionKey];
        if (!section) {
            contentArea.innerHTML = '<p>Section not found.</p>';
            return;
        }

        var services = section.services;
        var defaultSvc = services[0];

        // Build tabs
        var tabsHtml = '<div class="ess-service-tabs">';
        services.forEach(function(svc, i) {
            var activeClass = i === 0 ? ' active' : '';
            tabsHtml += '<button class="ess-service-tab' + activeClass + '" data-service="' + svc.key + '" data-model="' + svc.model + '">' +
                '<span class="ess-tab-icon">' + (svc.icon || '') + '</span> ' + svc.label + '</button>';
        });
        tabsHtml += '</div>';

        contentArea.innerHTML = '<div class="ess-section">' +
            '<h2 class="ess-section-title">' + section.label + '</h2>' +
            tabsHtml +
            '<div id="ess-table-container"></div>' +
        '</div>';

        // Wire tab clicks
        var tabs = contentArea.querySelectorAll('.ess-service-tab');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                tabs.forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                var model = tab.getAttribute('data-model');
                var svcKey = tab.getAttribute('data-service');
                var svc = services.find(function(s) { return s.key === svcKey; });
                ESS._renderTable(svc);
            });
        });

        // Render default service table
        ESS._renderTable(defaultSvc);
    };

    // Look up the HCM form definition for a model via the service registry
    ESS._getFormDef = function(model) {
        return Layer8DServiceRegistry.getFormDef('HCM', model);
    };

    // Build a serviceConfig object for Layer8DFormsModal
    ESS._getServiceConfig = function(svc) {
        var pkField = ESS.primaryKeys[svc.model] || 'id';
        return {
            endpoint: Layer8DConfig.resolveEndpoint(svc.endpoint),
            primaryKey: pkField,
            modelName: svc.model
        };
    };

    // Render a service view — inline detail (single record) or table
    ESS._renderTable = function(svc) {
        var container = document.getElementById('ess-table-container');
        if (!container || !svc) return;

        container.innerHTML = '';

        // Single-record services: fetch and show inline using l8ui generic component
        if (svc.singleRecord) {
            ESS._renderSingleRecord(svc, container);
            return;
        }

        var columns = ESS.columns[svc.model];
        if (!columns) {
            container.innerHTML = '<p>No column definitions for ' + svc.model + '.</p>';
            return;
        }

        var pkField = ESS.primaryKeys[svc.model] || 'id';

        var table = new Layer8DTable({
            containerId: 'ess-table-container',
            columns: columns,
            modelName: svc.model,
            endpoint: Layer8DConfig.resolveEndpoint(svc.endpoint),
            serverSide: true,
            readOnly: svc.readOnly || false,
            pageSize: 15,
            getItemId: function(item) { return item[pkField] || ''; },
            onRowClick: function(item) {
                ESS._showDetail(svc, item);
            }
        });

        // Apply employee-scoped filtering for non-shared data
        var sharedModels = ['Holiday', 'BenefitPlan'];
        if (ESS.employeeId && sharedModels.indexOf(svc.model) === -1) {
            table.setBaseWhereClause("employeeId='" + ESS.employeeId + "'");
        }

        table.init();
        ESS._currentTable = table;
    };

    // Render a single record inline using the l8ui generic inline form component
    ESS._renderSingleRecord = function(svc, container) {
        var where = ESS.employeeId ? " where employeeId='" + ESS.employeeId + "'" : '';
        var query = 'select * from ' + svc.model + where + ' limit 1 page 0';
        var body = encodeURIComponent(JSON.stringify({ text: query }));
        var endpoint = Layer8DConfig.resolveEndpoint(svc.endpoint);

        container.innerHTML = '<p style="padding:16px;">Loading...</p>';

        fetch(endpoint + '?body=' + body, {
            headers: getAuthHeaders()
        }).then(function(r) { return r.ok ? r.json() : null; })
          .then(function(data) {
              if (!data || !data.list || data.list.length === 0) {
                  container.innerHTML = '<p style="padding:16px;">No data found.</p>';
                  return;
              }
              var item = data.list[0];
              var formDef = ESS._getFormDef(svc.model);
              if (!formDef) {
                  container.innerHTML = '<p style="padding:16px;">No form definition for ' + svc.model + '.</p>';
                  return;
              }
              var serviceConfig = ESS._getServiceConfig(svc);
              Layer8DFormsInline.renderViewForm(container, serviceConfig, formDef, item);
          }).catch(function() {
              container.innerHTML = '<p style="padding:16px;">Failed to load data.</p>';
          });
    };

    // Show detail popup — uses the existing l8ui Layer8DFormsModal
    ESS._showDetail = function(svc, item) {
        var formDef = ESS._getFormDef(svc.model);
        if (!formDef) return;

        var serviceConfig = ESS._getServiceConfig(svc);
        var pkField = ESS.primaryKeys[svc.model] || 'id';
        var itemId = item[pkField];

        // Writable models use edit form, read-only use view form
        if (!svc.readOnly && ESS.forms[svc.model]) {
            Layer8DFormsModal.openEditForm(serviceConfig, formDef, itemId, function() {
                if (ESS._currentTable) ESS._currentTable.refresh();
            });
        } else {
            Layer8DFormsModal.openViewForm(serviceConfig, formDef, item);
        }
    };

    // Initialize ESS portal on DOM ready
    document.addEventListener('DOMContentLoaded', async function() {
        // Load config
        if (typeof Layer8DConfig !== 'undefined') {
            await Layer8DConfig.load();
        }

        // Check bearer token
        var bearerToken = sessionStorage.getItem('bearerToken');
        if (!bearerToken) {
            window.location.href = 'l8ui/login/index.html';
            return;
        }

        localStorage.setItem('bearerToken', bearerToken);
        window.bearerToken = bearerToken;

        // Set username
        var username = sessionStorage.getItem('currentUser') || 'Employee';
        ESS.employeeName = username;
        var usernameEl = document.querySelector('.ess-username');
        if (usernameEl) usernameEl.textContent = username;

        // Load permissions
        try {
            var permResp = await fetch('/permissions', {
                headers: { 'Authorization': 'Bearer ' + bearerToken, 'Content-Type': 'application/json' }
            });
            if (permResp.ok) {
                window.Layer8DPermissions = await permResp.json();
            }
        } catch (e) { console.warn('Failed to load permissions:', e); }

        // Resolve employee ID from username
        // The ESS user's userId should map to an employee record
        ESS.employeeId = username;

        // Build nav links
        var navMenu = document.querySelector('.ess-nav-menu');
        if (navMenu && ESS.nav) {
            var navHtml = '';
            ESS.nav.forEach(function(item) {
                var activeClass = item.key === 'dashboard' ? ' active' : '';
                navHtml += '<li><a href="#" data-section="' + item.key + '" class="ess-nav-link' + activeClass + '">' +
                    '<span class="ess-nav-icon">' + item.icon + '</span>' +
                    '<span>' + item.label + '</span>' +
                '</a></li>';
            });
            navMenu.innerHTML = navHtml;

            // Wire nav click handlers
            navMenu.querySelectorAll('.ess-nav-link').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    var section = this.getAttribute('data-section');
                    ESS.loadSection(section);
                });
            });
        }

        // Load default section
        ESS.loadSection('dashboard');
    });
})();
