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
// Sales Customers Module - Form Definitions
// Form field configurations for all Sales Customer Management models

(function() {
    'use strict';

    window.SalesCustomers = window.SalesCustomers || {};

    const enums = SalesCustomers.enums;

    // ============================================================================
    // FORM FIELD DEFINITIONS
    // ============================================================================

    SalesCustomers.forms = {
        SalesCustomerHierarchy: {
            title: 'Customer Hierarchy',
            sections: [
                {
                    title: 'Hierarchy Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'parentId', label: 'Parent Hierarchy', type: 'reference', lookupModel: 'SalesCustomerHierarchy' },
                        { key: 'level', label: 'Level', type: 'number' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesCustomerSegment: {
            title: 'Customer Segment',
            sections: [
                {
                    title: 'Segment Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'criteria', label: 'Criteria', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        SalesCustomerContract: {
            title: 'Customer Contract',
            sections: [
                {
                    title: 'Contract Details',
                    fields: [
                        { key: 'contractNumber', label: 'Contract #', type: 'text', required: true },
                        { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer', required: true },
                        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
                        { key: 'endDate', label: 'End Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CONTRACT_STATUS },
                        { key: 'contractValue', label: 'Contract Value', type: 'currency' },
                        { key: 'priceListId', label: 'Price List', type: 'reference', lookupModel: 'SalesPriceList' },
                        { key: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                        { key: 'terms', label: 'Terms & Conditions', type: 'textarea' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        SalesPartnerChannel: {
            title: 'Partner Channel',
            sections: [
                {
                    title: 'Partner Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'partnerType', label: 'Partner Type', type: 'text', required: true },
                        { key: 'contactName', label: 'Contact Name', type: 'text' },
                        { key: 'contactEmail', label: 'Contact Email', type: 'text' },
                        { key: 'contactPhone', label: 'Contact Phone', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.PARTNER_STATUS },
                        { key: 'commissionRate', label: 'Commission Rate %', type: 'number' },
                        { key: 'territoryId', label: 'Territory', type: 'reference', lookupModel: 'SalesTerritory' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        }
    };

    // ============================================================================
    // PRIMARY KEY MAPPING
    // ============================================================================

    SalesCustomers.primaryKeys = {
        SalesCustomerHierarchy: 'hierarchyId',
        SalesCustomerSegment: 'segmentId',
        SalesCustomerContract: 'contractId',
        SalesPartnerChannel: 'partnerId'
    };

})();
