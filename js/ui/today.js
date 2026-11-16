// The Today tab.
// Swift: OddForm/Features/Today/TodayView.swift + Components/*

import { html, useRef, useState } from '../vendor/preact-htm.js';
import { addDays, dayKey, format, isSameDay, startOfWeek, toDate } from '../core/dates.js';
import { DAY_TYPES, MODIFIERS, SKIP_REASONS, newQuickSession, slotsOf } from '../core/models.js';
import { MAX_QUICK_SESSIONS } from '../core/store.js';
import { defaultQuickTarget, estimatedMinutes, quickTargetLabel } from '../core/units.js';
import { ActionSheet, Chip, DayTypeLabel, ExerciseIcon, NumberStepper, Ring, Sheet, store } from './common.js';
import { Icon } from './icons.js';
import { ExercisePickerSheet } from './planEditor.js';
import { PlanPickerSheet } from './planPicker.js';
import { BackupExportSheet } from './settings.js';

export function TodayView() {
  return html`<div class="screen"><div class="scroll">
    <div class="row" style="padding:16px var(--gutter) 20px;align-items:flex-start">
      <div style="flex:1;min-width:0">
        <div class="caption">Today</div>
        <h1 class="t-title" style="margin-top:4px">${format.longDay(new Date())}</h1>
      </div>
      <${BackupBadge} />
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

// MARK: - Backup reminder

/// A small drive in the header that shows how fresh the backup is: green
/// right after one, drifting to red over a month, and pulsing faster the
/// longer it is left. Tapping it opens the export sheet.
///
/// Data in a browser is easier to lose than data in an app, so the reminder
/// sits where it is seen every day rather than in Settings.
function BackupBadge() {
  const [open, setOpen] = useState(false);
  const days = store.daysSinceLastBackup;
  const hasData = store.state.sessions.some(s => s.completedAt);
  if (!hasData && days == null) return null; // nothing to lose yet

  // 0 = fresh, 1 = overdue. A week is fine; a month is not. With no backup
  // at all it counts from the first log, and is overdue after two weeks.
  const overdue = days != null
    ? Math.max(0, Math.min(1, (days - 7) / 23))
    : Math.max(0.35, Math.min(1, store.historyDays / 14));
  const color = `color-mix(in srgb, var(--red) ${Math.round(overdue * 100)}%, var(--green))`;
  const pulse = overdue > 0.3 ? `animation:backup-pulse ${(3.2 - 2.2 * overdue).toFixed(2)}s ease-in-out infinite` : '';
  const label = days == null ? 'No backup yet' : days === 0 ? 'Backed up today' : `Last backup ${days} ${days === 1 ? 'day' : 'days'} ago`;

  return html`
    <button class="backup-badge" style="color:${color};${pulse}" aria-label="${label}. Export a backup." title=${label}
      onClick=${() => setOpen(true)}>
      <${Icon} name="drive" size=${20} weight=${1.9} />
    </button>
    ${open && html`<${BackupExportSheet} onClose=${() => setOpen(false)} />`}`;
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
        <span class="week-num ${status?.skipReason ? 'skipped' : ''}">
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
  const [choosingReason, setChoosingReason] = useState(false);
  const plan = store.activePlan;
  const planDay = store.todayPlanDay;
  const finished = store.todaySession;
  const skipReason = store.todaySkipReason;
  const program = store.programProgress;

  const exerciseCount = slotsOf(planDay).length;

  let body;
  if (!plan) {
    body = html`<div class="col" style="gap:10px;align-items:flex-start">
      <div class="t-title3">No active plan</div>
      <div class="t-sub c-subtle">Choose a plan to get started.</div>
      <button class="link" onClick=${() => setShowPlanPicker(true)}>Choose plan →</button>
    </div>`;
  } else if (!planDay && program?.finished) {
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
  } else if (!planDay || planDay.dayType === 'rest') {
    // A rest day — or a day the plan has nothing for.
    body = html`<div class="row" style="gap:10px">
      <${Icon} name="moon" size=${20} class="c-subtle" />
      <div>
        <div class="t-title3">Rest day</div>
        <div class="t-sub c-subtle" style="margin-top:2px">Recovery is part of the plan.</div>
      </div>
    </div>`;
  } else {
    const title = finished?.title || planDay.blocks[0]?.blockName || DAY_TYPES[planDay.dayType].name;
    const reason = skipReason && (SKIP_REASONS[skipReason] ?? SKIP_REASONS.other);
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
          : reason
          ? html`<div class="row mono t-sub" style="gap:8px">
              <span class="row c-${reason.color}" style="gap:6px"><${Icon} name="skip" size=${16} />Skipped</span>
              <span class="c-subtle">· ${reason.label}</span>
            </div>`
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
        : reason
        ? html`<div class="row" style="gap:8px">
            <button class="btn-soft tall" style="flex:1" onClick=${() => store.startSession(planDay)}>Train anyway</button>
            <button class="btn-soft tall" style="flex:1" onClick=${() => store.unskipSession()}>
              <${Icon} name="undo" size=${15} />Undo skip
            </button>
          </div>`
        : html`
          <button class="btn-primary" onClick=${() => store.startSession(planDay)}>START SESSION</button>
          <button class="btn-plain mono t-caption c-subtle" style="align-self:center;padding:6px 12px"
            onClick=${() => setChoosingReason(true)}>
            <${Icon} name="skip" size=${13} />Skip today…
          </button>`}`;
  }

  return html`<div class="section col" style="gap:12px">
    <div class="row">
      <span class="caption">Today's session</span>
      <span class="spacer"></span>
      ${plan && html`<span class="label" style="letter-spacing:1px">${plan.name}</span>`}
    </div>
    ${body}
    ${showPlanPicker && html`<${PlanPickerSheet} onClose=${() => setShowPlanPicker(false)} />`}
    ${choosingReason && html`<${SkipReasonSheet}
      onPick=${reason => store.skipSession(reason)} onCancel=${() => setChoosingReason(false)} />`}
  </div>`;
}

/// "Why are you skipping?" — one tap, so the plan's record says more than
/// "not done". The Plan tab counts these up.
export function SkipReasonSheet({ onPick, onCancel }) {
  return html`<${ActionSheet} title="Skip this session — why?"
    options=${Object.entries(SKIP_REASONS).map(([id, reason]) => ({ label: reason.label, onClick: () => onPick(id) }))}
    onCancel=${onCancel} />`;
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

/// One exercise, logged as what it is: "12 push-ups" is counted, "5 min of
/// burpees" is timed. The cards are shortcuts; "+" also logs anything once
/// without keeping a card for it.
function QuickSessionsSection() {
  const [picking, setPicking] = useState(false);
  const [target, setTarget] = useState(null);   // { exercise, quick } being set up or edited
  const quickSessions = store.state.quickSessions;
  const isFull = quickSessions.length >= MAX_QUICK_SESSIONS;

  return html`<div class="section col" style="gap:12px">
    <div class="row" style="min-height:28px">
      <span class="caption">Quick sessions</span>
      <span class="spacer"></span>
      <button class="btn-round" aria-label="Log an exercise" onClick=${() => setPicking(true)}>
        <${Icon} name="plus" size=${14} weight=${2.2} />
      </button>
    </div>

    <div class="quick-row">
      ${quickSessions.map(quick => {
        const exercise = store.exerciseByID(quick.exerciseID);
        return exercise && html`<${QuickSessionCard} key=${quick.id} quick=${quick} exercise=${exercise}
          onEdit=${() => setTarget({ exercise, quick })} />`;
      })}
      ${quickSessions.length === 0 && html`
        <button class="card quick-card pressable c-subtle" onClick=${() => setPicking(true)}>
          <${Icon} name="plus-circle" size=${24} />
          <span class="mono t-caption">Add</span>
        </button>`}
    </div>
    ${quickSessions.length > 0 && html`<p class="mono t-caption2 c-subtle center">Tap to start · hold to change</p>`}

    ${picking && html`<${ExercisePickerSheet} title="Log an Exercise"
      onSelect=${exercise => setTarget({ exercise, quick: null })}
      onClose=${() => setPicking(false)} />`}

    ${target && html`<${QuickTargetSheet} exercise=${target.exercise} quick=${target.quick} canSave=${!isFull}
      onStart=${quick => { setTarget(null); store.startQuickSession(quick); }}
      onSave=${quick => {
        if (target.quick) store.updateQuickSession(quick); else store.addQuickSession(quick);
        setTarget(null);
      }}
      onRemove=${target.quick && (() => { store.removeQuickSession(target.quick); setTarget(null); })}
      onClose=${() => setTarget(null)} />`}
  </div>`;
}

/// Tap starts the session. Holding for half a second opens its settings.
function QuickSessionCard({ quick, exercise, onEdit }) {
  const [pressing, setPressing] = useState(false);
  const timer = useRef(null);
  const held = useRef(false);

  const release = () => {
    clearTimeout(timer.current);
    setPressing(false);
  };
  const press = () => {
    held.current = false;
    setPressing(true);
    timer.current = setTimeout(() => {
      held.current = true;
      setPressing(false);
      navigator.vibrate?.(10);
      onEdit();
    }, 500);
  };
  const tap = () => {
    if (!held.current) store.startQuickSession(quick);
  };

  return html`<button class="card quick-card ${pressing ? 'pressing' : ''}"
    onPointerDown=${press} onPointerUp=${release} onPointerLeave=${release} onPointerCancel=${release}
    onContextMenu=${e => e.preventDefault()} onClick=${tap}
    aria-label="${exercise.name}, ${quickTargetLabel(quick)}. Hold to change.">
    <${ExerciseIcon} exercise=${exercise} box=${36} img=${36} radius=${0} variant="plain" />
    <span class="quick-name">${exercise.name}</span>
    <span class="mono t-micro c-subtle">${quickTargetLabel(quick)}</span>
  </button>`;
}

/// What a quick session of `exercise` should be: counted or timed, and how much.
function QuickTargetSheet({ exercise, quick, canSave, onStart, onSave, onRemove, onClose }) {
  const [draft, setDraft] = useState(() => {
    const base = quick ?? { ...defaultQuickTarget(exercise) };
    return { counted: base.reps != null, reps: base.reps ?? 12, sets: base.sets ?? 1, minutes: base.minutes ?? 5 };
  });
  const set = patch => setDraft({ ...draft, ...patch });

  /// The draft as a quick session (keeping the card's id when editing one).
  const result = () => newQuickSession({
    ...(quick && { id: quick.id }),
    exerciseID: exercise.id,
    minutes: draft.minutes,
    reps: draft.counted ? draft.reps : null,
    sets: draft.counted ? draft.sets : null,
  });

  return html`<${Sheet} size="medium" title=${quick ? 'Quick Session' : 'Log an Exercise'}
    left=${{ label: 'Cancel', onClick: onClose }} onClose=${onClose}>
    <div class="col" style="gap:22px;padding:var(--gutter) var(--gutter) 32px">
      <div class="row" style="gap:14px">
        <${ExerciseIcon} exercise=${exercise} box=${56} img=${40} radius=${12} />
        <div class="t-title3">${exercise.name}</div>
      </div>

      <div class="col" style="gap:10px">
        <span class="label">How do you measure it?</span>
        <div class="row" style="gap:8px">
          <${Chip} large label="Count reps" selected=${draft.counted} onClick=${() => set({ counted: true })} />
          <${Chip} large label="Time it" selected=${!draft.counted} onClick=${() => set({ counted: false })} />
        </div>
      </div>

      ${draft.counted
        ? html`<div class="row" style="gap:12px">
            <${NumberStepper} label="Reps" value=${draft.reps} min=${1} max=${999} onChange=${reps => set({ reps })} />
            <${NumberStepper} label="Sets" value=${draft.sets} min=${1} max=${20} onChange=${sets => set({ sets })} />
          </div>`
        : html`<${NumberStepper} label="Minutes" value=${draft.minutes} min=${1} max=${240} onChange=${minutes => set({ minutes })} />`}

      <div class="col" style="gap:8px">
        <button class="btn-primary" onClick=${() => onStart(result())}>START NOW</button>
        ${(quick || canSave)
          ? html`<button class="btn-soft tall" onClick=${() => onSave(result())}>
              ${quick ? 'Save changes' : 'Keep as a quick session'}
            </button>`
          : html`<p class="mono t-caption2 c-subtle center" style="line-height:1.45">
              You have ${MAX_QUICK_SESSIONS} quick sessions already. Remove one to keep this as a card.
            </p>`}
        ${onRemove && html`<button class="btn-soft tall" style="--tint:var(--red)" onClick=${onRemove}>
          <${Icon} name="trash" size=${15} />Remove
        </button>`}
      </div>
    </div>
  <//>`;
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
