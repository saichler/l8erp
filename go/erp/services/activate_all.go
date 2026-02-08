/*
 * © 2025 Sharon Aicler (saichler@gmail.com)
 */
package services

import "github.com/saichler/l8types/go/ifs"

func ActivateAllServices(creds, dbname string, nic ifs.IVNic) {
	ActivateHCMServices(creds, dbname, nic)
	ActivateFinServices(creds, dbname, nic)
	ActivateSCMServices(creds, dbname, nic)
	ActivateSalesServices(creds, dbname, nic)
	ActivateMfgServices(creds, dbname, nic)
	ActivateCrmServices(creds, dbname, nic)
	ActivatePrjServices(creds, dbname, nic)
	ActivateBiServices(creds, dbname, nic)
	ActivateDocServices(creds, dbname, nic)
	ActivateEcomServices(creds, dbname, nic)
	ActivateCompServices(creds, dbname, nic)
	ActivateSysServices(creds, dbname, nic)
}
