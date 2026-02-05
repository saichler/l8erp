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

	// FIN Module Data

	vendorNames = []string{
		"Acme Corp", "Global Supply Co", "Tech Solutions Inc", "Office Pro Supplies",
		"Metro Services LLC", "Industrial Parts Co", "Digital Systems Ltd",
		"Premier Consulting Group", "Atlas Manufacturing", "Pacific Trading Co",
		"Summit Equipment Inc", "Valley Logistics", "Quantum Software Corp",
		"Green Energy Solutions", "National Paper Products",
	}

	customerNames = []string{
		"Sunrise Industries", "Nexus Technologies", "Pinnacle Group Inc",
		"Highland Manufacturing", "Coastal Commerce LLC", "Urban Development Corp",
		"Diamond Services", "Silverline Consulting", "Horizon Health Systems",
		"Eagle Financial", "Redwood Enterprises", "River Valley Co",
		"Summit Holdings", "Quantum Analytics", "Pacific Rim Trading",
		"Crystal Clear Inc", "Atlas Ventures", "Beacon Capital",
		"Emerald Solutions", "Northern Star Corp",
	}

	bankNames = []string{
		"First National Bank", "Commerce Bank", "Pacific Trust",
		"Capital One Business", "Wells Fargo Commercial",
	}

	assetCategoryNames = []string{
		"Office Equipment", "Computer Hardware", "Computer Software",
		"Furniture & Fixtures", "Vehicles", "Building & Improvements",
		"Machinery & Equipment", "Leasehold Improvements",
	}

	taxJurisdictionNames = []string{
		"US Federal", "California", "New York", "Texas", "Illinois",
	}

	// SCM Module Data

	itemCategoryNames = []string{
		"Raw Materials", "Finished Goods", "Semi-Finished Goods",
		"MRO Supplies", "Office Supplies", "Packaging Materials",
		"Electronics Components", "Chemicals", "Hardware", "Consumables",
	}

	itemNames = []string{
		"Steel Sheet 4x8", "Aluminum Rod 1/2in", "Copper Wire 12AWG",
		"Ball Bearing 6205", "Hydraulic Pump HP-200", "Electric Motor 5HP",
		"Circuit Board CB-100", "LED Panel LP-500", "Rubber Gasket RG-50",
		"Plastic Housing PH-300", "Stainless Bolt M10", "Carbon Filter CF-20",
		"Glass Panel GP-800", "Nylon Bushing NB-15", "Thermal Paste TP-10",
		"Welding Rod WR-308", "Brass Fitting BF-25", "Silicone Seal SS-40",
		"Fiber Optic Cable FOC-100", "Titanium Plate TP-600",
		"Power Supply PS-750", "Control Valve CV-300", "Pressure Gauge PG-100",
		"Conveyor Belt CB-2000", "Safety Helmet SH-Pro",
	}

	warehouseNames = []string{
		"Main Distribution Center", "West Coast Warehouse",
		"East Coast Warehouse", "Central Hub",
		"Cold Storage Facility", "Hazmat Storage",
	}

	scmCarrierNames = []string{
		"FedEx Freight", "UPS Supply Chain", "DHL Logistics",
		"XPO Logistics", "J.B. Hunt", "Schneider National",
		"Old Dominion", "Estes Express", "Saia Inc", "Werner Enterprises",
	}

	routeNames = []string{
		"West Coast Express", "East Coast Standard", "Central Route",
		"Cross-Country Premium", "Regional Southeast", "Pacific Northwest",
		"Gulf Coast Route", "Mountain West", "Northeast Corridor",
		"Midwest Hub-and-Spoke",
	}

	promotionTypes = []string{
		"Seasonal Sale", "Volume Discount", "New Product Launch",
		"Clearance", "Holiday Special", "Flash Sale",
		"Bundle Promotion", "Loyalty Reward",
	}

	// Sales Module Data

	salesTerritoryNames = []string{
		"North America", "EMEA", "Asia Pacific", "Latin America",
		"US East", "US West", "US Central", "Canada",
		"UK & Ireland", "Germany & Central Europe", "France & Benelux",
		"Nordic Region", "Southern Europe", "Middle East",
		"Japan", "Korea", "Greater China", "Southeast Asia",
		"Australia & NZ", "India & South Asia",
	}

	salesRegionNames = []string{
		"Americas", "Europe", "Asia", "Oceania", "Africa",
	}

	salesHierarchyNames = []string{
		"Enterprise Accounts", "Mid-Market", "Small Business",
		"Strategic Partners", "Government & Public Sector",
		"Healthcare", "Financial Services", "Manufacturing",
		"Technology", "Retail & Consumer",
	}

	salesSegmentNames = []string{
		"Fortune 500", "Enterprise", "Mid-Market Growth",
		"Small Business", "Startup", "Educational",
		"Non-Profit", "Government", "Healthcare",
		"Retail", "Technology", "Financial",
	}

	salesPartnerNames = []string{
		"TechStar Resellers", "Global Solutions Partners",
		"Premier Distribution Inc", "CloudFirst Partners",
		"Digital Innovators LLC", "Enterprise Sales Group",
		"Regional Tech Distributors", "Value-Add Resellers",
		"Strategic Channel Partners", "Managed Services Partners",
	}

	salesPriceListNames = []string{
		"Standard Price List", "Enterprise Pricing",
		"Partner Wholesale", "Volume Discount Pricing",
		"Government/Education", "Promotional Pricing",
		"International Pricing", "Premium Support Pricing",
	}

	salesDiscountNames = []string{
		"Volume Discount", "Early Payment Discount",
		"Loyalty Discount", "Promotional Discount",
		"Partner Discount", "Seasonal Discount",
		"Bundle Discount", "First Order Discount",
	}

	salesPromotionNames = []string{
		"Summer Sale 2025", "Black Friday Special",
		"New Customer Welcome", "Annual Subscription Discount",
		"Partner Exclusive", "Holiday Bundle",
		"Clearance Event", "Launch Promotion",
	}

	salesCommissionPlanNames = []string{
		"Standard Sales Commission", "Enterprise Commission Plan",
		"Partner Sales Incentive", "New Business Bonus",
		"Renewal Commission", "Upsell Bonus Plan",
		"Team Performance Plan", "Executive Commission",
	}

	shippingMethodNames = []string{
		"Standard Ground", "Express 2-Day", "Next Day Air",
		"Economy Freight", "White Glove Delivery", "LTL Freight",
	}

	milestonePrefixes = []string{
		"Project Kickoff", "Requirements Complete", "Design Approval",
		"Development Phase", "Testing Complete", "Go-Live",
		"Final Delivery", "Support Period Start",
	}

	// MFG Module Data

	mfgWorkCenterNames = []string{
		"Assembly Line 1", "Assembly Line 2", "CNC Machine Center",
		"Welding Station A", "Welding Station B", "Paint Booth 1",
		"Quality Inspection Bay", "Packaging Line", "Fabrication Center",
		"Testing Chamber", "Heat Treatment Furnace", "Surface Finishing",
	}

	mfgShiftNames = []string{
		"Day Shift", "Swing Shift", "Night Shift",
		"Weekend Day", "Weekend Night", "Overtime Shift",
	}

	mfgOperationNames = []string{
		"Cutting", "Drilling", "Milling", "Turning", "Grinding",
		"Welding", "Assembly", "Painting", "Quality Check", "Packaging",
		"Heat Treatment", "Surface Finish", "Testing", "Inspection",
	}

	mfgNCRReasons = []string{
		"Dimensional out of spec", "Surface defect", "Material defect",
		"Assembly error", "Missing component", "Wrong component",
		"Paint defect", "Weld defect", "Contamination", "Labeling error",
	}

	mfgOverheadNames = []string{
		"Factory Utilities", "Equipment Depreciation", "Indirect Labor",
		"Factory Supplies", "Maintenance Costs", "Quality Control",
		"Material Handling", "Factory Insurance", "Property Tax",
	}

	// CRM Module Data

	crmLeadSourceNames = []string{
		"Website", "Trade Show", "Referral", "Cold Call", "Email Campaign",
		"Social Media", "Partner", "Advertisement", "Webinar", "Direct Mail",
	}

	crmIndustries = []string{
		"Technology", "Healthcare", "Financial Services", "Manufacturing",
		"Retail", "Education", "Government", "Non-Profit", "Energy",
		"Telecommunications", "Real Estate", "Professional Services",
	}

	crmCampaignNames = []string{
		"Spring Promotion 2025", "Product Launch Q2", "Customer Appreciation",
		"Annual Conference", "Email Nurture Series", "Partner Referral Program",
		"Holiday Special", "New Market Expansion", "Brand Awareness",
		"Customer Retention Drive", "Upsell Campaign", "Win-Back Initiative",
	}

	crmEmailTemplateNames = []string{
		"Welcome Email", "Follow-Up Template", "Meeting Request",
		"Proposal Submission", "Thank You Note", "Case Resolution",
		"Newsletter Monthly", "Product Announcement", "Survey Invitation",
		"Renewal Reminder", "Onboarding Welcome", "Event Invitation",
	}

	crmMarketingListNames = []string{
		"Enterprise Prospects", "SMB Customers", "Partner Contacts",
		"Newsletter Subscribers", "Event Attendees", "Product Interest",
		"Geographic - West", "Geographic - East", "Industry - Tech",
		"Industry - Healthcare", "Decision Makers", "C-Level Executives",
	}

	crmKBCategories = []string{
		"Getting Started", "Troubleshooting", "Installation",
		"Configuration", "Best Practices", "FAQ",
		"Integration", "Security", "Performance",
	}

	crmKBArticleTitles = []string{
		"How to Reset Your Password", "Getting Started Guide",
		"Troubleshooting Connection Issues", "System Requirements",
		"Best Practices for Data Import", "Configuring Email Settings",
		"Integration with Third-Party Apps", "Security Configuration Guide",
		"Performance Optimization Tips", "Mobile App Setup",
		"API Documentation Overview", "User Permission Management",
	}

	crmSLANames = []string{
		"Standard Support", "Premium Support", "Enterprise SLA",
		"Basic Maintenance", "24/7 Critical Support", "Business Hours Only",
	}

	crmEscalationNames = []string{
		"Critical Issue Escalation", "SLA Breach Alert", "VIP Customer Priority",
		"Security Incident", "Manager Review", "Executive Attention",
	}

	crmTechnicianSkills = []string{
		"Electrical", "Plumbing", "HVAC", "Networking", "Software",
		"Hardware", "Security Systems", "Fire Systems", "Refrigeration",
		"General Maintenance", "Welding", "Carpentry",
	}

	crmTerritories = []string{
		"North Region", "South Region", "East Region", "West Region",
		"Central Zone", "Metropolitan Area", "Suburban District", "Rural Zone",
	}

	crmContractTerms = []string{
		"Annual Maintenance Agreement", "Three-Year Service Contract",
		"Pay-Per-Visit", "Extended Warranty", "Premium Full Service",
		"Basic Coverage", "Parts Only", "Labor Only",
	}

	crmOppStageNames = []string{
		"Prospecting", "Qualification", "Needs Analysis", "Value Proposition",
		"Identify Decision Makers", "Proposal/Price Quote", "Negotiation/Review",
		"Closed Won", "Closed Lost",
	}

	crmCompetitorNames = []string{
		"TechCorp Solutions", "Global Enterprise Systems", "NextGen Software",
		"Prime Business Apps", "Cloud First Inc", "Digital Dynamics",
		"Smart Solutions Ltd", "Future Systems", "Enterprise Plus",
	}

	// PRJ Module Data

	prjProjectNames = []string{
		"Website Redesign", "Mobile App Development", "ERP Implementation",
		"Cloud Migration", "Data Analytics Platform", "Security Audit",
		"CRM Integration", "Process Automation", "Digital Transformation",
		"Infrastructure Upgrade", "API Development", "Customer Portal",
		"Inventory System", "Reporting Dashboard", "Payment Integration",
	}

	prjTemplateNames = []string{
		"Agile Development", "Waterfall Standard", "Fixed Price Project",
		"Time & Materials", "Retainer Engagement", "Capital Project",
		"Internal Initiative", "Client Engagement", "Maintenance Contract",
	}

	prjPhaseNames = []string{
		"Discovery", "Planning", "Design", "Development", "Testing",
		"Deployment", "Training", "Go-Live", "Support", "Closure",
	}

	prjTaskNames = []string{
		"Requirements Gathering", "Technical Design", "Database Schema",
		"API Implementation", "UI Development", "Unit Testing",
		"Integration Testing", "Documentation", "Code Review",
		"Performance Testing", "Security Review", "User Acceptance",
		"Deployment Planning", "Data Migration", "Training Materials",
	}

	prjMilestoneNames = []string{
		"Project Kickoff", "Requirements Complete", "Design Approved",
		"Development Complete", "Testing Complete", "UAT Complete",
		"Go-Live Ready", "Project Complete", "Post-Go-Live Review",
	}

	prjDeliverableNames = []string{
		"Requirements Document", "Technical Specification", "Design Mockups",
		"Source Code", "Test Results", "User Manual", "Training Guide",
		"Deployment Package", "Architecture Document", "API Documentation",
	}

	prjRiskNames = []string{
		"Resource Availability", "Technical Complexity", "Scope Creep",
		"Timeline Delays", "Budget Overrun", "Integration Issues",
		"Vendor Dependency", "Skill Gap", "Change Management",
		"Data Quality", "Security Vulnerabilities", "Regulatory Compliance",
	}

	prjResourcePoolNames = []string{
		"Development Team", "QA Team", "Design Team", "DevOps Team",
		"Project Management", "Business Analysis", "Data Engineering",
		"Security Team", "Support Team", "Consulting Pool",
	}

	prjSkillNames = []string{
		"Java Development", "Python Programming", "React/Angular",
		"Database Administration", "Cloud Architecture", "DevOps",
		"Project Management", "Business Analysis", "UI/UX Design",
		"Quality Assurance", "Security Engineering", "Data Science",
	}

	prjExpenseCategoryNames = []string{
		"Travel", "Lodging", "Meals", "Transportation", "Software Licenses",
		"Hardware", "Training", "Consulting", "Office Supplies", "Communication",
	}

	prjExpensePolicyNames = []string{
		"Standard Travel Policy", "Executive Travel Policy",
		"Client Reimbursement", "Internal Project Policy",
		"Training Expense Policy", "Hardware Procurement",
	}

	prjKPINames = []string{
		"Schedule Performance Index", "Cost Performance Index",
		"Resource Utilization", "Defect Density", "Customer Satisfaction",
		"On-Time Delivery", "Budget Variance", "Scope Completion",
	}

	prjIssueCategories = []string{
		"Technical", "Process", "Resource", "Communication", "Scope",
		"Quality", "Schedule", "Budget", "Integration", "External",
	}

	// BI Module Data

	biReportNames = []string{
		"Monthly Sales Summary", "Quarterly Financial Overview", "Employee Headcount Report",
		"Inventory Status Report", "Customer Acquisition Analysis", "Revenue by Region",
		"Expense Analysis Dashboard", "Project Portfolio Status", "Production Efficiency Report",
		"Supply Chain Performance", "Marketing Campaign ROI", "Service Level Report",
	}

	biDashboardNames = []string{
		"Executive Summary", "Sales Pipeline", "Operations Dashboard",
		"Financial Overview", "HR Analytics", "Customer 360",
		"Supply Chain Monitor", "Production KPIs", "Service Metrics",
	}

	biKPINames = []string{
		"Revenue Growth Rate", "Customer Retention", "Employee Turnover",
		"Order Fulfillment Rate", "Production Yield", "On-Time Delivery",
		"Customer Satisfaction Score", "Cost Per Unit", "Inventory Turnover",
		"Gross Margin", "Net Promoter Score", "First Contact Resolution",
	}

	biDataSourceNames = []string{
		"ERP Production Database", "CRM Data Warehouse", "HR Information System",
		"Sales Transaction Log", "Inventory Management System", "Financial Ledger",
		"Customer Support Database", "Manufacturing Execution System", "External Market Data",
	}

	biETLJobNames = []string{
		"Daily Sales Sync", "Weekly Financial Aggregation", "Customer Data Integration",
		"Inventory Snapshot", "Employee Data Refresh", "Order History Load",
		"Product Master Sync", "Vendor Data Integration", "Market Data Import",
	}

	// DOC Module Data

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

	// ECOM Module Data

	ecomCategoryNames = []string{
		"Electronics", "Clothing", "Home & Garden", "Sports & Outdoors",
		"Books", "Toys & Games", "Health & Beauty", "Automotive",
		"Jewelry", "Food & Grocery", "Office Supplies", "Pet Supplies",
	}

	ecomAttributeNames = []string{
		"Color", "Size", "Material", "Brand", "Weight",
		"Dimensions", "Style", "Pattern", "Finish", "Capacity",
	}

	ecomProductNames = []string{
		"Wireless Bluetooth Headphones", "Smart Watch Pro", "Laptop Stand Adjustable",
		"Ergonomic Office Chair", "USB-C Hub Adapter", "Mechanical Keyboard RGB",
		"Portable Power Bank 20000mAh", "Noise Cancelling Earbuds", "Monitor Light Bar",
		"Webcam HD 1080p", "Wireless Mouse Ergonomic", "Phone Stand Holder",
		"Cable Management Kit", "Laptop Sleeve 15 inch", "Desk Organizer Set",
		"Smart LED Bulb Pack", "Fitness Tracker Band", "Wireless Charger Pad",
		"Tablet Stand Adjustable", "Gaming Mouse Pad XL",
	}

	ecomPromotionNames = []string{
		"Summer Sale 2025", "Black Friday Deal", "New Customer Welcome",
		"Holiday Special", "Flash Sale", "Clearance Event",
		"Member Exclusive", "Weekend Special", "Season End Sale",
	}

	ecomCouponCodes = []string{
		"SAVE10", "WELCOME20", "FREESHIP", "FLASH50", "HOLIDAY25",
		"VIP15", "NEWUSER", "SUMMER30", "CLEARANCE40", "LOYALTY10",
	}

	ecomShippingCarriers = []string{
		"FedEx", "UPS", "USPS", "DHL", "Amazon Logistics",
	}

	ecomPaymentProviders = []string{
		"Stripe", "PayPal", "Square", "Braintree", "Authorize.net",
	}

	// COMP Module Data

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
