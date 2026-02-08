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

// Generates:
// - BiDataQualityRule
// - BiMasterDataConfig
// - BiDataGovernance

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/saichler/l8erp/go/types/bi"
)

// generateDataQualityRules creates data quality rule records
func generateDataQualityRules(store *MockDataStore) []*bi.BiDataQualityRule {
	count := 15

	// Flavorable quality status: 60% PASSED, 25% WARNING, 15% FAILED
	qualityStatuses := []bi.BiDataQualityStatus{
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_WARNING,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_WARNING,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_WARNING,
		bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_FAILED,
	}

	ruleNames := []string{
		"Customer Email Completeness",
		"Order Amount Validity",
		"Product Code Uniqueness",
		"Employee ID Format",
		"Date Range Consistency",
		"Vendor Tax ID Format",
		"Invoice Number Uniqueness",
		"Address Completeness",
		"Phone Number Format",
		"Currency Code Validity",
		"Quantity Non-Negative",
		"Status Value Validity",
		"Reference Integrity Check",
		"Duplicate Detection",
		"Timeliness Check",
	}

	ruleTypes := []string{
		"COMPLETENESS",
		"VALIDITY",
		"UNIQUENESS",
		"FORMAT",
		"CONSISTENCY",
		"RANGE",
		"REFERENTIAL",
		"TIMELINESS",
	}

	tableNames := []string{
		"customers", "orders", "products", "employees",
		"vendors", "invoices", "addresses", "transactions",
	}

	columnNames := []string{
		"email", "amount", "product_code", "employee_id",
		"date_range", "tax_id", "invoice_number", "address",
		"phone", "currency_code", "quantity", "status", "reference_id",
	}

	ruleExpressions := []string{
		"NOT NULL AND LENGTH > 0",
		"amount > 0 AND amount < 10000000",
		"COUNT(DISTINCT code) = COUNT(code)",
		"REGEXP_MATCH('^EMP-[0-9]{6}$')",
		"start_date <= end_date",
		"REGEXP_MATCH('^[0-9]{9}$')",
		"COUNT(DISTINCT invoice_no) = COUNT(invoice_no)",
		"city IS NOT NULL AND postal_code IS NOT NULL",
		"REGEXP_MATCH('^[+]?[0-9]{10,15}$')",
		"currency_code IN ('USD', 'EUR', 'GBP', 'JPY')",
		"quantity >= 0",
		"status IN ('ACTIVE', 'INACTIVE', 'PENDING')",
		"EXISTS (SELECT 1 FROM parent_table WHERE id = reference_id)",
		"GROUP BY key HAVING COUNT(*) = 1",
		"DATEDIFF(CURRENT_DATE, created_date) <= 30",
	}

	rules := make([]*bi.BiDataQualityRule, count)
	for i := 0; i < count; i++ {
		dataSourceID := pickRef(store.BiDataSourceIDs, i)

		lastCheck := time.Now().AddDate(0, 0, -rand.Intn(7))
		status := qualityStatuses[i%len(qualityStatuses)]

		// Calculate scores based on status
		var lastScore float64
		switch status {
		case bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_PASSED:
			lastScore = float64(95 + rand.Intn(5)) // 95-100%
		case bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_WARNING:
			lastScore = float64(85 + rand.Intn(10)) // 85-95%
		case bi.BiDataQualityStatus_BI_DATA_QUALITY_STATUS_FAILED:
			lastScore = float64(50 + rand.Intn(35)) // 50-85%
		}

		recordsChecked := int64(rand.Intn(100000) + 10000)
		recordsPassed := int64(float64(recordsChecked) * (lastScore / 100))
		recordsFailed := recordsChecked - recordsPassed

		rules[i] = &bi.BiDataQualityRule{
			RuleId:         genID("bdqr", i),
			Name:           ruleNames[i%len(ruleNames)],
			Description:    fmt.Sprintf("Data quality rule for %s validation", ruleNames[i%len(ruleNames)]),
			DataSourceId:   dataSourceID,
			TableName:      tableNames[i%len(tableNames)],
			ColumnName:     columnNames[i%len(columnNames)],
			RuleType:       ruleTypes[i%len(ruleTypes)],
			RuleExpression: ruleExpressions[i%len(ruleExpressions)],
			Threshold:      float64(90 + rand.Intn(10)), // 90-99% threshold
			LastStatus:     status,
			LastScore:      lastScore,
			LastCheck:      lastCheck.Unix(),
			RecordsChecked: recordsChecked,
			RecordsPassed:  recordsPassed,
			RecordsFailed:  recordsFailed,
			IsActive:       i < 13, // ~87% active
			AuditInfo:      createAuditInfo(),
		}
	}
	return rules
}

// generateMasterDataConfigs creates master data management configuration records
func generateMasterDataConfigs(store *MockDataStore) []*bi.BiMasterDataConfig {
	count := 8

	configNames := []string{
		"Customer Master Data",
		"Product Master Data",
		"Vendor Master Data",
		"Employee Master Data",
		"Location Master Data",
		"Material Master Data",
		"Account Master Data",
		"Asset Master Data",
	}

	entityTypes := []string{
		"CUSTOMER", "PRODUCT", "VENDOR", "EMPLOYEE",
		"LOCATION", "MATERIAL", "ACCOUNT", "ASSET",
	}

	matchRules := []string{
		`{"rules": [{"field": "name", "algorithm": "fuzzy", "threshold": 0.85}, {"field": "email", "algorithm": "exact"}]}`,
		`{"rules": [{"field": "sku", "algorithm": "exact"}, {"field": "name", "algorithm": "fuzzy", "threshold": 0.9}]}`,
		`{"rules": [{"field": "tax_id", "algorithm": "exact"}, {"field": "name", "algorithm": "fuzzy", "threshold": 0.8}]}`,
		`{"rules": [{"field": "employee_id", "algorithm": "exact"}, {"field": "email", "algorithm": "exact"}]}`,
		`{"rules": [{"field": "address", "algorithm": "fuzzy", "threshold": 0.9}, {"field": "postal_code", "algorithm": "exact"}]}`,
		`{"rules": [{"field": "material_code", "algorithm": "exact"}, {"field": "description", "algorithm": "fuzzy", "threshold": 0.85}]}`,
		`{"rules": [{"field": "account_number", "algorithm": "exact"}, {"field": "name", "algorithm": "fuzzy", "threshold": 0.9}]}`,
		`{"rules": [{"field": "asset_tag", "algorithm": "exact"}, {"field": "serial_number", "algorithm": "exact"}]}`,
	}

	mergeRules := []string{
		`{"survivorship": {"name": "most_recent", "email": "most_complete", "address": "golden_record"}}`,
		`{"survivorship": {"name": "most_frequent", "price": "most_recent", "category": "golden_record"}}`,
		`{"survivorship": {"name": "most_trusted", "contact": "most_complete", "rating": "max"}}`,
		`{"survivorship": {"name": "hr_system", "department": "most_recent", "manager": "hr_system"}}`,
		`{"survivorship": {"address": "most_complete", "coordinates": "most_recent", "timezone": "golden_record"}}`,
		`{"survivorship": {"description": "most_complete", "specs": "most_recent", "cost": "erp_system"}}`,
		`{"survivorship": {"name": "most_trusted", "balance": "financial_system", "status": "most_recent"}}`,
		`{"survivorship": {"description": "most_complete", "value": "most_recent", "location": "asset_system"}}`,
	}

	configs := make([]*bi.BiMasterDataConfig, count)
	for i := 0; i < count; i++ {
		sourceSystemID := pickRef(store.BiDataSourceIDs, i)

		lastSync := time.Now().AddDate(0, 0, -rand.Intn(7))
		totalRecords := int64(rand.Intn(50000) + 10000)
		matchedRecords := int64(float64(totalRecords) * (0.85 + rand.Float64()*0.1))
		duplicateRecords := int64(float64(totalRecords) * (0.01 + rand.Float64()*0.04))

		configs[i] = &bi.BiMasterDataConfig{
			ConfigId:         genID("bmdc", i),
			Name:             configNames[i%len(configNames)],
			Description:      fmt.Sprintf("Master data management configuration for %s", entityTypes[i%len(entityTypes)]),
			EntityType:       entityTypes[i%len(entityTypes)],
			SourceSystemId:   sourceSystemID,
			MatchRules:       matchRules[i%len(matchRules)],
			MergeRules:       mergeRules[i%len(mergeRules)],
			GoldenRecordId:   fmt.Sprintf("gr-%s-%03d", entityTypes[i%len(entityTypes)][:3], i+1),
			LastSync:         lastSync.Unix(),
			TotalRecords:     totalRecords,
			MatchedRecords:   matchedRecords,
			DuplicateRecords: duplicateRecords,
			IsActive:         i < 7, // ~88% active
			AuditInfo:        createAuditInfo(),
		}
	}
	return configs
}

// generateDataGovernance creates data governance policy records
func generateDataGovernance(store *MockDataStore) []*bi.BiDataGovernance {
	count := 10

	// Flavorable governance level: 40% INTERNAL, 30% CONFIDENTIAL, 20% RESTRICTED, 10% PUBLIC
	governanceLevels := []bi.BiGovernanceLevel{
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_INTERNAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_INTERNAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_INTERNAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_INTERNAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_CONFIDENTIAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_CONFIDENTIAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_CONFIDENTIAL,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_RESTRICTED,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_RESTRICTED,
		bi.BiGovernanceLevel_BI_GOVERNANCE_LEVEL_PUBLIC,
	}

	governanceNames := []string{
		"Customer Personal Data Policy",
		"Financial Transaction Data Policy",
		"Employee HR Data Policy",
		"Product Pricing Data Policy",
		"Vendor Contract Data Policy",
		"Sales Analytics Data Policy",
		"Marketing Campaign Data Policy",
		"Operational Metrics Data Policy",
		"Compliance Audit Data Policy",
		"Public Product Information Policy",
	}

	dataDomains := []string{
		"Customer", "Finance", "HR", "Product",
		"Vendor", "Sales", "Marketing", "Operations",
		"Compliance", "Public",
	}

	retentionPolicies := []string{
		"7 years after last activity",
		"10 years per regulatory requirement",
		"Employment duration plus 7 years",
		"5 years after product discontinuation",
		"Contract duration plus 10 years",
		"7 years for audit purposes",
		"3 years after campaign end",
		"5 years rolling retention",
		"Permanent retention required",
		"2 years after publication",
	}

	accessPolicies := []string{
		"Role-based access with PII masking",
		"Finance team and auditors only",
		"HR team and direct managers only",
		"Sales and marketing teams",
		"Procurement and legal teams",
		"Sales leadership and analytics team",
		"Marketing team and executives",
		"Operations and management teams",
		"Compliance and audit teams only",
		"Public access with attribution",
	}

	complianceRequirements := []string{
		`["GDPR", "CCPA", "SOC2"]`,
		`["SOX", "PCI-DSS", "SOC2"]`,
		`["GDPR", "HIPAA", "SOC2"]`,
		`["SOC2", "ISO27001"]`,
		`["SOX", "SOC2"]`,
		`["SOC2", "GDPR"]`,
		`["GDPR", "CCPA", "CAN-SPAM"]`,
		`["SOC2", "ISO27001"]`,
		`["SOX", "SOC2", "GDPR"]`,
		`["Public Domain"]`,
	}

	governance := make([]*bi.BiDataGovernance, count)
	for i := 0; i < count; i++ {
		dataOwnerID := ""
		dataStewardID := ""
		if len(store.EmployeeIDs) > 0 {
			dataOwnerID = store.EmployeeIDs[i%len(store.EmployeeIDs)]
			dataStewardID = store.EmployeeIDs[(i+3)%len(store.EmployeeIDs)]
		}

		lastReview := time.Now().AddDate(0, -rand.Intn(6), -rand.Intn(28))
		nextReview := lastReview.AddDate(1, 0, 0)

		// Retention days based on policy type
		retentionDays := int32(365 * (2 + rand.Intn(8))) // 2-10 years

		governance[i] = &bi.BiDataGovernance{
			GovernanceId:           genID("bdgv", i),
			Name:                   governanceNames[i%len(governanceNames)],
			Description:            fmt.Sprintf("Data governance policy for %s domain data", dataDomains[i%len(dataDomains)]),
			DataDomain:             dataDomains[i%len(dataDomains)],
			Classification:         governanceLevels[i%len(governanceLevels)],
			DataOwnerId:            dataOwnerID,
			DataStewardId:          dataStewardID,
			RetentionPolicy:        retentionPolicies[i%len(retentionPolicies)],
			RetentionDays:          retentionDays,
			AccessPolicy:           accessPolicies[i%len(accessPolicies)],
			ComplianceRequirements: complianceRequirements[i%len(complianceRequirements)],
			LastReview:             lastReview.Unix(),
			NextReview:             nextReview.Unix(),
			IsActive:               i < 9, // 90% active
			AuditInfo:              createAuditInfo(),
		}
	}
	return governance
}
