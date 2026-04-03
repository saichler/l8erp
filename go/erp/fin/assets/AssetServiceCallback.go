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
	"reflect"
	common "github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)


func toSlice(slice interface{}) []interface{} {
	v := reflect.ValueOf(slice)
	result := make([]interface{}, v.Len())
	for i := 0; i < v.Len(); i++ {
		result[i] = v.Index(i).Interface()
	}
	return result
}

func newAssetServiceCallback(vnic ifs.IVNic) ifs.IServiceCallback {
	return common.NewValidation(&fin.Asset{}, vnic).
		StatusTransition(assetTransitions()).
		After(generateDepreciationSchedule).
		Compute(computeAssetValues).
		Require(func(v interface{}) string { return v.(*fin.Asset).AssetId }, "AssetId").
		Require(func(v interface{}) string { return v.(*fin.Asset).Name }, "Name").
		Require(func(v interface{}) string { return v.(*fin.Asset).CategoryId }, "CategoryId").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.Asset).DepreciationMethod) }, fin.DepreciationMethod_name, "DepreciationMethod").
		Enum(func(v interface{}) int32 { return int32(v.(*fin.Asset).Status) }, fin.AssetStatus_name, "Status").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.Asset).AcquisitionCost }, "AcquisitionCost").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.Asset).SalvageValue }, "SalvageValue").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.Asset).AccumulatedDepreciation }, "AccumulatedDepreciation").
		OptionalMoney(func(v interface{}) *l8common.Money { return v.(*fin.Asset).NetBookValue }, "NetBookValue").
		Build()
}

func computeAssetValues(v interface{}) error {
	a := v.(*fin.Asset)
	a.AccumulatedDepreciation = common.SumLineMoney(toSlice(a.DepreciationSchedules), func(v interface{}) *l8common.Money { return v.(*fin.DepreciationSchedule).DepreciationAmount })
	a.NetBookValue = common.MoneySubtract(a.AcquisitionCost, a.AccumulatedDepreciation)
	return nil
}

func assetTransitions() *common.StatusTransitionConfig {
	return &common.StatusTransitionConfig{
		StatusGetter: func(v interface{}) int32 { return int32(v.(*fin.Asset).Status) },
		StatusSetter: func(v interface{}, s int32) { v.(*fin.Asset).Status = fin.AssetStatus(s) },
		FilterBuilder: func(vi interface{}) interface{} { e := vi.(*fin.Asset);
			return &fin.Asset{AssetId: e.AssetId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2, 3, 4, 5}, // ACTIVE → DISPOSED, UNDER_MAINTENANCE, TRANSFERRED, FULLY_DEPRECIATED
			3: {1},           // UNDER_MAINTENANCE → ACTIVE
		},
		StatusNames: fin.AssetStatus_name,
	}
}
