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
// CRM Marketing Module - Form Definitions

(function() {
    'use strict';

    window.CrmMarketing = window.CrmMarketing || {};

    const enums = CrmMarketing.enums;

    CrmMarketing.forms = {
        CrmCampaign: {
            title: 'Campaign',
            sections: [
                {
                    title: 'Campaign Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'campaignType', label: 'Type', type: 'select', options: enums.CAMPAIGN_TYPE },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CAMPAIGN_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'parentCampaignId', label: 'Parent Campaign', type: 'reference', lookupModel: 'CrmCampaign' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Budget & Metrics',
                    fields: [
                        { key: 'budgetedCost', label: 'Budgeted Cost', type: 'money' },
                        { key: 'actualCost', label: 'Actual Cost', type: 'money' },
                        { key: 'expectedRevenue', label: 'Expected Revenue', type: 'money' },
                        { key: 'expectedResponseRate', label: 'Expected Response Rate (%)', type: 'number' },
                        { key: 'numSent', label: 'Number Sent', type: 'number' },
                        { key: 'numResponses', label: 'Number of Responses', type: 'number' }
                    ]
                }
            ]
        },

        CrmCampaignMember: {
            title: 'Campaign Member',
            sections: [
                {
                    title: 'Member Details',
                    fields: [
                        { key: 'campaignId', label: 'Campaign', type: 'reference', lookupModel: 'CrmCampaign', required: true },
                        { key: 'leadId', label: 'Lead', type: 'reference', lookupModel: 'CrmLead' },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CAMPAIGN_MEMBER_STATUS },
                        { key: 'sourceListId', label: 'Source List', type: 'reference', lookupModel: 'CrmMarketingList' },
                        { key: 'firstRespondedDate', label: 'First Responded', type: 'date' },
                        { key: 'hasResponded', label: 'Has Responded', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmEmailTemplate: {
            title: 'Email Template',
            sections: [
                {
                    title: 'Template Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'templateType', label: 'Template Type', type: 'text' },
                        { key: 'folder', label: 'Folder', type: 'text' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                },
                {
                    title: 'Content',
                    fields: [
                        { key: 'bodyHtml', label: 'HTML Body', type: 'textarea' },
                        { key: 'bodyText', label: 'Text Body', type: 'textarea' }
                    ]
                },
                {
                    title: 'Usage Statistics',
                    fields: [
                        { key: 'timesUsed', label: 'Times Used', type: 'number', readonly: true },
                        { key: 'lastUsedDate', label: 'Last Used', type: 'date', readonly: true }
                    ]
                }
            ]
        },

        CrmMarketingList: {
            title: 'Marketing List',
            sections: [
                {
                    title: 'List Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'listType', label: 'List Type', type: 'text' },
                        { key: 'memberCount', label: 'Member Count', type: 'number', readonly: true },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isDynamic', label: 'Dynamic List', type: 'checkbox' },
                        { key: 'criteria', label: 'Criteria', type: 'textarea' },
                        { key: 'lastUsedDate', label: 'Last Used', type: 'date', readonly: true },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmCampaignResponse: {
            title: 'Campaign Response',
            sections: [
                {
                    title: 'Response Details',
                    fields: [
                        { key: 'campaignId', label: 'Campaign', type: 'reference', lookupModel: 'CrmCampaign', required: true },
                        { key: 'campaignMemberId', label: 'Campaign Member', type: 'reference', lookupModel: 'CrmCampaignMember' },
                        { key: 'responseType', label: 'Response Type', type: 'select', options: enums.RESPONSE_TYPE },
                        { key: 'responseDate', label: 'Response Date', type: 'date' },
                        { key: 'details', label: 'Details', type: 'textarea' }
                    ]
                },
                {
                    title: 'Conversion Details',
                    fields: [
                        { key: 'leadId', label: 'Lead Created', type: 'reference', lookupModel: 'CrmLead' },
                        { key: 'opportunityId', label: 'Opportunity Created', type: 'reference', lookupModel: 'CrmOpportunity' },
                        { key: 'revenueValue', label: 'Revenue Value', type: 'money' }
                    ]
                }
            ]
        },

        CrmCampaignROI: {
            title: 'Campaign ROI',
            sections: [
                {
                    title: 'ROI Details',
                    fields: [
                        { key: 'campaignId', label: 'Campaign', type: 'reference', lookupModel: 'CrmCampaign', required: true },
                        { key: 'calculationDate', label: 'Calculation Date', type: 'date' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                },
                {
                    title: 'Financial Metrics',
                    fields: [
                        { key: 'totalCost', label: 'Total Cost', type: 'money' },
                        { key: 'totalRevenue', label: 'Total Revenue', type: 'money' },
                        { key: 'roiPercentage', label: 'ROI Percentage', type: 'number' },
                        { key: 'costPerLead', label: 'Cost per Lead', type: 'money' },
                        { key: 'costPerOpportunity', label: 'Cost per Opportunity', type: 'money' }
                    ]
                },
                {
                    title: 'Conversion Metrics',
                    fields: [
                        { key: 'leadsGenerated', label: 'Leads Generated', type: 'number' },
                        { key: 'opportunitiesCreated', label: 'Opportunities Created', type: 'number' },
                        { key: 'dealsWon', label: 'Deals Won', type: 'number' },
                        { key: 'conversionRate', label: 'Conversion Rate (%)', type: 'number' }
                    ]
                }
            ]
        }
    };

    CrmMarketing.primaryKeys = {
        CrmCampaign: 'campaignId',
        CrmCampaignMember: 'memberId',
        CrmEmailTemplate: 'templateId',
        CrmMarketingList: 'listId',
        CrmCampaignResponse: 'responseId',
        CrmCampaignROI: 'roiId'
    };

})();
