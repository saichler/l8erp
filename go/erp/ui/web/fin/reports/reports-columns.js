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
// Financial Reports Module - Column Definitions using Layer8ColumnFactory

(function() {
    'use strict';

    if (typeof FIN === 'undefined') window.FIN = {};
    if (!FIN.Reports) FIN.Reports = {};

    var col = Layer8ColumnFactory;
    var enums = FIN.Reports.enums;

    FIN.Reports.columns = {
        FinReport: [
            ...col.enum('reportType', 'Report Type', enums.REPORT_TYPE, function(v) { return Layer8DRenderers.renderEnum(v, enums.REPORT_TYPE); }),
            ...col('title', 'Title'),
            ...col('periodName', 'Period'),
            ...col.date('generatedAt', 'Generated'),
            ...col.number('rowCount', 'Rows')
        ]
    };
})();
