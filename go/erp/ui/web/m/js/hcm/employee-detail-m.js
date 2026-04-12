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
/**
 * Mobile Employee Detail View
 * Uses Layer8EmployeeDetail (shared) for rendering.
 * Popup chrome is mobile-specific (Layer8MPopup).
 */
(function() {
    'use strict';

    var D = Layer8EmployeeDetail;

    async function openEmployeeDetail(item) {
        var employeeId = item.employeeId;

        Layer8MPopup.show({
            title: 'Employee Details',
            content: '<div style="padding: 40px; text-align: center; color: var(--text-secondary);">Loading...</div>',
            size: 'full',
            showFooter: false
        });

        try {
            var employee = await D.fetchEmployeeWithRelated(employeeId);
            if (!employee) {
                Layer8MPopup.close();
                Layer8MUtils.showError('Employee not found');
                return;
            }

            var content = D.renderHeader(employee) +
                buildTabs(employee) +
                buildPanels(employee);

            Layer8MPopup.close();
            Layer8MPopup.show({
                title: Layer8MUtils.escapeHtml(employee.firstName) + ' ' + Layer8MUtils.escapeHtml(employee.lastName),
                content: content,
                size: 'full',
                showFooter: false,
                onShow: function(popup) {
                    setupTabs(popup.body);
                }
            });
        } catch (error) {
            Layer8MPopup.close();
            Layer8MUtils.showError('Error loading employee: ' + error.message);
        }
    }

    function buildTabs(emp) {
        return '<div class="emp-detail-tabs">' +
            '<button class="emp-tab active" data-tab="overview">Overview</button>' +
            '<button class="emp-tab" data-tab="employment">Employment</button>' +
            '<button class="emp-tab" data-tab="documents">Docs (' + emp._documents.length + ')</button>' +
            '<button class="emp-tab" data-tab="compliance">Comp (' + emp._compliance.length + ')</button>' +
        '</div>';
    }

    function buildPanels(emp) {
        return '<div class="emp-tab-content">' +
            '<div class="emp-tab-panel active" data-panel="overview">' + D.renderOverviewTab(emp) + '</div>' +
            '<div class="emp-tab-panel" data-panel="employment">' + D.renderEmploymentTab(emp) + '</div>' +
            '<div class="emp-tab-panel" data-panel="documents">' + D.renderDocumentsTab(emp._documents) + '</div>' +
            '<div class="emp-tab-panel" data-panel="compliance">' + D.renderComplianceTab(emp._compliance) + '</div>' +
        '</div>';
    }

    function setupTabs(container) {
        var tabs = container.querySelectorAll('.emp-tab');
        var panels = container.querySelectorAll('.emp-tab-panel');
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                var target = tab.dataset.tab;
                tabs.forEach(function(t) { t.classList.remove('active'); });
                tab.classList.add('active');
                panels.forEach(function(p) {
                    p.classList.toggle('active', p.dataset.panel === target);
                });
            });
        });
    }

    window.MobileEmployeeDetail = {
        open: openEmployeeDetail
    };

})();
