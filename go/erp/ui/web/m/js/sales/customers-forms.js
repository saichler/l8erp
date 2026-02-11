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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile Sales Customers Module - Form Configurations
 * Desktop Equivalent: sales/customers/customers-forms.js
 */
window.MobileSalesCustomers = window.MobileSalesCustomers || {};

(function() {
    'use strict';

    const f = window.Layer8FormFactory;
    const enums = MobileSalesCustomers.enums;

    MobileSalesCustomers.forms = {
        CustomerHierarchy: f.form('Customer Hierarchy', [
            f.section('Hierarchy Details', [
                ...f.text('name', 'Name', true),
                ...f.reference('parentHierarchyId', 'Parent Hierarchy', 'SalesCustomerHierarchy'),
                ...f.number('level', 'Level'),
                ...f.textarea('description', 'Description')
            ])
        ]),

        CustomerSegment: f.form('Customer Segment', [
            f.section('Segment Details', [
                ...f.text('name', 'Name', true),
                ...f.text('segmentType', 'Segment Type', true),
                ...f.textarea('description', 'Description'),
                ...f.textarea('criteria', 'Criteria'),
                ...f.checkbox('isActive', 'Active')
            ])
        ]),

        CustomerContract: f.form('Customer Contract', [
            f.section('Contract Details', [
                ...f.text('contractNumber', 'Contract #', true),
                ...f.reference('customerId', 'Customer', 'Customer', true),
                ...f.date('startDate', 'Start Date', true),
                ...f.date('endDate', 'End Date', true),
                ...f.select('status', 'Status', enums.CONTRACT_STATUS),
                ...f.money('contractValue', 'Contract Value'),
                ...f.reference('priceListId', 'Price List', 'PriceList'),
                ...f.text('paymentTerms', 'Payment Terms'),
                ...f.textarea('terms', 'Terms & Conditions'),
                ...f.textarea('notes', 'Notes')
            ]),
            f.section('Customer Prices', [
                ...f.inlineTable('prices', 'Customer Prices', [
                    { key: 'customerPriceId', label: 'ID', hidden: true },
                    { key: 'customerId', label: 'Customer', type: 'reference', lookupModel: 'Customer' },
                    { key: 'itemId', label: 'Item', type: 'reference', lookupModel: 'ScmItem', required: true },
                    { key: 'unitPrice', label: 'Price', type: 'money' },
                    { key: 'pricingMethod', label: 'Method', type: 'text' },
                    { key: 'minimumQuantity', label: 'Min Qty', type: 'number' }
                ])
            ])
        ]),

        PartnerChannel: f.form('Partner Channel', [
            f.section('Partner Details', [
                ...f.text('name', 'Name', true),
                ...f.text('partnerType', 'Partner Type', true),
                ...f.text('contactName', 'Contact Name'),
                ...f.text('email', 'Email'),
                ...f.text('phone', 'Phone'),
                ...f.checkbox('isActive', 'Active'),
                ...f.number('commissionRate', 'Commission Rate %'),
                ...f.reference('territoryId', 'Territory', 'SalesTerritory'),
                ...f.textarea('notes', 'Notes')
            ])
        ])
    };

})();
