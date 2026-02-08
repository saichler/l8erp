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
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
)

// pickRef safely picks a reference ID by modulo index, returns "" if slice empty
func pickRef(ids []string, index int) string {
	if len(ids) == 0 {
		return ""
	}
	return ids[index%len(ids)]
}

// randomMoney generates a Money with random amount in [min, min+rangeSize) cents
func randomMoney(store *MockDataStore, min, rangeSize int) *erp.Money {
	return &erp.Money{Amount: int64(rand.Intn(rangeSize) + min), CurrencyId: pickRef(store.CurrencyIDs, rand.Intn(100))}
}

// money creates a Money with exact amount in cents
func money(store *MockDataStore, amount int64) *erp.Money {
	return &erp.Money{Amount: amount, CurrencyId: pickRef(store.CurrencyIDs, 0)}
}

// randomPastDate returns Unix timestamp randomly in the past
func randomPastDate(maxMonths, maxDays int) int64 {
	return time.Now().AddDate(0, -rand.Intn(maxMonths), -rand.Intn(maxDays)).Unix()
}

// randomFutureDate returns Unix timestamp randomly in the future
func randomFutureDate(maxMonths, maxDays int) int64 {
	return time.Now().AddDate(0, rand.Intn(maxMonths), rand.Intn(maxDays)).Unix()
}

// genID creates an ID like "prefix-001"
func genID(prefix string, index int) string {
	return fmt.Sprintf("%s-%03d", prefix, index+1)
}

// genCode creates a code like "PREFIX001"
func genCode(prefix string, index int) string {
	return fmt.Sprintf("%s%03d", prefix, index+1)
}

func createAuditInfo() *erp.AuditInfo {
	now := time.Now().Unix()
	return &erp.AuditInfo{
		CreatedAt:  now,
		CreatedBy:  "mock-generator",
		ModifiedAt: now,
		ModifiedBy: "mock-generator",
	}
}

func createAddress() *erp.Address {
	return &erp.Address{
		AddressType:   erp.AddressType_ADDRESS_TYPE_WORK,
		Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[rand.Intn(len(streetNames))]),
		City:          cities[rand.Intn(len(cities))],
		StateProvince: states[rand.Intn(len(states))],
		PostalCode:    fmt.Sprintf("%05d", rand.Intn(90000)+10000),
		CountryCode:   "US",
		IsPrimary:     true,
	}
}

func createContact() *erp.ContactInfo {
	return &erp.ContactInfo{
		ContactType: erp.ContactType_CONTACT_TYPE_PHONE_WORK,
		Value:       randomPhone(),
		IsPrimary:   true,
	}
}

func randomName() string {
	return fmt.Sprintf("%s %s", firstNames[rand.Intn(len(firstNames))], lastNames[rand.Intn(len(lastNames))])
}

func randomPhone() string {
	return fmt.Sprintf("(%03d) %03d-%04d", rand.Intn(900)+100, rand.Intn(900)+100, rand.Intn(9000)+1000)
}

func randomSSN() string {
	return fmt.Sprintf("%03d-%02d-%04d", rand.Intn(900)+100, rand.Intn(90)+10, rand.Intn(9000)+1000)
}

func randomBirthDate() int64 {
	// Random birth date between 25-60 years ago
	yearsAgo := rand.Intn(35) + 25
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func randomHireDate() int64 {
	// Random hire date in the last 10 years
	yearsAgo := rand.Intn(10)
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func sanitizeEmail(s string) string {
	result := ""
	for _, c := range s {
		if (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') {
			result += string(c)
		}
	}
	return result
}

func getIssuingOrg(certName string) string {
	orgs := map[string]string{
		"PMP":       "Project Management Institute",
		"AWS":       "Amazon Web Services",
		"Google":    "Google Cloud",
		"Scrum":     "Scrum Alliance",
		"SHRM":      "Society for Human Resource Management",
		"CPA":       "Certified Public Accountant",
		"Six":       "ASQ",
		"CISSP":     "ISC2",
		"CompTIA":   "CompTIA",
		"Microsoft": "Microsoft",
	}
	for key, org := range orgs {
		if len(certName) >= len(key) && certName[:len(key)] == key {
			return org
		}
	}
	return "Professional Certification Body"
}

// genLines generates N child items per parent, calling create(idx, parentIdx, childIdx, parentID)
func genLines[L any](parentIDs []string, n int, create func(idx, pIdx, j int, parentID string) *L) []*L {
	lines := make([]*L, 0, len(parentIDs)*n)
	idx := 1
	for pIdx, parentID := range parentIDs {
		for j := 0; j < n; j++ {
			lines = append(lines, create(idx, pIdx, j, parentID))
			idx++
		}
	}
	return lines
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}
