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
package assets

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newAssetServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.Asset]("Asset",
		func(e *fin.Asset) { common.GenerateID(&e.AssetId) }).
		Require(func(e *fin.Asset) string { return e.AssetId }, "AssetId").
		Require(func(e *fin.Asset) string { return e.Name }, "Name").
		Require(func(e *fin.Asset) string { return e.CategoryId }, "CategoryId").
		Enum(func(e *fin.Asset) int32 { return int32(e.DepreciationMethod) }, fin.DepreciationMethod_name, "DepreciationMethod").
		Enum(func(e *fin.Asset) int32 { return int32(e.Status) }, fin.AssetStatus_name, "Status").
		OptionalMoney(func(e *fin.Asset) *erp.Money { return e.AcquisitionCost }, "AcquisitionCost").
		OptionalMoney(func(e *fin.Asset) *erp.Money { return e.SalvageValue }, "SalvageValue").
		OptionalMoney(func(e *fin.Asset) *erp.Money { return e.AccumulatedDepreciation }, "AccumulatedDepreciation").
		OptionalMoney(func(e *fin.Asset) *erp.Money { return e.NetBookValue }, "NetBookValue").
		Build()
}
