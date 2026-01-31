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
// Security Users - Custom CRUD Handler
// Handles nested roles map in L8User via checkbox assignment

(function() {
    'use strict';

    var allRoles = {};

    // Fetch all roles for checkbox display
    async function fetchAllRoles() {
        try {
            var query = encodeURIComponent(JSON.stringify({ text: 'select * from L8Role' }));
            var response = await fetch('/erp/74/roles?body=' + query, {
                method: 'GET',
                headers: typeof getAuthHeaders === 'function' ? getAuthHeaders() : {}
            });
            if (!response.ok) return;
            var data = await response.json();
            allRoles = {};
            if (data && data.list) {
                data.list.forEach(function(role) {
                    allRoles[role.roleId] = role;
                });
            }
        } catch (e) {
            console.error('Error fetching roles:', e);
        }
    }

    // Generate role checkboxes HTML
    function generateRoleCheckboxes(userRoles) {
        var roleKeys = Object.keys(allRoles);
        if (roleKeys.length === 0) {
            return '<p style="color: #999; padding: 10px;">No roles available. Create roles first.</p>';
        }
        return roleKeys.map(function(roleId) {
            var role = allRoles[roleId];
            var checked = userRoles[roleId] === true ? ' checked' : '';
            return '<div class="sys-checkbox-item">' +
                '<input type="checkbox" id="role-' + ERPUtils.escapeAttr(roleId) + '" name="role-' + ERPUtils.escapeAttr(roleId) + '"' + checked + '>' +
                '<label for="role-' + ERPUtils.escapeAttr(roleId) + '">' + ERPUtils.escapeHtml(role.roleName) + ' (' + ERPUtils.escapeHtml(roleId) + ')</label>' +
                '</div>';
        }).join('');
    }

    // Generate user form HTML
    function generateUserFormHtml(user, isEdit) {
        var userId = user ? user.userId || '' : '';
        var fullName = user ? user.fullName || '' : '';
        var userRoles = user ? user.roles || {} : {};

        var passwordSection = isEdit ? '' :
            '<div class="form-group">' +
            '<label for="sys-user-password">Password</label>' +
            '<input type="password" id="sys-user-password" name="sys-user-password" placeholder="Enter password" required>' +
            '</div>';

        return '<div class="form-group">' +
            '<label for="sys-user-id">User ID</label>' +
            '<input type="text" id="sys-user-id" name="sys-user-id" value="' + ERPUtils.escapeAttr(userId) + '"' + (isEdit ? ' disabled' : '') + ' required>' +
            '</div>' +
            '<div class="form-group">' +
            '<label for="sys-user-fullname">Full Name</label>' +
            '<input type="text" id="sys-user-fullname" name="sys-user-fullname" value="' + ERPUtils.escapeAttr(fullName) + '" required>' +
            '</div>' +
            passwordSection +
            '<div class="form-group">' +
            '<label>Assigned Roles</label>' +
            '<div class="sys-checkbox-list">' +
            generateRoleCheckboxes(userRoles) +
            '</div>' +
            '</div>';
    }

    // Collect selected roles from popup body
    function collectSelectedRoles(body) {
        var selectedRoles = {};
        var checkboxes = body.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(cb) {
            if (cb.name && cb.name.startsWith('role-') && cb.checked) {
                var roleId = cb.name.replace('role-', '');
                selectedRoles[roleId] = true;
            }
        });
        return selectedRoles;
    }

    // Open Add User modal
    async function openAdd(service) {
        await fetchAllRoles();
        var formHtml = generateUserFormHtml(null, false);

        ERPPopup.show({
            title: 'Add User',
            content: formHtml,
            size: 'medium',
            showFooter: true,
            saveButtonText: 'Save',
            onSave: function() {
                handleSave(service, false);
            }
        });
    }

    // Open Edit User modal
    async function openEdit(service, userId) {
        await fetchAllRoles();

        var user = null;
        try {
            user = await ERPForms.fetchRecord(service.endpoint, 'userId', userId, 'L8User');
        } catch (e) {
            ERPNotification.error('Failed to load user');
            return;
        }
        if (!user) {
            ERPNotification.error('User not found');
            return;
        }

        var formHtml = generateUserFormHtml(user, true);

        ERPPopup.show({
            title: 'Edit User',
            content: formHtml,
            size: 'medium',
            showFooter: true,
            saveButtonText: 'Save',
            onSave: function() {
                handleSave(service, true, userId);
            }
        });
    }

    // Handle save
    async function handleSave(service, isEdit, existingUserId) {
        var body = ERPPopup.getBody();
        if (!body) return;

        var userIdEl = body.querySelector('#sys-user-id');
        var fullNameEl = body.querySelector('#sys-user-fullname');
        var passwordEl = body.querySelector('#sys-user-password');

        var userId = userIdEl ? userIdEl.value.trim() : '';
        var fullName = fullNameEl ? fullNameEl.value.trim() : '';

        if (!userId || !fullName) {
            ERPNotification.warning('Please fill in User ID and Full Name');
            return;
        }

        var selectedRoles = collectSelectedRoles(body);

        var userData;
        if (isEdit) {
            userData = {
                userId: existingUserId,
                fullName: fullName,
                roles: selectedRoles
            };
        } else {
            var password = passwordEl ? passwordEl.value : '';
            if (!password) {
                ERPNotification.warning('Password is required for new users');
                return;
            }
            userData = {
                userId: userId,
                fullName: fullName,
                password: { hash: password },
                roles: selectedRoles
            };
        }

        try {
            await ERPForms.saveRecord(service.endpoint, userData, isEdit);
            ERPPopup.close();
            SYS.refreshCurrentTable();
        } catch (e) {
            ERPNotification.error('Error saving user: ' + e.message);
        }
    }

    // Confirm delete
    function confirmDelete(service, userId) {
        var serviceConfig = {
            endpoint: service.endpoint,
            primaryKey: 'userId',
            modelName: 'L8User'
        };
        ERPForms.confirmDelete(serviceConfig, userId, function() {
            SYS.refreshCurrentTable();
        });
    }

    window.SYSUsersCRUD = {
        openAdd: openAdd,
        openEdit: openEdit,
        confirmDelete: confirmDelete
    };

})();
