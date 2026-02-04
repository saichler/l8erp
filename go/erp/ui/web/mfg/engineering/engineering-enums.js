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
// Manufacturing Engineering Module - Enum Definitions

(function() {
    'use strict';

    window.MfgEngineering = window.MfgEngineering || {};
    MfgEngineering.enums = {};

    // BOM TYPE
    MfgEngineering.enums.BOM_TYPE = {
        0: 'Unspecified',
        1: 'Manufacturing',
        2: 'Engineering',
        3: 'Planning',
        4: 'Costing'
    };

    // BOM STATUS
    MfgEngineering.enums.BOM_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending Approval',
        3: 'Active',
        4: 'Obsolete',
        5: 'Superseded'
    };

    MfgEngineering.enums.BOM_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-inactive'
    };

    // ROUTING STATUS
    MfgEngineering.enums.ROUTING_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Pending Approval',
        3: 'Active',
        4: 'Obsolete'
    };

    MfgEngineering.enums.ROUTING_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // ECO STATUS
    MfgEngineering.enums.ECO_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Submitted',
        3: 'Under Review',
        4: 'Approved',
        5: 'Rejected',
        6: 'Implemented',
        7: 'Cancelled'
    };

    MfgEngineering.enums.ECO_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated',
        6: 'layer8d-status-active',
        7: 'layer8d-status-inactive'
    };

    // ECO CHANGE TYPE
    MfgEngineering.enums.ECO_CHANGE_TYPE = {
        0: 'Unspecified',
        1: 'Design Change',
        2: 'Process Change',
        3: 'Material Change',
        4: 'Cost Reduction',
        5: 'Quality Improvement'
    };

    // RENDERERS
    MfgEngineering.render = {};

    MfgEngineering.render.bomStatus = Layer8DRenderers.createStatusRenderer(
        MfgEngineering.enums.BOM_STATUS,
        MfgEngineering.enums.BOM_STATUS_CLASSES
    );

    MfgEngineering.render.routingStatus = Layer8DRenderers.createStatusRenderer(
        MfgEngineering.enums.ROUTING_STATUS,
        MfgEngineering.enums.ROUTING_STATUS_CLASSES
    );

    MfgEngineering.render.ecoStatus = Layer8DRenderers.createStatusRenderer(
        MfgEngineering.enums.ECO_STATUS,
        MfgEngineering.enums.ECO_STATUS_CLASSES
    );

    MfgEngineering.render.date = Layer8DRenderers.renderDate;
    MfgEngineering.render.money = Layer8DRenderers.renderMoney;

})();
