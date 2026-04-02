/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Customer Portal Desktop Dashboard
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    CUST.dashboard = {
        render: function(container) {
            var customerId = CUST._scopeValue || '';

            container.innerHTML = '';
            Layer8DPortalDashboard.renderHeader(container, '🛒', 'Customer Portal', 'View your orders, invoices, and support cases.');
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-dashboard-cards">' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">🛒</div>' +
                        '<div class="l8-portal-card-label">Active Orders</div>' +
                        '<div class="l8-portal-card-value" id="cust-d-orders-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">📄</div>' +
                        '<div class="l8-portal-card-label">Open Invoices</div>' +
                        '<div class="l8-portal-card-value" id="cust-d-invoices-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">🚚</div>' +
                        '<div class="l8-portal-card-label">In Transit</div>' +
                        '<div class="l8-portal-card-value" id="cust-d-deliveries-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">🎧</div>' +
                        '<div class="l8-portal-card-label">Open Cases</div>' +
                        '<div class="l8-portal-card-value" id="cust-d-cases-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-quick-actions">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-action-buttons">' +
                        '<button class="l8-portal-action-btn l8-portal-action-btn-primary" onclick="CUST.loadSection(\'orders\')">View Orders</button>' +
                        '<button class="l8-portal-action-btn l8-portal-action-btn-secondary" onclick="CUST.loadSection(\'support\')">Open Support Case</button>' +
                        '<button class="l8-portal-action-btn l8-portal-action-btn-secondary" onclick="CUST.loadSection(\'billing\')">View Invoices</button>' +
                    '</div>' +
                '</div>');

            var w = sw('customerId', customerId, false);
            var wp = sw('customerId', customerId, true);

            // Active orders (status 2=Confirmed or 3=In Progress)
            fetch_('/60/SalesOrder', 'select * from SalesOrder where ' + wp + '(status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-d-orders-value');
                if (el) el.textContent = total + ' orders';
            });

            // Open invoices (status 2=Submitted or 3=Approved or 6=Overdue)
            fetch_('/40/SalesInv', 'select * from SalesInvoice where ' + wp + '(status=2 or status=3 or status=6) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-d-invoices-value');
                if (el) el.textContent = total + ' invoices';
            });

            // Deliveries in transit (status 4=Shipped)
            fetch_('/60/DlvryOrder', 'select * from SalesDeliveryOrder where ' + wp + 'status=4 limit 1 page 0', function(total) {
                var el = document.getElementById('cust-d-deliveries-value');
                if (el) el.textContent = total + ' shipments';
            });

            // Open support cases (status 1=New or 2=In Progress) — CrmCase uses accountId, not customerId
            fetch_('/80/CrmCase', 'select * from CrmCase where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-d-cases-value');
                if (el) el.textContent = total + ' cases';
            });
        }
    };
})();
