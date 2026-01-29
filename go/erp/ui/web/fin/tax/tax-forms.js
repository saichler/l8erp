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
// Tax Management Module - Form Definitions
// Form field configurations for all Tax Management models

(function() {
    'use strict';

    // Ensure TaxManagement namespace exists
    window.TaxManagement = window.TaxManagement || {};

    const enums = TaxManagement.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    TaxManagement.forms = {
        TaxCode: {
            title: 'Tax Code',
            sections: [
                {
                    title: 'Tax Code Information',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'taxType', label: 'Tax Type', type: 'select', options: enums.TAX_TYPE, required: true },
                        { key: 'rate', label: 'Rate (%)', type: 'number', required: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        TaxJurisdiction: {
            title: 'Tax Jurisdiction',
            sections: [
                {
                    title: 'Jurisdiction Information',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'level', label: 'Level', type: 'select', options: enums.JURISDICTION_LEVEL, required: true },
                        { key: 'country', label: 'Country', type: 'text', required: true },
                        { key: 'stateProvince', label: 'State/Province', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        TaxRule: {
            title: 'Tax Rule',
            sections: [
                {
                    title: 'Rule Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'taxCodeId', label: 'Tax Code', type: 'reference', lookupModel: 'TaxCode', required: true },
                        { key: 'jurisdictionId', label: 'Jurisdiction', type: 'reference', lookupModel: 'TaxJurisdiction', required: true },
                        { key: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
                        { key: 'expirationDate', label: 'Expiration Date', type: 'date' }
                    ]
                }
            ]
        },

        TaxReturn: {
            title: 'Tax Return',
            sections: [
                {
                    title: 'Return Details',
                    fields: [
                        { key: 'taxType', label: 'Tax Type', type: 'select', options: enums.TAX_TYPE, required: true },
                        { key: 'filingPeriod', label: 'Filing Period', type: 'text', required: true },
                        { key: 'dueDate', label: 'Due Date', type: 'date', required: true },
                        { key: 'filingDate', label: 'Filing Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.TAX_RETURN_STATUS },
                        { key: 'taxLiability', label: 'Tax Liability', type: 'currency' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        TaxExemption: {
            title: 'Tax Exemption',
            sections: [
                {
                    title: 'Exemption Details',
                    fields: [
                        { key: 'entityName', label: 'Entity Name', type: 'text', required: true },
                        { key: 'taxCodeId', label: 'Tax Code', type: 'reference', lookupModel: 'TaxCode', required: true },
                        { key: 'exemptionReason', label: 'Exemption Reason', type: 'textarea', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'certificateNumber', label: 'Certificate Number', type: 'text' }
                    ]
                }
            ]
        },

        WithholdingTaxConfig: {
            title: 'Withholding Tax Config',
            sections: [
                {
                    title: 'Configuration Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'taxType', label: 'Tax Type', type: 'select', options: enums.TAX_TYPE, required: true },
                        { key: 'rate', label: 'Rate (%)', type: 'number', required: true },
                        { key: 'thresholdAmount', label: 'Threshold Amount', type: 'currency' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    TaxManagement.primaryKeys = {
        TaxCode: 'taxCodeId',
        TaxJurisdiction: 'jurisdictionId',
        TaxRule: 'ruleId',
        TaxReturn: 'returnId',
        TaxExemption: 'exemptionId',
        WithholdingTaxConfig: 'configId'
    };

})();
