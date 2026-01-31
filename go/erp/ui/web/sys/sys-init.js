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
// SYS Module - Entry Point
// Bootstraps System Administration using shared module factory
// with custom CRUD overrides for Security entities

(function() {
    'use strict';

    // 1. Bootstrap using shared factory
    ERPModuleFactory.create({
        namespace: 'SYS',
        defaultModule: 'security',
        defaultService: 'users',
        sectionSelector: 'security',
        initializerName: 'initializeSYS',
        requiredNamespaces: ['Security']
    });

    // 2. Override CRUD methods to route to custom handlers per model
    var origOpenAdd = SYS._openAddModal;
    SYS._openAddModal = function(service) {
        if (service.model === 'L8User' && window.SYSUsersCRUD) {
            SYSUsersCRUD.openAdd(service);
        } else if (service.model === 'L8Role' && window.SYSRolesCRUD) {
            SYSRolesCRUD.openAdd(service);
        } else if (service.model === 'L8Credentials' && window.SYSCredentialsCRUD) {
            SYSCredentialsCRUD.openAdd(service);
        } else {
            origOpenAdd.call(SYS, service);
        }
    };

    var origOpenEdit = SYS._openEditModal;
    SYS._openEditModal = function(service, id) {
        if (service.model === 'L8User' && window.SYSUsersCRUD) {
            SYSUsersCRUD.openEdit(service, id);
        } else if (service.model === 'L8Role' && window.SYSRolesCRUD) {
            SYSRolesCRUD.openEdit(service, id);
        } else if (service.model === 'L8Credentials' && window.SYSCredentialsCRUD) {
            SYSCredentialsCRUD.openEdit(service, id);
        } else {
            origOpenEdit.call(SYS, service, id);
        }
    };

    var origConfirmDelete = SYS._confirmDeleteItem;
    SYS._confirmDeleteItem = function(service, id) {
        if (service.model === 'L8User' && window.SYSUsersCRUD) {
            SYSUsersCRUD.confirmDelete(service, id);
        } else if (service.model === 'L8Role' && window.SYSRolesCRUD) {
            SYSRolesCRUD.confirmDelete(service, id);
        } else if (service.model === 'L8Credentials' && window.SYSCredentialsCRUD) {
            SYSCredentialsCRUD.confirmDelete(service, id);
        } else {
            origConfirmDelete.call(SYS, service, id);
        }
    };

})();
