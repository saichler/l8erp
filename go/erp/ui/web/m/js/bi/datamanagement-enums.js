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
 * Mobile BI Data Management Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: bi/datamanagement/datamanagement-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8MRenderers;

    window.MobileBiDataManagement = window.MobileBiDataManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DATA_SOURCE_TYPE = factory.create([
        ['Unspecified', null, ''],
        ['Database', 'database', 'status-active'],
        ['File', 'file', 'status-active'],
        ['API', 'api', 'status-active'],
        ['Stream', 'stream', 'status-pending'],
        ['Data Warehouse', 'datawarehouse', 'status-active']
    ]);

    const CONNECTION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Connected', 'connected', 'status-active'],
        ['Disconnected', 'disconnected', 'status-inactive'],
        ['Error', 'error', 'status-terminated']
    ]);

    const ETL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Idle', 'idle', 'status-inactive'],
        ['Running', 'running', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Failed', 'failed', 'status-terminated'],
        ['Paused', 'paused', 'status-inactive']
    ]);

    const DATA_QUALITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Passed', 'passed', 'status-active'],
        ['Warning', 'warning', 'status-pending'],
        ['Failed', 'failed', 'status-terminated']
    ]);

    const SCHEDULE_FREQUENCY = factory.create([
        ['Unspecified', null, ''],
        ['Once', 'once', 'status-inactive'],
        ['Daily', 'daily', 'status-active'],
        ['Weekly', 'weekly', 'status-active'],
        ['Monthly', 'monthly', 'status-active'],
        ['Quarterly', 'quarterly', 'status-pending'],
        ['Yearly', 'yearly', 'status-pending']
    ]);

    const GOVERNANCE_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Public', 'public', 'status-active'],
        ['Internal', 'internal', 'status-active'],
        ['Confidential', 'confidential', 'status-pending'],
        ['Restricted', 'restricted', 'status-terminated']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileBiDataManagement.enums = {
        DATA_SOURCE_TYPE: DATA_SOURCE_TYPE.enum,
        DATA_SOURCE_TYPE_VALUES: DATA_SOURCE_TYPE.values,
        DATA_SOURCE_TYPE_CLASSES: DATA_SOURCE_TYPE.classes,
        CONNECTION_STATUS: CONNECTION_STATUS.enum,
        CONNECTION_STATUS_VALUES: CONNECTION_STATUS.values,
        CONNECTION_STATUS_CLASSES: CONNECTION_STATUS.classes,
        ETL_STATUS: ETL_STATUS.enum,
        ETL_STATUS_VALUES: ETL_STATUS.values,
        ETL_STATUS_CLASSES: ETL_STATUS.classes,
        DATA_QUALITY_STATUS: DATA_QUALITY_STATUS.enum,
        DATA_QUALITY_STATUS_VALUES: DATA_QUALITY_STATUS.values,
        DATA_QUALITY_STATUS_CLASSES: DATA_QUALITY_STATUS.classes,
        SCHEDULE_FREQUENCY: SCHEDULE_FREQUENCY.enum,
        SCHEDULE_FREQUENCY_VALUES: SCHEDULE_FREQUENCY.values,
        SCHEDULE_FREQUENCY_CLASSES: SCHEDULE_FREQUENCY.classes,
        GOVERNANCE_LEVEL: GOVERNANCE_LEVEL.enum,
        GOVERNANCE_LEVEL_VALUES: GOVERNANCE_LEVEL.values,
        GOVERNANCE_LEVEL_CLASSES: GOVERNANCE_LEVEL.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileBiDataManagement.render = {
        dataSourceType: createStatusRenderer(DATA_SOURCE_TYPE.enum, DATA_SOURCE_TYPE.classes),
        connectionStatus: createStatusRenderer(CONNECTION_STATUS.enum, CONNECTION_STATUS.classes),
        etlStatus: createStatusRenderer(ETL_STATUS.enum, ETL_STATUS.classes),
        dataQualityStatus: createStatusRenderer(DATA_QUALITY_STATUS.enum, DATA_QUALITY_STATUS.classes),
        scheduleFrequency: createStatusRenderer(SCHEDULE_FREQUENCY.enum, SCHEDULE_FREQUENCY.classes),
        governanceLevel: createStatusRenderer(GOVERNANCE_LEVEL.enum, GOVERNANCE_LEVEL.classes),
        date: renderDate
    };

})();
