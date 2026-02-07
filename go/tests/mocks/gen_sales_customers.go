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
	"time"

	"github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/sales"
)

// generateSalesPartnerChannels creates channel partner records
func generateSalesPartnerChannels(store *MockDataStore) []*sales.SalesPartnerChannel {
	partnerTypes := []sales.SalesPartnerType{
		sales.SalesPartnerType_PARTNER_TYPE_RESELLER,
		sales.SalesPartnerType_PARTNER_TYPE_DISTRIBUTOR,
		sales.SalesPartnerType_PARTNER_TYPE_VAR,
		sales.SalesPartnerType_PARTNER_TYPE_AGENT,
		sales.SalesPartnerType_PARTNER_TYPE_AFFILIATE,
	}

	partners := make([]*sales.SalesPartnerChannel, len(salesPartnerNames))
	for i, name := range salesPartnerNames {
		territoryID := pickRef(store.SalesTerritoryIDs, i)

		startDate := time.Now().AddDate(-rand.Intn(3), 0, 0)
		var endDate int64
		if i%4 == 0 { // 25% have end dates
			endDate = startDate.AddDate(2, 0, 0).Unix()
		}

		partners[i] = &sales.SalesPartnerChannel{
			PartnerId:      genID("spc", i),
			Name:           name,
			PartnerType:    partnerTypes[i%len(partnerTypes)],
			ContactName:    randomName(),
			Email:          fmt.Sprintf("contact@%s.com", sanitizeEmail(name)),
			Phone:          randomPhone(),
			Address:        createAddress(),
			CommissionRate: float64(rand.Intn(15)+5) / 100, // 5-20%
			TerritoryId:    territoryID,
			IsActive:       true,
			StartDate:      startDate.Unix(),
			EndDate:        endDate,
			Notes:          fmt.Sprintf("Partner channel: %s", name),
			AuditInfo:      createAuditInfo(),
		}
	}
	return partners
}

// generateSalesCustomerContracts creates customer contract records
func generateSalesCustomerContracts(store *MockDataStore) []*sales.SalesCustomerContract {
	statuses := []sales.SalesContractStatus{
		sales.SalesContractStatus_CONTRACT_STATUS_ACTIVE,
		sales.SalesContractStatus_CONTRACT_STATUS_ACTIVE,
		sales.SalesContractStatus_CONTRACT_STATUS_ACTIVE,
		sales.SalesContractStatus_CONTRACT_STATUS_ACTIVE,
		sales.SalesContractStatus_CONTRACT_STATUS_DRAFT,
		sales.SalesContractStatus_CONTRACT_STATUS_RENEWED,
		sales.SalesContractStatus_CONTRACT_STATUS_EXPIRED,
	}

	count := minInt(15, len(store.CustomerIDs))
	if count == 0 {
		count = 15
	}

	contracts := make([]*sales.SalesCustomerContract, count)
	for i := 0; i < count; i++ {
		customerID := pickRef(store.CustomerIDs, i)

		salespersonID := pickRef(store.EmployeeIDs, i)

		priceListID := pickRef(store.SalesPriceListIDs, i)

		startDate := time.Now().AddDate(0, -rand.Intn(12), 0)
		endDate := startDate.AddDate(1, 0, 0)

		contracts[i] = &sales.SalesCustomerContract{
			ContractId:     genID("scc", i),
			ContractNumber: fmt.Sprintf("CTR-%04d", rand.Intn(9000)+1000),
			CustomerId:     customerID,
			Name:           fmt.Sprintf("Customer Contract %d", i+1),
			Status:         statuses[i%len(statuses)],
			StartDate:      startDate.Unix(),
			EndDate:        endDate.Unix(),
			ContractValue: &erp.Money{
				Amount:       int64(rand.Intn(50000000) + 1000000), // $10k - $500k
				CurrencyId: pickRef(store.CurrencyIDs, i),
			},
			PriceListId:       priceListID,
			PaymentTerms:      "Net 30",
			SalespersonId:     salespersonID,
			AutoRenew:         rand.Intn(2) == 1,
			RenewalNoticeDays: int32(rand.Intn(60) + 30),
			AuditInfo:         createAuditInfo(),
		}
	}
	return contracts
}
