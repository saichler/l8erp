/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    const enums = MobileCrmOpportunities.enums;
    const render = MobileCrmOpportunities.render;

    MobileCrmOpportunities.columns = {
        CrmOpportunity: [
            { key: 'opportunityId', label: 'ID', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'accountId', label: 'Account', sortKey: 'accountId', filterKey: 'accountId' },
            { key: 'status', label: 'Status', sortKey: 'status', filterKey: 'status', enumValues: enums.OPPORTUNITY_STATUS_VALUES, render: (item) => render.opportunityStatus(item.status) },
            { key: 'stageId', label: 'Stage', sortKey: 'stageId' },
            { key: 'amount', label: 'Amount', sortKey: 'amount', render: (item) => Layer8MRenderers.renderMoney(item.amount) },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            { key: 'closeDate', label: 'Close Date', sortKey: 'closeDate', render: (item) => Layer8MRenderers.renderDate(item.closeDate) }
        ],

        CrmOppStage: [
            { key: 'stageId', label: 'ID', sortKey: 'stageId', filterKey: 'stageId' },
            { key: 'name', label: 'Name', sortKey: 'name', filterKey: 'name' },
            { key: 'sequence', label: 'Sequence', sortKey: 'sequence' },
            { key: 'probability', label: 'Probability %', sortKey: 'probability' },
            { key: 'isClosed', label: 'Closed', sortKey: 'isClosed', render: (item) => item.isClosed ? 'Yes' : 'No' },
            { key: 'isWon', label: 'Won', sortKey: 'isWon', render: (item) => item.isWon ? 'Yes' : 'No' }
        ],

        CrmOppCompetitor: [
            { key: 'competitorId', label: 'ID', sortKey: 'competitorId', filterKey: 'competitorId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'competitorName', label: 'Competitor', sortKey: 'competitorName', filterKey: 'competitorName' },
            { key: 'strengths', label: 'Strengths', sortKey: 'strengths' },
            { key: 'threatLevel', label: 'Threat Level', sortKey: 'threatLevel', enumValues: enums.THREAT_LEVEL_VALUES, render: (item) => render.threatLevel(item.threatLevel) }
        ],

        CrmOppProduct: [
            { key: 'oppProductId', label: 'ID', sortKey: 'oppProductId', filterKey: 'oppProductId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'productId', label: 'Product', sortKey: 'productId' },
            { key: 'quantity', label: 'Quantity', sortKey: 'quantity' },
            { key: 'unitPrice', label: 'Unit Price', sortKey: 'unitPrice', render: (item) => Layer8MRenderers.renderMoney(item.unitPrice) },
            { key: 'totalPrice', label: 'Total', sortKey: 'totalPrice', render: (item) => Layer8MRenderers.renderMoney(item.totalPrice) }
        ],

        CrmOppTeam: [
            { key: 'teamMemberId', label: 'ID', sortKey: 'teamMemberId', filterKey: 'teamMemberId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'userId', label: 'User', sortKey: 'userId' },
            { key: 'role', label: 'Role', sortKey: 'role' },
            { key: 'isPrimary', label: 'Primary', sortKey: 'isPrimary', render: (item) => item.isPrimary ? 'Yes' : 'No' }
        ],

        CrmOppActivity: [
            { key: 'activityId', label: 'ID', sortKey: 'activityId', filterKey: 'activityId' },
            { key: 'opportunityId', label: 'Opportunity', sortKey: 'opportunityId', filterKey: 'opportunityId' },
            { key: 'activityType', label: 'Type', sortKey: 'activityType', enumValues: enums.ACTIVITY_TYPE_VALUES, render: (item) => render.activityType(item.activityType) },
            { key: 'subject', label: 'Subject', sortKey: 'subject', filterKey: 'subject' },
            { key: 'status', label: 'Status', sortKey: 'status', enumValues: enums.ACTIVITY_STATUS_VALUES, render: (item) => render.activityStatus(item.status) },
            { key: 'activityDate', label: 'Date', sortKey: 'activityDate', render: (item) => Layer8MRenderers.renderDate(item.activityDate) }
        ]
    };

    MobileCrmOpportunities.primaryKeys = {
        CrmOpportunity: 'opportunityId', CrmOppStage: 'stageId', CrmOppCompetitor: 'competitorId',
        CrmOppProduct: 'oppProductId', CrmOppTeam: 'teamMemberId', CrmOppActivity: 'activityId'
    };

})();
