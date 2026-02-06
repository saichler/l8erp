/*
© 2025 Sharon Aicler (saichler@gmail.com)
DOC module data arrays for mock data generation
*/
package main

var (
	docFolderNames = []string{
		"Contracts", "Invoices", "Reports", "Policies", "Procedures",
		"HR Documents", "Financial Records", "Legal Documents", "Marketing",
		"Product Documentation", "Training Materials", "Compliance Records",
	}

	docCategoryNames = []string{
		"Legal", "Financial", "HR", "Operations", "Marketing",
		"Technical", "Compliance", "Sales", "Customer Service", "Executive",
	}

	docTagNames = []string{
		"Urgent", "Confidential", "Draft", "Final", "Review",
		"Approved", "Pending", "Archived", "Active", "Priority",
		"Internal", "External", "Template", "Reference",
	}

	docDocumentNames = []string{
		"Employee Handbook", "Annual Report 2024", "Service Agreement",
		"Privacy Policy", "Terms of Service", "Product Specification",
		"Sales Proposal", "Project Charter", "Meeting Minutes",
		"Training Guide", "Compliance Checklist", "Budget Forecast",
		"Vendor Contract", "Customer Agreement", "Technical Manual",
	}

	docTemplateNames = []string{
		"Invoice Template", "Contract Template", "Report Template",
		"Memo Template", "Policy Template", "Procedure Template",
		"Form Template", "Letter Template", "Proposal Template",
	}

	docWorkflowNames = []string{
		"Document Approval", "Contract Review", "Invoice Processing",
		"Policy Review", "Compliance Review", "Executive Approval",
		"Legal Review", "Financial Approval", "HR Document Flow",
	}

	docRetentionPolicyNames = []string{
		"Standard 7-Year", "Legal 10-Year", "Financial Records 7-Year",
		"HR Records 5-Year", "Contracts 10-Year", "Temporary 1-Year",
		"Permanent Archive", "Customer Data 3-Year",
	}
)
