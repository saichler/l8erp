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

	l8common "github.com/saichler/l8common/go/types/l8common"
	"github.com/saichler/l8erp/go/types/fin"
)

// vendorContactsFromData converts ContactData into VendorContact structs.
func vendorContactsFromData(data []ContactData, emailDomain string) []*fin.VendorContact {
	contacts := make([]*fin.VendorContact, len(data))
	for j, c := range data {
		contacts[j] = &fin.VendorContact{
			ContactId: c.ContactID,
			VendorId:  c.ParentID,
			FirstName: c.FirstName,
			LastName:  c.LastName,
			Title:     c.Title,
			Email:     strings.Replace(c.Email, "@company.com", "@"+emailDomain, 1),
			Phone:     c.Phone,
			IsPrimary: c.IsPrimary,
			IsActive:  true,
			AuditInfo: createAuditInfo(),
		}
	}
	return contacts
}

// customerContactsFromData converts ContactData into CustomerContact structs.
func customerContactsFromData(data []ContactData, emailDomain string) []*fin.CustomerContact {
	contacts := make([]*fin.CustomerContact, len(data))
	for j, c := range data {
		contacts[j] = &fin.CustomerContact{
			ContactId:  c.ContactID,
			CustomerId: c.ParentID,
			FirstName:  c.FirstName,
			LastName:   c.LastName,
			Title:      c.Title,
			Email:      strings.Replace(c.Email, "@company.com", "@"+emailDomain, 1),
			Phone:      c.Phone,
			IsPrimary:  c.IsPrimary,
			IsActive:   true,
			AuditInfo:  createAuditInfo(),
		}
	}
	return contacts
}

// generateVendors creates vendor records with embedded contacts and withholding tax configs
func generateVendors(store *MockDataStore) []*fin.Vendor {
	vendors := make([]*fin.Vendor, len(vendorNames))
	contactIdx := 1
	titles := []string{"Sales Rep", "Account Manager"}

	for i, name := range vendorNames {
		sanitized := strings.ToLower(sanitizeEmail(name))

		// First vendor gets vendorId="hcm" for portal demo user
		vndId := genID("vnd", i)
		if i == 0 {
			vndId = "hcm"
		}

		defaultAccountId := ""
		if len(store.AccountIDs) > 6 {
			defaultAccountId = store.AccountIDs[6]
		}

		// Generate embedded vendor contacts (2 per vendor)
		contactData := generatePersonContacts(vndId, "vcnt", 2, contactIdx, titles)
		vendorContacts := vendorContactsFromData(contactData, "vendor.com")
		contactIdx += 2

		// Generate embedded withholding tax config (1 for first 4 vendors)
		var whConfigs []*fin.WithholdingTaxConfig
		if i < 4 {
			whRates := []float64{30.0, 15.0, 10.0, 25.0}
			thresholds := []int64{500000, 1000000, 250000, 750000}
			whConfigs = []*fin.WithholdingTaxConfig{
				{
					ConfigId:        genID("whtc", i),
					VendorId:        vndId,
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
			VendorId:               vndId,
			VendorNumber:           fmt.Sprintf("V%04d", i+1),
			Name:                   name,
			LegalName:              name + " LLC",
			TaxId:                  fmt.Sprintf("%02d-%07d", rand.Intn(90)+10, rand.Intn(9000000)+1000000),
			Status:                 fin.VendorStatus_VENDOR_STATUS_ACTIVE,
			DefaultAccountId:       defaultAccountId,
			CurrencyId:             store.CurrencyIDs[0],
			PaymentTermDays:        30,
			PreferredPaymentMethod: fin.PaymentMethod_PAYMENT_METHOD_ACH,
			Addresses:              []*l8common.Address{createAddress()},
			Contacts:               []*l8common.ContactInfo{createContact()},
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

		// First customer gets customerId="hcm" for portal demo user
		custId := genID("cust", i)
		if i == 0 {
			custId = "hcm"
		}

		// Generate embedded customer contacts (2 per customer)
		contactData := generatePersonContacts(custId, "ccnt", 2, contactIdx, titles)
		customerContacts := customerContactsFromData(contactData, "customer.com")
		contactIdx += 2

		customers[i] = &fin.Customer{
			CustomerId:       custId,
			CustomerNumber:   fmt.Sprintf("C%04d", i+1),
			Name:             name,
			LegalName:        name + " Inc.",
			TaxId:            fmt.Sprintf("%02d-%07d", rand.Intn(90)+10, rand.Intn(9000000)+1000000),
			Status:           fin.CustomerStatus_CUSTOMER_STATUS_ACTIVE,
			DefaultAccountId: defaultAccountId,
			CurrencyId:       store.CurrencyIDs[0],
			PaymentTermDays:  30,
			CreditLimit:      money(store, creditAmount),
			Addresses:        []*l8common.Address{createAddress()},
			Contacts:         []*l8common.ContactInfo{createContact()},
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
