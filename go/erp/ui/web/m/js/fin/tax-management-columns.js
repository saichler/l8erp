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

    const col = window.Layer8ColumnFactory;
    const enums = MobileTaxManagement.enums;
    const render = MobileTaxManagement.render;

    MobileTaxManagement.columns = {
        TaxCode: [
            ...col.id('taxCodeId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.enum('taxType', 'Tax Type', null, render.taxType),
            ...col.custom('rate', 'Rate', (item) => Layer8MRenderers.renderPercentage(item.rate)),
            ...col.boolean('isActive', 'Active')
        ],

        TaxJurisdiction: [
            ...col.id('jurisdictionId'),
            ...col.col('name', 'Name'),
            ...col.enum('level', 'Level', null, render.jurisdictionLevel),
            ...col.col('countryCode', 'Country'),
            ...col.col('stateCode', 'State/Province'),
            ...col.boolean('isActive', 'Active')
        ],

        TaxRule: [
            ...col.id('ruleId'),
            ...col.col('name', 'Name'),
            ...col.col('taxCodeId', 'Tax Code'),
            ...col.col('jurisdictionId', 'Jurisdiction'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('endDate', 'End Date')
        ],

        TaxReturn: [
            ...col.id('returnId'),
            ...col.enum('taxType', 'Tax Type', null, render.taxType),
            ...col.col('fiscalPeriodId', 'Fiscal Period'),
            ...col.date('dueDate', 'Due Date'),
            ...col.status('status', 'Status', enums.TAX_RETURN_STATUS_VALUES, render.taxReturnStatus),
            ...col.money('taxAmount', 'Tax Amount')
        ],

        TaxExemption: [
            ...col.id('exemptionId'),
            ...col.col('exemptionNumber', 'Exemption #'),
            ...col.col('taxCodeId', 'Tax Code'),
            ...col.col('reason', 'Reason'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('expirationDate', 'Expiration Date')
        ],

        WithholdingTaxConfig: [
            ...col.id('configId'),
            ...col.col('vendorId', 'Vendor'),
            ...col.col('taxCodeId', 'Tax Code'),
            ...col.custom('withholdingRate', 'Rate', (item) => Layer8MRenderers.renderPercentage(item.withholdingRate)),
            ...col.money('thresholdAmount', 'Threshold'),
            ...col.boolean('isActive', 'Active')
        ]
    };

    MobileTaxManagement.primaryKeys = {
        TaxCode: 'taxCodeId', TaxJurisdiction: 'jurisdictionId', TaxRule: 'ruleId',
        TaxReturn: 'returnId', TaxExemption: 'exemptionId', WithholdingTaxConfig: 'configId'
    };

})();
