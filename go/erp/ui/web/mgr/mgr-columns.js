/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Manager Portal Column Definitions
(function() {
    'use strict';

    var MGR = window.MGR = window.MGR || {};
    var col = Layer8ColumnFactory;
    var render = MGR.render;
    var renderDate = Layer8DRenderers.renderDate;

    MGR.columns = {
        // Team
        Employee: [
            ...col.id('employeeId'),
            ...col.col('employeeNumber', 'Employee #'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('departmentId', 'Department'),
            ...col.col('positionId', 'Position'),
            ...col.date('hireDate', 'Hire Date')
        ],

        Department: [
            ...col.id('departmentId'),
            ...col.col('departmentName', 'Department'),
            ...col.col('departmentCode', 'Code'),
            ...col.col('managerId', 'Manager'),
            ...col.col('parentDepartmentId', 'Parent Dept.')
        ],

        // Approvals
        LeaveRequest: [
            ...col.id('requestId'),
            ...col.col('employeeId', 'Employee'),
            ...col.enum('leaveType', 'Leave Type', null, render.leaveType),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('totalDays', 'Days'),
            ...col.status('status', 'Status', null, render.leaveRequestStatus)
        ],

        Timesheet: [
            ...col.id('timesheetId'),
            ...col.col('employeeId', 'Employee'),
            ...col.status('status', 'Status', null, render.timesheetStatus),
            ...col.col('totalRegularHours', 'Regular Hrs'),
            ...col.col('totalOvertimeHours', 'OT Hrs'),
            ...col.col('totalHours', 'Total Hrs')
        ],

        // Performance
        PerformanceReview: [
            ...col.id('reviewId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('reviewPeriod', 'Review Period'),
            ...col.status('status', 'Status', null, render.reviewStatus),
            ...col.col('overallRating', 'Rating'),
            ...col.col('reviewerId', 'Reviewer')
        ],

        Goal: [
            ...col.id('goalId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('title', 'Goal'),
            ...col.status('status', 'Status', null, render.goalStatus),
            ...col.status('priority', 'Priority', null, render.goalPriority),
            ...col.col('completionPercentage', 'Completion %'),
            ...col.date('dueDate', 'Due Date')
        ],

        EmployeeSkill: [
            ...col.id('employeeSkillId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('skillId', 'Skill'),
            ...col.col('proficiencyLevel', 'Proficiency'),
            ...col.col('yearsOfExperience', 'Years Exp.'),
            ...col.date('assessmentDate', 'Last Assessed')
        ],

        // Compensation
        CompensationStatement: [
            ...col.id('statementId'),
            ...col.col('employeeId', 'Employee'),
            ...col.col('statementYear', 'Year'),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.money('bonusActual', 'Bonus'),
            ...col.money('totalCompensation', 'Total Comp.')
        ]
    };
})();
