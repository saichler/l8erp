/*
© 2025 Sharon Aicler (saichler@gmail.com)
COMP module data arrays for mock data generation
*/
package mocks

var (
	compRegulationNames = []string{
		"SOX Compliance 2024", "GDPR Data Protection", "HIPAA Privacy Rule",
		"PCI DSS v4.0", "FDA 21 CFR Part 11", "ISO 27001 Security",
		"CCPA Consumer Privacy", "SOC 2 Type II", "NIST Cybersecurity",
		"Basel III Banking", "FCPA Anti-Corruption", "AML Compliance",
	}

	compIssuingBodies = []string{
		"Securities and Exchange Commission", "European Commission",
		"Department of Health and Human Services", "PCI Security Standards Council",
		"Food and Drug Administration", "International Organization for Standardization",
		"California Attorney General", "AICPA", "National Institute of Standards",
		"Basel Committee on Banking Supervision",
	}

	compJurisdictions = []string{
		"United States", "European Union", "California", "New York",
		"United Kingdom", "Global", "Federal", "State",
	}

	compIndustries = []string{
		"Healthcare", "Financial Services", "Technology", "Manufacturing",
		"Retail", "Energy", "Pharmaceuticals", "Government",
	}

	compControlNames = []string{
		"Access Control Review", "Segregation of Duties", "Change Management",
		"Data Backup Verification", "Encryption Key Management", "Incident Response",
		"Vendor Risk Assessment", "Security Awareness Training", "Physical Access Control",
		"Network Monitoring", "Patch Management", "User Provisioning",
		"Financial Reconciliation", "Approval Workflow", "Audit Trail Review",
	}

	compProcessAreas = []string{
		"IT General Controls", "Financial Reporting", "Data Privacy",
		"Physical Security", "Human Resources", "Procurement",
		"Operations", "Customer Service", "Research & Development",
	}

	compPolicyTypes = []string{
		"Policy", "Procedure", "Standard", "Guideline",
	}

	compPolicyTitles = []string{
		"Information Security Policy", "Data Classification Standard",
		"Acceptable Use Policy", "Password Management Procedure",
		"Incident Response Plan", "Business Continuity Policy",
		"Vendor Management Policy", "Privacy Policy", "Code of Conduct",
		"Anti-Fraud Policy",
	}

	compTransactionTypes = []string{
		"Purchase Order", "Expense Report", "Journal Entry",
		"Vendor Payment", "Customer Credit", "Asset Disposal",
		"Payroll Adjustment", "Contract Approval",
	}

	compRiskTitles = []string{
		"Data Breach Risk", "Regulatory Non-Compliance", "System Downtime",
		"Fraud and Financial Crime", "Third-Party Dependency", "Talent Retention",
		"Cybersecurity Attack", "Natural Disaster", "Reputation Damage",
		"Operational Disruption", "Legal Liability", "Market Volatility",
	}

	compRiskResponses = []string{
		"Mitigate", "Accept", "Transfer", "Avoid",
	}

	compTriggerEvents = []string{
		"Market conditions change", "New regulation enacted", "System vulnerability discovered",
		"Key personnel departure", "Vendor performance decline", "Customer complaint increase",
	}

	compAuditNames = []string{
		"Annual IT Audit 2025", "SOX Compliance Audit Q1", "Financial Controls Review",
		"Cybersecurity Assessment", "Vendor Risk Audit", "Privacy Compliance Audit",
		"Operational Audit", "Internal Control Review", "Regulatory Examination",
		"Process Efficiency Audit",
	}

	compAuditFirms = []string{
		"Deloitte", "PricewaterhouseCoopers", "Ernst & Young", "KPMG",
		"BDO", "Grant Thornton", "RSM", "Internal Audit Team",
	}

	compOverallOpinions = []string{
		"Satisfactory", "Needs Improvement", "Unsatisfactory", "Effective",
		"Partially Effective", "Requires Attention",
	}

	compFindingTitles = []string{
		"Inadequate Access Controls", "Missing Documentation", "Policy Not Followed",
		"System Configuration Weakness", "Segregation of Duties Violation",
		"Incomplete Audit Trail", "Unauthorized Changes", "Training Deficiency",
		"Control Failure", "Process Gap Identified",
	}

	compCertificationNames = []string{
		"ISO 27001 Certification", "SOC 2 Type II Report", "PCI DSS Compliance",
		"HITRUST Certification", "ISO 9001 Quality", "ISO 14001 Environmental",
		"FedRAMP Authorization", "CMMC Level 2",
	}

	compInsuranceTypes = []string{
		"General Liability", "Cyber Liability", "Directors & Officers",
		"Professional Liability", "Property Insurance", "Business Interruption",
		"Workers Compensation", "Crime Insurance",
	}

	compInsuranceProviders = []string{
		"AIG", "Chubb", "Travelers", "Liberty Mutual", "Hartford",
		"Zurich", "Allianz", "CNA Financial",
	}

	compMitigationStrategies = []string{
		"Reduce", "Transfer", "Accept", "Avoid",
	}

	compSoDFunctions = []string{
		"Approve Purchases", "Process Payments", "Maintain Vendor Master",
		"Create Purchase Orders", "Receive Goods", "Post Journal Entries",
		"Reconcile Accounts", "Manage User Access", "Deploy Code Changes",
		"Create Invoices", "Apply Customer Payments", "Adjust Inventory",
	}
)
