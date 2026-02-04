/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// Projects Analytics Module - Enum Definitions

(function() {
    'use strict';

    window.PrjAnalytics = window.PrjAnalytics || {};
    PrjAnalytics.enums = {};

    // HEALTH INDICATOR
    PrjAnalytics.enums.HEALTH_INDICATOR = {
        0: 'Unspecified',
        1: 'Green',
        2: 'Yellow',
        3: 'Red'
    };

    PrjAnalytics.enums.HEALTH_INDICATOR_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated'
    };

    // ISSUE STATUS
    PrjAnalytics.enums.ISSUE_STATUS = {
        0: 'Unspecified',
        1: 'Open',
        2: 'In Progress',
        3: 'Resolved',
        4: 'Closed'
    };

    PrjAnalytics.enums.ISSUE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // ISSUE PRIORITY
    PrjAnalytics.enums.ISSUE_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    PrjAnalytics.enums.ISSUE_PRIORITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RENDERERS
    PrjAnalytics.render = {};

    PrjAnalytics.render.healthIndicator = Layer8DRenderers.createStatusRenderer(
        PrjAnalytics.enums.HEALTH_INDICATOR,
        PrjAnalytics.enums.HEALTH_INDICATOR_CLASSES
    );

    PrjAnalytics.render.issueStatus = Layer8DRenderers.createStatusRenderer(
        PrjAnalytics.enums.ISSUE_STATUS,
        PrjAnalytics.enums.ISSUE_STATUS_CLASSES
    );

    PrjAnalytics.render.issuePriority = Layer8DRenderers.createStatusRenderer(
        PrjAnalytics.enums.ISSUE_PRIORITY,
        PrjAnalytics.enums.ISSUE_PRIORITY_CLASSES
    );

    PrjAnalytics.render.date = Layer8DRenderers.renderDate;
    PrjAnalytics.render.money = Layer8DRenderers.renderMoney;

})();
