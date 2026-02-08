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

	"github.com/saichler/l8erp/go/types/hcm"
)

// generateJobFamilies creates job family records
func generateJobFamilies() []*hcm.JobFamily {
	families := make([]*hcm.JobFamily, len(jobFamilyNames))
	for i, name := range jobFamilyNames {
		families[i] = &hcm.JobFamily{
			JobFamilyId: genID("jf", i),
			Name:        name,
			Code:        genCode("JF", i),
			Description: fmt.Sprintf("%s job family including related roles and career paths", name),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return families
}

// generateCarriers creates carrier records
func generateCarriers() []*hcm.Carrier {
	carriers := make([]*hcm.Carrier, len(carrierNames))
	for i, name := range carrierNames {
		carriers[i] = &hcm.Carrier{
			CarrierId:   genID("car", i),
			Name:        name,
			Code:        genCode("CAR", i),
			CarrierType: hcm.CarrierType(rand.Intn(4) + 1),
			ContactName: randomName(),
			Email:       fmt.Sprintf("contact@%s.com", sanitizeEmail(name)),
			Phone:       randomPhone(),
			Website:     fmt.Sprintf("https://www.%s.com", sanitizeEmail(name)),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return carriers
}

// generateCertifications creates certification records
func generateCertifications() []*hcm.Certification {
	certTypes := []hcm.CertificationType{
		hcm.CertificationType_CERTIFICATION_TYPE_PROFESSIONAL,
		hcm.CertificationType_CERTIFICATION_TYPE_VENDOR,
		hcm.CertificationType_CERTIFICATION_TYPE_VENDOR,
		hcm.CertificationType_CERTIFICATION_TYPE_PROFESSIONAL,
		hcm.CertificationType_CERTIFICATION_TYPE_PROFESSIONAL,
		hcm.CertificationType_CERTIFICATION_TYPE_PROFESSIONAL,
		hcm.CertificationType_CERTIFICATION_TYPE_TECHNICAL,
		hcm.CertificationType_CERTIFICATION_TYPE_TECHNICAL,
		hcm.CertificationType_CERTIFICATION_TYPE_TECHNICAL,
		hcm.CertificationType_CERTIFICATION_TYPE_VENDOR,
	}
	certs := make([]*hcm.Certification, len(certificationNames))
	for i, name := range certificationNames {
		certs[i] = &hcm.Certification{
			CertificationId:     genID("cert", i),
			Name:                name,
			Code:                genCode("CERT", i),
			CertificationType:   certTypes[i%len(certTypes)],
			IssuingOrganization: getIssuingOrg(name),
			Description:         fmt.Sprintf("Professional certification: %s", name),
			ValidityMonths:      int32(rand.Intn(24) + 12), // 12-36 months
			IsActive:            true,
			AuditInfo:           createAuditInfo(),
		}
	}
	return certs
}

// generateSkills creates skill records
func generateSkills() []*hcm.Skill {
	skills := make([]*hcm.Skill, len(skillNames))
	categories := []hcm.SkillCategory{
		hcm.SkillCategory_SKILL_CATEGORY_TECHNICAL,
		hcm.SkillCategory_SKILL_CATEGORY_SOFT_SKILL,
		hcm.SkillCategory_SKILL_CATEGORY_LEADERSHIP,
		hcm.SkillCategory_SKILL_CATEGORY_DOMAIN,
	}
	for i, name := range skillNames {
		skills[i] = &hcm.Skill{
			SkillId:     genID("skill", i),
			Name:        name,
			Code:        genCode("SK", i),
			Category:    categories[i%len(categories)],
			Description: fmt.Sprintf("Proficiency in %s", name),
			IsActive:    true,
			AuditInfo:   createAuditInfo(),
		}
	}
	return skills
}
