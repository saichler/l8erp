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
 * Mobile PRJ Analytics Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: prj/analytics/analytics-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobilePrjAnalytics = window.MobilePrjAnalytics || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const HEALTH_INDICATOR = factory.create([
        ['Unspecified', null, ''],
        ['Green', 'green', 'status-active'],
        ['Yellow', 'yellow', 'status-pending'],
        ['Red', 'red', 'status-terminated']
    ]);

    const ISSUE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['Resolved', 'resolved', 'status-active'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const ISSUE_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePrjAnalytics.enums = {
        HEALTH_INDICATOR: HEALTH_INDICATOR.enum,
        HEALTH_INDICATOR_VALUES: HEALTH_INDICATOR.values,
        HEALTH_INDICATOR_CLASSES: HEALTH_INDICATOR.classes,
        ISSUE_STATUS: ISSUE_STATUS.enum,
        ISSUE_STATUS_VALUES: ISSUE_STATUS.values,
        ISSUE_STATUS_CLASSES: ISSUE_STATUS.classes,
        ISSUE_PRIORITY: ISSUE_PRIORITY.enum,
        ISSUE_PRIORITY_VALUES: ISSUE_PRIORITY.values,
        ISSUE_PRIORITY_CLASSES: ISSUE_PRIORITY.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePrjAnalytics.render = {
        healthIndicator: createStatusRenderer(HEALTH_INDICATOR.enum, HEALTH_INDICATOR.classes),
        issueStatus: createStatusRenderer(ISSUE_STATUS.enum, ISSUE_STATUS.classes),
        issuePriority: createStatusRenderer(ISSUE_PRIORITY.enum, ISSUE_PRIORITY.classes),
        date: renderDate,
        money: renderMoney
    };

})();
