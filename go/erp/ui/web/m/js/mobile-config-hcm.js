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
 * Mobile Config Data - HCM Modules & Reference Registry
 * Registers HCM module navigation and reference picker configs into Layer8MConfig.
 */
(function() {
    'use strict';

    // HCM Module Configuration
    Layer8MConfig.registerModules({
        'core-hr': {
            label: 'Core HR',
            icon: 'user',
            services: [
                { key: 'employees', label: 'Employees', icon: 'user', endpoint: '/30/Employee', model: 'Employee' },
                { key: 'positions', label: 'Positions', icon: 'briefcase', endpoint: '/30/Position', model: 'Position' },
                { key: 'jobs', label: 'Jobs', icon: 'clipboard', endpoint: '/30/Job', model: 'Job' },
                { key: 'job-families', label: 'Job Families', icon: 'folder', endpoint: '/30/JobFamily', model: 'JobFamily' },
                { key: 'organizations', label: 'Organizations', icon: 'building', endpoint: '/30/Org', model: 'Organization' },
                { key: 'departments', label: 'Departments', icon: 'sitemap', endpoint: '/30/Dept', model: 'Department' }
            ]
        },
        'payroll': {
            label: 'Payroll',
            icon: 'money',
            services: [
                { key: 'pay-structures', label: 'Pay Structures', icon: 'money', endpoint: '/30/PayStruct', model: 'PayStructure' },
                { key: 'pay-components', label: 'Pay Components', icon: 'chart', endpoint: '/30/PayComp', model: 'PayComponent' },
                { key: 'payroll-runs', label: 'Payroll Runs', icon: 'play', endpoint: '/30/PayRun', model: 'PayrollRun' },
                { key: 'payslips', label: 'Payslips', icon: 'file', endpoint: '/30/Payslip', model: 'Payslip' },
                { key: 'tax-withholdings', label: 'Tax Withholdings', icon: 'building', endpoint: '/30/TaxWith', model: 'TaxWithholding' },
                { key: 'direct-deposits', label: 'Direct Deposits', icon: 'bank', endpoint: '/30/DirDep', model: 'DirectDeposit' }
            ]
        },
        'benefits': {
            label: 'Benefits',
            icon: 'heart',
            services: [
                { key: 'benefit-plans', label: 'Benefit Plans', icon: 'box', endpoint: '/30/BenPlan', model: 'BenefitPlan' },
                { key: 'enrollments', label: 'Enrollments', icon: 'check', endpoint: '/30/BenEnrol', model: 'BenefitEnrollment' },
                { key: 'carriers', label: 'Carriers', icon: 'heart', endpoint: '/30/Carrier', model: 'Carrier' },
                { key: 'dependents', label: 'Dependents', icon: 'users', endpoint: '/30/Dependent', model: 'Dependent' },
                { key: 'life-events', label: 'Life Events', icon: 'refresh', endpoint: '/30/LifeEvent', model: 'LifeEvent' }
            ]
        },
        'time': {
            label: 'Time',
            icon: 'clock',
            services: [
                { key: 'timesheets', label: 'Timesheets', icon: 'clock', endpoint: '/30/Timesheet', model: 'Timesheet' },
                { key: 'leave-requests', label: 'Leave Requests', icon: 'calendar', endpoint: '/30/LeaveReq', model: 'LeaveRequest' },
                { key: 'leave-balances', label: 'Leave Balances', icon: 'chart', endpoint: '/30/LeaveBal', model: 'LeaveBalance' },
                { key: 'schedules', label: 'Schedules', icon: 'calendar', endpoint: '/30/Schedule', model: 'Schedule' },
                { key: 'holidays', label: 'Holidays', icon: 'star', endpoint: '/30/Holiday', model: 'Holiday' }
            ]
        },
        'talent': {
            label: 'Talent',
            icon: 'star',
            services: [
                { key: 'reviews', label: 'Reviews', icon: 'star', endpoint: '/30/PerfRevw', model: 'PerformanceReview' },
                { key: 'goals', label: 'Goals', icon: 'target', endpoint: '/30/Goal', model: 'Goal' },
                { key: 'requisitions', label: 'Requisitions', icon: 'file', endpoint: '/30/JobReq', model: 'JobRequisition' },
                { key: 'applicants', label: 'Applicants', icon: 'users', endpoint: '/30/Applicant', model: 'Applicant' }
            ]
        },
        'learning': {
            label: 'Learning',
            icon: 'book',
            services: [
                { key: 'courses', label: 'Courses', icon: 'book', endpoint: '/30/Course', model: 'Course' },
                { key: 'sessions', label: 'Sessions', icon: 'calendar', endpoint: '/30/CrsSess', model: 'CourseSession' },
                { key: 'certifications', label: 'Certifications', icon: 'award', endpoint: '/30/Cert', model: 'Certification' },
                { key: 'skills', label: 'Skills', icon: 'lightbulb', endpoint: '/30/Skill', model: 'Skill' }
            ]
        },
        'compensation': {
            label: 'Compensation',
            icon: 'dollar',
            services: [
                { key: 'salary-grades', label: 'Salary Grades', icon: 'chart', endpoint: '/30/SalGrade', model: 'SalaryGrade' },
                { key: 'salary-structures', label: 'Salary Structures', icon: 'money', endpoint: '/30/SalStrct', model: 'SalaryStructure' },
                { key: 'bonus-plans', label: 'Bonus Plans', icon: 'gift', endpoint: '/30/BonusPlan', model: 'BonusPlan' }
            ]
        }
    });

    // HCM Reference Registry for mobile picker
    Layer8MConfig.registerReferences({
        Employee: {
            idColumn: 'employeeId', displayColumn: 'lastName', endpoint: '/30/Employee',
            displayField: 'lastName', idField: 'employeeId', searchFields: ['firstName', 'lastName', 'email'],
            displayFormat: function(item) { return item.lastName + ', ' + item.firstName; }
        },
        Organization: {
            idColumn: 'organizationId', displayColumn: 'name', endpoint: '/30/Org',
            displayField: 'name', idField: 'organizationId', searchFields: ['name', 'code']
        },
        Department: {
            idColumn: 'departmentId', displayColumn: 'name', endpoint: '/30/Dept',
            displayField: 'name', idField: 'departmentId', searchFields: ['name', 'code']
        },
        Position: {
            idColumn: 'positionId', displayColumn: 'title', endpoint: '/30/Position',
            displayField: 'title', idField: 'positionId', searchFields: ['title', 'code']
        },
        Job: {
            idColumn: 'jobId', displayColumn: 'title', endpoint: '/30/Job',
            displayField: 'title', idField: 'jobId', searchFields: ['title', 'code']
        },
        JobFamily: {
            idColumn: 'jobFamilyId', displayColumn: 'name', endpoint: '/30/JobFamily',
            displayField: 'name', idField: 'jobFamilyId', searchFields: ['name']
        },
        BenefitPlan: {
            idColumn: 'planId', displayColumn: 'name', endpoint: '/30/BenPlan',
            displayField: 'name', idField: 'planId', searchFields: ['name']
        },
        Carrier: {
            idColumn: 'carrierId', displayColumn: 'name', endpoint: '/30/Carrier',
            displayField: 'name', idField: 'carrierId', searchFields: ['name']
        },
        Dependent: {
            idColumn: 'dependentId', displayColumn: 'firstName', endpoint: '/30/Dependent',
            displayField: 'firstName', idField: 'dependentId', searchFields: ['firstName', 'lastName'],
            displayFormat: function(item) { return item.lastName + ', ' + item.firstName; }
        },
        LeavePolicy: {
            idColumn: 'policyId', displayColumn: 'name', endpoint: '/30/LeavePolicy',
            displayField: 'name', idField: 'policyId', searchFields: ['name']
        },
        Shift: {
            idColumn: 'shiftId', displayColumn: 'name', endpoint: '/30/Shift',
            displayField: 'name', idField: 'shiftId', searchFields: ['name']
        },
        Course: {
            idColumn: 'courseId', displayColumn: 'title', endpoint: '/30/Course',
            displayField: 'title', idField: 'courseId', searchFields: ['title', 'code']
        },
        Certification: {
            idColumn: 'certificationId', displayColumn: 'name', endpoint: '/30/Cert',
            displayField: 'name', idField: 'certificationId', searchFields: ['name']
        },
        Skill: {
            idColumn: 'skillId', displayColumn: 'name', endpoint: '/30/Skill',
            displayField: 'name', idField: 'skillId', searchFields: ['name']
        },
        SalaryGrade: {
            idColumn: 'gradeId', displayColumn: 'name', endpoint: '/30/SalGrade',
            displayField: 'name', idField: 'gradeId', searchFields: ['name']
        },
        SalaryStructure: {
            idColumn: 'structureId', displayColumn: 'name', endpoint: '/30/SalStrct',
            displayField: 'name', idField: 'structureId', searchFields: ['name']
        },
        PayStructure: {
            idColumn: 'structureId', displayColumn: 'name', endpoint: '/30/PayStruct',
            displayField: 'name', idField: 'structureId', searchFields: ['name']
        },
        PayrollRun: {
            idColumn: 'payrollRunId', displayColumn: 'payrollRunId', endpoint: '/30/PayRun',
            displayField: 'payrollRunId', idField: 'payrollRunId', searchFields: ['payrollRunId']
        },
        BonusPlan: {
            idColumn: 'planId', displayColumn: 'name', endpoint: '/30/BonusPlan',
            displayField: 'name', idField: 'planId', searchFields: ['name']
        },
        JobRequisition: {
            idColumn: 'requisitionId', displayColumn: 'title', endpoint: '/30/JobReq',
            displayField: 'title', idField: 'requisitionId', searchFields: ['title']
        },
        Applicant: {
            idColumn: 'applicantId', displayColumn: 'lastName', endpoint: '/30/Applicant',
            displayField: 'lastName', idField: 'applicantId', searchFields: ['firstName', 'lastName', 'email'],
            displayFormat: function(item) { return item.lastName + ', ' + item.firstName; }
        }
    });

})();
