/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 *
 * Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package main

import (
	"fmt"
	"github.com/saichler/l8bus/go/overlay/vnic"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	"os/exec"
	"time"

	// Core HR
	"github.com/saichler/l8erp/go/erp/hcm/compliancerecords"
	"github.com/saichler/l8erp/go/erp/hcm/departments"
	"github.com/saichler/l8erp/go/erp/hcm/employeedocuments"
	"github.com/saichler/l8erp/go/erp/hcm/employees"
	"github.com/saichler/l8erp/go/erp/hcm/jobfamilies"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/erp/hcm/organizations"
	"github.com/saichler/l8erp/go/erp/hcm/positions"

	// Payroll
	"github.com/saichler/l8erp/go/erp/hcm/directdeposits"
	"github.com/saichler/l8erp/go/erp/hcm/garnishments"
	"github.com/saichler/l8erp/go/erp/hcm/paycomponents"
	"github.com/saichler/l8erp/go/erp/hcm/payrollruns"
	"github.com/saichler/l8erp/go/erp/hcm/payslips"
	"github.com/saichler/l8erp/go/erp/hcm/paystructures"
	"github.com/saichler/l8erp/go/erp/hcm/taxwithholdings"
	"github.com/saichler/l8erp/go/erp/hcm/yearenddocuments"

	// Benefits
	"github.com/saichler/l8erp/go/erp/hcm/benefitenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/benefitplans"
	"github.com/saichler/l8erp/go/erp/hcm/carriers"
	"github.com/saichler/l8erp/go/erp/hcm/cobraevents"
	"github.com/saichler/l8erp/go/erp/hcm/dependents"
	"github.com/saichler/l8erp/go/erp/hcm/lifeevents"

	// Time & Attendance
	"github.com/saichler/l8erp/go/erp/hcm/absences"
	"github.com/saichler/l8erp/go/erp/hcm/holidays"
	"github.com/saichler/l8erp/go/erp/hcm/leavebalances"
	"github.com/saichler/l8erp/go/erp/hcm/leavepolicies"
	"github.com/saichler/l8erp/go/erp/hcm/leaverequests"
	"github.com/saichler/l8erp/go/erp/hcm/schedules"
	"github.com/saichler/l8erp/go/erp/hcm/shifts"
	"github.com/saichler/l8erp/go/erp/hcm/timesheets"

	// Talent
	"github.com/saichler/l8erp/go/erp/hcm/applicants"
	"github.com/saichler/l8erp/go/erp/hcm/applications"
	"github.com/saichler/l8erp/go/erp/hcm/careerpaths"
	"github.com/saichler/l8erp/go/erp/hcm/feedbacks"
	"github.com/saichler/l8erp/go/erp/hcm/goals"
	"github.com/saichler/l8erp/go/erp/hcm/jobrequisitions"
	"github.com/saichler/l8erp/go/erp/hcm/onboardingtasks"
	"github.com/saichler/l8erp/go/erp/hcm/performancereviews"
	"github.com/saichler/l8erp/go/erp/hcm/successionplans"

	// Learning
	"github.com/saichler/l8erp/go/erp/hcm/certifications"
	"github.com/saichler/l8erp/go/erp/hcm/courseenrollments"
	"github.com/saichler/l8erp/go/erp/hcm/courses"
	"github.com/saichler/l8erp/go/erp/hcm/coursesessions"
	"github.com/saichler/l8erp/go/erp/hcm/employeecertifications"
	"github.com/saichler/l8erp/go/erp/hcm/employeeskills"
	"github.com/saichler/l8erp/go/erp/hcm/skills"
	"github.com/saichler/l8erp/go/erp/hcm/trainingrecords"

	// Compensation
	"github.com/saichler/l8erp/go/erp/hcm/bonuspayments"
	"github.com/saichler/l8erp/go/erp/hcm/bonusplans"
	"github.com/saichler/l8erp/go/erp/hcm/compensationstatements"
	"github.com/saichler/l8erp/go/erp/hcm/employeecompensations"
	"github.com/saichler/l8erp/go/erp/hcm/equitygrants"
	"github.com/saichler/l8erp/go/erp/hcm/marketbenchmarks"
	"github.com/saichler/l8erp/go/erp/hcm/meritcycles"
	"github.com/saichler/l8erp/go/erp/hcm/meritincreases"
	"github.com/saichler/l8erp/go/erp/hcm/salarygrades"
	"github.com/saichler/l8erp/go/erp/hcm/salarystructures"
)

func main() {
	res := common.CreateResources("orm")
	ifs.SetNetworkMode(ifs.NETWORK_K8s)
	nic := vnic.NewVirtualNetworkInterface(res, nil)
	nic.Start()
	nic.WaitForConnection()

	//Start postgres
	startDb(nic)

	activateServices(nic)

	common.WaitForSignal(res)
}

func activateServices(nic ifs.IVNic) {
	// Core HR
	employees.Activate(common.DB_CREDS, common.DB_NAME, nic)
	organizations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	departments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	positions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	jobs.Activate(common.DB_CREDS, common.DB_NAME, nic)
	jobfamilies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeedocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compliancerecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Payroll
	paystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	paycomponents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	payrollruns.Activate(common.DB_CREDS, common.DB_NAME, nic)
	payslips.Activate(common.DB_CREDS, common.DB_NAME, nic)
	taxwithholdings.Activate(common.DB_CREDS, common.DB_NAME, nic)
	directdeposits.Activate(common.DB_CREDS, common.DB_NAME, nic)
	garnishments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	yearenddocuments.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Benefits
	benefitplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	benefitenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	dependents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	lifeevents.Activate(common.DB_CREDS, common.DB_NAME, nic)
	carriers.Activate(common.DB_CREDS, common.DB_NAME, nic)
	cobraevents.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Time & Attendance
	timesheets.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leaverequests.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leavebalances.Activate(common.DB_CREDS, common.DB_NAME, nic)
	leavepolicies.Activate(common.DB_CREDS, common.DB_NAME, nic)
	shifts.Activate(common.DB_CREDS, common.DB_NAME, nic)
	schedules.Activate(common.DB_CREDS, common.DB_NAME, nic)
	holidays.Activate(common.DB_CREDS, common.DB_NAME, nic)
	absences.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Talent
	jobrequisitions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	applicants.Activate(common.DB_CREDS, common.DB_NAME, nic)
	applications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	onboardingtasks.Activate(common.DB_CREDS, common.DB_NAME, nic)
	performancereviews.Activate(common.DB_CREDS, common.DB_NAME, nic)
	goals.Activate(common.DB_CREDS, common.DB_NAME, nic)
	successionplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	careerpaths.Activate(common.DB_CREDS, common.DB_NAME, nic)
	feedbacks.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Learning
	courses.Activate(common.DB_CREDS, common.DB_NAME, nic)
	coursesessions.Activate(common.DB_CREDS, common.DB_NAME, nic)
	courseenrollments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	certifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeecertifications.Activate(common.DB_CREDS, common.DB_NAME, nic)
	skills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeeskills.Activate(common.DB_CREDS, common.DB_NAME, nic)
	trainingrecords.Activate(common.DB_CREDS, common.DB_NAME, nic)

	// Compensation
	salarygrades.Activate(common.DB_CREDS, common.DB_NAME, nic)
	salarystructures.Activate(common.DB_CREDS, common.DB_NAME, nic)
	employeecompensations.Activate(common.DB_CREDS, common.DB_NAME, nic)
	meritincreases.Activate(common.DB_CREDS, common.DB_NAME, nic)
	meritcycles.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bonusplans.Activate(common.DB_CREDS, common.DB_NAME, nic)
	bonuspayments.Activate(common.DB_CREDS, common.DB_NAME, nic)
	equitygrants.Activate(common.DB_CREDS, common.DB_NAME, nic)
	compensationstatements.Activate(common.DB_CREDS, common.DB_NAME, nic)
	marketbenchmarks.Activate(common.DB_CREDS, common.DB_NAME, nic)
}

func startDb(nic ifs.IVNic) {
	_, user, pass, _, err := nic.Resources().Security().Credential(common.DB_CREDS, common.DB_NAME, nic.Resources())
	if err != nil {
		panic(common.DB_CREDS + " " + err.Error())
	}
	fmt.Println("/start-postgres.sh", common.DB_NAME, user, pass)
	cmd := exec.Command("nohup", "/start-postgres.sh", common.DB_NAME, user, pass)
	out, err := cmd.Output()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
	time.Sleep(time.Second * 5)
}
