/*
(C) 2025 Sharon Aicler (saichler@gmail.com)
LEND module data arrays for mock data generation
*/
package mocks

var (
	lendProductNames = []string{
		"Standard Term Loan", "Business Line of Credit", "Bridge Financing",
		"Equipment Purchase Loan", "Working Capital Facility", "SBA 7(a) Loan",
		"Commercial Real Estate Loan", "Startup Bridge Loan", "Fleet Equipment Loan",
		"Seasonal Working Capital", "SBA 504 Loan", "Revolving Credit Line",
	}

	lendProductCodes = []string{
		"TL-STD", "LOC-BIZ", "BRG-FIN", "EQL-PUR", "WCF-STD", "SBA-7A",
		"CRE-COM", "BRG-STP", "EQL-FLT", "WCF-SEA", "SBA-504", "LOC-REV",
	}

	lendPurposes = []string{
		"Business expansion", "Equipment purchase", "Working capital",
		"Inventory financing", "Real estate acquisition", "Debt consolidation",
		"Facility renovation", "Technology upgrade", "Fleet expansion",
		"Seasonal inventory buildup", "Accounts receivable bridge", "Marketing campaign",
	}

	lendDocumentTypes = []string{
		"Financial Statement", "Tax Return", "Business Plan",
		"Bank Statement", "Articles of Incorporation", "Personal Guarantee",
		"Collateral Appraisal", "Insurance Certificate", "Title Report",
	}

	lendCollateralNames = []string{
		"Main Office Building", "CNC Milling Machine", "Warehouse Inventory",
		"Accounts Receivable Pool", "Fleet Vehicle - Truck 01", "Treasury Bond Portfolio",
		"Operating Cash Reserve", "Industrial Equipment Set", "Commercial Property East",
		"Vehicle Fleet - Van 03", "Municipal Bond Holding", "Inventory Lot Q4",
	}

	lendCollateralLocations = []string{
		"123 Business Park Dr", "456 Industrial Ave", "789 Commerce Blvd",
		"321 Enterprise Way", "654 Manufacturing Rd", "987 Warehouse Ln",
	}

	lendAppraisers = []string{
		"National Appraisal Co.", "Metro Valuations Inc.", "Certified Appraisal Group",
		"Premier Assessment LLC", "Regional Appraisal Services", "Expert Valuers Inc.",
	}
)
