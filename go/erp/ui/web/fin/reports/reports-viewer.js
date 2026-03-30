/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Financial Reports Module - Report Viewer Component

(function() {
    'use strict';

    var REPORT_TYPES = [
        { value: 1, label: 'Balance Sheet' },
        { value: 2, label: 'Income Statement' },
        { value: 3, label: 'Trial Balance' },
        { value: 4, label: 'Budget vs Actual' },
        { value: 5, label: 'Aged Receivables' },
        { value: 6, label: 'Aged Payables' },
        { value: 7, label: 'GL Detail' }
    ];

    window.Layer8FinReportViewer = {

        _container: null,

        init: function(containerId) {
            this._container = document.getElementById(containerId);
            if (!this._container) {
                console.error('Layer8FinReportViewer: container not found: ' + containerId);
                return;
            }
            this._renderForm();
        },

        _renderForm: function() {
            var typeOptions = REPORT_TYPES.map(function(rt) {
                return '<option value="' + rt.value + '">' + rt.label + '</option>';
            }).join('');

            var html = '<div class="fin-report-form">' +
                '<h3 style="margin:0 0 16px 0;color:var(--layer8d-text-dark);">Generate Financial Report</h3>' +
                '<div class="fin-report-form-grid">' +
                    '<div class="fin-report-form-field">' +
                        '<label for="fin-report-type">Report Type</label>' +
                        '<select id="fin-report-type">' + typeOptions + '</select>' +
                    '</div>' +
                    '<div class="fin-report-form-field">' +
                        '<label for="fin-report-fiscal-year">Fiscal Year ID</label>' +
                        '<input type="text" id="fin-report-fiscal-year" placeholder="e.g. FY-001">' +
                    '</div>' +
                    '<div class="fin-report-form-field">' +
                        '<label for="fin-report-fiscal-period">Fiscal Period ID</label>' +
                        '<input type="text" id="fin-report-fiscal-period" placeholder="e.g. FP-001">' +
                    '</div>' +
                    '<div class="fin-report-form-field">' +
                        '<label for="fin-report-department">Department ID</label>' +
                        '<input type="text" id="fin-report-department" placeholder="Optional">' +
                    '</div>' +
                    '<div class="fin-report-form-field">' +
                        '<label for="fin-report-account">Account ID</label>' +
                        '<input type="text" id="fin-report-account" placeholder="For GL Detail">' +
                    '</div>' +
                '</div>' +
                '<div class="fin-report-form-actions">' +
                    '<button class="layer8d-btn layer8d-btn-primary layer8d-btn-small" id="fin-report-generate-btn">Generate Report</button>' +
                '</div>' +
            '</div>' +
            '<div id="fin-report-output"></div>';

            this._container.innerHTML = html;

            var self = this;
            var btn = document.getElementById('fin-report-generate-btn');
            if (btn) {
                btn.addEventListener('click', function() { self._generateReport(); });
            }
        },

        _generateReport: async function() {
            var typeSelect = document.getElementById('fin-report-type');
            var yearInput = document.getElementById('fin-report-fiscal-year');
            var periodInput = document.getElementById('fin-report-fiscal-period');
            var deptInput = document.getElementById('fin-report-department');
            var accountInput = document.getElementById('fin-report-account');

            if (!typeSelect || !typeSelect.value) {
                console.warn('Layer8FinReportViewer: report type not selected');
                return;
            }

            var body = {
                reportType: parseInt(typeSelect.value, 10)
            };
            if (yearInput && yearInput.value) body.fiscalYearId = yearInput.value;
            if (periodInput && periodInput.value) body.fiscalPeriodId = periodInput.value;
            if (deptInput && deptInput.value) body.departmentId = deptInput.value;
            if (accountInput && accountInput.value) body.accountId = accountInput.value;

            var outputDiv = document.getElementById('fin-report-output');
            if (outputDiv) {
                outputDiv.innerHTML = '<div style="padding:20px;color:var(--layer8d-text-medium);">Generating report...</div>';
            }

            try {
                var endpoint = Layer8DConfig.resolveEndpoint('/40/FinReport');
                var headers = getAuthHeaders();
                headers['Content-Type'] = 'application/json';

                var response = await fetch(endpoint, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });

                if (!response.ok) {
                    throw new Error('Server returned ' + response.status);
                }

                var report = await response.json();
                this._renderReport(report);
            } catch (err) {
                console.error('Layer8FinReportViewer: failed to generate report', err);
                if (outputDiv) {
                    outputDiv.innerHTML = '<div style="padding:20px;color:var(--layer8d-error);">Failed to generate report: ' +
                        (err.message || 'Unknown error') + '</div>';
                }
            }
        },

        _renderReport: function(report) {
            var outputDiv = document.getElementById('fin-report-output');
            if (!outputDiv) return;

            var sections = report.sections || [];
            var html = '<div class="fin-report-container">' +
                '<div class="fin-report-header">' +
                    '<h2 class="fin-report-title">' + (report.title || 'Financial Report') + '</h2>' +
                    '<div class="fin-report-subtitle">' + (report.periodName || '') + '</div>' +
                    '<div class="fin-report-meta">Generated: ' + this._formatDate(report.generatedAt) +
                        ' | Rows: ' + (report.rowCount || 0) + '</div>' +
                '</div>' +
                '<div class="fin-report-actions">' +
                    '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" id="fin-report-print-btn">Print</button>' +
                '</div>' +
                '<table class="fin-report-table">' +
                '<thead><tr>' +
                    '<th style="text-align:left;">Description</th>' +
                    '<th style="text-align:right;">Amount</th>' +
                '</tr></thead>' +
                '<tbody>';

            for (var i = 0; i < sections.length; i++) {
                html += this._renderSection(sections[i]);
            }

            if (report.grandTotal) {
                html += '<tr class="fin-report-grand-total">' +
                    '<td><strong>Grand Total</strong></td>' +
                    '<td style="text-align:right;"><strong>' + this._formatMoney(report.grandTotal) + '</strong></td>' +
                '</tr>';
            }

            html += '</tbody></table></div>';

            outputDiv.innerHTML = html;

            var printBtn = document.getElementById('fin-report-print-btn');
            if (printBtn) {
                printBtn.addEventListener('click', function() { window.print(); });
            }
        },

        _renderSection: function(section) {
            var html = '<tr class="fin-report-section-header">' +
                '<td colspan="2"><strong>' + (section.title || '') + '</strong></td>' +
            '</tr>';

            var lines = section.lines || [];
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];
                var indent = (line.level || 0) * 20;
                html += '<tr class="fin-report-line">' +
                    '<td style="padding-left:' + (8 + indent) + 'px;">' + (line.description || '') + '</td>' +
                    '<td style="text-align:right;">' + this._formatMoney(line.amount) + '</td>' +
                '</tr>';
            }

            if (section.sectionTotal) {
                html += '<tr class="fin-report-section-total">' +
                    '<td style="padding-left:8px;"><strong>' + (section.title || '') + ' Total</strong></td>' +
                    '<td style="text-align:right;"><strong>' + this._formatMoney(section.sectionTotal) + '</strong></td>' +
                '</tr>';
            }

            return html;
        },

        _formatMoney: function(money) {
            if (!money) return '-';
            var amount = money.amount || 0;
            var val = (amount / 100).toFixed(2);
            var parts = val.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            var currency = money.currencyCode || 'USD';
            var symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '\u20AC' : currency + ' ';
            return symbol + parts.join('.');
        },

        _formatDate: function(timestamp) {
            if (!timestamp) return '-';
            var d = new Date(timestamp * 1000);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        }
    };
})();
