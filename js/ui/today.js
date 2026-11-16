// The Today tab.
// Swift: OddForm/Features/Today/TodayView.swift + Components/*

import { html, useRef, useState } from '../vendor/preact-htm.js';
import { addDays, dayKey, format, isSameDay, startOfWeek, toDate } from '../core/dates.js';
import { DAY_TYPES, MODIFIERS, newQuickSession, slotsOf } from '../core/models.js';
import { MAX_QUICK_SESSIONS } from '../core/store.js';
import { estimatedMinutes } from '../core/units.js';
import { DayTypeLabel, ExerciseIcon, Ring, store } from './common.js';
import { Icon } from './icons.js';
import { ExercisePickerSheet } from './planEditor.js';
import { PlanPickerSheet } from './planPicker.js';

export function TodayView() {
  return html`<div class="screen"><div class="scroll">
    <div style="padding:16px var(--gutter) 20px">
      <div class="caption">Today</div>
      <h1 class="t-title" style="margin-top:4px">${format.longDay(new Date())}</h1>
    </div>
    <${WeekStrip} />
    <div class="divider"></div>
    <${TodaySessionCard} />
    <div class="divider"></div>
    <${QuickSessionsSection} />
    <div class="divider"></div>
    <${EnergyCheckInSection} />
  </div></div>`;
}

// MARK: - Week strip (Swift: WeekStripView)

function WeekStrip() {
  const today = new Date();
  const monday = startOfWeek(today);
  const statusByDay = new Map(store.dailyStatuses(-7, 7).map(s => [s.key, s]));

  return html`<div class="week">
    ${[0, 1, 2, 3, 4, 5, 6].map(offset => {
      const date = addDays(monday, offset);
      const status = statusByDay.get(dayKey(date));
      const color = `var(--${DAY_TYPES[status?.dayType ?? 'strength'].color})`;
      return html`<div class="week-day ${isSameDay(date, today) ? 'today' : ''}">
        <span class="week-letter">${format.weekdayNarrow(date)}</span>
        <span class="week-num">
          ${status?.completionPercent > 0 && html`<${Ring} size=${28} percent=${status.completionPercent} color=${color} />`}
          ${date.getDate()}
        </span>
      </div>`;
    })}
  </div>`;
}

// MARK: - Today's session (Swift: TodaySessionCard)

function TodaySessionCard() {
  const [showPlanPicker, setShowPlanPicker] = useState(false);
  const plan = store.activePlan;
  const planDay = store.todayPlanDay;
  const finished = store.todaySession;
  const program = store.programProgress;

  const exerciseCount = slotsOf(planDay).length;

  let body;
  if (!plan) {
    body = html`<div class="col" style="gap:10px;align-items:flex-start">
      <div class="t-title3">No active plan</div>
      <div class="t-sub c-subtle">Choose a plan to get started.</div>
      <button class="link" onClick=${() => setShowPlanPicker(true)}>Choose plan →</button>
    </div>`;
  } else if (!planDay) {
    // A finite program has run past its last day.
    body = html`<div class="col" style="gap:12px">
      <div class="row" style="gap:10px">
        <${Icon} name="check-circle-fill" size=${22} class="c-green" />
        <div>
          <div class="t-title3">Program complete</div>
          <div class="t-sub c-subtle" style="margin-top:2px">
            You reached the end of ${plan.name}${program ? ` — ${program.weeks} weeks` : ''}.
          </div>
        </div>
      </div>
      <button class="btn-primary" onClick=${() => store.setActivePlan(plan, { restart: true })}>START AGAIN</button>
      <button class="btn-soft tall" onClick=${() => setShowPlanPicker(true)}>Choose another plan</button>
    </div>`;
  } else if (planDay.dayType === 'rest') {
    body = html`<div class="row" style="gap:10px">
      <${Icon} name="moon" size=${20} class="c-subtle" />
      <div>
        <div class="t-title3">Rest day</div>
        <div class="t-sub c-subtle" style="margin-top:2px">Recovery is part of the plan.</div>
      </div>
    </div>`;
  } else {
    const title = finished?.title || planDay.blocks[0]?.blockName || DAY_TYPES[planDay.dayType].name;
    body = html`
      <div class="col" style="gap:8px">
        <div class="row" style="gap:8px">
          <${DayTypeLabel} dayType=${planDay.dayType} />
          <span class="mono t-caption c-subtle">
            · Week ${program ? `${program.week} of ${program.weeks}` : store.currentWeekNumber}
          </span>
        </div>
        <h2 class="t-title">${title}</h2>
        ${finished
          ? html`<${DoneSummary} session=${finished} />`
          : html`<div class="row mono t-sub c-subtle" style="gap:16px">
              <span class="row" style="gap:6px">
                <${Icon} name="dumbbell" size=${15} />${exerciseCount} ${exerciseCount === 1 ? 'exercise' : 'exercises'}
              </span>
              <span class="row" style="gap:6px"><${Icon} name="clock" size=${15} />~${estimatedMinutes(planDay)} min</span>
            </div>`}
      </div>
      ${finished
        ? html`<button class="btn-soft tall" onClick=${() => store.resumeSession(finished)}>
            <${Icon} name="square-pencil" size=${15} weight=${2} />Edit session
          </button>`
        : html`<button class="btn-primary" onClick=${() => store.startSession(planDay)}>START SESSION</button>`}`;
  }

  return html`<div class="section col" style="gap:12px">
    <div class="row">
      <span class="caption">Today's session</span>
      <span class="spacer"></span>
      ${plan && html`<span class="label" style="letter-spacing:1px">${plan.name}</span>`}
    </div>
    ${body}
    ${showPlanPicker && html`<${PlanPickerSheet} onClose=${() => setShowPlanPicker(false)} />`}
  </div>`;
}

/// "Done · 9/9 sets · 24 min" — today's workout once it is finished.
function DoneSummary({ session }) {
  const done = session.sets.filter(s => s.isCompleted).length;
  const planned = session.plannedSets ?? done;
  const minutes = session.startedAt && session.completedAt
    ? Math.max(1, Math.round((toDate(session.completedAt) - toDate(session.startedAt)) / 60000))
    : null;
  return html`<div class="row mono t-sub" style="gap:8px;flex-wrap:wrap">
    <span class="row c-green" style="gap:6px"><${Icon} name="check-circle-fill" size=${16} />Done</span>
    <span class="c-subtle">· ${done}/${planned} sets${minutes ? ` · ${minutes} min` : ''}</span>
  </div>`;
}

// MARK: - Quick sessions (Swift: QuickSessionsSection)

function QuickSessionsSection() {
  const [showPicker, setShowPicker] = useState(false);
  const quickSessions = store.state.quickSessions;

  return html`<div class="section col" style="gap:12px">
    <div class="row" style="min-height:28px">
      <span class="caption">Quick sessions</span>
      <span class="spacer"></span>
      ${quickSessions.length < MAX_QUICK_SESSIONS && html`
        <button class="btn-round" aria-label="Add quick session" onClick=${() => setShowPicker(true)}>
          <${Icon} name="plus" size=${14} weight=${2.2} />
        </button>`}
    </div>

    <div class="quick-row">
      ${quickSessions.map(quick => {
        const exercise = store.exerciseByID(quick.exerciseID);
        return exercise && html`<${QuickSessionCard} key=${quick.id} quick=${quick} exercise=${exercise} />`;
      })}
      ${quickSessions.length === 0 && html`
        <button class="card quick-card pressable c-subtle" onClick=${() => setShowPicker(true)}>
          <${Icon} name="plus-circle" size=${24} />
          <span class="mono t-caption">Add</span>
        </button>`}
    </div>

    ${showPicker && html`<${ExercisePickerSheet}
      onSelect=${exercise => store.addQuickSession(newQuickSession({ exerciseID: exercise.id, minutes: 5 }))}
      onClose=${() => setShowPicker(false)} />`}
  </div>`;
}

/// Tap starts the session. Holding for 0.6 s removes the card.
function QuickSessionCard({ quick, exercise }) {
  const [pressing, setPressing] = useState(false);
  const timer = useRef(null);
  const removed = useRef(false);

  const release = () => {
    clearTimeout(timer.current);
    setPressing(false);
  };
  const press = () => {
    removed.current = false;
    setPressing(true);
    timer.current = setTimeout(() => {
      removed.current = true;
      navigator.vibrate?.(10);
      store.removeQuickSession(quick);
    }, 600);
  };
  const tap = () => {
    if (!removed.current) store.startQuickSession(quick);
  };

  return html`<button class="card quick-card ${pressing ? 'pressing' : ''}"
    onPointerDown=${press} onPointerUp=${release} onPointerLeave=${release} onPointerCancel=${release}
    onContextMenu=${e => e.preventDefault()} onClick=${tap}>
    <${ExerciseIcon} exercise=${exercise} box=${32} img=${32} radius=${0} variant="plain" />
    <span class="quick-name">${exercise.name}</span>
    <span class="mono t-micro c-subtle">${quick.minutes} min</span>
  </button>`;
}

// MARK: - How do you feel? (Swift: EnergyCheckInSection)

function EnergyCheckInSection() {
  const active = store.todayModifiers;

  return html`<div class="section col" style="gap:12px">
    <span class="caption">How do you feel?</span>
    <div class="feel-grid">
      ${Object.entries(MODIFIERS).map(([id, modifier]) => html`
        <button class="feel ${active.includes(id) ? 'on' : ''}" style="--tint:var(--${modifier.color})"
          aria-pressed=${String(active.includes(id))}
          onClick=${() => { navigator.vibrate?.(5); store.toggleModifier(id); }}>
          <${Icon} name=${modifier.icon} size=${14} />${modifier.label}
        </button>`)}
    </div>
    ${active.length > 0 && html`<p class="mono t-caption2 c-subtle" style="line-height:1.45">
      ${Object.keys(MODIFIERS).filter(id => active.includes(id)).map(id => MODIFIERS[id].hint).join(' · ')}
    </p>`}
  </div>`;
}
