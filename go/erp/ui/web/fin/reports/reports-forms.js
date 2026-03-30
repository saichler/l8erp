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
// Financial Reports Module - Form Definitions using Layer8FormFactory

(function() {
    'use strict';

    if (typeof FIN === 'undefined') window.FIN = {};
    if (!FIN.Reports) FIN.Reports = {};

    var f = Layer8FormFactory;
    var enums = FIN.Reports.enums;

    FIN.Reports.forms = {
        FinReport: f.form('Financial Report', [
            f.section('Report Parameters', [
                ...f.select('reportType', 'Report Type', enums.REPORT_TYPE),
                ...f.text('fiscalYearId', 'Fiscal Year ID'),
                ...f.text('fiscalPeriodId', 'Fiscal Period ID'),
                ...f.text('departmentId', 'Department ID'),
                ...f.text('accountId', 'Account ID')
            ])
        ])
    };
})();
