/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmLeads = window.MobileCrmLeads || {};
    MobileCrmLeads.enums = {};

    // LEAD STATUS
    MobileCrmLeads.enums.LEAD_STATUS = {
        0: 'Unspecified', 1: 'New', 2: 'Contacted', 3: 'Qualified', 4: 'Unqualified', 5: 'Converted', 6: 'Lost'
    };
    MobileCrmLeads.enums.LEAD_STATUS_VALUES = {
        'new': 1, 'contacted': 2, 'qualified': 3, 'unqualified': 4, 'converted': 5, 'lost': 6
    };
    MobileCrmLeads.enums.LEAD_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive', 5: 'status-active', 6: 'status-terminated'
    };

    // LEAD RATING
    MobileCrmLeads.enums.LEAD_RATING = {
        0: 'Unspecified', 1: 'Hot', 2: 'Warm', 3: 'Cold'
    };
    MobileCrmLeads.enums.LEAD_RATING_VALUES = {
        'hot': 1, 'warm': 2, 'cold': 3
    };
    MobileCrmLeads.enums.LEAD_RATING_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-inactive'
    };

    // LEAD SOURCE TYPE
    MobileCrmLeads.enums.LEAD_SOURCE_TYPE = {
        0: 'Unspecified', 1: 'Web', 2: 'Phone', 3: 'Email', 4: 'Referral', 5: 'Trade Show', 6: 'Partner', 7: 'Advertising', 8: 'Social Media'
    };
    MobileCrmLeads.enums.LEAD_SOURCE_TYPE_VALUES = {
        'web': 1, 'phone': 2, 'email': 3, 'referral': 4, 'tradeshow': 5, 'partner': 6, 'advertising': 7, 'socialmedia': 8
    };
    MobileCrmLeads.enums.LEAD_SOURCE_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-pending', 6: 'status-active', 7: 'status-pending', 8: 'status-active'
    };

    // ACTIVITY TYPE
    MobileCrmLeads.enums.ACTIVITY_TYPE = {
        0: 'Unspecified', 1: 'Call', 2: 'Email', 3: 'Meeting', 4: 'Demo', 5: 'Proposal', 6: 'Follow Up', 7: 'Task', 8: 'Note'
    };
    MobileCrmLeads.enums.ACTIVITY_TYPE_VALUES = {
        'call': 1, 'email': 2, 'meeting': 3, 'demo': 4, 'proposal': 5, 'followup': 6, 'task': 7, 'note': 8
    };
    MobileCrmLeads.enums.ACTIVITY_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-pending', 4: 'status-active', 5: 'status-active', 6: 'status-pending', 7: 'status-pending', 8: 'status-inactive'
    };

    // ACTIVITY STATUS
    MobileCrmLeads.enums.ACTIVITY_STATUS = {
        0: 'Unspecified', 1: 'Planned', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled'
    };
    MobileCrmLeads.enums.ACTIVITY_STATUS_VALUES = {
        'planned': 1, 'inprogress': 2, 'completed': 3, 'cancelled': 4
    };
    MobileCrmLeads.enums.ACTIVITY_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-terminated'
    };

    // RENDER FUNCTIONS
    MobileCrmLeads.render = {
        leadStatus: Layer8MRenderers.createStatusRenderer(MobileCrmLeads.enums.LEAD_STATUS, MobileCrmLeads.enums.LEAD_STATUS_CLASSES),
        leadRating: Layer8MRenderers.createStatusRenderer(MobileCrmLeads.enums.LEAD_RATING, MobileCrmLeads.enums.LEAD_RATING_CLASSES),
        leadSourceType: Layer8MRenderers.createStatusRenderer(MobileCrmLeads.enums.LEAD_SOURCE_TYPE, MobileCrmLeads.enums.LEAD_SOURCE_TYPE_CLASSES),
        activityType: Layer8MRenderers.createStatusRenderer(MobileCrmLeads.enums.ACTIVITY_TYPE, MobileCrmLeads.enums.ACTIVITY_TYPE_CLASSES),
        activityStatus: Layer8MRenderers.createStatusRenderer(MobileCrmLeads.enums.ACTIVITY_STATUS, MobileCrmLeads.enums.ACTIVITY_STATUS_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
