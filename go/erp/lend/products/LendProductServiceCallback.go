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
package products

import (
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/lend"
	"github.com/saichler/l8types/go/ifs"
)

func newLendProductServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&lend.LendProduct{}, vnic).
		Require(func(v interface{}) string { return v.(*lend.LendProduct).ProductId }, "ProductId").
		Require(func(v interface{}) string { return v.(*lend.LendProduct).Name }, "Name").
		Enum(func(v interface{}) int32 { return int32(v.(*lend.LendProduct).ProductType) }, lend.LendProductType_name, "ProductType").
		Enum(func(v interface{}) int32 { return int32(v.(*lend.LendProduct).Status) }, lend.LendProductStatus_name, "Status").
		Build()
}
