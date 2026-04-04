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
	"strings"
)

// ContactData holds generated contact information.
type ContactData struct {
	ContactID string
	ParentID  string
	FirstName string
	LastName  string
	Email     string
	Phone     string
	Title     string
	IsPrimary bool
}

// generatePersonContacts creates N contacts with random names and emails.
func generatePersonContacts(parentID, idPrefix string, count, startIdx int, titles []string) []ContactData {
	contacts := make([]ContactData, count)
	for j := 0; j < count; j++ {
		name := randomName()
		parts := strings.SplitN(name, " ", 2)
		firstName := parts[0]
		lastName := ""
		if len(parts) > 1 {
			lastName = parts[1]
		}
		contacts[j] = ContactData{
			ContactID: fmt.Sprintf("%s-%03d", idPrefix, startIdx+j),
			ParentID:  parentID,
			FirstName: firstName,
			LastName:  lastName,
			Email:     fmt.Sprintf("%s@company.com", strings.ToLower(sanitizeEmail(firstName))),
			Phone:     randomPhone(),
			Title:     titles[j%len(titles)],
			IsPrimary: j == 0,
		}
	}
	return contacts
}

// InvoiceAmounts holds calculated invoice amounts.
type InvoiceAmounts struct {
	Subtotal    int64
	TaxAmount   int64
	TotalAmount int64
	AmountPaid  int64
	BalanceDue  int64
}

// calcInvoiceAmounts generates realistic invoice amounts based on payment status.
func calcInvoiceAmounts(isPaid, isPartial bool, minCents, rangeCents int) InvoiceAmounts {
	subtotal := int64(rand.Intn(rangeCents)+minCents) * 100
	taxAmount := subtotal * 7 / 100
	totalAmount := subtotal + taxAmount
	var amountPaid int64
	if isPaid {
		amountPaid = totalAmount
	} else if isPartial {
		amountPaid = totalAmount * int64(rand.Intn(70)+10) / 100
	}
	return InvoiceAmounts{
		Subtotal:    subtotal,
		TaxAmount:   taxAmount,
		TotalAmount: totalAmount,
		AmountPaid:  amountPaid,
		BalanceDue:  totalAmount - amountPaid,
	}
}

// InvoiceLineData holds generated invoice line data.
type InvoiceLineData struct {
	LineID     string
	LineNumber int32
	Quantity   float64
	UnitPrice  int64
	LineAmount int64
	TaxAmount  int64
}

// genInvoiceLineData creates N invoice lines with random quantities and prices.
func genInvoiceLineData(idPrefix string, count, startIdx int) []InvoiceLineData {
	lines := make([]InvoiceLineData, count)
	for j := 0; j < count; j++ {
		qty := float64(rand.Intn(50) + 1)
		price := int64(rand.Intn(9901)+100) * 100
		amount := int64(qty) * price
		lines[j] = InvoiceLineData{
			LineID:     fmt.Sprintf("%s-%03d", idPrefix, startIdx+j),
			LineNumber: int32(j + 1),
			Quantity:   qty,
			UnitPrice:  price,
			LineAmount: amount,
			TaxAmount:  amount * 7 / 100,
		}
	}
	return lines
}

// StatusDist defines a cumulative percentage threshold for status distribution.
type StatusDist struct {
	Value  int32
	CumPct int // cumulative percentage (0-100)
}

// pickStatus returns a status value based on flavorable distribution.
// Example: pickStatus(i, total, []StatusDist{{1, 60}, {2, 80}, {3, 100}})
// gives 60% status 1, 20% status 2, 20% status 3.
func pickStatus(index, total int, dist []StatusDist) int32 {
	if total == 0 {
		return dist[0].Value
	}
	pct := index * 100 / total
	for _, d := range dist {
		if pct < d.CumPct {
			return d.Value
		}
	}
	return dist[len(dist)-1].Value
}
