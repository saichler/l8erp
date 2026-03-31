/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Service Configuration
// Maps ESS sections to existing HCM service endpoints (area 30)
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};

    ESS.sections = {
        'profile': {
            label: 'My Profile', icon: '👤',
            services: [
                { key: 'myprofile', label: 'Personal Info', icon: '👤', endpoint: '/30/Employee', model: 'Employee', singleRecord: true },
                { key: 'documents', label: 'My Documents', icon: '📄', endpoint: '/30/EmpDoc', model: 'EmployeeDocument', readOnly: true }
            ]
        },
        'pay': {
            label: 'Pay', icon: '💰',
            services: [
                { key: 'payslips', label: 'Pay Stubs', icon: '📃', endpoint: '/30/Payslip', model: 'Payslip', readOnly: true },
                { key: 'yearend', label: 'Tax Documents', icon: '📋', endpoint: '/30/YrEndDoc', model: 'YearEndDocument', readOnly: true },
                { key: 'directdeposit', label: 'Direct Deposit', icon: '🏦', endpoint: '/30/DirDep', model: 'DirectDeposit', readOnly: true },
                { key: 'compensation', label: 'Total Compensation', icon: '📄', endpoint: '/30/CompStmt', model: 'CompensationStatement', readOnly: true }
            ]
        },
        'timeoff': {
            label: 'Time Off', icon: '🏖️',
            services: [
                { key: 'requests', label: 'My Requests', icon: '📝', endpoint: '/30/LeaveReq', model: 'LeaveRequest' },
                { key: 'balances', label: 'Balances', icon: '📊', endpoint: '/30/LeaveBal', model: 'LeaveBalance', readOnly: true },
                { key: 'holidays', label: 'Holidays', icon: '🎉', endpoint: '/30/Holiday', model: 'Holiday', readOnly: true }
            ]
        },
        'benefits': {
            label: 'Benefits', icon: '🏥',
            services: [
                { key: 'enrollments', label: 'My Benefits', icon: '✅', endpoint: '/30/BenEnrol', model: 'BenefitEnrollment', readOnly: true },
                { key: 'plans', label: 'Available Plans', icon: '📦', endpoint: '/30/BenPlan', model: 'BenefitPlan', readOnly: true },
                { key: 'dependents', label: 'Dependents', icon: '👨‍👩‍👧', endpoint: '/30/Dependent', model: 'Dependent', readOnly: true }
            ]
        },
        'performance': {
            label: 'Performance', icon: '⭐',
            services: [
                { key: 'reviews', label: 'My Reviews', icon: '⭐', endpoint: '/30/PerfRevw', model: 'PerformanceReview', readOnly: true },
                { key: 'goals', label: 'My Goals', icon: '🎯', endpoint: '/30/Goal', model: 'Goal' },
                { key: 'skills', label: 'My Skills', icon: '💡', endpoint: '/30/EmpSkill', model: 'EmployeeSkill', readOnly: true }
            ]
        },
        'learning': {
            label: 'Learning', icon: '📚',
            services: [
                { key: 'training', label: 'Training History', icon: '📋', endpoint: '/30/TrnRec', model: 'TrainingRecord', readOnly: true },
                { key: 'certs', label: 'Certifications', icon: '🏆', endpoint: '/30/EmpCert', model: 'EmployeeCertification', readOnly: true },
                { key: 'enrollments', label: 'Course Enrollments', icon: '✅', endpoint: '/30/CrsEnrol', model: 'CourseEnrollment', readOnly: true }
            ]
        }
    };

    // Build a flat service lookup: model -> { endpoint, readOnly }
    ESS.serviceMap = {};
    Object.values(ESS.sections).forEach(function(section) {
        section.services.forEach(function(svc) {
            ESS.serviceMap[svc.model] = svc;
        });
    });
})();
