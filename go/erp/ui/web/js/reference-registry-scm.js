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
 * ERP Reference Registry - SCM Models (Desktop)
 * Extends shared SCM data with desktop-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.Layer8DReferenceRegistrySCM = {
        ...window.ReferenceDataScm,

        // Desktop-specific: additional procurement entries
        ...ref.simple('ScmSupplierContract', 'contractId', 'contractNumber', 'Contract'),
        ...ref.idOnly('ScmContractTerm', 'termId'),

        // Desktop-specific: additional inventory entries
        ...ref.simple('ScmItemCategory', 'categoryId', 'name'),
        ...ref.simple('ScmInventoryLocation', 'locationId', 'name'),
        ...ref.idOnly('ScmStockLevel', 'stockLevelId'),
        ...ref.idOnly('ScmInventoryCount', 'countId'),
        ...ref.idOnly('ScmItemPricing', 'pricingId'),

        // Desktop-specific: additional warehouse entries
        ...ref.simple('ScmZone', 'zoneId', 'name'),

        // Desktop-specific: additional logistics entries
        ...ref.coded('ScmShipmentCarrier', 'carrierId', 'code', 'name'),
        ...ref.idOnly('ScmShipmentLine', 'lineId'),
        ...ref.simple('ScmDeliveryRoute', 'routeId', 'name'),
        ...ref.idOnly('ScmRouteStop', 'stopId'),

        // Desktop-specific: additional demand planning entries
        ...ref.idOnly('ScmForecastItem', 'forecastItemId'),
        ...ref.idOnly('ScmDemandHistory', 'historyId'),
        ...ref.idOnly('ScmPromotionImpact', 'impactId'),
        ...ref.idOnly('ScmConsensusAdjustment', 'adjustmentId'),
        ...ref.simple('ScmSeasonalProfile', 'profileId', 'name'),

        // Desktop-specific: additional supply planning entries
        ...ref.idOnly('ScmMRPRun', 'mrpRunId'),
        ...ref.idOnly('ScmMRPException', 'exceptionId'),
        ...ref.simple('ScmReorderRule', 'ruleId', 'ruleName'),

        // Desktop-specific: additional models
        ...ref.simple('ScmCarrier', 'carrierId', 'name', 'Carrier'),
        ...ref.idOnly('ScmWavePlan', 'wavePlanId')
    };
})();
