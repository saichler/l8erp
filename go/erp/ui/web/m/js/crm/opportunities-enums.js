/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmOpportunities = window.MobileCrmOpportunities || {};
    MobileCrmOpportunities.enums = {};

    // OPPORTUNITY STATUS
    MobileCrmOpportunities.enums.OPPORTUNITY_STATUS = {
        0: 'Unspecified', 1: 'Open', 2: 'Won', 3: 'Lost', 4: 'On Hold', 5: 'Cancelled'
    };
    MobileCrmOpportunities.enums.OPPORTUNITY_STATUS_VALUES = {
        'open': 1, 'won': 2, 'lost': 3, 'onhold': 4, 'cancelled': 5
    };
    MobileCrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-terminated', 4: 'status-inactive', 5: 'status-terminated'
    };

    // SALES STAGE
    MobileCrmOpportunities.enums.SALES_STAGE = {
        0: 'Unspecified', 1: 'Prospecting', 2: 'Qualification', 3: 'Needs Analysis', 4: 'Value Proposition',
        5: 'Decision Makers', 6: 'Proposal', 7: 'Negotiation', 8: 'Closed Won', 9: 'Closed Lost'
    };
    MobileCrmOpportunities.enums.SALES_STAGE_VALUES = {
        'prospecting': 1, 'qualification': 2, 'needsanalysis': 3, 'valueproposition': 4,
        'decisionmakers': 5, 'proposal': 6, 'negotiation': 7, 'closedwon': 8, 'closedlost': 9
    };
    MobileCrmOpportunities.enums.SALES_STAGE_CLASSES = {
        1: 'status-pending', 2: 'status-pending', 3: 'status-active', 4: 'status-active',
        5: 'status-active', 6: 'status-active', 7: 'status-active', 8: 'status-active', 9: 'status-terminated'
    };

    // THREAT LEVEL
    MobileCrmOpportunities.enums.THREAT_LEVEL = {
        0: 'Unspecified', 1: 'Low', 2: 'Medium', 3: 'High'
    };
    MobileCrmOpportunities.enums.THREAT_LEVEL_VALUES = {
        'low': 1, 'medium': 2, 'high': 3
    };
    MobileCrmOpportunities.enums.THREAT_LEVEL_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated'
    };

    // ACTIVITY TYPE
    MobileCrmOpportunities.enums.ACTIVITY_TYPE = {
        0: 'Unspecified', 1: 'Call', 2: 'Email', 3: 'Meeting', 4: 'Demo', 5: 'Proposal', 6: 'Follow Up', 7: 'Task', 8: 'Note'
    };
    MobileCrmOpportunities.enums.ACTIVITY_TYPE_VALUES = {
        'call': 1, 'email': 2, 'meeting': 3, 'demo': 4, 'proposal': 5, 'followup': 6, 'task': 7, 'note': 8
    };
    MobileCrmOpportunities.enums.ACTIVITY_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-pending', 7: 'status-pending', 8: 'status-inactive'
    };

    // ACTIVITY STATUS
    MobileCrmOpportunities.enums.ACTIVITY_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileCrmOpportunities.enums.ACTIVITY_STATUS_VALUES = {
        'planned': 1, 'inprogress': 2, 'completed': 3, 'cancelled': 4
    };
    MobileCrmOpportunities.enums.ACTIVITY_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // RENDER FUNCTIONS
    MobileCrmOpportunities.render = {
        opportunityStatus: Layer8MRenderers.createStatusRenderer(MobileCrmOpportunities.enums.OPPORTUNITY_STATUS, MobileCrmOpportunities.enums.OPPORTUNITY_STATUS_CLASSES),
        salesStage: Layer8MRenderers.createStatusRenderer(MobileCrmOpportunities.enums.SALES_STAGE, MobileCrmOpportunities.enums.SALES_STAGE_CLASSES),
        threatLevel: Layer8MRenderers.createStatusRenderer(MobileCrmOpportunities.enums.THREAT_LEVEL, MobileCrmOpportunities.enums.THREAT_LEVEL_CLASSES),
        activityType: Layer8MRenderers.createStatusRenderer(MobileCrmOpportunities.enums.ACTIVITY_TYPE, MobileCrmOpportunities.enums.ACTIVITY_TYPE_CLASSES),
        activityStatus: Layer8MRenderers.createStatusRenderer(MobileCrmOpportunities.enums.ACTIVITY_STATUS, MobileCrmOpportunities.enums.ACTIVITY_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
