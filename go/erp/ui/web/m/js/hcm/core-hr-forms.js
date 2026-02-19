/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile Core HR Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileCoreHR = window.MobileCoreHR || {};

    const f = window.Layer8FormFactory;
    const enums = MobileCoreHR.enums;

    MobileCoreHR.forms = {
        Employee: f.form('Employee', [
            f.section('Personal Information', [
                ...f.text('employeeNumber', 'Employee Number', true),
                ...f.text('firstName', 'First Name', true),
                ...f.text('middleName', 'Middle Name'),
                ...f.text('lastName', 'Last Name', true),
                ...f.text('preferredName', 'Preferred Name'),
                ...f.date('dateOfBirth', 'Date of Birth'),
                ...f.select('gender', 'Gender', enums.GENDER),
                ...f.select('maritalStatus', 'Marital Status', enums.MARITAL_STATUS),
                ...f.text('nationality', 'Nationality'),
                ...f.ssn('nationalId', 'SSN'),
                ...f.text('nationalIdType', 'ID Type'),
                ...f.text('suffix', 'Suffix'),
                ...f.text('citizenship', 'Citizenship'),
                ...f.text('photoUrl', 'Photo URL'),
            ]),
            f.section('Employment Information', [
                ...f.select('employmentStatus', 'Status', enums.EMPLOYMENT_STATUS, true),
                ...f.select('employmentType', 'Type', enums.EMPLOYMENT_TYPE, true),
                ...f.date('hireDate', 'Hire Date', true),
                ...f.date('originalHireDate', 'Original Hire Date'),
                ...f.date('terminationDate', 'Termination Date'),
                ...f.text('terminationReason', 'Termination Reason'),
                ...f.checkbox('isRehire', 'Is Rehire'),
                ...f.reference('applicationId', 'Application', 'Application')
            ]),
            f.section('Organizational Placement', [
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('departmentId', 'Department', 'Department'),
                ...f.reference('positionId', 'Position', 'Position'),
                ...f.reference('jobId', 'Job', 'Job'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.text('workLocationId', 'Work Location'),
                ...f.text('costCenterId', 'Cost Center')
            ])
        ]),

        Organization: f.form('Organization', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.text('legalName', 'Legal Name'),
                ...f.select('organizationType', 'Type', enums.ORGANIZATION_TYPE, true),
                ...f.reference('parentOrganizationId', 'Parent Organization', 'Organization'),
                ...f.ein('taxId', 'Tax ID (EIN)'),
                ...f.text('industryCode', 'Industry Code'),
                ...f.checkbox('isActive', 'Active'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date')
            ])
        ]),

        Department: f.form('Department', [
            f.section('Basic Information', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.reference('organizationId', 'Organization', 'Organization', true),
                ...f.reference('parentDepartmentId', 'Parent Department', 'Department'),
                ...f.reference('managerId', 'Manager', 'Employee'),
                ...f.text('costCenterId', 'Cost Center'),
                ...f.checkbox('isActive', 'Active'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date')
            ])
        ]),

        Position: f.form('Position', [
            f.section('Position Details', [
                ...f.text('positionCode', 'Position Code', true),
                ...f.text('title', 'Title', true),
                ...f.reference('jobId', 'Job', 'Job', true),
                ...f.reference('departmentId', 'Department', 'Department', true),
                ...f.reference('organizationId', 'Organization', 'Organization'),
                ...f.reference('reportsToPositionId', 'Reports To', 'Position'),
                ...f.select('status', 'Status', enums.POSITION_STATUS, true),
                ...f.number('headcount', 'Headcount', true),
                ...f.checkbox('isManager', 'Is Manager Position'),
                ...f.checkbox('isKeyPosition', 'Is Key Position'),
                ...f.text('workLocationId', 'Work Location'),
                ...f.text('costCenterId', 'Cost Center'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.number('filledCount', 'Filled Count'),
            ])
        ]),

        Job: f.form('Job', [
            f.section('Job Details', [
                ...f.text('jobCode', 'Job Code', true),
                ...f.text('title', 'Title', true),
                ...f.reference('jobFamilyId', 'Job Family', 'JobFamily'),
                ...f.text('jobLevel', 'Level'),
                ...f.textarea('summary', 'Summary'),
                ...f.textarea('description', 'Description'),
                ...f.text('educationRequirement', 'Education Requirement'),
                ...f.text('experienceRequirement', 'Experience Requirement'),
                ...f.checkbox('isFlsaExempt', 'FLSA Exempt'),
                ...f.text('eeoCategory', 'EEO Category'),
                ...f.checkbox('isActive', 'Active'),
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('endDate', 'End Date'),
                ...f.text('responsibilities', 'Responsibilities'),
                ...f.text('qualifications', 'Qualifications'),
                ...f.text('requiredSkills', 'Required Skills'),
                ...f.text('preferredSkills', 'Preferred Skills'),
                ...f.text('certificationsRequired', 'Certifications Required'),
            ])
        ]),

        JobFamily: f.form('Job Family', [
            f.section('Job Family Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        EmployeeDocument: f.form('Employee Document', [
            f.section('Document Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.text('name', 'Document Name', true),
                ...f.select('documentType', 'Document Type', enums.DOCUMENT_TYPE, true),
                ...f.textarea('description', 'Description'),
                ...f.url('fileUrl', 'File URL'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.checkbox('isVerified', 'Verified'),
                ...f.text('verifiedBy', 'Verified By'),
                ...f.date('verifiedDate', 'Verification Date'),
                ...f.text('fileType', 'File Type'),
                ...f.number('fileSizeBytes', 'File Size Bytes'),
                ...f.date('uploadDate', 'Upload Date'),
            ])
        ]),

        ComplianceRecord: f.form('Compliance Record', [
            f.section('Compliance Details', [
                ...f.reference('employeeId', 'Employee', 'Employee', true),
                ...f.select('complianceType', 'Compliance Type', enums.COMPLIANCE_TYPE, true),
                ...f.text('status', 'Status', true),
                ...f.date('dueDate', 'Due Date'),
                ...f.date('completionDate', 'Completion Date'),
                ...f.date('expirationDate', 'Expiration Date'),
                ...f.reference('documentId', 'Document', 'EmployeeDocument'),
                ...f.textarea('notes', 'Notes'),
                ...f.text('verifiedBy', 'Verified By'),
                ...f.date('verifiedDate', 'Verification Date')
            ])
        ])
    };

})();
