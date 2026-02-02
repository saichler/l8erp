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
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type AssetServiceCallback struct{}

func newAssetServiceCallback() *AssetServiceCallback {
	return &AssetServiceCallback{}
}

func (this *AssetServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	asset, ok := any.(*fin.Asset)
	if !ok {
		return nil, false, errors.New("invalid asset type")
	}
	err := validate(asset, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *AssetServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(asset *fin.Asset, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(asset.AssetId, "AssetId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(asset.Name, "Name"); err != nil {
		return err
	}
	if err := common.ValidateRequired(asset.CategoryId, "CategoryId"); err != nil {
		return err
	}
	return nil
}
