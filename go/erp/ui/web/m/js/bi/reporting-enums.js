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
 * Mobile BI Reporting Module - Enum Definitions
 * Desktop Equivalent: bi/reporting/reporting-enums.js
 */
(function() {
    'use strict';

    window.MobileBiReporting = window.MobileBiReporting || {};
    MobileBiReporting.enums = {};

    // ============================================================================
    // REPORT TYPE
    // ============================================================================

    MobileBiReporting.enums.REPORT_TYPE = {
        0: 'Unspecified', 1: 'Standard', 2: 'Ad Hoc', 3: 'Dashboard', 4: 'Scheduled', 5: 'Interactive'
    };
    MobileBiReporting.enums.REPORT_TYPE_VALUES = {
        'standard': 1, 'adhoc': 2, 'dashboard': 3, 'scheduled': 4, 'interactive': 5
    };
    MobileBiReporting.enums.REPORT_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-active', 4: 'status-active', 5: 'status-active'
    };

    // ============================================================================
    // REPORT STATUS
    // ============================================================================

    MobileBiReporting.enums.REPORT_STATUS = {
        0: 'Unspecified', 1: 'Draft', 2: 'Published', 3: 'Archived', 4: 'Deprecated'
    };
    MobileBiReporting.enums.REPORT_STATUS_VALUES = {
        'draft': 1, 'published': 2, 'archived': 3, 'deprecated': 4
    };
    MobileBiReporting.enums.REPORT_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-terminated'
    };

    // ============================================================================
    // EXECUTION STATUS
    // ============================================================================

    MobileBiReporting.enums.EXECUTION_STATUS = {
        0: 'Unspecified', 1: 'Pending', 2: 'Running', 3: 'Completed', 4: 'Failed', 5: 'Cancelled'
    };
    MobileBiReporting.enums.EXECUTION_STATUS_VALUES = {
        'pending': 1, 'running': 2, 'completed': 3, 'failed': 4, 'cancelled': 5
    };
    MobileBiReporting.enums.EXECUTION_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated', 5: 'status-inactive'
    };

    // ============================================================================
    // EXPORT FORMAT
    // ============================================================================

    MobileBiReporting.enums.EXPORT_FORMAT = {
        0: 'Unspecified', 1: 'PDF', 2: 'Excel', 3: 'CSV', 4: 'HTML', 5: 'JSON'
    };
    MobileBiReporting.enums.EXPORT_FORMAT_VALUES = {
        'pdf': 1, 'excel': 2, 'csv': 3, 'html': 4, 'json': 5
    };
    MobileBiReporting.enums.EXPORT_FORMAT_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active'
    };

    // ============================================================================
    // SCHEDULE FREQUENCY
    // ============================================================================

    MobileBiReporting.enums.SCHEDULE_FREQUENCY = {
        0: 'Unspecified', 1: 'Once', 2: 'Daily', 3: 'Weekly', 4: 'Monthly', 5: 'Quarterly', 6: 'Yearly'
    };
    MobileBiReporting.enums.SCHEDULE_FREQUENCY_VALUES = {
        'once': 1, 'daily': 2, 'weekly': 3, 'monthly': 4, 'quarterly': 5, 'yearly': 6
    };
    MobileBiReporting.enums.SCHEDULE_FREQUENCY_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-active'
    };

    // ============================================================================
    // ACCESS LEVEL
    // ============================================================================

    MobileBiReporting.enums.ACCESS_LEVEL = {
        0: 'Unspecified', 1: 'View', 2: 'Execute', 3: 'Edit', 4: 'Admin'
    };
    MobileBiReporting.enums.ACCESS_LEVEL_VALUES = {
        'view': 1, 'execute': 2, 'edit': 3, 'admin': 4
    };
    MobileBiReporting.enums.ACCESS_LEVEL_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-active'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiReporting.render = {
        reportType: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.REPORT_TYPE,
            MobileBiReporting.enums.REPORT_TYPE_CLASSES
        ),
        reportStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.REPORT_STATUS,
            MobileBiReporting.enums.REPORT_STATUS_CLASSES
        ),
        executionStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.EXECUTION_STATUS,
            MobileBiReporting.enums.EXECUTION_STATUS_CLASSES
        ),
        exportFormat: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.EXPORT_FORMAT,
            MobileBiReporting.enums.EXPORT_FORMAT_CLASSES
        ),
        scheduleFrequency: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.SCHEDULE_FREQUENCY,
            MobileBiReporting.enums.SCHEDULE_FREQUENCY_CLASSES
        ),
        accessLevel: Layer8MRenderers.createStatusRenderer(
            MobileBiReporting.enums.ACCESS_LEVEL,
            MobileBiReporting.enums.ACCESS_LEVEL_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
