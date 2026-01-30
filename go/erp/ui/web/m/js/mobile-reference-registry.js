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
 * This must match the desktop ERPReferenceRegistry EXACTLY.
 */
(function() {
    'use strict';

    window.MobileReferenceRegistry = {
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
        }

        // ========================================
        // SCM - Procurement Models
        // ========================================
        PurchaseRequisition: {
            idColumn: 'requisitionId',
            displayColumn: 'requisitionNumber',
            selectColumns: ['requisitionId', 'requisitionNumber'],
            displayLabel: 'Requisition'
        },
        RequisitionLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        RequestForQuotation: {
            idColumn: 'rfqId',
            displayColumn: 'rfqNumber',
            selectColumns: ['rfqId', 'rfqNumber'],
            displayLabel: 'RFQ'
        },
        PurchaseOrder: {
            idColumn: 'purchaseOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['purchaseOrderId', 'orderNumber'],
            displayLabel: 'Purchase Order'
        },
        PurchaseOrderLine: {
            idColumn: 'lineId',
            displayColumn: 'lineId'
        },
        BlanketOrder: {
            idColumn: 'blanketOrderId',
            displayColumn: 'orderNumber',
            selectColumns: ['blanketOrderId', 'orderNumber'],
            displayLabel: 'Blanket Order'
        },
        SupplierScorecard: {
            idColumn: 'scorecardId',
            displayColumn: 'scorecardId'
        },

        // ========================================
        // SCM - Inventory Models
        // ========================================
        Item: {
            idColumn: 'itemId',
            displayColumn: 'name',
            selectColumns: ['itemId', 'itemNumber', 'name'],
            displayFormat: function(item) {
                return item.itemNumber + ' - ' + item.name;
            },
            displayLabel: 'Item'
        },
        ItemCategory: {
            idColumn: 'categoryId',
            displayColumn: 'categoryName'
        },
        StockMovement: {
            idColumn: 'movementId',
            displayColumn: 'movementId'
        },
        LotNumber: {
            idColumn: 'lotId',
            displayColumn: 'lotNumber'
        },
        SerialNumber: {
            idColumn: 'serialId',
            displayColumn: 'serialNumber'
        },
        CycleCount: {
            idColumn: 'cycleCountId',
            displayColumn: 'cycleCountId'
        },
        ReorderPoint: {
            idColumn: 'reorderPointId',
            displayColumn: 'reorderPointId'
        },
        InventoryValuation: {
            idColumn: 'valuationId',
            displayColumn: 'valuationId'
        },

        // ========================================
        // SCM - Warehouse Management Models
        // ========================================
        Warehouse: {
            idColumn: 'warehouseId',
            displayColumn: 'name',
            selectColumns: ['warehouseId', 'warehouseCode', 'name'],
            displayFormat: function(item) {
                return item.warehouseCode + ' - ' + item.name;
            },
            displayLabel: 'Warehouse'
        },
        Bin: {
            idColumn: 'binId',
            displayColumn: 'binCode'
        },
        ReceivingOrder: {
            idColumn: 'receivingOrderId',
            displayColumn: 'orderNumber'
        },
        PutawayTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        PickTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        PackTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        ShipTask: {
            idColumn: 'taskId',
            displayColumn: 'taskId'
        },
        WavePlan: {
            idColumn: 'wavePlanId',
            displayColumn: 'waveName'
        },
        DockSchedule: {
            idColumn: 'scheduleId',
            displayColumn: 'scheduleId'
        },

        // ========================================
        // SCM - Logistics Models
        // ========================================
        Carrier: {
            idColumn: 'carrierId',
            displayColumn: 'name',
            selectColumns: ['carrierId', 'carrierCode', 'name'],
            displayFormat: function(item) {
                return item.carrierCode + ' - ' + item.name;
            },
            displayLabel: 'Carrier'
        },
        FreightRate: {
            idColumn: 'rateId',
            displayColumn: 'rateId'
        },
        Shipment: {
            idColumn: 'shipmentId',
            displayColumn: 'shipmentNumber',
            selectColumns: ['shipmentId', 'shipmentNumber'],
            displayLabel: 'Shipment'
        },
        Route: {
            idColumn: 'routeId',
            displayColumn: 'routeName'
        },
        LoadPlan: {
            idColumn: 'loadPlanId',
            displayColumn: 'planName'
        },
        DeliveryProof: {
            idColumn: 'proofId',
            displayColumn: 'proofId'
        },
        FreightAudit: {
            idColumn: 'auditId',
            displayColumn: 'auditId'
        },
        ReturnAuthorization: {
            idColumn: 'rmaId',
            displayColumn: 'rmaNumber',
            selectColumns: ['rmaId', 'rmaNumber'],
            displayLabel: 'RMA'
        },

        // ========================================
        // SCM - Demand Planning Models
        // ========================================
        DemandForecast: {
            idColumn: 'forecastId',
            displayColumn: 'forecastName',
            selectColumns: ['forecastId', 'forecastName'],
            displayLabel: 'Forecast'
        },
        ForecastModel: {
            idColumn: 'modelId',
            displayColumn: 'modelName'
        },
        DemandPlan: {
            idColumn: 'planId',
            displayColumn: 'planName'
        },
        PromotionalPlan: {
            idColumn: 'planId',
            displayColumn: 'planName'
        },
        NewProductPlan: {
            idColumn: 'planId',
            displayColumn: 'productName'
        },
        ForecastAccuracy: {
            idColumn: 'accuracyId',
            displayColumn: 'accuracyId'
        },

        // ========================================
        // SCM - Supply Planning Models
        // ========================================
        MaterialRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        DistributionRequirement: {
            idColumn: 'requirementId',
            displayColumn: 'requirementId'
        },
        SupplyPlan: {
            idColumn: 'planId',
            displayColumn: 'planName',
            selectColumns: ['planId', 'planName'],
            displayLabel: 'Supply Plan'
        },
        SupplierCollaboration: {
            idColumn: 'collaborationId',
            displayColumn: 'collaborationId'
        },
        SafetyStock: {
            idColumn: 'safetyStockId',
            displayColumn: 'safetyStockId'
        },
        LeadTime: {
            idColumn: 'leadTimeId',
            displayColumn: 'leadTimeId'
        }

        // ========================================
        // Future: Financial, Manufacturing models
        // ========================================
    };

    /**
     * Get configuration for a model
     * @param {string} modelName - The model name (e.g., 'Employee')
     * @returns {Object|null} Configuration object or null
     */
    MobileReferenceRegistry.get = function(modelName) {
        return this[modelName] || null;
    };

    /**
     * Check if a model is registered
     * @param {string} modelName - The model name
     * @returns {boolean} True if model exists
     */
    MobileReferenceRegistry.has = function(modelName) {
        return this.hasOwnProperty(modelName) && typeof this[modelName] === 'object';
    };

    /**
     * Get all registered model names
     * @returns {string[]} Array of model names
     */
    MobileReferenceRegistry.getModelNames = function() {
        return Object.keys(this).filter(key => typeof this[key] === 'object');
    };

})();
