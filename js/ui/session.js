// The full-screen view for logging a session.
// Swift: OddForm/Features/Today/ActiveSessionView.swift

import { html, useEffect, useState } from '../vendor/preact-htm.js';
import { format, isSameDay, toDate } from '../core/dates.js';
import { DAY_TYPES, newSetLog } from '../core/models.js';
import { plannedSetCount } from '../core/planResolver.js';
import { isQuickSession } from '../core/store.js';
import {
  LIMITS, UNIT_LABELS, countUnit, formatWeight, isInvalid, parseDecimal, parseWhole, secondsToUnit,
  setCount, timeUnit, tracksWeight, trimNumber, unitToSeconds, weightToKg,
} from '../core/units.js';
import { Alert, Cover, DayTypeLabel, ExerciseIcon, describeSets, store } from './common.js';
import { Icon } from './icons.js';
import { ExerciseInfoButton } from './library.js';

export function ActiveSessionView() {
  const [confirm, setConfirm] = useState(null); // 'finish' | 'discard'
  const [rest, setRest] = useState(null);       // { endsAt, seconds }
  const session = store.state.activeSession;
  if (!session) return null;

  const planDay = store.planDayForSession(session);
  const isQuick = isQuickSession(session);
  const isToday = isSameDay(session.date, new Date());
  const isEditing = session.completedAt != null;
  const hasBlocks = planDay && planDay.blocks.length > 0;

  const title = isQuick || !planDay
    ? 'Quick Session'
    : planDay.blocks[0]?.blockName || DAY_TYPES[planDay.dayType].name;

  const planned = plannedSetCount(planDay, store.hasExercise);
  const done = session.sets.filter(s => s.isCompleted).length;

  // Leaving is only a question when there is something to lose or to settle.
  const cancel = () => (store.activeSessionHasChanges ? setConfirm('discard') : store.cancelSession());
  const finish = () => (done >= planned ? store.completeSession() : setConfirm('finish'));

  // A rest countdown after each ticked set — only while actually training.
  const startRest = seconds => {
    if (isToday && !isEditing && seconds > 0) setRest({ endsAt: Date.now() + seconds * 1000, seconds });
  };

  return html`
    <${Cover}
      title=${!isToday ? format.mediumDate(session.date) : isEditing ? 'Edit Session' : 'Active Session'}
      left=${{ label: 'Cancel', onClick: cancel }}
      right=${{ label: isEditing ? 'Save' : 'Finish', strong: true, onClick: finish }}>
      <div class="col" style="gap:24px;padding-bottom:${rest ? 96 : 32}px">
        <div style="padding:8px var(--gutter) 0">
          <div class="row" style="min-height:16px">
            ${planDay && html`<${DayTypeLabel} dayType=${planDay.dayType} />`}
            <span class="spacer"></span>
            ${session.startedAt && !isEditing && html`<${ElapsedTime} startedAt=${session.startedAt} />`}
          </div>
          <h2 class="t-title2" style="margin-top:4px">${title}</h2>
          ${planned > 0 && html`<div class="mono t-caption c-subtle" style="margin-top:4px">${done} of ${planned} ${planned === 1 ? 'set' : 'sets'} done</div>`}
        </div>

        ${hasBlocks
          ? planDay.blocks.map(block => html`<div key=${block.id} class="col" style="gap:12px">
              ${block.blockName && block.blockName !== title
                && html`<div class="caption" style="padding:0 var(--gutter)">${block.blockName}</div>`}
              ${block.exercises.map(slot => {
                const exercise = store.exerciseByID(slot.exerciseID);
                return exercise && html`<${ExerciseSlot} key=${slot.id} slot=${slot} exercise=${exercise}
                  session=${session} onSetDone=${() => startRest(slot.restSeconds)} />`;
              })}
            </div>`)
          : html`<div class="col" style="gap:12px;padding:0 var(--gutter)">
              <p class="t-sub c-subtle">Nothing is planned for this day. Finish to log that you trained.</p>
            </div>`}
      </div>
      ${rest && html`<${RestBar} key=${rest.endsAt} rest=${rest} onDone=${() => setRest(null)} />`}
    <//>

    ${confirm === 'finish' && html`<${Alert}
      title="Finish session?"
      message=${done === 0
        ? 'No sets are ticked off yet. The session will be saved as it is.'
        : `${done} of ${planned} sets are ticked off. The rest will count as not done.`}
      buttons=${[
        { label: 'Keep going', onClick: () => setConfirm(null) },
        { label: 'Finish', role: 'primary', onClick: () => { setConfirm(null); store.completeSession(); } },
      ]} />`}

    ${confirm === 'discard' && html`<${Alert}
      title=${isEditing ? 'Discard changes?' : 'Discard session?'}
      message=${isEditing
        ? 'The changes you made to this session will be lost.'
        : 'What you have logged in this session will be lost.'}
      buttons=${[
        { label: 'Keep logging', role: 'cancel', onClick: () => setConfirm(null) },
        { label: 'Discard', role: 'destructive', onClick: () => { setConfirm(null); store.cancelSession(); } },
      ]} />`}`;
}

// MARK: - One exercise with its set rows

function ExerciseSlot({ slot, exercise, session, onSetDone }) {
  const logged = session.sets.filter(s => s.exerciseID === exercise.id);
  const sets = setCount(slot);
  const setNumbers = Array.from({ length: sets }, (_, i) => i + 1);
  const last = store.lastPerformance(exercise.id, session.id);
  const unit = store.state.settings.preferredUnit;

  return html`<div class="card slot-card col" style="gap:8px">
    <div class="row" style="gap:12px;padding:0 var(--gutter)">
      <${ExerciseIcon} exercise=${exercise} variant="on-bg" />
      <div style="flex:1;min-width:0">
        <div class="medium">${exercise.name}</div>
        <div class="mono t-caption c-subtle" style="margin-top:2px">
          ${logged.filter(s => s.isCompleted).length}/${sets} ${sets === 1 ? 'set' : 'sets'}
        </div>
        ${last && html`<div class="mono t-caption2 c-subtle truncate" style="margin-top:2px">
          Last time · ${describeSets(last.sets, slot, unit)}
        </div>`}
      </div>
      <${ExerciseInfoButton} exercise=${exercise} />
    </div>
    ${setNumbers.map(n => html`<${SetRow} key=${n} setNumber=${n} slot=${slot} exercise=${exercise}
      existing=${logged.find(s => s.setNumber === n)} onDone=${onSetDone} />`)}
  </div>`;
}

function SetRow({ setNumber, slot, exercise, existing, onDone }) {
  const weightUnit = store.state.settings.preferredUnit;
  const time = timeUnit(slot);

  const hasCount = slot.targetReps != null;
  const hasWeight = tracksWeight(slot, exercise);
  const hasTime = slot.targetDurationSeconds != null;

  // The targets, written the way the fields show them.
  const target = {
    count: hasCount ? String(slot.targetReps) : '',
    weight: slot.targetWeightKg != null ? formatWeight(slot.targetWeightKg, weightUnit) : '',
    time: hasTime ? trimNumber(secondsToUnit(slot.targetDurationSeconds, time)) : '',
  };

  const [values, setValues] = useState(() => ({
    count: existing?.repsCompleted != null ? String(existing.repsCompleted) : '',
    weight: existing?.weightKg != null ? formatWeight(existing.weightKg, weightUnit) : '',
    time: existing?.durationSeconds != null ? trimNumber(secondsToUnit(existing.durationSeconds, time)) : '',
    done: existing?.isCompleted ?? false,
  }));

  // What each field holds once read as a number in the stored unit.
  const read = v => {
    const weight = parseDecimal(v.weight);
    const kg = weight == null ? null : Math.round(weightToKg(weight, weightUnit) * 100) / 100;
    const duration = parseDecimal(v.time);
    const seconds = duration == null ? null : unitToSeconds(duration, time);
    return {
      count: parseWhole(v.count, LIMITS.count),
      weightKg: kg != null && kg <= LIMITS.weightKg ? kg : null,
      seconds: seconds != null && seconds <= LIMITS.seconds ? seconds : null,
    };
  };

  /// Every change goes straight into the log, ticked or not, so nothing typed is lost.
  const save = next => {
    setValues(next);
    const parsed = read(next);
    store.logSet(newSetLog({
      exerciseID: exercise.id,
      setNumber,
      repsCompleted: hasCount ? parsed.count : null,
      weightKg: hasWeight ? parsed.weightKg : null,
      durationSeconds: hasTime ? parsed.seconds : null,
      isCompleted: next.done,
    }));
  };

  /// Ticking a set means "did it as planned": fields left empty take the target.
  const toggle = () => {
    if (values.done) return save({ ...values, done: false });
    save({
      count: values.count.trim() || target.count,
      weight: values.weight.trim() || target.weight,
      time: values.time.trim() || target.time,
      done: true,
    });
    onDone?.();
  };

  const parsed = read(values);
  const field = (name, label, value, inputmode) => html`<label class="set-field">
    <input class=${isInvalid(values[name], value) ? 'invalid' : ''} value=${values[name]}
      placeholder=${target[name] || '–'} inputmode=${inputmode} autocomplete="off" enterkeyhint="done"
      onInput=${event => save({ ...values, [name]: event.target.value })}
      aria-label="Set ${setNumber} ${label}" aria-invalid=${String(isInvalid(values[name], value))} />
    <span class="mono t-micro c-subtle">${label}</span>
  </label>`;

  return html`<div class="set-row">
    <span class="set-num">${setNumber}</span>
    ${hasCount && field('count', UNIT_LABELS[countUnit(slot)], parsed.count, 'numeric')}
    ${hasWeight && field('weight', weightUnit, parsed.weightKg, 'decimal')}
    ${hasTime && field('time', UNIT_LABELS[time], parsed.seconds, 'decimal')}
    <span class="spacer"></span>
    <button class="set-check ${values.done ? 'done' : ''}" role="checkbox" aria-checked=${String(values.done)}
      aria-label="Set ${setNumber} done" onClick=${toggle}>
      <${Icon} name=${values.done ? 'check-circle-fill' : 'circle'} size=${28} weight=${1.5} />
    </button>
  </div>`;
}

// MARK: - Rest countdown

function RestBar({ rest, onDone }) {
  const left = () => Math.max(0, Math.ceil((rest.endsAt - Date.now()) / 1000));
  const [seconds, setSeconds] = useState(left);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = left();
      setSeconds(now);
      if (now <= 0) {
        navigator.vibrate?.([80, 60, 80]);
        onDone();
      }
    }, 250);
    return () => clearInterval(timer);
  }, [rest.endsAt]);

  return html`<div class="rest-bar" role="timer" aria-label="Rest">
    <div class="rest-fill" style="width:${100 - (seconds / rest.seconds) * 100}%"></div>
    <span class="mono t-sub">Rest</span>
    <span class="mono t-title3">${format.clock(seconds)}</span>
    <span class="spacer"></span>
    <button class="link" onClick=${onDone}>Skip</button>
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
