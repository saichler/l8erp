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
// BI Data Management Module - Enum Definitions

(function() {
    'use strict';

    window.BiDataManagement = window.BiDataManagement || {};
    BiDataManagement.enums = {};

    // DATA SOURCE TYPE
    BiDataManagement.enums.DATA_SOURCE_TYPE = {
        0: 'Unspecified',
        1: 'Database',
        2: 'File',
        3: 'API',
        4: 'Stream',
        5: 'Data Warehouse'
    };

    BiDataManagement.enums.DATA_SOURCE_TYPE_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-pending',
        5: 'layer8d-status-active'
    };

    // CONNECTION STATUS
    BiDataManagement.enums.CONNECTION_STATUS = {
        0: 'Unspecified',
        1: 'Connected',
        2: 'Disconnected',
        3: 'Error'
    };

    BiDataManagement.enums.CONNECTION_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-inactive',
        3: 'layer8d-status-terminated'
    };

    // ETL STATUS
    BiDataManagement.enums.ETL_STATUS = {
        0: 'Unspecified',
        1: 'Idle',
        2: 'Running',
        3: 'Completed',
        4: 'Failed',
        5: 'Paused'
    };

    BiDataManagement.enums.ETL_STATUS_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-terminated',
        5: 'layer8d-status-inactive'
    };

    // DATA QUALITY STATUS
    BiDataManagement.enums.DATA_QUALITY_STATUS = {
        0: 'Unspecified',
        1: 'Passed',
        2: 'Warning',
        3: 'Failed'
    };

    BiDataManagement.enums.DATA_QUALITY_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-terminated'
    };

    // GOVERNANCE LEVEL
    BiDataManagement.enums.GOVERNANCE_LEVEL = {
        0: 'Unspecified',
        1: 'Public',
        2: 'Internal',
        3: 'Confidential',
        4: 'Restricted'
    };

    BiDataManagement.enums.GOVERNANCE_LEVEL_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-active',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-terminated'
    };

    // SCHEDULE FREQUENCY
    BiDataManagement.enums.SCHEDULE_FREQUENCY = {
        0: 'Unspecified',
        1: 'Once',
        2: 'Daily',
        3: 'Weekly',
        4: 'Monthly',
        5: 'Quarterly',
        6: 'Yearly'
    };

    BiDataManagement.enums.SCHEDULE_FREQUENCY_CLASSES = {
        1: 'layer8d-status-inactive',
        2: 'layer8d-status-active',
        3: 'layer8d-status-active',
        4: 'layer8d-status-active',
        5: 'layer8d-status-pending',
        6: 'layer8d-status-pending'
    };

    // RENDERERS
    BiDataManagement.render = {};

    BiDataManagement.render.dataSourceType = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.DATA_SOURCE_TYPE,
        BiDataManagement.enums.DATA_SOURCE_TYPE_CLASSES
    );

    BiDataManagement.render.connectionStatus = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.CONNECTION_STATUS,
        BiDataManagement.enums.CONNECTION_STATUS_CLASSES
    );

    BiDataManagement.render.etlStatus = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.ETL_STATUS,
        BiDataManagement.enums.ETL_STATUS_CLASSES
    );

    BiDataManagement.render.dataQualityStatus = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.DATA_QUALITY_STATUS,
        BiDataManagement.enums.DATA_QUALITY_STATUS_CLASSES
    );

    BiDataManagement.render.governanceLevel = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.GOVERNANCE_LEVEL,
        BiDataManagement.enums.GOVERNANCE_LEVEL_CLASSES
    );

    BiDataManagement.render.scheduleFrequency = Layer8DRenderers.createStatusRenderer(
        BiDataManagement.enums.SCHEDULE_FREQUENCY,
        BiDataManagement.enums.SCHEDULE_FREQUENCY_CLASSES
    );

    BiDataManagement.render.date = Layer8DRenderers.renderDate;

})();
