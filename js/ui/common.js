// Shared building blocks: the app's store instance, overlays (sheet, cover,
// alert, action sheet) and the small views reused across screens.
// Swift: OddForm/Shared/**

import { html, render, useEffect, useLayoutEffect, useReducer, useRef } from '../vendor/preact-htm.js';
import { iconAssetName } from '../core/builtin.js';
import { CATEGORIES, DAY_TYPES, MODIFIERS } from '../core/models.js';
import { createStore } from '../core/store.js';
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
function Portal({ children }) {
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

/// The exercise's picture in a rounded tile; falls back to its category glyph.
/// `box` is the tile size and `img` the picture size, in points as on iOS.
export function ExerciseIcon({ exercise, box = 44, img = 32, radius = 10, variant = '' }) {
  const asset = iconAssetName(exercise);
  const category = CATEGORIES[exercise?.category] ?? CATEGORIES.strength;
  return html`<div class="ex-icon ${variant}" style="width:${box}px;height:${box}px;border-radius:${radius}px">
    ${asset
      ? html`<img src="img/exercises/${asset}.png" width=${img} height=${img} alt="" />`
      : html`<${Icon} name=${category.icon} size=${Math.round(img * 0.62)} class="c-${category.color}" />`}
  </div>`;
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

/// "3 × 8 Reps", "3 sets", "30m", "1m30s". Swift: DayDetailPanel.slotDescription
export function slotDescription(slot) {
  if (slot.targetSets != null && slot.targetReps != null) return `${slot.targetSets} × ${slot.targetReps} ${slot.unit1}`;
  if (slot.targetSets != null) return `${slot.targetSets} sets`;
  if (slot.targetDurationSeconds != null) {
    const d = slot.targetDurationSeconds;
    return `${Math.floor(d / 60)}m${d % 60 > 0 ? `${d % 60}s` : ''}`;
  }
  return '—';
}

/// 20 -> "20.0", 42.5 -> "42.5"
export function oneDecimal(value) {
  return Number(value).toFixed(1);
}
