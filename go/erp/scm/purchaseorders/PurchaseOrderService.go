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

package purchaseorders

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
	ServiceName = "PurchOrder"
	ServiceArea = byte(50)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, newPurchaseOrderServiceCallback())
	sla.SetServiceItem(&scm.ScmPurchaseOrder{})
	sla.SetServiceItemList(&scm.ScmPurchaseOrderList{})
	sla.SetPrimaryKeys("PurchaseOrderId")
	sla.SetArgs(p)
	sla.SetTransactional(true)
	sla.SetReplication(true)
	sla.SetReplicationCount(3)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&scm.ScmPurchaseOrder{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmPurchaseOrderList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmPurchaseOrder{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&scm.ScmPurchaseOrder{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &scm.ScmPurchaseOrderList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func PurchaseOrders(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func PurchaseOrder(purchaseOrderId string, vnic ifs.IVNic) (*scm.ScmPurchaseOrder, error) {
	this, ok := PurchaseOrders(vnic)
	if !ok {
		return nil, errors.New("No PurchaseOrder Service Found")
	}
	filter := &scm.ScmPurchaseOrder{PurchaseOrderId: purchaseOrderId}
	resp := this.Get(object.New(nil, filter), vnic)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	return resp.Element().(*scm.ScmPurchaseOrder), nil
}
