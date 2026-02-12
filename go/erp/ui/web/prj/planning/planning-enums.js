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
// Projects Planning Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderDate, renderMoney } = Layer8DRenderers;

    window.PrjPlanning = window.PrjPlanning || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const PROJECT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Planned', 'planned', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['On Hold', 'hold', 'layer8d-status-inactive'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const PROJECT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Internal', 'internal', 'layer8d-status-active'],
        ['Client', 'client', 'layer8d-status-active'],
        ['Fixed Price', 'fixed', 'layer8d-status-active'],
        ['Time & Materials', 'tm', 'layer8d-status-active'],
        ['Retainer', 'retainer', 'layer8d-status-pending'],
        ['Capital', 'capital', 'layer8d-status-active']
    ]);

    const PROJECT_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const TASK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Not Started', 'notstarted', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-active'],
        ['On Hold', 'hold', 'layer8d-status-inactive'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-terminated']
    ]);

    const TASK_PRIORITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const MILESTONE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Achieved', 'achieved', 'layer8d-status-active'],
        ['Missed', 'missed', 'layer8d-status-terminated'],
        ['At Risk', 'atrisk', 'layer8d-status-inactive']
    ]);

    const RISK_SEVERITY = factory.create([
        ['Unspecified', null, ''],
        ['Low', 'low', 'layer8d-status-inactive'],
        ['Medium', 'medium', 'layer8d-status-pending'],
        ['High', 'high', 'layer8d-status-active'],
        ['Critical', 'critical', 'layer8d-status-terminated']
    ]);

    const RISK_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Identified', 'identified', 'layer8d-status-pending'],
        ['Assessed', 'assessed', 'layer8d-status-pending'],
        ['Mitigated', 'mitigated', 'layer8d-status-active'],
        ['Occurred', 'occurred', 'layer8d-status-terminated'],
        ['Closed', 'closed', 'layer8d-status-inactive']
    ]);

    const DEPENDENCY_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Finish to Start', 'fs', 'layer8d-status-active'],
        ['Start to Start', 'ss', 'layer8d-status-active'],
        ['Finish to Finish', 'ff', 'layer8d-status-active'],
        ['Start to Finish', 'sf', 'layer8d-status-active']
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

    PrjPlanning.enums = {
        PROJECT_STATUS: PROJECT_STATUS.enum,
        PROJECT_STATUS_CLASSES: PROJECT_STATUS.classes,
        PROJECT_TYPE: PROJECT_TYPE.enum,
        PROJECT_TYPE_CLASSES: PROJECT_TYPE.classes,
        PROJECT_PRIORITY: PROJECT_PRIORITY.enum,
        PROJECT_PRIORITY_CLASSES: PROJECT_PRIORITY.classes,
        TASK_STATUS: TASK_STATUS.enum,
        TASK_STATUS_CLASSES: TASK_STATUS.classes,
        TASK_PRIORITY: TASK_PRIORITY.enum,
        TASK_PRIORITY_CLASSES: TASK_PRIORITY.classes,
        MILESTONE_STATUS: MILESTONE_STATUS.enum,
        MILESTONE_STATUS_CLASSES: MILESTONE_STATUS.classes,
        RISK_SEVERITY: RISK_SEVERITY.enum,
        RISK_SEVERITY_CLASSES: RISK_SEVERITY.classes,
        RISK_STATUS: RISK_STATUS.enum,
        RISK_STATUS_CLASSES: RISK_STATUS.classes,
        DEPENDENCY_TYPE: DEPENDENCY_TYPE.enum,
        DEPENDENCY_TYPE_CLASSES: DEPENDENCY_TYPE.classes,
        ISSUE_STATUS: ISSUE_STATUS.enum,
        ISSUE_STATUS_CLASSES: ISSUE_STATUS.classes,
        ISSUE_PRIORITY: ISSUE_PRIORITY.enum,
        ISSUE_PRIORITY_CLASSES: ISSUE_PRIORITY.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    PrjPlanning.render = {
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
