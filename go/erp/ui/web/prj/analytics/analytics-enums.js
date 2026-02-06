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
// Projects Analytics Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.PrjAnalytics = window.PrjAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const HEALTH_INDICATOR = factory.create([
        ['Unspecified', null, ''],
        ['Green', 'green', 'layer8d-status-active'],
        ['Yellow', 'yellow', 'layer8d-status-pending'],
        ['Red', 'red', 'layer8d-status-terminated']
    ]);

    const ISSUE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['Resolved', 'resolved', 'layer8d-status-active'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    const ISSUE_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    PrjAnalytics.enums = {
        HEALTH_INDICATOR: HEALTH_INDICATOR.enum,
        HEALTH_INDICATOR_CLASSES: HEALTH_INDICATOR.classes,
        ISSUE_STATUS: ISSUE_STATUS.enum,
        ISSUE_STATUS_CLASSES: ISSUE_STATUS.classes,
        ISSUE_PRIORITY: ISSUE_PRIORITY.enum,
        ISSUE_PRIORITY_CLASSES: ISSUE_PRIORITY.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    PrjAnalytics.render = {
        healthIndicator: createStatusRenderer(HEALTH_INDICATOR.enum, HEALTH_INDICATOR.classes),
        issueStatus: createStatusRenderer(ISSUE_STATUS.enum, ISSUE_STATUS.classes),
        issuePriority: createStatusRenderer(ISSUE_PRIORITY.enum, ISSUE_PRIORITY.classes),
        date: renderDate,
        money: renderMoney
    };

})();
