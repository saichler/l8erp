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
 * Shared Reference Data - Documents Models
 * Used by both desktop and mobile reference registries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.ReferenceDataDocuments = {
        // ========================================
        // Documents - Storage
        // ========================================
        ...ref.simple('DocDocument', 'documentId', 'title', 'Document'),
        ...ref.simple('DocFolder', 'folderId', 'name'),
        ...ref.simple('DocCategory', 'categoryId', 'name'),
        ...ref.simple('DocTag', 'tagId', 'name'),

        // ========================================
        // Documents - Workflow
        // ========================================
        ...ref.simple('DocApprovalWorkflow', 'workflowId', 'name', 'Approval Workflow'),

        // ========================================
        // Documents - Integration
        // ========================================
        ...ref.simple('DocTemplate', 'templateId', 'name', 'Template'),
        ...ref.simple('DocEmailCapture', 'captureId', 'subject', 'Email Capture'),
        ...ref.idOnly('DocScanJob', 'scanJobId'),

        // ========================================
        // Documents - Compliance
        // ========================================
        ...ref.simple('DocRetentionPolicy', 'policyId', 'name'),
        ...ref.simple('DocLegalHold', 'holdId', 'name'),
        ...ref.idOnly('DocArchiveJob', 'jobId')
    };
})();
