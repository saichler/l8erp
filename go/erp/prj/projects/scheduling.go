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
package projects

import (
	"github.com/saichler/l8erp/go/types/prj"
)

const hoursPerDay = 8

// computeTaskSchedule performs a forward-pass schedule calculation on project tasks,
// propagating dates through FINISH_TO_START dependencies.
func computeTaskSchedule(p *prj.PrjProject) error {
	if len(p.Tasks) == 0 {
		return nil
	}
	taskMap := make(map[string]*prj.PrjTask, len(p.Tasks))
	for _, t := range p.Tasks {
		taskMap[t.TaskId] = t
	}
	// Build successor map from dependencies
	successors := make(map[string][]depEdge)
	predecessorCount := make(map[string]int)
	for _, d := range p.Dependencies {
		if d.PredecessorTaskId == "" || d.SuccessorTaskId == "" {
			continue
		}
		successors[d.PredecessorTaskId] = append(successors[d.PredecessorTaskId],
			depEdge{taskId: d.SuccessorTaskId, lagDays: d.LagDays})
		predecessorCount[d.SuccessorTaskId]++
	}
	// Initialize queue with tasks that have no predecessors
	var queue []string
	for _, t := range p.Tasks {
		if predecessorCount[t.TaskId] == 0 {
			if t.StartDate == 0 && p.StartDate != 0 {
				t.StartDate = p.StartDate
			}
			calculateDueDate(t)
			queue = append(queue, t.TaskId)
		}
	}
	// Forward pass
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		pred := taskMap[current]
		if pred == nil {
			continue
		}
		for _, edge := range successors[current] {
			succ := taskMap[edge.taskId]
			if succ == nil {
				continue
			}
			candidateStart := pred.DueDate + int64(edge.lagDays)*24*3600
			if candidateStart > succ.StartDate {
				succ.StartDate = candidateStart
			}
			calculateDueDate(succ)
			predecessorCount[edge.taskId]--
			if predecessorCount[edge.taskId] <= 0 {
				queue = append(queue, edge.taskId)
			}
		}
	}
	// Update project end date to latest task due date
	maxEnd := p.EndDate
	for _, t := range p.Tasks {
		if t.DueDate > maxEnd {
			maxEnd = t.DueDate
		}
	}
	if maxEnd > 0 {
		p.EndDate = maxEnd
	}
	// Compute project percent complete as average of task percentages
	totalPct := int32(0)
	for _, t := range p.Tasks {
		totalPct += t.PercentComplete
	}
	p.PercentComplete = totalPct / int32(len(p.Tasks))
	return nil
}

func calculateDueDate(t *prj.PrjTask) {
	if t.StartDate == 0 || t.EstimatedHours <= 0 {
		return
	}
	durationDays := int64(t.EstimatedHours / hoursPerDay)
	if durationDays < 1 {
		durationDays = 1
	}
	t.DueDate = t.StartDate + durationDays*24*3600
}

type depEdge struct {
	taskId  string
	lagDays int32
}
