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

package skills

import (
	"errors"
	_ "github.com/lib/pq"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8orm/go/orm/persist"
	"github.com/saichler/l8orm/go/orm/plugins/postgres"
	"github.com/saichler/l8srlz/go/serialize/object"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
	"github.com/saichler/l8types/go/types/l8web"
	"github.com/saichler/l8utils/go/utils/web"
)

const (
	ServiceName = "Skill"
	ServiceArea = byte(30)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, nil)
	sla.SetServiceItem(&hcm.Skill{})
	sla.SetServiceItemList(&hcm.SkillList{})
	sla.SetPrimaryKeys("SkillId")
	sla.SetArgs(p)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&hcm.Skill{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&hcm.SkillList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&hcm.Skill{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&hcm.Skill{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &hcm.SkillList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func Skills(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func Skill(skillId string, vnic ifs.IVNic) (*hcm.Skill, error) {
	this, ok := Skills(vnic)
	if !ok {
		return nil, errors.New("No Skill Service Found")
	}
	filter := &hcm.Skill{SkillId: skillId}
	resp := this.Get(object.New(nil, filter), vnic)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	return resp.Element().(*hcm.Skill), nil
}
