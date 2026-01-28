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

var (
	firstNames = []string{
		"James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
		"David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
		"Thomas", "Sarah", "Christopher", "Karen", "Charles", "Lisa", "Daniel", "Nancy",
		"Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
		"Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
	}

	lastNames = []string{
		"Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
		"Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
		"Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
		"White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
	}

	streetNames = []string{
		"Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd", "Elm St", "Park Ave",
		"Washington Blvd", "Lincoln Way", "Jefferson St", "Madison Ave", "Adams Dr",
	}

	cities = []string{
		"New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
		"San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
		"Fort Worth", "Columbus", "Charlotte", "Seattle", "Denver", "Boston", "Portland",
	}

	states = []string{
		"NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "NC", "WA", "CO", "MA", "OR",
	}

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
