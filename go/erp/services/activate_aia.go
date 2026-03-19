/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"github.com/saichler/l8erp/go/erp/aia"
	"github.com/saichler/l8types/go/ifs"
)

func collectAiaActivations(creds, dbname string, nic ifs.IVNic) []func() {
	return []func(){
		func() { aia.Activate(creds, dbname, nic) },
	}
}

// ActivateChatService activates the AI Agent Chat service.
// Must be called after ActivateAllServices so the introspector is fully populated.
func ActivateChatService(creds, dbname string, nic ifs.IVNic) {
	aia.ActivateChat(creds, dbname, nic)
}
