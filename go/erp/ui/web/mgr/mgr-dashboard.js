/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Dashboard — team summary cards (desktop)
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    MGR.dashboard = {
        render: function(container) {
            var managerId = MGR._scopeValue || '';
            container.innerHTML = '<div class="l8-portal-dashboard">' +
                '<div class="l8-portal-dashboard-welcome">' +
                    '<h2>Manager Dashboard</h2>' +
                    '<p>Team overview and pending approvals.</p>' +
                '</div>' +
                '<div class="l8-portal-dashboard-cards">' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">👥</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Team Members</h3>' +
                            '<div class="l8-portal-card-value" id="mgr-team-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">🏖️</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Pending Leave Requests</h3>' +
                            '<div class="l8-portal-card-value" id="mgr-leave-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">⏱️</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Pending Timesheets</h3>' +
                            '<div class="l8-portal-card-value" id="mgr-timesheet-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card">' +
                        '<div class="l8-portal-card-icon">⭐</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Reviews in Progress</h3>' +
                            '<div class="l8-portal-card-value" id="mgr-review-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-dashboard-quick">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-quick-actions">' +
                        '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" onclick="MGR.loadSection(\'approvals\')">Review Approvals</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="MGR.loadSection(\'team\')">View Team</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="MGR.loadSection(\'performance\')">Performance</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

            var w = sw('managerId', managerId, false);
            var wp = sw('managerId', managerId, true);

            fetch_('/30/Employee', 'select * from Employee' + w + ' limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-team-value');
                if (el) el.textContent = total + ' members';
            });

            fetch_('/30/LeaveReq', 'select * from LeaveRequest where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-leave-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/Timesheet', 'select * from Timesheet where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-timesheet-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/PerfRevw', 'select * from PerformanceReview where ' + wp + 'status=4 limit 1 page 0', function(total) {
                var el = document.getElementById('mgr-review-value');
                if (el) el.textContent = total + ' in progress';
            });
        }
    };
})();
