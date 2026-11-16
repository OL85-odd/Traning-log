// The Plan tab: active plan header, progress drawer and the day timeline.
// Swift: OddForm/Features/Plan/PlanView.swift + Components/*

import { html, useLayoutEffect, useRef, useState } from '../vendor/preact-htm.js';
import { format, isSameDay, startOfDay, toDate } from '../core/dates.js';
import { DAY_TYPES, MODIFIERS, MODIFIER_PRIORITY, SKIP_REASONS, WEEKDAY_NAMES } from '../core/models.js';
import { completionPercent } from '../core/planResolver.js';
import { chartableExercises, overallSeries, seriesFor } from '../core/progressStats.js';
import { isPausedThisMonth, monthsElapsed } from '../core/progression.js';
import { isQuickSession } from '../core/store.js';
import { ProgressChart, TrendLabel, seriesUnit } from './chart.js';
import {
  Alert, Chip, ExerciseIcon, ModifierBadges, Ring, completionColor, describeSets, slotDescription, store,
} from './common.js';
import { Icon } from './icons.js';
import { ExerciseInfoButton } from './library.js';
import { PlanEditorSheet } from './planEditor.js';
import { PlanPickerSheet } from './planPicker.js';
import { SkipReasonSheet } from './today.js';

export function PlanView() {
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const plan = store.activePlan;
  // Progress is shown for whatever has been logged — it does not wait for
  // automatic progression to be switched on.
  const hasDrawer = plan != null && store.state.sessions.some(s => s.completedAt);

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
        <${Adherence} />
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

/// "Last 4 weeks: 9 of 12 done · 2 skipped (1 sick, 1 short on time) · 1 not logged".
/// The point of giving a reason when skipping: the record says why.
function Adherence() {
  const { planned, done, skipped, missed } = store.adherence(28);
  if (planned === 0) return null;
  const skippedTotal = Object.values(skipped).reduce((a, b) => a + b, 0);
  const reasons = Object.entries(skipped)
    .map(([id, count]) => `${count} ${(SKIP_REASONS[id] ?? SKIP_REASONS.other).label.toLowerCase()}`)
    .join(', ');
  return html`<div class="mono t-caption2 c-subtle" style="line-height:1.45">
    Last 4 weeks: ${done} of ${planned} done${skippedTotal ? ` · ${skippedTotal} skipped (${reasons})` : ''}${missed ? ` · ${missed} not logged` : ''}
  </div>`;
}

// MARK: - Progress drawer (Swift: ProgressDrawer + ProgressChartView)

function ProgressDrawer({ plan }) {
  const [expanded, setExpanded] = useState(false);
  const [picked, setPicked] = useState(null); // 'overall' or an exercise id; null = the first tab

  const startDate = store.state.settings.activePlanStartDate;
  const sessions = store.state.sessions;
  // The overall score compares against rising targets, so it only exists
  // while automatic progression is on. Per-exercise charts always do.
  const overall = overallSeries(plan, startDate, sessions);
  const exercises = chartableExercises(plan, store.state.exercises, sessions)
    .map(exercise => ({ exercise, series: seriesFor(exercise, plan, startDate, sessions) }))
    .filter(entry => entry.series?.points.length > 0);

  const tabs = [
    ...(overall?.points.length ? [{ id: 'overall', label: 'OVERALL', series: overall }] : []),
    ...exercises.map(({ exercise, series }) => ({ id: exercise.id, label: exercise.name.toUpperCase(), series })),
  ];
  const tab = tabs.find(t => t.id === picked) ?? tabs[0];

  if (!expanded) {
    return html`<div class="drawer">
      <button class="drawer-teaser" onClick=${() => setExpanded(true)} aria-expanded="false">
        ${tab
          ? html`<div style="width:48px"><${ProgressChart} series=${tab.series} compact /></div>
                 <span class="mono t-caption c-subtle truncate">${tab.id === 'overall' ? 'Progress' : tab.label}</span>
                 <${TrendLabel} series=${tab.series} />`
          : html`<${Icon} name="trend" size=${13} class="c-subtle" />
                 <span class="mono t-caption c-subtle">Progress — fills in as you log numbers</span>`}
        <span class="spacer"></span>
        <${Icon} name="chevron-down" size=${12} weight=${2.4} class="c-subtle" />
      </button>
    </div>`;
  }

  const unit = tab && seriesUnit(tab.series);
  const hasTarget = tab?.series.currentTarget != null;

  return html`<div class="drawer">
    <div class="chip-row" style="padding-top:14px;gap:6px">
      ${tabs.map(t => html`<${Chip} label=${t.label} selected=${t.id === tab.id} onClick=${() => setPicked(t.id)} />`)}
    </div>

    ${tab
      ? html`<div class="col" style="gap:8px;padding:12px var(--gutter) 0">
          <div class="row">
            <span class="label">${tab.id === 'overall' ? 'Progress score · 100 = the plan as written' : `Best set · ${unit.name}`}</span>
            <span class="spacer"></span>
            <${TrendLabel} series=${tab.series} small />
          </div>
          <div class="card chart-box"><${ProgressChart} series=${tab.series} unit=${unit} /></div>
          <div class="row label" style="gap:14px;letter-spacing:0">
            ${hasTarget && html`<span class="row" style="gap:5px">
              <i class="legend-line dashed"></i>TARGET · NOW ${unit.show(tab.series.currentTarget)}
            </span>`}
            <span class="row" style="gap:5px"><i class="legend-line"></i>${hasTarget ? 'ACTUAL' : 'WHAT YOU DID'}</span>
          </div>
        </div>`
      : html`<p class="mono t-caption c-subtle" style="padding:16px var(--gutter) 0;line-height:1.45">
          Nothing to chart yet. It fills in as you finish sessions.
        </p>`}

    <button class="drawer-collapse" onClick=${() => setExpanded(false)} aria-expanded="true">
      <${Icon} name="chevron-up" size=${14} weight=${2.4} />COLLAPSE
    </button>
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
  const skip = status.skipReason && (SKIP_REASONS[status.skipReason] ?? SKIP_REASONS.other);

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
              : skip
              ? html`<span class="row mono t-caption c-${skip.color}" style="gap:5px">
                  <${Icon} name="skip" size=${12} weight=${2.2} />Skipped · ${skip.label}
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
  const [choosingReason, setChoosingReason] = useState(false);
  const skip = status.skipReason && (SKIP_REASONS[status.skipReason] ?? SKIP_REASONS.other);
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
          : html`<p class="mono t-caption c-subtle">
                ${skip ? `Skipped — ${skip.label.toLowerCase()}.` : 'No session logged for this day.'}
              </p>
              <button class="btn-soft" onClick=${() => store.startSession(planDay, status.date)}>
                <${Icon} name="square-pencil" size=${15} weight=${2} />Log this session
              </button>
              ${skip
                ? html`<button class="btn-soft" onClick=${() => store.unskipSession(status.date)}>
                    <${Icon} name="undo" size=${14} />Undo skip
                  </button>`
                : html`<button class="btn-soft" onClick=${() => setChoosingReason(true)}>
                    <${Icon} name="skip" size=${14} />Mark as skipped
                  </button>`}`)}
      ${quickLogs.map(log => html`
        ${(planLog || isTrainingDay) && html`<div class="divider flush"></div>`}
        ${logCard(log)}`)}
      ${isTrainingDay && html`<button class="btn-plain mono t-caption c-subtle" style="align-self:flex-start;padding:4px 0"
        onClick=${onEditDay}>
        <${Icon} name="pencil" size=${12} weight=${2.2} />${editScope}
      </button>`}
    </div>

    ${choosingReason && html`<${SkipReasonSheet}
      onPick=${reason => store.skipSession(reason, status.date)} onCancel=${() => setChoosingReason(false)} />`}

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
  const seconds = log.startedAt && log.completedAt ? (toDate(log.completedAt) - toDate(log.startedAt)) / 1000 : 0;
  const duration = seconds >= 1 ? format.clock(seconds) : null;

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
