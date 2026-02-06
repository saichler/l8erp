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
 * Mobile Procurement Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: scm/procurement/procurement-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileProcurement = window.MobileProcurement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REQUISITION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Fulfilled', 'fulfilled', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const PO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Sent', 'sent', 'status-active'],
        ['Partially Received', 'partial', 'status-pending'],
        ['Received', 'received', 'status-active'],
        ['Closed', 'closed', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileProcurement.enums = {
        REQUISITION_STATUS: REQUISITION_STATUS.enum,
        REQUISITION_STATUS_VALUES: REQUISITION_STATUS.values,
        REQUISITION_STATUS_CLASSES: REQUISITION_STATUS.classes,
        PO_STATUS: PO_STATUS.enum,
        PO_STATUS_VALUES: PO_STATUS.values,
        PO_STATUS_CLASSES: PO_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileProcurement.render = {
        requisitionStatus: createStatusRenderer(REQUISITION_STATUS.enum, REQUISITION_STATUS.classes),
        poStatus: createStatusRenderer(PO_STATUS.enum, PO_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
