// Choosing, creating, copying and deleting plans.
// Swift: OddForm/Features/Plan/PlanPickerSheet.swift
//        OddForm/Features/Plan/CreatePlanView.swift

import { html, useState } from '../vendor/preact-htm.js';
import { builtInPlans } from '../core/builtin.js';
import { DAY_TYPES, WEEKDAY_NAMES, newPlan, newPlanDay, slotsOf, uuid } from '../core/models.js';
import { ActionSheet, Alert, Chip, Sheet, Switch, store } from './common.js';
import { Icon } from './icons.js';
import { DayExerciseEditor } from './planEditor.js';

const clone = value => JSON.parse(JSON.stringify(value));
const trainingDayCount = plan => plan.days.filter(d => d.dayType !== 'rest').length;
const modeName = plan => (plan.planMode === 'weeklyCycle' ? 'Weekly cycle' : 'Program');

// MARK: - Plan picker

export function PlanPickerSheet({ onClose }) {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);       // plan
  const [menuFor, setMenuFor] = useState(null);       // plan
  const [copying, setCopying] = useState(null);       // { plan, name }
  const [deleting, setDeleting] = useState(null);     // plan
  const [created, setCreated] = useState(null);       // plan just created, not yet in use

  const copyPlan = () => {
    const { plan, name } = copying;
    const copy = { ...clone(plan), id: uuid(), name: name.trim() || `${plan.name} Copy` };
    store.addPlan(copy);
    setCopying(null);
    setEditing(copy); // straight into the editor
  };

  return html`<${Sheet} title="Choose Plan"
    left=${{ label: 'Cancel', onClick: onClose }}
    right=${{ label: html`<${Icon} name="plus" size=${20} weight=${2.2} />`, strong: true, onClick: () => setCreating(true) }}
    onClose=${onClose}>
    <div class="list" style="padding-top:16px">
      <div class="list-group">
        ${store.state.plans.map(plan => {
          const days = trainingDayCount(plan);
          return html`<div key=${plan.id} class="list-row" style="padding:0">
            <button class="row pressable" style="flex:1;min-width:0;gap:8px;padding:11px 0 11px 16px"
              onClick=${() => {
                // Tapping the plan already in use just closes the sheet; it does not start it over.
                store.setActivePlan(plan);
                onClose();
              }}>
              <div style="flex:1;min-width:0">
                <div class="medium truncate">${plan.name}</div>
                <div class="mono t-caption c-subtle" style="margin-top:4px">
                  ${modeName(plan)}${days > 0 ? ` · ${days} training days` : ''}
                </div>
              </div>
              ${store.state.settings.activePlanID === plan.id && html`<${Icon} name="check" size=${18} weight=${2.4} class="c-green" />`}
            </button>
            <button class="c-subtle pressable" style="padding:14px 16px 14px 8px" aria-label="Actions for ${plan.name}"
              onClick=${() => setMenuFor(plan)}>
              <${Icon} name="ellipsis" size=${20} />
            </button>
          </div>`;
        })}
      </div>
    </div>

    ${menuFor && html`<${ActionSheet} title=${menuFor.name}
      options=${[
        { label: 'Edit', onClick: () => setEditing(menuFor) },
        { label: 'Copy', onClick: () => setCopying({ plan: menuFor, name: `${menuFor.name} Copy` }) },
        { label: 'Delete', destructive: true, onClick: () => setDeleting(menuFor) },
      ]}
      onCancel=${() => setMenuFor(null)} />`}

    ${copying && html`<${Alert} title="Copy Plan"
      message=${`Give your copy of "${copying.plan.name}" a new name.`}
      input=${{ value: copying.name, placeholder: 'Plan name', onInput: name => setCopying({ ...copying, name }) }}
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setCopying(null) },
        { label: 'Copy', onClick: copyPlan },
      ]} />`}

    ${deleting && html`<${Alert} title="Delete Plan?"
      message=${`This will remove "${deleting.name}". Your past sessions will not be affected.`}
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setDeleting(null) },
        { label: 'Delete', role: 'destructive', onClick: () => { store.deletePlan(deleting.id); setDeleting(null); } },
      ]} />`}

    ${created && html`<${Alert} title="Use this plan now?"
      message=${`"${created.name}" is saved. Start it today, or keep ${store.activePlan ? `"${store.activePlan.name}"` : 'things as they are'} for now.`}
      buttons=${[
        { label: 'Not now', onClick: () => setCreated(null) },
        { label: 'Start today', role: 'primary', onClick: () => { store.setActivePlan(created); setCreated(null); onClose(); } },
      ]} />`}

    ${creating && html`<${CreatePlanSheet} onClose=${() => setCreating(false)} onCreated=${setCreated} />`}
    ${editing && html`<${CreatePlanSheet} key=${editing.id} editing=${editing} onClose=${() => setEditing(null)} />`}
  <//>`;
}

// MARK: - Create / edit a plan

const emptyWeek = () => [1, 2, 3, 4, 5, 6, 7].map(dayOfWeek => newPlanDay({ dayOfWeek, dayType: 'rest' }));
const emptyProgram = weeks => Array.from({ length: weeks * 7 }, (_, dayIndex) => newPlanDay({ dayIndex, dayType: 'rest' }));

function dayLabel(day) {
  const type = DAY_TYPES[day.dayType].name;
  if (day.dayOfWeek != null) return `${WEEKDAY_NAMES[day.dayOfWeek - 1] ?? 'Day'} — ${type}`;
  if (day.dayIndex != null) return `Day ${day.dayIndex + 1} — ${type}`;
  return type;
}

export function CreatePlanSheet({ editing = null, onClose, onCreated }) {
  const [step, setStep] = useState(editing ? 'form' : 'chooseType');
  const [name, setName] = useState(editing?.name ?? '');
  const [planMode, setPlanMode] = useState(editing?.planMode ?? 'weeklyCycle');
  const [days, setDays] = useState(() => clone(editing?.days ?? []));
  const [progression, setProgression] = useState(editing?.progressionEnabled ?? false);

  const [showTemplates, setShowTemplates] = useState(false);
  const [settingsFor, setSettingsFor] = useState(null);   // index into days
  const [exercisesFor, setExercisesFor] = useState(null); // index into days

  const isValid = name.trim().length > 0;
  const setDay = (index, day) => setDays(days.map((d, i) => (i === index ? day : d)));

  const start = (mode, initialDays, initialName = '') => {
    setPlanMode(mode);
    setDays(initialDays);
    if (initialName) setName(initialName);
    setStep('form');
  };

  const addTrainingDay = () => {
    if (planMode === 'weeklyCycle') {
      // Every weekday already has an entry; turn the first free one into a training day.
      const free = days.findIndex(d => d.dayType === 'rest');
      if (free !== -1) setDay(free, { ...days[free], dayType: 'strength' });
    } else {
      const next = Math.max(-1, ...days.map(d => d.dayIndex ?? -1)) + 1;
      setDays([...days, newPlanDay({ dayIndex: next, dayType: 'strength' })]);
    }
  };

  const removeTrainingDay = index => {
    if (planMode === 'weeklyCycle') setDay(index, { ...days[index], dayType: 'rest', blocks: [] });
    else setDays(days.filter((_, i) => i !== index));
  };

  const save = () => {
    if (!isValid) return;
    const plan = newPlan({
      name: name.trim(), planMode, days, progressionEnabled: progression, isCustom: true,
      // Editing keeps the plan's identity and its pause history.
      ...(editing && {
        id: editing.id,
        isCustom: editing.isCustom,
        notes: editing.notes,
        progressionPauseCount: editing.progressionPauseCount,
        progressionLastPausedMonth: editing.progressionLastPausedMonth,
      }),
    });
    if (editing) store.updatePlan(plan); else store.addPlan(plan);
    onClose();
    if (!editing) onCreated?.(plan);
  };

  const typeCard = (icon, color, title, subtitle, onClick) => html`
    <button class="card type-card pressable" onClick=${onClick}>
      <span class="c-${color}" style="width:40px;display:grid;place-items:center"><${Icon} name=${icon} size=${26} /></span>
      <span style="flex:1">
        <span class="semibold" style="display:block">${title}</span>
        <span class="mono t-caption c-subtle" style="display:block;margin-top:3px;line-height:1.4">${subtitle}</span>
      </span>
      <${Icon} name="chevron-right" size=${14} weight=${2.2} class="c-subtle" />
    </button>`;

  const chooseType = html`
    <div style="padding:24px var(--gutter) 16px">
      <h2 style="font-size:26px;font-weight:700">New Plan</h2>
      <p class="mono t-sub c-subtle" style="margin-top:8px">Choose how you want to build your plan.</p>
    </div>
    <div class="col" style="gap:12px;padding:0 var(--gutter)">
      ${typeCard('calendar-plus', 'accent', 'Weekly Cycle', 'Repeating weekly schedule — e.g. Mon/Wed/Fri every week.',
        () => start('weeklyCycle', emptyWeek()))}
      ${typeCard('calendar-clock', 'blue', 'Timed Program', 'Fixed-length program — e.g. 4-week strength block.',
        () => start('finiteProgram', emptyProgram(4)))}
      <div class="divider"></div>
      ${typeCard('doc', 'green', 'Start from a Template', 'Copy one of the built-in plans and customise it.',
        () => setShowTemplates(true))}
    </div>`;

  const trainingIndexes = days.map((_, i) => i).filter(i => days[i].dayType !== 'rest');
  // A week has seven days; a program can always grow by one more.
  const canAddDay = planMode !== 'weeklyCycle' || days.some(d => d.dayType === 'rest');

  const form = html`<div class="form">
    <div class="form-section">
      <span class="label">Plan name</span>
      <input class="field" placeholder="e.g. My Strength Plan" value=${name} onInput=${e => setName(e.target.value)}
        autocomplete="off" enterkeyhint="done" />
    </div>

    ${!editing && html`<div class="form-section">
      <span class="label">Type</span>
      <div class="row" style="gap:8px">
        <${Chip} large label="Weekly" selected=${planMode === 'weeklyCycle'} onClick=${() => setPlanMode('weeklyCycle')} />
        <${Chip} large label="Program" selected=${planMode === 'finiteProgram'} onClick=${() => setPlanMode('finiteProgram')} />
      </div>
    </div>`}

    <div class="form-section">
      <span class="label">Training days  (${trainingIndexes.length} active)</span>
      <div class="col" style="gap:8px">
        ${trainingIndexes.map(index => {
          const day = days[index];
          const count = slotsOf(day).length;
          return html`<div key=${day.id} class="card day-row">
            <span class="dot c-${DAY_TYPES[day.dayType].color}"></span>
            <button class="pressable" style="flex:1;min-width:0" onClick=${() => setExercisesFor(index)}>
              <div class="t-sub medium">${dayLabel(day)}</div>
              <div class="mono t-caption2 ${count === 0 ? 'c-accent' : 'c-subtle'}" style="margin-top:2px">
                ${count === 0 ? 'No exercises yet — tap to add' : `${count} exercise${count === 1 ? '' : 's'}`}
              </div>
            </button>
            <button class="c-accent pressable" aria-label="Day settings" onClick=${() => setSettingsFor(index)}>
              <${Icon} name="pencil" size=${20} />
            </button>
            <button class="c-subtle pressable" aria-label="Remove day" onClick=${() => removeTrainingDay(index)}>
              <${Icon} name="x-circle-fill" size=${22} />
            </button>
          </div>`;
        })}
        ${canAddDay
          ? html`<button class="btn-soft tall" onClick=${addTrainingDay}>
              <${Icon} name="plus-circle-fill" size=${18} />Add Training Day
            </button>`
          : html`<p class="mono t-caption2 c-subtle center">Every day of the week is a training day.</p>`}
      </div>
    </div>

    <div class="form-section">
      <span class="label">Progression</span>
      <div class="card row" style="gap:12px;padding:8px 12px;border-radius:var(--radius-control)">
        <span class="t-sub" style="flex:1">Increase targets automatically</span>
        <${Switch} on=${progression} onChange=${setProgression} label="Increase targets automatically" />
      </div>
      <p class="mono t-caption2 c-subtle" style="line-height:1.45">
        Weight (or reps/duration for bodyweight exercises) climbs by +2.5% a month. You can pause a single month's increase from the Plan tab.
      </p>
    </div>
  </div>`;

  return html`<${Sheet}
    left=${{ label: 'Cancel', onClick: onClose }}
    right=${step === 'form' && { label: editing ? 'Save' : 'Create', strong: true, disabled: !isValid, onClick: save }}
    onClose=${onClose}>
    ${step === 'form' ? form : chooseType}

    ${showTemplates && html`<${Sheet} title="Choose Template"
      left=${{ label: 'Cancel', onClick: () => setShowTemplates(false) }} onClose=${() => setShowTemplates(false)}>
      <div class="list" style="padding-top:16px"><div class="list-group">
        ${builtInPlans().map(template => html`
          <button class="list-row" style="flex-direction:column;align-items:flex-start;gap:4px"
            onClick=${() => { setShowTemplates(false); start(template.planMode, template.days, `${template.name} (Custom)`); }}>
            <span class="medium">${template.name}</span>
            <span class="mono t-caption c-subtle">${modeName(template)}</span>
          </button>`)}
      </div></div>
    <//>`}

    ${settingsFor != null && days[settingsFor] && html`<${DaySettingsSheet}
      days=${days} dayIndex=${settingsFor} planMode=${planMode}
      onChange=${setDays} onClose=${() => setSettingsFor(null)} />`}

    ${exercisesFor != null && days[exercisesFor] && html`<${Sheet}
      title=${DAY_TYPES[days[exercisesFor].dayType].name}
      right=${{ label: 'Done', strong: true, onClick: () => setExercisesFor(null) }}
      onClose=${() => setExercisesFor(null)}>
      <div style="padding:12px 0 40px">
        <${DayExerciseEditor} day=${days[exercisesFor]} onChange=${day => setDay(exercisesFor, day)} />
      </div>
    <//>`}
  <//>`;
}

// MARK: - Weekday + session type for one day (Swift: DaySettingsSheet)

function DaySettingsSheet({ days, dayIndex, planMode, onChange, onClose }) {
  const day = days[dayIndex];
  // Weekdays held by another training day. Rest-day placeholders don't block.
  const taken = new Set(days.filter((d, i) => i !== dayIndex && d.dayType !== 'rest').map(d => d.dayOfWeek));

  /// Swaps weekdays with whichever entry holds `dayOfWeek`, so every weekday
  /// keeps exactly one entry.
  const selectWeekday = dayOfWeek => onChange(days.map((d, i) => {
    if (i === dayIndex) return { ...d, dayOfWeek };
    if (d.dayOfWeek === dayOfWeek) return { ...d, dayOfWeek: day.dayOfWeek };
    return d;
  }));

  return html`<${Sheet} size="medium" title="Day Settings"
    right=${{ label: 'Done', strong: true, onClick: onClose }} onClose=${onClose}>
    <div class="col" style="gap:28px;padding:var(--gutter) var(--gutter) 32px">
      ${planMode === 'weeklyCycle' && html`<div class="col" style="gap:10px">
        <span class="label">Day of week</span>
        <div class="weekday-grid">
          ${WEEKDAY_NAMES.map((weekday, i) => html`
            <button class="weekday ${day.dayOfWeek === i + 1 ? 'selected' : ''}" disabled=${taken.has(i + 1)}
              onClick=${() => selectWeekday(i + 1)}>${weekday}</button>`)}
        </div>
      </div>`}

      <div class="col" style="gap:10px">
        <span class="label">Session type</span>
        ${['strength', 'cardio', 'hiit', 'yogaStretch', 'interval'].map(type => html`
          <button class="option-row ${day.dayType === type ? 'selected' : ''}"
            onClick=${() => onChange(days.map((d, i) => (i === dayIndex ? { ...d, dayType: type } : d)))}>
            <span class="dot c-${DAY_TYPES[type].color}" style="width:10px;height:10px"></span>
            <span style="flex:1">${DAY_TYPES[type].name}</span>
            ${day.dayType === type && html`<${Icon} name="check" size=${15} weight=${2.4} class="c-accent" />`}
          </button>`)}
      </div>
    </div>
  <//>`;
}
