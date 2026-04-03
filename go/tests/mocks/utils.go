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
package mocks

import (
	"math/rand"

	l8m "github.com/saichler/l8common/go/mocks"
	l8common "github.com/saichler/l8common/go/types/l8common"
)

// Delegate to l8common's exported functions.
var (
	pickRef         = l8m.PickRef
	randomPastDate  = l8m.RandomPastDate
	randomFutureDate = l8m.RandomFutureDate
	genID           = l8m.GenID
	genCode         = l8m.GenCode
	createAuditInfo = l8m.CreateAuditInfo
	createAddress   = l8m.CreateAddress
	createContact   = l8m.CreateContact
	randomName      = l8m.RandomName
	randomPhone     = l8m.RandomPhone
	randomSSN       = l8m.RandomSSN
	randomBirthDate = l8m.RandomBirthDate
	randomHireDate  = l8m.RandomHireDate
	sanitizeEmail   = l8m.SanitizeEmail
	getIssuingOrg   = l8m.GetIssuingOrg
	minInt          = l8m.MinInt
)

// randomMoney generates a Money with random amount in [min, min+rangeSize) cents.
// Wraps l8common's RandomMoney, extracting CurrencyIDs from the store.
func randomMoney(store *MockDataStore, min, rangeSize int) *l8common.Money {
	return l8m.RandomMoney(store.CurrencyIDs, min, rangeSize)
}

// money creates a Money with exact amount in cents.
// Wraps l8common's ExactMoney, extracting CurrencyIDs from the store.
func money(store *MockDataStore, amount int64) *l8common.Money {
	return l8m.ExactMoney(store.CurrencyIDs, amount)
}

// genLines generates N child items per parent, calling create(idx, parentIdx, childIdx, parentID).
// Generic version — l8common uses interface{}, this keeps type safety.
func genLines(parentIDs []string, n int, create func(idx, pIdx, j int, parentID string) interface{}) []interface{} {
	lines := make([]interface{}, 0, len(parentIDs)*n)
	idx := 1
	for pIdx, parentID := range parentIDs {
		for j := 0; j < n; j++ {
			lines = append(lines, create(idx, pIdx, j, parentID))
			idx++
		}
	}
	return lines
}

// Ensure rand is referenced (used by callers importing this package).
var _ = rand.Intn
