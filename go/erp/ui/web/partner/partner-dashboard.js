/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — desktop dashboard
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    PTNR.dashboard = {
        render: function(container) {
            var partnerId = PTNR._scopeValue || '';

            container.innerHTML = '';
            Layer8DPortalDashboard.renderHeader(container, '🤝', 'Partner Portal', 'Your pipeline, sales, and commissions at a glance.');
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-dashboard-cards">' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">🔄</div>' +
                        '<div class="l8-portal-card-label">Active Leads</div>' +
                        '<div class="l8-portal-card-value" id="ptnr-lead-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">💼</div>' +
                        '<div class="l8-portal-card-label">Open Opportunities</div>' +
                        '<div class="l8-portal-card-value" id="ptnr-opp-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">📋</div>' +
                        '<div class="l8-portal-card-label">Active Quotations</div>' +
                        '<div class="l8-portal-card-value" id="ptnr-quote-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">💰</div>' +
                        '<div class="l8-portal-card-label">Commission Plans</div>' +
                        '<div class="l8-portal-card-value" id="ptnr-comm-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-quick-actions">' +
                    '<h3>Quick Actions</h3>' +
                    '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" onclick="PTNR.actions.registerLead()">Register Lead</button>' +
                    '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="PTNR._loadSection(\'pipeline\')">View Pipeline</button>' +
                '</div>');

            // CrmLead/CrmOpportunity don't have ownerId — query unscoped
            fetch_('/80/CrmLead', 'select * from CrmLead where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-lead-value');
                if (el) el.textContent = total + ' leads';
            });

            fetch_('/80/CrmOpp', 'select * from CrmOpportunity where status=1 limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-opp-value');
                if (el) el.textContent = total + ' open';
            });

            // SalesQuotation has no ownerId — query unscoped
            fetch_('/60/SalesQuote', 'select * from SalesQuotation where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-quote-value');
                if (el) el.textContent = total + ' active';
            });

            fetch_('/60/CommPlan', 'select * from SalesCommissionPlan where isActive=true limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-comm-value');
                if (el) el.textContent = total + ' plans';
            });
        }
    };
})();
