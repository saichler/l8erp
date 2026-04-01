/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Dashboard — summary cards for the employee (desktop)
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    ESS.dashboard = {
        render: function(container) {
            var employeeId = ESS.employeeId || '';
            container.innerHTML = '<div class="l8-portal-dashboard">' +
                '<div class="l8-portal-dashboard-welcome">' +
                    '<h2>Welcome back, ' + Layer8DUtils.escapeHtml(ESS.employeeName || 'Employee') + '</h2>' +
                    '<p>Here is a summary of your information.</p>' +
                '</div>' +
                '<div class="l8-portal-dashboard-cards">' +
                    '<div class="l8-portal-card" id="ess-card-leave">' +
                        '<div class="l8-portal-card-icon">🏖️</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Leave Balances</h3>' +
                            '<div class="l8-portal-card-value" id="ess-leave-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card" id="ess-card-pay">' +
                        '<div class="l8-portal-card-icon">💰</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Latest Pay Stub</h3>' +
                            '<div class="l8-portal-card-value" id="ess-pay-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card" id="ess-card-pending">' +
                        '<div class="l8-portal-card-icon">📋</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Pending Requests</h3>' +
                            '<div class="l8-portal-card-value" id="ess-pending-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="l8-portal-card" id="ess-card-goals">' +
                        '<div class="l8-portal-card-icon">🎯</div>' +
                        '<div class="l8-portal-card-content">' +
                            '<h3>Active Goals</h3>' +
                            '<div class="l8-portal-card-value" id="ess-goals-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-dashboard-quick">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-quick-actions">' +
                        '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" onclick="ESS.actions.requestTimeOff()">Request Time Off</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="ESS.loadSection(\'pay\')">View Pay Stubs</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="ESS.loadSection(\'profile\')">View Profile</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

            var w = sw('employeeId', employeeId, false);
            var wp = sw('employeeId', employeeId, true);

            fetch_('/30/LeaveBal', 'select * from LeaveBalance' + w + ' limit 5 page 0', function(total, list) {
                var el = document.getElementById('ess-leave-value');
                if (!el) return;
                if (!list || list.length === 0) { el.textContent = 'No balances'; return; }
                var summary = list.slice(0, 3).map(function(b) {
                    var type = ESS.render.leaveType(b.leaveType);
                    return type + ': ' + (b.annualAllowance || 0) + 'h';
                }).join(', ');
                el.textContent = summary;
            });

            fetch_('/30/Payslip', 'select * from Payslip' + w + ' limit 1 page 0', function(total, list) {
                var el = document.getElementById('ess-pay-value');
                if (!el) return;
                if (!list || list.length === 0) { el.textContent = 'No pay stubs'; return; }
                el.textContent = list[0].netPay ? Layer8DUtils.formatMoney(list[0].netPay) : 'N/A';
            });

            fetch_('/30/LeaveReq', 'select * from LeaveRequest where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('ess-pending-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/Goal', 'select * from Goal where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('ess-goals-value');
                if (el) el.textContent = total + ' active';
            });
        }
    };
})();
