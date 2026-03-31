/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Dashboard — summary cards for the employee
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    ESS.dashboard = {
        render: function(container) {
            var employeeId = ESS.employeeId || '';
            container.innerHTML = '<div class="ess-dashboard">' +
                '<div class="ess-dashboard-welcome">' +
                    '<h2>Welcome back, ' + Layer8DUtils.escapeHtml(ESS.employeeName || 'Employee') + '</h2>' +
                    '<p>Here is a summary of your information.</p>' +
                '</div>' +
                '<div class="ess-dashboard-cards">' +
                    '<div class="ess-card" id="ess-card-leave">' +
                        '<div class="ess-card-icon">🏖️</div>' +
                        '<div class="ess-card-content">' +
                            '<h3>Leave Balances</h3>' +
                            '<div class="ess-card-value" id="ess-leave-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ess-card" id="ess-card-pay">' +
                        '<div class="ess-card-icon">💰</div>' +
                        '<div class="ess-card-content">' +
                            '<h3>Latest Pay Stub</h3>' +
                            '<div class="ess-card-value" id="ess-pay-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ess-card" id="ess-card-pending">' +
                        '<div class="ess-card-icon">📋</div>' +
                        '<div class="ess-card-content">' +
                            '<h3>Pending Requests</h3>' +
                            '<div class="ess-card-value" id="ess-pending-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="ess-card" id="ess-card-goals">' +
                        '<div class="ess-card-icon">🎯</div>' +
                        '<div class="ess-card-content">' +
                            '<h3>Active Goals</h3>' +
                            '<div class="ess-card-value" id="ess-goals-value">Loading...</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ess-dashboard-quick">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="ess-quick-actions">' +
                        '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" onclick="ESS.actions.requestTimeOff()">Request Time Off</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="ESS.loadSection(\'pay\')">View Pay Stubs</button>' +
                        '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="ESS.loadSection(\'profile\')">View Profile</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

            this._loadLeaveBalances(employeeId);
            this._loadLatestPayslip(employeeId);
            this._loadPendingRequests(employeeId);
            this._loadActiveGoals(employeeId);
        },

        _fetchCount: function(endpoint, query, callback) {
            var body = encodeURIComponent(JSON.stringify({ text: query }));
            fetch(Layer8DConfig.resolveEndpoint(endpoint) + '?body=' + body, {
                headers: getAuthHeaders()
            }).then(function(r) { return r.ok ? r.json() : null; })
              .then(function(data) {
                  if (!data) { callback(0, null); return; }
                  var total = 0;
                  if (data.metadata && data.metadata.keyCount && data.metadata.keyCount.counts) {
                      total = data.metadata.keyCount.counts.Total || 0;
                  }
                  callback(total, data.list);
              }).catch(function() { callback(0, null); });
        },

        _loadLeaveBalances: function(employeeId) {
            var el = document.getElementById('ess-leave-value');
            if (!el) return;
            var where = employeeId ? " where employeeId='" + employeeId + "'" : '';
            this._fetchCount('/30/LeaveBal', 'select * from LeaveBalance' + where + ' limit 5 page 0', function(total, list) {
                if (!list || list.length === 0) { el.textContent = 'No balances'; return; }
                var summary = list.slice(0, 3).map(function(b) {
                    var type = ESS.render.leaveType(b.leaveType);
                    return type + ': ' + (b.annualAllowance || 0) + 'h';
                }).join(', ');
                el.textContent = summary;
            });
        },

        _loadLatestPayslip: function(employeeId) {
            var el = document.getElementById('ess-pay-value');
            if (!el) return;
            var where = employeeId ? " where employeeId='" + employeeId + "'" : '';
            this._fetchCount('/30/Payslip', 'select * from Payslip' + where + ' limit 1 page 0', function(total, list) {
                if (!list || list.length === 0) { el.textContent = 'No pay stubs'; return; }
                var p = list[0];
                var net = p.netPay ? Layer8DUtils.formatMoney(p.netPay) : 'N/A';
                el.textContent = net;
            });
        },

        _loadPendingRequests: function(employeeId) {
            var el = document.getElementById('ess-pending-value');
            if (!el) return;
            var where = employeeId ? "employeeId='" + employeeId + "' and " : '';
            this._fetchCount('/30/LeaveReq', 'select * from LeaveRequest where ' + where + 'status=2 limit 1 page 0', function(total) {
                el.textContent = total + ' pending';
            });
        },

        _loadActiveGoals: function(employeeId) {
            var el = document.getElementById('ess-goals-value');
            if (!el) return;
            var where = employeeId ? "employeeId='" + employeeId + "' and " : '';
            this._fetchCount('/30/Goal', 'select * from Goal where ' + where + 'status=2 limit 1 page 0', function(total) {
                el.textContent = total + ' active';
            });
        }
    };
})();
