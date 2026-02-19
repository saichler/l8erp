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
// Layer8D Gantt Render
// SVG timeline header, task bars with progress fill, and dependency arrows.

(function() {
    'use strict';

    const NS = 'http://www.w3.org/2000/svg';
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function createEl(tag, attrs) {
        const el = document.createElementNS(NS, tag);
        for (const [k, v] of Object.entries(attrs)) {
            el.setAttribute(k, v);
        }
        return el;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = String(str || '');
        return div.innerHTML;
    }

    window.Layer8DGanttRender = {
        render(gantt) {
            const container = gantt.container;
            if (!container) return;

            const zoomCfg = gantt.getZoomConfig();
            const totalDays = gantt.getTotalDays();
            const timelineW = this._getTimelineWidth(gantt.zoom, totalDays, zoomCfg.cellWidth);
            const totalW = Layer8DGantt.LABEL_WIDTH + timelineW;
            const totalH = Layer8DGantt.HEADER_HEIGHT + gantt.data.length * Layer8DGantt.ROW_HEIGHT + 20;

            let html = '<div class="layer8d-gantt">';

            // Toolbar
            html += '<div class="layer8d-gantt-toolbar">';
            if (gantt.onAdd) {
                html += `<button class="layer8d-gantt-btn layer8d-gantt-add-btn" data-action="add">${escapeHtml(gantt.addButtonText)}</button>`;
            }
            Object.keys(Layer8DGantt.ZOOM_LEVELS).forEach(level => {
                const active = gantt.zoom === level ? 'active' : '';
                html += `<button class="layer8d-gantt-btn ${active}" data-zoom="${level}">${Layer8DGantt.ZOOM_LEVELS[level].label}</button>`;
            });
            html += '</div>';

            // Scrollable area
            html += `<div class="layer8d-gantt-scroll">`;

            // SVG
            const svg = createEl('svg', { width: totalW, height: totalH, class: 'layer8d-gantt-svg' });

            // Draw components
            this._renderHeader(gantt, svg, timelineW, totalDays, zoomCfg);
            this._renderGrid(gantt, svg, timelineW, totalDays, zoomCfg);
            this._renderBars(gantt, svg, timelineW, totalDays);
            this._renderDependencies(gantt, svg, timelineW, totalDays);

            html += '</div>';

            container.innerHTML = html;
            container.querySelector('.layer8d-gantt-scroll').appendChild(svg);

            // Render task labels as HTML overlay
            this._renderLabels(gantt, container);
        },

        _getTimelineWidth(zoom, totalDays, cellWidth) {
            if (zoom === 'day') return totalDays * cellWidth;
            if (zoom === 'week') return Math.ceil(totalDays / 7) * cellWidth;
            if (zoom === 'month') return Math.ceil(totalDays / 30) * cellWidth;
            return totalDays * cellWidth;
        },

        _renderHeader(gantt, svg, timelineW, totalDays, zoomCfg) {
            const startDate = gantt.dateRange.start;
            const lw = Layer8DGantt.LABEL_WIDTH;
            const hh = Layer8DGantt.HEADER_HEIGHT;

            // Header background
            svg.appendChild(createEl('rect', {
                x: lw, y: 0, width: timelineW, height: hh,
                fill: '#f8fafc'
            }));

            if (gantt.zoom === 'day') {
                for (let d = 0; d < totalDays; d++) {
                    const date = new Date(startDate);
                    date.setDate(date.getDate() + d);
                    const x = lw + d * zoomCfg.cellWidth;
                    const label = `${date.getDate()}`;
                    const monthLabel = d === 0 || date.getDate() === 1
                        ? `${MONTHS[date.getMonth()]} ${date.getFullYear()}` : '';

                    if (monthLabel) {
                        const mt = createEl('text', {
                            x: x + 2, y: 14, 'font-size': 10, fill: '#64748b', 'font-weight': 'bold'
                        });
                        mt.textContent = monthLabel;
                        svg.appendChild(mt);
                    }

                    const dt = createEl('text', {
                        x: x + zoomCfg.cellWidth / 2, y: hh - 8,
                        'text-anchor': 'middle', 'font-size': 10, fill: '#94a3b8'
                    });
                    dt.textContent = label;
                    svg.appendChild(dt);
                }
            } else if (gantt.zoom === 'week') {
                const weeks = Math.ceil(totalDays / 7);
                for (let w = 0; w < weeks; w++) {
                    const date = new Date(startDate);
                    date.setDate(date.getDate() + w * 7);
                    const x = lw + w * zoomCfg.cellWidth;
                    const label = `${MONTHS[date.getMonth()]} ${date.getDate()}`;

                    const wt = createEl('text', {
                        x: x + zoomCfg.cellWidth / 2, y: hh - 8,
                        'text-anchor': 'middle', 'font-size': 10, fill: '#94a3b8'
                    });
                    wt.textContent = label;
                    svg.appendChild(wt);
                }
            } else {
                const months = Math.ceil(totalDays / 30);
                for (let m = 0; m < months; m++) {
                    const date = new Date(startDate);
                    date.setMonth(date.getMonth() + m);
                    const x = lw + m * zoomCfg.cellWidth;
                    const label = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

                    const mt = createEl('text', {
                        x: x + zoomCfg.cellWidth / 2, y: hh - 8,
                        'text-anchor': 'middle', 'font-size': 11, fill: '#64748b'
                    });
                    mt.textContent = label;
                    svg.appendChild(mt);
                }
            }

            // Header bottom line
            svg.appendChild(createEl('line', {
                x1: lw, y1: hh, x2: lw + timelineW, y2: hh,
                stroke: '#e2e8f0', 'stroke-width': 1
            }));
        },

        _renderGrid(gantt, svg, timelineW, totalDays, zoomCfg) {
            const lw = Layer8DGantt.LABEL_WIDTH;
            const hh = Layer8DGantt.HEADER_HEIGHT;
            const totalH = hh + gantt.data.length * Layer8DGantt.ROW_HEIGHT;

            // Vertical grid lines
            const cellCount = this._getCellCount(gantt.zoom, totalDays);
            for (let i = 0; i <= cellCount; i++) {
                const x = lw + i * zoomCfg.cellWidth;
                svg.appendChild(createEl('line', {
                    x1: x, y1: hh, x2: x, y2: totalH,
                    stroke: '#f1f5f9', 'stroke-width': 1
                }));
            }

            // Horizontal grid lines
            for (let i = 0; i <= gantt.data.length; i++) {
                const y = hh + i * Layer8DGantt.ROW_HEIGHT;
                svg.appendChild(createEl('line', {
                    x1: lw, y1: y, x2: lw + timelineW, y2: y,
                    stroke: '#f1f5f9', 'stroke-width': 1
                }));
            }

            // Today line
            const now = new Date();
            const daysSinceStart = (now.getTime() - gantt.dateRange.start.getTime()) / 86400000;
            if (daysSinceStart >= 0 && daysSinceStart <= totalDays) {
                const todayX = lw + (daysSinceStart / totalDays) * timelineW;
                svg.appendChild(createEl('line', {
                    x1: todayX, y1: hh, x2: todayX, y2: totalH,
                    stroke: '#ef4444', 'stroke-width': 1.5, 'stroke-dasharray': '4,4'
                }));
            }
        },

        _renderBars(gantt, svg, timelineW, totalDays) {
            const lw = Layer8DGantt.LABEL_WIDTH;
            const hh = Layer8DGantt.HEADER_HEIGHT;
            const barH = Layer8DGantt.ROW_HEIGHT * 0.6;
            const barPadY = (Layer8DGantt.ROW_HEIGHT - barH) / 2;

            gantt.data.forEach((item, i) => {
                const startTs = gantt._getTimestamp(item, gantt.startDateField);
                const endTs = gantt._getTimestamp(item, gantt.endDateField) || startTs + 86400;
                if (!startTs) return;

                const rangeStart = gantt.dateRange.start.getTime() / 1000;
                const rangeDuration = totalDays * 86400;

                const barX = lw + ((startTs - rangeStart) / rangeDuration) * timelineW;
                const barW = Math.max(4, ((endTs - startTs) / rangeDuration) * timelineW);
                const barY = hh + i * Layer8DGantt.ROW_HEIGHT + barPadY;
                const color = COLORS[i % COLORS.length];

                // Background bar
                const bg = createEl('rect', {
                    x: barX, y: barY, width: barW, height: barH,
                    fill: color, opacity: '0.3', rx: 3,
                    class: 'layer8d-gantt-bar', 'data-id': String(gantt._getItemId(item))
                });
                svg.appendChild(bg);

                // Progress fill
                const progress = gantt._getNestedValue(item, gantt.progressField);
                const pct = typeof progress === 'number' ? Math.min(100, Math.max(0, progress)) : 0;
                if (pct > 0) {
                    svg.appendChild(createEl('rect', {
                        x: barX, y: barY, width: barW * (pct / 100), height: barH,
                        fill: color, rx: 3
                    }));
                }

                // Bar border
                svg.appendChild(createEl('rect', {
                    x: barX, y: barY, width: barW, height: barH,
                    fill: 'none', stroke: color, 'stroke-width': 1, rx: 3,
                    class: 'layer8d-gantt-bar-click', 'data-id': String(gantt._getItemId(item)),
                    style: 'cursor:pointer'
                }));
            });
        },

        _renderDependencies(gantt, svg, timelineW, totalDays) {
            if (!gantt.dependencyField) return;

            const lw = Layer8DGantt.LABEL_WIDTH;
            const hh = Layer8DGantt.HEADER_HEIGHT;
            const rangeStart = gantt.dateRange.start.getTime() / 1000;
            const rangeDuration = totalDays * 86400;

            gantt.data.forEach((item, i) => {
                const deps = gantt._getNestedValue(item, gantt.dependencyField);
                if (!deps || !Array.isArray(deps)) return;

                deps.forEach(depId => {
                    const depIdx = gantt.data.findIndex(d => String(gantt._getItemId(d)) === String(depId));
                    if (depIdx === -1) return;

                    const depItem = gantt.data[depIdx];
                    const depEnd = gantt._getTimestamp(depItem, gantt.endDateField) || gantt._getTimestamp(depItem, gantt.startDateField) + 86400;
                    const thisStart = gantt._getTimestamp(item, gantt.startDateField);

                    const x1 = lw + ((depEnd - rangeStart) / rangeDuration) * timelineW;
                    const y1 = hh + depIdx * Layer8DGantt.ROW_HEIGHT + Layer8DGantt.ROW_HEIGHT / 2;
                    const x2 = lw + ((thisStart - rangeStart) / rangeDuration) * timelineW;
                    const y2 = hh + i * Layer8DGantt.ROW_HEIGHT + Layer8DGantt.ROW_HEIGHT / 2;

                    // Draw arrow path
                    const midX = (x1 + x2) / 2;
                    svg.appendChild(createEl('path', {
                        d: `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`,
                        fill: 'none', stroke: '#94a3b8', 'stroke-width': 1.5, 'marker-end': 'url(#arrow)'
                    }));
                });
            });

            // Arrow marker definition
            const defs = createEl('defs', {});
            const marker = createEl('marker', {
                id: 'arrow', viewBox: '0 0 10 10', refX: 10, refY: 5,
                markerWidth: 8, markerHeight: 8, orient: 'auto'
            });
            marker.appendChild(createEl('path', { d: 'M 0 0 L 10 5 L 0 10 Z', fill: '#94a3b8' }));
            defs.appendChild(marker);
            svg.insertBefore(defs, svg.firstChild);
        },

        _renderLabels(gantt, container) {
            const scrollEl = container.querySelector('.layer8d-gantt-scroll');
            if (!scrollEl) return;

            const labelsDiv = document.createElement('div');
            labelsDiv.className = 'layer8d-gantt-labels';
            labelsDiv.style.top = Layer8DGantt.HEADER_HEIGHT + 'px';

            gantt.data.forEach((item, i) => {
                const title = gantt._getNestedValue(item, gantt.titleField) || 'Task';
                const label = document.createElement('div');
                label.className = 'layer8d-gantt-label';
                label.style.height = Layer8DGantt.ROW_HEIGHT + 'px';
                label.textContent = title;
                label.dataset.id = String(gantt._getItemId(item));
                labelsDiv.appendChild(label);
            });

            scrollEl.insertBefore(labelsDiv, scrollEl.firstChild);
        },

        _getCellCount(zoom, totalDays) {
            if (zoom === 'day') return totalDays;
            if (zoom === 'week') return Math.ceil(totalDays / 7);
            return Math.ceil(totalDays / 30);
        }
    };

})();
