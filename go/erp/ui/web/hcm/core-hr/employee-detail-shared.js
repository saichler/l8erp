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
 * Shared Employee Detail Renderer
 * Used by both desktop (employee-detail.js) and mobile (employee-detail-m.js)
 * Contains data fetching and tab content rendering — popup chrome is platform-specific.
 */
(function() {
    'use strict';

    var enums = CoreHR.enums;
    var render = CoreHR.render;

    function esc(text) {
        return (typeof Layer8DUtils !== 'undefined' ? Layer8DUtils : Layer8MUtils).escapeHtml(text);
    }

    function escAttr(text) {
        if (typeof Layer8DUtils !== 'undefined' && Layer8DUtils.escapeAttr) {
            return Layer8DUtils.escapeAttr(text);
        }
        return String(text || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ========================================================================
    // DATA FETCHING (platform-agnostic)
    // ========================================================================

    function httpGet(url) {
        if (typeof Layer8MAuth !== 'undefined' && Layer8MAuth.get) {
            return Layer8MAuth.get(url);
        }
        var headers = typeof getAuthHeaders === 'function' ? getAuthHeaders() : {};
        return fetch(url, { method: 'GET', headers: headers }).then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        });
    }

    function resolveEndpoint(path) {
        if (typeof Layer8MConfig !== 'undefined' && Layer8MConfig.resolveEndpoint) {
            return Layer8MConfig.resolveEndpoint(path);
        }
        return Layer8DConfig.resolveEndpoint(path);
    }

    function fetchRelatedList(serviceName, modelName, foreignKey, foreignValue) {
        var query = 'select * from ' + modelName + ' where ' + foreignKey + '=' + foreignValue;
        var body = encodeURIComponent(JSON.stringify({ text: query }));
        return httpGet(resolveEndpoint('/30/' + serviceName) + '?body=' + body)
            .then(function(data) { return data && data.list ? data.list : []; })
            .catch(function() { return []; });
    }

    function fetchSingleRecord(serviceName, modelName, primaryKey, id) {
        var query = 'select * from ' + modelName + ' where ' + primaryKey + '=' + id;
        var body = encodeURIComponent(JSON.stringify({ text: query }));
        return httpGet(resolveEndpoint('/30/' + serviceName) + '?body=' + body)
            .then(function(data) { return data && data.list && data.list.length > 0 ? data.list[0] : null; })
            .catch(function() { return null; });
    }

    function fetchEmployeeWithRelated(employeeId) {
        var empQuery = 'select * from Employee where employeeId=' + employeeId;
        var body = encodeURIComponent(JSON.stringify({ text: empQuery }));
        return httpGet(resolveEndpoint('/30/Employee') + '?body=' + body).then(function(empData) {
            var employee = empData && empData.list && empData.list.length > 0 ? empData.list[0] : null;
            if (!employee) return null;

            return Promise.all([
                fetchRelatedList('EmpDoc', 'EmployeeDocument', 'employeeId', employeeId),
                fetchRelatedList('CompRec', 'ComplianceRecord', 'employeeId', employeeId),
                employee.organizationId ? fetchSingleRecord('Org', 'Organization', 'organizationId', employee.organizationId) : null,
                employee.departmentId ? fetchSingleRecord('Dept', 'Department', 'departmentId', employee.departmentId) : null,
                employee.positionId ? fetchSingleRecord('Position', 'Position', 'positionId', employee.positionId) : null,
                employee.jobId ? fetchSingleRecord('Job', 'Job', 'jobId', employee.jobId) : null
            ]).then(function(results) {
                employee._documents = results[0] || [];
                employee._compliance = results[1] || [];
                employee._organization = results[2];
                employee._department = results[3];
                employee._position = results[4];
                employee._job = results[5];
                return employee;
            });
        });
    }

    // ========================================================================
    // RENDERING (shared across desktop and mobile)
    // ========================================================================

    function getInitials(emp) {
        var first = emp.firstName ? emp.firstName.charAt(0).toUpperCase() : '';
        var last = emp.lastName ? emp.lastName.charAt(0).toUpperCase() : '';
        return first + last;
    }

    function renderHeader(emp) {
        var initials = getInitials(emp);
        var posTitle = emp._position ? emp._position.title : 'No Position';
        var deptName = emp._department ? emp._department.name : 'No Department';

        return '<div class="emp-detail-header">' +
            '<div class="emp-photo">' +
                (emp.photoUrl
                    ? '<img src="' + escAttr(emp.photoUrl) + '" alt="Employee photo">'
                    : '<div class="emp-photo-placeholder">' + esc(initials) + '</div>') +
            '</div>' +
            '<div class="emp-header-info">' +
                '<h2 class="emp-name">' + esc(emp.firstName) + ' ' + esc(emp.lastName) + '</h2>' +
                (emp.preferredName ? '<p class="emp-preferred">"' + esc(emp.preferredName) + '"</p>' : '') +
                '<p class="emp-title">' + esc(posTitle) + '</p>' +
                '<p class="emp-dept">' + esc(deptName) + '</p>' +
                '<div class="emp-badges">' +
                    render.employmentStatus(emp.employmentStatus) +
                    '<span class="hcm-status">' + render.employmentType(emp.employmentType) + '</span>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function renderOverviewTab(emp) {
        return '<div class="emp-overview-grid">' +
            '<div class="emp-info-card">' +
                '<h4>Personal Information</h4>' +
                '<div class="emp-info-grid">' +
                    infoItem('Employee ID', emp.employeeId) +
                    infoItem('Employee Number', emp.employeeNumber) +
                    infoItem('Full Name', [emp.firstName, emp.middleName, emp.lastName].filter(Boolean).join(' ')) +
                    infoItem('Date of Birth', render.date(emp.dateOfBirth)) +
                    infoItem('Gender', enums.GENDER[emp.gender]) +
                    infoItem('Marital Status', enums.MARITAL_STATUS[emp.maritalStatus]) +
                    infoItem('Nationality', emp.nationality) +
                '</div>' +
            '</div>' +
            '<div class="emp-info-card">' +
                '<h4>Organization</h4>' +
                '<div class="emp-info-grid">' +
                    infoItem('Organization', emp._organization ? emp._organization.name : null) +
                    infoItem('Department', emp._department ? emp._department.name : null) +
                    infoItem('Position', emp._position ? emp._position.title : null) +
                    infoItem('Job', emp._job ? emp._job.title : null) +
                    infoItem('Work Location', emp.workLocationId) +
                    infoItem('Cost Center', emp.costCenterId) +
                '</div>' +
            '</div>' +
        '</div>';
    }

    function renderEmploymentTab(emp) {
        var html = '<div class="emp-info-card">' +
            '<h4>Employment Details</h4>' +
            '<div class="emp-info-grid">' +
                infoItem('Employment Status', render.employmentStatus(emp.employmentStatus), true) +
                infoItem('Employment Type', render.employmentType(emp.employmentType), true) +
                infoItem('Hire Date', render.date(emp.hireDate), true) +
                infoItem('Original Hire Date', render.date(emp.originalHireDate), true) +
                infoItem('Is Rehire', render.boolean(emp.isRehire), true);

        if (emp.employmentStatus === 4) {
            html += infoItem('Termination Date', render.date(emp.terminationDate), true) +
                    infoItem('Termination Reason', emp.terminationReason, false);
        }

        html += '</div></div>';
        html += '<div class="emp-info-card">' +
            '<h4>Manager</h4>' +
            '<div class="emp-info-grid">' +
                infoItem('Manager ID', emp.managerId) +
            '</div>' +
        '</div>';

        return html;
    }

    function renderDocumentsTab(docs) {
        if (!docs || docs.length === 0) {
            return '<div class="emp-empty-state"><p>No documents found for this employee.</p></div>';
        }
        var html = '<table class="emp-detail-table"><thead><tr>' +
            '<th>Name</th><th>Type</th><th>Uploaded</th><th>Expires</th><th>Verified</th>' +
            '</tr></thead><tbody>';
        docs.forEach(function(doc) {
            html += '<tr>' +
                '<td>' + esc(doc.name || '-') + '</td>' +
                '<td>' + render.documentType(doc.documentType) + '</td>' +
                '<td>' + render.date(doc.uploadDate) + '</td>' +
                '<td>' + render.date(doc.expirationDate) + '</td>' +
                '<td>' + render.boolean(doc.isVerified) + '</td>' +
            '</tr>';
        });
        html += '</tbody></table>';
        return html;
    }

    function renderComplianceTab(records) {
        if (!records || records.length === 0) {
            return '<div class="emp-empty-state"><p>No compliance records found for this employee.</p></div>';
        }
        var html = '<table class="emp-detail-table"><thead><tr>' +
            '<th>Type</th><th>Status</th><th>Due Date</th><th>Completed</th><th>Expires</th>' +
            '</tr></thead><tbody>';
        records.forEach(function(rec) {
            html += '<tr>' +
                '<td>' + render.complianceType(rec.complianceType) + '</td>' +
                '<td>' + esc(rec.status || '-') + '</td>' +
                '<td>' + render.date(rec.dueDate) + '</td>' +
                '<td>' + render.date(rec.completionDate) + '</td>' +
                '<td>' + render.date(rec.expirationDate) + '</td>' +
            '</tr>';
        });
        html += '</tbody></table>';
        return html;
    }

    // Helper: single info item
    function infoItem(label, value, isHtml) {
        var display;
        if (isHtml) {
            display = value != null && value !== '' ? String(value) : '-';
        } else {
            display = value != null && value !== '' ? esc(String(value)) : '-';
        }
        return '<div class="emp-info-item">' +
            '<label>' + esc(label) + '</label>' +
            '<span>' + display + '</span>' +
        '</div>';
    }

    // ========================================================================
    // EXPORTS
    // ========================================================================

    window.Layer8EmployeeDetail = {
        fetchEmployeeWithRelated: fetchEmployeeWithRelated,
        renderHeader: renderHeader,
        renderOverviewTab: renderOverviewTab,
        renderEmploymentTab: renderEmploymentTab,
        renderDocumentsTab: renderDocumentsTab,
        renderComplianceTab: renderComplianceTab,
        getInitials: getInitials
    };

})();
