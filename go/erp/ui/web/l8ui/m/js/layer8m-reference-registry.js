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
/**
 * Mobile Reference Registry
 * Central configuration for all reference/lookup fields.
 * Desktop Equivalent: shared/reference-registry.js
 *
 * This must match the desktop Layer8DReferenceRegistry EXACTLY.
 */
(function() {
    'use strict';

    window.Layer8MReferenceRegistry = {
        // ========================================
        // Core HR Models
        // ========================================
        Employee: {
            idColumn: 'employeeId',
            displayColumn: 'lastName',
            selectColumns: ['employeeId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Organization: {
            idColumn: 'organizationId',
            displayColumn: 'name'
        },
        Department: {
            idColumn: 'departmentId',
            displayColumn: 'name'
        },
        Position: {
            idColumn: 'positionId',
            displayColumn: 'title'
        },
        Job: {
            idColumn: 'jobId',
            displayColumn: 'title'
        },
        JobFamily: {
            idColumn: 'jobFamilyId',
            displayColumn: 'name'
        },
        EmployeeDocument: {
            idColumn: 'documentId',
            displayColumn: 'name'
        },
        ComplianceRecord: {
            idColumn: 'recordId',
            displayColumn: 'recordId'
        },

        // ========================================
        // Time & Attendance Models
        // ========================================
        Timesheet: {
            idColumn: 'timesheetId',
            displayColumn: 'timesheetId'
        },
        LeaveRequest: {
            idColumn: 'requestId',
            displayColumn: 'requestId'
        },
        LeaveBalance: {
            idColumn: 'balanceId',
            displayColumn: 'balanceId'
        },
        LeavePolicy: {
            idColumn: 'policyId',
            displayColumn: 'name'
        },
        Shift: {
            idColumn: 'shiftId',
            displayColumn: 'name'
        },
        Schedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        Holiday: {
            idColumn: 'holidayId',
            displayColumn: 'name'
        },
        Absence: {
            idColumn: 'absenceId',
            displayColumn: 'absenceId'
        },

        // ========================================
        // Benefits Models
        // ========================================
        BenefitPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BenefitEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Carrier: {
            idColumn: 'carrierId',
            displayColumn: 'name'
        },
        Dependent: {
            idColumn: 'dependentId',
            displayColumn: 'firstName',
            selectColumns: ['dependentId', 'firstName', 'lastName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        LifeEvent: {
            idColumn: 'eventId',
            displayColumn: 'eventType'
        },
        COBRAEvent: {
            idColumn: 'cobraEventId',
            displayColumn: 'cobraEventId'
        },

        // ========================================
        // Talent Management Models
        // ========================================
        PerformanceReview: {
            idColumn: 'reviewId',
            displayColumn: 'reviewId'
        },
        Goal: {
            idColumn: 'goalId',
            displayColumn: 'title'
        },
        Feedback: {
            idColumn: 'feedbackId',
            displayColumn: 'feedbackId'
        },
        CareerPath: {
            idColumn: 'careerPathId',
            displayColumn: 'name'
        },
        SuccessionPlan: {
            idColumn: 'planId',
            displayColumn: 'planId'
        },
        JobRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'title'
        },
        Applicant: {
            idColumn: 'applicantId',
            displayColumn: 'lastName',
            selectColumns: ['applicantId', 'lastName', 'firstName'],
            displayFormat: function(item) {
                return item.lastName + ', ' + item.firstName;
            },
            displayLabel: 'Name'
        },
        Application: {
            idColumn: 'applicationId',
            displayColumn: 'applicationId'
        },
        OnboardingTask: {
            idColumn: 'taskId',
            displayColumn: 'name'
        },

        // ========================================
        // Learning Models
        // ========================================
        Course: {
            idColumn: 'courseId',
            displayColumn: 'title'
        },
        CourseSession: {
            idColumn: 'sessionId',
            displayColumn: 'sessionId'
        },
        CourseEnrollment: {
            idColumn: 'enrollmentId',
            displayColumn: 'enrollmentId'
        },
        Certification: {
            idColumn: 'certificationId',
            displayColumn: 'name'
        },
        EmployeeCertification: {
            idColumn: 'employeeCertificationId',
            displayColumn: 'employeeCertificationId'
        },
        Skill: {
            idColumn: 'skillId',
            displayColumn: 'name'
        },
        EmployeeSkill: {
            idColumn: 'employeeSkillId',
            displayColumn: 'employeeSkillId'
        },
        TrainingRecord: {
            idColumn: 'recordId',
            displayColumn: 'trainingName'
        },

        // ========================================
        // Compensation Models
        // ========================================
        SalaryStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        SalaryGrade: {
            idColumn: 'gradeId',
            displayColumn: 'name'
        },
        EmployeeCompensation: {
            idColumn: 'compensationId',
            displayColumn: 'compensationId'
        },
        MeritIncrease: {
            idColumn: 'increaseId',
            displayColumn: 'increaseId'
        },
        MeritCycle: {
            idColumn: 'cycleId',
            displayColumn: 'name'
        },
        BonusPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        BonusPayment: {
            idColumn: 'paymentId',
            displayColumn: 'paymentId'
        },
        EquityGrant: {
            idColumn: 'grantId',
            displayColumn: 'grantNumber'
        },
        CompensationStatement: {
            idColumn: 'statementId',
            displayColumn: 'statementId'
        },
        MarketBenchmark: {
            idColumn: 'benchmarkId',
            displayColumn: 'jobTitle'
        },

        // ========================================
        // Payroll Models
        // ========================================
        PayStructure: {
            idColumn: 'structureId',
            displayColumn: 'name'
        },
        PayComponent: {
            idColumn: 'componentId',
            displayColumn: 'name'
        },
        PayrollRun: {
            idColumn: 'payrollRunId',
            displayColumn: 'payrollRunId'
        },
        Payslip: {
            idColumn: 'payslipId',
            displayColumn: 'payslipId'
        },
        TaxWithholding: {
            idColumn: 'withholdingId',
            displayColumn: 'withholdingId'
        },
        DirectDeposit: {
            idColumn: 'depositId',
            displayColumn: 'depositId'
        },
        Garnishment: {
            idColumn: 'garnishmentId',
            displayColumn: 'garnishmentId'
        },
        YearEndDocument: {
            idColumn: 'documentId',
            displayColumn: 'documentType'
        },

        // ========================================
        // SCM - Procurement Models
        // ========================================
        ScmPurchaseRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'requisitionNumber',
            selectColumns: ['requisitionId', 'requisitionNumber'],
            displayLabel: 'Requisition'
        },
        ScmRequisitionLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmRequestForQuotation: {
            idColumn: 'rfqId',
            displayColumn: 'rfqNumber',
            selectColumns: ['rfqId', 'rfqNumber'],
            displayLabel: 'RFQ'
        },
        ScmPurchaseOrder: {
            idColumn: 'purchaseOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['purchaseOrderId', 'orderNumber'],
            displayLabel: 'Purchase Order'
        },
        ScmPurchaseOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        ScmBlanketOrder: {
            idColumn: 'blanketOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['blanketOrderId', 'orderNumber'],
            displayLabel: 'Blanket Order'
        },
        ScmSupplierScorecard: {
            idColumn: 'scorecardId',
            displayColumn: 'scorecardId'
        },

        // ========================================
        // SCM - Inventory Models
        // ========================================
        ScmItem: {
            idColumn: 'itemId',
            displayColumn: 'name',
            selectColumns: ['itemId', 'itemNumber', 'name'],
            displayFormat: function(item) {
                return item.itemNumber + ' - ' + item.name;
            },
            displayLabel: 'Item'
        },
        ScmItemCategory: {
            idColumn: 'categoryId',
            displayColumn: 'categoryName'
        },
        ScmStockMovement: {
            idColumn: 'movementId',
            displayColumn: 'movementId'
        },
        ScmLotNumber: {
            idColumn: 'lotId',
            displayColumn: 'lotNumber'
        },
        ScmSerialNumber: {
            idColumn: 'serialId',
            displayColumn: 'serialNumber'
        },
        ScmCycleCount: {
            idColumn: 'cycleCountId',
            displayColumn: 'cycleCountId'
        },
        ScmReorderPoint: {
            idColumn: 'reorderPointId',
            displayColumn: 'reorderPointId'
        },
        ScmInventoryValuation: {
            idColumn: 'valuationId',
            displayColumn: 'valuationId'
        },

        // ========================================
        // SCM - Warehouse Management Models
        // ========================================
        ScmWarehouse: {
            idColumn: 'warehouseId',
            displayColumn: 'name',
            selectColumns: ['warehouseId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Warehouse'
        },
        ScmBin: {
            idColumn: 'binId',
            displayColumn: 'binCode'
        },
        ScmReceivingOrder: {
            idColumn: 'receivingOrderId',
            displayColumn: 'orderNumber'
        },
        ScmPutawayTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmPickTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmPackTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmShipTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ScmWavePlan: {
            idColumn: 'wavePlanId',
            displayColumn: 'waveName'
        },
        ScmDockSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },

        // ========================================
        // SCM - Logistics Models
        // ========================================
        ScmCarrier: {
            idColumn: 'carrierId',
            displayColumn: 'name',
            selectColumns: ['carrierId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Carrier'
        },
        ScmFreightRate: {
            idColumn: 'rateId',
            displayColumn: 'rateId'
        },
        ScmShipment: {
            idColumn: 'shipmentId',
            displayColumn: 'shipmentNumber',
            selectColumns: ['shipmentId', 'shipmentNumber'],
            displayLabel: 'Shipment'
        },
        ScmRoute: {
            idColumn: 'routeId',
            displayColumn: 'name'
        },
        ScmLoadPlan: {
            idColumn: 'loadPlanId',
            displayColumn: 'loadPlanId'
        },
        ScmDeliveryProof: {
            idColumn: 'proofId',
            displayColumn: 'proofId'
        },
        ScmFreightAudit: {
            idColumn: 'auditId',
            displayColumn: 'auditId'
        },
        ScmReturnAuthorization: {
            idColumn: 'rmaId',
            displayColumn: 'rmaNumber',
            selectColumns: ['rmaId', 'rmaNumber'],
            displayLabel: 'RMA'
        },

        // ========================================
        // SCM - Demand Planning Models
        // ========================================
        ScmDemandForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId',
            selectColumns: ['forecastId', 'itemId'],
            displayLabel: 'Forecast'
        },
        ScmForecastModel: {
            idColumn: 'modelId',
            displayColumn: 'name'
        },
        ScmDemandPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        ScmPromotionalPlan: {
            idColumn: 'planId',
            displayColumn: 'planName'
        },
        ScmNewProductPlan: {
            idColumn: 'planId',
            displayColumn: 'productName'
        },
        ScmForecastAccuracy: {
            idColumn: 'accuracyId',
            displayColumn: 'accuracyId'
        },

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        ScmMaterialRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        ScmDistributionRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        ScmSupplyPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Supply Plan'
        },
        ScmSupplierCollaboration: {
            idColumn: 'collaborationId',
            displayColumn: 'collaborationId'
        },
        ScmSafetyStock: {
            idColumn: 'safetyStockId',
            displayColumn: 'safetyStockId'
        },
        ScmLeadTime: {
            idColumn: 'leadTimeId',
            displayColumn: 'leadTimeId'
        },

        // ========================================
        // CRM - Leads Management
        // ========================================
        CrmLead: {
            idColumn: 'leadId',
            displayColumn: 'lastName',
            selectColumns: ['leadId', 'firstName', 'lastName', 'company'],
            displayFormat: function(item) {
                return item.firstName + ' ' + item.lastName + (item.company ? ' (' + item.company + ')' : '');
            },
            displayLabel: 'Lead'
        },
        CrmLeadSource: {
            idColumn: 'sourceId',
            displayColumn: 'name'
        },
        CrmLeadScore: {
            idColumn: 'scoreId',
            displayColumn: 'name'
        },
        CrmLeadActivity: {
            idColumn: 'activityId',
            displayColumn: 'subject'
        },
        CrmLeadAssign: {
            idColumn: 'assignmentId',
            displayColumn: 'name'
        },
        CrmLeadConversion: {
            idColumn: 'conversionId',
            displayColumn: 'conversionId'
        },

        // ========================================
        // CRM - Opportunities Management
        // ========================================
        CrmOpportunity: {
            idColumn: 'opportunityId',
            displayColumn: 'name',
            selectColumns: ['opportunityId', 'name'],
            displayLabel: 'Opportunity'
        },
        CrmOppStage: {
            idColumn: 'stageId',
            displayColumn: 'name'
        },
        CrmOppCompetitor: {
            idColumn: 'competitorId',
            displayColumn: 'competitorName'
        },
        CrmOppProduct: {
            idColumn: 'oppProductId',
            displayColumn: 'oppProductId'
        },
        CrmOppTeam: {
            idColumn: 'teamMemberId',
            displayColumn: 'teamMemberId'
        },
        CrmOppActivity: {
            idColumn: 'activityId',
            displayColumn: 'subject'
        },

        // ========================================
        // CRM - Accounts Management
        // ========================================
        CrmAccount: {
            idColumn: 'accountId',
            displayColumn: 'name',
            selectColumns: ['accountId', 'name'],
            displayLabel: 'Account'
        },
        CrmContact: {
            idColumn: 'contactId',
            displayColumn: 'lastName',
            selectColumns: ['contactId', 'firstName', 'lastName'],
            displayFormat: function(item) {
                return item.firstName + ' ' + item.lastName;
            },
            displayLabel: 'Contact'
        },
        CrmInteraction: {
            idColumn: 'interactionId',
            displayColumn: 'subject'
        },
        CrmRelationship: {
            idColumn: 'relationshipId',
            displayColumn: 'relationshipId'
        },
        CrmHealthScore: {
            idColumn: 'healthScoreId',
            displayColumn: 'healthScoreId'
        },
        CrmAccountPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },

        // ========================================
        // CRM - Marketing Management
        // ========================================
        CrmCampaign: {
            idColumn: 'campaignId',
            displayColumn: 'name',
            selectColumns: ['campaignId', 'name'],
            displayLabel: 'Campaign'
        },
        CrmCampaignMember: {
            idColumn: 'memberId',
            displayColumn: 'memberId'
        },
        CrmEmailTemplate: {
            idColumn: 'templateId',
            displayColumn: 'name'
        },
        CrmMarketingList: {
            idColumn: 'listId',
            displayColumn: 'name'
        },
        CrmCampaignResponse: {
            idColumn: 'responseId',
            displayColumn: 'responseId'
        },
        CrmCampaignROI: {
            idColumn: 'roiId',
            displayColumn: 'roiId'
        },

        // ========================================
        // CRM - Customer Service
        // ========================================
        CrmCase: {
            idColumn: 'caseId',
            displayColumn: 'subject',
            selectColumns: ['caseId', 'caseNumber', 'subject'],
            displayFormat: function(item) {
                return item.caseNumber + ' - ' + item.subject;
            },
            displayLabel: 'Case'
        },
        CrmCaseComment: {
            idColumn: 'commentId',
            displayColumn: 'commentId'
        },
        CrmKBArticle: {
            idColumn: 'articleId',
            displayColumn: 'title',
            selectColumns: ['articleId', 'articleNumber', 'title'],
            displayFormat: function(item) {
                return item.articleNumber + ' - ' + item.title;
            },
            displayLabel: 'KB Article'
        },
        CrmSLA: {
            idColumn: 'slaId',
            displayColumn: 'name'
        },
        CrmEscalation: {
            idColumn: 'escalationId',
            displayColumn: 'name'
        },
        CrmSurvey: {
            idColumn: 'surveyId',
            displayColumn: 'name'
        },

        // ========================================
        // CRM - Field Service
        // ========================================
        CrmServiceOrder: {
            idColumn: 'orderId',
            displayColumn: 'orderNumber',
            selectColumns: ['orderId', 'orderNumber'],
            displayLabel: 'Service Order'
        },
        CrmTechnician: {
            idColumn: 'technicianId',
            displayColumn: 'name',
            selectColumns: ['technicianId', 'name'],
            displayLabel: 'Technician'
        },
        CrmServiceContract: {
            idColumn: 'contractId',
            displayColumn: 'contractNumber',
            selectColumns: ['contractId', 'contractNumber'],
            displayLabel: 'Service Contract'
        },
        CrmServiceSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },
        CrmServicePart: {
            idColumn: 'partId',
            displayColumn: 'itemName'
        },
        CrmServiceVisit: {
            idColumn: 'visitId',
            displayColumn: 'visitId'
        },

        // ========================================
        // Projects - Planning
        // ========================================
        PrjProject: {
            idColumn: 'projectId',
            displayColumn: 'name',
            selectColumns: ['projectId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Project'
        },
        PrjProjectTemplate: {
            idColumn: 'templateId',
            displayColumn: 'name'
        },
        PrjPhase: {
            idColumn: 'phaseId',
            displayColumn: 'name'
        },
        PrjTask: {
            idColumn: 'taskId',
            displayColumn: 'name',
            selectColumns: ['taskId', 'name'],
            displayLabel: 'Task'
        },
        PrjMilestone: {
            idColumn: 'milestoneId',
            displayColumn: 'name',
            selectColumns: ['milestoneId', 'name'],
            displayLabel: 'Milestone'
        },
        PrjDeliverable: {
            idColumn: 'deliverableId',
            displayColumn: 'name'
        },
        PrjDependency: {
            idColumn: 'dependencyId',
            displayColumn: 'dependencyId'
        },
        PrjRisk: {
            idColumn: 'riskId',
            displayColumn: 'name'
        },

        // ========================================
        // Projects - Resources
        // ========================================
        PrjResourcePool: {
            idColumn: 'poolId',
            displayColumn: 'name'
        },
        PrjResource: {
            idColumn: 'resourceId',
            displayColumn: 'name',
            selectColumns: ['resourceId', 'name'],
            displayLabel: 'Resource'
        },
        PrjResourceSkill: {
            idColumn: 'skillId',
            displayColumn: 'skillName'
        },
        PrjAllocation: {
            idColumn: 'allocationId',
            displayColumn: 'allocationId'
        },
        PrjBooking: {
            idColumn: 'bookingId',
            displayColumn: 'bookingId'
        },
        PrjCapacityPlan: {
            idColumn: 'planId',
            displayColumn: 'name'
        },
        PrjUtilization: {
            idColumn: 'utilizationId',
            displayColumn: 'utilizationId'
        },

        // ========================================
        // Projects - Time & Expense
        // ========================================
        PrjTimesheet: {
            idColumn: 'timesheetId',
            displayColumn: 'timesheetId'
        },
        PrjTimesheetEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        PrjExpenseReport: {
            idColumn: 'reportId',
            displayColumn: 'reportId'
        },
        PrjExpenseEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        PrjApprovalRule: {
            idColumn: 'ruleId',
            displayColumn: 'name'
        },
        PrjExpenseCategory: {
            idColumn: 'categoryId',
            displayColumn: 'name'
        },
        PrjExpensePolicy: {
            idColumn: 'policyId',
            displayColumn: 'name'
        },

        // ========================================
        // Projects - Billing
        // ========================================
        PrjBillingRate: {
            idColumn: 'rateId',
            displayColumn: 'name'
        },
        PrjBillingSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name'
        },
        PrjBillingMilestone: {
            idColumn: 'milestoneId',
            displayColumn: 'name'
        },
        PrjProjectInvoice: {
            idColumn: 'invoiceId',
            displayColumn: 'invoiceNumber',
            selectColumns: ['invoiceId', 'invoiceNumber'],
            displayLabel: 'Invoice'
        },
        PrjInvoiceLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        PrjRevenueRecognition: {
            idColumn: 'recognitionId',
            displayColumn: 'recognitionId'
        },
        PrjProjectBudget: {
            idColumn: 'budgetId',
            displayColumn: 'name'
        },

        // ========================================
        // Projects - Analytics
        // ========================================
        PrjStatusReport: {
            idColumn: 'statusId',
            displayColumn: 'statusId'
        },
        PrjEarnedValue: {
            idColumn: 'earnedValueId',
            displayColumn: 'earnedValueId'
        },
        PrjBudgetVariance: {
            idColumn: 'varianceId',
            displayColumn: 'varianceId'
        },
        PrjResourceForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastId'
        },
        PrjPortfolioView: {
            idColumn: 'viewId',
            displayColumn: 'name'
        },
        PrjProjectKPI: {
            idColumn: 'kpiId',
            displayColumn: 'kpiName'
        },
        PrjProjectIssue: {
            idColumn: 'issueId',
            displayColumn: 'title',
            selectColumns: ['issueId', 'title'],
            displayLabel: 'Issue'
        },

        // ========================================
        // Manufacturing - Engineering
        // ========================================
        MfgBom: {
            idColumn: 'bomId',
            displayColumn: 'name',
            selectColumns: ['bomId', 'name'],
            displayLabel: 'BOM'
        },
        MfgBomLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        MfgRouting: {
            idColumn: 'routingId',
            displayColumn: 'name',
            selectColumns: ['routingId', 'name'],
            displayLabel: 'Routing'
        },
        MfgRoutingOperation: {
            idColumn: 'operationId',
            displayColumn: 'name'
        },
        MfgEngChangeOrder: {
            idColumn: 'changeOrderId',
            displayColumn: 'ecoNumber',
            selectColumns: ['changeOrderId', 'ecoNumber', 'description'],
            displayFormat: function(item) {
                return item.ecoNumber + ' - ' + item.description;
            },
            displayLabel: 'ECO'
        },
        MfgEngChangeDetail: {
            idColumn: 'detailId',
            displayColumn: 'detailId'
        },

        // ========================================
        // Manufacturing - Production
        // ========================================
        MfgWorkOrder: {
            idColumn: 'workOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['workOrderId', 'orderNumber'],
            displayLabel: 'Work Order'
        },
        MfgWorkOrderOp: {
            idColumn: 'operationId',
            displayColumn: 'name'
        },
        MfgProductionOrder: {
            idColumn: 'prodOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['prodOrderId', 'orderNumber'],
            displayLabel: 'Production Order'
        },
        MfgProdOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        MfgProdBatch: {
            idColumn: 'batchId',
            displayColumn: 'batchNumber',
            selectColumns: ['batchId', 'batchNumber'],
            displayLabel: 'Batch'
        },
        MfgProdConsumption: {
            idColumn: 'consumptionId',
            displayColumn: 'consumptionId'
        },

        // ========================================
        // Manufacturing - Shop Floor
        // ========================================
        MfgWorkCenter: {
            idColumn: 'workCenterId',
            displayColumn: 'name',
            selectColumns: ['workCenterId', 'code', 'name'],
            displayFormat: function(item) {
                return item.code + ' - ' + item.name;
            },
            displayLabel: 'Work Center'
        },
        MfgWorkCenterCap: {
            idColumn: 'capacityId',
            displayColumn: 'capacityId'
        },
        MfgLaborEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        MfgMachineEntry: {
            idColumn: 'entryId',
            displayColumn: 'entryId'
        },
        MfgShiftSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name'],
            displayLabel: 'Shift'
        },
        MfgDowntimeEvent: {
            idColumn: 'eventId',
            displayColumn: 'eventId'
        },

        // ========================================
        // Manufacturing - Quality
        // ========================================
        MfgQualityPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Quality Plan'
        },
        MfgInspectionPoint: {
            idColumn: 'pointId',
            displayColumn: 'name'
        },
        MfgQualityInspection: {
            idColumn: 'inspectionId',
            displayColumn: 'inspectionNumber',
            selectColumns: ['inspectionId', 'inspectionNumber'],
            displayLabel: 'Inspection'
        },
        MfgTestResult: {
            idColumn: 'resultId',
            displayColumn: 'resultId'
        },
        MfgNCR: {
            idColumn: 'ncrId',
            displayColumn: 'ncrNumber',
            selectColumns: ['ncrId', 'ncrNumber'],
            displayLabel: 'NCR'
        },
        MfgNCRAction: {
            idColumn: 'actionId',
            displayColumn: 'actionId'
        },

        // ========================================
        // Manufacturing - Planning
        // ========================================
        MfgMrpRun: {
            idColumn: 'runId',
            displayColumn: 'name',
            selectColumns: ['runId', 'name'],
            displayLabel: 'MRP Run'
        },
        MfgMrpRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        MfgCapacityPlan: {
            idColumn: 'planId',
            displayColumn: 'name',
            selectColumns: ['planId', 'name'],
            displayLabel: 'Capacity Plan'
        },
        MfgCapacityLoad: {
            idColumn: 'loadId',
            displayColumn: 'loadId'
        },
        MfgProdSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'name',
            selectColumns: ['scheduleId', 'name'],
            displayLabel: 'Schedule'
        },
        MfgScheduleBlock: {
            idColumn: 'blockId',
            displayColumn: 'blockId'
        },

        // ========================================
        // Manufacturing - Costing
        // ========================================
        MfgStandardCost: {
            idColumn: 'costId',
            displayColumn: 'costId'
        },
        MfgCostRollup: {
            idColumn: 'rollupId',
            displayColumn: 'rollupId'
        },
        MfgActualCost: {
            idColumn: 'actualCostId',
            displayColumn: 'actualCostId'
        },
        MfgCostVariance: {
            idColumn: 'varianceId',
            displayColumn: 'varianceId'
        },
        MfgOverhead: {
            idColumn: 'overheadId',
            displayColumn: 'name',
            selectColumns: ['overheadId', 'name'],
            displayLabel: 'Overhead'
        },
        MfgOverheadAlloc: {
            idColumn: 'allocationId',
            displayColumn: 'allocationId'
        }

        // ========================================
        // Future: Financial models
        // ========================================
    };

    /**
     * Get configuration for a model
     * @param {string} modelName - The model name (e.g., 'Employee')
     * @returns {Object|null} Configuration object or null
     */
    Layer8MReferenceRegistry.get = function(modelName) {
        return this[modelName] || null;
    };

    /**
     * Check if a model is registered
     * @param {string} modelName - The model name
     * @returns {boolean} True if model exists
     */
    Layer8MReferenceRegistry.has = function(modelName) {
        return this.hasOwnProperty(modelName) && typeof this[modelName] === 'object';
    };

    /**
     * Get all registered model names
     * @returns {string[]} Array of model names
     */
    Layer8MReferenceRegistry.getModelNames = function() {
        return Object.keys(this).filter(key => typeof this[key] === 'object');
    };

})();
