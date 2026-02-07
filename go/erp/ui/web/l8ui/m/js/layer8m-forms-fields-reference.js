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
/**
 * Layer8MForms Field Renderers - Reference & Money Fields
 * Split from layer8m-forms-fields.js for maintainability.
 * Adds renderReferenceField and renderMoneyField to Layer8MFormFields.
 */
(function() {
    'use strict';

    const F = window.Layer8MFormFields;

    /**
     * Build a reference input HTML string for a given config and value.
     * Shared by renderReferenceField and renderMoneyField.
     */
    function buildReferenceInput(config, refId, displayValue, readonly) {
        let refConfig = config.referenceConfig || {};
        if (config.lookupModel && window.Layer8MReferenceRegistry) {
            const registryConfig = Layer8MReferenceRegistry.get(config.lookupModel);
            if (registryConfig) {
                refConfig = {
                    modelName: config.lookupModel,
                    idColumn: registryConfig.idColumn,
                    displayColumn: registryConfig.displayColumn,
                    selectColumns: registryConfig.selectColumns,
                    displayLabel: registryConfig.displayLabel,
                    ...config.referenceConfig,
                    title: config.referenceConfig?.title || `Select ${config.label}`
                };
            }
        }

        const serializableConfig = {
            modelName: refConfig.modelName || config.lookupModel,
            idColumn: refConfig.idColumn,
            displayColumn: refConfig.displayColumn,
            selectColumns: refConfig.selectColumns,
            baseWhereClause: refConfig.baseWhereClause,
            title: refConfig.title,
            displayLabel: refConfig.displayLabel,
            placeholder: refConfig.placeholder
        };

        if (refId && !displayValue) {
            displayValue = `ID: ${refId}`;
        }

        const requiredAttr = config.required ? 'required' : '';

        if (readonly) {
            return `<input type="text"
                       name="${config.key}"
                       value="${Layer8MUtils.escapeAttr(displayValue || 'N/A')}"
                       data-ref-id="${Layer8MUtils.escapeAttr(String(refId))}"
                       class="mobile-form-input reference-input"
                       readonly disabled>`;
        }

        return `<input type="text"
                   id="field-${config.key}"
                   name="${config.key}"
                   value="${Layer8MUtils.escapeAttr(displayValue)}"
                   data-ref-id="${Layer8MUtils.escapeAttr(String(refId))}"
                   data-ref-config='${Layer8MUtils.escapeAttr(JSON.stringify(serializableConfig))}'
                   data-field-key="${Layer8MUtils.escapeAttr(config.key)}"
                   data-lookup-model="${Layer8MUtils.escapeAttr(config.lookupModel || refConfig.modelName || '')}"
                   class="mobile-form-input reference-input"
                   ${requiredAttr}
                   readonly
                   placeholder="Click to select...">`;
    }

    /**
     * Render reference field - MATCHES DESKTOP erp-forms.js EXACTLY
     */
    F.renderReferenceField = function(config, value, readonly) {
        const refId = value?.id || value || '';
        const displayValue = value?.display || '';
        const inputHtml = buildReferenceInput(config, refId, displayValue, readonly);

        return `
            <div class="mobile-form-field">
                <label class="mobile-form-label">${Layer8MUtils.escapeHtml(config.label)}${!readonly && config.required ? ' *' : ''}</label>
                ${inputHtml}
            </div>
        `;
    };

    /**
     * Render money field - Currency reference picker + amount input
     * Matches desktop layer8d-forms-fields.js money case
     */
    F.renderMoneyField = function(config, value, readonly) {
        const moneyObj = (typeof value === 'object' && value !== null) ? value : {};
        const amountValue = moneyObj.amount !== undefined ? moneyObj.amount : value;
        const currencyId = moneyObj.currencyId || '';

        const currencyConfig = {
            key: config.key + '.__currencyId',
            label: 'Currency',
            lookupModel: 'Currency'
        };
        const currencyHtml = buildReferenceInput(currencyConfig, currencyId, '', readonly);

        const displayAmount = amountValue ? (amountValue / 100).toFixed(2) : '';
        const requiredAttr = config.required ? 'required' : '';
        const readonlyAttr = readonly ? 'readonly' : '';

        const amountHtml = `<input type="number"
                   name="${config.key}.__amount"
                   value="${displayAmount}"
                   step="0.01" min="0"
                   class="mobile-form-input mobile-money-amount"
                   data-format="currency"
                   ${requiredAttr} ${readonlyAttr}>`;

        return `
            <div class="mobile-form-field">
                <label class="mobile-form-label">${Layer8MUtils.escapeHtml(config.label)}${config.required ? ' *' : ''}</label>
                <div class="mobile-money-input-group">
                    ${currencyHtml}
                    ${amountHtml}
                </div>
            </div>
        `;
    };

})();
