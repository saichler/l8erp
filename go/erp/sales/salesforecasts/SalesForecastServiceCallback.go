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
	common "github.com/saichler/l8erp/go/erp/common"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	l8api "github.com/saichler/l8types/go/types/l8api"
)

func newSalesForecastServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&sales.SalesForecast{}, vnic).
		Require(func(v interface{}) string { return v.(*sales.SalesForecast).ForecastId }, "ForecastId").
		Require(func(v interface{}) string { return v.(*sales.SalesForecast).Name }, "Name").
		Require(func(v interface{}) string { return v.(*sales.SalesForecast).CustomerId }, "CustomerId").
		Enum(func(v interface{}) int32 { return int32(v.(*sales.SalesForecast).Category) }, sales.SalesForecastCategory_name, "Category").
		OptionalPeriod(func(v interface{}) *l8api.L8Period { return v.(*sales.SalesForecast).Period }, "Period").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesForecast).ForecastAmount }, "ForecastAmount").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*sales.SalesForecast).WeightedAmount }, "WeightedAmount").
		Build()
}
