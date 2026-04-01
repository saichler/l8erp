/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Service Configuration
// Maps manager sections to existing HCM service endpoints (area 30)
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};

    MGR.sections = {
        'team': {
            label: 'My Team', icon: '👥',
            services: [
                { key: 'employees', label: 'Team Members', icon: '👤', endpoint: '/30/Employee', model: 'Employee', readOnly: true },
                { key: 'departments', label: 'Departments', icon: '🏢', endpoint: '/30/Dept', model: 'Department', readOnly: true }
            ]
        },
        'approvals': {
            label: 'Approvals', icon: '✅',
            services: [
                { key: 'leaverequests', label: 'Leave Requests', icon: '🏖️', endpoint: '/30/LeaveReq', model: 'LeaveRequest' },
                { key: 'timesheets', label: 'Timesheets', icon: '⏱️', endpoint: '/30/Timesheet', model: 'Timesheet' }
            ]
        },
        'performance': {
            label: 'Performance', icon: '⭐',
            services: [
                { key: 'reviews', label: 'Reviews', icon: '⭐', endpoint: '/30/PerfRevw', model: 'PerformanceReview' },
                { key: 'goals', label: 'Goals', icon: '🎯', endpoint: '/30/Goal', model: 'Goal' },
                { key: 'skills', label: 'Skills', icon: '💡', endpoint: '/30/EmpSkill', model: 'EmployeeSkill', readOnly: true }
            ]
        },
        'compensation': {
            label: 'Compensation', icon: '💰',
            services: [
                { key: 'compstatements', label: 'Comp Statements', icon: '📄', endpoint: '/30/CompStmt', model: 'CompensationStatement', readOnly: true }
            ]
        }
    };

    // Build a flat service lookup: model -> service
    MGR.serviceMap = {};
    Object.values(MGR.sections).forEach(function(section) {
        section.services.forEach(function(svc) {
            MGR.serviceMap[svc.model] = svc;
        });
    });
})();
