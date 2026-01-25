package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateMeritIncreases creates merit increase records
func generateMeritIncreases(store *MockDataStore) []*hcm.MeritIncrease {
	increases := make([]*hcm.MeritIncrease, 0)
	idx := 1

	if len(store.MeritCycleIDs) == 0 || len(store.PerformanceReviewIDs) == 0 {
		return increases
	}

	// 70% of employees get merit increases
	for i := 0; i < len(store.EmployeeIDs)*7/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		currentSalary := int64(rand.Intn(50000)+50000) * 100
		increasePercent := float64(rand.Intn(5)+1) + float64(rand.Intn(100))/100
		proposedIncrease := int64(float64(currentSalary) * increasePercent / 100)

		increases = append(increases, &hcm.MeritIncrease{
			IncreaseId:         fmt.Sprintf("merit-%04d", idx),
			EmployeeId:         empID,
			MeritCycleId:       store.MeritCycleIDs[rand.Intn(len(store.MeritCycleIDs))],
			ReviewId:           store.PerformanceReviewIDs[rand.Intn(len(store.PerformanceReviewIDs))],
			CurrentSalary:      &hcm.Money{Amount: currentSalary, CurrencyCode: "USD"},
			ProposedIncrease:   &hcm.Money{Amount: proposedIncrease, CurrencyCode: "USD"},
			ProposedPercentage: increasePercent,
			NewSalary:          &hcm.Money{Amount: currentSalary + proposedIncrease, CurrencyCode: "USD"},
			EffectiveDate:      time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			Status:             hcm.MeritIncreaseStatus_MERIT_INCREASE_STATUS_APPROVED,
			AuditInfo:          createAuditInfo(),
		})
		idx++
	}
	return increases
}

// generateBonusPayments creates bonus payment records
func generateBonusPayments(store *MockDataStore) []*hcm.BonusPayment {
	payments := make([]*hcm.BonusPayment, 0)
	idx := 1

	if len(store.BonusPlanIDs) == 0 {
		return payments
	}

	// 50% of employees get bonus
	for i := 0; i < len(store.EmployeeIDs)/2; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		bonusAmount := int64(rand.Intn(10000)+1000) * 100
		payments = append(payments, &hcm.BonusPayment{
			PaymentId:    fmt.Sprintf("bonus-%04d", idx),
			EmployeeId:   empID,
			BonusPlanId:  store.BonusPlanIDs[rand.Intn(len(store.BonusPlanIDs))],
			TargetAmount: &hcm.Money{Amount: bonusAmount, CurrencyCode: "USD"},
			ActualAmount: &hcm.Money{Amount: bonusAmount, CurrencyCode: "USD"},
			AwardDate:    time.Date(2024, 12, 15, 0, 0, 0, 0, time.UTC).Unix(),
			PaymentDate:  time.Date(2024, 12, 20, 0, 0, 0, 0, time.UTC).Unix(),
			Status:       hcm.BonusPaymentStatus_BONUS_PAYMENT_STATUS_PAID,
			AuditInfo:    createAuditInfo(),
		})
		idx++
	}
	return payments
}

// generateEquityGrants creates equity grant records
func generateEquityGrants(store *MockDataStore) []*hcm.EquityGrant {
	grants := make([]*hcm.EquityGrant, 0)
	idx := 1
	grantTypes := []hcm.EquityGrantType{
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_ISO,
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_RSU,
		hcm.EquityGrantType_EQUITY_GRANT_TYPE_NSO,
	}

	// 30% of employees get equity
	for i := 0; i < len(store.EmployeeIDs)*3/10; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		grantDate := time.Date(2024, time.Month(rand.Intn(12)+1), 1, 0, 0, 0, 0, time.UTC)
		sharesGranted := int64(rand.Intn(1000) + 100)

		grants = append(grants, &hcm.EquityGrant{
			GrantId:        fmt.Sprintf("equity-%04d", idx),
			EmployeeId:     empID,
			GrantType:      grantTypes[rand.Intn(len(grantTypes))],
			GrantDate:      grantDate.Unix(),
			SharesGranted:  sharesGranted,
			SharesUnvested: sharesGranted,
			VestStartDate:  grantDate.Unix(),
			Status:         hcm.EquityGrantStatus_EQUITY_GRANT_STATUS_ACTIVE,
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return grants
}

// generateCompensationStatements creates compensation statement records
func generateCompensationStatements(store *MockDataStore) []*hcm.CompensationStatement {
	statements := make([]*hcm.CompensationStatement, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		baseSalary := int64(rand.Intn(100000)+50000) * 100
		bonusActual := int64(rand.Intn(20000)+5000) * 100
		benefitsValue := int64(rand.Intn(20000)+10000) * 100

		statements = append(statements, &hcm.CompensationStatement{
			StatementId:           fmt.Sprintf("compstmt-%04d", idx),
			EmployeeId:            empID,
			StatementYear:         2024,
			AsOfDate:              time.Date(2024, 12, 31, 0, 0, 0, 0, time.UTC).Unix(),
			BaseSalary:            &hcm.Money{Amount: baseSalary, CurrencyCode: "USD"},
			BonusActual:           &hcm.Money{Amount: bonusActual, CurrencyCode: "USD"},
			TotalCashCompensation: &hcm.Money{Amount: baseSalary + bonusActual, CurrencyCode: "USD"},
			TotalBenefitsValue:    &hcm.Money{Amount: benefitsValue, CurrencyCode: "USD"},
			TotalCompensation:     &hcm.Money{Amount: baseSalary + bonusActual + benefitsValue, CurrencyCode: "USD"},
			AuditInfo:             createAuditInfo(),
		})
		idx++
	}
	return statements
}

// generateMarketBenchmarks creates market benchmark records
func generateMarketBenchmarks(store *MockDataStore) []*hcm.MarketBenchmark {
	benchmarks := make([]*hcm.MarketBenchmark, 0)
	idx := 1

	for _, jobID := range store.JobIDs {
		benchmarks = append(benchmarks, &hcm.MarketBenchmark{
			BenchmarkId:    fmt.Sprintf("bench-%03d", idx),
			JobId:          jobID,
			OrganizationId: store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			EffectiveDate:  time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SurveySource:   "Industry Survey",
			SurveyYear:     2024,
			Market_25Th:    &hcm.Money{Amount: int64(rand.Intn(30000)+40000) * 100, CurrencyCode: "USD"},
			Market_50Th:    &hcm.Money{Amount: int64(rand.Intn(40000)+60000) * 100, CurrencyCode: "USD"},
			Market_75Th:    &hcm.Money{Amount: int64(rand.Intn(50000)+90000) * 100, CurrencyCode: "USD"},
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return benchmarks
}
