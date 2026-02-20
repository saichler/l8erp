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
                    { key: 'projects', label: 'Projects', icon: 'projects', endpoint: '/90/PrjProj', model: 'PrjProject', idField: 'projectId', supportedViews: ['table', 'kanban', 'gantt', 'timeline'] },
                    { key: 'templates', label: 'Templates', icon: 'documents', endpoint: '/90/PrjProjTpl', model: 'PrjProjectTemplate', idField: 'templateId' }
                ],
                'resources': [
                    { key: 'resource-pools', label: 'Resource Pools', icon: 'organizations', endpoint: '/90/PrjResPool', model: 'PrjResourcePool', idField: 'poolId' },
                    { key: 'resources', label: 'Resources', icon: 'hcm', endpoint: '/90/PrjRes', model: 'PrjResource', idField: 'resourceId' },
                    { key: 'allocations', label: 'Allocations', icon: 'demand-planning', endpoint: '/90/PrjAlloc', model: 'PrjAllocation', idField: 'allocationId' },
                    { key: 'bookings', label: 'Bookings', icon: 'time', endpoint: '/90/PrjBooking', model: 'PrjBooking', idField: 'bookingId', supportedViews: ['table', 'calendar'] },
                    { key: 'capacity-plans', label: 'Capacity Plans', icon: 'demand-planning', endpoint: '/90/PrjCapPlan', model: 'PrjCapacityPlan', idField: 'planId' },
                    { key: 'utilizations', label: 'Utilizations', icon: 'bi', endpoint: '/90/PrjUtil', model: 'PrjUtilization', idField: 'utilizationId' }
                ],
                'timeexpense': [
                    { key: 'timesheets', label: 'Timesheets', icon: 'time', endpoint: '/90/PrjTmSheet', model: 'PrjTimesheet', idField: 'timesheetId' },
                    { key: 'expense-reports', label: 'Expense Reports', icon: 'financial', endpoint: '/90/PrjExpRpt', model: 'PrjExpenseReport', idField: 'reportId' },
                    { key: 'approval-rules', label: 'Approval Rules', icon: 'jobs', endpoint: '/90/PrjApprRl', model: 'PrjApprovalRule', idField: 'ruleId' },
                    { key: 'expense-categories', label: 'Categories', icon: 'inventory', endpoint: '/90/PrjExpCat', model: 'PrjExpenseCategory', idField: 'categoryId' },
                    { key: 'expense-policies', label: 'Policies', icon: 'documents', endpoint: '/90/PrjExpPol', model: 'PrjExpensePolicy', idField: 'policyId' }
                ],
                'billing': [
                    { key: 'billing-rates', label: 'Billing Rates', icon: 'financial', endpoint: '/90/PrjBillRt', model: 'PrjBillingRate', idField: 'rateId' },
                    { key: 'billing-schedules', label: 'Schedules', icon: 'time', endpoint: '/90/PrjBillSch', model: 'PrjBillingSchedule', idField: 'scheduleId' },
                    { key: 'invoices', label: 'Invoices', icon: 'documents', endpoint: '/90/PrjInvoice', model: 'PrjProjectInvoice', idField: 'invoiceId' },
                    { key: 'revenue-recognition', label: 'Revenue', icon: 'demand-planning', endpoint: '/90/PrjRevRec', model: 'PrjRevenueRecognition', idField: 'recognitionId' },
                    { key: 'budgets', label: 'Budgets', icon: 'financial', endpoint: '/90/PrjBudget', model: 'PrjProjectBudget', idField: 'budgetId' }
                ],
                'analytics': [
                    { key: 'status-reports', label: 'Status Reports', icon: 'documents', endpoint: '/90/PrjStatus', model: 'PrjStatusReport', idField: 'statusId', supportedViews: ['table', 'chart'] },
                    { key: 'portfolio-views', label: 'Portfolio', icon: 'projects', endpoint: '/90/PrjPortflo', model: 'PrjPortfolioView', idField: 'viewId', supportedViews: ['table', 'chart'] },
                    { key: 'kpis', label: 'KPIs', icon: 'talent', endpoint: '/90/PrjKPI', model: 'PrjProjectKPI', idField: 'kpiId', supportedViews: ['table', 'chart'] }
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
                    { key: 'report-templates', label: 'Templates', icon: 'documents', endpoint: '/35/BiRptTpl', model: 'BiReportTemplate', idField: 'templateId' }
                ],
                'dashboards': [
                    { key: 'dashboards', label: 'Dashboards', icon: 'bi', endpoint: '/35/BiDashbrd', model: 'BiDashboard', idField: 'dashboardId' },
                    { key: 'kpis', label: 'KPIs', icon: 'talent', endpoint: '/35/BiKPI', model: 'BiKPI', idField: 'kpiId', supportedViews: ['table', 'chart'] }
                ],
                'analytics': [
                    { key: 'data-cubes', label: 'Data Cubes', icon: 'inventory', endpoint: '/35/BiCube', model: 'BiDataCube', idField: 'cubeId' },
                    { key: 'analysis-models', label: 'Models', icon: 'learning', endpoint: '/35/BiAnaModel', model: 'BiAnalysisModel', idField: 'modelId' },
                    { key: 'trend-analyses', label: 'Trends', icon: 'demand-planning', endpoint: '/35/BiTrend', model: 'BiTrendAnalysis', idField: 'analysisId', supportedViews: ['table', 'chart'] },
                    { key: 'scenarios', label: 'Scenarios', icon: 'documents', endpoint: '/35/BiScenario', model: 'BiScenario', idField: 'scenarioId' },
                    { key: 'benchmarks', label: 'Benchmarks', icon: 'financial', endpoint: '/35/BiBenchmrk', model: 'BiBenchmark', idField: 'benchmarkId', supportedViews: ['table', 'chart'] }
                ],
                'datamanagement': [
                    { key: 'data-sources', label: 'Data Sources', icon: 'scm', endpoint: '/35/BiDataSrc', model: 'BiDataSource', idField: 'sourceId' },
                    { key: 'etl-jobs', label: 'ETL Jobs', icon: 'jobs', endpoint: '/35/BiETLJob', model: 'BiETLJob', idField: 'jobId' },
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
                    { key: 'folders', label: 'Folders', icon: 'job-families', endpoint: '/45/DocFolder', model: 'DocFolder', idField: 'folderId', supportedViews: ['table', 'tree'] },
                    { key: 'categories', label: 'Categories', icon: 'inventory', endpoint: '/45/DocCategry', model: 'DocCategory', idField: 'categoryId', supportedViews: ['table', 'tree'] },
                    { key: 'tags', label: 'Tags', icon: 'benefits', endpoint: '/45/DocTag', model: 'DocTag', idField: 'tagId' }
                ],
                'workflow': [
                    { key: 'approval-workflows', label: 'Approvals', icon: 'projects', endpoint: '/45/DocAprvWf', model: 'DocApprovalWorkflow', idField: 'workflowId' }
                ],
                'integration': [
                    { key: 'templates', label: 'Templates', icon: 'learning', endpoint: '/45/DocTmpl', model: 'DocTemplate', idField: 'templateId' },
                    { key: 'email-captures', label: 'Email Capture', icon: 'crm', endpoint: '/45/DocEmail', model: 'DocEmailCapture', idField: 'captureId' },
                    { key: 'scan-jobs', label: 'Scan Jobs', icon: 'jobs', endpoint: '/45/DocScan', model: 'DocScanJob', idField: 'scanJobId' }
                ],
                'compliance': [
                    { key: 'retention-policies', label: 'Retention', icon: 'time', endpoint: '/45/DocRetPol', model: 'DocRetentionPolicy', idField: 'policyId' },
                    { key: 'legal-holds', label: 'Legal Holds', icon: 'compliance', endpoint: '/45/DocLglHold', model: 'DocLegalHold', idField: 'holdId' },
                    { key: 'archive-jobs', label: 'Archives', icon: 'warehouse', endpoint: '/45/DocArchive', model: 'DocArchiveJob', idField: 'jobId' }
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
                    { key: 'categories', label: 'Categories', icon: 'job-families', endpoint: '/100/EcomCat', model: 'EcomCategory', idField: 'categoryId', supportedViews: ['table', 'tree'] },
                    { key: 'attributes', label: 'Attributes', icon: 'positions', endpoint: '/100/EcomAttr', model: 'EcomAttribute', idField: 'attributeId' }
                ],
                'orders': [
                    { key: 'orders', label: 'Orders', icon: 'procurement', endpoint: '/100/EcomOrder', model: 'EcomOrder', idField: 'orderId', supportedViews: ['table', 'kanban'] },
                    { key: 'returns', label: 'Returns', icon: 'logistics', endpoint: '/100/EcomReturn', model: 'EcomReturn', idField: 'returnId', supportedViews: ['table', 'kanban'] }
                ],
                'customers': [
                    { key: 'customers', label: 'Customers', icon: 'hcm', endpoint: '/100/EcomCust', model: 'EcomCustomer', idField: 'customerId' },
                    { key: 'wishlists', label: 'Wishlists', icon: 'benefits', endpoint: '/100/EcomWish', model: 'EcomWishlist', idField: 'wishlistId' },
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
                    { key: 'certifications', label: 'Certifications', icon: 'talent', endpoint: '/110/CompCert', model: 'CompCertification', idField: 'certificationId' }
                ],
                'controls': [
                    { key: 'controls', label: 'Controls', icon: 'compliance', endpoint: '/110/CompCtrl', model: 'CompControl', idField: 'controlId' },
                    { key: 'policies', label: 'Policies', icon: 'documents', endpoint: '/110/CompPolicy', model: 'CompPolicyDocument', idField: 'documentId' },
                    { key: 'approval-matrices', label: 'Approval Matrices', icon: 'projects', endpoint: '/110/CompAprvMx', model: 'CompApprovalMatrix', idField: 'matrixId' }
                ],
                'risk': [
                    { key: 'risk-registers', label: 'Risk Registers', icon: 'documents', endpoint: '/110/CompRisk', model: 'CompRiskRegister', idField: 'riskId' },
                    { key: 'incidents', label: 'Incidents', icon: 'compliance', endpoint: '/110/CompIncdnt', model: 'CompIncident', idField: 'incidentId', supportedViews: ['table', 'kanban'] },
                    { key: 'insurance-policies', label: 'Insurance Policies', icon: 'documents', endpoint: '/110/CompInsur', model: 'CompInsurancePolicy', idField: 'insuranceId' }
                ],
                'audit': [
                    { key: 'audit-schedules', label: 'Audit Schedules', icon: 'time', endpoint: '/110/CompAudSch', model: 'CompAuditSchedule', idField: 'scheduleId', supportedViews: ['table', 'calendar'] },
                    { key: 'audit-findings', label: 'Audit Findings', icon: 'compliance', endpoint: '/110/CompAudFnd', model: 'CompAuditFinding', idField: 'findingId', supportedViews: ['table', 'kanban'] },
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
