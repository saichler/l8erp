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
// Fixed Assets Module - Enum Definitions
// All enum constants and value mappings for Fixed Assets models

(function() {
    'use strict';

    // Create FixedAssets namespace
    window.FixedAssets = window.FixedAssets || {};
    FixedAssets.enums = {};

    // ============================================================================
    // ASSET STATUS
    // ============================================================================

    FixedAssets.enums.ASSET_STATUS = {
        0: 'Unspecified',
        1: 'Active',
        2: 'Disposed',
        3: 'Under Maintenance',
        4: 'Transferred',
        5: 'Fully Depreciated'
    };

    FixedAssets.enums.ASSET_STATUS_CLASSES = {
        1: 'layer8d-status-active',
        2: 'layer8d-status-terminated',
        3: 'layer8d-status-pending',
        4: 'layer8d-status-inactive',
        5: 'layer8d-status-inactive'
    };

    // ============================================================================
    // DEPRECIATION METHOD
    // ============================================================================

    FixedAssets.enums.DEPRECIATION_METHOD = {
        0: 'Unspecified',
        1: 'Straight Line',
        2: 'Declining Balance',
        3: 'Double Declining',
        4: 'Units of Production',
        5: 'Sum of Years'
    };

    // ============================================================================
    // DISPOSAL METHOD
    // ============================================================================

    FixedAssets.enums.DISPOSAL_METHOD = {
        0: 'Unspecified',
        1: 'Sale',
        2: 'Scrap',
        3: 'Donation',
        4: 'Write-Off',
        5: 'Trade-In'
    };

    // ============================================================================
    // MAINTENANCE TYPE
    // ============================================================================

    FixedAssets.enums.MAINTENANCE_TYPE = {
        0: 'Unspecified',
        1: 'Preventive',
        2: 'Corrective',
        3: 'Upgrade',
        4: 'Inspection'
    };

    // ============================================================================
    // MAINTENANCE STATUS
    // ============================================================================

    FixedAssets.enums.MAINTENANCE_STATUS = {
        0: 'Unspecified',
        1: 'Scheduled',
        2: 'In Progress',
        3: 'Completed',
        4: 'Cancelled'
    };

    FixedAssets.enums.MAINTENANCE_STATUS_CLASSES = {
        1: 'layer8d-status-pending',
        2: 'layer8d-status-pending',
        3: 'layer8d-status-active',
        4: 'layer8d-status-inactive'
    };

    // ============================================================================
    // RENDERERS
    // ============================================================================

    // Create render functions using shared utilities
    FixedAssets.render = {};

    FixedAssets.render.assetStatus = Layer8DRenderers.createStatusRenderer(
        FixedAssets.enums.ASSET_STATUS,
        FixedAssets.enums.ASSET_STATUS_CLASSES
    );

    FixedAssets.render.depreciationMethod = (type) => Layer8DRenderers.renderEnum(type, FixedAssets.enums.DEPRECIATION_METHOD);
    FixedAssets.render.disposalMethod = (type) => Layer8DRenderers.renderEnum(type, FixedAssets.enums.DISPOSAL_METHOD);
    FixedAssets.render.maintenanceType = (type) => Layer8DRenderers.renderEnum(type, FixedAssets.enums.MAINTENANCE_TYPE);

    FixedAssets.render.maintenanceStatus = Layer8DRenderers.createStatusRenderer(
        FixedAssets.enums.MAINTENANCE_STATUS,
        FixedAssets.enums.MAINTENANCE_STATUS_CLASSES
    );

    FixedAssets.render.boolean = Layer8DRenderers.renderBoolean;
    FixedAssets.render.date = Layer8DRenderers.renderDate;
    FixedAssets.render.money = Layer8DRenderers.renderMoney;

})();
