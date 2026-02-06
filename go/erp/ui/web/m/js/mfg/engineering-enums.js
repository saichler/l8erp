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
 * Mobile Manufacturing Engineering Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: mfg/engineering/engineering-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileMfgEngineering = window.MobileMfgEngineering || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const BOM_TYPE = factory.simple([
        'Unspecified', 'Manufacturing', 'Engineering', 'Planning', 'Costing'
    ]);

    const BOM_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Pending Approval', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Obsolete', 'obsolete', 'status-inactive'],
        ['Superseded', 'superseded', 'status-inactive']
    ]);

    const ROUTING_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Pending Approval', 'pending', 'status-pending'],
        ['Active', 'active', 'status-active'],
        ['Obsolete', 'obsolete', 'status-inactive']
    ]);

    const ECO_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Submitted', 'submitted', 'status-pending'],
        ['Under Review', 'review', 'status-pending'],
        ['Approved', 'approved', 'status-active'],
        ['Rejected', 'rejected', 'status-terminated'],
        ['Implemented', 'implemented', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const ECO_CHANGE_TYPE = factory.simple([
        'Unspecified', 'Design Change', 'Process Change', 'Material Change', 'Cost Reduction', 'Quality Improvement'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileMfgEngineering.enums = {
        BOM_TYPE: BOM_TYPE.enum,
        BOM_STATUS: BOM_STATUS.enum,
        BOM_STATUS_VALUES: BOM_STATUS.values,
        BOM_STATUS_CLASSES: BOM_STATUS.classes,
        ROUTING_STATUS: ROUTING_STATUS.enum,
        ROUTING_STATUS_VALUES: ROUTING_STATUS.values,
        ROUTING_STATUS_CLASSES: ROUTING_STATUS.classes,
        ECO_STATUS: ECO_STATUS.enum,
        ECO_STATUS_VALUES: ECO_STATUS.values,
        ECO_STATUS_CLASSES: ECO_STATUS.classes,
        ECO_CHANGE_TYPE: ECO_CHANGE_TYPE.enum
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileMfgEngineering.render = {
        bomType: (type) => renderEnum(type, BOM_TYPE.enum),
        bomStatus: createStatusRenderer(BOM_STATUS.enum, BOM_STATUS.classes),
        routingStatus: createStatusRenderer(ROUTING_STATUS.enum, ROUTING_STATUS.classes),
        ecoStatus: createStatusRenderer(ECO_STATUS.enum, ECO_STATUS.classes),
        ecoChangeType: (type) => renderEnum(type, ECO_CHANGE_TYPE.enum),
        date: renderDate
    };

})();
