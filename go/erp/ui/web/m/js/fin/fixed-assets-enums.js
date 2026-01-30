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
 * Mobile Fixed Assets Module - Enum Definitions
 * Desktop Equivalent: fin/fixed-assets/fixed-assets-enums.js
 */
(function() {
    'use strict';

    window.MobileFixedAssets = window.MobileFixedAssets || {};
    MobileFixedAssets.enums = {};

    // ============================================================================
    // ASSET STATUS
    // ============================================================================

    MobileFixedAssets.enums.ASSET_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Disposed', 3: 'Under Maintenance',
        4: 'Transferred', 5: 'Fully Depreciated'
    };
    MobileFixedAssets.enums.ASSET_STATUS_VALUES = {
        'active': 1, 'disposed': 2, 'under maintenance': 3,
        'transferred': 4, 'fully depreciated': 5
    };
    MobileFixedAssets.enums.ASSET_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-terminated', 3: 'status-pending',
        4: 'status-inactive', 5: 'status-inactive'
    };

    // ============================================================================
    // DEPRECIATION METHOD
    // ============================================================================

    MobileFixedAssets.enums.DEPRECIATION_METHOD = {
        0: 'Unspecified', 1: 'Straight Line', 2: 'Declining Balance',
        3: 'Double Declining', 4: 'Units of Production', 5: 'Sum of Years'
    };

    // ============================================================================
    // DISPOSAL METHOD
    // ============================================================================

    MobileFixedAssets.enums.DISPOSAL_METHOD = {
        0: 'Unspecified', 1: 'Sale', 2: 'Scrap', 3: 'Donation',
        4: 'Write-Off', 5: 'Trade-In'
    };

    // ============================================================================
    // MAINTENANCE TYPE
    // ============================================================================

    MobileFixedAssets.enums.MAINTENANCE_TYPE = {
        0: 'Unspecified', 1: 'Preventive', 2: 'Corrective', 3: 'Upgrade', 4: 'Inspection'
    };

    // ============================================================================
    // MAINTENANCE STATUS
    // ============================================================================

    MobileFixedAssets.enums.MAINTENANCE_STATUS = {
        0: 'Unspecified', 1: 'Scheduled', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileFixedAssets.enums.MAINTENANCE_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-inactive'
    };

    // ============================================================================
    // RENDER FUNCTIONS
    // ============================================================================

    MobileFixedAssets.render = {
        assetStatus: MobileRenderers.createStatusRenderer(
            MobileFixedAssets.enums.ASSET_STATUS,
            MobileFixedAssets.enums.ASSET_STATUS_CLASSES
        ),
        depreciationMethod: (type) => MobileRenderers.renderEnum(type, MobileFixedAssets.enums.DEPRECIATION_METHOD),
        disposalMethod: (type) => MobileRenderers.renderEnum(type, MobileFixedAssets.enums.DISPOSAL_METHOD),
        maintenanceType: (type) => MobileRenderers.renderEnum(type, MobileFixedAssets.enums.MAINTENANCE_TYPE),
        maintenanceStatus: MobileRenderers.createStatusRenderer(
            MobileFixedAssets.enums.MAINTENANCE_STATUS,
            MobileFixedAssets.enums.MAINTENANCE_STATUS_CLASSES
        ),
        boolean: MobileRenderers.renderBoolean,
        date: MobileRenderers.renderDate,
        money: MobileRenderers.renderMoney
    };

})();
