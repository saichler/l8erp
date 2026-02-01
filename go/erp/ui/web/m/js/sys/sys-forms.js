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
/**
 * Mobile System Module - Form Configurations
 * Desktop Equivalent: l8ui/sys/security/
 */
(function() {
    'use strict';

    // Form definitions - field names match desktop l8security-forms.js
    MobileSysSecurity.forms = {
        L8User: {
            title: 'User',
            sections: [
                {
                    title: 'User Information',
                    fields: [
                        { key: 'userId', label: 'User ID', type: 'text', required: true },
                        { key: 'fullName', label: 'Full Name', type: 'text', required: true }
                    ]
                }
            ]
        },
        L8Role: {
            title: 'Role',
            sections: [
                {
                    title: 'Role Information',
                    fields: [
                        { key: 'roleId', label: 'Role ID', type: 'text', required: true },
                        { key: 'roleName', label: 'Role Name', type: 'text', required: true }
                    ]
                }
            ]
        },
        L8Credentials: {
            title: 'Credentials',
            sections: [
                {
                    title: 'Credential Information',
                    fields: [
                        { key: 'id', label: 'ID', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true }
                    ]
                }
            ]
        }
    };

})();
