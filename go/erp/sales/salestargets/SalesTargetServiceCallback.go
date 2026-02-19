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
package salestargets

import (
	"github.com/saichler/l8erp/go/erp/common"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
	"github.com/saichler/l8types/go/ifs"
	l8api "github.com/saichler/l8types/go/types/l8api"
)

func newSalesTargetServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[sales.SalesTarget]("SalesTarget",
		func(e *sales.SalesTarget) { common.GenerateID(&e.TargetId) }).
		Require(func(e *sales.SalesTarget) string { return e.TargetId }, "TargetId").
		Require(func(e *sales.SalesTarget) string { return e.Name }, "Name").
		Period(func(e *sales.SalesTarget) *l8api.L8Period { return e.Period }, "Period").
		OptionalMoney(func(e *sales.SalesTarget) *erp.Money { return e.TargetAmount }, "TargetAmount").
		OptionalMoney(func(e *sales.SalesTarget) *erp.Money { return e.AchievedAmount }, "AchievedAmount").
		Build()
}
