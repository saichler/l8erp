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
// BI Reporting Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.BiReporting = window.BiReporting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REPORT_TYPE = factory.simple([
        'Unspecified', 'Standard', 'Ad Hoc', 'Dashboard', 'Scheduled', 'Interactive'
    ]);

    const REPORT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-pending'],
        ['Published', 'published', 'layer8d-status-active'],
        ['Archived', 'archived', 'layer8d-status-inactive'],
        ['Deprecated', 'deprecated', 'layer8d-status-terminated']
    ]);

    const EXECUTION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'layer8d-status-pending'],
        ['Running', 'running', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    const EXPORT_FORMAT = factory.simple([
        'Unspecified', 'PDF', 'Excel', 'CSV', 'HTML', 'JSON'
    ]);

    const SCHEDULE_FREQUENCY = factory.simple([
        'Unspecified', 'Once', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'
    ]);

    const ACCESS_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['View', 'view', 'layer8d-status-inactive'],
        ['Execute', 'execute', 'layer8d-status-pending'],
        ['Edit', 'edit', 'layer8d-status-active'],
        ['Admin', 'admin', 'layer8d-status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    BiReporting.enums = {
        REPORT_TYPE: REPORT_TYPE.enum,
        REPORT_STATUS: REPORT_STATUS.enum,
        REPORT_STATUS_CLASSES: REPORT_STATUS.classes,
        EXECUTION_STATUS: EXECUTION_STATUS.enum,
        EXECUTION_STATUS_CLASSES: EXECUTION_STATUS.classes,
        EXPORT_FORMAT: EXPORT_FORMAT.enum,
        SCHEDULE_FREQUENCY: SCHEDULE_FREQUENCY.enum,
        ACCESS_LEVEL: ACCESS_LEVEL.enum,
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    BiReporting.render = {
        reportType: (v) => renderEnum(v, REPORT_TYPE.enum),
        reportStatus: createStatusRenderer(REPORT_STATUS.enum, REPORT_STATUS.classes),
        executionStatus: createStatusRenderer(EXECUTION_STATUS.enum, EXECUTION_STATUS.classes),
        exportFormat: (v) => renderEnum(v, EXPORT_FORMAT.enum),
        scheduleFrequency: (v) => renderEnum(v, SCHEDULE_FREQUENCY.enum),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        date: renderDate
    };

})();
