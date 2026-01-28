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

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateOrganizations creates organization records
func generateOrganizations() []*hcm.Organization {
	orgs := make([]*hcm.Organization, 0)

	// Root organization (company)
	rootOrg := &hcm.Organization{
		OrganizationId:   "org-001",
		Name:             "Acme Corporation",
		Code:             "ACME",
		OrganizationType: hcm.OrganizationType_ORGANIZATION_TYPE_COMPANY,
		LegalName:        "Acme Corporation Inc.",
		TaxId:            "12-3456789",
		IndustryCode:     "541511",
		Addresses:        []*hcm.Address{createAddress()},
		Contacts:         []*hcm.ContactInfo{createContact()},
		IsActive:         true,
		EffectiveDate:    time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
		AuditInfo:        createAuditInfo(),
	}
	orgs = append(orgs, rootOrg)

	// Child organizations (divisions)
	divisions := []string{"North America", "Europe", "Asia Pacific"}
	for i, name := range divisions {
		orgs = append(orgs, &hcm.Organization{
			OrganizationId:       fmt.Sprintf("org-%03d", i+2),
			ParentOrganizationId: "org-001",
			Name:                 name + " Division",
			Code:                 fmt.Sprintf("DIV%d", i+1),
			OrganizationType:     hcm.OrganizationType_ORGANIZATION_TYPE_DIVISION,
			IsActive:             true,
			EffectiveDate:        time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:            createAuditInfo(),
		})
	}

	return orgs
}

// generateJobs creates job records
func generateJobs(store *MockDataStore) []*hcm.Job {
	jobs := make([]*hcm.Job, 0)
	jobIndex := 1

	jobLevels := []string{"Entry", "Junior", "Mid", "Senior", "Principal"}
	for i, familyName := range jobFamilyNames {
		if titles, ok := jobTitles[familyName]; ok {
			for j, title := range titles {
				jobs = append(jobs, &hcm.Job{
					JobId:       fmt.Sprintf("job-%03d", jobIndex),
					JobFamilyId: store.JobFamilyIDs[i],
					Title:       title,
					JobCode:     fmt.Sprintf("JOB%03d", jobIndex),
					Description: fmt.Sprintf("Responsible for %s duties and responsibilities", title),
					JobLevel:    jobLevels[j%len(jobLevels)],
					IsActive:    true,
					AuditInfo:   createAuditInfo(),
				})
				jobIndex++
			}
		}
	}

	return jobs
}

// generateDepartments creates department records
func generateDepartments(store *MockDataStore) []*hcm.Department {
	depts := make([]*hcm.Department, len(departmentNames))
	for i, name := range departmentNames {
		depts[i] = &hcm.Department{
			DepartmentId:   fmt.Sprintf("dept-%03d", i+1),
			OrganizationId: store.OrganizationIDs[0],
			Name:           name,
			Code:           fmt.Sprintf("DEPT%03d", i+1),
			Description:    fmt.Sprintf("The %s department", name),
			IsActive:       true,
			EffectiveDate:  time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
			AuditInfo:      createAuditInfo(),
		}
	}
	return depts
}

// generatePositions creates position records
func generatePositions(store *MockDataStore) []*hcm.Position {
	positions := make([]*hcm.Position, 0)
	posIndex := 1

	// Create 3 positions per department
	for _, deptID := range store.DepartmentIDs {
		for j := 0; j < 3; j++ {
			jobID := store.JobIDs[rand.Intn(len(store.JobIDs))]
			positions = append(positions, &hcm.Position{
				PositionId:     fmt.Sprintf("pos-%03d", posIndex),
				DepartmentId:   deptID,
				OrganizationId: store.OrganizationIDs[0],
				JobId:          jobID,
				Title:          fmt.Sprintf("Position %d", posIndex),
				PositionCode:   fmt.Sprintf("POS%03d", posIndex),
				Status:         hcm.PositionStatus_POSITION_STATUS_OPEN,
				Headcount:      1,
				EffectiveDate:  time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
				AuditInfo:      createAuditInfo(),
			})
			posIndex++
		}
	}

	return positions
}
