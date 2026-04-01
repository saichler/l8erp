/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Mobile ESS Dashboard — touch-friendly summary cards
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    ESS.mobileDashboard = {
        render: function(container) {
            var employeeId = ESS.employeeId || '';
            var name = Layer8DUtils ? Layer8DUtils.escapeHtml(ESS.employeeName || 'Employee') : (ESS.employeeName || 'Employee');

            container.innerHTML =
                '<div class="ess-dashboard-welcome">' +
                    '<h2>Welcome, ' + name + '</h2>' +
                    '<p>Here is a summary of your information.</p>' +
                '</div>' +
                '<div class="ess-dashboard-cards">' +
                    '<div class="ess-card">' +
                        '<div class="ess-card-icon">🏖️</div>' +
                        '<div class="ess-card-label">Leave Balances</div>' +
                        '<div class="ess-card-value" id="ess-m-leave-value">Loading...</div>' +
                    '</div>' +
                    '<div class="ess-card">' +
                        '<div class="ess-card-icon">💰</div>' +
                        '<div class="ess-card-label">Latest Pay Stub</div>' +
                        '<div class="ess-card-value" id="ess-m-pay-value">Loading...</div>' +
                    '</div>' +
                    '<div class="ess-card">' +
                        '<div class="ess-card-icon">📋</div>' +
                        '<div class="ess-card-label">Pending Requests</div>' +
                        '<div class="ess-card-value" id="ess-m-pending-value">Loading...</div>' +
                    '</div>' +
                    '<div class="ess-card">' +
                        '<div class="ess-card-icon">🎯</div>' +
                        '<div class="ess-card-label">Active Goals</div>' +
                        '<div class="ess-card-value" id="ess-m-goals-value">Loading...</div>' +
                    '</div>' +
                '</div>' +
                '<div class="ess-quick-section">' +
                    '<h3>Quick Actions</h3>' +
                    '<div class="ess-quick-actions">' +
                        '<button class="ess-quick-btn ess-quick-btn-primary" onclick="ESS.mobileActions.requestTimeOff()">Request Time Off</button>' +
                        '<button class="ess-quick-btn ess-quick-btn-secondary" onclick="MobileESS.loadSection(\'pay\')">View Pay Stubs</button>' +
                        '<button class="ess-quick-btn ess-quick-btn-secondary" onclick="MobileESS.loadSection(\'profile\')">View Profile</button>' +
                    '</div>' +
                '</div>';

            this._loadLeaveBalances(employeeId);
            this._loadLatestPayslip(employeeId);
            this._loadPendingRequests(employeeId);
            this._loadActiveGoals(employeeId);
        },

        _fetchData: function(endpoint, query, callback) {
            var body = encodeURIComponent(JSON.stringify({ text: query }));
            fetch(Layer8DConfig.resolveEndpoint(endpoint) + '?body=' + body, {
                headers: MobileESS._getHeaders()
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
            var el = document.getElementById('ess-m-leave-value');
            if (!el) return;
            var where = employeeId ? " where employeeId='" + employeeId + "'" : '';
            this._fetchData('/30/LeaveBal', 'select * from LeaveBalance' + where + ' limit 5 page 0', function(total, list) {
                if (!list || list.length === 0) { el.textContent = 'No balances'; return; }
                var summary = list.slice(0, 2).map(function(b) {
                    var type = ESS.render.leaveType(b.leaveType);
                    return type + ': ' + (b.annualAllowance || 0) + 'h';
                }).join(', ');
                el.textContent = summary;
            });
        },

        _loadLatestPayslip: function(employeeId) {
            var el = document.getElementById('ess-m-pay-value');
            if (!el) return;
            var where = employeeId ? " where employeeId='" + employeeId + "'" : '';
            this._fetchData('/30/Payslip', 'select * from Payslip' + where + ' limit 1 page 0', function(total, list) {
                if (!list || list.length === 0) { el.textContent = 'No pay stubs'; return; }
                var p = list[0];
                var net = p.netPay && Layer8DUtils ? Layer8DUtils.formatMoney(p.netPay) : 'N/A';
                el.textContent = net;
            });
        },

        _loadPendingRequests: function(employeeId) {
            var el = document.getElementById('ess-m-pending-value');
            if (!el) return;
            var where = employeeId ? "employeeId='" + employeeId + "' and " : '';
            this._fetchData('/30/LeaveReq', 'select * from LeaveRequest where ' + where + 'status=2 limit 1 page 0', function(total) {
                el.textContent = total + ' pending';
            });
        },

        _loadActiveGoals: function(employeeId) {
            var el = document.getElementById('ess-m-goals-value');
            if (!el) return;
            var where = employeeId ? "employeeId='" + employeeId + "' and " : '';
            this._fetchData('/30/Goal', 'select * from Goal where ' + where + 'status=2 limit 1 page 0', function(total) {
                el.textContent = total + ' active';
            });
        }
    };
})();
