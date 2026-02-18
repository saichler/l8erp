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
package common

import (
	"errors"
	"github.com/saichler/l8types/go/ifs"
)

// ValidateFunc is a function that validates an entity.
type ValidateFunc[T any] func(*T, ifs.IVNic) error

// ActionValidateFunc is a function that validates an entity with access to the CRUD action.
type ActionValidateFunc[T any] func(*T, ifs.Action, ifs.IVNic) error

// SetIDFunc is a function that generates/sets the primary key on an entity.
type SetIDFunc[T any] func(*T)

type genericCallback[T any] struct {
	typeName         string
	setID            SetIDFunc[T]
	validate         ValidateFunc[T]
	actionValidators []ActionValidateFunc[T]
}

// NewServiceCallback creates a standard IServiceCallback that handles type assertion,
// ID generation on POST, and validation.
func NewServiceCallback[T any](typeName string, setID SetIDFunc[T], validate ValidateFunc[T], actionValidators ...ActionValidateFunc[T]) ifs.IServiceCallback {
	return &genericCallback[T]{
		typeName:         typeName,
		setID:            setID,
		validate:         validate,
		actionValidators: actionValidators,
	}
}

func (cb *genericCallback[T]) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*T)
	if !ok {
		return nil, false, errors.New("invalid " + cb.typeName + " type")
	}
	if action == ifs.POST {
		cb.setID(entity)
	}
	for _, av := range cb.actionValidators {
		if err := av(entity, action, vnic); err != nil {
			return nil, false, err
		}
	}
	if cb.validate != nil {
		if err := cb.validate(entity, vnic); err != nil {
			return nil, false, err
		}
	}
	return nil, true, nil
}

func (cb *genericCallback[T]) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}
