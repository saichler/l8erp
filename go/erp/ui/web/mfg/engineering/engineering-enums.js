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
// Manufacturing Engineering Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate, renderMoney } = Layer8DRenderers;

    window.MfgEngineering = window.MfgEngineering || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BOM_TYPE = factory.simple([
        'Unspecified', 'Manufacturing', 'Engineering', 'Planning', 'Costing'
    ]);

    const BOM_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Pending Approval', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Obsolete', 'obsolete', 'layer8d-status-inactive'],
        ['Superseded', 'superseded', 'layer8d-status-inactive']
    ]);

    const ROUTING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Pending Approval', 'pending', 'layer8d-status-pending'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Obsolete', 'obsolete', 'layer8d-status-inactive']
    ]);

    const ECO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Submitted', 'submitted', 'layer8d-status-pending'],
        ['Under Review', 'review', 'layer8d-status-pending'],
        ['Approved', 'approved', 'layer8d-status-active'],
        ['Rejected', 'rejected', 'layer8d-status-terminated'],
        ['Implemented', 'implemented', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const ECO_CHANGE_TYPE = factory.simple([
        'Unspecified', 'Design Change', 'Process Change', 'Material Change',
        'Cost Reduction', 'Quality Improvement'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MfgEngineering.enums = {
        BOM_TYPE: BOM_TYPE.enum,
        BOM_STATUS: BOM_STATUS.enum,
        BOM_STATUS_CLASSES: BOM_STATUS.classes,
        ROUTING_STATUS: ROUTING_STATUS.enum,
        ROUTING_STATUS_CLASSES: ROUTING_STATUS.classes,
        ECO_STATUS: ECO_STATUS.enum,
        ECO_STATUS_CLASSES: ECO_STATUS.classes,
        ECO_CHANGE_TYPE: ECO_CHANGE_TYPE.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    MfgEngineering.render = {
        bomType: (v) => renderEnum(v, BOM_TYPE.enum),
        bomStatus: createStatusRenderer(BOM_STATUS.enum, BOM_STATUS.classes),
        routingStatus: createStatusRenderer(ROUTING_STATUS.enum, ROUTING_STATUS.classes),
        ecoStatus: createStatusRenderer(ECO_STATUS.enum, ECO_STATUS.classes),
        ecoChangeType: (v) => renderEnum(v, ECO_CHANGE_TYPE.enum),
        date: renderDate,
        money: renderMoney
    };

})();
