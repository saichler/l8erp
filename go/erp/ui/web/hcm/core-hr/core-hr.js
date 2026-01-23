// Core HR Module - Column Configurations and Form Definitions
// Handles: Employee, Organization, Department, Position, Job, JobFamily, EmployeeDocument, ComplianceRecord

(function() {
    'use strict';

    // Use shared utilities
    const { escapeHtml } = ERPUtils;
    const { renderEnum, renderStatus, createStatusRenderer, renderBoolean, renderDate } = ERPRenderers;

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const EMPLOYMENT_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Inactive',
        3: 'On Leave',
        4: 'Terminated',
        5: 'Retired',
        6: 'Suspended',
        7: 'Pending'
    };

    const EMPLOYMENT_STATUS_VALUES = {
        'active': 1,
        'inactive': 2,
        'leave': 3,
        'terminated': 4,
        'retired': 5,
        'suspended': 6,
        'pending': 7
    };

    const EMPLOYMENT_STATUS_CLASSES = {
        1: 'erp-status-active',
        2: 'erp-status-inactive',
        3: 'erp-status-pending',
        4: 'erp-status-terminated',
        5: 'erp-status-inactive',
        6: 'erp-status-terminated',
        7: 'erp-status-pending'
    };

    const EMPLOYMENT_TYPE = {
        0: 'Unspecified',
        1: 'Full-Time',
        2: 'Part-Time',
        3: 'Contract',
        4: 'Temporary',
        5: 'Intern',
        6: 'Seasonal',
        7: 'Consultant'
    };

    const EMPLOYMENT_TYPE_VALUES = {
        'full-time': 1,
        'fulltime': 1,
        'part-time': 2,
        'parttime': 2,
        'contract': 3,
        'temporary': 4,
        'temp': 4,
        'intern': 5,
        'seasonal': 6,
        'consultant': 7
    };

    const GENDER = {
        0: 'Unspecified',
        1: 'Male',
        2: 'Female',
        3: 'Non-Binary',
        4: 'Other',
        5: 'Prefer Not to Say'
    };

    const MARITAL_STATUS = {
        0: 'Unspecified',
        1: 'Single',
        2: 'Married',
        3: 'Divorced',
        4: 'Widowed',
        5: 'Domestic Partnership',
        6: 'Separated'
    };

    const ORGANIZATION_TYPE = {
        0: 'Unspecified',
        1: 'Company',
        2: 'Division',
        3: 'Business Unit',
        4: 'Region',
        5: 'Cost Center',
        6: 'Legal Entity'
    };

    const ORGANIZATION_TYPE_VALUES = {
        'company': 1,
        'division': 2,
        'business': 3,
        'unit': 3,
        'region': 4,
        'cost': 5,
        'legal': 6
    };

    const POSITION_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'Filled',
        3: 'Frozen',
        4: 'Eliminated'
    };

    const POSITION_STATUS_VALUES = {
        'open': 1,
        'filled': 2,
        'frozen': 3,
        'eliminated': 4
    };

    const POSITION_STATUS_CLASSES = {
        1: 'erp-status-pending',
        2: 'erp-status-active',
        3: 'erp-status-inactive',
        4: 'erp-status-terminated'
    };

    const DOCUMENT_TYPE = {
        0: 'Unspecified',
        1: 'Resume',
        2: 'ID Card',
        3: 'Passport',
        4: 'Drivers License',
        5: 'Work Permit',
        6: 'Visa',
        7: 'I-9 Form',
        8: 'W-4 Form',
        9: 'Offer Letter',
        10: 'Contract',
        11: 'NDA',
        12: 'Certification',
        13: 'Degree',
        14: 'Performance Review',
        99: 'Other'
    };

    const COMPLIANCE_TYPE = {
        0: 'Unspecified',
        1: 'I-9',
        2: 'EEO',
        3: 'VETS-4212',
        4: 'ADA',
        5: 'Background Check',
        6: 'Drug Test',
        7: 'License Verification',
        8: 'Education Verification',
        9: 'Work Authorization'
    };

    // ============================================================================
    // STATUS RENDERERS (using shared factory)
    // ============================================================================

    const renderEmploymentStatus = createStatusRenderer(EMPLOYMENT_STATUS, EMPLOYMENT_STATUS_CLASSES);
    const renderPositionStatus = createStatusRenderer(POSITION_STATUS, POSITION_STATUS_CLASSES);

    // Simple enum renderers
    const renderEmploymentType = (type) => renderEnum(type, EMPLOYMENT_TYPE);
    const renderOrgType = (type) => renderEnum(type, ORGANIZATION_TYPE);
    const renderDocumentType = (type) => renderEnum(type, DOCUMENT_TYPE);
    const renderComplianceType = (type) => renderEnum(type, COMPLIANCE_TYPE);

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    const CORE_HR_COLUMNS = {
        Employee: [
            { key: 'employeeId', label: 'ID', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'employeeNumber', label: 'Emp #', sortKey: 'employeeNumber', filterKey: 'employeeNumber' },
            {
                key: 'name',
                label: 'Name',
                sortKey: 'lastName',
                filterKey: 'lastName',
                render: (item) => {
                    const name = `${item.firstName || ''} ${item.lastName || ''}`.trim();
                    return `<a href="#" class="emp-name-link" onclick="EmployeeDetail.open('${item.employeeId}'); return false;">${escapeHtml(name)}</a>`;
                }
            },
            {
                key: 'employmentStatus',
                label: 'Status',
                sortKey: 'employmentStatus',
                filterKey: 'employmentStatus',
                enumValues: EMPLOYMENT_STATUS_VALUES,
                render: (item) => renderEmploymentStatus(item.employmentStatus)
            },
            {
                key: 'employmentType',
                label: 'Type',
                sortKey: 'employmentType',
                filterKey: 'employmentType',
                enumValues: EMPLOYMENT_TYPE_VALUES,
                render: (item) => renderEmploymentType(item.employmentType)
            },
            {
                key: 'hireDate',
                label: 'Hire Date',
                sortKey: 'hireDate',
                render: (item) => renderDate(item.hireDate)
            }
        ],

        Organization: [
            { key: 'organizationId', label: 'ID', sortKey: 'organizationId', filterKey: 'organizationId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'organizationType',
                label: 'Type',
                sortKey: 'organizationType',
                filterKey: 'organizationType',
                enumValues: ORGANIZATION_TYPE_VALUES,
                render: (item) => renderOrgType(item.organizationType)
            },
            { key: 'legalName', label: 'Legal Name', sortKey: 'legalName', filterKey: 'legalName' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Department: [
            { key: 'departmentId', label: 'ID', sortKey: 'departmentId', filterKey: 'departmentId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            { key: 'managerId', label: 'Manager ID', sortKey: 'managerId', filterKey: 'managerId' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        Position: [
            { key: 'positionId', label: 'ID', sortKey: 'positionId', filterKey: 'positionId' },
            { key: 'positionCode', label: 'Code', sortKey: 'positionCode', filterKey: 'positionCode' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'departmentId', label: 'Dept ID', sortKey: 'departmentId', filterKey: 'departmentId' },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                filterKey: 'status',
                enumValues: POSITION_STATUS_VALUES,
                render: (item) => renderPositionStatus(item.status)
            },
            {
                key: 'headcount',
                label: 'Headcount',
                sortKey: 'headcount',
                render: (item) => `${item.filledCount || 0}/${item.headcount || 0}`
            },
            {
                key: 'isManager',
                label: 'Manager',
                sortKey: 'isManager',
                render: (item) => renderBoolean(item.isManager)
            }
        ],

        Job: [
            { key: 'jobId', label: 'ID', sortKey: 'jobId', filterKey: 'jobId' },
            { key: 'jobCode', label: 'Code', sortKey: 'jobCode', filterKey: 'jobCode' },
            { key: 'title', label: 'Title', sortKey: 'title', filterKey: 'title' },
            { key: 'jobFamilyId', label: 'Family', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'jobLevel', label: 'Level', sortKey: 'jobLevel', filterKey: 'jobLevel' },
            {
                key: 'isFlsaExempt',
                label: 'FLSA Exempt',
                sortKey: 'isFlsaExempt',
                render: (item) => renderBoolean(item.isFlsaExempt, { trueText: 'Exempt', falseText: 'Non-Exempt' })
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        JobFamily: [
            { key: 'jobFamilyId', label: 'ID', sortKey: 'jobFamilyId', filterKey: 'jobFamilyId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'description', label: 'Description', sortKey: 'description', filterKey: 'description' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        EmployeeDocument: [
            { key: 'documentId', label: 'ID', sortKey: 'documentId', filterKey: 'documentId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'documentType',
                label: 'Type',
                sortKey: 'documentType',
                filterKey: 'documentType',
                render: (item) => renderDocumentType(item.documentType)
            },
            {
                key: 'uploadDate',
                label: 'Uploaded',
                sortKey: 'uploadDate',
                render: (item) => renderDate(item.uploadDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            },
            {
                key: 'isVerified',
                label: 'Verified',
                sortKey: 'isVerified',
                render: (item) => renderBoolean(item.isVerified)
            }
        ],

        ComplianceRecord: [
            { key: 'recordId', label: 'ID', sortKey: 'recordId', filterKey: 'recordId' },
            { key: 'employeeId', label: 'Employee', sortKey: 'employeeId', filterKey: 'employeeId' },
            {
                key: 'complianceType',
                label: 'Type',
                sortKey: 'complianceType',
                filterKey: 'complianceType',
                render: (item) => renderComplianceType(item.complianceType)
            },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'completionDate',
                label: 'Completed',
                sortKey: 'completionDate',
                render: (item) => renderDate(item.completionDate)
            },
            {
                key: 'expirationDate',
                label: 'Expires',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            }
        ]
    };

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    const CORE_HR_FORMS = {
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
                        { key: 'gender', label: 'Gender', type: 'select', options: GENDER },
                        { key: 'maritalStatus', label: 'Marital Status', type: 'select', options: MARITAL_STATUS },
                        { key: 'nationality', label: 'Nationality', type: 'text' },
                        { key: 'nationalId', label: 'National ID (SSN)', type: 'text' },
                        { key: 'nationalIdType', label: 'ID Type', type: 'text' }
                    ]
                },
                {
                    title: 'Employment Information',
                    fields: [
                        { key: 'employmentStatus', label: 'Status', type: 'select', options: EMPLOYMENT_STATUS, required: true },
                        { key: 'employmentType', label: 'Type', type: 'select', options: EMPLOYMENT_TYPE, required: true },
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
                        { key: 'organizationId', label: 'Organization', type: 'lookup', lookupModel: 'Organization' },
                        { key: 'departmentId', label: 'Department', type: 'lookup', lookupModel: 'Department' },
                        { key: 'positionId', label: 'Position', type: 'lookup', lookupModel: 'Position' },
                        { key: 'jobId', label: 'Job', type: 'lookup', lookupModel: 'Job' },
                        { key: 'managerId', label: 'Manager', type: 'lookup', lookupModel: 'Employee' },
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
                        { key: 'organizationType', label: 'Type', type: 'select', options: ORGANIZATION_TYPE, required: true },
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
                        { key: 'status', label: 'Status', type: 'select', options: POSITION_STATUS, required: true },
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
                        { key: 'documentType', label: 'Document Type', type: 'select', options: DOCUMENT_TYPE, required: true },
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
                        { key: 'complianceType', label: 'Compliance Type', type: 'select', options: COMPLIANCE_TYPE, required: true },
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

    const CORE_HR_PRIMARY_KEYS = {
        Employee: 'employeeId',
        Organization: 'organizationId',
        Department: 'departmentId',
        Position: 'positionId',
        Job: 'jobId',
        JobFamily: 'jobFamilyId',
        EmployeeDocument: 'documentId',
        ComplianceRecord: 'recordId'
    };

    // ============================================================================
    // EXPORTS
    // ============================================================================

    window.CoreHR = {
        columns: CORE_HR_COLUMNS,
        forms: CORE_HR_FORMS,
        primaryKeys: CORE_HR_PRIMARY_KEYS,
        enums: {
            EMPLOYMENT_STATUS,
            EMPLOYMENT_STATUS_VALUES,
            EMPLOYMENT_TYPE,
            EMPLOYMENT_TYPE_VALUES,
            GENDER,
            MARITAL_STATUS,
            ORGANIZATION_TYPE,
            ORGANIZATION_TYPE_VALUES,
            POSITION_STATUS,
            POSITION_STATUS_VALUES,
            DOCUMENT_TYPE,
            COMPLIANCE_TYPE
        },
        render: {
            employmentStatus: renderEmploymentStatus,
            employmentType: renderEmploymentType,
            orgType: renderOrgType,
            positionStatus: renderPositionStatus,
            documentType: renderDocumentType,
            complianceType: renderComplianceType,
            boolean: renderBoolean,
            date: renderDate
        }
    };

})();
