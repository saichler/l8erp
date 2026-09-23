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
// Sales Reports - Enum Definitions using Layer8EnumFactory

(function() {
    'use strict';

    window.SalesReports = window.SalesReports || {};

    var factory = Layer8EnumFactory;

    // Order matches SalesReportType in proto/sales-reports.proto. Every value here
    // has a case in generateSalesReport() -- an option with no generator would fail
    // the POST with "unsupported report type".
    var REPORT_TYPE = factory.simple([
        'Unspecified',
        'Sales by Customer',
        'Pipeline Summary',
        'Territory Performance'
    ]);

    SalesReports.enums = {
        REPORT_TYPE: REPORT_TYPE.enum
    };
})();
