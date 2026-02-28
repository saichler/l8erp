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

package csvexport

import (
	"fmt"
	"github.com/saichler/l8srlz/go/serialize/object"
	"github.com/saichler/l8types/go/ifs"
	"github.com/saichler/l8types/go/types/l8api"
	"time"
)

type CsvExportHandler struct {
	sla *ifs.ServiceLevelAgreement
}

func (this *CsvExportHandler) Activate(sla *ifs.ServiceLevelAgreement, vnic ifs.IVNic) error {
	this.sla = sla
	return nil
}

func (this *CsvExportHandler) DeActivate() error {
	return nil
}

func (this *CsvExportHandler) Post(elems ifs.IElements, vnic ifs.IVNic) ifs.IElements {
	req, ok := elems.Element().(*l8api.L8CsvExportRequest)
	if !ok {
		return object.NewError("invalid csv export request type")
	}

	node, found := vnic.Resources().Introspector().NodeByTypeName(req.ModelType)
	if !found {
		return object.NewError("unknown model type: " + req.ModelType)
	}

	headers := buildHeaders(node)
	if len(headers) == 0 {
		return object.NewError("no exportable attributes for: " + req.ModelType)
	}

	handler, hasLocal := vnic.Resources().Services().ServiceHandler(req.ServiceName, byte(req.ServiceArea))

	limit := 500
	page := 0
	var rows [][]string

	for {
		query := fmt.Sprintf("select * from %s limit %d page %d", req.ModelType, limit, page)

		var resp ifs.IElements
		if hasLocal {
			queryElems, err := object.NewQuery(query, vnic.Resources())
			if err != nil {
				return object.NewError("query error: " + err.Error())
			}
			resp = handler.Get(queryElems, vnic)
		} else {
			resp = vnic.Request("", req.ServiceName, byte(req.ServiceArea), ifs.GET, query, 30)
		}

		if resp.Error() != nil {
			return object.NewError("fetch error: " + resp.Error().Error())
		}

		items := resp.Elements()
		if len(items) == 0 {
			break
		}

		for _, item := range items {
			rows = append(rows, extractRow(item, headers, node))
		}

		if len(items) < limit {
			break
		}
		page++
	}

	csvData := buildCSV(headers, rows)
	filename := fmt.Sprintf("%s_%s.csv", req.ModelType, time.Now().Format("2006-01-02"))

	resp := &l8api.L8CsvExportResponse{
		CsvData:  csvData,
		Filename: filename,
		RowCount: int32(len(rows)),
	}
	return object.New(nil, resp)
}

func (this *CsvExportHandler) Put(ifs.IElements, ifs.IVNic) ifs.IElements {
	return object.NewError("not supported")
}

func (this *CsvExportHandler) Patch(ifs.IElements, ifs.IVNic) ifs.IElements {
	return object.NewError("not supported")
}

func (this *CsvExportHandler) Delete(ifs.IElements, ifs.IVNic) ifs.IElements {
	return object.NewError("not supported")
}

func (this *CsvExportHandler) Get(ifs.IElements, ifs.IVNic) ifs.IElements {
	return object.NewError("not supported")
}

func (this *CsvExportHandler) Failed(ifs.IElements, ifs.IVNic, *ifs.Message) ifs.IElements {
	return nil
}

func (this *CsvExportHandler) TransactionConfig() ifs.ITransactionConfig {
	return nil
}

func (this *CsvExportHandler) WebService() ifs.IWebService {
	return this.sla.WebService()
}
