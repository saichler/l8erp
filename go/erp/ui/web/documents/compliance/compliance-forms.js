/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Documents Compliance Module - Form Definitions

(function() {
    'use strict';

    window.DocCompliance = window.DocCompliance || {};

    const enums = DocCompliance.enums;

    DocCompliance.forms = {
        DocRetentionPolicy: {
            title: 'Retention Policy',
            sections: [
                {
                    title: 'Policy Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'retentionDays', label: 'Retention Days', type: 'number', required: true },
                        { key: 'action', label: 'Action', type: 'select', options: enums.RETENTION_ACTION },
                        { key: 'categoryId', label: 'Category', type: 'reference', lookupModel: 'DocCategory' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        DocLegalHold: {
            title: 'Legal Hold',
            sections: [
                {
                    title: 'Hold Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.LEGAL_HOLD_STATUS },
                        { key: 'matterReference', label: 'Matter Reference', type: 'text' },
                        { key: 'custodianId', label: 'Custodian', type: 'reference', lookupModel: 'Employee' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'reason', label: 'Reason', type: 'textarea' }
                    ]
                }
            ]
        },

        DocAccessLog: {
            title: 'Access Log',
            sections: [
                {
                    title: 'Log Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'action', label: 'Action', type: 'select', options: enums.ACCESS_ACTION },
                        { key: 'ipAddress', label: 'IP Address', type: 'text' },
                        { key: 'userAgent', label: 'User Agent', type: 'text' }
                    ]
                }
            ]
        },

        DocArchiveJob: {
            title: 'Archive Job',
            sections: [
                {
                    title: 'Job Details',
                    fields: [
                        { key: 'policyId', label: 'Policy', type: 'reference', lookupModel: 'DocRetentionPolicy', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ARCHIVE_STATUS },
                        { key: 'startedBy', label: 'Started By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'archiveLocation', label: 'Archive Location', type: 'text' }
                    ]
                }
            ]
        },

        DocAuditTrail: {
            title: 'Audit Trail',
            sections: [
                {
                    title: 'Audit Details',
                    fields: [
                        { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                        { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'action', label: 'Action', type: 'text', required: true },
                        { key: 'fieldName', label: 'Field Name', type: 'text' },
                        { key: 'oldValue', label: 'Old Value', type: 'textarea' },
                        { key: 'newValue', label: 'New Value', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    DocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocAccessLog: 'logId',
        DocArchiveJob: 'jobId',
        DocAuditTrail: 'trailId'
    };

})();
