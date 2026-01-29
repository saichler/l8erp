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
	"github.com/saichler/l8erp/go/types/fin"
)

// generateBankTransactions creates bank transaction records across bank accounts
func generateBankTransactions(store *MockDataStore) []*fin.BankTransaction {
	txns := make([]*fin.BankTransaction, 60)
	txnTypes := []fin.TransactionType{
		fin.TransactionType_TRANSACTION_TYPE_DEPOSIT,
		fin.TransactionType_TRANSACTION_TYPE_WITHDRAWAL,
		fin.TransactionType_TRANSACTION_TYPE_FEE,
		fin.TransactionType_TRANSACTION_TYPE_INTEREST,
	}
	descriptions := map[fin.TransactionType][]string{
		fin.TransactionType_TRANSACTION_TYPE_DEPOSIT:    {"Customer payment received", "Wire transfer deposit", "ACH deposit", "Check deposit"},
		fin.TransactionType_TRANSACTION_TYPE_WITHDRAWAL: {"Vendor payment", "Payroll disbursement", "Rent payment", "Utility payment"},
		fin.TransactionType_TRANSACTION_TYPE_FEE:        {"Monthly service fee", "Wire transfer fee", "Overdraft fee", "Account maintenance fee"},
		fin.TransactionType_TRANSACTION_TYPE_INTEREST:   {"Monthly interest earned", "Savings interest", "Money market interest"},
	}

	runningBalance := int64(500000_00) // Start with $500,000.00
	for i := 0; i < 60; i++ {
		acctIdx := i % len(store.BankAccountIDs)
		txnType := txnTypes[i%len(txnTypes)]
		txnDate := time.Date(2025, time.Month((i/5)%12+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
		descs := descriptions[txnType]
		desc := descs[rand.Intn(len(descs))]

		var amount int64
		switch txnType {
		case fin.TransactionType_TRANSACTION_TYPE_DEPOSIT:
			amount = int64(rand.Intn(50000)+1000) * 100
			runningBalance += amount
		case fin.TransactionType_TRANSACTION_TYPE_WITHDRAWAL:
			amount = int64(rand.Intn(30000)+500) * 100
			runningBalance -= amount
		case fin.TransactionType_TRANSACTION_TYPE_FEE:
			amount = int64(rand.Intn(50)+10) * 100
			runningBalance -= amount
		case fin.TransactionType_TRANSACTION_TYPE_INTEREST:
			amount = int64(rand.Intn(500)+50) * 100
			runningBalance += amount
		}

		txns[i] = &fin.BankTransaction{
			TransactionId:   fmt.Sprintf("btxn-%04d", i+1),
			BankAccountId:   store.BankAccountIDs[acctIdx],
			TransactionDate: txnDate.Unix(),
			ValueDate:       txnDate.Unix(),
			TransactionType: txnType,
			Amount:          &erp.Money{Amount: amount, CurrencyCode: "USD"},
			RunningBalance:  &erp.Money{Amount: runningBalance, CurrencyCode: "USD"},
			Description:     desc,
			Reference:       fmt.Sprintf("REF-%06d", rand.Intn(999999)+1),
			IsReconciled:    i < 48, // older ones reconciled
			AuditInfo:       createAuditInfo(),
		}
	}
	return txns
}

// generateBankReconciliations creates bank reconciliation records (1 per bank account)
func generateBankReconciliations(store *MockDataStore) []*fin.BankReconciliation {
	count := minInt(5, len(store.BankAccountIDs))
	recs := make([]*fin.BankReconciliation, count)

	for i := 0; i < count; i++ {
		periodStart := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
		periodEnd := time.Date(2025, 1, 31, 23, 59, 59, 0, time.UTC)
		stmtBalance := int64(rand.Intn(500000)+100000) * 100
		bookBalance := stmtBalance + int64(rand.Intn(500)-250)*100
		adjustedBalance := stmtBalance
		difference := adjustedBalance - bookBalance

		recs[i] = &fin.BankReconciliation{
			ReconciliationId: fmt.Sprintf("brec-%03d", i+1),
			BankAccountId:    store.BankAccountIDs[i],
			StatementDate:    periodEnd.Unix(),
			PeriodStart:      periodStart.Unix(),
			PeriodEnd:        periodEnd.Unix(),
			StatementBalance: &erp.Money{Amount: stmtBalance, CurrencyCode: "USD"},
			BookBalance:      &erp.Money{Amount: bookBalance, CurrencyCode: "USD"},
			AdjustedBalance:  &erp.Money{Amount: adjustedBalance, CurrencyCode: "USD"},
			Difference:       &erp.Money{Amount: difference, CurrencyCode: "USD"},
			Status:           fin.ReconciliationStatus_RECONCILIATION_STATUS_COMPLETED,
			MatchedCount:     int32(rand.Intn(20) + 10),
			UnmatchedCount:   int32(rand.Intn(3)),
			ReconciledBy:     "mock-generator",
			ReconciledDate:   time.Date(2025, 2, 5, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return recs
}

// generateCashForecasts creates quarterly cash forecast records
func generateCashForecasts(store *MockDataStore) []*fin.CashForecast {
	forecasts := make([]*fin.CashForecast, 4)
	quarterNames := []string{"Q1 2025 Cash Forecast", "Q2 2025 Cash Forecast", "Q3 2025 Cash Forecast", "Q4 2025 Cash Forecast"}
	openingBalance := int64(1000000_00) // $1,000,000.00

	for i := 0; i < 4; i++ {
		qStart := time.Date(2025, time.Month(i*3+1), 1, 0, 0, 0, 0, time.UTC)
		qEnd := time.Date(2025, time.Month(i*3+3+1), 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1)
		inflows := int64(rand.Intn(500000)+300000) * 100
		outflows := int64(rand.Intn(400000)+200000) * 100
		netCashFlow := inflows - outflows
		closingBalance := openingBalance + netCashFlow

		forecasts[i] = &fin.CashForecast{
			ForecastId:        fmt.Sprintf("cfcst-%03d", i+1),
			ForecastName:      quarterNames[i],
			ForecastDate:      qStart.Unix(),
			PeriodStart:       qStart.Unix(),
			PeriodEnd:         qEnd.Unix(),
			OpeningBalance:    &erp.Money{Amount: openingBalance, CurrencyCode: "USD"},
			ProjectedInflows:  &erp.Money{Amount: inflows, CurrencyCode: "USD"},
			ProjectedOutflows: &erp.Money{Amount: outflows, CurrencyCode: "USD"},
			NetCashFlow:       &erp.Money{Amount: netCashFlow, CurrencyCode: "USD"},
			ClosingBalance:    &erp.Money{Amount: closingBalance, CurrencyCode: "USD"},
			AuditInfo:         createAuditInfo(),
		}
		openingBalance = closingBalance
	}
	return forecasts
}

// generateFundTransfers creates fund transfer records between bank accounts
func generateFundTransfers(store *MockDataStore) []*fin.FundTransfer {
	transfers := make([]*fin.FundTransfer, 5)
	for i := 0; i < 5; i++ {
		fromIdx := i % len(store.BankAccountIDs)
		toIdx := (i + 1) % len(store.BankAccountIDs)
		transferDate := time.Date(2025, time.Month(i+1), 15, 0, 0, 0, 0, time.UTC)

		status := fin.TransferStatus_TRANSFER_STATUS_COMPLETED
		if i == 4 {
			status = fin.TransferStatus_TRANSFER_STATUS_PENDING
		}

		transfers[i] = &fin.FundTransfer{
			TransferId:        fmt.Sprintf("fxfr-%03d", i+1),
			FromBankAccountId: store.BankAccountIDs[fromIdx],
			ToBankAccountId:   store.BankAccountIDs[toIdx],
			Amount:            &erp.Money{Amount: int64(rand.Intn(100000)+10000) * 100, CurrencyCode: "USD"},
			TransferDate:      transferDate.Unix(),
			ValueDate:         transferDate.Unix(),
			Status:            status,
			Reference:         fmt.Sprintf("TRF-%06d", rand.Intn(999999)+1),
			AuditInfo:         createAuditInfo(),
		}
	}
	return transfers
}

// generatePettyCash creates petty cash fund records
func generatePettyCash(store *MockDataStore) []*fin.PettyCash {
	fundNames := []string{"Main Office Petty Cash", "Warehouse Petty Cash", "Branch Office Petty Cash"}
	funds := make([]*fin.PettyCash, 3)

	for i := 0; i < 3; i++ {
		empIdx := i % len(store.EmployeeIDs)
		currentBalance := int64(rand.Intn(40000) + 10000) // random fraction of limit

		funds[i] = &fin.PettyCash{
			PettyCashId:         fmt.Sprintf("pcash-%03d", i+1),
			FundName:            fundNames[i],
			CustodianEmployeeId: store.EmployeeIDs[empIdx],
			FundLimit:           &erp.Money{Amount: 50000, CurrencyCode: "USD"},
			CurrentBalance:      &erp.Money{Amount: currentBalance, CurrencyCode: "USD"},
			LastReplenishedDate: time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC).Unix(),
			IsActive:            true,
			AuditInfo:           createAuditInfo(),
		}
	}
	return funds
}

var assetNames = []string{
	"Dell Laptop 15in", "HP Desktop Pro", "MacBook Pro 16in",
	"Office Desk - Executive", "Office Chair - Ergonomic", "Conference Table",
	"Filing Cabinet", "Toyota Camry 2023", "Ford F-150 2024",
	"Honda Civic 2023", "Cisco Network Switch", "HP LaserJet Printer",
	"Canon Copier", "Server Rack - Primary", "UPS Backup System",
	"HVAC Unit - Floor 2", "Security Camera System", "Phone System - VoIP",
	"Projector - Conf Room A", "Whiteboard - Digital", "Standing Desk Converter",
	"Monitor - 27in 4K", "Tablet - iPad Pro", "Warehouse Shelving Unit",
	"Forklift - Electric",
}

// generateAssets creates fixed asset records
func generateAssets(store *MockDataStore) []*fin.Asset {
	assets := make([]*fin.Asset, 25)
	// Fixed Assets account is acct-005 (account number 1100)
	fixedAssetsAccountID := store.AccountIDs[4]

	for i := 0; i < 25; i++ {
		catIdx := i % len(store.AssetCategoryIDs)
		deptIdx := i % len(store.DepartmentIDs)
		vendorIdx := i % len(store.VendorIDs)
		acqCost := int64(rand.Intn(4950000)+50000) // 500_00 to ~50000_00
		salvageValue := acqCost / 10
		usefulLife := int32(rand.Intn(85) + 36) // 36-120
		acqDate := time.Now().AddDate(-(rand.Intn(5) + 1), -rand.Intn(12), 0)

		status := fin.AssetStatus_ASSET_STATUS_ACTIVE
		if i >= 22 {
			status = fin.AssetStatus_ASSET_STATUS_FULLY_DEPRECIATED
		}

		depreciable := acqCost - salvageValue
		monthsElapsed := int64(time.Since(acqDate).Hours() / (24 * 30))
		if monthsElapsed > int64(usefulLife) {
			monthsElapsed = int64(usefulLife)
		}
		monthlyDepr := depreciable / int64(usefulLife)
		accumulated := monthlyDepr * monthsElapsed
		netBookValue := acqCost - accumulated

		assets[i] = &fin.Asset{
			AssetId:                 fmt.Sprintf("ast-%03d", i+1),
			AssetNumber:             fmt.Sprintf("FA-%05d", i+1),
			Name:                    assetNames[i],
			Description:             fmt.Sprintf("Fixed asset: %s", assetNames[i]),
			CategoryId:              store.AssetCategoryIDs[catIdx],
			SerialNumber:            fmt.Sprintf("SN-%08d", rand.Intn(99999999)+1),
			Status:                  status,
			AcquisitionDate:         acqDate.Unix(),
			AcquisitionCost:         &erp.Money{Amount: acqCost, CurrencyCode: "USD"},
			SalvageValue:            &erp.Money{Amount: salvageValue, CurrencyCode: "USD"},
			UsefulLifeMonths:        usefulLife,
			DepreciationMethod:      fin.DepreciationMethod_DEPRECIATION_METHOD_STRAIGHT_LINE,
			AccumulatedDepreciation: &erp.Money{Amount: accumulated, CurrencyCode: "USD"},
			NetBookValue:            &erp.Money{Amount: netBookValue, CurrencyCode: "USD"},
			DepartmentId:            store.DepartmentIDs[deptIdx],
			Location:                fmt.Sprintf("Building %d, Floor %d", (i/5)+1, (i%5)+1),
			GlAccountId:            fixedAssetsAccountID,
			VendorId:               store.VendorIDs[vendorIdx],
			PurchaseOrderNumber:     fmt.Sprintf("PO-%06d", i+1),
			AuditInfo:              createAuditInfo(),
		}
	}
	return assets
}

// generateDepreciationSchedules creates depreciation schedule records (1 per asset)
func generateDepreciationSchedules(store *MockDataStore) []*fin.DepreciationSchedule {
	schedules := make([]*fin.DepreciationSchedule, 25)
	// Use first 2025 fiscal period (fp-013 = FY2025-M01)
	periodIdx := minInt(12, len(store.FiscalPeriodIDs)-1) // index 12 = fp-013

	for i := 0; i < 25; i++ {
		assetIdx := i % len(store.AssetIDs)
		// Estimate monthly depreciation from typical asset cost
		depreciationAmount := int64(rand.Intn(500)+100) * 100
		accumulated := depreciationAmount * int64(i+1)
		remaining := int64(rand.Intn(30000)+5000) * 100
		deprDate := time.Date(2025, 1, 31, 0, 0, 0, 0, time.UTC)

		schedules[i] = &fin.DepreciationSchedule{
			ScheduleId:         fmt.Sprintf("depr-%03d", i+1),
			AssetId:            store.AssetIDs[assetIdx],
			FiscalPeriodId:     store.FiscalPeriodIDs[periodIdx],
			DepreciationDate:   deprDate.Unix(),
			DepreciationAmount: &erp.Money{Amount: depreciationAmount, CurrencyCode: "USD"},
			AccumulatedAmount:  &erp.Money{Amount: accumulated, CurrencyCode: "USD"},
			RemainingValue:     &erp.Money{Amount: remaining, CurrencyCode: "USD"},
			IsPosted:           true,
			AuditInfo:          createAuditInfo(),
		}
	}
	return schedules
}

// generateAssetDisposals creates asset disposal records
func generateAssetDisposals(store *MockDataStore) []*fin.AssetDisposal {
	disposals := make([]*fin.AssetDisposal, 3)
	methods := []fin.DisposalMethod{
		fin.DisposalMethod_DISPOSAL_METHOD_SALE,
		fin.DisposalMethod_DISPOSAL_METHOD_SCRAP,
		fin.DisposalMethod_DISPOSAL_METHOD_WRITE_OFF,
	}
	buyerNames := []string{"Used Equipment Corp", "", ""}

	for i := 0; i < 3; i++ {
		assetIdx := len(store.AssetIDs) - 3 + i
		if assetIdx < 0 {
			assetIdx = i
		}
		disposalDate := time.Date(2025, time.Month(i+1), 15, 0, 0, 0, 0, time.UTC)
		netBookValue := int64(rand.Intn(5000)+1000) * 100
		var proceeds int64
		if methods[i] == fin.DisposalMethod_DISPOSAL_METHOD_SALE {
			proceeds = netBookValue + int64(rand.Intn(2000)-1000)*100
		}
		gainLoss := proceeds - netBookValue
		// Use Miscellaneous Expense account (acct-026, index 25)
		gainLossAcctIdx := minInt(25, len(store.AccountIDs)-1)

		disposals[i] = &fin.AssetDisposal{
			DisposalId:             fmt.Sprintf("adisp-%03d", i+1),
			AssetId:                store.AssetIDs[assetIdx],
			DisposalDate:           disposalDate.Unix(),
			DisposalMethod:         methods[i],
			DisposalProceeds:       &erp.Money{Amount: proceeds, CurrencyCode: "USD"},
			NetBookValueAtDisposal: &erp.Money{Amount: netBookValue, CurrencyCode: "USD"},
			GainLoss:               &erp.Money{Amount: gainLoss, CurrencyCode: "USD"},
			GainLossAccountId:      store.AccountIDs[gainLossAcctIdx],
			BuyerName:              buyerNames[i],
			AuditInfo:              createAuditInfo(),
		}
	}
	return disposals
}

// generateAssetTransfers creates asset transfer records between departments
func generateAssetTransfers(store *MockDataStore) []*fin.AssetTransfer {
	transfers := make([]*fin.AssetTransfer, 5)
	reasons := []string{
		"Office relocation",
		"Department reorganization",
		"New project assignment",
		"Space optimization",
		"Team expansion",
	}

	for i := 0; i < 5; i++ {
		assetIdx := i % len(store.AssetIDs)
		fromDeptIdx := i % len(store.DepartmentIDs)
		toDeptIdx := (i + 1) % len(store.DepartmentIDs)
		transferDate := time.Date(2025, time.Month(i+1), 10, 0, 0, 0, 0, time.UTC)

		transfers[i] = &fin.AssetTransfer{
			TransferId:       fmt.Sprintf("axfr-%03d", i+1),
			AssetId:          store.AssetIDs[assetIdx],
			TransferDate:     transferDate.Unix(),
			FromDepartmentId: store.DepartmentIDs[fromDeptIdx],
			ToDepartmentId:   store.DepartmentIDs[toDeptIdx],
			FromLocation:     fmt.Sprintf("Building %d", fromDeptIdx+1),
			ToLocation:       fmt.Sprintf("Building %d", toDeptIdx+1),
			Reason:           reasons[i],
			ApprovedBy:       "mock-generator",
			ApprovedDate:     transferDate.AddDate(0, 0, -2).Unix(),
			AuditInfo:        createAuditInfo(),
		}
	}
	return transfers
}

// generateAssetMaintenance creates asset maintenance records
func generateAssetMaintenance(store *MockDataStore) []*fin.AssetMaintenance {
	records := make([]*fin.AssetMaintenance, 10)
	mTypes := []fin.MaintenanceType{
		fin.MaintenanceType_MAINTENANCE_TYPE_PREVENTIVE,
		fin.MaintenanceType_MAINTENANCE_TYPE_CORRECTIVE,
		fin.MaintenanceType_MAINTENANCE_TYPE_INSPECTION,
	}
	descriptions := []string{
		"Scheduled preventive maintenance",
		"Repair of malfunctioning component",
		"Annual safety inspection",
		"Firmware update and calibration",
		"Replacement of worn parts",
	}

	for i := 0; i < 10; i++ {
		assetIdx := i % len(store.AssetIDs)
		vendorIdx := i % len(store.VendorIDs)
		mType := mTypes[i%len(mTypes)]
		scheduledDate := time.Date(2025, time.Month((i%6)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)

		status := fin.MaintenanceStatus_MAINTENANCE_STATUS_COMPLETED
		var completedDate int64
		if i >= 8 {
			status = fin.MaintenanceStatus_MAINTENANCE_STATUS_SCHEDULED
		} else {
			completedDate = scheduledDate.AddDate(0, 0, rand.Intn(3)+1).Unix()
		}

		records[i] = &fin.AssetMaintenance{
			MaintenanceId:   fmt.Sprintf("amnt-%03d", i+1),
			AssetId:         store.AssetIDs[assetIdx],
			MaintenanceType: mType,
			Status:          status,
			ScheduledDate:   scheduledDate.Unix(),
			CompletedDate:   completedDate,
			VendorId:        store.VendorIDs[vendorIdx],
			Cost:            &erp.Money{Amount: int64(rand.Intn(5000)+200) * 100, CurrencyCode: "USD"},
			Description:     descriptions[i%len(descriptions)],
			WorkOrderNumber: fmt.Sprintf("WO-%06d", rand.Intn(999999)+1),
			AuditInfo:       createAuditInfo(),
		}
	}
	return records
}

// generateAssetRevaluations creates asset revaluation records
func generateAssetRevaluations(store *MockDataStore) []*fin.AssetRevaluation {
	revals := make([]*fin.AssetRevaluation, 5)
	reasons := []string{
		"Market value update",
		"Impairment review",
		"Annual fair value assessment",
		"Insurance appraisal adjustment",
		"Technology obsolescence review",
	}

	for i := 0; i < 5; i++ {
		assetIdx := i % len(store.AssetIDs)
		revalDate := time.Date(2025, time.Month(i+1), 20, 0, 0, 0, 0, time.UTC)
		previousValue := int64(rand.Intn(30000)+10000) * 100
		adjustment := int64(rand.Intn(10000)-5000) * 100
		newValue := previousValue + adjustment

		revals[i] = &fin.AssetRevaluation{
			RevaluationId:    fmt.Sprintf("arval-%03d", i+1),
			AssetId:          store.AssetIDs[assetIdx],
			RevaluationDate:  revalDate.Unix(),
			PreviousValue:    &erp.Money{Amount: previousValue, CurrencyCode: "USD"},
			NewValue:         &erp.Money{Amount: newValue, CurrencyCode: "USD"},
			AdjustmentAmount: &erp.Money{Amount: adjustment, CurrencyCode: "USD"},
			Reason:           reasons[i],
			Appraiser:        "Independent Appraiser LLC",
			AuditInfo:        createAuditInfo(),
		}
	}
	return revals
}
