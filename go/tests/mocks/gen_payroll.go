package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

// generatePayrollRuns creates payroll run records
func generatePayrollRuns(store *MockDataStore) []*hcm.PayrollRun {
	runs := make([]*hcm.PayrollRun, 0)
	runIdx := 1

	// Create 12 months of payroll runs for each org
	for _, orgID := range store.OrganizationIDs {
		for month := 1; month <= 12; month++ {
			periodStart := time.Date(2024, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
			periodEnd := periodStart.AddDate(0, 1, -1)
			paymentDate := periodEnd.AddDate(0, 0, 5)

			runs = append(runs, &hcm.PayrollRun{
				PayrollRunId:   fmt.Sprintf("payrun-%03d", runIdx),
				OrganizationId: orgID,
				Name:           fmt.Sprintf("%s %d Payroll", periodStart.Month().String(), 2024),
				PayPeriod: &hcm.PayPeriod{
					StartDate: periodStart.Unix(),
					EndDate:   periodEnd.Unix(),
				},
				Status:         hcm.PayrollRunStatus_PAYROLL_RUN_STATUS_COMPLETED,
				RunType:        hcm.PayrollRunType_PAYROLL_RUN_TYPE_REGULAR,
				ScheduledDate:  periodEnd.Unix(),
				ProcessingDate: periodEnd.Unix(),
				PaymentDate:    paymentDate.Unix(),
				EmployeeCount:  int32(len(store.EmployeeIDs) / len(store.OrganizationIDs)),
				TotalGross:     &hcm.Money{Amount: int64(rand.Intn(500000)+100000) * 100, CurrencyCode: "USD"},
				TotalNet:       &hcm.Money{Amount: int64(rand.Intn(400000)+80000) * 100, CurrencyCode: "USD"},
				ProcessedBy:    "System",
				AuditInfo:      createAuditInfo(),
			})
			runIdx++
		}
	}
	return runs
}

// generatePayslips creates payslip records
func generatePayslips(store *MockDataStore) []*hcm.Payslip {
	slips := make([]*hcm.Payslip, 0)
	slipIdx := 1

	// Create payslips for last 3 months for each employee
	for _, empID := range store.EmployeeIDs {
		for month := 10; month <= 12; month++ {
			periodStart := time.Date(2024, time.Month(month), 1, 0, 0, 0, 0, time.UTC)
			periodEnd := periodStart.AddDate(0, 1, -1)
			paymentDate := periodEnd.AddDate(0, 0, 5)

			grossPay := int64(rand.Intn(8000)+4000) * 100
			taxes := grossPay * 25 / 100
			deductions := grossPay * 10 / 100
			netPay := grossPay - taxes - deductions

			slips = append(slips, &hcm.Payslip{
				PayslipId:    fmt.Sprintf("payslip-%05d", slipIdx),
				PayrollRunId: store.PayrollRunIDs[rand.Intn(len(store.PayrollRunIDs))],
				EmployeeId:   empID,
				PayPeriod: &hcm.PayPeriod{
					StartDate: periodStart.Unix(),
					EndDate:   periodEnd.Unix(),
				},
				PaymentDate:     paymentDate.Unix(),
				RegularHours:    80,
				OvertimeHours:   float64(rand.Intn(10)),
				TotalHours:      80 + float64(rand.Intn(10)),
				GrossPay:        &hcm.Money{Amount: grossPay, CurrencyCode: "USD"},
				TotalTaxes:      &hcm.Money{Amount: taxes, CurrencyCode: "USD"},
				TotalDeductions: &hcm.Money{Amount: deductions, CurrencyCode: "USD"},
				NetPay:          &hcm.Money{Amount: netPay, CurrencyCode: "USD"},
				AuditInfo:       createAuditInfo(),
			})
			slipIdx++
		}
	}
	return slips
}

// generateTaxWithholdings creates tax withholding records
func generateTaxWithholdings(store *MockDataStore) []*hcm.TaxWithholding {
	withholdings := make([]*hcm.TaxWithholding, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// Federal withholding
		withholdings = append(withholdings, &hcm.TaxWithholding{
			WithholdingId:   fmt.Sprintf("taxwh-%04d", idx),
			EmployeeId:      empID,
			TaxType:         hcm.TaxType_TAX_TYPE_FEDERAL_INCOME,
			TaxJurisdiction: "Federal",
			FormVersion:     "W-4 2024",
			FilingStatus:    hcm.FilingStatus(rand.Intn(3) + 1),
			UseNewW4:        true,
			EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SignedDate:      time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++

		// State withholding
		withholdings = append(withholdings, &hcm.TaxWithholding{
			WithholdingId:   fmt.Sprintf("taxwh-%04d", idx),
			EmployeeId:      empID,
			TaxType:         hcm.TaxType_TAX_TYPE_STATE_INCOME,
			TaxJurisdiction: states[rand.Intn(len(states))],
			FilingStatus:    hcm.FilingStatus(rand.Intn(3) + 1),
			EffectiveDate:   time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			SignedDate:      time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:       createAuditInfo(),
		})
		idx++
	}
	return withholdings
}

// generateDirectDeposits creates direct deposit records
func generateDirectDeposits(store *MockDataStore) []*hcm.DirectDeposit {
	deposits := make([]*hcm.DirectDeposit, 0)
	idx := 1
	bankNames := []string{"Chase Bank", "Bank of America", "Wells Fargo", "Citibank", "US Bank", "PNC Bank"}

	for _, empID := range store.EmployeeIDs {
		deposits = append(deposits, &hcm.DirectDeposit{
			DirectDepositId:     fmt.Sprintf("dd-%04d", idx),
			EmployeeId:          empID,
			AccountName:         "Primary Checking",
			BankName:            bankNames[rand.Intn(len(bankNames))],
			RoutingNumber:       fmt.Sprintf("%09d", rand.Intn(900000000)+100000000),
			AccountNumberMasked: fmt.Sprintf("****%04d", rand.Intn(10000)),
			AccountType:         hcm.AccountType_ACCOUNT_TYPE_CHECKING,
			DepositType:         hcm.DepositType_DEPOSIT_TYPE_FULL,
			Priority:            1,
			IsActive:            true,
			IsPrenoteComplete:   true,
			EffectiveDate:       time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:           createAuditInfo(),
		})
		idx++
	}
	return deposits
}

// generateGarnishments creates garnishment records
func generateGarnishments(store *MockDataStore) []*hcm.Garnishment {
	garnishments := make([]*hcm.Garnishment, 0)
	idx := 1

	// Only 5% of employees have garnishments
	numGarnishments := len(store.EmployeeIDs) / 20
	if numGarnishments < 1 {
		numGarnishments = 1
	}

	for i := 0; i < numGarnishments; i++ {
		empID := store.EmployeeIDs[rand.Intn(len(store.EmployeeIDs))]
		garnishments = append(garnishments, &hcm.Garnishment{
			GarnishmentId:    fmt.Sprintf("garn-%03d", idx),
			EmployeeId:       empID,
			GarnishmentType:  hcm.GarnishmentType(rand.Intn(4) + 1),
			CaseNumber:       fmt.Sprintf("CASE-%06d", rand.Intn(1000000)),
			IssuingAuthority: "State Court",
			PayeeName:        "State Collections",
			TotalAmountOwed:  &hcm.Money{Amount: int64(rand.Intn(10000)+1000) * 100, CurrencyCode: "USD"},
			AmountPerPeriod:  &hcm.Money{Amount: int64(rand.Intn(500)+100) * 100, CurrencyCode: "USD"},
			StartDate:        time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			Priority:         1,
			Status:           hcm.GarnishmentStatus_GARNISHMENT_STATUS_ACTIVE,
			AuditInfo:        createAuditInfo(),
		})
		idx++
	}
	return garnishments
}

// generateYearEndDocuments creates year-end document records
func generateYearEndDocuments(store *MockDataStore) []*hcm.YearEndDocument {
	docs := make([]*hcm.YearEndDocument, 0)
	idx := 1

	for _, empID := range store.EmployeeIDs {
		// W-2 for each employee
		docs = append(docs, &hcm.YearEndDocument{
			DocumentId:     fmt.Sprintf("yed-%05d", idx),
			EmployeeId:     empID,
			TaxYear:        2024,
			DocumentType:   hcm.YearEndDocumentType_YEAR_END_DOCUMENT_TYPE_W2,
			OrganizationId: store.OrganizationIDs[rand.Intn(len(store.OrganizationIDs))],
			Status:         hcm.YearEndDocumentStatus_YEAR_END_DOCUMENT_STATUS_ISSUED,
			GeneratedDate:  time.Date(2025, 1, 15, 0, 0, 0, 0, time.UTC).Unix(),
			IssuedDate:     time.Date(2025, 1, 20, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:      createAuditInfo(),
		})
		idx++
	}
	return docs
}
