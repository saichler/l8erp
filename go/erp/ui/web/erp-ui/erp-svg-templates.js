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
 * ERP SVG Templates
 * Module-specific SVG icon templates for ERP section headers.
 * Registers templates with Layer8SvgFactory for use in section configs.
 */
(function() {
    'use strict';

    const factory = window.Layer8SvgFactory;
    if (!factory || !factory.registerTemplate) {
        console.error('Layer8SvgFactory must be loaded before erp-svg-templates.js');
        return;
    }

    // HCM - people icons
    factory.registerTemplate('people', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="200" cy="52" r="7" fill="#fff" opacity="1.0"/>
            <path d="M 188 74 Q 200 66 212 74" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="400" cy="50" r="16" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="400" cy="44" r="6" fill="#fff" opacity="0.9"/>
            <path d="M 390 60 Q 400 53 410 60" fill="none" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="600" cy="65" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="55" r="9" fill="#fff" opacity="1.0"/>
            <path d="M 585 80 Q 600 71 615 80" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="800" cy="55" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="800" cy="48" r="6" fill="#fff" opacity="0.9"/>
            <path d="M 789 67 Q 800 59 811 67" fill="none" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="1000" cy="52" r="7" fill="#fff" opacity="1.0"/>
            <path d="M 988 74 Q 1000 65 1012 74" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>`;
    });

    // FIN - dollar signs and charts
    factory.registerTemplate('financial', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <text x="200" y="67" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold" opacity="1.0">$</text>
            <rect x="382" y="55" width="10" height="22" rx="2" fill="url(#${gradientId})" opacity="0.7"/>
            <rect x="395" y="42" width="10" height="35" rx="2" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="408" y="48" width="10" height="29" rx="2" fill="url(#${gradientId})" opacity="0.7"/>
            <rect x="421" y="36" width="10" height="41" rx="2" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <text x="600" y="68" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold" opacity="1.0">$</text>
            <line x1="770" y1="45" x2="830" y2="45" stroke="#fff" stroke-width="2" opacity="0.7"/>
            <line x1="770" y1="55" x2="830" y2="55" stroke="#fff" stroke-width="2" opacity="0.7"/>
            <line x1="770" y1="65" x2="830" y2="65" stroke="#fff" stroke-width="2" opacity="0.7"/>
            <line x1="770" y1="75" x2="830" y2="75" stroke="#fff" stroke-width="2" opacity="0.7"/>
            <circle cx="800" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <text x="1000" y="67" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold" opacity="1.0">$</text>`;
    });

    // SCM - boxes and arrows
    factory.registerTemplate('supplyChain', function(gradientId) {
        return `
            <rect x="180" y="40" width="40" height="40" rx="4" fill="url(#${gradientId})" opacity="0.8"/>
            <line x1="192" y1="55" x2="208" y2="55" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <line x1="192" y1="65" x2="208" y2="65" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <rect x="380" y="45" width="40" height="32" rx="4" fill="url(#${gradientId})" opacity="0.7"/>
            <polygon points="400,55 394,66 406,66" fill="#fff" opacity="0.9"/>
            <rect x="580" y="35" width="40" height="50" rx="4" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="52" r="7" fill="#fff" opacity="1.0"/>
            <line x1="592" y1="70" x2="608" y2="70" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <rect x="780" y="43" width="40" height="34" rx="4" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 793 58 L 807 58 L 800 68 Z" fill="#fff" opacity="0.9"/>
            <rect x="980" y="40" width="40" height="40" rx="4" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="1000" cy="58" r="8" fill="#fff" opacity="1.0"/>`;
    });

    // Sales - shopping carts and receipts
    factory.registerTemplate('sales', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 190 54 L 194 54 L 200 66 L 210 66" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="198" cy="72" r="4" fill="#fff" opacity="1.0"/>
            <circle cx="208" cy="72" r="4" fill="#fff" opacity="1.0"/>
            <rect x="380" y="42" width="40" height="40" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <line x1="388" y1="54" x2="412" y2="54" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="388" y1="62" x2="412" y2="62" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="388" y1="70" x2="408" y2="70" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <text x="600" y="68" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold" opacity="1.0">%</text>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 793 58 L 807 58 L 800 50 L 800 74" fill="none" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 991 54 L 995 54 L 1000 64 L 1009 64" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="998" cy="70" r="3" fill="#fff" opacity="1.0"/>
            <circle cx="1007" cy="70" r="3" fill="#fff" opacity="1.0"/>`;
    });

    // CRM - handshakes and contacts
    factory.registerTemplate('crm', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 190 58 Q 200 49 210 58" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <path d="M 190 64 Q 200 73 210 64" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="400" cy="55" r="16" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="400" cy="50" r="5" fill="#fff" opacity="0.9"/>
            <path d="M 392 62 Q 400 56 408 62" fill="none" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <path d="M 588 54 L 594 60 L 606 60 L 612 54" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <path d="M 588 66 L 594 60 L 606 60 L 612 66" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="800" cy="55" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="794" cy="51" r="5" fill="#fff" opacity="0.9"/>
            <circle cx="806" cy="51" r="5" fill="#fff" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 990 57 L 1000 53 L 1010 57" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <path d="M 994 65 Q 1000 71 1006 65" fill="none" stroke="#fff" stroke-width="2" opacity="1.0"/>`;
    });

    // MFG - gears and factory
    factory.registerTemplate('manufacturing', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="200" cy="60" r="8" fill="#fff" opacity="0.6"/>
            <circle cx="200" cy="60" r="4" fill="url(#${gradientId})" opacity="1.0"/>
            <g transform="translate(200,60)" opacity="1.0">
                <rect x="-3" y="-20" width="6" height="8" fill="#fff"/>
                <rect x="-3" y="12" width="6" height="8" fill="#fff"/>
                <rect x="-20" y="-3" width="8" height="6" fill="#fff"/>
                <rect x="12" y="-3" width="8" height="6" fill="#fff"/>
            </g>
            <rect x="380" y="40" width="40" height="42" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <rect x="386" y="30" width="12" height="12" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="402" y="24" width="12" height="18" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="60" r="10" fill="#fff" opacity="0.6"/>
            <circle cx="600" cy="60" r="5" fill="url(#${gradientId})" opacity="1.0"/>
            <rect x="780" y="45" width="40" height="32" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <line x1="788" y1="54" x2="812" y2="54" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="788" y1="62" x2="808" y2="62" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="788" y1="70" x2="810" y2="70" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <polygon points="1000,47 1010,70 990,70" fill="#fff" opacity="0.9"/>`;
    });

    // PRJ - gantt charts and milestones
    factory.registerTemplate('projects', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <line x1="190" y1="53" x2="210" y2="53" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <line x1="190" y1="60" x2="206" y2="60" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <line x1="190" y1="67" x2="202" y2="67" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <rect x="380" y="45" width="40" height="32" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <polygon points="400,52 395,61 405,61" fill="#fff" opacity="0.9"/>
            <line x1="400" y1="61" x2="400" y2="74" stroke="#fff" stroke-width="2.5" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <circle cx="600" cy="60" r="10" stroke="#fff" stroke-width="2.5" fill="none" opacity="1.0"/>
            <path d="M 600 53 L 600 60 L 607 60" stroke="#fff" stroke-width="2.5" fill="none" opacity="1.0"/>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <line x1="788" y1="53" x2="812" y2="53" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="791" y1="61" x2="810" y2="61" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="794" y1="69" x2="807" y2="69" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <polygon points="1000,48 990,70 1010,70" fill="#fff" opacity="0.9"/>`;
    });

    // BI - charts and graphs
    factory.registerTemplate('analytics', function(gradientId) {
        return `
            <rect x="180" y="40" width="40" height="40" rx="3" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="187" y="60" width="8" height="16" fill="#fff" opacity="1.0"/>
            <rect x="197" y="50" width="8" height="26" fill="#fff" opacity="1.0"/>
            <rect x="207" y="54" width="8" height="22" fill="#fff" opacity="1.0"/>
            <circle cx="400" cy="60" r="16" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 400 60 L 400 47 A 13 13 0 0 1 410 68 Z" fill="#fff" opacity="0.9"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <polyline points="584,72 592,56 600,62 608,48 616,58" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <line x1="788" y1="72" x2="812" y2="72" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <line x1="788" y1="72" x2="788" y2="50" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <polyline points="790,66 798,56 804,62 810,52" fill="none" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="1000" cy="60" r="8" stroke="#fff" stroke-width="2.5" fill="none" opacity="1.0"/>
            <line x1="1006" y1="66" x2="1012" y2="72" stroke="#fff" stroke-width="2.5" opacity="1.0"/>`;
    });

    // Documents - files and folders
    factory.registerTemplate('documents', function(gradientId) {
        return `
            <rect x="180" y="40" width="40" height="42" rx="3" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 180 46 L 196 40 L 220 40 L 220 46 L 180 46" fill="url(#${gradientId})" opacity="0.9"/>
            <line x1="188" y1="56" x2="212" y2="56" stroke="#fff" stroke-width="2" opacity="1.0"/>
            <line x1="188" y1="64" x2="208" y2="64" stroke="#fff" stroke-width="2" opacity="1.0"/>
            <line x1="188" y1="72" x2="210" y2="72" stroke="#fff" stroke-width="2" opacity="1.0"/>
            <rect x="380" y="45" width="34" height="38" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <polygon points="414,45 414,60 400,60" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <rect x="588" y="50" width="24" height="20" rx="2" fill="#fff" opacity="1.0"/>
            <line x1="592" y1="57" x2="608" y2="57" stroke="url(#${gradientId})" stroke-width="1.5" opacity="1.0"/>
            <line x1="592" y1="63" x2="606" y2="63" stroke="url(#${gradientId})" stroke-width="1.5" opacity="1.0"/>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <rect x="786" y="40" width="26" height="6" fill="url(#${gradientId})" opacity="0.8"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="990" y="50" width="20" height="20" rx="2" fill="#fff" opacity="1.0"/>
            <line x1="994" y1="57" x2="1006" y2="57" stroke="url(#${gradientId})" stroke-width="1.5" opacity="1.0"/>
            <line x1="994" y1="63" x2="1004" y2="63" stroke="url(#${gradientId})" stroke-width="1.5" opacity="1.0"/>`;
    });

    // E-Commerce - shopping and carts
    factory.registerTemplate('ecommerce', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="191" y="50" width="18" height="14" rx="2" fill="#fff" opacity="1.0"/>
            <path d="M 193 64 L 193 73 L 207 73 L 207 64" fill="none" stroke="#fff" stroke-width="2" opacity="1.0"/>
            <rect x="380" y="46" width="40" height="32" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="400" cy="58" r="7" fill="#fff" opacity="0.9"/>
            <path d="M 397 63 L 403 69" stroke="#fff" stroke-width="2" opacity="1.0"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <path d="M 588 50 L 592 50 L 598 70 L 612 70" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="600" cy="74" r="4" fill="#fff" opacity="1.0"/>
            <circle cx="610" cy="74" r="4" fill="#fff" opacity="1.0"/>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <text x="800" y="66" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold" opacity="1.0">%</text>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 991 54 L 995 54 L 1000 66 L 1009 66" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="998" cy="70" r="3" fill="#fff" opacity="1.0"/>
            <circle cx="1007" cy="70" r="3" fill="#fff" opacity="1.0"/>`;
    });

    // Compliance - shields and checkmarks
    factory.registerTemplate('compliance', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 190 54 L 200 48 L 210 54 L 210 66 L 200 72 L 190 66 Z" fill="#fff" opacity="1.0"/>
            <polyline points="194,60 198,65 207,55" fill="none" stroke="url(#${gradientId})" stroke-width="2.5" opacity="1.0"/>
            <rect x="380" y="46" width="40" height="32" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <polyline points="390,62 398,70 414,54" fill="none" stroke="#fff" stroke-width="2.5" opacity="1.0"/>
            <circle cx="600" cy="60" r="24" fill="url(#${gradientId})" opacity="0.9"/>
            <path d="M 588 50 L 600 43 L 612 50 L 612 70 L 600 77 L 588 70 Z" fill="#fff" opacity="1.0"/>
            <polyline points="593,60 599,67 610,52" fill="none" stroke="url(#${gradientId})" stroke-width="2.5" opacity="1.0"/>
            <rect x="780" y="44" width="40" height="34" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="790" cy="54" r="5" fill="#fff" opacity="0.9"/>
            <line x1="798" y1="54" x2="812" y2="54" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="790" cy="68" r="5" fill="#fff" opacity="0.9"/>
            <line x1="798" y1="68" x2="812" y2="68" stroke="#fff" stroke-width="2" opacity="0.9"/>
            <circle cx="1000" cy="60" r="20" fill="url(#${gradientId})" opacity="0.8"/>
            <path d="M 992 55 L 1000 50 L 1008 55 L 1008 67 L 1000 72 L 992 67 Z" fill="#fff" opacity="1.0"/>`;
    });

})();
