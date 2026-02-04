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
 * Mobile Manufacturing Engineering Module - Enum Definitions
 * Desktop Equivalent: mfg/engineering/engineering-enums.js
 */
(function() {
    'use strict';

    window.MobileMfgEngineering = window.MobileMfgEngineering || {};
    MobileMfgEngineering.enums = {};

    // BOM TYPE
    MobileMfgEngineering.enums.BOM_TYPE = {
        0: 'Unspecified', 1: 'Manufacturing', 2: 'Engineering', 3: 'Planning', 4: 'Costing'
    };

    // BOM STATUS
    MobileMfgEngineering.enums.BOM_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Active', 4: 'Obsolete', 5: 'Superseded'
    };
    MobileMfgEngineering.enums.BOM_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-inactive', 5: 'status-inactive'
    };

    // ROUTING STATUS
    MobileMfgEngineering.enums.ROUTING_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Pending Approval', 3: 'Active', 4: 'Obsolete'
    };
    MobileMfgEngineering.enums.ROUTING_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-inactive'
    };

    // ECO STATUS
    MobileMfgEngineering.enums.ECO_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Submitted', 3: 'Under Review', 4: 'Approved', 5: 'Rejected', 6: 'Implemented', 7: 'Cancelled'
    };
    MobileMfgEngineering.enums.ECO_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-pending', 4: 'status-active', 5: 'status-terminated', 6: 'status-active', 7: 'status-inactive'
    };

    // ECO CHANGE TYPE
    MobileMfgEngineering.enums.ECO_CHANGE_TYPE = {
        0: 'Unspecified', 1: 'Design Change', 2: 'Process Change', 3: 'Material Change', 4: 'Cost Reduction', 5: 'Quality Improvement'
    };

    // RENDER FUNCTIONS
    MobileMfgEngineering.render = {
        bomType: function(type) { return MobileMfgEngineering.enums.BOM_TYPE[type] || 'Unknown'; },
        bomStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgEngineering.enums.BOM_STATUS,
            MobileMfgEngineering.enums.BOM_STATUS_CLASSES
        ),
        routingStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgEngineering.enums.ROUTING_STATUS,
            MobileMfgEngineering.enums.ROUTING_STATUS_CLASSES
        ),
        ecoStatus: Layer8MRenderers.createStatusRenderer(
            MobileMfgEngineering.enums.ECO_STATUS,
            MobileMfgEngineering.enums.ECO_STATUS_CLASSES
        ),
        ecoChangeType: function(type) { return MobileMfgEngineering.enums.ECO_CHANGE_TYPE[type] || 'Unknown'; },
        date: Layer8MRenderers.renderDate
    };

})();
