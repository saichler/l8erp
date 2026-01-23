// Core HR Module - Form Definitions
// Form field configurations for all Core HR models

(function() {
    'use strict';

    // Ensure CoreHR namespace exists
    window.CoreHR = window.CoreHR || {};

    const enums = CoreHR.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    CoreHR.forms = {
        Employee: {
            title: 'Employee',
            sections: [
                {
                    title: 'Personal Information',
                    fields: [
                        { key: 'employeeNumber', label: 'Employee Number', type: 'text', required: true },
                        { key: 'firstName', label: 'First Name', type: 'text', required: true },
                        { key: 'middleName', label: 'Middle Name', type: 'text' },
                        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
                        { key: 'preferredName', label: 'Preferred Name', type: 'text' },
                        { key: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                        { key: 'gender', label: 'Gender', type: 'select', options: enums.GENDER },
                        { key: 'maritalStatus', label: 'Marital Status', type: 'select', options: enums.MARITAL_STATUS },
                        { key: 'nationality', label: 'Nationality', type: 'text' },
                        { key: 'nationalId', label: 'National ID (SSN)', type: 'text' },
                        { key: 'nationalIdType', label: 'ID Type', type: 'text' }
                    ]
                },
                {
                    title: 'Employment Information',
                    fields: [
                        { key: 'employmentStatus', label: 'Status', type: 'select', options: enums.EMPLOYMENT_STATUS, required: true },
                        { key: 'employmentType', label: 'Type', type: 'select', options: enums.EMPLOYMENT_TYPE, required: true },
                        { key: 'hireDate', label: 'Hire Date', type: 'date', required: true },
                        { key: 'originalHireDate', label: 'Original Hire Date', type: 'date' },
                        { key: 'terminationDate', label: 'Termination Date', type: 'date' },
                        { key: 'terminationReason', label: 'Termination Reason', type: 'text' },
                        { key: 'isRehire', label: 'Is Rehire', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Organizational Placement',
                    fields: [
                        {
                            key: 'organizationId',
                            label: 'Organization',
                            type: 'reference',
                            referenceConfig: {
                                modelName: 'Organization',
                                idColumn: 'organizationId',
                                displayColumn: 'name',
                                title: 'Select Organization'
                            }
                        },
                        {
                            key: 'departmentId',
                            label: 'Department',
                            type: 'reference',
                            referenceConfig: {
                                modelName: 'Department',
                                idColumn: 'departmentId',
                                displayColumn: 'name',
                                title: 'Select Department'
                            }
                        },
                        {
                            key: 'positionId',
                            label: 'Position',
                            type: 'reference',
                            referenceConfig: {
                                modelName: 'Position',
                                idColumn: 'positionId',
                                displayColumn: 'title',
                                title: 'Select Position'
                            }
                        },
                        {
                            key: 'jobId',
                            label: 'Job',
                            type: 'reference',
                            referenceConfig: {
                                modelName: 'Job',
                                idColumn: 'jobId',
                                displayColumn: 'title',
                                title: 'Select Job'
                            }
                        },
                        {
                            key: 'managerId',
                            label: 'Manager',
                            type: 'reference',
                            referenceConfig: {
                                modelName: 'Employee',
                                idColumn: 'employeeId',
                                displayColumn: 'lastName',
                                selectColumns: ['employeeId', 'lastName', 'firstName'],
                                displayFormat: function(item) {
                                    return item.lastName + ', ' + item.firstName;
                                },
                                displayLabel: 'Name',
                                title: 'Select Manager'
                            }
                        },
                        { key: 'workLocationId', label: 'Work Location', type: 'text' },
                        { key: 'costCenterId', label: 'Cost Center', type: 'text' }
                    ]
                }
            ]
        },

        Organization: {
            title: 'Organization',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'legalName', label: 'Legal Name', type: 'text' },
                        { key: 'organizationType', label: 'Type', type: 'select', options: enums.ORGANIZATION_TYPE, required: true },
                        { key: 'parentOrganizationId', label: 'Parent Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'taxId', label: 'Tax ID', type: 'text' },
                        { key: 'industryCode', label: 'Industry Code', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                }
            ]
        },

        Department: {
            title: 'Department',
            sections: [
                {
                    title: 'Basic Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization', required: true },
                        { key: 'parentDepartmentId', label: 'Parent Department', type: 'lookup', lookupModel: 'Department' },
                        { key: 'managerId', label: 'Manager', type: 'lookup', lookupModel: 'Employee' },
                        { key: 'costCenterId', label: 'Cost Center', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                }
            ]
        },

        Position: {
            title: 'Position',
            sections: [
                {
                    title: 'Position Details',
                    fields: [
                        { key: 'positionCode', label: 'Position Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'jobId', label: 'Job', type: 'lookup', lookupModel: 'Job', required: true },
                        { key: 'departmentId', label: 'Department', type: 'lookup', lookupModel: 'Department', required: true },
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'reportsToPositionId', label: 'Reports To', type: 'lookup', lookupModel: 'Position' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.POSITION_STATUS, required: true },
                        { key: 'headcount', label: 'Headcount', type: 'number', required: true },
                        { key: 'isManager', label: 'Is Manager Position', type: 'checkbox' },
                        { key: 'isKeyPosition', label: 'Is Key Position', type: 'checkbox' },
                        { key: 'workLocationId', label: 'Work Location', type: 'text' },
                        { key: 'costCenterId', label: 'Cost Center', type: 'text' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                }
            ]
        },

        Job: {
            title: 'Job',
            sections: [
                {
                    title: 'Job Details',
                    fields: [
                        { key: 'jobCode', label: 'Job Code', type: 'text', required: true },
                        { key: 'title', label: 'Title', type: 'text', required: true },
                        { key: 'jobFamilyId', label: 'Job Family', type: 'lookup', lookupModel: 'JobFamily' },
                        { key: 'jobLevel', label: 'Level', type: 'text' },
                        { key: 'summary', label: 'Summary', type: 'textarea' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'educationRequirement', label: 'Education Requirement', type: 'text' },
                        { key: 'experienceRequirement', label: 'Experience Requirement', type: 'text' },
                        { key: 'isFlsaExempt', label: 'FLSA Exempt', type: 'checkbox' },
                        { key: 'eeoCategory', label: 'EEO Category', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' }
                    ]
                }
            ]
        },

        JobFamily: {
            title: 'Job Family',
            sections: [
                {
                    title: 'Job Family Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        EmployeeDocument: {
            title: 'Employee Document',
            sections: [
                {
                    title: 'Document Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'name', label: 'Document Name', type: 'text', required: true },
                        { key: 'documentType', label: 'Document Type', type: 'select', options: enums.DOCUMENT_TYPE, required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'fileUrl', label: 'File URL', type: 'text' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'isVerified', label: 'Verified', type: 'checkbox' },
                        { key: 'verifiedBy', label: 'Verified By', type: 'text' },
                        { key: 'verifiedDate', label: 'Verification Date', type: 'date' }
                    ]
                }
            ]
        },

        ComplianceRecord: {
            title: 'Compliance Record',
            sections: [
                {
                    title: 'Compliance Details',
                    fields: [
                        { key: 'employeeId', label: 'Employee', type: 'lookup', lookupModel: 'Employee', required: true },
                        { key: 'complianceType', label: 'Compliance Type', type: 'select', options: enums.COMPLIANCE_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'text', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date' },
                        { key: 'completionDate', label: 'Completion Date', type: 'date' },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' },
                        { key: 'documentId', label: 'Document', type: 'lookup', lookupModel: 'EmployeeDocument' },
                        { key: 'notes', label: 'Notes', type: 'textarea' },
                        { key: 'verifiedBy', label: 'Verified By', type: 'text' },
                        { key: 'verifiedDate', label: 'Verification Date', type: 'date' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    CoreHR.primaryKeys = {
        Employee: 'employeeId',
        Organization: 'organizationId',
        Department: 'departmentId',
        Position: 'positionId',
        Job: 'jobId',
        JobFamily: 'jobFamilyId',
        EmployeeDocument: 'documentId',
        ComplianceRecord: 'recordId'
    };

})();
