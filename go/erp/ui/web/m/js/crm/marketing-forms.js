/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmMarketing.enums;

    MobileCrmMarketing.forms = {
        CrmCampaign: {
            title: 'Campaign',
            sections: [
                {
                    title: 'Campaign Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'campaignType', label: 'Type', type: 'select', options: enums.CAMPAIGN_TYPE, required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.CAMPAIGN_STATUS },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'startDate', label: 'Start Date', type: 'date' },
                        { key: 'endDate', label: 'End Date', type: 'date' },
                        { key: 'budgetedCost', label: 'Budgeted Cost', type: 'currency' },
                        { key: 'expectedRevenue', label: 'Expected Revenue', type: 'currency' },
                        { key: 'expectedResponse', label: 'Expected Response %', type: 'number' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' }
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
                        { key: 'status', label: 'Status', type: 'select', options: enums.MEMBER_STATUS },
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
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'htmlBody', label: 'HTML Body', type: 'textarea' },
                        { key: 'textBody', label: 'Text Body', type: 'textarea' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
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
                        { key: 'isDynamic', label: 'Dynamic List', type: 'checkbox' },
                        { key: 'criteria', label: 'Criteria', type: 'textarea' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
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
                        { key: 'memberId', label: 'Member', type: 'reference', lookupModel: 'CrmCampaignMember', required: true },
                        { key: 'responseType', label: 'Response Type', type: 'select', options: enums.RESPONSE_TYPE, required: true },
                        { key: 'responseDate', label: 'Response Date', type: 'date' },
                        { key: 'responseValue', label: 'Response Value', type: 'text' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
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
                        { key: 'totalCost', label: 'Total Cost', type: 'currency' },
                        { key: 'totalRevenue', label: 'Total Revenue', type: 'currency' },
                        { key: 'roi', label: 'ROI %', type: 'number' },
                        { key: 'leadsGenerated', label: 'Leads Generated', type: 'number' },
                        { key: 'opportunitiesCreated', label: 'Opportunities Created', type: 'number' },
                        { key: 'dealsWon', label: 'Deals Won', type: 'number' },
                        { key: 'calculationDate', label: 'Calculation Date', type: 'date' }
                    ]
                }
            ]
        }
    };

})();
