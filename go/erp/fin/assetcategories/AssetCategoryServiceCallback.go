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

package assetcategories

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type AssetCategoryServiceCallback struct{}

func newAssetCategoryServiceCallback() *AssetCategoryServiceCallback {
	return &AssetCategoryServiceCallback{}
}

func (this *AssetCategoryServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	assetCategory, ok := any.(*fin.AssetCategory)
	if !ok {
		return nil, false, errors.New("invalid assetCategory type")
	}
	if action == ifs.POST {
		common.GenerateID(&assetCategory.CategoryId)
	}
	err := validate(assetCategory, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *AssetCategoryServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(assetCategory *fin.AssetCategory, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(assetCategory.CategoryId, "CategoryId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(assetCategory.Name, "Name"); err != nil {
		return err
	}
	return nil
}
