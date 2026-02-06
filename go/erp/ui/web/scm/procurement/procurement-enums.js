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
// Procurement Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.Procurement = window.Procurement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REQUISITION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Fulfilled', 'fulfilled', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const PO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Sent', 'sent', 'layer8d-status-active'],
        ['Partially Received', 'partial', 'layer8d-status-pending'],
        ['Received', 'received', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.Procurement.enums = {
        REQUISITION_STATUS: REQUISITION_STATUS.enum,
        REQUISITION_STATUS_CLASSES: REQUISITION_STATUS.classes,
        PO_STATUS: PO_STATUS.enum,
        PO_STATUS_CLASSES: PO_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderRequisitionStatus = createStatusRenderer(REQUISITION_STATUS.enum, REQUISITION_STATUS.classes);
    const renderPoStatus = createStatusRenderer(PO_STATUS.enum, PO_STATUS.classes);

    window.Procurement.render = {
        requisitionStatus: renderRequisitionStatus,
        poStatus: renderPoStatus,
        date: renderDate,
        money: renderMoney
    };

})();
