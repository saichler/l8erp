/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// ESS Portal Column Definitions — simplified subset of HCM columns
(function() {
    'use strict';

    var ESS = window.ESS = window.ESS || {};
    var col = Layer8ColumnFactory;
    var render = ESS.render;
    var renderDate = Layer8DRenderers.renderDate;
    var renderDateRange = Layer8DRenderers.renderDateRange;

    ESS.columns = {
        // Profile
        Employee: [
            ...col.id('employeeId'),
            ...col.col('employeeNumber', 'Employee #'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.col('departmentId', 'Department'),
            ...col.col('positionId', 'Position'),
            ...col.date('hireDate', 'Hire Date')
        ],

        EmployeeDocument: [
            ...col.id('documentId'),
            ...col.col('documentType', 'Type'),
            ...col.col('fileUrl', 'File'),
            ...col.date('uploadDate', 'Upload Date'),
            ...col.date('expirationDate', 'Expires')
        ],

        // Pay
        Payslip: [
            ...col.id('payslipId'),
            ...col.date('paymentDate', 'Payment Date'),
            ...col.custom('payPeriod', 'Pay Period', (item) => renderDateRange(item.payPeriod)),
            ...col.money('grossPay', 'Gross Pay'),
            ...col.money('totalDeductions', 'Deductions'),
            ...col.money('netPay', 'Net Pay')
        ],

        YearEndDocument: [
            ...col.id('documentId'),
            ...col.enum('documentType', 'Type', null, render.yearEndDocType),
            ...col.col('taxYear', 'Tax Year'),
            ...col.date('generatedDate', 'Generated'),
            ...col.boolean('isFinalized', 'Finalized')
        ],

        DirectDeposit: [
            ...col.id('directDepositId'),
            ...col.col('bankName', 'Bank'),
            ...col.col('accountName', 'Account Name'),
            ...col.col('accountType', 'Account Type'),
            ...col.col('routingNumber', 'Routing #')
        ],

        CompensationStatement: [
            ...col.id('statementId'),
            ...col.col('statementYear', 'Year'),
            ...col.money('baseSalary', 'Base Salary'),
            ...col.money('bonusActual', 'Bonus'),
            ...col.money('totalCompensation', 'Total Comp.')
        ],

        // Time Off
        LeaveRequest: [
            ...col.id('requestId'),
            ...col.enum('leaveType', 'Leave Type', null, render.leaveType),
            ...col.date('startDate', 'Start Date'),
            ...col.date('endDate', 'End Date'),
            ...col.col('totalDays', 'Days'),
            ...col.status('status', 'Status', null, render.leaveRequestStatus)
        ],

        LeaveBalance: [
            ...col.id('balanceId'),
            ...col.enum('leaveType', 'Leave Type', null, render.leaveType),
            ...col.col('beginningBalance', 'Beginning'),
            ...col.col('annualAllowance', 'Annual Allowance'),
            ...col.col('maximumAccrual', 'Max Accrual'),
            ...col.col('maximumCarryover', 'Max Carryover')
        ],

        Holiday: [
            ...col.id('holidayId'),
            ...col.col('name', 'Holiday'),
            ...col.date('date', 'Date'),
            ...col.enum('holidayType', 'Type', null, render.holidayType),
            ...col.boolean('isRecurring', 'Recurring')
        ],

        // Benefits
        BenefitEnrollment: [
            ...col.id('enrollmentId'),
            ...col.col('planId', 'Plan'),
            ...col.status('status', 'Status', null, render.enrollmentStatus),
            ...col.date('coverageStartDate', 'Start Date'),
            ...col.date('coverageEndDate', 'End Date'),
            ...col.money('employeeCostPerPeriod', 'Employee Cost')
        ],

        BenefitPlan: [
            ...col.id('planId'),
            ...col.col('planType', 'Plan Type'),
            ...col.col('carrierId', 'Carrier'),
            ...col.col('planYear', 'Plan Year'),
            ...col.date('effectiveDate', 'Effective')
        ],

        Dependent: [
            ...col.id('dependentId'),
            ...col.col('firstName', 'First Name'),
            ...col.col('lastName', 'Last Name'),
            ...col.date('dateOfBirth', 'Date of Birth'),
            ...col.col('verificationStatus', 'Verification')
        ],

        // Performance
        PerformanceReview: [
            ...col.id('reviewId'),
            ...col.col('reviewPeriod', 'Review Period'),
            ...col.status('status', 'Status', null, render.reviewStatus),
            ...col.col('overallRating', 'Rating'),
            ...col.col('reviewerId', 'Reviewer')
        ],

        Goal: [
            ...col.id('goalId'),
            ...col.col('title', 'Goal'),
            ...col.status('status', 'Status', null, render.goalStatus),
            ...col.status('priority', 'Priority', null, render.goalPriority),
            ...col.col('completionPercentage', 'Completion %'),
            ...col.date('dueDate', 'Due Date')
        ],

        EmployeeSkill: [
            ...col.id('employeeSkillId'),
            ...col.col('skillId', 'Skill'),
            ...col.col('proficiencyLevel', 'Proficiency'),
            ...col.col('yearsOfExperience', 'Years Exp.'),
            ...col.date('assessmentDate', 'Last Assessed')
        ],

        // Learning
        TrainingRecord: [
            ...col.id('recordId'),
            ...col.col('trainingName', 'Training'),
            ...col.col('trainingType', 'Type'),
            ...col.date('completedDate', 'Completed'),
            ...col.date('expirationDate', 'Expires'),
            ...col.boolean('isCompliant', 'Compliant')
        ],

        EmployeeCertification: [
            ...col.id('employeeCertificationId'),
            ...col.col('certificationId', 'Certification'),
            ...col.col('certificationNumber', 'Cert. #'),
            ...col.status('status', 'Status', null, render.certStatus),
            ...col.date('issueDate', 'Issued'),
            ...col.date('expirationDate', 'Expires')
        ],

        CourseEnrollment: [
            ...col.id('enrollmentId'),
            ...col.col('courseId', 'Course'),
            ...col.col('progressPercentage', 'Progress %'),
            ...col.date('enrolledDate', 'Enrolled'),
            ...col.date('completedDate', 'Completed'),
            ...col.date('dueDate', 'Due Date')
        ]
    };
})();
