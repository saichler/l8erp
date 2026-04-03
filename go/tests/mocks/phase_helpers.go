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
package mocks

import (
	"reflect"
	"fmt"
	"os"
	"strings"
)

// runOp executes a single phase operation: post + store IDs
func runOp(client *HCMClient, label, endpoint string, list interface{}, ids []string, storeIDs *[]string) error {
	fmt.Printf("  Creating %s...", label)
	resp, err := client.Post(endpoint, list)
	if err != nil {
		fmt.Printf(" FAILED\n")
		fmt.Printf("    Error: %v\n", err)
		if resp != "" {
			fmt.Printf("    Response: %s\n", resp)
		}
		return fmt.Errorf("%s: %w", label, err)
	}
	if storeIDs != nil && ids != nil {
		*storeIDs = append(*storeIDs, ids...)
	}
	fmt.Printf(" %d created\n", len(ids))
	return nil
}

// extractIDs extracts a string field from a slice using a getter
func extractIDs(items interface{}, getter func(interface{}) string) []string {
	v := reflect.ValueOf(items)
	ids := make([]string, v.Len())
	for i := 0; i < v.Len(); i++ {
		ids[i] = getter(v.Index(i).Interface())
	}
	return ids
}

// runPhase runs a phase function with header formatting
func runPhase(label string, fn func() error) {
	fmt.Printf("\n%s\n", label)
	fmt.Printf("%s\n", strings.Repeat("-", len(label)))
	if err := fn(); err != nil {
		fmt.Printf("%s failed: %v\n", label, err)
		os.Exit(1)
	}
}
