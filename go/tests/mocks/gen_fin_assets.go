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

	"github.com/saichler/l8erp/go/types/fin"
)

// generateBankTransactionsForAccount creates bank transactions for a single bank account
func generateBankTransactionsForAccount(store *MockDataStore, bankAccountID string, acctIndex int) []*fin.BankTransaction {
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

	count := 12
	txns := make([]*fin.BankTransaction, count)
	runningBalance := int64(500000_00)

	for i := 0; i < count; i++ {
		globalIdx := acctIndex*count + i
		txnType := txnTypes[i%len(txnTypes)]
		txnDate := time.Date(2025, time.Month((i)%12+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
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
			TransactionId:   fmt.Sprintf("btxn-%04d", globalIdx+1),
			BankAccountId:   bankAccountID,
			TransactionDate: txnDate.Unix(),
			ValueDate:       txnDate.Unix(),
			TransactionType: txnType,
			Amount:          money(store, amount),
			RunningBalance:  money(store, runningBalance),
			Description:     desc,
			Reference:       fmt.Sprintf("REF-%06d", rand.Intn(999999)+1),
			IsReconciled:    i < 10,
			AuditInfo:       createAuditInfo(),
		}
	}
	return txns
}

// generateBankReconciliationForAccount creates a reconciliation for a single bank account
func generateBankReconciliationForAccount(store *MockDataStore, bankAccountID string) *fin.BankReconciliation {
	periodStart := time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)
	periodEnd := time.Date(2025, 1, 31, 23, 59, 59, 0, time.UTC)
	stmtBalance := int64(rand.Intn(500000)+100000) * 100
	bookBalance := stmtBalance + int64(rand.Intn(500)-250)*100
	adjustedBalance := stmtBalance
	difference := adjustedBalance - bookBalance

	return &fin.BankReconciliation{
		ReconciliationId: genID("brec", rand.Intn(100)),
		BankAccountId:    bankAccountID,
		StatementDate:    periodEnd.Unix(),
		PeriodStart:      periodStart.Unix(),
		PeriodEnd:        periodEnd.Unix(),
		StatementBalance: money(store, stmtBalance),
		BookBalance:      money(store, bookBalance),
		AdjustedBalance:  money(store, adjustedBalance),
		Difference:       money(store, difference),
		Status:           fin.ReconciliationStatus_RECONCILIATION_STATUS_COMPLETED,
		MatchedCount:     int32(rand.Intn(20) + 10),
		UnmatchedCount:   int32(rand.Intn(3)),
		ReconciledBy:     "mock-generator",
		ReconciledDate:   time.Date(2025, 2, 5, 0, 0, 0, 0, time.UTC).Unix(),
		AuditInfo:        createAuditInfo(),
	}
}

// generateCashForecasts creates quarterly cash forecast records
func generateCashForecasts(store *MockDataStore) []*fin.CashForecast {
	forecasts := make([]*fin.CashForecast, 4)
	quarterNames := []string{"Q1 2025 Cash Forecast", "Q2 2025 Cash Forecast", "Q3 2025 Cash Forecast", "Q4 2025 Cash Forecast"}
	openingBalance := int64(1000000_00)

	for i := 0; i < 4; i++ {
		qStart := time.Date(2025, time.Month(i*3+1), 1, 0, 0, 0, 0, time.UTC)
		qEnd := time.Date(2025, time.Month(i*3+3+1), 1, 0, 0, 0, 0, time.UTC).AddDate(0, 0, -1)
		inflows := int64(rand.Intn(500000)+300000) * 100
		outflows := int64(rand.Intn(400000)+200000) * 100
		netCashFlow := inflows - outflows
		closingBalance := openingBalance + netCashFlow

		forecasts[i] = &fin.CashForecast{
			ForecastId:        genID("cfcst", i),
			ForecastName:      quarterNames[i],
			ForecastDate:      qStart.Unix(),
			PeriodStart:       qStart.Unix(),
			PeriodEnd:         qEnd.Unix(),
			OpeningBalance:    money(store, openingBalance),
			ProjectedInflows:  money(store, inflows),
			ProjectedOutflows: money(store, outflows),
			NetCashFlow:       money(store, netCashFlow),
			ClosingBalance:    money(store, closingBalance),
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
			TransferId:        genID("fxfr", i),
			FromBankAccountId: store.BankAccountIDs[fromIdx],
			ToBankAccountId:   store.BankAccountIDs[toIdx],
			Amount:            money(store, int64(rand.Intn(100000)+10000)*100),
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
		currentBalance := int64(rand.Intn(40000) + 10000)

		funds[i] = &fin.PettyCash{
			PettyCashId:         genID("pcash", i),
			FundName:            fundNames[i],
			CustodianEmployeeId: store.EmployeeIDs[empIdx],
			FundLimit:           money(store, 50000),
			CurrentBalance:      money(store, currentBalance),
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

// generateAssets creates fixed asset records with embedded child entities
func generateAssets(store *MockDataStore) []*fin.Asset {
	assets := make([]*fin.Asset, 25)
	fixedAssetsAccountID := store.AccountIDs[4]

	for i := 0; i < 25; i++ {
		catIdx := i % len(store.AssetCategoryIDs)
		deptIdx := i % len(store.DepartmentIDs)
		vendorIdx := i % len(store.VendorIDs)
		acqCost := int64(rand.Intn(4950000) + 50000)
		salvageValue := acqCost / 10
		usefulLife := int32(rand.Intn(85) + 36)
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

		assetID := genID("ast", i)

		// Embedded depreciation schedules (1 per asset)
		periodIdx := minInt(12, len(store.FiscalPeriodIDs)-1)
		deprAmount := int64(rand.Intn(500)+100) * 100
		deprAccum := deprAmount * int64(i+1)
		deprRemaining := int64(rand.Intn(30000)+5000) * 100

		deprSchedules := []*fin.DepreciationSchedule{
			{
				ScheduleId:         genID("depr", i),
				AssetId:            assetID,
				FiscalPeriodId:     store.FiscalPeriodIDs[periodIdx],
				DepreciationDate:   time.Date(2025, 1, 31, 0, 0, 0, 0, time.UTC).Unix(),
				DepreciationAmount: money(store, deprAmount),
				AccumulatedAmount:  money(store, deprAccum),
				RemainingValue:     money(store, deprRemaining),
				IsPosted:           true,
				AuditInfo:          createAuditInfo(),
			},
		}

		// Embedded disposals (for last 3 assets)
		var disposals []*fin.AssetDisposal
		if i >= 22 {
			dispIdx := i - 22
			methods := []fin.DisposalMethod{
				fin.DisposalMethod_DISPOSAL_METHOD_SALE,
				fin.DisposalMethod_DISPOSAL_METHOD_SCRAP,
				fin.DisposalMethod_DISPOSAL_METHOD_WRITE_OFF,
			}
			buyerNames := []string{"Used Equipment Corp", "", ""}
			dispDate := time.Date(2025, time.Month(dispIdx+1), 15, 0, 0, 0, 0, time.UTC)
			nbv := int64(rand.Intn(5000)+1000) * 100
			var proceeds int64
			if methods[dispIdx] == fin.DisposalMethod_DISPOSAL_METHOD_SALE {
				proceeds = nbv + int64(rand.Intn(2000)-1000)*100
			}
			gainLoss := proceeds - nbv
			gainLossAcctIdx := minInt(25, len(store.AccountIDs)-1)

			disposals = []*fin.AssetDisposal{
				{
					DisposalId:             genID("adisp", dispIdx),
					AssetId:                assetID,
					DisposalDate:           dispDate.Unix(),
					DisposalMethod:         methods[dispIdx],
					DisposalProceeds:       money(store, proceeds),
					NetBookValueAtDisposal: money(store, nbv),
					GainLoss:               money(store, gainLoss),
					GainLossAccountId:      store.AccountIDs[gainLossAcctIdx],
					BuyerName:              buyerNames[dispIdx],
					AuditInfo:              createAuditInfo(),
				},
			}
		}

		// Embedded transfers (for first 5 assets)
		var transfers []*fin.AssetTransfer
		if i < 5 {
			reasons := []string{
				"Office relocation", "Department reorganization",
				"New project assignment", "Space optimization", "Team expansion",
			}
			fromDeptIdx := i % len(store.DepartmentIDs)
			toDeptIdx := (i + 1) % len(store.DepartmentIDs)
			xfrDate := time.Date(2025, time.Month(i+1), 10, 0, 0, 0, 0, time.UTC)

			transfers = []*fin.AssetTransfer{
				{
					TransferId:       genID("axfr", i),
					AssetId:          assetID,
					TransferDate:     xfrDate.Unix(),
					FromDepartmentId: store.DepartmentIDs[fromDeptIdx],
					ToDepartmentId:   store.DepartmentIDs[toDeptIdx],
					FromLocation:     fmt.Sprintf("Building %d", fromDeptIdx+1),
					ToLocation:       fmt.Sprintf("Building %d", toDeptIdx+1),
					Reason:           reasons[i],
					ApprovedBy:       "mock-generator",
					ApprovedDate:     xfrDate.AddDate(0, 0, -2).Unix(),
					AuditInfo:        createAuditInfo(),
				},
			}
		}

		// Embedded maintenance (for first 10 assets)
		var maintenance []*fin.AssetMaintenance
		if i < 10 {
			mTypes := []fin.MaintenanceType{
				fin.MaintenanceType_MAINTENANCE_TYPE_PREVENTIVE,
				fin.MaintenanceType_MAINTENANCE_TYPE_CORRECTIVE,
				fin.MaintenanceType_MAINTENANCE_TYPE_INSPECTION,
			}
			mDescriptions := []string{
				"Scheduled preventive maintenance",
				"Repair of malfunctioning component",
				"Annual safety inspection",
				"Firmware update and calibration",
				"Replacement of worn parts",
			}
			mType := mTypes[i%len(mTypes)]
			schedDate := time.Date(2025, time.Month((i%6)+1), (i%28)+1, 0, 0, 0, 0, time.UTC)
			mStatus := fin.MaintenanceStatus_MAINTENANCE_STATUS_COMPLETED
			var completedDate int64
			if i >= 8 {
				mStatus = fin.MaintenanceStatus_MAINTENANCE_STATUS_SCHEDULED
			} else {
				completedDate = schedDate.AddDate(0, 0, rand.Intn(3)+1).Unix()
			}

			maintenance = []*fin.AssetMaintenance{
				{
					MaintenanceId:   genID("amnt", i),
					AssetId:         assetID,
					MaintenanceType: mType,
					Status:          mStatus,
					ScheduledDate:   schedDate.Unix(),
					CompletedDate:   completedDate,
					VendorId:        store.VendorIDs[vendorIdx],
					Cost:            money(store, int64(rand.Intn(5000)+200)*100),
					Description:     mDescriptions[i%len(mDescriptions)],
					WorkOrderNumber: fmt.Sprintf("WO-%06d", rand.Intn(999999)+1),
					AuditInfo:       createAuditInfo(),
				},
			}
		}

		// Embedded revaluations (for first 5 assets)
		var revaluations []*fin.AssetRevaluation
		if i < 5 {
			reasons := []string{
				"Market value update", "Impairment review",
				"Annual fair value assessment", "Insurance appraisal adjustment",
				"Technology obsolescence review",
			}
			revalDate := time.Date(2025, time.Month(i+1), 20, 0, 0, 0, 0, time.UTC)
			previousValue := int64(rand.Intn(30000)+10000) * 100
			adjustment := int64(rand.Intn(10000)-5000) * 100
			newValue := previousValue + adjustment

			revaluations = []*fin.AssetRevaluation{
				{
					RevaluationId:    genID("arval", i),
					AssetId:          assetID,
					RevaluationDate:  revalDate.Unix(),
					PreviousValue:    money(store, previousValue),
					NewValue:         money(store, newValue),
					AdjustmentAmount: money(store, adjustment),
					Reason:           reasons[i],
					Appraiser:        "Independent Appraiser LLC",
					AuditInfo:        createAuditInfo(),
				},
			}
		}

		assets[i] = &fin.Asset{
			AssetId:                 assetID,
			AssetNumber:             fmt.Sprintf("FA-%05d", i+1),
			Name:                    assetNames[i],
			Description:             fmt.Sprintf("Fixed asset: %s", assetNames[i]),
			CategoryId:              store.AssetCategoryIDs[catIdx],
			SerialNumber:            fmt.Sprintf("SN-%08d", rand.Intn(99999999)+1),
			Status:                  status,
			AcquisitionDate:         acqDate.Unix(),
			AcquisitionCost:         money(store, acqCost),
			SalvageValue:            money(store, salvageValue),
			UsefulLifeMonths:        usefulLife,
			DepreciationMethod:      fin.DepreciationMethod_DEPRECIATION_METHOD_STRAIGHT_LINE,
			AccumulatedDepreciation: money(store, accumulated),
			NetBookValue:            money(store, netBookValue),
			DepartmentId:            store.DepartmentIDs[deptIdx],
			Location:                fmt.Sprintf("Building %d, Floor %d", (i/5)+1, (i%5)+1),
			GlAccountId:             fixedAssetsAccountID,
			VendorId:                store.VendorIDs[vendorIdx],
			PurchaseOrderNumber:     fmt.Sprintf("PO-%06d", i+1),
			AuditInfo:               createAuditInfo(),
			DepreciationSchedules:   deprSchedules,
			Disposals:               disposals,
			Transfers:               transfers,
			Maintenance:             maintenance,
			Revaluations:            revaluations,
		}
	}
	return assets
}
