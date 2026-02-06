/*
© 2025 Sharon Aicler (saichler@gmail.com)
MFG module data arrays for mock data generation
*/
package main

var (
	mfgWorkCenterNames = []string{
		"Assembly Line 1", "Assembly Line 2", "CNC Machine Center",
		"Welding Station A", "Welding Station B", "Paint Booth 1",
		"Quality Inspection Bay", "Packaging Line", "Fabrication Center",
		"Testing Chamber", "Heat Treatment Furnace", "Surface Finishing",
	}

	mfgShiftNames = []string{
		"Day Shift", "Swing Shift", "Night Shift",
		"Weekend Day", "Weekend Night", "Overtime Shift",
	}

	mfgOperationNames = []string{
		"Cutting", "Drilling", "Milling", "Turning", "Grinding",
		"Welding", "Assembly", "Painting", "Quality Check", "Packaging",
		"Heat Treatment", "Surface Finish", "Testing", "Inspection",
	}

	mfgNCRReasons = []string{
		"Dimensional out of spec", "Surface defect", "Material defect",
		"Assembly error", "Missing component", "Wrong component",
		"Paint defect", "Weld defect", "Contamination", "Labeling error",
	}

	mfgOverheadNames = []string{
		"Factory Utilities", "Equipment Depreciation", "Indirect Labor",
		"Factory Supplies", "Maintenance Costs", "Quality Control",
		"Material Handling", "Factory Insurance", "Property Tax",
	}
)
