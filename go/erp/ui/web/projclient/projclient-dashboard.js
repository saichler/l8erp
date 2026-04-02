/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Project Client Portal — desktop dashboard
(function() {
    'use strict';

    var PRJC = window.PRJC = window.PRJC || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    PRJC.dashboard = {
        render: function(container) {
            var clientId = PRJC._scopeValue || '';

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend', '<div class="l8-portal-dashboard">' +
                '<div class="l8-portal-dashboard-cards">' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">📁</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Active Projects</h3>' +
                            '<div class="l8-portal-card-value" id="prjc-proj-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">📊</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Status Reports</h3>' +
                            '<div class="l8-portal-card-value" id="prjc-status-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">💰</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Open Invoices</h3>' +
                            '<div class="l8-portal-card-value" id="prjc-inv-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">⏱</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Recent Timesheets</h3>' +
                            '<div class="l8-portal-card-value" id="prjc-ts-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-dashboard-quick">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-quick-actions">' +
                        '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" onclick="PRJC._loadSection(\'projects\')">View Projects</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="PRJC._loadSection(\'budget\')">View Budget</button>' +
                    '</div>' +
                '</div>' +
            '</div>');

            var wp = sw('customerId', clientId, true);

            fetch_('/90/PrjProj', 'select * from PrjProject where ' + wp + '(status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-proj-value');
                if (el) el.textContent = total + ' active';
            });

            // PrjStatusReport has no customerId — query unscoped
            fetch_('/90/PrjStatus', 'select * from PrjStatusReport limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-status-value');
                if (el) el.textContent = total + ' reports';
            });

            fetch_('/90/PrjInvoice', 'select * from PrjProjectInvoice where ' + wp + '(status=2 or status=3 or status=5) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-inv-value');
                if (el) el.textContent = total + ' open';
            });

            fetch_('/90/PrjTmSheet', 'select * from PrjTimesheet where (status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('prjc-ts-value');
                if (el) el.textContent = total + ' recent';
            });
        }
    };
})();
