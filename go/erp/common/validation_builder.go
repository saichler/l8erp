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
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8types/go/ifs"
)

// VB (Validation Builder) chains validators for a ServiceCallback.
// Use NewValidation to start building, chain .Require() calls, then .Build().
type VB[T any] struct {
	typeName   string
	setID      SetIDFunc[T]
	validators []func(*T, ifs.IVNic) error
}

// NewValidation creates a validation builder for a ServiceCallback.
func NewValidation[T any](typeName string, setID SetIDFunc[T]) *VB[T] {
	return &VB[T]{typeName: typeName, setID: setID}
}

// Require adds a required string field validation.
func (b *VB[T]) Require(getter func(*T) string, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateRequired(getter(e), name)
	})
	return b
}

// RequireInt64 adds a required int64 field validation.
func (b *VB[T]) RequireInt64(getter func(*T) int64, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateRequiredInt64(getter(e), name)
	})
	return b
}

// Enum adds an enum field validation using the protobuf _name map.
// Value 0 (UNSPECIFIED) is rejected; unknown values are rejected.
func (b *VB[T]) Enum(getter func(*T) int32, nameMap map[int32]string, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateEnum(getter(e), nameMap, name)
	})
	return b
}

// Money adds a required money field validation (nil + CurrencyId check).
func (b *VB[T]) Money(getter func(*T) *erp.Money, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateMoney(getter(e), name)
	})
	return b
}

// MoneyPositive adds a required money field validation with positive amount.
func (b *VB[T]) MoneyPositive(getter func(*T) *erp.Money, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateMoneyPositive(getter(e), name)
	})
	return b
}

// OptionalMoney validates a money field only when non-nil (skips nil).
func (b *VB[T]) OptionalMoney(getter func(*T) *erp.Money, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		m := getter(e)
		if m == nil {
			return nil
		}
		return ValidateMoney(m, name)
	})
	return b
}

// DateNotZero adds a required date (non-zero timestamp) validation.
func (b *VB[T]) DateNotZero(getter func(*T) int64, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateDateNotZero(getter(e), name)
	})
	return b
}

// DateAfter validates that date1 > date2 (skips if either is zero).
func (b *VB[T]) DateAfter(getter1, getter2 func(*T) int64, name1, name2 string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		d1, d2 := getter1(e), getter2(e)
		if d1 == 0 || d2 == 0 {
			return nil
		}
		return ValidateDateAfter(d1, d2, name1, name2)
	})
	return b
}

// DateRange validates a required *erp.DateRange field (nil + StartDate < EndDate).
func (b *VB[T]) DateRange(getter func(*T) *erp.DateRange, name string) *VB[T] {
	b.validators = append(b.validators, func(e *T, _ ifs.IVNic) error {
		return ValidateDateRange(getter(e), name)
	})
	return b
}

// Custom adds a custom validation function.
func (b *VB[T]) Custom(fn func(*T, ifs.IVNic) error) *VB[T] {
	b.validators = append(b.validators, fn)
	return b
}

// Build creates the IServiceCallback from the chained validators.
func (b *VB[T]) Build() ifs.IServiceCallback {
	return NewServiceCallback(b.typeName, b.setID, func(item *T, vnic ifs.IVNic) error {
		for _, v := range b.validators {
			if err := v(item, vnic); err != nil {
				return err
			}
		}
		return nil
	})
}
