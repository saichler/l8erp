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
 * Mobile Procurement Module - Enum Definitions
 * Desktop Equivalent: scm/procurement/procurement-enums.js
 */
(function() {
    'use strict';

    window.MobileProcurement = window.MobileProcurement || {};
    MobileProcurement.enums = {};

    // ============================================================================
    // REQUISITION STATUS
    // ============================================================================

    MobileProcurement.enums.REQUISITION_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Approved',
        4: 'Rejected', 5: 'Fulfilled', 6: 'Cancelled'
    };
    MobileProcurement.enums.REQUISITION_STATUS_VALUES = {
        'draft': 1, 'submitted': 2, 'approved': 3, 'rejected': 4, 'fulfilled': 5, 'cancelled': 6
    };
    MobileProcurement.enums.REQUISITION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active',
        4: 'status-terminated', 5: 'status-active', 6: 'status-inactive'
    };

    // ============================================================================
    // PO STATUS
    // ============================================================================

    MobileProcurement.enums.PO_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Approved', 3: 'Sent',
        4: 'Partially Received', 5: 'Received', 6: 'Closed', 7: 'Cancelled'
    };
    MobileProcurement.enums.PO_STATUS_VALUES = {
        'draft': 1, 'approved': 2, 'sent': 3, 'partial': 4, 'partially': 4,
        'received': 5, 'closed': 6, 'cancelled': 7
    };
    MobileProcurement.enums.PO_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active',
        4: 'status-pending', 5: 'status-active', 6: 'status-inactive', 7: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileProcurement.render = {
        requisitionStatus: Layer8MRenderers.createStatusRenderer(
            MobileProcurement.enums.REQUISITION_STATUS,
            MobileProcurement.enums.REQUISITION_STATUS_CLASSES
        ),
        poStatus: Layer8MRenderers.createStatusRenderer(
            MobileProcurement.enums.PO_STATUS,
            MobileProcurement.enums.PO_STATUS_CLASSES
        ),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
