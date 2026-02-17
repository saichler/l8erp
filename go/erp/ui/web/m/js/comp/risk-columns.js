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
 * Mobile COMP Risk Module - Column Configurations
 * Desktop Equivalent: comp/risk/risk-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompRisk.enums;
    const render = MobileCompRisk.render;

    MobileCompRisk.columns = {
        CompRiskRegister: [
            ...col.id('riskId'),
            ...col.col('code', 'Code'),
            ...col.col('title', 'Title'),
            ...col.status('category', 'Category', enums.RISK_CATEGORY_VALUES, render.riskCategory),
            ...col.status('status', 'Status', enums.RISK_STATUS_VALUES, render.riskStatus),
            ...col.col('departmentId', 'Department'),
            ...col.col('inherentRiskScore', 'Inherent Score'),
            ...col.col('residualRiskScore', 'Residual Score'),
            ...col.col('riskResponse', 'Response'),
            ...col.col('ownerId', 'Owner'),
            ...col.date('nextReviewDate', 'Next Review')
        ],

        CompIncident: [
            ...col.id('incidentId'),
            ...col.col('incidentNumber', 'Number'),
            ...col.col('title', 'Title'),
            ...col.status('severity', 'Severity', enums.SEVERITY_LEVEL_VALUES, render.severityLevel),
            ...col.status('status', 'Status', enums.INCIDENT_STATUS_VALUES, render.incidentStatus),
            ...col.status('category', 'Category', enums.RISK_CATEGORY_VALUES, render.riskCategory),
            ...col.date('occurredDate', 'Occurred'),
            ...col.date('reportedDate', 'Reported'),
            ...col.col('assignedToId', 'Assigned To'),
            ...col.boolean('regulatoryReportable', 'Reportable')
        ],

        CompInsurancePolicy: [
            ...col.id('insuranceId'),
            ...col.col('policyNumber', 'Policy #'),
            ...col.col('name', 'Name'),
            ...col.col('policyType', 'Type'),
            ...col.col('provider', 'Provider'),
            ...col.col('status', 'Status'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.col('responsibleId', 'Responsible')
        ]
    };

    MobileCompRisk.primaryKeys = {
        CompRiskRegister: 'riskId',
        CompIncident: 'incidentId',
        CompInsurancePolicy: 'insuranceId'
    };

})();
