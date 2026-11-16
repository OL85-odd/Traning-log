// Shared building blocks: the app's store instance, overlays (sheet, cover,
// alert, action sheet) and the small views reused across screens.
// Swift: OddForm/Shared/**

import { html, render, useEffect, useLayoutEffect, useReducer, useRef } from '../vendor/preact-htm.js';
import { iconAssetName } from '../core/builtin.js';
import { CATEGORIES, DAY_TYPES, MODIFIERS } from '../core/models.js';
import { createStore } from '../core/store.js';
import { UNIT_LABELS, countUnit, formatWeight, secondsToUnit, timeUnit, trimNumber } from '../core/units.js';
import { Icon } from './icons.js';

// MARK: - Store

function browserStorage() {
  try {
    const probe = '__oddform_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return null; // private mode / blocked storage: the app still runs, just without saving
  }
}

/// The one store the whole UI reads from and writes to.
export const store = createStore({ storage: browserStorage() });

/// Re-renders the calling component whenever the store changes.
export function useStore() {
  const [, redraw] = useReducer(n => n + 1, 0);
  useEffect(() => store.subscribe(redraw), []);
  return store;
}

// MARK: - Portal

/// Renders its children into #modals at the top of the page instead of where
/// it sits in the tree. Every overlay goes through here, so a sheet opened
/// from inside another sheet is still a plain top-level layer.
export function Portal({ children }) {
  const host = useRef(null);
  if (!host.current) host.current = document.createElement('div');

  useLayoutEffect(() => {
    document.getElementById('modals').appendChild(host.current);
    return () => {
      render(null, host.current);
      host.current.remove();
    };
  }, []);
  useLayoutEffect(() => { render(children, host.current); });

  return null;
}

// MARK: - Overlays

function NavButton({ label, onClick, strong, disabled }) {
  return html`<button class="navbar-btn ${strong ? 'strong' : ''}" disabled=${disabled} onClick=${onClick}>${label}</button>`;
}

function NavBar({ title, left, right }) {
  return html`<div class="navbar">
    <div>${left && html`<${NavButton} ...${left} />`}</div>
    <div class="navbar-title">${title}</div>
    <div>${right && html`<${NavButton} ...${right} />`}</div>
  </div>`;
}

/// A bottom sheet. `size` is "large" (near full height) or "medium" (fits its
/// content, at least half the screen). `left` / `right` are navigation-bar
/// buttons: { label, onClick, strong, disabled }.
export function Sheet({ size = 'large', title, left, right, onClose, children }) {
  return html`<${Portal}>
    <div class="backdrop" onClick=${onClose}></div>
    <div class="sheet ${size}" role="dialog" aria-modal="true">
      <div class="grabber"></div>
      <${NavBar} title=${title} left=${left} right=${right} />
      <div class="sheet-body">${children}</div>
    </div>
  <//>`;
}

/// A full-screen layer (SwiftUI's fullScreenCover).
export function Cover({ title, left, right, children }) {
  return html`<${Portal}>
    <div class="cover" role="dialog" aria-modal="true">
      <${NavBar} title=${title} left=${left} right=${right} />
      <div class="sheet-body">${children}</div>
    </div>
  <//>`;
}

/// A centred alert. `buttons`: [{ label, role: 'cancel' | 'destructive', onClick }].
/// `input`: { value, onInput, placeholder } adds a text field.
export function Alert({ title, message, buttons, input }) {
  return html`<${Portal}>
    <div class="backdrop"></div>
    <div class="alert-wrap">
      <div class="alert" role="alertdialog" aria-modal="true">
        <div class="alert-body">
          <div class="alert-title">${title}</div>
          ${message && html`<div class="alert-message">${message}</div>`}
          ${input && html`<input class="alert-input" value=${input.value} placeholder=${input.placeholder}
            onInput=${e => input.onInput(e.target.value)} />`}
        </div>
        <div class="alert-buttons">
          ${buttons.map(b => html`<button class=${b.role ?? ''} onClick=${b.onClick}>${b.label}</button>`)}
        </div>
      </div>
    </div>
  <//>`;
}

/// A list of choices rising from the bottom (SwiftUI's confirmationDialog).
/// `options`: [{ label, onClick, destructive }].
export function ActionSheet({ title, options, onCancel }) {
  return html`<${Portal}>
    <div class="backdrop" onClick=${onCancel}></div>
    <div class="actions" role="dialog" aria-modal="true">
      <div class="actions-group">
        ${title && html`<div class="actions-title">${title}</div>`}
        ${options.map(o => html`<button class=${o.destructive ? 'destructive' : ''}
          onClick=${() => { onCancel(); o.onClick(); }}>${o.label}</button>`)}
      </div>
      <div class="actions-group"><button class="cancel" onClick=${onCancel}>Cancel</button></div>
    </div>
  <//>`;
}

// MARK: - Small shared views

/// The exercise's pictogram in a rounded tile, in its category's colour;
/// falls back to the category glyph. `box` is the tile size and `img` the
/// picture size, in points as on iOS. With `onClick` the tile is a button.
export function ExerciseIcon({ exercise, box = 44, img = 32, radius = 10, variant = '', onClick, label }) {
  const asset = iconAssetName(exercise);
  const category = CATEGORIES[exercise?.category] ?? CATEGORIES.strength;
  const style = `width:${box}px;height:${box}px;border-radius:${radius}px`;
  const picture = asset
    // The file is set here, not through a CSS variable: a url() inside a
    // variable is resolved against the stylesheet, not the page.
    ? html`<span class="ex-glyph" style="width:${img}px;height:${img}px;-webkit-mask-image:url(img/exercises/${asset}.png);mask-image:url(img/exercises/${asset}.png)"></span>`
    : html`<${Icon} name=${category.icon} size=${Math.round(img * 0.62)} />`;
  return onClick
    ? html`<button class="ex-icon c-${category.color} ${variant}" style=${style} aria-label=${label} onClick=${onClick}>${picture}</button>`
    : html`<div class="ex-icon c-${category.color} ${variant}" style=${style}>${picture}</div>`;
}

/// Glyph + day type name in the type's colour. Swift: DayTypeLabel
export function DayTypeLabel({ dayType }) {
  const type = DAY_TYPES[dayType];
  return html`<span class="row mono t-caption c-${type.color}" style="gap:5px">
    <${Icon} name=${type.icon} size=${13} />${type.name}
  </span>`;
}

export function Chip({ label, selected, onClick, large }) {
  return html`<button class="chip ${selected ? 'selected' : ''} ${large ? 'large' : ''}" onClick=${onClick}>${label}</button>`;
}

/// A number with − and + on either side; the number itself can be typed.
export function NumberStepper({ label, value, min = 0, max = 999, step = 1, onChange }) {
  const clamp = n => Math.max(min, Math.min(max, n));
  return html`<label class="col" style="gap:6px;flex:1;min-width:0">
    <span class="label">${label}</span>
    <div class="stepper wide">
      <button aria-label="Less" onClick=${e => { e.preventDefault(); onChange(clamp(value - step)); }}>
        <${Icon} name="minus" size=${15} weight=${2.2} /></button>
      <input inputmode="numeric" value=${value} aria-label=${label}
        onInput=${e => { if (/^\d+$/.test(e.target.value.trim())) onChange(clamp(Number(e.target.value))); }} />
      <button aria-label="More" onClick=${e => { e.preventDefault(); onChange(clamp(value + step)); }}>
        <${Icon} name="plus" size=${15} weight=${2.2} /></button>
    </div>
  </label>`;
}

export function Switch({ on, onChange, label }) {
  return html`<button class="switch" role="switch" aria-checked=${String(!!on)} aria-label=${label}
    onClick=${() => onChange(!on)}></button>`;
}

/// A circular progress arc starting at 12 o'clock.
export function Ring({ size, width = 2, percent, color, track, glow }) {
  const r = (size - width) / 2;
  const length = 2 * Math.PI * r;
  const shown = Math.max(0, Math.min(1, percent));
  return html`<svg width=${size} height=${size} viewBox="0 0 ${size} ${size}" style="display:block">
    ${track && html`<circle cx=${size / 2} cy=${size / 2} r=${r} fill="none" stroke="var(--border)" stroke-width=${width} />`}
    ${shown > 0 && html`<circle cx=${size / 2} cy=${size / 2} r=${r} fill="none"
      stroke=${color} stroke-width=${width} stroke-linecap="round"
      stroke-dasharray="${length * shown} ${length}" transform="rotate(-90 ${size / 2} ${size / 2})"
      style=${glow ? `filter:drop-shadow(0 0 3px ${color})` : ''} />`}
  </svg>`;
}

/// Green from 80%, sand from 40%, red below.
export function completionColor(percent) {
  if (percent >= 0.8) return 'var(--green)';
  if (percent >= 0.4) return 'var(--sand)';
  return 'var(--red)';
}

/// The row of small tinted pills for a day's feel modifiers.
export function ModifierBadges({ modifiers }) {
  return html`<div class="row" style="gap:6px;flex-wrap:wrap">
    ${[...modifiers].sort().map(id => html`<span class="badge" style="--tint:var(--${MODIFIERS[id].color})">
      <${Icon} name=${MODIFIERS[id].icon} size=${10} />${MODIFIERS[id].label}
    </span>`)}
  </div>`;
}

const allEqual = values => values.every(v => v === values[0]);
const times = (values, label) =>
  `${values.length > 1 && allEqual(values) ? `${values.length} × ${values[0]}` : values.join(' / ')} ${label}`;

/// What a slot asks for: "3 × 8 reps · 20 kg", "3 × 45 sec", "30 min", "3 sets".
/// Swift: DayDetailPanel.slotDescription
export function slotDescription(slot, weightUnit = 'kg') {
  const parts = [];
  const time = timeUnit(slot);
  const duration = slot.targetDurationSeconds != null
    ? `${trimNumber(secondsToUnit(slot.targetDurationSeconds, time))} ${UNIT_LABELS[time]}`
    : null;
  const sets = slot.targetSets;

  if (slot.targetReps != null) {
    const reps = `${slot.targetReps} ${UNIT_LABELS[countUnit(slot)]}`;
    parts.push(sets != null ? `${sets} × ${reps}` : reps);
    if (duration) parts.push(duration);
  } else if (duration) {
    parts.push(sets != null && sets > 1 ? `${sets} × ${duration}` : duration);
  } else if (sets != null) {
    parts.push(`${sets} ${sets === 1 ? 'set' : 'sets'}`);
  }
  if (slot.targetWeightKg != null && slot.targetWeightKg > 0) {
    parts.push(`${formatWeight(slot.targetWeightKg, weightUnit)} ${weightUnit}`);
  }
  return parts.join(' · ') || '—';
}

/// What was actually done in `sets` of one exercise: "3 × 8 reps · 20 kg",
/// "8 / 8 / 6 reps · 22.5 kg", "2 × 45 sec". The weight is the heaviest set.
export function describeSets(sets, slot, weightUnit = 'kg') {
  const sorted = [...sets].sort((a, b) => a.setNumber - b.setNumber);
  const parts = [];
  const reps = sorted.map(s => s.repsCompleted).filter(v => v != null);
  if (reps.length) parts.push(times(reps, UNIT_LABELS[countUnit(slot)]));
  const seconds = sorted.map(s => s.durationSeconds).filter(v => v != null);
  if (seconds.length) {
    const time = timeUnit(slot);
    parts.push(times(seconds.map(v => trimNumber(secondsToUnit(v, time))), UNIT_LABELS[time]));
  }
  const weights = sorted.map(s => s.weightKg).filter(v => v != null && v > 0);
  if (weights.length) parts.push(`${formatWeight(Math.max(...weights), weightUnit)} ${weightUnit}`);
  return parts.join(' · ') || `${sorted.length} ${sorted.length === 1 ? 'set' : 'sets'}`;
}
