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
                ...f.text('fullName', 'Full Name', true)
            ])
        ]),

        L8Role: f.form('Role', [
            f.section('Role Information', [
                ...f.text('roleId', 'Role ID', true),
                ...f.text('roleName', 'Role Name', true)
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
