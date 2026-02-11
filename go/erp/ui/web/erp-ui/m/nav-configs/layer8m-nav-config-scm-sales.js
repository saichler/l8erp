/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Navigation Configuration - SCM, Manufacturing, Sales, CRM Modules
 */
(function() {
    'use strict';

    window.LAYER8M_NAV_CONFIG_SCM_SALES = {
        // SCM Sub-Modules (Level 2)
        scm: {
            subModules: [
                { key: 'procurement', label: 'Procurement', icon: 'procurement' },
                { key: 'inventory', label: 'Inventory', icon: 'inventory' },
                { key: 'warehouse', label: 'Warehouse', icon: 'warehouse' },
                { key: 'logistics', label: 'Logistics', icon: 'logistics' },
                { key: 'demand-planning', label: 'Demand Planning', icon: 'demand-planning' },
                { key: 'supply-planning', label: 'Supply Planning', icon: 'supply-planning' }
            ],

            services: {
                'procurement': [
                    { key: 'purchase-requisitions', label: 'Requisitions', icon: 'procurement', endpoint: '/50/PurchReq', model: 'ScmPurchaseRequisition', idField: 'requisitionId' },
                    { key: 'rfqs', label: 'RFQs', icon: 'procurement', endpoint: '/50/RFQ', model: 'ScmRequestForQuotation', idField: 'rfqId' },
                    { key: 'purchase-orders', label: 'Purchase Orders', icon: 'procurement', endpoint: '/50/PurchOrder', model: 'ScmPurchaseOrder', idField: 'purchaseOrderId' },
                    { key: 'blanket-orders', label: 'Blanket Orders', icon: 'procurement', endpoint: '/50/BlnktOrder', model: 'ScmBlanketOrder', idField: 'blanketOrderId' },
                    { key: 'supplier-scorecards', label: 'Scorecards', icon: 'procurement', endpoint: '/50/SupplrCard', model: 'ScmSupplierScorecard', idField: 'scorecardId' }
                ],
                'inventory': [
                    { key: 'items', label: 'Items', icon: 'inventory', endpoint: '/50/Item', model: 'ScmItem', idField: 'itemId' },
                    { key: 'item-categories', label: 'Categories', icon: 'inventory', endpoint: '/50/ItemCat', model: 'ScmItemCategory', idField: 'categoryId' },
                    { key: 'cycle-counts', label: 'Cycle Counts', icon: 'inventory', endpoint: '/50/CycleCount', model: 'ScmCycleCount', idField: 'cycleCountId' }
                ],
                'warehouse': [
                    { key: 'warehouses', label: 'Warehouses', icon: 'warehouse', endpoint: '/50/Warehouse', model: 'ScmWarehouse', idField: 'warehouseId' },
                    { key: 'receiving-orders', label: 'Receiving', icon: 'warehouse', endpoint: '/50/RecvOrder', model: 'ScmReceivingOrder', idField: 'receivingOrderId' },
                    { key: 'wave-plans', label: 'Wave Plans', icon: 'warehouse', endpoint: '/50/WavePlan', model: 'ScmWavePlan', idField: 'wavePlanId' },
                    { key: 'dock-schedules', label: 'Dock Schedules', icon: 'warehouse', endpoint: '/50/DockSched', model: 'ScmDockSchedule', idField: 'scheduleId' }
                ],
                'logistics': [
                    { key: 'carriers', label: 'Carriers', icon: 'logistics', endpoint: '/50/ScmCarrier', model: 'ScmCarrier', idField: 'carrierId' },
                    { key: 'freight-rates', label: 'Freight Rates', icon: 'logistics', endpoint: '/50/FreightRt', model: 'ScmFreightRate', idField: 'rateId' },
                    { key: 'shipments', label: 'Shipments', icon: 'logistics', endpoint: '/50/Shipment', model: 'ScmShipment', idField: 'shipmentId' },
                    { key: 'routes', label: 'Routes', icon: 'logistics', endpoint: '/50/Route', model: 'ScmRoute', idField: 'routeId' },
                    { key: 'load-plans', label: 'Load Plans', icon: 'logistics', endpoint: '/50/LoadPlan', model: 'ScmLoadPlan', idField: 'loadPlanId' },
                    { key: 'return-authorizations', label: 'Returns', icon: 'logistics', endpoint: '/50/ReturnAuth', model: 'ScmReturnAuthorization', idField: 'rmaId' }
                ],
                'demand-planning': [
                    { key: 'demand-forecasts', label: 'Forecasts', icon: 'demand-planning', endpoint: '/50/DmndFcast', model: 'ScmDemandForecast', idField: 'forecastId' },
                    { key: 'forecast-models', label: 'Models', icon: 'demand-planning', endpoint: '/50/FcastModel', model: 'ScmForecastModel', idField: 'modelId' },
                    { key: 'demand-plans', label: 'Demand Plans', icon: 'demand-planning', endpoint: '/50/DemandPlan', model: 'ScmDemandPlan', idField: 'planId' },
                    { key: 'promo-plans', label: 'Promotions', icon: 'demand-planning', endpoint: '/50/PromoPlan', model: 'ScmPromotionalPlan', idField: 'planId' },
                    { key: 'new-product-plans', label: 'New Products', icon: 'demand-planning', endpoint: '/50/NewProdPln', model: 'ScmNewProductPlan', idField: 'planId' }
                ],
                'supply-planning': [
                    { key: 'material-requirements', label: 'Material Reqs', icon: 'supply-planning', endpoint: '/50/MatReq', model: 'ScmMaterialRequirement', idField: 'requirementId' },
                    { key: 'distribution-requirements', label: 'Distribution Reqs', icon: 'supply-planning', endpoint: '/50/DistReq', model: 'ScmDistributionRequirement', idField: 'requirementId' },
                    { key: 'supply-plans', label: 'Supply Plans', icon: 'supply-planning', endpoint: '/50/SupplyPlan', model: 'ScmSupplyPlan', idField: 'planId' },
                    { key: 'supplier-collaborations', label: 'Collaborations', icon: 'supply-planning', endpoint: '/50/SupCollab', model: 'ScmSupplierCollaboration', idField: 'collaborationId' },
                    { key: 'safety-stocks', label: 'Safety Stock', icon: 'supply-planning', endpoint: '/50/SafeStock', model: 'ScmSafetyStock', idField: 'safetyStockId' },
                    { key: 'lead-times', label: 'Lead Times', icon: 'supply-planning', endpoint: '/50/LeadTime', model: 'ScmLeadTime', idField: 'leadTimeId' }
                ]
            }
        },

        // Manufacturing Sub-Modules (Level 2)
        manufacturing: {
            subModules: [
                { key: 'engineering', label: 'Engineering', icon: 'manufacturing' },
                { key: 'production', label: 'Production', icon: 'manufacturing' },
                { key: 'shopfloor', label: 'Shop Floor', icon: 'manufacturing' },
                { key: 'quality', label: 'Quality', icon: 'compliance' },
                { key: 'planning', label: 'Planning', icon: 'demand-planning' },
                { key: 'costing', label: 'Costing', icon: 'financial' }
            ],

            services: {
                'engineering': [
                    { key: 'boms', label: 'BOMs', icon: 'documents', endpoint: '/70/MfgBom', model: 'MfgBom', idField: 'bomId' },
                    { key: 'routings', label: 'Routings', icon: 'scm', endpoint: '/70/MfgRouting', model: 'MfgRouting', idField: 'routingId' },
                    { key: 'change-orders', label: 'Change Orders', icon: 'documents', endpoint: '/70/MfgECO', model: 'MfgEngChangeOrder', idField: 'changeOrderId' }
                ],
                'production': [
                    { key: 'work-orders', label: 'Work Orders', icon: 'inventory', endpoint: '/70/MfgWorkOrd', model: 'MfgWorkOrder', idField: 'workOrderId' },
                    { key: 'prod-orders', label: 'Prod Orders', icon: 'documents', endpoint: '/70/MfgProdOrd', model: 'MfgProductionOrder', idField: 'prodOrderId' }
                ],
                'shopfloor': [
                    { key: 'work-centers', label: 'Work Centers', icon: 'manufacturing', endpoint: '/70/MfgWorkCtr', model: 'MfgWorkCenter', idField: 'workCenterId' },
                    { key: 'wc-capacity', label: 'WC Capacity', icon: 'demand-planning', endpoint: '/70/MfgWCCap', model: 'MfgWorkCenterCap', idField: 'capacityId' },
                    { key: 'shifts', label: 'Shift Schedules', icon: 'time', endpoint: '/70/MfgShift', model: 'MfgShiftSchedule', idField: 'scheduleId' },
                    { key: 'downtime', label: 'Downtime', icon: 'time', endpoint: '/70/MfgDowntm', model: 'MfgDowntimeEvent', idField: 'eventId' }
                ],
                'quality': [
                    { key: 'plans', label: 'Quality Plans', icon: 'documents', endpoint: '/70/MfgQCPlan', model: 'MfgQualityPlan', idField: 'planId' },
                    { key: 'inspections', label: 'Inspections', icon: 'compliance', endpoint: '/70/MfgQCInsp', model: 'MfgQualityInspection', idField: 'inspectionId' },
                    { key: 'ncrs', label: 'NCRs', icon: 'compliance', endpoint: '/70/MfgNCR', model: 'MfgNCR', idField: 'ncrId' }
                ],
                'planning': [
                    { key: 'mrp-runs', label: 'MRP Runs', icon: 'scm', endpoint: '/70/MfgMrpRun', model: 'MfgMrpRun', idField: 'runId' },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: 'demand-planning', endpoint: '/70/MfgCapPlan', model: 'MfgCapacityPlan', idField: 'planId' },
                    { key: 'schedules', label: 'Prod Schedules', icon: 'time', endpoint: '/70/MfgProdSch', model: 'MfgProdSchedule', idField: 'scheduleId' }
                ],
                'costing': [
                    { key: 'standard-costs', label: 'Standard Costs', icon: 'financial', endpoint: '/70/MfgStdCost', model: 'MfgStandardCost', idField: 'costId' },
                    { key: 'cost-rollups', label: 'Cost Rollups', icon: 'demand-planning', endpoint: '/70/MfgRollup', model: 'MfgCostRollup', idField: 'rollupId' },
                    { key: 'overheads', label: 'Overheads', icon: 'organizations', endpoint: '/70/MfgOverhd', model: 'MfgOverhead', idField: 'overheadId' }
                ]
            }
        },

        // Sales Sub-Modules (Level 2)
        sales: {
            subModules: [
                { key: 'customers', label: 'Customers', icon: 'hcm' },
                { key: 'orders', label: 'Orders', icon: 'procurement' },
                { key: 'pricing', label: 'Pricing', icon: 'financial' },
                { key: 'shipping', label: 'Shipping', icon: 'logistics' },
                { key: 'billing', label: 'Billing', icon: 'financial' },
                { key: 'analytics', label: 'Analytics', icon: 'bi' }
            ],

            services: {
                'customers': [
                    { key: 'hierarchies', label: 'Hierarchies', icon: 'organizations', endpoint: '/60/CustHier', model: 'SalesCustomerHierarchy', idField: 'hierarchyId' },
                    { key: 'segments', label: 'Segments', icon: 'departments', endpoint: '/60/CustSegmt', model: 'SalesCustomerSegment', idField: 'segmentId' },
                    { key: 'contracts', label: 'Contracts', icon: 'documents', endpoint: '/60/CustContr', model: 'SalesCustomerContract', idField: 'contractId' },
                    { key: 'partners', label: 'Partners', icon: 'hcm', endpoint: '/60/Partner', model: 'SalesPartnerChannel', idField: 'partnerId' }
                ],
                'orders': [
                    { key: 'quotations', label: 'Quotations', icon: 'documents', endpoint: '/60/SalesQuote', model: 'SalesQuotation', idField: 'quotationId' },
                    { key: 'sales-orders', label: 'Sales Orders', icon: 'procurement', endpoint: '/60/SalesOrder', model: 'SalesOrder', idField: 'salesOrderId' },
                    { key: 'returns', label: 'Returns', icon: 'logistics', endpoint: '/60/ReturnOrd', model: 'SalesReturnOrder', idField: 'returnOrderId' }
                ],
                'pricing': [
                    { key: 'price-lists', label: 'Price Lists', icon: 'documents', endpoint: '/60/PriceList', model: 'SalesPriceList', idField: 'priceListId' },
                    { key: 'discounts', label: 'Discounts', icon: 'financial', endpoint: '/60/DiscntRule', model: 'SalesDiscountRule', idField: 'ruleId' },
                    { key: 'promotions', label: 'Promotions', icon: 'talent', endpoint: '/60/PromoPrice', model: 'SalesPromotionalPrice', idField: 'promoId' }
                ],
                'shipping': [
                    { key: 'deliveries', label: 'Deliveries', icon: 'logistics', endpoint: '/60/DlvryOrder', model: 'SalesDeliveryOrder', idField: 'deliveryOrderId' }
                ],
                'billing': [
                    { key: 'schedules', label: 'Billing Schedules', icon: 'time', endpoint: '/60/BillSched', model: 'SalesBillingSchedule', idField: 'scheduleId' },
                    { key: 'revenue', label: 'Revenue Recog', icon: 'financial', endpoint: '/60/RevSched', model: 'SalesRevenueSchedule', idField: 'scheduleId' }
                ],
                'analytics': [
                    { key: 'targets', label: 'Sales Targets', icon: 'talent', endpoint: '/60/SalesTrgt', model: 'SalesTarget', idField: 'targetId' },
                    { key: 'territories', label: 'Territories', icon: 'organizations', endpoint: '/60/Territory', model: 'SalesTerritory', idField: 'territoryId' },
                    { key: 'commission-plans', label: 'Commission Plans', icon: 'financial', endpoint: '/60/CommPlan', model: 'SalesCommissionPlan', idField: 'planId' },
                    { key: 'forecasts', label: 'Forecasts', icon: 'demand-planning', endpoint: '/60/SalesFcast', model: 'SalesForecast', idField: 'forecastId' }
                ]
            }
        },

        // CRM Sub-Modules (Level 2)
        crm: {
            subModules: [
                { key: 'leads', label: 'Leads', icon: 'talent' },
                { key: 'opportunities', label: 'Opportunities', icon: 'financial' },
                { key: 'accounts', label: 'Accounts', icon: 'organizations' },
                { key: 'marketing', label: 'Marketing', icon: 'talent' },
                { key: 'service', label: 'Service', icon: 'time' },
                { key: 'fieldservice', label: 'Field Service', icon: 'logistics' }
            ],

            services: {
                'leads': [
                    { key: 'leads', label: 'Leads', icon: 'hcm', endpoint: '/80/CrmLead', model: 'CrmLead', idField: 'leadId' },
                    { key: 'lead-sources', label: 'Lead Sources', icon: 'procurement', endpoint: '/80/CrmLeadSrc', model: 'CrmLeadSource', idField: 'sourceId' },
                    { key: 'lead-scores', label: 'Lead Scores', icon: 'bi', endpoint: '/80/CrmLdScore', model: 'CrmLeadScore', idField: 'scoreId' },
                    { key: 'lead-activities', label: 'Activities', icon: 'time', endpoint: '/80/CrmLdAct', model: 'CrmLeadActivity', idField: 'activityId' },
                    { key: 'lead-assigns', label: 'Assignments', icon: 'hcm', endpoint: '/80/CrmLdAssn', model: 'CrmLeadAssign', idField: 'assignmentId' },
                    { key: 'lead-conversions', label: 'Conversions', icon: 'jobs', endpoint: '/80/CrmLdConv', model: 'CrmLeadConversion', idField: 'conversionId' }
                ],
                'opportunities': [
                    { key: 'opportunities', label: 'Opportunities', icon: 'financial', endpoint: '/80/CrmOpp', model: 'CrmOpportunity', idField: 'opportunityId' },
                    { key: 'opp-stages', label: 'Sales Stages', icon: 'demand-planning', endpoint: '/80/CrmOppStg', model: 'CrmOppStage', idField: 'stageId' },
                    { key: 'opp-competitors', label: 'Competitors', icon: 'talent', endpoint: '/80/CrmOppComp', model: 'CrmOppCompetitor', idField: 'competitorId' },
                    { key: 'opp-products', label: 'Products', icon: 'inventory', endpoint: '/80/CrmOppProd', model: 'CrmOppProduct', idField: 'oppProductId' },
                    { key: 'opp-teams', label: 'Teams', icon: 'hcm', endpoint: '/80/CrmOppTeam', model: 'CrmOppTeam', idField: 'teamMemberId' },
                    { key: 'opp-activities', label: 'Activities', icon: 'time', endpoint: '/80/CrmOppAct', model: 'CrmOppActivity', idField: 'activityId' }
                ],
                'accounts': [
                    { key: 'accounts', label: 'Accounts', icon: 'organizations', endpoint: '/80/CrmAcct', model: 'CrmAccount', idField: 'accountId' },
                    { key: 'contacts', label: 'Contacts', icon: 'hcm', endpoint: '/80/CrmContact', model: 'CrmContact', idField: 'contactId' },
                    { key: 'interactions', label: 'Interactions', icon: 'time', endpoint: '/80/CrmIntrctn', model: 'CrmInteraction', idField: 'interactionId' },
                    { key: 'relationships', label: 'Relationships', icon: 'scm', endpoint: '/80/CrmRelshp', model: 'CrmRelationship', idField: 'relationshipId' },
                    { key: 'health-scores', label: 'Health Scores', icon: 'health', endpoint: '/80/CrmHealth', model: 'CrmHealthScore', idField: 'healthScoreId' },
                    { key: 'account-plans', label: 'Account Plans', icon: 'documents', endpoint: '/80/CrmAcctPln', model: 'CrmAccountPlan', idField: 'planId' }
                ],
                'marketing': [
                    { key: 'campaigns', label: 'Campaigns', icon: 'talent', endpoint: '/80/CrmCmpgn', model: 'CrmCampaign', idField: 'campaignId' },
                    { key: 'campaign-members', label: 'Members', icon: 'hcm', endpoint: '/80/CrmCmpgMbr', model: 'CrmCampaignMember', idField: 'memberId' },
                    { key: 'email-templates', label: 'Email Templates', icon: 'documents', endpoint: '/80/CrmEmailTp', model: 'CrmEmailTemplate', idField: 'templateId' },
                    { key: 'marketing-lists', label: 'Lists', icon: 'documents', endpoint: '/80/CrmMktList', model: 'CrmMarketingList', idField: 'listId' },
                    { key: 'campaign-responses', label: 'Responses', icon: 'procurement', endpoint: '/80/CrmCmpgRsp', model: 'CrmCampaignResponse', idField: 'responseId' },
                    { key: 'campaign-rois', label: 'ROI Tracking', icon: 'bi', endpoint: '/80/CrmCmpgROI', model: 'CrmCampaignROI', idField: 'roiId' }
                ],
                'service': [
                    { key: 'cases', label: 'Cases', icon: 'documents', endpoint: '/80/CrmCase', model: 'CrmCase', idField: 'caseId' },
                    { key: 'case-comments', label: 'Comments', icon: 'documents', endpoint: '/80/CrmCaseCmt', model: 'CrmCaseComment', idField: 'commentId' },
                    { key: 'kb-articles', label: 'Knowledge Base', icon: 'learning', endpoint: '/80/CrmKBart', model: 'CrmKBArticle', idField: 'articleId' },
                    { key: 'slas', label: 'SLAs', icon: 'time', endpoint: '/80/CrmSLA', model: 'CrmSLA', idField: 'slaId' },
                    { key: 'escalations', label: 'Escalations', icon: 'compliance', endpoint: '/80/CrmEscal', model: 'CrmEscalation', idField: 'escalationId' },
                    { key: 'surveys', label: 'Surveys', icon: 'documents', endpoint: '/80/CrmSurvey', model: 'CrmSurvey', idField: 'surveyId' }
                ],
                'fieldservice': [
                    { key: 'service-orders', label: 'Service Orders', icon: 'documents', endpoint: '/80/CrmSvcOrd', model: 'CrmServiceOrder', idField: 'orderId' },
                    { key: 'technicians', label: 'Technicians', icon: 'hcm', endpoint: '/80/CrmTech', model: 'CrmTechnician', idField: 'technicianId' },
                    { key: 'service-contracts', label: 'Contracts', icon: 'documents', endpoint: '/80/CrmSvcCntr', model: 'CrmServiceContract', idField: 'contractId' },
                    { key: 'service-schedules', label: 'Schedules', icon: 'time', endpoint: '/80/CrmSvcSchd', model: 'CrmServiceSchedule', idField: 'scheduleId' },
                    { key: 'service-parts', label: 'Parts', icon: 'inventory', endpoint: '/80/CrmSvcPart', model: 'CrmServicePart', idField: 'partId' },
                    { key: 'service-visits', label: 'Visits', icon: 'logistics', endpoint: '/80/CrmSvcVst', model: 'CrmServiceVisit', idField: 'visitId' }
                ]
            }
        }
    };
})();
