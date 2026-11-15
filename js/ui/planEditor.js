// Editing the exercises of one plan day, and picking exercises.
// Swift: OddForm/Features/Plan/PlanEditorView.swift
//        OddForm/Features/Plan/Components/DayExerciseEditor.swift

import { html, useState } from '../vendor/preact-htm.js';
import { CATEGORIES, DAY_TYPES, MUSCLE_GROUPS, UNITS, WEEKDAY_NAMES, newBlock, newSlot } from '../core/models.js';
import { ActionSheet, Chip, ExerciseIcon, Sheet, oneDecimal, store } from './common.js';
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
          <div class="mono c-subtle" style="font-size:10px;margin-top:2px">
            ${exercise.muscleGroups.map(m => MUSCLE_GROUPS[m]).join(' · ')}
          </div>
        </div>
      </button>`)}
    ${exercises.length === 0 && html`<p class="mono t-caption c-subtle center" style="padding:40px 16px">No exercises found</p>`}
  <//>`;
}

// MARK: - Sets / reps / duration / weight for one slot (Swift: SetsRepsEditor)

function SetsRepsEditor({ slot, onChange }) {
  // What is being typed; the slot only takes a value once it parses.
  const [repsText, setRepsText] = useState(slot.targetReps != null ? String(slot.targetReps) : '');
  const [weightText, setWeightText] = useState(slot.targetWeightKg != null ? oneDecimal(slot.targetWeightKg) : '');
  const [unitPicker, setUnitPicker] = useState(null); // 'unit1' | 'unit2' | null

  const set = patch => onChange({ ...slot, ...patch });

  const unitButton = field => html`<button class="row c-accent semibold" style="gap:2px"
    onClick=${() => setUnitPicker(field)}>${slot[field]}<${Icon} name="chevrons-updown" size=${9} weight=${2.5} /></button>`;
  const removeButton = (label, onClick) => html`<button aria-label=${label} onClick=${onClick}
    style="color:rgb(245 242 238 / 0.25)"><${Icon} name="x-circle-fill" size=${11} /></button>`;

  return html`<div class="editor-row">
    ${slot.targetSets != null && html`<div class="unit-col">
      <div class="unit-head">Sets</div>
      <div class="stepper">
        <button aria-label="Fewer sets" onClick=${() => set({ targetSets: Math.max(1, slot.targetSets - 1) })}>
          <${Icon} name="minus" size=${13} weight=${2.2} /></button>
        <span>${slot.targetSets}</span>
        <button aria-label="More sets" onClick=${() => set({ targetSets: Math.min(20, slot.targetSets + 1) })}>
          <${Icon} name="plus" size=${13} weight=${2.2} /></button>
      </div>
    </div>`}

    ${slot.targetReps != null
      ? html`<div class="unit-col">
          <div class="unit-head">
            ${unitButton('unit1')}
            ${removeButton('Remove reps', () => { setRepsText(''); set({ targetReps: null }); })}
          </div>
          <input class="num-field" inputmode="numeric" placeholder="10" value=${repsText} aria-label="Target reps"
            onInput=${e => {
              setRepsText(e.target.value);
              if (/^\d+$/.test(e.target.value.trim())) set({ targetReps: Number(e.target.value) });
            }} />
        </div>`
      : html`<div class="unit-col">
          <div class="unit-head" style="opacity:0.4">Reps</div>
          <button class="ghost-btn" onClick=${() => { setRepsText('10'); set({ targetReps: 10 }); }}>+ Reps</button>
        </div>`}

    ${slot.targetDurationSeconds != null && html`<div class="unit-col">
      <div class="unit-head">${unitButton('unit2')}</div>
      <div class="stepper">
        <button aria-label="Shorter" onClick=${() => set({ targetDurationSeconds: Math.max(5, slot.targetDurationSeconds - 5) })}>
          <${Icon} name="minus" size=${13} weight=${2.2} /></button>
        <span style="min-width:32px;font-size:14px">${slot.targetDurationSeconds}</span>
        <button aria-label="Longer" onClick=${() => set({ targetDurationSeconds: Math.min(3600, slot.targetDurationSeconds + 5) })}>
          <${Icon} name="plus" size=${13} weight=${2.2} /></button>
      </div>
    </div>`}

    ${slot.targetWeightKg != null
      ? html`<div class="unit-col">
          <div class="unit-head">Kg ${removeButton('Remove weight', () => { setWeightText(''); set({ targetWeightKg: null }); })}</div>
          <input class="num-field" inputmode="decimal" placeholder="0.0" value=${weightText} aria-label="Target weight in kg"
            onInput=${e => {
              setWeightText(e.target.value);
              const normalized = e.target.value.trim().replace(',', '.');
              if (/^\d+(\.\d+)?$/.test(normalized)) set({ targetWeightKg: Number(normalized) });
            }} />
        </div>`
      : html`<div class="unit-col">
          <div class="unit-head" style="opacity:0.4">Kg</div>
          <button class="ghost-btn" onClick=${() => { setWeightText('0'); set({ targetWeightKg: 0 }); }}>+ Weight</button>
        </div>`}

    ${unitPicker && html`<${ActionSheet} title="Choose Unit"
      options=${UNITS.map(unit => ({ label: unit, onClick: () => set({ [unitPicker]: unit }) }))}
      onCancel=${() => setUnitPicker(null)} />`}
  </div>`;
}

// MARK: - The exercises of one day (Swift: DayExerciseEditor)

/// Shared by "Edit Day" on a saved plan and by plan creation, where the plan
/// isn't saved yet. `onChange` receives the edited copy of `day`.
export function DayExerciseEditor({ day, onChange }) {
  const [showPicker, setShowPicker] = useState(false);

  const edit = mutate => {
    const next = clone(day);
    mutate(next);
    onChange(next);
  };

  const addExercise = exercise => edit(next => {
    const slot = newSlot({ exerciseID: exercise.id, targetSets: 3, targetReps: 10 });
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
            <span class="t-sub medium" style="flex:1;min-width:0">${exercise?.name ?? 'Unknown'}</span>
            <button class="c-subtle pressable" aria-label="Remove ${exercise?.name ?? 'exercise'}"
              onClick=${() => edit(next => next.blocks[blockIndex].exercises.splice(slotIndex, 1))}>
              <${Icon} name="x-circle-fill" size=${20} />
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

// MARK: - "Edit Day" on a saved plan (Swift: PlanEditorView)

export function PlanEditorSheet({ plan, dayIndex, onClose }) {
  const [draft, setDraft] = useState(() => clone(plan));
  const day = draft.days[dayIndex];

  const where = day.weekNumber != null ? `Week ${day.weekNumber}`
    : day.dayIndex != null ? `Week ${Math.floor(day.dayIndex / 7) + 1}`
    : day.dayOfWeek != null ? WEEKDAY_NAMES[day.dayOfWeek - 1]
    : null;

  return html`<${Sheet}
    left=${{ label: 'Cancel', onClick: onClose }}
    right=${{ label: 'Save', strong: true, onClick: () => { store.updatePlan(draft); onClose(); } }}
    onClose=${onClose}>
    <div style="padding:8px var(--gutter) 20px">
      <h2 class="t-title2">Edit Day</h2>
      <div class="row mono t-caption" style="gap:8px;margin-top:4px">
        <span class="c-${DAY_TYPES[day.dayType].color}">${DAY_TYPES[day.dayType].name}</span>
        ${where && html`<span class="c-subtle">· ${where}</span>`}
      </div>
    </div>
    <div class="divider"></div>
    <div style="padding-bottom:40px">
      <${DayExerciseEditor} day=${day}
        onChange=${updated => setDraft({ ...draft, days: draft.days.map((d, i) => (i === dayIndex ? updated : d)) })} />
    </div>
  <//>`;
}
