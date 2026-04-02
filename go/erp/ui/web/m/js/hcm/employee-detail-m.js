/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Employee Detail View
// Shows comprehensive employee information with tabs in a popup

(function() {
    'use strict';

    var enums = MobileCoreHR.enums;
    var render = MobileCoreHR.render;

    function escapeHtml(text) {
        return Layer8MUtils.escapeHtml(text);
    }

    function formatDate(ts) {
        return Layer8MUtils.formatDate(ts);
    }

    // Fetch employee with related data
    async function fetchEmployeeWithRelated(employeeId) {
        var empQuery = 'select * from Employee where employeeId=' + employeeId;
        var body = encodeURIComponent(JSON.stringify({ text: empQuery }));
        var empData = await Layer8MAuth.get(Layer8MConfig.resolveEndpoint('/30/Employee') + '?body=' + body);
        var employee = empData && empData.list && empData.list.length > 0 ? empData.list[0] : null;
        if (!employee) return null;

        // Fetch related data in parallel
        var results = await Promise.all([
            fetchRelated('/30/EmpDoc', 'EmployeeDocument', 'employeeId', employeeId),
            fetchRelated('/30/CompRec', 'ComplianceRecord', 'employeeId', employeeId),
            employee.organizationId ? fetchOne('/30/Org', 'Organization', 'organizationId', employee.organizationId) : null,
            employee.departmentId ? fetchOne('/30/Dept', 'Department', 'departmentId', employee.departmentId) : null,
            employee.positionId ? fetchOne('/30/Position', 'Position', 'positionId', employee.positionId) : null,
            employee.jobId ? fetchOne('/30/Job', 'Job', 'jobId', employee.jobId) : null
        ]);

        employee._documents = results[0] || [];
        employee._compliance = results[1] || [];
        employee._organization = results[2];
        employee._department = results[3];
        employee._position = results[4];
        employee._job = results[5];
        return employee;
    }

    function fetchRelated(endpoint, model, fk, fkVal) {
        var q = 'select * from ' + model + ' where ' + fk + '=' + fkVal;
        var body = encodeURIComponent(JSON.stringify({ text: q }));
        return Layer8MAuth.get(Layer8MConfig.resolveEndpoint(endpoint) + '?body=' + body)
            .then(function(data) { return data && data.list ? data.list : []; })
            .catch(function() { return []; });
    }

    function fetchOne(endpoint, model, pk, id) {
        var q = 'select * from ' + model + ' where ' + pk + '=' + id;
        var body = encodeURIComponent(JSON.stringify({ text: q }));
        return Layer8MAuth.get(Layer8MConfig.resolveEndpoint(endpoint) + '?body=' + body)
            .then(function(data) { return data && data.list && data.list.length > 0 ? data.list[0] : null; })
            .catch(function() { return null; });
    }

    // Build tab content renderers
    function renderOverview(emp) {
        return '<div style="padding: 12px 0;">' +
            infoSection('Personal Information', [
                infoRow('Employee ID', emp.employeeId),
                infoRow('Employee Number', emp.employeeNumber),
                infoRow('Full Name', [emp.firstName, emp.middleName, emp.lastName].filter(Boolean).join(' ')),
                infoRow('Date of Birth', formatDate(emp.dateOfBirth)),
                infoRow('Gender', enums.GENDER[emp.gender]),
                infoRow('Marital Status', enums.MARITAL_STATUS[emp.maritalStatus]),
                infoRow('Nationality', emp.nationality)
            ]) +
            infoSection('Organization', [
                infoRow('Organization', emp._organization ? emp._organization.name : null),
                infoRow('Department', emp._department ? emp._department.name : null),
                infoRow('Position', emp._position ? emp._position.title : null),
                infoRow('Job', emp._job ? emp._job.title : null),
                infoRow('Work Location', emp.workLocationId),
                infoRow('Cost Center', emp.costCenterId)
            ]) +
        '</div>';
    }

    function renderEmployment(emp) {
        var html = '<div style="padding: 12px 0;">' +
            infoSection('Employment Details', [
                infoRow('Status', render.employmentStatus(emp.employmentStatus)),
                infoRow('Type', render.employmentType(emp.employmentType)),
                infoRow('Hire Date', formatDate(emp.hireDate)),
                infoRow('Original Hire Date', formatDate(emp.originalHireDate)),
                infoRow('Is Rehire', emp.isRehire ? 'Yes' : 'No')
            ]);

        if (emp.employmentStatus === 4) {
            html += infoSection('Termination', [
                infoRow('Termination Date', formatDate(emp.terminationDate)),
                infoRow('Termination Reason', emp.terminationReason)
            ]);
        }

        html += infoSection('Manager', [
            infoRow('Manager ID', emp.managerId || null)
        ]);

        html += '</div>';
        return html;
    }

    function renderDocuments(docs) {
        if (!docs || docs.length === 0) {
            return '<div style="padding: 24px; text-align: center; color: var(--text-secondary);">No documents found.</div>';
        }
        var html = '<div style="padding: 8px 0;">';
        docs.forEach(function(doc) {
            html += '<div style="padding: 10px 12px; border-bottom: 1px solid var(--border-light);">' +
                '<div style="font-weight: 600; color: var(--text-primary);">' + escapeHtml(doc.name || '-') + '</div>' +
                '<div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">' +
                    'Type: ' + escapeHtml(render.documentType ? render.documentType(doc.documentType) : (doc.documentType || '-')) +
                    ' &middot; Uploaded: ' + formatDate(doc.uploadDate) +
                    ' &middot; Expires: ' + formatDate(doc.expirationDate) +
                    ' &middot; Verified: ' + (doc.isVerified ? 'Yes' : 'No') +
                '</div>' +
            '</div>';
        });
        html += '</div>';
        return html;
    }

    function renderCompliance(records) {
        if (!records || records.length === 0) {
            return '<div style="padding: 24px; text-align: center; color: var(--text-secondary);">No compliance records found.</div>';
        }
        var html = '<div style="padding: 8px 0;">';
        records.forEach(function(rec) {
            html += '<div style="padding: 10px 12px; border-bottom: 1px solid var(--border-light);">' +
                '<div style="font-weight: 600; color: var(--text-primary);">' +
                    escapeHtml(render.complianceType ? render.complianceType(rec.complianceType) : (rec.complianceType || '-')) +
                '</div>' +
                '<div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">' +
                    'Status: ' + escapeHtml(rec.status || '-') +
                    ' &middot; Due: ' + formatDate(rec.dueDate) +
                    ' &middot; Completed: ' + formatDate(rec.completionDate) +
                    ' &middot; Expires: ' + formatDate(rec.expirationDate) +
                '</div>' +
            '</div>';
        });
        html += '</div>';
        return html;
    }

    // Helper: info section with title + rows
    function infoSection(title, rows) {
        return '<div style="margin-bottom: 16px;">' +
            '<h4 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px 0; padding: 0 12px;">' +
                escapeHtml(title) +
            '</h4>' +
            '<div>' + rows.join('') + '</div>' +
        '</div>';
    }

    // Helper: single info row
    function infoRow(label, value) {
        var display = value != null && value !== '' && value !== '-' ? String(value) : '-';
        return '<div style="display: flex; justify-content: space-between; padding: 6px 12px; border-bottom: 1px solid var(--border-light);">' +
            '<span style="font-size: 13px; color: var(--text-secondary);">' + escapeHtml(label) + '</span>' +
            '<span style="font-size: 13px; color: var(--text-primary); font-weight: 500;">' + display + '</span>' +
        '</div>';
    }

    // Open the employee detail popup
    async function openEmployeeDetail(item) {
        var employeeId = item.employeeId;

        // Show loading popup
        Layer8MPopup.show({
            title: 'Employee Details',
            content: '<div style="padding: 40px; text-align: center; color: var(--text-secondary);">Loading...</div>',
            size: 'full',
            showFooter: false
        });

        try {
            var employee = await fetchEmployeeWithRelated(employeeId);
            if (!employee) {
                Layer8MPopup.close();
                Layer8MUtils.showError('Employee not found');
                return;
            }

            // Build header
            var initials = (employee.firstName ? employee.firstName.charAt(0) : '') +
                           (employee.lastName ? employee.lastName.charAt(0) : '');
            var positionTitle = employee._position ? employee._position.title : 'No Position';
            var deptName = employee._department ? employee._department.name : 'No Department';

            var headerHtml =
                '<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-light); margin-bottom: 8px;">' +
                    '<div style="width: 48px; height: 48px; border-radius: 50%; background: var(--layer8d-primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; flex-shrink: 0;">' +
                        escapeHtml(initials.toUpperCase()) +
                    '</div>' +
                    '<div style="flex: 1; min-width: 0;">' +
                        '<div style="font-size: 16px; font-weight: 700; color: var(--text-primary);">' +
                            escapeHtml(employee.firstName) + ' ' + escapeHtml(employee.lastName) +
                        '</div>' +
                        '<div style="font-size: 13px; color: var(--text-secondary);">' +
                            escapeHtml(positionTitle) + ' &middot; ' + escapeHtml(deptName) +
                        '</div>' +
                    '</div>' +
                '</div>';

            // Build tabs content
            var tabsContent = [
                { id: 'overview', label: 'Overview' },
                { id: 'employment', label: 'Employment' },
                { id: 'documents', label: 'Docs (' + employee._documents.length + ')' },
                { id: 'compliance', label: 'Comp (' + employee._compliance.length + ')' }
            ];

            var tabsHtml = '<div style="display: flex; border-bottom: 1px solid var(--border-light); margin-bottom: 8px;">';
            tabsContent.forEach(function(tab, i) {
                var activeStyle = i === 0
                    ? 'color: var(--layer8d-primary); border-bottom: 2px solid var(--layer8d-primary);'
                    : 'color: var(--text-secondary); border-bottom: 2px solid transparent;';
                tabsHtml += '<button class="emp-m-tab" data-tab="' + tab.id + '" style="flex: 1; padding: 10px 4px; font-size: 13px; font-weight: 600; background: none; border: none; cursor: pointer; ' + activeStyle + '">' +
                    escapeHtml(tab.label) + '</button>';
            });
            tabsHtml += '</div>';

            // Tab panels — render overview immediately, defer others
            var panelsHtml =
                '<div class="emp-m-panel" data-panel="overview">' + renderOverview(employee) + '</div>' +
                '<div class="emp-m-panel" data-panel="employment" style="display:none;">' + renderEmployment(employee) + '</div>' +
                '<div class="emp-m-panel" data-panel="documents" style="display:none;">' + renderDocuments(employee._documents) + '</div>' +
                '<div class="emp-m-panel" data-panel="compliance" style="display:none;">' + renderCompliance(employee._compliance) + '</div>';

            var content = headerHtml + tabsHtml + panelsHtml;

            // Update popup content
            Layer8MPopup.close();
            Layer8MPopup.show({
                title: escapeHtml(employee.firstName) + ' ' + escapeHtml(employee.lastName),
                content: content,
                size: 'full',
                showFooter: false,
                onShow: function(popup) {
                    // Wire tab switching
                    var tabs = popup.body.querySelectorAll('.emp-m-tab');
                    var panels = popup.body.querySelectorAll('.emp-m-panel');
                    tabs.forEach(function(tab) {
                        tab.addEventListener('click', function() {
                            var targetTab = tab.dataset.tab;
                            tabs.forEach(function(t) {
                                var isActive = t.dataset.tab === targetTab;
                                t.style.color = isActive ? 'var(--layer8d-primary)' : 'var(--text-secondary)';
                                t.style.borderBottom = isActive ? '2px solid var(--layer8d-primary)' : '2px solid transparent';
                            });
                            panels.forEach(function(p) {
                                p.style.display = p.dataset.panel === targetTab ? '' : 'none';
                            });
                        });
                    });
                }
            });

        } catch (error) {
            Layer8MPopup.close();
            Layer8MUtils.showError('Error loading employee: ' + error.message);
        }
    }

    window.MobileEmployeeDetail = {
        open: openEmployeeDetail
    };
})();
