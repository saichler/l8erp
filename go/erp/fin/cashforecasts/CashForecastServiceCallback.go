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
package cashforecasts

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCashForecastServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.CashForecast]("CashForecast",
		func(e *fin.CashForecast) { common.GenerateID(&e.ForecastId) }).
		Require(func(e *fin.CashForecast) string { return e.ForecastId }, "ForecastId").
		Require(func(e *fin.CashForecast) string { return e.ForecastName }, "ForecastName").
		OptionalMoney(func(e *fin.CashForecast) *erp.Money { return e.OpeningBalance }, "OpeningBalance").
		OptionalMoney(func(e *fin.CashForecast) *erp.Money { return e.ProjectedInflows }, "ProjectedInflows").
		OptionalMoney(func(e *fin.CashForecast) *erp.Money { return e.ProjectedOutflows }, "ProjectedOutflows").
		OptionalMoney(func(e *fin.CashForecast) *erp.Money { return e.NetCashFlow }, "NetCashFlow").
		OptionalMoney(func(e *fin.CashForecast) *erp.Money { return e.ClosingBalance }, "ClosingBalance").
		Build()
}
