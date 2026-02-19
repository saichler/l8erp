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
// Sales Customers Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.SalesCustomers = window.SalesCustomers || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const CONTRACT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Terminated', 'terminated', 'layer8d-status-terminated'],
        ['Renewed', 'renewed', 'layer8d-status-active']
    ]);

    const PARTNER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Inactive', 'inactive', 'layer8d-status-inactive'],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Suspended', 'suspended', 'layer8d-status-terminated']
    ]);

    const SEGMENT_TYPE = factory.simple([
        'Unspecified', 'Industry', 'Size', 'Geography', 'Behavior', 'Value'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    SalesCustomers.enums = {
        CONTRACT_STATUS: CONTRACT_STATUS.enum,
        CONTRACT_STATUS_CLASSES: CONTRACT_STATUS.classes,
        PARTNER_STATUS: PARTNER_STATUS.enum,
        PARTNER_STATUS_CLASSES: PARTNER_STATUS.classes,
        SEGMENT_TYPE: SEGMENT_TYPE.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    SalesCustomers.render = {
        contractStatus: createStatusRenderer(CONTRACT_STATUS.enum, CONTRACT_STATUS.classes),
        partnerStatus: createStatusRenderer(PARTNER_STATUS.enum, PARTNER_STATUS.classes),
        segmentType: (v) => renderEnum(v, SEGMENT_TYPE.enum),
        date: renderDate,
        money: renderMoney
    };

})();
