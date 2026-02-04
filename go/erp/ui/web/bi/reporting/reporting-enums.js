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
// BI Reporting Module - Enum Definitions

(function() {
    'use strict';

    window.BiReporting = window.BiReporting || {};
    BiReporting.enums = {};

    // REPORT TYPE
    BiReporting.enums.REPORT_TYPE = {
        0: 'Unspecified',
        1: 'Standard',
        2: 'Ad Hoc',
        3: 'Dashboard',
        4: 'Scheduled',
        5: 'Interactive'
    };

    BiReporting.enums.REPORT_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active'
    };

    // REPORT STATUS
    BiReporting.enums.REPORT_STATUS = {
        0: 'Unspecified',
        1: 'Draft',
        2: 'Published',
        3: 'Archived',
        4: 'Deprecated'
    };

    BiReporting.enums.REPORT_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-inactive',
        4: 'layer8d-status-terminated'
    };

    // EXECUTION STATUS
    BiReporting.enums.EXECUTION_STATUS = {
        0: 'Unspecified',
        1: 'Pending',
        2: 'Running',
        3: 'Completed',
        4: 'Failed',
        5: 'Cancelled'
    };

    BiReporting.enums.EXECUTION_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // EXPORT FORMAT
    BiReporting.enums.EXPORT_FORMAT = {
        0: 'Unspecified',
        1: 'PDF',
        2: 'Excel',
        3: 'CSV',
        4: 'HTML',
        5: 'JSON'
    };

    BiReporting.enums.EXPORT_FORMAT_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active'
    };

    // SCHEDULE FREQUENCY
    BiReporting.enums.SCHEDULE_FREQUENCY = {
        0: 'Unspecified',
        1: 'Once',
        2: 'Daily',
        3: 'Weekly',
        4: 'Monthly',
        5: 'Quarterly',
        6: 'Yearly'
    };

    BiReporting.enums.SCHEDULE_FREQUENCY_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-active',
        6: 'layer8d-status-active'
    };

    // ACCESS LEVEL
    BiReporting.enums.ACCESS_LEVEL = {
        0: 'Unspecified',
        1: 'View',
        2: 'Execute',
        3: 'Edit',
        4: 'Admin'
    };

    BiReporting.enums.ACCESS_LEVEL_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active'
    };

    // RENDERERS
    BiReporting.render = {};

    BiReporting.render.reportType = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.REPORT_TYPE,
        BiReporting.enums.REPORT_TYPE_CLASSES
    );

    BiReporting.render.reportStatus = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.REPORT_STATUS,
        BiReporting.enums.REPORT_STATUS_CLASSES
    );

    BiReporting.render.executionStatus = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.EXECUTION_STATUS,
        BiReporting.enums.EXECUTION_STATUS_CLASSES
    );

    BiReporting.render.exportFormat = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.EXPORT_FORMAT,
        BiReporting.enums.EXPORT_FORMAT_CLASSES
    );

    BiReporting.render.scheduleFrequency = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.SCHEDULE_FREQUENCY,
        BiReporting.enums.SCHEDULE_FREQUENCY_CLASSES
    );

    BiReporting.render.accessLevel = Layer8DRenderers.createStatusRenderer(
        BiReporting.enums.ACCESS_LEVEL,
        BiReporting.enums.ACCESS_LEVEL_CLASSES
    );

    BiReporting.render.date = Layer8DRenderers.renderDate;

})();
