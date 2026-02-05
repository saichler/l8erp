// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// This software is provided "as-is," without warranty. See the License
// for details.

package segregationrules

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
	ServiceName = "CompSegrul"
	ServiceArea = byte(110)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, newCompSegregationRuleServiceCallback())
	sla.SetServiceItem(&comp.CompSegregationRule{})
	sla.SetServiceItemList(&comp.CompSegregationRuleList{})
	sla.SetPrimaryKeys("RuleId")
	sla.SetArgs(p)
	sla.SetTransactional(true)
	sla.SetReplication(true)
	sla.SetReplicationCount(3)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&comp.CompSegregationRule{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompSegregationRuleList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompSegregationRule{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompSegregationRule{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &comp.CompSegregationRuleList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func CompSegregationRules(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func CompSegregationRule(ruleId string, vnic ifs.IVNic) (*comp.CompSegregationRule, error) {
	this, ok := CompSegregationRules(vnic)
	filter := &comp.CompSegregationRule{RuleId: ruleId}
	if ok {
		resp := this.Get(object.New(nil, filter), vnic)
		if resp.Error() != nil {
			return nil, resp.Error()
		}
		if resp.Element() != nil {
			return resp.Element().(*comp.CompSegregationRule), nil
		}
		return nil, nil
	}
	resp := vnic.Request("", ServiceName, ServiceArea, ifs.GET, filter, 30)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	if resp.Element() != nil {
		return resp.Element().(*comp.CompSegregationRule), nil
	}
	return nil, nil
}
