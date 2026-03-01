/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import (
	"sync"

	"github.com/saichler/l8types/go/ifs"
)

const parallelWorkers = 20

func ActivateAllServices(creds, dbname string, nic ifs.IVNic) {
	var all []func()
	all = append(all, collectHCMActivations(creds, dbname, nic)...)
	all = append(all, collectFinActivations(creds, dbname, nic)...)
	all = append(all, collectSCMActivations(creds, dbname, nic)...)
	all = append(all, collectSalesActivations(creds, dbname, nic)...)
	all = append(all, collectMfgActivations(creds, dbname, nic)...)
	all = append(all, collectCrmActivations(creds, dbname, nic)...)
	all = append(all, collectPrjActivations(creds, dbname, nic)...)
	all = append(all, collectBiActivations(creds, dbname, nic)...)
	all = append(all, collectDocActivations(creds, dbname, nic)...)
	all = append(all, collectEcomActivations(creds, dbname, nic)...)
	all = append(all, collectCompActivations(creds, dbname, nic)...)
	all = append(all, collectSysActivations(creds, dbname, nic)...)

	sem := make(chan struct{}, parallelWorkers)
	var wg sync.WaitGroup

	for _, fn := range all {
		wg.Add(1)
		sem <- struct{}{}
		go func(f func()) {
			defer wg.Done()
			defer func() { <-sem }()
			f()
		}(fn)
	}
	wg.Wait()
}
