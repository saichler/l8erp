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
// Tax Management Module - Column Configurations
// Table column definitions for all Tax Management models

(function() {
    'use strict';

    // Ensure TaxManagement namespace exists
    window.TaxManagement = window.TaxManagement || {};

    const { renderBoolean, renderDate, renderMoney, renderPercentage } = Layer8DRenderers;
    const enums = TaxManagement.enums;
    const render = TaxManagement.render;

    // ============================================================================
    // COLUMN CONFIGURATIONS
    // ============================================================================

    TaxManagement.columns = {
        TaxCode: [
            { key: 'taxCodeId', label: 'ID', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'code', label: 'Code', sortKey: 'code', filterKey: 'code' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'taxType',
                label: 'Tax Type',
                sortKey: 'taxType',
                render: (item) => render.taxType(item.taxType)
            },
            {
                key: 'rate',
                label: 'Rate',
                sortKey: 'rate',
                render: (item) => renderPercentage(item.rate)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        TaxJurisdiction: [
            { key: 'jurisdictionId', label: 'ID', sortKey: 'jurisdictionId', filterKey: 'jurisdictionId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'level',
                label: 'Level',
                sortKey: 'level',
                render: (item) => render.jurisdictionLevel(item.level)
            },
            { key: 'country', label: 'Country', sortKey: 'country', filterKey: 'country' },
            { key: 'stateProvince', label: 'State/Province', sortKey: 'stateProvince', filterKey: 'stateProvince' },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ],

        TaxRule: [
            { key: 'ruleId', label: 'ID', sortKey: 'ruleId', filterKey: 'ruleId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'taxCodeId', label: 'Tax Code', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'jurisdictionId', label: 'Jurisdiction', sortKey: 'jurisdictionId', filterKey: 'jurisdictionId' },
            {
                key: 'effectiveDate',
                label: 'Effective Date',
                sortKey: 'effectiveDate',
                render: (item) => renderDate(item.effectiveDate)
            },
            {
                key: 'expirationDate',
                label: 'Expiration Date',
                sortKey: 'expirationDate',
                render: (item) => renderDate(item.expirationDate)
            }
        ],

        TaxReturn: [
            { key: 'returnId', label: 'ID', sortKey: 'returnId', filterKey: 'returnId' },
            {
                key: 'taxType',
                label: 'Tax Type',
                sortKey: 'taxType',
                render: (item) => render.taxType(item.taxType)
            },
            { key: 'filingPeriod', label: 'Filing Period', sortKey: 'filingPeriod', filterKey: 'filingPeriod' },
            {
                key: 'dueDate',
                label: 'Due Date',
                sortKey: 'dueDate',
                render: (item) => renderDate(item.dueDate)
            },
            {
                key: 'status',
                label: 'Status',
                sortKey: 'status',
                render: (item) => render.taxReturnStatus(item.status)
            },
            {
                key: 'taxLiability',
                label: 'Tax Liability',
                sortKey: 'taxLiability',
                render: (item) => renderMoney(item.taxLiability)
            }
        ],

        TaxExemption: [
            { key: 'exemptionId', label: 'ID', sortKey: 'exemptionId', filterKey: 'exemptionId' },
            { key: 'entityName', label: 'Entity Name', sortKey: 'entityName', filterKey: 'entityName' },
            { key: 'taxCodeId', label: 'Tax Code', sortKey: 'taxCodeId', filterKey: 'taxCodeId' },
            { key: 'exemptionReason', label: 'Reason', sortKey: 'exemptionReason', filterKey: 'exemptionReason' },
            {
                key: 'startDate',
                label: 'Start Date',
                sortKey: 'startDate',
                render: (item) => renderDate(item.startDate)
            },
            {
                key: 'endDate',
                label: 'End Date',
                sortKey: 'endDate',
                render: (item) => renderDate(item.endDate)
            }
        ],

        WithholdingTaxConfig: [
            { key: 'configId', label: 'ID', sortKey: 'configId', filterKey: 'configId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            {
                key: 'taxType',
                label: 'Tax Type',
                sortKey: 'taxType',
                render: (item) => render.taxType(item.taxType)
            },
            {
                key: 'rate',
                label: 'Rate',
                sortKey: 'rate',
                render: (item) => renderPercentage(item.rate)
            },
            {
                key: 'thresholdAmount',
                label: 'Threshold',
                sortKey: 'thresholdAmount',
                render: (item) => renderMoney(item.thresholdAmount)
            },
            {
                key: 'isActive',
                label: 'Active',
                sortKey: 'isActive',
                render: (item) => renderBoolean(item.isActive)
            }
        ]
    };

})();
