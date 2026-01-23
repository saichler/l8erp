// HCM Module - Main JavaScript
// Handles module tab switching and sub-navigation

(function() {
    'use strict';

    // Import shared utilities
    const { escapeHtml, formatDate, formatMoney } = ERPUtils;

    // HCM Module Configuration
    const HCM_MODULES = {
        'core-hr': {
            label: 'Core HR',
            icon: '👤',
            services: [
                { key: 'employees', label: 'Employees', icon: '👤', endpoint: '/erp/30/Employee', model: 'Employee' },
                { key: 'positions', label: 'Positions', icon: '💼', endpoint: '/erp/30/Position', model: 'Position' },
                { key: 'jobs', label: 'Jobs', icon: '📋', endpoint: '/erp/30/Job', model: 'Job' },
                { key: 'job-families', label: 'Job Families', icon: '📁', endpoint: '/erp/30/JobFamily', model: 'JobFamily' },
                { key: 'organizations', label: 'Organizations', icon: '🏛️', endpoint: '/erp/30/Org', model: 'Organization' },
                { key: 'departments', label: 'Departments', icon: '🏬', endpoint: '/erp/30/Dept', model: 'Department' },
                { key: 'documents', label: 'Documents', icon: '📄', endpoint: '/erp/30/EmpDoc', model: 'EmployeeDocument' },
                { key: 'compliance', label: 'Compliance', icon: '✓', endpoint: '/erp/30/CompRec', model: 'ComplianceRecord' }
            ]
        },
        'payroll': {
            label: 'Payroll',
            icon: '💰',
            services: [
                { key: 'pay-structures', label: 'Pay Structures', icon: '💰', endpoint: '/erp/30/PayStruct', model: 'PayStructure' },
                { key: 'pay-components', label: 'Pay Components', icon: '📊', endpoint: '/erp/30/PayComp', model: 'PayComponent' },
                { key: 'payroll-runs', label: 'Payroll Runs', icon: '▶️', endpoint: '/erp/30/PayRun', model: 'PayrollRun' },
                { key: 'payslips', label: 'Payslips', icon: '📃', endpoint: '/erp/30/Payslip', model: 'Payslip' },
                { key: 'tax-withholdings', label: 'Tax Withholdings', icon: '🏛️', endpoint: '/erp/30/TaxWith', model: 'TaxWithholding' },
                { key: 'direct-deposits', label: 'Direct Deposits', icon: '🏦', endpoint: '/erp/30/DirDep', model: 'DirectDeposit' },
                { key: 'garnishments', label: 'Garnishments', icon: '⚖️', endpoint: '/erp/30/Garnish', model: 'Garnishment' },
                { key: 'year-end-docs', label: 'Year-End Docs', icon: '📋', endpoint: '/erp/30/YrEndDoc', model: 'YearEndDocument' }
            ]
        },
        'benefits': {
            label: 'Benefits',
            icon: '🏥',
            services: [
                { key: 'benefit-plans', label: 'Benefit Plans', icon: '📦', endpoint: '/erp/30/BenPlan', model: 'BenefitPlan' },
                { key: 'enrollments', label: 'Enrollments', icon: '✅', endpoint: '/erp/30/BenEnrol', model: 'BenefitEnrollment' },
                { key: 'carriers', label: 'Carriers', icon: '🏥', endpoint: '/erp/30/Carrier', model: 'Carrier' },
                { key: 'dependents', label: 'Dependents', icon: '👨‍👩‍👧', endpoint: '/erp/30/Dependent', model: 'Dependent' },
                { key: 'life-events', label: 'Life Events', icon: '🔄', endpoint: '/erp/30/LifeEvent', model: 'LifeEvent' },
                { key: 'cobra-events', label: 'COBRA Events', icon: '📋', endpoint: '/erp/30/COBRAEvt', model: 'COBRAEvent' }
            ]
        },
        'time': {
            label: 'Time',
            icon: '⏱️',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: '⏱️', endpoint: '/erp/30/Timesheet', model: 'Timesheet' },
                { key: 'leave-requests', label: 'Leave Requests', icon: '🏖️', endpoint: '/erp/30/LeaveReq', model: 'LeaveRequest' },
                { key: 'leave-balances', label: 'Leave Balances', icon: '📊', endpoint: '/erp/30/LeaveBal', model: 'LeaveBalance' },
                { key: 'leave-policies', label: 'Leave Policies', icon: '📜', endpoint: '/erp/30/LeavePol', model: 'LeavePolicy' },
                { key: 'shifts', label: 'Shifts', icon: '🔄', endpoint: '/erp/30/Shift', model: 'Shift' },
                { key: 'schedules', label: 'Schedules', icon: '📅', endpoint: '/erp/30/Schedule', model: 'Schedule' },
                { key: 'holidays', label: 'Holidays', icon: '🎉', endpoint: '/erp/30/Holiday', model: 'Holiday' },
                { key: 'absences', label: 'Absences', icon: '🚫', endpoint: '/erp/30/Absence', model: 'Absence' }
            ]
        },
        'talent': {
            label: 'Talent',
            icon: '⭐',
            services: [
                { key: 'reviews', label: 'Reviews', icon: '⭐', endpoint: '/erp/30/PerfRevw', model: 'PerformanceReview' },
                { key: 'goals', label: 'Goals', icon: '🎯', endpoint: '/erp/30/Goal', model: 'Goal' },
                { key: 'feedback', label: 'Feedback', icon: '💬', endpoint: '/erp/30/Feedback', model: 'Feedback' },
                { key: 'career-paths', label: 'Career Paths', icon: '📈', endpoint: '/erp/30/CarPath', model: 'CareerPath' },
                { key: 'succession', label: 'Succession Plans', icon: '👑', endpoint: '/erp/30/SuccPlan', model: 'SuccessionPlan' },
                { key: 'requisitions', label: 'Requisitions', icon: '📝', endpoint: '/erp/30/JobReq', model: 'JobRequisition' },
                { key: 'applicants', label: 'Applicants', icon: '👥', endpoint: '/erp/30/Applicant', model: 'Applicant' },
                { key: 'applications', label: 'Applications', icon: '📨', endpoint: '/erp/30/Applctn', model: 'Application' },
                { key: 'onboarding', label: 'Onboarding', icon: '🚀', endpoint: '/erp/30/OnbrdTsk', model: 'OnboardingTask' }
            ]
        },
        'learning': {
            label: 'Learning',
            icon: '📚',
            services: [
                { key: 'courses', label: 'Courses', icon: '📚', endpoint: '/erp/30/Course', model: 'Course' },
                { key: 'sessions', label: 'Sessions', icon: '📅', endpoint: '/erp/30/CrsSess', model: 'CourseSession' },
                { key: 'course-enrollments', label: 'Enrollments', icon: '✅', endpoint: '/erp/30/CrsEnrol', model: 'CourseEnrollment' },
                { key: 'certifications', label: 'Certifications', icon: '🏆', endpoint: '/erp/30/Cert', model: 'Certification' },
                { key: 'emp-certifications', label: 'Emp. Certs', icon: '📜', endpoint: '/erp/30/EmpCert', model: 'EmployeeCertification' },
                { key: 'skills', label: 'Skills', icon: '💡', endpoint: '/erp/30/Skill', model: 'Skill' },
                { key: 'emp-skills', label: 'Emp. Skills', icon: '🎓', endpoint: '/erp/30/EmpSkill', model: 'EmployeeSkill' },
                { key: 'training-records', label: 'Training Records', icon: '📋', endpoint: '/erp/30/TrnRec', model: 'TrainingRecord' }
            ]
        },
        'compensation': {
            label: 'Compensation',
            icon: '💵',
            services: [
                { key: 'salary-grades', label: 'Salary Grades', icon: '📊', endpoint: '/erp/30/SalGrade', model: 'SalaryGrade' },
                { key: 'salary-structures', label: 'Salary Structures', icon: '💰', endpoint: '/erp/30/SalStrct', model: 'SalaryStructure' },
                { key: 'emp-compensation', label: 'Emp. Compensation', icon: '💵', endpoint: '/erp/30/EmpComp', model: 'EmployeeCompensation' },
                { key: 'merit-increases', label: 'Merit Increases', icon: '📈', endpoint: '/erp/30/MeritInc', model: 'MeritIncrease' },
                { key: 'merit-cycles', label: 'Merit Cycles', icon: '🔄', endpoint: '/erp/30/MrtCycle', model: 'MeritCycle' },
                { key: 'bonus-plans', label: 'Bonus Plans', icon: '🎁', endpoint: '/erp/30/BonusPlan', model: 'BonusPlan' },
                { key: 'bonus-payments', label: 'Bonus Payments', icon: '💸', endpoint: '/erp/30/BonusPay', model: 'BonusPayment' },
                { key: 'equity-grants', label: 'Equity Grants', icon: '📈', endpoint: '/erp/30/EqGrant', model: 'EquityGrant' },
                { key: 'comp-statements', label: 'Comp. Statements', icon: '📄', endpoint: '/erp/30/CompStmt', model: 'CompensationStatement' },
                { key: 'market-benchmarks', label: 'Market Benchmarks', icon: '📊', endpoint: '/erp/30/MktBench', model: 'MarketBenchmark' }
            ]
        }
    };

    // Current state
    let currentModule = 'core-hr';
    let currentService = 'employees';
    let serviceTables = {};

    // Initialize HCM module
    function initializeHCM() {
        // Clear cached table references since DOM was replaced
        serviceTables = {};

        // Reset to default module/service
        currentModule = 'core-hr';
        currentService = 'employees';

        setupModuleTabs();
        setupSubNavigation();
        loadServiceView(currentModule, currentService);
    }

    // Setup module tab click handlers
    function setupModuleTabs() {
        const tabs = document.querySelectorAll('.hcm-module-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const moduleKey = tab.dataset.module;
                switchModule(moduleKey);
            });
        });
    }

    // Switch to a different module
    function switchModule(moduleKey) {
        if (!HCM_MODULES[moduleKey]) return;

        currentModule = moduleKey;

        // Update tab active state
        document.querySelectorAll('.hcm-module-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.module === moduleKey);
        });

        // Update content visibility
        document.querySelectorAll('.hcm-module-content').forEach(content => {
            content.classList.toggle('active', content.dataset.module === moduleKey);
        });

        // Load first service of the module
        const firstService = HCM_MODULES[moduleKey].services[0];
        if (firstService) {
            currentService = firstService.key;
            updateSubNavActive(currentService);
            loadServiceView(moduleKey, firstService.key);
        }
    }

    // Setup sub-navigation click handlers
    function setupSubNavigation() {
        document.querySelectorAll('.hcm-subnav').forEach(subnav => {
            subnav.addEventListener('click', (e) => {
                const item = e.target.closest('.hcm-subnav-item');
                if (!item) return;

                const serviceKey = item.dataset.service;
                const moduleKey = item.closest('.hcm-module-content').dataset.module;

                currentService = serviceKey;
                updateSubNavActive(serviceKey, moduleKey);
                loadServiceView(moduleKey, serviceKey);
            });
        });
    }

    // Update sub-navigation active state
    function updateSubNavActive(serviceKey, moduleKey) {
        moduleKey = moduleKey || currentModule;
        const moduleContent = document.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-subnav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.service === serviceKey);
        });
    }

    // Load a service view
    function loadServiceView(moduleKey, serviceKey) {
        const module = HCM_MODULES[moduleKey];
        if (!module) return;

        const service = module.services.find(s => s.key === serviceKey);
        if (!service) return;

        // Update service view visibility
        const moduleContent = document.querySelector(`.hcm-module-content[data-module="${moduleKey}"]`);
        if (!moduleContent) return;

        moduleContent.querySelectorAll('.hcm-service-view').forEach(view => {
            view.classList.toggle('active', view.dataset.service === serviceKey);
        });

        // Initialize table if not already done
        const tableId = `${moduleKey}-${serviceKey}-table`;
        if (!serviceTables[tableId]) {
            initializeServiceTable(moduleKey, service, tableId);
        }
    }

    // Initialize a service table
    function initializeServiceTable(moduleKey, service, tableId) {
        const containerId = `${moduleKey}-${service.key}-table-container`;
        const container = document.getElementById(containerId);

        if (!container) {
            console.warn(`Container not found: ${containerId}`);
            return;
        }

        // Get column configuration for this service
        const columns = getServiceColumns(service.model);
        const primaryKey = getServicePrimaryKey(service.model);

        // Create table instance
        const table = new L8Table({
            containerId: containerId,
            endpoint: service.endpoint,
            modelName: service.model,
            serverSide: true,
            columns: columns,
            primaryKey: primaryKey,
            pageSize: 10,
            onAdd: () => openAddModal(service),
            onEdit: (id) => openEditModal(service, id),
            onDelete: (id) => confirmDeleteItem(service, id),
            onRowClick: (item, id) => showDetailsModal(service, item, id),
            addButtonText: `Add ${service.label.replace(/s$/, '')}`
        });

        table.init();
        serviceTables[tableId] = table;
    }

    // Get column configuration for a service model
    function getServiceColumns(modelName) {
        // Check for Core HR columns
        if (typeof CoreHR !== 'undefined' && CoreHR.columns && CoreHR.columns[modelName]) {
            return CoreHR.columns[modelName];
        }

        // Check for Payroll columns
        if (typeof Payroll !== 'undefined' && Payroll.columns && Payroll.columns[modelName]) {
            return Payroll.columns[modelName];
        }

        // Check for Benefits columns
        if (typeof Benefits !== 'undefined' && Benefits.columns && Benefits.columns[modelName]) {
            return Benefits.columns[modelName];
        }

        // Check for Time columns
        if (typeof Time !== 'undefined' && Time.columns && Time.columns[modelName]) {
            return Time.columns[modelName];
        }

        // Check for Talent columns
        if (typeof Talent !== 'undefined' && Talent.columns && Talent.columns[modelName]) {
            return Talent.columns[modelName];
        }

        // Check for Learning columns
        if (typeof Learning !== 'undefined' && Learning.columns && Learning.columns[modelName]) {
            return Learning.columns[modelName];
        }

        // Check for Compensation columns
        if (typeof Compensation !== 'undefined' && Compensation.columns && Compensation.columns[modelName]) {
            return Compensation.columns[modelName];
        }

        // Default columns for models not yet configured
        return [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'status', label: 'Status' }
        ];
    }

    // Get form definition for a service model
    function getServiceFormDef(modelName) {
        // Check Core HR forms
        if (typeof CoreHR !== 'undefined' && CoreHR.forms && CoreHR.forms[modelName]) {
            return CoreHR.forms[modelName];
        }

        // Check Payroll forms
        if (typeof Payroll !== 'undefined' && Payroll.forms && Payroll.forms[modelName]) {
            return Payroll.forms[modelName];
        }

        // Check Benefits forms
        if (typeof Benefits !== 'undefined' && Benefits.forms && Benefits.forms[modelName]) {
            return Benefits.forms[modelName];
        }

        // Check Time forms
        if (typeof Time !== 'undefined' && Time.forms && Time.forms[modelName]) {
            return Time.forms[modelName];
        }

        // Check Talent forms
        if (typeof Talent !== 'undefined' && Talent.forms && Talent.forms[modelName]) {
            return Talent.forms[modelName];
        }

        // Check Learning forms
        if (typeof Learning !== 'undefined' && Learning.forms && Learning.forms[modelName]) {
            return Learning.forms[modelName];
        }

        // Check Compensation forms
        if (typeof Compensation !== 'undefined' && Compensation.forms && Compensation.forms[modelName]) {
            return Compensation.forms[modelName];
        }

        return null;
    }

    // Get details configuration for a service model
    function getServiceDetailsConfig(modelName) {
        // Check Core HR details config
        if (typeof CoreHR !== 'undefined' && CoreHR.detailsConfig && CoreHR.detailsConfig[modelName]) {
            return CoreHR.detailsConfig[modelName];
        }

        // Check Payroll details config
        if (typeof Payroll !== 'undefined' && Payroll.detailsConfig && Payroll.detailsConfig[modelName]) {
            return Payroll.detailsConfig[modelName];
        }

        // Check Benefits details config
        if (typeof Benefits !== 'undefined' && Benefits.detailsConfig && Benefits.detailsConfig[modelName]) {
            return Benefits.detailsConfig[modelName];
        }

        // Check Time details config
        if (typeof Time !== 'undefined' && Time.detailsConfig && Time.detailsConfig[modelName]) {
            return Time.detailsConfig[modelName];
        }

        // Check Talent details config
        if (typeof Talent !== 'undefined' && Talent.detailsConfig && Talent.detailsConfig[modelName]) {
            return Talent.detailsConfig[modelName];
        }

        // Check Learning details config
        if (typeof Learning !== 'undefined' && Learning.detailsConfig && Learning.detailsConfig[modelName]) {
            return Learning.detailsConfig[modelName];
        }

        // Check Compensation details config
        if (typeof Compensation !== 'undefined' && Compensation.detailsConfig && Compensation.detailsConfig[modelName]) {
            return Compensation.detailsConfig[modelName];
        }

        return null;
    }

    // Get primary key for a service model
    function getServicePrimaryKey(modelName) {
        // Check Core HR primary keys
        if (typeof CoreHR !== 'undefined' && CoreHR.primaryKeys && CoreHR.primaryKeys[modelName]) {
            return CoreHR.primaryKeys[modelName];
        }

        // Check Payroll primary keys
        if (typeof Payroll !== 'undefined' && Payroll.primaryKeys && Payroll.primaryKeys[modelName]) {
            return Payroll.primaryKeys[modelName];
        }

        // Check Benefits primary keys
        if (typeof Benefits !== 'undefined' && Benefits.primaryKeys && Benefits.primaryKeys[modelName]) {
            return Benefits.primaryKeys[modelName];
        }

        // Check Time primary keys
        if (typeof Time !== 'undefined' && Time.primaryKeys && Time.primaryKeys[modelName]) {
            return Time.primaryKeys[modelName];
        }

        // Check Talent primary keys
        if (typeof Talent !== 'undefined' && Talent.primaryKeys && Talent.primaryKeys[modelName]) {
            return Talent.primaryKeys[modelName];
        }

        // Check Learning primary keys
        if (typeof Learning !== 'undefined' && Learning.primaryKeys && Learning.primaryKeys[modelName]) {
            return Learning.primaryKeys[modelName];
        }

        // Check Compensation primary keys
        if (typeof Compensation !== 'undefined' && Compensation.primaryKeys && Compensation.primaryKeys[modelName]) {
            return Compensation.primaryKeys[modelName];
        }

        // Default fallback
        return 'id';
    }

    // Render status badge (uses shared erp-status-* classes)
    function renderStatus(status) {
        const statusMap = {
            1: { label: 'Active', class: 'erp-status-active' },
            0: { label: 'Inactive', class: 'erp-status-inactive' },
            2: { label: 'Pending', class: 'erp-status-pending' },
            3: { label: 'Terminated', class: 'erp-status-terminated' }
        };

        const config = statusMap[status] || { label: status, class: '' };
        return `<span class="erp-status ${config.class}">${escapeHtml(config.label)}</span>`;
    }

    // Open add modal
    function openAddModal(service) {
        const formDef = getServiceFormDef(service.model);

        if (!formDef || typeof HCMForms === 'undefined') {
            alert(`Add ${service.label} - Form not yet configured`);
            return;
        }

        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: getServicePrimaryKey(service.model),
            modelName: service.model
        };

        HCMForms.openAddForm(serviceConfig, formDef, () => {
            refreshCurrentTable();
        });
    }

    // Open edit modal
    function openEditModal(service, id) {
        const formDef = getServiceFormDef(service.model);

        if (!formDef || typeof HCMForms === 'undefined') {
            alert(`Edit ${service.label} - Form not yet configured`);
            return;
        }

        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: getServicePrimaryKey(service.model),
            modelName: service.model
        };

        HCMForms.openEditForm(serviceConfig, formDef, id, () => {
            refreshCurrentTable();
        });
    }

    // Confirm delete
    function confirmDeleteItem(service, id) {
        const serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: getServicePrimaryKey(service.model),
            modelName: service.model
        };

        if (typeof HCMForms !== 'undefined') {
            HCMForms.confirmDelete(serviceConfig, id, () => {
                refreshCurrentTable();
            });
        } else if (confirm(`Are you sure you want to delete this ${service.label.replace(/s$/, '')}?`)) {
            deleteItem(service, id);
        }
    }

    // Delete item
    async function deleteItem(service, id) {
        try {
            const response = await fetch(`${service.endpoint}?id=${id}`, {
                method: 'DELETE',
                headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Delete failed');
            }

            // Refresh table
            const tableId = `${currentModule}-${service.key}-table`;
            if (serviceTables[tableId]) {
                serviceTables[tableId].fetchData(1, serviceTables[tableId].pageSize);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete item');
        }
    }

    // Get service info by key
    function getServiceInfo(moduleKey, serviceKey) {
        const module = HCM_MODULES[moduleKey];
        if (!module) return null;
        return module.services.find(s => s.key === serviceKey);
    }

    // Refresh current table
    function refreshCurrentTable() {
        const tableId = `${currentModule}-${currentService}-table`;
        if (serviceTables[tableId]) {
            serviceTables[tableId].fetchData(1, serviceTables[tableId].pageSize);
        }
    }

    // Show details modal for a record using ERPPopup (reuses edit form with disabled fields)
    function showDetailsModal(service, item, itemId) {
        const formDef = getServiceFormDef(service.model);

        if (!formDef || typeof HCMForms === 'undefined') {
            alert('Details view not available');
            return;
        }

        const title = `${service.label.replace(/s$/, '')} Details`;

        // Generate form HTML with the item data (same as edit form)
        let content = HCMForms.generateFormHtml(formDef, item);

        // Show popup using ERPPopup
        ERPPopup.show({
            title: title,
            content: content,
            size: 'large',
            showFooter: false,
            onShow: (body) => {
                // Disable all form inputs
                body.querySelectorAll('input, select, textarea').forEach(el => {
                    el.disabled = true;
                });
            }
        });
    }

    // Get display value for a field in details view
    function getFieldDisplayValue(item, field) {
        let value = item[field.key];

        // Handle nested keys
        if (field.key && field.key.includes('.')) {
            const keys = field.key.split('.');
            value = item;
            for (const k of keys) {
                if (value === null || value === undefined) break;
                value = value[k];
            }
        }

        if (value === null || value === undefined || value === '') {
            return '<span class="detail-empty">-</span>';
        }

        // Apply render function if provided
        if (field.render) {
            return field.render(item);
        }

        // Handle special types
        if (field.type === 'date' && typeof value === 'number') {
            return escapeHtml(formatDate(value));
        }

        if (field.type === 'currency' && typeof value === 'number') {
            return escapeHtml(formatMoney(value));
        }

        if (field.type === 'boolean') {
            return value ? '<span class="detail-value status-online">Yes</span>' : '<span class="detail-value status-offline">No</span>';
        }

        if (field.enumLabels && field.enumLabels[value] !== undefined) {
            return escapeHtml(field.enumLabels[value]);
        }

        return escapeHtml(String(value));
    }

    // Format field label from camelCase key
    function formatFieldLabel(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/Id$/, ' ID')
            .trim();
    }

    // Format field value for display
    function formatFieldValue(key, value) {
        if (value === null || value === undefined || value === '') {
            return '<span class="detail-empty">-</span>';
        }

        // Detect and format dates (Unix timestamps in seconds)
        if ((key.toLowerCase().includes('date') || key.toLowerCase().includes('time') || key.toLowerCase().endsWith('at'))
            && typeof value === 'number' && value > 1000000000 && value < 2000000000) {
            return escapeHtml(formatDate(value));
        }

        // Format boolean values
        if (typeof value === 'boolean') {
            return value ? '<span class="detail-value status-online">Yes</span>' : '<span class="detail-value status-offline">No</span>';
        }

        // Format arrays
        if (Array.isArray(value)) {
            if (value.length === 0) return '<span class="detail-empty">-</span>';
            return escapeHtml(value.join(', '));
        }

        // Format objects
        if (typeof value === 'object') {
            return '<span class="detail-empty">[Object]</span>';
        }

        return escapeHtml(String(value));
    }

    // Export for use in other modules
    window.HCM = {
        modules: HCM_MODULES,
        initialize: initializeHCM,
        switchModule: switchModule,
        loadServiceView: loadServiceView,
        getServiceInfo: getServiceInfo,
        refreshCurrentTable: refreshCurrentTable,
        renderStatus: renderStatus
    };

    // Also expose initializeHCM globally for sections.js compatibility
    window.initializeHCM = initializeHCM;

})();
