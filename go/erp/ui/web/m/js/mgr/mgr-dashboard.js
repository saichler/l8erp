/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile Manager Dashboard
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    MGR.mobileDashboard = {
        render: function(container) {
            var managerId = MGR._scopeValue || '';

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-m-dashboard-cards">' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">👥</div>' +
                        '<div class="l8-portal-m-card-label">Team Members</div>' +
                        '<div class="l8-portal-m-card-value" id="mgr-m-team-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🏖️</div>' +
                        '<div class="l8-portal-m-card-label">Pending Leave</div>' +
                        '<div class="l8-portal-m-card-value" id="mgr-m-leave-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">⏱️</div>' +
                        '<div class="l8-portal-m-card-label">Pending Timesheets</div>' +
                        '<div class="l8-portal-m-card-value" id="mgr-m-timesheet-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">⭐</div>' +
                        '<div class="l8-portal-m-card-label">Reviews</div>' +
                        '<div class="l8-portal-m-card-value" id="mgr-m-review-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-m-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-m-quick-actions">' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-primary" onclick="MobileMGR.loadSection(\'approvals\')">Review Approvals</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobileMGR.loadSection(\'team\')">View Team</button>' +
                    '</div>' +
                '</div>');

            var w = sw('managerId', managerId, false);
            var wp = sw('managerId', managerId, true);

            fetch_('/30/Employee', 'select * from Employee' + w + ' limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-m-team-value');
                if (el) el.textContent = total + ' members';
            });

            // LeaveRequest/Timesheet/PerformanceReview don't have managerId — query unscoped
            fetch_('/30/LeaveReq', 'select * from LeaveRequest where status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-m-leave-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/Timesheet', 'select * from Timesheet where status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-m-timesheet-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/PerfRevw', 'select * from PerformanceReview where status=4 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-m-review-value');
                if (el) el.textContent = total + ' in progress';
            });
        }
    };
})();
