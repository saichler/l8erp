/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — enum definitions
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};
    var factory = Layer8EnumFactory;
    var createStatusRenderer = Layer8DRenderers.createStatusRenderer;
    var renderEnum = Layer8DRenderers.renderEnum;

    // CrmLead status (0-6)
    var LEAD_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['New', 'new', 'layer8d-status-info'],
        ['Contacted', 'contacted', 'layer8d-status-active'],
        ['Qualified', 'qualified', 'layer8d-status-success'],
        ['Unqualified', 'unqualified', 'layer8d-status-inactive'],
        ['Converted', 'converted', 'layer8d-status-complete'],
        ['Lost', 'lost', 'layer8d-status-error']
    ]);

    // CrmLead rating (0-3)
    var LEAD_RATING = factory.simple(['Unspecified', 'Hot', 'Warm', 'Cold']);

    // CrmOpportunity status (0-5)
    var OPP_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Open', 'open', 'layer8d-status-active'],
        ['Won', 'won', 'layer8d-status-success'],
        ['Lost', 'lost', 'layer8d-status-error'],
        ['On Hold', 'onHold', 'layer8d-status-warning'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // CrmSalesStage (0-9)
    var SALES_STAGE = factory.create([
        ['Unspecified', null, ''],
        ['Prospecting', 'prospecting', 'layer8d-status-info'],
        ['Qualification', 'qualification', 'layer8d-status-info'],
        ['Needs Analysis', 'needsAnalysis', 'layer8d-status-active'],
        ['Value Proposition', 'valueProposition', 'layer8d-status-active'],
        ['Decision Makers', 'decisionMakers', 'layer8d-status-warning'],
        ['Proposal', 'proposal', 'layer8d-status-warning'],
        ['Negotiation', 'negotiation', 'layer8d-status-pending'],
        ['Closed Won', 'closedWon', 'layer8d-status-success'],
        ['Closed Lost', 'closedLost', 'layer8d-status-error']
    ]);

    // CrmCampaign status (0-4)
    var CAMPAIGN_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Planned', 'planned', 'layer8d-status-info'],
        ['Active', 'active', 'layer8d-status-active'],
        ['Completed', 'completed', 'layer8d-status-complete'],
        ['Aborted', 'aborted', 'layer8d-status-error']
    ]);

    // CrmCampaign type (0-8)
    var CAMPAIGN_TYPE = factory.simple([
        'Unspecified', 'Email', 'Direct Mail', 'Telemarketing', 'Trade Show',
        'Webinar', 'Advertisement', 'Social Media', 'Referral'
    ]);

    // SalesQuotation status (0-6)
    var QUOTATION_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Sent', 'sent', 'layer8d-status-active'],
        ['Accepted', 'accepted', 'layer8d-status-success'],
        ['Rejected', 'rejected', 'layer8d-status-error'],
        ['Expired', 'expired', 'layer8d-status-inactive'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // SalesOrder status (0-7)
    var ORDER_STATUS = factory.create([
        ['Unspecified', null, ''],
        ['Draft', 'draft', 'layer8d-status-info'],
        ['Confirmed', 'confirmed', 'layer8d-status-active'],
        ['In Progress', 'inProgress', 'layer8d-status-active'],
        ['Partially Shipped', 'partiallyShipped', 'layer8d-status-warning'],
        ['Shipped', 'shipped', 'layer8d-status-pending'],
        ['Delivered', 'delivered', 'layer8d-status-complete'],
        ['Cancelled', 'cancelled', 'layer8d-status-inactive']
    ]);

    // SalesPartnerType (0-5)
    var PARTNER_TYPE = factory.simple([
        'Unspecified', 'Distributor', 'Reseller', 'Agent', 'Affiliate', 'VAR'
    ]);

    // SalesCommissionType (0-3)
    var COMMISSION_TYPE = factory.simple(['Unspecified', 'Percentage', 'Fixed', 'Tiered']);

    // Export enums
    PTNR.enums = {
        LEAD_STATUS: LEAD_STATUS.enum,
        LEAD_STATUS_CLASSES: LEAD_STATUS.classes,
        LEAD_RATING: LEAD_RATING.enum,
        OPP_STATUS: OPP_STATUS.enum,
        OPP_STATUS_CLASSES: OPP_STATUS.classes,
        SALES_STAGE: SALES_STAGE.enum,
        SALES_STAGE_CLASSES: SALES_STAGE.classes,
        CAMPAIGN_STATUS: CAMPAIGN_STATUS.enum,
        CAMPAIGN_STATUS_CLASSES: CAMPAIGN_STATUS.classes,
        CAMPAIGN_TYPE: CAMPAIGN_TYPE.enum,
        QUOTATION_STATUS: QUOTATION_STATUS.enum,
        QUOTATION_STATUS_CLASSES: QUOTATION_STATUS.classes,
        ORDER_STATUS: ORDER_STATUS.enum,
        ORDER_STATUS_CLASSES: ORDER_STATUS.classes,
        PARTNER_TYPE: PARTNER_TYPE.enum,
        COMMISSION_TYPE: COMMISSION_TYPE.enum
    };

    // Export renderers
    PTNR.render = {
        leadStatus: createStatusRenderer(LEAD_STATUS.enum, LEAD_STATUS.classes),
        leadRating: function(v) { return renderEnum(v, LEAD_RATING.enum); },
        oppStatus: createStatusRenderer(OPP_STATUS.enum, OPP_STATUS.classes),
        salesStage: createStatusRenderer(SALES_STAGE.enum, SALES_STAGE.classes),
        campaignStatus: createStatusRenderer(CAMPAIGN_STATUS.enum, CAMPAIGN_STATUS.classes),
        campaignType: function(v) { return renderEnum(v, CAMPAIGN_TYPE.enum); },
        quotationStatus: createStatusRenderer(QUOTATION_STATUS.enum, QUOTATION_STATUS.classes),
        orderStatus: createStatusRenderer(ORDER_STATUS.enum, ORDER_STATUS.classes),
        partnerType: function(v) { return renderEnum(v, PARTNER_TYPE.enum); },
        commissionType: function(v) { return renderEnum(v, COMMISSION_TYPE.enum); }
    };
})();
