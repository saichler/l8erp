/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmAccounts = window.MobileCrmAccounts || {};
    MobileCrmAccounts.enums = {};

    // ACCOUNT TYPE
    MobileCrmAccounts.enums.ACCOUNT_TYPE = {
        0: 'Unspecified', 1: 'Prospect', 2: 'Customer', 3: 'Partner', 4: 'Competitor', 5: 'Other'
    };
    MobileCrmAccounts.enums.ACCOUNT_TYPE_VALUES = {
        'prospect': 1, 'customer': 2, 'partner': 3, 'competitor': 4, 'other': 5
    };
    MobileCrmAccounts.enums.ACCOUNT_TYPE_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-inactive', 5: 'status-inactive'
    };

    // ACCOUNT STATUS
    MobileCrmAccounts.enums.ACCOUNT_STATUS = {
        0: 'Unspecified', 1: 'Active', 2: 'Inactive', 3: 'Pending'
    };
    MobileCrmAccounts.enums.ACCOUNT_STATUS_VALUES = {
        'active': 1, 'inactive': 2, 'pending': 3
    };
    MobileCrmAccounts.enums.ACCOUNT_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-inactive', 3: 'status-pending'
    };

    // RELATIONSHIP TYPE
    MobileCrmAccounts.enums.RELATIONSHIP_TYPE = {
        0: 'Unspecified', 1: 'Parent', 2: 'Subsidiary', 3: 'Partner', 4: 'Vendor', 5: 'Affiliate'
    };
    MobileCrmAccounts.enums.RELATIONSHIP_TYPE_VALUES = {
        'parent': 1, 'subsidiary': 2, 'partner': 3, 'vendor': 4, 'affiliate': 5
    };
    MobileCrmAccounts.enums.RELATIONSHIP_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-pending', 5: 'status-pending'
    };

    // HEALTH STATUS
    MobileCrmAccounts.enums.HEALTH_STATUS = {
        0: 'Unspecified', 1: 'Healthy', 2: 'At Risk', 3: 'Critical'
    };
    MobileCrmAccounts.enums.HEALTH_STATUS_VALUES = {
        'healthy': 1, 'atrisk': 2, 'critical': 3
    };
    MobileCrmAccounts.enums.HEALTH_STATUS_CLASSES = {
        1: 'status-active', 2: 'status-pending', 3: 'status-terminated'
    };

    // INTERACTION TYPE
    MobileCrmAccounts.enums.INTERACTION_TYPE = {
        0: 'Unspecified', 1: 'Call', 2: 'Email', 3: 'Meeting', 4: 'Chat', 5: 'Social', 6: 'Visit'
    };
    MobileCrmAccounts.enums.INTERACTION_TYPE_VALUES = {
        'call': 1, 'email': 2, 'meeting': 3, 'chat': 4, 'social': 5, 'visit': 6
    };
    MobileCrmAccounts.enums.INTERACTION_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-pending', 6: 'status-active'
    };

    // INTERACTION DIRECTION
    MobileCrmAccounts.enums.INTERACTION_DIRECTION = {
        0: 'Unspecified', 1: 'Inbound', 2: 'Outbound'
    };
    MobileCrmAccounts.enums.INTERACTION_DIRECTION_VALUES = {
        'inbound': 1, 'outbound': 2
    };
    MobileCrmAccounts.enums.INTERACTION_DIRECTION_CLASSES = {
        1: 'status-active', 2: 'status-pending'
    };

    // RENDER FUNCTIONS
    MobileCrmAccounts.render = {
        accountType: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.ACCOUNT_TYPE, MobileCrmAccounts.enums.ACCOUNT_TYPE_CLASSES),
        accountStatus: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.ACCOUNT_STATUS, MobileCrmAccounts.enums.ACCOUNT_STATUS_CLASSES),
        relationshipType: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.RELATIONSHIP_TYPE, MobileCrmAccounts.enums.RELATIONSHIP_TYPE_CLASSES),
        healthStatus: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.HEALTH_STATUS, MobileCrmAccounts.enums.HEALTH_STATUS_CLASSES),
        interactionType: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.INTERACTION_TYPE, MobileCrmAccounts.enums.INTERACTION_TYPE_CLASSES),
        interactionDirection: Layer8MRenderers.createStatusRenderer(MobileCrmAccounts.enums.INTERACTION_DIRECTION, MobileCrmAccounts.enums.INTERACTION_DIRECTION_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
