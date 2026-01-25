package main

import (
	"fmt"
	"math/rand"

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateEmployees creates employee records with proper manager hierarchy
// - Employee 1 (CEO) has no manager
// - Employees 2-10 are managers reporting to the CEO
// - Employees 11-50 report to one of the managers (2-10)
func generateEmployees(store *MockDataStore) []*hcm.Employee {
	employees := make([]*hcm.Employee, 50)

	for i := 0; i < 50; i++ {
		firstName := firstNames[rand.Intn(len(firstNames))]
		lastName := lastNames[rand.Intn(len(lastNames))]
		email := fmt.Sprintf("%s.%s@acme.com", sanitizeEmail(firstName), sanitizeEmail(lastName))

		deptIdx := i % len(store.DepartmentIDs)
		posIdx := i % len(store.PositionIDs)

		// Manager hierarchy:
		// - emp-001 (CEO): no manager
		// - emp-002 to emp-010 (managers): report to CEO (emp-001)
		// - emp-011 to emp-050: report to managers (emp-002 to emp-010)
		var managerID string
		if i == 0 {
			// CEO has no manager
			managerID = ""
		} else if i >= 1 && i < 10 {
			// Managers (employees 2-10) report to CEO
			managerID = "emp-001"
		} else {
			// Regular employees report to one of the managers (2-10)
			// Distribute employees among managers: employee 11 -> manager 2, employee 12 -> manager 3, etc.
			managerIndex := ((i - 10) % 9) + 2 // Results in 2-10
			managerID = fmt.Sprintf("emp-%03d", managerIndex)
		}

		employees[i] = &hcm.Employee{
			EmployeeId:     fmt.Sprintf("emp-%03d", i+1),
			EmployeeNumber: fmt.Sprintf("E%05d", i+1),
			FirstName:      firstName,
			LastName:       lastName,
			PreferredName:  firstName,
			DateOfBirth:    randomBirthDate(),
			Gender:         hcm.Gender(rand.Intn(2) + 1),
			MaritalStatus:  hcm.MaritalStatus(rand.Intn(4) + 1),
			Nationality:    "US",
			Citizenship:    "US",
			NationalId:     randomSSN(),
			NationalIdType: "SSN",
			Addresses:      []*hcm.Address{createAddress()},
			Contacts: []*hcm.ContactInfo{
				{
					ContactType: hcm.ContactType_CONTACT_TYPE_EMAIL_WORK,
					Value:       email,
					IsPrimary:   true,
				},
				{
					ContactType: hcm.ContactType_CONTACT_TYPE_PHONE_MOBILE,
					Value:       randomPhone(),
					IsPrimary:   false,
				},
			},
			EmploymentStatus: hcm.EmploymentStatus_EMPLOYMENT_STATUS_ACTIVE,
			EmploymentType:   hcm.EmploymentType_EMPLOYMENT_TYPE_FULL_TIME,
			HireDate:         randomHireDate(),
			OrganizationId:   store.OrganizationIDs[0],
			DepartmentId:     store.DepartmentIDs[deptIdx],
			PositionId:       store.PositionIDs[posIdx],
			JobId:            store.JobIDs[rand.Intn(len(store.JobIDs))],
			ManagerId:        managerID,
			AuditInfo:        createAuditInfo(),
		}
	}

	return employees
}
