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
 * Mobile BI Data Management Module - Enum Definitions
 * Desktop Equivalent: bi/datamanagement/datamanagement-enums.js
 */
(function() {
    'use strict';

    window.MobileBiDataManagement = window.MobileBiDataManagement || {};
    MobileBiDataManagement.enums = {};

    // ============================================================================
    // DATA SOURCE TYPE
    // ============================================================================

    MobileBiDataManagement.enums.DATA_SOURCE_TYPE = {
        0: 'Unspecified', 1: 'Database', 2: 'File', 3: 'API', 4: 'Stream', 5: 'Data Warehouse'
    };
    MobileBiDataManagement.enums.DATA_SOURCE_TYPE_VALUES = {
        'database': 1, 'file': 2, 'api': 3, 'stream': 4, 'data warehouse': 5
    };
    MobileBiDataManagement.enums.DATA_SOURCE_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-active'
    };

    // ============================================================================
    // CONNECTION STATUS
    // ============================================================================

    MobileBiDataManagement.enums.CONNECTION_STATUS = {
        0: 'Unspecified', 1: 'Connected', 2: 'Disconnected', 3: 'Error'
    };
    MobileBiDataManagement.enums.CONNECTION_STATUS_VALUES = {
        'connected': 1, 'disconnected': 2, 'error': 3
    };
    MobileBiDataManagement.enums.CONNECTION_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-terminated'
    };

    // ============================================================================
    // ETL STATUS
    // ============================================================================

    MobileBiDataManagement.enums.ETL_STATUS = {
        0: 'Unspecified', 1: 'Idle', 2: 'Running', 3: 'Completed', 4: 'Failed', 5: 'Paused'
    };
    MobileBiDataManagement.enums.ETL_STATUS_VALUES = {
        'idle': 1, 'running': 2, 'completed': 3, 'failed': 4, 'paused': 5
    };
    MobileBiDataManagement.enums.ETL_STATUS_CLASSES = {
        1: 'status-inactive', 2: 'status-pending', 3: 'status-active', 4: 'status-terminated', 5: 'status-inactive'
    };

    // ============================================================================
    // DATA QUALITY STATUS
    // ============================================================================

    MobileBiDataManagement.enums.DATA_QUALITY_STATUS = {
        0: 'Unspecified', 1: 'Passed', 2: 'Warning', 3: 'Failed'
    };
    MobileBiDataManagement.enums.DATA_QUALITY_STATUS_VALUES = {
        'passed': 1, 'warning': 2, 'failed': 3
    };
    MobileBiDataManagement.enums.DATA_QUALITY_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated'
    };

    // ============================================================================
    // SCHEDULE FREQUENCY
    // ============================================================================

    MobileBiDataManagement.enums.SCHEDULE_FREQUENCY = {
        0: 'Unspecified', 1: 'Once', 2: 'Daily', 3: 'Weekly', 4: 'Monthly', 5: 'Quarterly', 6: 'Yearly'
    };
    MobileBiDataManagement.enums.SCHEDULE_FREQUENCY_VALUES = {
        'once': 1, 'daily': 2, 'weekly': 3, 'monthly': 4, 'quarterly': 5, 'yearly': 6
    };
    MobileBiDataManagement.enums.SCHEDULE_FREQUENCY_CLASSES = {
        1: 'status-inactive', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-pending', 6: 'status-pending'
    };

    // ============================================================================
    // GOVERNANCE LEVEL
    // ============================================================================

    MobileBiDataManagement.enums.GOVERNANCE_LEVEL = {
        0: 'Unspecified', 1: 'Public', 2: 'Internal', 3: 'Confidential', 4: 'Restricted'
    };
    MobileBiDataManagement.enums.GOVERNANCE_LEVEL_VALUES = {
        'public': 1, 'internal': 2, 'confidential': 3, 'restricted': 4
    };
    MobileBiDataManagement.enums.GOVERNANCE_LEVEL_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-terminated'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiDataManagement.render = {
        dataSourceType: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.DATA_SOURCE_TYPE,
            MobileBiDataManagement.enums.DATA_SOURCE_TYPE_CLASSES
        ),
        connectionStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.CONNECTION_STATUS,
            MobileBiDataManagement.enums.CONNECTION_STATUS_CLASSES
        ),
        etlStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.ETL_STATUS,
            MobileBiDataManagement.enums.ETL_STATUS_CLASSES
        ),
        dataQualityStatus: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.DATA_QUALITY_STATUS,
            MobileBiDataManagement.enums.DATA_QUALITY_STATUS_CLASSES
        ),
        scheduleFrequency: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.SCHEDULE_FREQUENCY,
            MobileBiDataManagement.enums.SCHEDULE_FREQUENCY_CLASSES
        ),
        governanceLevel: Layer8MRenderers.createStatusRenderer(
            MobileBiDataManagement.enums.GOVERNANCE_LEVEL,
            MobileBiDataManagement.enums.GOVERNANCE_LEVEL_CLASSES
        ),
        date: Layer8MRenderers.renderDate
    };

})();
