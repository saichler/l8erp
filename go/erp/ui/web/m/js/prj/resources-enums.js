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
 * Mobile PRJ Resources Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: prj/resources/resources-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobilePrjResources = window.MobilePrjResources || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const RESOURCE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Employee', 'employee', 'status-active'],
        ['Contractor', 'contractor', 'status-active'],
        ['Equipment', 'equipment', 'status-pending'],
        ['Material', 'material', 'status-pending']
    ]);

    const ALLOCATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Tentative', 'tentative', 'status-pending'],
        ['Confirmed', 'confirmed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const BOOKING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Requested', 'requested', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-inactive'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePrjResources.enums = {
        RESOURCE_TYPE: RESOURCE_TYPE.enum,
        RESOURCE_TYPE_VALUES: RESOURCE_TYPE.values,
        RESOURCE_TYPE_CLASSES: RESOURCE_TYPE.classes,
        ALLOCATION_STATUS: ALLOCATION_STATUS.enum,
        ALLOCATION_STATUS_VALUES: ALLOCATION_STATUS.values,
        ALLOCATION_STATUS_CLASSES: ALLOCATION_STATUS.classes,
        BOOKING_STATUS: BOOKING_STATUS.enum,
        BOOKING_STATUS_VALUES: BOOKING_STATUS.values,
        BOOKING_STATUS_CLASSES: BOOKING_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePrjResources.render = {
        resourceType: createStatusRenderer(RESOURCE_TYPE.enum, RESOURCE_TYPE.classes),
        allocationStatus: createStatusRenderer(ALLOCATION_STATUS.enum, ALLOCATION_STATUS.classes),
        bookingStatus: createStatusRenderer(BOOKING_STATUS.enum, BOOKING_STATUS.classes),
        date: renderDate,
        money: renderMoney
    };

})();
