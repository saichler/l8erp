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
// Projects Resources Module - Enum Definitions

(function() {
    'use strict';

    window.PrjResources = window.PrjResources || {};
    PrjResources.enums = {};

    // RESOURCE TYPE
    PrjResources.enums.RESOURCE_TYPE = {
        0: 'Unspecified',
        1: 'Employee',
        2: 'Contractor',
        3: 'Equipment',
        4: 'Material'
    };

    PrjResources.enums.RESOURCE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-pending'
    };

    // ALLOCATION STATUS
    PrjResources.enums.ALLOCATION_STATUS = {
        0: 'Unspecified',
        1: 'Tentative',
        2: 'Confirmed',
        3: 'Cancelled'
    };

    PrjResources.enums.ALLOCATION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated'
    };

    // BOOKING STATUS
    PrjResources.enums.BOOKING_STATUS = {
        0: 'Unspecified',
        1: 'Requested',
        2: 'Approved',
        3: 'Rejected',
        4: 'Cancelled'
    };

    PrjResources.enums.BOOKING_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    PrjResources.render = {};

    PrjResources.render.resourceType = Layer8DRenderers.createStatusRenderer(
        PrjResources.enums.RESOURCE_TYPE,
        PrjResources.enums.RESOURCE_TYPE_CLASSES
    );

    PrjResources.render.allocationStatus = Layer8DRenderers.createStatusRenderer(
        PrjResources.enums.ALLOCATION_STATUS,
        PrjResources.enums.ALLOCATION_STATUS_CLASSES
    );

    PrjResources.render.bookingStatus = Layer8DRenderers.createStatusRenderer(
        PrjResources.enums.BOOKING_STATUS,
        PrjResources.enums.BOOKING_STATUS_CLASSES
    );

    PrjResources.render.date = Layer8DRenderers.renderDate;
    PrjResources.render.money = Layer8DRenderers.renderMoney;

})();
