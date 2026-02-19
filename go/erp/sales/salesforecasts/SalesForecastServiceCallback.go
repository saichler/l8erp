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
package salesforecasts

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	l8api "github.com/saichler/l8types/go/types/l8api"
)

func newSalesForecastServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesForecast]("SalesForecast",
		func(e *sales.SalesForecast) { common.GenerateID(&e.ForecastId) }).
		Require(func(e *sales.SalesForecast) string { return e.ForecastId }, "ForecastId").
		Require(func(e *sales.SalesForecast) string { return e.Name }, "Name").
		Require(func(e *sales.SalesForecast) string { return e.CustomerId }, "CustomerId").
		Enum(func(e *sales.SalesForecast) int32 { return int32(e.Category) }, sales.SalesForecastCategory_name, "Category").
		OptionalPeriod(func(e *sales.SalesForecast) *l8api.L8Period { return e.Period }, "Period").
		OptionalMoney(func(e *sales.SalesForecast) *erp.Money { return e.ForecastAmount }, "ForecastAmount").
		OptionalMoney(func(e *sales.SalesForecast) *erp.Money { return e.WeightedAmount }, "WeightedAmount").
		Build()
}
