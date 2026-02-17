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
package promotionalprices

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

func newPromotionalPriceServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesPromotionalPrice]("SalesPromotionalPrice",
		func(e *sales.SalesPromotionalPrice) { common.GenerateID(&e.PromoId) }).
		Require(func(e *sales.SalesPromotionalPrice) string { return e.PromoId }, "PromoId").
		Require(func(e *sales.SalesPromotionalPrice) string { return e.Name }, "Name").
		OptionalMoney(func(e *sales.SalesPromotionalPrice) *erp.Money { return e.PromotionalPrice }, "PromotionalPrice").
		OptionalMoney(func(e *sales.SalesPromotionalPrice) *erp.Money { return e.OriginalPrice }, "OriginalPrice").
		DateAfter(func(e *sales.SalesPromotionalPrice) int64 { return e.EndDate }, func(e *sales.SalesPromotionalPrice) int64 { return e.StartDate }, "EndDate", "StartDate").
		Build()
}
