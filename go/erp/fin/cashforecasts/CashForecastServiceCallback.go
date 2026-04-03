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
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

func newCashForecastServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.CashForecast{}, vnic).
		Require(func(v interface{}) string { return v.(*fin.CashForecast).ForecastId }, "ForecastId").
		Require(func(v interface{}) string { return v.(*fin.CashForecast).ForecastName }, "ForecastName").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CashForecast).OpeningBalance }, "OpeningBalance").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CashForecast).ProjectedInflows }, "ProjectedInflows").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CashForecast).ProjectedOutflows }, "ProjectedOutflows").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CashForecast).NetCashFlow }, "NetCashFlow").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.CashForecast).ClosingBalance }, "ClosingBalance").
		Build()
}
