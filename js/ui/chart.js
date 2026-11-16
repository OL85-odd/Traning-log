// The progress chart, and the words that go with a series.
// Swift: OddForm/Features/Plan/Components/ProgressChartView.swift

import { html } from '../vendor/preact-htm.js';
import { toDate } from '../core/dates.js';
import { changeSinceFirst, deltaVsTarget } from '../core/progressStats.js';
import { formatWeight, trimNumber } from '../core/units.js';
import { store } from './common.js';
import { Icon } from './icons.js';

/// How a series' numbers read: its unit name, and one value written out.
export function seriesUnit(series) {
  const weightUnit = store.state.settings.preferredUnit;
  switch (series.kind) {
    case 'weight':   return { name: weightUnit, show: v => formatWeight(v, weightUnit) };
    case 'reps':     return { name: 'reps', show: v => trimNumber(v) };
    // Minutes for long efforts, and for shorter ones logged in whole minutes
    // (a 5 minute stretch reads "5 min", not "300 sec").
    case 'duration': return series.points.some(p => p.actual >= 600)
      || (series.points.length > 0 && series.points.every(p => p.actual >= 60 && p.actual % 60 === 0))
      ? { name: 'min', show: v => trimNumber(Math.round(v / 6) / 10) }
      : { name: 'sec', show: v => trimNumber(v) };
    default:         return { name: 'score', show: v => String(Math.round(v)) };
  }
}

/// "+12% vs target" where the plan sets a target, otherwise "+12% since start".
export function TrendLabel({ series, small }) {
  const versusTarget = deltaVsTarget(series);
  const delta = versusTarget ?? changeSinceFirst(series);
  if (delta == null) return null;
  const up = delta >= 0;
  return html`<span class="row mono semibold ${small ? 't-caption2' : 't-caption'} ${up ? 'c-green' : 'c-red'}" style="gap:3px">
    <${Icon} name=${up ? 'arrow-up-right' : 'arrow-down-right'} size=${11} weight=${2.6} />
    ${up ? '+' : ''}${Math.round(delta)}% ${versusTarget != null ? 'vs target' : 'since start'}
  </span>`;
}

/// The line of what was done, a dot per session, and — where the plan sets a
/// target — a dashed target line climbing to "now", with each dot green where
/// the target was met and red where not.
export function ProgressChart({ series, compact, unit }) {
  const height = compact ? 20 : 92;
  const pad = compact ? 2 : 8;
  const now = Date.now();
  const points = series.points;
  const first = points[0] ? toDate(points[0].date).getTime() : now;
  const hasTarget = series.currentTarget != null;

  const values = points.flatMap(p => [p.target, p.actual]).concat(series.currentTarget).filter(v => v != null);
  const min = Math.min(...values), max = Math.max(...values);

  // x is a percentage of the width (so the chart needs no measuring), y is in px.
  const x = date => {
    const total = now - first;
    const fraction = total > 0 ? Math.max(0, Math.min(1, (toDate(date).getTime() - first) / total)) : 1;
    return `${fraction * 100}%`;
  };
  const y = value => pad + (max > min ? 1 - (value - min) / (max - min) : 0.5) * (height - pad * 2);
  const dotColor = p => (p.target == null ? 'var(--accent)' : p.actual >= p.target ? 'var(--green)' : 'var(--red)');
  const last = points[points.length - 1];

  // The highest and lowest value sit in a gutter to the left of the plot.
  const hasScale = !compact && unit && max > min;

  return html`<div style="position:relative;padding:0 ${pad}px 0 ${hasScale ? 34 : pad}px">
    ${hasScale && html`
      <span class="chart-scale" style="top:${pad - 6}px">${unit.show(max)}</span>
      <span class="chart-scale" style="bottom:${pad - 6}px">${unit.show(min)}</span>`}
    <svg width="100%" height=${height} style="display:block;overflow:visible" role="img"
      aria-label=${hasTarget ? 'Target versus actual over time' : 'What was done over time'}>
      ${hasTarget && html`<line x1="0%" y1=${y(points[0]?.target ?? series.currentTarget)} x2="100%" y2=${y(series.currentTarget)}
        stroke="var(--accent)" stroke-opacity="0.55" stroke-width=${compact ? 1 : 1.5} stroke-dasharray="3 4" />`}
      ${points.slice(1).map((p, i) => html`<line x1=${x(points[i].date)} y1=${y(points[i].actual)} x2=${x(p.date)} y2=${y(p.actual)}
        stroke="var(--text)" stroke-opacity="0.85" stroke-width=${compact ? 1.5 : 2} stroke-linecap="round" />`)}
      ${!compact && points.map(p => html`<circle cx=${x(p.date)} cy=${y(p.actual)} r="3.5" fill=${dotColor(p)} />`)}
      ${!compact && last && html`<circle cx=${x(last.date)} cy=${y(last.actual)} r="6" fill="none" stroke=${dotColor(last)} stroke-width="1.5" />`}
    </svg>
  </div>`;
}
