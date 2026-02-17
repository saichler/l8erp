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
 * Mobile COMP Regulatory Module - Column Configurations
 * Desktop Equivalent: comp/regulatory/regulatory-columns.js
 */
(function() {
    'use strict';

    const col = window.Layer8ColumnFactory;
    const enums = MobileCompRegulatory.enums;
    const render = MobileCompRegulatory.render;

    MobileCompRegulatory.columns = {
        CompRegulation: [
            ...col.id('regulationId'),
            ...col.col('code', 'Code'),
            ...col.col('name', 'Name'),
            ...col.status('regulationType', 'Type', enums.REGULATION_TYPE_VALUES, render.regulationType),
            ...col.col('jurisdiction', 'Jurisdiction'),
            ...col.col('issuingBody', 'Issuing Body'),
            ...col.date('effectiveDate', 'Effective Date'),
            ...col.col('version', 'Version'),
            ...col.boolean('isActive', 'Active'),
            ...col.col('ownerId', 'Owner')
        ],

        CompCertification: [
            ...col.id('certificationId'),
            ...col.col('name', 'Name'),
            ...col.col('issuingBody', 'Issuing Body'),
            ...col.col('certificateNumber', 'Certificate #'),
            ...col.status('status', 'Status', enums.CERTIFICATION_STATUS_VALUES, render.certificationStatus),
            ...col.date('issueDate', 'Issue Date'),
            ...col.date('expiryDate', 'Expiry Date'),
            ...col.col('scope', 'Scope'),
            ...col.col('responsibleId', 'Responsible')
        ],

    };

    MobileCompRegulatory.primaryKeys = {
        CompRegulation: 'regulationId',
        CompCertification: 'certificationId'
    };

})();
