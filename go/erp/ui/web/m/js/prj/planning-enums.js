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
 * Mobile PRJ Planning Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: prj/planning/planning-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8MRenderers;

    window.MobilePrjPlanning = window.MobilePrjPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PROJECT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Planned', 'planned', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['On Hold', 'hold', 'status-inactive'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const PROJECT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Internal', 'internal', 'status-active'],
        ['Client', 'client', 'status-active'],
        ['Fixed Price', 'fixed', 'status-active'],
        ['Time & Materials', 'tm', 'status-active'],
        ['Retainer', 'retainer', 'status-pending'],
        ['Capital', 'capital', 'status-active']
    ]);

    const PROJECT_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'notstarted', 'status-pending'],
        ['In Progress', 'progress', 'status-active'],
        ['On Hold', 'hold', 'status-inactive'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-terminated']
    ]);

    const TASK_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    const MILESTONE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Achieved', 'achieved', 'status-active'],
        ['Missed', 'missed', 'status-terminated'],
        ['At Risk', 'atrisk', 'status-inactive']
    ]);

    const RISK_SEVERITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'status-inactive'],
        ['Medium', 'medium', 'status-pending'],
        ['High', 'high', 'status-active'],
        ['Critical', 'critical', 'status-terminated']
    ]);

    const RISK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Identified', 'identified', 'status-pending'],
        ['Assessed', 'assessed', 'status-pending'],
        ['Mitigated', 'mitigated', 'status-active'],
        ['Occurred', 'occurred', 'status-terminated'],
        ['Closed', 'closed', 'status-inactive']
    ]);

    const DEPENDENCY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Finish to Start', 'fs', 'status-active'],
        ['Start to Start', 'ss', 'status-active'],
        ['Finish to Finish', 'ff', 'status-active'],
        ['Start to Finish', 'sf', 'status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobilePrjPlanning.enums = {
        PROJECT_STATUS: PROJECT_STATUS.enum,
        PROJECT_STATUS_VALUES: PROJECT_STATUS.values,
        PROJECT_STATUS_CLASSES: PROJECT_STATUS.classes,
        PROJECT_TYPE: PROJECT_TYPE.enum,
        PROJECT_TYPE_VALUES: PROJECT_TYPE.values,
        PROJECT_TYPE_CLASSES: PROJECT_TYPE.classes,
        PROJECT_PRIORITY: PROJECT_PRIORITY.enum,
        PROJECT_PRIORITY_VALUES: PROJECT_PRIORITY.values,
        PROJECT_PRIORITY_CLASSES: PROJECT_PRIORITY.classes,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_VALUES: TASK_STATUS.values,
        TASK_STATUS_CLASSES: TASK_STATUS.classes,
        TASK_PRIORITY: TASK_PRIORITY.enum,
        TASK_PRIORITY_VALUES: TASK_PRIORITY.values,
        TASK_PRIORITY_CLASSES: TASK_PRIORITY.classes,
        MILESTONE_STATUS: MILESTONE_STATUS.enum,
        MILESTONE_STATUS_VALUES: MILESTONE_STATUS.values,
        MILESTONE_STATUS_CLASSES: MILESTONE_STATUS.classes,
        RISK_SEVERITY: RISK_SEVERITY.enum,
        RISK_SEVERITY_VALUES: RISK_SEVERITY.values,
        RISK_SEVERITY_CLASSES: RISK_SEVERITY.classes,
        RISK_STATUS: RISK_STATUS.enum,
        RISK_STATUS_VALUES: RISK_STATUS.values,
        RISK_STATUS_CLASSES: RISK_STATUS.classes,
        DEPENDENCY_TYPE: DEPENDENCY_TYPE.enum,
        DEPENDENCY_TYPE_VALUES: DEPENDENCY_TYPE.values,
        DEPENDENCY_TYPE_CLASSES: DEPENDENCY_TYPE.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobilePrjPlanning.render = {
        projectStatus: createStatusRenderer(PROJECT_STATUS.enum, PROJECT_STATUS.classes),
        projectType: createStatusRenderer(PROJECT_TYPE.enum, PROJECT_TYPE.classes),
        projectPriority: createStatusRenderer(PROJECT_PRIORITY.enum, PROJECT_PRIORITY.classes),
        taskStatus: createStatusRenderer(TASK_STATUS.enum, TASK_STATUS.classes),
        taskPriority: createStatusRenderer(TASK_PRIORITY.enum, TASK_PRIORITY.classes),
        milestoneStatus: createStatusRenderer(MILESTONE_STATUS.enum, MILESTONE_STATUS.classes),
        riskSeverity: createStatusRenderer(RISK_SEVERITY.enum, RISK_SEVERITY.classes),
        riskStatus: createStatusRenderer(RISK_STATUS.enum, RISK_STATUS.classes),
        dependencyType: createStatusRenderer(DEPENDENCY_TYPE.enum, DEPENDENCY_TYPE.classes),
        date: renderDate,
        money: renderMoney
    };

})();
