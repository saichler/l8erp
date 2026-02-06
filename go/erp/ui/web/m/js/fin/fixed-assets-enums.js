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
 * Mobile Fixed Assets Module - Enum Definitions using Layer8EnumFactory
 * Desktop Equivalent: fin/fixed-assets/fixed-assets-enums.js
 */
(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8MRenderers;

    window.MobileFixedAssets = window.MobileFixedAssets || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ASSET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'status-active'],
        ['Disposed', 'disposed', 'status-terminated'],
        ['Under Maintenance', 'under maintenance', 'status-pending'],
        ['Transferred', 'transferred', 'status-inactive'],
        ['Fully Depreciated', 'fully depreciated', 'status-inactive']
    ]);

    const DEPRECIATION_METHOD = factory.simple([
        'Unspecified', 'Straight Line', 'Declining Balance', 'Double Declining',
        'Units of Production', 'Sum of Years'
    ]);

    const DISPOSAL_METHOD = factory.simple([
        'Unspecified', 'Sale', 'Scrap', 'Donation', 'Write-Off', 'Trade-In'
    ]);

    const MAINTENANCE_TYPE = factory.simple([
        'Unspecified', 'Preventive', 'Corrective', 'Upgrade', 'Inspection'
    ]);

    const MAINTENANCE_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Scheduled', 'scheduled', 'status-pending'],
        ['In Progress', 'in progress', 'status-pending'],
        ['Completed', 'completed', 'status-active'],
        ['Cancelled', 'cancelled', 'status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    MobileFixedAssets.enums = {
        ASSET_STATUS: ASSET_STATUS.enum,
        ASSET_STATUS_VALUES: ASSET_STATUS.values,
        ASSET_STATUS_CLASSES: ASSET_STATUS.classes,
        DEPRECIATION_METHOD: DEPRECIATION_METHOD.enum,
        DISPOSAL_METHOD: DISPOSAL_METHOD.enum,
        MAINTENANCE_TYPE: MAINTENANCE_TYPE.enum,
        MAINTENANCE_STATUS: MAINTENANCE_STATUS.enum,
        MAINTENANCE_STATUS_CLASSES: MAINTENANCE_STATUS.classes
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileFixedAssets.render = {
        assetStatus: createStatusRenderer(ASSET_STATUS.enum, ASSET_STATUS.classes),
        depreciationMethod: (type) => renderEnum(type, DEPRECIATION_METHOD.enum),
        disposalMethod: (type) => renderEnum(type, DISPOSAL_METHOD.enum),
        maintenanceType: (type) => renderEnum(type, MAINTENANCE_TYPE.enum),
        maintenanceStatus: createStatusRenderer(MAINTENANCE_STATUS.enum, MAINTENANCE_STATUS.classes),
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
