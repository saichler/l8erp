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
// Procurement Module - Enum Definitions
// All enum constants and value mappings for Procurement models

(function() {
    'use strict';

    // Create Procurement namespace
    window.Procurement = window.Procurement || {};
    Procurement.enums = {};

    // ============================================================================
    // REQUISITION STATUS
    // ============================================================================

    Procurement.enums.REQUISITION_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Approved',
        4: 'Rejected',
        5: 'Fulfilled',
        6: 'Cancelled'
    };

    Procurement.enums.REQUISITION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive'
    };

    // ============================================================================
    // PO STATUS
    // ============================================================================

    Procurement.enums.PO_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Approved',
        3: 'Sent',
        4: 'Partially Received',
        5: 'Received',
        6: 'Closed',
        7: 'Cancelled'
    };

    Procurement.enums.PO_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active',
        6: 'layer8d-status-inactive',
        7: 'layer8d-status-terminated'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    Procurement.render = {};

    Procurement.render.requisitionStatus = Layer8DRenderers.createStatusRenderer(
        Procurement.enums.REQUISITION_STATUS,
        Procurement.enums.REQUISITION_STATUS_CLASSES
    );

    Procurement.render.poStatus = Layer8DRenderers.createStatusRenderer(
        Procurement.enums.PO_STATUS,
        Procurement.enums.PO_STATUS_CLASSES
    );

    Procurement.render.date = Layer8DRenderers.renderDate;
    Procurement.render.money = Layer8DRenderers.renderMoney;

})();
