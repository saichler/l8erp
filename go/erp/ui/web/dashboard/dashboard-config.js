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

// Dashboard KPI Configuration
window.DashboardConfig = {
    // KPI definitions with endpoints and queries
    kpis: [
        {
            id: 'employees',
            label: 'Total Employees',
            icon: 'hcm',
            endpoint: '/30/Employee',
            model: 'Employee',
            query: 'select * from Employee limit 1 page 0',
            section: 'hcm',
            countField: 'Total'
        },
        {
            id: 'pending-leave',
            label: 'Pending Leave',
            icon: 'warning',
            endpoint: '/30/LeaveReq',
            model: 'LeaveRequest',
            query: 'select * from LeaveRequest where status=2 limit 1 page 0',
            section: 'hcm',
            countField: 'Total'
        },
        {
            id: 'open-sales-orders',
            label: 'Open Sales Orders',
            icon: 'sales',
            endpoint: '/60/SalesOrder',
            model: 'SalesOrder',
            query: 'select * from SalesOrder where status in [2,3,4] limit 1 page 0',
            section: 'sales',
            countField: 'Total'
        },
        {
            id: 'open-cases',
            label: 'Open Support Cases',
            icon: 'crm',
            endpoint: '/80/CrmCase',
            model: 'CrmCase',
            query: 'select * from CrmCase where status in [1,2,3,4] limit 1 page 0',
            section: 'crm',
            countField: 'Total'
        },
        {
            id: 'active-projects',
            label: 'Active Projects',
            icon: 'projects',
            endpoint: '/90/PrjProj',
            model: 'PrjProject',
            query: 'select * from PrjProject where status in [2,3] limit 1 page 0',
            section: 'projects',
            countField: 'Total'
        },
        {
            id: 'pending-invoices',
            label: 'Pending Invoices',
            icon: 'fin',
            endpoint: '/40/SalesInv',
            model: 'SalesInvoice',
            query: 'select * from SalesInvoice where status in [3,4,6] limit 1 page 0',
            section: 'financial',
            countField: 'Total'
        },
        {
            id: 'open-pos',
            label: 'Open POs',
            icon: 'scm',
            endpoint: '/50/PurchOrder',
            model: 'ScmPurchaseOrder',
            query: 'select * from ScmPurchaseOrder where status in [2,3,4] limit 1 page 0',
            section: 'scm',
            countField: 'Total'
        },
        {
            id: 'wos-in-progress',
            label: 'WOs In Progress',
            icon: 'mfg',
            endpoint: '/70/MfgWorkOrd',
            model: 'MfgWorkOrder',
            query: 'select * from MfgWorkOrder where status=3 limit 1 page 0',
            section: 'manufacturing',
            countField: 'Total'
        },
        {
            id: 'active-dashboards',
            label: 'Active Dashboards',
            icon: 'bi',
            endpoint: '/35/BiDashbrd',
            model: 'BiDashboard',
            query: 'select * from BiDashboard where status=2 limit 1 page 0',
            section: 'bi',
            countField: 'Total'
        },
        {
            id: 'total-documents',
            label: 'Total Documents',
            icon: 'documents',
            endpoint: '/45/DocDoc',
            model: 'DocDocument',
            query: 'select * from DocDocument limit 1 page 0',
            section: 'documents',
            countField: 'Total'
        },
        {
            id: 'ecom-orders',
            label: 'E-Commerce Orders',
            icon: 'ecommerce',
            endpoint: '/100/EcomOrder',
            model: 'EcomOrder',
            query: 'select * from EcomOrder where status in [1,2,3,4] limit 1 page 0',
            section: 'ecommerce',
            countField: 'Total'
        },
        {
            id: 'open-incidents',
            label: 'Open Incidents',
            icon: 'compliance',
            endpoint: '/110/CompIncdnt',
            model: 'CompIncident',
            query: 'select * from CompIncident where status in [1,2,3] limit 1 page 0',
            section: 'compliance',
            countField: 'Total'
        }
    ],

    // SVG icons for each KPI type
    icons: {
        hcm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>`,
        sales: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`,
        crm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`,
        projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>`,
        fin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>`,
        scm: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>`,
        mfg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>`,
        warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>`,
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>`,
        bi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>`,
        documents: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>`,
        ecommerce: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>`,
        compliance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 11 14 15 10"></polyline>
        </svg>`
    }
};
