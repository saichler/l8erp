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
                    { key: 'requisition-lines', label: 'Req. Lines', icon: 'procurement', endpoint: '/50/ReqLine', model: 'ScmRequisitionLine', idField: 'lineId' },
                    { key: 'rfqs', label: 'RFQs', icon: 'procurement', endpoint: '/50/RFQ', model: 'ScmRequestForQuotation', idField: 'rfqId' },
                    { key: 'purchase-orders', label: 'Purchase Orders', icon: 'procurement', endpoint: '/50/PurchOrder', model: 'ScmPurchaseOrder', idField: 'purchaseOrderId' },
                    { key: 'po-lines', label: 'PO Lines', icon: 'procurement', endpoint: '/50/POLine', model: 'ScmPurchaseOrderLine', idField: 'lineId' },
                    { key: 'blanket-orders', label: 'Blanket Orders', icon: 'procurement', endpoint: '/50/BlnktOrder', model: 'ScmBlanketOrder', idField: 'blanketOrderId' },
                    { key: 'supplier-scorecards', label: 'Scorecards', icon: 'procurement', endpoint: '/50/SupplrCard', model: 'ScmSupplierScorecard', idField: 'scorecardId' }
                ],
                'inventory': [
                    { key: 'items', label: 'Items', icon: 'inventory', endpoint: '/50/Item', model: 'ScmItem', idField: 'itemId' },
                    { key: 'item-categories', label: 'Categories', icon: 'inventory', endpoint: '/50/ItemCat', model: 'ScmItemCategory', idField: 'categoryId' },
                    { key: 'stock-movements', label: 'Stock Movements', icon: 'inventory', endpoint: '/50/StockMove', model: 'ScmStockMovement', idField: 'movementId' },
                    { key: 'lot-numbers', label: 'Lot Numbers', icon: 'inventory', endpoint: '/50/LotNumber', model: 'ScmLotNumber', idField: 'lotId' },
                    { key: 'serial-numbers', label: 'Serial Numbers', icon: 'inventory', endpoint: '/50/SerialNum', model: 'ScmSerialNumber', idField: 'serialId' },
                    { key: 'cycle-counts', label: 'Cycle Counts', icon: 'inventory', endpoint: '/50/CycleCount', model: 'ScmCycleCount', idField: 'cycleCountId' },
                    { key: 'reorder-points', label: 'Reorder Points', icon: 'inventory', endpoint: '/50/ReorderPt', model: 'ScmReorderPoint', idField: 'reorderPointId' },
                    { key: 'inventory-valuations', label: 'Valuations', icon: 'inventory', endpoint: '/50/InvValue', model: 'ScmInventoryValuation', idField: 'valuationId' }
                ],
                'warehouse': [
                    { key: 'warehouses', label: 'Warehouses', icon: 'warehouse', endpoint: '/50/Warehouse', model: 'ScmWarehouse', idField: 'warehouseId' },
                    { key: 'bins', label: 'Bins', icon: 'warehouse', endpoint: '/50/Bin', model: 'ScmBin', idField: 'binId' },
                    { key: 'receiving-orders', label: 'Receiving', icon: 'warehouse', endpoint: '/50/RecvOrder', model: 'ScmReceivingOrder', idField: 'receivingOrderId' },
                    { key: 'putaway-tasks', label: 'Put Away', icon: 'warehouse', endpoint: '/50/PutAway', model: 'ScmPutawayTask', idField: 'taskId' },
                    { key: 'pick-tasks', label: 'Pick Tasks', icon: 'warehouse', endpoint: '/50/PickTask', model: 'ScmPickTask', idField: 'taskId' },
                    { key: 'pack-tasks', label: 'Pack Tasks', icon: 'warehouse', endpoint: '/50/PackTask', model: 'ScmPackTask', idField: 'taskId' },
                    { key: 'ship-tasks', label: 'Ship Tasks', icon: 'warehouse', endpoint: '/50/ShipTask', model: 'ScmShipTask', idField: 'taskId' },
                    { key: 'wave-plans', label: 'Wave Plans', icon: 'warehouse', endpoint: '/50/WavePlan', model: 'ScmWavePlan', idField: 'wavePlanId' },
                    { key: 'dock-schedules', label: 'Dock Schedules', icon: 'warehouse', endpoint: '/50/DockSched', model: 'ScmDockSchedule', idField: 'scheduleId' }
                ],
                'logistics': [
                    { key: 'carriers', label: 'Carriers', icon: 'logistics', endpoint: '/50/ScmCarrier', model: 'ScmCarrier', idField: 'carrierId' },
                    { key: 'freight-rates', label: 'Freight Rates', icon: 'logistics', endpoint: '/50/FreightRt', model: 'ScmFreightRate', idField: 'rateId' },
                    { key: 'shipments', label: 'Shipments', icon: 'logistics', endpoint: '/50/Shipment', model: 'ScmShipment', idField: 'shipmentId' },
                    { key: 'routes', label: 'Routes', icon: 'logistics', endpoint: '/50/Route', model: 'ScmRoute', idField: 'routeId' },
                    { key: 'load-plans', label: 'Load Plans', icon: 'logistics', endpoint: '/50/LoadPlan', model: 'ScmLoadPlan', idField: 'loadPlanId' },
                    { key: 'delivery-proofs', label: 'Delivery Proofs', icon: 'logistics', endpoint: '/50/DlvryProof', model: 'ScmDeliveryProof', idField: 'proofId' },
                    { key: 'freight-audits', label: 'Freight Audits', icon: 'logistics', endpoint: '/50/FrtAudit', model: 'ScmFreightAudit', idField: 'auditId' },
                    { key: 'return-authorizations', label: 'Returns', icon: 'logistics', endpoint: '/50/ReturnAuth', model: 'ScmReturnAuthorization', idField: 'rmaId' }
                ],
                'demand-planning': [
                    { key: 'demand-forecasts', label: 'Forecasts', icon: 'demand-planning', endpoint: '/50/DmndFcast', model: 'ScmDemandForecast', idField: 'forecastId' },
                    { key: 'forecast-models', label: 'Models', icon: 'demand-planning', endpoint: '/50/FcastModel', model: 'ScmForecastModel', idField: 'modelId' },
                    { key: 'demand-plans', label: 'Demand Plans', icon: 'demand-planning', endpoint: '/50/DemandPlan', model: 'ScmDemandPlan', idField: 'planId' },
                    { key: 'promo-plans', label: 'Promotions', icon: 'demand-planning', endpoint: '/50/PromoPlan', model: 'ScmPromotionalPlan', idField: 'planId' },
                    { key: 'new-product-plans', label: 'New Products', icon: 'demand-planning', endpoint: '/50/NewProdPln', model: 'ScmNewProductPlan', idField: 'planId' },
                    { key: 'forecast-accuracies', label: 'Accuracy', icon: 'demand-planning', endpoint: '/50/FcastAccur', model: 'ScmForecastAccuracy', idField: 'accuracyId' }
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
                    { key: 'bom-lines', label: 'BOM Lines', icon: 'documents', endpoint: '/70/MfgBomLine', model: 'MfgBomLine', idField: 'lineId' },
                    { key: 'routings', label: 'Routings', icon: 'scm', endpoint: '/70/MfgRouting', model: 'MfgRouting', idField: 'routingId' },
                    { key: 'routing-ops', label: 'Routing Ops', icon: 'jobs', endpoint: '/70/MfgRtngOp', model: 'MfgRoutingOperation', idField: 'operationId' },
                    { key: 'change-orders', label: 'Change Orders', icon: 'documents', endpoint: '/70/MfgECO', model: 'MfgEngChangeOrder', idField: 'changeOrderId' },
                    { key: 'change-details', label: 'ECO Details', icon: 'documents', endpoint: '/70/MfgECODtl', model: 'MfgEngChangeDetail', idField: 'detailId' }
                ],
                'production': [
                    { key: 'work-orders', label: 'Work Orders', icon: 'inventory', endpoint: '/70/MfgWorkOrd', model: 'MfgWorkOrder', idField: 'workOrderId' },
                    { key: 'wo-operations', label: 'WO Operations', icon: 'jobs', endpoint: '/70/MfgWOOp', model: 'MfgWorkOrderOp', idField: 'operationId' },
                    { key: 'prod-orders', label: 'Prod Orders', icon: 'documents', endpoint: '/70/MfgProdOrd', model: 'MfgProductionOrder', idField: 'prodOrderId' },
                    { key: 'prod-lines', label: 'Prod Lines', icon: 'documents', endpoint: '/70/MfgPOLine', model: 'MfgProdOrderLine', idField: 'lineId' },
                    { key: 'batches', label: 'Batches', icon: 'inventory', endpoint: '/70/MfgBatch', model: 'MfgProdBatch', idField: 'batchId' },
                    { key: 'consumptions', label: 'Consumptions', icon: 'demand-planning', endpoint: '/70/MfgConsump', model: 'MfgProdConsumption', idField: 'consumptionId' }
                ],
                'shopfloor': [
                    { key: 'work-centers', label: 'Work Centers', icon: 'manufacturing', endpoint: '/70/MfgWorkCtr', model: 'MfgWorkCenter', idField: 'workCenterId' },
                    { key: 'wc-capacity', label: 'WC Capacity', icon: 'demand-planning', endpoint: '/70/MfgWCCap', model: 'MfgWorkCenterCap', idField: 'capacityId' },
                    { key: 'labor', label: 'Labor Entries', icon: 'hcm', endpoint: '/70/MfgLabor', model: 'MfgLaborEntry', idField: 'entryId' },
                    { key: 'machine', label: 'Machine Entries', icon: 'jobs', endpoint: '/70/MfgMachine', model: 'MfgMachineEntry', idField: 'entryId' },
                    { key: 'shifts', label: 'Shift Schedules', icon: 'time', endpoint: '/70/MfgShift', model: 'MfgShiftSchedule', idField: 'scheduleId' },
                    { key: 'downtime', label: 'Downtime', icon: 'time', endpoint: '/70/MfgDowntm', model: 'MfgDowntimeEvent', idField: 'eventId' }
                ],
                'quality': [
                    { key: 'plans', label: 'Quality Plans', icon: 'documents', endpoint: '/70/MfgQCPlan', model: 'MfgQualityPlan', idField: 'planId' },
                    { key: 'inspection-points', label: 'Insp Points', icon: 'talent', endpoint: '/70/MfgInspPt', model: 'MfgInspectionPoint', idField: 'pointId' },
                    { key: 'inspections', label: 'Inspections', icon: 'compliance', endpoint: '/70/MfgQCInsp', model: 'MfgQualityInspection', idField: 'inspectionId' },
                    { key: 'test-results', label: 'Test Results', icon: 'demand-planning', endpoint: '/70/MfgTestRes', model: 'MfgTestResult', idField: 'resultId' },
                    { key: 'ncrs', label: 'NCRs', icon: 'compliance', endpoint: '/70/MfgNCR', model: 'MfgNCR', idField: 'ncrId' },
                    { key: 'ncr-actions', label: 'NCR Actions', icon: 'documents', endpoint: '/70/MfgNCRAct', model: 'MfgNCRAction', idField: 'actionId' }
                ],
                'planning': [
                    { key: 'mrp-runs', label: 'MRP Runs', icon: 'scm', endpoint: '/70/MfgMrpRun', model: 'MfgMrpRun', idField: 'runId' },
                    { key: 'mrp-requirements', label: 'MRP Reqs', icon: 'documents', endpoint: '/70/MfgMrpReq', model: 'MfgMrpRequirement', idField: 'requirementId' },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: 'demand-planning', endpoint: '/70/MfgCapPlan', model: 'MfgCapacityPlan', idField: 'planId' },
                    { key: 'capacity-loads', label: 'Capacity Loads', icon: 'demand-planning', endpoint: '/70/MfgCapLoad', model: 'MfgCapacityLoad', idField: 'loadId' },
                    { key: 'schedules', label: 'Prod Schedules', icon: 'time', endpoint: '/70/MfgProdSch', model: 'MfgProdSchedule', idField: 'scheduleId' },
                    { key: 'schedule-blocks', label: 'Sched Blocks', icon: 'time', endpoint: '/70/MfgSchBlk', model: 'MfgScheduleBlock', idField: 'blockId' }
                ],
                'costing': [
                    { key: 'standard-costs', label: 'Standard Costs', icon: 'financial', endpoint: '/70/MfgStdCost', model: 'MfgStandardCost', idField: 'costId' },
                    { key: 'cost-rollups', label: 'Cost Rollups', icon: 'demand-planning', endpoint: '/70/MfgRollup', model: 'MfgCostRollup', idField: 'rollupId' },
                    { key: 'actual-costs', label: 'Actual Costs', icon: 'financial', endpoint: '/70/MfgActCost', model: 'MfgActualCost', idField: 'actualCostId' },
                    { key: 'variances', label: 'Variances', icon: 'demand-planning', endpoint: '/70/MfgCostVar', model: 'MfgCostVariance', idField: 'varianceId' },
                    { key: 'overheads', label: 'Overheads', icon: 'organizations', endpoint: '/70/MfgOverhd', model: 'MfgOverhead', idField: 'overheadId' },
                    { key: 'overhead-allocs', label: 'OH Allocations', icon: 'documents', endpoint: '/70/MfgOHAlloc', model: 'MfgOverheadAlloc', idField: 'allocationId' }
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
                    { key: 'quotation-lines', label: 'Quote Lines', icon: 'documents', endpoint: '/60/QuoteLine', model: 'SalesQuotationLine', idField: 'lineId' },
                    { key: 'sales-orders', label: 'Sales Orders', icon: 'procurement', endpoint: '/60/SalesOrder', model: 'SalesOrder', idField: 'salesOrderId' },
                    { key: 'order-lines', label: 'Order Lines', icon: 'documents', endpoint: '/60/OrderLine', model: 'SalesOrderLine', idField: 'lineId' },
                    { key: 'allocations', label: 'Allocations', icon: 'inventory', endpoint: '/60/OrderAlloc', model: 'SalesOrderAllocation', idField: 'allocationId' },
                    { key: 'back-orders', label: 'Back Orders', icon: 'time', endpoint: '/60/BackOrder', model: 'SalesBackOrder', idField: 'backOrderId' },
                    { key: 'returns', label: 'Returns', icon: 'logistics', endpoint: '/60/ReturnOrd', model: 'SalesReturnOrder', idField: 'returnOrderId' },
                    { key: 'return-lines', label: 'Return Lines', icon: 'documents', endpoint: '/60/ReturnLine', model: 'SalesReturnOrderLine', idField: 'lineId' }
                ],
                'pricing': [
                    { key: 'price-lists', label: 'Price Lists', icon: 'documents', endpoint: '/60/PriceList', model: 'SalesPriceList', idField: 'priceListId' },
                    { key: 'price-entries', label: 'Price Entries', icon: 'documents', endpoint: '/60/PriceEntry', model: 'SalesPriceListEntry', idField: 'entryId' },
                    { key: 'customer-prices', label: 'Customer Prices', icon: 'financial', endpoint: '/60/CustPrice', model: 'SalesCustomerPrice', idField: 'customerPriceId' },
                    { key: 'discounts', label: 'Discounts', icon: 'financial', endpoint: '/60/DiscntRule', model: 'SalesDiscountRule', idField: 'ruleId' },
                    { key: 'promotions', label: 'Promotions', icon: 'talent', endpoint: '/60/PromoPrice', model: 'SalesPromotionalPrice', idField: 'promoId' },
                    { key: 'qty-breaks', label: 'Qty Breaks', icon: 'demand-planning', endpoint: '/60/QtyBreak', model: 'SalesQuantityBreak', idField: 'breakId' }
                ],
                'shipping': [
                    { key: 'deliveries', label: 'Deliveries', icon: 'logistics', endpoint: '/60/DlvryOrder', model: 'SalesDeliveryOrder', idField: 'deliveryOrderId' },
                    { key: 'delivery-lines', label: 'Delivery Lines', icon: 'documents', endpoint: '/60/DlvryLine', model: 'SalesDeliveryLine', idField: 'lineId' },
                    { key: 'pick-releases', label: 'Pick Releases', icon: 'warehouse', endpoint: '/60/PickRlease', model: 'SalesPickRelease', idField: 'pickReleaseId' },
                    { key: 'packing', label: 'Packing Slips', icon: 'inventory', endpoint: '/60/PackSlip', model: 'SalesPackingSlip', idField: 'packingSlipId' },
                    { key: 'ship-docs', label: 'Ship Docs', icon: 'documents', endpoint: '/60/ShipDoc', model: 'SalesShippingDoc', idField: 'docId' },
                    { key: 'confirmations', label: 'Confirmations', icon: 'jobs', endpoint: '/60/DlvryConf', model: 'SalesDeliveryConfirm', idField: 'confirmId' }
                ],
                'billing': [
                    { key: 'schedules', label: 'Billing Schedules', icon: 'time', endpoint: '/60/BillSched', model: 'SalesBillingSchedule', idField: 'scheduleId' },
                    { key: 'milestones', label: 'Milestones', icon: 'talent', endpoint: '/60/BillMilstn', model: 'SalesBillingMilestone', idField: 'milestoneId' },
                    { key: 'revenue', label: 'Revenue Recog', icon: 'financial', endpoint: '/60/RevSched', model: 'SalesRevenueSchedule', idField: 'scheduleId' }
                ],
                'analytics': [
                    { key: 'targets', label: 'Sales Targets', icon: 'talent', endpoint: '/60/SalesTrgt', model: 'SalesTarget', idField: 'targetId' },
                    { key: 'territories', label: 'Territories', icon: 'organizations', endpoint: '/60/Territory', model: 'SalesTerritory', idField: 'territoryId' },
                    { key: 'territory-assigns', label: 'Assignments', icon: 'positions', endpoint: '/60/TerrAssign', model: 'SalesTerritoryAssign', idField: 'assignmentId' },
                    { key: 'commission-plans', label: 'Commission Plans', icon: 'financial', endpoint: '/60/CommPlan', model: 'SalesCommissionPlan', idField: 'planId' },
                    { key: 'commission-calcs', label: 'Calculations', icon: 'financial', endpoint: '/60/CommCalc', model: 'SalesCommissionCalc', idField: 'calcId' },
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
