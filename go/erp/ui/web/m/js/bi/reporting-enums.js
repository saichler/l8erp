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
 * Mobile BI Reporting Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: bi/reporting/reporting-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileBiReporting = window.MobileBiReporting || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const REPORT_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Standard', 'standard', 'status-active'],
        ['Ad Hoc', 'adhoc', 'status-pending'],
        ['Dashboard', 'dashboard', 'status-active'],
        ['Scheduled', 'scheduled', 'status-active'],
        ['Interactive', 'interactive', 'status-active']
    ]);

    const REPORT_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'status-pending'],
        ['Published', 'published', 'status-active'],
        ['Archived', 'archived', 'status-inactive'],
        ['Deprecated', 'deprecated', 'status-terminated']
    ]);

    const EXECUTION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Pending', 'pending', 'status-pending'],
        ['Running', 'running', 'status-active'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    const EXPORT_FORMAT = factory.create([
        ['Unspecified', null, ''],
        ['PDF', 'pdf', 'status-active'],
        ['Excel', 'excel', 'status-active'],
        ['CSV', 'csv', 'status-active'],
        ['HTML', 'html', 'status-active'],
        ['JSON', 'json', 'status-active']
    ]);

    const SCHEDULE_FREQUENCY = factory.create([
        ['Unspecified', null, ''],
        ['Once', 'once', 'status-pending'],
        ['Daily', 'daily', 'status-active'],
        ['Weekly', 'weekly', 'status-active'],
        ['Monthly', 'monthly', 'status-active'],
        ['Quarterly', 'quarterly', 'status-active'],
        ['Yearly', 'yearly', 'status-active']
    ]);

    const ACCESS_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['View', 'view', 'status-inactive'],
        ['Execute', 'execute', 'status-pending'],
        ['Edit', 'edit', 'status-active'],
        ['Admin', 'admin', 'status-active']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBiReporting.enums = {
        REPORT_TYPE: REPORT_TYPE.enum,
        REPORT_TYPE_VALUES: REPORT_TYPE.values,
        REPORT_TYPE_CLASSES: REPORT_TYPE.classes,
        REPORT_STATUS: REPORT_STATUS.enum,
        REPORT_STATUS_VALUES: REPORT_STATUS.values,
        REPORT_STATUS_CLASSES: REPORT_STATUS.classes,
        EXECUTION_STATUS: EXECUTION_STATUS.enum,
        EXECUTION_STATUS_VALUES: EXECUTION_STATUS.values,
        EXECUTION_STATUS_CLASSES: EXECUTION_STATUS.classes,
        EXPORT_FORMAT: EXPORT_FORMAT.enum,
        EXPORT_FORMAT_VALUES: EXPORT_FORMAT.values,
        EXPORT_FORMAT_CLASSES: EXPORT_FORMAT.classes,
        SCHEDULE_FREQUENCY: SCHEDULE_FREQUENCY.enum,
        SCHEDULE_FREQUENCY_VALUES: SCHEDULE_FREQUENCY.values,
        SCHEDULE_FREQUENCY_CLASSES: SCHEDULE_FREQUENCY.classes,
        ACCESS_LEVEL: ACCESS_LEVEL.enum,
        ACCESS_LEVEL_VALUES: ACCESS_LEVEL.values,
        ACCESS_LEVEL_CLASSES: ACCESS_LEVEL.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiReporting.render = {
        reportType: createStatusRenderer(REPORT_TYPE.enum, REPORT_TYPE.classes),
        reportStatus: createStatusRenderer(REPORT_STATUS.enum, REPORT_STATUS.classes),
        executionStatus: createStatusRenderer(EXECUTION_STATUS.enum, EXECUTION_STATUS.classes),
        exportFormat: createStatusRenderer(EXPORT_FORMAT.enum, EXPORT_FORMAT.classes),
        scheduleFrequency: createStatusRenderer(SCHEDULE_FREQUENCY.enum, SCHEDULE_FREQUENCY.classes),
        accessLevel: createStatusRenderer(ACCESS_LEVEL.enum, ACCESS_LEVEL.classes),
        date: renderDate
    };

})();
