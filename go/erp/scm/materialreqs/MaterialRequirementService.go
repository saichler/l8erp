// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package materialreqs

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/scm"
	"github.com/saichler/l8orm/go/orm/persist"
	"github.com/saichler/l8orm/go/orm/plugins/postgres"
	"github.com/saichler/l8srlz/go/serialize/object"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
	"github.com/saichler/l8types/go/types/l8web"
	"github.com/saichler/l8utils/go/utils/web"
)

const (
	ServiceName = "MatReq"
	ServiceArea = byte(50)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, newMaterialRequirementServiceCallback())
	sla.SetServiceItem(&scm.ScmMaterialRequirement{})
	sla.SetServiceItemList(&scm.ScmMaterialRequirementList{})
	sla.SetPrimaryKeys("RequirementId")
	sla.SetArgs(p)
	sla.SetTransactional(true)
	sla.SetReplication(true)
	sla.SetReplicationCount(3)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&scm.ScmMaterialRequirement{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmMaterialRequirementList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmMaterialRequirement{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmMaterialRequirement{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &scm.ScmMaterialRequirementList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func MaterialRequirements(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func MaterialRequirement(requirementId string, vnic ifs.IVNic) (*scm.ScmMaterialRequirement, error) {
	this, ok := MaterialRequirements(vnic)
	if !ok {
		return nil, errors.New("No MaterialRequirement Service Found")
	}
	filter := &scm.ScmMaterialRequirement{RequirementId: requirementId}
	resp := this.Get(object.New(nil, filter), vnic)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	return resp.Element().(*scm.ScmMaterialRequirement), nil
}
