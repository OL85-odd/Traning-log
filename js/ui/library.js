// The Library tab and everything about a single exercise.
// Swift: OddForm/Features/Library/*

import { html, useState } from '../vendor/preact-htm.js';
import { ALL_ICONS, iconAssetName, isFigureIcon } from '../core/builtin.js';
import { format } from '../core/dates.js';
import { CATEGORIES, EQUIPMENT, MUSCLE_GROUPS, newExercise } from '../core/models.js';
import { seriesFor } from '../core/progressStats.js';
import { ProgressChart, TrendLabel, seriesUnit } from './chart.js';
import { Alert, Chip, ExerciseFigure, ExerciseIcon, Sheet, describeSets, store } from './common.js';
import { Icon } from './icons.js';

export function LibraryView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  const [selectedID, setSelectedID] = useState(null);
  const [creating, setCreating] = useState(false);

  const query = search.trim().toLowerCase();
  const filtered = store.state.exercises
    .filter(e => (!query || e.name.toLowerCase().includes(query)) && (!category || e.category === category))
    .sort((a, b) => a.name.localeCompare(b.name));
  const sections = Object.keys(CATEGORIES)
    .map(id => [id, filtered.filter(e => e.category === id)])
    .filter(([, items]) => items.length > 0);
  const selected = selectedID && store.exerciseByID(selectedID);

  return html`<div class="screen">
    <div class="row" style="padding:16px var(--gutter) 8px;align-items:flex-end">
      <div>
        <h1 class="t-title">Library</h1>
        <div class="mono t-caption c-subtle" style="margin-top:2px">${store.state.exercises.length} exercises</div>
      </div>
      <span class="spacer"></span>
      <button class="btn-round large" aria-label="New exercise" onClick=${() => setCreating(true)}>
        <${Icon} name="plus" size=${17} weight=${2.2} />
      </button>
    </div>

    <div style="padding:12px var(--gutter) 0">
      <label class="searchbar">
        <${Icon} name="search" size=${15} />
        <input placeholder="Search exercises..." value=${search} onInput=${e => setSearch(e.target.value)}
          autocomplete="off" autocorrect="off" enterkeyhint="search" />
        ${search && html`<button aria-label="Clear search" onClick=${() => setSearch('')}>
          <${Icon} name="x-circle-fill" size=${16} /></button>`}
      </label>
    </div>
    <div class="chip-row" style="padding-top:10px;padding-bottom:10px">
      <${Chip} label="All" selected=${category === null} onClick=${() => setCategory(null)} />
      ${Object.entries(CATEGORIES).map(([id, c]) => html`
        <${Chip} label=${c.name} selected=${category === id} onClick=${() => setCategory(id)} />`)}
    </div>
    <div class="divider"></div>

    <div class="scroll" style="padding:16px 0 32px">
      ${sections.map(([id, exercises]) => html`<div key=${id} style="padding-bottom:20px">
        <div class="lib-section-head label c-${CATEGORIES[id].color}">${CATEGORIES[id].name}</div>
        ${exercises.map(exercise => html`
          <button key=${exercise.id} class="lib-row pressable" onClick=${() => setSelectedID(exercise.id)}>
            <${ExerciseIcon} exercise=${exercise} box=${48} img=${32} radius=${10} />
            <div style="flex:1;min-width:0">
              <div class="row" style="gap:6px">
                <span class="t-sub medium truncate">${exercise.name}</span>
                ${exercise.isCustom && html`<span class="tag">CUSTOM</span>`}
              </div>
              <div class="mono t-caption2 c-subtle truncate" style="margin-top:3px">
                ${exercise.muscleGroups.map(m => MUSCLE_GROUPS[m]).join(' · ')}
              </div>
            </div>
            <${Icon} name="chevron-right" size=${13} weight=${2.2} class="c-subtle" />
          </button>`)}
      </div>`)}
      ${filtered.length === 0 && html`<div class="empty">
        <${Icon} name="search" size=${34} weight=${1.5} class="c-subtle" />
        <div class="t-sub medium">No exercises found</div>
        <div class="mono t-caption c-subtle">Try a different search or category.</div>
      </div>`}
    </div>

    ${selected && html`<${ExerciseDetailSheet} exercise=${selected} onClose=${() => setSelectedID(null)} />`}
    ${creating && html`<${CreateExerciseSheet} onClose=${() => setCreating(false)} />`}
  </div>`;
}

// MARK: - Shared pieces of the two exercise sheets

/// Only a figure with muscles is worth showing large.
const hasStage = exercise => isFigureIcon(iconAssetName(exercise));

/// The picture, large: this is where the red muscles can be read.
function Stage({ exercise }) {
  const figure = html`<${ExerciseFigure} exercise=${exercise} size=${208} />`;
  return hasStage(exercise) && html`<div class="figure-stage">
    ${figure}
    <div class="mono t-caption2 c-subtle" style="margin-top:6px">
      <i class="legend-dot"></i>${exercise.category === 'mobility' ? 'Stretched or worked' : 'Working muscles'}
    </div>
  </div>`;
}

/// Name and category. Where the picture is shown large above (a built-in
/// exercise), the small tile is left out.
function Hero({ exercise, box, img, radius, titleSize, custom }) {
  const category = CATEGORIES[exercise.category];
  return html`<div class="row" style="gap:16px">
    ${!hasStage(exercise) && html`<${ExerciseIcon} exercise=${exercise} box=${box} img=${img} radius=${radius} />`}
    <div style="min-width:0">
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <span class="bold" style="font-size:${titleSize}px">${exercise.name}</span>
        ${custom && html`<span class="tag" style="font-size:9px;padding:3px 6px">CUSTOM</span>`}
      </div>
      <div class="mono ${custom === undefined ? 't-caption' : 't-sub'} c-${category.color}" style="margin-top:4px">${category.name}</div>
    </div>
  </div>`;
}

function MusclePills({ exercise }) {
  return html`<div class="chip-wrap">
    ${exercise.muscleGroups.map(m => html`<span class="pill">${MUSCLE_GROUPS[m]}</span>`)}
  </div>`;
}

/// What you have done with this exercise: a chart of the best set per
/// session and the last time it was logged. Shown for every exercise with
/// numbers behind it, whether a plan asked for it or it was a quick session.
function History({ exercise }) {
  const series = seriesFor(
    exercise, store.activePlan, store.state.settings.activePlanStartDate, store.state.sessions);
  const last = store.lastPerformance(exercise.id);
  if (!series?.points.length && !last) return null;
  const unit = series && seriesUnit(series);
  const slot = { unit1: 'Reps', unit2: 'Sek', targetDurationSeconds: last?.sets[0]?.durationSeconds };

  return html`
    <div class="divider flush"></div>
    <div class="col" style="gap:10px">
      <div class="row">
        <span class="label">Your history${series?.points.length ? ` · best set, ${unit.name}` : ''}</span>
        <span class="spacer"></span>
        ${series && html`<${TrendLabel} series=${series} small />`}
      </div>
      ${series?.points.length > 1 && html`<div class="card chart-box"><${ProgressChart} series=${series} unit=${unit} /></div>`}
      ${last && html`<div class="mono t-caption c-subtle">
        Last time · ${format.mediumDate(last.date)} · ${describeSets(last.sets, slot, store.state.settings.preferredUnit)}
      </div>`}
    </div>`;
}

/// Step-by-step instructions and tips — the same on the Library detail and
/// behind the "i" button during a session.
function HowTo({ exercise }) {
  return html`
    ${exercise.instructions.length > 0 && html`
      <div class="divider flush"></div>
      <div class="col" style="gap:12px">
        <span class="label">How to do it</span>
        ${exercise.instructions.map((step, i) => html`<div class="row" style="gap:12px;align-items:flex-start">
          <span class="step-num">${i + 1}</span>
          <span class="t-sub" style="line-height:1.4;padding-top:1px">${step}</span>
        </div>`)}
      </div>`}

    ${exercise.tips.length > 0 && html`
      <div class="divider flush"></div>
      <div class="col" style="gap:10px">
        <span class="label">Tips & common mistakes</span>
        ${exercise.tips.map(tip => html`<div class="row" style="gap:10px;align-items:flex-start">
          <span class="c-accent" style="padding-top:3px"><${Icon} name="lightbulb" size=${13} /></span>
          <span class="t-sub" style="line-height:1.4;opacity:0.85">${tip}</span>
        </div>`)}
      </div>`}`;
}

// MARK: - Detail (Swift: ExerciseDetailSheet)

function ExerciseDetailSheet({ exercise, onClose }) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const infoChip = (label, value) => html`<div class="card" style="padding:8px 12px;border-radius:var(--radius-small)">
    <div class="mono t-micro c-subtle">${label}</div>
    <div class="t-sub medium" style="margin-top:2px">${value}</div>
  </div>`;

  return html`<${Sheet} size="medium"
    left=${{ label: 'Close', onClick: onClose }}
    right=${exercise.isCustom && { label: 'Edit', strong: true, onClick: () => setEditing(true) }}
    onClose=${onClose}>
    <div class="col" style="gap:24px;padding:var(--gutter) var(--gutter) 32px">
      <${Stage} exercise=${exercise} />
      <div>
        <${Hero} exercise=${exercise} box=${72} img=${52} radius=${16} titleSize=${22} custom=${exercise.isCustom} />
      </div>
      <div class="divider flush"></div>
      <div class="col" style="gap:10px"><span class="label">Muscle groups</span><${MusclePills} exercise=${exercise} /></div>
      <div class="divider flush"></div>
      <div class="col" style="gap:10px">
        <span class="label">Details</span>
        <div class="row" style="gap:10px;flex-wrap:wrap">
          ${infoChip('Category', CATEGORIES[exercise.category].name)}
          ${infoChip('Needs', EQUIPMENT[exercise.equipment] ?? EQUIPMENT.none)}
          ${!exercise.isCustom && infoChip('Level', ['Beginner', 'Intermediate', 'Advanced'][exercise.level - 1] ?? 'Beginner')}
          ${exercise.isCustom && infoChip('Type', 'Custom')}
        </div>
      </div>
      <${History} exercise=${exercise} />
      <${HowTo} exercise=${exercise} />
      ${exercise.notes && html`
        <div class="divider flush"></div>
        <div class="col" style="gap:8px">
          <span class="label">Notes</span>
          <p class="t-sub" style="opacity:0.8;white-space:pre-wrap;user-select:text;-webkit-user-select:text">${exercise.notes}</p>
        </div>`}
      ${exercise.isCustom && html`
        <div class="divider flush"></div>
        <button class="btn-soft tall" style="--tint:var(--red)" onClick=${() => setConfirmDelete(true)}>
          <${Icon} name="trash" size=${16} />Delete Exercise
        </button>`}
    </div>

    ${editing && html`<${CreateExerciseSheet} editing=${exercise} onClose=${() => setEditing(false)} />`}
    ${confirmDelete && html`<${Alert} title="Delete Exercise?"
      message=${`This will remove "${exercise.name}" from your library. Plans that use it will skip it; sessions already logged keep their numbers.`}
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setConfirmDelete(false) },
        { label: 'Delete', role: 'destructive', onClick: () => { onClose(); store.deleteCustomExercise(exercise); } },
      ]} />`}
  <//>`;
}

// MARK: - How to do it (Swift: ExerciseInfoSheet + ExerciseInfoButton)

/// The small "i" next to an exercise.
export function ExerciseInfoButton({ exercise }) {
  const [open, setOpen] = useState(false);
  return html`
    <button class="c-subtle pressable" style="padding:6px;margin:-6px" aria-label="About ${exercise.name}"
      onClick=${event => { event.stopPropagation(); setOpen(true); }}>
      <${Icon} name="info" size=${18} />
    </button>
    ${open && html`<${ExerciseInfoSheet} exercise=${exercise} onClose=${() => setOpen(false)} />`}`;
}

export function ExerciseInfoSheet({ exercise, onClose }) {
  const hasText = exercise.instructions.length > 0 || exercise.tips.length > 0;
  return html`<${Sheet} size="medium" right=${{ label: 'Done', strong: true, onClick: onClose }} onClose=${onClose}>
    <div class="col" style="gap:28px;padding:8px var(--gutter) 40px">
      <${Stage} exercise=${exercise} />
      <${Hero} exercise=${exercise} box=${64} img=${46} radius=${14} titleSize=${20} />

      ${exercise.muscleGroups.length > 0 && html`
        <div class="divider flush"></div>
        <div class="col" style="gap:10px"><span class="label">Muscles worked</span><${MusclePills} exercise=${exercise} /></div>`}

      <${HowTo} exercise=${exercise} />

      ${!hasText && html`
        <div class="divider flush"></div>
        <p class="mono t-sub c-subtle">No description available yet.</p>`}
    </div>
  <//>`;
}

// MARK: - Create / edit a custom exercise (Swift: CreateExerciseSheet)

function CreateExerciseSheet({ editing = null, onClose }) {
  const [name, setName] = useState(editing?.name ?? '');
  const [category, setCategory] = useState(editing?.category ?? 'strength');
  const [muscles, setMuscles] = useState(editing?.muscleGroups ?? []);
  const [notes, setNotes] = useState(editing?.notes ?? '');
  const [icon, setIcon] = useState(editing?.customIconName ?? null);
  // What you count when you do it. It decides how a quick session of it starts.
  const [tracking, setTracking] = useState(editing?.tracking ?? 'reps');
  const [pickingIcon, setPickingIcon] = useState(false);

  // Two exercises with the same name cannot be told apart in a plan.
  const isDuplicate = store.state.exercises.some(
    e => e.id !== editing?.id && e.name.trim().toLowerCase() === name.trim().toLowerCase(),
  );
  const isValid = name.trim().length > 0 && muscles.length > 0 && !isDuplicate;

  const toggleMuscle = id => setMuscles(muscles.includes(id) ? muscles.filter(m => m !== id) : [...muscles, id]);

  const save = () => {
    if (!isValid) return;
    const fields = { name: name.trim(), category, muscleGroups: muscles, notes, customIconName: icon, tracking };
    if (editing) store.updateExercise({ ...editing, ...fields });
    else store.addCustomExercise(newExercise({ ...fields, isCustom: true }));
    onClose();
  };

  const form = html`<div class="form">
    <h2 class="t-title2" style="padding-top:8px">${editing ? 'Edit Exercise' : 'New Exercise'}</h2>

    <div class="form-section">
      <span class="label">Icon</span>
      <button class="card row pressable" style="gap:12px;padding:12px;width:100%" onClick=${() => setPickingIcon(true)}>
        ${icon
          ? html`<${ExerciseIcon} exercise=${{ customIconName: icon }} box=${52} img=${36} />`
          : html`<div class="ex-icon c-subtle" style="width:52px;height:52px;border-radius:10px"><${Icon} name="photo" size=${22} /></div>`}
        <div style="flex:1">
          <div class="mono t-sub medium c-accent">${icon ? 'Change icon' : 'Choose icon'}</div>
          ${!icon && html`<div class="mono t-caption2 c-subtle" style="margin-top:2px">Optional — shown in the library</div>`}
        </div>
        <${Icon} name="chevron-right" size=${13} weight=${2.2} class="c-subtle" />
      </button>
    </div>

    <div class="form-section">
      <span class="label">Name</span>
      <input class="field" placeholder="Exercise name" value=${name} onInput=${e => setName(e.target.value)}
        autocomplete="off" enterkeyhint="done" />
      ${isDuplicate && html`<span class="mono t-caption2 c-red">The library already has an exercise with this name.</span>`}
    </div>

    <div class="form-section">
      <span class="label">Category</span>
      <div class="chip-wrap">
        ${Object.entries(CATEGORIES).map(([id, c]) => html`
          <${Chip} label=${c.name} selected=${category === id} onClick=${() => setCategory(id)} />`)}
      </div>
    </div>

    <div class="form-section">
      <span class="label">Measured in</span>
      <div class="chip-wrap">
        <${Chip} label="Reps" selected=${tracking === 'reps'} onClick=${() => setTracking('reps')} />
        <${Chip} label="Time" selected=${tracking !== 'reps'} onClick=${() => setTracking('time')} />
      </div>
    </div>

    <div class="form-section">
      <span class="label">Muscle groups</span>
      <div class="chip-wrap">
        ${Object.entries(MUSCLE_GROUPS).map(([id, label]) => html`
          <button class="chip row ${muscles.includes(id) ? 'selected' : ''}" style="gap:4px;font-weight:400"
            aria-pressed=${String(muscles.includes(id))} onClick=${() => toggleMuscle(id)}>
            ${muscles.includes(id) && html`<${Icon} name="check" size=${11} weight=${2.6} />`}${label}
          </button>`)}
      </div>
    </div>

    <div class="form-section">
      <span class="label">Notes (optional)</span>
      <textarea class="field" value=${notes} onInput=${e => setNotes(e.target.value)}></textarea>
    </div>
  </div>`;

  return html`<${Sheet}
    left=${{ label: 'Cancel', onClick: onClose }}
    right=${{ label: editing ? 'Save' : 'Add', strong: true, disabled: !isValid, onClick: save }}
    onClose=${onClose}>
    ${form}
    ${pickingIcon && html`<${IconPickerSheet} onSelect=${setIcon} onClose=${() => setPickingIcon(false)} />`}
  <//>`;
}

/// Swift: IconPickerSheet
function IconPickerSheet({ onSelect, onClose }) {
  const label = icon => icon.replace('exercise-', '').replaceAll('-', ' ');
  return html`<${Sheet} size="medium" title="Choose Icon" left=${{ label: 'Cancel', onClick: onClose }} onClose=${onClose}>
    <div class="icon-grid">
      ${ALL_ICONS.map(icon => html`
        <button class="icon-cell pressable" onClick=${() => { onSelect(icon); onClose(); }}>
          <${ExerciseIcon} exercise=${{ customIconName: icon }} box=${64} img=${44} radius=${12} />
          <span>${label(icon)}</span>
        </button>`)}
    </div>
  <//>`;
}
