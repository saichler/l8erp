/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem - Apache 2.0
*/
(function() {
    'use strict';

    window.MobileCrmMarketing = window.MobileCrmMarketing || {};
    MobileCrmMarketing.enums = {};

    // CAMPAIGN STATUS
    MobileCrmMarketing.enums.CAMPAIGN_STATUS = {
        0: 'Unspecified', 1: 'Planning', 2: 'Active', 3: 'Paused', 4: 'Completed', 5: 'Cancelled'
    };
    MobileCrmMarketing.enums.CAMPAIGN_STATUS_VALUES = {
        'planning': 1, 'active': 2, 'paused': 3, 'completed': 4, 'cancelled': 5
    };
    MobileCrmMarketing.enums.CAMPAIGN_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-inactive', 4: 'status-active', 5: 'status-terminated'
    };

    // CAMPAIGN TYPE
    MobileCrmMarketing.enums.CAMPAIGN_TYPE = {
        0: 'Unspecified', 1: 'Email', 2: 'Social', 3: 'Event', 4: 'Webinar', 5: 'Content', 6: 'Advertising', 7: 'Other'
    };
    MobileCrmMarketing.enums.CAMPAIGN_TYPE_VALUES = {
        'email': 1, 'social': 2, 'event': 3, 'webinar': 4, 'content': 5, 'advertising': 6, 'other': 7
    };
    MobileCrmMarketing.enums.CAMPAIGN_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-pending', 7: 'status-inactive'
    };

    // MEMBER STATUS
    MobileCrmMarketing.enums.MEMBER_STATUS = {
        0: 'Unspecified', 1: 'Sent', 2: 'Opened', 3: 'Clicked', 4: 'Responded', 5: 'Converted', 6: 'Opted Out'
    };
    MobileCrmMarketing.enums.MEMBER_STATUS_VALUES = {
        'sent': 1, 'opened': 2, 'clicked': 3, 'responded': 4, 'converted': 5, 'optedout': 6
    };
    MobileCrmMarketing.enums.MEMBER_STATUS_CLASSES = {
        1: 'status-pending', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-terminated'
    };

    // RESPONSE TYPE
    MobileCrmMarketing.enums.RESPONSE_TYPE = {
        0: 'Unspecified', 1: 'Click', 2: 'Open', 3: 'Register', 4: 'Attend', 5: 'Download', 6: 'Purchase', 7: 'Unsubscribe'
    };
    MobileCrmMarketing.enums.RESPONSE_TYPE_VALUES = {
        'click': 1, 'open': 2, 'register': 3, 'attend': 4, 'download': 5, 'purchase': 6, 'unsubscribe': 7
    };
    MobileCrmMarketing.enums.RESPONSE_TYPE_CLASSES = {
        1: 'status-active', 2: 'status-active', 3: 'status-active', 4: 'status-active', 5: 'status-active', 6: 'status-active', 7: 'status-terminated'
    };

    // RENDER FUNCTIONS
    MobileCrmMarketing.render = {
        campaignStatus: Layer8MRenderers.createStatusRenderer(MobileCrmMarketing.enums.CAMPAIGN_STATUS, MobileCrmMarketing.enums.CAMPAIGN_STATUS_CLASSES),
        campaignType: Layer8MRenderers.createStatusRenderer(MobileCrmMarketing.enums.CAMPAIGN_TYPE, MobileCrmMarketing.enums.CAMPAIGN_TYPE_CLASSES),
        memberStatus: Layer8MRenderers.createStatusRenderer(MobileCrmMarketing.enums.MEMBER_STATUS, MobileCrmMarketing.enums.MEMBER_STATUS_CLASSES),
        responseType: Layer8MRenderers.createStatusRenderer(MobileCrmMarketing.enums.RESPONSE_TYPE, MobileCrmMarketing.enums.RESPONSE_TYPE_CLASSES),
        date: Layer8MRenderers.renderDate,
        money: Layer8MRenderers.renderMoney
    };

})();
