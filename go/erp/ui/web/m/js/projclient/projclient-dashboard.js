/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Project Client Dashboard
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    PRJC.mobileDashboard = {
        render: function(container) {
            var clientId = PRJC._scopeValue || '';

            container.innerHTML = '';
            Layer8DPortalDashboard.renderHeader(container, '📁', 'Project Client Portal', 'Your projects, budgets, and deliverables.');
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-m-dashboard-cards">' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">📁</div>' +
                        '<div class="l8-portal-m-card-label">Active Projects</div>' +
                        '<div class="l8-portal-m-card-value" id="prjc-m-proj-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">📊</div>' +
                        '<div class="l8-portal-m-card-label">Status Reports</div>' +
                        '<div class="l8-portal-m-card-value" id="prjc-m-status-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">💰</div>' +
                        '<div class="l8-portal-m-card-label">Open Invoices</div>' +
                        '<div class="l8-portal-m-card-value" id="prjc-m-inv-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">⏱</div>' +
                        '<div class="l8-portal-m-card-label">Recent Timesheets</div>' +
                        '<div class="l8-portal-m-card-value" id="prjc-m-ts-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-m-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-m-quick-actions">' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-primary" onclick="MobilePRJC.loadSection(\'projects\')">View Projects</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobilePRJC.loadSection(\'budget\')">View Budget</button>' +
                    '</div>' +
                '</div>');

            var wp = sw('customerId', clientId, true);

            fetch_('/90/PrjProj', 'select * from PrjProject where ' + wp + '(status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-m-proj-value');
                if (el) el.textContent = total + ' active';
            });

            // PrjStatusReport has no customerId — query unscoped
            fetch_('/90/PrjStatus', 'select * from PrjStatusReport limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-m-status-value');
                if (el) el.textContent = total + ' reports';
            });

            fetch_('/90/PrjInvoice', 'select * from PrjProjectInvoice where ' + wp + '(status=2 or status=3 or status=5) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-m-inv-value');
                if (el) el.textContent = total + ' open';
            });

            fetch_('/90/PrjTmSheet', 'select * from PrjTimesheet where (status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-m-ts-value');
                if (el) el.textContent = total + ' recent';
            });
        }
    };
})();
