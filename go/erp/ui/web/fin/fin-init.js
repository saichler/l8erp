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
// FIN Module - Entry Point
// Bootstraps Financial Management using shared module factory

(function() {
    'use strict';

    ERPModuleFactory.create({
        namespace: 'FIN',
        defaultModule: 'general-ledger',
        defaultService: 'accounts',
        sectionSelector: 'general-ledger',
        initializerName: 'initializeFIN',
        requiredNamespaces: ['GeneralLedger', 'AccountsPayable', 'AccountsReceivable', 'CashManagement', 'FixedAssets', 'Budgeting', 'TaxManagement']
    });
})();
