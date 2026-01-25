package main

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/hcm"
)

func createAuditInfo() *hcm.AuditInfo {
	now := time.Now().Unix()
	return &hcm.AuditInfo{
		CreatedAt:  now,
		CreatedBy:  "mock-generator",
		ModifiedAt: now,
		ModifiedBy: "mock-generator",
	}
}

func createAddress() *hcm.Address {
	return &hcm.Address{
		AddressType:   hcm.AddressType_ADDRESS_TYPE_WORK,
		Line1:         fmt.Sprintf("%d %s", rand.Intn(9999)+1, streetNames[rand.Intn(len(streetNames))]),
		City:          cities[rand.Intn(len(cities))],
		StateProvince: states[rand.Intn(len(states))],
		PostalCode:    fmt.Sprintf("%05d", rand.Intn(90000)+10000),
		CountryCode:   "US",
		IsPrimary:     true,
	}
}

func createContact() *hcm.ContactInfo {
	return &hcm.ContactInfo{
		ContactType: hcm.ContactType_CONTACT_TYPE_PHONE_WORK,
		Value:       randomPhone(),
		IsPrimary:   true,
	}
}

func randomName() string {
	return fmt.Sprintf("%s %s", firstNames[rand.Intn(len(firstNames))], lastNames[rand.Intn(len(lastNames))])
}

func randomPhone() string {
	return fmt.Sprintf("(%03d) %03d-%04d", rand.Intn(900)+100, rand.Intn(900)+100, rand.Intn(9000)+1000)
}

func randomSSN() string {
	return fmt.Sprintf("%03d-%02d-%04d", rand.Intn(900)+100, rand.Intn(90)+10, rand.Intn(9000)+1000)
}

func randomBirthDate() int64 {
	// Random birth date between 25-60 years ago
	yearsAgo := rand.Intn(35) + 25
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func randomHireDate() int64 {
	// Random hire date in the last 10 years
	yearsAgo := rand.Intn(10)
	return time.Now().AddDate(-yearsAgo, -rand.Intn(12), -rand.Intn(28)).Unix()
}

func sanitizeEmail(s string) string {
	result := ""
	for _, c := range s {
		if (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') {
			result += string(c)
		}
	}
	return result
}

func getIssuingOrg(certName string) string {
	orgs := map[string]string{
		"PMP":       "Project Management Institute",
		"AWS":       "Amazon Web Services",
		"Google":    "Google Cloud",
		"Scrum":     "Scrum Alliance",
		"SHRM":      "Society for Human Resource Management",
		"CPA":       "Certified Public Accountant",
		"Six":       "ASQ",
		"CISSP":     "ISC2",
		"CompTIA":   "CompTIA",
		"Microsoft": "Microsoft",
	}
	for key, org := range orgs {
		if len(certName) >= len(key) && certName[:len(key)] == key {
			return org
		}
	}
	return "Professional Certification Body"
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}
