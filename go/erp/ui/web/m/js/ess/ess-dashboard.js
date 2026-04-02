/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile ESS Dashboard — touch-friendly summary cards
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};
    var fetch_ = Layer8DPortalDashboard.fetchCount;
    var sw = Layer8DPortalDashboard.scopeWhere;

    ESS.mobileDashboard = {
        render: function(container) {
            var employeeId = ESS.employeeId || '';
            var name = Layer8DUtils ? Layer8DUtils.escapeHtml(ESS.employeeName || 'Employee') : (ESS.employeeName || 'Employee');

            container.innerHTML = '';
            container.insertAdjacentHTML('beforeend',
                '<div class="l8-portal-m-dashboard-cards">' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🏖️</div>' +
                        '<div class="l8-portal-m-card-label">Leave Balances</div>' +
                        '<div class="l8-portal-m-card-value" id="ess-m-leave-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">💰</div>' +
                        '<div class="l8-portal-m-card-label">Latest Pay Stub</div>' +
                        '<div class="l8-portal-m-card-value" id="ess-m-pay-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">📋</div>' +
                        '<div class="l8-portal-m-card-label">Pending Requests</div>' +
                        '<div class="l8-portal-m-card-value" id="ess-m-pending-value">Loading...</div>' +
                    '</div>' +
                    '<div class="l8-portal-m-card">' +
                        '<div class="l8-portal-m-card-icon">🎯</div>' +
                        '<div class="l8-portal-m-card-label">Active Goals</div>' +
                        '<div class="l8-portal-m-card-value" id="ess-m-goals-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="l8-portal-m-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="l8-portal-m-quick-actions">' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-primary" onclick="ESS.mobileActions.requestTimeOff()">Request Time Off</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobileESS.loadSection(\'pay\')">View Pay Stubs</button>' +
                        '<button class="l8-portal-m-quick-btn l8-portal-m-quick-btn-secondary" onclick="MobileESS.loadSection(\'profile\')">View Profile</button>' +
                    '</div>' +
                '</div>');

            var w = sw('employeeId', employeeId, false);
            var wp = sw('employeeId', employeeId, true);

            fetch_('/30/LeaveBal', 'select * from LeaveBalance' + w + ' limit 5 page 0', function(total, list) {
                var el = document.getElementById('ess-m-leave-value');
                if (!el) return;
                if (!list || list.length === 0) { el.textContent = 'No balances'; return; }
                var summary = list.slice(0, 2).map(function(b) {
                    var type = ESS.render.leaveType(b.leaveType);
                    return type + ': ' + (b.annualAllowance || 0) + 'h';
                }).join(', ');
                el.textContent = summary;
            });

            fetch_('/30/Payslip', 'select * from Payslip' + w + ' limit 1 page 0', function(total, list) {
                var el = document.getElementById('ess-m-pay-value');
                if (!el) return;
                if (!list || list.length === 0) { el.textContent = 'No pay stubs'; return; }
                el.textContent = list[0].netPay && Layer8DUtils ? Layer8DUtils.formatMoney(list[0].netPay) : 'N/A';
            });

            fetch_('/30/LeaveReq', 'select * from LeaveRequest where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('ess-m-pending-value');
                if (el) el.textContent = total + ' pending';
            });

            fetch_('/30/Goal', 'select * from Goal where ' + wp + 'status=2 limit 1 page 0', function(total) {
                var el = document.getElementById('ess-m-goals-value');
                if (el) el.textContent = total + ' active';
            });
        }
    };
})();
