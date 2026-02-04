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
// Projects Planning Module - Enum Definitions

(function() {
    'use strict';

    window.PrjPlanning = window.PrjPlanning || {};
    PrjPlanning.enums = {};

    // PROJECT STATUS
    PrjPlanning.enums.PROJECT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Planned',
        3: 'In Progress',
        4: 'On Hold',
        5: 'Completed',
        6: 'Cancelled'
    };

    PrjPlanning.enums.PROJECT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-active',
        6: 'layer8d-status-terminated'
    };

    // PROJECT TYPE
    PrjPlanning.enums.PROJECT_TYPE = {
        0: 'Unspecified',
        1: 'Internal',
        2: 'Client',
        3: 'Fixed Price',
        4: 'Time & Materials',
        5: 'Retainer',
        6: 'Capital'
    };

    PrjPlanning.enums.PROJECT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-active'
    };

    // PROJECT PRIORITY
    PrjPlanning.enums.PROJECT_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    PrjPlanning.enums.PROJECT_PRIORITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // TASK STATUS
    PrjPlanning.enums.TASK_STATUS = {
        0: 'Unspecified',
        1: 'Not Started',
        2: 'In Progress',
        3: 'On Hold',
        4: 'Completed',
        5: 'Cancelled'
    };

    PrjPlanning.enums.TASK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-active',
        5: 'layer8d-status-terminated'
    };

    // TASK PRIORITY
    PrjPlanning.enums.TASK_PRIORITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    PrjPlanning.enums.TASK_PRIORITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // MILESTONE STATUS
    PrjPlanning.enums.MILESTONE_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Achieved',
        3: 'Missed',
        4: 'At Risk'
    };

    PrjPlanning.enums.MILESTONE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-terminated',
        4: 'layer8d-status-inactive'
    };

    // RISK SEVERITY
    PrjPlanning.enums.RISK_SEVERITY = {
        0: 'Unspecified',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };

    PrjPlanning.enums.RISK_SEVERITY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated'
    };

    // RISK STATUS
    PrjPlanning.enums.RISK_STATUS = {
        0: 'Unspecified',
        1: 'Identified',
        2: 'Assessed',
        3: 'Mitigated',
        4: 'Occurred',
        5: 'Closed'
    };

    PrjPlanning.enums.RISK_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // DEPENDENCY TYPE
    PrjPlanning.enums.DEPENDENCY_TYPE = {
        0: 'Unspecified',
        1: 'Finish to Start',
        2: 'Start to Start',
        3: 'Finish to Finish',
        4: 'Start to Finish'
    };

    PrjPlanning.enums.DEPENDENCY_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active'
    };

    // RENDERERS
    PrjPlanning.render = {};

    PrjPlanning.render.projectStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.PROJECT_STATUS,
        PrjPlanning.enums.PROJECT_STATUS_CLASSES
    );

    PrjPlanning.render.projectType = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.PROJECT_TYPE,
        PrjPlanning.enums.PROJECT_TYPE_CLASSES
    );

    PrjPlanning.render.projectPriority = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.PROJECT_PRIORITY,
        PrjPlanning.enums.PROJECT_PRIORITY_CLASSES
    );

    PrjPlanning.render.taskStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.TASK_STATUS,
        PrjPlanning.enums.TASK_STATUS_CLASSES
    );

    PrjPlanning.render.taskPriority = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.TASK_PRIORITY,
        PrjPlanning.enums.TASK_PRIORITY_CLASSES
    );

    PrjPlanning.render.milestoneStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.MILESTONE_STATUS,
        PrjPlanning.enums.MILESTONE_STATUS_CLASSES
    );

    PrjPlanning.render.riskSeverity = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.RISK_SEVERITY,
        PrjPlanning.enums.RISK_SEVERITY_CLASSES
    );

    PrjPlanning.render.riskStatus = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.RISK_STATUS,
        PrjPlanning.enums.RISK_STATUS_CLASSES
    );

    PrjPlanning.render.dependencyType = Layer8DRenderers.createStatusRenderer(
        PrjPlanning.enums.DEPENDENCY_TYPE,
        PrjPlanning.enums.DEPENDENCY_TYPE_CLASSES
    );

    PrjPlanning.render.date = Layer8DRenderers.renderDate;
    PrjPlanning.render.money = Layer8DRenderers.renderMoney;

})();
