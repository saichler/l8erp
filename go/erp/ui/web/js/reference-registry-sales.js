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
 * ERP Reference Registry - Sales Models (Desktop)
 * Extends shared Sales data with desktop-specific entries
 */
(function() {
    'use strict';
    const ref = window.Layer8RefFactory;

    window.Layer8DReferenceRegistrySales = {
        ...window.ReferenceDataSales,

        // Desktop-specific: SalesRevenueSchedule as idOnly
        ...ref.idOnly('SalesRevenueSchedule', 'scheduleId'),

        // Desktop-specific: analytics entries as idOnly
        ...ref.idOnly('SalesTarget', 'targetId'),
        ...ref.idOnly('SalesForecast', 'forecastId')
    };
})();
