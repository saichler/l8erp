// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// This software is provided "as-is," without warranty. See the License
// for details.

package auditfindings

import (
	_ "github.com/lib/pq"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/types/comp"
	"github.com/saichler/l8orm/go/orm/persist"
	"github.com/saichler/l8orm/go/orm/plugins/postgres"
	"github.com/saichler/l8srlz/go/serialize/object"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
	"github.com/saichler/l8types/go/types/l8web"
	"github.com/saichler/l8utils/go/utils/web"
)

const (
	ServiceName = "CompAudFnd"
	ServiceArea = byte(110)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, newCompAuditFindingServiceCallback())
	sla.SetServiceItem(&comp.CompAuditFinding{})
	sla.SetServiceItemList(&comp.CompAuditFindingList{})
	sla.SetPrimaryKeys("FindingId")
	sla.SetArgs(p)
	sla.SetTransactional(true)
	sla.SetReplication(true)
	sla.SetReplicationCount(3)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&comp.CompAuditFinding{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompAuditFindingList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompAuditFinding{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompAuditFinding{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &comp.CompAuditFindingList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func CompAuditFindings(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func CompAuditFinding(findingId string, vnic ifs.IVNic) (*comp.CompAuditFinding, error) {
	this, ok := CompAuditFindings(vnic)
	filter := &comp.CompAuditFinding{FindingId: findingId}
	if ok {
		resp := this.Get(object.New(nil, filter), vnic)
		if resp.Error() != nil {
			return nil, resp.Error()
		}
		if resp.Element() != nil {
			return resp.Element().(*comp.CompAuditFinding), nil
		}
		return nil, nil
	}
	resp := vnic.Request("", ServiceName, ServiceArea, ifs.GET, filter, 30)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	if resp.Element() != nil {
		return resp.Element().(*comp.CompAuditFinding), nil
	}
	return nil, nil
}
