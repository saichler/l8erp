/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Partner Dashboard
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    PTNR.mobileDashboard = {
        render: function(container) {
            var partnerId = PTNR._scopeValue || '';

            container.innerHTML = '';
            Layer8DPortalDashboard.renderHeader(container, '🤝', 'Partner Portal', 'Your pipeline, sales, and commissions.');
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-m-dashboard-cards">' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🔄</div>' +
                        '<div class="l8-portal-m-card-label">Active Leads</div>' +
                        '<div class="l8-portal-m-card-value" id="ptnr-m-lead-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">💼</div>' +
                        '<div class="l8-portal-m-card-label">Open Opportunities</div>' +
                        '<div class="l8-portal-m-card-value" id="ptnr-m-opp-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">📋</div>' +
                        '<div class="l8-portal-m-card-label">Active Quotations</div>' +
                        '<div class="l8-portal-m-card-value" id="ptnr-m-quote-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">💰</div>' +
                        '<div class="l8-portal-m-card-label">Commission Plans</div>' +
                        '<div class="l8-portal-m-card-value" id="ptnr-m-comm-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-m-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-m-quick-actions">' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-primary" onclick="MobilePTNR.loadSection(\'pipeline\')">View Pipeline</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobilePTNR.loadSection(\'sales\')">View Sales</button>' +
                    '</div>' +
                '</div>');

            // CrmLead/CrmOpportunity don't have ownerId — query unscoped
            fetch_('/80/CrmLead', 'select * from CrmLead where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-m-lead-value');
                if (el) el.textContent = total + ' leads';
            });

            fetch_('/80/CrmOpp', 'select * from CrmOpportunity where status=1 limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-m-opp-value');
                if (el) el.textContent = total + ' open';
            });

            // SalesQuotation has no ownerId — query unscoped
            fetch_('/60/SalesQuote', 'select * from SalesQuotation where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-m-quote-value');
                if (el) el.textContent = total + ' active';
            });

            fetch_('/60/CommPlan', 'select * from SalesCommissionPlan where isActive=true limit 1 page 0', function(total) {
                var el = document.getElementById('ptnr-m-comm-value');
                if (el) el.textContent = total + ' plans';
            });
        }
    };
})();
