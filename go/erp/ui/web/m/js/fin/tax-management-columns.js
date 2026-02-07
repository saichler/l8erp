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
 * Mobile Tax Management Module - Column Configurations
 * Desktop Equivalent: fin/tax/tax-columns.js
 */
(function() {
    'use strict';

    const enums = MobileTaxManagement.enums;
    const render = MobileTaxManagement.render;

    MobileTaxManagement.columns = {
        TaxCode: [
            { key: 'taxCodeId', label: 'ID', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'taxType', label: 'Tax Type', sortKey: 'taxType', render: (item) => render.taxType(item.taxType) },
            { key: 'rate', label: 'Rate', sortKey: 'rate', render: (item) => Layer8MRenderers.renderPercentage(item.rate) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        TaxJurisdiction: [
            { key: 'jurisdictionId', label: 'ID', sortKey: 'jurisdictionId', filterKey: 'jurisdictionId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'level', label: 'Level', sortKey: 'level', render: (item) => render.jurisdictionLevel(item.level) },
            { key: 'countryCode', label: 'Country', sortKey: 'countryCode', filterKey: 'countryCode' },
            { key: 'stateCode', label: 'State/Province', sortKey: 'stateCode', filterKey: 'stateCode' },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ],

        TaxRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'taxCodeId', label: 'Tax Code', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'jurisdictionId', label: 'Jurisdiction', sortKey: 'jurisdictionId', filterKey: 'jurisdictionId' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => Layer8MRenderers.renderDate(item.effectiveDate) },
            { key: 'endDate', label: 'End Date', sortKey: 'endDate', render: (item) => Layer8MRenderers.renderDate(item.endDate) }
        ],

        TaxReturn: [
            { key: 'returnId', label: 'ID', sortKey: 'returnId', filterKey: 'returnId' },
            { key: 'taxType', label: 'Tax Type', sortKey: 'taxType', render: (item) => render.taxType(item.taxType) },
            { key: 'fiscalPeriodId', label: 'Fiscal Period', sortKey: 'fiscalPeriodId', filterKey: 'fiscalPeriodId' },
            { key: 'dueDate', label: 'Due Date', sortKey: 'dueDate', render: (item) => Layer8MRenderers.renderDate(item.dueDate) },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.TAX_RETURN_STATUS_VALUES, render: (item) => render.taxReturnStatus(item.status) },
            { key: 'taxAmount', label: 'Tax Amount', sortKey: 'taxAmount', render: (item) => Layer8MRenderers.renderMoney(item.taxAmount) }
        ],

        TaxExemption: [
            { key: 'exemptionId', label: 'ID', sortKey: 'exemptionId', filterKey: 'exemptionId' },
            { key: 'exemptionNumber', label: 'Exemption #', sortKey: 'exemptionNumber', filterKey: 'exemptionNumber' },
            { key: 'taxCodeId', label: 'Tax Code', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'reason', label: 'Reason', sortKey: 'reason', filterKey: 'reason' },
            { key: 'effectiveDate', label: 'Effective Date', sortKey: 'effectiveDate', render: (item) => Layer8MRenderers.renderDate(item.effectiveDate) },
            { key: 'expirationDate', label: 'Expiration Date', sortKey: 'expirationDate', render: (item) => Layer8MRenderers.renderDate(item.expirationDate) }
        ],

        WithholdingTaxConfig: [
            { key: 'configId', label: 'ID', sortKey: 'configId', filterKey: 'configId' },
            { key: 'vendorId', label: 'Vendor', sortKey: 'vendorId', filterKey: 'vendorId' },
            { key: 'taxCodeId', label: 'Tax Code', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'withholdingRate', label: 'Rate', sortKey: 'withholdingRate', render: (item) => Layer8MRenderers.renderPercentage(item.withholdingRate) },
            { key: 'thresholdAmount', label: 'Threshold', sortKey: 'thresholdAmount', render: (item) => Layer8MRenderers.renderMoney(item.thresholdAmount) },
            { key: 'isActive', label: 'Active', sortKey: 'isActive', render: (item) => Layer8MRenderers.renderBoolean(item.isActive) }
        ]
    };

    MobileTaxManagement.primaryKeys = {
        TaxCode: 'taxCodeId', TaxJurisdiction: 'jurisdictionId', TaxRule: 'ruleId',
        TaxReturn: 'returnId', TaxExemption: 'exemptionId', WithholdingTaxConfig: 'configId'
    };

})();
