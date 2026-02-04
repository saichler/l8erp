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

package kbarticles

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/crm"
	"github.com/saichler/l8types/go/ifs"
)

type CrmKBArticleServiceCallback struct{}

func newCrmKBArticleServiceCallback() *CrmKBArticleServiceCallback {
	return &CrmKBArticleServiceCallback{}
}

func (this *CrmKBArticleServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	item, ok := any.(*crm.CrmKBArticle)
	if !ok {
		return nil, false, errors.New("invalid CrmKBArticle type")
	}
	if action == ifs.POST {
		common.GenerateID(&item.ArticleId)
	}
	err := validate(item, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CrmKBArticleServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(item *crm.CrmKBArticle, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(item.ArticleId, "ArticleId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(item.Title, "Title"); err != nil {
		return err
	}
	return nil
}
