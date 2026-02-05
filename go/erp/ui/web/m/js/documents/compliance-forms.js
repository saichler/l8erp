/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
(function() {
    'use strict';

    window.MobileDocCompliance = window.MobileDocCompliance || {};
    const enums = MobileDocCompliance.enums;

    MobileDocCompliance.forms = {
        DocRetentionPolicy: {
            title: 'Retention Policy',
            sections: [{ title: 'Policy Details', fields: [
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'description', label: 'Description', type: 'textarea' },
                { key: 'retentionPeriod', label: 'Retention Period (Days)', type: 'number', required: true },
                { key: 'status', label: 'Status', type: 'select', options: enums.RETENTION_STATUS },
                { key: 'isActive', label: 'Active', type: 'checkbox' }
            ]}]
        },
        DocLegalHold: {
            title: 'Legal Hold',
            sections: [{ title: 'Hold Details', fields: [
                { key: 'name', label: 'Name', type: 'text', required: true },
                { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                { key: 'reason', label: 'Reason', type: 'textarea' },
                { key: 'status', label: 'Status', type: 'select', options: enums.LEGAL_HOLD_STATUS }
            ]}]
        },
        DocAccessLog: {
            title: 'Access Log',
            sections: [{ title: 'Log Details', fields: [
                { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                { key: 'accessType', label: 'Access Type', type: 'select', options: enums.ACCESS_TYPE },
                { key: 'ipAddress', label: 'IP Address', type: 'text' }
            ]}]
        },
        DocArchiveJob: {
            title: 'Archive Job',
            sections: [{ title: 'Archive Details', fields: [
                { key: 'documentId', label: 'Document', type: 'reference', lookupModel: 'DocDocument', required: true },
                { key: 'archiveLocation', label: 'Archive Location', type: 'text' },
                { key: 'status', label: 'Status', type: 'select', options: enums.ARCHIVE_STATUS },
                { key: 'notes', label: 'Notes', type: 'textarea' }
            ]}]
        },
        DocAuditTrail: {
            title: 'Audit Trail',
            sections: [{ title: 'Audit Details', fields: [
                { key: 'entityType', label: 'Entity Type', type: 'text', required: true },
                { key: 'entityId', label: 'Entity ID', type: 'text', required: true },
                { key: 'action', label: 'Action', type: 'select', options: enums.AUDIT_ACTION },
                { key: 'details', label: 'Details', type: 'textarea' }
            ]}]
        }
    };

    MobileDocCompliance.primaryKeys = {
        DocRetentionPolicy: 'policyId',
        DocLegalHold: 'holdId',
        DocAccessLog: 'logId',
        DocArchiveJob: 'archiveId',
        DocAuditTrail: 'auditId'
    };

})();
