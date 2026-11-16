// Editing the exercises of one plan day, and picking exercises.
// Swift: OddForm/Features/Plan/PlanEditorView.swift
//        OddForm/Features/Plan/Components/DayExerciseEditor.swift

import { html, useState } from '../vendor/preact-htm.js';
import { CATEGORIES, DAY_TYPES, MUSCLE_GROUPS, WEEKDAY_NAMES, newBlock, newSlot } from '../core/models.js';
import {
  COUNT_UNITS, LIMITS, TIME_UNITS, UNIT_LABELS, countUnit, defaultTargets, formatWeight, isInvalid,
  parseDecimal, parseWhole, secondsToUnit, timeUnit, trimNumber, unitToSeconds, weightToKg,
} from '../core/units.js';
import { ActionSheet, Chip, ExerciseIcon, Sheet, store } from './common.js';
import { Icon } from './icons.js';

const clone = value => JSON.parse(JSON.stringify(value));

// MARK: - Exercise picker (Swift: ExercisePickerSheet)

export function ExercisePickerSheet({ onSelect, onClose }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);

  const query = search.trim().toLowerCase();
  const exercises = store.state.exercises
    .filter(e => (!query || e.name.toLowerCase().includes(query)) && (!category || e.category === category))
    .sort((a, b) => a.name.localeCompare(b.name));

  return html`<${Sheet} title="Add Exercise" left=${{ label: 'Cancel', onClick: onClose }} onClose=${onClose}>
    <div style="padding:12px var(--gutter) 8px">
      <label class="searchbar">
        <${Icon} name="search" size=${15} />
        <input placeholder="Search..." value=${search} onInput=${e => setSearch(e.target.value)}
          autocomplete="off" autocorrect="off" enterkeyhint="search" />
      </label>
    </div>
    <div class="chip-row" style="padding-bottom:8px">
      <${Chip} label="All" selected=${category === null} onClick=${() => setCategory(null)} />
      ${Object.entries(CATEGORIES).map(([id, c]) => html`
        <${Chip} label=${c.name} selected=${category === id} onClick=${() => setCategory(id)} />`)}
    </div>
    <div class="divider"></div>
    ${exercises.map(exercise => html`
      <button key=${exercise.id} class="lib-row pressable" style="gap:12px"
        onClick=${() => { onSelect(exercise); onClose(); }}>
        <${ExerciseIcon} exercise=${exercise} box=${32} img=${22} radius=${6} variant="bare" />
        <div style="min-width:0">
          <div class="t-sub medium">${exercise.name}</div>
          <div class="mono c-subtle" style="font-size:11px;margin-top:2px">
            ${exercise.muscleGroups.map(m => MUSCLE_GROUPS[m]).join(' · ')}
          </div>
        </div>
      </button>`)}
    ${exercises.length === 0 && html`<p class="mono t-caption c-subtle center" style="padding:40px 16px">No exercises found</p>`}
  <//>`;
}

// MARK: - Sets / reps / time / weight for one slot (Swift: SetsRepsEditor)

/// Four columns, each either a value or a "+" to add it. A slot can carry any
/// mix: 3 × 10 reps at 20 kg, 3 × 45 sec, or simply 30 min.
function SetsRepsEditor({ slot, onChange }) {
  const weightUnit = store.state.settings.preferredUnit;
  const time = timeUnit(slot);

  // What is being typed; the slot only takes a value once it parses.
  const [text, setText] = useState(() => ({
    count: slot.targetReps != null ? String(slot.targetReps) : '',
    time: slot.targetDurationSeconds != null ? trimNumber(secondsToUnit(slot.targetDurationSeconds, time)) : '',
    weight: slot.targetWeightKg != null ? formatWeight(slot.targetWeightKg, weightUnit) : '',
  }));
  const [unitPicker, setUnitPicker] = useState(null); // 'unit1' | 'unit2' | null

  const set = patch => onChange({ ...slot, ...patch });
  const type = (name, value) => setText({ ...text, [name]: value });

  const head = (label, onRemove, onPickUnit) => html`<div class="unit-head">
    ${onPickUnit
      ? html`<button class="row c-accent semibold" style="gap:2px" onClick=${onPickUnit}>
          ${label}<${Icon} name="chevrons-updown" size=${9} weight=${2.5} /></button>`
      : label}
    ${onRemove && html`<button class="unit-remove" aria-label="Remove ${label}" onClick=${onRemove}>
      <${Icon} name="x-circle-fill" size=${14} /></button>`}
  </div>`;

  const ghost = (label, onClick) => html`<div class="unit-col">
    <div class="unit-head" style="opacity:0.4">${label}</div>
    <button class="ghost-btn" onClick=${onClick}>+ ${label}</button>
  </div>`;

  const numberField = (name, parsed, inputmode, label, onValue) => html`
    <input class="num-field ${isInvalid(text[name], parsed) ? 'invalid' : ''}" inputmode=${inputmode}
      value=${text[name]} aria-label=${label}
      onInput=${e => { type(name, e.target.value); onValue(e.target.value); }} />`;

  // Changing the time unit keeps the number and changes what it means:
  // "45 sec" switched to minutes is 45 min.
  const pickUnit = unit => {
    if (unitPicker === 'unit2') {
      const shown = parseDecimal(text.time);
      set({ unit2: unit, ...(shown != null && { targetDurationSeconds: Math.min(LIMITS.seconds, unitToSeconds(shown, unit)) }) });
    } else {
      set({ unit1: unit });
    }
  };

  return html`<div class="editor-row">
    ${slot.targetSets != null
      ? html`<div class="unit-col">
          ${head('Sets', () => set({ targetSets: null }))}
          <div class="stepper">
            <button aria-label="Fewer sets" onClick=${() => set({ targetSets: Math.max(1, slot.targetSets - 1) })}>
              <${Icon} name="minus" size=${13} weight=${2.2} /></button>
            <span>${slot.targetSets}</span>
            <button aria-label="More sets" onClick=${() => set({ targetSets: Math.min(LIMITS.sets, slot.targetSets + 1) })}>
              <${Icon} name="plus" size=${13} weight=${2.2} /></button>
          </div>
        </div>`
      : ghost('Sets', () => set({ targetSets: 3 }))}

    ${slot.targetReps != null
      ? html`<div class="unit-col">
          ${head(UNIT_LABELS[countUnit(slot)], () => { type('count', ''); set({ targetReps: null }); }, () => setUnitPicker('unit1'))}
          ${numberField('count', parseWhole(text.count), 'numeric', 'Target reps', value => {
            const parsed = parseWhole(value);
            if (parsed != null) set({ targetReps: parsed });
          })}
        </div>`
      : ghost('Reps', () => { type('count', '10'); set({ targetReps: 10, unit1: 'Reps' }); })}

    ${slot.targetDurationSeconds != null
      ? html`<div class="unit-col">
          ${head(UNIT_LABELS[time], () => { type('time', ''); set({ targetDurationSeconds: null }); }, () => setUnitPicker('unit2'))}
          ${numberField('time', parseDecimal(text.time, LIMITS.seconds), 'decimal', 'Target time', value => {
            const parsed = parseDecimal(value);
            if (parsed != null && unitToSeconds(parsed, time) <= LIMITS.seconds) {
              set({ targetDurationSeconds: unitToSeconds(parsed, time), unit2: time });
            }
          })}
        </div>`
      : ghost('Time', () => { type('time', '30'); set({ targetDurationSeconds: 30, unit2: 'Sek' }); })}

    ${slot.targetWeightKg != null
      ? html`<div class="unit-col">
          ${head(weightUnit, () => { type('weight', ''); set({ targetWeightKg: null }); })}
          ${numberField('weight', parseDecimal(text.weight), 'decimal', `Target weight in ${weightUnit}`, value => {
            const parsed = parseDecimal(value);
            const kg = parsed == null ? null : Math.round(weightToKg(parsed, weightUnit) * 100) / 100;
            if (kg != null && kg <= LIMITS.weightKg) set({ targetWeightKg: kg });
          })}
        </div>`
      : ghost('Weight', () => { type('weight', '0'); set({ targetWeightKg: 0 }); })}

    ${unitPicker && html`<${ActionSheet} title="Choose Unit"
      options=${(unitPicker === 'unit2' ? TIME_UNITS : COUNT_UNITS).map(unit => ({
        label: UNIT_LABELS[unit], onClick: () => pickUnit(unit),
      }))}
      onCancel=${() => setUnitPicker(null)} />`}
  </div>`;
}

// MARK: - The exercises of one day (Swift: DayExerciseEditor)

/// Shared by "Edit plan" on a saved plan and by plan creation, where the plan
/// isn't saved yet. `onChange` receives the edited copy of `day`.
export function DayExerciseEditor({ day, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const edit = mutate => {
    const next = clone(day);
    mutate(next);
    onChange(next);
  };

  // A run starts as "20 min", a stretch as "2 × 45 sec", a lift as "3 × 10".
  const addExercise = exercise => edit(next => {
    const slot = newSlot({ exerciseID: exercise.id, ...defaultTargets(exercise) });
    if (next.blocks.length === 0) next.blocks.push(newBlock({ exercises: [slot] }));
    else next.blocks[0].exercises.push(slot);
  });

  return html`<div>
    ${day.blocks.map((block, blockIndex) => html`<div key=${block.id}>
      ${block.blockName && html`<div class="label" style="padding:20px var(--gutter) 8px">${block.blockName}</div>`}
      ${block.exercises.map((slot, slotIndex) => {
        const exercise = store.exerciseByID(slot.exerciseID);
        return html`<div key=${slot.id}>
          <div class="row" style="gap:12px;padding:10px var(--gutter)">
            <${ExerciseIcon} exercise=${exercise} box=${32} img=${22} radius=${6} variant="bare" />
            <span class="t-sub medium" style="flex:1;min-width:0">${exercise?.name ?? 'Deleted exercise'}</span>
            <button class="c-subtle pressable" style="padding:6px;margin:-6px"
              aria-label="Remove ${exercise?.name ?? 'exercise'}"
              onClick=${() => edit(next => next.blocks[blockIndex].exercises.splice(slotIndex, 1))}>
              <${Icon} name="x-circle-fill" size=${22} />
            </button>
          </div>
          <${SetsRepsEditor} slot=${slot}
            onChange=${updated => edit(next => { next.blocks[blockIndex].exercises[slotIndex] = updated; })} />
          <div class="divider"></div>
        </div>`;
      })}
    </div>`)}

    <div style="padding:8px var(--gutter) 0">
      <button class="btn-soft tall" onClick=${() => setShowPicker(true)}>
        <${Icon} name="plus-circle-fill" size=${18} />Add Exercise
      </button>
    </div>

    ${showPicker && html`<${ExercisePickerSheet} onSelect=${addExercise} onClose=${() => setShowPicker(false)} />`}
  </div>`;
}

// MARK: - "Edit plan" from the timeline (Swift: PlanEditorView)

export function PlanEditorSheet({ plan, dayIndex, onClose }) {
  const [draft, setDraft] = useState(() => clone(plan));
  const day = draft.days[dayIndex];

  // Say how far the edit reaches: a weekly plan changes every such weekday.
  const scope = day.dayOfWeek != null ? `Changes every ${WEEKDAY_NAMES[day.dayOfWeek - 1]} in ${plan.name}`
    : day.dayIndex != null ? `Day ${day.dayIndex + 1} of ${plan.name} (week ${Math.floor(day.dayIndex / 7) + 1})`
    : plan.name;

  return html`<${Sheet}
    left=${{ label: 'Cancel', onClick: onClose }}
    right=${{ label: 'Save', strong: true, onClick: () => { store.updatePlan(draft); onClose(); } }}
    onClose=${onClose}>
    <div style="padding:8px var(--gutter) 20px">
      <h2 class="t-title2">Edit Plan Day</h2>
      <div class="mono t-caption" style="margin-top:4px">
        <span class="c-${DAY_TYPES[day.dayType].color}">${DAY_TYPES[day.dayType].name}</span>
        <span class="c-subtle"> · ${scope}</span>
      </div>
      <p class="mono t-caption2 c-subtle" style="margin-top:6px;line-height:1.45">
        Sessions you have already logged keep their numbers.
      </p>
    </div>
    <div class="divider"></div>
    <div style="padding-bottom:40px">
      <${DayExerciseEditor} day=${day}
        onChange=${updated => setDraft({ ...draft, days: draft.days.map((d, i) => (i === dayIndex ? updated : d)) })} />
    </div>
  <//>`;
}
