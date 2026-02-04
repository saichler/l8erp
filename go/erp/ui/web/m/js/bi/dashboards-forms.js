/*
(c) 2025 Sharon Aicler (saichler@gmail.com)

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
 * Mobile BI Dashboards Module - Form Configurations
 * Desktop Equivalent: bi/dashboards/dashboards-forms.js
 */
(function() {
    'use strict';

    const enums = MobileBiDashboards.enums;

    MobileBiDashboards.forms = {
        BiDashboard: {
            title: 'Dashboard',
            sections: [
                {
                    title: 'Dashboard Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.DASHBOARD_STATUS },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'isDefault', label: 'Default Dashboard', type: 'checkbox' },
                        { key: 'isPublic', label: 'Public', type: 'checkbox' },
                        { key: 'refreshInterval', label: 'Refresh Interval (seconds)', type: 'number' },
                        { key: 'layoutConfig', label: 'Layout Config (JSON)', type: 'textarea' }
                    ]
                }
            ]
        },

        BiDashboardWidget: {
            title: 'Dashboard Widget',
            sections: [
                {
                    title: 'Widget Details',
                    fields: [
                        { key: 'dashboardId', label: 'Dashboard', type: 'reference', lookupModel: 'BiDashboard', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'widgetType', label: 'Widget Type', type: 'select', options: enums.WIDGET_TYPE },
                        { key: 'chartType', label: 'Chart Type', type: 'select', options: enums.CHART_TYPE },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'reportId', label: 'Report', type: 'reference', lookupModel: 'BiReport' },
                        { key: 'kpiId', label: 'KPI', type: 'reference', lookupModel: 'BiKPI' },
                        { key: 'query', label: 'Query', type: 'textarea' },
                        { key: 'positionX', label: 'Position X', type: 'number' },
                        { key: 'positionY', label: 'Position Y', type: 'number' },
                        { key: 'width', label: 'Width', type: 'number' },
                        { key: 'height', label: 'Height', type: 'number' },
                        { key: 'refreshInterval', label: 'Refresh Interval (seconds)', type: 'number' },
                        { key: 'config', label: 'Config (JSON)', type: 'textarea' }
                    ]
                }
            ]
        },

        BiKPI: {
            title: 'KPI',
            sections: [
                {
                    title: 'KPI Details',
                    fields: [
                        { key: 'code', label: 'Code', type: 'text', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'category', label: 'Category', type: 'text' },
                        { key: 'unit', label: 'Unit', type: 'text' },
                        { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                        { key: 'dataSourceId', label: 'Data Source', type: 'reference', lookupModel: 'BiDataSource' },
                        { key: 'calculationFormula', label: 'Calculation Formula', type: 'textarea' },
                        { key: 'currentValue', label: 'Current Value', type: 'number' },
                        { key: 'targetValue', label: 'Target Value', type: 'number' },
                        { key: 'previousValue', label: 'Previous Value', type: 'number' },
                        { key: 'status', label: 'Status', type: 'select', options: enums.KPI_STATUS },
                        { key: 'trend', label: 'Trend', type: 'select', options: enums.TREND_DIRECTION },
                        { key: 'isActive', label: 'Active', type: 'checkbox' },
                        { key: 'refreshInterval', label: 'Refresh Interval (seconds)', type: 'number' }
                    ]
                }
            ]
        },

        BiKPIThreshold: {
            title: 'KPI Threshold',
            sections: [
                {
                    title: 'Threshold Details',
                    fields: [
                        { key: 'kpiId', label: 'KPI', type: 'reference', lookupModel: 'BiKPI', required: true },
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'operator', label: 'Operator', type: 'select', options: enums.THRESHOLD_OPERATOR },
                        { key: 'value', label: 'Value', type: 'number' },
                        { key: 'valueUpper', label: 'Upper Value (for Between)', type: 'number' },
                        { key: 'severity', label: 'Severity', type: 'text' },
                        { key: 'notificationEmail', label: 'Notification Email', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiDrilldown: {
            title: 'Drilldown',
            sections: [
                {
                    title: 'Drilldown Details',
                    fields: [
                        { key: 'name', label: 'Name', type: 'text', required: true },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'sourceReportId', label: 'Source Report', type: 'reference', lookupModel: 'BiReport' },
                        { key: 'sourceWidgetId', label: 'Source Widget', type: 'reference', lookupModel: 'BiDashboardWidget' },
                        { key: 'sourceField', label: 'Source Field', type: 'text' },
                        { key: 'targetReportId', label: 'Target Report', type: 'reference', lookupModel: 'BiReport' },
                        { key: 'targetDashboardId', label: 'Target Dashboard', type: 'reference', lookupModel: 'BiDashboard' },
                        { key: 'targetParameter', label: 'Target Parameter', type: 'text' },
                        { key: 'isActive', label: 'Active', type: 'checkbox' }
                    ]
                }
            ]
        },

        BiDashboardShare: {
            title: 'Dashboard Share',
            sections: [
                {
                    title: 'Share Details',
                    fields: [
                        { key: 'dashboardId', label: 'Dashboard', type: 'reference', lookupModel: 'BiDashboard', required: true },
                        { key: 'sharedWithId', label: 'Shared With ID', type: 'text', required: true },
                        { key: 'sharedWithType', label: 'Shared With Type', type: 'text' },
                        { key: 'accessLevel', label: 'Access Level', type: 'select', options: enums.ACCESS_LEVEL },
                        { key: 'sharedDate', label: 'Shared Date', type: 'date' },
                        { key: 'sharedBy', label: 'Shared By', type: 'reference', lookupModel: 'Employee' },
                        { key: 'expiryDate', label: 'Expiry Date', type: 'date' }
                    ]
                }
            ]
        }
    };

})();
