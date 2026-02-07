# Phase 12: JS Field Name Mismatch Fixes

## Root Cause
During refactoring phases 3-5 (column factory, form factory, enum factory conversions), JS field names were written from memory instead of being verified against protobuf `.pb.go` files. This introduced ~450 silent field name mismatches across 9 modules, causing empty table cells in the UI.

## Scope
~450 mismatches across 9 modules (PRJ and BI are clean). Each mismatch affects both desktop and mobile files (columns + forms = up to 4 files per field).

## Approach
For each module: read every protobuf struct, compare against JS column/form field names, fix all mismatches. Process one module at a time, verify after each.

---

## Step 1: FIN Module (60 mismatches)

**Files to fix:**
- `go/erp/ui/web/fin/*/` — desktop columns + forms (7 submodules)
- `go/erp/ui/web/m/js/fin/` — mobile columns + forms

**Protobuf source:** `go/types/fin/*.pb.go`

**Mismatches by model:**

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| AccountBalance | `creditBalance` | `periodCredit` or `ytdCredit` |
| AccountBalance | `debitBalance` | `periodDebit` or `ytdDebit` |
| AccountBalance | `netBalance` | remove (doesn't exist) |
| AssetCategory | `depreciationMethod` | `defaultDepreciationMethod` |
| AssetCategory | `usefulLife` | `defaultUsefulLifeMonths` |
| AssetCategory | `salvageValuePercent` | remove (doesn't exist) |
| AssetDisposal | `salePrice` | `disposalProceeds` |
| AssetDisposal | `bookValueAtDisposal` | `netBookValueAtDisposal` |
| AssetRevaluation | `oldValue` | `previousValue` |
| AssetTransfer | `fromDepartment` | `fromDepartmentId` |
| AssetTransfer | `toDepartment` | `toDepartmentId` |
| BankReconciliation | `reconciliationDate` | `reconciledDate` |
| BudgetScenario | `name` | `scenarioName` |
| BudgetScenario | `budgetId` | `baseBudgetId` |
| BudgetScenario | `isBaseline` | remove or use `isActive` |
| CapitalExpenditure | `name` | `projectName` |
| CashForecast | `projectedInflow` | `projectedInflows` |
| CashForecast | `projectedOutflow` | `projectedOutflows` |
| CreditMemo | `issueDate` | `memoDate` |
| Customer | `isActive` | remove (use `status`) |
| CustomerContact | `contactName` | remove (doesn't exist) |
| CustomerPayment | `paymentNumber` | remove (doesn't exist) |
| DepreciationSchedule | `accumulatedDepreciation` | `accumulatedAmount` |
| DepreciationSchedule | `bookValue` | `remainingValue` |
| DepreciationSchedule | `periodDate` | `depreciationDate` |
| ExchangeRate | `sourceCurrencyId` | `source` |
| ExchangeRate | `targetCurrencyId` | `target` |
| ExchangeRate | `expirationDate` | remove (doesn't exist) |
| Forecast | `forecastAmount` | `projectedAmount` |
| Forecast | `assumptions` | remove (doesn't exist) |
| FundTransfer | `fromAccountId` | `sourceBankAccountId` |
| FundTransfer | `toAccountId` | `destinationBankAccountId` |
| JournalEntry | `totalDebit` | `totalAmount` |
| PaymentSchedule | `dueDate` | `scheduledDate` |
| PaymentSchedule | `status` | remove (doesn't exist) |
| PettyCash | `fundAmount` | `fundLimit` |
| PettyCash | `custodianName` | `custodianEmployeeId` |
| PurchaseInvoice | `reference` | remove (doesn't exist) |
| PurchaseInvoiceLine | `lineTotal` | `lineAmount` |
| SalesInvoiceLine | `lineTotal` | `lineAmount` |
| TaxExemption | `startDate` | `effectiveDate` |
| TaxExemption | `endDate` | `expirationDate` |
| TaxExemption | `certificateNumber` | remove (doesn't exist) |
| TaxExemption | `entityName` | remove (doesn't exist) |
| TaxExemption | `exemptionReason` | `reason` |
| TaxJurisdiction | `country` | `countryCode` |
| TaxJurisdiction | `stateProvince` | remove (doesn't exist) |
| TaxReturn | `taxLiability` | `taxAmount` |
| TaxReturn | `filingPeriod` | remove (doesn't exist) |
| TaxRule | `expirationDate` | `endDate` |
| TaxRule | `description` | remove (doesn't exist) |
| Vendor | `isActive` | remove (use `status`) |
| Vendor | `defaultPaymentMethod` | `preferredPaymentMethod` |
| VendorContact | `contactName` | remove (doesn't exist) |
| VendorPayment | `paymentNumber` | remove (doesn't exist) |
| VendorStatement | `totalBalance` | `closingBalance` |
| VendorStatement | `startDate` | `periodStart` |
| VendorStatement | `endDate` | `periodEnd` |
| WithholdingTaxConfig | `rate` | `withholdingRate` |
| WithholdingTaxConfig | `taxType` | remove (doesn't exist) |
| WithholdingTaxConfig | `name` | remove (doesn't exist) |
| WithholdingTaxConfig | `description` | remove (doesn't exist) |

**Process:**
1. Read each protobuf file in `go/types/fin/` to confirm exact field names
2. Fix desktop column files in `go/erp/ui/web/fin/*/`
3. Fix desktop form files in `go/erp/ui/web/fin/*/`
4. Fix mobile column files in `go/erp/ui/web/m/js/fin/`
5. Fix mobile form files in `go/erp/ui/web/m/js/fin/`
6. For fields that don't exist in protobuf: remove the column/form field entirely

---

## Step 2: SALES Module (103 mismatches)

**Files to fix:**
- `go/erp/ui/web/sales/*/` — desktop columns + forms (6 submodules)
- `go/erp/ui/web/m/js/sales/` — mobile columns + forms

**Protobuf source:** `go/types/sales/*.pb.go`

**Mismatches by model:**

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| SalesBackOrder | `backOrderQty` | `backOrderQuantity` |
| SalesBillingMilestone | `achievedDate` | remove (doesn't exist) |
| SalesCommissionCalc | `saleAmount` | `salesAmount` |
| SalesCommissionCalc | `calcDate` | `calculationDate` |
| SalesCommissionCalc | `isPaid` | remove (use `status`) |
| SalesCommissionPlan | `rate` | `baseRate` |
| SalesCommissionPlan | `expirationDate` | remove (doesn't exist) |
| SalesCommissionPlan | `maxCommission` | remove (doesn't exist) |
| SalesCommissionPlan | `minSaleAmount` | remove (doesn't exist) |
| SalesCustomerContract | `notes` | remove (doesn't exist) |
| SalesCustomerContract | `terms` | `termsAndConditions` |
| SalesCustomerHierarchy | `parentId` | remove (doesn't exist) |
| SalesCustomerPrice | `expirationDate` | `expiryDate` |
| SalesCustomerPrice | `specialPrice` | `unitPrice` |
| SalesCustomerSegment | `code` | remove (doesn't exist) |
| SalesDeliveryConfirm | `condition` | remove (doesn't exist) |
| SalesDeliveryConfirm | `signatureOnFile` | remove (doesn't exist) |
| SalesDeliveryLine | `pickedQty` | remove (doesn't exist) |
| SalesDeliveryLine | `shippedQty` | remove (doesn't exist) |
| SalesDeliveryOrder | `plannedDate` | `plannedShipDate` or `plannedDeliveryDate` |
| SalesDiscountRule | `customerId` | `customerIds` |
| SalesDiscountRule | `itemId` | `itemIds` |
| SalesDiscountRule | `minOrderAmount` | remove (doesn't exist) |
| SalesDiscountRule | `minQuantity` | remove (doesn't exist) |
| SalesDiscountRule | `startDate` | `effectiveDate` |
| SalesDiscountRule | `endDate` | `expiryDate` |
| SalesForecast | `forecastDate` | `expectedCloseDate` |
| SalesForecast | `periodStart` | remove (doesn't exist) |
| SalesForecast | `periodEnd` | remove (doesn't exist) |
| SalesOrderAllocation | `allocatedQty` | `allocatedQuantity` |
| SalesOrderLine | `requestedDate` | remove (doesn't exist) |
| SalesPartnerChannel | `contactEmail` | `email` |
| SalesPartnerChannel | `contactPhone` | `phone` |
| SalesPartnerChannel | `status` | remove (use `isActive`) |
| SalesPriceList | `expirationDate` | `expiryDate` |
| SalesPriceListEntry | `minQuantity` | remove (doesn't exist) |
| SalesPriceListEntry | `pricingMethod` | remove (doesn't exist) |
| SalesPromotionalPrice | `promoPrice` | `promotionalPrice` |
| SalesQuantityBreak | `breakPrice` | `unitPrice` |
| SalesQuantityBreak | `minQuantity` | `fromQuantity` |
| SalesQuantityBreak | `maxQuantity` | `toQuantity` |
| SalesReturnOrder | `returnReason` | remove (doesn't exist) |
| SalesReturnOrderLine | `returnQty` | `quantity` |
| SalesReturnOrderLine | `reason` | remove (doesn't exist) |
| SalesRevenueSchedule | `status` | remove (doesn't exist) |
| SalesRevenueSchedule | `accountId` | `revenueAccountId` or `deferredAccountId` |
| SalesShippingDoc | `carrierId` | remove (doesn't exist) |
| SalesShippingDoc | `trackingNumber` | remove (doesn't exist) |
| SalesShippingDoc | `shipDate` | remove (doesn't exist) |
| SalesShippingDoc | `freightCost` | remove (doesn't exist) |
| SalesShippingDoc | `estimatedArrival` | remove (doesn't exist) |
| SalesTarget | `status` | remove (doesn't exist) |
| SalesTarget | `periodStart` | `period` |
| SalesTarget | `periodEnd` | remove (use `period`) |
| SalesTerritory | `code` | remove (doesn't exist) |
| SalesTerritory | `country` | `countryCodes` |
| SalesTerritory | `parentId` | remove (doesn't exist) |

**Additionally:** Mobile files in `m/js/sales/` use unprefixed model names (e.g., `BackOrder` instead of `SalesBackOrder`). Fix all 21 model names to include the `Sales` prefix.

**Process:** Same as Step 1 — read protobuf, fix desktop, fix mobile, remove non-existent fields.

---

## Step 3: COMP Module (89 mismatches)

**Files to fix:**
- `go/erp/ui/web/comp/*/` — desktop columns + forms (4 submodules)
- `go/erp/ui/web/m/js/comp/` — mobile columns + forms

**Protobuf source:** `go/types/comp/*.pb.go`

**Mismatches by model:**

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| CompApprovalMatrix | `documentType`, `status`, `maxAmount`, `minAmount` | remove (don't exist) |
| CompAuditFinding | `controlId` | `relatedControlIds` |
| CompAuditFinding | `rootCause` | `cause` |
| CompAuditFinding | `identifiedDate`, `ownerId`, `actualRemediationDate`, `targetRemediationDate` | remove |
| CompAuditReport | `scope` | `scopeDescription` |
| CompAuditReport | `issueDate`, `reportType`, `conclusion`, `responseDate` | remove |
| CompAuditSchedule | `scope` | `auditScope` |
| CompAuditSchedule | `departmentId`, `frequency`, `objectives` | remove |
| CompCertification | `type`, `renewalDate` | remove |
| CompComplianceReport | `periodStartDate` | `periodStart` |
| CompComplianceReport | `periodEndDate` | `periodEnd` |
| CompComplianceReport | `findings` | `openFindings` |
| CompComplianceReport | `description`, `closedFindings`, `generatedDate` | remove |
| CompComplianceStatus | `evidence` | `evidenceDocumentId` |
| CompControl | `type` | `controlType` |
| CompControl | `objective` | `controlObjective` |
| CompControl | `frequency` | relate to `testFrequencyDays` |
| CompControl | `category`, `nature`, `status`, `testingProcedure` | remove |
| CompControlAssessment | `result` | `testResults` |
| CompControlAssessment | `findings`, `testProcedure`, `testingPerformed` | remove |
| CompIncident | `impact` | `financialImpact` |
| CompIncident | `riskId` | `relatedRiskId` |
| CompIncident | `correctiveActions` | `correctiveAction` |
| CompIncident | `containedDate`, `resolvedDate` | remove |
| CompInsurancePolicy | `premiumAmount` | `premium` |
| CompMitigationPlan | `completedDate`, `expectedOutcome` | remove |
| CompPolicyDocument | `category`, `summary`, `approvalDate`, `approvedBy`, `expiryDate` | remove |
| CompRegulation | `type` | `regulationType` |
| CompRegulation | `status`, `issuingAuthority`, `penaltyInfo`, `referenceUrl`, `expiryDate` | remove |
| CompRemediationAction | `evidence` | `evidenceDocumentId` |
| CompRemediationAction | `notes` | `progressNotes` |
| CompRemediationAction | `actionPlan`, `priority`, `completedDate`, `verifiedDate` | remove |
| CompRequirement | `name`, `status`, `category`, `dueDate` | remove |
| CompRiskAssessment | `impact` | `impactRating` |
| CompRiskAssessment | `likelihood` | `likelihoodRating` |
| CompRiskAssessment | `assessmentType`, `findings`, `methodology`, `riskLevel` | remove |
| CompRiskRegister | `name`, `riskNumber`, `causes`, `consequences`, `inherentRiskLevel`, `residualRiskLevel`, `riskAppetite` | remove |
| CompSegregationRule | `riskDescription` | `description` |
| CompSegregationRule | `conflictingRole1`, `conflictingRole2`, `mitigatingControl`, `status` | remove |
| CompViolationRecord | `regulationId`, `reportedDate`, `resolutionDate` | remove |

---

## Step 4: CRM Module (63 mismatches)

**Files to fix:**
- `go/erp/ui/web/crm/*/` — desktop columns + forms (6 submodules)
- `go/erp/ui/web/m/js/crm/` — mobile columns + forms

**Protobuf source:** `go/types/crm/*.pb.go`

**Mismatches by model (highlights — full list in audit):**

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| CrmCampaign | `expectedResponse` | `expectedResponseRate` |
| CrmCampaignMember | `respondedDate` | `firstRespondedDate` |
| CrmCampaignROI | `roi` | `roiPercentage` |
| CrmCampaignResponse | `memberId` | `campaignMemberId` |
| CrmCampaignResponse | `notes`, `responseValue` | remove |
| CrmEmailTemplate | `category`, `htmlBody`, `textBody` | remove |
| CrmHealthScore | `assessmentDate` | `scoreDate` |
| CrmHealthScore | `productUsageScore` | `usageScore` |
| CrmHealthScore | `supportScore` | remove |
| CrmInteraction | `createdBy` | remove |
| CrmOppCompetitor | `competitorName` | `name` |
| CrmOppProduct | `discount` | `discountPercent` |
| CrmOppTeam | `userId` | remove |
| CrmOpportunity | `contactId` | `primaryContactId` |
| CrmOpportunity | `stageId` | `stage` |
| CrmRelationship | `primaryAccountId` | `accountId` |
| CrmServiceContract | 10+ fabricated fields | verify each against proto |
| CrmServiceOrder | `scheduledDate` | `scheduledStart`/`scheduledEnd` |
| CrmServiceOrder | `subject`, `completedDate`, etc. | remove |
| CrmServicePart | `unitPrice`/`totalPrice` | `unitCost`/`totalCost` |
| CrmServiceSchedule | `scheduledDate` | `scheduleDate` |
| CrmServiceSchedule | `isConfirmed` | `isAvailable` |
| CrmServiceVisit | many fabricated fields | remove |
| CrmTechnician | many fabricated fields | remove |

---

## Step 5: MFG Module (61 mismatches)

**Files to fix:**
- `go/erp/ui/web/mfg/*/` — desktop columns + forms (6 submodules)
- `go/erp/ui/web/m/js/mfg/` — mobile columns + forms

**Protobuf source:** `go/types/mfg/*.pb.go`

**Mismatches by model (highlights):**

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| MfgActualCost | `costElementType` | `costElement` |
| MfgActualCost | `actualAmount` | `amount` |
| MfgActualCost | `actualQuantity` | `quantity` |
| MfgActualCost | `postingDate` | `transactionDate` |
| MfgBomLine | `quantity` | `quantityPer` |
| MfgCapacityLoad | `periodDate` | `periodStart`/`periodEnd` |
| MfgCapacityPlan | `startDate`/`endDate` | `planningStart`/`planningEnd` |
| MfgCostVariance | `actualAmount`/`standardAmount` | `actualCost`/`standardCost` |
| MfgCostVariance | `calculationDate` | `analysisDate` |
| MfgDowntimeEvent | `reason` | `reasonCode` |
| MfgEngChangeDetail | `changeDescription` | `description` |
| MfgNCR | `reportDate` | `reportedDate` |
| MfgNCR | `affectedQuantity` | `quantityAffected` |
| MfgProdConsumption | `quantity` | `quantityConsumed` or `quantityPlanned` |
| MfgProdSchedule | `startDate`/`endDate` | `scheduleStart`/`scheduleEnd` |
| MfgQualityInspection | `result` | `overallResult` |
| MfgQualityInspection | `quantityPassed`/`quantityFailed` | `quantityAccepted`/`quantityRejected` |
| MfgScheduleBlock | `startTime`/`endTime` | `scheduledStart`/`scheduledEnd` |
| MfgShiftSchedule | `breakDurationMinutes` | `breakDuration` |
| MfgWorkOrderOp | `runTime`/`setupTime` | `runTimePlanned`/`setupTimePlanned` |
| + many fabricated fields across multiple models | | remove |

---

## Step 6: DOC Module (53 mismatches)

**Files to fix:**
- `go/erp/ui/web/documents/*/` — desktop columns + forms (4 submodules)
- `go/erp/ui/web/m/js/documents/` — mobile columns + forms

**Protobuf source:** `go/types/doc/*.pb.go`

**Primary pattern:** `*At` → `*Date` timestamp convention

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| DocAccessLog | `accessType` | `action` |
| DocAccessLog | `accessedAt` | `accessDate` |
| DocArchiveJob | `completedAt` | `completedDate` |
| DocArchiveJob | `startedAt` | `initiatedDate` |
| DocArchiveJob | `policyId` | `retentionPolicyId` |
| DocArchiveJob | `documentId` | `documentIds` |
| DocAttachment | all 5 fields fabricated | remove |
| DocAuditTrail | `oldValue`/`newValue` | `oldValues`/`newValues` |
| DocCheckout | `checkedOutAt`/`checkedInAt` | `checkoutDate`/`checkinDate` |
| DocDocumentVersion | `isCurrent` | `isMajorVersion` |
| DocEmailCapture | `receivedAt` | `receivedDate` |
| DocFolder | `isActive` | `isSystem` |
| DocLegalHold | `startDate`/`endDate` | `effectiveDate`/`releaseDate` |
| DocLegalHold | `documentId` | `documentIds` |
| DocRetentionPolicy | `action` | `actionOnExpiry` |
| DocRetentionPolicy | `retentionPeriod` | `retentionDays` |
| DocScanJob | `scannedAt`/`scannedBy` | `initiatedDate`/`initiatedBy` |
| DocSignature | `expiresAt`/`requestedAt`/`signedAt` | `expiryDate`/`requestedDate`/`signedDate` |
| DocWorkflowStep | `completedAt` | `completedDate` |
| DocWorkflowStep | `stepOrder` | `stepNumber` |
| + many fabricated fields | | remove |

---

## Step 7: SCM Module (12 mismatches)

**Files to fix:**
- `go/erp/ui/web/scm/*/` — desktop columns + forms
- `go/erp/ui/web/m/js/scm/` — mobile columns + forms

**Protobuf source:** `go/types/scm/*.pb.go`

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| ScmCarrier | `website` | remove |
| ScmDeliveryProof | `signatureRef` | `signature` |
| ScmDistributionRequirement | `priority` | remove |
| ScmFreightRate | `expirationDate`, `unitOfMeasure` | remove |
| ScmMaterialRequirement | `notes` | remove |
| ScmMaterialRequirement | `sourceOrderId` | `source` |
| ScmNewProductPlan | `description` | remove |
| ScmPackTask | `notes` | remove |
| ScmShipment | `destination` | `destinationAddress` |
| ScmShipment | `origin` | `originWarehouseId` |
| ScmStockMovement | `reference` | `referenceId` or `referenceType` |

---

## Step 8: HCM Module (5 mismatches)

**Files to fix:**
- `go/erp/ui/web/hcm/*/` — desktop columns + forms
- `go/erp/ui/web/m/js/hcm/` — mobile columns + forms

**Protobuf source:** `go/types/hcm/*.pb.go`

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| Applicant | `name` | use `firstName`+`lastName` in render |
| CourseSession | `enrollment` | `enrolledCount` |
| Dependent | `name` | use `firstName`+`lastName` in render |
| Employee | `name` | use `firstName`+`lastName` in render |
| SalaryGrade | `range` | computed from `minimum`+`maximum` in render |

Note: The `name` fields for person models are computed display fields — keep the column but fix the render function to concatenate `firstName` + `lastName`.

---

## Step 9: ECOM Module (4 mismatches)

**Files to fix:**
- `go/erp/ui/web/ecom/*/` — desktop columns + forms
- `go/erp/ui/web/m/js/ecom/` — mobile columns + forms

**Protobuf source:** `go/types/ecom/*.pb.go`

| Model | Wrong Field | Correct Field |
|-------|------------|---------------|
| EcomOrder | `billingAddressId` | `billingAddress` |
| EcomOrder | `shippingAddressId` | `shippingAddress` |
| EcomOrderStatusHistory | `reason` | remove |
| EcomReturnLine | `unitPrice` | remove |

---

## Step 10: Verification

After all fixes:
1. For each module, run a field name cross-check:
   ```bash
   # Extract all JS field names from columns
   grep -rhoP "key: '\\K[^']+" go/erp/ui/web/<module>/ --include="*-columns.js" | sort -u

   # Extract all protobuf JSON names
   grep -oP "json=\\K[^,]+" go/types/<module>/*.pb.go | sort -u

   # Compare (every JS name must exist in protobuf output)
   ```
2. Repeat for mobile files in `m/js/<module>/`
3. Repeat for form files (`*-forms.js`)
4. Manual spot-check of render functions that use `item.xxx`

---

## Execution Order
Process modules from most mismatches to least:
1. SALES (103) — worst, includes model name prefix issues
2. COMP (89)
3. CRM (63)
4. MFG (61)
5. FIN (60) — CashForecast already fixed
6. DOC (53)
7. SCM (12)
8. HCM (5)
9. ECOM (4)

**Important:** For each module, the exact field names in this plan MUST be re-verified against the `.pb.go` files before applying fixes. The audit may have its own inaccuracies — always use the protobuf as the source of truth.

---

## Estimated Impact
- ~450 field references fixed across ~80 JS files (desktop + mobile columns + forms)
- All table columns will display data correctly
- All form fields will populate correctly when editing records
