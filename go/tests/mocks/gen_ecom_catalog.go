/*
(C) 2025 Sharon Aicler (saichler@gmail.com)

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
	"fmt"
	"math/rand"
	"strings"

	"github.com/saichler/l8erp/go/types/ecom"
)

// generateEcomCategories creates e-commerce category records (foundation - no store needed)
func generateEcomCategories() []*ecom.EcomCategory {
	categories := make([]*ecom.EcomCategory, len(ecomCategoryNames))
	for i, name := range ecomCategoryNames {
		slug := strings.ToLower(strings.ReplaceAll(name, " & ", "-"))
		slug = strings.ReplaceAll(slug, " ", "-")

		cat := &ecom.EcomCategory{
			CategoryId:      genID("ecat", i),
			Name:            name,
			Description:     fmt.Sprintf("Browse our %s collection", name),
			Slug:            slug,
			ImageUrl:        fmt.Sprintf("https://cdn.example.com/categories/%s.jpg", slug),
			SortOrder:       int32(i + 1),
			IsActive:        true,
			MetaTitle:       fmt.Sprintf("%s | Shop Online", name),
			MetaDescription: fmt.Sprintf("Shop our wide selection of %s products.", name),
			Level:           1,
			Path:            fmt.Sprintf("/%s", slug),
			AuditInfo:       createAuditInfo(),
		}
		// First 4 categories are top-level; rest link to one of the first 4
		if i >= 4 {
			parentIdx := i % 4
			cat.ParentCategoryId = genID("ecat", parentIdx)
			cat.Level = 2
			cat.Path = fmt.Sprintf("/%s/%s", strings.ToLower(strings.ReplaceAll(ecomCategoryNames[parentIdx], " & ", "-")), slug)
		}
		categories[i] = cat
	}
	return categories
}

// generateEcomAttributes creates e-commerce attribute records (foundation - no store needed)
func generateEcomAttributes() []*ecom.EcomAttribute {
	attributeTypes := []ecom.EcomAttributeType{
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_COLOR,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_SIZE,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_TEXT,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_NUMBER,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_SELECT,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_MULTI_SELECT,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_BOOLEAN,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_DATE,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_TEXT,
		ecom.EcomAttributeType_ECOM_ATTRIBUTE_TYPE_TEXT,
	}

	// Options for select-type attributes
	attributeOptions := map[string][]string{
		"Color":      {"Red", "Blue", "Green", "Black", "White", "Gray", "Navy", "Brown"},
		"Size":       {"XS", "S", "M", "L", "XL", "XXL"},
		"Material":   {"Cotton", "Polyester", "Leather", "Metal", "Plastic", "Wood"},
		"Brand":      {"BrandA", "BrandB", "BrandC", "BrandD"},
		"Style":      {"Modern", "Classic", "Minimalist", "Vintage", "Contemporary"},
		"Pattern":    {"Solid", "Striped", "Checkered", "Floral", "Abstract"},
		"Finish":     {"Matte", "Glossy", "Satin", "Brushed"},
		"Capacity":   {"Small", "Medium", "Large", "Extra Large"},
	}

	attributes := make([]*ecom.EcomAttribute, len(ecomAttributeNames))
	for i, name := range ecomAttributeNames {
		code := strings.ToLower(strings.ReplaceAll(name, " ", "_"))
		attrType := attributeTypes[i%len(attributeTypes)]

		attr := &ecom.EcomAttribute{
			AttributeId:   genID("eattr", i),
			Name:          name,
			Code:          code,
			AttributeType: attrType,
			Description:   fmt.Sprintf("Product %s attribute", strings.ToLower(name)),
			IsRequired:    i < 2, // Color and Size are required
			IsFilterable:  i < 5, // First 5 attributes are filterable
			IsVisible:     true,
			IsSearchable:  i < 4, // First 4 attributes are searchable
			SortOrder:     int32(i + 1),
			AuditInfo:     createAuditInfo(),
		}

		// Add options for select-type attributes
		if opts, ok := attributeOptions[name]; ok {
			attr.Options = opts
			if len(opts) > 0 {
				attr.DefaultValue = opts[0]
			}
		}

		attributes[i] = attr
	}
	return attributes
}

// generateEcomProducts creates e-commerce product records with embedded images and variants
func generateEcomProducts(store *MockDataStore) []*ecom.EcomProduct {
	productTypes := []ecom.EcomProductType{
		ecom.EcomProductType_ECOM_PRODUCT_TYPE_PHYSICAL,
		ecom.EcomProductType_ECOM_PRODUCT_TYPE_PHYSICAL,
		ecom.EcomProductType_ECOM_PRODUCT_TYPE_PHYSICAL,
		ecom.EcomProductType_ECOM_PRODUCT_TYPE_DIGITAL,
		ecom.EcomProductType_ECOM_PRODUCT_TYPE_BUNDLE,
	}

	productStatuses := []ecom.EcomProductStatus{
		ecom.EcomProductStatus_ECOM_PRODUCT_STATUS_ACTIVE,
		ecom.EcomProductStatus_ECOM_PRODUCT_STATUS_ACTIVE,
		ecom.EcomProductStatus_ECOM_PRODUCT_STATUS_ACTIVE,
		ecom.EcomProductStatus_ECOM_PRODUCT_STATUS_DRAFT,
		ecom.EcomProductStatus_ECOM_PRODUCT_STATUS_INACTIVE,
	}

	brands := []string{"TechPro", "HomeStyle", "SportMax", "EcoLife", "LuxuryLine"}
	taxClasses := []string{"standard", "reduced", "exempt"}

	products := make([]*ecom.EcomProduct, len(ecomProductNames))
	for i, name := range ecomProductNames {
		slug := strings.ToLower(strings.ReplaceAll(name, " ", "-"))

		// Base price between $19.99 and $299.99
		basePrice := int64(rand.Intn(28000) + 1999)
		// Compare at price is 10-30% higher
		compareAtPrice := basePrice + int64(float64(basePrice)*0.1) + int64(rand.Intn(int(float64(basePrice)*0.2)))
		// Cost price is 40-60% of base price
		costPrice := int64(float64(basePrice) * (0.4 + rand.Float64()*0.2))

		categoryID := pickRef(store.EcomCategoryIDs, i)

		productID := genID("eprod", i)

		// Generate 2 embedded images per product
		imageTypes := []ecom.EcomImageType{ecom.EcomImageType_ECOM_IMAGE_TYPE_MAIN, ecom.EcomImageType_ECOM_IMAGE_TYPE_GALLERY}
		mimeTypes := []string{"image/jpeg", "image/png", "image/webp"}
		images := make([]*ecom.EcomImage, 2)
		for j := 0; j < 2; j++ {
			images[j] = &ecom.EcomImage{
				ImageId:      fmt.Sprintf("eimg-%03d", i*2+j+1),
				FileName:     fmt.Sprintf("product-%03d-img-%d.jpg", i+1, j+1),
				Url:          fmt.Sprintf("https://cdn.example.com/products/product-%03d-img-%d.jpg", i+1, j+1),
				ThumbnailUrl: fmt.Sprintf("https://cdn.example.com/products/thumb/product-%03d-img-%d.jpg", i+1, j+1),
				ImageType:    imageTypes[j],
				AltText:      fmt.Sprintf("Product image %d for %s", j+1, name),
				Title:        fmt.Sprintf("%s - Image %d", name, j+1),
				Width:        int32(rand.Intn(800) + 800),
				Height:       int32(rand.Intn(600) + 600),
				FileSize:     int64(rand.Intn(500000) + 50000),
				MimeType:     mimeTypes[rand.Intn(len(mimeTypes))],
				SortOrder:    int32(j + 1),
				IsPrimary:    j == 0,
				AuditInfo:    createAuditInfo(),
			}
		}

		// Generate 2 embedded variants per product
		colors := []string{"Black", "White", "Blue", "Red", "Gray"}
		sizes := []string{"S", "M", "L", "XL"}
		variants := make([]*ecom.EcomVariant, 2)
		for j := 0; j < 2; j++ {
			color := colors[(i+j)%len(colors)]
			size := sizes[(i+j)%len(sizes)]
			vPrice := int64(rand.Intn(28000) + 1999)
			variants[j] = &ecom.EcomVariant{
				VariantId:      fmt.Sprintf("evar-%03d", i*2+j+1),
				Sku:            fmt.Sprintf("SKU-%05d-%s-%s", 10000+i+1, strings.ToUpper(color[:1]), size),
				Name:           fmt.Sprintf("%s - %s", color, size),
				Price:          money(store, vPrice),
				CompareAtPrice: money(store, vPrice+int64(float64(vPrice)*0.15)),
				CostPrice:      money(store, int64(float64(vPrice)*0.5)),
				StockQuantity:  int32(rand.Intn(100) + 5),
				Weight:         float64(rand.Intn(3000)+200) / 1000.0,
				WeightUnit:     "kg",
				Barcode:        fmt.Sprintf("012345%06d", i*2+j+1),
				Attributes:     map[string]string{"color": color, "size": size},
				IsActive:       true,
				SortOrder:      int32(j + 1),
				AuditInfo:      createAuditInfo(),
			}
		}

		products[i] = &ecom.EcomProduct{
			ProductId:        productID,
			Sku:              fmt.Sprintf("SKU-%05d", 10000+i+1),
			Name:             name,
			Description:      fmt.Sprintf("High-quality %s with premium features and excellent durability.", name),
			ShortDescription: fmt.Sprintf("Premium %s for everyday use.", name),
			ProductType:      productTypes[i%len(productTypes)],
			Status:           productStatuses[i%len(productStatuses)],
			CategoryId:       categoryID,
			Price:             money(store, basePrice),
			CompareAtPrice:    money(store, compareAtPrice),
			CostPrice:         money(store, costPrice),
			StockQuantity:     int32(rand.Intn(500) + 10),
			LowStockThreshold: int32(rand.Intn(20) + 5),
			TrackInventory:    true,
			AllowBackorder:    i%3 == 0,
			Slug:              slug,
			MetaTitle:         fmt.Sprintf("%s | Buy Online", name),
			MetaDescription:   fmt.Sprintf("Shop %s at great prices. Free shipping available.", name),
			Brand:             brands[i%len(brands)],
			Weight:            float64(rand.Intn(5000)+100) / 1000.0,
			WeightUnit:        "kg",
			IsTaxable:         true,
			TaxClass:          taxClasses[i%len(taxClasses)],
			AuditInfo:         createAuditInfo(),
			Images:            images,
			Variants:          variants,
		}
	}
	return products
}

