/*
© 2025 Sharon Aicler (saichler@gmail.com)
ECOM module data arrays for mock data generation
*/
package mocks

var (
	ecomCategoryNames = []string{
		"Electronics", "Clothing", "Home & Garden", "Sports & Outdoors",
		"Books", "Toys & Games", "Health & Beauty", "Automotive",
		"Jewelry", "Food & Grocery", "Office Supplies", "Pet Supplies",
	}

	ecomAttributeNames = []string{
		"Color", "Size", "Material", "Brand", "Weight",
		"Dimensions", "Style", "Pattern", "Finish", "Capacity",
	}

	ecomProductNames = []string{
		"Wireless Bluetooth Headphones", "Smart Watch Pro", "Laptop Stand Adjustable",
		"Ergonomic Office Chair", "USB-C Hub Adapter", "Mechanical Keyboard RGB",
		"Portable Power Bank 20000mAh", "Noise Cancelling Earbuds", "Monitor Light Bar",
		"Webcam HD 1080p", "Wireless Mouse Ergonomic", "Phone Stand Holder",
		"Cable Management Kit", "Laptop Sleeve 15 inch", "Desk Organizer Set",
		"Smart LED Bulb Pack", "Fitness Tracker Band", "Wireless Charger Pad",
		"Tablet Stand Adjustable", "Gaming Mouse Pad XL",
	}

	ecomPromotionNames = []string{
		"Summer Sale 2025", "Black Friday Deal", "New Customer Welcome",
		"Holiday Special", "Flash Sale", "Clearance Event",
		"Member Exclusive", "Weekend Special", "Season End Sale",
	}

	ecomCouponCodes = []string{
		"SAVE10", "WELCOME20", "FREESHIP", "FLASH50", "HOLIDAY25",
		"VIP15", "NEWUSER", "SUMMER30", "CLEARANCE40", "LOYALTY10",
	}

	ecomShippingCarriers = []string{
		"FedEx", "UPS", "USPS", "DHL", "Amazon Logistics",
	}

	ecomPaymentProviders = []string{
		"Stripe", "PayPal", "Square", "Braintree", "Authorize.net",
	}
)
