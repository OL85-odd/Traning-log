// The full-screen view for logging a session.
// Swift: OddForm/Features/Today/ActiveSessionView.swift

import { html, useEffect, useState } from '../vendor/preact-htm.js';
import { format, isSameDay, toDate } from '../core/dates.js';
import { DAY_TYPES, newSetLog } from '../core/models.js';
import { Alert, Cover, DayTypeLabel, ExerciseIcon, oneDecimal, store } from './common.js';
import { Icon } from './icons.js';
import { ExerciseInfoButton } from './library.js';

export function ActiveSessionView() {
  const [confirmFinish, setConfirmFinish] = useState(false);
  const session = store.state.activeSession;
  if (!session) return null;

  const planDay = store.planDayForSession(session);
  const isQuick = store.state.activeSessionDay != null;
  const isToday = isSameDay(session.date, new Date());
  const hasBlocks = planDay && planDay.blocks.length > 0;

  return html`
    <${Cover}
      title=${isToday ? 'Active Session' : format.mediumDate(session.date)}
      left=${{ label: 'Cancel', onClick: () => store.cancelSession() }}
      right=${{ label: 'Finish', strong: true, onClick: () => setConfirmFinish(true) }}>
      <div class="col" style="gap:24px;padding-bottom:32px">
        <div style="padding:8px var(--gutter) 0">
          <div class="row" style="min-height:16px">
            ${planDay && html`<${DayTypeLabel} dayType=${planDay.dayType} />`}
            <span class="spacer"></span>
            ${session.startedAt && html`<${ElapsedTime} startedAt=${session.startedAt} />`}
          </div>
          <h2 class="t-title2" style="margin-top:4px">
            ${isQuick || !planDay ? 'Quick Session' : planDay.blocks[0]?.blockName || DAY_TYPES[planDay.dayType].name}
          </h2>
        </div>

        ${hasBlocks
          ? planDay.blocks.map(block => html`<div key=${block.id} class="col" style="gap:12px">
              ${block.blockName && html`<div class="caption" style="padding:0 var(--gutter)">${block.blockName}</div>`}
              ${block.exercises.map(slot => {
                const exercise = store.exerciseByID(slot.exerciseID);
                return exercise && html`<${ExerciseSlot} key=${slot.id} slot=${slot} exercise=${exercise} session=${session} />`;
              })}
            </div>`)
          : html`<div class="col" style="gap:12px;padding:0 var(--gutter)">
              <div class="caption">Free form</div>
              <p class="t-sub c-subtle">This is a quick session. Use it freely — your time is being logged.</p>
            </div>`}
      </div>
    <//>

    ${confirmFinish && html`<${Alert}
      title="Finish session?"
      message="This will save the session and mark it complete."
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setConfirmFinish(false) },
        { label: 'Finish', role: 'destructive', onClick: () => { setConfirmFinish(false); store.completeSession(); } },
      ]} />`}`;
}

// MARK: - One exercise with its set rows

function ExerciseSlot({ slot, exercise, session }) {
  const logged = session.sets.filter(s => s.exerciseID === exercise.id);
  const targetSets = slot.targetSets ?? 3;
  const setNumbers = Array.from({ length: Math.max(1, targetSets) }, (_, i) => i + 1);

  return html`<div class="card slot-card col" style="gap:8px">
    <div class="row" style="gap:12px;padding:0 var(--gutter)">
      <${ExerciseIcon} exercise=${exercise} variant="on-bg" />
      <div style="flex:1;min-width:0">
        <div class="medium">${exercise.name}</div>
        <div class="mono t-caption c-subtle" style="margin-top:2px">
          ${logged.filter(s => s.isCompleted).length}/${targetSets} sets
        </div>
      </div>
      <${ExerciseInfoButton} exercise=${exercise} />
    </div>
    ${setNumbers.map(n => html`<${SetRow} key=${n} setNumber=${n} slot=${slot} exercise=${exercise}
      existing=${logged.find(s => s.setNumber === n)} />`)}
  </div>`;
}

const wholeNumber = text => (/^\d+$/.test(text.trim()) ? Number(text) : null);
const decimalNumber = text => {
  const normalized = text.trim().replace(',', '.'); // Norwegian keyboards type a comma
  return /^\d+(\.\d+)?$/.test(normalized) ? Number(normalized) : null;
};

function SetRow({ setNumber, slot, exercise, existing }) {
  const [values, setValues] = useState(() => ({
    reps: existing?.repsCompleted != null ? String(existing.repsCompleted) : '',
    weight: existing?.weightKg != null ? String(existing.weightKg) : '',
    duration: existing?.durationSeconds != null ? String(existing.durationSeconds) : '',
    done: existing?.isCompleted ?? false,
  }));

  const log = next => {
    setValues(next);
    store.logSet(newSetLog({
      exerciseID: exercise.id,
      setNumber,
      repsCompleted: wholeNumber(next.reps),
      weightKg: decimalNumber(next.weight),
      durationSeconds: wholeNumber(next.duration),
      isCompleted: next.done,
    }));
  };

  // Typing only updates the row. Numbers reach the log when the set is ticked
  // off — or straight away if it already is, so a correction isn't lost.
  const edit = field => event => {
    const next = { ...values, [field]: event.target.value };
    if (values.done) log(next); else setValues(next);
  };

  const field = (name, label, placeholder, inputmode) => html`<label class="set-field">
    <input value=${values[name]} placeholder=${placeholder} inputmode=${inputmode}
      autocomplete="off" enterkeyhint="done" onInput=${edit(name)} aria-label="Set ${setNumber} ${label}" />
    <span class="mono t-micro c-subtle">${label}</span>
  </label>`;

  return html`<div class="set-row">
    <span class="set-num">${setNumber}</span>
    ${slot.targetReps != null && field('reps', 'reps', String(slot.targetReps), 'numeric')}
    ${field('weight', 'kg', slot.targetWeightKg != null ? oneDecimal(slot.targetWeightKg) : '–', 'decimal')}
    ${slot.targetDurationSeconds != null && field('duration', 'sec', String(slot.targetDurationSeconds), 'numeric')}
    <span class="spacer"></span>
    <button class="set-check ${values.done ? 'done' : ''}" role="checkbox" aria-checked=${String(values.done)}
      aria-label="Set ${setNumber} done" onClick=${() => log({ ...values, done: !values.done })}>
      <${Icon} name=${values.done ? 'check-circle-fill' : 'circle'} size=${24} weight=${1.5} />
    </button>
  </div>`;
}

// MARK: - Elapsed time

function ElapsedTime({ startedAt }) {
  const seconds = () => Math.max(0, (Date.now() - toDate(startedAt).getTime()) / 1000);
  const [elapsed, setElapsed] = useState(seconds);
  useEffect(() => {
    const timer = setInterval(() => setElapsed(seconds()), 1000);
    return () => clearInterval(timer);
  }, [startedAt]);
  return html`<span class="mono t-caption c-subtle">${format.clock(elapsed)}</span>`;
}
