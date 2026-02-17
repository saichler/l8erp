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
package boms

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8erp/go/types/mfg"
)

func newMfgBomServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[mfg.MfgBom]("MfgBom",
		func(e *mfg.MfgBom) { common.GenerateID(&e.BomId) }).
		Require(func(e *mfg.MfgBom) string { return e.BomId }, "BomId").
		Require(func(e *mfg.MfgBom) string { return e.ItemId }, "ItemId").
		Enum(func(e *mfg.MfgBom) int32 { return int32(e.BomType) }, mfg.MfgBomType_name, "BomType").
		Enum(func(e *mfg.MfgBom) int32 { return int32(e.Status) }, mfg.MfgBomStatus_name, "Status").
		DateAfter(func(e *mfg.MfgBom) int64 { return e.ExpiryDate }, func(e *mfg.MfgBom) int64 { return e.EffectiveDate }, "ExpiryDate", "EffectiveDate").
		Build()
}
