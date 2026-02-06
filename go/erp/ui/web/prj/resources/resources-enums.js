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
// Projects Resources Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.PrjResources = window.PrjResources || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const RESOURCE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Employee', 'employee', 'layer8d-status-active'],
        ['Contractor', 'contractor', 'layer8d-status-active'],
        ['Equipment', 'equipment', 'layer8d-status-pending'],
        ['Material', 'material', 'layer8d-status-pending']
    ]);

    const ALLOCATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Tentative', 'tentative', 'layer8d-status-pending'],
        ['Confirmed', 'confirmed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const BOOKING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    PrjResources.enums = {
        RESOURCE_TYPE: RESOURCE_TYPE.enum,
        RESOURCE_TYPE_CLASSES: RESOURCE_TYPE.classes,
        ALLOCATION_STATUS: ALLOCATION_STATUS.enum,
        ALLOCATION_STATUS_CLASSES: ALLOCATION_STATUS.classes,
        BOOKING_STATUS: BOOKING_STATUS.enum,
        BOOKING_STATUS_CLASSES: BOOKING_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    PrjResources.render = {
        resourceType: createStatusRenderer(RESOURCE_TYPE.enum, RESOURCE_TYPE.classes),
        allocationStatus: createStatusRenderer(ALLOCATION_STATUS.enum, ALLOCATION_STATUS.classes),
        bookingStatus: createStatusRenderer(BOOKING_STATUS.enum, BOOKING_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
