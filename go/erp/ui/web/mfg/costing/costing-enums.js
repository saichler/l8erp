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
// Manufacturing Costing Module - Enum Definitions

(function() {
    'use strict';

    window.MfgCosting = window.MfgCosting || {};
    MfgCosting.enums = {};

    // COST ELEMENT TYPE
    MfgCosting.enums.COST_ELEMENT_TYPE = {
        0: 'Unspecified',
        1: 'Material',
        2: 'Labor',
        3: 'Machine',
        4: 'Overhead',
        5: 'Subcontracting',
        6: 'Other'
    };

    // ROLLUP STATUS
    MfgCosting.enums.ROLLUP_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'In Progress',
        3: 'Completed',
        4: 'Failed'
    };

    MfgCosting.enums.ROLLUP_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // VARIANCE TYPE
    MfgCosting.enums.VARIANCE_TYPE = {
        0: 'Unspecified',
        1: 'Material Price',
        2: 'Material Usage',
        3: 'Labor Rate',
        4: 'Labor Efficiency',
        5: 'Overhead',
        6: 'Yield',
        7: 'Mix'
    };

    // OVERHEAD ALLOCATION METHOD
    MfgCosting.enums.ALLOCATION_METHOD = {
        0: 'Unspecified',
        1: 'Direct Labor Hours',
        2: 'Machine Hours',
        3: 'Direct Labor Cost',
        4: 'Material Cost',
        5: 'Units Produced'
    };

    // RENDERERS
    MfgCosting.render = {};

    MfgCosting.render.costElementType = function(type) {
        return MfgCosting.enums.COST_ELEMENT_TYPE[type] || 'Unknown';
    };

    MfgCosting.render.rollupStatus = Layer8DRenderers.createStatusRenderer(
        MfgCosting.enums.ROLLUP_STATUS,
        MfgCosting.enums.ROLLUP_STATUS_CLASSES
    );

    MfgCosting.render.varianceType = function(type) {
        return MfgCosting.enums.VARIANCE_TYPE[type] || 'Unknown';
    };

    MfgCosting.render.allocationMethod = function(method) {
        return MfgCosting.enums.ALLOCATION_METHOD[method] || 'Unknown';
    };

    MfgCosting.render.date = Layer8DRenderers.renderDate;
    MfgCosting.render.money = Layer8DRenderers.renderMoney;

})();
