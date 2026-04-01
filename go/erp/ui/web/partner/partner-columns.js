/*
© 2025 Sharon Aicler (saichler@gmail.com)
Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/

// Partner Portal — column definitions
(function() {
    'use strict';

    var PTNR = window.PTNR = window.PTNR || {};
    var col = Layer8ColumnFactory;
    var render = PTNR.render;

    PTNR.columns = {
        // Pipeline
        CrmLead: [
            ...col.id('leadId', 'Lead ID'),
            ...col('firstName', 'First Name'),
            ...col('lastName', 'Last Name'),
            ...col('company', 'Company'),
            ...col('email', 'Email'),
            ...col.status('status', 'Status', PTNR.enums.LEAD_STATUS, render.leadStatus),
            ...col.enum('rating', 'Rating', PTNR.enums.LEAD_RATING, render.leadRating),
            ...col.date('lastActivityDate', 'Last Activity')
        ],
        CrmOpportunity: [
            ...col.id('opportunityId', 'Opportunity ID'),
            ...col('name', 'Name'),
            ...col.money('amount', 'Amount'),
            ...col.status('stage', 'Stage', PTNR.enums.SALES_STAGE, render.salesStage),
            ...col.status('status', 'Status', PTNR.enums.OPP_STATUS, render.oppStatus),
            ...col.number('probability', 'Probability %'),
            ...col.date('closeDate', 'Close Date')
        ],
        CrmLeadSource: [
            ...col.id('sourceId', 'Source ID'),
            ...col('name', 'Name'),
            ...col('description', 'Description'),
            ...col.boolean('isActive', 'Active')
        ],

        // Sales
        SalesQuotation: [
            ...col.id('quotationId', 'Quotation ID'),
            ...col('quotationNumber', 'Quotation #'),
            ...col.date('quotationDate', 'Date'),
            ...col.date('validUntil', 'Valid Until'),
            ...col.money('totalAmount', 'Total'),
            ...col.status('status', 'Status', PTNR.enums.QUOTATION_STATUS, render.quotationStatus)
        ],
        SalesOrder: [
            ...col.id('salesOrderId', 'Order ID'),
            ...col('orderNumber', 'Order #'),
            ...col.date('orderDate', 'Date'),
            ...col.money('totalAmount', 'Total'),
            ...col.status('status', 'Status', PTNR.enums.ORDER_STATUS, render.orderStatus)
        ],

        // Marketing
        CrmCampaign: [
            ...col.id('campaignId', 'Campaign ID'),
            ...col('name', 'Name'),
            ...col.enum('campaignType', 'Type', PTNR.enums.CAMPAIGN_TYPE, render.campaignType),
            ...col.status('status', 'Status', PTNR.enums.CAMPAIGN_STATUS, render.campaignStatus),
            ...col.date('startDate', 'Start'),
            ...col.date('endDate', 'End')
        ],
        CrmMarketingList: [
            ...col.id('listId', 'List ID'),
            ...col('name', 'Name'),
            ...col('listType', 'Type'),
            ...col.number('memberCount', 'Members'),
            ...col.boolean('isActive', 'Active')
        ],

        // Commissions
        SalesCommissionPlan: [
            ...col.id('planId', 'Plan ID'),
            ...col('name', 'Name'),
            ...col.enum('commissionType', 'Type', PTNR.enums.COMMISSION_TYPE, render.commissionType),
            ...col.number('baseRate', 'Base Rate'),
            ...col.money('baseAmount', 'Base Amount'),
            ...col.date('effectiveDate', 'Effective'),
            ...col.date('expiryDate', 'Expiry'),
            ...col.boolean('isActive', 'Active')
        ],

        // Profile
        SalesPartnerChannel: [
            ...col.id('partnerId', 'Partner ID'),
            ...col('name', 'Name'),
            ...col.enum('partnerType', 'Type', PTNR.enums.PARTNER_TYPE, render.partnerType),
            ...col('contactName', 'Contact'),
            ...col('email', 'Email'),
            ...col('phone', 'Phone'),
            ...col.number('commissionRate', 'Commission %'),
            ...col.boolean('isActive', 'Active')
        ]
    };
})();
