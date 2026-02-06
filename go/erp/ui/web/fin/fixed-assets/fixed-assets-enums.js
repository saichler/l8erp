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
// Fixed Assets Module - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    const factory = window.Layer8EnumFactory;
    const { createStatusRenderer, renderEnum, renderBoolean, renderDate, renderMoney } = Layer8DRenderers;

    window.FixedAssets = window.FixedAssets || {};

    // ============================================================================
    // ENUM DEFINITIONS
    // ============================================================================

    const ASSET_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Active', 'active', 'layer8d-status-active'],
        ['Disposed', 'disposed', 'layer8d-status-terminated'],
        ['Under Maintenance', 'maintenance', 'layer8d-status-pending'],
        ['Transferred', 'transferred', 'layer8d-status-inactive'],
        ['Fully Depreciated', 'depreciated', 'layer8d-status-inactive']
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
        ['Scheduled', 'scheduled', 'layer8d-status-pending'],
        ['In Progress', 'progress', 'layer8d-status-pending'],
        ['Completed', 'completed', 'layer8d-status-active'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // ============================================================================
    // EXPORT ENUMS
    // ============================================================================

    window.FixedAssets.enums = {
        ASSET_STATUS: ASSET_STATUS.enum,
        ASSET_STATUS_CLASSES: ASSET_STATUS.classes,
        DEPRECIATION_METHOD: DEPRECIATION_METHOD.enum,
        DISPOSAL_METHOD: DISPOSAL_METHOD.enum,
        MAINTENANCE_TYPE: MAINTENANCE_TYPE.enum,
        MAINTENANCE_STATUS: MAINTENANCE_STATUS.enum,
        MAINTENANCE_STATUS_CLASSES: MAINTENANCE_STATUS.classes
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    const renderAssetStatus = createStatusRenderer(ASSET_STATUS.enum, ASSET_STATUS.classes);
    const renderMaintenanceStatus = createStatusRenderer(MAINTENANCE_STATUS.enum, MAINTENANCE_STATUS.classes);

    window.FixedAssets.render = {
        assetStatus: renderAssetStatus,
        depreciationMethod: (v) => renderEnum(v, DEPRECIATION_METHOD.enum),
        disposalMethod: (v) => renderEnum(v, DISPOSAL_METHOD.enum),
        maintenanceType: (v) => renderEnum(v, MAINTENANCE_TYPE.enum),
        maintenanceStatus: renderMaintenanceStatus,
        boolean: renderBoolean,
        date: renderDate,
        money: renderMoney
    };

})();
