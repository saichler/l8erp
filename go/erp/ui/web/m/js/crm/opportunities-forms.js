/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmOpportunities.enums;

    MobileCrmOpportunities.forms = {
        CrmOpportunity: {
            title: 'Opportunity',
            sections: [
                {
                    title: 'Opportunity Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'contactId', label: 'Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.OPPORTUNITY_STATUS },
                        { key: 'stageId', label: 'Stage', type: 'reference', lookupModel: 'CrmOppStage' },
                        { key: 'amount', label: 'Amount', type: 'currency' },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'closeDate', label: 'Close Date', type: 'date' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppStage: {
            title: 'Sales Stage',
            sections: [
                {
                    title: 'Stage Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sequence', label: 'Sequence', type: 'number', required: true },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'isClosed', label: 'Is Closed', type: 'checkbox' },
                        { key: 'isWon', label: 'Is Won', type: 'checkbox' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmOppCompetitor: {
            title: 'Competitor',
            sections: [
                {
                    title: 'Competitor Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'competitorName', label: 'Competitor Name', type: 'text', required: true },
                        { key: 'strengths', label: 'Strengths', type: 'textarea' },
                        { key: 'weaknesses', label: 'Weaknesses', type: 'textarea' },
                        { key: 'threatLevel', label: 'Threat Level', type: 'select', options: enums.THREAT_LEVEL },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppProduct: {
            title: 'Opportunity Product',
            sections: [
                {
                    title: 'Product Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem', required: true },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'currency' },
                        { key: 'discount', label: 'Discount %', type: 'number' },
                        { key: 'totalPrice', label: 'Total Price', type: 'currency' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppTeam: {
            title: 'Team Member',
            sections: [
                {
                    title: 'Team Member Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'userId', label: 'User', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'role', label: 'Role', type: 'text' },
                        { key: 'isPrimary', label: 'Primary', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmOppActivity: {
            title: 'Opportunity Activity',
            sections: [
                {
                    title: 'Activity Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'activityType', label: 'Activity Type', type: 'select', options: enums.ACTIVITY_TYPE, required: true },
                        { key: 'subject', label: 'Subject', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'activityDate', label: 'Activity Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ACTIVITY_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'durationMinutes', label: 'Duration (min)', type: 'number' },
                        { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

})();
