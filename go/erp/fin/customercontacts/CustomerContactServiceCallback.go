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

package customercontacts

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/fin"
	"github.com/saichler/l8types/go/ifs"
)

type CustomerContactServiceCallback struct{}

func newCustomerContactServiceCallback() *CustomerContactServiceCallback {
	return &CustomerContactServiceCallback{}
}

func (this *CustomerContactServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	customerContact, ok := any.(*fin.CustomerContact)
	if !ok {
		return nil, false, errors.New("invalid customerContact type")
	}
	if action == ifs.POST {
		common.GenerateID(&customerContact.ContactId)
	}
	err := validate(customerContact, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *CustomerContactServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validate(customerContact *fin.CustomerContact, vnic ifs.IVNic) error {
	if err := common.ValidateRequired(customerContact.ContactId, "ContactId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(customerContact.CustomerId, "CustomerId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(customerContact.FirstName, "FirstName"); err != nil {
		return err
	}
	if err := common.ValidateRequired(customerContact.LastName, "LastName"); err != nil {
		return err
	}
	return nil
}
