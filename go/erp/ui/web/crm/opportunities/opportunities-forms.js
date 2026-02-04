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
// CRM Opportunities Module - Form Definitions

(function() {
    'use strict';

    window.CrmOpportunities = window.CrmOpportunities || {};

    const enums = CrmOpportunities.enums;

    CrmOpportunities.forms = {
        CrmOpportunity: {
            title: 'Opportunity',
            sections: [
                {
                    title: 'Opportunity Details',
                    fields: [
                        { key: 'name', label: 'Opportunity Name', type: 'text', required: true },
                        { key: 'accountId', label: 'Account', type: 'reference', lookupModel: 'CrmAccount', required: true },
                        { key: 'primaryContactId', label: 'Primary Contact', type: 'reference', lookupModel: 'CrmContact' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'amount', label: 'Amount', type: 'money' },
                        { key: 'stage', label: 'Stage', type: 'select', options: enums.SALES_STAGE },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'closeDate', label: 'Close Date', type: 'date' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.OPPORTUNITY_STATUS },
                        { key: 'leadSourceId', label: 'Lead Source', type: 'reference', lookupModel: 'CrmLeadSource' },
                        { key: 'campaignId', label: 'Campaign', type: 'reference', lookupModel: 'CrmCampaign' },
                        { key: 'nextStep', label: 'Next Step', type: 'text' },
                        { key: 'lossReason', label: 'Loss Reason', type: 'text' },
                        { key: 'competitorId', label: 'Primary Competitor', type: 'reference', lookupModel: 'CrmOppCompetitor' },
                        { key: 'expectedRevenue', label: 'Expected Revenue', type: 'money' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppStage: {
            title: 'Opportunity Stage',
            sections: [
                {
                    title: 'Stage Details',
                    fields: [
                        { key: 'name', label: 'Stage Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sequence', label: 'Sequence', type: 'number', required: true },
                        { key: 'probability', label: 'Probability %', type: 'number' },
                        { key: 'forecastCategory', label: 'Forecast Category', type: 'text' },
                        { key: 'isClosed', label: 'Is Closed', type: 'checkbox' },
                        { key: 'isWon', label: 'Is Won', type: 'checkbox' },
                        { key: 'isActive', label: 'Is Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        CrmOppCompetitor: {
            title: 'Opportunity Competitor',
            sections: [
                {
                    title: 'Competitor Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'name', label: 'Competitor Name', type: 'text', required: true },
                        { key: 'website', label: 'Website', type: 'text' },
                        { key: 'threatLevel', label: 'Threat Level', type: 'select', options: enums.THREAT_LEVEL },
                        { key: 'competitorPrice', label: 'Competitor Price', type: 'money' },
                        { key: 'isPrimary', label: 'Is Primary', type: 'checkbox' },
                        { key: 'strengths', label: 'Strengths', type: 'textarea' },
                        { key: 'weaknesses', label: 'Weaknesses', type: 'textarea' },
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
                        { key: 'productId', label: 'Product', type: 'reference', lookupModel: 'ScmItem' },
                        { key: 'productName', label: 'Product Name', type: 'text', required: true },
                        { key: 'lineNumber', label: 'Line Number', type: 'number' },
                        { key: 'quantity', label: 'Quantity', type: 'number', required: true },
                        { key: 'unitPrice', label: 'Unit Price', type: 'money' },
                        { key: 'discountPercent', label: 'Discount %', type: 'number' },
                        { key: 'totalPrice', label: 'Total Price', type: 'money' },
                        { key: 'description', label: 'Description', type: 'textarea' }
                    ]
                }
            ]
        },

        CrmOppTeam: {
            title: 'Opportunity Team Member',
            sections: [
                {
                    title: 'Team Member Details',
                    fields: [
                        { key: 'opportunityId', label: 'Opportunity', type: 'reference', lookupModel: 'CrmOpportunity', required: true },
                        { key: 'employeeId', label: 'Employee', type: 'reference', lookupModel: 'Employee', required: true },
                        { key: 'role', label: 'Role', type: 'text', required: true },
                        { key: 'splitPercent', label: 'Split %', type: 'number' },
                        { key: 'isPrimary', label: 'Is Primary', type: 'checkbox' },
                        { key: 'notes', label: 'Notes', type: 'textarea' }
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
                        { key: 'activityDate', label: 'Activity Date', type: 'date', required: true },
                        { key: 'status', label: 'Status', type: 'select', options: enums.ACTIVITY_STATUS },
                        { key: 'assignedTo', label: 'Assigned To', type: 'reference', lookupModel: 'Employee' },
                        { key: 'durationMinutes', label: 'Duration (minutes)', type: 'number' },
                        { key: 'outcome', label: 'Outcome', type: 'text' },
                        { key: 'isCompleted', label: 'Completed', type: 'checkbox' }
                    ]
                }
            ]
        }
    };

    CrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId',
        CrmOppStage: 'stageId',
        CrmOppCompetitor: 'competitorId',
        CrmOppProduct: 'lineId',
        CrmOppTeam: 'memberId',
        CrmOppActivity: 'activityId'
    };

})();
