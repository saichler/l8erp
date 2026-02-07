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
package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

// generateVendors creates vendor records from vendorNames
func generateVendors(store *MockDataStore) []*fin.Vendor {
	vendors := make([]*fin.Vendor, len(vendorNames))
	for i, name := range vendorNames {
		sanitized := strings.ToLower(sanitizeEmail(name))

		// Default to AP account (index 6: "2000 Accounts Payable")
		defaultAccountId := ""
		if len(store.AccountIDs) > 6 {
			defaultAccountId = store.AccountIDs[6]
		}

		vendors[i] = &fin.Vendor{
			VendorId:               genID("vnd", i),
			VendorNumber:           fmt.Sprintf("V%04d", i+1),
			Name:                   name,
			LegalName:              name + " LLC",
			TaxId:                  fmt.Sprintf("%02d-%07d", rand.Intn(90)+10, rand.Intn(9000000)+1000000),
			Status:                 fin.VendorStatus_VENDOR_STATUS_ACTIVE,
			DefaultAccountId:       defaultAccountId,
			CurrencyId:             store.CurrencyIDs[0],
			PaymentTermDays:        30,
			PreferredPaymentMethod: fin.PaymentMethod_PAYMENT_METHOD_ACH,
			Addresses:              []*erp.Address{createAddress()},
			Contacts:               []*erp.ContactInfo{createContact()},
			Website:                fmt.Sprintf("www.%s.com", sanitized),
			AuditInfo:              createAuditInfo(),
		}
	}
	return vendors
}

// generateVendorContacts creates 2 contact persons per vendor
func generateVendorContacts(store *MockDataStore) []*fin.VendorContact {
	contacts := make([]*fin.VendorContact, 0, len(store.VendorIDs)*2)
	idx := 1
	titles := []string{"Sales Rep", "Account Manager"}

	for _, vendorID := range store.VendorIDs {
		for j := 0; j < 2; j++ {
			name := randomName()
			parts := strings.SplitN(name, " ", 2)
			firstName := parts[0]
			lastName := ""
			if len(parts) > 1 {
				lastName = parts[1]
			}
			sanitized := strings.ToLower(sanitizeEmail(firstName))

			contacts = append(contacts, &fin.VendorContact{
				ContactId: fmt.Sprintf("vcnt-%03d", idx),
				VendorId:  vendorID,
				FirstName: firstName,
				LastName:  lastName,
				Title:     titles[j%len(titles)],
				Email:     fmt.Sprintf("%s@vendor.com", sanitized),
				Phone:     randomPhone(),
				IsPrimary: j == 0,
				IsActive:  true,
				AuditInfo: createAuditInfo(),
			})
			idx++
		}
	}
	return contacts
}

// generateCustomers creates customer records from customerNames
func generateCustomers(store *MockDataStore) []*fin.Customer {
	customers := make([]*fin.Customer, len(customerNames))
	for i, name := range customerNames {
		sanitized := strings.ToLower(sanitizeEmail(name))

		// Default to AR account (index 1: "1010 Accounts Receivable")
		defaultAccountId := ""
		if len(store.AccountIDs) > 1 {
			defaultAccountId = store.AccountIDs[1]
		}

		creditAmount := int64(rand.Intn(450001)+50000) * 100 // 50000_00 to 500000_00 cents

		customers[i] = &fin.Customer{
			CustomerId:       genID("cust", i),
			CustomerNumber:   fmt.Sprintf("C%04d", i+1),
			Name:             name,
			LegalName:        name + " Inc.",
			TaxId:            fmt.Sprintf("%02d-%07d", rand.Intn(90)+10, rand.Intn(9000000)+1000000),
			Status:           fin.CustomerStatus_CUSTOMER_STATUS_ACTIVE,
			DefaultAccountId: defaultAccountId,
			CurrencyId:       store.CurrencyIDs[0],
			PaymentTermDays:  30,
			CreditLimit:      money(store, creditAmount),
			Addresses:        []*erp.Address{createAddress()},
			Contacts:         []*erp.ContactInfo{createContact()},
			Website:          fmt.Sprintf("www.%s.com", sanitized),
			AuditInfo:        createAuditInfo(),
		}
	}
	return customers
}

// generateCustomerContacts creates 2 contact persons per customer
func generateCustomerContacts(store *MockDataStore) []*fin.CustomerContact {
	contacts := make([]*fin.CustomerContact, 0, len(store.CustomerIDs)*2)
	idx := 1
	titles := []string{"Sales Rep", "Account Manager"}

	for _, customerID := range store.CustomerIDs {
		for j := 0; j < 2; j++ {
			name := randomName()
			parts := strings.SplitN(name, " ", 2)
			firstName := parts[0]
			lastName := ""
			if len(parts) > 1 {
				lastName = parts[1]
			}
			sanitized := strings.ToLower(sanitizeEmail(firstName))

			contacts = append(contacts, &fin.CustomerContact{
				ContactId:  fmt.Sprintf("ccnt-%03d", idx),
				CustomerId: customerID,
				FirstName:  firstName,
				LastName:   lastName,
				Title:      titles[j%len(titles)],
				Email:      fmt.Sprintf("%s@customer.com", sanitized),
				Phone:      randomPhone(),
				IsPrimary:  j == 0,
				IsActive:   true,
				AuditInfo:  createAuditInfo(),
			})
			idx++
		}
	}
	return contacts
}

// generateBankAccounts creates bank account records from bankNames
func generateBankAccounts(store *MockDataStore) []*fin.BankAccount {
	accounts := make([]*fin.BankAccount, len(bankNames))

	accountTypes := []fin.BankAccountType{
		fin.BankAccountType_BANK_ACCOUNT_TYPE_CHECKING,
		fin.BankAccountType_BANK_ACCOUNT_TYPE_CHECKING,
		fin.BankAccountType_BANK_ACCOUNT_TYPE_CHECKING,
		fin.BankAccountType_BANK_ACCOUNT_TYPE_SAVINGS,
		fin.BankAccountType_BANK_ACCOUNT_TYPE_MONEY_MARKET,
	}

	for i, bankName := range bankNames {
		// GL account for cash (index 0: "1000 Cash")
		glAccountId := ""
		if len(store.AccountIDs) > 0 {
			glAccountId = store.AccountIDs[0]
		}

		balance := int64(rand.Intn(5000000)+500000) * 100 // large amount in cents

		accounts[i] = &fin.BankAccount{
			BankAccountId:       genID("bank", i),
			AccountName:         fmt.Sprintf("Operating - %s", bankName),
			BankName:            bankName,
			AccountNumberMasked: fmt.Sprintf("****%04d", rand.Intn(10000)),
			RoutingNumber:       fmt.Sprintf("%09d", rand.Intn(900000000)+100000000),
			AccountType:         accountTypes[i],
			Status:              fin.BankAccountStatus_BANK_ACCOUNT_STATUS_ACTIVE,
			CurrencyId:          store.CurrencyIDs[0],
			GlAccountId:         glAccountId,
			CurrentBalance:      money(store, balance),
			AuditInfo:           createAuditInfo(),
		}
	}
	return accounts
}

// generateExchangeRates creates exchange rate records for USD to EUR, GBP, JPY, CAD
func generateExchangeRates(store *MockDataStore) []*fin.ExchangeRate {
	rates := make([]*fin.ExchangeRate, 8)

	// Target currency IDs (EUR, GBP, JPY, CAD) from store
	// store.CurrencyIDs[0] = USD, [1] = EUR, [2] = GBP, [3] = JPY, [4] = CAD
	toCurrencyIndices := []int{1, 2, 3, 4}
	rateValues := []float64{0.85, 0.73, 110.0, 1.25}

	// Two effective dates
	date1 := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix()
	date2 := time.Date(2025, 7, 1, 0, 0, 0, 0, time.UTC).Unix()
	effectiveDates := []int64{date1, date2}

	idx := 0
	for d, effectiveDate := range effectiveDates {
		for c, toIdx := range toCurrencyIndices {
			// Slightly vary rates for the second date
			rate := rateValues[c]
			if d == 1 {
				rate *= 1.0 + (rand.Float64()*0.04 - 0.02) // +/- 2% variation
			}

			toCurrencyId := ""
			if toIdx < len(store.CurrencyIDs) {
				toCurrencyId = store.CurrencyIDs[toIdx]
			}

			rates[idx] = &fin.ExchangeRate{
				ExchangeRateId: genID("xr", idx),
				FromCurrencyId: store.CurrencyIDs[0],
				ToCurrencyId:   toCurrencyId,
				Rate:           rate,
				EffectiveDate:  effectiveDate,
				Source:         "Market Data Feed",
				AuditInfo:      createAuditInfo(),
			}
			idx++
		}
	}
	return rates
}
