/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Customer Dashboard
(function() {
    'use strict';

    var CUST = window.CUST = window.CUST || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    CUST.mobileDashboard = {
        render: function(container) {
            var customerId = CUST._scopeValue || '';

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-m-dashboard-cards">' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🛒</div>' +
                        '<div class="l8-portal-m-card-label">Active Orders</div>' +
                        '<div class="l8-portal-m-card-value" id="cust-m-orders-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">📄</div>' +
                        '<div class="l8-portal-m-card-label">Open Invoices</div>' +
                        '<div class="l8-portal-m-card-value" id="cust-m-invoices-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🚚</div>' +
                        '<div class="l8-portal-m-card-label">In Transit</div>' +
                        '<div class="l8-portal-m-card-value" id="cust-m-deliveries-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🎧</div>' +
                        '<div class="l8-portal-m-card-label">Open Cases</div>' +
                        '<div class="l8-portal-m-card-value" id="cust-m-cases-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-m-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-m-quick-actions">' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-primary" onclick="MobileCUST.loadSection(\'orders\')">View Orders</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobileCUST.loadSection(\'support\')">Get Support</button>' +
                    '</div>' +
                '</div>');

            var w = sw('customerId', customerId, false);
            var wp = sw('customerId', customerId, true);

            fetch_('/60/SalesOrder', 'select * from SalesOrder where ' + wp + '(status=2 or status=3) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-m-orders-value');
                if (el) el.textContent = total + ' orders';
            });

            fetch_('/40/SalesInv', 'select * from SalesInvoice where ' + wp + '(status=2 or status=3 or status=6) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-m-invoices-value');
                if (el) el.textContent = total + ' invoices';
            });

            fetch_('/60/DlvryOrder', 'select * from SalesDeliveryOrder where ' + wp + 'status=4 limit 1 page 0', function(total) {
                var el = document.getElementById('cust-m-deliveries-value');
                if (el) el.textContent = total + ' shipments';
            });

            // CrmCase uses accountId, not customerId
            fetch_('/80/CrmCase', 'select * from CrmCase where (status=1 or status=2) limit 1 page 0', function(total) {
                var el = document.getElementById('cust-m-cases-value');
                if (el) el.textContent = total + ' cases';
            });
        }
    };
})();
