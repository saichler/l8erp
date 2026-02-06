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
// BI Data Management Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderDate } = Layer8DRenderers;

    window.BiDataManagement = window.BiDataManagement || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const DATA_SOURCE_TYPE = factory.simple([
        'Unspecified', 'Database', 'File', 'API', 'Stream', 'Data Warehouse'
    ]);

    const CONNECTION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Connected', 'connected', 'layer8d-status-active'],
        ['Disconnected', 'disconnected', 'layer8d-status-inactive'],
        ['Error', 'error', 'layer8d-status-terminated']
    ]);

    const ETL_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Idle', 'idle', 'layer8d-status-inactive'],
        ['Running', 'running', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Failed', 'failed', 'layer8d-status-terminated'],
        ['Paused', 'paused', 'layer8d-status-inactive']
    ]);

    const DATA_QUALITY_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Passed', 'passed', 'layer8d-status-active'],
        ['Warning', 'warning', 'layer8d-status-pending'],
        ['Failed', 'failed', 'layer8d-status-terminated']
    ]);

    const GOVERNANCE_LEVEL = factory.create([
        ['Unspecified', null, ''],
        ['Public', 'public', 'layer8d-status-active'],
        ['Internal', 'internal', 'layer8d-status-active'],
        ['Confidential', 'confidential', 'layer8d-status-pending'],
        ['Restricted', 'restricted', 'layer8d-status-terminated']
    ]);

    const SCHEDULE_FREQUENCY = factory.simple([
        'Unspecified', 'Once', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    BiDataManagement.enums = {
        DATA_SOURCE_TYPE: DATA_SOURCE_TYPE.enum,
        CONNECTION_STATUS: CONNECTION_STATUS.enum,
        CONNECTION_STATUS_CLASSES: CONNECTION_STATUS.classes,
        ETL_STATUS: ETL_STATUS.enum,
        ETL_STATUS_CLASSES: ETL_STATUS.classes,
        DATA_QUALITY_STATUS: DATA_QUALITY_STATUS.enum,
        DATA_QUALITY_STATUS_CLASSES: DATA_QUALITY_STATUS.classes,
        GOVERNANCE_LEVEL: GOVERNANCE_LEVEL.enum,
        GOVERNANCE_LEVEL_CLASSES: GOVERNANCE_LEVEL.classes,
        SCHEDULE_FREQUENCY: SCHEDULE_FREQUENCY.enum
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    BiDataManagement.render = {
        dataSourceType: (v) => renderEnum(v, DATA_SOURCE_TYPE.enum),
        connectionStatus: createStatusRenderer(CONNECTION_STATUS.enum, CONNECTION_STATUS.classes),
        etlStatus: createStatusRenderer(ETL_STATUS.enum, ETL_STATUS.classes),
        dataQualityStatus: createStatusRenderer(DATA_QUALITY_STATUS.enum, DATA_QUALITY_STATUS.classes),
        governanceLevel: createStatusRenderer(GOVERNANCE_LEVEL.enum, GOVERNANCE_LEVEL.classes),
        scheduleFrequency: (v) => renderEnum(v, SCHEDULE_FREQUENCY.enum),
        date: renderDate
    };

})();
