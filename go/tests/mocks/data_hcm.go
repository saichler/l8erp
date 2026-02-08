/*
© 2025 Sharon Aicler (saichler@gmail.com)
HCM module data arrays for mock data generation
*/
package mocks

var (
	jobFamilyNames = []string{
		"Engineering", "Finance", "Human Resources", "Marketing", "Sales",
		"Operations", "Legal", "Information Technology", "Research & Development",
		"Customer Service", "Quality Assurance", "Product Management",
	}

	jobTitles = map[string][]string{
		"Engineering":            {"Software Engineer", "Senior Software Engineer", "Staff Engineer", "Engineering Manager", "Principal Engineer"},
		"Finance":                {"Financial Analyst", "Senior Financial Analyst", "Finance Manager", "Controller", "CFO"},
		"Human Resources":        {"HR Coordinator", "HR Specialist", "HR Manager", "HR Director", "CHRO"},
		"Marketing":              {"Marketing Coordinator", "Marketing Manager", "Brand Manager", "CMO"},
		"Sales":                  {"Sales Representative", "Account Executive", "Sales Manager", "VP of Sales"},
		"Operations":             {"Operations Coordinator", "Operations Manager", "Director of Operations", "COO"},
		"Information Technology": {"IT Support Specialist", "System Administrator", "IT Manager", "CTO"},
	}

	departmentNames = []string{
		"Engineering", "Finance", "Human Resources", "Marketing", "Sales",
		"Operations", "Legal", "IT", "R&D", "Customer Success", "Quality", "Product",
	}

	skillNames = []string{
		"Python", "JavaScript", "Java", "Go", "SQL", "AWS", "Docker", "Kubernetes",
		"Project Management", "Leadership", "Communication", "Data Analysis",
		"Machine Learning", "Cloud Architecture", "Agile Methodology", "Excel",
		"Public Speaking", "Negotiation", "Problem Solving", "Critical Thinking",
	}

	certificationNames = []string{
		"PMP - Project Management Professional",
		"AWS Solutions Architect",
		"Google Cloud Professional",
		"Certified Scrum Master",
		"SHRM-CP",
		"CPA - Certified Public Accountant",
		"Six Sigma Green Belt",
		"CISSP",
		"CompTIA Security+",
		"Microsoft Azure Administrator",
	}

	carrierNames = []string{
		"Blue Cross Blue Shield", "Aetna", "United Healthcare", "Cigna",
		"Kaiser Permanente", "Humana", "MetLife", "Delta Dental",
		"VSP Vision", "Guardian Life",
	}

	courseNames = []string{
		"Leadership Fundamentals", "Effective Communication", "Project Management Basics",
		"Advanced Excel", "Data Analytics Introduction", "Cybersecurity Awareness",
		"Diversity and Inclusion", "Time Management", "Public Speaking",
		"Conflict Resolution", "Team Building", "Strategic Planning",
	}
)
