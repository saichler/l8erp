# ERP by Layer 8 — User Help

ERP by Layer 8 is an enterprise resource planning application. It covers finance, human capital,
supply chain, manufacturing, sales, CRM, projects, business intelligence, documents, e-commerce,
compliance and lending. There is also an AI Agent and a System administration area.

## Screen layout

- **Header (top):** the application title, the theme picker (the half-filled circle button), the
  logged-in user name and the **Logout** button.
- **Sidebar (left):** one entry per section (Dashboard, Financial Management, Human Capital, ...).
  Click an entry to open that section.
- **Section page:** each section has a row of **module tabs** (for example General Ledger,
  Accounts Payable). Each module tab has a row of **service tabs** (for example Accounts,
  Journal Entries). The service tab shows that kind of record in a table.
- **AI Assistant bubble:** the floating chat button opens the **AI Assistant** chat window from any
  page.

To get to a screen: click the sidebar entry, then the module tab, then the service tab.
In this help, a path is written as **Section > Module > Service**, for example
**Financial Management > General Ledger > Journal Entries**.

## Working with records (all sections)

Every service tab shows its records in a table that works the same way everywhere.

### View and find records
- The table loads 10 records per page. Use the page size selector to show more rows per page.
  Use the first / previous / next / last buttons to move between pages.
- Click a column header to sort by that column. Click it again to reverse the order (▲ / ▼).
- Type in the **Filter...** box under a column header to show only rows whose value matches.
- Click a row to open its details in a popup.

### Add a record
1. Open the service tab, for example **Human Capital > Core HR > Employees**.
2. Click the **Add** button above the table (it is named after the record, for example
   **Add Employee**).
3. Fill in the form. Required fields must be filled before saving.
   - Fields that point to another record (for example an employee's department) open a picker
     when you click them ("Click to select..."). Choose the record from the list.
   - Date fields open a calendar.
4. Click **Save**.

### Edit a record
1. Find the record in the table.
2. Click **Edit** at the end of its row.
3. Change the fields and click **Save**.

### Delete a record
1. Find the record in the table.
2. Click **Delete** at the end of its row.
3. Confirm the deletion.

### Export and print
- Click **Export ▾** above the table and choose **CSV**, **Excel** or **PDF**.
- Click **Print** to print the table.

### Other views
Some services can also be shown as a chart, a tree or a board. When a service has more than one
view, a view switcher appears above the table. For example:
- **Financial Management > General Ledger > Accounts** — table or tree (chart of accounts).
- **Financial Management > Cash Management > Cash Forecasts** — table or chart.
- **Financial Management > Budgeting > Budgets** and **Forecasts** — table or chart.

### Permissions
The **Add**, **Edit** and **Delete** buttons are shown only when your role allows that action. If a
button is missing, ask an administrator to grant the permission (see **System > Security > Roles**).

Tables update live: changes made by other users appear without refreshing the page.

## Sections and where things are

### Dashboard
Enterprise overview with key figures from across the modules. It opens by default after login.

### Financial Management
- **General Ledger:** Accounts, Journal Entries, Fiscal Years, Currencies, Exchange Rates
- **Accounts Payable:** Vendors, Purchase Invoices, Payment Schedules, Vendor Payments, Vendor Statements
- **Accounts Receivable:** Customers, Sales Invoices, Customer Payments, Credit Memos, Dunning Letters
- **Cash Management:** Bank Accounts, Cash Forecasts, Fund Transfers, Petty Cash
- **Fixed Assets:** Assets, Categories
- **Budgeting:** Budgets, Capital Expenditures, Forecasts
- **Tax:** Tax Codes, Jurisdictions, Tax Rules, Exemptions
- **Reports:** Financial Reports

### Human Capital
- **Core HR:** Employees, Positions, Jobs, Job Families, Organizations, Departments, Documents, Compliance
- **Payroll:** Pay Structures, Pay Components, Payroll Runs, Payslips, Tax Withholdings, Direct Deposits, Garnishments, Year-End Docs
- **Benefits:** Benefit Plans, Enrollments, Carriers, Dependents, Life Events, COBRA Events
- **Time:** Timesheets, Leave Requests, Leave Balances, Leave Policies, Shifts, Schedules, Holidays, Absences
- **Talent:** Reviews, Goals, Feedback, Career Paths, Succession, Requisitions, Applicants, Applications, Onboarding
- **Learning:** Courses, Sessions, Enrollments, Certifications, Emp. Certs, Skills, Emp. Skills, Training Records
- **Compensation:** Salary Grades, Salary Structures, Emp. Compensation, Merit Increases, Merit Cycles, Bonus Plans, Bonus Payments, Equity Grants, Comp. Statements, Market Benchmarks
- **Reports:** Module Reports

### Supply Chain
- **Procurement:** Requisitions, RFQs, Purchase Orders, Blanket Orders, Scorecards
- **Inventory:** Items, Categories, Cycle Counts
- **Warehouse:** Warehouses, Receiving, Wave Plans, Dock Schedules
- **Logistics:** Carriers, Freight Rates, Shipments, Routes, Load Plans, Returns
- **Demand Planning:** Forecasts, Models, Demand Plans, Promotions, New Products
- **Supply Planning:** Material Reqs, Distribution Reqs, Supply Plans, Collaborations, Safety Stock, Lead Times
- **Reports:** Module Reports

### Manufacturing
- **Engineering:** BOMs, Routings, Change Orders
- **Production:** Work Orders, Prod Orders
- **Shop Floor:** Work Centers, WC Capacity, Shift Schedules, Downtime
- **Quality:** Quality Plans, Inspections, NCRs
- **Planning:** MRP Runs, Capacity Plans, Prod Schedules
- **Costing:** Standard Costs, Cost Rollups, Overheads
- **Reports:** Module Reports

### Sales & Distribution
- **Customers:** Hierarchies, Segments, Contracts, Partners
- **Orders:** Quotations, Sales Orders, Returns
- **Pricing:** Price Lists, Discounts, Promotions
- **Shipping:** Deliveries
- **Billing:** Billing Schedules, Revenue Recog
- **Analytics:** Sales Targets, Territories, Commission Plans, Forecasts
- **Reports:** Module Reports

### CRM
- **Leads:** Leads, Lead Sources, Lead Scores, Assignments
- **Opportunities:** Opportunities, Stages
- **Accounts:** Accounts, Contacts, Interactions, Relationships
- **Marketing:** Campaigns, Email Templates, Marketing Lists
- **Service:** Cases, KB Articles, SLAs, Escalations, Surveys
- **Field Service:** Service Orders, Technicians, Contracts, Schedules
- **Reports:** Module Reports

### Project Management
- **Planning:** Projects, Templates
- **Resources:** Resource Pools, Resources, Allocations, Bookings, Capacity Plans, Utilizations
- **Time & Expense:** Timesheets, Expense Reports, Approval Rules, Categories, Policies
- **Billing:** Billing Rates, Schedules, Invoices, Revenue, Budgets
- **Analytics:** Status Reports, Portfolio, KPIs
- **Reports:** Module Reports

### Business Intelligence
- **Reporting:** Reports, Report Templates
- **Dashboards:** Dashboards, KPIs
- **Analytics:** Data Cubes, Analysis Models, Trend Analyses, Scenarios, Benchmarks
- **Data Management:** Data Sources, ETL Jobs, Data Quality Rules, Master Data Configs, Data Governance

### Documents
- **Storage:** Documents, Folders, Categories, Tags
- **Workflow:** Approvals
- **Integration:** Templates, Email Capture, Scan Jobs
- **Compliance:** Retention, Legal Holds, Archives

### E-Commerce
- **Catalog:** Products, Categories, Attributes
- **Orders:** Orders, Returns
- **Customers:** Customers, Wishlists, Carts
- **Promotions:** Promotions, Coupons, Price Rules, Shipping Methods, Payment Methods

### Compliance & Risk
- **Regulatory:** Regulations, Certifications
- **Internal Controls:** Controls, Policies, Approval Matrices
- **Risk Management:** Risk Registers, Incidents, Insurance
- **Audit:** Audit Schedules, Findings, Compliance Reports

### Lending
- **Products:** Products, Applications
- **Loans:** Loans, Credit Lines
- **Payments:** Payments, Collateral

### AI Agent
- **Agent:** Chat, Conversations, Prompts
  - **Chat** — talk to the AI assistant (same as the floating AI Assistant bubble).
  - **Conversations** — your saved chat history.
  - **Prompts** — assistant personas (for example Financial Analyst, HR Manager, Operations,
    Executive Summary) that focus the assistant on certain modules.

### System
Administration area. Its tabs are:
- **Health** — status of the running services.
- **Security** — **Users**, **Roles**, **Credentials** and **Events** (security audit log).
- **Modules** — turn modules and their services on or off, then click **Save Changes**.
- **Logs** — view system logs.
- **Data Import** — bring data in from files. It has three tabs:
  - **Templates** — create and edit import templates that map file columns to a record type
    (AI-assisted mapping is available).
  - **Transfer** — export templates to a JSON file, or import templates from a JSON file, to move
    them between environments.
  - **Import** — pick a template, upload a data file, run the import and review the results.

## Common tasks

### Create a journal entry
1. **Financial Management > General Ledger > Journal Entries**.
2. Click **Add Journal Entry**, fill in the entry, add its debit/credit rows under **Entry Lines**,
   click **Save**.

### Add a vendor and record a purchase invoice
1. **Financial Management > Accounts Payable > Vendors** > **Add Vendor** > fill in > **Save**.
2. **Financial Management > Accounts Payable > Purchase Invoices** > **Add Purchase Invoice**,
   select the vendor in the vendor field > **Save**.

### Record a customer payment
1. **Financial Management > Accounts Receivable > Customer Payments**.
2. Click **Add Customer Payment**, select the customer, fill in the amount, click **Save**.

### Hire / add an employee
1. **Human Capital > Core HR > Employees**.
2. Click **Add Employee**, fill in the personal and job details (department, position), click **Save**.

### Request leave or approve a leave request
- Employees: open the **Employee Self-Service** portal > **Time Off** > **My Requests**.
- Managers: open the **Manager Portal** > **Approvals** > **Leave Requests**.
- HR can see all requests in **Human Capital > Time > Leave Requests**.

### Run payroll
1. **Human Capital > Payroll > Payroll Runs**.
2. Click **Add Payroll Run**, fill in the name, organization, run type, scheduled date and payment
   date, click **Save**.
3. Payslips are in **Human Capital > Payroll > Payslips**.

### Create a purchase order
1. **Supply Chain > Procurement > Purchase Orders**.
2. Click **Add Purchase Order**, select the vendor, add the item lines, click **Save**.

### Add an inventory item
**Supply Chain > Inventory > Items** > **Add Item** > fill in > **Save**.

### Create a sales quotation or sales order
- Quotation: **Sales & Distribution > Orders > Quotations** > **Add Quotation**.
- Order: **Sales & Distribution > Orders > Sales Orders** > **Add Sales Order**.
- Select the customer, add the item lines, click **Save**.

### Create a work order
**Manufacturing > Production > Work Orders** > **Add Work Order** > select the item / BOM > **Save**.

### Track a lead to an opportunity
1. **CRM > Leads > Leads** > **Add Lead**.
2. When it qualifies, add the deal in **CRM > Opportunities > Opportunities**.

### Open a customer support case
**CRM > Service > Cases** > **Add Case** > select the account / contact > **Save**.

### Create a project
**Project Management > Planning > Projects** > **Add Project** > fill in > **Save**.
Assign people in **Project Management > Resources > Allocations**.

### Upload a document
**Documents > Storage > Documents** > **Add Document** > fill in the details and choose the file in the
**File** field > **Save**.

### Add a user or change a user's role
1. **System > Security > Users**.
2. Click **Add** to create a user, or **Edit** on an existing user to change their roles.
3. Roles and their permissions are managed in **System > Security > Roles**.

### Import data from a file
1. **System > Data Import > Templates** — create a template for the record type and map the columns.
2. **System > Data Import > Import** — choose the template, upload the file, run the import.

### Export a list to Excel
Open the service tab, click **Export ▾**, choose **Excel**.

### Change the color theme
Click the theme button (half-filled circle) in the header and pick a theme: Light, Dark, Ocean,
Sunset, Forest, Slate or Dark-S.

## Portals

Besides the main ERP screen there are focused portals:

- **Employee Self-Service:** Dashboard; My Profile (Personal Info, My Documents); Pay (Pay Stubs,
  Tax Documents, Direct Deposit, Total Compensation); Time Off (My Requests, Balances, Holidays);
  Benefits (My Benefits, Available Plans, Dependents); Performance (My Reviews, My Goals, My Skills);
  Learning (Training History, Certifications, Course Enrollments).
- **Manager Portal:** Dashboard; My Team (Team Members, Departments); Approvals (Leave Requests,
  Timesheets); Performance (Reviews, Goals, Skills); Compensation (Comp Statements).
- **Customer Portal:** Dashboard; Orders (Sales Orders, Quotations, Deliveries, Returns); Billing
  (Invoices, Payments); Support (Support Cases, Knowledge Base); Account (Contracts).
- **Partner Portal:** Dashboard; Pipeline (Leads, Opportunities, Lead Sources); Sales (Quotations,
  Orders); Marketing (Campaigns, Marketing Lists); Commissions (Commission Plans); Profile
  (Partner Channel).

When you have access to more than one portal, a portal switcher appears in the header.
A mobile version of the application is also available and has the same sections.

## The AI Assistant

Open it with the floating **AI Assistant** button, or from **AI Agent > Agent > Chat**.
Type in the "Ask a question..." box. How a message is handled depends on its prefix:

- **No prefix** — ask about your data, for example "How many open purchase orders do we have?" or
  "Show the top 5 customers by sales". The assistant can also create records when asked.
- **@help** — ask how to use the application, for example "@help how do I add a vendor?".
  Answers come only from this help guide.
- **@web** — general questions unrelated to the ERP data, answered from the web, for example
  "@web what is the weather in Paris?".
