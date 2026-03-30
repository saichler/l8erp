/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
// Mobile System Module - Form Configurations
// Uses Layer8FormFactory for reduced boilerplate

(function() {
    'use strict';

    window.MobileSysSecurity = window.MobileSysSecurity || {};

    const f = window.Layer8FormFactory;

    MobileSysSecurity.forms = {
        L8User: f.form('User', [
            f.section('User Information', [
                ...f.text('userId', 'User ID', true),
                ...f.text('fullName', 'Full Name', true),
                ...f.text('email', 'Email'),
                ...f.select('accountStatus', 'Account Status', {
                    'ACCOUNT_STATUS_UNSPECIFIED': 'Unspecified',
                    'ACCOUNT_STATUS_ACTIVE': 'Active',
                    'ACCOUNT_STATUS_INACTIVE': 'Inactive',
                    'ACCOUNT_STATUS_LOCKED': 'Locked',
                    'ACCOUNT_STATUS_SUSPENDED': 'Suspended',
                    'ACCOUNT_STATUS_PENDING_ACTIVATION': 'Pending Activation'
                }),
                ...f.text('portal', 'Portal (path suffix)'),
                ...f.checkbox('fa', 'First-Factor Auth'),
                ...f.checkbox('mustChangePassword', 'Must Change Password')
            ]),
            f.section('Account Activity', [
                ...f.date('lastLogin', 'Last Login'),
                ...f.date('lastFailedLogin', 'Last Failed Login'),
                ...f.number('failedLoginCount', 'Failed Login Count'),
                ...f.date('passwordChangedAt', 'Password Changed At'),
                ...f.date('lockoutUntil', 'Lockout Until'),
                ...f.checkbox('faVerified', 'Auth Verified')
            ])
        ]),

        L8Role: f.form('Role', [
            f.section('Role Information', [
                ...f.text('roleId', 'Role ID', true),
                ...f.text('roleName', 'Role Name', true)
            ])
        ]),

        L8Portal: f.form('Portal', [
            f.section('Portal Info', [
                ...f.text('portalId', 'Portal ID', true)
            ])
        ]),

        L8Credentials: f.form('Credentials', [
            f.section('Credential Information', [
                ...f.text('id', 'ID', true),
                ...f.text('name', 'Name', true)
            ])
        ])
    };

})();
