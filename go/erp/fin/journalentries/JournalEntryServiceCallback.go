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
package journalentries

import (
	"github.com/saichler/l8erp/go/erp/common"
	"github.com/saichler/l8types/go/ifs"
	erp "github.com/saichler/l8erp/go/types/erp"
	"github.com/saichler/l8erp/go/types/fin"
)

func newJournalEntryServiceCallback() ifs.IServiceCallback {
	return common.NewValidation[fin.JournalEntry]("JournalEntry",
		func(e *fin.JournalEntry) { common.GenerateID(&e.JournalEntryId) }).
		StatusTransition(journalEntryTransitions()).
		Compute(computeJournalEntryTotals).
		Require(func(e *fin.JournalEntry) string { return e.JournalEntryId }, "JournalEntryId").
		Require(func(e *fin.JournalEntry) string { return e.FiscalPeriodId }, "FiscalPeriodId").
		Enum(func(e *fin.JournalEntry) int32 { return int32(e.Status) }, fin.JournalEntryStatus_name, "Status").
		OptionalMoney(func(e *fin.JournalEntry) *erp.Money { return e.TotalAmount }, "TotalAmount").
		Build()
}

func computeJournalEntryTotals(je *fin.JournalEntry) error {
	je.TotalAmount = common.SumLineMoney(je.Lines, func(l *fin.JournalEntryLine) *erp.Money { return l.DebitAmount })
	return nil
}

func journalEntryTransitions() *common.StatusTransitionConfig[fin.JournalEntry] {
	return &common.StatusTransitionConfig[fin.JournalEntry]{
		StatusGetter:  func(e *fin.JournalEntry) int32 { return int32(e.Status) },
		StatusSetter:  func(e *fin.JournalEntry, s int32) { e.Status = fin.JournalEntryStatus(s) },
		FilterBuilder: func(e *fin.JournalEntry) *fin.JournalEntry {
			return &fin.JournalEntry{JournalEntryId: e.JournalEntryId}
		},
		ServiceName:   ServiceName,
		ServiceArea:   ServiceArea,
		InitialStatus: 0,
		Transitions: map[int32][]int32{
			1: {2},       // DRAFT → POSTED
			2: {3, 4},    // POSTED → REVERSED, VOID
		},
		StatusNames: fin.JournalEntryStatus_name,
	}
}
