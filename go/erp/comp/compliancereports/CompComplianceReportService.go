// © 2025 Sharon Aicler (saichler@gmail.com)
//
// Layer 8 Ecosystem is licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// This software is provided "as-is," without warranty. See the License
// for details.

package compliancereports

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
	ServiceName = "CompCmpRpt"
	ServiceArea = byte(110)
)

func Activate(creds, dbname string, vnic ifs.IVNic) {
	_, user, pass, _, err := vnic.Resources().Security().Credential(creds, dbname, vnic.Resources())
	if err != nil {
		panic(err)
	}
	db := common.OpenDBConection(dbname, user, pass)
	p := postgres.NewPostgres(db, vnic.Resources())

	sla := ifs.NewServiceLevelAgreement(&persist.OrmService{}, ServiceName, ServiceArea, true, newCompComplianceReportServiceCallback())
	sla.SetServiceItem(&comp.CompComplianceReport{})
	sla.SetServiceItemList(&comp.CompComplianceReportList{})
	sla.SetPrimaryKeys("ReportId")
	sla.SetArgs(p)
	sla.SetTransactional(true)
	sla.SetReplication(true)
	sla.SetReplicationCount(3)

	ws := web.New(ServiceName, ServiceArea, 0)
	ws.AddEndpoint(&comp.CompComplianceReport{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompComplianceReportList{}, ifs.POST, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompComplianceReport{}, ifs.PUT, &l8web.L8Empty{})
	ws.AddEndpoint(&comp.CompComplianceReport{}, ifs.PATCH, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.DELETE, &l8web.L8Empty{})
	ws.AddEndpoint(&l8api.L8Query{}, ifs.GET, &comp.CompComplianceReportList{})
	sla.SetWebService(ws)

	vnic.Resources().Services().Activate(sla, vnic)
}

func CompComplianceReports(vnic ifs.IVNic) (ifs.IServiceHandler, bool) {
	return vnic.Resources().Services().ServiceHandler(ServiceName, ServiceArea)
}

func CompComplianceReport(reportId string, vnic ifs.IVNic) (*comp.CompComplianceReport, error) {
	this, ok := CompComplianceReports(vnic)
	filter := &comp.CompComplianceReport{ReportId: reportId}
	if ok {
		resp := this.Get(object.New(nil, filter), vnic)
		if resp.Error() != nil {
			return nil, resp.Error()
		}
		if resp.Element() != nil {
			return resp.Element().(*comp.CompComplianceReport), nil
		}
		return nil, nil
	}
	resp := vnic.Request("", ServiceName, ServiceArea, ifs.GET, filter, 30)
	if resp.Error() != nil {
		return nil, resp.Error()
	}
	if resp.Element() != nil {
		return resp.Element().(*comp.CompComplianceReport), nil
	}
	return nil, nil
}
