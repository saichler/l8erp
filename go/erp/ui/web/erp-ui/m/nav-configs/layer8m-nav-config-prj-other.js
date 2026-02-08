/*
© 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
/**
 * Mobile Navigation Configuration - Projects, BI, Documents, Ecommerce, System Modules
 */
(function() {
    'use strict';

    window.LAYER8M_NAV_CONFIG_PRJ_OTHER = {
        // Projects Sub-Modules (Level 2)
        projects: {
            subModules: [
                { key: 'planning', label: 'Planning', icon: 'projects' },
                { key: 'resources', label: 'Resources', icon: 'hcm' },
                { key: 'timeexpense', label: 'Time & Expense', icon: 'time' },
                { key: 'billing', label: 'Billing', icon: 'financial' },
                { key: 'analytics', label: 'Analytics', icon: 'bi' }
            ],

            services: {
                'planning': [
                    { key: 'projects', label: 'Projects', icon: 'projects', endpoint: '/90/PrjProj', model: 'PrjProject', idField: 'projectId' },
                    { key: 'templates', label: 'Templates', icon: 'documents', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate', idField: 'templateId' },
                    { key: 'phases', label: 'Phases', icon: 'demand-planning', endpoint: '/90/PrjPhase', model: 'PrjPhase', idField: 'phaseId' },
                    { key: 'tasks', label: 'Tasks', icon: 'jobs', endpoint: '/90/PrjTask', model: 'PrjTask', idField: 'taskId' },
                    { key: 'milestones', label: 'Milestones', icon: 'talent', endpoint: '/90/PrjMilstn', model: 'PrjMilestone', idField: 'milestoneId' },
                    { key: 'deliverables', label: 'Deliverables', icon: 'inventory', endpoint: '/90/PrjDeliv', model: 'PrjDeliverable', idField: 'deliverableId' },
                    { key: 'dependencies', label: 'Dependencies', icon: 'scm', endpoint: '/90/PrjDepend', model: 'PrjDependency', idField: 'dependencyId' },
                    { key: 'risks', label: 'Risks', icon: 'compliance', endpoint: '/90/PrjRisk', model: 'PrjRisk', idField: 'riskId' }
                ],
                'resources': [
                    { key: 'resource-pools', label: 'Resource Pools', icon: 'organizations', endpoint: '/90/PrjResPool', model: 'PrjResourcePool', idField: 'poolId' },
                    { key: 'resources', label: 'Resources', icon: 'hcm', endpoint: '/90/PrjRes', model: 'PrjResource', idField: 'resourceId' },
                    { key: 'resource-skills', label: 'Skills', icon: 'learning', endpoint: '/90/PrjResSkl', model: 'PrjResourceSkill', idField: 'skillId' },
                    { key: 'allocations', label: 'Allocations', icon: 'demand-planning', endpoint: '/90/PrjAlloc', model: 'PrjAllocation', idField: 'allocationId' },
                    { key: 'bookings', label: 'Bookings', icon: 'time', endpoint: '/90/PrjBooking', model: 'PrjBooking', idField: 'bookingId' },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: 'demand-planning', endpoint: '/90/PrjCapPlan', model: 'PrjCapacityPlan', idField: 'planId' },
                    { key: 'utilizations', label: 'Utilizations', icon: 'bi', endpoint: '/90/PrjUtil', model: 'PrjUtilization', idField: 'utilizationId' }
                ],
                'timeexpense': [
                    { key: 'timesheets', label: 'Timesheets', icon: 'time', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet', idField: 'timesheetId' },
                    { key: 'timesheet-entries', label: 'Time Entries', icon: 'time', endpoint: '/90/PrjTmEntry', model: 'PrjTimesheetEntry', idField: 'entryId' },
                    { key: 'expense-reports', label: 'Expense Reports', icon: 'financial', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport', idField: 'reportId' },
                    { key: 'expense-entries', label: 'Expenses', icon: 'financial', endpoint: '/90/PrjExpEnt', model: 'PrjExpenseEntry', idField: 'entryId' },
                    { key: 'approval-rules', label: 'Approval Rules', icon: 'jobs', endpoint: '/90/PrjApprRl', model: 'PrjApprovalRule', idField: 'ruleId' },
                    { key: 'expense-categories', label: 'Categories', icon: 'inventory', endpoint: '/90/PrjExpCat', model: 'PrjExpenseCategory', idField: 'categoryId' },
                    { key: 'expense-policies', label: 'Policies', icon: 'documents', endpoint: '/90/PrjExpPol', model: 'PrjExpensePolicy', idField: 'policyId' }
                ],
                'billing': [
                    { key: 'billing-rates', label: 'Billing Rates', icon: 'financial', endpoint: '/90/PrjBillRt', model: 'PrjBillingRate', idField: 'rateId' },
                    { key: 'billing-schedules', label: 'Schedules', icon: 'time', endpoint: '/90/PrjBillSch', model: 'PrjBillingSchedule', idField: 'scheduleId' },
                    { key: 'billing-milestones', label: 'Milestones', icon: 'talent', endpoint: '/90/PrjBillMls', model: 'PrjBillingMilestone', idField: 'milestoneId' },
                    { key: 'invoices', label: 'Invoices', icon: 'documents', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice', idField: 'invoiceId' },
                    { key: 'invoice-lines', label: 'Invoice Lines', icon: 'documents', endpoint: '/90/PrjInvLine', model: 'PrjInvoiceLine', idField: 'lineId' },
                    { key: 'revenue-recognition', label: 'Revenue', icon: 'demand-planning', endpoint: '/90/PrjRevRec', model: 'PrjRevenueRecognition', idField: 'recognitionId' },
                    { key: 'budgets', label: 'Budgets', icon: 'financial', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget', idField: 'budgetId' }
                ],
                'analytics': [
                    { key: 'status-reports', label: 'Status Reports', icon: 'documents', endpoint: '/90/PrjStatus', model: 'PrjStatusReport', idField: 'statusId' },
                    { key: 'earned-values', label: 'Earned Value', icon: 'demand-planning', endpoint: '/90/PrjEV', model: 'PrjEarnedValue', idField: 'earnedValueId' },
                    { key: 'budget-variances', label: 'Variances', icon: 'bi', endpoint: '/90/PrjBudVar', model: 'PrjBudgetVariance', idField: 'varianceId' },
                    { key: 'resource-forecasts', label: 'Forecasts', icon: 'demand-planning', endpoint: '/90/PrjResFcst', model: 'PrjResourceForecast', idField: 'forecastId' },
                    { key: 'portfolio-views', label: 'Portfolio', icon: 'projects', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView', idField: 'viewId' },
                    { key: 'kpis', label: 'KPIs', icon: 'talent', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI', idField: 'kpiId' },
                    { key: 'issues', label: 'Issues', icon: 'compliance', endpoint: '/90/PrjIssue', model: 'PrjProjectIssue', idField: 'issueId' }
                ]
            }
        },

        // BI Sub-Modules (Level 2)
        bi: {
            subModules: [
                { key: 'reporting', label: 'Reporting', icon: 'bi' },
                { key: 'dashboards', label: 'Dashboards', icon: 'bi' },
                { key: 'analytics', label: 'Analytics', icon: 'bi' },
                { key: 'datamanagement', label: 'Data Management', icon: 'bi' }
            ],

            services: {
                'reporting': [
                    { key: 'reports', label: 'Reports', icon: 'documents', endpoint: '/35/BiReport', model: 'BiReport', idField: 'reportId' },
                    { key: 'report-templates', label: 'Templates', icon: 'documents', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate', idField: 'templateId' },
                    { key: 'report-schedules', label: 'Schedules', icon: 'time', endpoint: '/35/BiRptSched', model: 'BiReportSchedule', idField: 'scheduleId' },
                    { key: 'report-executions', label: 'Executions', icon: 'jobs', endpoint: '/35/BiRptExec', model: 'BiReportExecution', idField: 'executionId' },
                    { key: 'report-accesses', label: 'Access', icon: 'security', endpoint: '/35/BiRptAccs', model: 'BiReportAccess', idField: 'accessId' },
                    { key: 'report-subscriptions', label: 'Subscriptions', icon: 'hcm', endpoint: '/35/BiRptSub', model: 'BiReportSubscription', idField: 'subscriptionId' }
                ],
                'dashboards': [
                    { key: 'dashboards', label: 'Dashboards', icon: 'bi', endpoint: '/35/BiDashbrd', model: 'BiDashboard', idField: 'dashboardId' },
                    { key: 'widgets', label: 'Widgets', icon: 'inventory', endpoint: '/35/BiWidget', model: 'BiDashboardWidget', idField: 'widgetId' },
                    { key: 'kpis', label: 'KPIs', icon: 'talent', endpoint: '/35/BiKPI', model: 'BiKPI', idField: 'kpiId' },
                    { key: 'kpi-thresholds', label: 'Thresholds', icon: 'compliance', endpoint: '/35/BiKPIThrs', model: 'BiKPIThreshold', idField: 'thresholdId' },
                    { key: 'drilldowns', label: 'Drilldowns', icon: 'demand-planning', endpoint: '/35/BiDrill', model: 'BiDrilldown', idField: 'drilldownId' },
                    { key: 'dashboard-shares', label: 'Shares', icon: 'scm', endpoint: '/35/BiDashShr', model: 'BiDashboardShare', idField: 'shareId' }
                ],
                'analytics': [
                    { key: 'data-cubes', label: 'Data Cubes', icon: 'inventory', endpoint: '/35/BiCube', model: 'BiDataCube', idField: 'cubeId' },
                    { key: 'analysis-models', label: 'Models', icon: 'learning', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel', idField: 'modelId' },
                    { key: 'predictions', label: 'Predictions', icon: 'talent', endpoint: '/35/BiPredict', model: 'BiPrediction', idField: 'predictionId' },
                    { key: 'trend-analyses', label: 'Trends', icon: 'demand-planning', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis', idField: 'analysisId' },
                    { key: 'scenarios', label: 'Scenarios', icon: 'documents', endpoint: '/35/BiScenario', model: 'BiScenario', idField: 'scenarioId' },
                    { key: 'benchmarks', label: 'Benchmarks', icon: 'financial', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark', idField: 'benchmarkId' }
                ],
                'datamanagement': [
                    { key: 'data-sources', label: 'Data Sources', icon: 'scm', endpoint: '/35/BiDataSrc', model: 'BiDataSource', idField: 'sourceId' },
                    { key: 'etl-jobs', label: 'ETL Jobs', icon: 'jobs', endpoint: '/35/BiETLJob', model: 'BiETLJob', idField: 'jobId' },
                    { key: 'etl-schedules', label: 'ETL Schedules', icon: 'time', endpoint: '/35/BiETLSched', model: 'BiETLSchedule', idField: 'scheduleId' },
                    { key: 'data-quality-rules', label: 'Quality Rules', icon: 'compliance', endpoint: '/35/BiDQRule', model: 'BiDataQualityRule', idField: 'ruleId' },
                    { key: 'master-data-configs', label: 'Master Data', icon: 'organizations', endpoint: '/35/BiMDConfig', model: 'BiMasterDataConfig', idField: 'configId' },
                    { key: 'data-governances', label: 'Governance', icon: 'security', endpoint: '/35/BiDataGov', model: 'BiDataGovernance', idField: 'governanceId' }
                ]
            }
        },

        // Documents Sub-Modules (Level 2)
        documents: {
            subModules: [
                { key: 'storage', label: 'Storage', icon: 'documents' },
                { key: 'workflow', label: 'Workflow', icon: 'projects' },
                { key: 'integration', label: 'Integration', icon: 'scm' },
                { key: 'compliance', label: 'Compliance', icon: 'compliance' }
            ],

            services: {
                'storage': [
                    { key: 'documents', label: 'Documents', icon: 'documents', endpoint: '/45/DocDoc', model: 'DocDocument', idField: 'documentId' },
                    { key: 'folders', label: 'Folders', icon: 'job-families', endpoint: '/45/DocFolder', model: 'DocFolder', idField: 'folderId' },
                    { key: 'categories', label: 'Categories', icon: 'inventory', endpoint: '/45/DocCategry', model: 'DocCategory', idField: 'categoryId' },
                    { key: 'tags', label: 'Tags', icon: 'benefits', endpoint: '/45/DocTag', model: 'DocTag', idField: 'tagId' },
                    { key: 'versions', label: 'Versions', icon: 'time', endpoint: '/45/DocVersion', model: 'DocDocumentVersion', idField: 'versionId' }
                ],
                'workflow': [
                    { key: 'checkouts', label: 'Checkouts', icon: 'procurement', endpoint: '/45/DocChkout', model: 'DocCheckout', idField: 'checkoutId' },
                    { key: 'approval-workflows', label: 'Approvals', icon: 'projects', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow', idField: 'workflowId' },
                    { key: 'workflow-steps', label: 'Steps', icon: 'jobs', endpoint: '/45/DocWfStep', model: 'DocWorkflowStep', idField: 'stepId' },
                    { key: 'signatures', label: 'Signatures', icon: 'hcm', endpoint: '/45/DocSign', model: 'DocSignature', idField: 'signatureId' },
                    { key: 'review-comments', label: 'Comments', icon: 'crm', endpoint: '/45/DocReview', model: 'DocReviewComment', idField: 'commentId' }
                ],
                'integration': [
                    { key: 'attachments', label: 'Attachments', icon: 'documents', endpoint: '/45/DocAttach', model: 'DocAttachment', idField: 'attachmentId' },
                    { key: 'templates', label: 'Templates', icon: 'learning', endpoint: '/45/DocTmpl', model: 'DocTemplate', idField: 'templateId' },
                    { key: 'template-fields', label: 'Fields', icon: 'positions', endpoint: '/45/DocTmplFld', model: 'DocTemplateField', idField: 'fieldId' },
                    { key: 'email-captures', label: 'Email Capture', icon: 'crm', endpoint: '/45/DocEmail', model: 'DocEmailCapture', idField: 'captureId' },
                    { key: 'scan-jobs', label: 'Scan Jobs', icon: 'jobs', endpoint: '/45/DocScan', model: 'DocScanJob', idField: 'scanJobId' }
                ],
                'compliance': [
                    { key: 'retention-policies', label: 'Retention', icon: 'time', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy', idField: 'policyId' },
                    { key: 'legal-holds', label: 'Legal Holds', icon: 'compliance', endpoint: '/45/DocLglHold', model: 'DocLegalHold', idField: 'holdId' },
                    { key: 'access-logs', label: 'Access Logs', icon: 'bi', endpoint: '/45/DocAccLog', model: 'DocAccessLog', idField: 'logId' },
                    { key: 'archive-jobs', label: 'Archives', icon: 'warehouse', endpoint: '/45/DocArchive', model: 'DocArchiveJob', idField: 'jobId' },
                    { key: 'audit-trails', label: 'Audit Trails', icon: 'security', endpoint: '/45/DocAudit', model: 'DocAuditTrail', idField: 'trailId' }
                ]
            }
        },

        // E-Commerce Sub-Modules (Level 2)
        ecommerce: {
            subModules: [
                { key: 'catalog', label: 'Catalog', icon: 'inventory' },
                { key: 'orders', label: 'Orders', icon: 'procurement' },
                { key: 'customers', label: 'Customers', icon: 'hcm' },
                { key: 'promotions', label: 'Promotions', icon: 'sales' }
            ],

            services: {
                'catalog': [
                    { key: 'products', label: 'Products', icon: 'inventory', endpoint: '/100/EcomProd', model: 'EcomProduct', idField: 'productId' },
                    { key: 'categories', label: 'Categories', icon: 'job-families', endpoint: '/100/EcomCat', model: 'EcomCategory', idField: 'categoryId' },
                    { key: 'attributes', label: 'Attributes', icon: 'positions', endpoint: '/100/EcomAttr', model: 'EcomAttribute', idField: 'attributeId' },
                    { key: 'images', label: 'Images', icon: 'documents', endpoint: '/100/EcomImage', model: 'EcomImage', idField: 'imageId' },
                    { key: 'variants', label: 'Variants', icon: 'inventory', endpoint: '/100/EcomVar', model: 'EcomVariant', idField: 'variantId' }
                ],
                'orders': [
                    { key: 'orders', label: 'Orders', icon: 'procurement', endpoint: '/100/EcomOrder', model: 'EcomOrder', idField: 'orderId' },
                    { key: 'order-lines', label: 'Order Lines', icon: 'positions', endpoint: '/100/EcomOrdLn', model: 'EcomOrderLine', idField: 'lineId' },
                    { key: 'order-statuses', label: 'Status History', icon: 'time', endpoint: '/100/EcomOrdSts', model: 'EcomOrderStatusHistory', idField: 'statusId' },
                    { key: 'returns', label: 'Returns', icon: 'logistics', endpoint: '/100/EcomReturn', model: 'EcomReturn', idField: 'returnId' },
                    { key: 'return-lines', label: 'Return Lines', icon: 'positions', endpoint: '/100/EcomRetLn', model: 'EcomReturnLine', idField: 'lineId' }
                ],
                'customers': [
                    { key: 'customers', label: 'Customers', icon: 'hcm', endpoint: '/100/EcomCust', model: 'EcomCustomer', idField: 'customerId' },
                    { key: 'addresses', label: 'Addresses', icon: 'warehouse', endpoint: '/100/EcomAddr', model: 'EcomCustomerAddress', idField: 'addressId' },
                    { key: 'wishlists', label: 'Wishlists', icon: 'benefits', endpoint: '/100/EcomWish', model: 'EcomWishlist', idField: 'wishlistId' },
                    { key: 'wishlist-items', label: 'Wishlist Items', icon: 'inventory', endpoint: '/100/EcomWishIt', model: 'EcomWishlistItem', idField: 'itemId' },
                    { key: 'carts', label: 'Carts', icon: 'ecommerce', endpoint: '/100/EcomCart', model: 'EcomCart', idField: 'cartId' }
                ],
                'promotions': [
                    { key: 'promotions', label: 'Promotions', icon: 'sales', endpoint: '/100/EcomPromo', model: 'EcomPromotion', idField: 'promotionId' },
                    { key: 'coupons', label: 'Coupons', icon: 'benefits', endpoint: '/100/EcomCoupon', model: 'EcomCoupon', idField: 'couponId' },
                    { key: 'price-rules', label: 'Price Rules', icon: 'financial', endpoint: '/100/EcomPrcRl', model: 'EcomPriceRule', idField: 'ruleId' },
                    { key: 'shipping-methods', label: 'Shipping', icon: 'logistics', endpoint: '/100/EcomShip', model: 'EcomShippingMethod', idField: 'methodId' },
                    { key: 'payment-methods', label: 'Payment', icon: 'financial', endpoint: '/100/EcomPay', model: 'EcomPaymentMethod', idField: 'methodId' }
                ]
            }
        },

        // Compliance Sub-Modules (Level 2)
        compliance: {
            subModules: [
                { key: 'regulatory', label: 'Regulatory', icon: 'compliance' },
                { key: 'controls', label: 'Internal Controls', icon: 'compliance' },
                { key: 'risk', label: 'Risk Management', icon: 'compliance' },
                { key: 'audit', label: 'Audit Management', icon: 'compliance' }
            ],

            services: {
                'regulatory': [
                    { key: 'regulations', label: 'Regulations', icon: 'documents', endpoint: '/110/CompReg', model: 'CompRegulation', idField: 'regulationId' },
                    { key: 'requirements', label: 'Requirements', icon: 'documents', endpoint: '/110/CompReq', model: 'CompRequirement', idField: 'requirementId' },
                    { key: 'compliance-statuses', label: 'Compliance Status', icon: 'compliance', endpoint: '/110/CompStatus', model: 'CompComplianceStatus', idField: 'statusId' },
                    { key: 'certifications', label: 'Certifications', icon: 'talent', endpoint: '/110/CompCert', model: 'CompCertification', idField: 'certificationId' },
                    { key: 'violations', label: 'Violations', icon: 'compliance', endpoint: '/110/CompVioltn', model: 'CompViolationRecord', idField: 'violationId' }
                ],
                'controls': [
                    { key: 'controls', label: 'Controls', icon: 'compliance', endpoint: '/110/CompCtrl', model: 'CompControl', idField: 'controlId' },
                    { key: 'assessments', label: 'Assessments', icon: 'bi', endpoint: '/110/CompCtrlAs', model: 'CompControlAssessment', idField: 'assessmentId' },
                    { key: 'policies', label: 'Policies', icon: 'documents', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument', idField: 'documentId' },
                    { key: 'approval-matrices', label: 'Approval Matrices', icon: 'projects', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix', idField: 'matrixId' },
                    { key: 'segregation-rules', label: 'Segregation Rules', icon: 'scm', endpoint: '/110/CompSegrul', model: 'CompSegregationRule', idField: 'ruleId' }
                ],
                'risk': [
                    { key: 'risk-registers', label: 'Risk Registers', icon: 'documents', endpoint: '/110/CompRisk', model: 'CompRiskRegister', idField: 'riskId' },
                    { key: 'risk-assessments', label: 'Risk Assessments', icon: 'bi', endpoint: '/110/CompRiskAs', model: 'CompRiskAssessment', idField: 'assessmentId' },
                    { key: 'incidents', label: 'Incidents', icon: 'compliance', endpoint: '/110/CompIncdnt', model: 'CompIncident', idField: 'incidentId' },
                    { key: 'mitigation-plans', label: 'Mitigation Plans', icon: 'projects', endpoint: '/110/CompMitig', model: 'CompMitigationPlan', idField: 'planId' },
                    { key: 'insurance-policies', label: 'Insurance Policies', icon: 'documents', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy', idField: 'insuranceId' }
                ],
                'audit': [
                    { key: 'audit-schedules', label: 'Audit Schedules', icon: 'time', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule', idField: 'scheduleId' },
                    { key: 'audit-findings', label: 'Audit Findings', icon: 'compliance', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding', idField: 'findingId' },
                    { key: 'remediation-actions', label: 'Remediation Actions', icon: 'projects', endpoint: '/110/CompRemed', model: 'CompRemediationAction', idField: 'actionId' },
                    { key: 'audit-reports', label: 'Audit Reports', icon: 'documents', endpoint: '/110/CompAudRpt', model: 'CompAuditReport', idField: 'reportId' },
                    { key: 'compliance-reports', label: 'Compliance Reports', icon: 'documents', endpoint: '/110/CompCmpRpt', model: 'CompComplianceReport', idField: 'reportId' }
                ]
            }
        },

        // System Sub-Modules (Level 2)
        system: {
            subModules: [
                { key: 'health', label: 'Health', icon: 'health' },
                { key: 'security', label: 'Security', icon: 'security' },
                { key: 'modules', label: 'Modules', icon: 'modules' }
            ],

            services: {
                'health': [
                    { key: 'health-monitor', label: 'Health Monitor', icon: 'health', endpoint: '/0/Health', model: 'L8Health', idField: 'service', readOnly: true }
                ],
                'security': [
                    { key: 'users', label: 'Users', icon: 'users', endpoint: '/73/users', model: 'L8User', idField: 'userId' },
                    { key: 'roles', label: 'Roles', icon: 'roles', endpoint: '/74/roles', model: 'L8Role', idField: 'roleId' },
                    { key: 'credentials', label: 'Credentials', icon: 'credentials', endpoint: '/75/Creds', model: 'L8Credentials', idField: 'id' }
                ],
                'modules': [
                    { key: 'module-settings', label: 'Module Settings', icon: 'modules', customInit: 'L8SysModules', customContainer: 'modules-settings-container', subtitle: 'Enable or disable ERP modules' }
                ]
            }
        }
    };
})();
