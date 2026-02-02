// (c) 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package common

import (
	"errors"
	"time"
)

// SafeCast safely casts an interface{} to a pointer of type T.
// Returns an error instead of panicking if the element is nil.
func SafeCast[T any](element interface{}) (*T, error) {
	if element == nil {
		return nil, errors.New("entity not found")
	}
	result, ok := element.(*T)
	if !ok {
		return nil, errors.New("unexpected response type")
	}
	return result, nil
}

// ValidateRequired checks if a string field is non-empty
func ValidateRequired(value, fieldName string) error {
	if value == "" {
		return errors.New(fieldName + " is required")
	}
	return nil
}

// ValidateRequiredInt64 checks if an int64 field is non-zero
func ValidateRequiredInt64(value int64, fieldName string) error {
	if value == 0 {
		return errors.New(fieldName + " is required")
	}
	return nil
}

// ValidateEnum validates an enum value against its name map.
// Uses the protobuf-generated _name maps (e.g., Gender_name).
// Value 0 (UNSPECIFIED) is considered invalid.
func ValidateEnum[T ~int32](value T, nameMap map[int32]string, enumName string) error {
	if value == 0 {
		return errors.New(enumName + " must be specified")
	}
	if _, ok := nameMap[int32(value)]; !ok {
		return errors.New("invalid " + enumName + " value")
	}
	return nil
}

// ValidateDateInPast checks if a Unix timestamp is in the past
func ValidateDateInPast(timestamp int64, fieldName string) error {
	if timestamp > time.Now().Unix() {
		return errors.New(fieldName + " must be in the past")
	}
	return nil
}

// ValidateDateNotZero checks if date is set (non-zero)
func ValidateDateNotZero(timestamp int64, fieldName string) error {
	if timestamp == 0 {
		return errors.New(fieldName + " is required")
	}
	return nil
}

// ValidateDateAfter checks if date1 is after date2
func ValidateDateAfter(date1, date2 int64, field1Name, field2Name string) error {
	if date1 <= date2 {
		return errors.New(field1Name + " must be after " + field2Name)
	}
	return nil
}

// ValidateMinimumAge checks if DateOfBirth results in minimum age
func ValidateMinimumAge(dateOfBirth int64, minAge int, fieldName string) error {
	birthTime := time.Unix(dateOfBirth, 0)
	now := time.Now()
	age := now.Year() - birthTime.Year()
	// Adjust if birthday hasn't occurred this year
	if now.YearDay() < birthTime.YearDay() {
		age--
	}
	if age < minAge {
		return errors.New(fieldName + " indicates employee is under minimum working age")
	}
	return nil
}

// ValidateConditionalRequired validates field2 is required when condition is true
func ValidateConditionalRequired(condition bool, value, conditionDesc, fieldName string) error {
	if condition && value == "" {
		return errors.New(fieldName + " is required when " + conditionDesc)
	}
	return nil
}

// ValidateConditionalRequiredInt64 validates an int64 field is required when condition is true
func ValidateConditionalRequiredInt64(condition bool, value int64, conditionDesc, fieldName string) error {
	if condition && value == 0 {
		return errors.New(fieldName + " is required when " + conditionDesc)
	}
	return nil
}
