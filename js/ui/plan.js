// The Plan tab: active plan header, progress drawer and the day timeline.
// Swift: OddForm/Features/Plan/PlanView.swift + Components/*

import { html, useLayoutEffect, useRef, useState } from '../vendor/preact-htm.js';
import { format, isSameDay, startOfDay, toDate } from '../core/dates.js';
import { DAY_TYPES, MODIFIERS, MODIFIER_PRIORITY, WEEKDAY_NAMES } from '../core/models.js';
import { completionPercent } from '../core/planResolver.js';
import { deltaVsTarget, overallSeries, seriesFor, trackableExercises } from '../core/progressStats.js';
import { isPausedThisMonth, monthsElapsed } from '../core/progression.js';
import { isQuickSession } from '../core/store.js';
import { formatWeight, trimNumber } from '../core/units.js';
import {
  Alert, Chip, ExerciseIcon, ModifierBadges, Ring, completionColor, describeSets, slotDescription, store,
} from './common.js';
import { Icon } from './icons.js';
import { ExerciseInfoButton } from './library.js';
import { PlanEditorSheet } from './planEditor.js';
import { PlanPickerSheet } from './planPicker.js';

export function PlanView() {
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const plan = store.activePlan;
  const hasDrawer = plan?.progressionEnabled && store.state.settings.activePlanStartDate;

  return html`<div class="screen">
    <${ActivePlanHeader} plan=${plan} onChangePlan=${() => setShowPlanPicker(true)} />
    <div class="divider"></div>
    <div class="plan-body">
      ${hasDrawer && html`<${ProgressDrawer} plan=${plan} />`}
      <div class="scroll" style="padding-top:${hasDrawer ? 58 : 16}px">
        ${plan
          ? html`<${Timeline} key=${plan.id} />`
          : html`<div class="empty">
              <${Icon} name="clipboard" size=${44} weight=${1.4} class="c-subtle" />
              <div class="t-title3">No active plan</div>
              <div class="c-subtle">Choose a plan to see your timeline.</div>
              <button class="chip selected large" onClick=${() => setShowPlanPicker(true)}>Choose plan</button>
            </div>`}
      </div>
    </div>
    ${showPlanPicker && html`<${PlanPickerSheet} onClose=${() => setShowPlanPicker(false)} />`}
  </div>`;
}

// MARK: - Header (Swift: ActivePlanHeader)

function ActivePlanHeader({ plan, onChangePlan }) {
  const startDate = store.state.settings.activePlanStartDate;
  const trainingDays = plan ? plan.days.filter(d => d.dayType !== 'rest').length : 0;
  const weekly = plan?.planMode === 'weeklyCycle';
  const paused = plan && startDate && isPausedThisMonth(plan, startDate);
  const months = startDate ? monthsElapsed(startDate) : 0;
  const program = store.programProgress;

  const summary = weekly
    ? `Weekly cycle${trainingDays > 0 ? ` · ${trainingDays} training days / week` : ''}`
    : !program ? 'Program'
    : program.finished ? `Program · completed (${program.weeks} weeks)`
    : `Program · week ${program.week} of ${program.weeks}`;

  return html`<div class="col" style="gap:6px;padding:16px var(--gutter) 20px">
    <div class="row">
      <span class="caption">Active plan</span>
      <span class="spacer"></span>
      <button class="link" onClick=${onChangePlan}>Change</button>
    </div>
    ${plan
      ? html`
        <h1 class="t-title">${plan.name}</h1>
        <div class="mono t-caption c-subtle">${summary}</div>
        <div class="row" style="gap:8px;margin-top:2px">
          <span class="mode-badge">${weekly ? 'WEEKLY CYCLE' : 'PROGRAM'}</span>
          ${plan.progressionEnabled && html`
            <button class="mode-badge ${paused ? '' : 'live'}" onClick=${() => store.toggleProgressionPauseThisMonth()}
              aria-label=${paused ? 'Resume this month’s increase' : 'Pause this month’s increase'}>
              <${Icon} name=${paused ? 'pause-circle' : 'trend'} size=${10} weight=${2.2} />
              ${paused ? 'PAUSED' : months > 0 ? `+2.5%/MO · MONTH ${months + 1}` : '+2.5%/MO'}
            </button>`}
        </div>`
      : html`<div class="t-title3 c-subtle">No plan selected</div>`}
  </div>`;
}

// MARK: - Progress drawer (Swift: ProgressDrawer + ProgressChartView)

function DeltaLabel({ delta, small }) {
  if (delta == null) return null;
  const up = delta >= 0;
  return html`<span class="row mono semibold ${small ? 't-caption2' : 't-caption'} ${up ? 'c-green' : 'c-red'}" style="gap:3px">
    <${Icon} name=${up ? 'arrow-up-right' : 'arrow-down-right'} size=${11} weight=${2.6} />
    ${up ? '+' : ''}${Math.round(delta)}% vs target
  </span>`;
}

/// How a series' numbers read: its unit name, and one value written out.
function seriesUnit(series) {
  const weightUnit = store.state.settings.preferredUnit;
  switch (series.kind) {
    case 'weight':   return { name: weightUnit, show: v => formatWeight(v, weightUnit) };
    case 'reps':     return { name: 'reps', show: v => trimNumber(v) };
    case 'duration': return { name: 'sec', show: v => trimNumber(v) };
    default:         return { name: 'score', show: v => String(Math.round(v)) };
  }
}

function ProgressDrawer({ plan }) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState('overall'); // 'overall' or an exercise id

  const startDate = store.state.settings.activePlanStartDate;
  const sessions = store.state.sessions;
  const overall = overallSeries(plan, startDate, sessions);
  const exercises = trackableExercises(plan, store.state.exercises);

  if (!expanded) {
    return html`<div class="drawer">
      <button class="drawer-teaser" onClick=${() => setExpanded(true)} aria-expanded="false">
        ${overall?.points.length
          ? html`<div style="width:48px"><${ProgressChart} series=${overall} compact /></div>
                 <${DeltaLabel} delta=${deltaVsTarget(overall)} />`
          : html`<${Icon} name="trend" size=${13} class="c-subtle" />
                 <span class="mono t-caption c-subtle">Progress — finish a session to start the chart</span>`}
        <span class="spacer"></span>
        <${Icon} name="chevron-down" size=${12} weight=${2.4} class="c-subtle" />
      </button>
    </div>`;
  }

  const exercise = exercises.find(e => e.id === tab);
  const series = tab === 'overall' ? overall : exercise && seriesFor(exercise, plan, startDate, sessions);
  const unit = series && seriesUnit(series);

  return html`<div class="drawer">
    <div class="chip-row" style="padding-top:14px;gap:6px">
      <${Chip} label="OVERALL" selected=${tab === 'overall'} onClick=${() => setTab('overall')} />
      ${exercises.map(e => html`<${Chip} label=${e.name.toUpperCase()} selected=${tab === e.id} onClick=${() => setTab(e.id)} />`)}
    </div>

    ${series?.points.length
      ? html`<div class="col" style="gap:8px;padding:12px var(--gutter) 0">
          <div class="row">
            <span class="label">${tab === 'overall' ? 'Progress score · 100 = the plan as written' : `Best set · ${unit.name}`}</span>
            <span class="spacer"></span>
            <${DeltaLabel} delta=${deltaVsTarget(series)} small />
          </div>
          <div class="card chart-box"><${ProgressChart} series=${series} unit=${unit} /></div>
          <div class="row label" style="gap:14px;letter-spacing:0">
            <span class="row" style="gap:5px"><i class="legend-line dashed"></i>TARGET · NOW ${unit.show(series.currentTarget)}</span>
            <span class="row" style="gap:5px"><i class="legend-line"></i>ACTUAL</span>
          </div>
        </div>`
      : html`<p class="mono t-caption c-subtle" style="padding:16px var(--gutter) 0;line-height:1.45">
          Nothing logged for this yet. It fills in as you finish sessions.
        </p>`}

    <button class="drawer-collapse" onClick=${() => setExpanded(false)} aria-expanded="true">
      <${Icon} name="chevron-up" size=${14} weight=${2.4} />COLLAPSE
    </button>
  </div>`;
}

/// Dashed target line climbing to "now", the actual line tracking along it,
/// and a dot per session — green where the target was met, red where not.
function ProgressChart({ series, compact, unit }) {
  const height = compact ? 20 : 92;
  const pad = compact ? 2 : 8;
  const now = Date.now();
  const points = series.points;
  const first = points[0] ? toDate(points[0].date).getTime() : now;

  const values = [...points.flatMap(p => [p.target, p.actual]), series.currentTarget];
  const min = Math.min(...values), max = Math.max(...values);

  // x is a percentage of the width (so the chart needs no measuring), y is in px.
  const x = date => {
    const total = now - first;
    const fraction = total > 0 ? Math.max(0, Math.min(1, (toDate(date).getTime() - first) / total)) : 1;
    return `${fraction * 100}%`;
  };
  const y = value => pad + (max > min ? 1 - (value - min) / (max - min) : 0.5) * (height - pad * 2);
  const dotColor = p => (p.actual >= p.target ? 'var(--green)' : 'var(--red)');
  const last = points[points.length - 1];

  // The highest and lowest value sit in a gutter to the left of the plot.
  const hasScale = !compact && unit && max > min;

  return html`<div style="position:relative;padding:0 ${pad}px 0 ${hasScale ? 34 : pad}px">
    ${hasScale && html`
      <span class="chart-scale" style="top:${pad - 6}px">${unit.show(max)}</span>
      <span class="chart-scale" style="bottom:${pad - 6}px">${unit.show(min)}</span>`}
    <svg width="100%" height=${height} style="display:block;overflow:visible" role="img"
      aria-label="Target versus actual over time">
      <line x1="0%" y1=${y(points[0]?.target ?? series.currentTarget)} x2="100%" y2=${y(series.currentTarget)}
        stroke="var(--accent)" stroke-opacity="0.55" stroke-width=${compact ? 1 : 1.5} stroke-dasharray="3 4" />
      ${points.slice(1).map((p, i) => html`<line x1=${x(points[i].date)} y1=${y(points[i].actual)} x2=${x(p.date)} y2=${y(p.actual)}
        stroke="var(--text)" stroke-opacity="0.85" stroke-width=${compact ? 1.5 : 2} stroke-linecap="round" />`)}
      ${!compact && points.map(p => html`<circle cx=${x(p.date)} cy=${y(p.actual)} r="3.5" fill=${dotColor(p)} />`)}
      ${!compact && last && html`<circle cx=${x(last.date)} cy=${y(last.actual)} r="6" fill="none" stroke=${dotColor(last)} stroke-width="1.5" />`}
    </svg>
  </div>`;
}

// MARK: - Timeline (Swift: TimelineView)

const PAGE_DAYS = 30;

function Timeline() {
  const [expandedKey, setExpandedKey] = useState(null);
  const [editing, setEditing] = useState(null); // { plan, dayIndex }
  const [daysBack, setDaysBack] = useState(PAGE_DAYS);
  const root = useRef(null);

  // Two weeks ahead down to the past, newest at the top. The past reaches
  // back only as far as there is something to show.
  const history = store.historyDays;
  // (A last handful of days is shown rather than left behind one more tap.)
  const back = history - daysBack <= 7 ? history : daysBack;
  const statuses = store.dailyStatuses(-back, 14).reverse();

  // Open on today, not on the day two weeks from now.
  useLayoutEffect(() => {
    root.current?.querySelector('.tl-today-anchor')?.scrollIntoView({ block: 'start' });
  }, []);

  const openEditor = status => {
    const plan = store.activePlan;
    const planDay = store.planDayOn(status.date);
    const dayIndex = plan && planDay ? plan.days.findIndex(d => d.id === planDay.id) : -1;
    if (dayIndex !== -1) setEditing({ plan, dayIndex });
  };

  // The room below the oldest row lets today reach the top of the screen
  // even when there is little or no history under it.
  return html`<div ref=${root} style="padding-bottom:60vh">
    ${statuses.map(status => html`<${TimelineRow} key=${status.key} status=${status}
      expanded=${expandedKey === status.key}
      onToggle=${() => setExpandedKey(expandedKey === status.key ? null : status.key)}
      onEditDay=${() => openEditor(status)} />`)}
    ${history > back && html`<div style="padding:0 var(--gutter)">
      <button class="btn-soft tall" onClick=${() => setDaysBack(daysBack + PAGE_DAYS * 2)}>
        <${Icon} name="chevron-down" size=${13} weight=${2.4} />Show earlier
      </button>
    </div>`}
    ${editing && html`<${PlanEditorSheet} plan=${editing.plan} dayIndex=${editing.dayIndex} onClose=${() => setEditing(null)} />`}
  </div>`;
}

function TimelineRow({ status, expanded, onToggle, onEditDay }) {
  const today = startOfDay(new Date());
  const isToday = isSameDay(status.date, today);
  const isFuture = status.date > today;
  const isRest = status.dayType === 'rest';
  const hasModifiers = status.feelModifiers.length > 0;
  const canExpand = !status.isBlank && (!isRest || hasModifiers);
  const open = expanded && canExpand;
  const type = DAY_TYPES[status.dayType];

  return html`<div>
    ${isToday && html`<div class="tl-today-anchor"></div>`}
    <button class="tl-row ${isToday ? 'today' : ''} ${open ? 'expanded' : ''}" disabled=${!canExpand}
      aria-expanded=${canExpand ? String(open) : undefined} onClick=${onToggle}>
      <div class="tl-date">
        <span class="mono t-micro wd">${format.weekdayShort(status.date)}</span>
        <span class="day">${status.date.getDate()}</span>
        <span class="mono t-micro">${format.monthShort(status.date)}</span>
      </div>
      <div class="tl-node"><${NodeCircle} status=${status} isToday=${isToday} /></div>
      <div class="tl-main">
        ${status.isBlank
          ? html`<span class="mono t-caption c-subtle" style="padding-top:2px">—</span>`
          : isRest
          ? html`<span class="mono t-caption c-subtle" style="padding-top:2px">Rest</span>`
          : html`
            <span class="t-sub medium">${type.name}</span>
            ${status.hasLog
              ? html`<span class="row" style="gap:6px">
                  <${Icon} name=${type.icon} size=${14} class="c-${type.color}" />
                  <${CompletionBubble} percent=${status.completionPercent} />
                </span>`
              : isToday
              ? html`<span class="mono t-caption c-accent">Today · not started</span>`
              : !isFuture && html`<span class="mono t-caption c-subtle">Not logged</span>`}`}
        ${hasModifiers && html`<${ModifierBadges} modifiers=${status.feelModifiers} />`}
      </div>
      ${canExpand && !isRest && html`<span class="tl-chevron"><${Icon} name="chevron-down" size=${12} weight=${2.4} /></span>`}
    </button>
    ${open && html`<${DayDetailPanel} status=${status}
      isToday=${isToday} isFuture=${isFuture} onEditDay=${onEditDay} />`}
  </div>`;
}

/// Swift: TimelineNodeCircle
function NodeCircle({ status, isToday }) {
  const modifier = MODIFIER_PRIORITY.find(id => status.feelModifiers.includes(id));
  const percent = status.completionPercent;
  const color = completionColor(percent);
  const arc = 2 * Math.PI * 10.75;

  return html`
    <svg width="28" height="28" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="13.25" fill="var(--bg)" stroke="var(--border)" stroke-width="1.5" />
      <circle cx="14" cy="14" r="11" fill=${isToday ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'var(--surface)'} />
      ${percent > 0 && html`<circle cx="14" cy="14" r="10.75" fill="none" stroke=${color} stroke-width="2.5"
        stroke-linecap="round" stroke-dasharray="${arc * percent} ${arc}" transform="rotate(-90 14 14)"
        style="filter:drop-shadow(0 0 3px ${color})" />`}
      ${isToday && html`<circle cx="14" cy="14" r="16" fill="none" stroke="var(--accent)" stroke-opacity="0.5"
        stroke-width="1" stroke-dasharray="2 2" />`}
    </svg>
    ${modifier
      ? html`<span class="glyph c-${MODIFIERS[modifier].color}"><${Icon} name=${MODIFIERS[modifier].icon} size=${10} weight=${2.4} /></span>`
      : status.didBackup && html`<span class="glyph c-accent"><${Icon} name="drive" size=${10} weight=${2.4} /></span>`}`;
}

function CompletionBubble({ percent }) {
  return html`<span style="position:relative;display:grid;place-items:center;width:28px;height:28px">
    <span style="position:absolute;inset:0"><${Ring} size=${28} width=${2} percent=${percent} color=${completionColor(percent)} track /></span>
    <span class="mono" style="font-size:8px">${Math.round(percent * 100)}%</span>
  </span>`;
}

// MARK: - Expanded day (Swift: DayDetailPanel)

function DayDetailPanel({ status, isToday, isFuture, onEditDay }) {
  const [deleting, setDeleting] = useState(null); // session
  const isPast = !isToday && !isFuture;
  const weightUnit = store.state.settings.preferredUnit;

  const start = store.state.settings.activePlanStartDate;
  const coveredByPlan = start != null && status.date >= startOfDay(start);
  const planDay = coveredByPlan ? store.planDayOn(status.date) : null;
  const isTrainingDay = planDay != null && planDay.dayType !== 'rest';

  const logs = store.sessionsOn(status.date).filter(s => s.completedAt);
  const planLog = logs.find(s => !isQuickSession(s));
  const quickLogs = logs.filter(isQuickSession);

  const plannedExercises = isTrainingDay && (planDay.blocks.length > 0
    ? planDay.blocks.map(block => html`<div key=${block.id} class="col" style="gap:8px">
        ${block.blockName && html`<div class="label" style="letter-spacing:1px">${block.blockName}</div>`}
        ${block.exercises.map(slot => {
          const exercise = store.exerciseByID(slot.exerciseID);
          return exercise && html`<div key=${slot.id} class="row" style="gap:10px">
            <${ExerciseIcon} exercise=${exercise} radius=${8} />
            <div style="flex:1;min-width:0">
              <div class="t-sub medium">${exercise.name}</div>
              <div class="mono t-caption c-subtle" style="margin-top:2px">${slotDescription(slot, weightUnit)}</div>
            </div>
            <${ExerciseInfoButton} exercise=${exercise} />
          </div>`;
        })}
      </div>`)
    : html`<p class="mono t-caption c-subtle">No exercises planned for this day.</p>`);

  // One line saying how far an edit of the plan reaches.
  const editScope = planDay?.dayOfWeek != null
    ? `Edit plan · every ${WEEKDAY_NAMES[planDay.dayOfWeek - 1]}`
    : 'Edit plan · this day';

  const logCard = log => html`<div key=${log.id} class="col" style="gap:12px">
    <${PastSession} log=${log} planDay=${isQuickSession(log) ? null : planDay} />
    <div class="row" style="gap:8px">
      <button class="btn-soft" style="flex:1" onClick=${() => store.resumeSession(log)}>
        <${Icon} name="square-pencil" size=${14} weight=${2} />Edit session
      </button>
      <button class="btn-soft icon" style="--tint:var(--red)" aria-label="Delete session"
        onClick=${() => setDeleting(log)}>
        <${Icon} name="trash" size=${14} />
      </button>
    </div>
  </div>`;

  return html`<div class="card tl-detail">
    <div class="rule-label label" style="letter-spacing:0">${isPast ? 'SESSION LOG' : isToday ? 'TODAY' : 'UPCOMING'}</div>
    <div class="col" style="gap:12px">
      ${planLog
        ? logCard(planLog)
        : isTrainingDay && (isFuture
          ? plannedExercises
          : isToday
          ? html`${plannedExercises}
              <button class="btn-primary compact" onClick=${() => store.startSession(planDay)}>START SESSION</button>`
          : html`<p class="mono t-caption c-subtle">No session logged for this day.</p>
              <button class="btn-soft" onClick=${() => store.startSession(planDay, status.date)}>
                <${Icon} name="square-pencil" size=${15} weight=${2} />Log this session
              </button>`)}
      ${quickLogs.map(log => html`
        ${(planLog || isTrainingDay) && html`<div class="divider flush"></div>`}
        ${logCard(log)}`)}
      ${isTrainingDay && html`<button class="btn-plain mono t-caption c-subtle" style="align-self:flex-start;padding:4px 0"
        onClick=${onEditDay}>
        <${Icon} name="pencil" size=${12} weight=${2.2} />${editScope}
      </button>`}
    </div>

    ${deleting && html`<${Alert} title="Delete session?"
      message=${`This removes the ${deleting.title ?? 'session'} log from ${format.mediumDate(deleting.date)}. It cannot be undone.`}
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setDeleting(null) },
        { label: 'Delete', role: 'destructive', onClick: () => { store.deleteSession(deleting.id); setDeleting(null); } },
      ]} />`}
  </div>`;
}

function PastSession({ log, planDay }) {
  const weightUnit = store.state.settings.preferredUnit;
  const completed = log.sets.filter(s => s.isCompleted);
  const percent = completionPercent(log, planDay, store.hasExercise);
  const duration = log.startedAt && log.completedAt
    ? format.clock((toDate(log.completedAt) - toDate(log.startedAt)) / 1000)
    : null;

  // Completed sets grouped by exercise, in the order they were logged.
  const groups = new Map();
  for (const set of completed) {
    if (!groups.has(set.exerciseID)) groups.set(set.exerciseID, []);
    groups.get(set.exerciseID).push(set);
  }

  const stat = (icon, value, label) => html`<div class="stat">
    <span class="row" style="gap:4px">
      <${Icon} name=${icon} size=${11} class="c-accent" />
      <span class="mono t-sub semibold">${value}</span>
    </span>
    <span class="mono t-micro c-subtle">${label}</span>
  </div>`;

  return html`
    ${log.title && html`<div class="row" style="gap:8px">
      <span class="t-sub semibold">${log.title}</span>
      ${isQuickSession(log) && html`<span class="tag">QUICK</span>`}
    </div>`}
    ${log.feelModifiers.length > 0 && html`<${ModifierBadges} modifiers=${log.feelModifiers} />`}
    <div class="row" style="gap:16px">
      ${duration && stat('clock', duration, 'duration')}
      ${stat('check-circle', `${Math.round(percent * 100)}%`, 'completed')}
      ${log.sets.length > 0 && stat('dumbbell', completed.length, 'sets done')}
    </div>
    ${groups.size > 0
      ? html`<div class="divider flush"></div>
          ${[...groups].map(([exerciseID, sets]) => {
            const exercise = store.exerciseByID(exerciseID);
            // A slot that only carries units: enough to word the numbers.
            const seconds = sets[0].durationSeconds;
            const wholeMinutes = seconds != null && seconds >= 120 && seconds % 60 === 0;
            const slot = { unit1: 'Reps', unit2: wholeMinutes ? 'Min' : 'Sek', targetDurationSeconds: seconds };
            return html`<div key=${exerciseID} class="col" style="gap:3px">
              <div class="t-sub medium">${exercise?.name ?? 'Deleted exercise'}</div>
              <div class="mono t-caption c-subtle">${describeSets(sets, slot, weightUnit)}</div>
            </div>`;
          })}`
      : html`<p class="mono t-caption c-subtle">No sets ticked off in this session.</p>`}`;
}
