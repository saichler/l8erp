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
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

// generateVendors creates vendor records with embedded contacts and withholding tax configs
func generateVendors(store *MockDataStore) []*fin.Vendor {
	vendors := make([]*fin.Vendor, len(vendorNames))
	contactIdx := 1
	titles := []string{"Sales Rep", "Account Manager"}

	for i, name := range vendorNames {
		sanitized := strings.ToLower(sanitizeEmail(name))

		defaultAccountId := ""
		if len(store.AccountIDs) > 6 {
			defaultAccountId = store.AccountIDs[6]
		}

		// Generate embedded vendor contacts (2 per vendor)
		vendorContacts := make([]*fin.VendorContact, 2)
		for j := 0; j < 2; j++ {
			cname := randomName()
			parts := strings.SplitN(cname, " ", 2)
			firstName := parts[0]
			lastName := ""
			if len(parts) > 1 {
				lastName = parts[1]
			}
			cSanitized := strings.ToLower(sanitizeEmail(firstName))

			vendorContacts[j] = &fin.VendorContact{
				ContactId: fmt.Sprintf("vcnt-%03d", contactIdx),
				VendorId:  genID("vnd", i),
				FirstName: firstName,
				LastName:  lastName,
				Title:     titles[j%len(titles)],
				Email:     fmt.Sprintf("%s@vendor.com", cSanitized),
				Phone:     randomPhone(),
				IsPrimary: j == 0,
				IsActive:  true,
				AuditInfo: createAuditInfo(),
			}
			contactIdx++
		}

		// Generate embedded withholding tax config (1 for first 4 vendors)
		var whConfigs []*fin.WithholdingTaxConfig
		if i < 4 {
			whRates := []float64{30.0, 15.0, 10.0, 25.0}
			thresholds := []int64{500000, 1000000, 250000, 750000}
			whConfigs = []*fin.WithholdingTaxConfig{
				{
					ConfigId:        genID("whtc", i),
					VendorId:        genID("vnd", i),
					TaxCodeId:       store.TaxCodeIDs[i%len(store.TaxCodeIDs)],
					WithholdingRate: whRates[i],
					ThresholdAmount: money(store, thresholds[i]),
					EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
					IsActive:        true,
					AuditInfo:       createAuditInfo(),
				},
			}
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
			VendorContacts:         vendorContacts,
			WithholdingTaxConfigs:  whConfigs,
		}
	}
	return vendors
}

// generateCustomers creates customer records with embedded contacts
func generateCustomers(store *MockDataStore) []*fin.Customer {
	customers := make([]*fin.Customer, len(customerNames))
	contactIdx := 1
	titles := []string{"Sales Rep", "Account Manager"}

	for i, name := range customerNames {
		sanitized := strings.ToLower(sanitizeEmail(name))

		defaultAccountId := ""
		if len(store.AccountIDs) > 1 {
			defaultAccountId = store.AccountIDs[1]
		}

		creditAmount := int64(rand.Intn(450001)+50000) * 100

		// Generate embedded customer contacts (2 per customer)
		customerContacts := make([]*fin.CustomerContact, 2)
		for j := 0; j < 2; j++ {
			cname := randomName()
			parts := strings.SplitN(cname, " ", 2)
			firstName := parts[0]
			lastName := ""
			if len(parts) > 1 {
				lastName = parts[1]
			}
			cSanitized := strings.ToLower(sanitizeEmail(firstName))

			customerContacts[j] = &fin.CustomerContact{
				ContactId:  fmt.Sprintf("ccnt-%03d", contactIdx),
				CustomerId: genID("cust", i),
				FirstName:  firstName,
				LastName:   lastName,
				Title:      titles[j%len(titles)],
				Email:      fmt.Sprintf("%s@customer.com", cSanitized),
				Phone:      randomPhone(),
				IsPrimary:  j == 0,
				IsActive:   true,
				AuditInfo:  createAuditInfo(),
			}
			contactIdx++
		}

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
			CustomerContacts: customerContacts,
		}
	}
	return customers
}

// generateBankAccounts creates bank account records with embedded transactions and reconciliations
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
		glAccountId := ""
		if len(store.AccountIDs) > 0 {
			glAccountId = store.AccountIDs[0]
		}

		balance := int64(rand.Intn(5000000)+500000) * 100
		bankAccountID := genID("bank", i)

		// Generate embedded transactions (12 per bank account)
		transactions := generateBankTransactionsForAccount(store, bankAccountID, i)

		// Generate embedded reconciliation (1 per bank account)
		reconciliation := generateBankReconciliationForAccount(store, bankAccountID)

		accounts[i] = &fin.BankAccount{
			BankAccountId:       bankAccountID,
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
			Transactions:        transactions,
			Reconciliations:     []*fin.BankReconciliation{reconciliation},
		}
	}
	return accounts
}

// generateExchangeRates creates exchange rate records
func generateExchangeRates(store *MockDataStore) []*fin.ExchangeRate {
	rates := make([]*fin.ExchangeRate, 8)

	toCurrencyIndices := []int{1, 2, 3, 4}
	rateValues := []float64{0.85, 0.73, 110.0, 1.25}

	date1 := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix()
	date2 := time.Date(2025, 7, 1, 0, 0, 0, 0, time.UTC).Unix()
	effectiveDates := []int64{date1, date2}

	idx := 0
	for d, effectiveDate := range effectiveDates {
		for c, toIdx := range toCurrencyIndices {
			rate := rateValues[c]
			if d == 1 {
				rate *= 1.0 + (rand.Float64()*0.04 - 0.02)
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
