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
// Employee Detail View
// Shows comprehensive employee information with related data from other services

// ============================================================================
// EMPLOYEE DETAIL VIEW
// ============================================================================

// Open employee detail modal
async function openEmployeeDetail(employeeId) {
    // Show loading modal
    const modal = HCMForms.showModal(
        'Employee Details',
        '<div class="hcm-loading">Loading employee data...</div>',
        null
    );

    try {
        // Fetch employee data
        const employee = await fetchEmployeeWithRelated(employeeId);

        if (!employee) {
            HCMForms.closeModal();
            Layer8DNotification.error('Employee not found');
            return;
        }

        // Render detail view
        const content = renderEmployeeDetail(employee);

        // Update modal content
        const modalBody = modal.querySelector('.hcm-modal-body');
        modalBody.innerHTML = content;

        // Update modal to be wider
        const modalEl = modal.querySelector('.hcm-modal');
        modalEl.style.maxWidth = '900px';

        // Hide save button for detail view
        const saveBtn = modal.querySelector('.hcm-modal-save');
        saveBtn.style.display = 'none';

        // Change cancel to close
        const cancelBtn = modal.querySelector('.hcm-modal-cancel');
        cancelBtn.textContent = 'Close';

        // Setup tabs
        setupDetailTabs(modal);

    } catch (error) {
        HCMForms.closeModal();
        Layer8DNotification.error('Error loading employee', [error.message]);
    }
}

// Fetch employee with related data
async function fetchEmployeeWithRelated(employeeId) {
    const headers = typeof getAuthHeaders === 'function' ? getAuthHeaders() : {};

    // Fetch employee
    const empQuery = encodeURIComponent(JSON.stringify({
        text: `select * from Employee where employeeId=${employeeId}`
    }));

    const empResponse = await fetch(`${Layer8DConfig.resolveEndpoint('/30/Employee')}?body=${empQuery}`, {
        method: 'GET',
        headers: headers
    });

    if (!empResponse.ok) {
        throw new Error('Failed to fetch employee');
    }

    const empData = await empResponse.json();
    const employee = empData.list && empData.list.length > 0 ? empData.list[0] : null;

    if (!employee) return null;

    // Fetch related data in parallel
    const [documents, compliance, organization, department, position, job] = await Promise.all([
        fetchRelatedList('EmpDoc', 'EmployeeDocument', 'employeeId', employeeId),
        fetchRelatedList('CompRec', 'ComplianceRecord', 'employeeId', employeeId),
        employee.organizationId ? fetchSingleRecord('Org', 'Organization', 'organizationId', employee.organizationId) : null,
        employee.departmentId ? fetchSingleRecord('Dept', 'Department', 'departmentId', employee.departmentId) : null,
        employee.positionId ? fetchSingleRecord('Position', 'Position', 'positionId', employee.positionId) : null,
        employee.jobId ? fetchSingleRecord('Job', 'Job', 'jobId', employee.jobId) : null
    ]);

    return {
        ...employee,
        _documents: documents || [],
        _compliance: compliance || [],
        _organization: organization,
        _department: department,
        _position: position,
        _job: job
    };
}

// Fetch a list of related records
async function fetchRelatedList(serviceName, modelName, foreignKey, foreignValue) {
    try {
        const headers = typeof getAuthHeaders === 'function' ? getAuthHeaders() : {};
        const query = encodeURIComponent(JSON.stringify({
            text: `select * from ${modelName} where ${foreignKey}=${foreignValue}`
        }));

        const response = await fetch(`${Layer8DConfig.resolveEndpoint('/30/' + serviceName)}?body=${query}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) return [];

        const data = await response.json();
        return data.list || [];
    } catch (error) {
        console.warn(`Failed to fetch ${modelName}:`, error);
        return [];
    }
}

// Fetch a single related record
async function fetchSingleRecord(serviceName, modelName, primaryKey, id) {
    try {
        const headers = typeof getAuthHeaders === 'function' ? getAuthHeaders() : {};
        const query = encodeURIComponent(JSON.stringify({
            text: `select * from ${modelName} where ${primaryKey}=${id}`
        }));

        const response = await fetch(`${Layer8DConfig.resolveEndpoint('/30/' + serviceName)}?body=${query}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data.list && data.list.length > 0 ? data.list[0] : null;
    } catch (error) {
        console.warn(`Failed to fetch ${modelName}:`, error);
        return null;
    }
}

// ============================================================================
// RENDER FUNCTIONS
// ============================================================================

function renderEmployeeDetail(employee) {
    return `
        <div class="emp-detail">
            <!-- Header with photo and basic info -->
            <div class="emp-detail-header">
                <div class="emp-photo">
                    ${employee.photoUrl
                        ? `<img src="${escapeAttr(employee.photoUrl)}" alt="Employee photo">`
                        : `<div class="emp-photo-placeholder">${getInitials(employee)}</div>`
                    }
                </div>
                <div class="emp-header-info">
                    <h2 class="emp-name">${escapeHtml(employee.firstName)} ${escapeHtml(employee.lastName)}</h2>
                    ${employee.preferredName ? `<p class="emp-preferred">"${escapeHtml(employee.preferredName)}"</p>` : ''}
                    <p class="emp-title">${employee._position ? escapeHtml(employee._position.title) : 'No Position'}</p>
                    <p class="emp-dept">${employee._department ? escapeHtml(employee._department.name) : 'No Department'}</p>
                    <div class="emp-badges">
                        ${CoreHR.render.employmentStatus(employee.employmentStatus)}
                        <span class="hcm-status">${CoreHR.render.employmentType(employee.employmentType)}</span>
                    </div>
                </div>
                <div class="emp-header-actions">
                    <button class="hcm-btn hcm-btn-secondary" onclick="openEditEmployeeFromDetail('${employee.employeeId}')">
                        Edit
                    </button>
                </div>
            </div>

            <!-- Tabs -->
            <div class="emp-detail-tabs">
                <button class="emp-tab active" data-tab="overview">Overview</button>
                <button class="emp-tab" data-tab="employment">Employment</button>
                <button class="emp-tab" data-tab="documents">Documents (${employee._documents.length})</button>
                <button class="emp-tab" data-tab="compliance">Compliance (${employee._compliance.length})</button>
            </div>

            <!-- Tab Content -->
            <div class="emp-tab-content">
                <div class="emp-tab-panel active" data-panel="overview">
                    ${renderOverviewTab(employee)}
                </div>
                <div class="emp-tab-panel" data-panel="employment">
                    ${renderEmploymentTab(employee)}
                </div>
                <div class="emp-tab-panel" data-panel="documents">
                    ${renderDocumentsTab(employee._documents)}
                </div>
                <div class="emp-tab-panel" data-panel="compliance">
                    ${renderComplianceTab(employee._compliance)}
                </div>
            </div>
        </div>
    `;
}

function renderOverviewTab(employee) {
    return `
        <div class="emp-overview-grid">
            <div class="emp-info-card">
                <h4>Personal Information</h4>
                <div class="emp-info-grid">
                    <div class="emp-info-item">
                        <label>Employee ID</label>
                        <span>${escapeHtml(employee.employeeId)}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Employee Number</label>
                        <span>${escapeHtml(employee.employeeNumber || '-')}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Full Name</label>
                        <span>${escapeHtml(employee.firstName)} ${escapeHtml(employee.middleName || '')} ${escapeHtml(employee.lastName)}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Date of Birth</label>
                        <span>${CoreHR.render.date(employee.dateOfBirth)}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Gender</label>
                        <span>${CoreHR.enums.GENDER[employee.gender] || '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Marital Status</label>
                        <span>${CoreHR.enums.MARITAL_STATUS[employee.maritalStatus] || '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Nationality</label>
                        <span>${escapeHtml(employee.nationality || '-')}</span>
                    </div>
                </div>
            </div>

            <div class="emp-info-card">
                <h4>Organization</h4>
                <div class="emp-info-grid">
                    <div class="emp-info-item">
                        <label>Organization</label>
                        <span>${employee._organization ? escapeHtml(employee._organization.name) : '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Department</label>
                        <span>${employee._department ? escapeHtml(employee._department.name) : '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Position</label>
                        <span>${employee._position ? escapeHtml(employee._position.title) : '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Job</label>
                        <span>${employee._job ? escapeHtml(employee._job.title) : '-'}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Work Location</label>
                        <span>${escapeHtml(employee.workLocationId || '-')}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Cost Center</label>
                        <span>${escapeHtml(employee.costCenterId || '-')}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderEmploymentTab(employee) {
    return `
        <div class="emp-info-card">
            <h4>Employment Details</h4>
            <div class="emp-info-grid">
                <div class="emp-info-item">
                    <label>Employment Status</label>
                    <span>${CoreHR.render.employmentStatus(employee.employmentStatus)}</span>
                </div>
                <div class="emp-info-item">
                    <label>Employment Type</label>
                    <span>${CoreHR.render.employmentType(employee.employmentType)}</span>
                </div>
                <div class="emp-info-item">
                    <label>Hire Date</label>
                    <span>${CoreHR.render.date(employee.hireDate)}</span>
                </div>
                <div class="emp-info-item">
                    <label>Original Hire Date</label>
                    <span>${CoreHR.render.date(employee.originalHireDate)}</span>
                </div>
                <div class="emp-info-item">
                    <label>Is Rehire</label>
                    <span>${CoreHR.render.boolean(employee.isRehire)}</span>
                </div>
                ${employee.employmentStatus === 4 ? `
                    <div class="emp-info-item">
                        <label>Termination Date</label>
                        <span>${CoreHR.render.date(employee.terminationDate)}</span>
                    </div>
                    <div class="emp-info-item">
                        <label>Termination Reason</label>
                        <span>${escapeHtml(employee.terminationReason || '-')}</span>
                    </div>
                ` : ''}
            </div>
        </div>

        <div class="emp-info-card">
            <h4>Manager</h4>
            <div class="emp-info-grid">
                <div class="emp-info-item">
                    <label>Manager ID</label>
                    <span>${employee.managerId ? `<a href="#" onclick="openEmployeeDetail('${employee.managerId}'); return false;">${escapeHtml(employee.managerId)}</a>` : '-'}</span>
                </div>
            </div>
        </div>
    `;
}

function renderDocumentsTab(documents) {
    if (!documents || documents.length === 0) {
        return `
            <div class="emp-empty-state">
                <p>No documents found for this employee.</p>
            </div>
        `;
    }

    return `
        <table class="emp-detail-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Uploaded</th>
                    <th>Expires</th>
                    <th>Verified</th>
                </tr>
            </thead>
            <tbody>
                ${documents.map(doc => `
                    <tr>
                        <td>${escapeHtml(doc.name)}</td>
                        <td>${CoreHR.render.documentType(doc.documentType)}</td>
                        <td>${CoreHR.render.date(doc.uploadDate)}</td>
                        <td>${CoreHR.render.date(doc.expirationDate)}</td>
                        <td>${CoreHR.render.boolean(doc.isVerified)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderComplianceTab(compliance) {
    if (!compliance || compliance.length === 0) {
        return `
            <div class="emp-empty-state">
                <p>No compliance records found for this employee.</p>
            </div>
        `;
    }

    return `
        <table class="emp-detail-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Expires</th>
                </tr>
            </thead>
            <tbody>
                ${compliance.map(rec => `
                    <tr>
                        <td>${CoreHR.render.complianceType(rec.complianceType)}</td>
                        <td>${escapeHtml(rec.status)}</td>
                        <td>${CoreHR.render.date(rec.dueDate)}</td>
                        <td>${CoreHR.render.date(rec.completionDate)}</td>
                        <td>${CoreHR.render.date(rec.expirationDate)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getInitials(employee) {
    const first = employee.firstName ? employee.firstName.charAt(0).toUpperCase() : '';
    const last = employee.lastName ? employee.lastName.charAt(0).toUpperCase() : '';
    return first + last;
}

function setupDetailTabs(modal) {
    const tabs = modal.querySelectorAll('.emp-tab');
    const panels = modal.querySelectorAll('.emp-tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update active panel
            panels.forEach(p => {
                p.classList.toggle('active', p.dataset.panel === targetTab);
            });
        });
    });
}

function openEditEmployeeFromDetail(employeeId) {
    HCMForms.closeModal();
    // Get the employee service config
    const service = HCM_MODULES['core-hr'].services.find(s => s.model === 'Employee');
    if (service) {
        openEditModal(service, employeeId);
    }
}

function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

function escapeAttr(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof window !== 'undefined') {
    window.EmployeeDetail = {
        open: openEmployeeDetail,
        openEditFromDetail: openEditEmployeeFromDetail
    };
}
