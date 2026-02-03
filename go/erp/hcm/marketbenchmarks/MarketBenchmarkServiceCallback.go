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
package marketbenchmarks

import (
	"errors"
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8erp/go/erp/hcm/jobs"
	"github.com/saichler/l8erp/go/types/hcm"
	"github.com/saichler/l8types/go/ifs"
)

type MarketBenchmarkServiceCallback struct {
}

func newMarketBenchmarkServiceCallback() *MarketBenchmarkServiceCallback {
	return &MarketBenchmarkServiceCallback{}
}

func (this *MarketBenchmarkServiceCallback) Before(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	entity, ok := any.(*hcm.MarketBenchmark)
	if !ok {
		return nil, false, errors.New("invalid market benchmark type")
	}
	if action == ifs.POST {
		common.GenerateID(&entity.BenchmarkId)
	}
	err := validateMktBench(entity, vnic)
	if err != nil {
		return nil, false, err
	}
	return nil, true, nil
}

func (this *MarketBenchmarkServiceCallback) After(any interface{}, action ifs.Action, cont bool, vnic ifs.IVNic) (interface{}, bool, error) {
	return nil, true, nil
}

func validateMktBench(entity *hcm.MarketBenchmark, vnic ifs.IVNic) error {
	if err := validateMktBenchRequiredFields(entity); err != nil {
		return err
	}
	if err := validateMktBenchDates(entity); err != nil {
		return err
	}
	if err := validateMktBenchJob(entity, vnic); err != nil {
		return err
	}
	return nil
}

func validateMktBenchRequiredFields(entity *hcm.MarketBenchmark) error {
	if err := common.ValidateRequired(entity.BenchmarkId, "BenchmarkId"); err != nil {
		return err
	}
	if err := common.ValidateRequired(entity.JobId, "JobId"); err != nil {
		return err
	}
	return nil
}

func validateMktBenchDates(entity *hcm.MarketBenchmark) error {
	if entity.EffectiveDate != 0 && entity.ExpirationDate != 0 {
		if err := common.ValidateDateAfter(entity.ExpirationDate, entity.EffectiveDate, "ExpirationDate", "EffectiveDate"); err != nil {
			return err
		}
	}
	return nil
}

func validateMktBenchJob(entity *hcm.MarketBenchmark, vnic ifs.IVNic) error {
	return common.ValidateReference(
		entity.JobId,
		"Job",
		jobs.ServiceName,
		jobs.ServiceArea,
		jobs.Jobs,
		func(id string, vnic ifs.IVNic) (interface{}, error) { return jobs.Job(id, vnic) },
		hcm.Job{JobId: entity.JobId},
		vnic,
	)
}
