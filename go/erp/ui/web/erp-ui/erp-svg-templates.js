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
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="200" cy="52" r="6" fill="#fff" opacity="0.8"/>
            <path d="M 190 72 Q 200 65 210 72" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="400" cy="50" r="12" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="400" cy="44" r="5" fill="#fff" opacity="0.7"/>
            <path d="M 392 58 Q 400 52 408 58" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="600" cy="65" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="55" r="7" fill="#fff" opacity="0.8"/>
            <path d="M 588 78 Q 600 70 612 78" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="800" cy="55" r="14" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="800" cy="48" r="5" fill="#fff" opacity="0.7"/>
            <path d="M 791 65 Q 800 58 809 65" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="1000" cy="52" r="6" fill="#fff" opacity="0.8"/>
            <path d="M 989 72 Q 1000 64 1011 72" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>`;
    });

    // FIN - dollar signs and charts
    factory.registerTemplate('financial', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <text x="200" y="66" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold" opacity="0.8">$</text>
            <rect x="385" y="55" width="6" height="20" rx="1" fill="url(#${gradientId})" opacity="0.5"/>
            <rect x="394" y="45" width="6" height="30" rx="1" fill="url(#${gradientId})" opacity="0.6"/>
            <rect x="403" y="50" width="6" height="25" rx="1" fill="url(#${gradientId})" opacity="0.5"/>
            <rect x="412" y="40" width="6" height="35" rx="1" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <text x="600" y="67" text-anchor="middle" fill="#fff" font-size="20" font-weight="bold" opacity="0.8">$</text>
            <line x1="770" y1="45" x2="830" y2="45" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
            <line x1="770" y1="55" x2="830" y2="55" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
            <line x1="770" y1="65" x2="830" y2="65" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
            <line x1="770" y1="75" x2="830" y2="75" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
            <circle cx="800" cy="60" r="14" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <text x="1000" y="67" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold" opacity="0.8">$</text>`;
    });

    // SCM - boxes and arrows
    factory.registerTemplate('supplyChain', function(gradientId) {
        return `
            <rect x="185" y="45" width="30" height="30" rx="3" fill="url(#${gradientId})" opacity="0.6"/>
            <line x1="195" y1="55" x2="205" y2="55" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <line x1="195" y1="65" x2="205" y2="65" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <rect x="385" y="50" width="30" height="25" rx="3" fill="url(#${gradientId})" opacity="0.5"/>
            <polygon points="400,58 395,68 405,68" fill="#fff" opacity="0.7"/>
            <rect x="585" y="40" width="30" height="40" rx="3" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="55" r="5" fill="#fff" opacity="0.8"/>
            <line x1="595" y1="68" x2="605" y2="68" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <rect x="785" y="48" width="30" height="28" rx="3" fill="url(#${gradientId})" opacity="0.5"/>
            <path d="M 795 60 L 805 60 L 800 68 Z" fill="#fff" opacity="0.7"/>
            <rect x="985" y="45" width="30" height="30" rx="3" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="1000" cy="58" r="6" fill="#fff" opacity="0.8"/>`;
    });

    // Sales - shopping carts and receipts
    factory.registerTemplate('sales', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 192 55 L 195 55 L 200 65 L 208 65" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="198" cy="70" r="3" fill="#fff" opacity="0.8"/>
            <circle cx="206" cy="70" r="3" fill="#fff" opacity="0.8"/>
            <rect x="385" y="45" width="30" height="35" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <line x1="392" y1="55" x2="408" y2="55" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="392" y1="62" x2="408" y2="62" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="392" y1="69" x2="405" y2="69" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <text x="600" y="67" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold" opacity="0.8">%</text>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <path d="M 795 58 L 805 58 L 800 52 L 800 72" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 993 55 L 996 55 L 1000 62 L 1007 62" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="998" cy="68" r="2" fill="#fff" opacity="0.8"/>
            <circle cx="1005" cy="68" r="2" fill="#fff" opacity="0.8"/>`;
    });

    // CRM - handshakes and contacts
    factory.registerTemplate('crm', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 192 60 Q 200 52 208 60" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <path d="M 192 65 Q 200 73 208 65" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="400" cy="55" r="12" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="400" cy="50" r="4" fill="#fff" opacity="0.7"/>
            <path d="M 394 60 Q 400 55 406 60" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 590 55 L 595 60 L 605 60 L 610 55" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <path d="M 590 65 L 595 60 L 605 60 L 610 65" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="800" cy="55" r="14" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="795" cy="52" r="4" fill="#fff" opacity="0.7"/>
            <circle cx="805" cy="52" r="4" fill="#fff" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 992 58 L 1000 55 L 1008 58" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <path d="M 995 65 Q 1000 70 1005 65" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.8"/>`;
    });

    // MFG - gears and factory
    factory.registerTemplate('manufacturing', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="200" cy="60" r="6" fill="#fff" opacity="0.4"/>
            <circle cx="200" cy="60" r="3" fill="url(#${gradientId})" opacity="0.8"/>
            <g transform="translate(200,60)" opacity="0.8">
                <rect x="-2" y="-15" width="4" height="6" fill="#fff"/>
                <rect x="-2" y="9" width="4" height="6" fill="#fff"/>
                <rect x="-15" y="-2" width="6" height="4" fill="#fff"/>
                <rect x="9" y="-2" width="6" height="4" fill="#fff"/>
            </g>
            <rect x="385" y="45" width="30" height="35" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <rect x="390" y="35" width="8" height="10" fill="url(#${gradientId})" opacity="0.6"/>
            <rect x="402" y="30" width="8" height="15" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="60" r="8" fill="#fff" opacity="0.4"/>
            <circle cx="600" cy="60" r="4" fill="url(#${gradientId})" opacity="0.8"/>
            <rect x="785" y="50" width="30" height="25" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <line x1="790" y1="55" x2="810" y2="55" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="790" y1="62" x2="805" y2="62" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="790" y1="69" x2="808" y2="69" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <polygon points="1000,50 1008,68 992,68" fill="#fff" opacity="0.7"/>`;
    });

    // PRJ - gantt charts and milestones
    factory.registerTemplate('projects', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <line x1="193" y1="55" x2="207" y2="55" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <line x1="193" y1="60" x2="204" y2="60" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <line x1="193" y1="65" x2="201" y2="65" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <rect x="385" y="50" width="30" height="25" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <polygon points="400,55 396,62 404,62" fill="#fff" opacity="0.7"/>
            <line x1="400" y1="62" x2="400" y2="72" stroke="#fff" stroke-width="2" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <circle cx="600" cy="60" r="8" stroke="#fff" stroke-width="2" fill="none" opacity="0.8"/>
            <path d="M 600 55 L 600 60 L 605 60" stroke="#fff" stroke-width="2" fill="none" opacity="0.8"/>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <line x1="790" y1="55" x2="810" y2="55" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="793" y1="62" x2="808" y2="62" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="795" y1="69" x2="805" y2="69" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <polygon points="1000,52 992,68 1008,68" fill="#fff" opacity="0.7"/>`;
    });

    // BI - charts and graphs
    factory.registerTemplate('analytics', function(gradientId) {
        return `
            <rect x="185" y="45" width="30" height="30" rx="2" fill="url(#${gradientId})" opacity="0.6"/>
            <rect x="190" y="60" width="5" height="12" fill="#fff" opacity="0.8"/>
            <rect x="198" y="52" width="5" height="20" fill="#fff" opacity="0.8"/>
            <rect x="206" y="56" width="5" height="16" fill="#fff" opacity="0.8"/>
            <circle cx="400" cy="60" r="12" fill="url(#${gradientId})" opacity="0.5"/>
            <path d="M 400 60 L 400 50 A 10 10 0 0 1 408 66 Z" fill="#fff" opacity="0.7"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <polyline points="588,70 594,58 600,62 606,52 612,60" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <line x1="790" y1="70" x2="810" y2="70" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <line x1="790" y1="70" x2="790" y2="52" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <polyline points="792,65 798,58 803,62 808,55" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="1000" cy="60" r="6" stroke="#fff" stroke-width="2" fill="none" opacity="0.8"/>
            <line x1="1005" y1="65" x2="1010" y2="70" stroke="#fff" stroke-width="2" opacity="0.8"/>`;
    });

    // Documents - files and folders
    factory.registerTemplate('documents', function(gradientId) {
        return `
            <rect x="185" y="45" width="30" height="35" rx="2" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 185 50 L 198 45 L 215 45 L 215 50 L 185 50" fill="url(#${gradientId})" opacity="0.7"/>
            <line x1="192" y1="58" x2="208" y2="58" stroke="#fff" stroke-width="1.5" opacity="0.8"/>
            <line x1="192" y1="65" x2="205" y2="65" stroke="#fff" stroke-width="1.5" opacity="0.8"/>
            <line x1="192" y1="72" x2="207" y2="72" stroke="#fff" stroke-width="1.5" opacity="0.8"/>
            <rect x="385" y="50" width="25" height="30" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <polygon points="410,50 410,62 398,62" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <rect x="590" y="52" width="20" height="16" rx="1" fill="#fff" opacity="0.8"/>
            <line x1="594" y1="58" x2="606" y2="58" stroke="url(#${gradientId})" stroke-width="1" opacity="0.8"/>
            <line x1="594" y1="62" x2="604" y2="62" stroke="url(#${gradientId})" stroke-width="1" opacity="0.8"/>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <rect x="790" y="45" width="20" height="4" fill="url(#${gradientId})" opacity="0.6"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <rect x="992" y="52" width="16" height="16" rx="1" fill="#fff" opacity="0.8"/>
            <line x1="995" y1="58" x2="1005" y2="58" stroke="url(#${gradientId})" stroke-width="1" opacity="0.8"/>
            <line x1="995" y1="62" x2="1003" y2="62" stroke="url(#${gradientId})" stroke-width="1" opacity="0.8"/>`;
    });

    // E-Commerce - shopping and carts
    factory.registerTemplate('ecommerce', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <rect x="193" y="52" width="14" height="10" rx="1" fill="#fff" opacity="0.8"/>
            <path d="M 195 62 L 195 70 L 205 70 L 205 62" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.8"/>
            <rect x="385" y="50" width="30" height="25" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="400" cy="58" r="5" fill="#fff" opacity="0.7"/>
            <path d="M 398 62 L 402 66" stroke="#fff" stroke-width="1.5" opacity="0.8"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 590 52 L 593 52 L 598 68 L 610 68" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="600" cy="72" r="3" fill="#fff" opacity="0.8"/>
            <circle cx="608" cy="72" r="3" fill="#fff" opacity="0.8"/>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <text x="800" y="66" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold" opacity="0.8">%</text>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 993 55 L 996 55 L 1000 65 L 1007 65" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="998" cy="68" r="2" fill="#fff" opacity="0.8"/>
            <circle cx="1005" cy="68" r="2" fill="#fff" opacity="0.8"/>`;
    });

    // Compliance - shields and checkmarks
    factory.registerTemplate('compliance', function(gradientId) {
        return `
            <circle cx="200" cy="60" r="15" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 192 55 L 200 50 L 208 55 L 208 65 L 200 70 L 192 65 Z" fill="#fff" opacity="0.8"/>
            <polyline points="195,60 198,64 205,56" fill="none" stroke="url(#${gradientId})" stroke-width="2" opacity="0.9"/>
            <rect x="385" y="50" width="30" height="25" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <polyline points="392,62 398,68 410,55" fill="none" stroke="#fff" stroke-width="2" opacity="0.8"/>
            <circle cx="600" cy="60" r="18" fill="url(#${gradientId})" opacity="0.7"/>
            <path d="M 590 52 L 600 46 L 610 52 L 610 68 L 600 74 L 590 68 Z" fill="#fff" opacity="0.8"/>
            <polyline points="594,60 599,66 608,54" fill="none" stroke="url(#${gradientId})" stroke-width="2" opacity="0.9"/>
            <rect x="785" y="48" width="30" height="28" rx="2" fill="url(#${gradientId})" opacity="0.5"/>
            <circle cx="793" cy="56" r="4" fill="#fff" opacity="0.7"/>
            <line x1="800" y1="56" x2="810" y2="56" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="793" cy="68" r="4" fill="#fff" opacity="0.7"/>
            <line x1="800" y1="68" x2="810" y2="68" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
            <circle cx="1000" cy="60" r="16" fill="url(#${gradientId})" opacity="0.6"/>
            <path d="M 993 56 L 1000 52 L 1007 56 L 1007 66 L 1000 70 L 993 66 Z" fill="#fff" opacity="0.8"/>`;
    });

})();
