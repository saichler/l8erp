/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
*/
package mocks

// gen_lend_applications.go
// Generates:
// - LendApplication (15 records, with embedded ApplicationDocuments)

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/lend"
)

// generateLendApplications creates loan application records
func generateLendApplications(store *MockDataStore) []*lend.LendApplication {
	appStatuses := []lend.LendApplicationStatus{
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_UNDER_REVIEW,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_UNDER_REVIEW,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_SUBMITTED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_SUBMITTED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_DRAFT,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_DENIED,
		lend.LendApplicationStatus_LEND_APPLICATION_STATUS_WITHDRAWN,
	}

	denialReasons := []string{
		"Insufficient credit history", "Debt-to-income ratio too high",
		"Inadequate collateral", "Incomplete documentation",
	}

	count := 15
	applications := make([]*lend.LendApplication, count)

	for i := 0; i < count; i++ {
		status := appStatuses[i%len(appStatuses)]
		appDate := time.Now().AddDate(0, -rand.Intn(12)-1, -rand.Intn(28))
		requestedAmount := int64((rand.Intn(200) + 50) * 100000) // $50K-$2.5M in cents
		creditScore := 620.0 + float64(rand.Intn(180))

		app := &lend.LendApplication{
			ApplicationId:        genID("lapp", i),
			ApplicationNumber:    fmt.Sprintf("APP-%06d", 100000+i),
			ProductId:            pickRef(store.LendProductIDs, i),
			CustomerId:           pickRef(store.CustomerIDs, i),
			RequestedAmount:      money(store, requestedAmount),
			RequestedTermMonths:  int32(12 + rand.Intn(49)*6),
			Purpose:              lendPurposes[i%len(lendPurposes)],
			Status:               status,
			ApplicationDate:      appDate.Unix(),
			LoanOfficerId:        pickRef(store.EmployeeIDs, i),
			ProposedInterestRate: 4.5 + float64(rand.Intn(40))/10.0,
			CreditScore:          creditScore,
			DebtToIncomeRatio:    0.15 + float64(rand.Intn(30))/100.0,
			Notes:                fmt.Sprintf("Application for %s", lendPurposes[i%len(lendPurposes)]),
			AuditInfo:            createAuditInfo(),
		}

		// Set review/decision dates for processed applications
		if status != lend.LendApplicationStatus_LEND_APPLICATION_STATUS_DRAFT &&
			status != lend.LendApplicationStatus_LEND_APPLICATION_STATUS_SUBMITTED {
			app.ReviewDate = appDate.AddDate(0, 0, rand.Intn(7)+3).Unix()
			app.ReviewerId = pickRef(store.EmployeeIDs, i+5)
		}
		if status == lend.LendApplicationStatus_LEND_APPLICATION_STATUS_APPROVED {
			app.DecisionDate = appDate.AddDate(0, 0, rand.Intn(14)+7).Unix()
			app.ApprovedAmount = money(store, requestedAmount)
			app.ApprovedTermMonths = app.RequestedTermMonths
		}
		if status == lend.LendApplicationStatus_LEND_APPLICATION_STATUS_DENIED {
			app.DecisionDate = appDate.AddDate(0, 0, rand.Intn(14)+7).Unix()
			app.DenialReason = denialReasons[i%len(denialReasons)]
		}

		// Embed 2-3 application documents
		docCount := 2 + rand.Intn(2)
		app.Documents = make([]*lend.ApplicationDocument, docCount)
		for j := 0; j < docCount; j++ {
			docType := lendDocumentTypes[j%len(lendDocumentTypes)]
			app.Documents[j] = &lend.ApplicationDocument{
				DocumentId:   fmt.Sprintf("adoc-%03d-%02d", i+1, j+1),
				DocumentName: fmt.Sprintf("%s - %s", app.ApplicationNumber, docType),
				DocumentType: docType,
				StoragePath:  fmt.Sprintf("/docs/lending/%s/%s.pdf", app.ApplicationId, docType),
				FileName:     fmt.Sprintf("%s.pdf", docType),
				FileSize:     int64(rand.Intn(5000000) + 100000),
				MimeType:     "application/pdf",
				Checksum:     fmt.Sprintf("sha256:%x", rand.Int63()),
				UploadedDate: appDate.AddDate(0, 0, -rand.Intn(3)).Unix(),
			}
		}

		applications[i] = app
	}
	return applications
}
