/*
© 2025 Sharon Aicler (saichler@gmail.com)
SCM module data arrays for mock data generation
*/
package mocks

var (
	itemCategoryNames = []string{
		"Raw Materials", "Finished Goods", "Semi-Finished Goods",
		"MRO Supplies", "Office Supplies", "Packaging Materials",
		"Electronics Components", "Chemicals", "Hardware", "Consumables",
	}

	itemNames = []string{
		"Steel Sheet 4x8", "Aluminum Rod 1/2in", "Copper Wire 12AWG",
		"Ball Bearing 6205", "Hydraulic Pump HP-200", "Electric Motor 5HP",
		"Circuit Board CB-100", "LED Panel LP-500", "Rubber Gasket RG-50",
		"Plastic Housing PH-300", "Stainless Bolt M10", "Carbon Filter CF-20",
		"Glass Panel GP-800", "Nylon Bushing NB-15", "Thermal Paste TP-10",
		"Welding Rod WR-308", "Brass Fitting BF-25", "Silicone Seal SS-40",
		"Fiber Optic Cable FOC-100", "Titanium Plate TP-600",
		"Power Supply PS-750", "Control Valve CV-300", "Pressure Gauge PG-100",
		"Conveyor Belt CB-2000", "Safety Helmet SH-Pro",
	}

	warehouseNames = []string{
		"Main Distribution Center", "West Coast Warehouse",
		"East Coast Warehouse", "Central Hub",
		"Cold Storage Facility", "Hazmat Storage",
	}

	scmCarrierNames = []string{
		"FedEx Freight", "UPS Supply Chain", "DHL Logistics",
		"XPO Logistics", "J.B. Hunt", "Schneider National",
		"Old Dominion", "Estes Express", "Saia Inc", "Werner Enterprises",
	}

	routeNames = []string{
		"West Coast Express", "East Coast Standard", "Central Route",
		"Cross-Country Premium", "Regional Southeast", "Pacific Northwest",
		"Gulf Coast Route", "Mountain West", "Northeast Corridor",
		"Midwest Hub-and-Spoke",
	}

	promotionTypes = []string{
		"Seasonal Sale", "Volume Discount", "New Product Launch",
		"Clearance", "Holiday Special", "Flash Sale",
		"Bundle Promotion", "Loyalty Reward",
	}
)
