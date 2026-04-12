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
 * Desktop Employee Detail View
 * Uses Layer8EmployeeDetail (shared) for rendering.
 * Popup chrome and edit handling are desktop-specific.
 */
(function() {
    'use strict';

    var D = Layer8EmployeeDetail;

    async function openEmployeeDetail(employeeId) {
        Layer8DPopup.show({
            title: 'Employee Details',
            content: '<div style="padding: 40px; text-align: center; color: var(--layer8d-text-muted);">Loading employee data...</div>',
            size: 'large',
            showFooter: false,
            onShow: async function() {
                try {
                    var employee = await D.fetchEmployeeWithRelated(employeeId);
                    if (!employee) {
                        Layer8DPopup.close();
                        Layer8DNotification.error('Employee not found');
                        return;
                    }

                    var content = renderDetail(employee);
                    Layer8DPopup.updateContent(content);

                    var body = Layer8DPopup.getBody();
                    if (body) setupTabs(body);
                } catch (error) {
                    Layer8DPopup.close();
                    Layer8DNotification.error('Error loading employee', [error.message]);
                }
            }
        });
    }

    function renderDetail(emp) {
        return '<div class="emp-detail">' +
            D.renderHeader(emp) +
            '<div class="emp-header-actions">' +
                '<button class="layer8d-btn layer8d-btn-secondary layer8d-btn-small" onclick="EmployeeDetail.openEditFromDetail(\'' + emp.employeeId + '\')">Edit</button>' +
            '</div>' +
            '<div class="emp-detail-tabs">' +
                '<button class="emp-tab active" data-tab="overview">Overview</button>' +
                '<button class="emp-tab" data-tab="employment">Employment</button>' +
                '<button class="emp-tab" data-tab="documents">Documents (' + emp._documents.length + ')</button>' +
                '<button class="emp-tab" data-tab="compliance">Compliance (' + emp._compliance.length + ')</button>' +
            '</div>' +
            '<div class="emp-tab-content">' +
                '<div class="emp-tab-panel active" data-panel="overview">' + D.renderOverviewTab(emp) + '</div>' +
                '<div class="emp-tab-panel" data-panel="employment">' + D.renderEmploymentTab(emp) + '</div>' +
                '<div class="emp-tab-panel" data-panel="documents">' + D.renderDocumentsTab(emp._documents) + '</div>' +
                '<div class="emp-tab-panel" data-panel="compliance">' + D.renderComplianceTab(emp._compliance) + '</div>' +
            '</div>' +
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

    function openEditFromDetail(employeeId) {
        Layer8DPopup.close();
        if (typeof HCM !== 'undefined' && HCM._openEditModal) {
            var modules = HCM.modules || {};
            var coreHR = modules['core-hr'];
            if (coreHR && coreHR.services) {
                var service = coreHR.services.find(function(s) { return s.model === 'Employee'; });
                if (service) {
                    HCM._openEditModal(service, employeeId);
                    return;
                }
            }
        }
        console.warn('EmployeeDetail: Could not open edit — HCM module not found');
    }

    window.EmployeeDetail = {
        open: openEmployeeDetail,
        openEditFromDetail: openEditFromDetail
    };

})();
