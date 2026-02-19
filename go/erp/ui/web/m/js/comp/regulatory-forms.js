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
// Uses Layer8FormFactory for reduced boilerplate
/**
 * Mobile COMP Regulatory Module - Form Configurations
 * Desktop Equivalent: comp/regulatory/regulatory-forms.js
 */
(function() {
    'use strict';

    window.MobileCompRegulatory = window.MobileCompRegulatory || {};
    const f = window.Layer8FormFactory;
    const enums = MobileCompRegulatory.enums;

    MobileCompRegulatory.forms = {
        CompRegulation: f.form('Regulation', [
            f.section('Regulation Details', [
                ...f.text('code', 'Code', true),
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.select('regulationType', 'Type', enums.REGULATION_TYPE),
                ...f.text('jurisdiction', 'Jurisdiction'),
                ...f.text('issuingBody', 'Issuing Body'),
                ...f.text('applicableIndustries', 'Applicable Industries'),
                ...f.text('applicableRegions', 'Applicable Regions'),
            ]),
            f.section('Dates & Status', [
                ...f.date('effectiveDate', 'Effective Date'),
                ...f.date('sunsetDate', 'Sunset Date'),
                ...f.text('version', 'Version'),
                ...f.checkbox('isActive', 'Active')
            ]),
            f.section('Ownership', [
                ...f.reference('ownerId', 'Owner', 'Employee'),
                ...f.text('sourceUrl', 'Source URL')
            ]),
            f.section('Requirements', [
                ...f.inlineTable('requirements', 'Requirements', [
                    { key: 'requirementId', label: 'ID', hidden: true },
                    { key: 'code', label: 'Code', type: 'text' },
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'priority', label: 'Priority', type: 'select', options: enums.SEVERITY_LEVEL },
                    { key: 'isMandatory', label: 'Mandatory', type: 'checkbox' },
                    { key: 'ownerId', label: 'Owner', type: 'reference', lookupModel: 'Employee' },
                    { key: 'isActive', label: 'Active', type: 'checkbox' }
                ])
            ])
        ]),

        CompCertification: f.form('Certification', [
            f.section('Certification Details', [
                ...f.text('name', 'Name', true),
                ...f.textarea('description', 'Description'),
                ...f.text('issuingBody', 'Issuing Body', true),
                ...f.text('certificateNumber', 'Certificate Number'),
                ...f.select('status', 'Status', enums.CERTIFICATION_STATUS),
                ...f.text('coveredLocations', 'Covered Locations'),
                ...f.text('coveredProcesses', 'Covered Processes'),
                ...f.text('regulationId', 'Regulation'),
                ...f.text('certificateDocumentId', 'Certificate Document'),
                ...f.money('certificationCost', 'Certification Cost'),
            ]),
            f.section('Dates', [
                ...f.date('issueDate', 'Issue Date'),
                ...f.date('expiryDate', 'Expiry Date'),
                ...f.number('renewalLeadDays', 'Renewal Lead Days')
            ]),
            f.section('Scope & Ownership', [
                ...f.textarea('scope', 'Scope'),
                ...f.reference('responsibleId', 'Responsible', 'Employee')
            ])
        ]),

    };

})();
